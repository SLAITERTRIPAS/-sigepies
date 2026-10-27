import { collection, getDocs, doc, setDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { MatrixActivity } from "../types";

export type IntegratedWorkflowStage =
  | "elaboracao_departamental"
  | "consolidacao_direcao"
  | "consolidacao_institucional"
  | "revisao_tecnica"
  | "apreciacao_conselho"
  | "aprovado"
  | "correcao_solicitada"
  | "rejeitado";

export interface IntegratedPAAItem {
  id: string;
  activityId: string;
  bemOuServico: string;
  quantidade: number;
  setorRequisitante: string;
  direcao: string;
  valorEstimado: number;
  mesPrevisto: string;
  fonteFinanciamento: string;
  statusUgea: "Pendente" | "Em Preparação" | "Concurso Lançado" | "Adjudicado" | "Concluído";
  dataGeracao: string;
}

export interface IntegratedPACItem {
  id: string;
  activityId: string;
  objetoContratacao: string;
  unidadeRequisitante: string;
  direcao: string;
  modalidadePrevista: string;
  valorEstimado: number;
  prazoPrevisto: string;
  fonteFinanceira: string;
  statusUgea: "Pendente" | "Termos de Referência" | "Concurso" | "Contratado" | "Em Execução";
  dataGeracao: string;
}

export interface PlanoExecucaoMensal {
  mes: string; // "Janeiro", "Fevereiro", etc.
  numMes: number; // 1 - 12
  atividades: {
    activityId: string;
    titulo: string;
    setorResponsavel: string;
    responsavelNome?: string;
    meta: string;
    indicador: string;
    prazo: string;
    orcamento: number;
    fonteFinanciamento: string;
    percentualExecucao: number;
    statusExecucao: "Pendente" | "Em Curso" | "Concluído" | "Atrasado";
  }[];
}

export interface IntegratedWorkflowState {
  stage: IntegratedWorkflowStage;
  ano: number;
  versaoPlano: string;
  totalAtividades: number;
  orcamentoTotal: number;
  paaItensCount: number;
  pacItensCount: number;
  isPublicado: boolean;
  dataAprovacaoConselho?: string;
  aprovadoPorConselho?: boolean;
  observacoesConselho?: string;
  dataPublicacao?: string;
}

export const integratedPlanningWorkflowService = {
  /**
   * Processa a aprovação do Plano Institucional pelo Conselho de Representantes.
   * Executa a Regra Institucional Fundamental do SIGEP:
   * 1. Atualiza o estado para "Plano Institucional Aprovado"
   * 2. Extrai automaticamente o Plano Anual de Aquisições (PAA)
   * 3. Extrai automaticamente o Plano Anual de Contratações (PAC)
   * 4. Encaminha PAA e PAC à UGEA
   * 5. Transforma automaticamente o Plano Institucional no Plano de Execução (distribuído por trimestre e mês)
   * 6. Organiza mensalmente todas as atividades
   * 7. Publica institucionalmente para acesso de todos os utilizadores autorizados
   */
  async approveInstitutionalPlanAndTriggerWorkflow(
    activities: MatrixActivity[],
    ano: number,
    approverName: string = "Conselho de Representantes",
    observacoes: string = "Aprovado sem reservas em Sessão Plenária do Conselho."
  ): Promise<{
    paaItems: IntegratedPAAItem[];
    pacItems: IntegratedPACItem[];
    execucaoMensal: PlanoExecucaoMensal[];
    workflowState: IntegratedWorkflowState;
  }> {
    const timestamp = new Date().toISOString();

    // Step 1: Atualizar atividades para "Plano Institucional Aprovado"
    const updatedActivities = activities.map((act) => ({
      ...act,
      status: "Plano Institucional Aprovado",
      planoAprovado: true,
      dataAprovacaoConselho: timestamp,
    }));

    // Persistir em Firestore em lote
    await Promise.all(
      updatedActivities.map(async (act) => {
        try {
          if (act.id) {
            await setDoc(
              doc(db, "plano_actividades", act.id),
              {
                status: "Plano Institucional Aprovado",
                planoAprovado: true,
                dataAprovacaoConselho: timestamp,
                updatedAt: timestamp,
              },
              { merge: true }
            );
          }
        } catch (e) {
          console.warn("Aviso ao guardar atividade aprovada no Firestore:", e);
        }
      })
    );

    // Step 2 & 3: Extração Automática de PAA e PAC
    const paaItems: IntegratedPAAItem[] = [];
    const pacItems: IntegratedPACItem[] = [];

    updatedActivities.forEach((act) => {
      const actAny = act as any;
      const necessitaAquisicao =
        act.necessitaAquisicao === "Sim" ||
        (act.necessidade &&
          /aquisiç|bem|equipamento|material|computador|resma|mobiliá/i.test(act.necessidade)) ||
        (act.rubrica && /bens|equipamento|material/i.test(act.rubrica));

      const necessitaContratacao =
        act.necessitaContratacao === "Sim" ||
        (act.necessidade &&
          /contrataç|serviço|consultoria|empreitada|manutenç|obras/i.test(act.necessidade)) ||
        (act.rubrica && /serviço|contrat/i.test(act.rubrica));

      const valor = Number(act.valor || actAny.custoTotal || actAny.total || 0);
      const setor = act.setor || act.departamento || act.direcao || "Geral";
      const direcao = act.direcao || "Direção Central";
      const mes = act.dataMes || actAny.mesRealizacao || actAny.mes || "Janeiro";
      const fonte = actAny.fonteReceita || act.orcamento || "OGE";

      if (necessitaAquisicao) {
        const paaItem: IntegratedPAAItem = {
          id: `paa_${act.id}_${Date.now()}`,
          activityId: act.id,
          bemOuServico: act.title || act.necessidade || "Aquisição de Bens/Equipamentos",
          quantidade: Number(actAny.quantidade || actAny.qtd || 1),
          setorRequisitante: setor,
          direcao,
          valorEstimado: valor > 0 ? valor : 50000,
          mesPrevisto: mes,
          fonteFinanciamento: fonte,
          statusUgea: "Pendente",
          dataGeracao: timestamp,
        };
        paaItems.push(paaItem);
      }

      if (necessitaContratacao) {
        const pacItem: IntegratedPACItem = {
          id: `pac_${act.id}_${Date.now()}`,
          activityId: act.id,
          objetoContratacao: act.title || act.necessidade || "Contratação de Serviços/Consultoria",
          unidadeRequisitante: setor,
          direcao,
          modalidadePrevista:
            valor > 1000000
              ? "Concurso Público"
              : valor > 250000
              ? "Concurso Limitado"
              : "Cotações",
          valorEstimado: valor > 0 ? valor : 120000,
          prazoPrevisto: mes,
          fonteFinanceira: fonte,
          statusUgea: "Pendente",
          dataGeracao: timestamp,
        };
        pacItems.push(pacItem);
      }
    });

    // Step 4: Encaminhar PAA e PAC à UGEA no Firestore
    await Promise.all([
      ...paaItems.map((item) =>
        setDoc(doc(db, "plano_aquisicoes_paa", item.id), item, { merge: true }).catch(() => {})
      ),
      ...pacItems.map((item) =>
        setDoc(doc(db, "plano_contratacoes_pac", item.id), item, { merge: true }).catch(() => {})
      ),
      // Atualizar estatísticas gerais da UGEA
      setDoc(
        doc(db, "ugea_resumo", `ano_${ano}`),
        {
          ano,
          totalPaaItens: paaItems.length,
          totalPacItens: pacItems.length,
          valorTotalAquisicoes: paaItems.reduce((acc, i) => acc + i.valorEstimado, 0),
          valorTotalContratacoes: pacItems.reduce((acc, i) => acc + i.valorEstimado, 0),
          dataRecebimento: timestamp,
          origem: "Plano Institucional Aprovado pelo Conselho",
        },
        { merge: true }
      ).catch(() => {}),
    ]);

    // Step 5 & 6: Organização Mensal do Plano de Execução (12 Meses)
    const mesesNomes = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const execucaoMensal: PlanoExecucaoMensal[] = mesesNomes.map((mesNome, index) => {
      const atividadesDoMes = updatedActivities.filter((act) => {
        const actAny = act as any;
        const m = (act.dataMes || actAny.mesRealizacao || actAny.mes || "").toLowerCase();
        if (!m) return index === 0; // Se não tiver mês, coloca em Janeiro
        return m.includes(mesNome.toLowerCase()) || m.includes(`0${index + 1}`) || m === String(index + 1);
      });

      return {
        mes: mesNome,
        numMes: index + 1,
        atividades: atividadesDoMes.map((act) => {
          const actAny = act as any;
          return {
            activityId: act.id,
            titulo: act.title || actAny.nomeActividade || "Atividade de Execução",
            setorResponsavel: act.setor || act.departamento || act.direcao || "Direção Central",
            responsavelNome: act.responsavel || "Técnico Responsável",
            meta: actAny.meta || act.objetivoActividade || "100% de realização da meta prevista",
            indicador: actAny.indicador || "Relatório de Execução / Evidência Fotográfica",
            prazo: act.prazo || `${mesNome} / ${ano}`,
            orcamento: Number(act.valor || actAny.custoTotal || actAny.total || 0),
            fonteFinanciamento: actAny.fonteReceita || act.orcamento || "OGE",
            percentualExecucao: act.executada ? 100 : act.status === "Em Curso" ? 50 : 0,
            statusExecucao: act.executada
              ? "Concluído"
              : act.status === "Em Curso"
              ? "Em Curso"
              : "Pendente",
          };
        }),
      };
    });

    // Step 7: Publicação Institucional
    const workflowState: IntegratedWorkflowState = {
      stage: "aprovado",
      ano,
      versaoPlano: `V${ano}.1-APROVADO`,
      totalAtividades: updatedActivities.length,
      orcamentoTotal: updatedActivities.reduce(
        (acc, a) => acc + Number(a.valor || (a as any).custoTotal || (a as any).total || 0),
        0
      ),
      paaItensCount: paaItems.length,
      pacItensCount: pacItems.length,
      isPublicado: true,
      dataAprovacaoConselho: timestamp,
      aprovadoPorConselho: true,
      observacoesConselho: observacoes,
      dataPublicacao: timestamp,
    };


    // Guardar estado consolidado no Firestore
    await setDoc(
      doc(db, "plano_institucional_estado", `ano_${ano}`),
      {
        ...workflowState,
        execucaoMensal,
        updatedAt: timestamp,
      },
      { merge: true }
    ).catch(() => {});

    return {
      paaItems,
      pacItems,
      execucaoMensal,
      workflowState,
    };
  },

  /**
   * Solicitar correções ao Plano Institucional
   */
  async requestCorrections(ano: number, notasCorrecao: string): Promise<void> {
    const timestamp = new Date().toISOString();
    await setDoc(
      doc(db, "plano_institucional_estado", `ano_${ano}`),
      {
        stage: "correcao_solicitada",
        observacoesConselho: notasCorrecao,
        dataDevolucao: timestamp,
        updatedAt: timestamp,
      },
      { merge: true }
    );
  },

  /**
   * Obter estado atual do Plano Institucional no Firestore
   */
  async getIntegratedWorkflowState(ano: number): Promise<IntegratedWorkflowState | null> {
    try {
      const snap = await getDocs(
        query(collection(db, "plano_institucional_estado"))
      );
      const found = snap.docs.find((d) => d.id === `ano_${ano}`);
      if (found && found.exists()) {
        return found.data() as IntegratedWorkflowState;
      }
      return null;
    } catch (e) {
      console.error("Erro ao carregar estado do plano integrado:", e);
      return null;
    }
  },
};

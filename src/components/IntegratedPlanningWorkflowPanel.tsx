import React, { useState, useEffect, useMemo } from "react";
import {
  FileText,
  Building,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Box,
  Truck,
  Calendar,
  Clock,
  Send,
  AlertTriangle,
  BarChart3,
  Brain,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Printer,
  RefreshCw,
  Eye,
  Check,
  X,
  Play,
  RotateCcw
} from "lucide-react";
import { MatrixActivity } from "../types";
import {
  integratedPlanningWorkflowService,
  IntegratedPAAItem,
  IntegratedPACItem,
  PlanoExecucaoMensal,
  IntegratedWorkflowState
} from "../lib/integratedPlanningWorkflowService";

interface IntegratedPlanningWorkflowPanelProps {
  user: any;
  activities: MatrixActivity[];
  ano?: number;
  onRefreshData?: () => void;
  onNavigateToModule?: (moduleTitle: string) => void;
  onShowAlert?: (msg: string, type?: string) => void;
}

export const IntegratedPlanningWorkflowPanel: React.FC<IntegratedPlanningWorkflowPanelProps> = ({
  user,
  activities = [],
  ano = new Date().getFullYear(),
  onRefreshData,
  onNavigateToModule,
  onShowAlert,
}) => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(5); // Default: Conselho de Representantes
  const [paaItems, setPaaItems] = useState<IntegratedPAAItem[]>([]);
  const [pacItems, setPacItems] = useState<IntegratedPACItem[]>([]);
  const [execucaoMensal, setExecucaoMensal] = useState<PlanoExecucaoMensal[]>([]);
  const [workflowState, setWorkflowState] = useState<IntegratedWorkflowState | null>(null);
  const [activeTab, setActiveTab] = useState<"fluxo" | "paa_pac" | "execucao_mensal" | "monitoria">("fluxo");
  const [observacoesConselho, setObservacoesConselho] = useState(
    "Aprovado por unanimidade na Sessão Plenária do Conselho de Representantes."
  );

  const totalOrcamento = useMemo(() => {
    return activities.reduce((acc, a) => acc + Number(a.valor || a.custoTotal || a.total || 0), 0);
  }, [activities]);

  // Carregar estado ao iniciar
  useEffect(() => {
    async function loadState() {
      const state = await integratedPlanningWorkflowService.getIntegratedWorkflowState(ano);
      if (state) {
        setWorkflowState(state);
        if (state.stage === "aprovado") {
          setCurrentStep(7);
        }
      }
    }
    loadState();
  }, [ano]);

  // Execução do acionamento automático de aprovação
  const handleAprovarConselho = async () => {
    setLoading(true);
    try {
      const result = await integratedPlanningWorkflowService.approveInstitutionalPlanAndTriggerWorkflow(
        activities,
        ano,
        user?.name || "Conselho de Representantes",
        observacoesConselho
      );

      setPaaItems(result.paaItems);
      setPacItems(result.pacItems);
      setExecucaoMensal(result.execucaoMensal);
      setWorkflowState(result.workflowState);
      setCurrentStep(7);

      if (onShowAlert) {
        onShowAlert(
          "Plano Institucional Aprovado! PAA, PAC e Plano de Execução gerados e encaminhados à UGEA com sucesso.",
          "success"
        );
      }
      if (onRefreshData) onRefreshData();
    } catch (e) {
      console.error("Erro na aprovação do plano:", e);
      if (onShowAlert) onShowAlert("Erro ao aprovar plano institucional.", "error");
    } finally {
      setLoading(false);
    }
  };

  const stepsList = [
    { num: 1, label: "1. Elaboração Departamental", desc: "Planos anuais dos departamentos com atividades e orçamento", icon: FileText },
    { num: 2, label: "2. Consolidação da Direção", desc: "Agregação de atividades e remoção de duplicados na Direção", icon: Building },
    { num: 3, label: "3. Consolidação Institucional", desc: "Consolidação global das metas e orçamento pelo Setor de Planificação", icon: Layers },
    { num: 4, label: "4. Revisão Técnica (DPEP)", desc: "Validação de consistência técnica e alinhamento estratégico", icon: ShieldCheck },
    { num: 5, label: "5. Apreciação e Aprovação", desc: "Deliberação e aprovação pelo Conselho de Representantes", icon: CheckCircle2 },
    { num: 6, label: "6. Extração Automática PAA & PAC", desc: "Extração de aquisições e contratações para tramitação na UGEA", icon: Box },
    { num: 7, label: "7. Encaminhamento & Execução", desc: "Plano de Execução mensal publicado para toda a instituição", icon: Send },
  ];

  return (
    <div className="w-full space-y-6">
      {/* HEADER DO PROCESSO INTEGRADO */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-6 rounded-3xl shadow-xl border border-indigo-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              Processo Unificado SIGEP
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles size={12} />
              Regra Institucional Fundamental Ativa
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            Ciclo de Planificação, Aprovação, Execução & Contratação Pública
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Nenhuma atividade é executada sem plano aprovado. A aprovação gera automaticamente o Plano Anual de Aquisições (PAA), o Plano Anual de Contratações (PAC) e o Plano de Execução Mensal publicado em tempo real.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-bold text-indigo-200 border border-white/10">
            Exercício: <strong className="text-white text-sm font-black">{ano}</strong>
          </span>
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">
            {workflowState?.isPublicado ? "✅ Plano Publicado & Ativo" : "⏳ Em Fase de Deliberação"}
          </span>
        </div>
      </div>

      {/* NAVEGAÇÃO DE TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("fluxo")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === "fluxo"
              ? "bg-indigo-900 text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Layers size={16} />
          1. Workflow de Aprovação
        </button>
        <button
          onClick={() => setActiveTab("paa_pac")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === "paa_pac"
              ? "bg-indigo-900 text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Box size={16} />
          2. PAA & PAC Automáticos (UGEA)
        </button>
        <button
          onClick={() => setActiveTab("execucao_mensal")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === "execucao_mensal"
              ? "bg-indigo-900 text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Calendar size={16} />
          3. Plano de Execução Mensal
        </button>
        <button
          onClick={() => setActiveTab("monitoria")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === "monitoria"
              ? "bg-indigo-900 text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <BarChart3 size={16} />
          4. Monitoria em Tempo Real
        </button>
      </div>

      {/* TEMA 1: PIPELINE / WORKFLOW DE APROVAÇÃO */}
      {activeTab === "fluxo" && (
        <div className="space-y-6">
          {/* VISUALIZADOR DE ETAPAS */}
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_0px_#0f172a] space-y-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Clock size={18} className="text-indigo-600" />
              Progresso do Ciclo Institucional (Etapas 1 a 7)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
              {stepsList.map((st) => {
                const IconComp = st.icon;
                const isCompleted = workflowState?.isPublicado || currentStep > st.num;
                const isCurrent = currentStep === st.num;

                return (
                  <div
                    key={st.num}
                    onClick={() => setCurrentStep(st.num)}
                    className={`p-3 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between space-y-2 ${
                      isCompleted
                        ? "bg-emerald-50 border-emerald-600 text-emerald-950"
                        : isCurrent
                        ? "bg-indigo-50 border-indigo-600 text-indigo-950 ring-2 ring-indigo-400"
                        : "bg-slate-50 border-slate-300 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase font-mono">Etapa {st.num}</span>
                      {isCompleted ? (
                        <CheckCircle2 size={16} className="text-emerald-600" />
                      ) : (
                        <IconComp size={16} className={isCurrent ? "text-indigo-600" : "text-slate-400"} />
                      )}
                    </div>
                    <div className="text-xs font-black leading-tight">{st.label}</div>
                    <p className="text-[9px] font-medium leading-tight opacity-80">{st.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PAINEL DE DELIBERAÇÃO DO CONSELHO DE REPRESENTANTES (ETAPA 5) */}
          <div className="bg-slate-900 border-2 border-indigo-500/50 rounded-3xl p-6 text-white shadow-2xl space-y-5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-2xl text-white shadow-lg">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-base font-black uppercase tracking-wider">
                    Apreciação e Aprovação do Conselho de Representantes
                  </h4>
                  <p className="text-xs text-slate-400">
                    Sessão Plenária de deliberação do Plano Institucional Consolidado.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-white/10 px-3 py-1.5 rounded-xl">
                  {activities.length} Atividades | {totalOrcamento.toLocaleString()} MT
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 block">
                Parecer / Observações do Conselho:
              </label>
              <textarea
                value={observacoesConselho}
                onChange={(e) => setObservacoesConselho(e.target.value)}
                rows={2}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                disabled={loading}
                onClick={handleAprovarConselho}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? <RefreshCw className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
                <span>Aprovar Plano Institucional & Disparar PAA/PAC</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TEMA 2: PAA & PAC AUTOMÁTICOS (UGEA) */}
      {activeTab === "paa_pac" && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_0px_#0f172a] space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-black uppercase text-slate-900 tracking-tight flex items-center gap-2">
                  <Box className="text-amber-600" size={20} />
                  Plano Anual de Aquisições (PAA) Extraído Automáticamente
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Itens de bens, equipamentos e materiais identificados no Plano Institucional Aprovado.
                </p>
              </div>
              <button
                onClick={() => onNavigateToModule && onNavigateToModule("UGEA")}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase rounded-xl transition cursor-pointer"
              >
                Aceder ao Módulo da UGEA
              </button>
            </div>

            {paaItems.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-medium">
                Nenhum item PAA gerado ainda. Clique em "Aprovar Plano Institucional" no separador Workflow para extrair automaticamente.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-800 uppercase font-black">
                    <tr>
                      <th className="p-2.5 border">Bem / Serviço</th>
                      <th className="p-2.5 border text-center">Qtd</th>
                      <th className="p-2.5 border">Setor Requisitante</th>
                      <th className="p-2.5 border text-right">Valor Estimado</th>
                      <th className="p-2.5 border text-center">Mês Previsto</th>
                      <th className="p-2.5 border text-center">Estado UGEA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paaItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 font-medium">
                        <td className="p-2.5 border font-bold text-slate-900">{item.bemOuServico}</td>
                        <td className="p-2.5 border text-center">{item.quantidade}</td>
                        <td className="p-2.5 border">{item.setorRequisitante}</td>
                        <td className="p-2.5 border text-right font-mono font-bold text-emerald-700">
                          {item.valorEstimado.toLocaleString()} MT
                        </td>
                        <td className="p-2.5 border text-center">{item.mesPrevisto}</td>
                        <td className="p-2.5 border text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                            {item.statusUgea}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TEMA 3: PLANO DE EXECUÇÃO MENSAL */}
      {activeTab === "execucao_mensal" && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_0px_#0f172a] space-y-4">
            <h3 className="text-base font-black uppercase text-slate-900 tracking-tight flex items-center gap-2">
              <Calendar className="text-indigo-600" size={20} />
              Plano de Execução Distribuído Mês a Mês (Janeiro a Dezembro)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
              ].map((m, idx) => {
                const mesData = execucaoMensal.find((x) => x.mes === m);
                const qtdActs = mesData?.atividades.length || 0;

                return (
                  <div
                    key={m}
                    className="p-4 rounded-2xl border-2 border-slate-900 bg-slate-50 space-y-2 shadow-[2px_2px_0px_0px_#0f172a]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-slate-900">{m}</span>
                      <span className="text-[10px] font-bold bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-full">
                        {qtdActs} Atividades
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                      Atividades programadas e associadas ao responsável e orçamento da área.
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TEMA 4: MONITORIA EM TEMPO REAL */}
      {activeTab === "monitoria" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#0f172a]">
              <span className="text-[10px] font-black uppercase text-slate-500 block">Total Atividades</span>
              <span className="text-2xl font-black text-slate-900">{activities.length}</span>
            </div>
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#0f172a]">
              <span className="text-[10px] font-black uppercase text-slate-500 block">Aprovadas no Conselho</span>
              <span className="text-2xl font-black text-emerald-700">
                {activities.filter((a) => a.status === "Plano Institucional Aprovado" || a.planoAprovado).length}
              </span>
            </div>
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#0f172a]">
              <span className="text-[10px] font-black uppercase text-slate-500 block">Processos PAA/PAC UGEA</span>
              <span className="text-2xl font-black text-amber-700">{paaItems.length + pacItems.length}</span>
            </div>
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#0f172a]">
              <span className="text-[10px] font-black uppercase text-slate-500 block">Orçamento Global</span>
              <span className="text-2xl font-black text-indigo-950">{totalOrcamento.toLocaleString()} MT</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

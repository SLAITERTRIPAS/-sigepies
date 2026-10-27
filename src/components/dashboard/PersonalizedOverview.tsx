import React, { useState, useMemo } from "react";
import {
  Target,
  BarChart3,
  AlertTriangle,
  Folder,
  Calendar,
  Bot,
  ArrowRight,
  Users,
  Box,
  Building2,
  DollarSign,
  Briefcase,
  FileText,
  BookOpen,
  Cpu,
  Layers,
  Truck,
  Globe,
  ChevronRight,
  X,
  Download,
  Sparkles,
  UserCheck,
  FileCheck,
  History,
  PieChart,
  Search,
  ExternalLink,
  ShieldCheck,
  LayoutGrid
} from "lucide-react";

export type ProfileType =
  | "admin_geral"
  | "diretor_instituicao"
  | "coordenador_curso"
  | "secretaria_academica"
  | "departamento_financeiro"
  | "monitoria_avaliacao"
  | "ugea";

interface PersonalizedOverviewProps {
  user: any;
  title?: string;
  colaboradores?: any[];
  processos?: any[];
  estudantes?: any[];
  activities?: any[];
  matrixActivities?: any[];
  financialData?: any;
  serviceRequests?: any[];
  suppliers?: any[];
  events?: any[];
  onNavigate: (item: string) => void;
}

export function detectUserProfile(user: any, workspaceTitle?: string): ProfileType {
  const normTitle = (workspaceTitle || "").toLowerCase();
  const normCargo = (user?.cargoChefia || user?.cargo || user?.role || user?.title || "").toLowerCase();
  const normDept = (user?.departamento || user?.direcao || user?.setor || "").toLowerCase();

  if (normTitle.includes("ugea") || normCargo.includes("ugea") || normDept.includes("ugea")) {
    return "ugea";
  }
  if (normTitle.includes("finan") || normCargo.includes("finan") || normDept.includes("finan")) {
    return "departamento_financeiro";
  }
  if (normTitle.includes("dpep") || normTitle.includes("monitoria") || normCargo.includes("dpep")) {
    return "monitoria_avaliacao";
  }
  if (normTitle.includes("secretaria acad") || normCargo.includes("secretaria acad")) {
    return "secretaria_academica";
  }
  if (normTitle.includes("curso") || normCargo.includes("coordenador") || normCargo.includes("diretor de curso")) {
    return "coordenador_curso";
  }
  if (normTitle.includes("diretor-geral") || normCargo.includes("diretor-geral") || normCargo.includes("diretor geral")) {
    return "diretor_instituicao";
  }
  return "admin_geral";
}

type CardType =
  | "resumo"
  | "rh"
  | "pedagogica"
  | "daf"
  | "planificacao"
  | "ugea"
  | "biblioteca"
  | "informatica"
  | "patrimonio"
  | "frota"
  | "relacoes"
  | "alertas"
  | "metas"
  | "indicadores"
  | "processos"
  | "atividades"
  | "ia_insights";

type DeepDiveTab =
  | "resumo"
  | "indicadores_metas"
  | "atividades"
  | "orcamento"
  | "responsaveis"
  | "documentos"
  | "historico"
  | "ia_analise";

export const PersonalizedOverview: React.FC<PersonalizedOverviewProps> = ({
  user,
  title,
  colaboradores = [],
  processos = [],
  estudantes = [],
  activities = [],
  matrixActivities = [],
  financialData,
  serviceRequests = [],
  suppliers = [],
  events = [],
  onNavigate,
}) => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [activeTab, setActiveTab] = useState<DeepDiveTab>("resumo");
  const [searchTerm, setSearchTerm] = useState("");

  const userName = useMemo(() => {
    const raw = user?.nome || user?.name || user?.nomeCompleto || user?.nomeReal || "Manuel Augusto";
    const parts = String(raw).trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0]} ${parts[parts.length - 1]}`;
    }
    return raw;
  }, [user]);

  const stats = useMemo(() => {
    const allActs = [...matrixActivities, ...activities];
    const totalActs = allActs.length;
    const concluidas = allActs.filter((a) =>
      (a.status || "").toLowerCase().includes("conclu") || (a.status || "").toLowerCase().includes("executad")
    ).length;
    const emCurso = allActs.filter((a) =>
      (a.status || "").toLowerCase().includes("curso") || (a.status || "").toLowerCase().includes("progresso")
    ).length;

    const percentMetas = totalActs > 0 ? Math.round((concluidas / totalActs) * 100) : 87;
    const totalIndicadores = 126;
    const alertasCriticos = 5;
    const processosPendentes = serviceRequests.length > 0 ? serviceRequests.length : 42;
    const atividadesEmCurso = emCurso > 0 ? emCurso : 18;
    const iaRecomendacoes = 3;

    return {
      percentMetas,
      totalIndicadores,
      alertasCriticos,
      processosPendentes,
      atividadesEmCurso,
      iaRecomendacoes,
    };
  }, [matrixActivities, activities, serviceRequests]);

  const getCardDetails = (card: CardType) => {
    switch (card) {
      case "resumo":
        return {
          title: "Centro de Informação - Resumo Executivo Institucional",
          subtitle: "Visão Geral de Todas as Unidades Orgânicas",
          moduleTarget: "Relatórios",
          badge: "Consolidado Geral",
          badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/40",
          summaryText: "Resumo executivo consolidado abrangendo todas as unidades orgânicas da instituição, indicadores de desempenho, estado de execução dos planos e relatórios estratégicos.",
          metrics: [
            { label: "Unidades Orgânicas", value: "12", sub: "Ativas" },
            { label: "Colaboradores", value: String(colaboradores.length || 145), sub: "Efetivo total" },
            { label: "Estudantes", value: String(estudantes.length || 1280), sub: "Matriculados" },
            { label: "Taxa de Execução", value: `${stats.percentMetas}%`, sub: "Global" },
          ],
          indicadores: [
            { nome: "Desempenho Geral Institucional", meta: "95%", atual: "91%", status: "Excelente" },
            { nome: "Conformidade Normativa", meta: "100%", atual: "98.5%", status: "Superado" },
          ],
          responsaveis: [{ nome: "Diretor-Geral", cargo: "Autoridade Máxima", setor: "Gabinete do DG" }],
          iaAnalysis: "A consolidação institucional aponta para cumprimento integral dos objetivos estratégicos do trimestre.",
        };

      case "rh":
        return {
          title: "Centro de Informação - Recursos Humanos (RH)",
          subtitle: "Efetivo, Género, Formação, Vínculos e Necessidades de Pessoal",
          moduleTarget: "Gestão de Pessoal",
          badge: `${colaboradores.length || 145} Colaboradores`,
          badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/40",
          summaryText: "Gestão completa do quadro de pessoal, distribuição por género, qualificações académicas, tipologia de vínculos contratuais e levantamento de necessidades de novas contratações.",
          metrics: [
            { label: "Total Efetivo", value: String(colaboradores.length || 145), sub: "Quadro" },
            { label: "Docentes", value: "98", sub: "Corpo Docente" },
            { label: "CTA", value: "47", sub: "Técnico-Administrativos" },
            { label: "Necessidades", value: "8", sub: "Vagas a prover" },
          ],
          indicadores: [
            { nome: "Taxa de Cobertura do Quadro", meta: "95%", atual: "90%", status: "Em Rota" },
            { nome: "Colaboradores em Formação", meta: "30", atual: "24", status: "Em Rota" },
          ],
          responsaveis: [{ nome: "Chefe do DRH", cargo: "Gestão de Recursos Humanos", setor: "DICOSAFA - RH" }],
          iaAnalysis: "Recomenda-se abrir concurso para 3 assistentes estagiários no departamento de engenharia eletrotécnica.",
        };

      case "pedagogica":
        return {
          title: "Centro de Informação - Área Pedagógica",
          subtitle: "Estudantes, Cursos, Docentes, Resultados e Aproveitamento",
          moduleTarget: "Gestão Académica",
          badge: `${estudantes.length || 1280} Estudantes`,
          badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/40",
          summaryText: "Monitoria do corpo discente, desempenho académico por curso, taxas de aprovação, rácio docente/estudante e resultados das avaliações semestrais.",
          metrics: [
            { label: "Estudantes", value: String(estudantes.length || 1280), sub: "Ativos" },
            { label: "Cursos", value: "12", sub: "Licenciaturas" },
            { label: "Taxa de Aprovação", value: "84.5%", sub: "Média Global" },
            { label: "Rácio Doc./Est.", value: "1:22", sub: "Ideal" },
          ],
          indicadores: [
            { nome: "Aproveitamento Pedagógico", meta: "85%", atual: "84.5%", status: "Em Rota" },
          ],
          responsaveis: [{ nome: "Diretor Pedagógico", cargo: "Gestão Académica", setor: "DICOSSER" }],
          iaAnalysis: "O aproveitamento nas disciplinas de ciências exatas registou subida de 6.2% face ao semestre anterior.",
        };

      case "daf":
        return {
          title: "Centro de Informação - Departamento Administrativo e Financeiro (DAF)",
          subtitle: "Receitas, Despesas, Orçamento e Execução Financeira",
          moduleTarget: "Balanço",
          badge: "Orçamento Executado",
          badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
          summaryText: "Controlo orçamental em tempo real, fluxo de caixa, arrecadação de receitas próprias, execução de despesas por rubrica e balanço financeiro.",
          metrics: [
            { label: "Orçamento Aprovado", value: "4.85M MT", sub: "Anual" },
            { label: "Executado", value: "3.92M MT", sub: "80.8%" },
            { label: "Receitas Próprias", value: "1.24M MT", sub: "Arrecadadas" },
            { label: "Saldo Disponível", value: "930k MT", sub: "Tesouraria" },
          ],
          indicadores: [
            { nome: "Taxa de Execução Orçamental", meta: "90%", atual: "80.8%", status: "Em Rota" },
          ],
          responsaveis: [{ nome: "Chefe de Finanças", cargo: "Gestão Orçamental", setor: "DICOSAFA - Finanças" }],
          iaAnalysis: "A rubrica de investimento apresenta boa cadência de execução. Atenção à rubrica de bens correntes.",
        };

      case "planificacao":
        return {
          title: "Centro de Informação - Planificação",
          subtitle: "Planos Anuais, Atividades, Metas e Execução Orçamental",
          moduleTarget: "Planos de Atividades",
          badge: `${stats.percentMetas}% Metas`,
          badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/40",
          summaryText: "Acompanhamento do ciclo de planificação, consolidação dos planos departamentais, grau de cumprimento das metas e alinhamento estratégico.",
          metrics: [
            { label: "Atividades Totais", value: "184", sub: "No Plano" },
            { label: "Concluídas", value: "126", sub: "68.4%" },
            { label: "Em Curso", value: String(stats.atividadesEmCurso), sub: "Ativas" },
            { label: "Metas Atingidas", value: `${stats.percentMetas}%`, sub: "Sucesso" },
          ],
          indicadores: [
            { nome: "Cumprimento do Plano Anual", meta: "100%", atual: "92%", status: "Em Rota" },
          ],
          responsaveis: [{ nome: "Diretor do DPEP", cargo: "Planificação e Estudos", setor: "DPEP" }],
          iaAnalysis: "Alinhamento de 100% entre os planos departamentais e as diretrizes do Conselho de Representantes.",
        };

      case "ugea":
        return {
          title: "Centro de Informação - UGEA (Aquisições e Contratações)",
          subtitle: "Aquisições, Concursos, Contratos e Processos Pendentes",
          moduleTarget: "Plano de Aquisição",
          badge: `${stats.processosPendentes} Processos`,
          badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/40",
          summaryText: "Gestão do Plano Anual de Aquisições (PAA), lançamento de concursos públicos, adjudicações, contratos de fornecimento e controlo de pendências.",
          metrics: [
            { label: "Processos PAA", value: "64", sub: "Total" },
            { label: "Concursos Abertos", value: "4", sub: "Em curso" },
            { label: "Contratos Vigentes", value: "18", sub: "Ativos" },
            { label: "Pendentes UGEA", value: String(stats.processosPendentes), sub: "Aguardando" },
          ],
          indicadores: [
            { nome: "Execução do PAA", meta: "100%", atual: "78%", status: "Em Rota" },
          ],
          responsaveis: [{ nome: "Chefe da UGEA", cargo: "Gestão de Aquisições", setor: "UGEA" }],
          iaAnalysis: "Recomenda-se celeridade na tramitação dos processos de aquisição de material de laboratório.",
        };

      case "biblioteca":
        return {
          title: "Centro de Informação - Biblioteca",
          subtitle: "Acervo Bibliográfico, Exemplares e Necessidades por Curso",
          moduleTarget: "Gestão de Biblioteca",
          badge: "Acervo Ativo",
          badgeColor: "bg-teal-500/20 text-teal-400 border-teal-500/40",
          summaryText: "Inventário do acervo bibliográfico físico e digital, empréstimos ativos, frequência de estudantes e levantamento de novas obras necessárias por curso.",
          metrics: [
            { label: "Obras Catalogadas", value: "4,250", sub: "Volumes" },
            { label: "Empréstimos (Mês)", value: "310", sub: "Ativos" },
            { label: "Leitores Registados", value: "1,120", sub: "Utilizadores" },
            { label: "Novas Aquisições", value: "150", sub: "Requeridas" },
          ],
          indicadores: [
            { nome: "Taxa de Rotatividade do Acervo", meta: "40%", atual: "45%", status: "Superado" },
          ],
          responsaveis: [{ nome: "Chefe da Biblioteca", cargo: "Gestão Documental", setor: "DICOSSER - Biblioteca" }],
          iaAnalysis: "Necessidade de reforçar exemplares de Engenharia de Software e Energias Renováveis.",
        };

      case "informatica":
        return {
          title: "Centro de Informação - Informática (TIC)",
          subtitle: "Equipamentos Funcionais, Avariados e Necessidades Tecnológicas",
          moduleTarget: "Sistema",
          badge: "99.7% Uptime",
          badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
          summaryText: "Monitoria da infraestrutura de rede, parque informático institucional, computadores funcionais, avarias registadas e plano de renovação tecnológica.",
          metrics: [
            { label: "Computadores", value: "240", sub: "Parque Total" },
            { label: "Operacionais", value: "222", sub: "92.5%" },
            { label: "Em Manutenção", value: "18", sub: "Avariados" },
            { label: "Disponibilidade Redes", value: "99.7%", sub: "Uptime" },
          ],
          indicadores: [
            { nome: "Resolução de Avarias TIC", meta: "24h", atual: "14h", status: "Superado" },
          ],
          responsaveis: [{ nome: "Chefe do Departamento TIC", cargo: "Infraestrutura Tecnológica", setor: "DICOSAFA - TIC" }],
          iaAnalysis: "Recomenda-se substituição programada de 20 computadores do laboratório 2 com mais de 6 anos de uso.",
        };

      case "patrimonio":
        return {
          title: "Centro de Informação - Património",
          subtitle: "Inventário, Conservação, Bens e Manutenção",
          moduleTarget: "Gestão Patrimonial",
          badge: "Bens Inventariados",
          badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/40",
          summaryText: "Controlo de bens móveis e imóveis, inventário geral atualizado, estado de conservação das instalações e plano de manutenção preventiva.",
          metrics: [
            { label: "Bens Registados", value: "1,850", sub: "Itens" },
            { label: "Bom Estado", value: "1,620", sub: "Conservados" },
            { label: "Necessitam Reparo", value: "230", sub: "Manutenção" },
            { label: "Edifícios", value: "8", sub: "Campus Songo" },
          ],
          indicadores: [
            { nome: "Conclusão do Inventário Anual", meta: "100%", atual: "94%", status: "Em Rota" },
          ],
          responsaveis: [{ nome: "Chefe de Património", cargo: "Gestão de Bens", setor: "DICOSAFA - Património" }],
          iaAnalysis: "Concluída a inventariação dos novos equipamentos laboratoriais recebidos no trimestre.",
        };

      case "frota":
        return {
          title: "Centro de Informação - Gestão da Frota",
          subtitle: "Viaturas Operacionais, Avarias, Combustível e Custos",
          moduleTarget: "Gestão de Frota",
          badge: "Frota Ativa",
          badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/40",
          summaryText: "Monitoria de viaturas afetas à instituição, controlo de quilometragem, consumo de combustível, manutenções periódicas e gestão de motoristas.",
          metrics: [
            { label: "Viaturas Totais", value: "14", sub: "Frota" },
            { label: "Operacionais", value: "11", sub: "Em serviço" },
            { label: "Em Oficina", value: "3", sub: "Reparação" },
            { label: "Consumo Mensal", value: "4,200L", sub: "Combustível" },
          ],
          indicadores: [
            { nome: "Disponibilidade da Frota", meta: "90%", atual: "78.5%", status: "Atenção" },
          ],
          responsaveis: [{ nome: "Responsável de Transportes", cargo: "Gestão de Frota", setor: "DICOSAFA - Transportes" }],
          iaAnalysis: "Duas viaturas aguardam peças de substituição para conclusão da revisão periódica.",
        };

      case "relacoes":
        return {
          title: "Centro de Informação - Relações Exteriores e Cooperação",
          subtitle: "Parcerias, Protocolos, Cooperação e Mobilidade",
          moduleTarget: "Planos de Atividades",
          badge: "12 Protocolos",
          badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/40",
          summaryText: "Gestão de acordos de cooperação nacional e internacional, parcerias estratégicas com o tecido empresarial, protocolos universitários e programas de mobilidade académica.",
          metrics: [
            { label: "Protocolos Ativos", value: "12", sub: "Institucionais" },
            { label: "Parceiros Internacionais", value: "5", sub: "Universidades" },
            { label: "Estudantes em Mobilidade", value: "14", sub: "Intercâmbio" },
            { label: "Projectos Conjuntos", value: "3", sub: "Em execução" },
          ],
          indicadores: [
            { nome: "Execução de Acordos de Parceria", meta: "100%", atual: "88%", status: "Em Rota" },
          ],
          responsaveis: [{ nome: "Chefe de Cooperação", cargo: "Relações Exteriores", setor: "DCRE" }],
          iaAnalysis: "Novo protocolo de estágio profissional em negociação com empresa energética da região.",
        };

      case "alertas":
      default:
        return {
          title: "Centro de Informação - Alertas e Decisões Prioritárias",
          subtitle: "Atividades Atrasadas, Orçamento em Risco, Contratos a Expirar e Decisões Críticas",
          moduleTarget: "Alertas",
          badge: `${stats.alertasCriticos} Prioritários`,
          badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/40",
          summaryText: "Painel de decisão rápida para o Dirigente Máximo. Agrega atividades em atraso, rubricas orçamentais em risco, contratos próximos do termo e bloqueios que exigem intervenção executiva.",
          metrics: [
            { label: "Alertas Críticos", value: String(stats.alertasCriticos), sub: "Urgência" },
            { label: "Contratos a Expirar", value: "3", sub: "Próximos 30 dias" },
            { label: "Atividades em Atraso", value: "2", sub: "Requer despacho" },
            { label: "Pendências de Assinatura", value: "12", sub: "Aguardando DG" },
          ],
          indicadores: [
            { nome: "Taxa de Resolução de Alertas", meta: "95%", atual: "91%", status: "Em Rota" },
          ],
          responsaveis: [{ nome: "Gabinete do Diretor-Geral", cargo: "Despacho Executivo", setor: "GDG" }],
          iaAnalysis: "Requer despacho urgente sobre a renovação do contrato de fornecimento de energia e aprovação de 3 minutas de parceria.",
        };
    }
  };

  const cardDetails = selectedCard ? getCardDetails(selectedCard) : null;

  return (
    <div className="w-full min-h-screen bg-[#070d19] text-white p-3 sm:p-6 md:p-8 rounded-3xl relative overflow-hidden font-sans border border-slate-800/80 shadow-2xl">
      {/* Brilho Azul Radial Superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-blue-600/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* CABEÇALHO PRINCIPAL DA VISÃO GERAL INSTITUCIONAL */}
        <div className="flex flex-col items-center justify-center text-center space-y-2 pt-2">
          {/* BANDEIRA DE ACCENT MOÇAMBIQUE */}
          <div className="flex items-center gap-1.5 justify-center mb-1">
            <div className="h-1 w-12 bg-emerald-500 rounded-full" />
            <div className="h-1 w-12 bg-black border border-slate-700 rounded-full" />
            <div className="h-1 w-12 bg-amber-400 rounded-full" />
            <div className="h-1 w-12 bg-rose-600 rounded-full" />
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-600 to-emerald-500 p-0.5 shadow-lg">
              <div className="w-full h-full bg-[#070d19] rounded-full flex items-center justify-center text-amber-400">
                <ShieldCheck size={22} />
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-[0.15em] font-sans">
              VISÃO GERAL INSTITUCIONAL
            </h1>
          </div>

          <p className="text-sm sm:text-base text-slate-300 font-medium tracking-wide">
            Painel Executivo do Dirigente Máximo — Bem-vindo, <span className="text-white font-bold">{userName}</span>
          </p>
        </div>

        {/* GRELHA DE CARTÕES INTERATIVOS DA VISÃO GERAL INSTITUCIONAL (11 CARTÕES EXATOS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {/* 1. RESUMO EXECUTIVO */}
          <div
            onClick={() => { setSelectedCard("resumo"); setActiveTab("resumo"); }}
            className="bg-[#0f172a]/95 hover:bg-[#152238] border border-slate-800 hover:border-blue-500/60 rounded-2xl p-5 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between space-y-4 group hover:-translate-y-1"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <LayoutGrid size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">Resumo Executivo</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-normal leading-relaxed">
                  Resumo executivo de todas as unidades orgânicas da instituição.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 text-blue-400 group-hover:text-blue-300 text-xs font-bold tracking-wide transition-colors pt-1">
              <span>Ver Detalhes</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. RH */}
          <div
            onClick={() => { setSelectedCard("rh"); setActiveTab("resumo"); }}
            className="bg-[#0f172a]/95 hover:bg-[#152238] border border-slate-800 hover:border-indigo-500/60 rounded-2xl p-5 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between space-y-4 group hover:-translate-y-1"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <Users size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">RH</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-normal leading-relaxed">
                  Efectivo, género, formação, vínculos e necessidades de pessoal.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 text-blue-400 group-hover:text-blue-300 text-xs font-bold tracking-wide transition-colors pt-1">
              <span>Ver Detalhes</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. ÁREA PEDAGÓGICA */}
          <div
            onClick={() => { setSelectedCard("pedagogica"); setActiveTab("resumo"); }}
            className="bg-[#0f172a]/95 hover:bg-[#152238] border border-slate-800 hover:border-purple-500/60 rounded-2xl p-5 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between space-y-4 group hover:-translate-y-1"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <BookOpen size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">Área Pedagógica</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-normal leading-relaxed">
                  Estudantes, cursos, docentes, resultados e aproveitamento.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 text-blue-400 group-hover:text-blue-300 text-xs font-bold tracking-wide transition-colors pt-1">
              <span>Ver Detalhes</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 4. DAF */}
          <div
            onClick={() => { setSelectedCard("daf"); setActiveTab("resumo"); }}
            className="bg-[#0f172a]/95 hover:bg-[#152238] border border-slate-800 hover:border-emerald-500/60 rounded-2xl p-5 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between space-y-4 group hover:-translate-y-1"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <DollarSign size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">DAF</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-normal leading-relaxed">
                  Receitas, despesas, orçamento e execução financeira.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 text-blue-400 group-hover:text-blue-300 text-xs font-bold tracking-wide transition-colors pt-1">
              <span>Ver Detalhes</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 5. PLANIFICAÇÃO */}
          <div
            onClick={() => { setSelectedCard("planificacao"); setActiveTab("resumo"); }}
            className="bg-[#0f172a]/95 hover:bg-[#152238] border border-slate-800 hover:border-amber-500/60 rounded-2xl p-5 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between space-y-4 group hover:-translate-y-1"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <Calendar size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">Planificação</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-normal leading-relaxed">
                  Planos anuais, atividades, metas e execução orçamental.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 text-blue-400 group-hover:text-blue-300 text-xs font-bold tracking-wide transition-colors pt-1">
              <span>Ver Detalhes</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 6. UGEA */}
          <div
            onClick={() => { setSelectedCard("ugea"); setActiveTab("resumo"); }}
            className="bg-[#0f172a]/95 hover:bg-[#152238] border border-slate-800 hover:border-cyan-500/60 rounded-2xl p-5 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between space-y-4 group hover:-translate-y-1"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <FileText size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">UGEA</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-normal leading-relaxed">
                  Aquisições, concursos, contratos e processos pendentes.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 text-blue-400 group-hover:text-blue-300 text-xs font-bold tracking-wide transition-colors pt-1">
              <span>Ver Detalhes</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 7. BIBLIOTECA */}
          <div
            onClick={() => { setSelectedCard("biblioteca"); setActiveTab("resumo"); }}
            className="bg-[#0f172a]/95 hover:bg-[#152238] border border-slate-800 hover:border-teal-500/60 rounded-2xl p-5 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between space-y-4 group hover:-translate-y-1"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <Box size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">Biblioteca</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-normal leading-relaxed">
                  Acervo bibliográfico, exemplares e necessidades por curso.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 text-blue-400 group-hover:text-blue-300 text-xs font-bold tracking-wide transition-colors pt-1">
              <span>Ver Detalhes</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 8. INFORMÁTICA */}
          <div
            onClick={() => { setSelectedCard("informatica"); setActiveTab("resumo"); }}
            className="bg-[#0f172a]/95 hover:bg-[#152238] border border-slate-800 hover:border-sky-500/60 rounded-2xl p-5 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between space-y-4 group hover:-translate-y-1"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <Cpu size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">Informática</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-normal leading-relaxed">
                  Equipamentos funcionais, avariados e necessidades tecnológicas.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 text-blue-400 group-hover:text-blue-300 text-xs font-bold tracking-wide transition-colors pt-1">
              <span>Ver Detalhes</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 9. PATRIMÓNIO */}
          <div
            onClick={() => { setSelectedCard("patrimonio"); setActiveTab("resumo"); }}
            className="bg-[#0f172a]/95 hover:bg-[#152238] border border-slate-800 hover:border-rose-500/60 rounded-2xl p-5 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between space-y-4 group hover:-translate-y-1"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <Building2 size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">Património</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-normal leading-relaxed">
                  Inventário, conservação, bens e manutenção.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 text-blue-400 group-hover:text-blue-300 text-xs font-bold tracking-wide transition-colors pt-1">
              <span>Ver Detalhes</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 10. GESTÃO DA FROTA */}
          <div
            onClick={() => { setSelectedCard("frota"); setActiveTab("resumo"); }}
            className="bg-[#0f172a]/95 hover:bg-[#152238] border border-slate-800 hover:border-orange-500/60 rounded-2xl p-5 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between space-y-4 group hover:-translate-y-1"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <Truck size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">Gestão da Frota</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-normal leading-relaxed">
                  Viaturas operacionais, avarias, combustível e custos.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 text-blue-400 group-hover:text-blue-300 text-xs font-bold tracking-wide transition-colors pt-1">
              <span>Ver Detalhes</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 11. RELAÇÕES EXTERIORES */}
          <div
            onClick={() => { setSelectedCard("relacoes"); setActiveTab("resumo"); }}
            className="bg-[#0f172a]/95 hover:bg-[#152238] border border-slate-800 hover:border-violet-500/60 rounded-2xl p-5 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between space-y-4 group hover:-translate-y-1"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-violet-500/20 border border-violet-500/40 text-violet-400 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <Globe size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">Relações Exteriores</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-normal leading-relaxed">
                  Parcerias, protocolos, cooperação e mobilidade.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 text-blue-400 group-hover:text-blue-300 text-xs font-bold tracking-wide transition-colors pt-1">
              <span>Ver Detalhes</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 12. ALERTAS E DECISÕES PRIORITÁRIAS */}
          <div
            onClick={() => { setSelectedCard("alertas"); setActiveTab("resumo"); }}
            className="bg-[#0f172a]/95 hover:bg-[#152238] border border-slate-800 hover:border-rose-600/60 rounded-2xl p-5 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between space-y-4 group hover:-translate-y-1 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-1"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-500 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">Alertas e Decisões Prioritárias</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-normal leading-relaxed">
                  Atividades atrasadas, orçamento em risco, contratos a expirar, falta de pessoal e problemas que exigem despacho.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 text-blue-400 group-hover:text-blue-300 text-xs font-bold tracking-wide transition-colors pt-1">
              <span>Ver Detalhes</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* MODAL / DRAWER INTERATIVO: CENTRO DE INFORMAÇÃO INTELIGENTE (NAVEGAÇÃO POR NÍVEIS) */}
      {selectedCard && cardDetails && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#0a1120] border border-slate-700/80 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
            {/* CABEÇALHO DO MODAL */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-[#0d182e] to-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase">
                  <span>Visão Geral Institucional</span>
                  <ChevronRight size={14} />
                  <span className="text-slate-300">{cardDetails.title.split("-")[1] || cardDetails.title}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  {cardDetails.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  {cardDetails.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${cardDetails.badgeColor}`}>
                  {cardDetails.badge}
                </span>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  title="Fechar (Esc)"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* BARRA DE NAVEGAÇÃO DE TABS PROGRESSIVAS */}
            <div className="flex items-center gap-1 p-2 bg-[#080d19] border-b border-slate-800 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab("resumo")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === "resumo"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <PieChart size={14} />
                Resumo Executivo
              </button>

              <button
                onClick={() => setActiveTab("indicadores_metas")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === "indicadores_metas"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <BarChart3 size={14} />
                Indicadores & Metas
              </button>

              <button
                onClick={() => setActiveTab("atividades")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === "atividades"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Calendar size={14} />
                Atividades
              </button>

              <button
                onClick={() => setActiveTab("orcamento")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === "orcamento"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <DollarSign size={14} />
                Orçamento
              </button>

              <button
                onClick={() => setActiveTab("responsaveis")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === "responsaveis"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <UserCheck size={14} />
                Responsáveis
              </button>

              <button
                onClick={() => setActiveTab("documentos")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === "documentos"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <FileCheck size={14} />
                Documentos
              </button>

              <button
                onClick={() => setActiveTab("historico")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === "historico"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <History size={14} />
                Histórico
              </button>

              <button
                onClick={() => setActiveTab("ia_analise")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === "ia_analise"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-purple-400 hover:text-white hover:bg-purple-900/30"
                }`}
              >
                <Sparkles size={14} />
                Análise IA
              </button>
            </div>

            {/* CONTEÚDO DAS TABS */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 max-h-[60vh] custom-scrollbar">
              {activeTab === "resumo" && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 text-sm leading-relaxed">
                    {cardDetails.summaryText}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {cardDetails.metrics.map((m, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-1">
                        <span className="text-xs text-slate-400 font-medium block">{m.label}</span>
                        <div className="text-2xl font-black text-white">{m.value}</div>
                        <span className="text-[11px] text-blue-400 font-semibold">{m.sub}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                      Resumo dos Indicadores Chave
                    </h3>
                    <div className="grid grid-cols-1 gap-2.5">
                      {cardDetails.indicadores.map((ind, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs"
                        >
                          <span className="font-semibold text-slate-200">{ind.nome}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-slate-400">
                              Meta: <strong className="text-white">{ind.meta}</strong>
                            </span>
                            <span className="text-slate-400">
                              Atual: <strong className="text-blue-400">{ind.atual}</strong>
                            </span>
                            <span className="px-2 py-0.5 rounded-md font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                              {ind.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "indicadores_metas" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                      Detalhamento de Indicadores
                    </h3>
                    <div className="relative w-64">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Filtrar indicadores..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/40">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                          <th className="p-3 font-semibold">Designação do Indicador</th>
                          <th className="p-3 font-semibold">Meta Prevista</th>
                          <th className="p-3 font-semibold">Execução Atual</th>
                          <th className="p-3 font-semibold">Estado de Cumprimento</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300">
                        {cardDetails.indicadores
                          .filter((i) => i.nome.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map((ind, idx) => (
                            <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                              <td className="p-3 font-medium text-white">{ind.nome}</td>
                              <td className="p-3 text-slate-300">{ind.meta}</td>
                              <td className="p-3 text-blue-400 font-bold">{ind.atual}</td>
                              <td className="p-3">
                                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                  {ind.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "atividades" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                    Atividades Vinculadas
                  </h3>
                  <div className="space-y-3">
                    {matrixActivities.length > 0 ? (
                      matrixActivities.slice(0, 5).map((act, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-blue-400">{act.codigo || `ACT-2026-00${idx + 1}`}</span>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40">
                              {act.status || "Em Curso"}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white">{act.nome || act.actividade || "Atividade Institucional"}</h4>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-slate-400 text-xs">
                        Todas as atividades desta unidade encontram-se monitoradas no SIGEP.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "orcamento" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                    Execução Orçamental & Financeira
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                      <span className="text-xs text-slate-400">Orçamento Aprovado</span>
                      <div className="text-xl font-bold text-white">4,850,000.00 MT</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                      <span className="text-xs text-slate-400">Executado / Compromissado</span>
                      <div className="text-xl font-bold text-emerald-400">3,920,000.00 MT</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                      <span className="text-xs text-slate-400">Saldo Disponível</span>
                      <div className="text-xl font-bold text-blue-400">930,000.00 MT</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "responsaveis" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                    Equipe de Gestão e Responsáveis
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cardDetails.responsaveis.map((resp, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                          {resp.nome.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{resp.nome}</h4>
                          <p className="text-[11px] text-slate-400">{resp.cargo}</p>
                          <span className="text-[10px] text-blue-400 font-semibold">{resp.setor}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "documentos" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                    Documentos Oficiais Vinculados
                  </h3>
                  <div className="space-y-2">
                    {[
                      "Relatorio_Execucao_Institucional_2026.pdf",
                      "Plano_Anual_Aprovado_SIGEP.pdf",
                      "Despacho_Superior_Homologacao.pdf",
                    ].map((doc, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText size={16} className="text-blue-400" />
                          <span className="font-semibold text-slate-200">{doc}</span>
                        </div>
                        <button className="px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white font-bold transition-all flex items-center gap-1">
                          <Download size={12} />
                          Transferir
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "historico" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                    Cronograma e Marcos Históricos
                  </h3>
                  <div className="border-l-2 border-blue-500/40 pl-4 space-y-4 ml-2">
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-slate-900" />
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">Outubro de 2026</span>
                      <h4 className="text-xs font-bold text-white">Aprovação pelo Conselho de Representantes</h4>
                      <p className="text-[11px] text-slate-400">Implementação integral do ciclo de planificação.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "ia_analise" && (
                <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-800/40 space-y-3">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                    <Sparkles size={16} />
                    <span>Análise Preditiva e Diagnóstico de IA</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {cardDetails.iaAnalysis}
                  </p>
                </div>
              )}
            </div>

            {/* RODAPÉ DO MODAL */}
            <div className="p-4 sm:p-5 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Centro de Informação Inteligente do SIGEP
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
                >
                  Voltar à Visão Geral
                </button>

                <button
                  onClick={() => {
                    const target = cardDetails.moduleTarget;
                    setSelectedCard(null);
                    onNavigate(target);
                  }}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Abrir Módulo Completo</span>
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalizedOverview;

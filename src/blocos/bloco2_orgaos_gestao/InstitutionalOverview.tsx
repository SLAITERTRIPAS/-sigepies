import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  GraduationCap,
  Calculator,
  ClipboardList,
  ShoppingCart,
  BookOpen,
  Monitor,
  Package,
  Car,
  Globe2,
  AlertTriangle,
  Layers,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  BarChart3,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { firestoreService } from "../../lib/firestoreService";
import { useCurrentLanguage, getTranslation } from "../../lib/i18n";
import { mergeColaboradores, classifyTipo, checkIsQuadro } from "../../lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

interface InstitutionalOverviewProps {
  onBack: () => void;
  user?: any;
}

export default function InstitutionalOverview({ onBack, user }: InstitutionalOverviewProps) {
  const currentLang = useCurrentLanguage();
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [colaboradores, setColaboradores] = useState<any[]>([]);
  const [estudantes, setEstudantes] = useState<any[]>([]);
  const [atividades, setAtividades] = useState<any[]>([]);
  const [financeiro, setFinancialData] = useState<any[]>([]);

  useEffect(() => {
    const unsubColab = firestoreService.colaboradores.subscribe((data: any[]) => setColaboradores(mergeColaboradores(data)));
    const unsubEst = firestoreService.efetivo_escolar.subscribe(setEstudantes);
    const unsubAtiv = firestoreService.actividades.subscribe(setAtividades);
    const unsubFin = firestoreService.financialData.subscribe(setFinancialData);
    return () => {
      unsubColab();
      unsubEst();
      unsubAtiv();
      unsubFin();
    };
  }, []);

  const stats = useMemo(() => {
    return {
      rh: {
        total: colaboradores.length,
        docentes: colaboradores.filter(c => classifyTipo(c) === "Docente").length,
        cta: colaboradores.filter(c => classifyTipo(c) === "CTA").length,
        homens: colaboradores.filter(c => c.genero === "M").length,
        mulheres: colaboradores.filter(c => c.genero === "F").length,
        efetivos: colaboradores.filter(c => checkIsQuadro(c)).length,
      },
      pedagogica: {
        estudantes: estudantes.reduce((acc, curr) => acc + (parseInt(curr.total) || 0), 0) || 1240,
        cursos: 5,
        docentes: colaboradores.filter(c => classifyTipo(c) === "Docente").length,
      },
      daf: {
        receitas: financeiro.reduce((acc, curr) => acc + (Number(curr.receitasProprias) || 0), 0) || 5470000,
        despesas: financeiro.reduce((acc, curr) => acc + (Number(curr.despesas) || 0), 0) || 4200000,
        orcamento: financeiro.reduce((acc, curr) => acc + (Number(curr.subvencaoEstado) || 0), 0) || 10500000,
      },
      planificacao: {
        total: atividades.length,
        executadas: atividades.filter(a => a.status === "Concluído" || a.progresso === 100).length,
        emCurso: atividades.filter(a => a.status === "Em Execução").length,
      }
    };
  }, [colaboradores, estudantes, atividades, financeiro]);

  const cards = [
    {
      id: "resumo",
      title: "Resumo executivo de todas as unidades orgânicas",
      icon: Layers,
      description: "Visão consolidada do desempenho e estado actual de todas as direções e departamentos.",
      details: (
        <div className="space-y-4">
          <p className="text-xs text-slate-500 italic">Sincronizando dados de 4 direções centrais e 12 departamentos operacionais.</p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[9px] font-bold">Conselho de Direção</span>
            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[9px] font-bold">Órgãos de Gestão</span>
          </div>
        </div>
      )
    },
    {
      id: "rh",
      title: "RH",
      icon: Users,
      description: "Efectivo, género, formação, vínculos e necessidades de pessoal.",
      details: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-2xl">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Efectivo Total</span>
              <div className="text-2xl font-black text-blue-900">{stats.rh.total}</div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Quadro (Efetivos)</span>
              <div className="text-2xl font-black text-emerald-900">{stats.rh.efetivos}</div>
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Homens', value: stats.rh.homens },
                    { name: 'Mulheres', value: stats.rh.mulheres }
                  ]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#0088FE" />
                  <Cell fill="#00C49F" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    },
    {
      id: "pedagogica",
      title: "Área Pedagógica",
      icon: GraduationCap,
      description: "Estudantes, cursos, docentes, resultados e aproveitamento.",
      details: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[9px] font-bold text-slate-400 block uppercase">Estudantes</span>
              <span className="text-xl font-black text-slate-900">{stats.pedagogica.estudantes}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[9px] font-bold text-slate-400 block uppercase">Cursos</span>
              <span className="text-xl font-black text-slate-900">{stats.pedagogica.cursos}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[9px] font-bold text-slate-400 block uppercase">Docentes</span>
              <span className="text-xl font-black text-slate-900">{stats.pedagogica.docentes}</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 italic">Resultados e aproveitamento em processamento pelo Registo Académico.</p>
        </div>
      )
    },
    {
      id: "daf",
      title: "DAF",
      icon: Calculator,
      description: "Receitas, despesas, orçamento e execução financeira.",
      details: (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-slate-600">Execução Orçamental</span>
              <span className="font-black text-blue-600">{Math.round((stats.daf.despesas / stats.daf.orcamento) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-1000" 
                style={{ width: `${(stats.daf.despesas / stats.daf.orcamento) * 100}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between p-3 bg-green-50 rounded-xl">
              <span className="text-xs font-bold text-green-700">Receitas Próprias</span>
              <span className="text-xs font-black text-green-900">{stats.daf.receitas.toLocaleString()} MZN</span>
            </div>
            <div className="flex justify-between p-3 bg-blue-50 rounded-xl">
              <span className="text-xs font-bold text-blue-700">Orçamento (OGE)</span>
              <span className="text-xs font-black text-blue-900">{stats.daf.orcamento.toLocaleString()} MZN</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "planificacao",
      title: "Planificação",
      icon: ClipboardList,
      description: "Planos anuais, actividades, metas e execução orçamental.",
      details: (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Total Actividades</span>
              <div className="text-3xl font-black text-slate-900">{stats.planificacao.total}</div>
            </div>
            <div className="h-16 w-16">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Executadas', value: stats.planificacao.executadas },
                      { name: 'Pendente', value: stats.planificacao.total - stats.planificacao.executadas }
                    ]}
                    innerRadius={20}
                    outerRadius={30}
                    dataKey="value"
                  >
                    <Cell fill="#10B981" />
                    <Cell fill="#E2E8F0" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit">
            Taxa de Execução: {stats.planificacao.total > 0 ? Math.round((stats.planificacao.executadas / stats.planificacao.total) * 100) : 0}%
          </div>
        </div>
      )
    },
    {
      id: "ugea",
      title: "UGEA",
      icon: ShoppingCart,
      description: "Aquisições, concursos, contratos e processos pendentes.",
      details: <p className="text-xs text-slate-500">Módulo de aquisições com 12 processos em fase de concurso e 5 contratos ativos.</p>
    },
    {
      id: "biblioteca",
      title: "Biblioteca",
      icon: BookOpen,
      description: "Acervo bibliográfico, exemplares e necessidades por curso.",
      details: <p className="text-xs text-slate-500">Acervo consolidado de 5.400 volumes. Necessidade de atualização para os novos cursos de Engenharia.</p>
    },
    {
      id: "informatica",
      title: "Informática",
      icon: Monitor,
      description: "Equipamentos funcionais, avariados e necessidades tecnológicas.",
      details: <p className="text-xs text-slate-500">85% dos equipamentos em estado funcional. Necessidade de 20 novos terminais para o Laboratório 3.</p>
    },
    {
      id: "patrimonio",
      title: "Património",
      icon: Package,
      description: "Inventário, conservação, bens e manutenção.",
      details: <p className="text-xs text-slate-500">Inventário anual 2026 concluído em 40%. Manutenção preventiva de edifícios agendada para o próximo trimestre.</p>
    },
    {
      id: "frota",
      title: "Gestão da Frota",
      icon: Car,
      description: "Viaturas operacionais, avarias, combustível e custos.",
      details: <p className="text-xs text-slate-500">Frota de 12 viaturas. 10 operacionais, 2 em manutenção pesada. Consumo médio mensal estável.</p>
    },
    {
      id: "rel_ext",
      title: "Relações Exteriores",
      icon: Globe2,
      description: "Parcerias, protocolos, cooperação e mobilidade.",
      details: <p className="text-xs text-slate-500">3 novos protocolos de cooperação internacional assinados em 2026. 5 docentes em mobilidade externa.</p>
    },
    {
      id: "alertas",
      title: "Alertas e decisões prioritárias",
      icon: AlertTriangle,
      description: "Actividades atrasadas, orçamento em risco, contratos a expirar, falta de pessoal e problemas que exigem decisão imediata.",
      color: "bg-red-50 border-red-200 text-red-900",
      details: (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 bg-white p-2 rounded-lg border border-red-100">
            <AlertTriangle size={14} /> 3 Actividades Críticas Atrasadas
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 bg-white p-2 rounded-lg border border-amber-100">
            <AlertTriangle size={14} /> Contrato de Limpeza Expira em 15 dias
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-white p-2 rounded-lg border border-indigo-100">
            <Users size={14} /> Falta de Docentes em Eng. Civil
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={onBack}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all cursor-pointer"
            >
              <ArrowLeft size={20} />
            </button>
            <span className="text-[10px] font-black tracking-[0.3em] text-blue-300 uppercase">Visão de Alta Direção</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight font-serif">VISÃO GERAL INSTITUCIONAL</h1>
          <p className="text-blue-100/60 mt-2 font-medium max-w-2xl">Resumo executivo consolidado de todas as unidades orgânicas e áreas estratégicas do sistema.</p>
        </div>
        <div className="absolute right-[-10%] top-[-20%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute left-[-5%] bottom-[-20%] w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          const isActive = activeCard === card.id;

          return (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`group relative flex flex-col p-6 rounded-[2rem] border-2 transition-all duration-300 ${isActive ? 'bg-white border-blue-600 shadow-2xl z-20 scale-[1.02]' : card.color || 'bg-white border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-xl'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                  <Icon size={24} />
                </div>
                <button 
                  onClick={() => setActiveCard(isActive ? null : card.id)}
                  className={`p-2 rounded-xl transition-all ${isActive ? 'bg-slate-100 text-slate-900 rotate-90' : 'bg-transparent text-slate-300 group-hover:text-blue-600'}`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <h3 className={`text-xl font-black tracking-tight mb-2 ${isActive ? 'text-slate-900' : 'text-slate-800'}`}>{card.title}</h3>
              <p className={`text-xs font-medium leading-relaxed mb-6 ${isActive ? 'text-slate-600' : 'text-slate-500'}`}>{card.description}</p>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-slate-100">
                      {card.details}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isActive && (
                <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  VER DETALHES <ChevronRight size={12} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Footer / Summary Area */}
      <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-3xl">
            <TrendingUp size={32} />
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-900 leading-tight">Desempenho Institucional</h4>
            <p className="text-xs font-bold text-slate-400 tracking-wider">KPI Global do Sistema (Q3 2026)</p>
          </div>
        </div>
        <div className="flex gap-12">
          <div className="text-center">
            <div className="text-3xl font-black text-blue-600">92%</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Conformidade</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-emerald-600">78%</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Execução</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-amber-500">14</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Projectos</div>
          </div>
        </div>
      </div>
    </div>
  );
}

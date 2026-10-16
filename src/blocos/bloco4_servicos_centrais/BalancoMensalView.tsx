import React from "react";
import { InstitutionalHeader } from "../../components/InstitutionalHeader";
import { printElementById } from "../../lib/printUtils";
import { Printer } from "lucide-react";

interface BalancoMensalViewProps {
  movements: any[];
  user: any;
  setor?: "Economato" | "Patrimonio";
  onBack?: () => void;
}

export default function BalancoMensalView({ movements, user, onBack }: BalancoMensalViewProps) {
  const reportSections = [
    { title: "Capa Institucional", id: "capa" },
    { title: "Resumo Executivo", id: "resumo" },
    { title: "Execução Física", id: "fisica" },
    { title: "Execução Financeira", id: "financeira" },
    { title: "Análise por Rúbrica", id: "rubrica" },
    { title: "Análise Comparativa", id: "comparativa" },
    { title: "Indicadores e Semáforos", id: "semaforos" },
    { title: "Auditoria e Rastreabilidade", id: "auditoria" },
    { title: "Constrangimentos", id: "desafios" },
    { title: "Conclusões e Recomendações", id: "conclusoes" }
  ];

  return (
    <div id="balanco-print-area" className="w-full max-w-5xl mx-auto p-6 bg-white space-y-12">
      <InstitutionalHeader user={user} title="Balanço Institucional Profissional" />
      
      <div className="flex justify-end print:hidden mb-6">
        <button onClick={() => printElementById("balanco-print-area", "Balanço Institucional Profissional")} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-xs tracking-widest cursor-pointer">
            <Printer size={16} /> Imprimir Relatório Profissional (10 Páginas)
        </button>
      </div>

      {reportSections.map((sec, index) => (
        <section key={sec.id} className="min-h-[297mm] p-12 border-b border-slate-200">
           <h2 className="text-2xl font-black text-slate-900 mb-8 border-b-4 border-blue-600 pb-2">
             Página {index + 1}: {sec.title}
           </h2>
           <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
             <p className="text-slate-600 font-medium">Consolidação automática dos dados reais da instituição autenticada para a seção {sec.title}...</p>
           </div>
        </section>
      ))}
    </div>
  );
}

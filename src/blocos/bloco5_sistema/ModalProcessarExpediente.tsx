import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  X,
  FileText,
  Send,
  MessageSquare,
  ShieldCheck,
  Building2,
  History,
  ArrowRight,
  Upload,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { firestoreService } from "../../lib/firestoreService";
import SignatureUpload from "../bloco5_sistema/SignatureUpload";
import { getRoles, isTitularDiretorGeral } from "../../lib/auth";

const LIDERANCA = [
  "Diretor-Geral",
  "Diretor da Direção",
  "Chefe do Departamento",
  "Chefe da Repartição",
  "Secretário Geral",
];

interface ModalProcessarExpedienteProps {
  user: any;
  expediente: any;
  onClose: () => void;
  onComplete: () => void;
}

export default function ModalProcessarExpediente({
  user,
  expediente,
  onClose,
  onComplete,
}: ModalProcessarExpedienteProps) {
  const [parecerTexto, setParecerTexto] = useState("");
  const [parecerAnexo, setParecerAnexo] = useState("");
  const [despacho, setDespacho] = useState<"AUTORIZAR" | "NAO_AUTORIZAR" | "">(
    "",
  );
  const [proximoDestino, setProximoDestino] = useState(
    expediente.destino || "",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lógica Hierárquica
  const userRoles = useMemo(() => getRoles(user.cargoChefia || user.cargo || user.title || ""), [user]);
  const isDG = useMemo(() => isTitularDiretorGeral(user), [user]);
  
  // Determinar que acções o utilizador pode tomar
  const canFinalize = isDG; // Apenas o Director-Geral dá o despacho final "Autorizar"
  const canGiveOpinion = !isDG; // Outros dão parecer técnico ou administrativo
  
  // Níveis de visibilidade
  const showOpinionField = canGiveOpinion;
  const showDispatchField = canFinalize;
  const showNextStepField = !isDG; // O DG não encaminha para mais ninguém no fluxo ascendente

  const handleEncaminhar = async () => {
    if (showOpinionField && !parecerTexto.trim()) {
      alert("Por favor, insira o seu parecer técnico.");
      return;
    }

    if (showDispatchField && !despacho) {
      alert("Por favor, emita o despacho final.");
      return;
    }

    setIsSubmitting(true);
    try {
      const acaoRealizada = isDG ? "Despacho Final / Homologação" : "Parecer / Tramitação Hierárquica";
      
      const entry = {
        id: `step_${Date.now()}`,
        data: new Date().toISOString(),
        setor: user.setor || user.reparticao || user.departamento || user.direcao || "Órgão Central",
        acao: acaoRealizada,
        parecer: parecerTexto,
        despacho: despacho,
        responsavel: user.name || user.nome,
        cargo: user.cargo || user.title,
        statusAnterior: expediente.status,
      };

      const updatedHistorico = [
        ...(expediente.historico || []),
        entry
      ];

      const updateData: any = {
        historico: updatedHistorico,
        ultimaAtualizacao: new Date().toISOString(),
      };

      if (isDG) {
        updateData.status = despacho === "AUTORIZAR" ? "Concluído" : "Não Autorizado";
        updateData.despachoFinal = despacho;
        updateData.dataConclusao = new Date().toISOString();
        updateData.homologadoPor = user.name;
      } else {
        updateData.destino = proximoDestino;
        updateData.status = "Em Tramitação";
        updateData.etapaAtual = proximoDestino;
      }

      // Visto Digital (Assinatura)
      updateData.vistoDigital = {
        assinadoPor: user.name,
        data: new Date().toISOString(),
        cargo: user.cargo || user.title,
        uid: user.uid || user.id
      };

      await firestoreService.expedientes.update(expediente.id, updateData);
      onComplete();
    } catch (error) {
      console.error("Erro ao processar expediente:", error);
      alert("Ocorreu um erro ao processar o expediente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto"
      >
        <div className="w-full md:w-1/3 bg-slate-900 p-8 text-white flex flex-col">
          <button
            onClick={onClose}
            className="absolute top-6 left-6 text-slate-400 hover:text-white transition-all"
          >
            <X size={24} />
          </button>
          <div className="mt-8 mb-12">
            <div className="bg-amber-600 w-16 h-16 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-amber-600/20">
              <FileText size={32} />
            </div>
            <h2 className="text-2xl font-black tracking-tighter leading-tight">
              {isDG ? "Homologação" : "Parecer de"}
              <br />
              Expediente
            </h2>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] font-mono font-black text-slate-500 tracking-widest">
                {expediente.numero}
              </span>
              <div className="h-1 w-8 bg-amber-600 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-6 flex-1 text-sm font-bold">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase tracking-widest mb-1">Origem</span>
              <p className="text-slate-200">{expediente.origem}</p>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase tracking-widest mb-1">Assunto</span>
              <p className="text-slate-200">{expediente.assunto}</p>
            </div>
            {expediente.prioridade && (
              <div>
                <span className="text-slate-500 block text-[10px] uppercase tracking-widest mb-1">Prioridade</span>
                <span className={`px-2 py-0.5 rounded text-[10px] ${expediente.prioridade === 'Urgente' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  {expediente.prioridade}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 p-10 overflow-y-auto">
          <div className="space-y-8">
            {/* Secção de Parecer (Hierarquia Intermédia) */}
            {showOpinionField && (
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-400 tracking-[0.2em] mb-3 flex items-center gap-2 uppercase">
                  <MessageSquare size={16} className="text-amber-600" /> Parecer Técnico
                </h3>
                <textarea
                  rows={4}
                  value={parecerTexto}
                  onChange={(e) => setParecerTexto(e.target.value)}
                  placeholder="Exponha aqui o seu parecer técnico fundamentado sobre este expediente..."
                  className="w-full p-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-medium focus:ring-4 focus:ring-amber-500/10 outline-none transition-all resize-none"
                />
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-dashed border-slate-300">
                  <SignatureUpload
                    label="Anexar documento de parecer assinado (Opcional)"
                    value={parecerAnexo}
                    onChange={setParecerAnexo}
                    user={user}
                  />
                </div>
              </div>
            )}

            {/* Secção de Despacho (Director-Geral) */}
            {showDispatchField && (
              <div className="space-y-4 bg-amber-50/50 p-8 rounded-[2.5rem] border border-amber-100">
                <h3 className="text-xs font-black text-amber-800 tracking-[0.2em] mb-4 flex items-center gap-2 uppercase">
                  <ShieldCheck size={18} /> Decisão Executiva (Despacho)
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <select
                    value={despacho}
                    onChange={(e) => setDespacho(e.target.value as any)}
                    className={`w-full p-5 rounded-2xl border-2 font-black text-sm outline-none transition-all ${
                      despacho === "AUTORIZAR" 
                        ? "border-green-600 text-green-700 bg-white" 
                        : despacho === "NAO_AUTORIZAR" 
                          ? "border-red-600 text-red-700 bg-white" 
                          : "border-slate-200 bg-white"
                    }`}
                  >
                    <option value="">SELECIONE A DECISÃO FINAL...</option>
                    <option value="AUTORIZAR" className="font-bold text-green-700">✓ É DE AUTORIZAR / HOMOLOGAR</option>
                    <option value="NAO_AUTORIZAR" className="font-bold text-red-700">✗ NÃO É DE AUTORIZAR</option>
                  </select>

                  <textarea
                    rows={3}
                    value={parecerTexto}
                    onChange={(e) => setParecerTexto(e.target.value)}
                    placeholder="Observações ou fundamentação do despacho (opcional)..."
                    className="w-full p-5 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-amber-500/10 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            )}

            {/* Encaminhamento Hierárquico */}
            {showNextStepField && (
              <div className="pt-4 border-t border-slate-100">
                <label className="text-[10px] font-black text-slate-400 tracking-widest mb-3 block uppercase">
                  Próxima Etapa Hierárquica
                </label>
                <div className="flex items-center gap-3">
                  <Building2 size={20} className="text-slate-400" />
                  <select
                    value={proximoDestino}
                    onChange={(e) => setProximoDestino(e.target.value)}
                    className="flex-1 p-4 rounded-xl border-2 border-slate-100 text-sm font-bold focus:ring-2 focus:ring-amber-500 outline-none bg-slate-50 transition-all"
                  >
                    <option value="">Selecione o superior / destino...</option>
                    {LIDERANCA.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                    <option value="Arquivo Geral">Arquivo Geral</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="px-8 py-4 border-2 border-slate-100 text-slate-400 rounded-[2rem] font-black tracking-widest text-[10px] hover:bg-slate-50 transition-all uppercase"
              >
                Cancelar
              </button>
              <button
                onClick={handleEncaminhar}
                disabled={isSubmitting}
                className={`flex-1 flex items-center justify-center gap-3 px-10 py-5 ${
                  isDG ? 'bg-amber-600 hover:bg-amber-700' : 'bg-slate-900 hover:bg-slate-800'
                } text-white rounded-[2rem] font-black tracking-widest text-xs transition-all shadow-2xl shadow-amber-900/10 disabled:opacity-50`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Send size={16} /></motion.div>
                    Processando...
                  </span>
                ) : (
                  <>
                    {isDG ? "Finalizar e Homologar" : "Assinar e Encaminhar"} <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
            
            <p className="text-[10px] text-center text-slate-400 font-medium">
              <ShieldCheck size={12} className="inline mr-1 text-green-500" />
              Ao confirmar, a sua assinatura digital será vinculada a este despacho com selo de data/hora.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldAlert,
  Laptop,
  Smartphone,
  Clock,
  LogOut,
  X,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { SessionItem } from "../../lib/sessionService";

interface SessionConflictModalProps {
  isOpen: boolean;
  activeSession: SessionItem | null;
  user: any;
  onConfirmReplace: () => Promise<void>;
  onCancel: () => void;
}

export default function SessionConflictModal({
  isOpen,
  activeSession,
  user,
  onConfirmReplace,
  onCancel,
}: SessionConflictModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !activeSession) return null;

  const isMobile =
    activeSession.deviceName.toLowerCase().includes("android") ||
    activeSession.deviceName.toLowerCase().includes("ios") ||
    activeSession.deviceName.toLowerCase().includes("iphone");

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirmReplace();
    } catch (e) {
      console.error("Erro ao substituir sessão ativa:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Cabeçalho de Alerta de Segurança */}
          <div className="px-6 py-4 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-b border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h3 className="text-base font-black text-white uppercase tracking-wider">
                  Sessão Ativa Noutro Dispositivo
                </h3>
                <p className="text-xs text-amber-300/80 font-medium">
                  Regra Institucional SIGEP: Apenas uma sessão ativa por utilizador
                </p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Conteúdo Informativo */}
          <div className="p-6 space-y-5 text-slate-300 text-xs">
            <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3 text-amber-200 leading-relaxed">
              <AlertTriangle size={18} className="shrink-0 text-amber-400 mt-0.5" />
              <div>
                A conta de <span className="font-bold text-white">{user?.nome || user?.name || user?.email}</span> já possui uma sessão ativa iniciada noutro dispositivo.
              </div>
            </div>

            {/* Cartão de Detalhes da Sessão Ativa */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  Detalhes da Sessão Atual em Execução:
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Em Execução
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-900 border border-slate-700 text-amber-400 rounded-xl">
                  {isMobile ? <Smartphone size={22} /> : <Laptop size={22} />}
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <p className="text-sm font-bold text-white truncate">
                    {activeSession.deviceName}
                  </p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Clock size={12} className="text-slate-500" />
                    Iniciada em:{" "}
                    {new Date(activeSession.createdAt).toLocaleDateString("pt-PT")}{" "}
                    {new Date(activeSession.createdAt).toLocaleTimeString("pt-PT", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed">
              Para prosseguir e aceder ao sistema neste dispositivo, é necessário **substituir a sessão**, encerrando primeiro o acesso no outro dispositivo.
            </p>
          </div>

          {/* Botões de Ação Expressa */}
          <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={onCancel}
              disabled={loading}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-bold transition-all cursor-pointer text-xs"
            >
              Manter Sessão Anterior & Cancelar
            </button>

            <button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 text-xs"
            >
              {loading ? (
                <RefreshCw size={15} className="animate-spin" />
              ) : (
                <LogOut size={15} />
              )}
              <span>Encerrar Sessão Anterior e Entrar Neste Dispositivo</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

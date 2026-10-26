import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Laptop,
  Smartphone,
  Globe,
  Clock,
  Shield,
  ShieldCheck,
  LogOut,
  Trash2,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Key,
  Sliders,
} from "lucide-react";
import {
  SessionItem,
  subscribeToUserSessions,
  terminateUserSession,
  terminateAllOtherSessions,
  getSessionTTL,
  setSessionTTL,
  createOrUpdateUserSession,
} from "../../lib/sessionService";

interface SessionManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export default function SessionManagerModal({
  isOpen,
  onClose,
  user,
}: SessionManagerModalProps) {
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [terminatingId, setTerminatingId] = useState<string | null>(null);
  const [terminatingAll, setTerminatingAll] = useState(false);
  const [currentTTL, setCurrentTTLState] = useState<number | null>(() => getSessionTTL());
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const userId = user?.id || user?.uid || user?.email;

  useEffect(() => {
    if (!isOpen || !userId) return;

    setLoading(true);
    const unsub = subscribeToUserSessions(userId, (list) => {
      setSessions(list);
      setLoading(false);
    });

    return () => unsub();
  }, [isOpen, userId]);

  if (!isOpen) return null;

  const handleTerminateSession = async (sessionId: string) => {
    if (!userId) return;
    setTerminatingId(sessionId);
    const success = await terminateUserSession(userId, sessionId);
    setTerminatingId(null);

    if (success) {
      setActionSuccessMsg("Sinal de término enviado. O dispositivo remoto foi desconectado.");
      setTimeout(() => setActionSuccessMsg(null), 4000);
    }
  };

  const handleTerminateAllOthers = async () => {
    if (!userId) return;
    setTerminatingAll(true);
    const count = await terminateAllOtherSessions(userId);
    setTerminatingAll(false);

    setActionSuccessMsg(`Todas as outras ${count} sessões ativas foram desconectadas com sucesso.`);
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  const handleTTLChange = async (hours: number | null) => {
    setCurrentTTLState(hours);
    setSessionTTL(hours);
    if (userId) {
      await createOrUpdateUserSession(userId, hours);
    }
    setActionSuccessMsg(
      hours
        ? `Sessão configurada com expiração manual (TTL) de ${hours} horas.`
        : "Expiração manual (TTL) desativada. Mantida a persistência padrão do sistema."
    );
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  const otherSessionsCount = sessions.filter((s) => !s.isCurrent).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Cabeçalho do Modal */}
          <div className="px-6 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 className="text-base font-black text-white uppercase tracking-wider">
                  Gestão de Sessões Ativas (SIGEP)
                </h3>
                <p className="text-xs text-slate-400">
                  Monitorização e controlo de dispositivos conectados à conta de{" "}
                  <span className="text-blue-300 font-bold">{user?.nome || user?.name || user?.email}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mensagem de Alerta/Sucesso */}
          {actionSuccessMsg && (
            <div className="mx-6 mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-emerald-300 text-xs font-semibold animate-in fade-in">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{actionSuccessMsg}</span>
            </div>
          )}

          {/* Conteúdo Principal */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Secção 1: Configuração de Expirador de Sessão (TTL Manual) */}
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sliders size={16} className="text-amber-400" />
                  <h4 className="text-xs font-black text-white uppercase tracking-wide">
                    Expiração de Sessão Personalizada (TTL)
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  {currentTTL ? `${currentTTL} Horas (Ativo)` : "Padrão do Sistema"}
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                Defina manualmente por quanto tempo a sessão deste dispositivo permanece válida antes de expirar por razões de segurança institucional, independentemente do Firebase.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { label: "8 Horas (Turno)", value: 8 },
                  { label: "24 Horas (Diário)", value: 24 },
                  { label: "72 Horas (3 Dias)", value: 72 },
                  { label: "Sem Expiração TTL", value: null },
                ].map((opt) => (
                  <button
                    key={String(opt.value)}
                    onClick={() => handleTTLChange(opt.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                      currentTTL === opt.value
                        ? "bg-blue-600 text-white border-blue-400 shadow-md"
                        : "bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Secção 2: Lista de Dispositivos Conectados */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-blue-400" />
                  <h4 className="text-xs font-black text-white uppercase tracking-wide">
                    Sessões Ativas ({sessions.length})
                  </h4>
                </div>

                {otherSessionsCount > 0 && (
                  <button
                    onClick={handleTerminateAllOthers}
                    disabled={terminatingAll}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/20 border border-red-500/40 text-red-300 hover:bg-red-600 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                  >
                    {terminatingAll ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      <LogOut size={14} />
                    )}
                    <span>Desconectar Outros {otherSessionsCount} Dispositivos</span>
                  </button>
                )}
              </div>

              {loading ? (
                <div className="py-8 flex flex-col items-center justify-center text-slate-400 gap-2">
                  <RefreshCw size={24} className="animate-spin text-blue-400" />
                  <span className="text-xs">A carregar sessões ativas do Firestore...</span>
                </div>
              ) : sessions.length === 0 ? (
                <div className="py-6 bg-slate-800/30 border border-slate-800 rounded-xl text-center text-slate-400 text-xs">
                  Nenhuma outra sessão ativa encontrada.
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.map((sess) => {
                    const isMobile =
                      sess.deviceName.toLowerCase().includes("android") ||
                      sess.deviceName.toLowerCase().includes("ios") ||
                      sess.deviceName.toLowerCase().includes("iphone");

                    return (
                      <div
                        key={sess.id}
                        className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                          sess.isCurrent
                            ? "bg-blue-950/30 border-blue-500/50 shadow-md shadow-blue-950/20"
                            : "bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80"
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            className={`p-3 rounded-xl shrink-0 ${
                              sess.isCurrent
                                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                                : "bg-slate-700/40 text-slate-300 border border-slate-600/30"
                            }`}
                          >
                            {isMobile ? <Smartphone size={20} /> : <Laptop size={20} />}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h5 className="text-sm font-bold text-white truncate">
                                {sess.deviceName}
                              </h5>
                              {sess.isCurrent && (
                                <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                  Este Dispositivo
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-[11px] text-slate-400">
                              <span className="flex items-center gap-1">
                                <Clock size={12} className="text-slate-500" />
                                Entrada:{" "}
                                {new Date(sess.createdAt).toLocaleDateString("pt-PT")}{" "}
                                {new Date(sess.createdAt).toLocaleTimeString("pt-PT", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>

                              {sess.expiresAt && (
                                <span className="flex items-center gap-1 text-amber-400">
                                  <Shield size={12} />
                                  Expira:{" "}
                                  {new Date(sess.expiresAt).toLocaleTimeString("pt-PT", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {!sess.isCurrent && (
                          <button
                            onClick={() => handleTerminateSession(sess.id)}
                            disabled={terminatingId === sess.id}
                            className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer disabled:opacity-50"
                            title="Enviar sinal de encerramento para este dispositivo remoto"
                          >
                            {terminatingId === sess.id ? (
                              <RefreshCw size={14} className="animate-spin" />
                            ) : (
                              <Trash2 size={14} />
                            )}
                            <span>Desconectar</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Rodapé do Modal */}
          <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Sessões encriptadas e autenticadas via SIGEP Security Core</span>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

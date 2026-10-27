import React, { useState, useEffect } from "react";
import {
  User,
  Maximize2,
  Minimize2,
  Minus,
  Power,
  LogOut,
  ArrowLeft,
  Bell,
  ChevronRight,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Mail,
  MessageSquare,
  AlertCircle,
  Settings,
  Database,
  X,
  RefreshCcw,
  Cpu,
  Sparkles,
  FileText,
  Building,
  Building2,
  ChevronDown,
  Globe,
  UserCog,
  BoxIcon,
  Laptop,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import NotificationCenter from "../bloco5_sistema/NotificationCenter";
import ChangePasswordModal from "./ChangePasswordModal";
import ShareProcessoModal from "../../components/modals/ShareProcessoModal";
import SessionManagerModal from "../../components/modals/SessionManagerModal";
import { subscribeToUserSessions, SessionItem } from "../../lib/sessionService";
import { toTitleCase as tc, confirmWorkspaceExit } from "../../lib/utils";
import { getRoles, isSuperBossUser, isInstitutionalAdminAccount } from "../../lib/auth";
import { firestoreService } from "../../lib/firestoreService";
import { getActiveInstituicao } from "../../lib/instituicaoEstruturaService";
import { getSystemLogo, getActiveInstitutionLogo } from "../../lib/logoService";
import InstitutionalProfileModal from "../../components/modals/InstitutionalProfileModal";
import AtualizarDadosColaboradorModal from "../../components/modals/AtualizarDadosColaboradorModal";
import { useTranslation, useCurrentLanguage, translateInstitutionName, translateInstitutionalText } from "../../lib/i18n";
import WeatherWidget from "../../components/WeatherWidget";
import LanguageDropdown from "../../components/ui/LanguageDropdown";

interface MainHeaderProps {
  user?: any;
  activeInst?: any;
  colaboradores?: any[];
  processos?: any[];
  matrixActivities?: any[];
  instituicoes?: any[];
  onBack?: () => void;
  onLogout?: () => void;
  showBack?: boolean;
  title?: string;
  actions?: React.ReactNode;
  breadcrumb?: string[];
  onBreadcrumbClick?: (index: number, crumbText: string) => void;
  unreadMessagesCount?: number;
  onOpenMessages?: () => void;
  onOpenBackup?: () => void;
  onOpenQuantumAI?: () => void;
  onMinimize?: () => void;
  onSync?: () => void;
  onOpenRoleSelector?: () => void;
}

export default function MainHeader({
  user,
  activeInst,
  colaboradores = [],
  processos = [],
  matrixActivities = [],
  instituicoes = [],
  onBack,
  onLogout,
  showBack = true,
  title,
  actions,
  breadcrumb,
  onBreadcrumbClick,
  unreadMessagesCount = 0,
  onOpenMessages,
  onOpenBackup,
  onOpenQuantumAI,
  onMinimize,
  onSync,
  onOpenRoleSelector,
}: MainHeaderProps) {
  const { t, lang: currentLang, translateMenu: translateMenuTitle } = useTranslation();
  const [time, setTime] = useState(new Date());
  const [showMenu, setShowMenu] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showInstProfileModal, setShowInstProfileModal] = useState(false);
  const [showColabProfileModal, setShowColabProfileModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isSuperAdmin = isSuperBossUser(user);
  const userRoles = getRoles(user?.title || user?.cargo || user?.cargoChefia || "");
  const isAnyAdmin = userRoles.isAdmin || isSuperAdmin;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = time.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const dateStr = time.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const rawDayOfWeek = time.toLocaleDateString("pt-PT", { weekday: "long" });

  const loggedInst = activeInst || getActiveInstituicao();

  // Personalização Dinâmica do Cabeçalho:
  // Administrador Geral -> Exibe a sigla do sistema "SIGEP" e o logótipo do sistema.
  // Utilizador da Instituição -> Exibe a sigla da instituição logada e o seu respetivo logótipo oficial.
  const headerSiglaToDisplay = React.useMemo(() => {
    if (isSuperAdmin) {
      return "SIGEP";
    }
    return (
      loggedInst?.sigla ||
      loggedInst?.abreviatura ||
      user?.instituicaoSigla ||
      user?.sigla ||
      user?.instituicaoAbreviatura ||
      "ISPS"
    );
  }, [isSuperAdmin, loggedInst, user]);

  const headerInstName = React.useMemo(() => {
    if (isSuperAdmin) {
      return "SIGEP - Sistema Integrado de Gestão de Processos";
    }
    return (
      loggedInst?.nome ||
      loggedInst?.name ||
      user?.instituicao ||
      user?.institutionName ||
      "Instituto Superior Politécnico de Songo"
    );
  }, [isSuperAdmin, loggedInst, user]);

  const headerLogoToDisplay = React.useMemo(() => {
    if (isSuperAdmin) {
      return getSystemLogo();
    }
    return getActiveInstitutionLogo(loggedInst, user);
  }, [isSuperAdmin, loggedInst, user]);

  const clockBackgroundLogo = React.useMemo(() => {
    if (isSuperAdmin) {
      return getSystemLogo();
    }
    return getActiveInstitutionLogo(loggedInst, user);
  }, [isSuperAdmin, loggedInst, user]);

  const realUserName = React.useMemo(() => {
    if (isSuperAdmin) {
      return user?.name || user?.nome || "Slaiter Tripas";
    }

    const colab = colaboradores?.find(
      (c) =>
        (user?.nuit && c.nuit && String(c.nuit).trim() === String(user.nuit).trim()) ||
        (user?.email && c.email && c.email.toLowerCase().trim() === user.email.toLowerCase().trim())
    );

    return colab?.nome || user?.name || user?.nome || "Utilizador";
  }, [user, colaboradores, isSuperAdmin]);

  const shortRealUserName = React.useMemo(() => {
    if (!realUserName) return "UTILIZADOR";
    const parts = realUserName.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0]} ${parts[parts.length - 1]}`;
    }
    return realUserName;
  }, [realUserName]);

  const userInitials = React.useMemo(() => {
    if (!realUserName) return "U";
    const parts = realUserName.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return realUserName.substring(0, 2).toUpperCase();
  }, [realUserName]);

  const activeRealUserPhoto = user?.photoURL || user?.fotoUrl || user?.foto || null;

  const toggleFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (_) {}
  };

  return (
    <>
      {showPasswordModal && (
        <ChangePasswordModal user={user} onClose={() => setShowPasswordModal(false)} />
      )}
      <ShareProcessoModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} userName={user?.name} />
      <InstitutionalProfileModal isOpen={showInstProfileModal} onClose={() => setShowInstProfileModal(false)} instituicao={loggedInst} />
      <AtualizarDadosColaboradorModal isOpen={showColabProfileModal} onClose={() => setShowColabProfileModal(false)} user={user} colaboradores={colaboradores} processos={processos} />
      <SessionManagerModal isOpen={showSessionModal} onClose={() => setShowSessionModal(false)} user={user} />

      <header className="w-full flex flex-col flex-none z-50 shadow-2xl relative bg-[#070e24] text-white font-sans border-b border-white/10">
        {/* LINHA SUPERIOR DO CABEÇALHO */}
        <div className="w-full flex justify-between items-center px-4 py-2 gap-4">
          {/* LADO ESQUERDO: LOGÓTIPO + SIGLA DINÂMICA DO SISTEMA OU INSTITUIÇÃO */}
          <div className="flex flex-col items-center justify-center shrink-0 cursor-pointer group select-none" onClick={() => window.dispatchEvent(new CustomEvent("open_view", { detail: { view: "dashboard" } }))} title={headerInstName}>
            <div className="relative flex items-center justify-center p-1 rounded-xl bg-white/5 border border-white/10 group-hover:border-blue-400/50 transition-all shadow-md">
              <img
                src={headerLogoToDisplay}
                alt={headerSiglaToDisplay}
                className="h-[83px] sm:h-[96px] w-auto max-w-[210px] object-contain drop-shadow-md rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/aistudio/logot_sigep-removebg-preview_60e9baa3.png";
                }}
              />
            </div>
            <span className="text-xs sm:text-sm font-black text-white font-serif uppercase tracking-widest mt-0.5 group-hover:text-blue-300 transition-colors">
              {headerSiglaToDisplay}
            </span>
          </div>

          {/* CENTRO: CAIXA OFICIAL DE DATA, RELÓGIO & CLIMA COM BARRA DOURADA (Conforme Imagem Oficial) */}
          <div className="hidden md:flex relative overflow-hidden flex-col items-center justify-center px-6 py-1.5 min-w-[320px] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-white/20 bg-[#091228]/95 group select-none">
            {clockBackgroundLogo && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden p-1 opacity-20">
                <img src={clockBackgroundLogo} alt="Watermark" className="w-full h-full object-contain filter brightness-125" />
              </div>
            )}

            <div className="relative z-10 w-full flex flex-col items-center leading-none">
              {/* Linha Superior: DIA DA SEMANA | RELÓGIO DIGITAL */}
              <div className="w-full flex items-center justify-center gap-2">
                <span className="text-[#FFB800] font-serif font-black text-xs sm:text-[13px] tracking-[0.16em] uppercase whitespace-nowrap" style={{ textShadow: "1.5px 1.5px 0px #000000" }}>
                  {rawDayOfWeek.toUpperCase()}
                </span>
                <span className="text-[#FFB800] font-black text-sm mx-1">|</span>
                <span className="text-white font-serif font-black text-base sm:text-lg tracking-[0.2em] tabular-nums whitespace-nowrap" style={{ textShadow: "2px 2px 0px #000000" }}>
                  {timeStr.split("").join(" ")}
                </span>
              </div>

              {/* BARRA DIVISÓRIA HORIZONTAL DOURADA LARGURA TOTAL */}
              <div className="w-full h-[2.5px] bg-[#FFB800] rounded-full my-1 shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />

              {/* Linha Central: DATA COMPLETA POR EXTENSO */}
              <div className="w-full text-center">
                <span className="text-white font-serif font-bold text-[10px] sm:text-[11px] tracking-[0.22em] uppercase whitespace-nowrap" style={{ textShadow: "1.5px 1.5px 0px #000000" }}>
                  {dateStr.toUpperCase()}
                </span>
              </div>

              {/* Linha Inferior: CLIMA EM BORDER BADGE DOURADO */}
              <div className="mt-1 flex justify-center">
                <div className="px-3 py-0.5 rounded-full border border-[#FFB800]/80 bg-black/50 text-[#FFB800] font-serif font-bold text-[9px] tracking-wider uppercase flex items-center gap-1">
                  <span>☀ CLIMA: Tete / Cahora-Bassa 28°C (Max: 32°C / Min: 22°C)</span>
                </div>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: NOME E FOTO DO UTILIZADOR + GRUPO DE BOTÕES DE AÇÃO (Conforme Imagem Oficial) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Perfil do Utilizador com Indicador Verde On-line */}
            <div className="relative">
              <div className="flex items-center rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 p-1 pr-3">
                <button
                  type="button"
                  onClick={() => setShowColabProfileModal(true)}
                  className="flex items-center gap-2.5 cursor-pointer text-left"
                  title={`Editar Perfil: ${realUserName}`}
                >
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full border-2 border-blue-500/50 bg-slate-800 flex items-center justify-center overflow-hidden font-black text-white text-xs">
                      {activeRealUserPhoto ? (
                        <img src={activeRealUserPhoto} alt={realUserName} className="w-full h-full object-cover" />
                      ) : (
                        userInitials
                      )}
                    </div>
                    {/* Indicador Verde ON-LINE */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#070e24] rounded-full shadow-sm" />
                  </div>
                  <div className="flex flex-col items-start leading-none text-left max-w-[150px] sm:max-w-[200px]">
                    <span className="text-[11px] font-black text-white tracking-wide uppercase truncate">
                      {shortRealUserName}
                    </span>
                    <span className="text-[8px] font-bold text-emerald-400 uppercase mt-0.5 tracking-wider truncate">
                      ON-LINE • EDITAR DADOS & FOTO
                    </span>
                  </div>
                </button>
                <button onClick={() => setShowMenu(!showMenu)} className="p-1 text-white/50 hover:text-white border-l border-white/10 ml-1 cursor-pointer">
                  <ChevronDown size={14} />
                </button>
              </div>

              <AnimatePresence>
                {showMenu && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-2 w-64 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 z-[60]">
                    <div className="px-4 py-3 border-b border-white/5 bg-white/5">
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Utilizador Conectado</p>
                      <p className="text-xs font-black text-white mt-0.5 break-words">{realUserName}</p>
                    </div>
                    <button onClick={() => { setShowColabProfileModal(true); setShowMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold text-emerald-300 hover:bg-white/10 text-left cursor-pointer">
                      <UserCog size={14} /> Atualizar Dados do Colaborador
                    </button>
                    <button onClick={() => { setShowPasswordModal(true); setShowMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold text-white/70 hover:bg-white/5 text-left cursor-pointer">
                      <Settings size={14} /> Alterar Palavra-passe
                    </button>
                    <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold text-red-400 hover:bg-red-500/10 text-left cursor-pointer">
                      <LogOut size={14} /> Sair do Sistema
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Grupo de Ações em Caixa Arredondada (Idioma, Sincronizar, BD, Minimizar, Fullscreen, Sair) */}
            <div className="flex items-center gap-1.5 bg-black/30 p-1.5 rounded-2xl border border-white/10">
              <LanguageDropdown user={user} />

              <button onClick={onSync} title="Sincronizar" className="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-500/40 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition cursor-pointer">
                <RefreshCcw size={15} />
              </button>
              <button onClick={onOpenBackup} title="Base de Dados" className="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-500/40 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition cursor-pointer">
                <Database size={15} />
              </button>
              <button onClick={onMinimize} title="Minimizar" className="w-8 h-8 flex items-center justify-center rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition cursor-pointer">
                <Minus size={15} strokeWidth={3} />
              </button>
              <button onClick={toggleFullscreen} title="Ecrã Completo" className="w-8 h-8 flex items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition cursor-pointer">
                {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
              <button onClick={onLogout} title="Sair do Sistema" className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer">
                <LogOut size={15} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* BARRA INFERIOR / SECUNDÁRIA DO CABEÇALHO (Conforme Imagem Oficial) */}
        <div className="w-full px-4 py-2 bg-[#050a18]/90 border-t border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Botão ← Voltar em Caixa Azul Arredondada */}
            <button
              onClick={() => {
                if (onBack) onBack();
                else if (typeof window !== "undefined" && window.history.length > 1) window.history.back();
                else window.dispatchEvent(new CustomEvent("open_view", { detail: { view: "menu" } }));
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-900/60 hover:bg-blue-800/80 text-blue-200 border border-blue-400/40 transition font-bold text-xs shadow-sm cursor-pointer shrink-0"
            >
              <ArrowLeft size={14} />
              <span>Voltar</span>
            </button>

            {/* Ícone de Globo em Caixa Azul */}
            <div className="p-1.5 bg-blue-500/20 rounded-lg text-blue-400 shrink-0">
              <Globe size={16} />
            </div>

            {/* Trilha de Navegação (Início / Módulo / Ação) em Tipo de Letra Serifada/Itálico */}
            <div className="flex items-center gap-2 min-w-0 overflow-x-auto scrollbar-none py-0.5 font-serif italic text-white text-xs font-bold">
              <span
                onClick={() => window.dispatchEvent(new CustomEvent("open_view", { detail: { view: "menu" } }))}
                className="hover:text-blue-300 cursor-pointer shrink-0"
              >
                Início
              </span>

              {breadcrumb && breadcrumb.length > 0 ? (
                breadcrumb.map((crumb, idx) => (
                  <React.Fragment key={idx}>
                    <span className="text-white/40 not-italic shrink-0">/</span>
                    <span className="shrink-0 truncate max-w-[180px]">{crumb}</span>
                  </React.Fragment>
                ))
              ) : (
                <>
                  <span className="text-white/40 not-italic shrink-0">/</span>
                  <span className="shrink-0 truncate max-w-[220px]">Unidade Gestora e ...</span>
                </>
              )}

              <span className="text-white/40 not-italic shrink-0">/</span>
              <span className="uppercase font-black not-italic text-white tracking-wider shrink-0">
                {title ? translateMenuTitle(title, currentLang) : "GESTÃO DE FORNECEDORES"}
              </span>
            </div>
          </div>

          {/* Botão de Notificações / Sino com Ponto Ativo no Lado Direito */}
          <div className="shrink-0">
            <NotificationCenter
              user={user}
              triggerClassName="p-2.5 rounded-xl bg-indigo-900/60 hover:bg-indigo-900/80 transition border border-indigo-500/40 text-indigo-200 hover:text-white relative cursor-pointer"
              unreadMessagesCount={unreadMessagesCount}
              onOpenMessages={onOpenMessages}
            />
          </div>
        </div>
      </header>
    </>
  );
}

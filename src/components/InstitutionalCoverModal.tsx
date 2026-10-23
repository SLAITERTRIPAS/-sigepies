import React from "react";
import { getSystemLogo } from "../lib/logoService";
import {
  Award,
  Building2,
  CheckCircle2,
  ChevronRight,
  Compass,
  Shield,
  Users,
  Sparkles,
  MapPin,
  GraduationCap,
  ArrowRight,
  BookOpen,
  Building,
  Check,
  FileText,
  Globe,
  Info,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useCurrentLanguage, getTranslation, translateInstitutionName, translateInstitutionalText, setLanguagePreference, LANGUAGE_OPTIONS } from "../lib/i18n";

interface InstitutionalCoverModalProps {
  isOpen: boolean;
  user: any;
  instituicao?: any;
  onConfirm: () => void;
}

export default function InstitutionalCoverModal({
  isOpen,
  user,
  instituicao,
  onConfirm,
}: InstitutionalCoverModalProps) {
  if (!isOpen || !user) return null;

  const lang = useCurrentLanguage();
  const rawInstName = instituicao?.nome || "Instituto Superior Politécnico de Songo";
  const instName = translateInstitutionName(rawInstName, lang);
  const userName = user.nome || user.name || user.usuario || (lang === "en" ? "Civil Servant" : "Colaborador(a)");
  const rawUserRole = user.cargo || user.role || user.funcao || (lang === "en" ? `Staff of ${instituicao?.sigla || 'ISPS'}` : `Servidor do ${instituicao?.sigla || 'ISPS'}`);
  const userRole = translateInstitutionalText(rawUserRole, lang);
  const rawUserOrg =
    user.unidadeOrganica ||
    user.orgao ||
    user.direcao ||
    user.departamento ||
    rawInstName;
  const userOrg = translateInstitutionalText(rawUserOrg, lang);

  return (
    <div className="fixed inset-0 z-[999999] bg-[#030712]/95 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-screen h-screen sm:w-[96vw] sm:h-[96vh] rounded-none sm:rounded-3xl shadow-2xl border-2 border-amber-400/50 overflow-hidden flex flex-col transition-all text-[12px]">
        
        {/* Banner de Topo com Cores Oficiais e Emblemas */}
      <div className="bg-gradient-to-r from-[#0a0a5a] via-[#121c60] to-[#0a0a5a] text-white p-4 sm:p-6 text-center relative border-b-4 border-amber-400 shrink-0">
          <div className="absolute inset-0 opacity-10 bg-[radial-[#FFB800]_1px,transparent_1px] [background-size:16px_16px] pointer-events-none" />
          
          <div className="relative z-10 space-y-1.5">
            <div className="flex justify-center items-center gap-3 mb-2">
              <div className="p-1 bg-white/95 rounded-xl shadow-lg border border-amber-400/40">
                <img
                  src="https://lh3.googleusercontent.com/d/1wgnb7dls5c0YcO2V_Fh_E6iA09m1v6mX"
                  alt={getTranslation(lang, "repMozambique")}
                  className="h-10 sm:h-12 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center justify-center bg-transparent">
                <img
                  src={instituicao?.logoUrl && !instituicao.logoUrl.includes("11zvvpOpZARM1yk_irEDpjJ-qBKlTlhad") ? instituicao.logoUrl : (getSystemLogo() || "/assets/aistudio/logot_sigep-removebg-preview_60e9baa3.png")}
                  alt={instName}
                  className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <span className="inline-block px-3 py-0.5 bg-amber-400 text-[#0a0a5a] font-black text-[10px] uppercase tracking-widest rounded-full shadow-sm">
              {getTranslation(lang, "repMozambiqueMCTES")}
            </span>

            <h1 className="text-base sm:text-xl font-black uppercase tracking-tight text-amber-300 font-serif">
              {getTranslation(lang, "institutionalCoverTitle")}
            </h1>
            <p className="text-[11px] text-slate-300 font-medium">
              {getTranslation(lang, "institutionalCoverSubtitle")}
            </p>
          </div>
        </div>

        {/* Corpo de Apresentação da Instituição e Utilizador */}
        <div className="p-6 sm:p-8 space-y-5 overflow-y-auto flex-1 bg-slate-50/50 text-[12px] leading-relaxed text-slate-800 text-justify">
          
          {/* Cartão de Identificação do Utilizador Logado */}
          <div className="bg-gradient-to-r from-blue-50 via-white to-amber-50/40 border-2 border-blue-200/80 rounded-2xl p-4 shadow-sm space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs font-black text-[#0a0a5a] uppercase tracking-wider">
              <UserCheck size={16} className="text-amber-600 shrink-0" />
              <span>{getTranslation(lang, "userDataTitle")}</span>
            </div>
            
            <div className="pt-1 border-t border-blue-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">{getTranslation(lang, "userServerLabel")}</p>
                <p className="text-[12px] font-black text-slate-900">{userName}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">{getTranslation(lang, "roleFunctionLabel")}</p>
                <p className="text-[12px] font-bold text-[#0a0a5a]">{userRole}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">{getTranslation(lang, "organUnitLabel")}</p>
                <p className="text-[12px] font-bold text-slate-700">{userOrg} ({instName})</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 font-sans text-slate-700 text-[12px] text-justify">
            <p>
              {getTranslation(lang, "institutionalNoteP1")}
            </p>
            <p>
              {getTranslation(lang, "institutionalNoteP2")}
            </p>
            <p>
              {getTranslation(lang, "institutionalNoteP3")}
            </p>
          </div>
        </div>

        {/* Rodapé e Ação */}
        <div className="p-4 sm:p-6 bg-slate-100 border-t border-slate-200 text-center space-y-4 shrink-0">
          {/* Caixa de Seleção de Idioma na Capa Principal */}
          <div className="bg-white border-2 border-amber-400/60 rounded-2xl p-3 shadow-md max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-blue-900 shrink-0" />
              <span className="text-xs font-black text-[#0a0a5a] uppercase tracking-wider text-left">
                {getTranslation(lang, "selectLanguageToContinue")}
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {LANGUAGE_OPTIONS.filter(o => o.code !== "auto").map((opt) => {
                const isSelected = lang === opt.code;
                return (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={async () => {
                      await setLanguagePreference(opt.code as any, user);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm ${
                      isSelected
                        ? "bg-[#0a0a5a] text-amber-300 border-2 border-amber-400 shadow-md scale-105"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
                    }`}
                  >
                    <span className="text-sm">{opt.flag}</span>
                    <span>{opt.code.toUpperCase()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={onConfirm}
            className="w-full max-w-xl mx-auto bg-[#0a0a5a] hover:bg-[#121272] text-amber-400 hover:text-amber-300 py-3.5 px-6 rounded-xl font-black text-xs sm:text-sm tracking-widest uppercase transition-all shadow-xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 border-2 border-amber-400/50 cursor-pointer"
          >
            <span>🚀 {getTranslation(lang, "confirmCoverAccess")}</span>
            <ArrowRight size={18} className="text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
}


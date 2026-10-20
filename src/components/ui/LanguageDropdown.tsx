import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, ChevronDown, Check } from "lucide-react";
import {
  useCurrentLanguage,
  setLanguagePreference,
  LANGUAGE_OPTIONS,
  LanguageOption,
  SupportedLanguage,
} from "../../lib/i18n";

interface LanguageDropdownProps {
  user?: any;
  compact?: boolean;
  className?: string;
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  user,
  compact = false,
  className = "",
}) => {
  const currentLang = useCurrentLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Modo selecionado (pode ser "auto" ou código de idioma)
  const [activeMode, setActiveMode] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("idioma_mode") || currentLang;
    }
    return currentLang;
  });

  useEffect(() => {
    const handleLangChange = (e: any) => {
      if (e?.detail?.mode) {
        setActiveMode(e.detail.mode);
      } else {
        const storedMode = localStorage.getItem("idioma_mode");
        setActiveMode(storedMode || currentLang);
      }
    };

    window.addEventListener("sigep_language_changed", handleLangChange);
    return () => {
      window.removeEventListener("sigep_language_changed", handleLangChange);
    };
  }, [currentLang]);

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = async (opt: LanguageOption) => {
    setActiveMode(opt.code);
    await setLanguagePreference(opt.code, user);
    setIsOpen(false);
  };

  const currentOption =
    activeMode === "auto"
      ? LANGUAGE_OPTIONS.find((o) => o.code === "auto") || LANGUAGE_OPTIONS[0]
      : LANGUAGE_OPTIONS.find((o) => o.code === currentLang) || LANGUAGE_OPTIONS[0];

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Botão Gatilho no Cabeçalho */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white transition-all duration-200 shadow-sm cursor-pointer select-none active:scale-95 group focus:outline-none focus:ring-2 focus:ring-blue-400/50"
        title="Alterar Idioma do Sistema (PT, EN, FR, ES, AUTO)"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe
          size={14}
          className="text-blue-400 group-hover:rotate-45 transition-transform duration-300 shrink-0"
        />
        
        <span className="text-sm shrink-0">{currentOption.flag}</span>

        {!compact && (
          <span className="text-xs font-black tracking-wider uppercase text-slate-100 hidden sm:inline-block">
            {activeMode === "auto" ? "AUTO" : currentOption.code.toUpperCase()}
          </span>
        )}

        <ChevronDown
          size={12}
          className={`text-white/60 group-hover:text-white transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menu Suspenso (Dropdown) com Animação Fluida */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.65)] py-2 z-[999] overflow-hidden"
          >
            {/* Cabeçalho do Menu */}
            <div className="px-3.5 py-2 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe size={13} className="text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                  Idioma / Language
                </span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                i18n
              </span>
            </div>

            {/* Lista de Idiomas */}
            <div className="py-1">
              {LANGUAGE_OPTIONS.map((opt) => {
                const isSelected = activeMode === opt.code;
                return (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold text-left transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-blue-600/30 text-white border-l-3 border-blue-400"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base shrink-0">{opt.flag}</span>
                      <div className="flex flex-col min-w-0">
                        <span className="font-extrabold tracking-wide text-[11px] leading-tight">
                          {opt.label}
                        </span>
                        <span className="text-[9px] text-slate-400 truncate font-normal leading-tight">
                          {opt.nativeLabel}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <Check
                        size={14}
                        className="text-blue-400 shrink-0 ml-2 animate-in zoom-in-50 duration-200"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Rodapé Informativo */}
            <div className="px-3.5 pt-2 pb-1 mt-1 border-t border-white/10 bg-black/25">
              <p className="text-[9px] text-slate-400 text-center font-medium leading-relaxed">
                Persistência em tempo real (localStorage & Firestore)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageDropdown;

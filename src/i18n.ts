export const SUPPORTED_LANGUAGES = ["pt", "en", "fr", "es"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export interface LanguageOption {
  code: SupportedLanguage | "auto";
  label: string;
  nativeLabel?: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "pt", label: "Português", nativeLabel: "Português (Moçambique / Portugal)", flag: "🇵🇹" },
  { code: "en", label: "English", nativeLabel: "English (United States / UK)", flag: "🇬🇧" },
  { code: "fr", label: "Français", nativeLabel: "Français (France / Afrique)", flag: "🇫🇷" },
  { code: "es", label: "Español", nativeLabel: "Español (España / América)", flag: "🇪🇸" },
  { code: "auto", label: "Automático", nativeLabel: "Deteção do Navegador", flag: "🌐" },
];

export function resolveInitialLanguage(preferred?: string | null): SupportedLanguage {
  if (preferred && (SUPPORTED_LANGUAGES as readonly string[]).includes(preferred)) {
    return preferred as SupportedLanguage;
  }
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem("idioma") || localStorage.getItem("sigep_language");
    if (stored && (SUPPORTED_LANGUAGES as readonly string[]).includes(stored)) {
      return stored as SupportedLanguage;
    }
  }
  if (typeof navigator !== "undefined" && navigator.language) {
    const code = navigator.language.split("-")[0].toLowerCase();
    if ((SUPPORTED_LANGUAGES as readonly string[]).includes(code)) {
      return code as SupportedLanguage;
    }
  }
  return "pt";
}

export function changeSystemLanguage(lang: SupportedLanguage | "auto", user?: any) {
  const resolved = lang === "auto" ? resolveInitialLanguage() : lang;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("idioma", resolved);
    localStorage.setItem("sigep_language", resolved);
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("language_changed", { detail: { lang: resolved } }));
  }
  return resolved;
}

const listeners = new Set<(...args: any[]) => void>();

const i18n = {
  language: "pt",
  changeLanguage: changeSystemLanguage,
  on: (event: string, callback: (...args: any[]) => void) => {
    listeners.add(callback);
  },
  off: (event: string, callback: (...args: any[]) => void) => {
    listeners.delete(callback);
  },
};

export default i18n;

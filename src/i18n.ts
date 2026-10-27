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

const eventListeners = new Map<string, Set<(...args: any[]) => void>>();

export const i18n = {
  language: "pt",
  languages: ["pt", "en", "fr", "es"],
  isInitialized: true,
  options: {
    fallbackLng: "pt",
    defaultNS: "translation",
  },
  services: {
    resourceStore: {
      data: {},
    },
  },
  store: {
    data: {},
  },
  changeLanguage: async (lang: SupportedLanguage | "auto", callback?: any) => {
    const res = changeSystemLanguage(lang);
    if (callback) callback(null, res);
    return Promise.resolve(res);
  },
  on: (event: string, callback: (...args: any[]) => void) => {
    if (!eventListeners.has(event)) {
      eventListeners.set(event, new Set());
    }
    eventListeners.get(event)!.add(callback);
    return i18n;
  },
  off: (event: string, callback: (...args: any[]) => void) => {
    if (eventListeners.has(event)) {
      eventListeners.get(event)!.delete(callback);
    }
    return i18n;
  },
  emit: (event: string, ...args: any[]) => {
    if (eventListeners.has(event)) {
      eventListeners.get(event)!.forEach((fn) => {
        try {
          fn(...args);
        } catch (_) {}
      });
    }
  },
  loadNamespaces: async (_ns: any, callback?: any) => {
    if (callback) callback();
    return Promise.resolve();
  },
  hasResourceBundle: (_lng: string, _ns: string) => true,
  getResourceBundle: (_lng: string, _ns: string) => ({}),
  t: (key: string) => key,
  exists: (_key: string) => true,
  getFixedT: () => (key: string) => key,
  use: () => i18n,
  init: () => i18n,
};

export default i18n;

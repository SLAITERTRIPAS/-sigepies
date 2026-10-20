import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./lib/firebase";

export const SUPPORTED_LANGUAGES = ["pt", "en", "fr", "es"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export interface LanguageOption {
  code: SupportedLanguage | "auto";
  label: string;
  flag: string;
  nativeLabel: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "pt", label: "Português", nativeLabel: "Português (Moçambique)", flag: "🇲🇿" },
  { code: "en", label: "English", nativeLabel: "English (Global)", flag: "🇬🇧" },
  { code: "fr", label: "Français", nativeLabel: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", nativeLabel: "Español", flag: "🇪🇸" },
  { code: "auto", label: "Auto", nativeLabel: "Deteção Automática (Navegador)", flag: "🌍" },
];

/**
 * 3. Prioridade de seleção:
 * 1º Idioma gravado pelo utilizador (localStorage 'idioma' ou 'sigep_language')
 * 2º Idioma definido no perfil do usuário (user?.idioma)
 * 3º Idioma do navegador (navigator.language)
 * 4º Português (fallback padrão)
 */
export function resolveInitialLanguage(userProfileLanguage?: string | null): SupportedLanguage {
  if (typeof window === "undefined") return "pt";

  // 1º Idioma gravado pelo utilizador
  const saved = localStorage.getItem("idioma") || localStorage.getItem("sigep_language");
  if (saved && (SUPPORTED_LANGUAGES as readonly string[]).includes(saved)) {
    return saved as SupportedLanguage;
  }

  // 2º Idioma definido no perfil
  if (userProfileLanguage && (SUPPORTED_LANGUAGES as readonly string[]).includes(userProfileLanguage)) {
    return userProfileLanguage as SupportedLanguage;
  }

  // 3º Idioma do navegador
  if (typeof navigator !== "undefined" && navigator.language) {
    const browserCode = navigator.language.split("-")[0].toLowerCase();
    if ((SUPPORTED_LANGUAGES as readonly string[]).includes(browserCode)) {
      return browserCode as SupportedLanguage;
    }
  }

  // 4º Fallback
  return "pt";
}

export const resources = {
  pt: {
    translation: {
      systemTitle: "SIGEP - Sistema Integrado de Gestão Estratégica e Planificação",
      languageName: "Português",
      languageSelect: "Selecionar Idioma",
      autoLanguage: "Automático (Navegador)",
      systemLoading: "SISTEMA CARREGANDO",
      pleaseWait: "Aguarde um momento...",
      activityPlan: "Plano de Actividade",
      activityPlanOf: "Plano de Actividade de {{name}}",
      online: "ON-LINE",
      userConnected: "Utilizador Conectado",
      institution: "Instituição",
      loggedInstitution: "INSTITUIÇÃO LOGADA",
      integratedSystem: "SISTEMA DE GESTÃO INTEGRADA",
      generalAdminPanel: "PAINEL ADMINISTRADOR GERAL",
      changePassword: "Alterar Palavra-passe",
      updateEmployeeData: "Atualizar Dados do Colaborador",
      logout: "Terminar Sessão",
      sync: "Sincronizar",
      database: "Base de Dados",
      minimize: "Minimizar",
      fullscreen: "Ecrã Completo",
      restoreScreen: "Restaurar Ecrã",
      officialClock: "Relógio Oficial",
      moreAccountOptions: "Mais opções da conta",
      financialYear: "Exercício Económico",
      republicOfMozambique: "República de Moçambique",
      ministryOfEducation: "Ministério da Educação e Cultura",
      dirHigherEd: "Direcção Nacional de Ensino Superior",
      save: "Guardar",
      cancel: "Cancelar",
      search: "Pesquisar",
      filter: "Filtrar",
      all: "Todos",
      dashboard: "Painel de Controlo",
      planning: "Planificação",
      reports: "Relatórios",
      settings: "Configurações",
      users: "Utilizadores",
      notifications: "Notificações",
      aiAssistant: "Assistente de Inteligência Artificial",
      aiLanguageNotice: "A IA responde exclusivamente no idioma selecionado",
      concurrentLoginsActive: "Suporte a acessos simultâneos de alta capacidade ativo (50.000+ utilizadores)",
      sessionActive: "Sessão Conectada",
    },
  },
  en: {
    translation: {
      systemTitle: "SIGEP - Integrated Strategic Management and Planning System",
      languageName: "English",
      languageSelect: "Select Language",
      autoLanguage: "Automatic (Browser)",
      systemLoading: "SYSTEM LOADING",
      pleaseWait: "Please wait a moment...",
      activityPlan: "Activity Plan",
      activityPlanOf: "Activity Plan of {{name}}",
      online: "ONLINE",
      userConnected: "Connected User",
      institution: "Institution",
      loggedInstitution: "LOGGED INSTITUTION",
      integratedSystem: "INTEGRATED MANAGEMENT SYSTEM",
      generalAdminPanel: "GENERAL ADMIN PANEL",
      changePassword: "Change Password",
      updateEmployeeData: "Update Employee Data",
      logout: "Sign Out",
      sync: "Sync",
      database: "Database",
      minimize: "Minimize",
      fullscreen: "Fullscreen",
      restoreScreen: "Restore Screen",
      officialClock: "Official Clock",
      moreAccountOptions: "More account options",
      financialYear: "Financial Year",
      republicOfMozambique: "Republic of Mozambique",
      ministryOfEducation: "Ministry of Education and Culture",
      dirHigherEd: "National Directorate of Higher Education",
      save: "Save",
      cancel: "Cancel",
      search: "Search",
      filter: "Filter",
      all: "All",
      dashboard: "Dashboard",
      planning: "Planning",
      reports: "Reports",
      settings: "Settings",
      users: "Users",
      notifications: "Notifications",
      aiAssistant: "Artificial Intelligence Assistant",
      aiLanguageNotice: "AI responds exclusively in the selected language",
      concurrentLoginsActive: "High-capacity concurrent logins active (50,000+ users)",
      sessionActive: "Session Connected",
    },
  },
  fr: {
    translation: {
      systemTitle: "SIGEP - Système Intégré de Gestion Stratégique et de Planification",
      languageName: "Français",
      languageSelect: "Choisir la Langue",
      autoLanguage: "Automatique (Navigateur)",
      systemLoading: "SYSTÈME EN CHARGEMENT",
      pleaseWait: "Veuillez patienter un moment...",
      activityPlan: "Plan d'Activité",
      activityPlanOf: "Plan d'Activité de {{name}}",
      online: "EN LIGNE",
      userConnected: "Utilisateur Connecté",
      institution: "Institution",
      loggedInstitution: "INSTITUTION CONNECTÉE",
      integratedSystem: "SYSTÈME DE GESTION INTÉGRÉE",
      generalAdminPanel: "PANNEAU D'ADMINISTRATION GÉNÉRALE",
      changePassword: "Changer le Mot de Passe",
      updateEmployeeData: "Mettre à jour les Données du Collaborateur",
      logout: "Déconnexion",
      sync: "Synchroniser",
      database: "Base de Données",
      minimize: "Réduire",
      fullscreen: "Plein Écran",
      restoreScreen: "Restaurer l'Écran",
      officialClock: "Horloge Officielle",
      moreAccountOptions: "Plus d'options de compte",
      financialYear: "Exercice Financier",
      republicOfMozambique: "République du Mozambique",
      ministryOfEducation: "Ministère de l'Éducation et de la Culture",
      dirHigherEd: "Direction Nationale de l'Enseignement Supérieur",
      save: "Enregistrer",
      cancel: "Annuler",
      search: "Rechercher",
      filter: "Filtrer",
      all: "Tous",
      dashboard: "Tableau de Bord",
      planning: "Planification",
      reports: "Rapports",
      settings: "Paramètres",
      users: "Utilisateurs",
      notifications: "Notifications",
      aiAssistant: "Assistant d'Intelligence Artificielle",
      aiLanguageNotice: "L'IA répond exclusivement dans la langue sélectionnée",
      concurrentLoginsActive: "Prise en charge des connexions simultanées haute capacité active (50 000+ utilisateurs)",
      sessionActive: "Session Connectée",
    },
  },
  es: {
    translation: {
      systemTitle: "SIGEP - Sistema Integrado de Gestión Estratégica y Planificación",
      languageName: "Español",
      languageSelect: "Seleccionar Idioma",
      autoLanguage: "Automático (Navegador)",
      systemLoading: "SISTEMA CARGANDO",
      pleaseWait: "Espere un momento...",
      activityPlan: "Plan de Actividades",
      activityPlanOf: "Plan de Actividades de {{name}}",
      online: "EN LÍNEA",
      userConnected: "Usuario Conectado",
      institution: "Institución",
      loggedInstitution: "INSTITUCIÓN CONECTADA",
      integratedSystem: "SISTEMA DE GESTIÓN INTEGRADA",
      generalAdminPanel: "PANEL ADMINISTRADOR GENERAL",
      changePassword: "Cambiar Contraseña",
      updateEmployeeData: "Actualizar Datos del Colaborador",
      logout: "Cerrar Sesión",
      sync: "Sincronizar",
      database: "Base de Datos",
      minimize: "Minimizar",
      fullscreen: "Pantalla Completa",
      restoreScreen: "Restaurar Pantalla",
      officialClock: "Reloj Oficial",
      moreAccountOptions: "Más opciones de la cuenta",
      financialYear: "Ejercicio Económico",
      republicOfMozambique: "República de Mozambique",
      ministryOfEducation: "Ministerio de Educación y Cultura",
      dirHigherEd: "Dirección Nacional de Educación Superior",
      save: "Guardar",
      cancel: "Cancelar",
      search: "Buscar",
      filter: "Filtrar",
      all: "Todos",
      dashboard: "Panel de Control",
      planning: "Planificación",
      reports: "Informes",
      settings: "Configuraciones",
      users: "Usuarios",
      notifications: "Notificaciones",
      aiAssistant: "Asistente de Inteligencia Artificial",
      aiLanguageNotice: "La IA responde exclusivamente en el idioma seleccionado",
      concurrentLoginsActive: "Soporte de conexiones simultáneas de alta capacidad activo (50.000+ usuarios)",
      sessionActive: "Sesión Conectada",
    },
  },
};

const initialLang = resolveInitialLanguage();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang,
    fallbackLng: "pt",
    supportedLngs: ["pt", "en", "fr", "es"],
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "idioma",
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

/**
 * 4. Tradução instantânea & Sincronização
 * Atualiza imediatamente Menus, Formulários, Botões, Notificações, Dashboard, Relatórios e IA
 * sem necessidade de recarregar a página.
 */
export async function changeSystemLanguage(
  targetLanguage: SupportedLanguage | "auto",
  user?: any
): Promise<SupportedLanguage> {
  let effectiveLang: SupportedLanguage = "pt";

  if (targetLanguage === "auto") {
    localStorage.setItem("idioma_mode", "auto");
    const browserCode =
      typeof navigator !== "undefined"
        ? navigator.language.split("-")[0].toLowerCase()
        : "pt";
    effectiveLang = (SUPPORTED_LANGUAGES as readonly string[]).includes(browserCode)
      ? (browserCode as SupportedLanguage)
      : "pt";
  } else {
    localStorage.setItem("idioma_mode", targetLanguage);
    effectiveLang = targetLanguage;
  }

  // Guardar a preferência
  localStorage.setItem("idioma", effectiveLang);
  localStorage.setItem("sigep_language", effectiveLang);

  // Mudar no i18next instantaneamente
  await i18n.changeLanguage(effectiveLang);

  if (typeof document !== "undefined") {
    document.documentElement.lang = effectiveLang;
  }

  // Atualizar cache local do utilizador autenticado
  if (typeof window !== "undefined") {
    try {
      const storedUserStr = localStorage.getItem("sigep_logged_in_user");
      if (storedUserStr) {
        const u = JSON.parse(storedUserStr);
        u.idioma = effectiveLang;
        u.idioma_mode = targetLanguage;
        localStorage.setItem("sigep_logged_in_user", JSON.stringify(u));
      }
    } catch (e) {
      // Ignorar falhas silenciosas de storage
    }
  }

  // Sincronizar no Firestore se o utilizador estiver autenticado
  const uid = user?.uid || user?.id;
  if (uid && typeof uid === "string" && !uid.startsWith("local_")) {
    try {
      await updateDoc(doc(db, "users", uid), {
        idioma: effectiveLang,
        idioma_mode: targetLanguage,
      });
    } catch (err) {
      // Falha suave de rede não impede a atualização local imediata
      console.warn("[i18n] Não foi possível sincronizar idioma no Firestore:", err);
    }
  }

  // Notificar toda a aplicação via evento global para reatividade ultra-rápida
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("sigep_language_changed", {
        detail: {
          lang: effectiveLang,
          mode: targetLanguage,
        },
      })
    );
  }

  return effectiveLang;
}

export default i18n;

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "./firebase";

export interface SystemErrorLog {
  date: string;
  timestamp: any;
  userId?: string | null;
  userEmail?: string | null;
  module?: string;
  errorMessage: string;
  stackTrace?: string;
  userAgent?: string;
  url?: string;
}

export type ErrorType =
  | "no_data"
  | "network"
  | "auth_expired"
  | "permission"
  | "render"
  | "unexpected";

export interface FriendlyErrorFormat {
  type: ErrorType;
  title: string;
  message: string;
  actionText?: string;
}

/**
 * Classifica e formata um erro de forma diferenciada conforme as RE-01 e RE-02 do SIGEP
 */
export function classifyAndFormatError(error: any, contextModule: string = "Geral"): FriendlyErrorFormat {
  const msg = String(error?.message || error?.reason || error || "").toLowerCase();

  // 1. Rede / Internet
  if (
    msg.includes("failed to fetch") ||
    msg.includes("network error") ||
    msg.includes("could not reach cloud firestore") ||
    msg.includes("client is offline") ||
    msg.includes("net::err")
  ) {
    return {
      type: "network",
      title: "Sem ligação à Internet",
      message: "Verifique a sua ligação e tente novamente.",
      actionText: "Tentar Novamente",
    };
  }

  // 2. Permissão Insuficiente
  if (
    msg.includes("permission-denied") ||
    msg.includes("missing or insufficient permissions") ||
    msg.includes("sem permissão") ||
    msg.includes("acesso restrito")
  ) {
    return {
      type: "permission",
      title: "Permissão insuficiente",
      message: "Não possui permissões para visualizar esta informação.",
    };
  }

  // 3. Sessão Expirada
  if (
    msg.includes("auth/id-token-expired") ||
    msg.includes("session-expired") ||
    msg.includes("unauthenticated") ||
    msg.includes("user-not-found")
  ) {
    return {
      type: "auth_expired",
      title: "Sessão expirada",
      message: "A sua sessão expirou. Por favor, inicie sessão novamente.",
      actionText: "Iniciar Sessão",
    };
  }

  // 4. Sem Dados / Dados Inexistentes
  if (
    msg.includes("no_data") ||
    msg.includes("empty") ||
    msg.includes("not-found") ||
    msg.includes("dados inexistentes")
  ) {
    return {
      type: "no_data",
      title: "Sem informações disponíveis",
      message: "Ainda não existem dados disponíveis para apresentar.",
    };
  }

  // 5. Erro Genérico / Inesperado
  return {
    type: "unexpected",
    title: "Erro inesperado",
    message: "Ocorreu um erro inesperado. A equipa técnica foi notificada.",
    actionText: "Recarregar",
  };
}

/**
 * Regista o log técnico de erro no Firestore (coleção 'systemErrors' e 'logs') para auditoria (RE-05)
 */
export async function logSystemError(
  error: any,
  module: string = "Geral",
  customUserId?: string,
  customUserEmail?: string
): Promise<void> {
  try {
    const currentUser = auth.currentUser;
    const errorMessage = error?.message || String(error || "Erro desconhecido");
    const stackTrace = error?.stack || String(error?.componentStack || "");

    const payload: SystemErrorLog = {
      date: new Date().toISOString(),
      timestamp: serverTimestamp(),
      userId: customUserId || currentUser?.uid || "anonimo",
      userEmail: customUserEmail || currentUser?.email || "anonimo@sigep.mz",
      module,
      errorMessage,
      stackTrace,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "Node/Server",
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    // Gravação assíncrona sem bloquear a UI do utilizador
    addDoc(collection(db, "systemErrors"), payload).catch((err) => {
      console.warn("Aviso ao guardar log técnico no Firestore:", err);
    });
    addDoc(collection(db, "logs"), {
      ...payload,
      tipo: "ERRO_SISTEMA",
    }).catch(() => {});
  } catch (e) {
    console.error("Falha ao criar registo de log de erro:", e);
  }
}

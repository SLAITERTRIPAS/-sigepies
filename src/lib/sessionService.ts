import {
  collection,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  getDocs,
  query,
  where,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface SessionItem {
  id: string;
  userId: string;
  deviceName: string;
  userAgent: string;
  createdAt: string;
  lastSeenAt: string;
  expiresAt?: string | null;
  active: boolean;
  isCurrent?: boolean;
  ip?: string;
}

const SESSION_KEY = "sigep_session_id";
const TTL_HOURS_KEY = "sigep_session_ttl_hours";

/**
 * Obtém ou gera um ID único e estável de sessão para o dispositivo atual.
 */
export function getCurrentSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = "sess_" + Date.now() + "_" + Math.random().toString(36).substring(2, 10);
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

/**
 * Identifica o nome amigável do sistema operativo e navegador do dispositivo.
 */
export function getDeviceDetails(): string {
  if (typeof window === "undefined" || !navigator) return "Navegador Desconhecido";
  const ua = navigator.userAgent;

  let os = "Dispositivo Web";
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS")) os = "Mac OS";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Linux")) os = "Linux";

  let browser = "Navegador";
  if (ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("Chrome") && !ua.includes("Edg/")) browser = "Chrome";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Firefox")) browser = "Firefox";

  return `${browser} no ${os}`;
}

/**
 * Define o Time-To-Live (TTL) padrão em horas para a sessão do utilizador.
 */
export function setSessionTTL(ttlHours: number | null) {
  if (ttlHours && ttlHours > 0) {
    localStorage.setItem(TTL_HOURS_KEY, String(ttlHours));
  } else {
    localStorage.removeItem(TTL_HOURS_KEY);
  }
}

/**
 * Obtém o TTL configurado atualmente em horas.
 */
export function getSessionTTL(): number | null {
  const val = localStorage.getItem(TTL_HOURS_KEY);
  return val ? Number(val) : null;
}

/**
 * Regista/Atualiza a sessão ativa do utilizador na coleção users/{userId}/sessions/{sessionId}
 */
export async function createOrUpdateUserSession(
  userId: string,
  ttlHours?: number | null
): Promise<string> {
  if (!userId) return "";
  const sessionId = getCurrentSessionId();
  const deviceName = getDeviceDetails();
  const now = new Date();

  const selectedTtl = ttlHours !== undefined ? ttlHours : getSessionTTL();
  let expiresAt: string | null = null;
  if (selectedTtl && selectedTtl > 0) {
    const expDate = new Date(now.getTime() + selectedTtl * 60 * 60 * 1000);
    expiresAt = expDate.toISOString();
  }

  const sessionData: Partial<SessionItem> = {
    id: sessionId,
    userId,
    deviceName,
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    createdAt: now.toISOString(),
    lastSeenAt: now.toISOString(),
    expiresAt,
    active: true,
  };

  try {
    const sessionDocRef = doc(db, "users", userId, "sessions", sessionId);
    await setDoc(sessionDocRef, sessionData, { merge: true });

    // Cópia local para resiliência offline
    const localSessionsKey = `sigep_sessions_${userId}`;
    try {
      const existingStr = localStorage.getItem(localSessionsKey);
      let list: SessionItem[] = existingStr ? JSON.parse(existingStr) : [];
      list = list.filter((s) => s.id !== sessionId);
      list.push(sessionData as SessionItem);
      localStorage.setItem(localSessionsKey, JSON.stringify(list));
    } catch (_) {}
  } catch (err) {
    console.warn("Aviso ao registar sessão no Firestore:", err);
  }

  return sessionId;
}

/**
 * Subscreve todas as sessões ativas do utilizador para listagem em tempo real no SessionManager.
 */
export function subscribeToUserSessions(
  userId: string,
  callback: (sessions: SessionItem[]) => void
): () => void {
  if (!userId) {
    callback([]);
    return () => {};
  }

  const currentSessionId = getCurrentSessionId();

  try {
    const sessionsColRef = collection(db, "users", userId, "sessions");
    const q = query(sessionsColRef, where("active", "==", true));

    return onSnapshot(
      q,
      (snapshot) => {
        const now = new Date();
        const activeList: SessionItem[] = [];

        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data() as SessionItem;
          // Verificação de TTL (expiração)
          if (data.expiresAt && new Date(data.expiresAt) < now) {
            // Sessão expirada
            return;
          }
          activeList.push({
            ...data,
            id: docSnap.id,
            isCurrent: docSnap.id === currentSessionId,
          });
        });

        // Ordenar por criação / mais recente
        activeList.sort((a, b) => {
          if (a.isCurrent) return -1;
          if (b.isCurrent) return 1;
          return new Date(b.lastSeenAt || b.createdAt).getTime() - new Date(a.lastSeenAt || a.createdAt).getTime();
        });

        callback(activeList);
      },
      (error) => {
        console.warn("Aviso na escuta de sessões do utilizador:", error);
        // Fallback local
        try {
          const localStr = localStorage.getItem(`sigep_sessions_${userId}`);
          if (localStr) {
            const list: SessionItem[] = JSON.parse(localStr);
            callback(
              list
                .filter((s) => s.active)
                .map((s) => ({ ...s, isCurrent: s.id === currentSessionId }))
            );
          } else {
            callback([
              {
                id: currentSessionId,
                userId,
                deviceName: getDeviceDetails(),
                userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
                createdAt: new Date().toISOString(),
                lastSeenAt: new Date().toISOString(),
                active: true,
                isCurrent: true,
              },
            ]);
          }
        } catch (_) {
          callback([]);
        }
      }
    );
  } catch (err) {
    console.warn("Aviso ao configurar subscrição de sessões:", err);
    callback([]);
    return () => {};
  }
}

/**
 * Monitoriza especificamente a sessão DESTE DISPOSITIVO.
 * Se active == false ou se tiver expirado (TTL), notifica para terminar a sessão localmente.
 */
export function monitorCurrentSession(
  userId: string,
  onTerminated: (reason: string) => void
): () => void {
  if (!userId) return () => {};

  const currentSessionId = getCurrentSessionId();
  let isCleaningUp = false;

  try {
    const sessionDocRef = doc(db, "users", userId, "sessions", currentSessionId);

    const checkExpirationAndStatus = (data: any) => {
      if (isCleaningUp) return;

      if (!data || data.active === false) {
        isCleaningUp = true;
        onTerminated(
          "A sua sessão foi encerrada remotamente através de outro dispositivo ou painel de gestão de sessões do SIGEP."
        );
        return;
      }

      if (data.expiresAt) {
        const exp = new Date(data.expiresAt).getTime();
        if (Date.now() > exp) {
          isCleaningUp = true;
          onTerminated(
            "A sua sessão atingiu o limite de tempo configurado (TTL) e expirou por motivos de segurança institucional."
          );
          return;
        }
      }
    };

    const unsub = onSnapshot(
      sessionDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          checkExpirationAndStatus(docSnap.data());
        }
      },
      (err) => {
        console.warn("Aviso na monitorização da sessão atual:", err);
      }
    );

    // Intervalo local adicional para verificação de TTL (ex: se o servidor não enviar eventos)
    const interval = setInterval(() => {
      const ttl = getSessionTTL();
      if (ttl) {
        const startStr = localStorage.getItem("sigep_session_start_time");
        if (startStr) {
          const startTime = new Date(startStr).getTime();
          if (Date.now() - startTime > ttl * 60 * 60 * 1000) {
            isCleaningUp = true;
            onTerminated(
              "A sua sessão excedeu o tempo máximo de permanência (TTL) permitido e expirou automaticamente."
            );
          }
        }
      }
    }, 30000);

    return () => {
      unsub();
      clearInterval(interval);
    };
  } catch (e) {
    console.warn("Aviso ao monitorizar sessão atual:", e);
    return () => {};
  }
}

/**
 * Desconecta uma sessão específica do utilizador em tempo real enviando um sinal (active: false).
 */
export async function terminateUserSession(
  userId: string,
  sessionIdToTerminate: string
): Promise<boolean> {
  if (!userId || !sessionIdToTerminate) return false;

  try {
    const sessionDocRef = doc(db, "users", userId, "sessions", sessionIdToTerminate);
    await updateDoc(sessionDocRef, {
      active: false,
      terminatedAt: new Date().toISOString(),
    });

    // Atualizar cache local
    const localKey = `sigep_sessions_${userId}`;
    const localStr = localStorage.getItem(localKey);
    if (localStr) {
      let list: SessionItem[] = JSON.parse(localStr);
      list = list.map((s) => (s.id === sessionIdToTerminate ? { ...s, active: false } : s));
      localStorage.setItem(localKey, JSON.stringify(list));
    }

    return true;
  } catch (e) {
    console.warn("Erro ao desativar sessão:", e);
    return false;
  }
}

/**
 * Desconecta TODAS as outras sessões do utilizador, mantendo apenas a sessão do dispositivo atual.
 */
export async function terminateAllOtherSessions(userId: string): Promise<number> {
  if (!userId) return 0;
  const currentSessionId = getCurrentSessionId();
  let count = 0;

  try {
    const sessionsColRef = collection(db, "users", userId, "sessions");
    const q = query(sessionsColRef, where("active", "==", true));
    const snapshot = await getDocs(q);

    const promises: Promise<void>[] = [];
    snapshot.docs.forEach((docSnap) => {
      if (docSnap.id !== currentSessionId) {
        count++;
        promises.push(
          updateDoc(docSnap.ref, {
            active: false,
            terminatedAt: new Date().toISOString(),
          })
        );
      }
    });

    await Promise.all(promises);

    // Atualizar cache local
    const localKey = `sigep_sessions_${userId}`;
    const localStr = localStorage.getItem(localKey);
    if (localStr) {
      let list: SessionItem[] = JSON.parse(localStr);
      list = list.map((s) => (s.id !== currentSessionId ? { ...s, active: false } : s));
      localStorage.setItem(localKey, JSON.stringify(list));
    }

    return count;
  } catch (e) {
    console.warn("Erro ao encerrar outras sessões:", e);
    return count;
  }
}

/**
 * Atualiza o registo de presença (heartbeat) da sessão atual.
 */
export async function touchSessionHeartbeat(userId: string) {
  if (!userId) return;
  const sessionId = getCurrentSessionId();
  try {
    const sessionDocRef = doc(db, "users", userId, "sessions", sessionId);
    await setDoc(
      sessionDocRef,
      {
        lastSeenAt: new Date().toISOString(),
        active: true,
      },
      { merge: true }
    );
  } catch (_) {}
}

/**
 * Consulta se o utilizador já possui uma sessão ATIVA noutro dispositivo.
 * Usado para a Regra de Sessão Única Autorizada (CA-01, CA-02).
 */
export async function getActiveRemoteSession(userId: string): Promise<SessionItem | null> {
  if (!userId) return null;
  const currentSessionId = getCurrentSessionId();
  const now = new Date();

  try {
    const sessionsColRef = collection(db, "users", userId, "sessions");
    const q = query(sessionsColRef, where("active", "==", true));
    const snapshot = await getDocs(q);

    for (const docSnap of snapshot.docs) {
      if (docSnap.id !== currentSessionId) {
        const data = docSnap.data() as SessionItem;
        if (!data.expiresAt || new Date(data.expiresAt) > now) {
          return { ...data, id: docSnap.id };
        }
      }
    }
  } catch (e) {
    console.warn("Aviso ao verificar sessão remota ativa:", e);
  }

  return null;
}

import React, { ErrorInfo, ReactNode, Key } from "react";
import { logSystemError } from "../lib/errorLoggingService";

export interface ErrorBoundaryProps {
  children: ReactNode;
  onReset?: () => void;
  key?: Key;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
  errorCount: number;
}

const isIgnorableSystemError = (err: any) => {
  const m = String(err?.message || err?.reason || err?.stack || err || "").toLowerCase();
  return (
    m.includes("@firebase/firestore") ||
    m.includes("could not reach cloud firestore backend") ||
    m.includes("backend didn't respond within 10 seconds") ||
    m.includes("backend didn't respond") ||
    m.includes("internal assertion failed") ||
    m.includes("unexpected state") ||
    m.includes("client will operate in offline mode") ||
    m.includes("quota limit exceeded") ||
    m.includes("free daily read units") ||
    m.includes("resource-exhausted") ||
    m.includes("resource_exhausted") ||
    m.includes("quota exceeded") ||
    m.includes("resizeobserver loop completed with undelivered notifications") ||
    m.includes("resizeobserver loop limit exceeded") ||
    m.includes("firestore (11.")
  );
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: any = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    if (isIgnorableSystemError(error)) {
      return { hasError: false, error: null };
    }
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (isIgnorableSystemError(error)) {
      return;
    }

    console.error(
      "ErrorBoundary capturou falha de renderização:",
      error?.message || String(error),
      errorInfo?.componentStack || String(errorInfo)
    );

    // Registar log técnico no Firestore para auditoria (RE-05)
    logSystemError(
      {
        message: error?.message || String(error),
        stack: errorInfo?.componentStack || error?.stack || "",
      },
      "RenderizacaoComponente"
    );

    const isChunkLoadError =
      String(error?.message || "").toLowerCase().includes("dynamically imported module") ||
      String(error?.message || "").toLowerCase().includes("failed to fetch") ||
      String(error?.message || "").toLowerCase().includes("loading chunk");

    // Tentativa de recuperação automática (RE-04)
    if (isChunkLoadError && this.state.errorCount === 0) {
      this.setState((prev) => ({ errorCount: prev.errorCount + 1 }));
      this.resetTimeoutId = setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  handleTryAgain = () => {
    this.setState({ hasError: false, error: null, errorCount: 0 });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleGoToHome = () => {
    try {
      localStorage.setItem("sigep_current_view", "home");
    } catch (e) {
      console.warn("Erro ao definir rota inicial:", e);
    }
    this.setState({ hasError: false, error: null, errorCount: 0 });
    window.location.href = window.location.origin + window.location.pathname;
  };

  handleClearCacheAndReload = () => {
    try {
      localStorage.removeItem("sigep_logged_in_user");
      localStorage.removeItem("sigep_current_view");
      localStorage.removeItem("sigep_users_cache");
      sessionStorage.clear();
    } catch (e) {
      console.warn("Erro ao limpar cache:", e);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 bg-slate-950 text-slate-100 font-sans">
          <div className="max-w-xl w-full bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-800 text-center space-y-4">
            <div className="w-14 h-14 bg-indigo-950/80 border border-indigo-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400 font-black text-2xl shadow-lg">
              !
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">
                Falha Crítica de Exibição
              </h2>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                O módulo selecionado sofreu uma interrupção de renderização. O erro técnico foi registado na base de dados para auditoria técnica.
              </p>
            </div>

            <div className="bg-black/50 text-slate-300 p-4 rounded-xl text-left font-mono text-[11px] border border-slate-800/80 overflow-auto max-h-36">
              <code>
                {this.state.error?.message || this.state.error?.toString() || "Erro inesperado de renderização"}
              </code>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleTryAgain}
                className="w-full bg-indigo-900 hover:bg-indigo-800 text-white py-3 rounded-xl font-bold text-xs transition cursor-pointer shadow-md border border-indigo-500/30"
              >
                Tentar Novamente
              </button>
              <button
                type="button"
                onClick={this.handleGoToHome}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-3 rounded-xl font-black text-xs transition cursor-pointer shadow-md"
              >
                Ir para o Início
              </button>
            </div>

            <button
              type="button"
              onClick={this.handleClearCacheAndReload}
              className="text-[11px] text-slate-500 hover:text-slate-300 underline transition cursor-pointer block mx-auto pt-2"
            >
              Atualizar cache da sessão
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

import React from "react";
import { AlertCircle, WifiOff, Lock, UserX, Database, RefreshCw } from "lucide-react";
import { ErrorType, FriendlyErrorFormat, classifyAndFormatError } from "../../lib/errorLoggingService";

interface FriendlyErrorViewProps {
  error?: any;
  format?: FriendlyErrorFormat;
  type?: ErrorType;
  moduleTitle?: string;
  onRetry?: () => void;
  className?: string;
}

export const FriendlyErrorView: React.FC<FriendlyErrorViewProps> = ({
  error,
  format,
  type,
  moduleTitle = "Módulo",
  onRetry,
  className = "",
}) => {
  const activeFormat: FriendlyErrorFormat = format || (error ? classifyAndFormatError(error, moduleTitle) : {
    type: type || "no_data",
    title: type === "permission" ? "Permissão insuficiente" : type === "network" ? "Sem ligação à Internet" : "Sem informações disponíveis",
    message: type === "permission"
      ? "Não possui permissões para visualizar esta informação."
      : type === "network"
      ? "Verifique a sua ligação e tente novamente."
      : "Ainda não existem dados disponíveis para apresentar.",
  });

  const getIcon = () => {
    switch (activeFormat.type) {
      case "network":
        return <WifiOff size={28} className="text-amber-500" />;
      case "permission":
        return <Lock size={28} className="text-rose-500" />;
      case "auth_expired":
        return <UserX size={28} className="text-indigo-500" />;
      case "no_data":
        return <Database size={28} className="text-slate-400" />;
      default:
        return <AlertCircle size={28} className="text-blue-500" />;
    }
  };

  return (
    <div className={`p-6 sm:p-8 rounded-2xl border-2 border-slate-200 bg-white text-center space-y-3 shadow-sm ${className}`}>
      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto">
        {getIcon()}
      </div>
      <div>
        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">
          {activeFormat.title}
        </h4>
        <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed max-w-md mx-auto">
          {activeFormat.message}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer inline-flex items-center gap-2 mt-2"
        >
          <RefreshCw size={14} />
          <span>{activeFormat.actionText || "Tentar Novamente"}</span>
        </button>
      )}
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Key, 
  AlertTriangle, 
  UserCheck, 
  RefreshCw, 
  Search, 
  Filter, 
  CheckCircle2, 
  X,
  Mail,
  User,
  ShieldAlert,
  Clock,
  Eye,
  AlertCircle
} from "lucide-react";
import { firestoreService } from "../../lib/firestoreService";
import { ProcessingCircle } from "../../components/ui/ProcessingCircle";
import ModalProcessarReset from "./ModalProcessarReset";
import { isSuperBossUser } from "../../lib/auth";

export function PasswordResetMonitoringView({ user }: { user: any }) {
  const [resetRequests, setResetRequests] = useState<any[]>([]);
  const [usersWithMustChange, setUsersWithMustChange] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"requests" | "monitoring">("requests");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  const isGlobalAdmin = isSuperBossUser(user) || user?.isOwner || user?.role === "Administrador Global do Sistema";

  useEffect(() => {
    setLoading(true);
    
    // Subscrição de pedidos de reset
    const unsubRequests = firestoreService.password_reset_requests.subscribe((data) => {
      let filtered = data || [];
      if (!isGlobalAdmin && user?.instituicaoId) {
        // Para admins institucionais, filtrar pedidos da sua instituição
        // Nota: Assumindo que o identificador pode ser usado para inferir a instituição ou que o pedido já vem com instituicaoId
        // Como o pedido na LoginScreen não envia instituicaoId explicitamente (apenas identifier), 
        // idealmente o serviço deveria enriquecer isso ou filtramos aqui se possível.
        // Por agora, mostramos todos se for admin global, ou filtramos se o pedido tiver instituicaoId.
        filtered = filtered.filter(req => !req.instituicaoId || req.instituicaoId === user.instituicaoId);
      }
      setResetRequests(filtered.sort((a, b) => {
        const dateA = a.timestamp?.toDate?.() || new Date(a.timestamp || 0);
        const dateB = b.timestamp?.toDate?.() || new Date(b.timestamp || 0);
        return dateB.getTime() - dateA.getTime();
      }));
    });

    // Subscrição de utilizadores com mustChangePassword
    const unsubUsers = firestoreService.users.subscribe((data) => {
      let filtered = (data || []).filter(u => u.mustChangePassword === true);
      if (!isGlobalAdmin && user?.instituicaoId) {
        filtered = filtered.filter(u => u.instituicaoId === user.instituicaoId);
      }
      setUsersWithMustChange(filtered);
      setLoading(false);
    });

    return () => {
      unsubRequests();
      unsubUsers();
    };
  }, [user, isGlobalAdmin]);

  const filteredRequests = resetRequests.filter(req => 
    (req.identifier || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (req.message || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = usersWithMustChange.filter(u => 
    (u.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.nuit || "").toString().includes(searchTerm)
  );

  const pendingRequests = filteredRequests.filter(r => r.status === "Pendente");
  const processedRequests = filteredRequests.filter(r => r.status !== "Pendente");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <ShieldAlert className="text-blue-600" size={28} />
            Monitorização de Senhas e Resets
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Gestão de pedidos de recuperação e monitorização de conformidade de senhas.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === "requests" 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Pedidos de Reset ({pendingRequests.length})
          </button>
          <button
            onClick={() => setActiveTab("monitoring")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === "monitoring" 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Conformidade ({usersWithMustChange.length})
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Pesquisar por utilizador, email, NUIT ou motivo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none"
          />
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl text-slate-500">
          <Filter size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Filtros</span>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <ProcessingCircle size={48} />
          <p className="text-slate-400 text-xs font-black tracking-widest uppercase">A carregar dados de segurança...</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {activeTab === "requests" ? (
            <motion.div
              key="requests"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Pendentes */}
              <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Clock size={14} /> Pedidos Pendentes ({pendingRequests.length})
                </h3>
                
                {pendingRequests.length === 0 ? (
                  <div className="bg-slate-50 rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
                    <CheckCircle2 className="mx-auto text-emerald-400 mb-4" size={40} />
                    <p className="text-slate-500 font-bold">Todos os pedidos de reset foram processados.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pendingRequests.map((req) => (
                      <div 
                        key={req.id}
                        className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
                            <Key size={20} />
                          </div>
                          <span className="text-[10px] font-black px-2 py-1 bg-amber-100 text-amber-700 rounded-lg uppercase">
                            Pendente
                          </span>
                        </div>
                        
                        <h4 className="font-black text-slate-900 mb-1 truncate" title={req.identifier}>
                          {req.identifier}
                        </h4>
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold mb-4">
                          <Clock size={12} />
                          {req.timestamp?.toDate ? req.timestamp.toDate().toLocaleString("pt-PT") : new Date(req.timestamp).toLocaleString("pt-PT")}
                        </div>

                        {req.message && (
                          <div className="bg-slate-50 p-3 rounded-xl mb-6">
                            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Motivo:</p>
                            <p className="text-xs text-slate-600 italic line-clamp-3">"{req.message}"</p>
                          </div>
                        )}

                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="w-full py-3 bg-slate-900 text-white rounded-2xl text-xs font-black tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2"
                        >
                          Processar Pedido <RefreshCw size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Processados */}
              {processedRequests.length > 0 && (
                <section>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 pt-4 border-t border-slate-100">
                    <CheckCircle2 size={14} /> Histórico de Resets ({processedRequests.length})
                  </h3>
                  <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <tr>
                          <th className="px-6 py-4">Utilizador</th>
                          <th className="px-6 py-4">Processado Por</th>
                          <th className="px-6 py-4">Data Processamento</th>
                          <th className="px-6 py-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {processedRequests.slice(0, 10).map((req) => (
                          <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <p className="text-xs font-black text-slate-900">{req.identifier}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-xs font-bold text-slate-600">{req.processedBy || "---"}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-[10px] text-slate-400 font-mono">
                                {req.processedAt ? new Date(req.processedAt).toLocaleString("pt-PT") : "---"}
                              </p>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="text-[9px] font-black px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full uppercase">
                                {req.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="monitoring"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="bg-amber-50 border border-amber-100 p-4 rounded-3xl flex items-start gap-4 mb-2">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-amber-900">Atenção à Segurança</h4>
                  <p className="text-xs text-amber-700 font-medium">
                    Os utilizadores listados abaixo estão a utilizar a senha padrão ou tiveram o reset efetuado e ainda não alteraram a sua credencial de acesso.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Nome do Utilizador</th>
                      <th className="px-6 py-4">Email / NUIT</th>
                      <th className="px-6 py-4">Tipo de Conta</th>
                      <th className="px-6 py-4">Instituição</th>
                      <th className="px-6 py-4 text-right">Estado Crítico</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-bold italic">
                          Nenhum utilizador com troca de senha pendente.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-black text-[10px]">
                                {u.name?.substring(0, 2).toUpperCase()}
                              </div>
                              <p className="text-xs font-black text-slate-900">{u.name}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-xs text-slate-600 font-medium">{u.email}</p>
                            <p className="text-[9px] text-slate-400 font-bold">NUIT: {u.nuit}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">
                              {u.role || "Utilizador"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-[10px] text-slate-500 font-bold truncate max-w-[150px]">
                              {u.instituicaoId || "Geral / Sistema"}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 text-amber-600">
                              <AlertTriangle size={14} />
                              <span className="text-[10px] font-black uppercase tracking-tighter">Senha Vulnerável</span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {selectedRequest && (
        <ModalProcessarReset
          user={user}
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onComplete={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
}

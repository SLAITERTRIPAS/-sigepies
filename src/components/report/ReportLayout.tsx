import React from 'react';

interface Props {
  children: React.ReactNode;
  title: string;
}

export const ReportLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="p-8 bg-white min-h-screen text-black print:p-0">
      {/* Header institucional */}
      <header className="border-b-2 border-blue-900 pb-4 mb-8 flex justify-between items-center print:border-b-2">
        <div className="text-left">
          <h1 className="text-xl font-serif font-bold text-blue-900 uppercase">{title}</h1>
          <p className="text-xs text-gray-600">SIGEP - Sistema de Gestão de Planificação</p>
        </div>
        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold">LOGÓTIPO</div>
      </header>

      {/* Corpo do Documento */}
      <main className="min-h-[800px]">
        {children}
      </main>

      {/* Rodapé oficial */}
      <footer className="mt-12 pt-4 border-t border-gray-300 text-[10px] text-gray-500 flex justify-between print:fixed print:bottom-0 print:w-full">
        <span>SIGEP - Impresso em {new Date().toLocaleDateString()}</span>
        <span>Página 1 de 1</span>
      </footer>
    </div>
  );
};

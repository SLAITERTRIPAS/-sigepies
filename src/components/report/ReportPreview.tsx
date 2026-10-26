import React, { useEffect, useState } from 'react';
import { ReportLayout } from './ReportLayout';
import { ReportData } from '../../blocos/bloco7_relatorios/ReportsView';
import { generateInstitutionalReport } from '../../lib/reportGenerator';
import { ReportVisualizer } from './ReportVisualizer';
import { EditableSectionList } from './EditableSectionList';

interface Props {
  report: ReportData;
  onBack: () => void;
}

export const ReportPreview: React.FC<Props> = ({ report, onBack }) => {
  const [analyzedReport, setAnalyzedReport] = useState<any>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    generateInstitutionalReport("Anual", "isps", report.sections).then(setAnalyzedReport);
  }, [report.sections]);

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="mb-4 flex gap-4 print:hidden">
        <button onClick={onBack} className="bg-gray-200 px-4 py-2 rounded">Voltar</button>
        <button onClick={() => window.print()} className="bg-blue-600 text-white px-4 py-2 rounded">Imprimir/PDF</button>
        <button onClick={() => setEditMode(!editMode)} className={`${editMode ? 'bg-green-600' : 'bg-amber-600'} text-white px-4 py-2 rounded`}>
          {editMode ? 'Guardar Estrutura' : 'Editar Estrutura'}
        </button>
      </div>
      <div id="report-content" className="max-w-[210mm] mx-auto">
        <ReportLayout title={report.title}>
          {analyzedReport ? (
            editMode ? (
              <EditableSectionList
                sections={analyzedReport.analyzedSections}
                onSectionsChange={(newSections) => setAnalyzedReport({...analyzedReport, analyzedSections: newSections})}
              />
            ) : (
              <div className="space-y-6">
                <ReportVisualizer sections={analyzedReport.analyzedSections} />
              </div>
            )
          ) : (
            <p>Analisando relatório com IA...</p>
          )}
        </ReportLayout>
      </div>
    </div>
  );
};

import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export interface ReportData {
  title: string;
  institution: string;
  date: string;
  sections: ReportSection[];
}

export interface ReportSection {
  title: string;
  content: string | any[];
  type: "text" | "table";
}

export async function generateInstitutionalReport(
  reportType: string,
  instituicaoId: string,
  sections: any[]
): Promise<any> {
  const response = await fetch("/api/report/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reportSections: sections }),
  });
  
  if (!response.ok) throw new Error("Falha ao analisar relatório com IA.");
  return await response.json();
}

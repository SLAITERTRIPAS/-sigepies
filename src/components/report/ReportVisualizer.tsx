import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Table as TableIcon, FileText, PieChart as PieIcon, BarChart3, Activity } from "lucide-react";

import { Section as ReportSection } from "./EditableSectionList";

interface ReportVisualizerProps {
  sections: ReportSection[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

export const ReportVisualizer: React.FC<ReportVisualizerProps> = ({ sections }) => {
  const renderElement = (section: ReportSection) => {
    switch (section.elementType) {
      case "text":
        return (
          <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed">
            {typeof section.data === "string" ? section.data : JSON.stringify(section.data)}
          </div>
        );

      case "table":
        if (!Array.isArray(section.data)) return null;
        const keys = section.data.length > 0 ? Object.keys(section.data[0]) : [];
        return (
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {keys.map((key) => (
                    <th key={key} className="px-4 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {section.data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    {keys.map((key) => (
                      <td key={key} className="px-4 py-3 text-xs text-slate-600 font-medium">
                        {String(row[key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "bar-chart":
        return (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={section.data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case "line-chart":
        return (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={section.data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      case "pie-chart":
        return (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={section.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {section.data?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );

      case "kpi":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(section.data) ? section.data.map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{item.label}</span>
                <span className="text-3xl font-black text-slate-900 tracking-tighter">{item.value}</span>
                {item.trend && (
                  <span className={`text-[10px] font-bold mt-2 px-2 py-0.5 rounded-full ${item.trend > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {item.trend > 0 ? '+' : ''}{item.trend}%
                  </span>
                )}
              </div>
            )) : (
              <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center w-full max-w-sm mx-auto">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{section.data?.label}</span>
                <span className="text-4xl font-black text-slate-900 tracking-tighter">{section.data?.value}</span>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "text": return <FileText size={18} />;
      case "table": return <TableIcon size={18} />;
      case "bar-chart": return <BarChart3 size={18} />;
      case "line-chart": return <TrendingUp size={18} />;
      case "pie-chart": return <PieIcon size={18} />;
      case "kpi": return <Activity size={18} />;
      default: return <FileText size={18} />;
    }
  };

  return (
    <div className="space-y-12">
      {sections.map((section, idx) => (
        <div key={idx} className="page-break-inside-avoid">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-slate-100 text-slate-600">
              {getIcon(section.elementType)}
            </div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase border-b-2 border-slate-900 pb-1">
              {section.title}
            </h3>
          </div>
          {renderElement(section)}
        </div>
      ))}
    </div>
  );
};

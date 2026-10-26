import React from 'react';

interface Props {
  data: any[];
  columns?: string[];
}

export const DynamicReportTable: React.FC<Props> = ({ data, columns }) => {
  if (!data || data.length === 0) return <p className="text-sm italic text-gray-500">Sem dados para exibir.</p>;

  const headers = columns || Object.keys(data[0]);

  return (
    <div className="overflow-x-auto w-full my-4">
      <table className="w-full border-collapse border border-gray-300 text-[11px]">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((h) => (
              <th key={h} className="border border-gray-300 p-2 text-left uppercase font-bold text-blue-900">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {headers.map((h) => (
                <td key={h} className="border border-gray-300 p-2 text-gray-800">
                  {String(row[h])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

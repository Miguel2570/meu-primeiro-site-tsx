'use client';

import { useSheetData } from '../lib/googleSheets';
import { AnimatedSection } from './AnimatedSection';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardProps {
  sheetId: string;
  title?: string;
  gid?: number;
}

export function Dashboard({ sheetId, title = 'Dashboard', gid }: DashboardProps) {
  const { data, loading, error } = useSheetData(sheetId, gid);

  // --- LOADING ---
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9A84C]"></div>
      </div>
    );
  }

  // --- ERROR ---
  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>❌ Erro ao carregar dados</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  // --- SEM DADOS ---
  if (!data || data.rows.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        <p>📊 Nenhum dado encontrado</p>
      </div>
    );
  }

  // --- CALCULAR DADOS PARA O GRÁFICO (DENTRO DO COMPONENTE) ---
  const statusCount = data.rows.reduce<Record<string, number>>((acc, row) => {
  const status = row['Status'] || 'Sem status';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        label: 'Projetos por Status',
        data: Object.values(statusCount),
        backgroundColor: ['#C9A84C', '#1A2744', '#2D5F7E', '#C9A84C88', '#1A274488'],
        borderColor: ['#C9A84C', '#1A2744', '#2D5F7E', '#C9A84C88', '#1A274488'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Distribuição de Projetos por Status',
      },
    },
  };

  // --- RENDERIZAR ---
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection direction="up">
          <h2 className="font-serif text-3xl text-[#1A2744] text-center mb-8">
            {title}
          </h2>
        </AnimatedSection>

        {/* --- KPIs --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#F5F0E8] p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-[#C9A84C]">{data.rows.length}</p>
            <p className="text-sm text-gray-600">Registos</p>
          </div>
          <div className="bg-[#F5F0E8] p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-[#1A2744]">{data.headers.length}</p>
            <p className="text-sm text-gray-600">Colunas</p>
          </div>
          <div className="bg-[#F5F0E8] p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-[#C9A84C]">✓</p>
            <p className="text-sm text-gray-600">Dados carregados</p>
          </div>
          <div className="bg-[#F5F0E8] p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-[#1A2744]">{new Date().toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">Última atualização</p>
          </div>
        </div>

        {/* --- GRÁFICO --- */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* --- TABELA --- */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="w-full text-sm">
            <thead className="bg-[#1A2744] text-white">
              <tr>
                {data.headers.map((header, index) => (
                  <th key={index} className="px-4 py-3 text-left">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.slice(0, 10).map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  {data.headers.map((header, colIndex) => (
                    <td key={colIndex} className="px-4 py-2 text-gray-700 border-b">
                      {row[header] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {data.rows.length > 10 && (
            <div className="px-4 py-2 text-sm text-gray-500 text-center border-t">
              Mostrando 10 de {data.rows.length} registos
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
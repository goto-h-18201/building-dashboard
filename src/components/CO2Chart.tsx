import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { BuildingWithResult } from '../types/building';

interface CO2ChartProps {
  buildings: BuildingWithResult[];
}

export function CO2Chart({ buildings }: CO2ChartProps) {
  if (buildings.length === 0) return null;

  const data = buildings.map((b) => ({
    name: b.name.length > 8 ? b.name.slice(0, 8) + '...' : b.name,
    'この建物': b.result.annualCO2,
    '全国平均': b.result.nationalAvg,
    '改修後': b.result.reducedCO2,
  }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100">
      <h2 className="text-lg font-bold text-emerald-800 mb-4 pb-2 border-b border-emerald-100">
        CO2排出量の比較（tCO2/年）
      </h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0ece0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#3a5c3a' }} />
            <YAxis
              tick={{ fontSize: 12, fill: '#5a7a5b' }}
              label={{ value: 'tCO2/年', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#5a7a5b' } }}
            />
            <Tooltip
              formatter={(value) => `${Number(value).toLocaleString()} tCO2/年`}
              contentStyle={{ borderRadius: 8, borderColor: '#d4e6d4' }}
            />
            <Legend />
            <Bar dataKey="この建物" fill="rgba(192, 57, 43, 0.7)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="全国平均" fill="rgba(100, 150, 200, 0.7)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="改修後" fill="rgba(46, 139, 74, 0.7)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

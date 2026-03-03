import type { BuildingWithResult } from '../types/building';

interface SummaryCardsProps {
  buildings: BuildingWithResult[];
}

export function SummaryCards({ buildings }: SummaryCardsProps) {
  const totalCO2 = buildings.reduce((sum, b) => sum + b.result.annualCO2, 0);
  const totalSaving = buildings.reduce((sum, b) => sum + b.result.savingCO2, 0);
  const totalArea = buildings.reduce((sum, b) => sum + b.area, 0);

  // 面積あたりCO2原単位 (tCO2/m²/年)
  const co2Intensity = totalArea > 0 ? totalCO2 / totalArea : 0;

  const cards = [
    {
      label: '合計CO2排出量',
      value: Math.round(totalCO2 * 10) / 10,
      unit: 'tCO2/年',
      highlight: false,
    },
    {
      label: '登録建物数',
      value: buildings.length,
      unit: '棟',
      highlight: false,
    },
    {
      label: 'CO2原単位',
      value: Math.round(co2Intensity * 1000) / 1000,
      unit: 'tCO2/m²/年',
      highlight: false,
    },
    {
      label: '合計削減ポテンシャル',
      value: Math.round(totalSaving * 10) / 10,
      unit: 'tCO2/年 削減可能',
      highlight: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl p-4 text-center border ${
            card.highlight
              ? 'bg-emerald-50 border-emerald-400'
              : 'bg-white border-emerald-100'
          } shadow-sm`}
        >
          <div className="text-xs font-semibold text-emerald-600 mb-2 leading-snug">
            {card.label}
          </div>
          <div className={`text-2xl font-bold ${card.highlight ? 'text-emerald-700' : 'text-emerald-800'}`}>
            {card.value.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-500 mt-1">{card.unit}</div>
        </div>
      ))}
    </div>
  );
}

import type { BuildingWithResult } from '../types/building';
import { BUILDING_TYPE_LABELS } from '../types/building';

interface BuildingListProps {
  buildings: BuildingWithResult[];
  onRemove: (id: string) => void;
}

export function BuildingList({ buildings, onRemove }: BuildingListProps) {
  if (buildings.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100 text-center text-emerald-600">
        建物が登録されていません。上のフォームから追加してください。
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100">
      <h2 className="text-lg font-bold text-emerald-800 mb-4 pb-2 border-b border-emerald-100">
        登録建物一覧
      </h2>
      <div className="space-y-3">
        {buildings.map((b) => (
          <div
            key={b.id}
            className="flex items-center justify-between p-4 rounded-lg bg-emerald-50/50 border border-emerald-100"
          >
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-emerald-800 truncate">{b.name}</div>
              <div className="text-xs text-emerald-600 mt-1 flex flex-wrap gap-x-3">
                <span>{BUILDING_TYPE_LABELS[b.buildingType]}</span>
                <span>{b.area.toLocaleString()} m²</span>
                <span>築{b.age}年</span>
              </div>
            </div>
            <div className="text-right ml-4 shrink-0">
              <div className="text-lg font-bold text-emerald-700">
                {b.result.annualCO2.toLocaleString()}
              </div>
              <div className="text-xs text-emerald-500">tCO2/年</div>
            </div>
            <button
              onClick={() => onRemove(b.id)}
              className="ml-3 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
              aria-label={`${b.name}を削除`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

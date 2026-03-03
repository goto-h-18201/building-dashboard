import { useState } from 'react';
import type { BuildingType, Equipment, Building } from '../types/building';
import { BUILDING_TYPE_LABELS } from '../types/building';

interface BuildingFormProps {
  onSubmit: (building: Omit<Building, 'id'>) => void;
}

const BUILDING_TYPES = Object.entries(BUILDING_TYPE_LABELS) as [BuildingType, string][];

export function BuildingForm({ onSubmit }: BuildingFormProps) {
  const [name, setName] = useState('');
  const [buildingType, setBuildingType] = useState<BuildingType>('office');
  const [area, setArea] = useState('');
  const [age, setAge] = useState('');
  const [equipment, setEquipment] = useState<Equipment>({
    aircon: true,
    lighting: true,
    hotwater: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const areaNum = parseFloat(area);
    const ageNum = parseInt(age, 10);
    if (!name.trim() || isNaN(areaNum) || isNaN(ageNum)) return;

    onSubmit({
      name: name.trim(),
      buildingType,
      area: areaNum,
      age: ageNum,
      equipment,
    });

    // フォームをリセット
    setName('');
    setArea('');
    setAge('');
    setEquipment({ aircon: true, lighting: true, hotwater: false });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100">
      <h2 className="text-lg font-bold text-emerald-800 mb-4 pb-2 border-b border-emerald-100">
        建物を追加
      </h2>

      <div className="space-y-4">
        {/* 建物名 */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-emerald-700 mb-1">
            建物名
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例: 本社オフィスビル"
            required
            className="w-full px-3 py-2 border border-emerald-200 rounded-lg bg-emerald-50/30 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        {/* 建物用途 */}
        <div>
          <label htmlFor="buildingType" className="block text-sm font-semibold text-emerald-700 mb-1">
            建物用途
          </label>
          <select
            id="buildingType"
            value={buildingType}
            onChange={(e) => setBuildingType(e.target.value as BuildingType)}
            className="w-full px-3 py-2 border border-emerald-200 rounded-lg bg-emerald-50/30 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          >
            {BUILDING_TYPES.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* 延床面積・築年数を横並び */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="area" className="block text-sm font-semibold text-emerald-700 mb-1">
              延床面積（m²）
            </label>
            <input
              id="area"
              type="number"
              min="1"
              max="999999"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="例: 1000"
              required
              className="w-full px-3 py-2 border border-emerald-200 rounded-lg bg-emerald-50/30 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-semibold text-emerald-700 mb-1">
              築年数
            </label>
            <input
              id="age"
              type="number"
              min="0"
              max="100"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="例: 20"
              required
              className="w-full px-3 py-2 border border-emerald-200 rounded-lg bg-emerald-50/30 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* 主要設備 */}
        <div>
          <span className="block text-sm font-semibold text-emerald-700 mb-2">主要設備</span>
          <div className="flex gap-3 flex-wrap">
            {([
              ['aircon', '空調設備'],
              ['lighting', '照明設備'],
              ['hotwater', '給湯設備'],
            ] as const).map(([key, label]) => (
              <label
                key={key}
                className="flex items-center gap-2 px-3 py-2 border border-emerald-200 rounded-lg bg-emerald-50/30 cursor-pointer hover:bg-emerald-100/50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={equipment[key]}
                  onChange={(e) => setEquipment((prev) => ({ ...prev, [key]: e.target.checked }))}
                  className="custom-check w-4 h-4 m-0 shrink-0 cursor-pointer"
                />
                <span className="text-sm leading-none text-emerald-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all tracking-wide"
        >
          追加する
        </button>
      </div>
    </form>
  );
}

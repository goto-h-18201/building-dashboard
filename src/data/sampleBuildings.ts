import type { Building } from '../types/building';

/** デモ用のサンプル建物データ（3件） */
export const SAMPLE_BUILDINGS: Building[] = [
  {
    id: 'sample-1',
    name: '本社オフィスビル',
    buildingType: 'office',
    area: 2500,
    age: 15,
    equipment: { aircon: true, lighting: true, hotwater: false },
  },
  {
    id: 'sample-2',
    name: 'グリーンマンション桜台',
    buildingType: 'residential',
    area: 4200,
    age: 28,
    equipment: { aircon: true, lighting: true, hotwater: true },
  },
  {
    id: 'sample-3',
    name: 'コンバスモール新宿',
    buildingType: 'retail',
    area: 8000,
    age: 5,
    equipment: { aircon: true, lighting: true, hotwater: true },
  },
];

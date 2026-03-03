/** 建物用途 */
export type BuildingType = 'office' | 'residential' | 'retail' | 'factory';

/** 建物用途の日本語ラベル */
export const BUILDING_TYPE_LABELS: Record<BuildingType, string> = {
  office: '事務所',
  residential: '住宅・マンション',
  retail: '店舗・商業施設',
  factory: '工場・倉庫',
};

/** 主要設備 */
export interface Equipment {
  aircon: boolean;
  lighting: boolean;
  hotwater: boolean;
}

/** 建物データ（登録時の入力項目） */
export interface Building {
  id: string;
  name: string;
  buildingType: BuildingType;
  area: number;        // 延床面積 (m²)
  age: number;         // 築年数
  equipment: Equipment;
}

/** CO2計算結果 */
export interface CO2Result {
  annualCO2: number;     // 年間CO2排出量 (tCO2/年)
  nationalAvg: number;   // 全国平均のCO2排出量 (tCO2/年)
  reducedCO2: number;    // 改修後の推定CO2排出量 (tCO2/年)
  savingCO2: number;     // 削減ポテンシャル (tCO2/年)
  vsNationalAvg: number; // 全国平均との差 (%)
}

/** 建物 + 計算結果をまとめたもの */
export interface BuildingWithResult extends Building {
  result: CO2Result;
}

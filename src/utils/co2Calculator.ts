/**
 * CO2排出量計算モジュール
 *
 * 建物の用途・面積・築年数・設備情報からCO2排出量を算出する純粋関数。
 *
 * 計算根拠:
 *   - 電力CO2排出係数 0.000423 tCO2/kWh
 *     出典: 環境省「電気事業者別排出係数」令和8年提出用（令和8年2月25日更新）全国平均係数
 *
 *   - 建物用途別エネルギー原単位 (kWh/m²/年)
 *     出典: 国土交通省「既存公共施設の一次エネルギー消費量の把握手法例」(2009)をもとに算出
 */

import type { BuildingType, Equipment, CO2Result } from '../types/building';

// 電力のCO2排出係数 (tCO2/kWh)
// 出典: 環境省「電気事業者別排出係数」令和8年提出用（令和8年2月25日更新）
const ELECTRICITY_FACTOR = 0.000423;

// 建物用途別の電力消費原単位 (kWh/m²/年)
// 出典: 国土交通省 (2009) をもとに算出。住宅・工場は推計値
const BASE_ENERGY: Record<BuildingType, number> = {
  office: 220,
  residential: 130,
  retail: 330,
  factory: 380,
};

// 建物用途別の全国平均CO2排出原単位 (tCO2/m²/年)
const NATIONAL_AVG: Record<BuildingType, number> = {
  office: 0.048,
  residential: 0.025,
  retail: 0.065,
  factory: 0.075,
};

/** 築年数に応じたエネルギー効率係数。古い建物ほど消費が多い */
function getAgeCoefficient(age: number): number {
  if (age <= 10) return 0.85;  // 省エネ基準の新しい建物
  if (age <= 20) return 1.00;  // 基準値
  if (age <= 30) return 1.15;  // 旧省エネ基準（平成11年基準以前）
  return 1.30;                 // 旧々省エネ基準（昭和55年基準以前）
}

/** 設備の有無に応じた消費エネルギー割合係数 */
function getEquipmentCoefficient(equipment: Equipment): number {
  let coeff = 0;
  if (equipment.aircon) coeff += 0.55;   // 空調は消費の過半を占める
  if (equipment.lighting) coeff += 0.30; // 照明
  if (equipment.hotwater) coeff += 0.15; // 給湯
  // すべて未選択の場合は最小値（建物は稼働している前提）
  return coeff > 0 ? coeff : 0.30;
}

/** 小数第1位で四捨五入 */
function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/**
 * 年間CO2排出量と関連指標を計算する純粋関数。
 */
export function calculateCO2(
  buildingType: BuildingType,
  area: number,
  age: number,
  equipment: Equipment,
): CO2Result {
  const baseEnergy = BASE_ENERGY[buildingType];
  const ageFactor = getAgeCoefficient(age);
  const equipFactor = getEquipmentCoefficient(equipment);

  // 年間エネルギー消費量 (kWh/年)
  const annualEnergy = area * baseEnergy * ageFactor * equipFactor;

  // 年間CO2排出量 (tCO2/年)
  const annualCO2 = annualEnergy * ELECTRICITY_FACTOR;

  // 同面積・同用途の全国平均CO2排出量
  const nationalAvg = NATIONAL_AVG[buildingType] * area;

  // 改修後の推定CO2排出量（省エネ改修で最大35%削減できる想定）
  // 根拠: 断熱改修15% + 高効率空調20% + LED照明10% ≒ 35%
  const reducedCO2 = annualCO2 * 0.65;

  const savingCO2 = annualCO2 - reducedCO2;

  // 全国平均との差（プラスが「多い」、マイナスが「少ない」）
  const vsNationalAvg = Math.round((annualCO2 / nationalAvg - 1) * 100);

  return {
    annualCO2: round1(annualCO2),
    nationalAvg: round1(nationalAvg),
    reducedCO2: round1(reducedCO2),
    savingCO2: round1(savingCO2),
    vsNationalAvg,
  };
}

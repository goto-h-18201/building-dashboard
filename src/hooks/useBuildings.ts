import { useState, useCallback } from 'react';
import type { Building, BuildingWithResult } from '../types/building';
import { calculateCO2 } from '../utils/co2Calculator';
import { SAMPLE_BUILDINGS } from '../data/sampleBuildings';

const STORAGE_KEY = 'building-dashboard-buildings';

/** localStorage から建物一覧を読み込む。未保存ならサンプルデータを返す */
function loadBuildings(): Building[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Building[];
    }
  } catch {
    // localStorage が使えない環境や不正なJSON → サンプルにフォールバック
  }
  return SAMPLE_BUILDINGS;
}

/** localStorage に建物一覧を保存する */
function saveBuildings(buildings: Building[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(buildings));
  } catch {
    // 容量超過などは無視（試算ツールなので永続化できなくても動作に支障なし）
  }
}

/** 一意なIDを生成する */
function generateId(): string {
  return `bld-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * 建物データの CRUD とCO2計算結果を提供するカスタムフック。
 * localStorage への読み書きはこのフック内に閉じ込める。
 */
export function useBuildings() {
  const [buildings, setBuildings] = useState<Building[]>(loadBuildings);

  /** 建物ごとにCO2計算結果を付与した配列 */
  const buildingsWithResults: BuildingWithResult[] = buildings.map((b) => ({
    ...b,
    result: calculateCO2(b.buildingType, b.area, b.age, b.equipment),
  }));

  /** 建物を追加する */
  const addBuilding = useCallback((building: Omit<Building, 'id'>) => {
    setBuildings((prev) => {
      const next = [...prev, { ...building, id: generateId() }];
      saveBuildings(next);
      return next;
    });
  }, []);

  /** 建物を削除する */
  const removeBuilding = useCallback((id: string) => {
    setBuildings((prev) => {
      const next = prev.filter((b) => b.id !== id);
      saveBuildings(next);
      return next;
    });
  }, []);

  /** サンプルデータにリセットする */
  const resetToSample = useCallback(() => {
    saveBuildings(SAMPLE_BUILDINGS);
    setBuildings(SAMPLE_BUILDINGS);
  }, []);

  return {
    buildings: buildingsWithResults,
    addBuilding,
    removeBuilding,
    resetToSample,
  };
}

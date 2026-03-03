# Building Energy Dashboard

複数の建物を登録・管理し、CO2排出量を比較・分析するReactアプリ。

## 技術スタック

| 技術 | バージョン |
|------|-----------|
| Vite | 7.x |
| React | 19 |
| TypeScript | 5.9 |
| Tailwind CSS | 4.x |
| Recharts | 3.x |

## コマンド

npm run dev       # 開発サーバー
npm run build     # ビルド
npm run preview   # ビルド結果プレビュー

## Tailwind CSS v4 注意

IMPORTANT: v4 は v3 と大きく異なる。以下を守ること。

- tailwind.config.js を生成しない（v4では不要）
- postcss.config.js を生成しない（v4では不要）
- `@tailwind base;` 等のディレクティブを使わない
- CSS では `@import "tailwindcss";` の1行のみ書く
- Vite プラグイン `@tailwindcss/vite` を使う

## Recharts v3 注意

- ResponsiveContainer で必ずラップする
- 型は recharts パッケージに含まれている

## アーキテクチャ

```
src/
├── components/    # UIコンポーネント（1ファイル1コンポーネント）
├── hooks/         # カスタムフック
├── utils/         # 純粋関数（CO2計算ロジック）
├── types/         # 型定義
├── data/          # 定数・初期データ
├── App.tsx
├── App.css        # @import "tailwindcss"; のみ
└── main.tsx
```

### 設計原則

- CO2計算は `utils/co2Calculator.ts` に集約する（コンポーネントに計算式を書かない）
- localStorage操作は `hooks/useBuildings.ts` に集約する（コンポーネントから直接触らない）
- 状態管理は useState + カスタムフック。Redux等は使わない

## CO2計算ロジック

CO2計算ロジックは co2Calculator.ts に実装。
変更時は15パターンのテストケースで正確性を検証する。

定数:
- ELECTRICITY_FACTOR = 0.000423 tCO2/kWh（環境省 令和8年提出用）
- BASE_ENERGY: office=220, residential=130, retail=330, factory=380
- NATIONAL_AVG: office=0.048, residential=0.025, retail=0.065, factory=0.075

## デプロイ

- vite.config.ts の base: "/building-dashboard/"
- GitHub Pages: goto-h-18201/building-dashboard

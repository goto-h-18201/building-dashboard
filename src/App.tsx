import './App.css'
import { useBuildings } from './hooks/useBuildings'
import { BuildingForm } from './components/BuildingForm'
import { BuildingList } from './components/BuildingList'
import { SummaryCards } from './components/SummaryCards'
import { CO2Chart } from './components/CO2Chart'

function App() {
  const { buildings, addBuilding, removeBuilding, resetToSample } = useBuildings();

  return (
    <div className="min-h-screen bg-emerald-50/30">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* ヘッダー */}
        <header className="text-center py-8 mb-8 border-b-2 border-emerald-200">
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-800 tracking-tight">
            建物エネルギー管理ダッシュボード
          </h1>
          <p className="mt-2 text-emerald-600 text-sm">
            複数の建物を登録して、CO2排出量を一括比較・分析します
          </p>
        </header>

        <main className="space-y-8">
          {/* サマリーカード */}
          <SummaryCards buildings={buildings} />

          {/* チャート */}
          <CO2Chart buildings={buildings} />

          {/* 2カラムレイアウト: フォーム + 一覧 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BuildingForm onSubmit={addBuilding} />
            <BuildingList buildings={buildings} onRemove={removeBuilding} />
          </div>

          {/* リセットボタン */}
          <div className="text-center">
            <button
              onClick={resetToSample}
              className="text-sm text-emerald-500 hover:text-emerald-700 underline underline-offset-2 transition-colors"
            >
              サンプルデータにリセット
            </button>
          </div>
        </main>

        {/* フッター */}
        <footer className="text-center py-6 mt-8 border-t border-emerald-200 text-xs text-emerald-400">
          <p>
            使用係数: 電力CO2排出係数 0.000423 tCO2/kWh
            （環境省「電気事業者別排出係数」令和8年提出用 全国平均係数）
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App

import { useState } from 'react';
import type { CardDefinition } from './types/card';
import { CardEditor } from './components/CardEditor';
import { CardPreview } from './components/CardPreview';
import { UpgradeEditor } from './components/UpgradeEditor';
import './App.css';

const DEFAULT_CARD: CardDefinition = {
  id: 'custom_card',
  name: '自定义卡牌',
  cost: 1,
  useStarCost: false,
  rarity: 'Common',
  type: 'Attack',
  character: 'Ironclad',
  target: 'Enemy',
  tags: [],
  effects: [],
  imagePath: null,
  upgrade: {
    maxLevel: 1,
    infinite: false,
    mode: 'custom',
    levels: [],
    autoRule: null,
  },
};

function App() {
  const [card, setCard] = useState<CardDefinition>(DEFAULT_CARD);
  const [exporting, setExporting] = useState(false);

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setCard(prev => ({ ...prev, imagePath: url }));
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const resp = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(card),
      });
      if (!resp.ok) throw new Error('Export failed');
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${card.id}_mod.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('导出失败：' + (err as Error).message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Card Forge</h1>
        <p>Slay the Spire 2 — 卡牌制作工坊</p>
      </header>
      <main className="main">
        <div className="panel editor-panel">
          <div className="panel-header"><h3>✎ 卡牌属性</h3></div>
          <div className="panel-body">
            <CardEditor card={card} onChange={setCard} onImageUpload={handleImageUpload} />
          </div>
        </div>
        <div className="panel preview-panel">
          <div className="panel-header"><h3>👁 预览</h3></div>
          <div className="panel-body">
            <CardPreview card={card} />
          </div>
        </div>
        <div className="panel upgrade-panel">
          <div className="panel-header"><h3>⬆ 升级路线</h3></div>
          <div className="panel-body">
            <UpgradeEditor upgrade={card.upgrade} onChange={upgrade => setCard(prev => ({ ...prev, upgrade }))} />
          </div>
        </div>
      </main>
      <div className="export-bar">
        <button className="export-btn" onClick={handleExport} disabled={exporting}>
          {exporting ? '正在导出...' : '⚡ 导出 Mod'}
        </button>
      </div>
    </div>
  );
}

export default App;

# Card Forge 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个本地 Web 应用，让用户通过可视化界面设计杀戮尖塔2自定义卡牌，一键导出为可用的 mod DLL。

**Architecture:** 前后端分离。React + Vite 前端提供三栏编辑器（属性编辑 | 卡牌预览 | 升级路线）；.NET 9 后端接收卡牌 JSON，通过模板生成 C# 源码，Roslyn 编译为 DLL，打包 ZIP 返回。

**Tech Stack:** React 18 + TypeScript + Vite (前端), .NET 9 Minimal API + Roslyn (后端)

---

## File Structure

```
卡牌制作小工具/
├── frontend/
│   ├── src/
│   │   ├── types/
│   │   │   └── card.ts              # 卡牌数据类型定义
│   │   ├── data/
│   │   │   ├── keywords.ts          # 词条/关键词定义
│   │   │   └── characters.ts        # 角色数据
│   │   ├── components/
│   │   │   ├── CardEditor.tsx        # 左栏：卡牌属性编辑
│   │   │   ├── CardPreview.tsx       # 中栏：卡牌实时预览
│   │   │   ├── UpgradeEditor.tsx     # 右栏：升级路线编辑
│   │   │   ├── EffectSelector.tsx    # 效果词条选择器
│   │   │   └── TagSelector.tsx       # 标签切换器
│   │   ├── App.tsx                   # 主布局 + 状态管理
│   │   ├── App.css                   # 全局样式
│   │   └── main.tsx                  # 入口
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend/
│   ├── CardForgeApi.csproj
│   ├── Program.cs                    # API 入口 + 路由
│   ├── Models/
│   │   └── CardDefinition.cs         # 卡牌定义模型
│   ├── Services/
│   │   ├── CodeGenerator.cs          # C# 源码生成
│   │   ├── ModCompiler.cs            # Roslyn 编译
│   │   └── PackageService.cs         # ZIP 打包
│   └── Templates/
│       └── CardTemplate.cs           # 卡牌类源码模板
├── docs/
│   ├── superpowers/specs/2026-03-29-card-forge-design.md
│   └── STS2卡牌机制参考.md
└── README.md
```

---

## Task 1: 前端项目初始化

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/index.html`
- Create: `frontend/vite.config.ts`
- Create: `frontend/tsconfig.json`
- Create: `frontend/src/main.tsx`
- Create: `frontend/src/App.tsx`
- Create: `frontend/src/App.css`

- [ ] **Step 1: 用 Vite 创建 React + TypeScript 项目**

```bash
cd F:/自制mod/卡牌制作小工具
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
```

- [ ] **Step 2: 验证项目可运行**

Run: `cd F:/自制mod/卡牌制作小工具/frontend && npm run dev`
Expected: Vite dev server 启动在 localhost:5173，浏览器可打开看到 React 默认页面

- [ ] **Step 3: 清空默认内容，设置基础 App**

清空 `src/App.css`，替换 `src/App.tsx` 为空布局框架：

```tsx
// frontend/src/App.tsx
function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Card Forge</h1>
        <p>Slay the Spire 2 — 卡牌制作工坊</p>
      </header>
      <main className="main">
        <p>编辑器将在此处</p>
      </main>
    </div>
  );
}

export default App;
```

- [ ] **Step 4: 验证空白页面可运行**

Run: `npm run dev` (in frontend/)
Expected: 页面显示 "Card Forge" 标题和 "编辑器将在此处"

- [ ] **Step 5: Commit**

```bash
cd F:/自制mod/卡牌制作小工具
git add frontend/
git commit -m "feat: initialize React+Vite frontend project"
```

---

## Task 2: 后端项目初始化

**Files:**
- Create: `backend/CardForgeApi.csproj`
- Create: `backend/Program.cs`

- [ ] **Step 1: 创建 .NET 9 Web API 项目**

```bash
cd F:/自制mod/卡牌制作小工具
dotnet new web -n CardForgeApi -o backend --framework net9.0
```

- [ ] **Step 2: 添加 Roslyn 包引用**

编辑 `backend/CardForgeApi.csproj`：

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.CodeAnalysis.CSharp" Version="4.12.0" />
  </ItemGroup>
</Project>
```

Run: `cd F:/自制mod/卡牌制作小工具/backend && dotnet restore`

- [ ] **Step 3: 替换 Program.cs 为基础 API**

```csharp
// backend/Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok", time = DateTime.UtcNow }));

app.MapPost("/api/export", async (HttpContext context) =>
{
    // TODO: implement in later tasks
    return Results.Ok(new { message = "export not yet implemented" });
});

app.Run();
```

- [ ] **Step 4: 验证 API 可运行**

Run: `cd F:/自制mod/卡牌制作小工具/backend && dotnet run`
Expected: 服务启动在 http://localhost:5000，GET /api/health 返回 `{ "status": "ok" }`

- [ ] **Step 5: Commit**

```bash
cd F:/自制mod/卡牌制作小工具
git add backend/
git commit -m "feat: initialize .NET 9 backend API with Roslyn"
```

---

## Task 3: TypeScript 卡牌数据类型

**Files:**
- Create: `frontend/src/types/card.ts`

- [ ] **Step 1: 定义卡牌数据模型类型**

```typescript
// frontend/src/types/card.ts

export type CardRarity = 'Common' | 'Uncommon' | 'Rare';
export type CardType = 'Attack' | 'Skill' | 'Power';
export type Character = 'Ironclad' | 'Silent' | 'Defect' | 'Regent' | 'Necrobinder';
export type CardTarget = 'Enemy' | 'AllEnemies' | 'Self' | 'None';

export type CardTag = 'Exhaust' | 'Ethereal' | 'Innate' | 'Retain' | 'Eternal';

export type NumericField = 'damage' | 'block' | 'draw' | 'hits' | 'cost' | 'heal' | 'maxHp';
export type KeywordField = 'strength' | 'dexterity' | 'vulnerable' | 'weak' | 'frail' | 'poison' | 'artifact' | 'regen' | 'thorns' | 'doom' | 'forge' | 'summon';

export interface CardEffect {
  keyword: string;
  params: Record<string, number | string>;
  target?: CardTarget;
}

export interface NumericChange {
  type: 'numeric';
  field: NumericField;
  operation: 'add' | 'set';
  value: number;
}

export interface KeywordChange {
  type: 'keyword';
  action: 'add' | 'remove';
  keyword: CardTag;
}

export type UpgradeChange = NumericChange | KeywordChange;

export interface UpgradeLevel {
  nameSuffix: string;
  changes: UpgradeChange[];
}

export interface UpgradeConfig {
  maxLevel: number;
  infinite: boolean;
  mode: 'auto' | 'custom';
  levels: UpgradeLevel[];
  autoRule: {
    field: NumericField;
    operation: 'add';
    value: number;
  } | null;
}

export interface CardDefinition {
  id: string;
  name: string;
  cost: number;
  useStarCost: boolean;
  rarity: CardRarity;
  type: CardType;
  character: Character;
  target: CardTarget;
  tags: CardTag[];
  effects: CardEffect[];
  imagePath: string | null;
  upgrade: UpgradeConfig;
}
```

- [ ] **Step 2: 验证 TypeScript 编译**

Run: `cd F:/自制mod/卡牌制作小工具/frontend && npx tsc --noEmit`
Expected: 无编译错误

- [ ] **Step 3: Commit**

```bash
cd F:/自制mod/卡牌制作小工具
git add frontend/src/types/
git commit -m "feat: define TypeScript card data types"
```

---

## Task 4: 静态数据文件

**Files:**
- Create: `frontend/src/data/characters.ts`
- Create: `frontend/src/data/keywords.ts`

- [ ] **Step 1: 创建角色数据**

```typescript
// frontend/src/data/characters.ts
import type { Character } from '../types/card';

export interface CharacterInfo {
  id: Character;
  nameZh: string;
  nameEn: string;
  color: string;
  cardFrame: string;
  cardPoolId: string;
}

export const CHARACTERS: CharacterInfo[] = [
  { id: 'Ironclad', nameZh: '铁甲战士', nameEn: 'Ironclad', color: '#c0392b', cardFrame: 'card_frame_red', cardPoolId: 'IRONCLAD_CARD_POOL' },
  { id: 'Silent', nameZh: '静默猎人', nameEn: 'Silent', color: '#27ae60', cardFrame: 'card_frame_green', cardPoolId: 'SILENT_CARD_POOL' },
  { id: 'Defect', nameZh: '机器人', nameEn: 'Defect', color: '#2980b9', cardFrame: 'card_frame_blue', cardPoolId: 'DEFECT_CARD_POOL' },
  { id: 'Regent', nameZh: '摄政王', nameEn: 'Regent', color: '#d4842a', cardFrame: 'card_frame_orange', cardPoolId: 'REGENT_CARD_POOL' },
  { id: 'Necrobinder', nameZh: '死灵师', nameEn: 'Necrobinder', color: '#8e44ad', cardFrame: 'card_frame_pink', cardPoolId: 'NECROBINDER_CARD_POOL' },
];
```

- [ ] **Step 2: 创建效果词条数据**

```typescript
// frontend/src/data/keywords.ts
import type { CardTarget, NumericField, KeywordField } from '../types/card';

export interface EffectDefinition {
  keyword: string;
  nameZh: string;
  category: 'numeric' | 'keyword';
  description: string;
  fields: { name: string; label: string; defaultValue: number }[];
  defaultTarget?: CardTarget;
  numericField?: NumericField;
  keywordField?: KeywordField;
}

export const EFFECTS: EffectDefinition[] = [
  { keyword: 'damage', nameZh: '伤害', category: 'numeric', description: '造成 {value} 点伤害', fields: [{ name: 'value', label: '伤害值', defaultValue: 6 }], defaultTarget: 'Enemy', numericField: 'damage' },
  { keyword: 'block', nameZh: '格挡', category: 'numeric', description: '获得 {value} 点格挡', fields: [{ name: 'value', label: '格挡值', defaultValue: 5 }], defaultTarget: 'Self', numericField: 'block' },
  { keyword: 'draw', nameZh: '抽牌', category: 'numeric', description: '抽 {value} 张牌', fields: [{ name: 'value', label: '抽牌数', defaultValue: 2 }], defaultTarget: 'Self', numericField: 'draw' },
  { keyword: 'hits', nameZh: '多次攻击', category: 'numeric', description: '重复 {value} 次', fields: [{ name: 'value', label: '攻击次数', defaultValue: 2 }], defaultTarget: 'Enemy', numericField: 'hits' },
  { keyword: 'strength', nameZh: '力量', category: 'numeric', description: '获得 {value} 层力量', fields: [{ name: 'value', label: '层数', defaultValue: 2 }], defaultTarget: 'Self', numericField: 'strength' },
  { keyword: 'dexterity', nameZh: '敏捷', category: 'numeric', description: '获得 {value} 层敏捷', fields: [{ name: 'value', label: '层数', defaultValue: 2 }], defaultTarget: 'Self', numericField: 'dexterity' },
  { keyword: 'vulnerable', nameZh: '易伤', category: 'numeric', description: '施加 {value} 层易伤', fields: [{ name: 'value', label: '层数', defaultValue: 1 }], defaultTarget: 'Enemy', numericField: 'vulnerable' },
  { keyword: 'weak', nameZh: '虚弱', category: 'numeric', description: '施加 {value} 层虚弱', fields: [{ name: 'value', label: '层数', defaultValue: 1 }], defaultTarget: 'Enemy', numericField: 'weak' },
  { keyword: 'frail', nameZh: '脆弱', category: 'numeric', description: '施加 {value} 层脆弱', fields: [{ name: 'value', label: '层数', defaultValue: 1 }], defaultTarget: 'Enemy', numericField: 'frail' },
  { keyword: 'poison', nameZh: '中毒', category: 'numeric', description: '施加 {value} 层中毒', fields: [{ name: 'value', label: '层数', defaultValue: 3 }], defaultTarget: 'Enemy', numericField: 'poison' },
  { keyword: 'artifact', nameZh: '人工制品', category: 'numeric', description: '获得 {value} 层人工制品', fields: [{ name: 'value', label: '层数', defaultValue: 1 }], defaultTarget: 'Self', numericField: 'artifact' },
  { keyword: 'regen', nameZh: '再生', category: 'numeric', description: '获得 {value} 层再生', fields: [{ name: 'value', label: '层数', defaultValue: 3 }], defaultTarget: 'Self', numericField: 'regen' },
  { keyword: 'thorns', nameZh: '荆棘', category: 'numeric', description: '获得 {value} 层荆棘', fields: [{ name: 'value', label: '层数', defaultValue: 3 }], defaultTarget: 'Self', numericField: 'thorns' },
  { keyword: 'heal', nameZh: '治愈', category: 'numeric', description: '恢复 {value} 点生命', fields: [{ name: 'value', label: '生命值', defaultValue: 5 }], defaultTarget: 'Self', numericField: 'heal' },
  { keyword: 'maxHp', nameZh: '最大HP', category: 'numeric', description: '增加 {value} 点最大生命', fields: [{ name: 'value', label: '生命值', defaultValue: 3 }], defaultTarget: 'Self', numericField: 'maxHp' },
  { keyword: 'doom', nameZh: '厄运', category: 'numeric', description: '施加 {value} 层厄运', fields: [{ name: 'value', label: '层数', defaultValue: 5 }], defaultTarget: 'Enemy', numericField: 'doom' },
  { keyword: 'forge', nameZh: '锻造', category: 'numeric', description: '锻造 {value}', fields: [{ name: 'value', label: '锻造值', defaultValue: 2 }], defaultTarget: 'Self', numericField: 'forge' },
  { keyword: 'summon', nameZh: '召唤', category: 'numeric', description: '召唤奥斯蒂 {value} HP', fields: [{ name: 'value', label: 'HP', defaultValue: 5 }], defaultTarget: 'Self', numericField: 'summon' },
];

export const TAGS = [
  { id: 'Exhaust' as const, nameZh: '消耗', description: '从本局游戏中移除' },
  { id: 'Ethereal' as const, nameZh: '虚无', description: '回合结束时在手牌中则消耗' },
  { id: 'Innate' as const, nameZh: '固有', description: '每场战斗开始时在手牌中' },
  { id: 'Retain' as const, nameZh: '保留', description: '回合结束时不会弃掉' },
  { id: 'Eternal' as const, nameZh: '永恒', description: '不可从牌组中移除或转换' },
];

export const NUMERIC_FIELDS: { value: NumericField; label: string }[] = [
  { value: 'damage', label: '伤害' },
  { value: 'block', label: '格挡' },
  { value: 'draw', label: '抽牌' },
  { value: 'hits', label: '攻击次数' },
  { value: 'cost', label: '费用' },
  { value: 'heal', label: '治愈' },
  { value: 'maxHp', label: '最大HP' },
];
```

- [ ] **Step 3: 验证编译**

Run: `cd F:/自制mod/卡牌制作小工具/frontend && npx tsc --noEmit`
Expected: 无错误

- [ ] **Step 4: Commit**

```bash
cd F:/自制mod/卡牌制作小工具
git add frontend/src/data/
git commit -m "feat: add character and keyword static data"
```

---

## Task 5: TagSelector 组件

**Files:**
- Create: `frontend/src/components/TagSelector.tsx`

- [ ] **Step 1: 实现标签切换组件**

```tsx
// frontend/src/components/TagSelector.tsx
import type { CardTag } from '../types/card';
import { TAGS } from '../data/keywords';

interface TagSelectorProps {
  selected: CardTag[];
  onChange: (tags: CardTag[]) => void;
  infiniteUpgrade: boolean;
  onInfiniteUpgradeChange: (value: boolean) => void;
}

export function TagSelector({ selected, onChange, infiniteUpgrade, onInfiniteUpgradeChange }: TagSelectorProps) {
  const toggleTag = (tagId: CardTag) => {
    if (selected.includes(tagId)) {
      onChange(selected.filter(t => t !== tagId));
    } else {
      onChange([...selected, tagId]);
    }
  };

  return (
    <div className="tag-selector">
      <label className="form-label">标签</label>
      <div className="tags">
        {TAGS.map(tag => (
          <span
            key={tag.id}
            className={`tag ${selected.includes(tag.id) ? 'active' : ''}`}
            onClick={() => toggleTag(tag.id)}
            title={tag.description}
          >
            {tag.nameZh}
          </span>
        ))}
        <span
          className={`tag special ${infiniteUpgrade ? 'active' : ''}`}
          onClick={() => onInfiniteUpgradeChange(!infiniteUpgrade)}
        >
          ∞ 无限升级
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd F:/自制mod/卡牌制作小工具
git add frontend/src/components/TagSelector.tsx
git commit -m "feat: add TagSelector component"
```

---

## Task 6: EffectSelector 组件

**Files:**
- Create: `frontend/src/components/EffectSelector.tsx`

- [ ] **Step 1: 实现效果词条选择器**

```tsx
// frontend/src/components/EffectSelector.tsx
import type { CardEffect } from '../types/card';
import { EFFECTS } from '../data/keywords';

interface EffectSelectorProps {
  effects: CardEffect[];
  onChange: (effects: CardEffect[]) => void;
}

export function EffectSelector({ effects, onChange }: EffectSelectorProps) {
  const addEffect = (keyword: string) => {
    const def = EFFECTS.find(e => e.keyword === keyword);
    if (!def) return;
    const params: Record<string, number> = {};
    def.fields.forEach(f => { params[f.name] = f.defaultValue; });
    onChange([...effects, {
      keyword,
      params,
      target: def.defaultTarget,
    }]);
  };

  const removeEffect = (index: number) => {
    onChange(effects.filter((_, i) => i !== index));
  };

  const updateParam = (index: number, fieldName: string, value: number) => {
    const updated = [...effects];
    updated[index] = { ...updated[index], params: { ...updated[index].params, [fieldName]: value } };
    onChange(updated);
  };

  const getDef = (keyword: string) => EFFECTS.find(e => e.keyword === keyword)!;

  return (
    <div className="effect-selector">
      <label className="form-label">效果词条</label>
      <div className="effects-list">
        {effects.map((effect, i) => {
          const def = getDef(effect.keyword);
          return (
            <div key={i} className="effect-entry">
              <span className={`effect-badge ${def.category}`}>{def.nameZh}</span>
              {def.fields.map(field => (
                <span key={field.name} className="effect-text">
                  {field.label}
                  <input
                    className="effect-value"
                    type="number"
                    value={effect.params[field.name] ?? field.defaultValue}
                    onChange={e => updateParam(i, field.name, Number(e.target.value))}
                  />
                </span>
              ))}
              <span className="effect-remove" onClick={() => removeEffect(i)}>✕</span>
            </div>
          );
        })}
        <div className="add-effect-dropdown">
          <select className="form-input" value="" onChange={e => { if (e.target.value) addEffect(e.target.value); }}>
            <option value="">+ 添加效果词条</option>
            {EFFECTS.map(e => (
              <option key={e.keyword} value={e.keyword}>{e.nameZh} — {e.description}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd F:/自制mod/卡牌制作小工具
git add frontend/src/components/EffectSelector.tsx
git commit -m "feat: add EffectSelector component"
```

---

## Task 7: CardPreview 组件

**Files:**
- Create: `frontend/src/components/CardPreview.tsx`

- [ ] **Step 1: 实现卡牌实时预览**

```tsx
// frontend/src/components/CardPreview.tsx
import type { CardDefinition } from '../types/card';
import { CHARACTERS } from '../data/characters';
import { EFFECTS, TAGS } from '../data/keywords';

interface CardPreviewProps {
  card: CardDefinition;
}

export function CardPreview({ card }: CardPreviewProps) {
  const char = CHARACTERS.find(c => c.id === card.character)!;

  const rarityLabel = { Common: '★ COMMON ★', Uncommon: '★★ UNCOMMON ★★', Rare: '★★★ RARE ★★★' }[card.rarity];
  const typeLabel = { Attack: 'Attack', Skill: 'Skill', Power: 'Power' }[card.type];

  const buildDescription = () => {
    const lines: JSX.Element[] = [];
    card.tags.forEach(tag => {
      const tagInfo = TAGS.find(t => t.id === tag);
      if (tagInfo) lines.push(<span key={tag} className="keyword-line">{tagInfo.nameZh}</span>);
    });
    card.effects.forEach((effect, i) => {
      const def = EFFECTS.find(e => e.keyword === effect.keyword);
      if (!def) return;
      let text = def.description;
      const params = { ...effect.params };
      Object.entries(params).forEach(([key, val]) => {
        text = text.replace(`{${key}}`, `{${val}}`);
      });
      // Highlight numbers
      const parts = text.split(/(\{[^}]+\})/);
      const rendered = parts.map((part, j) => {
        const numMatch = part.match(/^\{(\d+)\}$/);
        if (numMatch) return <span key={j} className="damage-val">{numMatch[1]}</span>;
        return <span key={j}>{part}</span>;
      });
      lines.push(<span key={`e${i}`}>{rendered}。</span>);
    });
    return lines;
  };

  return (
    <div className="card-preview-wrapper">
      <div className="card-frame">
        <div className="card-cost">{card.useStarCost ? '★' : card.cost}</div>
        <div className="card-frame-inner" style={{ background: `linear-gradient(145deg, ${char.color}22, ${char.color}44, ${char.color}22)`, borderColor: char.color + '88' }}>
          <div className="card-rarity-bar" style={{ color: '#d4a847' }}>{rarityLabel}</div>
          <div className="card-title">{card.name}</div>
          <div className="card-image-area">
            {card.imagePath ? <img src={card.imagePath} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} /> : '图片区域'}
          </div>
          <div className="card-desc">
            {buildDescription()}
          </div>
          <div className="card-footer">
            <span>{typeLabel}</span>
            <span>{char.nameZh}</span>
          </div>
        </div>
      </div>
      <div className="preview-cost-row">
        费用 <span className="preview-cost-val">{card.cost}</span> {card.useStarCost ? '星' : '能量'}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd F:/自制mod/卡牌制作小工具
git add frontend/src/components/CardPreview.tsx
git commit -m "feat: add CardPreview component with live rendering"
```

---

## Task 8: UpgradeEditor 组件

**Files:**
- Create: `frontend/src/components/UpgradeEditor.tsx`

- [ ] **Step 1: 实现升级路线编辑器**

```tsx
// frontend/src/components/UpgradeEditor.tsx
import type { UpgradeConfig, UpgradeChange, NumericField, CardTag } from '../types/card';
import { NUMERIC_FIELDS, TAGS } from '../data/keywords';

interface UpgradeEditorProps {
  upgrade: UpgradeConfig;
  onChange: (upgrade: UpgradeConfig) => void;
}

const LEVEL_COLORS = ['#d4a847', '#d4842a', '#c0392b', '#8e44ad', '#2980b9', '#27ae60'];

export function UpgradeEditor({ upgrade, onChange }: UpgradeEditorProps) {
  const setMode = (mode: 'auto' | 'custom') => {
    onChange({ ...upgrade, mode, levels: mode === 'auto' ? [] : upgrade.levels });
  };

  const addLevel = () => {
    const suffix = upgrade.levels.length === 0 ? '+' : `+${upgrade.levels.length + 1}`;
    onChange({ ...upgrade, levels: [...upgrade.levels, { nameSuffix: suffix, changes: [] }] });
  };

  const removeLevel = (index: number) => {
    onChange({ ...upgrade, levels: upgrade.levels.filter((_, i) => i !== index) });
  };

  const addChange = (levelIndex: number) => {
    const levels = [...upgrade.levels];
    levels[levelIndex] = {
      ...levels[levelIndex],
      changes: [...levels[levelIndex].changes, { type: 'numeric', field: 'damage', operation: 'add', value: 3 } as UpgradeChange],
    };
    onChange({ ...upgrade, levels });
  };

  const removeChange = (levelIndex: number, changeIndex: number) => {
    const levels = [...upgrade.levels];
    levels[levelIndex] = {
      ...levels[levelIndex],
      changes: levels[levelIndex].changes.filter((_, i) => i !== changeIndex),
    };
    onChange({ ...upgrade, levels });
  };

  const updateChange = (levelIndex: number, changeIndex: number, change: UpgradeChange) => {
    const levels = [...upgrade.levels];
    const changes = [...levels[levelIndex].changes];
    changes[changeIndex] = change;
    levels[levelIndex] = { ...levels[levelIndex], changes };
    onChange({ ...upgrade, levels });
  };

  return (
    <div className="upgrade-editor">
      <div className="form-label">升级模式</div>
      <div className="upgrade-mode">
        <div className={`mode-btn ${upgrade.mode === 'auto' ? 'active' : ''}`} onClick={() => setMode('auto')}>数值自动</div>
        <div className={`mode-btn ${upgrade.mode === 'custom' ? 'active' : ''}`} onClick={() => setMode('custom')}>完全自定义</div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">最大升级次数</label>
          <input className="form-input" type="number" min="1" value={upgrade.maxLevel} onChange={e => onChange({ ...upgrade, maxLevel: Number(e.target.value) })} />
        </div>
      </div>

      {upgrade.mode === 'auto' && (
        <div className="auto-rule">
          <label className="form-label">自动规则</label>
          <div className="form-row">
            <select className="form-input" value={upgrade.autoRule?.field ?? 'damage'} onChange={e => onChange({ ...upgrade, autoRule: { field: e.target.value as NumericField, operation: 'add', value: upgrade.autoRule?.value ?? 3 } })}>
              {NUMERIC_FIELDS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)>}
            </select>
            <input className="form-input" type="number" value={upgrade.autoRule?.value ?? 3} onChange={e => onChange({ ...upgrade, autoRule: { field: upgrade.autoRule?.field ?? 'damage', operation: 'add', value: Number(e.target.value) } })} />
          </div>
        </div>
      )}

      {upgrade.mode === 'custom' && (
        <div className="upgrade-levels">
          {upgrade.levels.map((level, li) => (
            <div key={li} className="upgrade-level">
              <div className="upgrade-level-header">
                <span className="level-dot" style={{ background: LEVEL_COLORS[li % LEVEL_COLORS.length] }} />
                Level {li + 1} ({level.nameSuffix})
                <span className="effect-remove" style={{ marginLeft: 'auto' }} onClick={() => removeLevel(li)}>✕</span>
              </div>
              <div className="upgrade-level-body">
                {level.changes.map((change, ci) => (
                  <div key={ci} className="upgrade-change">
                    {change.type === 'numeric' ? (
                      <>
                        <span className="change-type numeric">数值</span>
                        <select className="form-input" style={{ width: '70px', padding: '1px 4px', fontSize: '11px' }} value={change.field} onChange={e => updateChange(li, ci, { ...change, field: e.target.value as NumericField })}>
                          {NUMERIC_FIELDS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                        </select>
                        <span className="change-value">+{change.value}</span>
                        <input className="effect-value" type="number" value={change.value} onChange={e => updateChange(li, ci, { ...change, value: Number(e.target.value) })} />
                      </>
                    ) : (
                      <>
                        <span className="change-type mechanic">机制</span>
                        <select className="form-input" style={{ width: '60px', padding: '1px 4px', fontSize: '11px' }} value={change.action} onChange={e => updateChange(li, ci, { ...change, action: e.target.value as 'add' | 'remove' })}>
                          <option value="add">添加</option>
                          <option value="remove">移除</option>
                        </select>
                        <select className="form-input" style={{ width: '70px', padding: '1px 4px', fontSize: '11px' }} value={change.keyword} onChange={e => updateChange(li, ci, { ...change, keyword: e.target.value as CardTag })}>
                          {TAGS.map(t => <option key={t.id} value={t.id}>{t.nameZh}</option>)}
                        </select>
                      </>
                    )}
                    <span className="effect-remove" onClick={() => removeChange(li, ci)}>✕</span>
                  </div>
                ))}
                <div className="add-btn" style={{ fontSize: '10px', padding: '3px' }} onClick={() => addChange(li)}>+ 添加变动</div>
              </div>
            </div>
          ))}
          <div className="add-btn" onClick={addLevel}>+ 添加升级等级</div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd F:/自制mod/卡牌制作小工具
git add frontend/src/components/UpgradeEditor.tsx
git commit -m "feat: add UpgradeEditor component with auto and custom modes"
```

---

## Task 9: CardEditor 组件（左栏）

**Files:**
- Create: `frontend/src/components/CardEditor.tsx`

- [ ] **Step 1: 实现卡牌属性编辑器**

```tsx
// frontend/src/components/CardEditor.tsx
import type { CardDefinition, CardRarity, CardType, Character, CardTarget } from '../types/card';
import { CHARACTERS } from '../data/characters';
import { TagSelector } from './TagSelector';
import { EffectSelector } from './EffectSelector';

interface CardEditorProps {
  card: CardDefinition;
  onChange: (card: CardDefinition) => void;
  onImageUpload: (file: File) => void;
}

export function CardEditor({ card, onChange, onImageUpload }: CardEditorProps) {
  const update = (partial: Partial<CardDefinition>) => onChange({ ...card, ...partial });

  return (
    <div className="card-editor">
      <div className="form-row">
        <div className="form-group" style={{ flex: 2 }}>
          <label className="form-label">卡牌名称</label>
          <input className="form-input" value={card.name} onChange={e => update({ name: e.target.value, id: e.target.value.replace(/\s+/g, '_').toLowerCase() })} />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label">费用</label>
          <input className="form-input" type="number" min={0} value={card.cost} onChange={e => update({ cost: Number(e.target.value) })} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">稀有度</label>
          <select className="form-input" value={card.rarity} onChange={e => update({ rarity: e.target.value as CardRarity })}>
            <option value="Common">Common 普通</option>
            <option value="Uncommon">Uncommon 罕见</option>
            <option value="Rare">Rare 稀有</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">类型</label>
          <select className="form-input" value={card.type} onChange={e => update({ type: e.target.value as CardType })}>
            <option value="Attack">Attack 攻击</option>
            <option value="Skill">Skill 技能</option>
            <option value="Power">Power 能力</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">角色</label>
          <select className="form-input" value={card.character} onChange={e => update({ character: e.target.value as Character })}>
            {CHARACTERS.map(c => <option key={c.id} value={c.id}>{c.nameZh} {c.nameEn}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">目标</label>
          <select className="form-input" value={card.target} onChange={e => update({ target: e.target.value as CardTarget })}>
            <option value="Enemy">Enemy 单体</option>
            <option value="AllEnemies">AllEnemies 全体</option>
            <option value="Self">Self 自身</option>
            <option value="None">None 无</option>
          </select>
        </div>
      </div>

      <TagSelector
        selected={card.tags}
        onChange={tags => update({ tags })}
        infiniteUpgrade={card.upgrade.infinite}
        onInfiniteUpgradeChange={v => update({ upgrade: { ...card.upgrade, infinite: v } })}
      />

      <EffectSelector effects={card.effects} onChange={effects => update({ effects })} />

      <div className="form-label" style={{ marginTop: '8px' }}>展示图</div>
      <div className="image-upload" onClick={() => document.getElementById('image-input')?.click()}>
        📁 点击上传图片
        <input id="image-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) onImageUpload(e.target.files[0]); }} />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd F:/自制mod/卡牌制作小工具
git add frontend/src/components/CardEditor.tsx
git commit -m "feat: add CardEditor component with full form"
```

---

## Task 10: App 主布局 + 全局样式

**Files:**
- Modify: `frontend/src/App.tsx`
- Modify: `frontend/src/App.css`

- [ ] **Step 1: 实现 App 主布局，连接所有组件**

```tsx
// frontend/src/App.tsx
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
      const resp = await fetch('http://localhost:5000/api/export', {
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
```

- [ ] **Step 2: 写入完整 CSS 样式**

将之前 brainstorming 中确认的 `card-editor-v2.html` 中的 CSS 样式（从 `:root` 到 `.export-btn:hover`）复制到 `frontend/src/App.css` 中，保持一致的暗黑奇幻风格。

- [ ] **Step 3: 验证前端完整运行**

Run: `cd F:/自制mod/卡牌制作小工具/frontend && npm run dev`
Expected: 三栏布局正常显示，所有组件渲染正确，标签可点击切换，效果可添加/删除

- [ ] **Step 4: Commit**

```bash
cd F:/自制mod/卡牌制作小工具
git add frontend/src/
git commit -m "feat: wire up App layout with all components and styles"
```

---

## Task 11: 后端卡牌模型

**Files:**
- Create: `backend/Models/CardDefinition.cs`

- [ ] **Step 1: 定义 C# 卡牌定义模型（与前端 JSON 对应）**

```csharp
// backend/Models/CardDefinition.cs
namespace CardForgeApi.Models;

public class CardDefinition
{
    public string Id { get; set; } = "";
    public string Name { get; set; } = "";
    public int Cost { get; set; } = 1;
    public bool UseStarCost { get; set; }
    public string Rarity { get; set; } = "Common";
    public string Type { get; set; } = "Attack";
    public string Character { get; set; } = "Ironclad";
    public string Target { get; set; } = "Enemy";
    public List<string> Tags { get; set; } = [];
    public List<CardEffect> Effects { get; set; } = [];
    public string? ImagePath { get; set; }
    public UpgradeConfig Upgrade { get; set; } = new();
}

public class CardEffect
{
    public string Keyword { get; set; } = "";
    public Dictionary<string, JsonElement> Params { get; set; } = new();
    public string? Target { get; set; }
}

public class UpgradeConfig
{
    public int MaxLevel { get; set; } = 1;
    public bool Infinite { get; set; }
    public string Mode { get; set; } = "custom";
    public List<UpgradeLevel> Levels { get; set; } = [];
    public AutoRule? AutoRule { get; set; }
}

public class UpgradeLevel
{
    public string NameSuffix { get; set; } = "+";
    public List<object> Changes { get; set; } = [];
}

public class AutoRule
{
    public string Field { get; set; } = "damage";
    public string Operation { get; set; } = "add";
    public int Value { get; set; } = 3;
}
```

- [ ] **Step 2: Commit**

```bash
cd F:/自制mod/卡牌制作小工具
git add backend/Models/
git commit -m "feat: add C# card definition models"
```

---

## Task 12: C# 代码生成器

**Files:**
- Create: `backend/Templates/CardTemplate.cs`
- Create: `backend/Services/CodeGenerator.cs`

- [ ] **Step 1: 实现卡牌类源码模板**

创建 `backend/Templates/CardTemplate.cs` 作为静态模板字符串持有者，包含：
- `[ModInitializer]` 入口点
- 卡牌注册逻辑
- 单张卡牌类的框架代码（包含 base stats、upgrade logic）

- [ ] **Step 2: 实现 CodeGenerator 服务**

创建 `backend/Services/CodeGenerator.cs`，将 CardDefinition JSON 转化为完整的 C# 源码文件。核心逻辑：
- 为每张卡牌生成一个继承自游戏 CardModel 的类
- 效果映射到游戏 API 调用（PowerCmd.Apply, CreatureCmd.Heal 等）
- 升级逻辑映射到 UpgradeValueBy / AddKeyword / RemoveKeyword
- 标签映射到 CardKeyword 枚举
- 使用字符串拼接（StringBuilder）生成源码

- [ ] **Step 3: Commit**

```bash
cd F:/自制mod/卡牌制作小工具
git add backend/Templates/ backend/Services/CodeGenerator.cs
git commit -m "feat: implement C# code generator from card definition"
```

---

## Task 13: Roslyn 编译器

**Files:**
- Create: `backend/Services/ModCompiler.cs`

- [ ] **Step 1: 实现 Roslyn 动态编译服务**

```csharp
// backend/Services/ModCompiler.cs
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using System.Reflection;
using System.Runtime.Loader;

namespace CardForgeApi.Services;

public class ModCompiler
{
    private readonly string _gameDir;

    public ModCompiler(IConfiguration config)
    {
        _gameDir = config["GamePath"] ?? throw new InvalidOperationException("GamePath not configured");
    }

    public byte[] Compile(string sourceCode, string modId)
    {
        var syntaxTree = CSharpSyntaxTree.ParseText(sourceCode);

        var references = new List<MetadataReference>
        {
            MetadataReference.CreateFromFile(Path.Combine(_gameDir, "sts2.dll")),
            MetadataReference.CreateFromFile(Path.Combine(_gameDir, "0Harmony.dll")),
            MetadataReference.CreateFromFile(typeof(object).Assembly.Location),
            MetadataReference.CreateFromFile(Path.Combine(_gameDir, "GodotSharp.dll")),
            // .NET runtime references
            MetadataReference.CreateFromFile(typeof(System.Runtime.InteropServices.GCHandle).Assembly.Location),
            MetadataReference.CreateFromFile(typeof(System.Linq.Enumerable).Assembly.Location),
            MetadataReference.CreateFromFile(typeof(System.Collections.Generic.List<>).Assembly.Location),
        };

        var compilation = CSharpCompilation.Create(
            $"{modId}.dll",
            [syntaxTree],
            references,
            new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary));

        using var ms = new MemoryStream();
        var result = compilation.Emit(ms);
        if (!result.Success)
        {
            var errors = result.Diagnostics
                .Where(d => d.Severity == DiagnosticSeverity.Error)
                .Select(d => d.ToString());
            throw new InvalidOperationException($"Compilation failed:\n{string.Join("\n", errors)}");
        }

        return ms.ToArray();
    }
}
```

- [ ] **Step 2: Commit**

```bash
cd F:/自制mod/卡牌制作小工具
git add backend/Services/ModCompiler.cs
git commit -m "feat: implement Roslyn mod compiler"
```

---

## Task 14: ZIP 打包 + 导出 API

**Files:**
- Create: `backend/Services/PackageService.cs`
- Modify: `backend/Program.cs`

- [ ] **Step 1: 实现 ZIP 打包服务**

```csharp
// backend/Services/PackageService.cs
using System.IO.Compression;
using System.Text.Json;

namespace CardForgeApi.Services;

public class PackageService
{
    public byte[] CreatePackage(string modId, string modName, byte[] dll, string? imagePath = null)
    {
        using var ms = new MemoryStream();
        using (var zip = new ZipArchive(ms, ZipArchiveMode.Create, true))
        {
            // DLL
            var dllEntry = zip.CreateEntry($"{modId}/{modId}.dll");
            using var dllStream = dllEntry.Open();
            dllStream.Write(dll);

            // manifest
            var manifest = new
            {
                id = modId,
                name = modName,
                author = "CardForge",
                description = $"Custom card mod: {modName}",
                version = "1.0.0",
                has_dll = true,
                has_pck = false,
                affects_gameplay = true
            };
            var manifestEntry = zip.CreateEntry($"{modId}/mod_manifest.json");
            using var manifestStream = manifestEntry.Open();
            JsonSerializer.Serialize(manifestStream, manifest);
        }
        return ms.ToArray();
    }
}
```

- [ ] **Step 2: 更新 Program.cs 注册服务和路由**

更新 `backend/Program.cs`，添加：
- DI 注册 `ModCompiler`, `CodeGenerator`, `PackageService`
- 配置 `GamePath` 从 appsettings.json 或用户配置读取
- CORS 配置（允许 localhost:5173）
- POST `/api/export` 端点完整实现：接收 JSON → 生成代码 → 编译 → 打包 → 返回 ZIP

- [ ] **Step 3: 验证完整 API 流程**

Run: `cd F:/自制mod/卡牌制作小工具/backend && dotnet run`
使用 curl 测试：
```bash
curl -X POST http://localhost:5000/api/export -H "Content-Type: application/json" -d '{"id":"test","name":"Test Card","cost":1,"useStarCost":false,"rarity":"Common","type":"Attack","character":"Ironclad","target":"Enemy","tags":[],"effects":[{"keyword":"damage","params":{"value":6},"target":"Enemy"}],"imagePath":null,"upgrade":{"maxLevel":1,"infinite":false,"mode":"custom","levels":[],"autoRule":null}}' --output test_mod.zip
```
Expected: 返回 test_mod.zip 文件，解压后包含 DLL + manifest

- [ ] **Step 4: Commit**

```bash
cd F:/自制mod/卡牌制作小工具
git add backend/
git commit -m "feat: implement export API with ZIP packaging"
```

---

## Task 15: 前后端集成测试

**Files:**
- Modify: `frontend/vite.config.ts` (proxy config)

- [ ] **Step 1: 配置 Vite 开发代理**

```typescript
// frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})
```

- [ ] **Step 2: 更新 App.tsx 中的 fetch URL**

将 `http://localhost:5000/api/export` 改为 `/api/export`（通过代理）。

- [ ] **Step 3: 端到端手动测试**

1. 启动后端: `cd F:/自制mod/卡牌制作小工具/backend && dotnet run`
2. 启动前端: `cd F:/自制mod/卡牌制作小工具/frontend && npm run dev`
3. 在浏览器中设计一张卡牌
4. 点击"导出 Mod"
5. 验证下载了 ZIP 文件
6. 解压 ZIP，确认包含 DLL + mod_manifest.json
7. 将解压的文件夹复制到游戏的 mods 目录
8. 启动游戏验证 mod 加载

- [ ] **Step 4: Commit**

```bash
cd F:/自制mod/卡牌制作小工具
git add frontend/vite.config.ts frontend/src/App.tsx
git commit -m "feat: integrate frontend with backend, add dev proxy"
```

---

## Task 16: README 文档

**Files:**
- Create: `README.md`

- [ ] **Step 1: 编写项目 README**

包含：
- 项目简介
- 前置依赖（.NET 9 SDK, Node.js 18+）
- 快速开始（clone → 后端启动 → 前端启动）
- 配置游戏路径说明
- 使用方法
- 技术架构简述

- [ ] **Step 2: Commit**

```bash
cd F:/自制mod/卡牌制作小工具
git add README.md
git commit -m "docs: add project README"
```

---

## Spec Coverage Self-Review

| Spec 要求 | 对应 Task |
|-----------|-----------|
| 卡牌名称/费用/稀有度/类型 | Task 9 (CardEditor) |
| 角色选择（5个正确角色） | Task 4 + Task 9 |
| 目标类型 | Task 9 |
| 标签切换 | Task 5 |
| 效果词条（预设列表） | Task 4 + Task 6 |
| 展示图上传 | Task 9 |
| 升级模式A（数值自动） | Task 8 |
| 升级模式B（完全自定义） | Task 8 |
| 无限升级标签 | Task 5 + Task 8 |
| 数值变动 + 机制变动 | Task 8 |
| 三栏 UI 布局 | Task 10 |
| Roslyn 编译 DLL | Task 13 |
| ZIP 打包（DLL + manifest） | Task 14 |
| 实时预览 | Task 7 |
| 暗黑奇幻视觉风格 | Task 10 (CSS) |

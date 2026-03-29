# STS2 Card Forge — 卡牌制作工具设计文档

> 日期: 2026-03-29
> 状态: 已确认

## 概述

一个本地 Web 应用，帮助用户为《杀戮尖塔2》制作自定义卡牌 mod。用户通过可视化界面设计卡牌（属性、效果、升级路线），工具自动生成 C# mod 代码并通过 Roslyn 编译为可直接使用的 DLL。

## 技术方案

**方案A：本地 Web + Roslyn 编译**

| 层 | 技术 | 说明 |
|---|---|---|
| 前端 | React + Vite + TypeScript | 卡牌编辑器 UI，实时预览 |
| 后端 | .NET 9 Minimal API | Roslyn 动态编译，生成 DLL |
| 通信 | REST API (JSON) | 前端 POST 卡牌定义，后端返回 ZIP |

**启动方式**：用户 clone 后 `dotnet run` 启动后端 + `npm run dev` 启动前端

## 角色数据

| 角色 | 英文 | 颜色 | CardPool ID |
|------|------|------|-------------|
| 铁甲战士 | Ironclad | 红色 | `IRONCLAD_CARD_POOL` |
| 静默猎人 | Silent | 绿色 | `SILENT_CARD_POOL` |
| 摄政王 | Regent | 橙色 | `REGENT_CARD_POOL` |
| 死灵师 | Necrobinder | 粉紫 | `NECROBINDER_CARD_POOL` |
| 机器人 | Defect | 蓝色 | `DEFECT_CARD_POOL` |

## 功能

### P0：自定义卡牌

用户可设置：
- **名称** — 卡牌显示名称
- **费用** — 能量消耗（0-3+），摄政王可用"星"替代
- **稀有度** — Common / Uncommon / Rare
- **类型** — Attack / Skill / Power
- **角色** — 上述 5 个角色
- **目标** — Enemy / AllEnemies / Self / None
- **标签** — 消耗 / 虚无 / 固有 / 保留 / 永恒
- **效果词条** — 从预设列表中组合选择（见下文）
- **展示图** — 上传本地图片

### P0：预设效果词条

效果词条分两类：

**数值类词条**：
| 词条 | 描述 | 参数 |
|------|------|------|
| 伤害 | 造成 X 点伤害 | damage: number |
| 格挡 | 获得 X 点格挡 | block: number |
| 抽牌 | 抽 X 张牌 | draw: number |
| 攻击次数 | 重复 X 次 | hits: number |
| 力量 | 获得/施加 X 层力量 | strength: number, target |
| 敏捷 | 获得 X 层敏捷 | dexterity: number |
| 易伤 | 施加 X 层易伤 | vulnerable: number, target |
| 虚弱 | 施加 X 层虚弱 | weak: number, target |
| 脆弱 | 施加 X 层脆弱 | frail: number, target |
| 中毒 | 施加 X 层中毒 | poison: number, target |
| 厄运 | 施加 X 层厄运（死灵师） | doom: number, target |
| 再生 | 获得 X 层再生 | regen: number |
| 荆棘 | 获得 X 层荆棘 | thorns: number |
| 人工制品 | 获得 X 层人工制品 | artifact: number |
| 费用变动 | 本场战斗费用变化 | costChange: number |
| 治愈 | 恢复 X 点生命 | heal: number |
| 最大HP | 增加 X 点最大生命 | maxHp: number |
| 引导 | 引导一个 X 宝珠 | orb: OrbType |
| 锻造 | 锻造 X（摄政王） | forge: number |
| 召唤 | 召唤奥斯蒂 X HP | summon: number |

**机制类词条**：
| 词条 | 描述 |
|------|------|
| 消耗 | 此卡消耗 |
| 虚无 | 回合结束在手牌中则消耗 |
| 固有 | 战斗开始时在手牌中 |
| 保留 | 回合结束时不弃掉 |
| 永恒 | 不可从牌组中移除 |
| 致命 | 击杀非随从时触发效果 |
| 重放 | 额外打出一次 |
| 狡猾 | 弃掉时免费打出（静默猎人） |
| 壁垒 | 格挡不会在回合结束消失 |
| 无形 | 受到伤害降为 1 |

### P0：升级系统

**两种模式**：

#### 模式A：纯数值自动延续
- 用户定义一条规则（如：伤害+3）
- 每次升级自动按规则叠加
- 仅支持数值变动

#### 模式B：完全自定义
- 玩家手动定义每一级的所有变化
- 支持**数值变动**和**机制变动**
- 每一级都是独立的，不自动延续
- 两种变动类型：
  - 数值变动：`{ type: "numeric", field: "damage", operation: "add", value: 3 }`
  - 机制变动：`{ type: "keyword", action: "add|remove", keyword: "Innate" }`

**无限升级标签**：
- 勾选后，升级次数无上限
- 模式A：规则自动延续到无限级
- 模式B：玩家需要定义每一级，没有自动延续

**升级次数**：用户自由输入数字

### P2（暂缓）：自定义新机制

允许玩家自行添加新的机制名称和效果代码。

## 数据模型

```json
{
  "id": "my_custom_strike",
  "name": "超级打击",
  "cost": 1,
  "useStarCost": false,
  "rarity": "Common",
  "type": "Attack",
  "character": "Ironclad",
  "target": "Enemy",
  "tags": ["Innate"],
  "imagePath": "custom_strike.png",
  "effects": [
    {
      "keyword": "damage",
      "params": { "value": 6 },
      "target": "Enemy"
    },
    {
      "keyword": "vulnerable",
      "params": { "value": 1 },
      "target": "Enemy"
    }
  ],
  "upgrade": {
    "maxLevel": 3,
    "infinite": false,
    "mode": "custom",
    "levels": [
      {
        "nameSuffix": "+",
        "changes": [
          { "type": "numeric", "field": "damage", "operation": "add", "value": 3 }
        ]
      },
      {
        "nameSuffix": "+2",
        "changes": [
          { "type": "numeric", "field": "damage", "operation": "add", "value": 3 },
          { "type": "keyword", "action": "add", "keyword": "Innate" }
        ]
      },
      {
        "nameSuffix": "+3",
        "changes": [
          { "type": "numeric", "field": "damage", "operation": "add", "value": 3 },
          { "type": "keyword", "action": "add", "keyword": "Exhaust" }
        ]
      }
    ],
    "infiniteRule": null
  }
}
```

## UI 设计

**三栏布局，暗黑奇幻风格**：

- **左栏（卡牌属性）**：名称、费用、稀有度、类型、角色、目标、标签切换、效果词条列表、图片上传
- **中栏（实时预览）**：模拟游戏内卡牌外观，居中显示，描述文字居中
- **右栏（升级路线）**：模式选择、升级次数、每级变动列表（数值变动用红色标记，机制变动用绿色标记）
- **底部**：导出按钮

配色：深蓝黑底色，金色点缀，贴合杀戮尖塔美术风格。

## 导出流程

1. 用户点击"导出 Mod"
2. 前端 POST 卡牌 JSON 到后端 `/api/export`
3. 后端流程：
   - 根据 JSON 生成 C# 卡牌类源码（基于模板）
   - 使用 Roslyn 编译，引用 sts2.dll / GodotSharp.dll / 0Harmony.dll
   - 打包 DLL + mod_manifest.json + 图片资源 → ZIP
4. 前端下载 ZIP 文件
5. 用户解压到游戏 `mods` 目录即可使用

## 代码生成策略

每张自定义卡牌生成一个 C# 类，结构如下：

```
ModRoot/
├── mod_manifest.json
├── CardForgeMod.dll        (编译后的 DLL)
└── assets/
    └── custom_strike.png   (卡牌图片)
```

生成的 C# 类模式：
- 使用 `[ModInitializer]` 注册卡牌
- 卡牌类继承游戏的 CardModel 基类
- 效果通过游戏的 Command API 实现（PowerCmd, CreatureCmd, CardCmd 等）
- 升级逻辑通过 `UpgradeValueBy` / `AddKeyword` / `RemoveKeyword` 实现

## 项目文件结构

```
卡牌制作小工具/
├── frontend/                    # React + Vite 前端
│   ├── src/
│   │   ├── components/          # UI 组件
│   │   │   ├── CardEditor.tsx   # 左栏编辑器
│   │   │   ├── CardPreview.tsx  # 中栏预览
│   │   │   ├── UpgradeEditor.tsx # 右栏升级路线
│   │   │   ├── EffectSelector.tsx # 效果词条选择器
│   │   │   └── TagSelector.tsx  # 标签切换
│   │   ├── types/               # TypeScript 类型定义
│   │   │   └── card.ts          # 卡牌数据模型
│   │   ├── data/                # 静态数据
│   │   │   ├── keywords.ts      # 词条定义
│   │   │   ├── characters.ts    # 角色数据
│   │   │   └── effects.ts       # 效果映射
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/                     # .NET 9 后端
│   ├── CardForgeApi.csproj
│   ├── Program.cs               # Minimal API 入口
│   ├── Services/
│   │   ├── CodeGenerator.cs     # C# 源码生成
│   │   ├── ModCompiler.cs       # Roslyn 编译
│   │   └── PackageService.cs    # ZIP 打包
│   └── Templates/
│       └── CardTemplate.csx     # 卡牌类模板
├── docs/
│   └── STS2卡牌机制参考.md      # 机制参考文档
└── README.md
```

## 前置依赖

- .NET 9 SDK
- Node.js 18+
- 用户的 STS2 游戏安装路径（首次使用时配置，用于引用 sts2.dll）

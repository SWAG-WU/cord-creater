# 杀戮尖塔2 卡牌机制与升级模式参考

## 一、角色与卡池

| 角色 | 英文名 | 颜色 | CardPool ID | 初始HP | 解锁条件 |
|------|--------|------|-------------|--------|----------|
| 铁甲战士 | Ironclad | 红色 | `IRONCLAD_CARD_POOL` | 80 | 默认解锁 |
| 静默猎人 | Silent | 绿色 | `SILENT_CARD_POOL` | 70 | 默认解锁 |
| 摄政王 | Regent | 橙色 | `REGENT_CARD_POOL` | 75 | 静默猎人通关后 |
| 死灵师 | Necrobinder | 粉紫 | `NECROBINDER_CARD_POOL` | 66 | 摄政王通关后 |
| 机器人 | Defect | 蓝色 | `DEFECT_CARD_POOL` | 75 | 死灵师通关后 |

> 注意：还有一个调试角色 Deprived（流放者，金色），不计入正式角色。

---

## 二、卡牌基础属性

| 属性 | 可选值 |
|------|--------|
| 类型 | Attack（攻击）/ Skill（技能）/ Power（能力）/ Status（状态）/ Curse（诅咒）/ Quest（任务） |
| 稀有度 | Common（普通）/ Uncommon（罕见）/ Rare（稀有）/ Basic（基础）/ Event（事件）/ Token（衍生物） |
| 费用 | 0-3+（能量），摄政王部分卡牌使用"星"替代能量 |
| 目标 | Enemy / AllEnemies / Self / None |

---

## 三、卡牌关键词/词条

### 通用关键词（所有角色）

| 关键词 | 英文 | 描述 |
|--------|------|------|
| 格挡 | Block | 防止伤害直到下一回合 |
| 力量 | Strength | 增加/减少攻击伤害X点 |
| 敏捷 | Dexterity | 增加/减少格挡值X点 |
| 易伤 | Vulnerable | 受到的攻击伤害增加50% |
| 虚弱 | Weak | 造成的攻击伤害减少25% |
| 脆弱 | Frail | 获得的格挡减少25% |
| 中毒 | Poison | 每回合开始时失去生命值，每回合中毒减少1 |
| 人工制品 | Artifact | 抵消X个减益效果 |
| 消耗 | Exhaust | 从本局游戏中移除 |
| 虚无 | Ethereal | 回合结束时若在手牌中则消耗 |
| 固有 | Innate | 每场战斗开始时在手牌中 |
| 保留 | Retain | 回合结束时不会被弃掉 |
| 不可打出 | Unplayable | 不能从手牌中打出 |
| 永恒 | Eternal | 不能从牌组中移除或转换 |
| 致命 | Fatal | 当此卡杀死非随从敌人时触发 |
| 重放 | Replay | 此卡额外打出一次 |
| 再生 | Regen | 回合结束时恢复X点生命值，然后减少1 |
| 荆棘 | Thorns | 被攻击击中时反弹X点伤害 |
| 活力 | Vigor | 下一次攻击造成X点额外伤害 |
| 缓冲 | Buffer | 防止接下来X次失去生命值 |
| 无形 | Intangible | 受到的所有伤害和生命值损失减少到1 |
| 镀层 | Plating | 回合结束时获得X点格挡，镀层减少1 |
| 仪式 | Ritual | 回合结束时获得X点力量 |
| 专注 | Focus | 将宝珠的效果增加X点 |
| 困惑 | Confused | 卡牌费用在抽牌时随机化为0-3 |
| 烟雾弥漫 | Smoggy | 每回合只能打出1张技能卡牌 |

### 角色专属关键词

| 关键词 | 角色 | 描述 |
|--------|------|------|
| 狡猾 (Sly) | 静默猎人 | 若在回合结束前从手牌中弃掉此卡，免费打出它 |
| 星 (Stars) | 摄政王 | 某些摄政王卡牌所需的替代资源 |
| 锻造 (Forge) | 摄政王 | 每场战斗第一次锻造时，将"君主之刃"加入手牌，增加X点伤害 |
| 厄运 (Doom) | 死灵师 | 所有敌人回合结束时，若厄运值≥生命值，该敌人死亡 |
| 召唤 (Summon) | 死灵师 | 召唤奥斯蒂，生命值为X点 |
| 引导 (Channel) | 机器人 | 将一个宝珠放入第一个空宝珠槽位 |
| 激发 (Evoke) | 机器人 | 消耗最右边的宝珠并使用其激发效果 |

### 宝珠类型（机器人）

| 宝珠 | 被动效果 | 激发效果 |
|------|----------|----------|
| 闪电 | 对随机敌人造成3点伤害 | 对随机敌人造成8点伤害 |
| 冰霜 | 获得2点格挡 | 获得5点格挡 |
| 黑暗 | 存储伤害增加6点 | 对生命值最低的敌人造成存储伤害 |
| 等离子 | 下回合开始时+1能量 | 获得2点能量 |
| 玻璃 | 对所有敌人造成4点伤害（每回合-1） | 造成两倍被动伤害 |

---

## 四、附魔系统（STS2新增）

附魔是永久性的正面效果，可添加到牌组中的卡牌上：

| 附魔 | 效果 |
|------|------|
| 灵巧 (Nimble) | 获得X点格挡 |
| 克隆 (Clone) | 可以在休息点复制 |
| 腐化 (Corrupt) | 造成50%更多伤害，但失去2点生命 |
| 偏爱 (Favorite) | 攻击伤害翻倍 |
| 迷人 (Charming) | 每场战斗重放一次 |
| 黏糊 (Gooey) | 获得消耗，打出时永久增加格挡1点 |
| 灌注 (Imbue) | 每场战斗开始时自动打出 |
| 本能 (Instinct) | 费用减少1 |
| 动量 (Momentum) | 打出时增加攻击伤害X点 |
| 敏捷 (Agility) | 增加格挡X点 |
| 完美契合 (Perfect Fit) | 洗入抽牌堆时放在最上面 |
| 皇家认可 (Royal Seal) | 获得固有和保留 |
| 锋利 (Sharp) | 增加伤害X点 |
| 滑行 (Skim) | 抽到时费用从0随机化到3 |
| 沉睡精华 (Slumbering Essence) | 回合结束时在手牌中，费用减少1 |
| 灵魂力量 (Soul Force) | 失去消耗 |
| 播种 (Sow) | 每场战斗第一次打出时获得能量 |
| 螺旋 (Spiral) | 获得重放1次 |
| 稳定 (Stable) | 获得保留 |
| 迅捷 (Swift) | 第一次打出时抽X张卡 |
| 活力 (Vitality) | 第一次被打出时造成X点额外伤害 |

---

## 五、卡牌升级模式（10种类型）

### 类型1：纯伤害提升（最常见，约占攻击卡35%）

| 卡牌 | 角色 | 费用 | 基础伤害 | 升级后伤害 | 增量 |
|------|------|------|----------|-----------|------|
| 打击 | 全部 | 1 | 6 | 9 | +3 |
| 愤怒 | 铁甲 | 0 | 6 | 8 | +2 |
| 重击 | 铁甲 | 3 | 32 | 42 | +10 |
| 切片 | 静默 | 0 | 6 | 8 | +2 |
| 雷击 | 铁甲 | 1 | 4 | 7 | +3 |

### 类型2：纯格挡提升（约占技能卡25%）

| 卡牌 | 角色 | 费用 | 基础格挡 | 升级后格挡 | 其他效果 |
|------|------|------|----------|-----------|----------|
| 防御 | 全部 | 1 | 5 | 8 | - |
| 后空翻 | 静默 | 1 | 5 | 8 | 抽2张 |
| 熊抱 | 铁甲 | 1 | 8 | 11 | 抽1张 |

### 类型3：费用降低（约占5-10%，价值最高）

| 卡牌 | 角色 | 基础费用 | 升级后费用 | 效果变化 |
|------|------|----------|-----------|----------|
| 双重施法 | 机器人 | 1 | 0 | 无 |
| 身体猛击 | 铁甲 | 1 | 0 | 无 |

### 类型4：攻击次数增加（约占5%）

| 卡牌 | 角色 | 费用 | 基础次数 | 升级后次数 | 每次伤害 |
|------|------|------|----------|-----------|----------|
| 剑回旋镖 | 铁甲 | 1 | 3 | 4 | 3 |
| 双重打击 | 铁甲 | 1 | 2 | 3 | 5 |

### 类型5：效果/行为改变（约占15%）

| 卡牌 | 角色 | 基础效果 | 升级后效果 | 变化类型 |
|------|------|----------|-----------|----------|
| 武装 | 铁甲 | 获得5格挡，升级**一张**手牌 | 获得5格挡，升级**所有**手牌 | 单体→全部 |
| 恶魔形态 | 铁甲 | 每回合+2力量 | 每回合+3力量 | 数值+1 |
| 刀刃之舞 | 静默 | 生成3张飞刀，消耗 | 生成4张飞刀，消耗 | 数量+1 |

### 类型6：抽牌数增加（约占5%）

| 卡牌 | 角色 | 费用 | 基础抽牌 | 升级后抽牌 |
|------|------|------|----------|-----------|
| 杂技 | 静默 | 1 | 3 | 4 |
| 战斗恍惚 | 铁甲 | 0 | 3 | 4 |

### 类型7：减益/状态层数增加（约占10%）

| 卡牌 | 角色 | 基础 | 升级后 | 变化 |
|------|------|------|--------|------|
| 致盲 | 静默 | 1层虚弱，3伤害 | 2层虚弱，4伤害 | 虚弱+1 |
| 负面脉冲 | 死灵师 | 7层厄运(全体)+5格挡 | 10层厄运+5格挡 | 厄运+3 |

### 类型8：多属性同时提升（约占10%）

| 卡牌 | 基础 | 升级后 | 变化 |
|------|------|--------|------|
| 铁浪 | 5格挡+5伤害 | 8格挡+8伤害 | 均+3 |
| 冲刺 | 10格挡+10伤害 | 12格挡+12伤害 | 均+2 |
| 佯攻 | 1层虚弱+8伤害 | 2层虚弱+8伤害 | 虚弱+1 |

### 类型9：缩放数值提升（能力卡常见）

| 卡牌 | 基础 | 升级后 | 变化 |
|------|------|--------|------|
| 发炎 | +2力量 | +3力量 | +1/回合 |
| 破裂 | 掉血→+1力量 | 掉血→+2力量 | +1/触发 |
| 狂暴 | 每次打出+5伤害 | 每次打出+7伤害 | +2/次 |

### 类型10：关键词增减

| 变化类型 | 示例 |
|----------|------|
| 添加关键词 | "造成7伤害" → "固有，造成7伤害" |
| 移除关键词 | "造成7伤害，消耗" → "造成7伤害"（消耗被移除） |
| 消耗→保留 | 某些卡牌升级后消耗变为保留 |

---

## 六、增益/减益完整列表

### 增益

| ID | 类型 | 中文名 | API类名 |
|----|------|--------|---------|
| strength | 增益 | 力量 | StrengthPower |
| dexterity | 增益 | 敏捷 | DexterityPower |
| artifact | 增益 | 人工制品 | ArtifactPower |
| regen | 增益 | 再生 | RegenPower |
| thorns | 增益 | 荆棘 | ThornsPower |
| vigor | 增益 | 活力 | VigorPower |
| plating | 增益 | 镀层 | PlatingPower |
| intangible | 增益 | 无形 | IntangiblePower |
| barricade | 增益 | 壁垒 | BarricadePower |
| ritual | 增益 | 仪式 | RitualPower |
| focus | 增益 | 专注 | FocusPower |
| buffer | 增益 | 缓冲 | BufferPower |

### 减益

| ID | 类型 | 中文名 | API类名 |
|----|------|--------|---------|
| vulnerable | 减益 | 易伤 | VulnerablePower |
| weak | 减益 | 虚弱 | WeakPower |
| frail | 减益 | 脆弱 | FrailPower |
| poison | 减益 | 中毒 | PoisonPower |
| slow | 减益 | 减速 | SlowPower |
| no_draw | 减益 | 禁止抽牌 | NoDrawPower |
| no_block | 减益 | 禁止格挡 | NoBlockPower |
| hex | 减益 | 诅咒 | HexPower |
| confused | 减益 | 困惑 | ConfusedPower |

---

## 七、API 参考

### 卡牌相关命令

```csharp
// 创建卡牌
var card = runState.CreateCard(cardModel, player);
runState.AddCard(card, player);

// 卡牌奖励
var options = new CardCreationOptions(cardPool, CardCreationSource.Other, CardRarityOddsType.RegularEncounter, null);
var reward = new CardReward(options, 3, player);
RewardsCmd.OfferCustom(player, new List<Reward> { reward });

// 卡牌变形
CardCmd.TransformToRandom(card, null, CardPreviewStyle.EventLayout);
```

### 增益/减益命令

```csharp
// 通用模板：PowerCmd.Apply<TPower>(目标, 层数, 来源, 上下文, 标志)
PowerCmd.Apply<StrengthPower>(creature, 2, source, null, false);
PowerCmd.Apply<VulnerablePower>(enemy, 3, source, null, false);
PowerCmd.Apply<PoisonPower>(enemy, 5, source, null, false);
```

### 升级相关 API（反编译发现）

```csharp
// 伤害升级
damage.UpgradeValueBy(3);        // 伤害+3
block.UpgradeValueBy(3);          // 格挡+3

// 费用升级
energyCost.UpgradeBy(-1);         // 费用-1
starCost.UpgradeBy(-1);           // 星费-1（摄政王）

// 次数升级
repeat.UpgradeValueBy(1);         // 攻击次数+1

// 关键词变更
AddKeyword(CardKeyword.Innate);    // 添加固有
AddKeyword(CardKeyword.Ethereal);  // 添加虚无
RemoveKeyword(CardKeyword.Exhaust); // 移除消耗

// 最大升级等级
MaxUpgradeLevel = 5;              // 允许升级5次
```

### 游戏命名空间

```
MegaCrit.Sts2.Core.Models         - CardModel, ModelDb, RelicModel
MegaCrit.Sts2.Core.Models.Powers  - 所有Power类型
MegaCrit.Sts2.Core.Models.Characters - 所有角色类型
MegaCrit.Sts2.Core.Commands       - CardCmd, PowerCmd, CreatureCmd, RewardsCmd
MegaCrit.Sts2.Core.Entities.Players - Player
MegaCrit.Sts2.Core.Entities.Creatures - Creature
MegaCrit.Sts2.Core.Runs           - RunState, RunManager, CardCreationOptions
MegaCrit.Sts2.Core.Rewards        - CardReward, CardRemovalReward
MegaCrit.Sts2.Core.Modding        - [ModInitializer] 特性
```

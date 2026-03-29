import type { CardTarget, NumericField } from '../types/card';

export interface EffectDefinition {
  keyword: string;
  nameZh: string;
  category: 'numeric' | 'keyword';
  description: string;
  fields: { name: string; label: string; defaultValue: number }[];
  defaultTarget?: CardTarget;
  numericField?: NumericField;
}

export const EFFECTS: EffectDefinition[] = [
  // === 通用 - 伤害/防御 ===
  { keyword: 'damage', nameZh: '伤害', category: 'numeric', description: '造成 {value} 点伤害', fields: [{ name: 'value', label: '伤害值', defaultValue: 6 }], defaultTarget: 'Enemy', numericField: 'damage' },
  { keyword: 'block', nameZh: '格挡', category: 'numeric', description: '获得 {value} 点格挡', fields: [{ name: 'value', label: '格挡值', defaultValue: 5 }], defaultTarget: 'Self', numericField: 'block' },
  { keyword: 'hits', nameZh: '多次攻击', category: 'numeric', description: '重复 {value} 次', fields: [{ name: 'value', label: '攻击次数', defaultValue: 2 }], defaultTarget: 'Enemy', numericField: 'hits' },
  { keyword: 'heal', nameZh: '治愈', category: 'numeric', description: '恢复 {value} 点生命', fields: [{ name: 'value', label: '生命值', defaultValue: 5 }], defaultTarget: 'Self', numericField: 'heal' },
  { keyword: 'maxHp', nameZh: '最大HP', category: 'numeric', description: '增加 {value} 点最大生命', fields: [{ name: 'value', label: '生命值', defaultValue: 3 }], defaultTarget: 'Self', numericField: 'maxHp' },

  // === 通用 - 能量 ===
  { keyword: 'energyGain', nameZh: '获得能量', category: 'numeric', description: '获得 {value} 点能量', fields: [{ name: 'value', label: '能量值', defaultValue: 2 }], defaultTarget: 'Self', numericField: 'energy' },
  { keyword: 'energyNextTurn', nameZh: '下回合能量', category: 'numeric', description: '下回合获得 {value} 点能量', fields: [{ name: 'value', label: '能量值', defaultValue: 1 }], defaultTarget: 'Self', numericField: 'energy' },

  // === 通用 - 抽牌/卡牌 ===
  { keyword: 'draw', nameZh: '抽牌', category: 'numeric', description: '抽 {value} 张牌', fields: [{ name: 'value', label: '抽牌数', defaultValue: 2 }], defaultTarget: 'Self', numericField: 'draw' },
  { keyword: 'discard', nameZh: '弃牌', category: 'numeric', description: '弃掉 {value} 张手牌', fields: [{ name: 'value', label: '弃牌数', defaultValue: 1 }], defaultTarget: 'Self', numericField: 'draw' },

  // === 通用 - 自身负面 ===
  { keyword: 'loseHp', nameZh: '失去生命', category: 'numeric', description: '失去 {value} 点生命', fields: [{ name: 'value', label: '生命值', defaultValue: 2 }], defaultTarget: 'Self', numericField: 'loseHp' },

  // === 通用 - 增益 ===
  { keyword: 'strength', nameZh: '力量', category: 'numeric', description: '获得 {value} 层力量', fields: [{ name: 'value', label: '层数', defaultValue: 2 }], defaultTarget: 'Self', numericField: 'strength' },
  { keyword: 'dexterity', nameZh: '敏捷', category: 'numeric', description: '获得 {value} 层敏捷', fields: [{ name: 'value', label: '层数', defaultValue: 2 }], defaultTarget: 'Self', numericField: 'dexterity' },
  { keyword: 'artifact', nameZh: '人工制品', category: 'numeric', description: '获得 {value} 层人工制品', fields: [{ name: 'value', label: '层数', defaultValue: 1 }], defaultTarget: 'Self', numericField: 'artifact' },
  { keyword: 'regen', nameZh: '再生', category: 'numeric', description: '获得 {value} 层再生', fields: [{ name: 'value', label: '层数', defaultValue: 3 }], defaultTarget: 'Self', numericField: 'regen' },
  { keyword: 'thorns', nameZh: '荆棘', category: 'numeric', description: '获得 {value} 层荆棘', fields: [{ name: 'value', label: '层数', defaultValue: 3 }], defaultTarget: 'Self', numericField: 'thorns' },
  { keyword: 'vigor', nameZh: '活力', category: 'numeric', description: '获得 {value} 层活力（下次攻击额外伤害）', fields: [{ name: 'value', label: '层数', defaultValue: 4 }], defaultTarget: 'Self', numericField: 'vigor' },
  { keyword: 'plating', nameZh: '镀层', category: 'numeric', description: '获得 {value} 层镀层（回合结束获得格挡）', fields: [{ name: 'value', label: '层数', defaultValue: 3 }], defaultTarget: 'Self', numericField: 'plating' },
  { keyword: 'intangible', nameZh: '无形', category: 'numeric', description: '获得 {value} 层无形（受到伤害降为1）', fields: [{ name: 'value', label: '层数', defaultValue: 1 }], defaultTarget: 'Self', numericField: 'intangible' },
  { keyword: 'buffer', nameZh: '缓冲', category: 'numeric', description: '获得 {value} 层缓冲（抵消负面效果）', fields: [{ name: 'value', label: '层数', defaultValue: 1 }], defaultTarget: 'Self', numericField: 'buffer' },
  { keyword: 'ritual', nameZh: '仪式', category: 'numeric', description: '获得 {value} 层仪式（回合结束获得力量）', fields: [{ name: 'value', label: '层数', defaultValue: 1 }], defaultTarget: 'Self', numericField: 'ritual' },
  { keyword: 'metallicize', nameZh: '机械化', category: 'numeric', description: '获得 {value} 层机械化（回合结束获得格挡）', fields: [{ name: 'value', label: '层数', defaultValue: 3 }], defaultTarget: 'Self', numericField: 'plating' },

  // === 通用 - 减益 ===
  { keyword: 'vulnerable', nameZh: '易伤', category: 'numeric', description: '施加 {value} 层易伤', fields: [{ name: 'value', label: '层数', defaultValue: 1 }], defaultTarget: 'Enemy', numericField: 'vulnerable' },
  { keyword: 'weak', nameZh: '虚弱', category: 'numeric', description: '施加 {value} 层虚弱', fields: [{ name: 'value', label: '层数', defaultValue: 1 }], defaultTarget: 'Enemy', numericField: 'weak' },
  { keyword: 'frail', nameZh: '脆弱', category: 'numeric', description: '施加 {value} 层脆弱', fields: [{ name: 'value', label: '层数', defaultValue: 1 }], defaultTarget: 'Enemy', numericField: 'frail' },
  { keyword: 'poison', nameZh: '中毒', category: 'numeric', description: '施加 {value} 层中毒', fields: [{ name: 'value', label: '层数', defaultValue: 3 }], defaultTarget: 'Enemy', numericField: 'poison' },

  // === 死灵师 ===
  { keyword: 'doom', nameZh: '厄运', category: 'numeric', description: '施加 {value} 层厄运', fields: [{ name: 'value', label: '层数', defaultValue: 5 }], defaultTarget: 'Enemy', numericField: 'doom' },
  { keyword: 'summon', nameZh: '召唤', category: 'numeric', description: '召唤奥斯蒂 {value} HP', fields: [{ name: 'value', label: 'HP', defaultValue: 5 }], defaultTarget: 'Self', numericField: 'summon' },

  // === 摄政王 ===
  { keyword: 'forge', nameZh: '锻造', category: 'numeric', description: '锻造 {value}', fields: [{ name: 'value', label: '锻造值', defaultValue: 2 }], defaultTarget: 'Self', numericField: 'forge' },

  // === 机器人 ===
  { keyword: 'focus', nameZh: '专注', category: 'numeric', description: '获得 {value} 层专注（增强宝珠效果）', fields: [{ name: 'value', label: '层数', defaultValue: 1 }], defaultTarget: 'Self', numericField: 'focus' },
  { keyword: 'channelLightning', nameZh: '引导闪电', category: 'keyword', description: '引导一个闪电宝珠', fields: [], defaultTarget: 'Self' },
  { keyword: 'channelFrost', nameZh: '引导冰霜', category: 'keyword', description: '引导一个冰霜宝珠', fields: [], defaultTarget: 'Self' },
  { keyword: 'channelDark', nameZh: '引导黑暗', category: 'keyword', description: '引导一个黑暗宝珠', fields: [], defaultTarget: 'Self' },
  { keyword: 'channelPlasma', nameZh: '引导等离子', category: 'keyword', description: '引导一个等离子宝珠', fields: [], defaultTarget: 'Self' },
  { keyword: 'channelGlass', nameZh: '引导玻璃', category: 'keyword', description: '引导一个玻璃宝珠', fields: [], defaultTarget: 'Self' },
  { keyword: 'evoke', nameZh: '激发', category: 'keyword', description: '激发最右边的宝珠', fields: [], defaultTarget: 'Self' },

  // === 通用 - 机制关键词 ===
  { keyword: 'replay', nameZh: '重放', category: 'keyword', description: '此卡额外打出 {value} 次', fields: [{ name: 'value', label: '次数', defaultValue: 1 }], defaultTarget: 'Self' },
];

export const TAGS = [
  { id: 'Exhaust' as const, nameZh: '消耗', description: '从本局游戏中移除' },
  { id: 'Ethereal' as const, nameZh: '虚无', description: '回合结束时在手牌中则消耗' },
  { id: 'Innate' as const, nameZh: '固有', description: '每场战斗开始时在手牌中' },
  { id: 'Retain' as const, nameZh: '保留', description: '回合结束时不会弃掉' },
  { id: 'Eternal' as const, nameZh: '永恒', description: '不可从牌组中移除或转换' },
  { id: 'Sly' as const, nameZh: '奇巧', description: '从手牌中被弃掉时，免费打出此卡（静默猎人）' },
  { id: 'Replay' as const, nameZh: '重放', description: '此卡额外打出一次' },
  { id: 'Unplayable' as const, nameZh: '不可打出', description: '此卡不能从手牌中打出' },
];

export const NUMERIC_FIELDS: { value: NumericField; label: string }[] = [
  { value: 'damage', label: '伤害' },
  { value: 'block', label: '格挡' },
  { value: 'draw', label: '抽牌' },
  { value: 'hits', label: '攻击次数' },
  { value: 'cost', label: '费用' },
  { value: 'heal', label: '治愈' },
  { value: 'maxHp', label: '最大HP' },
  { value: 'energy', label: '能量' },
  { value: 'loseHp', label: '失去生命' },
  { value: 'vigor', label: '活力' },
  { value: 'plating', label: '镀层' },
  { value: 'intangible', label: '无形' },
];

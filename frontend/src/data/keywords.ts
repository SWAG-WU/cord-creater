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

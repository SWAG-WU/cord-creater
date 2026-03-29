export type CardRarity = 'Common' | 'Uncommon' | 'Rare';
export type CardType = 'Attack' | 'Skill' | 'Power';
export type Character = 'Ironclad' | 'Silent' | 'Defect' | 'Regent' | 'Necrobinder';
export type CardTarget = 'Enemy' | 'AllEnemies' | 'Self' | 'None';
export type CardTag = 'Exhaust' | 'Ethereal' | 'Innate' | 'Retain' | 'Eternal';
export type NumericField = 'damage' | 'block' | 'draw' | 'hits' | 'cost' | 'heal' | 'maxHp';

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

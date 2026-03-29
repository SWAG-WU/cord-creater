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

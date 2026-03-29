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

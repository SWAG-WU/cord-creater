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

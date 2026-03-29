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
              {NUMERIC_FIELDS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
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

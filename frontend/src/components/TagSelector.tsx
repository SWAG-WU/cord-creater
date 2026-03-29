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

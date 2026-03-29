import type { CardDefinition } from '../types/card';
import { CHARACTERS } from '../data/characters';
import { EFFECTS, TAGS } from '../data/keywords';

interface CardPreviewProps {
  card: CardDefinition;
}

export function CardPreview({ card }: CardPreviewProps) {
  const char = CHARACTERS.find(c => c.id === card.character)!;
  const rarityLabel = { Common: '★ COMMON ★', Uncommon: '★★ UNCOMMON ★★', Rare: '★★★ RARE ★★★' }[card.rarity];
  const typeLabel = { Attack: 'Attack', Skill: 'Skill', Power: 'Power' }[card.type];

  const buildDescription = () => {
    const lines: JSX.Element[] = [];
    card.tags.forEach(tag => {
      const tagInfo = TAGS.find(t => t.id === tag);
      if (tagInfo) lines.push(<span key={tag} className="keyword-line">{tagInfo.nameZh}</span>);
    });
    card.effects.forEach((effect, i) => {
      const def = EFFECTS.find(e => e.keyword === effect.keyword);
      if (!def) return;
      let text = def.description;
      const params = { ...effect.params };
      Object.entries(params).forEach(([key, val]) => {
        text = text.replace(`{${key}}`, `{${val}}`);
      });
      const parts = text.split(/(\{[^}]+\})/);
      const rendered = parts.map((part, j) => {
        const numMatch = part.match(/^\{(\d+)\}$/);
        if (numMatch) return <span key={j} className="damage-val">{numMatch[1]}</span>;
        return <span key={j}>{part}</span>;
      });
      lines.push(<span key={`e${i}`}>{rendered}。</span>);
    });
    return lines;
  };

  return (
    <div className="card-preview-wrapper">
      <div className="card-frame">
        <div className="card-cost">{card.useStarCost ? '★' : card.cost}</div>
        <div className="card-frame-inner" style={{ background: `linear-gradient(145deg, ${char.color}22, ${char.color}44, ${char.color}22)`, borderColor: char.color + '88' }}>
          <div className="card-rarity-bar">{rarityLabel}</div>
          <div className="card-title">{card.name}</div>
          <div className="card-image-area">
            {card.imagePath ? <img src={card.imagePath} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} /> : '图片区域'}
          </div>
          <div className="card-desc">
            {buildDescription()}
          </div>
          <div className="card-footer">
            <span>{typeLabel}</span>
            <span>{char.nameZh}</span>
          </div>
        </div>
      </div>
      <div className="preview-cost-row">
        费用 <span className="preview-cost-val">{card.cost}</span> {card.useStarCost ? '星' : '能量'}
      </div>
    </div>
  );
}

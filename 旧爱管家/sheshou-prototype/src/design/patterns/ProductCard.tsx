import React from 'react';
import { tokens } from '../tokens';
import { Card } from '../components/Card';
import { Tag } from '../components/Tag';
import { PriceDisplay } from './PriceDisplay';
import type { TagColor } from '../tokens';

// Vertical product card (for carousels)
interface ProductCardVerticalProps {
  brand: string;
  model: string;
  price: number | string;
  emoji?: string;
  gradientFrom?: string;
  gradientTo?: string;
  meta?: string;
}

export function ProductCardVertical({
  brand, model, price, emoji = '👜',
  gradientFrom = '#F5EDE3', gradientTo = '#E8DDD0', meta,
}: ProductCardVerticalProps) {
  return (
    <div style={{
      width: 156, flexShrink: 0, borderRadius: tokens.radius.card,
      overflow: 'hidden', background: tokens.color.bgCard,
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        height: 140,
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '32px',
      }}>
        {emoji}
      </div>
      <div style={{ padding: '12px' }}>
        <p style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption, margin: 0 }}>{brand}</p>
        <p style={{ fontSize: '13px', fontWeight: 500, color: tokens.color.textTitle, marginTop: '2px', margin: '2px 0 0' }}>{model}</p>
        <div style={{ marginTop: '6px' }}><PriceDisplay amount={price} size="md" /></div>
        {meta && <p style={{ fontSize: tokens.font.mini.size, color: tokens.color.textDisabled, marginTop: '4px', margin: '4px 0 0' }}>{meta}</p>}
      </div>
    </div>
  );
}

// Horizontal product card (for lists)
interface ProductCardHorizontalProps {
  brand: string;
  model: string;
  grade?: string;
  price: number | string;
  tag?: { label: string; color: TagColor };
  emoji?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function ProductCardHorizontal({
  brand, model, grade, price, tag, emoji = '👜', subtitle, actions,
}: ProductCardHorizontalProps) {
  return (
    <Card className="mx-5 mb-3">
      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{
          width: 72, height: 72, borderRadius: tokens.radius.cardInner,
          background: 'linear-gradient(135deg, #F5EDE3, #E8DDD0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px', flexShrink: 0,
        }}>
          {emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: tokens.font.bodyLarge.size, fontWeight: 600, color: tokens.color.textTitle }}>{brand} {model}</span>
            {grade && <Tag label={grade} color="blue" size="sm" />}
            {tag && <Tag label={tag.label} color={tag.color} size="sm" />}
          </div>
          {subtitle && <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginTop: '4px', margin: '4px 0 0' }}>{subtitle}</p>}
          <div style={{ marginTop: '6px' }}><PriceDisplay amount={price} size="md" /></div>
        </div>
      </div>
      {actions && <div style={{ marginTop: '12px', borderTop: `1px solid ${tokens.color.divider}`, paddingTop: '12px' }}>{actions}</div>}
    </Card>
  );
}

import React from 'react';
import { tokens } from '../tokens';

const brands = [
  { short: 'LV', full: 'Louis Vuitton' },
  { short: 'CC', full: 'Chanel' },
  { short: 'H', full: 'Hermès' },
  { short: 'GG', full: 'Gucci' },
  { short: 'CD', full: 'Dior' },
  { short: 'CT', full: 'Cartier' },
  { short: 'RX', full: 'Rolex' },
  { short: '···', full: '更多' },
];

export function BrandGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      padding: `0 ${tokens.space.pagePadding}`,
    }}>
      {brands.map((b) => (
        <div key={b.short} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <div style={{
            width: 56, height: 56,
            borderRadius: '16px',
            background: tokens.color.bgCard,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: `1px solid ${tokens.color.divider}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '18px', fontWeight: 700, color: tokens.color.textTitle }}>
              {b.short}
            </span>
          </div>
          <span style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption }}>
            {b.full}
          </span>
        </div>
      ))}
    </div>
  );
}

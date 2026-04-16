import React from 'react';
import { tokens } from '../tokens';

interface PriceDisplayProps {
  amount: number | string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  prefix?: string;
  highlight?: boolean;
}

const sizeConfig = {
  sm: { prefix: '10px', amount: '14px' },
  md: { prefix: '12px', amount: '17px' },
  lg: { prefix: '14px', amount: '20px' },
  hero: { prefix: '20px', amount: '36px' },
};

export function PriceDisplay({ amount, size = 'md', prefix = '¥', highlight }: PriceDisplayProps) {
  const cfg = sizeConfig[size];
  const color = highlight ? tokens.color.primary : tokens.color.textTitle;
  const formatted = typeof amount === 'number' ? amount.toLocaleString() : amount;

  return (
    <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', color }}>
      <span style={{ fontSize: cfg.prefix }}>{prefix}</span>
      <span style={{ fontSize: cfg.amount }}>{formatted}</span>
    </span>
  );
}

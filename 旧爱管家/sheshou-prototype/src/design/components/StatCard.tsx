import React from 'react';
import { tokens, statGradientMap, type StatColor } from '../tokens';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  value: number | string;
  label: string;
  icon: LucideIcon;
  color: StatColor;
}

export function StatCard({ value, label, icon: Icon, color }: StatCardProps) {
  const g = statGradientMap[color];
  return (
    <div style={{
      background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
      borderRadius: tokens.radius.card,
      padding: '14px 12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div>
        <p style={{ fontSize: tokens.font.numLarge.size, fontWeight: tokens.font.numLarge.weight, color: g.text, lineHeight: tokens.font.numLarge.lineHeight, fontVariantNumeric: 'tabular-nums' }}>
          {value}
        </p>
        <p style={{ fontSize: tokens.font.mini.size, fontWeight: tokens.font.mini.weight, color: g.text, opacity: 0.6, marginTop: '2px' }}>
          {label}
        </p>
      </div>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={18} color={g.text} />
      </div>
    </div>
  );
}

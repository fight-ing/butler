import React from 'react';
import { tokens } from '../tokens';

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  showDivider?: boolean;
}

export function DetailRow({ label, value, showDivider = true }: DetailRowProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${tokens.space.itemGap} 0`,
      borderBottom: showDivider ? `1px solid ${tokens.color.divider}` : 'none',
    }}>
      <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption }}>{label}</span>
      <span style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle }}>{value}</span>
    </div>
  );
}

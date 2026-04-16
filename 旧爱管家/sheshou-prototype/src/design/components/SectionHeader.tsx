import React from 'react';
import { tokens } from '../tokens';

interface SectionHeaderProps {
  title: string;
  action?: { label: string; onClick: () => void };
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `0 ${tokens.space.pagePadding}`,
      marginBottom: tokens.space.itemGap,
    }}>
      <span style={{ fontSize: tokens.font.sectionTitle.size, fontWeight: tokens.font.sectionTitle.weight, color: tokens.color.textTitle }}>
        {title}
      </span>
      {action && (
        <button onClick={action.onClick} style={{ fontSize: tokens.font.caption.size, color: tokens.color.primary, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
          {action.label} &gt;
        </button>
      )}
    </div>
  );
}

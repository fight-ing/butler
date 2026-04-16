import React from 'react';
import { tokens, tagColorMap, type TagColor } from '../tokens';

interface TagProps {
  label: string;
  color: TagColor;
  size?: 'sm' | 'md';
}

export function Tag({ label, color, size = 'md' }: TagProps) {
  const colors = tagColorMap[color];
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '1px 6px', fontSize: tokens.font.mini.size, fontWeight: tokens.font.mini.weight, borderRadius: '4px' },
    md: { padding: '2px 8px', fontSize: tokens.font.caption.size, fontWeight: 500, borderRadius: tokens.radius.tag },
  };

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      background: colors.bg,
      color: colors.text,
      lineHeight: '1.4',
      whiteSpace: 'nowrap',
      ...sizeStyles[size],
    }}>
      {label}
    </span>
  );
}

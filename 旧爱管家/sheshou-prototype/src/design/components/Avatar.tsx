import React from 'react';
import { tokens } from '../tokens';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function Avatar({ name, size = 'md', color }: AvatarProps) {
  const sizeMap = { sm: 32, md: 40, lg: 48 };
  const fontMap = { sm: '12px', md: '14px', lg: '16px' };
  const dim = sizeMap[size];
  const bg = color || tokens.color.primaryLight;

  return (
    <div style={{
      width: dim,
      height: dim,
      borderRadius: tokens.radius.avatar,
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: fontMap[size],
      fontWeight: 600,
      color: tokens.color.textBody,
      flexShrink: 0,
    }}>
      {name.slice(0, 1)}
    </div>
  );
}

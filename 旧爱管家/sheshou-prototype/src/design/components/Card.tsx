import React from 'react';
import { tokens } from '../tokens';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export function Card({ children, variant = 'default', padding = 'md', onClick, className = '' }: CardProps) {
  const paddingMap = { none: '0', sm: '12px', md: tokens.space.cardPadding, lg: tokens.space.pagePadding };
  const base: React.CSSProperties = {
    borderRadius: tokens.radius.card,
    padding: paddingMap[padding],
    transition: tokens.motion.normal,
  };

  const variants: Record<string, React.CSSProperties> = {
    default: { background: tokens.color.bgCard, boxShadow: tokens.shadow.card },
    outlined: { background: tokens.color.bgCard, border: `1px solid ${tokens.color.border}` },
    filled: { background: tokens.color.bgFill },
  };

  return (
    <div
      style={{ ...base, ...variants[variant], cursor: onClick ? 'pointer' : undefined }}
      className={`${onClick ? 'active:scale-[0.98]' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

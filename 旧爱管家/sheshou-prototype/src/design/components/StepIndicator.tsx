import React from 'react';
import { Check } from 'lucide-react';
import { tokens } from '../tokens';

interface StepIndicatorProps {
  steps: string[];
  current: number;
  size?: 'sm' | 'md';
}

export function StepIndicator({ steps, current, size = 'sm' }: StepIndicatorProps) {
  const dim = size === 'sm' ? 28 : 32;
  const fontSize = size === 'sm' ? '12px' : '13px';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `12px ${tokens.space.pagePadding}`,
      background: tokens.color.bgCard,
      borderBottom: `1px solid ${tokens.color.divider}`,
    }}>
      {steps.map((label, i) => (
        <React.Fragment key={i}>
          <div style={{
            width: dim,
            height: dim,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize,
            fontWeight: 600,
            transition: tokens.motion.normal,
            ...(i < current ? { background: tokens.color.success, color: '#FFF' } :
              i === current ? { background: tokens.color.primary, color: '#FFF', boxShadow: `0 0 0 4px ${tokens.color.primary}33` } :
              { background: tokens.color.bgFill, color: tokens.color.textDisabled }),
          }}>
            {i < current ? <Check size={14} strokeWidth={3} /> : label}
          </div>
          {i < steps.length - 1 && (
            <div style={{
              width: size === 'sm' ? 16 : 20,
              height: 2,
              marginInline: 2,
              background: i < current ? tokens.color.success : tokens.color.bgFill,
              transition: tokens.motion.normal,
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

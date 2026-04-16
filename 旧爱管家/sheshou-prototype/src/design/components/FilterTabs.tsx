import React from 'react';
import { tokens } from '../tokens';

interface FilterTabsProps {
  tabs: Array<{ label: string; count?: number }>;
  activeIndex: number;
  onChange: (index: number) => void;
  variant?: 'underline' | 'pill';
}

export function FilterTabs({ tabs, activeIndex, onChange, variant = 'pill' }: FilterTabsProps) {
  if (variant === 'pill') {
    return (
      <div style={{ display: 'flex', gap: '8px', padding: `12px ${tokens.space.pagePadding}`, overflowX: 'auto' }}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            style={{
              flexShrink: 0,
              padding: '6px 16px',
              borderRadius: tokens.radius.tagPill,
              fontSize: '13px',
              fontWeight: 500,
              background: i === activeIndex ? tokens.color.textTitle : tokens.color.bgFill,
              color: i === activeIndex ? '#FFFFFF' : tokens.color.textBody,
              border: 'none',
              cursor: 'pointer',
              transition: tokens.motion.fast,
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span style={{ marginLeft: '4px', opacity: 0.7 }}>{tab.count}</span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // underline variant
  return (
    <div style={{ display: 'flex', gap: '24px', padding: `0 ${tokens.space.pagePadding}`, borderBottom: `1px solid ${tokens.color.divider}`, background: tokens.color.bgCard }}>
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          style={{
            padding: '10px 0',
            fontSize: '14px',
            fontWeight: i === activeIndex ? 500 : 400,
            color: i === activeIndex ? tokens.color.primary : tokens.color.textCaption,
            borderBottom: i === activeIndex ? `2px solid ${tokens.color.primary}` : '2px solid transparent',
            background: 'none',
            border: 'none',
            borderBottomWidth: '2px',
            borderBottomStyle: 'solid',
            borderBottomColor: i === activeIndex ? tokens.color.primary : 'transparent',
            cursor: 'pointer',
            transition: tokens.motion.fast,
            whiteSpace: 'nowrap',
          }}
        >
          {tab.label}
          {tab.count !== undefined && <span style={{ marginLeft: '4px', color: tokens.color.textCaption }}>{tab.count}</span>}
        </button>
      ))}
    </div>
  );
}

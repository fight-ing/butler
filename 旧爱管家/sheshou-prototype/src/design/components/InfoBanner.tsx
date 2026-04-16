import React from 'react';
import { tokens } from '../tokens';
import type { LucideIcon } from 'lucide-react';

interface InfoBannerProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
  color?: 'blue' | 'green' | 'orange';
}

const bannerColors = {
  blue: { bg: tokens.color.primaryLight, text: tokens.color.primary },
  green: { bg: tokens.color.successLight, text: tokens.color.success },
  orange: { bg: tokens.color.warningLight, text: tokens.color.warning },
};

export function InfoBanner({ icon: Icon, title, subtitle, action, color = 'blue' }: InfoBannerProps) {
  const c = bannerColors[color];
  return (
    <div style={{
      background: c.bg,
      borderRadius: tokens.radius.card,
      padding: tokens.space.cardPadding,
      display: 'flex',
      alignItems: 'center',
      gap: tokens.space.inlineGap,
    }}>
      {Icon && <Icon size={20} color={c.text} />}
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: c.text }}>{title}</p>
        {subtitle && <p style={{ fontSize: tokens.font.caption.size, color: c.text, opacity: 0.7, marginTop: '2px' }}>{subtitle}</p>}
      </div>
      {action && (
        <button onClick={action.onClick} style={{ fontSize: tokens.font.caption.size, fontWeight: 500, color: c.text, background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          {action.label} &gt;
        </button>
      )}
    </div>
  );
}

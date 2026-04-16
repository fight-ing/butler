import React from 'react';
import { ChevronRight } from 'lucide-react';
import { tokens } from '../tokens';
import { Card } from './Card';
import { Tag } from './Tag';
import { Avatar } from './Avatar';
import type { TagColor } from '../tokens';

interface ListItemProps {
  avatar?: { name: string; color?: string };
  title: string;
  titleRight?: React.ReactNode;
  subtitle?: string;
  meta?: { left?: React.ReactNode; right?: React.ReactNode };
  tags?: Array<{ label: string; color: TagColor }>;
  onClick?: () => void;
  badge?: boolean;
  children?: React.ReactNode;
}

export function ListItem({ avatar, title, titleRight, subtitle, meta, tags, onClick, badge, children }: ListItemProps) {
  return (
    <Card onClick={onClick} className="mx-5 mb-3">
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: tokens.space.inlineGap }}>
        {/* Avatar */}
        {avatar && (
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <Avatar name={avatar.name} size="md" color={avatar.color} />
            {badge && (
              <div style={{
                position: 'absolute', top: -2, right: -2,
                width: 8, height: 8, borderRadius: '50%',
                background: tokens.color.danger, border: `2px solid ${tokens.color.bgCard}`,
              }} />
            )}
          </div>
        )}

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Row 1: Title + Tags */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: tokens.font.bodyLarge.size,
              fontWeight: tokens.font.bodyLarge.weight,
              color: tokens.color.textTitle,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {title}
            </span>
            {tags?.map((t, i) => <Tag key={i} label={t.label} color={t.color} size="sm" />)}
          </div>

          {/* Row 2: Subtitle */}
          {subtitle && (
            <p style={{
              fontSize: tokens.font.body.size,
              color: tokens.color.textBody,
              marginTop: '4px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {subtitle}
            </p>
          )}

          {/* Row 3: Meta */}
          {meta && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '8px',
            }}>
              <span>{meta.left}</span>
              <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textDisabled }}>
                {meta.right}
              </span>
            </div>
          )}

          {children}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
          {titleRight}
          {onClick && <ChevronRight size={16} color={tokens.color.textDisabled} />}
        </div>
      </div>
    </Card>
  );
}

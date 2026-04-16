import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { tokens } from '../tokens';
import type { LucideIcon } from 'lucide-react';

interface TabItem {
  icon: LucideIcon;
  label: string;
}

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  bottomAction?: React.ReactNode;
  tabs?: TabItem[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
}

export function PageLayout({
  title, subtitle, showBack, onBack, headerRight,
  children, bottomAction,
  tabs, activeTab = 0, onTabChange,
}: PageLayoutProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: tokens.font.family }}>
      {/* Header */}
      <div style={{ background: tokens.color.bgCard, padding: `8px ${tokens.space.pagePadding} 16px`, flexShrink: 0 }}>
        {showBack && (
          <button
            onClick={onBack}
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              fontSize: '15px', color: tokens.color.textTitle,
              background: 'none', border: 'none', cursor: 'pointer',
              marginBottom: '4px', padding: 0,
            }}
          >
            <ChevronLeft size={20} />
            返回
          </button>
        )}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{
              fontSize: tokens.font.pageTitle.size,
              fontWeight: tokens.font.pageTitle.weight,
              lineHeight: tokens.font.pageTitle.lineHeight,
              color: tokens.color.textTitle,
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{
                fontSize: tokens.font.caption.size,
                color: tokens.color.textCaption,
                marginTop: '4px',
                margin: '4px 0 0',
              }}>
                {subtitle}
              </p>
            )}
          </div>
          {headerRight}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        background: tokens.color.bgPage,
        scrollbarWidth: 'none',
      }}>
        {children}
      </div>

      {/* Bottom action (sticky CTA button) */}
      {bottomAction && (
        <div style={{
          padding: `12px ${tokens.space.pagePadding} 12px`,
          background: `${tokens.color.bgCard}E6`,
          backdropFilter: 'blur(16px)',
          borderTop: `1px solid ${tokens.color.divider}`,
          flexShrink: 0,
        }}>
          {bottomAction}
        </div>
      )}

      {/* Tab bar */}
      {tabs && tabs.length > 0 && (
        <div style={{
          height: 68,
          background: tokens.color.bgCard,
          borderTop: `1px solid ${tokens.color.divider}`,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-around',
          paddingTop: 6,
          paddingBottom: 20,
          flexShrink: 0,
        }}>
          {tabs.map((tab, i) => {
            const active = i === activeTab;
            const TabIcon = tab.icon;
            return (
              <button
                key={i}
                onClick={() => onTabChange?.(i)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  width: 64,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <TabIcon
                  size={22}
                  color={active ? tokens.color.primary : tokens.color.textDisabled}
                  strokeWidth={active ? 2 : 1.5}
                />
                <span style={{
                  fontSize: tokens.font.mini.size,
                  fontWeight: active ? 500 : 400,
                  color: active ? tokens.color.primary : tokens.color.textDisabled,
                }}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

import React from 'react';

// ── Status Tag (胶囊标签) ──
const statusStyles: Record<string, string> = {
  '全额回收': 'bg-[#E8FFEA] text-[#00B42A]',
  '全额': 'bg-[#E8FFEA] text-[#00B42A]',
  '定金回收': 'bg-[#E8F0FF] text-[#3370FF]',
  '定金': 'bg-[#E8F0FF] text-[#3370FF]',
  '寄卖回收': 'bg-[#F5E8FF] text-[#7B3FE4]',
  '寄卖': 'bg-[#F5E8FF] text-[#7B3FE4]',
  '假货不收': 'bg-[#FFECE8] text-[#F53F3F]',
  '不收': 'bg-[#FFECE8] text-[#F53F3F]',
  '真品': 'bg-[#E8FFEA] text-[#00B42A]',
  '鉴定真': 'bg-[#E8FFEA] text-[#00B42A]',
  '假货': 'bg-[#FFECE8] text-[#F53F3F]',
  '鉴定假': 'bg-[#FFECE8] text-[#F53F3F]',
  '存疑': 'bg-[#FFF7E8] text-[#FF7D00]',
  '待处理': 'bg-[#FFF7E8] text-[#FF7D00]',
  '已完成': 'bg-[#E8FFEA] text-[#00B42A]',
  '已签署': 'bg-[#E8FFEA] text-[#00B42A]',
  '已打款': 'bg-[#E8FFEA] text-[#00B42A]',
  '已结算': 'bg-[#E8FFEA] text-[#00B42A]',
  '待签署': 'bg-[#FFF7E8] text-[#FF7D00]',
  '待审批': 'bg-[#FFECE8] text-[#F53F3F]',
  '待报价': 'bg-[#FFECE8] text-[#F53F3F]',
  '待复检': 'bg-[#FFF7E8] text-[#FF7D00]',
  '服务中': 'bg-[#E8F0FF] text-[#3370FF]',
  '已出发': 'bg-[#E8F0FF] text-[#3370FF]',
  '待出发': 'bg-[#E8F0FF] text-[#3370FF]',
  '紧急': 'bg-[#FFECE8] text-[#F53F3F]',
  '高意向': 'bg-[#FFECE8] text-[#F53F3F]',
  '中意向': 'bg-[#FFF7E8] text-[#FF7D00]',
  '低意向': 'bg-[#F2F3F5] text-[#86909C]',
  '抖音': 'bg-[#E8F0FF] text-[#3370FF]',
  '小红书': 'bg-[#FFECE8] text-[#F53F3F]',
  '大众点评': 'bg-[#FFF7E8] text-[#FF7D00]',
  '地图': 'bg-[#E8FFEA] text-[#00B42A]',
  'NEW': 'bg-[#3370FF] text-white',
  'TOP': 'bg-[#FF7D00] text-white',
  'VIP': 'bg-[#B8860B]/10 text-[#B8860B]',
};

export function StatusTag({ label, className }: { label: string; className?: string }) {
  const style = statusStyles[label] || 'bg-[#F2F3F5] text-[#86909C]';
  return (
    <span className={`inline-flex items-center px-2 py-[3px] rounded-full text-[11px] font-medium leading-none ${style} ${className || ''}`}>
      {label}
    </span>
  );
}

// ── Card ──
export function Card({ children, className, padding }: { children: React.ReactNode; className?: string; padding?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${padding || 'p-4'} ${className || ''}`}>
      {children}
    </div>
  );
}

// ── Nav Header (inside phone) ──
export function NavHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="bg-white px-4 pt-3 pb-3">
      <h3 className="text-[17px] font-semibold text-[#1D2129] leading-tight">{title}</h3>
      {subtitle && <p className="text-[12px] text-[#86909C] mt-1">{subtitle}</p>}
    </div>
  );
}

// ── Stat Bar ──
export interface StatItem {
  value: string;
  label: string;
  color: string;
  urgent?: boolean;
}

export function StatBar({ stats }: { stats: StatItem[] }) {
  return (
    <Card className="mx-3 mt-3" padding="p-0">
      <div className="flex divide-x divide-[#F2F3F5]">
        {stats.map((stat, i) => (
          <div key={i} className={`flex-1 py-3 px-2 text-center ${stat.urgent ? 'bg-[#FFECE8]/30' : ''}`}>
            <div className={`text-[20px] font-bold leading-tight tabular-nums ${stat.color}`}>{stat.value}</div>
            <div className="text-[11px] text-[#86909C] mt-1 leading-tight">{stat.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── List Item ──
export function ListItem({
  title, subtitle, right, rightColor, tag, icon, onClick, urgent, children
}: {
  title: string; subtitle?: string; right?: string; rightColor?: string;
  tag?: string; icon?: React.ReactNode; onClick?: () => void; urgent?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 bg-white border-b border-[#F2F3F5] active:bg-[#F7F8FA] cursor-pointer transition-colors ${urgent ? 'border-l-[3px] border-l-[#F53F3F]' : ''}`}
      onClick={onClick}
    >
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-[#F7F8FA] flex items-center justify-center shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-medium text-[#1D2129] truncate">{title}</span>
          {tag && <StatusTag label={tag} />}
        </div>
        {subtitle && <div className="text-[12px] text-[#86909C] mt-[2px] truncate">{subtitle}</div>}
        {children}
      </div>
      {right && (
        <div className={`text-[13px] font-medium shrink-0 tabular-nums ${rightColor || 'text-[#86909C]'}`}>
          {right}
        </div>
      )}
      <svg width="7" height="12" viewBox="0 0 7 12" className="text-[#C9CDD4] shrink-0">
        <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    </div>
  );
}

// ── Phone Button ──
export function PhoneButton({ label, primary, danger, icon, onClick, disabled }: {
  label: string; primary?: boolean; danger?: boolean; icon?: React.ReactNode;
  onClick?: () => void; disabled?: boolean;
}) {
  const base = 'w-full min-h-[44px] px-4 rounded-lg text-[15px] font-medium transition-all flex items-center justify-center gap-2';
  const variant = danger
    ? 'bg-[#F53F3F] text-white active:bg-[#D93030]'
    : primary
    ? 'bg-[#3370FF] text-white active:bg-[#2860E0] shadow-[0_2px_8px_rgba(51,112,255,0.25)]'
    : 'bg-white border border-[#E5E6EB] text-[#4E5969] active:bg-[#F7F8FA]';
  const dis = disabled ? 'opacity-40 cursor-not-allowed' : '';
  return (
    <button className={`${base} ${variant} ${dis}`} onClick={onClick} disabled={disabled}>
      {icon}
      {label}
    </button>
  );
}

// ── Price Display ──
export function Price({ value, size = 'md' }: { value: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizes = {
    sm: 'text-[14px]',
    md: 'text-[16px]',
    lg: 'text-[22px]',
    xl: 'text-[28px]',
  };
  return (
    <span className={`text-[#B8860B] font-semibold tabular-nums ${sizes[size]}`}>
      {value}
    </span>
  );
}

// ── SLA Badge ──
export function SLABadge({ minutes, label }: { minutes: number; label: string }) {
  const isUrgent = minutes <= 2;
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
      isUrgent ? 'bg-[#FFECE8] text-[#F53F3F]' : 'bg-[#FFF7E8] text-[#FF7D00]'
    }`}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M6 3v3.5l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/></svg>
      <span>{label}</span>
      <span className="font-bold tabular-nums">{minutes}min</span>
    </div>
  );
}

// ── Section Title ──
export function SectionTitle({ title, action, actionLabel }: { title: string; action?: () => void; actionLabel?: string }) {
  return (
    <div className="flex items-center justify-between mx-4 mt-4 mb-2">
      <span className="text-[13px] font-semibold text-[#1D2129]">{title}</span>
      {actionLabel && (
        <button onClick={action} className="text-[12px] text-[#3370FF] font-medium">
          {actionLabel} &gt;
        </button>
      )}
    </div>
  );
}

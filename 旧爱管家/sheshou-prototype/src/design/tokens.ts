export const tokens = {
  color: {
    primary: '#3370FF',
    primaryLight: '#E8F0FF',
    primaryHover: '#2860E0',

    success: '#00B42A',
    successLight: '#E8FFEA',
    warning: '#FF7D00',
    warningLight: '#FFF7E8',
    danger: '#F53F3F',
    dangerLight: '#FFECE8',
    purple: '#7B3FE4',
    purpleLight: '#F5E8FF',

    textTitle: '#1D2129',
    textBody: '#4E5969',
    textCaption: '#86909C',
    textDisabled: '#C9CDD4',

    bgPage: '#F7F8FA',
    bgCard: '#FFFFFF',
    bgFill: '#F2F3F5',
    border: '#E5E6EB',
    divider: '#F2F3F5',
  },

  font: {
    family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
    pageTitle: { size: '22px', weight: 700, lineHeight: '28px' },
    sectionTitle: { size: '16px', weight: 600, lineHeight: '22px' },
    bodyLarge: { size: '16px', weight: 500, lineHeight: '22px' },
    body: { size: '14px', weight: 400, lineHeight: '20px' },
    caption: { size: '12px', weight: 400, lineHeight: '16px' },
    mini: { size: '10px', weight: 500, lineHeight: '14px' },
    numLarge: { size: '28px', weight: 700, lineHeight: '34px' },
    numMedium: { size: '17px', weight: 600, lineHeight: '22px' },
    numSmall: { size: '14px', weight: 600, lineHeight: '18px' },
  },

  space: {
    pagePadding: '20px',
    cardPadding: '16px',
    cardGap: '12px',
    sectionGap: '24px',
    itemGap: '12px',
    inlineGap: '8px',
    tightGap: '4px',
  },

  radius: {
    card: '16px',
    cardInner: '12px',
    button: '12px',
    tag: '6px',
    tagPill: '100px',
    avatar: '100px',
    input: '10px',
    phone: '44px',
  },

  shadow: {
    card: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
    cardHover: '0 4px 12px rgba(0,0,0,0.08)',
    phone: '0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
    float: '0 8px 24px rgba(0,0,0,0.12)',
    button: '0 2px 8px rgba(51,112,255,0.25)',
  },

  motion: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '350ms ease-out',
  },
} as const;

// Semantic color maps for Tag component
export type TagColor = 'blue' | 'red' | 'orange' | 'green' | 'gray' | 'purple';

export const tagColorMap: Record<TagColor, { bg: string; text: string }> = {
  blue: { bg: tokens.color.primaryLight, text: tokens.color.primary },
  red: { bg: tokens.color.dangerLight, text: tokens.color.danger },
  orange: { bg: tokens.color.warningLight, text: tokens.color.warning },
  green: { bg: tokens.color.successLight, text: tokens.color.success },
  gray: { bg: tokens.color.bgFill, text: tokens.color.textCaption },
  purple: { bg: tokens.color.purpleLight, text: tokens.color.purple },
};

// Stat card gradient maps
export type StatColor = 'blue' | 'orange' | 'green' | 'red';
export const statGradientMap: Record<StatColor, { from: string; to: string; text: string }> = {
  blue: { from: '#EEF4FF', to: '#DCE7FF', text: tokens.color.primary },
  orange: { from: '#FFF6E8', to: '#FFEACC', text: tokens.color.warning },
  green: { from: '#EAFFF0', to: '#D0F5DC', text: tokens.color.success },
  red: { from: '#FFF0EE', to: '#FFE0DB', text: tokens.color.danger },
};

// Business label → TagColor map
export const sourceTagColor: Record<string, TagColor> = {
  '抖音': 'blue',
  '小红书': 'red',
  '大众点评': 'orange',
  '地图': 'green',
};

export const intentTagColor: Record<string, TagColor> = {
  high: 'red',
  medium: 'orange',
  low: 'gray',
};

export const intentLabel: Record<string, string> = {
  high: '高',
  medium: '中',
  low: '低',
};

export const recoveryTypeColor: Record<string, TagColor> = {
  '全额': 'green',
  '全额回收': 'green',
  '定金': 'blue',
  '定金回收': 'blue',
  '寄卖': 'purple',
  '寄卖回收': 'purple',
  '不收': 'red',
  '假货不收': 'red',
};

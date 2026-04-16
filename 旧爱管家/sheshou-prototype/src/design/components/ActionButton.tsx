import React from 'react';
import { tokens } from '../tokens';
import type { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: LucideIcon;
  disabled?: boolean;
  onClick?: () => void;
}

const variantStyles: Record<string, React.CSSProperties> = {
  primary: { background: tokens.color.primary, color: '#FFFFFF', boxShadow: tokens.shadow.button },
  secondary: { background: tokens.color.bgCard, color: tokens.color.textBody, border: `1px solid ${tokens.color.border}` },
  ghost: { background: 'transparent', color: tokens.color.primary },
  danger: { background: tokens.color.danger, color: '#FFFFFF' },
  success: { background: tokens.color.success, color: '#FFFFFF' },
};

const sizeStyles: Record<string, { height: string; fontSize: string; padding: string }> = {
  sm: { height: '36px', fontSize: '14px', padding: '0 12px' },
  md: { height: '44px', fontSize: '15px', padding: '0 16px' },
  lg: { height: '52px', fontSize: '17px', padding: '0 20px' },
};

export function ActionButton({ label, variant = 'primary', size = 'md', fullWidth = true, icon: Icon, disabled, onClick }: ActionButtonProps) {
  const vStyle = variantStyles[variant];
  const sStyle = sizeStyles[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${disabled ? '' : 'active:scale-[0.98]'}`}
      style={{
        ...vStyle,
        height: sStyle.height,
        fontSize: sStyle.fontSize,
        padding: sStyle.padding,
        width: fullWidth ? '100%' : 'auto',
        borderRadius: tokens.radius.button,
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: tokens.motion.normal,
        border: vStyle.border || 'none',
      }}
    >
      {Icon && <Icon size={18} />}
      {label}
    </button>
  );
}

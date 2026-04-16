import React from 'react';

interface PhoneSimulatorProps {
  roleName: string;
  userName: string;
  isActive: boolean;
  children: React.ReactNode;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  roleName,
  userName,
  isActive,
  children,
}) => {
  return (
    <div className="relative flex flex-col items-center shrink-0" style={{ width: 375, paddingTop: 44 }}>
      {/* Role label — above phone */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 text-[13px] font-medium rounded-full whitespace-nowrap transition-all duration-300 ${
          isActive
            ? 'bg-[#3370FF] text-white shadow-[0_2px_8px_rgba(51,112,255,0.3)]'
            : 'bg-[#F2F3F5] text-[#86909C]'
        }`}
      >
        {roleName} · {userName}
      </div>

      {/* Phone shell */}
      <div
        className={`relative w-[375px] h-[812px] rounded-[44px] overflow-hidden flex flex-col transition-all duration-300 ${
          isActive
            ? 'shadow-[0_20px_60px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)] ring-2 ring-[#3370FF] ring-offset-4'
            : 'shadow-[0_10px_40px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.03)] opacity-50 scale-[0.96]'
        }`}
        style={{ background: '#fff' }}
      >
        {/* Status bar + Dynamic Island */}
        <div className="relative h-[54px] bg-white px-7 flex items-end justify-between pb-2 shrink-0">
          <span className="text-[14px] font-semibold text-[#1D2129] tabular-nums">9:41</span>
          <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full" />
          <div className="flex items-center gap-[6px]">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="7" width="3" height="5" rx="1" fill="#1D2129"/>
              <rect x="4.5" y="4.5" width="3" height="7.5" rx="1" fill="#1D2129"/>
              <rect x="9" y="2" width="3" height="10" rx="1" fill="#1D2129"/>
              <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#1D2129"/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 11.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" fill="#1D2129"/>
              <path d="M5.17 8.33a4 4 0 015.66 0" stroke="#1D2129" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M2.34 5.5a7.5 7.5 0 0111.32 0" stroke="#1D2129" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
              <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="#1D2129" strokeOpacity="0.35"/>
              <rect x="2" y="2" width="19" height="8" rx="1.5" fill="#1D2129"/>
              <path d="M24 4v4a2 2 0 000-4z" fill="#1D2129" fillOpacity="0.4"/>
            </svg>
          </div>
        </div>

        {/* Content area — views render their own tab bars */}
        <div className="flex-1 overflow-hidden flex flex-col bg-[#F7F8FA]">
          {children}
        </div>

        {/* Home indicator */}
        <div className="bg-white shrink-0 flex justify-center pb-2">
          <div className="w-[134px] h-[5px] bg-[#1D2129]/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

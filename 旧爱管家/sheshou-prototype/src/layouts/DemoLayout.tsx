import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Play,
  Pause,
  X,
  ChevronDown,
  ChevronUp,
  Users,
  Briefcase,
  Search,
  Camera,
  DollarSign,
  Shield,
  Package,
  CreditCard,
  User,
  Home,
  ClipboardList,
  FileText,
  Star,
  ShoppingBag,
  Menu,
  Gem,
} from 'lucide-react';
import { useDemoStore, STEP_DEFINITIONS, ROLES } from '../store/demoStore';
import type { Role } from '../store/demoStore';
import { PhoneSimulator } from '../components/PhoneSimulator';
import { CustomerServiceView } from '../views/CustomerService';
import { AppraiserView } from '../views/Appraiser';
import { PricerView } from '../views/Pricer';
import { AuthAppraiserView } from '../views/AuthAppraiser';
import { WarehouseView } from '../views/Warehouse';
import { FinanceView } from '../views/Finance';
import { CustomerView } from '../views/Customer';
import { demoSteps, statusCodeTable } from '../mock/demoSteps';

const roleConfig: Record<
  Role,
  {
    userName: string;
    icon: React.ReactNode;
    tabs: { icon: React.ReactNode; label: string }[];
  }
> = {
  '回收客服': {
    userName: '李静',
    icon: <Briefcase size={20} />,
    tabs: [
      { icon: <Briefcase size={20} />, label: '工作台' },
      { icon: <Search size={20} />, label: '线索' },
      { icon: <Users size={20} />, label: '客户' },
      { icon: <User size={20} />, label: '我的' },
    ],
  },
  '上门鉴定师': {
    userName: '张伟',
    icon: <Camera size={20} />,
    tabs: [
      { icon: <Briefcase size={20} />, label: '工作台' },
      { icon: <ClipboardList size={20} />, label: '任务' },
      { icon: <FileText size={20} />, label: '回收单' },
      { icon: <User size={20} />, label: '我的' },
    ],
  },
  '报价师': {
    userName: '刘洋',
    icon: <DollarSign size={20} />,
    tabs: [
      { icon: <Briefcase size={20} />, label: '工作台' },
      { icon: <DollarSign size={20} />, label: '报价' },
      { icon: <Star size={20} />, label: '价格库' },
      { icon: <User size={20} />, label: '我的' },
    ],
  },
  '图鉴鉴定师': {
    userName: '周婷',
    icon: <Shield size={20} />,
    tabs: [
      { icon: <Briefcase size={20} />, label: '工作台' },
      { icon: <Search size={20} />, label: '图鉴' },
      { icon: <Package size={20} />, label: '疑难件' },
      { icon: <User size={20} />, label: '我的' },
    ],
  },
  '仓管': {
    userName: '郑凯',
    icon: <Package size={20} />,
    tabs: [
      { icon: <Briefcase size={20} />, label: '工作台' },
      { icon: <Package size={20} />, label: '入库' },
      { icon: <ClipboardList size={20} />, label: '调拨' },
      { icon: <Search size={20} />, label: '盘点' },
      { icon: <User size={20} />, label: '我的' },
    ],
  },
  '财务': {
    userName: '林芳',
    icon: <CreditCard size={20} />,
    tabs: [
      { icon: <Briefcase size={20} />, label: '工作台' },
      { icon: <DollarSign size={20} />, label: '付款' },
      { icon: <FileText size={20} />, label: '收款' },
      { icon: <Star size={20} />, label: '结算' },
      { icon: <User size={20} />, label: '我的' },
    ],
  },
  '客户': {
    userName: '赵太太',
    icon: <Home size={20} />,
    tabs: [
      { icon: <Home size={20} />, label: '首页' },
      { icon: <ClipboardList size={20} />, label: '预约' },
      { icon: <ShoppingBag size={20} />, label: '订单' },
      { icon: <User size={20} />, label: '我的' },
    ],
  },
};

const roleMetrics: Record<Role, (step: number) => string> = {
  '回收客服': (step) => {
    if (step <= 2) return '待跟进 5条';
    if (step <= 4) return '今日预约 3条';
    return '已完成 2条';
  },
  '上门鉴定师': (step) => {
    if (step < 5) return '待出发 2单';
    if (step <= 6) return '服务中 1单';
    if (step <= 12) return '进行中 1单';
    return '已完成 3单';
  },
  '报价师': (step) => {
    if (step === 8) return '待报价 3件';
    if (step > 8) return '已报价 12件';
    return '空闲';
  },
  '图鉴鉴定师': (step) => {
    if (step === 10 || step === 11) return '待鉴定 3件';
    if (step > 11) return '已鉴定 8件';
    return '空闲';
  },
  '仓管': (step) => {
    if (step === 14) return '待签收 2件';
    if (step >= 15) return '已入库 5件';
    return '待入库 0件';
  },
  '财务': (step) => {
    if (step === 13) return '待打款 ¥142K';
    if (step >= 15) return '已结算 ¥38.5K';
    return '待审批 0笔';
  },
  '客户': (step) => {
    if (step <= 3) return '预约中';
    if (step <= 9) return '竞价中';
    if (step <= 13) return '签约中';
    return '已完成';
  },
};

const roleColors: Record<Role, string> = {
  '回收客服': '#3370FF',
  '上门鉴定师': '#FF7D00',
  '报价师': '#00B42A',
  '图鉴鉴定师': '#722ED1',
  '仓管': '#0FC6C2',
  '财务': '#F53F3F',
  '客户': '#3370FF',
};

function getRoleContent(role: Role, step: number) {
  switch (role) {
    case '回收客服':
      return <CustomerServiceView step={step} />;
    case '上门鉴定师':
      return <AppraiserView step={step} />;
    case '报价师':
      return <PricerView step={step} />;
    case '图鉴鉴定师':
      return <AuthAppraiserView step={step} />;
    case '仓管':
      return <WarehouseView step={step} />;
    case '财务':
      return <FinanceView step={step} />;
    case '客户':
      return <CustomerView step={step} />;
  }
}

function getPhoneScale(
  containerWidth: number,
  containerHeight: number,
  phoneCount: number
) {
  const phoneW = 375;
  const phoneH = 812 + 44; // phone + role label
  const gap = 32;
  const totalW = phoneCount * phoneW + (phoneCount - 1) * gap;
  const scaleX = (containerWidth - 64) / totalW;
  const scaleY = (containerHeight - 32) / phoneH;
  return Math.min(scaleX, scaleY, 1);
}

// Flowchart component
function FlowchartOverlay({ onClose, currentStep }: { onClose: () => void; currentStep: number }) {
  const commonNodes = [
    { label: '线索', steps: [0, 1, 2] },
    { label: '预约', steps: [3] },
    { label: '派单', steps: [4] },
    { label: '上门', steps: [5, 6] },
    { label: '拍照', steps: [7] },
    { label: '竞价', steps: [8, 9] },
    { label: '鉴定', steps: [10, 11] },
  ];

  const greenPath = [
    { label: '签约', steps: [12, 13] },
    { label: '打款', steps: [13] },
    { label: '入库', steps: [14] },
    { label: '复检', steps: [14] },
    { label: '已结算', steps: [15] },
  ];

  const bluePath = [
    { label: '签约', steps: [12, 13] },
    { label: '定金', steps: [13] },
    { label: '物流', steps: [14] },
    { label: '复检', steps: [14] },
    { label: '尾款', steps: [15] },
    { label: '已结算', steps: [15] },
  ];

  const purplePath = [
    { label: '签约', steps: [12, 13] },
    { label: '物流', steps: [14] },
    { label: '复检', steps: [14] },
    { label: '定价', steps: [15] },
    { label: '拍照', steps: [15] },
    { label: '上架', steps: [15] },
    { label: '销售', steps: [15] },
    { label: '打款', steps: [15] },
    { label: '已结算', steps: [15] },
  ];

  const isNodeActive = (steps: number[]) => steps.includes(currentStep);

  const renderNode = (
    node: { label: string; steps: number[] },
    color: string,
    bgColor: string,
    borderColor: string
  ) => {
    const active = isNodeActive(node.steps);
    return (
      <div
        className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
          active
            ? `ring-2 ring-offset-1 shadow-md scale-110`
            : ''
        }`}
        style={{
          backgroundColor: active ? color : bgColor,
          color: active ? '#fff' : color,
          borderColor: borderColor,
          border: `1px solid ${borderColor}`,
          ringColor: active ? color : undefined,
        }}
      >
        {node.label}
      </div>
    );
  };

  const renderArrow = (color: string) => (
    <div className="flex items-center mx-0.5">
      <div className="w-4 h-[2px]" style={{ backgroundColor: color }} />
      <div
        className="w-0 h-0 border-t-[4px] border-b-[4px] border-l-[5px] border-t-transparent border-b-transparent"
        style={{ borderLeftColor: color }}
      />
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 z-40 flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-5xl w-full mx-4 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-900">业务流程全景图</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#F2F3F5] flex items-center justify-center hover:bg-[#E5E6EB] transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Common path */}
        <div className="mb-8">
          <div className="text-xs text-[#86909C] mb-2 font-medium">公共流程</div>
          <div className="flex items-center flex-wrap gap-y-2">
            {commonNodes.map((node, i) => (
              <div key={i} className="flex items-center">
                {renderNode(node, '#3370FF', '#E8F0FF', '#3370FF40')}
                {i < commonNodes.length - 1 && renderArrow('#3370FF')}
              </div>
            ))}
            {renderArrow('#86909C')}
            <div className="w-24 h-8 rounded-lg border-2 border-dashed border-[#86909C] flex items-center justify-center text-xs text-[#86909C] font-medium bg-[#F7F8FA]">
              鉴定结果
            </div>
          </div>
        </div>

        {/* Branch paths */}
        <div className="space-y-4 pl-8 border-l-2 border-dashed border-[#E5E6EB] ml-4">
          {/* Green - full payment */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#00B42A]" />
              <span className="text-xs font-medium text-[#00B42A]">全额回收</span>
            </div>
            <div className="flex items-center flex-wrap gap-y-2">
              {greenPath.map((node, i) => (
                <div key={i} className="flex items-center">
                  {renderNode(node, '#00B42A', '#E8FFE8', '#00B42A40')}
                  {i < greenPath.length - 1 && renderArrow('#00B42A')}
                </div>
              ))}
            </div>
          </div>

          {/* Blue - deposit */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#3370FF]" />
              <span className="text-xs font-medium text-[#3370FF]">定金回收</span>
            </div>
            <div className="flex items-center flex-wrap gap-y-2">
              {bluePath.map((node, i) => (
                <div key={i} className="flex items-center">
                  {renderNode(node, '#3370FF', '#E8F0FF', '#3370FF40')}
                  {i < bluePath.length - 1 && renderArrow('#3370FF')}
                </div>
              ))}
            </div>
          </div>

          {/* Purple - consignment */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#722ED1]" />
              <span className="text-xs font-medium text-[#722ED1]">寄卖回收</span>
            </div>
            <div className="flex items-center flex-wrap gap-y-2">
              {purplePath.map((node, i) => (
                <div key={i} className="flex items-center">
                  {renderNode(node, '#722ED1', '#F3E8FF', '#722ED140')}
                  {i < purplePath.length - 1 && renderArrow('#722ED1')}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current step indicator */}
        <div className="mt-8 pt-4 border-t border-[#F2F3F5] flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#3370FF] animate-pulse" />
          <span className="text-sm text-[#86909C]">
            当前步骤：
            <span className="text-[#3370FF] font-medium">
              {STEP_DEFINITIONS[currentStep].name}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DemoLayout() {
  const [autoPlay, setAutoPlay] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statusCodeOpen, setStatusCodeOpen] = useState(false);
  const [flowchartExpanded, setFlowchartExpanded] = useState(false);
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const [phoneScale, setPhoneScale] = useState(0.6);

  const {
    currentStep,
    currentRole,
    advanceStep,
    goBack,
    goToStep,
    setRole,
    resetDemo,
  } = useDemoStore();

  const stepInfo = demoSteps[currentStep];
  const stepDef = STEP_DEFINITIONS[currentStep];
  const displayRoles = stepInfo.displayRoles;
  const activeRoles = stepDef.roles;

  // Auto-play effect
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => advanceStep(), 5000);
    return () => clearInterval(timer);
  }, [autoPlay, advanceStep]);

  // Responsive phone scaling
  const updateScale = useCallback(() => {
    if (!phoneContainerRef.current) return;
    const rect = phoneContainerRef.current.getBoundingClientRect();
    const scale = getPhoneScale(rect.width, rect.height, displayRoles.length);
    setPhoneScale(scale);
  }, [displayRoles.length]);

  useEffect(() => {
    updateScale();
    const observer = new ResizeObserver(() => updateScale());
    if (phoneContainerRef.current) {
      observer.observe(phoneContainerRef.current);
    }
    return () => observer.disconnect();
  }, [updateScale]);

  return (
    <div
      className="h-screen w-screen flex flex-col bg-[#F7F8FA] overflow-hidden"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* ── 1. TOP BAR ── */}
      <header className="h-16 bg-white border-b border-[#E5E6EB] flex items-center px-6 shrink-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        {/* Left section */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3370FF] to-[#5B8DEF] flex items-center justify-center shadow-[0_2px_8px_rgba(51,112,255,0.3)]">
            <Gem size={18} className="text-white" />
          </div>
          <div>
            <span className="text-[17px] font-bold text-[#1D2129]">奢收多</span>
            <span className="text-[13px] text-[#86909C] ml-2">全流程交互原型演示</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-2 w-8 h-8 rounded-lg hover:bg-[#F2F3F5] flex items-center justify-center transition-all"
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Center section - step progress */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="flex items-center gap-0 w-full max-w-2xl">
            {STEP_DEFINITIONS.map((step, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => goToStep(i)}
                  className="shrink-0 cursor-pointer group relative"
                  title={`${i}. ${step.name}`}
                >
                  <div
                    className={`rounded-full transition-all ${
                      i < currentStep
                        ? 'w-3 h-3 bg-[#3370FF]'
                        : i === currentStep
                        ? 'w-5 h-5 bg-[#3370FF] ring-4 ring-[#3370FF]/20 shadow-[0_0_8px_rgba(51,112,255,0.4)]'
                        : 'w-3 h-3 bg-[#E5E6EB] group-hover:bg-[#C9CDD4]'
                    }`}
                  />
                </button>
                {i < STEP_DEFINITIONS.length - 1 && (
                  <div
                    className={`h-[2px] flex-1 mx-0.5 transition-all ${
                      i < currentStep ? 'bg-[#00B42A]' : 'bg-[#E5E6EB]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-[10px] text-[#3370FF] font-medium mt-1">
            {stepDef.name}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              autoPlay
                ? 'bg-[#3370FF] text-white'
                : 'bg-[#F2F3F5] text-[#86909C] hover:bg-[#E5E6EB]'
            }`}
          >
            {autoPlay ? <Pause size={12} /> : <Play size={12} />}
            自动播放
          </button>
          <span className="text-xs text-[#86909C]">
            步骤 {currentStep + 1}/16
          </span>
          <button
            onClick={() => {
              resetDemo();
              setAutoPlay(false);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F2F3F5] text-[#86909C] hover:bg-[#E5E6EB] transition-all"
          >
            <RotateCcw size={12} />
            重置
          </button>
          <button
            onClick={() => setFlowchartExpanded(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F2F3F5] text-[#86909C] hover:bg-[#E5E6EB] transition-all"
          >
            流程图
          </button>
        </div>
      </header>

      {/* ── 2. MIDDLE AREA ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* 2a. Left Sidebar */}
        <div
          className={`bg-white border-r border-[#E5E6EB] shrink-0 transition-all duration-300 overflow-hidden ${
            sidebarOpen ? 'w-56' : 'w-0'
          }`}
        >
          <div className="w-56 p-3">
            <div className="text-xs font-semibold text-[#86909C] uppercase tracking-wider mb-3 px-2">
              角色总览
            </div>
            <div className="space-y-1">
              {ROLES.map((role) => {
                const config = roleConfig[role];
                const isActive = activeRoles.includes(role);
                const isCurrent = currentRole === role;
                const color = roleColors[role];
                return (
                  <button
                    key={role}
                    onClick={() => setRole(role)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-all text-left ${
                      isCurrent
                        ? 'bg-[#E8F0FF] border border-[#3370FF]/20'
                        : 'hover:bg-[#F2F3F5]'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${color}15`,
                        color: color,
                      }}
                    >
                      {config.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                        {role}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00B42A] animate-pulse" />
                        )}
                      </div>
                      <div className="text-[10px] text-[#86909C] truncate">
                        {config.userName} · {roleMetrics[role](currentStep)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2b. Phone Area */}
        <div
          ref={phoneContainerRef}
          className="flex-1 flex items-center justify-center p-4 overflow-hidden"
        >
          <div
            className="flex items-start justify-center gap-8"
            style={{
              transform: `scale(${phoneScale})`,
              transformOrigin: 'center center',
            }}
          >
            {displayRoles.map((role) => {
              const config = roleConfig[role];
              const isActive = activeRoles.includes(role);
              return (
                <PhoneSimulator
                  key={role}
                  roleName={role}
                  userName={config.userName}
                  isActive={isActive}
                >
                  {getRoleContent(role, currentStep)}
                </PhoneSimulator>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 3. BOTTOM BAR ── */}
      <footer className="bg-white border-t border-[#E5E6EB] px-8 py-4 shrink-0 shadow-[0_-1px_3px_rgba(0,0,0,0.04)]">
        {/* Row 1: step info */}
        <div className="flex items-start gap-0">
          {/* Left column: step title and description */}
          <div className="flex-1 min-w-0 pr-6">
            <div className="text-[20px] font-semibold text-[#1D2129]">
              步骤 {currentStep}: {stepInfo.title}
            </div>
            <div className="text-[14px] text-[#4E5969] leading-relaxed mt-1 line-clamp-2">
              {stepInfo.description}
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-[#E5E6EB] self-stretch mx-6 shrink-0" />

          {/* Middle column: system action */}
          <div className="w-80 shrink-0">
            <div className="text-[11px] text-[#86909C] uppercase tracking-widest mb-1.5 font-semibold">
              系统动作
            </div>
            <div className="text-[13px] text-[#4E5969] bg-[#F7F8FA] rounded-lg px-3 py-2.5 leading-relaxed font-mono border border-[#F2F3F5]">
              {stepInfo.systemAction}
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-[#E5E6EB] self-stretch mx-6 shrink-0" />

          {/* Right column: highlight data */}
          <div className="w-56 shrink-0">
            <div className="text-[11px] text-[#86909C] uppercase tracking-widest mb-1.5 font-semibold">
              关键数据
            </div>
            <div className="space-y-1.5">
              {stepInfo.highlightData.map((item, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <span className="text-[12px] text-[#86909C] shrink-0">{item.key}</span>
                  <span className="text-[13px] text-[#1D2129] font-semibold truncate">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: controls */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F2F3F5]">
          <button
            onClick={goBack}
            disabled={currentStep === 0}
            className="flex items-center gap-1.5 min-h-[36px] px-5 rounded-lg text-[13px] font-medium bg-[#F2F3F5] text-gray-700 hover:bg-[#E5E6EB] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={16} />
            上一步
          </button>

          {/* Center mini dots */}
          <div className="flex items-center gap-1">
            {STEP_DEFINITIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => goToStep(i)}
                className="cursor-pointer"
                title={`步骤 ${i}`}
              >
                <div
                  className={`rounded-full transition-all ${
                    i < currentStep
                      ? 'w-1.5 h-1.5 bg-[#00B42A]'
                      : i === currentStep
                      ? 'w-2 h-2 bg-[#3370FF]'
                      : 'w-1.5 h-1.5 bg-[#E5E6EB]'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={advanceStep}
            disabled={currentStep === 15}
            className="flex items-center gap-1.5 min-h-[36px] px-5 rounded-lg text-[13px] font-medium bg-[#3370FF] text-white hover:bg-[#2860E0] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_2px_8px_rgba(51,112,255,0.25)]"
          >
            下一步
            <ChevronRight size={16} />
          </button>
        </div>
      </footer>

      {/* ── 4. STATUS CODE FLOATING PANEL ── */}
      <button
        onClick={() => setStatusCodeOpen(!statusCodeOpen)}
        className="fixed right-6 bottom-6 z-50 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white shadow-lg border border-[#E5E6EB] text-xs font-medium text-[#86909C] hover:shadow-xl transition-all"
      >
        {statusCodeOpen ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
        状态码
      </button>

      {statusCodeOpen && (
        <div className="fixed right-6 bottom-16 w-[480px] max-h-[500px] bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-[#E5E6EB] overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F2F3F5] bg-[#F7F8FA]">
            <span className="text-sm font-semibold text-gray-900">
              商品状态码速查
            </span>
            <button
              onClick={() => setStatusCodeOpen(false)}
              className="w-6 h-6 rounded-md hover:bg-[#E5E6EB] flex items-center justify-center transition-all"
            >
              <X size={14} />
            </button>
          </div>
          <div className="overflow-y-auto max-h-[440px]" style={{ scrollbarWidth: 'thin' }}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F2F3F5] text-[10px] text-[#86909C] uppercase tracking-wider">
                  <th className="w-10 text-center py-2 px-2 font-medium">码</th>
                  <th className="text-left py-2 px-2 font-medium">状态名</th>
                  <th className="text-left py-2 px-2 font-medium">说明</th>
                  <th className="text-left py-2 px-2 font-medium">子状态</th>
                </tr>
              </thead>
              <tbody>
                {statusCodeTable.map((item) => {
                  const isHighlighted = stepInfo.statusCodes?.includes(item.code);
                  return (
                    <tr
                      key={item.code}
                      className={`transition-all ${
                        isHighlighted
                          ? 'bg-[#E8F0FF] border-l-2 border-l-[#3370FF]'
                          : 'hover:bg-[#F7F8FA]'
                      }`}
                    >
                      <td className="w-10 text-center py-1.5 px-2 text-xs font-mono font-bold text-[#86909C]">
                        {item.code}
                      </td>
                      <td className="py-1.5 px-2 text-xs font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="py-1.5 px-2 text-xs text-[#86909C]">
                        {item.desc}
                      </td>
                      <td className="py-1.5 px-2 text-xs text-[#C9CDD4]">
                        {item.subStatus || '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── 5. FLOWCHART OVERLAY ── */}
      {flowchartExpanded && (
        <FlowchartOverlay
          onClose={() => setFlowchartExpanded(false)}
          currentStep={currentStep}
        />
      )}
    </div>
  );
}

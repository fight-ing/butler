import { ChevronLeft, ChevronRight, RotateCcw, Briefcase, Search, Users, User, ClipboardList, Package, DollarSign, Home, ShoppingBag, FileText, Star, Clock } from 'lucide-react';
import { useDemoStore, STEP_DEFINITIONS, ROLES } from './store/demoStore';
import type { Role } from './store/demoStore';
import { StepIndicator } from './components/StepIndicator';
import { PhoneSimulator } from './components/PhoneSimulator';
import { CustomerServiceView } from './views/CustomerService';
import { AppraiserView } from './views/Appraiser';
import { PricerView } from './views/Pricer';
import { AuthAppraiserView } from './views/AuthAppraiser';
import { WarehouseView } from './views/Warehouse';
import { FinanceView } from './views/Finance';
import { CustomerView } from './views/Customer';

// Role configs
const roleConfig: Record<Role, { userName: string; tabs: { icon: React.ReactNode; label: string }[] }> = {
  '回收客服': {
    userName: '李静',
    tabs: [
      { icon: <Briefcase size={20} />, label: '工作台' },
      { icon: <Search size={20} />, label: '线索' },
      { icon: <Users size={20} />, label: '客户' },
      { icon: <User size={20} />, label: '我的' },
    ],
  },
  '上门鉴定师': {
    userName: '张伟',
    tabs: [
      { icon: <Briefcase size={20} />, label: '工作台' },
      { icon: <ClipboardList size={20} />, label: '任务' },
      { icon: <FileText size={20} />, label: '回收单' },
      { icon: <User size={20} />, label: '我的' },
    ],
  },
  '报价师': {
    userName: '刘洋',
    tabs: [
      { icon: <Briefcase size={20} />, label: '工作台' },
      { icon: <DollarSign size={20} />, label: '报价' },
      { icon: <Star size={20} />, label: '价格库' },
      { icon: <User size={20} />, label: '我的' },
    ],
  },
  '图鉴鉴定师': {
    userName: '周婷',
    tabs: [
      { icon: <Briefcase size={20} />, label: '工作台' },
      { icon: <Search size={20} />, label: '图鉴' },
      { icon: <Package size={20} />, label: '疑难件' },
      { icon: <User size={20} />, label: '我的' },
    ],
  },
  '仓管': {
    userName: '郑凯',
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
    tabs: [
      { icon: <Home size={20} />, label: '首页' },
      { icon: <ClipboardList size={20} />, label: '预约' },
      { icon: <ShoppingBag size={20} />, label: '订单' },
      { icon: <User size={20} />, label: '我的' },
    ],
  },
};

function InactiveRoleView({ stepName }: { stepName: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-[#C9CDD4] p-8">
      <div className="w-16 h-16 rounded-full bg-[#F2F3F5] flex items-center justify-center mb-4">
        <Clock size={28} className="text-[#C9CDD4]" />
      </div>
      <div className="text-sm text-center text-[#86909C]">当前步骤无需此角色操作</div>
      <div className="text-xs mt-1 text-center text-[#C9CDD4]">等待「{stepName}」完成</div>
    </div>
  );
}

function getRoleContent(role: Role, step: number): React.ReactNode {
  const stepDef = STEP_DEFINITIONS[step];
  const isInvolved = stepDef.roles.includes(role);

  if (!isInvolved) {
    return <InactiveRoleView stepName={stepDef.name} />;
  }

  switch (role) {
    case '回收客服': return <CustomerServiceView step={step} />;
    case '上门鉴定师': return <AppraiserView step={step} />;
    case '报价师': return <PricerView step={step} />;
    case '图鉴鉴定师': return <AuthAppraiserView step={step} />;
    case '仓管': return <WarehouseView step={step} />;
    case '财务': return <FinanceView step={step} />;
    case '客户': return <CustomerView step={step} />;
    default: return null;
  }
}

function App() {
  const { currentStep, currentRole, advanceStep, goBack, goToStep, setRole, resetDemo } = useDemoStore();
  const stepDef = STEP_DEFINITIONS[currentStep];
  const activeRoles = stepDef.roles;

  const rolesToShow: Role[] = [currentRole];
  activeRoles.forEach((r) => {
    if (!rolesToShow.includes(r as Role)) {
      rolesToShow.push(r as Role);
    }
  });

  return (
    <div className="min-h-screen bg-[#F2F3F5] flex flex-col" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Header */}
      <header className="bg-white border-b border-[#E5E6EB] px-6 py-4 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-bold text-gray-900">
            奢收多 · 全流程交互原型
          </h1>
          <div className="text-sm text-[#86909C]">
            步骤 {currentStep + 1} / 16
          </div>
        </div>
        <StepIndicator currentStep={currentStep} onStepClick={goToStep} />
      </header>

      {/* Role switcher */}
      <div className="bg-white border-b border-[#E5E6EB] px-4 py-2.5 flex gap-2 overflow-x-auto shrink-0">
        {ROLES.map((role) => (
          <button
            key={role}
            onClick={() => setRole(role)}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all min-h-[36px] ${
              currentRole === role
                ? 'bg-[#3370FF] text-white shadow-sm'
                : activeRoles.includes(role)
                ? 'bg-[#E8F0FF] text-[#3370FF] border border-[#3370FF]/20'
                : 'bg-[#F2F3F5] text-[#86909C] hover:bg-[#E5E6EB]'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Phone simulator area */}
      <div className="flex-1 overflow-x-auto py-6 px-4">
        <div className="flex gap-6 justify-center min-w-max">
          {rolesToShow.map((role) => {
            const config = roleConfig[role];
            const isActive = activeRoles.includes(role);
            return (
              <PhoneSimulator
                key={role}
                roleName={role}
                userName={config.userName}
                isActive={isActive}
                tabs={config.tabs.map((t, i) => ({
                  ...t,
                  active: i === 0,
                }))}
              >
                {getRoleContent(role, currentStep)}
              </PhoneSimulator>
            );
          })}
        </div>
      </div>

      {/* Bottom controls */}
      <footer className="bg-white border-t border-[#E5E6EB] px-6 py-3 shrink-0">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={goBack}
            disabled={currentStep === 0}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-[13px] font-medium bg-[#F2F3F5] text-gray-700 hover:bg-[#E5E6EB] disabled:opacity-40 disabled:cursor-not-allowed min-h-[40px]"
          >
            <ChevronLeft size={16} />
            上一步
          </button>

          <div className="text-center flex-1 px-4">
            <div className="text-[14px] font-semibold text-gray-900">{stepDef.name}</div>
            <div className="text-[12px] text-[#86909C] mt-0.5 max-w-md mx-auto leading-relaxed">{stepDef.desc}</div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={resetDemo}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[13px] font-medium bg-[#F2F3F5] text-gray-700 hover:bg-[#E5E6EB] min-h-[40px]"
            >
              <RotateCcw size={14} />
              重置
            </button>
            <button
              onClick={advanceStep}
              disabled={currentStep === 15}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-[13px] font-medium bg-[#3370FF] text-white hover:bg-[#2860E0] disabled:opacity-40 disabled:cursor-not-allowed min-h-[40px]"
            >
              下一步
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

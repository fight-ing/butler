import React from 'react';
import { STEP_DEFINITIONS } from '../store/demoStore';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

// Group steps into phases for better readability
const PHASES = [
  { name: '线索获取', steps: [0, 1, 2] },
  { name: '预约派单', steps: [3, 4] },
  { name: '上门服务', steps: [5, 6, 7] },
  { name: '竞价报价', steps: [8, 9] },
  { name: '鉴定确认', steps: [10, 11, 12] },
  { name: '成交结算', steps: [13, 14, 15] },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, onStepClick }) => {
  return (
    <div className="w-full">
      {/* Phase bar */}
      <div className="flex items-center gap-1 mb-2">
        {PHASES.map((phase, pi) => {
          const phaseStart = phase.steps[0];
          const phaseEnd = phase.steps[phase.steps.length - 1];
          const isActive = currentStep >= phaseStart && currentStep <= phaseEnd;
          const isCompleted = currentStep > phaseEnd;

          return (
            <React.Fragment key={pi}>
              <button
                onClick={() => onStepClick(phase.steps[0])}
                className={`flex-1 h-9 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  isActive
                    ? 'bg-[#3370FF] text-white shadow-sm'
                    : isCompleted
                    ? 'bg-[#E8FFE8] text-[#00B42A] border border-[#00B42A]/20'
                    : 'bg-[#F2F3F5] text-[#86909C] hover:bg-[#E5E6EB]'
                }`}
              >
                {isCompleted && <Check size={12} strokeWidth={3} />}
                {phase.name}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Detail steps within current phase */}
      <div className="flex items-center gap-1 px-1">
        {STEP_DEFINITIONS.map((step, index) => {
          const isCurrent = index === currentStep;
          const isDone = index < currentStep;
          // Find which phase this step belongs to
          const currentPhase = PHASES.find(p => p.steps.includes(currentStep));
          const stepPhase = PHASES.find(p => p.steps.includes(index));
          const isInCurrentPhase = currentPhase === stepPhase;

          if (!isInCurrentPhase) {
            // Show as tiny dot for steps outside current phase
            return (
              <button
                key={step.id}
                onClick={() => onStepClick(step.id)}
                className="shrink-0 cursor-pointer group"
                title={`${index}. ${step.name}`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all group-hover:scale-150 ${
                    isDone ? 'bg-[#00B42A]' : 'bg-[#E5E6EB]'
                  }`}
                />
              </button>
            );
          }

          // Expanded view for steps in current phase
          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => onStepClick(step.id)}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs whitespace-nowrap transition-all cursor-pointer min-h-[32px] ${
                  isCurrent
                    ? 'bg-[#3370FF] text-white shadow-sm font-medium'
                    : isDone
                    ? 'bg-[#E8FFE8] text-[#00B42A]'
                    : 'bg-white text-[#86909C] border border-[#E5E6EB] hover:border-[#3370FF]/30'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  isCurrent
                    ? 'bg-white/20'
                    : isDone
                    ? 'bg-[#00B42A] text-white'
                    : 'bg-[#F2F3F5]'
                }`}>
                  {isDone ? <Check size={10} strokeWidth={3} /> : index}
                </span>
                {step.name}
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

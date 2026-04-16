import { create } from 'zustand';

export const STEP_DEFINITIONS = [
  { id: 0, name: '线索进入', desc: '客户通过抖音/小红书/大众点评留下联系方式，线索进入CRM系统', roles: ['回收客服'] },
  { id: 1, name: '客服分配', desc: '系统按分配规则自动派给客服，高意向线索优先分配', roles: ['回收客服'] },
  { id: 2, name: '客服跟进', desc: '客服5分钟内首次触达，通过微信/电话了解客户需求，持续打标签', roles: ['回收客服'] },
  { id: 3, name: '预约创建', desc: '确认服务方式和时间，生成预约单（RCV编号），触发派单引擎', roles: ['回收客服'] },
  { id: 4, name: '派单完成', desc: '三层决策派单：硬性过滤→优先级判断→智能匹配评分，发送确认短信', roles: ['回收客服', '上门鉴定师'] },
  { id: 5, name: '鉴定师出发', desc: '鉴定师点击"出发"，客户端收到通知，显示预计到达时间', roles: ['上门鉴定师', '客户'] },
  { id: 6, name: '到达开始服务', desc: '鉴定师到场点击"开始服务"，任务进入服务中', roles: ['上门鉴定师', '客户'] },
  { id: 7, name: '挂签报价拍照', desc: '挂签扫码绑定→按品类模板拍照→录入商品信息→提交竞价', roles: ['上门鉴定师'] },
  { id: 8, name: '竞价进行中', desc: '报价师收到推送各自出价，客户端展示全国商家竞价动画（10分钟倒计时）', roles: ['报价师', '客户', '上门鉴定师'] },
  { id: 9, name: '竞价完成报价', desc: '取最高价，鉴定师告知客户价格，如有异议可使用议价工具微调', roles: ['上门鉴定师', '客户'] },
  { id: 10, name: '鉴定拍照提交', desc: '价格确认后，鉴定师按鉴定点模板拍照上传后台', roles: ['上门鉴定师'] },
  { id: 11, name: '鉴定结果回流', desc: 'AB双鉴定师并行看图鉴定，结论不一致则C鉴定师终局判定', roles: ['图鉴鉴定师', '上门鉴定师'] },
  { id: 12, name: '确认回收清单', desc: '商品按鉴定结果分组，为每件选择回收方式，系统自动拆分生成订单', roles: ['上门鉴定师', '客户'] },
  { id: 13, name: '合同签署打款', desc: '补全实名+绑卡→生成合同→电子签名→全额当场打款/定金打款', roles: ['上门鉴定师', '客户', '财务'] },
  { id: 14, name: '总部签收复检', desc: '货品到总部→仓管签收→二次复检→核对照片与实物', roles: ['仓管'] },
  { id: 15, name: '结算完成', desc: '复检通过→定金尾款结清/寄卖上架销售→最终结算打款', roles: ['财务', '仓管'] },
];

export const ROLES = ['回收客服', '上门鉴定师', '报价师', '图鉴鉴定师', '仓管', '财务', '客户'] as const;
export type Role = (typeof ROLES)[number];
export const RoleType = ROLES;

interface DemoState {
  currentStep: number;
  currentRole: Role;
  advanceStep: () => void;
  goBack: () => void;
  goToStep: (step: number) => void;
  setRole: (role: Role) => void;
  resetDemo: () => void;
}

export const useDemoStore = create<DemoState>((set) => ({
  currentStep: 0,
  currentRole: '回收客服',
  advanceStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 15),
    })),
  goBack: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),
  goToStep: (step: number) =>
    set({ currentStep: Math.max(0, Math.min(step, 15)) }),
  setRole: (role: Role) => set({ currentRole: role }),
  resetDemo: () => set({ currentStep: 0, currentRole: '回收客服' }),
}));

export interface Order {
  orderId: string;
  type: '全额竞价回收' | '定金竞价回收' | '寄卖竞价回收' | '假货不收';
  products: string[]; // product ids
  customer: { name: string; phone: string; id: string };
  contract: {
    contractId: string;
    status: '待签署' | '已签署' | '无需合同';
    signedAt?: string;
  };
  payment: {
    method: '银行卡' | '支付宝';
    amount: number;
    depositAmount?: number;
    commission?: number;
    status: '待打款' | '已打款' | '部分打款' | '待退款' | '无需打款';
    paidAt?: string;
  };
  logistics: {
    trackingNo?: string;
    carrier?: string;
    status: '无需物流' | '待取件' | '运输中' | '已签收';
  };
  createdAt: string;
  status: string;
}

export const orders: Order[] = [
  // 全额竞价回收 ×2
  {
    orderId: 'ORD-20260408-001',
    type: '全额竞价回收',
    products: ['P001'],
    customer: { name: '赵太太', phone: '137****4444', id: 'C001' },
    contract: { contractId: 'CT-20260408-001', status: '已签署', signedAt: '2026-04-08 15:10:00' },
    payment: { method: '支付宝', amount: 95000, status: '已打款', paidAt: '2026-04-08 15:15:00' },
    logistics: { status: '无需物流' },
    createdAt: '2026-04-08 15:05:00',
    status: '已完成',
  },
  {
    orderId: 'ORD-20260408-002',
    type: '全额竞价回收',
    products: ['P002'],
    customer: { name: '赵太太', phone: '137****4444', id: 'C001' },
    contract: { contractId: 'CT-20260408-002', status: '已签署', signedAt: '2026-04-08 15:20:00' },
    payment: { method: '银行卡', amount: 38000, status: '已打款', paidAt: '2026-04-08 15:25:00' },
    logistics: { status: '无需物流' },
    createdAt: '2026-04-08 15:15:00',
    status: '已完成',
  },
  // 定金竞价回收 ×2
  {
    orderId: 'ORD-20260408-003',
    type: '定金竞价回收',
    products: ['P003'],
    customer: { name: '赵太太', phone: '137****4444', id: 'C001' },
    contract: { contractId: 'CT-20260408-003', status: '已签署', signedAt: '2026-04-08 15:30:00' },
    payment: { method: '支付宝', amount: 18000, depositAmount: 9000, status: '部分打款', paidAt: '2026-04-08 15:35:00' },
    logistics: { trackingNo: 'SF1234567890', carrier: '顺丰速运', status: '运输中' },
    createdAt: '2026-04-08 15:25:00',
    status: '定金已付·待复检',
  },
  {
    orderId: 'ORD-20260403-004',
    type: '定金竞价回收',
    products: ['P008'],
    customer: { name: '钱先生', phone: '139****1234', id: 'C003' },
    contract: { contractId: 'CT-20260403-004', status: '已签署', signedAt: '2026-04-03 16:30:00' },
    payment: { method: '银行卡', amount: 32000, depositAmount: 16000, status: '部分打款', paidAt: '2026-04-03 16:35:00' },
    logistics: { trackingNo: 'SF1234567891', carrier: '顺丰速运', status: '已签收' },
    createdAt: '2026-04-03 16:25:00',
    status: '复检成功·待结尾款',
  },
  // 寄卖竞价回收 ×3
  {
    orderId: 'ORD-20260406-005',
    type: '寄卖竞价回收',
    products: ['P005'],
    customer: { name: '李先生', phone: '139****2222', id: 'C003' },
    contract: { contractId: 'CT-20260406-005', status: '已签署', signedAt: '2026-04-06 16:00:00' },
    payment: { method: '支付宝', amount: 0, status: '待打款' },
    logistics: { trackingNo: 'SF1234567892', carrier: '顺丰速运', status: '运输中' },
    createdAt: '2026-04-06 15:50:00',
    status: '运输中',
  },
  {
    orderId: 'ORD-20260401-006',
    type: '寄卖竞价回收',
    products: ['P010'],
    customer: { name: '王小姐', phone: '136****3333', id: 'C002' },
    contract: { contractId: 'CT-20260401-006', status: '已签署', signedAt: '2026-04-01 16:00:00' },
    payment: { method: '银行卡', amount: 0, status: '待打款' },
    logistics: { trackingNo: 'SF1234567893', carrier: '顺丰速运', status: '已签收' },
    createdAt: '2026-04-01 15:50:00',
    status: '待定价',
  },
  {
    orderId: 'ORD-20260325-007',
    type: '寄卖竞价回收',
    products: ['P013'],
    customer: { name: '李先生', phone: '139****2222', id: 'C003' },
    contract: { contractId: 'CT-20260325-007', status: '已签署', signedAt: '2026-03-25 15:00:00' },
    payment: { method: '支付宝', amount: 22000, commission: 2200, status: '已打款', paidAt: '2026-04-04 10:00:00' },
    logistics: { trackingNo: 'SF1234567894', carrier: '顺丰速运', status: '已签收' },
    createdAt: '2026-03-25 14:50:00',
    status: '已结算',
  },
  // 假货不收 ×1
  {
    orderId: 'ORD-20260320-008',
    type: '假货不收',
    products: ['P014'],
    customer: { name: '马女士', phone: '136****5678', id: 'C002' },
    contract: { contractId: '', status: '无需合同' },
    payment: { method: '银行卡', amount: 0, status: '无需打款' },
    logistics: { status: '无需物流' },
    createdAt: '2026-03-20 12:10:00',
    status: '鉴定未通过·已退回',
  },
];

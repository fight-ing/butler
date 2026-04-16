export interface AppointmentItem {
  brand: string;
  category: string;
  estimatedCount: number;
}

export interface Appointment {
  id: string;
  leadId: string;
  customerName: string;
  phone: string;
  serviceType: '上门' | '到店' | '邮寄' | '同城闪送';
  scheduledDate: string;
  timeSlot: string;
  address: string;
  items: AppointmentItem[];
  status: '待派单' | '已派单' | '已出发' | '服务中' | '已完成';
  assignedAppraiser: string | null;
}

export const appointments: Appointment[] = [
  {
    id: 'RCV-20260408-00001',
    leadId: 'LD-20260408-004',
    customerName: '赵太太',
    phone: '137****4444',
    serviceType: '上门',
    scheduledDate: '2026-04-08',
    timeSlot: '14:00-16:00',
    address: '上海市静安区南京西路1266号恒隆广场公寓2301',
    items: [
      { brand: 'Hermès', category: '包袋', estimatedCount: 1 },
      { brand: 'Chanel', category: '包袋', estimatedCount: 2 },
    ],
    status: '已派单',
    assignedAppraiser: '张伟',
  },
  {
    id: 'RCV-20260408-00002',
    leadId: 'LD-20260408-003',
    customerName: '王小姐',
    phone: '136****3333',
    serviceType: '上门',
    scheduledDate: '2026-04-09',
    timeSlot: '10:00-12:00',
    address: '上海市黄浦区淮海中路999号环贸iapm 3号楼1805',
    items: [
      { brand: 'Chanel', category: '包袋', estimatedCount: 1 },
    ],
    status: '待派单',
    assignedAppraiser: null,
  },
  {
    id: 'RCV-20260407-00003',
    leadId: 'LD-20260407-011',
    customerName: '钱先生',
    phone: '139****1234',
    serviceType: '到店',
    scheduledDate: '2026-04-08',
    timeSlot: '15:00-17:00',
    address: '奢收多·上海静安门店（南京西路889号）',
    items: [
      { brand: 'Rolex', category: '腕表', estimatedCount: 2 },
      { brand: 'Cartier', category: '首饰', estimatedCount: 1 },
    ],
    status: '服务中',
    assignedAppraiser: '王强',
  },
  {
    id: 'RCV-20260407-00004',
    leadId: 'LD-20260407-012',
    customerName: '马女士',
    phone: '136****5678',
    serviceType: '邮寄',
    scheduledDate: '2026-04-07',
    timeSlot: '全天',
    address: '顺丰上门取件·北京市朝阳区建国路88号SOHO现代城B座1605',
    items: [
      { brand: 'LV', category: '包袋', estimatedCount: 3 },
      { brand: 'Gucci', category: '包袋', estimatedCount: 1 },
    ],
    status: '已完成',
    assignedAppraiser: '张伟',
  },
  {
    id: 'RCV-20260408-00005',
    leadId: 'LD-20260408-010',
    customerName: '黄女士',
    phone: '188****0000',
    serviceType: '同城闪送',
    scheduledDate: '2026-04-08',
    timeSlot: '16:00-18:00',
    address: '上海市浦东新区陆家嘴环路1088号招商银行大厦2005',
    items: [
      { brand: '周大福', category: '黄金', estimatedCount: 5 },
    ],
    status: '待派单',
    assignedAppraiser: null,
  },
];

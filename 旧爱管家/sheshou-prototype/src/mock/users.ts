export interface User {
  id: string;
  name: string;
  role: '回收客服' | '上门鉴定师' | '报价师' | '图鉴鉴定师' | '仓管' | '财务' | '客户';
  phone: string;
  avatar?: string;
  status?: string;
}

export const users: User[] = [
  // 回收客服 ×2
  { id: 'U001', name: '李静', role: '回收客服', phone: '138****0001' },
  { id: 'U002', name: '陈敏', role: '回收客服', phone: '138****0002' },
  // 上门鉴定师 ×2
  { id: 'U003', name: '张伟', role: '上门鉴定师', phone: '138****0003' },
  { id: 'U004', name: '王强', role: '上门鉴定师', phone: '138****0004' },
  // 报价师 ×3
  { id: 'U005', name: '刘洋', role: '报价师', phone: '138****0005' },
  { id: 'U006', name: '赵磊', role: '报价师', phone: '138****0006' },
  { id: 'U007', name: '孙鹏', role: '报价师', phone: '138****0007' },
  // 图鉴鉴定师 ×2
  { id: 'U008', name: '周婷', role: '图鉴鉴定师', phone: '138****0008' },
  { id: 'U009', name: '吴昊', role: '图鉴鉴定师', phone: '138****0009' },
  // 仓管 ×1
  { id: 'U010', name: '郑凯', role: '仓管', phone: '138****0010' },
  // 财务 ×1
  { id: 'U011', name: '林芳', role: '财务', phone: '138****0011' },
  // 客户 ×3
  { id: 'C001', name: '赵太太', role: '客户', phone: '137****4444' },
  { id: 'C002', name: '王小姐', role: '客户', phone: '136****3333' },
  { id: 'C003', name: '李先生', role: '客户', phone: '139****2222' },
];

export const getRoleUsers = (role: User['role']) => users.filter(u => u.role === role);

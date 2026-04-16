export interface TimelineEntry {
  status: string;
  time: string;
  operator: string;
}

export interface Bidder {
  name: string;
  city: string;
  price: number;
  time: string;
}

export interface Product {
  id: string;
  uniqueCode: string;
  brand: string;
  series: string;
  model: string;
  material: string;
  color: string;
  conditionGrade: 'S' | 'A' | 'B' | 'C';
  accessories: string[];
  photos: string[];
  pricingResult: {
    bidders: Bidder[];
    highestBid: number;
    finalPrice: number;
  };
  authResult: {
    appraiserA: '真' | '假' | '存疑' | '待鉴定';
    appraiserB: '真' | '假' | '存疑' | '待鉴定';
    appraiserC?: '真' | '假' | '存疑';
    finalResult: '真' | '假' | '存疑' | '待鉴定';
  };
  recoveryType: '全额' | '定金' | '寄卖' | '不收' | '待定';
  statusCode: number;
  statusName: string;
  subStatus: string;
  timeline: TimelineEntry[];
}

export const products: Product[] = [
  {
    id: 'P001',
    uniqueCode: 'SSD-20260408-00001',
    brand: 'Hermès',
    series: 'Birkin',
    model: 'Birkin 30',
    material: 'Togo牛皮',
    color: '金棕色 Gold',
    conditionGrade: 'A',
    accessories: ['防尘袋', '锁扣', '钥匙', '雨衣', '购买票据'],
    photos: [],
    pricingResult: {
      bidders: [
        { name: '刘洋', city: '上海', price: 95000, time: '2026-04-08 14:35:00' },
        { name: '赵磊', city: '北京', price: 92000, time: '2026-04-08 14:33:00' },
        { name: '孙鹏', city: '广州', price: 88000, time: '2026-04-08 14:31:00' },
      ],
      highestBid: 95000,
      finalPrice: 95000,
    },
    authResult: { appraiserA: '真', appraiserB: '真', finalResult: '真' },
    recoveryType: '全额',
    statusCode: 1,
    statusName: '回收中',
    subStatus: '待签署',
    timeline: [
      { status: '挂签绑定', time: '2026-04-08 14:20:00', operator: '张伟' },
      { status: '报价拍照完成', time: '2026-04-08 14:28:00', operator: '张伟' },
      { status: '竞价完成', time: '2026-04-08 14:40:00', operator: '系统' },
    ],
  },
  {
    id: 'P002',
    uniqueCode: 'SSD-20260408-00002',
    brand: 'Chanel',
    series: 'Classic Flap',
    model: 'CF中号',
    material: '小羊皮',
    color: '黑色',
    conditionGrade: 'S',
    accessories: ['防尘袋', '盒子', '购买票据', '身份卡'],
    photos: [],
    pricingResult: {
      bidders: [
        { name: '刘洋', city: '上海', price: 38000, time: '2026-04-08 14:36:00' },
        { name: '赵磊', city: '北京', price: 36500, time: '2026-04-08 14:34:00' },
        { name: '孙鹏', city: '广州', price: 35000, time: '2026-04-08 14:32:00' },
      ],
      highestBid: 38000,
      finalPrice: 38000,
    },
    authResult: { appraiserA: '真', appraiserB: '真', finalResult: '真' },
    recoveryType: '全额',
    statusCode: 2,
    statusName: '待完善',
    subStatus: '',
    timeline: [
      { status: '挂签绑定', time: '2026-04-08 14:22:00', operator: '张伟' },
      { status: '竞价完成', time: '2026-04-08 14:42:00', operator: '系统' },
      { status: '鉴定通过', time: '2026-04-08 15:00:00', operator: '系统' },
      { status: '合同签署', time: '2026-04-08 15:10:00', operator: '赵太太' },
      { status: '打款完成', time: '2026-04-08 15:15:00', operator: '系统' },
    ],
  },
  {
    id: 'P003',
    uniqueCode: 'SSD-20260408-00003',
    brand: 'Chanel',
    series: 'Boy',
    model: 'Boy中号',
    material: '荔枝皮',
    color: '酒红色',
    conditionGrade: 'B',
    accessories: ['防尘袋'],
    photos: [],
    pricingResult: {
      bidders: [
        { name: '刘洋', city: '上海', price: 18000, time: '2026-04-08 14:37:00' },
        { name: '赵磊', city: '北京', price: 17500, time: '2026-04-08 14:35:00' },
      ],
      highestBid: 18000,
      finalPrice: 18000,
    },
    authResult: { appraiserA: '存疑', appraiserB: '真', appraiserC: '真', finalResult: '真' },
    recoveryType: '定金',
    statusCode: 3,
    statusName: '待入库',
    subStatus: '',
    timeline: [
      { status: '挂签绑定', time: '2026-04-08 14:25:00', operator: '张伟' },
      { status: '竞价完成', time: '2026-04-08 14:45:00', operator: '系统' },
      { status: '鉴定存疑转定金', time: '2026-04-08 15:05:00', operator: '系统' },
    ],
  },
  {
    id: 'P004',
    uniqueCode: 'SSD-20260407-00004',
    brand: 'LV',
    series: 'Neverfull',
    model: 'Neverfull MM',
    material: 'Monogram帆布',
    color: '经典老花',
    conditionGrade: 'A',
    accessories: ['内衬包', '购买票据'],
    photos: [],
    pricingResult: {
      bidders: [
        { name: '刘洋', city: '上海', price: 8500, time: '2026-04-07 16:20:00' },
        { name: '孙鹏', city: '广州', price: 8200, time: '2026-04-07 16:18:00' },
      ],
      highestBid: 8500,
      finalPrice: 8500,
    },
    authResult: { appraiserA: '真', appraiserB: '真', finalResult: '真' },
    recoveryType: '全额',
    statusCode: 4,
    statusName: '待调拨',
    subStatus: '',
    timeline: [
      { status: '挂签绑定', time: '2026-04-07 16:00:00', operator: '王强' },
      { status: '竞价完成', time: '2026-04-07 16:25:00', operator: '系统' },
      { status: '鉴定通过', time: '2026-04-07 16:40:00', operator: '系统' },
      { status: '合同签署打款', time: '2026-04-07 16:50:00', operator: '马女士' },
      { status: '入库完成', time: '2026-04-07 17:00:00', operator: '王强' },
    ],
  },
  {
    id: 'P005',
    uniqueCode: 'SSD-20260406-00005',
    brand: 'Rolex',
    series: 'Datejust',
    model: '日志型 126334',
    material: '蚝式钢+18K白金',
    color: '蓝色表盘',
    conditionGrade: 'A',
    accessories: ['盒子', '保卡', '说明书', '吊牌'],
    photos: [],
    pricingResult: {
      bidders: [
        { name: '刘洋', city: '上海', price: 58000, time: '2026-04-06 15:10:00' },
        { name: '赵磊', city: '北京', price: 56000, time: '2026-04-06 15:08:00' },
        { name: '孙鹏', city: '广州', price: 55000, time: '2026-04-06 15:06:00' },
      ],
      highestBid: 58000,
      finalPrice: 58000,
    },
    authResult: { appraiserA: '真', appraiserB: '真', finalResult: '真' },
    recoveryType: '寄卖',
    statusCode: 5,
    statusName: '待签收',
    subStatus: '',
    timeline: [
      { status: '竞价完成', time: '2026-04-06 15:15:00', operator: '系统' },
      { status: '鉴定通过', time: '2026-04-06 15:30:00', operator: '系统' },
      { status: '客户选择寄卖', time: '2026-04-06 15:45:00', operator: '李先生' },
      { status: '邮寄发出', time: '2026-04-06 17:00:00', operator: '张伟' },
    ],
  },
  {
    id: 'P006',
    uniqueCode: 'SSD-20260405-00006',
    brand: 'Gucci',
    series: 'GG Marmont',
    model: 'Marmont小号',
    material: '绗缝皮革',
    color: '裸粉色',
    conditionGrade: 'B',
    accessories: ['防尘袋'],
    photos: [],
    pricingResult: {
      bidders: [
        { name: '赵磊', city: '北京', price: 4200, time: '2026-04-05 11:15:00' },
        { name: '孙鹏', city: '广州', price: 4000, time: '2026-04-05 11:13:00' },
      ],
      highestBid: 4200,
      finalPrice: 4200,
    },
    authResult: { appraiserA: '真', appraiserB: '真', finalResult: '真' },
    recoveryType: '全额',
    statusCode: 6,
    statusName: '已签收',
    subStatus: '',
    timeline: [
      { status: '竞价完成', time: '2026-04-05 11:20:00', operator: '系统' },
      { status: '总部签收', time: '2026-04-06 10:00:00', operator: '郑凯' },
    ],
  },
  {
    id: 'P007',
    uniqueCode: 'SSD-20260404-00007',
    brand: 'LV',
    series: 'Speedy',
    model: 'Speedy 25',
    material: 'Monogram帆布',
    color: '经典老花',
    conditionGrade: 'A',
    accessories: ['锁扣', '钥匙', '肩带'],
    photos: [],
    pricingResult: {
      bidders: [
        { name: '刘洋', city: '上海', price: 6800, time: '2026-04-04 14:10:00' },
      ],
      highestBid: 6800,
      finalPrice: 6800,
    },
    authResult: { appraiserA: '真', appraiserB: '真', finalResult: '真' },
    recoveryType: '寄卖',
    statusCode: 7,
    statusName: '待复检',
    subStatus: '',
    timeline: [
      { status: '总部签收', time: '2026-04-05 10:00:00', operator: '郑凯' },
      { status: '待复检', time: '2026-04-05 10:05:00', operator: '系统' },
    ],
  },
  {
    id: 'P008',
    uniqueCode: 'SSD-20260403-00008',
    brand: 'Cartier',
    series: 'LOVE',
    model: 'LOVE手镯',
    material: '18K玫瑰金',
    color: '玫瑰金',
    conditionGrade: 'A',
    accessories: ['螺丝刀', '盒子', '保卡'],
    photos: [],
    pricingResult: {
      bidders: [
        { name: '刘洋', city: '上海', price: 32000, time: '2026-04-03 16:10:00' },
        { name: '赵磊', city: '北京', price: 31000, time: '2026-04-03 16:08:00' },
      ],
      highestBid: 32000,
      finalPrice: 32000,
    },
    authResult: { appraiserA: '真', appraiserB: '真', finalResult: '真' },
    recoveryType: '定金',
    statusCode: 8,
    statusName: '复检成功',
    subStatus: '',
    timeline: [
      { status: '总部签收', time: '2026-04-04 10:00:00', operator: '郑凯' },
      { status: '复检成功', time: '2026-04-04 14:00:00', operator: '郑凯' },
    ],
  },
  {
    id: 'P009',
    uniqueCode: 'SSD-20260402-00009',
    brand: 'LV',
    series: 'Pochette Métis',
    model: 'Pochette Métis',
    material: 'Monogram帆布',
    color: '经典老花',
    conditionGrade: 'B',
    accessories: ['防尘袋'],
    photos: [],
    pricingResult: {
      bidders: [
        { name: '孙鹏', city: '广州', price: 9500, time: '2026-04-02 11:10:00' },
      ],
      highestBid: 9500,
      finalPrice: 9500,
    },
    authResult: { appraiserA: '假', appraiserB: '假', finalResult: '假' },
    recoveryType: '不收',
    statusCode: 9,
    statusName: '复检失败',
    subStatus: '',
    timeline: [
      { status: '复检失败-假货', time: '2026-04-03 14:00:00', operator: '郑凯' },
    ],
  },
  {
    id: 'P010',
    uniqueCode: 'SSD-20260401-00010',
    brand: 'Dior',
    series: 'Lady Dior',
    model: 'Lady Dior中号',
    material: '藤格纹羊皮',
    color: '黑色',
    conditionGrade: 'A',
    accessories: ['肩带', '防尘袋', '身份卡'],
    photos: [],
    pricingResult: {
      bidders: [
        { name: '刘洋', city: '上海', price: 22000, time: '2026-04-01 15:10:00' },
        { name: '赵磊', city: '北京', price: 21500, time: '2026-04-01 15:08:00' },
      ],
      highestBid: 22000,
      finalPrice: 22000,
    },
    authResult: { appraiserA: '真', appraiserB: '真', finalResult: '真' },
    recoveryType: '寄卖',
    statusCode: 14,
    statusName: '待定价',
    subStatus: '',
    timeline: [
      { status: '复检通过', time: '2026-04-02 10:00:00', operator: '郑凯' },
      { status: '待定价', time: '2026-04-02 10:05:00', operator: '系统' },
    ],
  },
  {
    id: 'P011',
    uniqueCode: 'SSD-20260330-00011',
    brand: 'Chanel',
    series: '2.55',
    model: '2.55 Reissue 226',
    material: '做旧小牛皮',
    color: '黑色',
    conditionGrade: 'A',
    accessories: ['防尘袋', '盒子', '身份卡'],
    photos: [],
    pricingResult: {
      bidders: [
        { name: '刘洋', city: '上海', price: 28000, time: '2026-03-30 14:10:00' },
      ],
      highestBid: 28000,
      finalPrice: 28000,
    },
    authResult: { appraiserA: '真', appraiserB: '真', finalResult: '真' },
    recoveryType: '寄卖',
    statusCode: 18,
    statusName: '在售',
    subStatus: '',
    timeline: [
      { status: '复检通过', time: '2026-03-31 10:00:00', operator: '郑凯' },
      { status: '入库', time: '2026-03-31 14:00:00', operator: '郑凯' },
      { status: '棚拍完成', time: '2026-04-01 10:00:00', operator: '系统' },
      { status: '上架在售', time: '2026-04-02 10:00:00', operator: '系统' },
    ],
  },
  {
    id: 'P012',
    uniqueCode: 'SSD-20260328-00012',
    brand: 'Prada',
    series: 'Re-Edition',
    model: 'Re-Edition 2005',
    material: '尼龙',
    color: '黑色',
    conditionGrade: 'S',
    accessories: ['肩带×3', '防尘袋', '身份卡', '购买票据'],
    photos: [],
    pricingResult: {
      bidders: [
        { name: '赵磊', city: '北京', price: 7500, time: '2026-03-28 11:10:00' },
      ],
      highestBid: 7500,
      finalPrice: 7500,
    },
    authResult: { appraiserA: '真', appraiserB: '真', finalResult: '真' },
    recoveryType: '全额',
    statusCode: 23,
    statusName: '已完成',
    subStatus: '',
    timeline: [
      { status: '交易完成', time: '2026-03-29 16:00:00', operator: '系统' },
    ],
  },
  {
    id: 'P013',
    uniqueCode: 'SSD-20260325-00013',
    brand: 'Omega',
    series: 'Seamaster',
    model: '海马300M',
    material: '精钢',
    color: '蓝色表盘',
    conditionGrade: 'A',
    accessories: ['盒子', '保卡'],
    photos: [],
    pricingResult: {
      bidders: [
        { name: '刘洋', city: '上海', price: 22000, time: '2026-03-25 14:10:00' },
        { name: '孙鹏', city: '广州', price: 21000, time: '2026-03-25 14:08:00' },
      ],
      highestBid: 22000,
      finalPrice: 22000,
    },
    authResult: { appraiserA: '真', appraiserB: '真', finalResult: '真' },
    recoveryType: '寄卖',
    statusCode: 27,
    statusName: '已结算',
    subStatus: '',
    timeline: [
      { status: '售出', time: '2026-03-28 10:00:00', operator: '系统' },
      { status: '已结算', time: '2026-04-04 10:00:00', operator: '林芳' },
    ],
  },
  {
    id: 'P014',
    uniqueCode: 'SSD-20260320-00014',
    brand: 'Fendi',
    series: 'Peekaboo',
    model: 'Peekaboo ISeeU',
    material: '罗马皮',
    color: '棕色',
    conditionGrade: 'C',
    accessories: [],
    photos: [],
    pricingResult: {
      bidders: [
        { name: '赵磊', city: '北京', price: 5000, time: '2026-03-20 11:10:00' },
      ],
      highestBid: 5000,
      finalPrice: 5000,
    },
    authResult: { appraiserA: '假', appraiserB: '存疑', appraiserC: '假', finalResult: '假' },
    recoveryType: '不收',
    statusCode: 28,
    statusName: '已退回',
    subStatus: '',
    timeline: [
      { status: '鉴定不通过', time: '2026-03-20 12:00:00', operator: '系统' },
      { status: '货品退回客户', time: '2026-03-21 10:00:00', operator: '郑凯' },
    ],
  },
  {
    id: 'P015',
    uniqueCode: 'SSD-20260318-00015',
    brand: '周大福',
    series: '传承系列',
    model: '古法金手镯',
    material: '足金999',
    color: '黄金色',
    conditionGrade: 'A',
    accessories: ['盒子', '购买票据', '质保单'],
    photos: [],
    pricingResult: {
      bidders: [
        { name: '刘洋', city: '上海', price: 28000, time: '2026-03-18 10:10:00' },
        { name: '孙鹏', city: '广州', price: 27500, time: '2026-03-18 10:08:00' },
      ],
      highestBid: 28000,
      finalPrice: 28000,
    },
    authResult: { appraiserA: '真', appraiserB: '真', finalResult: '真' },
    recoveryType: '全额',
    statusCode: 29,
    statusName: '已处理',
    subStatus: '',
    timeline: [
      { status: '全额回收', time: '2026-03-18 10:30:00', operator: '系统' },
      { status: '复检失败', time: '2026-03-19 14:00:00', operator: '郑凯' },
      { status: '已处理', time: '2026-03-20 10:00:00', operator: '系统' },
    ],
  },
];

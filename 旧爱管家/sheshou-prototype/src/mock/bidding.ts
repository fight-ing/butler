export interface BidEntry {
  id: number;
  city: string;
  merchantName: string;
  price: number;
  time: string;
  isReal: boolean;
}

const cities = [
  '北京', '上海', '广州', '深圳', '杭州', '成都', '重庆', '武汉', '南京', '西安',
  '苏州', '天津', '长沙', '郑州', '东莞', '青岛', '宁波', '昆明', '大连', '厦门',
  '合肥', '佛山', '福州', '哈尔滨', '济南', '温州', '无锡', '珠海', '中山', '太原',
];

const merchantPrefixes = [
  '金诚', '恒信', '汇鑫', '宝瑞', '聚丰', '鑫达', '永利', '嘉禾', '锦绣', '瑞丰',
  '天成', '利恒', '盛世', '华联', '中恒', '博雅', '润泽', '祥瑞', '鹏程', '龙腾',
  '泰和', '新纪元', '东方', '万象', '星辰', '金域', '翡翠', '铂金', '璀璨', '奢华',
];

const merchantSuffixes = ['名品', '奢品', '中古', '二奢', '优品', '典当', '寄卖行', '回收', '珠宝', '名表'];

function generateMerchantName(): string {
  const prefix = merchantPrefixes[Math.floor(Math.random() * merchantPrefixes.length)];
  const suffix = merchantSuffixes[Math.floor(Math.random() * merchantSuffixes.length)];
  return `${prefix}${suffix}`;
}

// Generate virtual bids for a given product (base price from real bids)
export function generateBiddingData(basePrice: number, realBids: { name: string; city: string; price: number }[]): BidEntry[] {
  const allBids: BidEntry[] = [];
  let id = 1;
  const startTime = new Date('2026-04-08T14:30:00');

  // Generate 50 virtual bids
  const minVirtual = Math.floor(basePrice * 0.55);
  const maxVirtual = Math.floor(basePrice * 0.95);

  for (let i = 0; i < 50; i++) {
    const progress = i / 50;
    const minPrice = minVirtual + Math.floor((maxVirtual - minVirtual) * progress * 0.6);
    const maxPrice = minVirtual + Math.floor((maxVirtual - minVirtual) * (progress * 0.8 + 0.2));
    const price = Math.floor(minPrice + Math.random() * (maxPrice - minPrice));
    const timeOffset = Math.floor(progress * 9 * 60 + Math.random() * 30);
    const bidTime = new Date(startTime.getTime() + timeOffset * 1000);

    allBids.push({
      id: id++,
      city: cities[Math.floor(Math.random() * cities.length)],
      merchantName: generateMerchantName(),
      price: Math.round(price / 100) * 100,
      time: bidTime.toISOString().replace('T', ' ').substring(0, 19),
      isReal: false,
    });
  }

  // Insert real bids at appropriate positions
  realBids.forEach((bid, index) => {
    const progress = 0.6 + index * 0.15;
    const timeOffset = Math.floor(progress * 10 * 60);
    const bidTime = new Date(startTime.getTime() + timeOffset * 1000);

    allBids.push({
      id: id++,
      city: bid.city,
      merchantName: bid.name,
      price: bid.price,
      time: bidTime.toISOString().replace('T', ' ').substring(0, 19),
      isReal: true,
    });
  });

  // Sort by time
  allBids.sort((a, b) => a.time.localeCompare(b.time));

  // Re-assign ids
  allBids.forEach((bid, index) => {
    bid.id = index + 1;
  });

  return allBids;
}

// Pre-generated bidding data for the demo product (Hermès Birkin 30)
export const demoBiddingData = generateBiddingData(95000, [
  { name: '孙鹏·广州优品', city: '广州', price: 88000 },
  { name: '赵磊·北京名品', city: '北京', price: 92000 },
  { name: '刘洋·上海奢品', city: '上海', price: 95000 },
]);

// City coordinates for map display (simplified)
export const cityCoordinates: Record<string, { x: number; y: number }> = {
  '北京': { x: 65, y: 22 },
  '上海': { x: 78, y: 45 },
  '广州': { x: 68, y: 72 },
  '深圳': { x: 70, y: 74 },
  '杭州': { x: 77, y: 47 },
  '成都': { x: 48, y: 50 },
  '重庆': { x: 52, y: 52 },
  '武汉': { x: 64, y: 48 },
  '南京': { x: 74, y: 42 },
  '西安': { x: 54, y: 38 },
  '苏州': { x: 77, y: 44 },
  '天津': { x: 68, y: 25 },
  '长沙': { x: 63, y: 55 },
  '郑州': { x: 62, y: 38 },
  '东莞': { x: 69, y: 73 },
  '青岛': { x: 74, y: 30 },
  '宁波': { x: 80, y: 47 },
  '昆明': { x: 44, y: 65 },
  '大连': { x: 72, y: 22 },
  '厦门': { x: 74, y: 65 },
  '合肥': { x: 70, y: 43 },
  '佛山': { x: 67, y: 72 },
  '福州': { x: 76, y: 60 },
  '哈尔滨': { x: 72, y: 10 },
  '济南': { x: 69, y: 32 },
  '温州': { x: 79, y: 52 },
  '无锡': { x: 76, y: 43 },
  '珠海': { x: 68, y: 75 },
  '中山': { x: 68, y: 73 },
  '太原': { x: 60, y: 30 },
};

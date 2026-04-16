import { useState, useEffect } from 'react';
import {
  Home, Calendar, ShoppingBag, User, MapPin, Clock, Phone,
  Star, Shield, Check, Award, TrendingUp, Package,
  CreditCard, Share2, HelpCircle, Bell, Camera, FileText,
} from 'lucide-react';
import { demoBiddingData, cityCoordinates } from '../../mock/bidding';
import { products } from '../../mock/products';
import { orders } from '../../mock/orders';
import { demoOrders } from '../../mock/postCollectionFlow';
import {
  PageLayout, Card, Tag, ListItem, SectionHeader, FilterTabs,
  ActionButton, InfoBanner, DetailRow, PriceDisplay, ProductCardVertical,
  ProductCardHorizontal, BrandGrid, tokens, recoveryTypeColor,
} from '../../design';

// ─── Types ───────────────────────────────────────────────────────────
interface CustomerViewProps {
  step: number;
}

// ─── Derived palette (zero hardcoded hex outside this block) ─────────
const c = {
  white: tokens.color.bgCard,
  darkBg: tokens.color.textTitle,
  darkBgDeep: `color-mix(in srgb, ${tokens.color.textTitle} 85%, black)`,
  darkBgMap: `color-mix(in srgb, ${tokens.color.textTitle} 70%, black)`,
  purpleAccent: tokens.color.purple,
  // Medal rank gradients
  gold: tokens.color.warning,
  goldDark: `color-mix(in srgb, ${tokens.color.warning} 80%, ${tokens.color.danger})`,
  silver: tokens.color.textDisabled,
  silverDark: `color-mix(in srgb, ${tokens.color.textDisabled} 80%, ${tokens.color.textCaption})`,
  bronze: `color-mix(in srgb, ${tokens.color.warning} 60%, ${tokens.color.danger})`,
  bronzeDark: `color-mix(in srgb, ${tokens.color.warning} 40%, ${tokens.color.danger})`,
  // Product card gradients (brand-neutral tones derived from design tokens)
  warmLight: tokens.color.bgFill,
  warmMid: tokens.color.divider,
  coolLight: tokens.color.primaryLight,
  coolMid: `color-mix(in srgb, ${tokens.color.primaryLight} 60%, ${tokens.color.border})`,
  roseLight: tokens.color.dangerLight,
  roseMid: `color-mix(in srgb, ${tokens.color.dangerLight} 60%, ${tokens.color.border})`,
  neutralLight: tokens.color.bgFill,
  neutralMid: tokens.color.border,
};

const rankStyle = (idx: number) => {
  if (idx === 0) return { bg: `linear-gradient(135deg, ${c.gold}, ${c.goldDark})`, color: c.white };
  if (idx === 1) return { bg: `linear-gradient(135deg, ${c.silver}, ${c.silverDark})`, color: c.white };
  if (idx === 2) return { bg: `linear-gradient(135deg, ${c.bronze}, ${c.bronzeDark})`, color: c.white };
  return { bg: tokens.color.bgFill, color: tokens.color.textCaption };
};

// ─── Helpers ─────────────────────────────────────────────────────────
const fmt = (n: number) => n.toLocaleString('zh-CN');

const successCases = [
  { brand: 'Hermes', model: 'Birkin 30 金棕色', price: 95000, days: 1, emoji: '👜', gradientFrom: c.warmLight, gradientTo: c.warmMid },
  { brand: 'Chanel', model: 'CF中号 黑色', price: 38000, days: 2, emoji: '👜', gradientFrom: c.neutralLight, gradientTo: c.neutralMid },
  { brand: 'Rolex', model: '日志型 126334', price: 58000, days: 3, emoji: '⌚', gradientFrom: c.coolLight, gradientTo: c.coolMid },
  { brand: 'Cartier', model: 'LOVE手镯', price: 32000, days: 5, emoji: '💎', gradientFrom: c.roseLight, gradientTo: c.roseMid },
];

const sortedBids = [...demoBiddingData].sort((a, b) => b.price - a.price);
const top5 = sortedBids.slice(0, 5);
const recentBids = [...demoBiddingData].sort((a, b) => b.time.localeCompare(a.time)).slice(0, 8);

// Products relevant for step 12
const confirmProducts = products.filter(p => ['P001', 'P002', 'P003'].includes(p.id));

const tabItems = [
  { icon: Home, label: '首页' },
  { icon: Calendar, label: '预约' },
  { icon: ShoppingBag, label: '订单' },
  { icon: User, label: '我的' },
] as const;

const tabLabels = ['首页', '预约', '订单', '我的'] as const;

const gradeColor = (g: string) =>
  g === 'S' ? 'green' as const : g === 'A' ? 'blue' as const : 'orange' as const;

// ─── Component ───────────────────────────────────────────────────────
export const CustomerView: React.FC<CustomerViewProps> = ({ step }) => {
  const defaultTabIdx = step >= 12 ? 2 : 0;
  const [activeTabIdx, setActiveTabIdx] = useState(defaultTabIdx);
  const [signed, setSigned] = useState(false);
  const [orderFilterIdx, setOrderFilterIdx] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({
    P001: '接受', P002: '接受', P003: '寄卖',
  });

  const isStepOverride = [5, 6, 8, 9, 12, 13].includes(step);

  useEffect(() => {
    if (step >= 12 && !isStepOverride) setActiveTabIdx(2);
    else if (step >= 5 && step <= 6) setActiveTabIdx(1);
    else if (step < 5) setActiveTabIdx(0);
  }, [step]);

  // Bidding countdown animation
  const [countdown, setCountdown] = useState('07:42');
  const [bidCount] = useState(53);
  useEffect(() => {
    if (step !== 8) return;
    const t = setInterval(() => {
      setCountdown(prev => {
        const [m, s] = prev.split(':').map(Number);
        const total = m * 60 + s - 1;
        if (total <= 0) { clearInterval(t); return '00:00'; }
        return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [step]);

  // Pulse animation for latest bid
  const [pulseIdx, setPulseIdx] = useState(0);
  useEffect(() => {
    if (step !== 8) return;
    const t = setInterval(() => setPulseIdx(i => (i + 1) % recentBids.length), 3000);
    return () => clearInterval(t);
  }, [step]);

  // ─── Step-specific overrides ─────────────────────────────────────
  if (step === 5) return wrapInLayout(renderStep5());
  if (step === 6) return wrapInLayout(renderStep6());
  if (step === 8) return wrapInLayout(renderStep8(), true);
  if (step === 9) return wrapInLayout(renderStep9());
  if (step === 12) return wrapInLayout(renderStep12(), true);
  if (step === 13) return wrapInLayout(renderStep13(), true);

  // ─── Normal tab views ────────────────────────────────────────────
  const activeTab = tabLabels[activeTabIdx];
  return wrapInLayout(
    <>
      {activeTab === '首页' && renderHome()}
      {activeTab === '预约' && renderAppointment()}
      {activeTab === '订单' && renderOrders()}
      {activeTab === '我的' && renderProfile()}
    </>
  );

  // ─── Layout wrapper using PageLayout ──────────────────────────────
  function wrapInLayout(content: React.ReactNode, noHeader = false) {
    if (noHeader) {
      return (
        <PageLayout
          title=""
          tabs={[...tabItems]}
          activeTab={activeTabIdx}
          onTabChange={setActiveTabIdx}
        >
          {content}
        </PageLayout>
      );
    }
    return (
      <PageLayout
        title=""
        tabs={[...tabItems]}
        activeTab={activeTabIdx}
        onTabChange={setActiveTabIdx}
      >
        {content}
      </PageLayout>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // Tab: 首页
  // ═══════════════════════════════════════════════════════════════════
  function renderHome() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.cardGap, paddingBottom: '8px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `16px ${tokens.space.pagePadding} 0` }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: tokens.color.textTitle, margin: 0 }}>奢收多</h1>
            <p style={{ fontSize: '13px', color: tokens.color.textCaption, marginTop: '2px', margin: '2px 0 0' }}>让闲置奢侈品更有价值</p>
          </div>
          <div
            style={{
              width: 36, height: 36, borderRadius: '50%', background: tokens.color.bgFill,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Bell size={17} color={tokens.color.textBody} />
          </div>
        </div>

        {/* Hero Card */}
        <div style={{
          margin: `0 ${tokens.space.pagePadding}`,
          background: `linear-gradient(135deg, ${tokens.color.primary}, ${c.purpleAccent})`,
          borderRadius: tokens.radius.cardInner,
          padding: tokens.space.pagePadding,
          color: c.white,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: tokens.shadow.card,
        }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 128, height: 128, background: 'rgba(255,255,255,0.1)', borderRadius: '50%', transform: 'translate(32px, -32px)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 96, height: 96, background: 'rgba(255,255,255,0.05)', borderRadius: '50%', transform: 'translate(-24px, 48px)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Camera size={16} />
              <span style={{ fontSize: '14px', fontWeight: 500, opacity: 0.9 }}>拍照估价 · 30秒出结果</span>
            </div>
            <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '12px', margin: '0 0 12px' }}>AI智能识别，全国商家实时竞价</p>
            <button style={{
              background: tokens.color.bgCard, color: tokens.color.primary,
              fontSize: '14px', fontWeight: 600, padding: '8px 20px',
              borderRadius: tokens.radius.button, border: 'none', cursor: 'pointer',
            }}>
              立即估价
            </button>
          </div>
        </div>

        {/* Quick Estimate - Brand Grid */}
        <Card className="mx-5">
          <SectionHeader title="快速估价" action={{ label: '选品牌 > 选品类 > 拍照', onClick: () => {} }} />
          <BrandGrid />
        </Card>

        {/* Two Recovery Methods */}
        <div style={{ padding: `0 ${tokens.space.pagePadding}` }}>
          <SectionHeader title="回收方式" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.space.cardGap }}>
            <Card>
              <div style={{ width: 40, height: 40, borderRadius: tokens.radius.cardInner, background: `${tokens.color.warning}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <TrendingUp size={20} color={tokens.color.warning} />
              </div>
              <h3 style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle, marginBottom: '4px', margin: '0 0 4px' }}>现场竞价回收</h3>
              <p style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption, lineHeight: '1.6', margin: 0 }}>全国商家实时竞价，当场打款</p>
            </Card>
            <Card>
              <div style={{ width: 40, height: 40, borderRadius: tokens.radius.cardInner, background: `${tokens.color.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <Award size={20} color={tokens.color.primary} />
              </div>
              <h3 style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle, marginBottom: '4px', margin: '0 0 4px' }}>寄卖竞价回收</h3>
              <p style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption, lineHeight: '1.6', margin: 0 }}>专业拍卖，卖出更高价</p>
            </Card>
          </div>
        </div>

        {/* Success Cases Carousel */}
        <div>
          <SectionHeader title="成交案例" action={{ label: '查看更多', onClick: () => {} }} />
          <div style={{ display: 'flex', gap: tokens.space.cardGap, padding: `0 ${tokens.space.pagePadding}`, overflowX: 'auto', paddingBottom: '8px', scrollSnapType: 'x mandatory' }}>
            {successCases.map((c, i) => (
              <div key={i} style={{ scrollSnapAlign: 'start' }}>
                <ProductCardVertical
                  brand={c.brand}
                  model={c.model}
                  price={c.price}
                  emoji={c.emoji}
                  gradientFrom={c.gradientFrom}
                  gradientTo={c.gradientTo}
                  meta={`${c.days}天前成交`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // Tab: 预约
  // ═══════════════════════════════════════════════════════════════════
  function renderAppointment() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.cardGap, paddingTop: '16px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: tokens.color.textTitle, padding: `0 ${tokens.space.pagePadding}`, margin: 0 }}>我的预约</h2>

        {/* Appointment Card */}
        <Card className="mx-5">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: `1px solid ${tokens.color.divider}` }}>
            <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.primary }}>RCV-20260408-00001</span>
            <Tag label="上门回收" color="blue" size="sm" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: tokens.color.textBody }}>
              <Calendar size={14} color={tokens.color.textCaption} />
              <span>2026年4月8日 14:00-16:00</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: tokens.color.textBody }}>
              <MapPin size={14} color={tokens.color.textCaption} />
              <span style={{ lineHeight: '1.4' }}>上海市静安区南京西路1266号恒隆广场公寓2301</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: tokens.color.textBody }}>
              <Package size={14} color={tokens.color.textCaption} />
              <span>Hermes包袋 x1, Chanel包袋 x2</span>
            </div>

            {/* Appraiser Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: tokens.color.bgPage, borderRadius: tokens.radius.cardInner, padding: '12px', marginTop: '8px' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${tokens.color.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tokens.color.primary, fontWeight: 700, fontSize: '14px' }}>
                张
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle, margin: 0 }}>张伟</p>
                <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, margin: '2px 0 0' }}>资深鉴定师 · 5年经验</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={12} fill={tokens.color.warning} color={tokens.color.warning} />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Status Timeline */}
        <Card className="mx-5">
          <h3 style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle, marginBottom: '16px', margin: '0 0 16px' }}>服务进度</h3>
          {renderTimeline([
            { label: '预约成功', done: true, time: '04-08 10:30' },
            { label: '鉴定师已派单', done: step >= 4, time: step >= 4 ? '04-08 12:00' : '' },
            { label: '鉴定师出发', done: step >= 5, time: step >= 5 ? '04-08 13:45' : '' },
            { label: '服务中', done: step >= 6, time: step >= 6 ? '04-08 14:00' : '' },
            { label: '竞价中', done: step >= 8, time: step >= 8 ? '04-08 14:30' : '', active: step >= 4 && step < 8 },
          ])}
        </Card>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // Tab: 订单
  // ═══════════════════════════════════════════════════════════════════
  function renderOrders() {
    const filterTabs = [
      { label: '全部' }, { label: '待服务' }, { label: '进行中' },
      { label: '待收款' }, { label: '已完成' },
    ];
    const filterLabels = filterTabs.map(t => t.label);
    const currentFilter = filterLabels[orderFilterIdx];

    const customerOrders = orders.filter(o => o.customer.name === '赵太太');
    const filtered = currentFilter === '全部' ? customerOrders : customerOrders.filter(o => {
      if (currentFilter === '已完成') return o.status === '已完成' || o.status === '已结算';
      if (currentFilter === '待收款') return o.payment.status === '待打款';
      if (currentFilter === '进行中') return o.status.includes('复检') || o.status.includes('运输');
      return false;
    });

    const typeTagMap: Record<string, { label: string; color: 'green' | 'orange' | 'blue' | 'red' }> = {
      '全额竞价回收': { label: '全额', color: 'green' },
      '定金竞价回收': { label: '定金', color: 'orange' },
      '寄卖竞价回收': { label: '寄卖', color: 'blue' },
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.cardGap, paddingTop: '16px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: tokens.color.textTitle, padding: `0 ${tokens.space.pagePadding}`, margin: 0 }}>我的订单</h2>

        <FilterTabs tabs={filterTabs} activeIndex={orderFilterIdx} onChange={setOrderFilterIdx} />

        {filtered.map(o => {
          const tag = typeTagMap[o.type] || { label: '不收', color: 'red' as const };
          return (
            <ListItem
              key={o.orderId}
              title={o.orderId}
              titleRight={<Tag label={tag.label} color={tag.color} size="sm" />}
              subtitle={o.status}
              meta={{
                left: (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {o.products.slice(0, 3).map((_, i) => (
                      <div key={i} style={{ width: 40, height: 40, borderRadius: tokens.radius.cardInner, background: `linear-gradient(135deg, ${c.warmLight}, ${c.warmMid})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '16px' }}>👜</span>
                      </div>
                    ))}
                    {o.products.length > 3 && (
                      <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>+{o.products.length - 3}</span>
                    )}
                  </div>
                ),
                right: <PriceDisplay amount={o.payment.amount} size="md" />,
              }}
            />
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: tokens.color.textDisabled, fontSize: tokens.font.body.size }}>暂无相关订单</div>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // Tab: 我的
  // ═══════════════════════════════════════════════════════════════════
  function renderProfile() {
    const menuItems = [
      { icon: CreditCard, label: '收款管理', badge: '' },
      { icon: MapPin, label: '地址管理', badge: '' },
      { icon: FileText, label: '我的合同', badge: '3' },
      { icon: Bell, label: '消息中心', badge: '2' },
      { icon: HelpCircle, label: '帮助中心', badge: '' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Profile Header */}
        <div style={{ background: `linear-gradient(135deg, ${tokens.color.primary}, ${c.purpleAccent})`, padding: '16px 20px 24px', color: c.white }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700 }}>
              赵
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>赵太太</h2>
              <p style={{ fontSize: tokens.font.body.size, opacity: 0.8, margin: '2px 0 0' }}>137****4444</p>
            </div>
          </div>

          {/* Stats Row */}
          <Card variant="filled" className="mt-5" padding="md">
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.1)', borderRadius: tokens.radius.cardInner, padding: '16px', backdropFilter: 'blur(8px)' }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <p style={{ fontSize: '20px', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: c.white, margin: 0 }}>¥310K</p>
                <p style={{ fontSize: tokens.font.caption.size, opacity: 0.7, marginTop: '2px', color: c.white, margin: '2px 0 0' }}>累计变现</p>
              </div>
              <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
              <div style={{ flex: 1, textAlign: 'center' }}>
                <p style={{ fontSize: '20px', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: c.white, margin: 0 }}>5</p>
                <p style={{ fontSize: tokens.font.caption.size, opacity: 0.7, marginTop: '2px', color: c.white, margin: '2px 0 0' }}>交易次数</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Menu Items */}
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <Card key={item.label} variant="filled" padding="sm" onClick={() => {}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 4px' }}>
                  <Icon size={18} color={tokens.color.textBody} />
                  <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textTitle, flex: 1, textAlign: 'left' }}>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      background: tokens.color.danger, color: c.white, fontSize: tokens.font.mini.size,
                      width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontWeight: 500,
                    }}>
                      {item.badge}
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // Step 5: 鉴定师已出发
  // ═══════════════════════════════════════════════════════════════════
  function renderStep5() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.cardGap, paddingTop: '16px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: tokens.color.textTitle, padding: `0 ${tokens.space.pagePadding}`, margin: 0 }}>鉴定师已出发</h2>

        {/* Appraiser Card */}
        <Card className="mx-5">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${tokens.color.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tokens.color.primary, fontWeight: 700, fontSize: '18px' }}>
              张
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: tokens.color.textTitle, margin: 0 }}>张伟</h3>
              <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, margin: '2px 0 0' }}>资深鉴定师 · 5年经验</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={12} fill={tokens.color.warning} color={tokens.color.warning} />
                ))}
                <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginLeft: '4px' }}>5.0</span>
              </div>
            </div>
            <button style={{ width: 40, height: 40, borderRadius: '50%', background: `${tokens.color.success}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
              <Phone size={18} color={tokens.color.success} />
            </button>
          </div>
        </Card>

        {/* Map Placeholder */}
        <div style={{
          margin: `0 ${tokens.space.pagePadding}`,
          background: tokens.color.bgFill,
          borderRadius: tokens.radius.card,
          height: 200,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '12px', position: 'relative', overflow: 'hidden',
          boxShadow: tokens.shadow.card,
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
            <div style={{ position: 'absolute', top: '30%', left: '20%', width: '60%', height: 1, background: tokens.color.textDisabled }} />
            <div style={{ position: 'absolute', top: '50%', left: '10%', width: '80%', height: 1, background: tokens.color.textDisabled }} />
            <div style={{ position: 'absolute', top: '70%', left: '25%', width: '50%', height: 1, background: tokens.color.textDisabled }} />
            <div style={{ position: 'absolute', left: '40%', top: '10%', width: 1, height: '80%', background: tokens.color.textDisabled }} />
            <div style={{ position: 'absolute', left: '60%', top: '20%', width: 1, height: '60%', background: tokens.color.textDisabled }} />
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="animate-ping" style={{ width: 16, height: 16, background: tokens.color.primary, borderRadius: '50%', position: 'absolute', inset: 0, opacity: 0.3 }} />
            <div style={{ width: 16, height: 16, background: tokens.color.primary, borderRadius: '50%', position: 'relative', zIndex: 1 }} />
          </div>
          <div style={{ position: 'relative', zIndex: 1, background: `${tokens.color.bgCard}E6`, backdropFilter: 'blur(8px)', borderRadius: tokens.radius.cardInner, padding: '8px 16px', boxShadow: tokens.shadow.card }}>
            <p style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle, margin: 0 }}>
              预计 <span style={{ color: tokens.color.primary, fontWeight: 700 }}>15分钟</span> 到达
            </p>
          </div>
        </div>

        {/* Distance Indicator */}
        <Card className="mx-5" variant="outlined">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <MapPin size={20} color={tokens.color.primary} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: tokens.font.body.size, color: tokens.color.textTitle, margin: 0 }}>
                距离您约 <span style={{ fontWeight: 700, color: tokens.color.primary }}>2.3公里</span>
              </p>
              <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, margin: '2px 0 0' }}>静安区南京西路 → 恒隆广场公寓</p>
            </div>
          </div>
        </Card>

        {/* Appointment Info */}
        <Card className="mx-5">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: tokens.color.textBody }}>
              <Clock size={14} color={tokens.color.textCaption} />
              <span>预约时间：14:00 - 16:00</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: tokens.color.textBody }}>
              <Package size={14} color={tokens.color.textCaption} />
              <span>预估商品：Hermes包袋 x1, Chanel包袋 x2</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // Step 6: 服务中
  // ═══════════════════════════════════════════════════════════════════
  function renderStep6() {
    const processingItems = [
      { brand: 'Hermes', model: 'Birkin 30', status: '挂签中', tagColor: 'orange' as const },
      { brand: 'Chanel', model: 'CF中号', status: '待处理', tagColor: 'gray' as const },
      { brand: 'Chanel', model: 'Boy中号', status: '待处理', tagColor: 'gray' as const },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.cardGap, paddingTop: '16px' }}>
        {/* Status Banner */}
        <div style={{ padding: `0 ${tokens.space.pagePadding}` }}>
          <InfoBanner icon={Check} title="鉴定师已到达" subtitle="正在为您服务中" color="green" />
        </div>

        {/* Appraiser Info */}
        <Card className="mx-5">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${tokens.color.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tokens.color.primary, fontWeight: 700, fontSize: '16px' }}>
              张
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle, margin: 0 }}>张伟 · 服务中</p>
              <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, margin: '2px 0 0' }}>到达时间 14:02</p>
            </div>
          </div>
        </Card>

        {/* Products Being Processed */}
        <Card className="mx-5">
          <h3 style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle, marginBottom: '12px', margin: '0 0 12px' }}>正在处理的商品</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {processingItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 48, height: 48, borderRadius: tokens.radius.cardInner, background: `linear-gradient(135deg, ${c.warmLight}, ${c.warmMid})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '18px' }}>👜</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: tokens.color.textTitle, margin: 0 }}>{item.brand} {item.model}</p>
                  <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, margin: '2px 0 0' }}>包袋</p>
                </div>
                <Tag label={item.status} color={item.tagColor} size="sm" />
              </div>
            ))}
          </div>
        </Card>

        <p style={{ textAlign: 'center', fontSize: tokens.font.caption.size, color: tokens.color.textDisabled }}>鉴定师正在为您的商品进行鉴定和拍照</p>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // Step 8: 竞价回收界面 (CORE)
  // ═══════════════════════════════════════════════════════════════════
  function renderStep8() {
    const activeCities = new Set(recentBids.slice(0, 8).map(b => b.city));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', marginTop: '-4px' }}>
        {/* Dark Header */}
        <div style={{ background: `linear-gradient(180deg, ${tokens.color.textTitle}, ${c.darkBgDeep})`, padding: '12px 16px 16px', color: c.white }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>竞价回收</h2>
            <span style={{ fontSize: tokens.font.caption.size, background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: tokens.radius.tag }}>Hermes Birkin 30</span>
          </div>

          {/* Countdown */}
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <p style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '4px', fontVariantNumeric: 'tabular-nums', margin: 0 }}>{countdown}</p>
            <p style={{ fontSize: tokens.font.body.size, opacity: 0.6, marginTop: '2px', margin: '2px 0 0' }}>{bidCount}个商家正在出价</p>
          </div>
        </div>

        {/* Map Area */}
        <div style={{ background: c.darkBgMap, padding: '8px 8px 12px', position: 'relative', height: 160 }}>
          {/* Map background decoration */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
            <svg viewBox="0 0 100 80" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
              <path d="M45,5 Q55,3 65,8 L72,10 Q78,18 68,22 L65,25 Q72,28 74,32 L69,35 Q62,38 65,42 L78,44 Q82,48 79,52 L74,55 Q76,60 74,65 L70,68 Q68,72 70,75 L65,78 Q60,76 55,72 L52,68 Q48,65 44,68 L40,72 Q35,68 30,65 L28,60 Q25,55 28,50 L32,48 Q30,42 28,38 L25,32 Q28,28 32,25 L38,22 Q42,18 45,12 Z"
                fill="none" stroke={tokens.color.primary} strokeWidth="0.5" />
            </svg>
          </div>

          {/* City dots */}
          {Object.entries(cityCoordinates).map(([city, pos]) => {
            const isActive = activeCities.has(city);
            return (
              <div
                key={city}
                style={{ position: 'absolute', left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                {isActive && (
                  <div className="animate-ping" style={{ width: 12, height: 12, background: tokens.color.warning, borderRadius: '50%', position: 'absolute', opacity: 0.4 }} />
                )}
                <div
                  style={{
                    borderRadius: '50%', position: 'relative', zIndex: 1,
                    width: isActive ? 10 : 6,
                    height: isActive ? 10 : 6,
                    background: isActive ? tokens.color.warning : `${tokens.color.primary}80`,
                  }}
                />
                {isActive && (
                  <span style={{ position: 'absolute', bottom: -12, left: '50%', transform: 'translateX(-50%)', fontSize: '8px', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
                    {city}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Current Highest Price */}
        <div style={{ background: tokens.color.textTitle, padding: '12px 16px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontSize: tokens.font.caption.size, color: 'rgba(255,255,255,0.5)', marginBottom: '2px', margin: '0 0 2px' }}>当前最高出价</p>
          <PriceDisplay amount={95000} size="hero" />
        </div>

        {/* Live Bid Feed */}
        <div style={{ flex: 1, background: tokens.color.bgCard, overflowY: 'auto' }}>
          <div style={{
            padding: '8px 16px', background: tokens.color.bgPage,
            borderBottom: `1px solid ${tokens.color.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            position: 'sticky', top: 0, zIndex: 1,
          }}>
            <span style={{ fontSize: tokens.font.caption.size, fontWeight: 500, color: tokens.color.textBody }}>实时出价</span>
            <span style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption }}>价格从高到低</span>
          </div>
          <div>
            {recentBids.map((bid, idx) => {
              const rank = sortedBids.findIndex(b => b.id === bid.id) + 1;
              const isTop3 = rank <= 3;
              const isPulse = idx === pulseIdx;

              const rankColors = rankStyle(rank - 1);

              return (
                <div
                  key={bid.id}
                  style={{
                    padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px',
                    transition: `all ${tokens.motion.normal}`,
                    background: isPulse ? tokens.color.warningLight : isTop3 ? `${tokens.color.warningLight}4D` : 'transparent',
                    borderBottom: `1px solid ${tokens.color.divider}`,
                  }}
                >
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: tokens.font.mini.size, fontWeight: 700, flexShrink: 0,
                    background: rankColors.bg, color: rankColors.color,
                  }}>
                    {rank}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '13px', color: tokens.color.textTitle, fontWeight: 500, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {bid.city} · {bid.merchantName}
                    </p>
                    <p style={{ fontSize: tokens.font.mini.size, color: tokens.color.textDisabled, margin: '2px 0 0' }}>
                      {bid.time.split(' ')[1]}
                    </p>
                  </div>
                  <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, flexShrink: 0, fontVariantNumeric: 'tabular-nums', color: isTop3 ? tokens.color.textTitle : tokens.color.textBody }}>
                    <PriceDisplay amount={bid.price} size="sm" />
                  </span>
                  {isPulse && (
                    <div className="animate-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: tokens.color.danger, flexShrink: 0 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // Step 9: 竞价完成
  // ═══════════════════════════════════════════════════════════════════
  function renderStep9() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.cardGap, paddingTop: '16px' }}>
        {/* Result Card */}
        <Card className="mx-5" padding="lg">
          <div style={{ background: `linear-gradient(135deg, ${tokens.color.textTitle}, ${c.darkBgDeep})`, borderRadius: tokens.radius.card, padding: '24px', color: c.white, textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <Award size={28} color={c.gold} />
            </div>
            <p style={{ fontSize: tokens.font.body.size, opacity: 0.8, marginBottom: '4px', margin: '0 0 4px' }}>竞价结束 · 最终最高价</p>
            <PriceDisplay amount={95000} size="hero" />
          </div>
        </Card>

        {/* Stats */}
        <div style={{ display: 'flex', gap: tokens.space.cardGap, padding: `0 ${tokens.space.pagePadding}` }}>
          <Card padding="sm">
            <div style={{ textAlign: 'center', padding: '4px 0' }}>
              <p style={{ fontSize: '18px', fontWeight: 700, color: tokens.color.textTitle, fontVariantNumeric: 'tabular-nums', margin: 0 }}>53</p>
              <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, margin: '2px 0 0' }}>参与商家</p>
            </div>
          </Card>
          <Card padding="sm">
            <div style={{ textAlign: 'center', padding: '4px 0' }}>
              <p style={{ fontSize: '18px', fontWeight: 700, color: tokens.color.textTitle, margin: 0 }}>10分钟</p>
              <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, margin: '2px 0 0' }}>竞价时长</p>
            </div>
          </Card>
        </div>

        {/* Single product confirmation — one product at a time */}
        <SectionHeader title="当前商品报价确认" />
        <Card className="mx-5 mb-3">
          <div style={{ display: 'flex', gap: tokens.space.itemGap }}>
            <div style={{
              width: 72, height: 72, borderRadius: tokens.radius.cardInner, flexShrink: 0,
              background: 'linear-gradient(135deg, #F5EDE3, #E8DDD0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px',
            }}>👜</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: tokens.font.bodyLarge.size, fontWeight: 600, color: tokens.color.textTitle }}>Hermès Birkin 30</span>
                <Tag label="A级" color="blue" size="sm" />
              </div>
              <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, margin: 0 }}>
                Togo牛皮 · 金棕色 · 近30天均价 ¥{fmt(94500)}
              </p>
              <div style={{ marginTop: 8 }}>
                <PriceDisplay amount={95000} size="lg" />
              </div>
            </div>
          </div>
          {/* Confirmation actions */}
          <div style={{
            marginTop: tokens.space.cardPadding, paddingTop: tokens.space.cardPadding,
            borderTop: `1px solid ${tokens.color.divider}`,
            display: 'flex', flexDirection: 'column', gap: tokens.space.inlineGap,
          }}>
            <button style={{
              width: '100%', height: 44, borderRadius: tokens.radius.button,
              background: tokens.color.success, color: '#FFF',
              fontSize: tokens.font.body.size, fontWeight: 600,
              border: 'none', cursor: 'pointer',
            }}>确认回收价格 ¥95,000</button>
            <button style={{
              width: '100%', height: 44, borderRadius: tokens.radius.button,
              background: tokens.color.purpleLight, color: tokens.color.purple,
              fontSize: tokens.font.body.size, fontWeight: 500,
              border: `1px solid ${tokens.color.purple}33`, cursor: 'pointer',
            }}>不满意价格 · 改为寄卖竞价回收</button>
          </div>
        </Card>

        {/* Progress indicator */}
        <Card className="mx-5 mb-3" padding="sm">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>竞价进度</span>
            <span style={{ fontSize: tokens.font.caption.size, fontWeight: 600, color: tokens.color.primary }}>第 1/3 件</span>
          </div>
          <div style={{ height: 4, background: tokens.color.bgFill, borderRadius: 2, marginTop: 8 }}>
            <div style={{ height: 4, borderRadius: 2, background: tokens.color.primary, width: '33%' }} />
          </div>
          <p style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption, marginTop: 6, margin: '6px 0 0' }}>
            确认后将继续下一件商品的竞价
          </p>
        </Card>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // Step 12: 回收清单确认 — 按订单类型分组展示合同
  // ═══════════════════════════════════════════════════════════════════
  function renderStep12() {
    const grandTotal = demoOrders.reduce((sum, o) => {
      if (o.type === '定金竞价回收') return sum + (o.depositAmount ?? 0);
      return sum + o.totalAmount;
    }, 0);

    const typeTagColor = (type: string) => {
      if (type.includes('全额')) return recoveryTypeColor['全额'] ?? ('green' as const);
      if (type.includes('定金')) return recoveryTypeColor['定金'] ?? ('blue' as const);
      if (type.includes('寄卖')) return recoveryTypeColor['寄卖'] ?? ('purple' as const);
      return 'gray' as const;
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flex: 1, overflowY: 'auto', paddingTop: '16px' }}>
          {/* Header */}
          <div style={{ padding: `0 ${tokens.space.pagePadding}`, marginBottom: tokens.space.cardGap }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: tokens.color.textTitle, margin: 0 }}>回收清单确认</h2>
            <p style={{ fontSize: '13px', color: tokens.color.textCaption, margin: '2px 0 0' }}>
              已按回收方式拆分为 {demoOrders.length} 份合同，请确认
            </p>
          </div>

          {/* Order cards by type */}
          {demoOrders.map((order) => (
            <Card key={order.orderId} className="mx-5 mb-3">
              {/* Card header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: `1px solid ${tokens.color.divider}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Tag label={order.type} color={typeTagColor(order.type)} />
                </div>
                <span style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption }}>
                  {order.contractId}
                </span>
              </div>

              {/* Product list */}
              {order.products.map((prod, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: idx < order.products.length - 1 ? `1px solid ${tokens.color.divider}` : 'none',
                  }}
                >
                  <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textTitle, fontWeight: 500 }}>
                    {prod.name}
                  </span>
                  <PriceDisplay amount={prod.price} size="sm" />
                </div>
              ))}

              {/* Summary */}
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${tokens.color.divider}` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle }}>合计</span>
                  <PriceDisplay amount={order.totalAmount} size="lg" />
                </div>

                {/* Recovery method description */}
                <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, margin: '8px 0 0' }}>
                  {order.type === '全额竞价回收' && '回收方式: 当场全额打款到账'}
                  {order.type === '定金竞价回收' && (
                    <>
                      定金: <span style={{ fontWeight: 600, color: tokens.color.primary }}>¥{fmt(order.depositAmount ?? 0)}</span>（50%）· 尾款: 总部复检通过后结清
                    </>
                  )}
                  {order.type === '寄卖竞价回收' && '回收方式: 售出后7个工作日内结算打款（扣佣金10%）'}
                </p>
              </div>

              {/* View contract detail link */}
              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  marginTop: '12px', padding: 0, background: 'none', border: 'none',
                  color: tokens.color.primary, fontSize: tokens.font.caption.size,
                  fontWeight: 500, cursor: 'pointer',
                }}
              >
                <FileText size={14} />
                查看合同详情
              </button>
            </Card>
          ))}
        </div>

        {/* Bottom confirm bar */}
        <div style={{
          background: tokens.color.bgCard, borderTop: `1px solid ${tokens.color.border}`,
          padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
        }}>
          <div>
            <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, margin: 0 }}>当场到账金额</p>
            <PriceDisplay amount={grandTotal} size="lg" />
          </div>
          <ActionButton label="确认回收清单" size="md" fullWidth={false} />
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // Step 13: 合同签署 + 打款
  // ═══════════════════════════════════════════════════════════════════
  function renderStep13() {
    const typeTagColor = (type: string) => {
      if (type.includes('全额')) return recoveryTypeColor['全额'] ?? ('green' as const);
      if (type.includes('定金')) return recoveryTypeColor['定金'] ?? ('blue' as const);
      if (type.includes('寄卖')) return recoveryTypeColor['寄卖'] ?? ('purple' as const);
      return 'gray' as const;
    };

    const contractKeyTerms: Record<string, string> = {
      '全额竞价回收': '全额回收当场打款',
      '定金竞价回收': '当场打50%定金，总部复检通过后结尾款',
      '寄卖竞价回收': '售出后7个工作日内结算打款（扣佣金10%）',
    };

    // ── Signed success state ──
    if (signed) {
      const paymentItems = demoOrders.map(o => ({
        label: o.type === '定金竞价回收' ? `${o.contractId}（定金）` : o.contractId,
        amount: o.type === '定金竞价回收' ? (o.depositAmount ?? 0) : o.totalAmount,
        type: o.type,
      }));
      const totalPaying = paymentItems.reduce((s, p) => s + p.amount, 0);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {/* Success header */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 32px 16px', gap: '12px' }}>
              {/* Confetti dots */}
              <div style={{ position: 'relative', width: '100%', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {[...Array(14)].map((_, i) => {
                  const angle = (i * 25.7) * Math.PI / 180;
                  const r = 48 + (i % 3) * 12;
                  const confettiColors = [tokens.color.primary, tokens.color.success, tokens.color.warning, c.purpleAccent];
                  return (
                    <div
                      key={i}
                      className="animate-bounce"
                      style={{
                        position: 'absolute', width: 7, height: 7, borderRadius: '50%',
                        left: `calc(50% + ${Math.cos(angle) * r}px)`,
                        top: `calc(50% + ${Math.sin(angle) * r}px)`,
                        backgroundColor: confettiColors[i % confettiColors.length],
                        animationDelay: `${i * 0.1}s`, animationDuration: '1.5s',
                      }}
                    />
                  );
                })}
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: tokens.color.success, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                  <Check size={36} color={c.white} strokeWidth={3} />
                </div>
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: tokens.color.textTitle, margin: 0 }}>全部合同签署成功</h2>
              <p style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption, textAlign: 'center', margin: 0 }}>
                {demoOrders.length} 份合同已生效，款项正在处理中
              </p>
            </div>

            {/* Payment tracking cards */}
            <div style={{ padding: `0 ${tokens.space.pagePadding}` }}>
              <SectionHeader title="打款进度" />
              {paymentItems.map((item, idx) => (
                <Card key={idx} className="mb-3">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Tag label={demoOrders[idx].type} color={typeTagColor(demoOrders[idx].type)} />
                    <span style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption }}>{item.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <PriceDisplay amount={item.amount} size="lg" />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div className="animate-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: tokens.color.warning }} />
                      <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.warning, fontWeight: 500 }}>打款中...</span>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Total */}
              <Card variant="outlined" className="mb-3">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle }}>当场到账总额</span>
                  <PriceDisplay amount={totalPaying} size="lg" />
                </div>
              </Card>
            </div>

            {/* Share button */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 24px' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', color: tokens.color.primary, fontSize: tokens.font.body.size, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
                <Share2 size={16} />
                分享给好友
              </button>
            </div>
          </div>
        </div>
      );
    }

    // ── Contract signing state ──
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flex: 1, overflowY: 'auto', paddingTop: '16px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: tokens.color.textTitle, padding: `0 ${tokens.space.pagePadding}`, margin: '0 0 4px' }}>合同签署</h2>
          <p style={{ fontSize: '13px', color: tokens.color.textCaption, padding: `0 ${tokens.space.pagePadding}`, margin: '0 0 16px' }}>
            共 {demoOrders.length} 份合同待签署
          </p>

          {/* Contract cards */}
          {demoOrders.map((order, orderIdx) => {
            const displayAmount = order.type === '定金竞价回收' ? (order.depositAmount ?? 0) : order.totalAmount;
            const amountLabel = order.type === '定金竞价回收' ? `定金 ¥${fmt(order.depositAmount ?? 0)}` : `¥${fmt(order.totalAmount)}`;

            return (
              <Card key={order.orderId} className="mx-5 mb-3">
                {/* Contract header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: `1px solid ${tokens.color.divider}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Tag label={order.type} color={typeTagColor(order.type)} />
                  </div>
                  <Tag label="待签署" color="orange" />
                </div>

                {/* Contract info */}
                <DetailRow label="合同编号" value={order.contractId} />
                <DetailRow label="商品数量" value={`${order.products.length} 件`} />
                <DetailRow label="金额" value={<PriceDisplay amount={displayAmount} size="sm" />} showDivider={false} />

                {/* Key terms highlight */}
                <div style={{
                  marginTop: '12px', padding: '10px 12px',
                  borderRadius: tokens.radius.cardInner,
                  background: tokens.color.primaryLight,
                  display: 'flex', alignItems: 'flex-start', gap: '8px',
                }}>
                  <Shield size={14} color={tokens.color.primary} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.primary, fontWeight: 500 }}>
                    {contractKeyTerms[order.type] ?? ''}
                  </span>
                </div>

                {/* Signature area */}
                <div style={{ marginTop: '12px' }}>
                  <p style={{ fontSize: tokens.font.caption.size, fontWeight: 500, color: tokens.color.textBody, margin: '0 0 6px' }}>电子签名</p>
                  <div style={{
                    height: 64, borderRadius: tokens.radius.cardInner,
                    border: `2px dashed ${tokens.color.textDisabled}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: tokens.color.bgPage,
                  }}>
                    <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textDisabled }}>请在此处签名</span>
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Agreement Checkbox */}
          <div style={{ padding: `0 ${tokens.space.pagePadding}`, marginBottom: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: tokens.color.textBody, cursor: 'pointer' }}>
              <div style={{
                width: 20, height: 20, borderRadius: '4px',
                border: `2px solid ${tokens.color.primary}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: tokens.color.primary,
              }}>
                <Check size={14} color={c.white} />
              </div>
              <span>我已阅读并同意全部《回收服务协议》</span>
            </label>
          </div>
        </div>

        {/* Sign All Button */}
        <div style={{
          padding: '16px', background: tokens.color.bgCard,
          borderTop: `1px solid ${tokens.color.border}`, flexShrink: 0,
        }}>
          <ActionButton label="签署全部合同" size="lg" onClick={() => setSigned(true)} />
        </div>
      </div>
    );
  }

  // ─── Shared helpers ────────────────────────────────────────────────
  function renderTimeline(items: { label: string; done: boolean; time: string; active?: boolean }[]) {
    return (
      <div>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px' }}>
            {/* Line + dot */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                className={item.active ? 'animate-pulse' : ''}
                style={{
                  width: 12, height: 12, borderRadius: '50%',
                  border: '2px solid',
                  flexShrink: 0,
                  background: item.done ? tokens.color.success : item.active ? tokens.color.primary : tokens.color.bgCard,
                  borderColor: item.done ? tokens.color.success : item.active ? tokens.color.primary : tokens.color.textDisabled,
                }}
              />
              {i < items.length - 1 && (
                <div style={{ width: 2, height: 32, background: item.done ? tokens.color.success : tokens.color.border }} />
              )}
            </div>
            <div style={{ paddingBottom: '24px' }}>
              <p style={{ fontSize: '13px', fontWeight: item.done ? 500 : 400, color: item.done ? tokens.color.textTitle : tokens.color.textCaption, margin: 0 }}>
                {item.label}
              </p>
              {item.time && <p style={{ fontSize: tokens.font.mini.size, color: tokens.color.textDisabled, margin: '2px 0 0' }}>{item.time}</p>}
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default CustomerView;

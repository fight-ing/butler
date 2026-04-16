import React, { useState } from 'react';
import {
  AlertCircle,
  Clock,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Search,
  User,
  Camera,
  BarChart3,
  Home,
  FileText,
  Database,
} from 'lucide-react';
import {
  PageLayout, Card, Tag, ListItem, StatCard, SectionHeader,
  FilterTabs, ActionButton, InfoBanner, PriceDisplay, tokens,
} from '../../design';

interface PricerViewProps {
  step: number;
}

const PAGE_TABS = [
  { icon: Home, label: '工作台' },
  { icon: FileText, label: '报价' },
  { icon: Database, label: '价格库' },
  { icon: User, label: '我的' },
] as const;

export function PricerView({ step }: PricerViewProps) {
  const [activeTab, setActiveTab] = useState(step === 8 ? 1 : 0);
  const [priceInput, setPriceInput] = useState('95000');
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (step === 8) setActiveTab(1);
  }, [step]);

  const tabContent = [
    <WorkbenchTab key="wb" />,
    <PricingTab
      key="pr"
      priceInput={priceInput}
      setPriceInput={setPriceInput}
      submitted={submitted}
      setSubmitted={setSubmitted}
    />,
    <PriceLibraryTab key="pl" />,
    <ProfileTab key="pf" />,
  ];

  // PageLayout handles tabs, header is inside each tab's content
  return (
    <PageLayout
      title=""
      tabs={[...PAGE_TABS]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {tabContent[activeTab]}
    </PageLayout>
  );
}

/* ========== Workbench Tab ========== */
function WorkbenchTab() {
  const [filterIndex, setFilterIndex] = useState(0);

  const queueItems = [
    { id: 'P003', name: 'Chanel Classic Flap', brand: 'Chanel', grade: 'A', range: '32,000 - 38,000', sla: '3:24', urgent: true },
    { id: 'P005', name: 'Cartier Love 手镯', brand: 'Cartier', grade: 'S', range: '28,000 - 35,000', sla: '5:10', urgent: true },
    { id: 'P009', name: 'Rolex Submariner', brand: 'Rolex', grade: 'B', range: '55,000 - 68,000', sla: '8:45', urgent: false },
    { id: 'P012', name: 'Gucci Dionysus Mini', brand: 'Gucci', grade: 'A', range: '6,000 - 9,000', sla: '12:30', urgent: false },
  ];

  const filters = [{ label: '全部' }, { label: '紧急' }, { label: '普通' }];
  const filtered = filterIndex === 0
    ? queueItems
    : filterIndex === 1
      ? queueItems.filter(i => i.urgent)
      : queueItems.filter(i => !i.urgent);

  return (
    <div style={{ paddingTop: tokens.space.itemGap, paddingBottom: tokens.space.sectionGap }}>
      {/* Header */}
      <div style={{ padding: `0 ${tokens.space.pagePadding}`, marginBottom: tokens.space.pagePadding }}>
        <h1 style={{ fontSize: tokens.font.pageTitle.size, fontWeight: tokens.font.pageTitle.weight, lineHeight: tokens.font.pageTitle.lineHeight, color: tokens.color.textTitle, letterSpacing: '-0.02em', margin: 0 }}>
          报价工作台
        </h1>
        <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginTop: '4px' }}>4月9日 周三</p>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: tokens.space.itemGap, padding: `0 ${tokens.space.cardPadding}`, marginBottom: tokens.space.pagePadding }}>
        <StatCard value={4} label="待报价" icon={AlertCircle} color="red" />
        <StatCard value={12} label="今日已报" icon={CheckCircle2} color="green" />
        <StatCard value="8:32" label="平均耗时" icon={Clock} color="blue" />
      </div>

      {/* Filter pills */}
      <FilterTabs tabs={filters} activeIndex={filterIndex} onChange={setFilterIndex} variant="pill" />

      {/* Urgent alert */}
      <div style={{ padding: `0 ${tokens.space.cardPadding}`, marginBottom: tokens.space.itemGap }}>
        <InfoBanner
          icon={AlertCircle}
          title="2 件紧急待报价"
          subtitle="SLA 倒计时"
          color="orange"
        />
      </div>

      {/* Queue list */}
      {filtered.map((item) => (
        <ListItem
          key={item.id}
          title={item.name}
          tags={[
            { label: item.brand, color: 'blue' },
            { label: `${item.grade}级`, color: 'gray' },
          ]}
          titleRight={
            <Tag
              label={`${item.sla}`}
              color={item.urgent ? 'red' : 'orange'}
              size="sm"
            />
          }
          onClick={() => {}}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
            <PriceDisplay amount={item.range} size="sm" prefix="预估 ¥" />
          </div>
        </ListItem>
      ))}
    </div>
  );
}

/* ========== Pricing Tab ========== */
function PricingTab({
  priceInput,
  setPriceInput,
  submitted,
  setSubmitted,
}: {
  priceInput: string;
  setPriceInput: (v: string) => void;
  submitted: boolean;
  setSubmitted: (v: boolean) => void;
}) {
  const accessories = ['防尘袋', '锁扣', '钥匙', '雨衣', '购买票据'];
  const photoLabels = ['正面', '背面', '底部', '内部', '五金'];

  const otherBids = [
    { name: '赵磊', price: 92000, time: '14:33' },
    { name: '孙鹏', price: 88000, time: '14:31' },
  ];

  return (
    <div style={{ paddingTop: tokens.space.itemGap, paddingBottom: tokens.space.sectionGap }}>
      {/* Header */}
      <div style={{ padding: `0 ${tokens.space.pagePadding}`, marginBottom: tokens.space.pagePadding }}>
        <h1 style={{ fontSize: tokens.font.pageTitle.size, fontWeight: tokens.font.pageTitle.weight, lineHeight: tokens.font.pageTitle.lineHeight, color: tokens.color.textTitle, letterSpacing: '-0.02em', margin: 0 }}>
          商品报价
        </h1>
        <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginTop: '4px' }}>SSD-20260408-00001</p>
      </div>

      {/* Photo carousel */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: `0 ${tokens.space.cardPadding} ${tokens.space.itemGap}`, marginBottom: '8px' }}>
        {photoLabels.map((label, i) => (
          <div
            key={label}
            style={{
              width: 110, height: 110, borderRadius: tokens.radius.card, flexShrink: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              background: i % 2 === 0
                ? `linear-gradient(135deg, ${tokens.color.bgFill} 0%, ${tokens.color.border} 100%)`
                : `linear-gradient(135deg, ${tokens.color.primaryLight} 0%, ${tokens.color.bgFill} 100%)`,
            }}
          >
            <Camera size={24} color={tokens.color.textDisabled} style={{ marginBottom: 6 }} />
            <span style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption, fontWeight: tokens.font.mini.weight }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Product info card */}
      <Card className="mx-4 mb-3">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Tag label="Hermes" color="blue" size="sm" />
          <Tag label="A级" color="green" size="sm" />
        </div>
        <h2 style={{ fontSize: tokens.font.numMedium.size, fontWeight: tokens.font.numMedium.weight, color: tokens.color.textTitle, margin: '0 0 4px' }}>
          Hermes Birkin 30
        </h2>
        <p style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption, margin: 0 }}>
          金棕色 Togo牛皮 · 成色 A级
        </p>
      </Card>

      {/* Accessories card */}
      <Card className="mx-4 mb-3">
        <SectionHeader title="附件清单" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: `0 ${tokens.space.pagePadding}` }}>
          {accessories.map((acc) => (
            <Tag key={acc} label={acc} color="gray" />
          ))}
        </div>
      </Card>

      {/* Recent 15-day transactions */}
      <Card className="mx-4 mb-3">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: tokens.space.itemGap }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BarChart3 size={16} color={tokens.color.primary} />
            <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle }}>近15天同款成交</span>
          </div>
          <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>共10笔 · 均价¥94,500</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            { date: '04-08', channel: '暗拍', grade: 'A', price: 96000 },
            { date: '04-07', channel: '直播', grade: 'S', price: 102000 },
            { date: '04-06', channel: '暗拍', grade: 'A', price: 93000 },
            { date: '04-05', channel: '组货', grade: 'B', price: 85000 },
            { date: '04-04', channel: '暗拍', grade: 'A', price: 95000 },
            { date: '04-03', channel: '直播', grade: 'A', price: 97000 },
            { date: '04-01', channel: '暗拍', grade: 'S', price: 101000 },
            { date: '03-30', channel: '组货', grade: 'A', price: 91000 },
            { date: '03-28', channel: '直播', grade: 'B', price: 88000 },
            { date: '03-26', channel: '暗拍', grade: 'A', price: 94000 },
          ].map((tx, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: i < 9 ? `1px solid ${tokens.color.divider}` : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, fontVariantNumeric: 'tabular-nums', width: 40 }}>{tx.date}</span>
                <Tag label={tx.channel} color={tx.channel === '直播' ? 'orange' : tx.channel === '暗拍' ? 'blue' : 'gray'} size="sm" />
                <Tag label={`${tx.grade}级`} color={tx.grade === 'S' ? 'green' : tx.grade === 'A' ? 'blue' : 'gray'} size="sm" />
              </div>
              <PriceDisplay amount={tx.price} size="sm" />
            </div>
          ))}
        </div>
      </Card>

      {/* Floating price input + submit */}
      {submitted ? (
        <>
          <Card className="mx-4 mb-3">
            <div style={{ textAlign: 'center', padding: '4px 0' }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', background: tokens.color.successLight,
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
              }}>
                <CheckCircle2 size={28} color={tokens.color.success} />
              </div>
              <p style={{ fontSize: tokens.font.bodyLarge.size, fontWeight: 600, color: tokens.color.textTitle }}>报价已提交</p>
              <div style={{ marginTop: '4px' }}>
                <PriceDisplay amount={Number(priceInput)} size="lg" highlight />
              </div>
            </div>
          </Card>

          {/* Other bids */}
          <Card className="mx-4 mb-3">
            <SectionHeader title="其他报价师出价" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: `0 ${tokens.space.pagePadding}` }}>
              {otherBids.map((bid) => (
                <div
                  key={bid.name}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: tokens.color.bgPage, borderRadius: tokens.radius.card, padding: '12px 14px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', background: tokens.color.primaryLight,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <User size={14} color={tokens.color.primary} />
                    </div>
                    <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textTitle, fontWeight: 500 }}>{bid.name}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <PriceDisplay amount={bid.price} size="sm" />
                    <p style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption, margin: '2px 0 0' }}>{bid.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      ) : (
        <div style={{
          position: 'sticky', bottom: 0, left: 0, right: 0, zIndex: 10,
          background: `${tokens.color.bgCard}F2`,
          backdropFilter: 'blur(16px)',
          borderTop: `1px solid ${tokens.color.divider}`,
          padding: `${tokens.space.itemGap} ${tokens.space.pagePadding}`,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: tokens.space.inlineGap,
            background: tokens.color.bgPage, border: `2px solid ${tokens.color.primary}`,
            borderRadius: tokens.radius.card, padding: '8px 16px',
            marginBottom: tokens.space.inlineGap,
          }}>
            <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption }}>我的报价</span>
            <span style={{ fontSize: '20px', color: tokens.color.primary, fontWeight: 500 }}>¥</span>
            <input
              type="text"
              value={Number(priceInput).toLocaleString()}
              onChange={(e) => setPriceInput(e.target.value.replace(/[^0-9]/g, ''))}
              style={{
                fontSize: '28px', fontWeight: 700, color: tokens.color.primary,
                textAlign: 'right', flex: 1, outline: 'none', background: 'transparent',
                border: 'none', fontVariantNumeric: 'tabular-nums', fontFamily: tokens.font.family,
              }}
            />
          </div>
          <ActionButton label="提交报价" variant="primary" size="md" onClick={() => setSubmitted(true)} />
        </div>
      )}
    </div>
  );
}

/* ========== Price Library Tab ========== */
function PriceLibraryTab() {
  const priceData = [
    { brand: 'Hermes', model: 'Birkin 30 Togo', avg: 94500, trend: 'up' as const, change: '+2.3%' },
    { brand: 'Chanel', model: 'Classic Flap Medium', avg: 35200, trend: 'up' as const, change: '+1.8%' },
    { brand: 'Louis Vuitton', model: 'Neverfull MM', avg: 8500, trend: 'down' as const, change: '-0.5%' },
    { brand: 'Rolex', model: 'Submariner Date', avg: 62000, trend: 'down' as const, change: '-1.2%' },
    { brand: 'Cartier', model: 'Love Bracelet', avg: 31500, trend: 'up' as const, change: '+0.8%' },
  ];

  return (
    <div style={{ paddingTop: tokens.space.itemGap, paddingBottom: tokens.space.sectionGap }}>
      <div style={{ padding: `0 ${tokens.space.pagePadding}`, marginBottom: tokens.space.pagePadding }}>
        <h1 style={{ fontSize: tokens.font.pageTitle.size, fontWeight: tokens.font.pageTitle.weight, lineHeight: tokens.font.pageTitle.lineHeight, color: tokens.color.textTitle, letterSpacing: '-0.02em', margin: 0 }}>
          价格库
        </h1>
        <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginTop: '4px' }}>实时市场行情</p>
      </div>

      {/* Search bar */}
      <div style={{ padding: `0 ${tokens.space.cardPadding}`, marginBottom: tokens.space.cardPadding }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} color={tokens.color.textDisabled} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="搜索品牌、型号..."
            style={{
              width: '100%', height: 44, paddingLeft: 40, paddingRight: 16,
              background: tokens.color.bgCard, borderRadius: tokens.radius.card,
              fontSize: tokens.font.body.size, color: tokens.color.textTitle,
              border: 'none', outline: 'none', boxShadow: tokens.shadow.card,
              fontFamily: tokens.font.family,
            }}
          />
        </div>
      </div>

      {/* Price list */}
      {priceData.map((item) => (
        <ListItem
          key={item.model}
          title={item.model}
          tags={[{ label: item.brand, color: 'gray' as const }]}
          onClick={() => {}}
          titleRight={
            <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div>
                <PriceDisplay amount={item.avg} size="sm" />
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '2px',
                  fontSize: tokens.font.mini.size, fontWeight: 500,
                  color: item.trend === 'up' ? tokens.color.success : tokens.color.danger,
                }}>
                  {item.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {item.change}
                </div>
              </div>
            </div>
          }
        />
      ))}
    </div>
  );
}

/* ========== Profile Tab ========== */
function ProfileTab() {
  return (
    <div style={{ paddingTop: tokens.space.itemGap, paddingBottom: tokens.space.sectionGap }}>
      {/* Profile header */}
      <div style={{ padding: `8px ${tokens.space.pagePadding} ${tokens.space.sectionGap}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: `linear-gradient(to bottom right, ${tokens.color.primary}, ${tokens.color.primary}BB)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: tokens.color.bgCard, fontSize: '20px', fontWeight: 700 }}>刘</span>
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: tokens.color.textTitle, margin: 0 }}>刘洋</h2>
            <p style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption, margin: '2px 0 0' }}>资深报价师</p>
            <p style={{ fontSize: tokens.font.mini.size, color: tokens.color.textDisabled, margin: '2px 0 0' }}>工号 U005</p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: tokens.space.itemGap, padding: `0 ${tokens.space.cardPadding}`, marginBottom: tokens.space.pagePadding }}>
        <StatCard value="12件" label="今日报价" icon={FileText} color="blue" />
        <StatCard value="94%" label="本月准确率" icon={CheckCircle2} color="green" />
        <StatCard value="286件" label="本月报价" icon={Database} color="blue" />
        <StatCard value="8分32秒" label="平均耗时" icon={Clock} color="orange" />
      </div>

      {/* Menu items */}
      {['报价记录', '价格预警设置', '业绩统计', '系统设置'].map((item) => (
        <ListItem
          key={item}
          title={item}
          onClick={() => {}}
        />
      ))}
    </div>
  );
}

export default PricerView;

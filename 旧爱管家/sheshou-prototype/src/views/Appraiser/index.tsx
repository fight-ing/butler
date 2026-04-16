import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  Circle,
  Camera,
  ScanLine,
  Navigation,
  Package,
  User,
  Briefcase,
  FileText,
  ArrowRight,
  AlertCircle,
  Shield,
  Star,
  TrendingUp,
  ClipboardList,
  ChevronRight,
} from 'lucide-react';
import { products } from '../../mock/products';
import { appointments } from '../../mock/appointments';
import { getApprovalFlow, demoOrders } from '../../mock/postCollectionFlow';
import {
  PageLayout,
  Card,
  Tag,
  ListItem,
  StatCard,
  SectionHeader,
  FilterTabs,
  ActionButton,
  InfoBanner,
  DetailRow,
  StepIndicator,
  PriceDisplay,
  ProductCardHorizontal,
  tokens,
  recoveryTypeColor,
} from '../../design';

interface AppraiserViewProps {
  step: number;
}

type TabKey = 'workbench' | 'task' | 'orders' | 'profile';

export const AppraiserView: React.FC<AppraiserViewProps> = ({ step }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('workbench');
  const [paymentDone, setPaymentDone] = useState(false);

  const tabKeys: TabKey[] = ['workbench', 'task', 'orders', 'profile'];
  const tabItems: { icon: typeof Briefcase; label: string }[] = [
    { icon: Briefcase, label: '工作台' },
    { icon: ClipboardList, label: '任务' },
    { icon: Package, label: '回收单' },
    { icon: User, label: '我的' },
  ];

  useEffect(() => {
    if (step >= 4 && step <= 13) {
      setActiveTab('task');
    } else {
      setActiveTab('workbench');
    }
  }, [step]);

  useEffect(() => {
    setPaymentDone(false);
  }, [step]);

  const currentAppointment = appointments[0];
  const birkin = products[0];
  const chanelCF = products[1];
  const chanelBoy = products[2];

  const getWorkflowStep = (): string => {
    if (step <= 5) return 'A';
    if (step <= 7) return 'B';
    if (step <= 9) return 'C';
    if (step === 10) return 'D';
    if (step === 11) return 'E';
    if (step === 12) return 'F';
    if (step === 13) return 'G';
    return 'A';
  };

  const workflowStepLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const currentWorkflow = getWorkflowStep();
  const currentWorkflowIdx = workflowStepLabels.indexOf(currentWorkflow);

  // ============================================================
  // TAB: workbench
  // ============================================================
  const renderWorkbench = () => (
    <PageLayout
      title="今日任务"
      subtitle="4月9日 周三"
      tabs={tabItems}
      activeTab={tabKeys.indexOf(activeTab)}
      onTabChange={(i) => setActiveTab(tabKeys[i])}
    >
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: tokens.space.inlineGap, padding: `12px ${tokens.space.pagePadding}` }}>
        <StatCard value={2} label="待出发" icon={Navigation} color="blue" />
        <StatCard value={1} label="进行中" icon={Clock} color="orange" />
        <StatCard value={3} label="已完成" icon={CheckCircle} color="green" />
      </div>

      {/* Task list */}
      <SectionHeader title="待处理任务" />

      <ListItem
        title="赵太太 · 上门回收"
        titleRight={<Tag label="14:00" color="blue" size="sm" />}
        subtitle="Hermes x1, Chanel x2 · 静安区南京西路"
        tags={[{ label: '已派单', color: 'orange' }]}
      />

      <ListItem
        title="钱先生 · 到店回收"
        titleRight={<Tag label="15:00" color="orange" size="sm" />}
        subtitle="Rolex x2, Cartier x1 · 奢收多静安门店"
        tags={[{ label: '服务中', color: 'orange' }]}
      />

      <ListItem
        title="马女士 · 上门回收"
        titleRight={<Tag label="10:00" color="green" size="sm" />}
        subtitle="LV Neverfull x2 · 黄浦区淮海中路"
        tags={[{ label: '已完成', color: 'green' }]}
      />

      <div style={{ height: 16 }} />
    </PageLayout>
  );

  // ============================================================
  // Step A: Task info
  // ============================================================
  const renderStepA = () => (
    <div style={{ padding: tokens.space.pagePadding, display: 'flex', flexDirection: 'column', gap: tokens.space.cardGap }}>
      {/* Task header card */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: tokens.space.cardGap }}>
          <Tag label={currentAppointment.id} color="blue" />
          <Tag label={step === 4 ? '待接单' : step === 5 ? '已出发' : '已派单'} color="orange" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.cardGap }}>
          <div style={{
            width: 44, height: 44, background: tokens.color.primaryLight, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <User size={20} color={tokens.color.primary} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: tokens.font.bodyLarge.size, fontWeight: tokens.font.bodyLarge.weight, color: tokens.color.textTitle, margin: 0 }}>
              {currentAppointment.customerName}
            </p>
            <p style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption, margin: '2px 0 0' }}>{currentAppointment.phone}</p>
          </div>
          <div style={{
            width: 40, height: 40, background: tokens.color.successLight, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Phone size={16} color={tokens.color.success} />
          </div>
        </div>
      </Card>

      {/* Address & time card */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: tokens.space.cardGap, marginBottom: tokens.space.cardGap }}>
          <div style={{
            width: 32, height: 32, background: tokens.color.primaryLight, borderRadius: tokens.radius.tag,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
          }}>
            <MapPin size={16} color={tokens.color.primary} />
          </div>
          <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textBody, lineHeight: '20px' }}>
            {currentAppointment.address}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.cardGap }}>
          <div style={{
            width: 32, height: 32, background: tokens.color.primaryLight, borderRadius: tokens.radius.tag,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Clock size={16} color={tokens.color.primary} />
          </div>
          <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textBody }}>
            {currentAppointment.scheduledDate} {currentAppointment.timeSlot}
          </span>
        </div>
      </Card>

      {/* Product summary card */}
      <Card>
        <h3 style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle, margin: `0 0 ${tokens.space.cardGap}` }}>预估商品</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.inlineGap }}>
          {currentAppointment.items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: tokens.color.bgPage, borderRadius: tokens.radius.cardInner,
                padding: '10px 12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.inlineGap }}>
                <Package size={16} color={tokens.color.textCaption} />
                <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textBody }}>
                  {item.brand} · {item.category}
                </span>
              </div>
              <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textTitle, fontWeight: 500 }}>x{item.estimatedCount}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Navigation banner for step 5 */}
      {step === 5 && (
        <InfoBanner
          icon={Navigation}
          title="导航中 · 预计15分钟到达"
          subtitle="距恒隆广场 3.2 公里"
          color="green"
        />
      )}

      {/* Action button */}
      <ActionButton
        label={step === 4 ? '确认接单' : '确认出发'}
        icon={step === 4 ? undefined : MapPin}
        variant="primary"
      />
    </div>
  );

  // ============================================================
  // Step B: Scan + Photo + AI Recognition
  // ============================================================
  const renderStepB = () => {
    const gradeOptions: Array<'S' | 'A' | 'B' | 'C'> = ['S', 'A', 'B', 'C'];
    const accessories = [
      { name: '防尘袋', checked: true }, { name: '锁扣', checked: true },
      { name: '钥匙', checked: true }, { name: '雨衣', checked: true },
      { name: '购买票据', checked: true }, { name: '盒子', checked: false }, { name: '保卡', checked: false },
    ];

    // Photo template: each angle supports multiple photos + parameters
    const photoTemplate = [
      { id: 'front', name: '正面', required: 1, taken: 1, params: [] },
      { id: 'back', name: '背面', required: 1, taken: 1, params: [] },
      { id: 'bottom', name: '底部', required: 1, taken: 1, params: [] },
      { id: 'interior', name: '内部', required: 2, taken: 2, params: [{ label: '内袋', done: true }, { label: '拉链区', done: true }] },
      { id: 'hardware', name: '五金', required: 2, taken: 2, params: [{ label: '锁扣', done: true }, { label: '铆钉', done: true }] },
      { id: 'logo', name: '标识', required: 1, taken: 1, params: [] },
      { id: 'side', name: '侧面', required: 1, taken: 0, params: [] },
      { id: 'wear', name: '磨损', required: 0, taken: 2, params: [
        { label: '转角磨损', done: true }, { label: '底部划痕', done: true },
      ]},
    ];
    const totalRequired = photoTemplate.reduce((s, p) => s + Math.max(p.required, p.taken), 0);
    const totalTaken = photoTemplate.reduce((s, p) => s + p.taken, 0);

    return (
      <div style={{ padding: tokens.space.pagePadding, display: 'flex', flexDirection: 'column', gap: tokens.space.cardGap }}>
        {/* Scan QR — compact */}
        <Card padding="sm">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle size={16} color={tokens.color.success} />
              <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle }}>扫码绑定</span>
              <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.success, fontWeight: 500 }}>SSD-20260408-00001</span>
            </div>
            <Tag label="已绑定" color="green" size="sm" />
          </div>
        </Card>

        {/* Main photo + AI recognition — compact inline */}
        <Card padding="sm">
          <div style={{ display: 'flex', gap: tokens.space.itemGap }}>
            <div style={{
              width: 64, height: 64, borderRadius: tokens.radius.cardInner, flexShrink: 0,
              background: 'linear-gradient(135deg, #F5EDE3, #E8DDD0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              <span style={{ fontSize: 24 }}>👜</span>
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 16,
                background: tokens.color.success,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '8px', color: '#FFF', fontWeight: 600 }}>AI识别</span>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle }}>Hermès Birkin 30</span>
                <Tag label="98%" color="blue" size="sm" />
              </div>
              <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, margin: 0 }}>Togo牛皮 · 金棕色 · 包袋</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <Tag label="包袋模板" color="blue" size="sm" />
                <span style={{ fontSize: '9px', color: tokens.color.textCaption }}>AI填写 · 可修改</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Product info — compact editable */}
        <Card padding="sm">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              { label: '品牌', value: 'Hermès' }, { label: '系列', value: 'Birkin' },
              { label: '型号', value: 'Birkin 30' }, { label: '材质', value: 'Togo牛皮' },
              { label: '颜色', value: '金棕色' },
            ].map((f) => (
              <div key={f.label} style={{ display: 'flex', alignItems: 'center', height: 30 }}>
                <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, width: 36, flexShrink: 0 }}>{f.label}</span>
                <div style={{
                  flex: 1, height: 30, padding: '0 8px', borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  fontSize: tokens.font.caption.size, background: tokens.color.bgCard,
                  border: `1px solid ${tokens.color.border}`, color: tokens.color.textTitle,
                }}>
                  <span>{f.value}</span>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M9 1.5L10.5 3 4 9.5H2.5V8L9 1.5z" stroke={tokens.color.textDisabled} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', height: 30 }}>
              <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, width: 36, flexShrink: 0 }}>成色</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {gradeOptions.map((g) => (
                  <button key={g} style={{
                    width: 30, height: 26, borderRadius: 6, fontSize: tokens.font.caption.size, fontWeight: 500,
                    background: g === 'A' ? tokens.color.primary : tokens.color.bgPage,
                    color: g === 'A' ? '#FFF' : tokens.color.textCaption,
                    border: g === 'A' ? 'none' : `1px solid ${tokens.color.border}`, cursor: 'pointer',
                  }}>{g}</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 2 }}>
              {accessories.map((a) => (
                <span key={a.name} style={{
                  padding: '2px 7px', borderRadius: 6, fontSize: '10px',
                  background: a.checked ? tokens.color.primaryLight : tokens.color.bgPage,
                  color: a.checked ? tokens.color.primary : tokens.color.textDisabled,
                  border: `1px solid ${a.checked ? tokens.color.primary + '33' : tokens.color.divider}`,
                }}>
                  {a.checked ? '✓ ' : ''}{a.name}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Photo template — multi-photo per angle with parameters */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: tokens.space.itemGap }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Camera size={16} color={tokens.color.primary} />
              <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle }}>报价拍照</span>
            </div>
            <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>
              已拍 <span style={{ fontWeight: 600, color: tokens.color.primary }}>{totalTaken}</span>/{totalRequired}
            </span>
          </div>
          {/* Progress bar */}
          <div style={{ height: 4, background: tokens.color.bgFill, borderRadius: 2, marginBottom: tokens.space.itemGap }}>
            <div style={{ height: 4, borderRadius: 2, background: tokens.color.primary, width: `${(totalTaken / totalRequired) * 100}%`, transition: tokens.motion.normal }} />
          </div>
          {/* Photo angle list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {photoTemplate.map((angle) => {
              const isDone = angle.taken >= Math.max(angle.required, 1);
              const isWear = angle.id === 'wear';
              return (
                <div key={angle.id} style={{
                  borderRadius: tokens.radius.cardInner,
                  border: `1px solid ${isDone ? tokens.color.success + '40' : tokens.color.border}`,
                  background: isDone ? tokens.color.successLight + '40' : tokens.color.bgCard,
                  overflow: 'hidden',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {isDone ? <CheckCircle size={14} color={tokens.color.success} /> : <div style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${tokens.color.textDisabled}` }} />}
                      <span style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: isDone ? tokens.color.success : tokens.color.textTitle }}>{angle.name}</span>
                      {isWear && <Tag label="可选" color="gray" size="sm" />}
                      {angle.required > 1 && <Tag label={`需${angle.required}张`} color="blue" size="sm" />}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption }}>{angle.taken}/{Math.max(angle.required, angle.taken)}张</span>
                      {!isDone && angle.required > 0 && (
                        <button style={{
                          width: 26, height: 26, borderRadius: '50%', background: tokens.color.primary,
                          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <Camera size={12} color="#FFF" />
                        </button>
                      )}
                    </div>
                  </div>
                  {angle.params.length > 0 && (
                    <div style={{ padding: '0 10px 8px', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {angle.params.map((p) => (
                        <div key={p.label} style={{
                          display: 'flex', alignItems: 'center', gap: 3, padding: '3px 8px', borderRadius: 6,
                          background: p.done ? tokens.color.successLight : tokens.color.bgFill,
                          border: `1px solid ${p.done ? tokens.color.success + '30' : tokens.color.border}`,
                        }}>
                          {p.done ? <CheckCircle size={10} color={tokens.color.success} /> : <Camera size={10} color={tokens.color.textDisabled} />}
                          <span style={{ fontSize: '10px', color: p.done ? tokens.color.success : tokens.color.textCaption, fontWeight: 500 }}>{p.label}</span>
                        </div>
                      ))}
                      {isWear && (
                        <button style={{
                          display: 'flex', alignItems: 'center', gap: 3, padding: '3px 8px', borderRadius: 6,
                          background: tokens.color.bgFill, border: `1px dashed ${tokens.color.textDisabled}`,
                          fontSize: '10px', color: tokens.color.textCaption, cursor: 'pointer',
                        }}>
                          + 添加磨损点
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        <ActionButton label="提交竞价" icon={ArrowRight} variant="primary" />
      </div>
    );
  };

  // ============================================================
  // Step C: Bidding
  // ============================================================
  const renderStepC = () => {
    const finalPrice = birkin.pricingResult.highestBid;

    if (step === 8) {
      return (
        <div style={{ padding: tokens.space.pagePadding, display: 'flex', flexDirection: 'column', gap: tokens.space.cardGap }}>
          {/* Countdown banner */}
          <div style={{
            background: tokens.color.primary, borderRadius: tokens.radius.card,
            padding: tokens.space.pagePadding, color: '#FFF',
            boxShadow: tokens.shadow.button,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: tokens.font.body.size, fontWeight: 500 }}>竞价倒计时</span>
              <span style={{ fontSize: tokens.font.numLarge.size, fontWeight: tokens.font.numLarge.weight, fontFamily: 'monospace', letterSpacing: '0.05em', fontVariantNumeric: 'tabular-nums' }}>07:42</span>
            </div>
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.2)', borderRadius: tokens.radius.tagPill, height: 6 }}>
              <div style={{ background: '#FFF', borderRadius: tokens.radius.tagPill, height: 6, width: '77%', transition: tokens.motion.normal }} />
            </div>
            <p style={{ fontSize: tokens.font.caption.size, opacity: 0.8, marginTop: 8, margin: '8px 0 0' }}>已有 38 个商家出价</p>
          </div>

          {/* Live bids */}
          <Card>
            <h3 style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle, margin: `0 0 ${tokens.space.cardGap}` }}>实时出价</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {birkin.pricingResult.bidders.map((bid, idx) => (
                <div
                  key={bid.name}
                  style={{
                    borderRadius: tokens.radius.cardInner, padding: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: idx === 0 ? tokens.color.warningLight : tokens.color.bgPage,
                    border: idx === 0 ? `1px solid ${tokens.color.warning}4D` : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: tokens.font.caption.size, fontWeight: 700,
                      background: idx === 0 ? tokens.color.warning : tokens.color.border,
                      color: idx === 0 ? '#FFF' : tokens.color.textCaption,
                    }}>
                      {idx === 0 ? (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                        </span>
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <div>
                      <p style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle, margin: 0 }}>{bid.name}</p>
                      <p style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption, margin: '2px 0 0' }}>{bid.city}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <PriceDisplay amount={bid.price} size={idx === 0 ? 'lg' : 'md'} highlight={idx === 0} />
                    {idx === 0 && (
                      <div style={{ marginTop: 4 }}>
                        <Tag label="TOP" color="orange" size="sm" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: tokens.space.cardGap, fontSize: tokens.font.caption.size, color: tokens.color.textCaption, margin: `${tokens.space.cardGap} 0 0` }}>
              还有 35 个商家正在出价...
            </p>
          </Card>

          {/* Product info */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.cardGap }}>
              <div style={{
                width: 56, height: 56, background: tokens.color.bgPage,
                borderRadius: tokens.radius.cardInner,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Package size={24} color={tokens.color.textDisabled} />
              </div>
              <div>
                <p style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle, margin: 0 }}>{birkin.brand} {birkin.model}</p>
                <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, margin: '2px 0 0' }}>{birkin.material} · {birkin.color} · 成色{birkin.conditionGrade}</p>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    // step === 9: bidding complete — confirm with customer
    return (
      <div style={{ padding: tokens.space.pagePadding, display: 'flex', flexDirection: 'column', gap: tokens.space.cardGap }}>
        {/* Result card */}
        <div style={{
          background: `linear-gradient(135deg, ${tokens.color.warning}, #FF9A2E)`,
          borderRadius: tokens.radius.card, padding: tokens.space.pagePadding,
          color: '#FFF', textAlign: 'center',
          boxShadow: '0 4px 16px rgba(255,125,0,0.3)',
        }}>
          <CheckCircle size={28} style={{ margin: '0 auto 6px' }} />
          <p style={{ fontSize: tokens.font.body.size, fontWeight: 500, margin: '0 0 4px' }}>竞价完成 · 最终最高价</p>
          <span style={{ fontSize: '32px', fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
            ¥{finalPrice.toLocaleString()}
          </span>
          <p style={{ fontSize: tokens.font.caption.size, opacity: 0.8, margin: '4px 0 0' }}>42个商家参与 · 最高出价来自上海</p>
        </div>

        {/* Single product confirmation — one at a time */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: tokens.space.itemGap }}>
            <h3 style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle, margin: 0 }}>
              与客户确认回收方式
            </h3>
            <Tag label="第1/3件" color="blue" size="sm" />
          </div>

          <div style={{
            borderRadius: tokens.radius.cardInner, border: `1px solid ${tokens.color.border}`,
            padding: tokens.space.cardPadding,
          }}>
            <div style={{ display: 'flex', gap: tokens.space.itemGap, marginBottom: tokens.space.itemGap }}>
              <div style={{
                width: 56, height: 56, borderRadius: tokens.radius.cardInner, flexShrink: 0,
                background: 'linear-gradient(135deg, #F5EDE3, #E8DDD0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
              }}>👜</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle }}>Hermès Birkin 30</span>
                  <Tag label="A级" color="blue" size="sm" />
                </div>
                <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, margin: 0 }}>Togo牛皮 · 金棕色</p>
                <div style={{ marginTop: 4 }}>
                  <PriceDisplay amount={finalPrice} size="lg" highlight />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button style={{
                width: '100%', height: 44, borderRadius: tokens.radius.button,
                background: tokens.color.success, color: '#FFF',
                fontSize: tokens.font.body.size, fontWeight: 600, border: 'none', cursor: 'pointer',
              }}>客户确认回收 ¥{finalPrice.toLocaleString()}</button>
              <button style={{
                width: '100%', height: 44, borderRadius: tokens.radius.button,
                background: tokens.color.purpleLight, color: tokens.color.purple,
                fontSize: tokens.font.body.size, fontWeight: 500,
                border: `1px solid ${tokens.color.purple}33`, cursor: 'pointer',
              }}>客户选择寄卖竞价回收</button>
            </div>
          </div>

          {/* Progress */}
          <div style={{ marginTop: tokens.space.itemGap }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginBottom: 4 }}>
              <span>竞价进度</span>
              <span>1/3 件已完成</span>
            </div>
            <div style={{ height: 4, background: tokens.color.bgFill, borderRadius: 2 }}>
              <div style={{ height: 4, borderRadius: 2, background: tokens.color.primary, width: '33%' }} />
            </div>
          </div>
        </Card>

        {/* Next step hint */}
        <InfoBanner
          title="确认后继续下一件商品竞价"
          subtitle="全部确认后进入鉴定环节"
          color="blue"
        />
      </div>
    );
  };

  // ============================================================
  // Step D: Authentication Photos
  // ============================================================
  const renderStepD = () => {
    const productAuthData = [
      {
        product: birkin,
        points: [
          { name: '刻印编码', done: true },
          { name: '五金Logo', done: true },
          { name: '拉链头', done: true },
          { name: '走线细节', done: true },
          { name: '皮质纹理', done: true },
          { name: '内标', done: true },
          { name: '锁扣', done: true },
          { name: '钥匙', done: true },
        ],
      },
      {
        product: chanelCF,
        points: [
          { name: '五金Logo', done: true },
          { name: '菱格纹', done: true },
          { name: '走线细节', done: true },
          { name: '内标序列号', done: true },
          { name: '翻盖卡扣', done: true },
          { name: '链条刻印', done: true },
        ],
      },
      {
        product: chanelBoy,
        points: [
          { name: '五金Logo', done: true },
          { name: '锁扣细节', done: true },
          { name: '走线细节', done: true },
          { name: '内标序列号', done: true },
          { name: '链条刻印', done: false },
          { name: '背面铆钉', done: false },
        ],
      },
    ];

    const allDone = productAuthData.every((p) => p.points.every((pt) => pt.done));
    const totalPoints = productAuthData.reduce((sum, p) => sum + p.points.length, 0);
    const donePoints = productAuthData.reduce((sum, p) => sum + p.points.filter((pt) => pt.done).length, 0);

    return (
      <div style={{ padding: tokens.space.pagePadding, display: 'flex', flexDirection: 'column', gap: tokens.space.cardGap }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: tokens.font.sectionTitle.size, fontWeight: 600, color: tokens.color.textTitle, margin: 0 }}>鉴定拍照</h3>
          <Tag label={`${donePoints}/${totalPoints} 已完成`} color={allDone ? 'green' : 'orange'} size="sm" />
        </div>

        {productAuthData.map(({ product, points }) => {
          const productDone = points.every((p) => p.done);
          const productDoneCount = points.filter((p) => p.done).length;

          return (
            <Card key={product.id}>
              {/* Product header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: tokens.space.cardGap,
                marginBottom: tokens.space.cardPadding,
                background: tokens.color.bgPage, borderRadius: tokens.radius.cardInner,
                padding: 12,
              }}>
                <div style={{
                  width: 44, height: 44, background: tokens.color.bgCard,
                  borderRadius: tokens.radius.cardInner,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${tokens.color.border}`,
                }}>
                  <Package size={22} color={tokens.color.textDisabled} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle, margin: 0 }}>
                    {product.brand} {product.model}
                  </p>
                  <p style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption, margin: '2px 0 0' }}>
                    {product.uniqueCode}
                  </p>
                </div>
                <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>
                  {productDoneCount}/{points.length}
                </span>
              </div>

              {/* Photo checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {points.map((point) => (
                  <div
                    key={point.name}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 12px', borderRadius: tokens.radius.cardInner,
                      background: point.done
                        ? tokens.color.successLight
                        : tokens.color.bgPage,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {point.done ? (
                        <CheckCircle size={18} color={tokens.color.success} />
                      ) : (
                        <Circle size={18} color={tokens.color.textDisabled} />
                      )}
                      <span style={{
                        fontSize: tokens.font.body.size,
                        color: point.done ? tokens.color.textTitle : tokens.color.textCaption,
                        fontWeight: point.done ? 500 : 400,
                      }}>
                        {point.name}
                      </span>
                    </div>
                    {point.done ? (
                      <Tag label="已拍" color="green" size="sm" />
                    ) : (
                      <button style={{
                        display: 'flex', alignItems: 'center', gap: 4,
                        fontSize: tokens.font.mini.size, fontWeight: 500,
                        color: tokens.color.primary, background: tokens.color.primaryLight,
                        padding: '2px 8px', borderRadius: tokens.radius.tagPill,
                        border: 'none', cursor: 'pointer',
                      }}>
                        <Camera size={12} />
                        拍照
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Per-product submitted banner */}
              {productDone && (
                <div style={{
                  marginTop: tokens.space.cardPadding,
                  background: tokens.color.successLight,
                  borderRadius: tokens.radius.cardInner,
                  padding: '8px 12px',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <CheckCircle size={14} color={tokens.color.success} />
                  <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.success, fontWeight: 500 }}>
                    鉴定照片已提交
                  </span>
                </div>
              )}
            </Card>
          );
        })}

        {/* Submission status banner */}
        {allDone && (
          <InfoBanner
            title="鉴定照片已提交 · 等待图鉴鉴定师审核"
            subtitle="已推送给: A鉴定师 周婷(P3) + B鉴定师 吴昊(P3)"
            color="blue"
          />
        )}

        <ActionButton label="提交鉴定照片" icon={ArrowRight} variant="primary" />
      </div>
    );
  };

  // ============================================================
  // Step E: Authentication Results
  // ============================================================
  const renderStepE = () => (
    <div style={{ padding: tokens.space.pagePadding, display: 'flex', flexDirection: 'column', gap: tokens.space.cardGap }}>
      {/* Product 1: Birkin - passed with full detail */}
      <Card padding="none">
        <div style={{
          background: tokens.color.success, padding: tokens.space.cardPadding,
          display: 'flex', alignItems: 'center', gap: tokens.space.cardGap,
          borderRadius: `${tokens.radius.card} ${tokens.radius.card} 0 0`,
        }}>
          <div style={{
            width: 44, height: 44, background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CheckCircle size={24} color="#FFF" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: tokens.font.sectionTitle.size, fontWeight: 700, color: '#FFF', margin: 0 }}>鉴定通过 · 正品</p>
            <p style={{ fontSize: tokens.font.caption.size, color: 'rgba(255,255,255,0.8)', margin: '2px 0 0' }}>{birkin.brand} {birkin.model}</p>
          </div>
          <Tag label="正品" color="green" size="sm" />
        </div>
        <div style={{ padding: tokens.space.cardPadding, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { role: 'A鉴定师', name: '周婷(P3)', result: '正品', color: 'green' as const },
            { role: 'B鉴定师', name: '吴昊(P3)', result: '正品', color: 'green' as const },
          ].map((row) => (
            <div key={row.role} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: tokens.color.bgPage, borderRadius: tokens.radius.cardInner,
              padding: '10px 12px',
            }}>
              <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption }}>{row.role}</span>
              <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textBody, fontWeight: 500 }}>{row.name}</span>
              <Tag label={row.result} color={row.color} size="sm" />
            </div>
          ))}
          <DetailRow
            label="最终结论"
            value={<span style={{ fontWeight: 700, color: tokens.color.success }}>正品（双真直接通过）</span>}
            showDivider={false}
          />
        </div>
      </Card>

      {/* Product 2: Chanel CF - passed, compact row */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.cardGap }}>
          <CheckCircle size={20} color={tokens.color.success} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle, margin: 0 }}>{chanelCF.brand} {chanelCF.model}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4, fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>
              <span>A: 正品</span>
              <span>B: 正品</span>
              <span style={{ color: tokens.color.success, fontWeight: 500 }}>→ 正品 ✓</span>
            </div>
          </div>
          <Tag label="正品" color="green" size="sm" />
        </div>
      </Card>

      {/* Product 3: Chanel Boy - needs HQ re-inspection */}
      <Card padding="none">
        <div style={{
          background: tokens.color.warning, padding: tokens.space.cardPadding,
          display: 'flex', alignItems: 'center', gap: tokens.space.cardGap,
          borderRadius: `${tokens.radius.card} ${tokens.radius.card} 0 0`,
        }}>
          <div style={{
            width: 44, height: 44, background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <AlertCircle size={24} color="#FFF" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: tokens.font.sectionTitle.size, fontWeight: 700, color: '#FFF', margin: 0 }}>需总部复检</p>
            <p style={{ fontSize: tokens.font.caption.size, color: 'rgba(255,255,255,0.8)', margin: '2px 0 0' }}>{chanelBoy.brand} {chanelBoy.model}</p>
          </div>
          <Tag label="需复检" color="orange" size="sm" />
        </div>
        <div style={{ padding: tokens.space.cardPadding, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* A appraiser */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: tokens.color.bgPage, borderRadius: tokens.radius.cardInner,
            padding: '10px 12px',
          }}>
            <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption }}>A鉴定师</span>
            <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textBody, fontWeight: 500 }}>周婷(P3)</span>
            <Tag label="正品" color="green" size="sm" />
          </div>

          {/* B appraiser - with note */}
          <div style={{
            background: tokens.color.bgPage, borderRadius: tokens.radius.cardInner,
            padding: '10px 12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption }}>B鉴定师</span>
              <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textBody, fontWeight: 500 }}>吴昊(P3)</span>
              <Tag label="无法判断" color="orange" size="sm" />
            </div>
            <p style={{
              fontSize: tokens.font.caption.size, color: tokens.color.warning,
              margin: '6px 0 0', fontStyle: 'italic',
            }}>
              "配件疑似非原装"
            </p>
          </div>

          {/* AB inconsistency notice */}
          <div style={{
            background: tokens.color.warningLight, borderRadius: tokens.radius.cardInner,
            padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <AlertCircle size={14} color={tokens.color.warning} />
            <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.warning, fontWeight: 500 }}>
              AB结论不一致 → C鉴定师仲裁
            </span>
          </div>

          {/* C appraiser intervention */}
          <div style={{
            background: tokens.color.warningLight,
            borderRadius: tokens.radius.cardInner, padding: 12,
            border: `1px solid ${tokens.color.warning}33`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Shield size={16} color={tokens.color.warning} />
              <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.warning }}>C鉴定师仲裁</span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: tokens.color.bgCard, borderRadius: tokens.radius.cardInner,
              padding: '8px 12px',
            }}>
              <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>C鉴定师</span>
              <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textBody, fontWeight: 500 }}>张明(P5首席)</span>
              <Tag label="需总部复检" color="orange" size="sm" />
            </div>
            <p style={{
              fontSize: tokens.font.caption.size, color: tokens.color.warning,
              margin: '8px 0 0', fontStyle: 'italic',
            }}>
              "该款存在高仿版本需上手检验"
            </p>
            <div style={{
              marginTop: 8, background: tokens.color.bgCard, borderRadius: tokens.radius.cardInner,
              padding: '8px 12px',
            }}>
              <DetailRow
                label="最终结论"
                value={<span style={{ fontWeight: 700, color: tokens.color.warning }}>需总部复检 → 建议定金回收</span>}
                showDivider={false}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Summary card */}
      <Card>
        <h3 style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle, margin: '0 0 12px' }}>鉴定汇总</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 12px', borderRadius: tokens.radius.cardInner,
            background: tokens.color.successLight,
          }}>
            <CheckCircle size={16} color={tokens.color.success} />
            <span style={{ fontSize: tokens.font.body.size, color: tokens.color.success, fontWeight: 500 }}>正品: 2件</span>
            <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginLeft: 'auto' }}>
              Birkin 30, CF中号
            </span>
            <Tag label="可全额回收" color="green" size="sm" />
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 12px', borderRadius: tokens.radius.cardInner,
            background: tokens.color.warningLight,
          }}>
            <AlertCircle size={16} color={tokens.color.warning} />
            <span style={{ fontSize: tokens.font.body.size, color: tokens.color.warning, fontWeight: 500 }}>需总部复检: 1件</span>
            <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginLeft: 'auto' }}>
              Boy中号
            </span>
            <Tag label="建议定金回收" color="orange" size="sm" />
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 12px', borderRadius: tokens.radius.cardInner,
            background: tokens.color.bgPage,
          }}>
            <Circle size={16} color={tokens.color.textDisabled} />
            <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption }}>假货: 0件</span>
          </div>
        </div>
      </Card>

      <ActionButton label="确认结果 · 进入回收清单" icon={ArrowRight} variant="primary" />
    </div>
  );

  // ============================================================
  // Step F: Product list confirmation
  // ============================================================
  const renderStepF = () => {
    const typeColorMap: Record<string, string> = {
      '全额竞价回收': tokens.color.success,
      '定金竞价回收': tokens.color.primary,
      '寄卖竞价回收': '#722ED1',
    };

    const fullTotal = demoOrders.reduce((s, o) => s + (o.depositAmount ?? o.totalAmount), 0);

    return (
      <div style={{ padding: tokens.space.pagePadding, display: 'flex', flexDirection: 'column', gap: tokens.space.cardGap }}>
        <InfoBanner
          icon={Package}
          title="确认回收清单 · 生成订单"
          subtitle="按回收方式拆分为独立订单，每笔订单对应一份合同"
          color="blue"
        />

        {demoOrders.map((order) => {
          const tagColor = order.type === '全额竞价回收' ? 'green' as const : order.type === '定金竞价回收' ? 'blue' as const : 'blue' as const;
          const borderColor = typeColorMap[order.type] || tokens.color.primary;
          const payLabel = order.type === '全额竞价回收'
            ? '当场全额打款'
            : order.type === '定金竞价回收'
              ? `当场打定金，总部复检后结尾款`
              : '寄卖分成';

          return (
            <Card key={order.orderId}>
              {/* Order header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 12, paddingBottom: 10,
                borderBottom: `1px solid ${tokens.color.border}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 4, height: 20, borderRadius: 2,
                    background: borderColor,
                  }} />
                  <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle }}>
                    {order.type}
                  </span>
                </div>
                <Tag label={order.orderId} color={tagColor} size="sm" />
              </div>

              {/* Product list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                {order.products.map((p, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textTitle }}>{p.name}</span>
                    <PriceDisplay amount={p.price} size="sm" />
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: tokens.color.border, marginBottom: 12 }} />

              {/* Summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {order.depositAmount ? (
                  <DetailRow
                    label={`定金50%`}
                    value={<PriceDisplay amount={order.depositAmount} size="sm" />}
                    showDivider={false}
                  />
                ) : (
                  <DetailRow
                    label="合计"
                    value={<PriceDisplay amount={order.totalAmount} size="sm" />}
                    showDivider={false}
                  />
                )}
                <DetailRow label="合同" value={
                  <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.primary, fontWeight: 500 }}>
                    {order.contractId}
                  </span>
                } showDivider={false} />
                <DetailRow label="回收方式" value={
                  <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textBody }}>
                    {payLabel}
                  </span>
                } showDivider={false} />
              </div>

              {/* Send to customer button */}
              <div style={{ marginTop: 12 }}>
                <ActionButton label="发送给客户签署" variant="secondary" size="sm" icon={FileText} />
              </div>
            </Card>
          );
        })}

        {/* Bottom summary */}
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>
                共 {demoOrders.length} 笔订单
              </span>
            </div>
            {demoOrders.map((order) => (
              <div key={order.orderId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textBody }}>
                  {order.type === '全额竞价回收' ? '全额' : '定金'}
                </span>
                <PriceDisplay amount={order.depositAmount ?? order.totalAmount} size="sm" />
              </div>
            ))}
            <div style={{ height: 1, background: tokens.color.border }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle }}>本次合计</span>
              <PriceDisplay amount={fullTotal} size="lg" />
            </div>
          </div>
        </Card>

        <ActionButton label="确认清单 · 发送合同给客户" icon={ArrowRight} variant="primary" size="lg" />
      </div>
    );
  };

  // ============================================================
  // Step G: Contract Signing + Payment Approval
  // ============================================================
  const renderStepG = () => {
    const contracts = demoOrders.map((o) => ({
      id: o.contractId,
      type: o.type,
      amount: o.depositAmount ?? o.totalAmount,
      signed: true,
    }));

    const approvalFlows = demoOrders.map((order) => {
      const amount = order.depositAmount ?? order.totalAmount;
      const flow = getApprovalFlow(amount);
      const approverDetails = [
        { role: '鉴定师申请', name: '张伟', status: 'done' as const },
        { role: '大区经理', name: '李总', status: 'done' as const },
        { role: '大区总监', name: '王总', status: 'done' as const },
        { role: '总经理', name: '赵总', status: 'done' as const },
        { role: '财务', name: '林芳', status: 'current' as const },
      ];
      const needed = flow.approvers.length;
      const steps = approverDetails.slice(0, needed);
      // For the small order (<=2万), all approved already
      if (amount <= 20000) {
        steps.forEach((s) => (s.status = 'done'));
      } else {
        // For the large order, last one is current
        steps.forEach((s, i) => {
          if (i < needed - 1) s.status = 'done';
          else s.status = 'current';
        });
      }
      return { order, flow, steps, amount };
    });

    const statusIcon = (status: 'done' | 'current' | 'pending') => {
      if (status === 'done') return <CheckCircle size={16} color={tokens.color.success} />;
      if (status === 'current') return <Clock size={16} color={tokens.color.primary} />;
      return <Circle size={14} color={tokens.color.textPlaceholder} />;
    };

    const statusLabel = (status: 'done' | 'current' | 'pending') => {
      if (status === 'done') return '已通过';
      if (status === 'current') return '审批中';
      return '待审批';
    };

    return (
      <div style={{ padding: tokens.space.pagePadding, display: 'flex', flexDirection: 'column', gap: tokens.space.cardGap }}>
        {/* Section 1: Contract Signing Status */}
        <SectionHeader title="合同签署状态" />

        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {contracts.map((c) => (
              <div key={c.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: tokens.color.successLight, borderRadius: tokens.radius.cardInner,
                padding: '10px 12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FileText size={16} color={tokens.color.success} />
                  <div>
                    <p style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle, margin: 0 }}>
                      {c.id}
                    </p>
                    <p style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption, margin: '2px 0 0' }}>
                      {c.type} · ¥{c.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CheckCircle size={16} color={tokens.color.success} />
                  <span style={{ fontSize: tokens.font.caption.size, fontWeight: 500, color: tokens.color.success }}>已签署</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Section 2: Payment Approval Flow */}
        <SectionHeader title="打款审批流程" />

        {approvalFlows.map(({ order, flow, steps, amount }) => {
          const allDone = steps.every((s) => s.status === 'done');
          const isDeposit = !!order.depositAmount;

          return (
            <Card key={order.orderId}>
              {/* Approval header */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <Shield size={16} color={tokens.color.primary} />
                  <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle }}>
                    打款审批
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <Tag label={order.orderId} color="blue" size="sm" />
                  <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textBody }}>·</span>
                  <PriceDisplay amount={amount} size="sm" />
                  {isDeposit && (
                    <Tag label="定金" color="blue" size="sm" />
                  )}
                </div>
                <p style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption, margin: '6px 0 0' }}>
                  审批层级: {flow.label}（需{flow.approvers.length}级审批）
                </p>
              </div>

              {/* Approval steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {steps.map((s, i) => {
                  const isLast = i === steps.length - 1;
                  return (
                    <div key={i} style={{ display: 'flex', gap: 10 }}>
                      {/* Vertical line + dot */}
                      <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        width: 20, flexShrink: 0,
                      }}>
                        <div style={{ marginTop: 2 }}>{statusIcon(s.status)}</div>
                        {!isLast && (
                          <div style={{
                            width: 2, flex: 1, minHeight: 20,
                            background: s.status === 'done' ? tokens.color.success : tokens.color.border,
                          }} />
                        )}
                      </div>
                      {/* Content */}
                      <div style={{
                        flex: 1, paddingBottom: isLast ? 0 : 12,
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, width: 14, textAlign: 'center' }}>
                            {['①', '②', '③', '④', '⑤'][i]}
                          </span>
                          <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textBody }}>
                            {s.role}
                          </span>
                          <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>
                            {s.name}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span style={{
                            fontSize: tokens.font.mini.size, fontWeight: 500,
                            color: s.status === 'done' ? tokens.color.success
                              : s.status === 'current' ? tokens.color.primary
                                : tokens.color.textPlaceholder,
                          }}>
                            {i === 0 ? (s.status === 'done' ? '已申请' : '申请中') : statusLabel(s.status)}
                          </span>
                          {s.status === 'current' && (
                            <span style={{ fontSize: tokens.font.mini.size, color: tokens.color.primary }}>← 当前</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Payment result for completed approvals */}
              {allDone && (
                <div style={{
                  marginTop: 12, padding: '10px 12px',
                  background: tokens.color.successLight, borderRadius: tokens.radius.cardInner,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <CheckCircle size={16} color={tokens.color.success} />
                  <span style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.success }}>
                    {isDeposit ? `定金 ¥${amount.toLocaleString()} 已打款` : `¥${amount.toLocaleString()} 已打款`}
                  </span>
                </div>
              )}
            </Card>
          );
        })}

        <ActionButton
          label="打款审批已完成 · 准备收货发往总部"
          variant="primary"
          size="lg"
          icon={ArrowRight}
          onClick={() => setPaymentDone(true)}
        />

        {paymentDone && (
          <InfoBanner
            icon={CheckCircle}
            title="商品已准备好，等待快递揽收发往总部"
            subtitle="预计 1-2 个工作日到达总部仓库"
            color="green"
          />
        )}
      </div>
    );
  };

  // ============================================================
  // Task detail (multi-step workflow)
  // ============================================================
  const renderTaskDetail = () => {
    const ws = getWorkflowStep();
    return (
      <PageLayout
        title="任务详情"
        subtitle={`${currentAppointment.id} · ${currentAppointment.customerName}`}
        tabs={tabItems}
        activeTab={tabKeys.indexOf(activeTab)}
        onTabChange={(i) => setActiveTab(tabKeys[i])}
      >
        {/* Step progress */}
        <StepIndicator steps={workflowStepLabels} current={currentWorkflowIdx} size="sm" />

        {/* Step content */}
        {ws === 'A' && renderStepA()}
        {ws === 'B' && renderStepB()}
        {ws === 'C' && renderStepC()}
        {ws === 'D' && renderStepD()}
        {ws === 'E' && renderStepE()}
        {ws === 'F' && renderStepF()}
        {ws === 'G' && renderStepG()}

        <div style={{ height: 16 }} />
      </PageLayout>
    );
  };

  // ============================================================
  // TAB: orders
  // ============================================================
  const [orderFilterIdx, setOrderFilterIdx] = useState(0);

  const renderOrders = () => (
    <PageLayout
      title="回收单"
      tabs={tabItems}
      activeTab={tabKeys.indexOf(activeTab)}
      onTabChange={(i) => setActiveTab(tabKeys[i])}
    >
      <FilterTabs
        tabs={[{ label: '全部' }, { label: '进行中' }, { label: '已完成' }]}
        activeIndex={orderFilterIdx}
        onChange={setOrderFilterIdx}
        variant="underline"
      />

      <div style={{ paddingTop: tokens.space.cardGap }}>
        {[
          {
            id: 'ORD-20260408-001',
            customer: '赵太太',
            items: 'Hermes Birkin 30 等3件',
            total: 151000,
            status: '进行中',
            statusColor: 'orange' as const,
            date: '2026-04-08',
          },
          {
            id: 'ORD-20260407-002',
            customer: '马女士',
            items: 'LV Neverfull MM 等4件',
            total: 32500,
            status: '已完成',
            statusColor: 'green' as const,
            date: '2026-04-07',
          },
          {
            id: 'ORD-20260405-003',
            customer: '李先生',
            items: 'Rolex 日志型 等2件',
            total: 78000,
            status: '已完成',
            statusColor: 'green' as const,
            date: '2026-04-05',
          },
        ].map((order) => (
          <ListItem
            key={order.id}
            title={order.customer}
            titleRight={<Tag label={order.status} color={order.statusColor} size="sm" />}
            subtitle={order.items}
            meta={{
              left: <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>{order.date}</span>,
              right: <PriceDisplay amount={order.total} size="md" />,
            }}
          >
            <div style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, fontFamily: 'monospace', marginTop: 4 }}>
              {order.id}
            </div>
          </ListItem>
        ))}
      </div>

      <div style={{ height: 16 }} />
    </PageLayout>
  );

  // ============================================================
  // TAB: profile
  // ============================================================
  const renderProfile = () => (
    <PageLayout
      title=""
      tabs={tabItems}
      activeTab={tabKeys.indexOf(activeTab)}
      onTabChange={(i) => setActiveTab(tabKeys[i])}
    >
      {/* Profile header */}
      <div style={{
        background: `linear-gradient(135deg, ${tokens.color.primary}, #5B8DEF)`,
        padding: `24px ${tokens.space.pagePadding} 32px`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 64, height: 64, background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <User size={32} color="#FFF" />
          </div>
          <div>
            <p style={{ fontSize: tokens.font.pageTitle.size, fontWeight: tokens.font.pageTitle.weight, color: '#FFF', margin: 0 }}>张伟</p>
            <p style={{ fontSize: tokens.font.body.size, color: 'rgba(255,255,255,0.8)', margin: '4px 0 0' }}>上门鉴定师 · 高级</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        margin: `0 ${tokens.space.pagePadding}`, marginTop: -16,
        background: tokens.color.bgCard, borderRadius: tokens.radius.card,
        padding: tokens.space.cardPadding, display: 'flex', justifyContent: 'space-around',
        boxShadow: tokens.shadow.card, position: 'relative', zIndex: 10,
      }}>
        {[
          { label: '本月单量', value: '47' },
          { label: '好评率', value: '98%' },
          { label: '回收总额', value: '¥180万' },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: tokens.font.pageTitle.size, fontWeight: tokens.font.pageTitle.weight, color: tokens.color.textTitle, margin: 0 }}>{s.value}</p>
            <p style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption, margin: '2px 0 0' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Menu items */}
      <div style={{ marginTop: tokens.space.cardPadding }}>
        {[
          { icon: Star, label: '我的评价', badge: null },
          { icon: TrendingUp, label: '业绩统计', badge: null },
          { icon: FileText, label: '合同记录', badge: '3' },
          { icon: Shield, label: '资质证书', badge: null },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              margin: `0 ${tokens.space.pagePadding}`, marginBottom: 8,
              background: tokens.color.bgCard, borderRadius: tokens.radius.card,
              padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              boxShadow: tokens.shadow.card,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <item.icon size={18} color={tokens.color.textCaption} />
              <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textTitle }}>{item.label}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {item.badge && (
                <span style={{
                  fontSize: tokens.font.mini.size, background: tokens.color.danger,
                  color: '#FFF', width: 20, height: 20, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {item.badge}
                </span>
              )}
              <ChevronRight size={16} color={tokens.color.textDisabled} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 16 }} />
    </PageLayout>
  );

  // ============================================================
  // Render content based on active tab
  // ============================================================
  const renderContent = () => {
    switch (activeTab) {
      case 'workbench':
        return renderWorkbench();
      case 'task':
        return renderTaskDetail();
      case 'orders':
        return renderOrders();
      case 'profile':
        return renderProfile();
      default:
        return renderWorkbench();
    }
  };

  return renderContent();
};

export default AppraiserView;

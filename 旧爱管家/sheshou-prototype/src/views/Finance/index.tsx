import React, { useState, useEffect } from 'react';
import {
  Briefcase, DollarSign, FileText, Star, User,
  CheckCircle, XCircle, ArrowRight, Clock, AlertCircle,
  CreditCard, TrendingUp, Banknote, Shield, Users, Percent
} from 'lucide-react';
import {
  PageLayout, Card, Tag, ListItem, StatCard, SectionHeader,
  FilterTabs, ActionButton, InfoBanner, DetailRow, PriceDisplay, tokens
} from '../../design';

interface FinanceViewProps {
  step: number;
}

// ---- Tab Content Components ----

function WorkbenchTab({ step }: { step: number }) {
  const [approved, setApproved] = useState(false);
  const [paymentStage, setPaymentStage] = useState<'idle' | 'processing' | 'success'>('idle');

  useEffect(() => {
    if (paymentStage === 'processing') {
      const timer = setTimeout(() => setPaymentStage('success'), 2000);
      return () => clearTimeout(timer);
    }
  }, [paymentStage]);

  // Step 13: Payment approval with levels
  if (step === 13) {
    if (approved && paymentStage === 'success') {
      return (
        <div style={{ paddingTop: 16 }}>
          <div style={{ padding: `0 ${tokens.space.pagePadding}`, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 24 }}>
            <div className="animate-bounce" style={{
              width: 80, height: 80, borderRadius: '50%',
              background: tokens.color.success,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 16,
            }}>
              <CheckCircle size={40} color="#FFFFFF" />
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: tokens.color.success, marginBottom: 4 }}>打款成功</div>
            <div style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption, marginBottom: 24 }}>资金已到达客户账户</div>

            <Card className="w-full">
              <DetailRow label="打款金额" value={<PriceDisplay amount="133,000" size="lg" />} />
              <DetailRow label="收款方" value="赵太太" />
              <DetailRow label="收款账户" value="支付宝 137****4444" />
              <DetailRow label="打款时间" value="2026-04-08 15:15:00" />
              <DetailRow label="交易流水号" value={<span style={{ fontFamily: 'monospace', fontSize: tokens.font.caption.size }}>PAY20260408151500</span>} showDivider={false} />
            </Card>
          </div>
        </div>
      );
    }

    if (approved && paymentStage === 'processing') {
      return (
        <div style={{ paddingTop: 16 }}>
          <div style={{ padding: `0 ${tokens.space.pagePadding}`, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 64 }}>
            <div className="animate-spin" style={{
              width: 64, height: 64, borderRadius: '50%',
              border: `4px solid ${tokens.color.primary}`,
              borderTopColor: 'transparent',
              marginBottom: 16,
            }} />
            <div style={{ fontSize: tokens.font.sectionTitle.size, fontWeight: 600, color: tokens.color.textTitle, marginBottom: 4 }}>打款中...</div>
            <div style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption }}>正在向赵太太支付宝账户转账</div>
            <div style={{ marginTop: 16 }}>
              <PriceDisplay amount="133,000" size="hero" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ paddingTop: 16 }}>
        {/* Main approval card: ORD-20260409-001 */}
        <Card className="mx-5 mb-3">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Shield size={16} color={tokens.color.primary} />
            <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle }}>打款审批</span>
            <span style={{ fontFamily: 'monospace', fontSize: tokens.font.caption.size, color: tokens.color.primary }}>ORD-20260409-001</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption }}>金额:</span>
            <PriceDisplay amount="133,000" size="md" />
            <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>·</span>
            <Tag label=">10万" color="red" size="sm" />
          </div>

          {/* Approval chain */}
          {[
            { step: 1, role: '鉴定师申请', name: '张伟', status: 'done' as const, time: '09:41' },
            { step: 2, role: '大区经理', name: '李总', status: 'done' as const, time: '09:45' },
            { step: 3, role: '大区总监', name: '王总', status: 'done' as const, time: '10:02' },
            { step: 4, role: '总经理', name: '赵总', status: 'done' as const, time: '10:15' },
            { step: 5, role: '财务审批', name: '林芳', status: 'current' as const, time: '' },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 0 }}>
              {/* Timeline dot + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                  background: item.status === 'done' ? tokens.color.success : tokens.color.primary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 700, color: '#FFFFFF',
                  boxShadow: item.status === 'current' ? `0 0 0 4px ${tokens.color.primaryLight}` : 'none',
                }}>
                  {item.status === 'done' ? <CheckCircle size={13} /> : item.step}
                </div>
                {i < arr.length - 1 && (
                  <div style={{
                    width: 2, flex: 1, minHeight: 16,
                    background: item.status === 'done' ? tokens.color.success : tokens.color.border,
                  }} />
                )}
              </div>
              {/* Content */}
              <div style={{ flex: 1, paddingBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle }}>
                    {item.role}
                  </span>
                  <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>{item.name}</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
                    {item.status === 'done' && (
                      <>
                        <CheckCircle size={12} color={tokens.color.success} />
                        <span style={{ fontSize: '11px', color: tokens.color.success }}>已{item.step === 1 ? '申请' : '通过'}</span>
                        <span style={{ fontSize: '11px', color: tokens.color.textCaption }}>{item.time}</span>
                      </>
                    )}
                    {item.status === 'current' && (
                      <>
                        <div style={{
                          width: 8, height: 8, borderRadius: '50%', background: tokens.color.primary,
                          animation: 'pulse 1.5s ease-in-out infinite',
                        }} />
                        <span style={{ fontSize: '11px', color: tokens.color.primary, fontWeight: 600 }}>待审批</span>
                        <span style={{ fontSize: '11px', color: tokens.color.primary }}>← 我来审</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Card>

        {/* Approval buttons */}
        <div style={{ padding: `8px ${tokens.space.pagePadding}`, display: 'flex', gap: 10 }}>
          <ActionButton
            label="审批通过"
            variant="success"
            size="lg"
            icon={CheckCircle}
            onClick={() => {
              setApproved(true);
              setPaymentStage('processing');
            }}
          />
          <ActionButton
            label="审批拒绝"
            variant="danger"
            size="lg"
            icon={XCircle}
          />
        </div>

        {/* Small order already done */}
        <Card className="mx-5 mb-3" style={{ marginTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle size={16} color={tokens.color.success} />
            <span style={{ fontFamily: 'monospace', fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>ORD-20260409-002</span>
            <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>·</span>
            <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>定金</span>
            <PriceDisplay amount="9,000" size="sm" />
            <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>·</span>
            <Tag label="≤2万" color="green" size="sm" />
            <div style={{ marginLeft: 'auto' }}>
              <Tag label="已完成" color="green" size="sm" />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Step 15: Settlement with details
  if (step === 15) {
    return (
      <div style={{ paddingTop: 16 }}>
        {/* Stat cards */}
        <div style={{ padding: `0 ${tokens.space.pagePadding}`, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
          <StatCard value="¥0" label="待打款" icon={DollarSign} color="green" />
          <StatCard value={0} label="待结算" icon={FileText} color="green" />
          <StatCard value="¥653K" label="今日已打" icon={CheckCircle} color="green" />
        </div>

        {/* Consignment settlement */}
        <SectionHeader title="寄卖订单结算" />
        <Card className="mx-5 mb-3">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Percent size={16} color={tokens.color.primary} />
            <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle }}>寄卖结算明细</span>
          </div>

          {[
            { name: 'Gucci Marmont', seller: '王小姐', salePrice: 45000, commission: 4500, payout: 40500 },
            { name: 'Omega 海马', seller: '李先生', salePrice: 22000, commission: 2200, payout: 19800 },
            { name: 'Dior Book Tote', seller: '陈女士', salePrice: 38000, commission: 3800, payout: 34200 },
          ].map((item, i, arr) => (
            <div key={i} style={{
              padding: '12px 0',
              borderBottom: i < arr.length - 1 ? `1px solid ${tokens.color.divider}` : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle }}>{item.name}</span>
                <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>{item.seller}</span>
              </div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <div style={{
                  flex: 1, minWidth: 80, padding: '6px 8px', background: tokens.color.bgPage, borderRadius: tokens.radius.cardInner,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '10px', color: tokens.color.textCaption }}>成交价</div>
                  <div style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle }}>¥{item.salePrice.toLocaleString()}</div>
                </div>
                <div style={{
                  flex: 1, minWidth: 80, padding: '6px 8px', background: tokens.color.dangerLight, borderRadius: tokens.radius.cardInner,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '10px', color: tokens.color.danger }}>佣金10%</div>
                  <div style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.danger }}>-¥{item.commission.toLocaleString()}</div>
                </div>
                <div style={{
                  flex: 1, minWidth: 80, padding: '6px 8px', background: tokens.color.successLight, borderRadius: tokens.radius.cardInner,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '10px', color: tokens.color.success }}>实付</div>
                  <div style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.success }}>¥{item.payout.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </Card>

        {/* Financial reconciliation summary */}
        <SectionHeader title="财务对账汇总" />
        <Card className="mx-5 mb-3">
          <DetailRow label="全额回收打款" value={<PriceDisplay amount="133,000" size="md" />} />
          <DetailRow label="定金打款" value={<PriceDisplay amount="9,000" size="md" />} />
          <DetailRow label="寄卖结算打款" value={<PriceDisplay amount="94,500" size="md" />} />
          <DetailRow label="佣金收入" value={
            <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.success }}>+¥10,500</span>
          } />
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: `${tokens.space.itemGap} 0 0`,
            marginTop: 4,
            borderTop: `2px solid ${tokens.color.textTitle}`,
          }}>
            <span style={{ fontSize: tokens.font.body.size, fontWeight: 700, color: tokens.color.textTitle }}>合计支出</span>
            <PriceDisplay amount="236,500" size="lg" />
          </div>
        </Card>

        {/* Commission calculation */}
        <SectionHeader title="提成计算" />
        <Card className="mx-5 mb-3">
          {[
            { name: '张伟（鉴定师）', metric: '回收3件 · ¥161,000', commission: '¥3,220', rate: '2%' },
            { name: '李静（客服）', metric: '线索转化1单', commission: '¥500', rate: '固定' },
            { name: '王强（鉴定师）', metric: '回收0件', commission: '¥0', rate: '-' },
          ].map((item, i, arr) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: i < arr.length - 1 ? `1px solid ${tokens.color.divider}` : 'none',
            }}>
              <div>
                <div style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle }}>{item.name}</div>
                <div style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>{item.metric}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.success }}>{item.commission}</div>
                <div style={{ fontSize: '11px', color: tokens.color.textCaption }}>{item.rate}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    );
  }

  // Default workbench
  return (
    <div style={{ paddingTop: 16 }}>
      {/* Stat cards */}
      <div style={{ padding: `0 ${tokens.space.pagePadding}`, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
        <StatCard value="¥183K" label="待打款" icon={DollarSign} color="red" />
        <StatCard value="6笔" label="待结算" icon={FileText} color="orange" />
        <StatCard value="¥520K" label="今日已打" icon={CheckCircle} color="green" />
      </div>

      <div style={{ marginTop: 16 }}>
        <SectionHeader title="打款审批队列" action={{ label: '全部', onClick: () => {} }} />
      </div>

      {[
        { name: '赵太太 · 全额回收', desc: 'Birkin 30 + CF中号 · ORD-20260408-001/002', price: 133000, tagLabel: '待审批', tagColor: 'red' as const, urgent: true },
        { name: '赵太太 · 定金', desc: 'Boy中号 · ORD-20260408-003', price: 9000, tagLabel: '待审批', tagColor: 'orange' as const, urgent: false },
        { name: '钱先生 · 寄卖尾款', desc: 'Cartier LOVE · ORD-20260406-005', price: 41000, tagLabel: '待审批', tagColor: 'orange' as const, urgent: false },
      ].map((item, i) => (
        <ListItem
          key={i}
          avatar={{ name: item.name, color: item.tagColor === 'red' ? tokens.color.dangerLight : tokens.color.warningLight }}
          title={item.name}
          subtitle={item.desc}
          tags={[{ label: item.tagLabel, color: item.tagColor }]}
          titleRight={<PriceDisplay amount={item.price.toLocaleString()} size="md" />}
        />
      ))}
    </div>
  );
}

function PaymentTab() {
  const [filterIndex, setFilterIndex] = useState(0);
  const filterLabels = ['待审批', '已审批', '已打款'];

  const items: Record<string, Array<{ name: string; desc: string; price: number; tagLabel: string; tagColor: 'red' | 'blue' | 'green'; urgent?: boolean }>> = {
    '待审批': [
      { name: '赵太太 · 全额回收', desc: 'ORD-20260408-001/002 · Birkin 30 + CF中号', price: 133000, tagLabel: '待审批', tagColor: 'red', urgent: true },
      { name: '赵太太 · 定金', desc: 'ORD-20260408-003 · Boy中号', price: 9000, tagLabel: '待审批', tagColor: 'red' },
    ],
    '已审批': [
      { name: '吴太太 · 全额回收', desc: 'ORD-20260407-010 · Gucci Dionysus', price: 22000, tagLabel: '已审批', tagColor: 'blue' },
      { name: '周先生 · 定金', desc: 'ORD-20260407-011 · Omega 海马300', price: 8500, tagLabel: '已审批', tagColor: 'blue' },
    ],
    '已打款': [
      { name: '钱先生 · 定金', desc: 'ORD-20260403-004 · Cartier LOVE', price: 16000, tagLabel: '已打款', tagColor: 'green' },
      { name: '李先生 · 寄卖结算', desc: 'ORD-20260325-007 · Omega 海马', price: 19800, tagLabel: '已打款', tagColor: 'green' },
      { name: '张女士 · 全额回收', desc: 'ORD-20260401-002 · LV Neverfull', price: 10500, tagLabel: '已打款', tagColor: 'green' },
    ],
  };

  const activeFilter = filterLabels[filterIndex];

  return (
    <div style={{ paddingTop: 8 }}>
      <FilterTabs
        tabs={filterLabels.map(l => ({ label: l }))}
        activeIndex={filterIndex}
        onChange={setFilterIndex}
      />

      {(items[activeFilter] || []).map((item, i) => (
        <ListItem
          key={i}
          avatar={{ name: item.name, color: item.tagColor === 'green' ? tokens.color.successLight : item.tagColor === 'blue' ? tokens.color.primaryLight : tokens.color.dangerLight }}
          title={item.name}
          subtitle={item.desc}
          tags={[{ label: item.tagLabel, color: item.tagColor }]}
          titleRight={<PriceDisplay amount={item.price.toLocaleString()} size="md" />}
        />
      ))}
    </div>
  );
}

function CollectionTab() {
  return (
    <div style={{ paddingTop: 16 }}>
      {[
        { name: '寄卖佣金 · 王小姐', desc: 'ORD-20260405-006 · Gucci Marmont', price: 4500 },
        { name: '寄卖佣金 · 李先生', desc: 'ORD-20260325-007 · Omega 海马', price: 2200 },
        { name: '寄卖佣金 · 陈女士', desc: 'ORD-20260320-009 · Dior Book Tote', price: 3800 },
      ].map((item, i) => (
        <ListItem
          key={i}
          avatar={{ name: item.name, color: tokens.color.successLight }}
          title={item.name}
          subtitle={item.desc}
          titleRight={
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
              <PriceDisplay amount={item.price.toLocaleString()} size="md" />
              <Tag label="已收款" color="green" size="sm" />
            </div>
          }
        />
      ))}

      {/* Monthly stats */}
      <Card className="mx-5 mt-4">
        <div style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle, marginBottom: 12 }}>本月收款统计</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <StatCard value="¥45K" label="佣金收入" icon={Banknote} color="green" />
          <StatCard value="23笔" label="收款笔数" icon={FileText} color="blue" />
        </div>
      </Card>
    </div>
  );
}

function SettlementTab() {
  return (
    <div style={{ paddingTop: 16 }}>
      {/* Settlement summary card */}
      <div style={{ padding: `0 ${tokens.space.pagePadding}`, marginBottom: 12 }}>
        <div style={{
          background: `linear-gradient(135deg, ${tokens.color.primary}, #5B8DEF)`,
          borderRadius: tokens.radius.card,
          padding: 20,
          color: '#FFFFFF',
          boxShadow: `0 4px 16px ${tokens.color.primary}4D`,
        }}>
          <div style={{ fontSize: tokens.font.caption.size, opacity: 0.8 }}>本月结算总额</div>
          <div style={{ fontSize: tokens.font.numLarge.size, fontWeight: 700, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>¥1,200,000</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: tokens.font.caption.size, opacity: 0.8 }}>
            <TrendingUp size={12} />
            <span>较上月增长 15.3%</span>
          </div>
        </div>
      </div>

      <div style={{ padding: `0 ${tokens.space.pagePadding}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <Clock size={14} color={tokens.color.warning} />
            <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>待结算</span>
          </div>
          <div style={{ fontSize: tokens.font.numLarge.size, fontWeight: 700, color: tokens.color.warning }}>¥183K</div>
          <div style={{ fontSize: '11px', color: tokens.color.textCaption, marginTop: 2 }}>6笔待处理</div>
        </Card>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <DollarSign size={14} color={tokens.color.success} />
            <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>佣金收入</span>
          </div>
          <div style={{ fontSize: tokens.font.numLarge.size, fontWeight: 700, color: tokens.color.success }}>¥45K</div>
          <div style={{ fontSize: '11px', color: tokens.color.textCaption, marginTop: 2 }}>本月累计</div>
        </Card>
      </div>

      {/* Recent settlements */}
      <SectionHeader title="结算记录" />

      {[
        { name: '寄卖结算 · 王小姐', desc: 'Gucci Marmont · 成交¥45,000 · 佣金10%', price: 40500 },
        { name: '寄卖结算 · 李先生', desc: 'Omega 海马 · 成交¥22,000 · 佣金10%', price: 19800 },
      ].map((item, i) => (
        <ListItem
          key={i}
          avatar={{ name: item.name, color: tokens.color.successLight }}
          title={item.name}
          subtitle={item.desc}
          titleRight={
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
              <PriceDisplay amount={item.price.toLocaleString()} size="md" />
              <Tag label="已结算" color="green" size="sm" />
            </div>
          }
        />
      ))}
    </div>
  );
}

function ProfileTab() {
  return (
    <div style={{ paddingTop: 16 }}>
      <Card className="mx-5 mb-3">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: tokens.color.primaryLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <User size={28} color={tokens.color.primary} />
          </div>
          <div>
            <div style={{ fontSize: tokens.font.numMedium.size, fontWeight: 600, color: tokens.color.textTitle }}>林芳</div>
            <div style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption }}>财务主管</div>
            <div style={{ fontSize: tokens.font.caption.size, color: tokens.color.textDisabled, marginTop: 2 }}>138****0011</div>
          </div>
        </div>
      </Card>

      <Card className="mx-5" padding="none">
        {[
          { label: '本月打款笔数', value: '47笔' },
          { label: '本月打款总额', value: '¥1.2M' },
          { label: '审批通过率', value: '98.5%' },
          { label: '系统设置', value: '' },
        ].map((item, i, arr) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px',
            borderBottom: i < arr.length - 1 ? `1px solid ${tokens.color.bgPage}` : 'none',
          }}>
            <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textTitle }}>{item.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {item.value && <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption }}>{item.value}</span>}
              <ArrowRight size={14} color={tokens.color.textDisabled} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ---- Main Component ----

export function FinanceView({ step }: FinanceViewProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Force workbench tab when step is 13 or 15 for demo
  const effectiveTab = (step === 13 || step === 15) ? 0 : activeTab;

  const tabs = [
    { icon: Briefcase, label: '工作台' },
    { icon: DollarSign, label: '付款' },
    { icon: FileText, label: '收款' },
    { icon: Star, label: '结算' },
    { icon: User, label: '我的' },
  ];

  const renderContent = () => {
    switch (effectiveTab) {
      case 0: return <WorkbenchTab step={step} />;
      case 1: return <PaymentTab />;
      case 2: return <CollectionTab />;
      case 3: return <SettlementTab />;
      case 4: return <ProfileTab />;
      default: return <WorkbenchTab step={step} />;
    }
  };

  const titleMap: Record<number, { title: string; subtitle?: string }> = {
    13: { title: '打款审批', subtitle: '全额竞价回收' },
    15: { title: '财务工作台', subtitle: '4月9日' },
  };
  const defaultTitle = { title: effectiveTab === 1 ? '付款管理' : effectiveTab === 2 ? '收款管理' : effectiveTab === 3 ? '结算中心' : effectiveTab === 4 ? '我的' : '财务工作台', subtitle: effectiveTab === 0 ? '4月9日' : effectiveTab === 2 ? '最近收款' : undefined };
  const header = (step === 13 || step === 15) ? titleMap[step] : defaultTitle;

  return (
    <PageLayout
      title={header.title}
      subtitle={header.subtitle}
      tabs={tabs}
      activeTab={effectiveTab}
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </PageLayout>
  );
}

export default FinanceView;

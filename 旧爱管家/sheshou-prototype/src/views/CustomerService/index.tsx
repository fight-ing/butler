import React, { useState, useEffect } from 'react';
import {
  Plus,
  ScanLine,
  Clock,
  Phone,
  MessageCircle,
  Calendar,
  ArrowRight,
  ChevronRight,
  User,
  Briefcase,
  Users,
  Star,
  Bell,
  HelpCircle,
  CheckCircle,
  MapPin,
  Package,
  Settings,
  Tag as TagIcon,
} from 'lucide-react';
import { leads, type Lead } from '../../mock/leads';
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
  PriceDisplay,
  tokens,
  sourceTagColor,
  intentTagColor,
  intentLabel,
} from '../../design';

// ============ Helpers ============

function relativeTime(dateStr?: string): string {
  if (!dateStr) return '暂无';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return '刚刚';
  if (mins < 60) return `${mins}分钟前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}小时前`;
  return `${Math.floor(hours / 24)}天前`;
}

// ============ Dashboard Tab ============

function DashboardView({ onNavigateLeads, step }: { onNavigateLeads: () => void; step: number }) {
  const slaItems = [
    { name: '张女士', label: '首次触达', minutes: 2, id: 'LD-20260408-001' },
    { name: '孙女士', label: '首次触达', minutes: 8, id: 'LD-20260408-007' },
    { name: '周小姐', label: '首次触达', minutes: 15, id: 'LD-20260408-008' },
  ];

  const recentLeads = leads.slice(0, 3);

  return (
    <PageLayout title="工作台" subtitle="今日 4月9日 周三">
      {step >= 4 && (
        <div style={{ padding: `0 ${tokens.space.pagePadding}`, marginTop: tokens.space.itemGap }}>
          <InfoBanner
            icon={CheckCircle}
            title="预约已创建 RCV-20260408-00001"
            color="green"
          />
        </div>
      )}

      {/* Stat cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: tokens.space.inlineGap,
        padding: `${tokens.space.itemGap} ${tokens.space.pagePadding} 0`,
      }}>
        <StatCard value={3} label="今日新线索" icon={Star} color="blue" />
        <StatCard value={5} label="待跟进" icon={Clock} color="orange" />
        <StatCard value={2} label="今日预约" icon={Calendar} color="green" />
        <StatCard value={1} label="超期未联系" icon={Bell} color="red" />
      </div>

      {/* Quick actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: tokens.space.itemGap,
        padding: `${tokens.space.cardPadding} ${tokens.space.pagePadding} 0`,
      }}>
        <ActionButton label="新建线索" variant="primary" icon={Plus} fullWidth />
        <ActionButton label="扫码" variant="secondary" icon={ScanLine} fullWidth />
      </div>

      {/* SLA countdown */}
      <div style={{ marginTop: tokens.space.sectionGap }}>
        <SectionHeader title="SLA 待处理" action={{ label: '查看全部', onClick: () => {} }} />
        <div style={{ padding: `0 ${tokens.space.pagePadding}`, display: 'flex', flexDirection: 'column', gap: tokens.space.itemGap }}>
          {slaItems.map((item) => {
            const isUrgent = item.minutes <= 2;
            return (
              <Card key={item.id} variant={isUrgent ? 'outlined' : 'default'}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.itemGap }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: isUrgent ? tokens.color.dangerLight : tokens.color.warningLight,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Clock size={16} color={isUrgent ? tokens.color.danger : tokens.color.warning} />
                    </div>
                    <div>
                      <span style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle }}>
                        {item.name}
                      </span>
                      <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginTop: 2 }}>
                        {item.label}
                      </p>
                    </div>
                  </div>
                  <span style={{
                    fontSize: tokens.font.numMedium.size,
                    fontWeight: tokens.font.numMedium.weight,
                    fontVariantNumeric: 'tabular-nums',
                    color: isUrgent ? tokens.color.danger : tokens.color.warning,
                  }}>
                    {item.minutes}min
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent leads */}
      <div style={{ marginTop: tokens.space.sectionGap, paddingBottom: tokens.space.cardPadding }}>
        <SectionHeader title="最新线索" action={{ label: '查看全部', onClick: onNavigateLeads }} />
        {recentLeads.map((lead) => (
          <ListItem
            key={lead.id}
            title={lead.customerName}
            tags={[
              { label: lead.source, color: sourceTagColor[lead.source] || 'gray' },
              { label: intentLabel[lead.intentLevel], color: intentTagColor[lead.intentLevel] },
            ]}
            subtitle={`${lead.brand} · ${lead.category}`}
            meta={{
              left: <PriceDisplay amount={lead.estimatedValue} size="sm" />,
              right: relativeTime(lead.createdAt),
            }}
            onClick={() => {}}
          />
        ))}
      </div>
    </PageLayout>
  );
}

// ============ Leads Tab ============

const FILTER_TABS = [
  { label: '全部', count: 10 },
  { label: '新建', count: 3 },
  { label: '跟进中', count: 3 },
  { label: '已预约', count: 1 },
];

const STATUS_MAP: Record<string, string> = {
  '全部': '',
  '新建': 'L01新建',
  '跟进中': 'L03跟进中',
  '已预约': 'L04已预约',
};

function LeadsView({
  step,
  onSelectLead,
  highlightLeadId,
}: {
  step: number;
  onSelectLead: (lead: Lead) => void;
  highlightLeadId?: string;
}) {
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const activeLabel = FILTER_TABS[activeFilterIndex].label;

  const filteredLeads =
    activeLabel === '全部'
      ? leads
      : leads.filter((l) => l.status === STATUS_MAP[activeLabel]);

  return (
    <PageLayout title="线索管理">
      <FilterTabs
        tabs={FILTER_TABS}
        activeIndex={activeFilterIndex}
        onChange={setActiveFilterIndex}
        variant="pill"
      />

      <div style={{ paddingTop: tokens.space.itemGap, paddingBottom: tokens.space.cardPadding }}>
        {filteredLeads.map((lead) => {
          const isHighlighted = highlightLeadId === lead.id;
          const tags: Array<{ label: string; color: 'blue' | 'red' | 'orange' | 'green' | 'gray' | 'purple' }> = [
            { label: lead.source, color: sourceTagColor[lead.source] || 'gray' },
            { label: intentLabel[lead.intentLevel], color: intentTagColor[lead.intentLevel] },
          ];
          if (isHighlighted) {
            tags.push({ label: 'NEW', color: 'blue' });
          }
          return (
            <ListItem
              key={lead.id}
              title={lead.customerName}
              tags={tags}
              subtitle={`${lead.brand} · ${lead.category}`}
              meta={{
                left: <PriceDisplay amount={lead.estimatedValue} size="sm" />,
                right: lead.lastFollowUp
                  ? `跟进 ${relativeTime(lead.lastFollowUp)}`
                  : relativeTime(lead.createdAt),
              }}
              onClick={() => onSelectLead(lead)}
              badge={isHighlighted}
            />
          );
        })}
      </div>
    </PageLayout>
  );
}

// ============ Lead Detail ============

function LeadDetailView({
  lead,
  step,
  onBack,
  onCreateAppointment,
}: {
  lead: Lead;
  step: number;
  onBack: () => void;
  onCreateAppointment: () => void;
}) {
  return (
    <PageLayout
      title="线索详情"
      showBack
      onBack={onBack}
      bottomAction={
        <div style={{ display: 'flex', gap: tokens.space.inlineGap }}>
          <ActionButton label="电话跟进" variant="ghost" size="sm" icon={Phone} fullWidth />
          <ActionButton label="微信跟进" variant="ghost" size="sm" icon={MessageCircle} fullWidth />
          <ActionButton label="创建预约" variant="primary" size="sm" icon={Calendar} fullWidth onClick={onCreateAppointment} />
          <ActionButton label="转公海" variant="ghost" size="sm" icon={ArrowRight} fullWidth />
        </div>
      }
    >
      {/* Customer info card */}
      <div style={{ padding: `${tokens.space.itemGap} ${tokens.space.pagePadding} 0` }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.itemGap, marginBottom: tokens.space.itemGap }}>
            <div style={{
              width: 48, height: 48, borderRadius: tokens.radius.avatar,
              background: tokens.color.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFFFFF', fontSize: '18px', fontWeight: 600, flexShrink: 0,
            }}>
              {lead.customerName.charAt(0)}
            </div>
            <div>
              <p style={{ fontSize: tokens.font.bodyLarge.size, fontWeight: tokens.font.bodyLarge.weight, color: tokens.color.textTitle }}>
                {lead.customerName}
              </p>
              <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>{lead.phone}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: `${tokens.space.itemGap} ${tokens.space.cardPadding}` }}>
            <DetailRow label="来源" value={<Tag label={lead.source} color={sourceTagColor[lead.source] || 'gray'} size="sm" />} showDivider={false} />
            <DetailRow label="意向" value={<Tag label={intentLabel[lead.intentLevel]} color={intentTagColor[lead.intentLevel]} size="sm" />} showDivider={false} />
            <DetailRow label="品牌" value={lead.brand} showDivider={false} />
            <DetailRow label="品类" value={lead.category} showDivider={false} />
          </div>
          <div style={{ marginTop: tokens.space.inlineGap }}>
            <DetailRow label="预估价值" value={<PriceDisplay amount={lead.estimatedValue} size="sm" />} showDivider={false} />
          </div>

          {/* Tags */}
          {lead.tags.length > 0 && (
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '6px',
              marginTop: tokens.space.itemGap,
              paddingTop: tokens.space.itemGap,
              borderTop: `1px solid ${tokens.color.divider}`,
            }}>
              {lead.tags.map((tag, i) => (
                <Tag key={i} label={tag} color="gray" size="sm" />
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Follow-up timeline */}
      <div style={{ padding: `${tokens.space.cardPadding} ${tokens.space.pagePadding}` }}>
        <Card>
          <SectionHeader title="跟进记录" />
          {lead.followUpRecords && lead.followUpRecords.length > 0 ? (
            <div style={{ position: 'relative', paddingLeft: tokens.space.pagePadding }}>
              <div style={{
                position: 'absolute', left: '7px', top: 8, bottom: 8,
                width: 1, background: tokens.color.border,
              }} />
              {lead.followUpRecords.map((record, i) => (
                <div key={i} style={{ position: 'relative', paddingBottom: i < lead.followUpRecords!.length - 1 ? tokens.space.cardPadding : 0 }}>
                  <div style={{
                    position: 'absolute', left: '-13px', top: 6,
                    width: 12, height: 12, borderRadius: '50%',
                    background: tokens.color.primary, border: `2px solid ${tokens.color.bgCard}`,
                  }} />
                  <div style={{ paddingLeft: tokens.space.inlineGap }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.inlineGap }}>
                      <span style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption }}>
                        {record.time.slice(5, 16)}
                      </span>
                      <Tag label={record.type} color="gray" size="sm" />
                    </div>
                    <p style={{
                      fontSize: tokens.font.caption.size,
                      color: tokens.color.textBody,
                      marginTop: tokens.space.tightGap,
                      lineHeight: '1.6',
                    }}>
                      {record.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center', padding: `${tokens.space.sectionGap} 0`,
              fontSize: tokens.font.caption.size, color: tokens.color.textDisabled,
            }}>
              暂无跟进记录
            </div>
          )}
        </Card>
      </div>
    </PageLayout>
  );
}

// ============ Create Appointment Form ============

function CreateAppointmentView({
  lead,
  onBack,
}: {
  lead: Lead;
  onBack: () => void;
}) {
  const [serviceType, setServiceType] = useState<string>('上门');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const serviceTypes = [
    { id: '上门', icon: MapPin },
    { id: '到店', icon: Package },
    { id: '邮寄', icon: ArrowRight },
    { id: '闪送', icon: Clock },
  ];

  // Generate full-day time slots in 30-minute intervals (09:00 - 21:00)
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9;
    const min = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${min}`;
  });

  // Mock appraiser availability per time slot
  const appraiserAvailability: Record<string, { count: number; names: string[] }> = {
    '09:00': { count: 2, names: ['张伟', '王强'] },
    '09:30': { count: 2, names: ['张伟', '王强'] },
    '10:00': { count: 3, names: ['张伟', '王强', '李明'] },
    '10:30': { count: 3, names: ['张伟', '王强', '李明'] },
    '11:00': { count: 2, names: ['王强', '李明'] },
    '11:30': { count: 2, names: ['王强', '李明'] },
    '12:00': { count: 0, names: [] },
    '12:30': { count: 0, names: [] },
    '13:00': { count: 1, names: ['张伟'] },
    '13:30': { count: 1, names: ['张伟'] },
    '14:00': { count: 3, names: ['张伟', '王强', '李明'] },
    '14:30': { count: 3, names: ['张伟', '王强', '李明'] },
    '15:00': { count: 2, names: ['张伟', '李明'] },
    '15:30': { count: 2, names: ['张伟', '李明'] },
    '16:00': { count: 2, names: ['王强', '李明'] },
    '16:30': { count: 2, names: ['王强', '李明'] },
    '17:00': { count: 1, names: ['王强'] },
    '17:30': { count: 1, names: ['王强'] },
    '18:00': { count: 1, names: ['张伟'] },
    '18:30': { count: 1, names: ['张伟'] },
    '19:00': { count: 0, names: [] },
    '19:30': { count: 0, names: [] },
    '20:00': { count: 0, names: [] },
    '20:30': { count: 0, names: [] },
  };

  if (submitted) {
    return (
      <PageLayout title="创建预约" showBack onBack={onBack}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: `80px ${tokens.space.pagePadding}`,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: tokens.color.successLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: tokens.space.cardPadding,
          }}>
            <CheckCircle size={32} color={tokens.color.success} />
          </div>
          <h2 style={{
            fontSize: tokens.font.pageTitle.size, fontWeight: tokens.font.pageTitle.weight,
            color: tokens.color.textTitle, marginBottom: tokens.space.inlineGap,
          }}>
            预约创建成功
          </h2>
          <p style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption, marginBottom: tokens.space.tightGap }}>
            预约编号
          </p>
          <p style={{
            fontSize: '18px', fontWeight: 700, color: tokens.color.primary,
            fontVariantNumeric: 'tabular-nums', marginBottom: tokens.space.sectionGap,
          }}>
            RCV-20260408-00001
          </p>
          <ActionButton label="返回" variant="primary" onClick={onBack} />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="创建预约"
      showBack
      onBack={onBack}
      bottomAction={
        <ActionButton label="提交预约" variant="primary" onClick={() => setSubmitted(true)} />
      }
    >
      {/* Customer summary banner */}
      <div style={{ padding: `${tokens.space.itemGap} ${tokens.space.pagePadding} 0` }}>
        <InfoBanner
          title={`${lead.customerName} · ${lead.brand} ${lead.category}`}
          subtitle={`预估 ¥${lead.estimatedValue}`}
          color="blue"
        />
      </div>

      {/* Service type section */}
      <div style={{ padding: `${tokens.space.cardPadding} ${tokens.space.pagePadding} 0` }}>
        <SectionHeader title="服务方式" />
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: tokens.space.inlineGap, padding: `0 ${tokens.space.pagePadding}`,
        }}>
          {serviceTypes.map((st) => {
            const Icon = st.icon;
            const isActive = serviceType === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setServiceType(st.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: '6px', padding: `${tokens.space.cardPadding} 0`,
                  borderRadius: tokens.radius.card,
                  fontSize: tokens.font.caption.size, fontWeight: 500,
                  background: isActive ? tokens.color.primaryLight : tokens.color.bgCard,
                  color: isActive ? tokens.color.primary : tokens.color.textCaption,
                  border: isActive ? `2px solid ${tokens.color.primary}` : `1px solid ${tokens.color.border}`,
                  cursor: 'pointer', transition: tokens.motion.fast,
                }}
              >
                <Icon size={20} />
                {st.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Appointment date section */}
      <div style={{ padding: `${tokens.space.cardPadding} ${tokens.space.pagePadding} 0` }}>
        <SectionHeader title="预约时间" />
        <div style={{ padding: `0 ${tokens.space.pagePadding}` }}>
          <Card>
            {/* Date picker */}
            <div style={{
              display: 'flex', alignItems: 'center',
              height: 44, padding: `0 ${tokens.space.itemGap}`,
              background: tokens.color.bgFill, borderRadius: tokens.radius.input,
              fontSize: tokens.font.body.size, color: tokens.color.textTitle,
              marginBottom: tokens.space.itemGap,
            }}>
              <Calendar size={16} color={tokens.color.textCaption} style={{ marginRight: tokens.space.inlineGap }} />
              2026-04-09 周三
            </div>

            {/* Time slot grid — full day, 30-min intervals */}
            <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginBottom: tokens.space.inlineGap }}>
              选择时段（每半小时一个时段）
            </p>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '6px', maxHeight: 200, overflowY: 'auto',
              scrollbarWidth: 'thin',
            }}>
              {timeSlots.map((slot, i) => {
                const avail = appraiserAvailability[slot];
                const isSelected = selectedTimeSlot === i;
                const isUnavailable = avail && avail.count === 0;
                return (
                  <button
                    key={slot}
                    onClick={() => !isUnavailable && setSelectedTimeSlot(i)}
                    style={{
                      height: 44, borderRadius: tokens.radius.button,
                      fontSize: tokens.font.caption.size, fontWeight: 500,
                      background: isSelected ? tokens.color.primary : isUnavailable ? tokens.color.bgFill : tokens.color.bgCard,
                      color: isSelected ? '#FFFFFF' : isUnavailable ? tokens.color.textDisabled : tokens.color.textBody,
                      border: isSelected ? 'none' : `1px solid ${isUnavailable ? tokens.color.divider : tokens.color.border}`,
                      cursor: isUnavailable ? 'not-allowed' : 'pointer',
                      transition: tokens.motion.fast,
                      opacity: isUnavailable ? 0.5 : 1,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      gap: '1px', lineHeight: '1.2',
                      position: 'relative',
                    }}
                  >
                    <span>{slot}</span>
                    {!isUnavailable && !isSelected && avail && (
                      <span style={{ fontSize: '9px', color: avail.count >= 3 ? tokens.color.success : avail.count >= 2 ? tokens.color.warning : tokens.color.danger }}>
                        {avail.count}人可约
                      </span>
                    )}
                    {isUnavailable && (
                      <span style={{ fontSize: '9px' }}>不可约</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected time — appraiser availability detail */}
            {selectedTimeSlot !== null && appraiserAvailability[timeSlots[selectedTimeSlot]] && appraiserAvailability[timeSlots[selectedTimeSlot]].count > 0 && (
              <div style={{
                marginTop: tokens.space.itemGap,
                padding: tokens.space.itemGap,
                background: tokens.color.primaryLight,
                borderRadius: tokens.radius.cardInner,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.inlineGap, marginBottom: tokens.space.inlineGap }}>
                  <Users size={14} color={tokens.color.primary} />
                  <span style={{ fontSize: tokens.font.caption.size, fontWeight: 600, color: tokens.color.primary }}>
                    {timeSlots[selectedTimeSlot]} 可服务鉴定师（{appraiserAvailability[timeSlots[selectedTimeSlot]].count}人）
                  </span>
                </div>
                <div style={{ display: 'flex', gap: tokens.space.inlineGap, flexWrap: 'wrap' }}>
                  {appraiserAvailability[timeSlots[selectedTimeSlot]].names.map((name) => (
                    <div key={name} style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '6px 10px',
                      background: tokens.color.bgCard,
                      borderRadius: tokens.radius.button,
                      border: `1px solid ${tokens.color.primary}33`,
                    }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%',
                        background: tokens.color.primary,
                        color: '#FFF', fontSize: '11px', fontWeight: 600,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {name.slice(0, 1)}
                      </div>
                      <span style={{ fontSize: tokens.font.caption.size, fontWeight: 500, color: tokens.color.textTitle }}>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Product info section */}
      <div style={{ padding: `${tokens.space.cardPadding} ${tokens.space.pagePadding} 0` }}>
        <SectionHeader title="商品信息" />
        <div style={{ padding: `0 ${tokens.space.pagePadding}` }}>
          <Card padding="none">
            <div style={{ padding: `0 ${tokens.space.cardPadding}` }}>
              <DetailRow label="品牌" value={lead.brand} />
              <DetailRow label="品类" value={lead.category} />
              <DetailRow label="预估数量" value="1 件" />
              <DetailRow label="预估价值" value={<PriceDisplay amount={lead.estimatedValue} size="sm" />} showDivider={false} />
            </div>
          </Card>
        </div>
      </div>

      {/* Address section */}
      <div style={{ padding: `${tokens.space.cardPadding} ${tokens.space.pagePadding} ${tokens.space.cardPadding}` }}>
        <SectionHeader title="客户地址" />
        <div style={{ padding: `0 ${tokens.space.pagePadding}` }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: tokens.space.inlineGap }}>
              <MapPin size={16} color={tokens.color.primary} style={{ marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textBody, lineHeight: '1.6' }}>
                上海市黄浦区淮海中路999号环贸iapm 3号楼1805
              </span>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}

// ============ Customers Tab ============

function CustomersView() {
  const customers = [
    { name: '赵太太', phone: '137****4444', lastDeal: 'Hermes Birkin 30', level: 'VIP', amount: '95,000' },
    { name: '王小姐', phone: '136****3333', lastDeal: 'Chanel CF中号', level: '金卡', amount: '28,000' },
    { name: '李先生', phone: '139****2222', lastDeal: 'Rolex日志型', level: '银卡', amount: '52,000' },
  ];

  const levelTagColor: Record<string, 'orange' | 'gray' | 'purple'> = {
    VIP: 'orange',
    '金卡': 'orange',
    '银卡': 'gray',
  };

  return (
    <PageLayout title="客户管理" subtitle="共 3 位客户">
      <div style={{ paddingTop: tokens.space.itemGap, paddingBottom: tokens.space.cardPadding }}>
        {customers.map((c, i) => (
          <ListItem
            key={i}
            avatar={{ name: c.name, color: tokens.color.primary }}
            title={c.name}
            tags={[{ label: c.level, color: levelTagColor[c.level] || 'gray' }]}
            subtitle={`${c.phone} · 最近：${c.lastDeal}`}
            meta={{
              left: <PriceDisplay amount={c.amount} size="sm" />,
            }}
            onClick={() => {}}
          />
        ))}
      </div>
    </PageLayout>
  );
}

// ============ Profile Tab ============

function ProfileView() {
  const menuItems = [
    { icon: CheckCircle, label: '审批中心', badge: 2 },
    { icon: Bell, label: '消息通知', badge: 5 },
    { icon: HelpCircle, label: '帮助中心', badge: 0 },
    { icon: Settings, label: '设置', badge: 0 },
  ];

  return (
    <PageLayout title="我的">
      {/* Profile card */}
      <div style={{ padding: `${tokens.space.itemGap} ${tokens.space.pagePadding} 0` }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.space.itemGap }}>
            <div style={{
              width: 56, height: 56, borderRadius: tokens.radius.avatar,
              background: tokens.color.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFFFFF', fontSize: '18px', fontWeight: 600,
            }}>
              李静
            </div>
            <div>
              <p style={{ fontSize: tokens.font.bodyLarge.size, fontWeight: tokens.font.bodyLarge.weight, color: tokens.color.textTitle }}>
                李静
              </p>
              <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>
                回收客服 · 上海团队
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: tokens.space.itemGap,
        padding: `${tokens.space.cardPadding} ${tokens.space.pagePadding} 0`,
      }}>
        <StatCard value="12单" label="本月成交" icon={Star} color="blue" />
        <StatCard value="18%" label="转化率" icon={CheckCircle} color="green" />
        <StatCard value="96%" label="好评率" icon={Bell} color="orange" />
      </div>

      {/* Menu list */}
      <div style={{ padding: `${tokens.space.cardPadding} ${tokens.space.pagePadding}` }}>
        <Card padding="none">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', gap: tokens.space.itemGap,
                  padding: `0 ${tokens.space.cardPadding}`,
                  minHeight: 52, background: 'none', border: 'none',
                  borderBottom: i < menuItems.length - 1 ? `1px solid ${tokens.color.divider}` : 'none',
                  cursor: 'pointer', transition: tokens.motion.fast,
                }}
              >
                <Icon size={18} color={tokens.color.textCaption} />
                <span style={{ flex: 1, textAlign: 'left', fontSize: tokens.font.body.size, color: tokens.color.textTitle }}>
                  {item.label}
                </span>
                {item.badge > 0 && (
                  <span style={{
                    background: tokens.color.danger, color: '#FFFFFF',
                    fontSize: tokens.font.mini.size, minWidth: 18, height: 18,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: tokens.radius.tagPill, padding: '0 4px',
                  }}>
                    {item.badge}
                  </span>
                )}
                <ChevronRight size={16} color={tokens.color.textDisabled} />
              </button>
            );
          })}
        </Card>
      </div>
    </PageLayout>
  );
}

// ============ Main Component ============

type TabId = 'dashboard' | 'leads' | 'customers' | 'profile';
const TAB_INDEX_MAP: Record<TabId, number> = { dashboard: 0, leads: 1, customers: 2, profile: 3 };
const INDEX_TAB_MAP: TabId[] = ['dashboard', 'leads', 'customers', 'profile'];

export function CustomerServiceView({ step }: { step: number }) {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showCreateAppointment, setShowCreateAppointment] = useState(false);

  // Step-specific behavior
  useEffect(() => {
    if (step === 0 || step === 1) {
      setActiveTab('leads');
      setSelectedLead(null);
      setShowCreateAppointment(false);
    } else if (step === 2) {
      setActiveTab('leads');
      setSelectedLead(leads[0]); // 张女士
      setShowCreateAppointment(false);
    } else if (step === 3) {
      setActiveTab('leads');
      setSelectedLead(leads[0]);
      setShowCreateAppointment(true);
    } else {
      setActiveTab('dashboard');
      setSelectedLead(null);
      setShowCreateAppointment(false);
    }
  }, [step]);

  const tabs: Array<{ icon: typeof Briefcase; label: string }> = [
    { icon: Briefcase, label: '工作台' },
    { icon: Star, label: '线索' },
    { icon: Users, label: '客户' },
    { icon: User, label: '我的' },
  ];

  // Determine content
  const renderContent = () => {
    if (showCreateAppointment && selectedLead) {
      return (
        <CreateAppointmentView
          lead={selectedLead}
          onBack={() => {
            setShowCreateAppointment(false);
            setSelectedLead(null);
            setActiveTab('leads');
          }}
        />
      );
    }

    if (selectedLead) {
      return (
        <LeadDetailView
          lead={selectedLead}
          step={step}
          onBack={() => setSelectedLead(null)}
          onCreateAppointment={() => setShowCreateAppointment(true)}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            step={step}
            onNavigateLeads={() => setActiveTab('leads')}
          />
        );
      case 'leads':
        return (
          <LeadsView
            step={step}
            onSelectLead={(lead) => setSelectedLead(lead)}
            highlightLeadId={step <= 1 ? 'LD-20260408-001' : undefined}
          />
        );
      case 'customers':
        return <CustomersView />;
      case 'profile':
        return <ProfileView />;
    }
  };

  // Full-screen views (detail, create appointment) handle their own layout including tabs
  const isFullScreen = selectedLead || showCreateAppointment;

  if (isFullScreen) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: tokens.font.family }}>
        {renderContent()}
      </div>
    );
  }

  // Wrap normal views with tab bar from PageLayout
  // We need to re-render the content inside a PageLayout that has tabs.
  // Since each sub-view already uses PageLayout internally for header/scroll,
  // we render them directly and provide the tab bar separately.
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: tokens.font.family }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {renderContent()}
      </div>
      {/* Tab bar */}
      <div style={{
        height: 68,
        background: tokens.color.bgCard,
        borderTop: `1px solid ${tokens.color.divider}`,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        paddingTop: 6,
        paddingBottom: 20,
        flexShrink: 0,
      }}>
        {tabs.map((tab, i) => {
          const active = INDEX_TAB_MAP[i] === activeTab;
          const TabIcon = tab.icon;
          return (
            <button
              key={i}
              onClick={() => setActiveTab(INDEX_TAB_MAP[i])}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '2px', width: 64, background: 'none', border: 'none',
                cursor: 'pointer', padding: 0,
              }}
            >
              <TabIcon
                size={22}
                color={active ? tokens.color.primary : tokens.color.textDisabled}
                strokeWidth={active ? 2 : 1.5}
              />
              <span style={{
                fontSize: tokens.font.mini.size,
                fontWeight: active ? 500 : 400,
                color: active ? tokens.color.primary : tokens.color.textDisabled,
              }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CustomerServiceView;

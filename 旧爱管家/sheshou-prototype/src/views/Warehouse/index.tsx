import React, { useState } from 'react';
import {
  Briefcase, Package, ClipboardList, Search, User,
  Scan, CheckCircle, XCircle, ArrowRight, Truck,
  MapPin, Clock, Box, BarChart3, Camera, FileText,
  Edit3, ShoppingBag, ArrowUpRight, ArrowDownLeft, ArrowLeftRight,
  Eye, Shield, Tag as TagIcon
} from 'lucide-react';
import {
  PageLayout, Card, Tag, ListItem, StatCard, SectionHeader,
  FilterTabs, ActionButton, InfoBanner, DetailRow, PriceDisplay, tokens
} from '../../design';
import { storeToHQFlow, hqAuthFlow, pricingChannels, salesChannels, salesOrderFlow } from '../../mock/postCollectionFlow';

interface WarehouseViewProps {
  step: number;
}

// ---- Phase navigation pills ----
function PhaseNav({ phases, current, onChange }: { phases: string[]; current: number; onChange: (i: number) => void }) {
  return (
    <div style={{ display: 'flex', gap: 6, padding: `8px ${tokens.space.pagePadding}`, overflowX: 'auto' }}>
      {phases.map((label, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          style={{
            padding: '4px 12px',
            borderRadius: 999,
            fontSize: '11px',
            fontWeight: i === current ? 600 : 400,
            whiteSpace: 'nowrap',
            border: 'none',
            cursor: 'pointer',
            background: i === current ? tokens.color.primary : i < current ? tokens.color.successLight : tokens.color.bgFill,
            color: i === current ? '#FFFFFF' : i < current ? tokens.color.success : tokens.color.textCaption,
          }}
        >
          {i < current ? '✓ ' : ''}{label}
        </button>
      ))}
    </div>
  );
}

// ---- Tab Content Components ----

function WorkbenchTab({ step }: { step: number }) {
  const [warehousePhase, setWarehousePhase] = useState(0);

  // Step 14: Full warehouse flow with sub-steps
  if (step === 14) {
    const phases = ['签收核验', '推送复检', '定价', '拍照编辑'];

    return (
      <div style={{ paddingTop: 8 }}>
        <PhaseNav phases={phases} current={warehousePhase} onChange={setWarehousePhase} />

        {/* Phase 0: 签收核验 */}
        {warehousePhase === 0 && (
          <div style={{ paddingTop: 8 }}>
            <SectionHeader title="快递签收" />

            {/* Scan card */}
            <Card className="mx-5 mb-3">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: tokens.radius.cardInner,
                  background: tokens.color.primaryLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Scan size={20} color={tokens.color.primary} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle }}>扫描快递单号</div>
                  <div style={{ fontFamily: 'monospace', fontSize: tokens.font.caption.size, color: tokens.color.primary, marginTop: 2 }}>SF1234567890</div>
                </div>
                <Tag label="已扫描" color="green" size="sm" />
              </div>
              <div style={{
                padding: '8px 12px', background: tokens.color.bgPage, borderRadius: tokens.radius.cardInner,
                fontSize: tokens.font.caption.size, color: tokens.color.textCaption,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Truck size={14} />
                <span>来自 <span style={{ color: tokens.color.textTitle, fontWeight: 500 }}>上海静安门店</span> · 鉴定师 张伟</span>
              </div>
            </Card>

            {/* Product list */}
            <Card className="mx-5 mb-3">
              <div style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle, marginBottom: 12 }}>
                包裹商品 · 3件
              </div>
              {[
                { name: 'Hermes Birkin 30', code: 'SSD-20260408-00001', grade: 'S级', color: '金色' },
                { name: 'Chanel CF中号', code: 'SSD-20260408-00002', grade: 'A级', color: '黑色' },
                { name: 'Chanel Boy中号', code: 'SSD-20260408-00003', grade: 'B级', color: '酒红色' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
                  borderBottom: i < 2 ? `1px solid ${tokens.color.divider}` : 'none',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: tokens.radius.cardInner,
                    background: tokens.color.primaryLight,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 600, color: tokens.color.primary,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle }}>{item.name}</div>
                    <div style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>{item.code} · {item.grade} · {item.color}</div>
                  </div>
                  <CheckCircle size={16} color={tokens.color.success} />
                </div>
              ))}
            </Card>

            {/* Verification checklist */}
            <Card className="mx-5 mb-3">
              <div style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle, marginBottom: 12 }}>核验商品</div>
              {[
                { label: '配件数量与描述一致', passed: true },
                { label: '商品外观与照片一致', passed: true },
                { label: '无调包嫌疑', passed: true },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
                  borderBottom: i < 2 ? `1px solid ${tokens.color.divider}` : 'none',
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: item.passed ? tokens.color.success : tokens.color.bgFill,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <CheckCircle size={14} color="#FFFFFF" />
                  </div>
                  <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textTitle }}>{item.label}</span>
                </div>
              ))}
            </Card>

            <div style={{ padding: `12px ${tokens.space.pagePadding}` }}>
              <ActionButton
                label="核验通过 · 入库"
                variant="success"
                size="lg"
                icon={CheckCircle}
                onClick={() => setWarehousePhase(1)}
              />
            </div>
          </div>
        )}

        {/* Phase 1: 推送复检 */}
        {warehousePhase === 1 && (
          <div style={{ paddingTop: 8 }}>
            <div style={{ padding: `0 ${tokens.space.pagePadding}`, marginBottom: 12 }}>
              <InfoBanner icon={Shield} title="商品已入库，推送到复检部门" color="blue" />
            </div>

            {/* Product auth status */}
            <Card className="mx-5 mb-3">
              <div style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle, marginBottom: 12 }}>复检进度</div>

              {/* Birkin */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Package size={16} color={tokens.color.success} />
                  <span style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle }}>Hermes Birkin 30</span>
                  <div style={{ marginLeft: 'auto' }}><Tag label="复检通过" color="green" size="sm" /></div>
                </div>
                <div style={{ padding: '8px 12px', background: tokens.color.bgPage, borderRadius: tokens.radius.cardInner, fontSize: tokens.font.caption.size }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <CheckCircle size={12} color={tokens.color.success} />
                    <span style={{ color: tokens.color.textCaption }}>A鉴定师 陈鉴定：<span style={{ color: tokens.color.success, fontWeight: 500 }}>真品</span> 14:05</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle size={12} color={tokens.color.success} />
                    <span style={{ color: tokens.color.textCaption }}>B鉴定师 刘鉴定：<span style={{ color: tokens.color.success, fontWeight: 500 }}>真品</span> 14:12</span>
                  </div>
                </div>
              </div>

              {/* CF */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Package size={16} color={tokens.color.success} />
                  <span style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle }}>Chanel CF中号</span>
                  <div style={{ marginLeft: 'auto' }}><Tag label="复检通过" color="green" size="sm" /></div>
                </div>
                <div style={{ padding: '8px 12px', background: tokens.color.bgPage, borderRadius: tokens.radius.cardInner, fontSize: tokens.font.caption.size }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <CheckCircle size={12} color={tokens.color.success} />
                    <span style={{ color: tokens.color.textCaption }}>A鉴定师 陈鉴定：<span style={{ color: tokens.color.success, fontWeight: 500 }}>真品</span> 14:20</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle size={12} color={tokens.color.success} />
                    <span style={{ color: tokens.color.textCaption }}>B鉴定师 刘鉴定：<span style={{ color: tokens.color.success, fontWeight: 500 }}>真品</span> 14:28</span>
                  </div>
                </div>
              </div>

              {/* Boy - complex case */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Package size={16} color={tokens.color.warning} />
                  <span style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle }}>Chanel Boy中号</span>
                  <div style={{ marginLeft: 'auto' }}><Tag label="中检通过" color="orange" size="sm" /></div>
                </div>
                <div style={{ padding: '8px 12px', background: tokens.color.bgPage, borderRadius: tokens.radius.cardInner, fontSize: tokens.font.caption.size }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <CheckCircle size={12} color={tokens.color.success} />
                    <span style={{ color: tokens.color.textCaption }}>A鉴定师 陈鉴定：<span style={{ color: tokens.color.success, fontWeight: 500 }}>真品</span> 14:35</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <XCircle size={12} color={tokens.color.danger} />
                    <span style={{ color: tokens.color.textCaption }}>B鉴定师 刘鉴定：<span style={{ color: tokens.color.danger, fontWeight: 500 }}>假品</span> 14:42</span>
                  </div>
                  <div style={{ height: 1, background: tokens.color.divider, margin: '6px 0' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <Clock size={12} color={tokens.color.warning} />
                    <span style={{ color: tokens.color.textCaption }}>第三人 周鉴定：<span style={{ color: tokens.color.warning, fontWeight: 500 }}>存疑</span> 15:00</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <ArrowRight size={12} color={tokens.color.primary} />
                    <span style={{ color: tokens.color.primary, fontWeight: 500 }}>申请中检鉴定</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle size={12} color={tokens.color.success} />
                    <span style={{ color: tokens.color.textCaption }}>中检结果：<span style={{ color: tokens.color.success, fontWeight: 500 }}>真品</span>（证书 ZJ-2026-04-00823）次日 10:30</span>
                  </div>
                </div>
              </div>
            </Card>

            <div style={{ padding: `12px ${tokens.space.pagePadding}` }}>
              <ActionButton
                label="复检完成 · 出具鉴定报告"
                variant="primary"
                size="lg"
                icon={FileText}
                onClick={() => setWarehousePhase(2)}
              />
            </div>
          </div>
        )}

        {/* Phase 2: 定价 */}
        {warehousePhase === 2 && (
          <div style={{ paddingTop: 8 }}>
            <SectionHeader title="多渠道定价" />

            <Card className="mx-5 mb-3">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Package size={16} color={tokens.color.primary} />
                <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle }}>Hermes Birkin 30</span>
                <Tag label="S级" color="blue" size="sm" />
              </div>

              {pricingChannels.map((ch, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: i < pricingChannels.length - 1 ? `1px solid ${tokens.color.divider}` : 'none',
                }}>
                  <div>
                    <div style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle }}>{ch.channel}</div>
                    <div style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>{ch.desc}</div>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <div style={{
                      padding: '6px 12px',
                      borderRadius: tokens.radius.input,
                      fontSize: tokens.font.body.size,
                      fontWeight: 600,
                      fontVariantNumeric: 'tabular-nums',
                      background: ch.editable ? '#FFFFFF' : tokens.color.bgFill,
                      border: `1px solid ${ch.editable ? tokens.color.primary : tokens.color.border}`,
                      color: ch.editable ? tokens.color.textTitle : tokens.color.textCaption,
                    }}>
                      ¥{ch.value.toLocaleString()}
                    </div>
                    {ch.editable && (
                      <Edit3 size={14} color={tokens.color.primary} />
                    )}
                  </div>
                </div>
              ))}

              {/* Margin calculation */}
              <div style={{
                marginTop: 12, padding: 12, background: tokens.color.successLight, borderRadius: tokens.radius.cardInner,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>零售毛利率</span>
                  <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.success }}>34.7%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>同行毛利率</span>
                  <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.success }}>13.7%</span>
                </div>
              </div>
            </Card>

            <div style={{ padding: `12px ${tokens.space.pagePadding}` }}>
              <ActionButton
                label="确认定价"
                variant="primary"
                size="lg"
                icon={CheckCircle}
                onClick={() => setWarehousePhase(3)}
              />
            </div>
          </div>
        )}

        {/* Phase 3: 拍照编辑 */}
        {warehousePhase === 3 && (
          <div style={{ paddingTop: 8 }}>
            <div style={{ padding: `0 ${tokens.space.pagePadding}`, marginBottom: 12 }}>
              <InfoBanner icon={Camera} title="专业棚拍 + 商品信息编辑" color="blue" />
            </div>

            <Card className="mx-5 mb-3">
              <div style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle, marginBottom: 12 }}>
                Hermes Birkin 30 · 拍照编辑
              </div>

              {/* Photo status */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0',
                borderBottom: `1px solid ${tokens.color.divider}`,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: tokens.radius.cardInner,
                  background: tokens.color.successLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Camera size={18} color={tokens.color.success} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle }}>专业照片</div>
                  <div style={{ fontSize: tokens.font.caption.size, color: tokens.color.success }}>8张专业照片已拍摄</div>
                </div>
                <CheckCircle size={18} color={tokens.color.success} />
              </div>

              {/* Photo grid placeholder */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, padding: '12px 0', borderBottom: `1px solid ${tokens.color.divider}` }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} style={{
                    aspectRatio: '1/1', borderRadius: tokens.radius.cardInner,
                    background: `linear-gradient(135deg, ${tokens.color.primaryLight}, #D4E4FF)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Camera size={14} color={tokens.color.primary} style={{ opacity: 0.4 }} />
                  </div>
                ))}
              </div>

              {/* AI description */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0',
                borderBottom: `1px solid ${tokens.color.divider}`,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: tokens.radius.cardInner,
                  background: tokens.color.successLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Edit3 size={18} color={tokens.color.success} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle }}>商品描述</div>
                  <div style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>AI生成 → 人工审核</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CheckCircle size={14} color={tokens.color.success} />
                  <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.success, fontWeight: 500 }}>已审核</span>
                </div>
              </div>

              {/* Certificate */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: tokens.radius.cardInner,
                  background: tokens.color.successLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Shield size={18} color={tokens.color.success} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle }}>鉴定证书</div>
                  <div style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>复检通过 · 已出具</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CheckCircle size={14} color={tokens.color.success} />
                  <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.success, fontWeight: 500 }}>已出具</span>
                </div>
              </div>
            </Card>

            <div style={{ padding: `12px ${tokens.space.pagePadding}` }}>
              <ActionButton
                label="编辑完成 · 上架销售"
                variant="success"
                size="lg"
                icon={ShoppingBag}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Step 15: Sales flow
  if (step === 15) {
    return (
      <div style={{ paddingTop: 16 }}>
        {/* Channel distribution */}
        <SectionHeader title="渠道分发" />
        <div style={{ padding: `0 ${tokens.space.pagePadding}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          {salesChannels.map((ch, i) => {
            const statusColor = ch.status === '已上架' || ch.status === '已陈列' || ch.status === '展示中'
              ? tokens.color.success
              : ch.status === '审核中'
              ? tokens.color.warning
              : tokens.color.textCaption;
            const statusTag = ch.status === '已上架' || ch.status === '展示中' || ch.status === '已陈列'
              ? 'green' as const
              : 'orange' as const;

            return (
              <Card key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: tokens.radius.tag,
                    background: tokens.color.primaryLight,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px',
                  }}>
                    {ch.name === '抖音' ? '📱' : ch.name === '小红书' ? '📕' : ch.name === '得物' ? '👟' : ch.name === '闲鱼' ? '🐟' : '🏪'}
                  </div>
                  <span style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle }}>{ch.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Tag label={ch.status} color={statusTag} size="sm" />
                  {ch.views > 0 && (
                    <span style={{ fontSize: '11px', color: tokens.color.textCaption }}>
                      <Eye size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} />
                      {ch.views.toLocaleString()}
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Sales order card */}
        <SectionHeader title="最近销售" />
        <Card className="mx-5 mb-3">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <ShoppingBag size={16} color={tokens.color.primary} />
            <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle }}>
              {salesOrderFlow[0].status === '待支付' ? 'SALE-20260415-001' : salesOrderFlow[0].status}
            </span>
            <div style={{ marginLeft: 'auto' }}>
              <PriceDisplay amount="125,000" size="md" />
            </div>
          </div>
          <DetailRow label="商品" value="Hermes Birkin 30" />
          <DetailRow label="渠道" value="抖音直播" />
          <DetailRow label="买家" value="周女士" showDivider={false} />

          {/* Timeline */}
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${tokens.color.divider}` }}>
            {[
              { step: '下单', time: '04-15 20:35', done: true, detail: '买家下单支付 ¥125,000' },
              { step: '出库', time: '04-15 21:00', done: true, detail: '仓库扫码出库 A区-03-12' },
              { step: '发货', time: '04-16 09:00', done: true, detail: '顺丰发货 SF9876543210' },
              { step: '签收', time: '04-17 14:30', done: true, detail: '买家已签收确认' },
              { step: '结算', time: '04-17 15:00', done: false, detail: '待财务结算打款' },
            ].map((item, i, arr) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < arr.length - 1 ? 0 : 0 }}>
                {/* Timeline line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20 }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: '50%',
                    background: item.done ? tokens.color.success : !item.done && i === arr.length - 1 ? tokens.color.primary : tokens.color.bgFill,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: !item.done && i !== arr.length - 1 ? `2px solid ${tokens.color.border}` : 'none',
                    flexShrink: 0,
                  }}>
                    {item.done && <CheckCircle size={10} color="#FFFFFF" />}
                    {!item.done && i === arr.length - 1 && <Clock size={8} color="#FFFFFF" />}
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 20, background: item.done ? tokens.color.success : tokens.color.border }} />
                  )}
                </div>
                {/* Content */}
                <div style={{ flex: 1, paddingBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      fontSize: tokens.font.body.size, fontWeight: 500,
                      color: item.done ? tokens.color.textTitle : tokens.color.primary,
                    }}>{item.step}</span>
                    <span style={{ fontSize: '11px', color: tokens.color.textCaption }}>{item.time}</span>
                  </div>
                  <div style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginTop: 2 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Inventory actions */}
        <SectionHeader title="库存操作" />
        <div style={{ padding: `0 ${tokens.space.pagePadding}`, display: 'flex', gap: 8 }}>
          {[
            { label: '借出', icon: ArrowUpRight, color: tokens.color.warning, bg: tokens.color.warningLight },
            { label: '归还', icon: ArrowDownLeft, color: tokens.color.success, bg: tokens.color.successLight },
            { label: '调拨', icon: ArrowLeftRight, color: tokens.color.primary, bg: tokens.color.primaryLight },
          ].map((action) => {
            const ActionIcon = action.icon;
            return (
              <div key={action.label} style={{
                flex: 1, padding: '14px 0', borderRadius: tokens.radius.card,
                background: action.bg, display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 6, cursor: 'pointer',
              }}>
                <ActionIcon size={22} color={action.color} />
                <span style={{ fontSize: tokens.font.caption.size, fontWeight: 500, color: action.color }}>{action.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Default workbench
  return (
    <div style={{ paddingTop: 16 }}>
      {/* Stat cards */}
      <div style={{ padding: `0 ${tokens.space.pagePadding}`, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
        <StatCard value={5} label="待入库" icon={Package} color="blue" />
        <StatCard value={2} label="待调拨" icon={Truck} color="orange" />
        <StatCard value={3} label="待签收" icon={Scan} color="red" />
      </div>

      {/* Quick scan */}
      <Card className="mx-5 mb-3" onClick={() => {}}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: tokens.radius.cardInner,
            background: tokens.color.primaryLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Scan size={24} color={tokens.color.primary} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '15px', fontWeight: 500, color: tokens.color.textTitle }}>快捷扫码入库</div>
            <div style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginTop: 2 }}>扫描唯一码完成入库操作</div>
          </div>
          <ArrowRight size={16} color={tokens.color.textDisabled} />
        </div>
      </Card>

      {/* Recent items */}
      <div style={{ marginTop: 16 }}>
        <SectionHeader title="最近入库" action={{ label: '全部', onClick: () => {} }} />
      </div>

      {[
        { name: 'Hermes Birkin 30', code: 'SSD-20260408-00001 · 已入库', tagLabel: '已入库', tagColor: 'green' as const, time: '10:30' },
        { name: 'Chanel CF中号', code: 'SSD-20260408-00002 · 已入库', tagLabel: '已入库', tagColor: 'green' as const, time: '10:15' },
        { name: 'LV Neverfull MM', code: 'SSD-20260407-00004 · 待入库', tagLabel: '待入库', tagColor: 'blue' as const, time: '昨日' },
      ].map((item, i) => (
        <ListItem
          key={i}
          avatar={{ name: item.name, color: item.tagColor === 'green' ? tokens.color.successLight : tokens.color.primaryLight }}
          title={item.name}
          subtitle={item.code}
          tags={[{ label: item.tagLabel, color: item.tagColor }]}
          titleRight={<span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>{item.time}</span>}
        />
      ))}
    </div>
  );
}

function InboundTab() {
  const [filterIndex, setFilterIndex] = useState(0);
  const filterLabels = ['全部', '待入库', '已入库'];

  const items = [
    { name: 'LV Neverfull MM', code: 'SSD-20260407-00004 · A级 · 来自 张伟', tagLabel: '待入库', group: '待入库', tagColor: 'blue' as const, time: '2h前' },
    { name: 'Cartier LOVE手镯', code: 'SSD-20260407-00008 · S级 · 来自 王强', tagLabel: '待入库', group: '待入库', tagColor: 'blue' as const, time: '3h前' },
    { name: 'Hermes Birkin 30', code: 'SSD-20260408-00001 · S级 · 来自 张伟', tagLabel: '已入库', group: '已入库', tagColor: 'green' as const, time: '10:30' },
    { name: 'Chanel CF中号', code: 'SSD-20260408-00002 · A级 · 来自 张伟', tagLabel: '已入库', group: '已入库', tagColor: 'green' as const, time: '10:15' },
    { name: 'Rolex 日志型', code: 'SSD-20260406-00005 · A级 · 来自 王强', tagLabel: '已入库', group: '已入库', tagColor: 'green' as const, time: '昨日' },
  ];

  const activeFilter = filterLabels[filterIndex];
  const filtered = activeFilter === '全部' ? items : items.filter(i => i.group === activeFilter);

  return (
    <div style={{ paddingTop: 8 }}>
      <FilterTabs
        tabs={filterLabels.map(l => ({ label: l }))}
        activeIndex={filterIndex}
        onChange={setFilterIndex}
      />

      {filtered.map((item, i) => (
        <ListItem
          key={i}
          avatar={{ name: item.name, color: item.tagColor === 'green' ? tokens.color.successLight : tokens.color.primaryLight }}
          title={item.name}
          subtitle={item.code}
          tags={[{ label: item.tagLabel, color: item.tagColor }]}
          titleRight={<span style={{ fontSize: '11px', color: tokens.color.textDisabled }}>{item.time}</span>}
        />
      ))}
    </div>
  );
}

function TransferTab() {
  return (
    <div style={{ paddingTop: 16 }}>
      {[
        { id: 'TR-20260408-001', from: '总部仓库 A区', to: '上海展厅', product: 'LV Speedy 25 · 老花', code: 'SSD-20260404-00007' },
        { id: 'TR-20260408-002', from: '总部仓库 B区', to: '北京门店', product: 'Gucci Marmont · 黑色', code: 'SSD-20260405-00009' },
      ].map((item, i) => (
        <Card key={i} className="mx-5 mb-3">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Truck size={16} color={tokens.color.warning} />
            <span style={{ fontSize: tokens.font.body.size, fontWeight: 600, color: tokens.color.textTitle }}>调拨单 {item.id}</span>
            <div style={{ marginLeft: 'auto' }}>
              <Tag label="待调拨" color="orange" size="sm" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: tokens.font.caption.size, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: tokens.color.textCaption }}>
              <MapPin size={12} />
              <span>{item.from}</span>
            </div>
            <ArrowRight size={12} color={tokens.color.textDisabled} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: tokens.color.primary }}>
              <MapPin size={12} />
              <span>{item.to}</span>
            </div>
          </div>
          <DetailRow label="商品" value={item.product} />
          <DetailRow label="唯一码" value={<span style={{ fontFamily: 'monospace', fontSize: tokens.font.caption.size }}>{item.code}</span>} showDivider={false} />
        </Card>
      ))}
    </div>
  );
}

function InventoryTab() {
  return (
    <div style={{ paddingTop: 16 }}>
      {/* Inventory summary */}
      <div style={{ padding: `0 ${tokens.space.pagePadding}`, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
        <StatCard value={128} label="总库存(件)" icon={Box} color="blue" />
        <StatCard value={45} label="本月入库" icon={Package} color="green" />
        <StatCard value={38} label="本月出库" icon={Truck} color="orange" />
      </div>

      {/* Category breakdown */}
      <SectionHeader title="品类分布" />
      <div style={{ padding: `0 ${tokens.space.pagePadding}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { name: '包袋', count: 68, icon: Box, color: tokens.color.primary, bg: tokens.color.primaryLight, pct: 53 },
          { name: '腕表', count: 32, icon: Clock, color: tokens.color.warning, bg: tokens.color.warningLight, pct: 25 },
          { name: '首饰', count: 18, icon: Package, color: tokens.color.success, bg: tokens.color.successLight, pct: 14 },
          { name: '黄金', count: 10, icon: BarChart3, color: tokens.color.danger, bg: tokens.color.dangerLight, pct: 8 },
        ].map((cat) => {
          const CatIcon = cat.icon;
          return (
            <Card key={cat.name}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: tokens.radius.tag,
                  background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <CatIcon size={20} color={cat.color} />
                </div>
                <span style={{ fontSize: tokens.font.body.size, fontWeight: 500, color: tokens.color.textTitle }}>{cat.name}</span>
              </div>
              <div style={{ fontSize: tokens.font.numLarge.size, fontWeight: 700, color: tokens.color.textTitle }}>
                {cat.count}
                <span style={{ fontSize: tokens.font.caption.size, fontWeight: 400, color: tokens.color.textCaption, marginLeft: 2 }}>件</span>
              </div>
              <div style={{ marginTop: 6, height: 6, background: tokens.color.bgFill, borderRadius: tokens.radius.tagPill, overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: tokens.radius.tagPill, background: cat.color, width: `${cat.pct}%` }} />
              </div>
              <div style={{ fontSize: '11px', color: tokens.color.textCaption, marginTop: 2 }}>{cat.pct}%</div>
            </Card>
          );
        })}
      </div>
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
            <div style={{ fontSize: tokens.font.numMedium.size, fontWeight: 600, color: tokens.color.textTitle }}>郑凯</div>
            <div style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption }}>仓管 · 总部仓库</div>
            <div style={{ fontSize: tokens.font.caption.size, color: tokens.color.textDisabled, marginTop: 2 }}>138****0010</div>
          </div>
        </div>
      </Card>

      <Card className="mx-5" padding="none">
        {[
          { label: '本月入库', value: '45件' },
          { label: '本月出库', value: '38件' },
          { label: '复检通过率', value: '97.2%' },
          { label: '工作日志', value: '' },
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

export function WarehouseView({ step }: WarehouseViewProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Force workbench tab when step is 14 or 15 for demo purposes
  const effectiveTab = (step === 14 || step === 15) ? 0 : activeTab;

  const tabs = [
    { icon: Briefcase, label: '工作台' },
    { icon: Package, label: '入库' },
    { icon: ClipboardList, label: '调拨' },
    { icon: Search, label: '盘点' },
    { icon: User, label: '我的' },
  ];

  const renderContent = () => {
    switch (effectiveTab) {
      case 0: return <WorkbenchTab step={step} />;
      case 1: return <InboundTab />;
      case 2: return <TransferTab />;
      case 3: return <InventoryTab />;
      case 4: return <ProfileTab />;
      default: return <WorkbenchTab step={step} />;
    }
  };

  const titleMap: Record<number, { title: string; subtitle?: string }> = {
    14: { title: '签收复检', subtitle: '待复检商品' },
    15: { title: '仓管工作台', subtitle: '4月9日' },
  };
  const defaultTitle = { title: effectiveTab === 1 ? '入库管理' : effectiveTab === 2 ? '调拨管理' : effectiveTab === 3 ? '库存盘点' : effectiveTab === 4 ? '我的' : '仓管工作台', subtitle: effectiveTab === 0 ? '4月9日' : effectiveTab === 2 ? '待调拨' : undefined };
  const header = (step === 14 || step === 15) ? titleMap[step] : defaultTitle;

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

export default WarehouseView;

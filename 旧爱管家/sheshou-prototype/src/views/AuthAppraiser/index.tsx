import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Ban,
  Package,
  ZoomIn,
  X,
  Home,
  FileSearch,
  AlertCircle,
  User,
  ArrowRight,
  ArrowDown,
  Shield,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import {
  PageLayout, Card, Tag, ListItem, StatCard, SectionHeader,
  ActionButton, InfoBanner, DetailRow, tokens,
} from '../../design';

interface AuthAppraiserViewProps {
  step: number;
}

const PAGE_TABS = [
  { icon: Home, label: '工作台' },
  { icon: FileSearch, label: '图鉴' },
  { icon: AlertCircle, label: '疑难件' },
  { icon: User, label: '我的' },
] as const;

/* ==================== Verdict Types & Data ==================== */

type VerdictKey = '正品' | '假货' | '需总部复检' | '延迟鉴定' | '无法判断' | '超出鉴定范围';

interface VerdictOption {
  key: VerdictKey;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  lightBg: string;
  phrases: string[];
  needsReason: boolean;
}

const VERDICT_OPTIONS: VerdictOption[] = [
  {
    key: '正品', label: '正品', icon: CheckCircle2,
    color: tokens.color.success, bgColor: tokens.color.success, lightBg: tokens.color.successLight,
    phrases: [], needsReason: false,
  },
  {
    key: '假货', label: '假货', icon: XCircle,
    color: tokens.color.danger, bgColor: tokens.color.danger, lightBg: tokens.color.dangerLight,
    phrases: ['五金刻印不符', '走线工艺异常', '皮质纹理不对', 'Logo字体偏差', '序列号无法验证', '内标印刷瑕疵'],
    needsReason: false,
  },
  {
    key: '需总部复检', label: '需总部复检', icon: Package,
    color: tokens.color.primary, bgColor: tokens.color.primary, lightBg: tokens.color.primaryLight,
    phrases: ['图片不够清晰需实物', '该款存在高仿版本需上手', '需专业仪器检测'],
    needsReason: false,
  },
  {
    key: '延迟鉴定', label: '延迟鉴定', icon: Clock,
    color: tokens.color.warning, bgColor: tokens.color.warning, lightBg: tokens.color.warningLight,
    phrases: ['需查阅品牌档案资料', '需联系第三方鉴定机构', '该款为罕见限量版需核实'],
    needsReason: false,
  },
  {
    key: '无法判断', label: '无法判断', icon: HelpCircle,
    color: tokens.color.textCaption, bgColor: tokens.color.textCaption, lightBg: tokens.color.bgFill,
    phrases: ['配件疑似非原装', '版型与数据库不符但无法确认', '存在后期修复痕迹'],
    needsReason: true,
  },
  {
    key: '超出鉴定范围', label: '超出范围', icon: Ban,
    color: tokens.color.textCaption, bgColor: tokens.color.textCaption, lightBg: tokens.color.bgFill,
    phrases: ['此品牌暂不在鉴定范围内', '此品类需专项鉴定师', '非标品无法图片鉴定'],
    needsReason: false,
  },
];

const PHOTO_POINTS = ['正面全貌', '底部刻印', 'Logo特写', '拉链头', '走线细节', '内标', '锁扣/五金', '序列号'];

/* ==================== Main Component ==================== */

export function AuthAppraiserView({ step }: AuthAppraiserViewProps) {
  const autoTab = (step === 10 || step === 11) ? 1 : 0;
  const [activeTab, setActiveTab] = useState(autoTab);

  useEffect(() => {
    if (step === 10 || step === 11) setActiveTab(1);
  }, [step]);

  const tabContent = [
    <WorkbenchTab key="wb" />,
    <AuthTab key="at" step={step} />,
    <DifficultCasesTab key="dc" />,
    <ProfileTab key="pf" />,
  ];

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

/* ==================== Workbench Tab ==================== */

function WorkbenchTab() {
  const queueItems = [
    { id: 'SSD-20260408-00001', name: 'Hermès Birkin 30', brand: 'Hermès', grade: 'A', time: '14:38', material: 'Togo牛皮', color: '金棕色' },
    { id: 'SSD-20260408-00002', name: 'Chanel CF中号', brand: 'Chanel', grade: 'A', time: '14:42', material: '荔枝纹牛皮', color: '黑色' },
    { id: 'SSD-20260408-00003', name: 'Chanel Boy中号', brand: 'Chanel', grade: 'B', time: '14:55', material: '小羊皮', color: '黑色' },
  ];

  return (
    <div style={{ paddingTop: tokens.space.itemGap, paddingBottom: tokens.space.sectionGap }}>
      {/* Header */}
      <div style={{ padding: `0 ${tokens.space.pagePadding}`, marginBottom: tokens.space.pagePadding }}>
        <h1 style={{ fontSize: tokens.font.pageTitle.size, fontWeight: tokens.font.pageTitle.weight, lineHeight: tokens.font.pageTitle.lineHeight, color: tokens.color.textTitle, letterSpacing: '-0.02em', margin: 0 }}>
          图鉴工作台
        </h1>
        <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginTop: '4px' }}>
          周婷 · P3高级鉴定师
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: tokens.space.itemGap, padding: `0 ${tokens.space.cardPadding}`, marginBottom: tokens.space.pagePadding }}>
        <StatCard value={3} label="待鉴定" icon={AlertCircle} color="red" />
        <StatCard value={8} label="今日已鉴" icon={CheckCircle2} color="green" />
        <StatCard value="96%" label="准确率" icon={Shield} color="blue" />
      </div>

      {/* Queue */}
      <SectionHeader title="待鉴定队列" />

      {queueItems.map((item) => (
        <ListItem
          key={item.id}
          title={item.name}
          subtitle={`${item.material} · ${item.color}`}
          tags={[
            { label: item.brand, color: 'blue' as const },
            { label: `${item.grade}级`, color: item.grade === 'A' ? 'green' as const : 'orange' as const },
          ]}
          titleRight={
            <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>{item.time}</span>
          }
          meta={{
            left: <span style={{ fontSize: tokens.font.mini.size, color: tokens.color.textDisabled }}>{item.id}</span>,
          }}
          onClick={() => {}}
        />
      ))}
    </div>
  );
}

/* ==================== Auth Tab ==================== */

function AuthTab({ step }: { step: number }) {
  if (step === 11) return <AuthResultsView />;
  return <AuthDetailView />;
}

/* ---------- Authentication Detail View (step === 10 or default) ---------- */

function AuthDetailView() {
  const [selectedVerdict, setSelectedVerdict] = useState<VerdictKey | null>(null);
  const [selectedPhrases, setSelectedPhrases] = useState<string[]>([]);
  const [customReason, setCustomReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [zoomedPhoto, setZoomedPhoto] = useState<number | null>(null);

  const currentOption = VERDICT_OPTIONS.find(v => v.key === selectedVerdict);

  const handleVerdictSelect = (key: VerdictKey) => {
    setSelectedVerdict(key);
    setSelectedPhrases([]);
    setCustomReason('');
  };

  const handlePhraseToggle = (phrase: string) => {
    setSelectedPhrases(prev =>
      prev.includes(phrase) ? prev.filter(p => p !== phrase) : [...prev, phrase]
    );
    // Auto-fill textarea with selected phrases
    if (!selectedPhrases.includes(phrase)) {
      setCustomReason(prev => prev ? `${prev}；${phrase}` : phrase);
    } else {
      const remaining = selectedPhrases.filter(p => p !== phrase);
      setCustomReason(remaining.join('；'));
    }
  };

  const handleSubmit = () => {
    if (selectedVerdict) setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div style={{ paddingTop: tokens.space.itemGap, paddingBottom: tokens.space.sectionGap }}>
        <div style={{ padding: `0 ${tokens.space.pagePadding}`, marginBottom: tokens.space.pagePadding }}>
          <h1 style={{ fontSize: tokens.font.pageTitle.size, fontWeight: tokens.font.pageTitle.weight, lineHeight: tokens.font.pageTitle.lineHeight, color: tokens.color.textTitle, letterSpacing: '-0.02em', margin: 0 }}>
            鉴定已提交
          </h1>
          <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginTop: '4px' }}>
            等待B鉴定师完成鉴定后出最终结论
          </p>
        </div>

        <Card className="mx-5 mb-3">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Tag label="Hermès" color="blue" size="sm" />
            <Tag label="Birkin 30" color="gray" size="sm" />
            <Tag label="A级" color="green" size="sm" />
          </div>
          <DetailRow label="我的结论" value={
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: currentOption?.color }}>
              {currentOption && React.createElement(currentOption.icon, { size: 14 })}
              <span style={{ fontWeight: 600 }}>{selectedVerdict}</span>
            </div>
          } />
          {customReason && <DetailRow label="备注" value={<span style={{ fontSize: tokens.font.caption.size, maxWidth: 180, textAlign: 'right' as const }}>{customReason}</span>} showDivider={false} />}
          <DetailRow label="提交时间" value="14:52" showDivider={false} />
        </Card>

        <InfoBanner
          icon={Clock}
          title="B鉴定师 吴昊 尚未完成鉴定"
          subtitle="结果将在双方完成后自动对比"
          color="blue"
        />
      </div>
    );
  }

  return (
    <div style={{ paddingTop: tokens.space.itemGap, paddingBottom: tokens.space.sectionGap }}>
      {/* Zoomed photo overlay */}
      {zoomedPhoto !== null && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setZoomedPhoto(null)}
        >
          <div style={{
            position: 'relative', width: 340, height: 340, borderRadius: tokens.radius.card,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: `linear-gradient(135deg, ${tokens.color.bgFill} 0%, ${tokens.color.border} 100%)`,
          }}>
            <ZoomIn size={32} color={tokens.color.textCaption} style={{ marginBottom: 8 }} />
            <span style={{ fontSize: tokens.font.bodyLarge.size, color: tokens.color.textBody, fontWeight: 500 }}>
              {PHOTO_POINTS[zoomedPhoto]}
            </span>
            <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginTop: 4 }}>
              点击任意位置关闭
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); setZoomedPhoto(null); }}
              style={{
                position: 'absolute', top: 12, right: 12, width: 32, height: 32,
                background: `${tokens.color.bgCard}E6`, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: 'none', cursor: 'pointer', boxShadow: tokens.shadow.card,
              }}
            >
              <X size={16} color={tokens.color.textTitle} />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ padding: `0 ${tokens.space.pagePadding}`, marginBottom: tokens.space.pagePadding }}>
        <h1 style={{ fontSize: tokens.font.pageTitle.size, fontWeight: tokens.font.pageTitle.weight, lineHeight: tokens.font.pageTitle.lineHeight, color: tokens.color.textTitle, letterSpacing: '-0.02em', margin: 0 }}>
          图鉴鉴定
        </h1>
        <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginTop: '4px' }}>
          SSD-20260408-00001
        </p>
      </div>

      {/* 1. Product info bar */}
      <Card className="mx-5 mb-3">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
          <Tag label="Hermès" color="blue" size="sm" />
          <Tag label="Birkin 30" color="gray" size="sm" />
          <Tag label="SSD-001" color="gray" size="sm" />
          <Tag label="A级" color="green" size="sm" />
        </div>
        <h2 style={{ fontSize: tokens.font.numMedium.size, fontWeight: tokens.font.numMedium.weight, color: tokens.color.textTitle, margin: 0 }}>
          Hermès Birkin 30 Togo金棕色
        </h2>
        <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginTop: '4px' }}>
          Togo牛皮 · 金扣 · 附件：防尘袋/锁/钥匙
        </p>
      </Card>

      {/* 2. Photo grid */}
      <Card className="mx-5 mb-3">
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontSize: tokens.font.sectionTitle.size, fontWeight: tokens.font.sectionTitle.weight, color: tokens.color.textTitle }}>
            鉴定点照片
          </span>
          <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginLeft: 8 }}>
            共{PHOTO_POINTS.length}张
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {PHOTO_POINTS.map((point, i) => {
            const gradients = [
              `linear-gradient(135deg, ${tokens.color.primaryLight} 0%, ${tokens.color.bgFill} 100%)`,
              `linear-gradient(135deg, ${tokens.color.bgFill} 0%, ${tokens.color.border} 100%)`,
              `linear-gradient(135deg, ${tokens.color.warningLight} 0%, ${tokens.color.bgFill} 100%)`,
              `linear-gradient(135deg, ${tokens.color.successLight} 0%, ${tokens.color.bgFill} 100%)`,
            ];
            return (
              <button
                key={point}
                onClick={() => setZoomedPhoto(i)}
                className="active:scale-95"
                style={{
                  aspectRatio: '1', borderRadius: tokens.radius.cardInner,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  border: 'none', cursor: 'pointer', transition: tokens.motion.fast,
                  background: gradients[i % 4],
                  gap: '2px',
                }}
              >
                <ZoomIn size={14} color={tokens.color.textCaption} />
                <span style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption, fontWeight: tokens.font.mini.weight, lineHeight: '1.2', textAlign: 'center' as const }}>
                  {point}
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* 3. Appraiser info banner */}
      <div style={{ padding: `0 ${tokens.space.pagePadding}`, marginBottom: tokens.space.itemGap }}>
        <InfoBanner
          icon={Shield}
          title="当前鉴定师: 周婷 (P3高级) · A鉴定师"
          color="blue"
        />
      </div>

      {/* 4. Verdict Selection Panel */}
      <Card className="mx-5 mb-3">
        <div style={{ marginBottom: tokens.space.itemGap }}>
          <span style={{ fontSize: tokens.font.sectionTitle.size, fontWeight: tokens.font.sectionTitle.weight, color: tokens.color.textTitle }}>
            鉴定结论
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {VERDICT_OPTIONS.map((opt) => {
            const isSelected = selectedVerdict === opt.key;
            const VIcon = opt.icon;
            return (
              <button
                key={opt.key}
                onClick={() => handleVerdictSelect(opt.key)}
                className="active:scale-95"
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: '6px', padding: '12px 4px', borderRadius: tokens.radius.cardInner,
                  cursor: 'pointer', transition: tokens.motion.normal,
                  border: isSelected ? `2px solid ${opt.color}` : `1px solid ${tokens.color.border}`,
                  background: isSelected ? opt.lightBg : tokens.color.bgCard,
                  boxShadow: isSelected ? `0 0 0 3px ${opt.color}20` : 'none',
                }}
              >
                <VIcon size={20} color={isSelected ? opt.color : tokens.color.textCaption} />
                <span style={{
                  fontSize: tokens.font.caption.size, fontWeight: 600,
                  color: isSelected ? opt.color : tokens.color.textBody,
                  textAlign: 'center' as const, lineHeight: '1.3',
                }}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* 5. Quick Phrases Panel (shown when verdict is not 正品 and has phrases) */}
      {selectedVerdict && selectedVerdict !== '正品' && currentOption && currentOption.phrases.length > 0 && (
        <Card className="mx-5 mb-3">
          <div style={{ marginBottom: '10px' }}>
            <span style={{ fontSize: tokens.font.sectionTitle.size, fontWeight: tokens.font.sectionTitle.weight, color: tokens.color.textTitle }}>
              快捷短语
            </span>
          </div>
          {/* Scrollable phrase pills */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px',
          }}>
            {currentOption.phrases.map((phrase) => {
              const active = selectedPhrases.includes(phrase);
              return (
                <button
                  key={phrase}
                  onClick={() => handlePhraseToggle(phrase)}
                  className="active:scale-95"
                  style={{
                    padding: '6px 12px', borderRadius: tokens.radius.tagPill,
                    fontSize: tokens.font.caption.size, fontWeight: 500,
                    cursor: 'pointer', transition: tokens.motion.fast,
                    border: active ? `1px solid ${currentOption.color}` : `1px solid ${tokens.color.border}`,
                    background: active ? currentOption.lightBg : tokens.color.bgFill,
                    color: active ? currentOption.color : tokens.color.textBody,
                  }}
                >
                  {phrase}
                </button>
              );
            })}
          </div>
          {/* Reason textarea */}
          <textarea
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            placeholder={currentOption.needsReason ? '请输入详细原因（必填）...' : '补充说明（选填）...'}
            style={{
              width: '100%', height: 72, padding: tokens.space.itemGap,
              background: tokens.color.bgPage, borderRadius: tokens.radius.input,
              fontSize: tokens.font.body.size, color: tokens.color.textTitle,
              border: `1px solid ${tokens.color.border}`, outline: 'none', resize: 'none',
              fontFamily: tokens.font.family, boxSizing: 'border-box' as const,
            }}
          />
        </Card>
      )}

      {/* 6. Submit button */}
      <div style={{ padding: `8px ${tokens.space.pagePadding}` }}>
        <ActionButton
          label="提交鉴定结果"
          variant="primary"
          size="lg"
          disabled={!selectedVerdict || (currentOption?.needsReason && !customReason.trim())}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

/* ---------- Authentication Results View (step === 11) ---------- */

function AuthResultsView() {
  return (
    <div style={{ paddingTop: tokens.space.itemGap, paddingBottom: tokens.space.sectionGap }}>
      {/* Header */}
      <div style={{ padding: `0 ${tokens.space.pagePadding}`, marginBottom: tokens.space.pagePadding }}>
        <h1 style={{ fontSize: tokens.font.pageTitle.size, fontWeight: tokens.font.pageTitle.weight, lineHeight: tokens.font.pageTitle.lineHeight, color: tokens.color.textTitle, letterSpacing: '-0.02em', margin: 0 }}>
          鉴定结果
        </h1>
        <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginTop: '4px' }}>
          3件商品鉴定完成
        </p>
      </div>

      {/* ===== Product 1: Hermès Birkin 30 — Both authentic ===== */}
      <Card className="mx-5 mb-3" padding="none">
        {/* Green header bar */}
        <div style={{
          background: tokens.color.success, padding: '10px 16px',
          borderRadius: `${tokens.radius.card} ${tokens.radius.card} 0 0`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} color="#fff" />
            <span style={{ fontSize: tokens.font.bodyLarge.size, fontWeight: 600, color: '#fff' }}>鉴定通过</span>
          </div>
          <span style={{ fontSize: tokens.font.caption.size, color: 'rgba(255,255,255,0.8)' }}>
            Hermès Birkin 30
          </span>
        </div>
        <div style={{ padding: tokens.space.cardPadding }}>
          {/* A appraiser */}
          <AppraiserRow role="A" name="周婷" level="P3" verdict="正品" verdictColor={tokens.color.success} verdictIcon={CheckCircle2} />
          <div style={{ height: 1, background: tokens.color.divider, margin: '8px 0' }} />
          {/* B appraiser */}
          <AppraiserRow role="B" name="吴昊" level="P3" verdict="正品" verdictColor={tokens.color.success} verdictIcon={CheckCircle2} />
        </div>
        {/* Result banner */}
        <div style={{
          background: tokens.color.successLight, padding: '12px 16px',
          borderRadius: `0 0 ${tokens.radius.card} ${tokens.radius.card}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <span style={{ fontSize: tokens.font.body.size, color: tokens.color.success, fontWeight: 600 }}>
            双真 → 最终结论：正品
          </span>
          <CheckCircle2 size={16} color={tokens.color.success} />
        </div>
      </Card>

      {/* ===== Product 2: Chanel CF中号 — Compact card ===== */}
      <Card className="mx-5 mb-3">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: tokens.font.bodyLarge.size, fontWeight: 600, color: tokens.color.textTitle }}>
                Chanel CF中号
              </span>
              <Tag label="Chanel" color="blue" size="sm" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>
              <span>A真</span>
              <span>+</span>
              <span>B真</span>
              <ArrowRight size={12} color={tokens.color.textCaption} />
              <span style={{ color: tokens.color.success, fontWeight: 600 }}>正品</span>
              <CheckCircle2 size={12} color={tokens.color.success} />
            </div>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', background: tokens.color.successLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CheckCircle2 size={20} color={tokens.color.success} />
          </div>
        </div>
      </Card>

      {/* ===== Product 3: Chanel Boy中号 — Complex disagreement case ===== */}
      <Card className="mx-5 mb-3" padding="none">
        {/* Orange header bar */}
        <div style={{
          background: tokens.color.warning, padding: '10px 16px',
          borderRadius: `${tokens.radius.card} ${tokens.radius.card} 0 0`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} color="#fff" />
            <span style={{ fontSize: tokens.font.bodyLarge.size, fontWeight: 600, color: '#fff' }}>鉴定分歧 · 需仲裁</span>
          </div>
        </div>
        <div style={{ padding: `4px ${tokens.space.cardPadding} 0` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '10px 0 8px' }}>
            <Tag label="Chanel" color="blue" size="sm" />
            <Tag label="Boy中号" color="gray" size="sm" />
            <Tag label="B级" color="orange" size="sm" />
          </div>
        </div>

        <div style={{ padding: `0 ${tokens.space.cardPadding}` }}>
          {/* A appraiser */}
          <AppraiserRow role="A" name="周婷" level="P3" verdict="正品" verdictColor={tokens.color.success} verdictIcon={CheckCircle2} />
          <div style={{ height: 1, background: tokens.color.divider, margin: '8px 0' }} />
          {/* B appraiser */}
          <AppraiserRow role="B" name="吴昊" level="P3" verdict="无法判断" verdictColor={tokens.color.textCaption} verdictIcon={HelpCircle} reason="配件疑似非原装" />
        </div>

        {/* AB disagreement notice */}
        <div style={{
          margin: `12px ${tokens.space.cardPadding}`,
          background: tokens.color.warningLight, borderRadius: tokens.radius.cardInner,
          padding: '10px 12px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <AlertTriangle size={14} color={tokens.color.warning} />
          <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.warning, fontWeight: 600 }}>
            AB结论不一致 → 系统自动分配C鉴定师
          </span>
        </div>

        {/* C appraiser intervention */}
        <div style={{
          margin: `0 ${tokens.space.cardPadding}`, marginBottom: '12px',
          border: `1px solid ${tokens.color.primary}30`,
          borderRadius: tokens.radius.cardInner, overflow: 'hidden',
        }}>
          <div style={{
            background: tokens.color.primaryLight, padding: '8px 12px',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <Shield size={14} color={tokens.color.primary} />
            <span style={{ fontSize: tokens.font.caption.size, fontWeight: 600, color: tokens.color.primary }}>
              C鉴定师仲裁
            </span>
          </div>
          <div style={{ padding: '10px 12px' }}>
            <AppraiserRow role="C" name="张明" level="P5首席" verdict="需总部复检" verdictColor={tokens.color.primary} verdictIcon={Package} reason="该款存在高仿版本需上手" roleColor={tokens.color.primary} />
          </div>
        </div>

        {/* Final result */}
        <div style={{
          background: tokens.color.primaryLight, padding: '12px 16px',
          borderRadius: `0 0 ${tokens.radius.card} ${tokens.radius.card}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <Package size={16} color={tokens.color.primary} />
          <span style={{ fontSize: tokens.font.body.size, color: tokens.color.primary, fontWeight: 600 }}>
            需总部复检 → 定金回收（现场收50%定金，到总部实物鉴定）
          </span>
        </div>
      </Card>

      {/* ===== Flow Diagram ===== */}
      <div style={{ padding: `0 ${tokens.space.pagePadding}`, marginTop: tokens.space.itemGap }}>
        <SectionHeader title="鉴定决策流程" />
      </div>
      <Card className="mx-5 mb-3" variant="outlined">
        <FlowDiagram />
      </Card>
    </div>
  );
}

/* ---------- Appraiser Row Component ---------- */

function AppraiserRow({ role, name, level, verdict, verdictColor, verdictIcon: VerdictIcon, reason, roleColor }: {
  role: string;
  name: string;
  level: string;
  verdict: string;
  verdictColor: string;
  verdictIcon: React.ElementType;
  reason?: string;
  roleColor?: string;
}) {
  const badgeColor = roleColor || (role === 'A' ? tokens.color.primary : role === 'B' ? tokens.color.textCaption : tokens.color.primary);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: `linear-gradient(135deg, ${badgeColor}, ${badgeColor}BB)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <span style={{ fontSize: tokens.font.mini.size, color: '#fff', fontWeight: 700 }}>{role}</span>
          </div>
          <div>
            <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textTitle, fontWeight: 500 }}>
              {name}
            </span>
            <span style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption, marginLeft: 4 }}>
              ({level})
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: verdictColor }}>
          <VerdictIcon size={16} />
          <span style={{ fontSize: tokens.font.body.size, fontWeight: 600 }}>{verdict}</span>
        </div>
      </div>
      {reason && (
        <div style={{
          marginTop: '6px', marginLeft: 38,
          fontSize: tokens.font.caption.size, color: tokens.color.textCaption,
          background: tokens.color.bgFill, padding: '4px 10px',
          borderRadius: tokens.radius.tag, display: 'inline-block',
        }}>
          "{reason}"
        </div>
      )}
    </div>
  );
}

/* ---------- Flow Diagram ---------- */

function FlowDiagram() {
  const boxStyle = (color: string, bg: string): React.CSSProperties => ({
    padding: '8px 14px', borderRadius: tokens.radius.cardInner,
    border: `1.5px solid ${color}`, background: bg,
    fontSize: tokens.font.caption.size, fontWeight: 600, color: color,
    textAlign: 'center',
    whiteSpace: 'nowrap' as const,
  });

  const arrowColor = tokens.color.textDisabled;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '8px 0' }}>
      {/* Row 1: A and B inputs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', justifyContent: 'center' }}>
        <div style={boxStyle(tokens.color.primary, tokens.color.primaryLight)}>
          A鉴定师结论
        </div>
        <div style={boxStyle(tokens.color.textCaption, tokens.color.bgFill)}>
          B鉴定师结论
        </div>
      </div>

      {/* Arrow down */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexDirection: 'column' }}>
        <ArrowDown size={18} color={arrowColor} />
      </div>

      {/* Row 2: Compare box */}
      <div style={boxStyle(tokens.color.textBody, tokens.color.bgFill)}>
        系统自动对比
      </div>

      {/* Branch */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', width: '100%', justifyContent: 'center' }}>
        {/* Left: consistent */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowDown size={14} color={tokens.color.success} />
            <span style={{ fontSize: tokens.font.mini.size, color: tokens.color.success, fontWeight: 600 }}>一致</span>
          </div>
          <div style={boxStyle(tokens.color.success, tokens.color.successLight)}>
            最终结论
          </div>
        </div>

        {/* Right: inconsistent */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowDown size={14} color={tokens.color.warning} />
            <span style={{ fontSize: tokens.font.mini.size, color: tokens.color.warning, fontWeight: 600 }}>不一致</span>
          </div>
          <div style={boxStyle(tokens.color.warning, tokens.color.warningLight)}>
            C鉴定师(P5)
          </div>
          <ArrowDown size={14} color={arrowColor} />
          <div style={boxStyle(tokens.color.primary, tokens.color.primaryLight)}>
            最终结论
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================== Difficult Cases Tab ==================== */

function DifficultCasesTab() {
  const cases = [
    {
      id: 'SSD-20260408-00003',
      name: 'Chanel Boy中号',
      brand: 'Chanel',
      aVerdict: '正品', aColor: tokens.color.success,
      bVerdict: '无法判断', bColor: tokens.color.textCaption,
      bReason: '配件疑似非原装',
      cStatus: '已仲裁',
      cVerdict: '需总部复检',
      time: '14:55',
    },
    {
      id: 'SSD-20260405-00017',
      name: 'Gucci Marmont中号',
      brand: 'Gucci',
      aVerdict: '假货', aColor: tokens.color.danger,
      bVerdict: '正品', bColor: tokens.color.success,
      bReason: '',
      cStatus: '等待中',
      cVerdict: null,
      time: '04-05 16:30',
    },
  ];

  return (
    <div style={{ paddingTop: tokens.space.itemGap, paddingBottom: tokens.space.sectionGap }}>
      <div style={{ padding: `0 ${tokens.space.pagePadding}`, marginBottom: tokens.space.pagePadding }}>
        <h1 style={{ fontSize: tokens.font.pageTitle.size, fontWeight: tokens.font.pageTitle.weight, lineHeight: tokens.font.pageTitle.lineHeight, color: tokens.color.textTitle, letterSpacing: '-0.02em', margin: 0 }}>
          疑难件
        </h1>
        <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, marginTop: '4px' }}>
          AB鉴定结论不一致的案例
        </p>
      </div>

      {cases.map((c) => (
        <Card key={c.id} className="mx-5 mb-3" variant="outlined">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Tag label="疑难" color="orange" size="sm" />
                <Tag label={c.brand} color="blue" size="sm" />
              </div>
              <p style={{ fontSize: tokens.font.bodyLarge.size, fontWeight: 600, color: tokens.color.textTitle, margin: 0 }}>{c.name}</p>
              <p style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption, margin: '2px 0 0' }}>{c.id}</p>
            </div>
            <Tag label="AB不一致" color="orange" size="sm" />
          </div>

          <div style={{
            background: tokens.color.bgPage, borderRadius: tokens.radius.cardInner, padding: tokens.space.itemGap,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: tokens.font.caption.size }}>
              <span style={{ color: tokens.color.textCaption }}>
                A鉴定：<span style={{ color: c.aColor, fontWeight: 500 }}>{c.aVerdict}</span>
              </span>
              <span style={{ color: tokens.color.textCaption }}>
                B鉴定：<span style={{ color: c.bColor, fontWeight: 500 }}>{c.bVerdict}</span>
              </span>
            </div>
            {c.bReason && (
              <p style={{ fontSize: tokens.font.mini.size, color: tokens.color.textCaption, margin: '4px 0 0', fontStyle: 'italic' }}>
                B备注：{c.bReason}
              </p>
            )}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
              marginTop: '8px',
              color: c.cStatus === '已仲裁' ? tokens.color.primary : tokens.color.warning,
            }}>
              {c.cStatus === '已仲裁' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
              <span style={{ fontSize: tokens.font.caption.size, fontWeight: 600 }}>
                {c.cStatus === '已仲裁' ? `C鉴定师仲裁：${c.cVerdict}` : '等待C鉴定师判定'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: tokens.space.itemGap }}>
            <span style={{ fontSize: tokens.font.mini.size, color: tokens.color.textDisabled }}>{c.time}</span>
            <ChevronRight size={14} color={tokens.color.textDisabled} />
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ==================== Profile Tab ==================== */

function ProfileTab() {
  const menuItems = [
    { label: '鉴定记录', count: '186件' },
    { label: '疑难件归档', count: '12件' },
    { label: '学习资料库', count: '' },
    { label: '鉴定标准更新', count: '3条新' },
    { label: '系统设置', count: '' },
  ];

  return (
    <div style={{ paddingTop: tokens.space.itemGap, paddingBottom: tokens.space.sectionGap }}>
      {/* Profile header */}
      <div style={{ padding: `8px ${tokens.space.pagePadding} ${tokens.space.sectionGap}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: `linear-gradient(135deg, ${tokens.color.primary}, ${tokens.color.primary}BB)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontSize: '20px', fontWeight: 700 }}>周</span>
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: tokens.color.textTitle, margin: 0 }}>周婷</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <Tag label="P3" color="blue" size="sm" />
              <span style={{ fontSize: tokens.font.body.size, color: tokens.color.textCaption }}>高级鉴定师</span>
            </div>
            <p style={{ fontSize: tokens.font.mini.size, color: tokens.color.textDisabled, margin: '2px 0 0' }}>工号 U008</p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: tokens.space.itemGap, padding: `0 ${tokens.space.cardPadding}`, marginBottom: tokens.space.pagePadding }}>
        <StatCard value="186" label="本月鉴定" icon={FileSearch} color="blue" />
        <StatCard value="96.8%" label="准确率" icon={CheckCircle2} color="green" />
        <StatCard value="6.2min" label="平均耗时" icon={Clock} color="orange" />
        <StatCard value="12" label="疑难件" icon={AlertTriangle} color="red" />
      </div>

      {/* Menu items */}
      {menuItems.map((item) => (
        <ListItem
          key={item.label}
          title={item.label}
          titleRight={
            item.count ? (
              <span style={{ fontSize: tokens.font.caption.size, color: tokens.color.textCaption }}>{item.count}</span>
            ) : undefined
          }
          onClick={() => {}}
        />
      ))}
    </div>
  );
}

export default AuthAppraiserView;

请阅读 docs/business-spec.md，这是奢收多（二手奢侈品回收平台）的完整业务方案。

你的任务是：基于这份文档，用 React + TypeScript + Tailwind CSS 构建一个「全角色全流程交互原型演示页面」，用于对外汇报。

## 最终交付物

一个单页 Web 应用（SPA），白色背景，页面上并排或可切换展示多个「手机模拟器」（iPhone 15 Pro 尺寸 393×852），每个模拟器代表一个角色视角。页面顶部有全局流程进度条和角色切换导航。所有数据用 mock 数据，所有状态流转可通过按钮触发演示。

## 技术要求

- React 18 + TypeScript + Vite
- Tailwind CSS（飞书设计风格：圆角8px，字体 -apple-system，主色 #3370FF，成功 #00B42A，警告 #FF7D00，错误 #F53F3F，中性灰 #86909C/#C9CDD4/#E5E6EB/#F2F3F5）
- 状态管理用 zustand
- 路由用 react-router-dom
- 不需要后端，所有数据 mock 在前端
- 手机模拟器组件：白色机身、圆角、顶部状态栏、底部导航栏

## 第一步：请先完成以下工作

### 1. 初始化项目
```bash
npm create vite@latest sheshou-prototype -- --template react-ts
cd sheshou-prototype
npm install tailwind @tailwindcss/vite zustand react-router-dom lucide-react
```

### 2. 创建 Mock 数据层 `src/mock/`

创建以下 mock 数据文件，数据要真实可信（用真实奢侈品品牌型号、真实价格区间）：

#### `src/mock/leads.ts`
- 10 条线索数据，包含：id, customerName, phone, source（抖音/小红书/大众点评/地图）, brand, category, estimatedValue, intentLevel(high/medium/low), status(L01新建/L02已分配/L03跟进中/L04已预约), assignedTo, createdAt, tags[]
- 示例：张女士，13800001111，来源抖音，品牌LV Neverfull MM，预估8000-12000，高意向

#### `src/mock/appointments.ts`
- 5 条预约单，包含：id(RCV-20260408-00001格式), leadId, serviceType(上门/到店/邮寄/同城闪送), scheduledDate, timeSlot, address, items[{brand,category,estimatedCount}], status(待派单/已派单/已出发/服务中/已完成), assignedAppraiser

#### `src/mock/products.ts`
- 15 件商品数据，覆盖所有 29 个状态码（1-29），包含：id, uniqueCode(扫码用), brand, series, model, material, color, conditionGrade(S/A/B/C), accessories[], photos[], pricingResult{bidders[], highestBid, finalPrice}, authResult{appraiserA, appraiserB, appraiserC?, finalResult(真/假/存疑)}, recoveryType(全额/定金/寄卖/不收), statusCode(1-29), statusName, subStatus, timeline[{status,time,operator}]

#### `src/mock/orders.ts`
- 8 条订单，覆盖四种类型：全额竞价回收×2、定金竞价回收×2、寄卖竞价回收×3、假货不收×1
- 包含：orderId, type, products[], customer, contract{}, payment{method,amount,status}, logistics{}

#### `src/mock/users.ts`
- 各角色用户：回收客服×2、上门鉴定师×2、报价师×3、图鉴鉴定师×2、仓管×1、财务×1、客户×3

#### `src/mock/bidding.ts`
- 竞价模拟数据：真实出价 3-5 个 + 虚拟出价 50 个（含城市、商家名、出价金额、出价时间），用于竞价动画演示

### 3. 创建全局状态管理 `src/store/`

#### `src/store/demoStore.ts`
- currentStep: number（全局演示步骤，0-15 共 16 步，覆盖从线索到结算的完整流程）
- currentRole: string（当前高亮角色）
- advanceStep(): 推进到下一步，自动更新所有关联的 mock 数据状态
- setRole(role): 切换角色视角
- resetDemo(): 重置到初始状态

步骤定义：
0-线索进入 → 1-客服分配 → 2-客服跟进 → 3-预约创建 → 4-派单完成 → 5-鉴定师出发 → 6-到达开始服务 → 7-挂签报价拍照 → 8-竞价进行中 → 9-竞价完成报价 → 10-鉴定拍照提交 → 11-鉴定结果回流 → 12-确认回收清单生成订单 → 13-合同签署打款 → 14-总部签收复检 → 15-结算完成

### 4. 创建路由和页面框架 `src/App.tsx`

主布局：
- 顶部：标题「奢收多 · 全流程交互原型」+ 当前步骤指示器（16步横向进度条，可点击跳转）
- 中间区域：手机模拟器展示区（根据当前步骤自动高亮相关角色的手机）
- 底部：「上一步」「下一步」「重置」按钮 + 当前步骤说明文字（从业务文档提取关键描述）

请先完成以上工作，确保项目能跑起来，手机模拟器能展示，mock 数据完整。完成后告诉我，我继续给第二步指令。

请阅读 docs/business-spec.md，这是奢收多（二手奢侈品回收平台）的完整业务方案。

你的任务是：基于这份文档，用 React + TypeScript + Tailwind CSS 构建一个「全角色全流程交互原型演示页面」，用于对外汇报。

## 最终交付物

一个单页 Web 应用（SPA），白色背景，页面上并排或可切换展示多个「手机模拟器」（iPhone 15 Pro 尺寸 393×852），每个模拟器代表一个角色视角。页面顶部有全局流程进度条和角色切换导航。所有数据用 mock 数据，所有状态流转可通过按钮触发演示。

## 技术要求

- React 18 + TypeScript + Vite
- Tailwind CSS（飞书设计风格：圆角8px，字体 -apple-system，主色 #3370FF，成功 #00B42A，警告 #FF7D00，错误 #F53F3F，中性灰 #86909C/#C9CDD4/#E5E6EB/#F2F3F5）
- 状态管理用 zustand
- 路由用 react-router-dom
- 不需要后端，所有数据 mock 在前端
- 手机模拟器组件：白色机身、圆角、顶部状态栏、底部导航栏

## 第一步：请先完成以下工作

### 1. 初始化项目
```bash
npm create vite@latest sheshou-prototype -- --template react-ts
cd sheshou-prototype
npm install tailwind @tailwindcss/vite zustand react-router-dom lucide-react
```

### 2. 创建 Mock 数据层 `src/mock/`

创建以下 mock 数据文件，数据要真实可信（用真实奢侈品品牌型号、真实价格区间）：

#### `src/mock/leads.ts`
- 10 条线索数据，包含：id, customerName, phone, source（抖音/小红书/大众点评/地图）, brand, category, estimatedValue, intentLevel(high/medium/low), status(L01新建/L02已分配/L03跟进中/L04已预约), assignedTo, createdAt, tags[]
- 示例：张女士，13800001111，来源抖音，品牌LV Neverfull MM，预估8000-12000，高意向

#### `src/mock/appointments.ts`
- 5 条预约单，包含：id(RCV-20260408-00001格式), leadId, serviceType(上门/到店/邮寄/同城闪送), scheduledDate, timeSlot, address, items[{brand,category,estimatedCount}], status(待派单/已派单/已出发/服务中/已完成), assignedAppraiser

#### `src/mock/products.ts`
- 15 件商品数据，覆盖所有 29 个状态码（1-29），包含：id, uniqueCode(扫码用), brand, series, model, material, color, conditionGrade(S/A/B/C), accessories[], photos[], pricingResult{bidders[], highestBid, finalPrice}, authResult{appraiserA, appraiserB, appraiserC?, finalResult(真/假/存疑)}, recoveryType(全额/定金/寄卖/不收), statusCode(1-29), statusName, subStatus, timeline[{status,time,operator}]

#### `src/mock/orders.ts`
- 8 条订单，覆盖四种类型：全额竞价回收×2、定金竞价回收×2、寄卖竞价回收×3、假货不收×1
- 包含：orderId, type, products[], customer, contract{}, payment{method,amount,status}, logistics{}

#### `src/mock/users.ts`
- 各角色用户：回收客服×2、上门鉴定师×2、报价师×3、图鉴鉴定师×2、仓管×1、财务×1、客户×3

#### `src/mock/bidding.ts`
- 竞价模拟数据：真实出价 3-5 个 + 虚拟出价 50 个（含城市、商家名、出价金额、出价时间），用于竞价动画演示

### 3. 创建全局状态管理 `src/store/`

#### `src/store/demoStore.ts`
- currentStep: number（全局演示步骤，0-15 共 16 步，覆盖从线索到结算的完整流程）
- currentRole: string（当前高亮角色）
- advanceStep(): 推进到下一步，自动更新所有关联的 mock 数据状态
- setRole(role): 切换角色视角
- resetDemo(): 重置到初始状态

步骤定义：
0-线索进入 → 1-客服分配 → 2-客服跟进 → 3-预约创建 → 4-派单完成 → 5-鉴定师出发 → 6-到达开始服务 → 7-挂签报价拍照 → 8-竞价进行中 → 9-竞价完成报价 → 10-鉴定拍照提交 → 11-鉴定结果回流 → 12-确认回收清单生成订单 → 13-合同签署打款 → 14-总部签收复检 → 15-结算完成

### 4. 创建路由和页面框架 `src/App.tsx`

主布局：
- 顶部：标题「奢收多 · 全流程交互原型」+ 当前步骤指示器（16步横向进度条，可点击跳转）
- 中间区域：手机模拟器展示区（根据当前步骤自动高亮相关角色的手机）
- 底部：「上一步」「下一步」「重置」按钮 + 当前步骤说明文字（从业务文档提取关键描述）

请先完成以上工作，确保项目能跑起来，手机模拟器能展示，mock 数据完整。完成后告诉我，我继续给第二步指令。

继续 sheshou-prototype 项目。现在实现每个角色的手机界面。

## 手机模拟器组件 `src/components/PhoneSimulator.tsx`

- 外壳：w-[393px] h-[852px]，白色背景，rounded-[40px]，shadow-2xl，overflow-hidden
- 顶部状态栏：时间、信号、电量图标，h-12
- 内容区域：flex-1 overflow-y-auto
- 底部 Tab 导航栏：h-16，4-5 个 tab（根据角色不同）
- 角色名称标签：手机外壳顶部居中显示角色名（如「回收客服 · 李静」）
- 当前步骤相关的手机高亮（蓝色边框 ring-2 ring-[#3370FF]），无关角色手机半透明 opacity-50

## 需要实现的 6 + 1 个角色手机界面

### 1. 回收客服手机 `src/views/CustomerService/`

Tab：工作台 | 线索 | 客户 | 我的

**工作台页面：**
- 顶部数据卡片：今日新线索 X 条、待跟进 X 条、今日预约 X 条、超期未联系 X 条
- SLA 倒计时列表（红色高亮超时的）
- 快捷操作：新建线索、扫码

**线索列表页：**
- 筛选 Tab：全部/新建/跟进中/已预约/已成交
- 线索卡片：客户姓名、来源渠道标签（抖音蓝/小红书红/大众点评橙）、品牌品类、预估价值、意向度标签（高H/中M/低L）、最后跟进时间
- 点击进入线索详情

**线索详情页：**
- 客户信息区
- 跟进记录时间线
- 底部操作：电话跟进、微信跟进、创建预约、转公海
- 标签编辑：可打标签

**创建预约页：**
- 服务方式选择（上门/到店/邮寄/闪送）
- 日期时间选择
- 商品信息（品类、品牌、预估数量、预估价值）
- 客户地址
- 提交后生成 RCV 编号

### 2. 上门鉴定师手机 `src/views/Appraiser/`

Tab：工作台 | 任务 | 回收单 | 我的

**工作台页面：**
- 今日任务卡片：待出发 X、进行中 X、已完成 X
- 任务列表（按时间排序）

**任务详情页（核心页面，多步骤切换）：**

步骤 A - 任务信息：客户姓名、地址、商品品类/数量、预约时间、「出发」按钮
步骤 B - 挂签拍照：
  - 扫码绑定按钮（模拟扫码动画）
  - 拍照模板选择（包/表/黄金，展示不同拍照指引图示）
  - 已拍照片网格展示
  - 商品信息录入表单（品牌、系列、型号、材质、颜色、成色评级下拉、附件勾选）
  - 「提交竞价」按钮

步骤 C - 竞价等待/结果：
  - 竞价倒计时
  - 报价师出价列表（实时刷新模拟）
  - 最终价格展示
  - 议价工具面板：底价/目标价/上限价滑块，当前报价师最高价，可微调金额，超出范围→「提交调价审批」

步骤 D - 鉴定拍照：
  - 按鉴定点模板拍照（展示需要拍的角度清单，已完成打勾）
  - 「提交鉴定」按钮

步骤 E - 鉴定结果：
  - A鉴定师结论 + B鉴定师结论 → 最终结论
  - 如果存疑或不一致，显示 C 鉴定师介入

步骤 F - 商品清单确认：
  - 分组展示：已确认回收（绿）、待鉴定（黄）、鉴定存疑（橙）、不可回收（红）
  - 每件商品可选回收方式：全额/定金/寄卖
  - 底部「生成回收订单」

步骤 G - 合同与打款：
  - 引导客户实名认证状态
  - 合同预览
  - 打款操作（全额→当场打款动画）

### 3. 报价师手机 `src/views/Pricer/`

Tab：工作台 | 报价 | 价格库 | 我的

**工作台页面：**
- 待报价队列（红色倒计时 SLA ≤10min）
- 今日已报价数
- 报价超时预警

**报价详情页：**
- 商品照片轮播
- 商品信息（品牌、型号、成色、附件）
- 近30天同款成交价参考
- 出价输入框 + 「提交报价」按钮
- 已出价记录

### 4. 图鉴鉴定师手机 `src/views/AuthAppraiser/`

Tab：工作台 | 图鉴 | 疑难件 | 我的

**工作台页面：**
- 待图鉴数量、今日已鉴定
- 待鉴定队列

**鉴定详情页：**
- 鉴定点照片展示（可放大查看）
- 品牌型号信息
- 三个按钮：「真」「假」「存疑」
- 存疑时需填写存疑原因
- 提交后显示 AB 双鉴定结果对比

### 5. 仓管手机 `src/views/Warehouse/`

Tab：工作台 | 入库 | 调拨 | 盘点 | 我的

**工作台页面：**
- 待入库、待调拨、待签收数量
- 快捷扫码入库

**签收复检页：**
- 扫码签收
- 复检操作：核对照片与实物
- 复检结论：通过/不通过
- 不通过→触发退回流程

### 6. 财务手机 `src/views/Finance/`

Tab：工作台 | 付款 | 收款 | 结算 | 我的

**工作台页面：**
- 待打款总额、待结算笔数
- 打款审批队列

**打款详情页：**
- 订单信息、客户信息、金额
- 审批操作：通过/拒绝
- 打款状态追踪

### 7. 客户端小程序 `src/views/Customer/`（C端卖家）

Tab：首页 | 预约 | 订单 | 我的

**首页：**
- 快速估价入口（品牌选择 → 品类 → 拍照 → 获取估价区间）
- 两种回收方式介绍卡片
- 历史拍卖成交案例轮播

**竞价回收界面（核心体验页）：**
- 全国地图背景（简化 SVG 中国地图）
- 各城市商家出价动画（气泡从各城市弹出，价格从低到高排列）
- 10 分钟倒计时
- 每次新出价界面更新 + 金额跳动
- 结束后展示最终最高价，排名列表

**商品确认页：**
- 每件商品：照片、品牌型号、成色、竞价价格、近30天参考价
- 操作按钮：接受/寄卖/不卖

**合同签署页：**
- 合同条款展示
- 电子签名板（canvas 手写签名）
- 签署成功动画

**订单详情页（三种类型各一个）：**
- 全额：进度条 + 打款记录
- 定金：进度条 + 定金/尾款记录 + 物流 + 复检
- 寄卖：完整状态时间线（运输→签收→复检→入库→拍照→上架→销售→成交→打款）+ 每日行情 + 议价沟通

**打款记录/账单页：**
- 成交价、佣金、实际到账
- 一键分享按钮

## 实现要求

1. 每个页面都要有真实 mock 数据填充，不能出现空白占位
2. 飞书设计风格：简洁、留白、圆角、微阴影、蓝色主色调
3. 所有列表页支持状态筛选 Tab
4. 关键操作按钮点击后要有状态流转效果（状态码变化、进度条推进、toast 提示）
5. 竞价界面要有动画效果（出价跳动、倒计时、地图气泡）

请按角色逐个实现，每完成一个角色告诉我进度。
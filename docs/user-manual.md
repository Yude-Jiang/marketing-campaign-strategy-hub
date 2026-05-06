# Campaign OS · GEO Strategic Hub — 用户手册

**版本：** v1.0　**适用平台：** Web（PC）　**更新日期：** 2026-05

---

## 目录

1. [产品简介](#1-产品简介)
2. [首次配置](#2-首次配置)
3. [界面总览](#3-界面总览)
4. [全局控制栏](#4-全局控制栏)
5. [Campaign OS 工作流（V1）](#5-campaign-os-工作流v1)
   - 5.1 [Dashboard（总览）](#51-dashboard总览)
   - 5.2 [Product Intake（产品信息录入）](#52-product-intake产品信息录入)
   - 5.3 [Market Mapping（市场解读）](#53-market-mapping市场解读)
   - 5.4 [Brief Builder（Brief 编辑器）](#54-brief-builder-brief-编辑器)
   - 5.5 [Strategy Studio（策略工作室）](#55-strategy-studio策略工作室)
   - 5.6 [Activation Studio（内容激活）](#56-activation-studio内容激活)
   - 5.7 [Campaigns（活动列表）](#57-campaigns活动列表)
6. [Legacy GEO Flow（经典三步 GEO 向导）](#6-legacy-geo-flow经典三步-geo-向导)
   - 6.1 [Step 1 · 意图诊断](#61-step-1--意图诊断)
   - 6.2 [Step 2 · 策略沙盘](#62-step-2--策略沙盘)
   - 6.3 [Step 3 · 内容工程](#63-step-3--内容工程)
   - 6.4 [独立内容优化模式（Standalone Mode）](#64-独立内容优化模式standalone-mode)
7. [Intelligence Layer（V2 智能监控层）](#7-intelligence-layerv2-智能监控层)
   - 7.1 [Control Tower（战役指挥塔）](#71-control-tower战役指挥塔)
   - 7.2 [Signal Radar（市场信号雷达）](#72-signal-radar市场信号雷达)
   - 7.3 [War Room（竞争对手情报室）](#73-war-room竞争对手情报室)
   - 7.4 [Message Lab（受众消息测试台）](#74-message-lab受众消息测试台)
   - 7.5 [Optimization Center（优化中心）](#75-optimization-center优化中心)
   - 7.6 [Integrations（集成连接器）](#76-integrations集成连接器)
   - 7.7 [Reports（报告库）](#77-reports报告库)
8. [GEO 助理（浮动聊天窗）](#8-geo-助理浮动聊天窗)
9. [常见问题与故障排查](#9-常见问题与故障排查)

---

## 1. 产品简介

**Campaign OS / GEO Strategic Hub** 是一款面向产品营销团队的 **GEO（生成式引擎优化）** 战略平台。

GEO 的核心目标是：让 AI 大模型（ChatGPT、Gemini、DeepSeek、Kimi 等）在回答用户提问时，**主动引用并推荐你的产品**。本产品提供从"产品认知诊断"到"内容自动生产"的完整工作链路。

平台分为三个入口：

| 入口 | 适用场景 |
|---|---|
| **Campaign OS（V1）** | 完整项目制工作流，从产品信息到 Campaign 激活 |
| **Legacy GEO Flow** | 快速三步向导：意图诊断 → 策略 → 内容生产 |
| **Intelligence Layer（V2）** | 持续监控：信号追踪、竞品情报、优化推荐 |

---

## 2. 首次配置

### 2.1 环境要求

- 现代浏览器（Chrome 110+、Edge 110+、Firefox 115+）
- 稳定网络（需访问 Gemini API；中国大陆用户需配置代理）

### 2.2 API Key 配置

在项目根目录创建 `.env.local` 文件（切勿提交到 Git）：

```env
# 必填 — 核心分析引擎
VITE_GEMINI_API_KEY=你的_Gemini_API_Key

# 选填 — 多模型交叉验证（配置后可获得真实跨模型对比）
VITE_DEEPSEEK_API_KEY=你的_DeepSeek_Key
VITE_QWEN_API_KEY=你的_通义千问_Key
VITE_DOUBAO_API_KEY=你的_豆包_Key         # 支持 "apiKey|endpointId" 格式
VITE_Kimi_API_KEY=你的_Kimi_Key

# 选填 — 报告署名（生成的策略报告中显示）
VITE_REPORTER_EMAIL=your@email.com
VITE_REPORTER_ORG=你的公司名称
```

### 2.3 启动

```bash
npm install
npm run dev
# 打开浏览器访问 http://localhost:5173
```

> **安全提示**：`VITE_*` 变量会打包进前端 JS，仅适用于本地开发或内网部署。生产环境请通过 `server.js` 后端代理转发 API 调用。

---

## 3. 界面总览

```
┌─────────────────────────────────────────────────────────────────┐
│  顶部栏  [折叠按钮] [Logo] [Campaign OS]  [语言] [目标生态]      │
├──────────┬──────────────────────────────────────────────────────┤
│          │                                                      │
│  左侧导航 │              主内容区（页面内容）                     │
│  Campaign│                                                      │
│  OS (V1) │                                                      │
│  ────────│                                                      │
│  Intelli-│                                                      │
│  gence   │                                                      │
│  (V2)    │                                                      │
│  ────────│                                                      │
│  Legacy  │                                                      │
│          │                                              [GEO助理]│
└──────────┴──────────────────────────────────────────────────────┘
```

- **顶部栏**：固定在最顶，高度 56px，包含全局控制
- **左侧导航**：可折叠（点击顶部 `<` / `>` 按钮），折叠后仅显示图标
- **主内容区**：可滚动，每个页面独立
- **GEO 助理**：右下角浮动按钮，全局可用

---

## 4. 全局控制栏

顶部栏右侧有两个全局开关，**对所有分析和内容生成均生效**，修改前请先确认。

### 4.1 界面语言

点击 `中文 / EN / 日本語` 切换 UI 展示语言及 AI 输出语言。

| 代码 | 含义 |
|---|---|
| `中文` | 所有 AI 输出、提示词、报告均使用中文 |
| `EN` | 英文（默认） |
| `日本語` | 日文 |

### 4.2 目标生态（Ecosystem）

选择你希望在哪个 AI 生态中被引用。**这是最重要的全局参数**，它决定了分析和内容生成所针对的 AI 模型集合。

| 选项 | 目标模型 |
|---|---|
| `Global` | ChatGPT、Claude、Gemini、Perplexity（欧洲地区额外包含 Mistral AI） |
| `CN` | 豆包、Kimi、DeepSeek、通义千问、文心一言、腾讯元宝 |
| `JP` | Yahoo/Line AI、Claude 3、GPT-4o |
| `KR` | Naver CUE:、GPT-4o |

> **提示**：在 Legacy GEO Flow 的诊断步骤中，还可以额外指定"目标地区"（如"大中华区"、"欧洲"），系统会在 Global 生态下额外针对该地区做本地化处理。

---

## 5. Campaign OS 工作流（V1）

这是一套**项目制完整工作流**，各步骤依次解锁，数据自动传递。推荐按以下顺序操作：

```
Product Intake → Market Mapping → Brief Builder → Strategy Studio → Activation Studio
```

### 5.1 Dashboard（总览）

**路径：** `/dashboard`

Dashboard 是项目全局概览，包含：

- **统计卡片**：已有 Brief 数量、Campaign 数量、当前运行中的 Campaign 数量、已覆盖生态数量
- **快捷操作**：快速跳转到各步骤
- **近期 Brief 列表**：显示状态标签（Draft / In Review / Approved）
- **近期 Campaign 列表**：显示进度条和生态标签
- **最近活动**：操作日志
- **系统状态**：API 连接状态（Operational / Degraded）
- **模板与快捷方式**：四个常用入口

> 若尚无任何 Campaign，将显示空状态引导页，点击"New Product Intake"开始第一个项目。

---

### 5.2 Product Intake（产品信息录入）

**路径：** `/product-intake`　**前置要求：** 无

这是工作流的**起点**。填写产品基本信息，系统生成结构化的 **Product Truth 模型**，供后续步骤使用。

#### 操作步骤

**① 填写产品信息表单（左侧）**

| 字段 | 说明 | 是否必填 |
|---|---|---|
| Product Name | 产品型号或名称，如 `VL53L9` | 必填 |
| Product Family | 产品系列，如 `VL53Lx` | 选填 |
| Brand | 品牌，如 `STMicroelectronics` | 选填 |
| Target Region | 目标区域，如 `大中华区` | 选填 |
| Target Industries | 目标行业（可多选），如 `消费电子、工业` | 选填 |
| Business Goal | 商业目标描述 | 选填 |
| Known Competitors | 已知竞品（可多个） | 选填 |
| Product URL | 官网产品页链接 | 选填 |

**② 点击「Parse Product」**

系统模拟解析（约 800ms），生成右侧 **Product Truth 预览**，包含：
- `category`：产品类别
- `coreFeatures`：核心功能列表
- `keySpecs`：关键规格（标签 + 数值）
- `differentiators`：差异化卖点
- `proofPoints`：可引用的证明点
- `limitations`（可选）：已知局限

**③ 审查并确认**

在右侧预览面板确认内容无误后，点击「**Confirm & Save**」。

> ✅ 确认后，Product Truth 保存至全局状态，Market Mapping 步骤自动解锁。  
> ✏️ 需要修改？点击「**Reset**」清空表单重新录入。

---

### 5.3 Market Mapping（市场解读）

**路径：** `/market-mapping`　**前置要求：** Product Intake 已确认

将 Product Truth 转化为面向市场的解读层：买家画像、目标行业、应用场景、竞争格局、买家需求、采用障碍、市场叙事。

#### 操作步骤

**① 点击「Generate Market Interpretation」**

生成约需 1.2 秒，完成后展示以下内容：

| 卡片 | 内容 |
|---|---|
| **Personas** | 买家画像（角色名称、核心诉求、痛点） |
| **Industries** | 目标行业与细分领域 |
| **Use Cases** | 典型应用场景 |
| **Competitors** | 竞争对手及其定位 |
| **Buyer Needs** | 采购决策中的关键需求 |
| **Adoption Barriers** | 市场采用障碍 |
| **Narratives** | 市场叙事角度建议 |

**② 审查内容**

仔细审阅每张卡片，确认市场解读准确反映你的产品定位。

**③ 锁定或重新生成**

- 「**Lock & Continue**」→ 保存并进入 Brief Builder
- 「**Regenerate**」→ 重新生成（旧内容将被覆盖）
- 「**Edit**」（锁定后出现）→ 解锁重新编辑

> ⚠️ 未锁定的情况下刷新页面，内容不会丢失（已存入 localStorage）。

---

### 5.4 Brief Builder（Brief 编辑器）

**路径：** `/brief-builder`　**前置要求：** Market Mapping 已锁定

在左侧编辑、右侧实时预览，生成或手动撰写结构化 Campaign Brief。

#### Brief 包含的章节

| 章节 | 字段说明 |
|---|---|
| **Campaign Overview** | 活动名称、产品系列、品牌、活动周期 |
| **Objectives** | 活动目标（可多条） |
| **Target Audience** | 主要受众 + 次要受众 |
| **Competitors** | 竞争对手列表 |
| **Offer & Proofs** | 核心主张 Headline + 证明点 |
| **Key Use Cases** | 关键应用场景 |
| **Budget & Channels** | 总预算 + 渠道分配（支持多条） |
| **Timeline** | 活动开始 / 结束日期 |
| **Tags** | 标签（便于后续归档） |

#### 操作说明

**自动生成**（推荐）：点击底部「**Generate Brief**」，系统基于 Market Interpretation 自动填充所有章节（约 1.2 秒）。

**手动编辑**：每个章节均可手动输入。Array 类型字段（如 Objectives）支持逐条增删。

**单章节重新生成**：每个章节右上角有 `↺` 图标，点击仅重新生成该章节（约 600ms）。

**保存草稿**：点击「**Save Draft**」将当前内容保存到浏览器存储，不影响工作流状态。

**锁定**：审阅无误后点击「**Lock Brief**」进入只读模式，状态变为 `Locked`，Strategy Studio 自动解锁。

**导出**：点击「**Export**」（当前为占位功能，PDF/DOCX 导出将在后续版本发布）。

> ✏️ 锁定后如需修改，点击「**Edit**」解锁，修改完毕后重新锁定即可。

---

### 5.5 Strategy Studio（策略工作室）

**路径：** `/strategy-studio`　**前置要求：** Brief Builder 已锁定

基于 Campaign Brief 生成完整的**策略包（Strategy Pack）**，包括战略重点、渠道策略、战术打法和衡量指标。

#### 策略包的组成

| 模块 | 内容 |
|---|---|
| **Strategy Matrix** | 品牌定位声明、核心价值主张、GEO 主题（结构化矩阵） |
| **Strategic Priorities** | 3–5 个战略重点，每项附有理由说明 |
| **Channel Strategy** | 各渠道的角色定位 + KPI 指标 |
| **Tactic Play Cards** | 具体战术打法（3 种类型：🛡️ 权威建立 / ⚡ 场景化 / ⚔️ 竞品对比） |
| **Measurement** | 成功衡量指标 |
| **Timeline** | 战略执行时间表 |

#### 操作步骤

**① 点击「Generate Strategy Pack」**

生成约需 1.2 秒。完成后展示完整策略包。

**② 审阅各模块**

- **Strategy Matrix**：核心定位是否准确
- **Tactic Play Cards**：每张战术卡片展示战术类型、平台建议、目标 Snippet、结构化数据策略

**③ 锁定或重新生成**

- 「**Lock Strategy**」→ 锁定后 Activation Studio 解锁，可进入内容生产
- 「**Regenerate**」→ 重新生成全部内容
- 「**Edit**」（锁定后）→ 解锁返回编辑

---

### 5.6 Activation Studio（内容激活）

**路径：** `/activation-studio`　**前置要求：** Strategy Studio 已锁定

将策略转化为可发布的 GEO 优化内容。

#### 操作流程

**① 选择输出资产（左侧 Asset 列表）**

系统根据 Strategy Pack 自动生成资产任务列表，每个资产对应一个战术打法。点击资产卡片切换编辑焦点。

**② 选择平台和格式（Asset Workspace）**

使用 **Platform Selector** 选择发布平台（如 GitHub、Zhihu、Reddit、官网博客等）和内容格式（技术文章、FAQ、对比分析、应用笔记等）。

**③ 上传 RAG 参考资料（可选）**

上传相关文档（产品数据表、规格书、竞品资料）作为内容生成的参考素材，确保内容数据准确、零幻觉。

**④ 点击「Generate」**

系统调用 Gemini API 流式生成内容。生成完成后，内容区域显示：
- **正文**：GEO 优化后的内容（Markdown 格式）
- **GEO 分析报告**：在 `== GEO_ANALYSIS ==` 分隔线后，列出具体改动和信号提升估算

**⑤ 后处理功能**

| 功能 | 说明 |
|---|---|
| **Humanize** | 去除 AI 味，使内容更自然流畅（支持中 / 英 / 日三套提示词） |
| **Translate** | 将内容翻译为其他语言（保留 Markdown 格式和技术术语） |
| **JSON-LD Schema** | 自动生成结构化数据标记（Article / TechArticle / HowTo） |
| **Export Report** | 生成包含诊断 → 策略 → 内容 → GEO 信号提升的完整报告 |

---

### 5.7 Campaigns（活动列表）

**路径：** `/campaigns`

查看和管理所有 Campaign，包含状态过滤（Draft / Active / Paused / Completed）和进入 Control Tower 的入口。

---

## 6. Legacy GEO Flow（经典三步 GEO 向导）

**路径：** `/legacy`

这是平台**原始核心功能**的直接入口，不依赖 V1 工作流数据，可独立使用。包含两种模式：

- **三步向导**：诊断 → 策略 → 内容生产（适合新产品从零开始）
- **独立内容优化**（Standalone Mode）：直接优化已有内容（适合快速强化现有稿件）

> 页面顶部有 `Legacy GEO Flow` 标签和 **Standalone Mode** 开关，点击右上角切换。

---

### 6.1 Step 1 · 意图诊断

**目标：** 扫描当前 AI 生态对你产品类目的认知，找出被引用的核心障碍，确定应该拦截的意图战场。

#### 输入区

| 控件 | 说明 |
|---|---|
| **产品技术子弹** | 每行一个关键词或特性描述，如 `VL53L9`、`$0.64 入门价`、`多区测距`。这是分析的核心原料 |
| **国家/区域** | 输入具体地区（如"大中华区"、"欧洲 EMEA"），系统自动识别并做本地化调整。欧洲地区会额外针对 Mistral AI 优化 |
| **附件** | 上传 PDF/图片（产品手册、数据表、竞品截图）作为诊断的额外语境 |

#### 运行分析

点击「**开始诊断**」后，系统依次执行：

1. **Google Search Grounding**：获取最近 9 个月的市场动态（需要 Gemini Grounding 权限）
2. **Gemini 深度分析**：基于 Grounding 结果，生成 JSON 格式的结构化报告

分析需要约 15–60 秒，具体取决于内容复杂度和 API 速度。

> 💡 若出现 429 限流错误，系统会自动倒计时重试，界面显示剩余等待秒数。

#### 分析结果解读

结果分为四个板块：

**① 战略战报（Executive Summary）**

| 字段 | 含义 |
|---|---|
| **市场脉搏** | AI 对该品类的当前认知共识，标注模拟模型列表和分析日期 |
| **核心引用阻碍** | 为什么你的产品目前没有被 AI 引用 |
| **战略转向标** | 从 SEO 转向 GEO 的核心方向 |
| **极简关键洞察** | 一个高价值的反直觉发现 |

**② 隐形竞品拦截网（Competitor Analysis）**

每个竞品展示：
- AI 对它的描述方式
- 语料霸屏逻辑（GitHub 仓库 / 技术论坛高密度 / 白皮书）
- 威胁等级（Low / Medium / High / Critical）
- **战略切入点**：我们可以从哪个认知缺口切入

**③ 高转化意图战场（Intent Clusters）**

系统从 6 个维度提取 4–6 个**战略意图群**：
1. 成本 vs 性能消除
2. 认知偏差套利
3. 历史迁移摩擦
4. 极端环境妥协
5. 算力民主化
6. 生态隐性成本

每个意图群包含：
- **战略级主张**：一句话核心定位
- **监测问题**（Monitoring Questions）：工程师真实向 AI 提问的问题格式，每个问题附有"期望语义锚点"
- **GEO 失效诊断**：该意图群目前被引用失败的根本原因（8 种类型，如 CORPUS_ABSENCE、COMPETITOR_DOMINANCE 等）

#### 选择监测问题

在意图群卡片上，勾选你认为优先级最高的监测问题（可跨意图群多选）。这些被选中的问题将传递给 Step 2，生成定制化战术剧本。

> 💡 **建议**：优先选择 `repairUrgency` 最高（接近 10）且 `severity` 为 `critical` 的问题。

#### 锚点验证（Anchor Verification）

点击「**验证锚点**」按钮，系统通过 Google Search Grounding 验证每个期望锚点是否在公开资料中真实存在：

| 状态 | 含义 |
|---|---|
| `verified` ✅ | 找到支持该锚点的公开来源，置信度 > 85% |
| `partial` ⚠️ | 找到相关页面但关键词匹配不完整 |
| `unverified` ❌ | 未找到支持来源，可能是 AI 幻觉，建议降低优先级 |

#### 跨模型认知共识

如果配置了多模型 API Key（DeepSeek / Qwen / Doubao / Kimi），界面底部会展示**真实跨模型对比**：
- 各模型对产品类目的真实回答
- 提取的关键实体
- 情感倾向（Positive / Neutral / Negative / Mixed）
- 共识等级（Full / Partial / Divergent / Insufficient）

> 若未配置 API Key，此处显示 Gemini 模拟的跨模型推断，并有免责声明标注。

#### 确认诊断

审阅完成后，点击「**确认诊断**」进入 Step 2。

---

### 6.2 Step 2 · 策略沙盘

**目标：** 基于 Step 1 选定的监测问题，生成定制化 GEO 战术剧本。

#### 精化与剧本生成

若 Step 1 选择了监测问题，系统自动触发**策略精化**，向 Gemini 发送定向请求，为每个选定问题生成专属战术剧本（约 15–30 秒）。

> 若精化失败或跳过，系统回退到 Step 1 诊断中的通用策略剧本。

#### 剧本卡片

每张战术剧本卡片包含：

| 字段 | 说明 |
|---|---|
| **战术类型** | 🛡️ 权威建立 / ⚡ 场景化 / ⚔️ 竞品对比 |
| **绑定的意图** | 此剧本针对哪些监测问题 |
| **GEO 行动** | 一句话具体行动指令 |
| **推荐平台** | 适合发布的平台（Zhihu / GitHub / Reddit 等） |
| **结构化数据策略** | 推荐使用的内容结构（对比表 / 代码 / 列表） |
| **目标 Snippet（黄金段落）** | 一段 100–150 字、为 AI 直接提取优化的参考段落 |
| **角色专属 SOP** | 为开发者 / 市场人员分别提供执行 SOP，含 ✅ 好例子和 ❌ 差例子 |

#### 选择剧本

默认全选。取消勾选你认为不符合当前优先级的剧本。

点击「**部署到生产台**」将选中剧本传递到 Step 3。

---

### 6.3 Step 3 · 内容工程

**目标：** 基于策略剧本和 RAG 素材，生成高 GEO 权重的可发布内容。

#### ① 上传 RAG 素材（可选但强烈推荐）

支持三种方式添加参考资料：

| 方式 | 操作 |
|---|---|
| **粘贴文本** | 直接粘贴产品说明、技术文档片段 |
| **输入 URL** | 粘贴产品页、竞品页等 URL，系统通过 Jina Reader 自动抓取内容 |
| **上传文件** | 上传 PDF（数据表、白皮书）、图片（产品截图） |

**深度证据挖掘（Deep Evidence Grounding）**：所有来源支持一键"深挖"，系统对每个来源的期望锚点做 Google Search 验证，并按权威性（High/Medium/Low）、时效性（Fresh/Stale/Unknown）、锚点命中率三个维度打分排序。

#### ② 选择发布平台

使用 **Platform Selector** 选择目标平台：

| 分类 | 平台示例 |
|---|---|
| 技术社区 | GitHub、Stack Overflow、CSDN、Qiita |
| 问答社区 | Zhihu（知乎）、Reddit、Quora |
| 官方渠道 | Official Docs、Product Page、Blog |
| 社交媒体 | LinkedIn、Twitter/X、微信公众号 |

同时选择**内容格式**（Technical Article / FAQ / Comparison / How-To / Application Note 等）。

#### ③ 选择 GEO 优化方法（最多 3 个）

系统提供 8 种 GEO 优化方法（来自 GEO-Bench 学术论文 2311.09735）：

| 方法 | 预期提升 | 最适合场景 |
|---|---|---|
| 📊 Statistics Addition | +40% | B2B 技术内容，用量化数据替换定性描述 |
| 🔗 Cite Sources | +40% | 需要提升可信度，引用官方文档 / arXiv |
| 💬 Quotation Addition | +35% | 引用权威人士或官方声明原话 |
| 🏆 Authoritative | +32% | 建立权威身份语气 |
| 🔤 Unique Words | +28% | 增加差异化词汇密度 |
| 🔧 Technical Terms | +26% | 精确使用行业术语 |
| ✨ Fluency Optimization | +18% | 提升语言流畅度 |
| 📖 Easy to Understand | +14% | 面向非专业受众时降低阅读难度 |

> 💡 **推荐组合**（半导体 B2B）：**Statistics + Cite Sources + Authoritative**  
> 系统也提供预设推荐组合，一键选中。

#### ④ 生成内容

点击「**生成内容**」（或选中某一剧本后点击「**为此剧本生成**」）：

- 内容以**流式**方式实时显示
- 生成完成后显示 `== GEO_ANALYSIS ==` 分隔线，下方是 GEO 审计报告
- GEO 信号面板显示优化前后对比：量化声明数、技术术语数、可引用段落数、对冲词数量

#### ⑤ 后处理

内容生成后，顶部 Tab 切换：

| Tab | 功能 |
|---|---|
| **Content** | 查看和编辑生成的正文（Markdown 预览） |
| **GEO Analysis** | 查看 GEO 审计报告和信号对比 |
| **JSON-LD** | 生成 Schema.org 结构化数据，点击「Copy」即可嵌入网页 |

底部工具栏：

| 按钮 | 功能 |
|---|---|
| **Humanize** | 去 AI 味，使内容更像人类专家撰写 |
| **Translate** | 翻译为其他语言 |
| **Generate Report** | 生成包含完整工作流数据的 PDF 策略报告（Markdown 格式） |

---

### 6.4 独立内容优化模式（Standalone Mode）

**触发方式：** Legacy GEO Flow 页面右上角点击「**Standalone Mode**」开关

**适用场景：** 你已有现成内容（官网文章、数据表摘要、产品页文案），希望直接强化，无需走完整三步流程。

#### 操作步骤

**① 导入待优化内容**

- **粘贴文本**：直接粘贴文章/段落
- **URL 导入**：输入页面 URL，系统自动抓取正文
- **文件上传**：上传 PDF/TXT

支持同时添加多个参考来源，系统会综合所有来源进行优化。

**② 配置优化参数**

与 Step 3 相同：选择目标平台、内容格式、GEO 优化方法（最多 3 个），可选填自定义指令（如"重点突出北欧市场的功耗优势"）。

**③ 点击「Optimize」**

系统流式输出优化后的内容 + GEO 审计报告。

**④ 后处理**

与 Step 3 相同：Humanize、Translate、JSON-LD、Generate Report。

---

## 7. Intelligence Layer（V2 智能监控层）

V2 模块提供持续的活动健康监控与竞争情报。当前版本使用**演示数据**展示界面，与 V1 工作流数据的实时打通功能将在后续版本推出。

> 所有 V2 页面顶部均有 `← Dashboard` 面包屑导航。

---

### 7.1 Control Tower（战役指挥塔）

**路径：** `/control-tower?campaign=<campaign-id>`

控制塔是**单个 Campaign 的智能仪表盘**，汇总所有关键情报。

#### 切换 Campaign

通过 URL 参数 `?campaign=camp-001` 指定要查看的 Campaign（点击 Campaigns 列表中某个 Campaign 的"Control Tower"入口会自动带参数跳转）。

#### 页面内容

| 区块 | 说明 |
|---|---|
| **Campaign 上下文条** | 活动名称、状态标签、负责人、关联 Brief ID、最后刷新时间 |
| **Health Score 卡片** | AI 知名度健康评分（0–100）+ 趋势方向（↑ / → / ↓） |
| **KPI Tiles** | 3 个核心指标瓦片，显示当前值 + 变化量 |
| **Opportunities & Risks** | 机会列表（可行动优先级）+ 风险列表（威胁等级） |
| **Recommended Actions** | 优先级排序的推荐行动，点击可直接跳转到对应功能模块 |
| **Weekly Summary** | 本周关键摘要要点 |
| **Recent Signals** | 最近触发的市场信号 |

#### 操作按钮

- 「**Refresh**」：刷新快照数据（演示模式下刷新时间戳）
- 「**Open Optimization Center**」→ 跳转 Optimization Center
- 「**View Full Signals**」→ 跳转 Signal Radar
- 「**View Report**」→ 跳转 Reports

---

### 7.2 Signal Radar（市场信号雷达）

**路径：** `/signal-radar`

三列布局：筛选器 / 信号流 / 详情面板。

#### 筛选器（左列）

| 筛选维度 | 说明 |
|---|---|
| **Type** | 信号类型多选（如 Competitor Move / Keyword Surge / Sentiment Shift 等） |
| **Severity** | 严重等级多选（Critical / High / Medium / Low） |
| **Entity** | 按品牌或产品名称文本搜索 |
| **Channel** | 按信号来源渠道筛选 |
| **Audience** | 按目标受众筛选 |
| **Date Range** | 按日期范围筛选 |

点击「**Reset**」清除所有筛选条件并取消选中。

#### 信号流（中列）

- 显示筛选结果数量和总信号数
- 点击任意信号卡片 → 右侧详情面板展开
- 信号卡片展示：标题、来源、严重等级色标、时间戳

#### 详情面板（右列）

选中信号后显示：
- 完整信号描述
- 来源信息和原始链接
- 推荐行动建议
- 「**Close**」（×）关闭详情面板

---

### 7.3 War Room（竞争对手情报室）

**路径：** `/war-room`

专注竞争情报分析：竞品声明、叙事转变、差异化缺口、反驳话术。

#### 选择竞品

页面顶部 **Competitor Switcher** 列出所有监控的竞争对手，点击切换。

#### 情报内容

| 区块 | 说明 |
|---|---|
| **Claims（核心声明）** | 竞品当前主打的营销声明列表，标注置信度 |
| **Narrative Shifts（叙事转变）** | 竞品近期改变或强化的叙事方向 |
| **Differentiation Gaps（差异化缺口）** | 竞品叙事中未覆盖或较弱的领域——这是我方的机会点 |
| **Rebuttals（反驳话术）** | 针对竞品声明的建议反驳角度和内容策略 |
| **Opportunity Highlights（机会高亮）** | 一键高亮最具价值的竞争切入点 |

---

### 7.4 Message Lab（受众消息测试台）

**路径：** `/message-lab`

测试不同消息框架在不同受众群体中的共鸣程度。

#### Resonance Matrix（共鸣矩阵）

矩阵行为消息变体，列为受众群体，交叉格显示共鸣得分（0–10）和颜色热力图：
- 🟢 绿色：高共鸣（> 7）
- 🟡 黄色：中等共鸣（4–7）
- 🔴 红色：低共鸣（< 4）

点击任意格查看详细的共鸣理由和优化建议。

---

### 7.5 Optimization Center（优化中心）

**路径：** `/optimization`

**左列**：推荐队列（Recommendation Queue）  
**右列**：推荐详情（Recommendation Detail）

#### 推荐队列

所有优化推荐按优先级排序，支持按 **Status** 筛选：

| 状态 | 含义 |
|---|---|
| `pending` | 待处理 |
| `in_progress` | 执行中 |
| `completed` | 已完成 |
| `dismissed` | 已忽略 |

#### 推荐详情

点击任意推荐条目，右侧展示：
- 问题描述和影响评估
- 具体行动步骤
- 预期改善效果
- 状态操作按钮：「**Start**」/ 「**Complete**」/ 「**Dismiss**」

---

### 7.6 Integrations（集成连接器）

**路径：** `/integrations`

管理与外部平台的数据连接。

#### 连接器卡片网格

每个连接器卡片显示：平台名称、图标、当前状态徽章（`connected` / `disconnected` / `paused` / `error`）、简短描述。

点击卡片 → 右侧 **Detail 面板** 展开，显示配置信息和操作按钮：

| 按钮 | 触发的状态变化 |
|---|---|
| **Connect** | → connected |
| **Disconnect** | → disconnected |
| **Resume** | paused → connected |
| **Pause** | connected → paused |
| **Test** | 保持 connected，执行连接测试 |
| **Remove** | 从列表中删除该连接器 |

> 点击「**+ Add Connector**」添加新连接（当前为占位，连接器创建向导将在后续版本推出）。

---

### 7.7 Reports（报告库）

**路径：** `/reports`

查看和管理所有已生成的 GEO 策略报告。

#### 筛选 Tab

顶部 Tab 按报告类型筛选：**All / GEO Strategy / Optimization / Competitive / Performance**

#### 报告列表

每行显示：报告标题、类型标签、创建时间、状态（Draft / Final / Archived）。

点击任意报告行 → 右侧 **Preview Drawer** 展开预览：
- 完整 Markdown 内容渲染
- 「**Export**」/ 「**Share**」按钮（当前为占位功能）

点击「**+ New Report**」触发报告生成向导（当前为占位，完整实现将在后续版本推出）。

---

## 8. GEO 助理（浮动聊天窗）

**触发方式：** 点击屏幕右下角的深蓝色圆形按钮（消息气泡图标）

GEO 助理是一个**上下文感知的对话助手**，它了解你当前所在的步骤和已选择的监测问题 / 剧本，可以帮你：

- 解读某个意图群的诊断结果
- 建议具体的内容优化方向
- 回答 GEO 方法论相关问题
- 对 AI 生成的策略提出质疑和完善建议

#### 使用说明

1. 点击右下角按钮打开对话窗
2. 在输入框输入问题，按 `Enter` 或点击发送按钮
3. 对话历史会在当前会话内保留（存储在浏览器 localStorage）
4. 点击 `×` 关闭窗口（不清空历史）
5. 顶部导航栏 Language 切换会同步切换 GEO 助理的回复语言

> 💡 **推荐提问方式**：越具体越好。例如：
> - "为什么 VL53L9 的 CORPUS_ABSENCE 诊断这么严重？应该优先修复哪个意图群？"  
> - "这个 Statistics Addition 方法应该如何应用到 CSDN 技术文章中？"

---

## 9. 常见问题与故障排查

### Q1：点击「开始诊断」没有反应 / 一直转圈

**原因**：通常是 Gemini API Key 未配置或网络无法访问 Google API。

**解决方案**：
1. 检查 `.env.local` 中 `VITE_GEMINI_API_KEY` 是否正确填写
2. 中国大陆用户需开启全局代理（VPN），确保可访问 `generativelanguage.googleapis.com`
3. 打开浏览器 DevTools → Network，查看报错状态码

---

### Q2：出现 429 错误 / "Rate Limit Exceeded"

**原因**：API 调用频率超过 Gemini 免费额度限制。

**解决方案**：
- 系统会**自动重试并显示倒计时**，等待即可
- 若频繁触发，考虑升级到 Gemini API 付费版
- 分析复杂内容时减少并发操作

---

### Q3：Multi-Model Verification 全部显示 "API key not configured"

**原因**：未配置 DeepSeek / Qwen / Doubao / Kimi 的 API Key。

**解决方案**：在 `.env.local` 中添加对应的 `VITE_DEEPSEEK_API_KEY` 等变量。若不需要真实跨模型验证，可忽略此提示，Gemini 会生成模拟推断结果。

---

### Q4：Market Mapping / Brief Builder 进入后显示 "No Product Truth Available"

**原因**：Product Intake 步骤未完成确认。

**解决方案**：返回 `/product-intake`，填写产品信息并点击「**Confirm & Save**」。

---

### Q5：内容生成中途停止，显示 "Stream Truncated"

**原因**：单次流式输出超过 18,000 字符上限，或网络中断。

**解决方案**：
- 在"人工干预指令"中加入"请分两部分输出"进行拆分
- 或在 Platform 中选择篇幅更短的格式（如 FAQ 代替 Long-form Article）

---

### Q6：界面数据不更新 / 显示旧数据

**原因**：Zustand 状态持久化到了 localStorage，可能存在残留状态。

**解决方案**：
- 打开浏览器 DevTools → Application → Local Storage
- 找到 Key 为 `geo-hub-storage` 的条目
- 删除后刷新页面，重新开始工作流

---

### Q7：JSON-LD Schema 生成失败

**原因**：通常是内容过长或 Gemini responseMimeType 解析异常。

**解决方案**：确保内容已生成后再点击「JSON-LD」按钮；若仍失败，刷新页面重新生成内容后再尝试。

---

### Q8：页面崩溃显示 "Something went wrong"

系统已内置 Error Boundary，崩溃只会影响当前页面。

**解决方案**：点击「**Try again**」按钮重置该页面状态。若问题持续，刷新整个页面。

---

*© 2026 GEO Strategic Hub · 如有问题请联系管理员*

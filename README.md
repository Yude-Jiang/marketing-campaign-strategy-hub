# Campaign OS — GEO Strategic Hub

A professional **Generative Engine Optimization (GEO)** strategy platform for marketing and product teams. The tool helps you analyze how AI models perceive your product, identify content gaps, and generate AI-citation-optimized content.

---

## Architecture

```
src/
├── pages/
│   ├── v1/          # Campaign OS: step-by-step workflow
│   ├── v2/          # Intelligence Layer: real-time monitoring
│   └── LegacyGeoFlow.tsx  # Original 3-step GEO wizard
├── components/
│   ├── v1/          # V1-specific UI components
│   ├── v2/          # V2-specific UI components
│   └── ErrorBoundary.tsx
├── services/
│   ├── geminiService.ts       # Gemini API (analysis, content, grounding)
│   ├── multiModelService.ts   # DeepSeek / Qwen / Doubao / Kimi
│   ├── promptBuilder.ts       # 5-layer prompt architecture
│   └── geoMethods.ts          # GEO optimization method definitions
├── store/
│   └── workflowStore.ts       # Zustand global state (persisted)
├── config/
│   └── models.ts              # Model IDs + configurable constants
├── utils/
│   └── geo.ts                 # Shared Europe/Mistral region detection
└── i18n/
    └── translations.ts        # zh / en / jp UI strings
```

### V1 — Campaign OS (step-by-step)

| Step | Route | Description |
|---|---|---|
| Dashboard | `/dashboard` | Overview, quick actions |
| Product Intake | `/product-intake` | Parse product specs into a structured model |
| Market Mapping | `/market-mapping` | Competitor + corpus analysis |
| Brief Builder | `/brief-builder` | Campaign brief generation |
| Strategy Studio | `/strategy-studio` | GEO playbook selection |
| Activation Studio | `/activation-studio` | AI-optimized content production |
| Campaigns | `/campaigns` | Campaign list |

### V2 — Intelligence Layer

| Module | Route | Description |
|---|---|---|
| Control Tower | `/control-tower` | Campaign health score + KPIs |
| Signal Radar | `/signal-radar` | Market signal feed + filtering |
| War Room | `/war-room` | Competitive intelligence |
| Message Lab | `/message-lab` | Audience resonance testing |
| Optimization | `/optimization` | Experiment queue + recommendations |
| Integrations | `/integrations` | API connector management |
| Reports | `/reports` | Generated strategy reports |

---

## Setup

### Prerequisites

- Node.js 18+
- A Google Gemini API key (required for core analysis)

### Install & run

```bash
npm install
npm run dev
```

### Environment variables

Create a `.env.local` file (never commit this):

```env
# Required — core analysis engine
VITE_GEMINI_API_KEY=your_gemini_api_key

# Optional — multi-model verification (cross-validates AI perceptions)
VITE_DEEPSEEK_API_KEY=your_deepseek_key
VITE_QWEN_API_KEY=your_qwen_key
VITE_DOUBAO_API_KEY=your_doubao_key          # supports "apiKey|endpointId" format
VITE_Kimi_API_KEY=your_kimi_key

# Optional — report attribution (shown in generated reports)
VITE_REPORTER_EMAIL=your@email.com
VITE_REPORTER_ORG=Your Organization
```

> **Security note**: All `VITE_*` vars are bundled into the browser JS. For production, route API calls through the included `server.js` proxy instead.

### Production build

```bash
npm run build
npm run preview
```

### Docker

```bash
docker build -t campaign-os .
docker run -p 3000:3000 -e VITE_GEMINI_API_KEY=... campaign-os
```

---

## Supported Ecosystems

| ID | Target AI models |
|---|---|
| `global` | ChatGPT, Claude, Gemini, Perplexity (+ Mistral for European regions) |
| `cn` | Doubao/豆包, Kimi, DeepSeek, Qwen/通义千问, ERNIE/文心一言, 元宝 |
| `jp` | Yahoo/Line AI, Claude, GPT-4o |
| `kr` | Naver CUE:, GPT-4o |

---

## Tech Stack

- **React 19** + **TypeScript** — UI
- **Vite 8** — build tooling
- **Tailwind CSS v4** — styling
- **Zustand v5** — state management (localStorage-persisted)
- **React Router v7** — routing with route-level lazy loading
- **Google Gemini** (`@google/genai`) — analysis, grounding, content generation
- **Lucide React** — icons

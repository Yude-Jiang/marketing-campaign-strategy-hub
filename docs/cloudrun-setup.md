# Cloud Run 部署指南

本文档描述将 Campaign OS 部署到 Google Cloud Run 所需的 GCP 前置条件配置步骤。

---

## 前置条件

- Google Cloud 账号，已创建项目
- 已安装并初始化 `gcloud` CLI（[安装说明](https://cloud.google.com/sdk/docs/install)）
- 对目标 GCP 项目拥有 Owner 或等效权限
- 已 fork 或克隆本仓库，并在 GitHub 上有推送权限

---

## 步骤 1：启用所需 API

```bash
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  iam.googleapis.com \
  iamcredentials.googleapis.com \
  sts.googleapis.com
```

---

## 步骤 2：创建 Artifact Registry 仓库

```bash
gcloud artifacts repositories create campaign-os \
  --repository-format=docker \
  --location=us-central1 \
  --description="Campaign OS Docker images"
```

> 如需使用其他 region，将 `us-central1` 替换为目标区域，并在后续步骤保持一致。

---

## 步骤 3：创建 Workload Identity Federation

Workload Identity Federation 允许 GitHub Actions 在无需长期 JSON 密钥的情况下获取 GCP 权限。

### 3a. 创建 WIF Pool

```bash
gcloud iam workload-identity-pools create "github-pool" \
  --project="YOUR_PROJECT_ID" \
  --location="global" \
  --display-name="GitHub Actions Pool"
```

### 3b. 创建 WIF Provider

```bash
gcloud iam workload-identity-pools providers create-oidc "github-provider" \
  --project="YOUR_PROJECT_ID" \
  --location="global" \
  --workload-identity-pool="github-pool" \
  --display-name="GitHub provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
  --issuer-uri="https://token.actions.githubusercontent.com"
```

### 3c. 创建 Service Account

```bash
gcloud iam service-accounts create github-deploy \
  --project="YOUR_PROJECT_ID" \
  --display-name="GitHub Actions Deploy SA"
```

### 3d. 授予 Service Account 所需角色

```bash
PROJECT_ID="YOUR_PROJECT_ID"
SA="github-deploy@${PROJECT_ID}.iam.gserviceaccount.com"

# 推送镜像到 Artifact Registry
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${SA}" \
  --role="roles/artifactregistry.writer"

# 部署到 Cloud Run
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${SA}" \
  --role="roles/run.admin"

# 允许 Cloud Run 使用默认 SA
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${SA}" \
  --role="roles/iam.serviceAccountUser"
```

### 3e. 允许 GitHub 仓库使用该 Service Account

```bash
PROJECT_ID="YOUR_PROJECT_ID"
REPO="YOUR_GITHUB_ORG/YOUR_REPO_NAME"   # e.g. acme/marketing-campaign-strategy-hub
SA="github-deploy@${PROJECT_ID}.iam.gserviceaccount.com"

POOL_ID=$(gcloud iam workload-identity-pools describe github-pool \
  --project="$PROJECT_ID" --location="global" \
  --format="value(name)")

gcloud iam service-accounts add-iam-policy-binding "$SA" \
  --project="$PROJECT_ID" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/${POOL_ID}/attribute.repository/${REPO}"
```

### 3f. 获取 WIF Provider 完整资源名称

```bash
gcloud iam workload-identity-pools providers describe github-provider \
  --project="YOUR_PROJECT_ID" \
  --location="global" \
  --workload-identity-pool="github-pool" \
  --format="value(name)"
```

记录输出值，格式类似：
```
projects/123456789/locations/global/workloadIdentityPools/github-pool/providers/github-provider
```

---

## 步骤 4：配置 GitHub Secrets

前往 GitHub 仓库 → **Settings → Secrets and variables → Actions**，添加以下 Secrets：

| Secret 名称 | 值说明 |
|---|---|
| `GCP_PROJECT_ID` | GCP 项目 ID，例如 `my-project-123` |
| `GCP_REGION` | 部署区域，例如 `us-central1` |
| `AR_REPO` | Artifact Registry 仓库名，例如 `campaign-os` |
| `WIF_PROVIDER` | 步骤 3f 获取的 Provider 完整资源名称 |
| `WIF_SERVICE_ACCOUNT` | Service Account Email，例如 `github-deploy@my-project.iam.gserviceaccount.com` |
| `VITE_GEMINI_API_KEY` | Google Gemini API 密钥（必填） |
| `VITE_DEEPSEEK_API_KEY` | DeepSeek API 密钥（可选） |
| `VITE_QWEN_API_KEY` | 阿里云百炼 API 密钥（可选） |
| `VITE_DOUBAO_API_KEY` | 豆包/火山引擎密钥，支持 `key\|endpointId` 格式（可选） |
| `VITE_Kimi_API_KEY` | Kimi/Moonshot API 密钥（可选） |
| `VITE_REPORTER_EMAIL` | 报告署名邮箱（可选） |
| `VITE_REPORTER_ORG` | 报告署名组织名称（可选） |

---

## 步骤 5：触发首次部署

将代码推送到 `main` 分支即可触发自动部署：

```bash
git push origin main
```

或在 GitHub → **Actions → Deploy to Cloud Run → Run workflow** 手动触发。

---

## 部署流程说明

```
push to main
    ↓
GitHub Actions: checkout + WIF auth
    ↓
docker build (multi-stage, no API keys baked in)
    ↓
docker push → Artifact Registry
    ↓
gcloud run deploy (env vars injected from GitHub Secrets)
    ↓
Cloud Run: node server.js → /config.js 将运行时 env vars 注入 window.env
    ↓
浏览器加载 /config.js → window.env → API 调用
```

API 密钥**不会**打入 Docker 镜像，只在运行时注入，符合最小权限原则。

---

## 费用说明

Cloud Run 按请求计费，无流量时不产生费用（`--min-instances=0`）。
Artifact Registry 按存储量计费（约 $0.10/GB/月）。

建议定期清理旧镜像：

```bash
gcloud artifacts docker images delete \
  us-central1-docker.pkg.dev/YOUR_PROJECT_ID/campaign-os/campaign-os \
  --delete-tags --quiet
```

---

## 故障排查

**构建失败（npm ci 报错）**
- 确保 `package-lock.json` 已提交到仓库

**推送镜像失败（权限不足）**
- 确认 Service Account 拥有 `roles/artifactregistry.writer`
- 确认 WIF Provider 的 `attribute.repository` 与 GitHub 仓库路径完全匹配（区分大小写）

**Cloud Run 启动后无法调用 AI 接口**
- 检查 Cloud Run 服务的环境变量是否正确设置
- 浏览器打开 `https://YOUR_SERVICE_URL/config.js` 验证密钥是否注入（注意：密钥会对外可见，生产环境建议配合 Cloud Run 身份验证）

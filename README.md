# WordNext

Wenson 的博客前端，线上地址为 <https://www.iwenson.com>。

- Next.js 16.3.3（App Router）
- React 19.2.8
- Strapi 5 API
- Vercel 自动部署
- Waline 评论

后端仓库：<https://github.com/wensonsmith/wordapi>

## 已完成的升级和修复

本项目已从旧版 Next.js 和 Strapi v4 数据结构升级，主要修改包括：

- 升级到 Next.js 16 和 React 19。
- 适配 Strapi v5 的扁平响应结构，不再读取 `attributes` 和关系字段的 `data` 包装层。
- 使用 Strapi v5 的 `documentId` 或 `slug` 加载 Navigation 插件数据。
- 为 Strapi v5 查询提供明确的 `fields`、`populate` 和 `filters`，避免严格查询校验报错。
- 将 `NEXT_TIMEOUT` 统一按秒解释。
- Waline 改为客户端按需初始化，并在页面切换时正确销毁实例。
- 修复 `ScrollUp` effect 返回无效清理值导致的客户端页面跳转错误。
- 使用 Next.js 原生 Metadata API，并移除旧版兼容代码。

## 目录说明

- `app/`：页面、布局和路由。
- `components/`：页面组件和客户端交互组件。
- `lib/strapi.ts`：所有 Strapi 请求及查询参数。
- `lib/strapi-types.ts`：Strapi v5 响应类型。
- `lib/markdown.ts`：Markdown 渲染处理。
- `next.config.js`：图片域名和旧文章地址重定向。

## 环境变量

复制 `.env.example` 为 `.env`：

```bash
cp .env.example .env
```

Windows PowerShell：

```powershell
Copy-Item .env.example .env
```

| 变量 | 是否必需 | 说明 |
| --- | --- | --- |
| `NEXT_STRAPI_URL` | 是 | Strapi 地址，生产环境为 `https://wordapi.fly.dev`。 |
| `NEXT_STRAPI_TOKEN` | 是 | Strapi 只读 API Token。仅在服务端使用，不要添加 `NEXT_PUBLIC_` 前缀。 |
| `NEXT_STRAPI_NAVIGATION` | 否 | 指定导航的 Strapi v5 `documentId` 或 `slug`；为空时自动选择首个可见导航。 |
| `NEXT_TIMEOUT` | 否 | Strapi 请求超时秒数，默认 `10`。 |
| `NEXT_PUBLIC_IMAGE_URL` | 视数据而定 | 媒体字段返回相对 URL 时使用的基础地址。 |
| `NEXT_PUBLIC_WALINE_URL` | 否 | Waline 服务端地址。 |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | 否 | Google Analytics Measurement ID。 |

`.env` 已被 Git 忽略，严禁提交 Token 或其他凭据。

## 本地开发

要求 Node.js 20.9 或更高版本，使用 pnpm 10：

```bash
pnpm install
pnpm dev
```

访问 <http://localhost:3000>。本地 Strapi 不可用时，也可以让 `NEXT_STRAPI_URL` 指向线上后端，但应使用权限最小化的只读 Token。

## 如何修改

### 修改页面或样式

页面放在 `app/`，共享组件放在 `components/`。新增客户端状态、事件或 effect 时添加 `"use client"`。

React effect 只能返回清理函数或不返回值。不要用可能返回其他值的表达式简写：

```tsx
useEffect(() => {
  window.document.scrollingElement?.scrollTo(0, 0)
}, [pathname])
```

### 修改 Strapi 字段

Strapi v5 字段直接位于实体上，例如 `article.title` 和 `article.tags`，不要再使用 v4 的 `article.attributes.title` 或 `relation.data`。

后端增加、删除或重命名字段后，前端按以下顺序修改：

1. 更新 `lib/strapi-types.ts` 中对应类型。
2. 更新 `lib/strapi.ts` 或页面查询中的 `fields`、`populate` 和 `filters`。
3. 更新使用该字段的页面和组件。
4. 检查空数据、草稿和未发布关联数据的情况。
5. 执行完整检查，并真实点击相关页面验证客户端导航。

### 更换 Strapi API Token

1. 在 Strapi 管理后台创建新的只读 Token，并确认它能读取前端使用的内容类型和 Navigation 接口。
2. 在 Vercel 项目设置的 Environment Variables 中更新 `NEXT_STRAPI_TOKEN`。
3. 确认 Production、Preview 等需要的环境均已更新。
4. 重新部署前端；只修改变量不会改变已完成的旧部署。
5. 新部署验证成功后，再删除旧 Token。

## 修改后的检查

提交前运行：

```bash
pnpm typecheck
pnpm lint
pnpm build
```

构建通过后还应在生产模式或预览部署中检查：

- 首页可以加载文章。
- 从首页点击文章详情不会出现 `This page couldn’t load`。
- 文章列表、分类、标签和关于页可以通过客户端导航访问。
- 图片、导航和 Waline 不会阻塞正文显示。

## Git 提交

常规修改建议使用功能分支：

```bash
git switch main
git pull --ff-only origin main
git switch -c codex/功能名称
git add .
git commit -m "feat: 修改说明"
git push -u origin codex/功能名称
```

合并前再次运行检查。紧急修复也可以直接提交到 `main`，但必须先确认工作区只包含本次修改。

## Vercel 上线

GitHub 仓库的 `main` 已连接 Vercel。合并或推送到 `main` 后会自动创建生产部署：

```bash
git switch main
git pull --ff-only origin main
git merge --ff-only codex/功能名称
git push origin main
```

上线流程：

1. 在 Vercel 的 Deployments 页面等待构建成功。
2. 如果构建失败，查看构建日志，优先检查环境变量和 Strapi 请求错误。
3. 打开 <https://www.iwenson.com>，通过真实点击检查首页、文章详情、文章列表和关于页。
4. 检查浏览器控制台和 Vercel Runtime Logs。

需要回滚时，在 Vercel Deployments 中选择上一个成功部署并重新设为 Production，或回滚 Git 提交后再次推送 `main`。

## 前后端联动顺序

同时修改 Strapi schema 和前端时，建议按以下顺序上线：

1. 后端改动保持向后兼容，例如先新增字段，不立即删除旧字段。
2. 备份数据库并部署 Strapi。
3. 确认线上 API 返回新结构。
4. 部署前端并完成真实点击验证。
5. 确认前端稳定后，再清理不再使用的旧字段。

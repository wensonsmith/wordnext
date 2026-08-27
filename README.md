# WordNext

基于 Next.js 16、React 19 和 Strapi v5 的博客前端。

## 本地开发

要求 Node.js 20.9 或更高版本，包管理器使用 pnpm 10。

```bash
pnpm install
```

复制 `.env.example` 为 `.env`，填写 Strapi API Token 和其他服务地址。`.env` 只保留在本地，不要提交到 Git。

```bash
pnpm dev
```

默认访问 `http://localhost:3000`。

## 修改后的检查流程

每次修改完成后依次运行：

```bash
pnpm typecheck
pnpm lint
pnpm build
```

建议从当前主分支创建功能分支，再提交和推送：

```bash
git switch -c codex/功能名称
git add .
git commit -m "feat: 修改说明"
git push -u origin codex/功能名称
```

## Strapi v5 数据约定

所有 Strapi 请求集中在 `lib/strapi.ts`，响应类型集中在 `lib/strapi-types.ts`。Strapi v5 的字段直接位于实体上，例如 `article.title`、`article.tags`，不再使用 v4 的 `article.attributes.title` 或 `relation.data`。

如果以后在 Strapi 增加或修改字段：

1. 更新 `lib/strapi-types.ts` 中对应类型。
2. 在 `lib/strapi.ts` 或页面查询中补充 `fields`、`populate`、`filters`。
3. 更新使用该字段的页面或组件。
4. 运行完整检查流程。

部署环境至少需要配置 `NEXT_STRAPI_URL` 和 `NEXT_STRAPI_TOKEN`；媒体使用相对 URL 时，还要配置 `NEXT_PUBLIC_IMAGE_URL`。`NEXT_TIMEOUT` 的单位是秒。导航会自动读取首个可见导航，也可以通过 `NEXT_STRAPI_NAVIGATION` 明确指定导航的 Strapi v5 `documentId` 或 `slug`。

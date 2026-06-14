# Storeplate

Storeplate 是一个基于 Astro 的电商前端模板，已调整为可部署到 Cloudflare Workers。当前版本默认使用本地演示商品数据，因此即使没有连接 Payload CMS 或其他后端，也可以完成构建、预览和线上部署。

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rainco2008/storeplate)

## 技术栈

| 组件                | 版本                   | 用途                              |
| ------------------- | ---------------------- | --------------------------------- |
| Astro               | 6.4.6                  | 前端框架与 SSR 渲染               |
| @astrojs/cloudflare | 13.7.0                 | Cloudflare Workers 适配器         |
| Wrangler            | 4.100.0                | Cloudflare Workers 本地调试与部署 |
| Vite                | 8.0.16                 | 构建工具                          |
| Esbuild             | 0.28.1                 | 代码转换与打包依赖                |
| React               | 19.2.7                 | 交互组件                          |
| React DOM           | 19.2.7                 | React 渲染                        |
| Tailwind CSS        | 4.3.1                  | 样式系统                          |
| @tailwindcss/vite   | 4.3.1                  | Tailwind Vite 集成                |
| TypeScript          | 6.0.3                  | 类型检查                          |
| MDX                 | @astrojs/mdx 6.0.3     | 内容页面与短代码                  |
| Sitemap             | @astrojs/sitemap 3.7.3 | sitemap 生成                      |
| Swiper              | 12.2.0                 | 首页与商品滑块                    |
| Nanostores          | 1.3.0                  | 购物车状态                        |
| Sharp               | 0.34.5                 | Astro 图片处理                    |
| Concurrently        | 10.0.3                 | 本地开发并行任务                  |
| Payload CMS         | 3.85.1                 | 计划接入的后台内容与商品管理系统  |

## 当前状态

- 已升级 Astro 到最新版本 `6.4.6`。
- 已从 Netlify adapter 切换到 `@astrojs/cloudflare`。
- 已新增 `wrangler.jsonc`，目标部署平台为 Cloudflare Workers。
- 未配置后端时，页面自动读取 `src/lib/demo-store.ts` 中的本地演示数据。
- 后续接入 Payload CMS 时，可把当前数据访问层替换或扩展为 Payload API。

## 本地开发

```bash
npm install
npm run dev
```

默认开发地址通常是 `http://localhost:4321`。

## 构建与预览

```bash
npm run build
npm run preview
```

Cloudflare Workers 本地预览：

```bash
npm run cf:preview
```

## 部署到 Cloudflare Workers

先登录 Cloudflare：

```bash
npx wrangler login
```

然后部署：

```bash
npm run deploy
```

也可以使用上方的一键部署按钮，Cloudflare 会从 GitHub 仓库创建 Worker 项目。

## 环境变量

当前前端不要求任何环境变量。没有配置后端时会自动使用演示数据。

未来接入 Payload CMS 时，建议新增：

```bash
PUBLIC_PAYLOAD_API_URL="https://your-payload-domain.com"
PAYLOAD_API_TOKEN="your-server-side-token"
```

注意：`PAYLOAD_API_TOKEN` 不应暴露到浏览器端，建议只在服务端路由或 Workers 环境变量中使用。

## 主要目录

```text
src/pages/                  Astro 页面
src/layouts/                布局、组件与交互组件
src/lib/demo-store.ts       无后端部署时的演示数据
src/lib/shopify/            当前兼容数据访问层，可后续扩展为 Payload CMS
src/config/                 站点配置、菜单、主题配置
public/                     静态资源
wrangler.jsonc              Cloudflare Workers 配置
```

## Payload CMS 接入建议

当前前端已经把“无后端可部署”作为默认路径。接入 Payload CMS 时建议按以下顺序推进：

1. 在 Payload 中建立 `products`、`collections`、`media`、`pages` 集合。
2. 新增 `src/lib/payload/` 数据客户端，输出与现有 `Product`、`Collection` 兼容的数据结构。
3. 在数据访问层中按环境变量选择 Payload 或演示数据。
4. 将购物车与结账逻辑接入真实电商服务，或在 Payload 中只管理内容和商品展示。

## License

MIT

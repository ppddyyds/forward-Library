# 智慧图书馆前端系统

基于 **Vue3 + Vite + TypeScript + Vue Router + Pinia + Axios + Element Plus** 的智慧图书馆前端项目。

后端接口基地址：`http://localhost:8080/api`

## 功能清单

- JWT 登录认证（登录页）
- 图书列表展示与关键字搜索
- 热门推荐页面
- AI 问答页面
- Axios 二次封装（自动携带 Token）
- 路由鉴权（未登录自动跳转登录页）

## 项目结构

```text
forward-Library/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── src/
│   ├── App.vue
│   ├── main.ts
│   ├── assets/
│   │   └── main.css
│   ├── api/
│   │   ├── http.ts
│   │   ├── library.ts
│   │   └── user.ts
│   ├── router/
│   │   └── index.ts
│   ├── stores/
│   │   └── auth.ts
│   ├── types/
│   │   └── index.ts
│   └── views/
│       ├── AiQaView.vue
│       ├── BookListView.vue
│       ├── LoginView.vue
│       ├── MainLayout.vue
│       └── RecommendView.vue
└── README.md
```

## 启动说明

### 1) 安装依赖

```bash
npm install
```

### 2) 启动开发环境

```bash
npm run dev
```

默认访问地址（Vite）：

- `http://localhost:5173`

> 请确保后端服务已启动，并可通过 `http://localhost:8080/api` 正常访问。

## 接口约定（示例）

前端默认调用下列接口（可按后端实际情况适配）：

- `POST /auth/login`：登录，返回 `{ token, userName }`
- `GET /books?keyword=xxx`：图书列表/搜索
- `GET /books/recommendations/hot`：热门推荐
- `POST /ai/ask`：AI问答，返回 `{ answer }`

## 说明

- Token 存储在 `localStorage`。
- Axios 请求拦截器自动在请求头追加：`Authorization: Bearer <token>`。
- Axios 响应拦截器在 `401` 时自动清理登录信息并跳转 `/login`。

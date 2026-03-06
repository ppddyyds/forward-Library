# library-frontend（智慧图书馆前端）

## 项目介绍

这是一个基于 Vue3 技术栈的智慧图书馆前端系统，支持 JWT 登录鉴权、图书搜索与详情借阅、个性化推荐、AI 问答、用户画像统计等功能。

后端接口地址：`http://localhost:8080/api`

## 技术栈

- Vue3
- Vite
- TypeScript
- Vue Router
- Pinia
- Axios
- Element Plus
- ECharts

## 功能模块

### Phase1
- 登录页（JWT）
- 图书列表与搜索
- 热门/推荐页面
- AI问答
- Axios封装（自动携带 token）
- 路由鉴权

### Phase2
- 图书详情页 `/book/:id`
  - 获取详情：`GET /books/{id}`
  - 借阅图书：`POST /books/{id}/borrow`
- 个性化推荐页 `/recommend`
  - 接口：`GET /recommendation/personal`
- 用户画像页 `/profile`
  - 接口：`GET /user/profile`
  - 使用 ECharts 展示兴趣分类饼图
- AI问答升级 `/ai`
  - 类 ChatGPT 消息界面
  - 支持消息列表、用户消息、AI消息、滚动到底部
- 搜索日志支持
  - 搜索接口：`GET /books/search?keyword=`

## 路由

- `/login`
- `/register`
- `/`
- `/books`
- `/book/:id`
- `/recommend`
- `/profile`
- `/ai`

## 项目结构

```text
library-frontend/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src
    ├── main.ts
    ├── App.vue
    ├── router
    │   └── index.ts
    ├── store
    │   └── user.ts
    ├── api
    │   ├── axios.ts
    │   ├── auth.ts
    │   ├── book.ts
    │   ├── recommend.ts
    │   ├── ai.ts
    │   └── user.ts
    ├── layout
    │   └── MainLayout.vue
    ├── components
    │   ├── BookCard.vue
    │   ├── BookList.vue
    │   ├── SearchBar.vue
    │   └── ChatBox.vue
    └── views
        ├── Login.vue
        ├── Register.vue
        ├── Home.vue
        ├── BookList.vue
        ├── BookDetail.vue
        ├── Recommend.vue
        ├── Profile.vue
        └── AiChat.vue
```

## 安装

```bash
npm install
```

## 运行

```bash
npm run dev
```

默认端口：`5173`

## 用户画像接口适配

已按后端 `GET /api/user/profile` 文档适配页面展示，包含：

- 阅读偏好标签（`persona.readingTags`）
- 兴趣分类分布饼图（`persona.topCategories[].score`）
- 行为分布柱状图（`persona.behaviorDistribution`）
- 人格类型与描述（`persona.personalityType`、`persona.personalityDescription`）
- 最近阅读记录（`persona.recentBooks`）


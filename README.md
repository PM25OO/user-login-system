# 简易用户登录系统
---

## 启动💻  
- 前端
```
npm install
npm run dev
```
- 数据库（Docker）
```
docker compose up -d
docker exec -it userdb mysql -u user -p
```

## 项目结构🗂️
```
user-login-system/
├── frontend/                # 前端项目 (React + Vite + TS)
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── public/
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── api/             # 封装 axios 请求
│       │   └── auth.ts
│       ├── pages/           # 页面
│       │   ├── Login.tsx
│       │   ├── Register.tsx
│       │   └── Dashboard.tsx
│       ├── components/      # 可复用组件
│       │   └── Navbar.tsx
│       └── hooks/           # 自定义 hooks (可选)
│
├── backend/                 # 后端项目 (Spring Boot)
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/com/example/demo/
│           │   ├── controller/    # 控制器层 (AuthController)
│           │   ├── entity/        # 实体类 (User)
│           │   ├── repository/    # 数据访问层 (UserRepository)
│           │   ├── service/       # 业务逻辑层 (UserService, JwtService)
│           │   ├── security/      # 安全配置 (Spring Security + JWT)
│           │   └── DemoApplication.java
│           └── resources/
│               ├── application.yml # Spring 配置 (数据库、端口)
│               └── schema.sql      # 初始化 SQL (可选)
│
└── database/               # 数据库相关
    ├── init.sql            # 建表语句 (users 表)
    └── docker-compose.yml  # 用于快速启动 MySQL (可选)

```
## 技术栈🛠️

- 前端：React + Vite + Typescript
- 后端：SpringBoot
- 数据库：MySQL

## TODO🗒️
- [x] 基本前端逻辑  
- [ ] 基本后端逻辑  
- [x] 连接数据库并启动  
- [ ] 完善前端  
- [ ] 完善后端  

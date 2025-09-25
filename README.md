# 简易用户登录系统

一个基于 Spring Boot + React (Vite + TypeScript + Ant Design Pro 组件) 的最小登录/注册示例项目。当前版本实现最基础：注册 + 登录（明文密码，仅演示用途），以及部分测试接口。

> 警告：当前后端未做密码加密、未实现会话 / JWT、缺少统一异常处理与权限控制。请勿直接用于生产。

---

## 🚀 快速开始

### 1. 启动数据库 (MySQL via Docker Compose)
```bash
cd database
docker compose up -d
# (可选) 进入容器：
docker exec -it userdb mysql -u user -p  # 密码: pass
```

### 2. 启动后端 (Spring Boot)
方式 A: 使用 Maven Wrapper
```bash
cd backend
./mvnw spring-boot:run
```
方式 B: 直接运行（已安装 maven）
```bash
mvn spring-boot:run
```
运行后默认端口：`http://localhost:8080`

### 3. 启动前端 (Vite)
```bash
cd frontend
npm install
npm run dev
```
默认访问：http://localhost:5173

---

## 🗂️ 项目结构
```text
user-login-system/
├── frontend/                         # React + Vite + TS 前端
│   ├── package.json
│   ├── tsconfig*.json
│   ├── vite.config.ts
│   ├── eslint.config.js
│   ├── index.html
│   ├── public/
│   │   └── vite.svg
│   └── src/
│       ├── main.tsx                  # 入口
│       ├── index.css
│       ├── vite-env.d.ts
│       ├── pages/
│       │   ├── App.tsx               # 登录/注册页（复用组件）
│       │   └── Home.tsx              # 登录成功后的示例页
│       ├── api/                      # Axios 实例封装
│       │   └── api.ts
│       └── assets/
│           └── react.svg
│
├── backend/                          # Spring Boot 后端
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd
│   └── src/
│       ├── main/
│       │   ├── java/com/example/backend/
│       │   │   ├── BackendApplication.java   # 启动类
│       │   │   ├── controller/               # 控制器
│       │   │   │   ├── HelloController.java  # GET /api/hello
│       │   │   │   ├── TestController.java   # GET /api/testdata
│       │   │   │   └── UserController.java   # /auth/* 登录注册
│       │   │   ├── entity/                   # JPA 实体
│       │   │   │   └── User.java
│       │   │   ├── repository/               # 数据访问
│       │   │   │   └── UserRepository.java
│       │   │   └── service/                  # 业务逻辑
│       │   │       └── UserService.java
│       │   └── resources/
│       │       │   └── application.properties
│       └── test/
│           └── java/com/example/backend/BackendApplicationTests.java
│
└── database/                        # MySQL 服务编排
    ├── docker-compose.yml
    └── data/                        # 数据卷 (容器启动后生成)
```

---

## 🧩 功能一览 (当前)
- 用户注册：用户名、邮箱唯一性校验（抛异常 -> 控制器捕获简单处理）
- 用户登录：校验用户名+密码（明文）
- 简单测试接口：`/api/hello` 与 `/api/testdata`
- 前端 UI：Ant Design Pro 登录表单 + Tabs 登录/注册切换

---

## 🔌 后端接口说明
基地址：`http://localhost:8080`

### 1. 健康/示例
| 方法 | 路径 | 描述 | 响应示例 |
|------|------|------|----------|
| GET  | /api/hello | 测试接口 | `Hello from Spring Boot!` |
| GET  | /api/testdata | 返回全部用户 | `[ { id, username, email, createdAt, ...}, ... ]` |

### 2. 认证相关 (UserController)
| 方法 | 路径 | 请求 JSON | 响应 JSON (示例) |
|------|------|----------|------------------|
| POST | /auth/register | `{ "username":"u", "email":"e@x.com", "password":"p" }` | `{ "success": true, "message": "Register successful" }` |
| POST | /auth/login | `{ "username":"u", "password":"p" }` | `{ "success": true, "message": "Login success", "username": "u" }` |

错误示例：`{"success": false, "message": "Invalid username or password"}`

### 3. 未来计划 (建议)
- /auth/logout  (使 token 失效或前端删除本地存储)
- /auth/profile (获取当前用户信息)
- /users/{id}   (用户资源 REST 化)

---

## 🛡️ 安全与改进计划
当前存在的安全/设计问题：
1. 密码明文存储 → 应使用 BCrypt (`spring-boot-starter-security` 或单独引入 `spring-security-crypto`).
2. 无 token / session → 建议使用 JWT（签发、刷新、黑名单可选）或 Spring Session。
3. 缺少全局异常处理 → 建议新增 `@ControllerAdvice` 统一返回错误码。
4. CORS 仅对特定控制器配置 → 统一通过 `WebMvcConfigurer` 或 Spring Security 配置。
5. 无输入校验 → 使用 `jakarta.validation` (`@Valid`, `@NotBlank`) + DTO 分离实体。
6. 无日志脱敏 & 审计 → 对登录失败/成功做审计记录。
7. 直接返回实体列表 → 使用 DTO 屏蔽敏感字段（如密码）。

推荐下一步实施顺序：
密码加密 → 登录颁发 JWT → 统一异常处理 → DTO + 校验 → 角色权限 → 日志审计。

---

## ⚙️ 配置说明
`backend/src/main/resources/application.properties`
```
spring.datasource.url=jdbc:mysql://localhost:3306/userdb?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=user
spring.datasource.password=pass
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```
生产化需改动：
- 使用环境变量注入数据库账号密码 (`SPRING_DATASOURCE_PASSWORD` 等)
- 关闭 `show-sql`
- `ddl-auto` 改为 `none` 或迁移工具 (Flyway/Liquibase)

---

## �️ 前端说明
主要库：React 19、Ant Design 5、Ant Design Pro Form 组件、Axios、React Router。

请求封装：`src/api/api.ts` 设定 `baseURL=http://localhost:8080`，后续如果引入 JWT，可在请求拦截器统一附加 `Authorization: Bearer <token>`。

页面：
- `App.tsx` 登录 & 注册复用页（通过内部 accessType 切换）
- `Home.tsx` 登录成功后的结果展示页面

路由：当前使用 `react-router` 7.x；建议后续抽离成独立的 `Router` 配置文件并增加受保护路由。

---

## 🧪 测试建议 (尚未实现)
后端：
- UserService 单元测试：注册重复用户名/邮箱、登录成功/失败
- Controller 层使用 `@SpringBootTest` + `MockMvc`

前端：
- 使用 Vitest + React Testing Library 测组件渲染与表单交互

---

## 📦 构建与发布 (未来计划)
- 后端：`mvn clean package` 生成可执行 jar
- 前端：`npm run build` 输出 `dist/`，可由 Nginx 或 Spring Boot 静态资源托管
- Docker：可选制作多阶段构建 (Node 打包前端 + OpenJDK 运行后端)

---

## 🗺️ Roadmap / TODO
- [x] 基础前端登录/注册界面
- [x] 后端基础用户 CRUD 逻辑 (部分)
- [x] 数据库容器化
- [x] 前后端接口对接完善 (状态提示、错误展示)
- [ ] 密码加密 (BCrypt)
- [ ] JWT 登录 / 刷新 / 退出
- [ ] 统一异常与返回结构 (Result Wrapper)
- [ ] DTO + 参数校验
- [ ] 简单权限 (ROLE_USER / ADMIN)
- [ ] 前端受保护路由 & 鉴权态管理
- [ ] 单元 / 集成测试
- [ ] 日志与安全审计

---

## 🤝 贡献
欢迎提交 Issue / PR，或基于该示例继续扩展。

## 📄 License
MIT

---

如果你希望我继续：添加 JWT 示例、编写初始测试、或生成 Dockerfile，请在 Issue / 对话中提出 👍

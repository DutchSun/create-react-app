## 观云台项目模板

#### 可执行命令
```bash
# 安装依赖
$ npm install/yarn install

# 启动服务
$ npm run start/yarn start

# 单元测试
$ npm run test/yarn test

# 构建
$ npm run build/yarn build
```

#### Commit规范
```bash
# ======== Git提交message规范 ========
# 主要type
# feat:     增加新功能
# fix:      修复bug
# feat, fix 都需要在 commit content之后关联issue编号
# 例如: fix: 修复总览排版问题#1

# 特殊type
# docs:     只改动了文档相关的内容
# style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
# build:    构造工具的或者外部依赖的改动，例如webpack，npm
# refactor: 代码重构时使用
```
#### config-overrides【覆写webpack】
- addWebpackExternals: 打包构建时忽略的依赖
- addWebpackAlias    : 别名配置
- addLessLoader      : less-loader配置，用于对antd的主题定制

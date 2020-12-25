# Intro

> 帮助前端团队迅速投入新的项目开发，辅助开发过程

## Install

```bash
$ npm install -g igrow-cli
// 或
$ yarn add -g igrow-cli
```

## Features

-   [x] 初始化 vue 脚手架
-   [x] 中文翻译英文
-   [x] git 日志工具

## Usage

### 初始化脚手架

```bash
Usage: igrow <command> [options] <app-name> [folder-name]

Options:
  -v, --version  output the version number
  -c, --clone    use git clone
  -h, --help     output usage information

Commands:
  setup          run remote setup commands
  create         generate a new project from a react template
  check          check test

Examples:

  # create a new vue project
  $ igrow create demo
```

#### 目录结构

```
├── README.md                   // help
├── .vscode                     // 编辑器配置
├── plop-templates              // 路由和组件模板
├── public                      // 静态资源
├── src                         // 开发
│   ├── api                     // api请求
│   ├── assets                  // 静态资源
│   ├── components
│   │   ├── BaseXxx.vue         // 非业务通用组件
│   │   │── TheXxx.vue          // 单例组件
│   │   │── ExXxx.vue           // 扩展/包装第三方开源组件或内部公共库组件
│   │   │── XxxXxx.vue
│   │   │── ComponentExamples   // 非单例公共组件需要在这里写示例
│   │   │── SvgIcon             // svg-sprite 图标组件
│   │   │── directives          // 可复用的自定义指令（局部注册）
│   │   │── mixins              // 可复用的混入（局部注册）
│   ├── entry                   // 多文件入口
│   ├── injects                 // vue 全局注册 (慎用)
│   ├── libs                    // 无法使用 import 引用的类库 (只能通过全局变量引用)
│   ├── router                  // 路由
│   ├── scripts                 // 函数以及类库
│   │   ├── utils               // 通用方法
│   │   ├── constants           // 常量 (多使用 Object.freeze)
│   │   ├── http                // axios 实例
│   │   │   ├── index.js
│   │   │   ├── exShowLoading.js
│   │   │   ├── exShowErrMessage.js
│   ├── store                   // 状态管理
│   ├── styles                  // 样式管理
│   │   ├── global.less
│   │   ├── reset.less
│   │   ├── vars.less           // less 全局变量
│   ├── views                   // 单页面
│   │   ├── Xxx.vue
│   │   ├── Xxx                 // 专属模块要内聚在同一目录下
│   │   │   ├── index.vue
│   │   │   ├── router.js
│   │   │   ├── components
│   │   │   ├── assets
│   └── test.json               // 测试环境
├── tests                       // 自动化测试
├── docs                        // 文档
├── .env.development            // 开发配置
├── .env.development.local      // 本地开发配置（不提交git,需手动新建）
├── .env.production             // 生产配置
├── .env.production-stage       // 测试配置
├── .env.production-stage       // 测试配置
├── babel.config.js             // babel配置
├── plopfile.js                 // 模板配置
├── node_modules
├── package.json
├── static-server.js            // 静态资源服务 (node 运行)，通常用于预览/检查打包结果
├── vue.config.js
└── sw.config.js
```

### 翻译

```bash
$ fanyi

  Usage: fanyi <words>

  Options:

    -V, --version    output the version number
    -h, --help       output usage information

  Commands:

    *                Query words
    query|q <words>  Query words
    ls               List all the source
    use <source>     Change source to source
```

### 自动生成 swagger-api 接口函数

1.  下载完成后，我们需要在项目的根目录建立一个配置文件，默认名称叫 **sw.config.js** 的配置文件,执行命令 `sw-api` 能够自动执行该文件, 当然你也可以自由命名 `sw-api --config xxx`。

2.  配置文件编写

````js
// 定义模板
let tpl = ` export const {{apiname}} = (params = {}, config = {}) => {
    params = {
        ...params
    }
    return http.request({
        method: '{{method}}',
        url: '{{url}}',
        body: params,
        ...config
    })
}
  `;

3、执行 `sw-api`


module.exports = {
// entry 是 swagger 的一个叫 api-doc 的接口，可以从浏览器的网络面板中查看
//entry: 'http://192.168.1.17:8081/v2/api-docs?group=pc',
entry: "http://192.168.1.17:8088/v2/api-docs?group=grid",
template: tpl, // 渲染的模板
header: `import http from '@/scripts/http'`, // 该文件需要引入的模块
typescript: false, // 是否支持 ts
output: {
path: "./src/sw-api",
},
};

```

### 生成 Git 日志

自动生成`git commit`记录用以统计个人项目周报，全组项目周报，版本、分支差异记录自动生成 Tag 等

功能

-   生成(本人:默认/其他人/团队)(任意时间段/上周:默认)(任意项目/当前项目:默认)日志
-   控制是否覆盖已有文件
-   控制是否显示生成时间
-   指定分支比对、版本比对、CHANGELOG、publish 模式
-   比对模式可(指定/读取 package.json：默认)版本生成对应文件名
-   分支比对模式可指定比对分支(当前:默认)
-   版本比对模式可指定比对版本(源版本/HEAD:默认、目标版本/最新版本:默认)
-   CHANGELOG 模式可检索全部标签并生成每个标签 log
-   publish 模式可基于当前分支代码生成版本 log，并与上个 commit 合并，切到指定分支进行合并，生成并推送标签和代码至远程

配置项

-   `-m`： 生成模式 默认：无(周报)，可选：branch(分支比对)、tag(标签比对)、changelog(汇总日志)、publish(发布模式)、copy(将标签对比结果仅输出至剪切板该特性暂仅支持 macOS)、release-note(输出版本描述)
-   `-a`： 贡献者；默认：git 配置 name；可传 ''(所有贡献者)、任意成员 name
-   `-s`： 起始日期 默认：上周一，格式：2018-01-01
-   `-u`： 终止日期 默认：当天，格式：2018-01-01
-   `-S`： 源分支/标签 默认：无，比对模式：当前分支/最近标签 例：develop
-   `-T`： 目标分支/标签 默认：无，比对模式：当前分支/当前 HEAD 例：master
-   `-r`： Git 仓库本地路径 默认：当前目录
-   `-v`： 版本号 默认：无，比对模式：仓库路径下 package.json 中 VERSION 字段值
-   `-d`： log 输出目录 默认：仓库路径下 log 文件夹
-   `-f`： 覆盖文件 默认：否，不需要传值
-   `-t`： log 首行为生成日期 默认：否，不需要传值

使用

```

# 周报

git-log

# 标签比对 此时需保证当前分支有未打 tag 的 commit 即可，即在开发分支即将合入 master 时使用最佳

git-log -t -m tag

# 项目 CHANGELOG

git-log -m changelog -f

```

### 全局运行命令调试

```

npm install . -g
或
npm link

修改命令路径需要先取消
npm unlink

```

### 部署

```

npm run release

```

## 参考资料

-   commander 一款重量轻，表现力和强大的命令行框架
-   chalk 用于打印彩色的信息
-   boxen 创建小“面板”
-   inquirer 交互式命令行用户界面的集合
-   ora 用于创建 spinner，添加下载模板 loading 效果
-   update-notifier 用于检查包的线上版本与本地版本
-   download-git-repo 从节点下载并提取 git 存储库

## LICENSE

MIT @ Ma Jinhui
```
````

# Intro

> 帮助前端团队迅速投入新的项目开发

## Install

```bash
$ npm install -g igrow-cli
```

## Features

-   [x] git 日志工具
-   [x] translates words, phrases between English and Chinese
-   [x] 快速下载 vue、react 脚手架

## Usage

### 翻译

```bash
$ translator

  Usage: translator [options] [command]

  Options:

    -V, --version    output the version number
    -h, --help       output usage information

  Commands:

    *                Query words
    query|q <words>  Query words
    ls               List all the source
    use <source>     Change source to source
```

Of course, you can also use fanyi or fy like:

```bash
$ fanyi
# ···
# or
$ fy
# ...
```

### 下载模板

### 生成日志

## 开发&部署

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

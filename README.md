# 简介

前端团队内部开发统一脚手架工具

## 功能

-   [x] git 日志工具

## 使用

```bash
# 安装包
$ npm install igrow-cli -g
```

## 开发

### 包

-   commander 一款重量轻，表现力和强大的命令行框架
-   chalk 用于打印彩色的信息
-   boxen 创建小“面板”
-   inquirer 交互式命令行用户界面的集合
-   ora 用于创建 spinner，添加下载模板 loading 效果
-   update-notifier 用于检查包的线上版本与本地版本
-   download-git-repo 从节点下载并提取 git 存储库

### 全局运行命令调试

```
npm install . -g
或
npm link

修改命令路径需要先取消
npm unlink
```

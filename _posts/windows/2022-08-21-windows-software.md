---
layout: post
title:  Windows常用软件
categories: windows
tag: software
---


* content
{:toc}


# 开发

## 环境
> + <a href="https://www.oracle.com/java/technologies/downloads/#java8" target="_blank">jdk8</a>
> + <a href="https://maven.apache.org/download.cgi" target="_blank">maven</a>
> + <a href="https://nodejs.org/en/download/" target="_blank">nodejs</a>
> + <a href="https://git-scm.com/downloads" target="_blank">git</a>
> + <a href="http://www.kpdus.com/jad.html#download" target="_blank">jad(反编译)</a>
>   + 常用命令: jad -r -sjava -dtempDir compileDir\\**\\\*.class

## 开发工具
> + <a href="https://www.jetbrains.com.cn/idea/" target="_blank">idea</a>
> + <a href="https://www.jetbrains.com.cn/go/" target="_blank">goland</a>
> + <a href="https://www.jetbrains.com.cn/pycharm/" target="_blank">pycharm</a>
> + <a href="https://www.jetbrains.com.cn/fleet/" target="_blank">fleet</a>
> + <a href="https://code.visualstudio.com/" target="_blank">vscode</a>

## 数据库
> + <a href="https://dev.mysql.com/downloads/mysql/" target="_blank">mysql</a>
> + <a href="https://github.com/microsoftarchive/redis/releases" target="_blank">redis</a>
> + <a href="https://www.mongodb.com/try/download/community" target="_blank">mongodb</a>

## 客户端工具
> ### mysql
> + <a href="http://www.navicat.com.cn/download/navicat-premium" target="_blank">navicat</a>
> 
> ### redis
> + <a href="https://redis.com/redis-enterprise/redis-insight/" target="_blank">RedisInsight</a>
> + <a href="javascript:;">Redis Desktop Manager</a>
>
> ### mongodb
> + <a href="https://www.mongodb.com/try/download/compass" target="_blank">compass</a>
> 
> ### ssh
> + <a href="javascript:;">xshell</a>
> 
> ### ftp
> + <a href="javascript:;">xftp</a>
> 
> ### jvm
> + <a href="javascript:;">JProfiler</a>

## 虚拟机
> + <a href="javascript:;">VMware Workstation</a>

## 测试
> + <a href="https://www.postman.com/downloads/?utm_source=postman-home" target="_blank">postman</a>
> + <a href="https://jmeter.apache.org/download_jmeter.cgi" target="_blank">jmeter</a>

## 服务器
> + <a href="http://nginx.org/en/download.html" target="_blank">nginx</a>
> + <a href="https://tomcat.apache.org/download-10.cgi" target="_blank">tomcat</a>


# 编辑器

## 富文本
> + <a href="https://typora.io/#download" target="_blank">typora</a>


# 截图

> + <a href="https://zh.snipaste.com/" target="_blank">snipaste</a>


# 解压缩

> + <a href="http://www.bandisoft.com/" target="_blank">Bandizip</a>


# 远程桌面

> + <a href="https://sunlogin.oray.com/download?categ=personal" target="_blank">向日葵</a>

# uTools

> + <a href="https://www.u.tools/" target="_blank">uTools</a>

# 软件管理工具

## chocolatey

- 官网：<a href="https://chocolatey.org/install#individual" target="_blank">chocolatey</a>

### 安装脚本

以管理员身份打开dos窗口
```sh
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

### 常用命令

- choco search xxx，查找 xxx 安装包
- choco info xxx，查看 xxx 安装包信息
- choco install xxx，安装 xxx 软件
- choco upgrade xxx，升级 xxx 软件
- choco uninstall xxx， 卸载 xxx 软件

参考原文
-

+ <a href="https://tobebetterjavaer.com/gongju/choco.html" target="_blank">https://tobebetterjavaer.com/gongju/choco.html</a>

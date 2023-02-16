---
layout: post
title:  Windows无限执行一段命令
categories: windows
tag: cmd
---


* content
{:toc}


## 脚本内容 `loop.cmd`

```sh
@echo off
:S
@echo start
@tree /F
@echo end
@cls
goto S
```

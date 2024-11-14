---
layout: post
title:  Git撤销push的版本
categories: vcs
tag: git
---


* content
{:toc}



### 查看提交日志查看提交日志

```sh
git log
```

### 回退到指定的版本

```sh
git reset --hard 版本号
git branch
```


### 将当前版本push上去

**注意：这次操作会删除上一次提交记录，而不是重新提交一次，所以如果需要保存文件就先备份下，最好基于当前分支再拉出一个本地分支作为备份分支**

```sh
git push origin 分支名 --force
```

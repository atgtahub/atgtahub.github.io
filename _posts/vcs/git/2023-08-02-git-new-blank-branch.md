---
layout: post
title:  Git新建空白分支
categories: vcs
tag: git
---


* content
{:toc}

## 创建分支

### 使用 git checkout的--orphan参数
```sh
git checkout --orphan new_branch
```

## 删除所有内容

```sh
git rm -rf .
```


## 提交分支

```sh
git commit -am "new branch for documentation"
```


## 检查分支是否创建成功

```sh
git branch -a
```


## push到远端代码仓，新的空白分支就创建成功了

```sh
git push origin new_branch
```

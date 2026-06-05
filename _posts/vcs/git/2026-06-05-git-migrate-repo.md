---
layout: post
title: Git 仓库迁移到新远程
categories: vcs
tag: git
---

* content
{:toc}

# Git 仓库迁移到新远程

## 场景

需要将整个 Git 仓库（包括所有分支）从一个远程地址迁移到另一个远程地址。

## 步骤

### 1. 获取原仓库所有远程分支

```bash
git fetch origin
```

### 2. 在本地创建所有远程分支

```bash
for branch in $(git branch -r --format='%(refname:short)' | grep '^origin/' | grep -v '^origin/HEAD$' | cut -d'/' -f2-); do
  git checkout -b $branch origin/$branch 2>/dev/null || echo "skip: $branch"
done
```

> 说明：遍历所有远程分支，在本地逐一创建同名分支并关联到远程分支。已存在的分支会跳过。

### 3. 切换 origin 到新仓库地址

```bash
git remote set-url origin git_url
```

> 说明：修改本地仓库关联的远程地址，无需重新 clone。

### 4. 推送所有本地分支到新仓库

```bash
for branch in $(git branch --format='%(refname:short)'); do
  git push origin $branch 2>/dev/null || echo "failed: $branch"
done
```

> 说明：遍历所有本地分支，逐一推送到新的远程仓库。推送失败的分支会打印出来。

## 注意事项

- 推送前确保新仓库已创建且有写入权限
- 如果有 tag 需要迁移，额外执行 `git push origin --tags`
- 如果新仓库是空的，直接推送即可；如果已有内容，可能需要先处理冲突

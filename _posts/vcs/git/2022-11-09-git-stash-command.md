---
layout: post
title:  Git stash
categories: vcs
tag: git
---


* content
{:toc}


## git stash

将所有未提交的修改（工作区和暂存区）保存至堆栈中
```sh
git stash
```

### git stash save

作用等同于git stash，区别是可以加一些注释
```sh
git stash save "comment"
```

## git stash list

查看当前stash中的内容
```sh
git stash list
```

## git stash pop

将当前stash中的内容弹出，并应用到当前分支对应的工作目录上
```sh
git stash pop
```

### git stash pop {index}

将当前stash中的内容恢复，并且指定要恢复的内容下标
```sh
git stash pop 0
```

## git stash clear

清空暂存列表
```sh
git stash clear
```

## git stash drop {index}

删除暂存，指定要删除的内容下标
```sh
git stash drop 0
```

```sh
git stash drop stash@{0}
```

## git stash apply {index}

将缓存堆栈中的stash应用到工作目录中，不删除stash
```sh
git stash apply 0
```

```sh
git stash apply stash@{0}
```

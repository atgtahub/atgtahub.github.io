---
layout: post
title:  Maven项目初始化到git
categories: java
tag: maven
---


* content
{:toc}

## 创建本地项目

![创建本地项目]({{ '/assets/posts/java/build/maven/2023-01-05-maven-project-initialization-to-git/Snipaste_2023-01-05_16-45-57.png' | prepend: site.baseurl  }})

![创建完成]({{ '/assets/posts/java/build/maven/2023-01-05-maven-project-initialization-to-git/Snipaste_2023-01-05_16-52-13.png' | prepend: site.baseurl  }})

## 新建远程仓库

gitee为例：<a href="https://gitee.com" target="_blank">https://gitee.com</a>

![新建远程仓库]({{ '/assets/posts/java/build/maven/2023-01-05-maven-project-initialization-to-git/Snipaste_2023-01-05_16-56-24.png' | prepend: site.baseurl  }})

![创建完成]({{ '/assets/posts/java/build/maven/2023-01-05-maven-project-initialization-to-git/Snipaste_2023-01-05_16-57-41.png' | prepend: site.baseurl  }})

### 复制git地址

![复制git地址]({{ '/assets/posts/java/build/maven/2023-01-05-maven-project-initialization-to-git/Snipaste_2023-01-05_16-59-14.png' | prepend: site.baseurl  }})

## 执行初始化命令

- 项目根路径打开GIT BASH，执行`git init`

![执行命令]({{ '/assets/posts/java/build/maven/2023-01-05-maven-project-initialization-to-git/Snipaste_2023-01-05_17-01-45.png' | prepend: site.baseurl  }})

## 配置远程地址

- \<git path\>替换为git地址
```sh
git remote add origin <git path>
```

## 拉取远程分支与本地分支合并

```sh
git pull origin master:master
```

![远程分支合并]({{ '/assets/posts/java/build/maven/2023-01-05-maven-project-initialization-to-git/Snipaste_2023-01-05_17-06-53.png' | prepend: site.baseurl  }})


## 推送到远程分支

### 执行git add添加文件到本地暂存

```sh
git add .
```

### 配置用户名和邮箱

- --global：全局
```sh
git config --global user.name nobody
git config --global user.email nobody
```

### 提交到本地仓库

```sh
git commit -m "init project"
```

![提交本次修改]({{ '/assets/posts/java/build/maven/2023-01-05-maven-project-initialization-to-git/Snipaste_2023-01-05_17-13-28.png' | prepend: site.baseurl  }})


### 推送远程仓库

```sh
git push -u origin master
```

![推送远程仓库]({{ '/assets/posts/java/build/maven/2023-01-05-maven-project-initialization-to-git/Snipaste_2023-01-05_17-15-51.png' | prepend: site.baseurl  }})


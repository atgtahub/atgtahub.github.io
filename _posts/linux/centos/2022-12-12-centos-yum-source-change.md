---
layout: post
title:  centos更换yum源
categories: linux
tag: centos
---


* content
{:toc}


## 安装wget命令

```sh
yum -y install wget
```

## 备份yum源

### 切换目录

```sh
cd /etc/yum.repos.d
```

### 重命名

```sh
mv CentOS-Base.repo CentOS-Base.repo.bak
```

## 阿里云yum源配置文件

```sh
wget -O Centos-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```

## yum源生成缓存

```sh
yum makecache
```

## 更新yum源

```sh
yum -y install update
```
---
layout: post
title:  Helm
categories: linux
tag: k8s
---


* content
{:toc}


## Helm简介

Helm 是 Kubernetes 的包管理器

- 官方文档：<a href="https://helm.sh/zh/docs/intro/quickstart/" target="_blank">https://helm.sh/zh/docs/intro/quickstart/</a>

- 版本对照：<a href="https://helm.sh/zh/docs/topics/version_skew/" target="_blank">https://helm.sh/zh/docs/topics/version_skew/</a>



## 安装Helm

安装文档：<a href="https://helm.sh/zh/docs/intro/install/" target="_blank">https://helm.sh/zh/docs/intro/install/</a>

```sh
# 下载对应系统架构的安装包
wget https://get.helm.sh/helm-v3.8.2-linux-arm64.tar.gz

# 解压
tar -zxvf helm-v3.8.2-linux-arm64.tar.gz

# 移动位置
mv linux-arm64/helm /usr/local/bin/helm

# 查看命令
helm help
```

## 常用命令

```sh
# 添加仓库
helm repo add bitnami https://charts.bitnami.com/bitnami

# 搜索chart包
helm search repo bitnami mysql

# 查看chart
helm show chart bitnami/mysql

# 查看默认值
helm show values bitnami/mysql

# 拉取chart包
helm pull bitnami/mysql

# 解压
tar zxvf mysql-9.10.4.tgz
 
# 安装mysql，设置root密码和卷大小
helm install mysql-release \
--set-string auth.rootPassword="123456" \
--set primary.persistence.size=2Gi \
bitnami/mysql
# 或通过修改values.yaml文件方式启动
# release名称
# chart来源
# 指定values.yaml
# 指定命名空间
helm install mysql-release bitnami/mysql -f values.yaml -n test-mysql --create-namespace

# 更新配置
helm upgrade --install mysql-release bitnami/mysql --values values.yaml -n test-mysql

# 查看命名空间下所有资源
kubectl -n test-mysql get all

#查看设置
helm get values my-mysql

#删除mysql
helm delete my-release

# 删除mysql
helm uninstall -n test-mysql
```

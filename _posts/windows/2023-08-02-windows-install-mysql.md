---
layout: post
title:  Windows初始化mysql命令
categories: windows
tag: mysql
---


* content
{:toc}


## 初始化密码

```sh
mysqld --initialize --console
```


## 安装服务

```sh
mysqld --install mysql
```


## 启动服务

```sh
net start mysql
```


## 登录

```sh
mysql -uroot -p
```


# 修改密码

```sh
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
```

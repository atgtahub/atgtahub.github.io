---
layout: post
title:  Mysql SSH隧道连接
categories: mac
tag: mysql
---


* content
{:toc}


# 建立隧道


本地电脑单独开一个终端，修改以下命令对应的ip和端口并执行

```sh
ssh -L 3307:127.0.0.1:3306 root@172.134.1.30 -N
```

- -L 3307:127.0.0.1:3306: 表示在本机开放3307端口到mysql服务器的127.0.0.1:3306端口的映射,其中127.0.0.1也可以是mysql所在服务器的内网ip或外网ip
- -N: 不执行远程命令。该参数在只打开转发端口时很有用（V2版本SSH支持）
- root@172.134.1.30: 是登陆mysql服务器的SSH用户名和IP地址，密码为远程服务器连接密码
- 可选参数
  - C: 使用压缩功能，是可选的，加快速度。
  - P: 用一个非特权端口进行出去的连接。
  - f: SSH完成认证并建立port forwarding后转入后台运行。
  - 完整命令: ssh -L 3307:127.0.0.1:3306 root@172.134.1.30 -NCPf

# Navicat连接

![图示]({{ '/assets/posts/mac/mysql/2024-10-23-mac-mysql-ssh-connection/Snipaste_2024-10-23_13-29-30.png' | prepend: site.baseurl  }})

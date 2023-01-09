---
layout: post
title:  CentOS VMware虚拟机配置静态ip
categories: linux
tag: centos
---


* content
{:toc}


## 查看网络驱动器名称

```sh
ip addr
```

```text
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 00:0c:29:4e:b6:f8 brd ff:ff:ff:ff:ff:ff
    inet 192.168.40.200/24 brd 192.168.40.255 scope global noprefixroute ens33
       valid_lft forever preferred_lft forever
    inet6 fe80::8086:ce95:5330:83b9/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
```

## 对应的配置文件

```sh
cat /etc/sysconfig/network-scripts/ifcfg-ens33
```

## 查看虚拟机ip范围、子网掩码和网关

### 打开虚拟网络编辑器

![打开虚拟网络编辑器]({{ '/assets/posts/linux/centos/2022-12-12-centos-static-ip/Snipaste_2022-12-12_15-06-33.png' | prepend: site.baseurl  }})

### 查看IP范围

IP地址范围128开始，所以配置虚拟机的IP时最后一位要≥128且≤254
![打开DHCP设置]({{ '/assets/posts/linux/centos/2022-12-12-centos-static-ip/sp20221212_144245_042.png' | prepend: site.baseurl  }})

### 查看子网掩码和网关

![打开NAT设置]({{ '/assets/posts/linux/centos/2022-12-12-centos-static-ip/Snipaste_2022-12-12_15-36-50.png' | prepend: site.baseurl  }})

## 配置静态IP

### 编辑配置

```sh
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```

```text
YPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
# dhcp改为static
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
UUID=f486fb25-ee9b-4189-832f-0d95c2b92f7b
DEVICE=ens33
# 开机自启
ONBOOT=yes

# ip地址，IP范围内
IPADDR=192.168.40.200
# 子网掩码
NETMASK=255.255.255.0
# 网关IP
GATEWAY=192.168.40.2
# DNS
DNS1=114.114.114.114
DNS2=8.8.8.8
```

### 重启网络

```sh
systemctl restart network
```

### 查看IP

```sh
ip addr
```

参考原文
-

- <a href="https://zhangjc.blog.csdn.net/article/details/123015680" target="_blank">https://zhangjc.blog.csdn.net/article/details/123015680</a>
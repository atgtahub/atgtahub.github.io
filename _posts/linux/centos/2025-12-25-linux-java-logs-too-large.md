---
layout: post
title:  Linux Java日志过大
categories: linux
tag: centos
---


* content
{:toc}



### 按日志级别分组统计排序

```sh
grep -oE "INFO|WARN|ERROR|DEBUG" xxx.log | sort | uniq -c | sort -nr
```

### 检查某个日志级别下某列重复数量

```sh
grep "DEBUG" xxx.log | awk '{print $5}' | sort | uniq -c | sort -nr | head -n 10
```

### 指定筛选内容

```sh
echo "2025-12-25 00:00:00.0[INFO][service0][][io-exec-1]  c.a.Test 32" | awk -F']' '{print $4}' | awk '{print $1}'
```

- awk -F: 按指定分隔符切割
- awk '{print $1}': 按空格切割
- sort: 对提取出的名称进行排序，为后面的去重做准备。
- uniq -c: 核心统计：去除重复行，并在每行前面显示该行出现的次数（count）。
- sort -nr: 二次排序：按数字（n）进行逆序（r）排序。即把出现次数最多的放在最上面。
- head -n 10: 截取前 10 行

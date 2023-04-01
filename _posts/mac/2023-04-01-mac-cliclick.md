---
layout: post
title:  Mac模拟鼠标点击
categories: mac
tag: cliclick
---


* content
{:toc}


## 安装cliclick

- github：<a href="https://github.com/BlueM/cliclick" target="_blank">https://github.com/BlueM/cliclick</a>
- brew：<a href="https://formulae.brew.sh/formula/cliclick" target="_blank">https://formulae.brew.sh/formula/cliclick</a>

## 使用cliclick

打开终端(terminal)

### 获取鼠标当前在屏幕中的坐标

```sh
cliclick p
```

### 循环脚本

1. 终端中输入循环语句
```sh
for i in {1..100};
```

2. 回车后继续输入
```sh
do cliclick c:100,100
```

3. 最后输入done
```sh
done
```

### 参数说明
<a href="https://github.com/BlueM/cliclick#readme" target="_blank">具体参考文档</a>
- `c:`：执行左键单击
- `rc:`：执行右键单击
- `100,100`：鼠标箭头坐标

参考原文
-

- <a href="https://zhuanlan.zhihu.com/p/562173654" target="_blank">https://zhuanlan.zhihu.com/p/562173654</a>


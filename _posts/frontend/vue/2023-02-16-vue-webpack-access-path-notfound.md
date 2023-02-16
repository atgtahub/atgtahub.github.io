---
layout: post
title:  Vue打包发布在Nginx中，从浏览器访问URL，出现404错误
categories: vue
tag: webpack
---

* content
{:toc}


## 问题 

VUE使用history模式，当浏览器输入/product/2的时候，出现404错误


## 问题原因

当访问/product的时候，Nginx第一个事情是先去找寻product.html，所以才会出现错误。


## 修改方法，使用nginx的try_files方法

`/etc/nginx/conf.d/www_xxx_com_cn.conf`

```text
root /home/frontend/dist;
location / {
    index index.html;

    try_files $uri $uri/ /index.html;  
}
```

## 解释

发起一个内部 “子请求”，也就是相当于 nginx 发起一个 HTTP 请求到 /index/proudct。


参考原文
-

- <a href="https://zhuanlan.zhihu.com/p/359678380" target="_blank">https://zhuanlan.zhihu.com/p/359678380</a>

---
layout: post
title:  linux配置java环境
categories: linux
tag: environment
---


* content
{:toc}


## 下载jdk

- 官网链接：<a href="https://www.oracle.com/java/technologies/downloads/#java8" target="_blank">https://www.oracle.com/java/technologies/downloads/#java8</a>
- oss：<a href="https://gtahub.oss-cn-beijing.aliyuncs.com/resource/jdk-8u221-linux-x64.tar.gz" target="_blank">https://gtahub.oss-cn-beijing.aliyuncs.com/resource/jdk-8u221-linux-x64.tar.gz</a>

## 安装

### 使用ftp工具上传到服务器

![上传文件]({{ '/styles/images/install/environment/Snipaste_2022-12-15_09-58-46.png' | prepend: site.baseurl  }})

### 移动到/opt或/usr/local目录下

```sh
mv /tmp/jdk-8u221-linux-x64.tar.gz /opt/
mv /tmp/jdk-8u221-linux-x64.tar.gz /usr/local/
```


### 解压jdk

```sh
tar -zxvf jdk-8u221-linux-x64.tar.gz
```

- z: gzip属性
- x: 解压
- v: 显示所有过程
- f: 使用档案名(压缩文件内的目录名)


## 配置

```sh
vi /etc/profile
```

### 末尾追加内容，将JAVA_HOME路径替换为服务器jdk解压路径

```text
# JAVA_HOME
export JAVA_HOME=/usr/local/jdk1.8.0_221
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
```

### 生效配置

```sh
source /etc/profile
```

### 查看版本

```sh
java -version
```

```text
java version "1.8.0_221"
Java(TM) SE Runtime Environment (build 1.8.0_221-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.221-b11, mixed mode)
```
---
layout: post
title:  常用命令
categories: server
tag: centos
---


* content
{:toc}


## 查看端口

### 查看端口占用情况

```sh
netstat -anp | grep 8080
```

```sh
netstat -tln | grep 8080
```

### 查看全部端口占用情况

```sh
netstat -anp
```

```sh
netstat -tln
```

### 查看具体端口被哪个程序占用

```sh
lsof -i :8080
```


## 查看进程

```sh
ps -ef | grep java
```

```sh
ps aux | grep java
```

### ps -ef aux区别
- -ef是System V展示风格，而aux是BSD风格。 
- COMMADN列如果过长，aux会截断显示，而ef不会
 
### BSD风格
字段含义： 
- USER：用户名称 
- PID：进程号 
- %CPU：进程占用CPU的百分比 
- %MEM：进程占用物理内存的百分比 
- VSZ：进程占用的虚拟内存大小（单位：KB） 
- RSS：进程占用的物理内存大小（单位：KB） 
- TT：终端名称（缩写），若为？，则代表此进程与终端无关，因为它们是由系统启动的 
 
#### STAT 进程状态（有以下几种）

- D 无法中断的休眠状态（通常 IO 的进程）；
- R 正在运行可中在队列中可过行的；
- S 处于休眠状态；
- T 停止或被追踪；
- W 进入内存交换（从内核2.6开始无效）；
- X 死掉的进程（从来没见过）；
- Z 僵尸进程；

<hr>

- < 优先级高的进程
- N 优先级较低的进程
- L 有些页被锁进内存；
- s 进程的领导者（在它之下有子进程）；
- l 多进程的（使用 CLONE_THREAD, 类似 NPTL pthreads）；
- \+ 位于后台的进程组；

<hr>
 
- STARTED：进程的启动时间 
- TIME：CPU时间，即进程使用CPU的总时间 
- COMMAND：启动进程所用的命令和参数，如果过长会被截断显示 

### System V风格
- 字段含义： 
- UID：用户ID 
- PID：进程ID 
- PPID：父进程ID 
- C：CPU用于计算执行优先级的因子。数值越大，表明进程是CPU密集型运算，执行优先级会降低；数值越小，表明进程是I/O密集型运算，执行优先级会提高 
- STIME：进程启动的时间 
- TTY：完整的终端名称 
- TIME：CPU时间 
- CMD：完整的启动进程所用的命令和参数


### 综上：
- 如果想查看进程的CPU占用率和内存占用率，可以使用aux 
- 如果想查看进程的父进程ID和完整的COMMAND命令，可以使用ef

参考原文
-

- <a href="http://t.zoukankan.com/fanren224-p-8457288.html" target="_blank">http://t.zoukankan.com/fanren224-p-8457288.html</a>


## 查看文件

### cat

```sh
cat xx.txt
```

### less

```sh
less xx.txt
```

#### 退出

小写：q


## 编辑文件

### vi

```sh
vi xx.txt
```

#### 插入模式

小写：i

#### 退出

键：esc
冒号：“：”
小写：q


## 文件内容操作

### 跳转文件末尾

大写：G

### 跳转到文件首行

小写：g

### 查找内容

/xx

#### 下一个

小写：n

#### 上一个

大写：N

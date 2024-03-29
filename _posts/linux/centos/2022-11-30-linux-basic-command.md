---
layout: post
title:  Linux常用命令
categories: linux
tag: centos
---


* content
{:toc}


## 查看进程端口号

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

## 切换目录命令：cd

描述：用于切换当前目录，可以是绝对路径，也可以是相对路径

- cd /home   进入 '/ home' 目录
- cd ..       返回上一级目录
- cd ../..     返回上两级目录
- cd        进入个人的主目录
- cd ~user1  进入个人的主目录
- cd -       返回上次所在的目录

## pwd命令

描述：显示工作路径

## 查看文件和目录命令：ls

- ls 查看目录中的文件
- ls -l 显示文件和目录的详细资料
- ls -a 列出全部文件，包含隐藏文件
- ls -R 连同子目录的内容一起列出（递归列出），等于该目录下的所有文件都会显示出来
- ls [0-9] 显示包含数字的文件名和目录名

## 复制命令：cp

描述：复制文件，copy，可以把多个文件一次性地复制到一个目录下

- -a ：将文件的特性一起复制
- -p ：连同文件的属性一起复制，而非使用默认方式，与-a相似，常用于备份
- -i ：若目标文件已经存在时，在覆盖时会先询问操作的进行
- -r ：递归持续复制，用于目录的复制行为
- -u ：目标文件与源文件有差异时才会复制

## 移动文件、目录或更名命令：mv

- -f ：force强制的意思，如果目标文件已经存在，不会询问而直接覆盖
- -i ：若目标文件已经存在，就会询问是否覆盖
- -u ：若目标文件已经存在，且比目标文件新，才会更新

## 删除命令：rm

描述：用于删除文件或目录

- -f ：就是force的意思，忽略不存在的文件，不会出现警告消息
- -i ：互动模式，在删除前会询问用户是否操作
- -r ：递归删除，最常用于目录删除

## 文件查找命令：find

- `find / -name file1` 从 '/' 开始进入根文件系统搜索文件和目录
- `find / -user user1` 搜索属于用户 'user1' 的文件和目录
- `find /usr/bin -type f -atime +100` 搜索在过去100天内未被使用过的执行文件
- `find /usr/bin -type f -mtime -10` 搜索在10天内被创建或者修改过的文件
- `whereis halt` 显示一个二进制文件、源码或man的位置
- `which halt` 显示一个二进制文件或可执行文件的完整路径

## 打包和压缩文件

tar：对文件进行打包，默认情况并不会压缩，如果指定了相应的参数，它还会调用相应的压缩程序（如gzip和bzip等）进行压缩和解压

- -c ：新建打包文件
- -t ：查看打包文件的内容含有哪些文件名
- -x ：解打包或解压缩的功能，可以搭配-C（大写）指定解压的目录，注意-c,-t,-x不能同时出现在同一条命令中
- -j ：通过bzip2的支持进行压缩/解压缩
- -z ：通过gzip的支持进行压缩/解压缩
- -v ：在压缩/解压缩过程中，将正在处理的文件名显示出来
- -f filename ：filename为要处理的文件
- -C dir ：指定压缩/解压缩的目录dir

## 系统和关机 (系统的关机、重启以及登出 )

- shutdown -h now 关闭系统(1)
- init 0 关闭系统(2)
- telinit 0 关闭系统(3)
- shutdown -h hours:minutes & 按预定时间关闭系统
- shutdown -c 取消按预定时间关闭系统
- shutdown -r now 重启(1)
- reboot 重启(2)
- logout 注销
- time 测算一个命令（即程序）的执行时间

## 杀进程命令

描述kill：用于向某个工作（%jobnumber）或者是某个PID（数字）传送一个信号，它通常与ps和jobs命令一起使用

- -9：表示强制关闭

参考原文
-

- <a href="https://mp.weixin.qq.com/s/QUhk_ZD7l2C9oNMurYXd1g" target="_blank">部分参考</a>



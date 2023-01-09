---
layout: post
title:  JVM命令
categories: java
tag: jvm
---


* content
{:toc}

## jmap

描述：可以生成Java虚拟机的堆转储快照dump文件的命令行工具

### 查看整个JVM内存状态

```sh
jmap -heap [pid]
```

#### 输出到文件

```sh
jmap -heap [pid] > jmap.log
```

### 查看JVM堆中对象详细占用情况

```sh
jmap -histo [pid]
```

### 导出整个JVM 中内存信息，可以利用其它工具打开dump文件分析，例如jdk自带的visualvm工具

```sh
jmap -dump:format=b,file=heapdump1.hprof [pid]
```

- format=b：是通过二进制的意思
- pid：进程号


## jstack

描述：jstack用于JVM当前时刻的线程快照，又称threaddump文件，它是JVM当前每一条线程正在执行的堆栈信息的集合。生成线程快照的主要目的是为了定位线程出现长时间停顿的原因，如线程死锁、死循环、请求外部时长过长导致线程停顿的原因

```sh
jstack [pid] test.txt
```

- -F：有时候线程挂起的时候要加上-F参数才能把信息dump处理
- -l：查出某个进程中运行的所有线程

### Thread.State

| 状态/动作     | 描述                                                         |
| :------------ | :----------------------------------------------------------- |
| New           | 当线程对象创建时存在的状态，此时线程不可能执行               |
| Runnable      | 当调用thread.start()后，线程变成为Runnable状态, 也就是就绪状态。只要得到CPU，就可以执行 |
| Running       | 线程正在执行                                                 |
| Waiting       | 执行thread.join()或在锁对象调用obj.wait()等情况就会进该状态,表明线程正处于等待某个资源或条件发生来唤醒自己 |
| Timed_Waiting | 执行Thread.sleep(long)、thread.join(long)或obj.wait(long)等就会进该状态，与Waiting的区别在于Timed_Waiting的等待有时间限制 |
| Dead          | 线程执行完毕，或者抛出了未捕获的异常之后，会进入dead状态，表示该线程结束 |
| Deadlock      | 表示有死锁                                                   |



## jstat

### 输出heap各个分区大小

```sh
jstat -gc [pid]
```

### 间隔2s输出一次内存情况100次

```sh
jstat -gc [pid] 2s 100
```

### 各指标描述

> - S0C：年轻代中第一个survivor（幸存区）的容量 （字节 Capacity）
> - S1C：年轻代中第二个survivor（幸存区）的容量 (字节)
> - S0U：年轻代中第一个survivor（幸存区）目前已使用空间 (字节 Used)
> - S1U：年轻代中第二个survivor（幸存区）目前已使用空间 (字节)
> - EC：年轻代中Eden（伊甸园）的容量 (字节)
> - EU：年轻代中Eden（伊甸园）目前已使用空间 (字节)
> - OC：Old代的容量 (字节)
> - OU：Old代目前已使用空间 (字节)
> - MC：metaspace(元空间)的容量 (字节)
> - MU：metaspace(元空间)目前已使用空间 (字节)
> - CCSC：当前压缩类空间的容量 (字节)
> - CCSU：当前压缩类空间目前已使用空间 (字节)
> - YGC：从应用程序启动到采样时年轻代中gc次数
> - YGCT：从应用程序启动到采样时年轻代中gc所用时间(s)
> - FGC：从应用程序启动到采样时old代(全gc)gc次数
> - FGCT：从应用程序启动到采样时old代(全gc)gc所用时间(s)
> - GCT：从应用程序启动到采样时gc用的总时间(s)

## jps

### 查看JAVA进程的PID

```sh
jps -lm
```

```sh
ps -ef | grep java
```


## 总结

- jmap
  - 查看堆内存信息，包括使用的GC算法、堆配置参数和各代中堆内存使用情况，可以结合jhat使用
  - 主要用于分析OOM

- jstack
  - 查看线程的栈信息，即JVM的当前时刻的线程快照。
  - 主要用于定位线程出现长时间停顿的原因，如线程死锁、死循环、请求外部时长过长导致线程停顿的原因。
  - 建议间隔一定时间采集一次，通过3-5次采集，确认是否有线程一直处于running状态，方便定位是否出现第2点的情况

- jstat
  - 主要用于统计堆内存、类相关和GC相关信息
  - 可以时时监控资源和性能


参考原文
-

<a href="https://blog.csdn.net/zpflwy1314/article/details/95382353" target="_blank">JVM内存分析工具jstack,jstat与jmap的使用</a>
<a href="https://www.pudn.com/news/62ea171555398e076b1a2fe0.html" target="_blank">JVM内存分析工具jstack,jstat,jmap的使用</a>


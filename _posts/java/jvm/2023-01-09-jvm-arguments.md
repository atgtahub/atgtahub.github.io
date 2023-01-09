---
layout: post
title:  JVM参数
categories: java
tag: jvm
---


* content
{:toc}

## full script
```sh
java -Xms2g -Xmx2g -Xmn1g -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m -XX:-OmitStackTraceInFastThrow -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/dumppath/java_heapdump.hprof -Xloggc:/logs/gc.log -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=100M -jar test.jar --spring.profiles.active=test --logging.level.org.springframework.r2dbc=INFO > /dev/null 2>&1 &
```

## nacos script

```sh
java -Xms512m -Xmx512m -Xmn256m 
-Dnacos.standalone=true 
-Dnacos.member.list= 
-Djava.ext.dirs=/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/ext:/usr/lib/jvm/java-8-openjdk-amd64/lib/ext 
-Xloggc:/home/ubuntu/nacos/logs/nacos_gc.log 
-verbose:gc 
-XX:+PrintGCDetails 
-XX:+PrintGCDateStamps 
-XX:+PrintGCTimeStamps 
-XX:+UseGCLogFileRotation 
-XX:NumberOfGCLogFiles=10 
-XX:GCLogFileSize=100M 
-Dloader.path=/home/ubuntu/nacos/plugins/health,/home/ubuntu/nacos/plugins/cmdb 
-Dnacos.home=/home/ubuntu/nacos 
-jar /home/ubuntu/nacos/target/nacos-server.jar 
--spring.config.additional-location=file:/home/ubuntu/nacos/conf/ 
--logging.config=/home/ubuntu/nacos/conf/nacos-logback.xml 
--server.max-http-header-size=524288 
nacos.nacos
```

## 堆设置

### -Xms
指定程序的初始堆内存大小

### -Xmx
指定程序的最大堆内存大小

### -Xmn
指定程序的新生代大小

### -Xss
指定每个线程的 Java 虚拟机栈内存大小

### -XX:MetaspaceSize
最小元空间

### -XX:MaxMetaspaceSize
最大元空间

### -XX:+HeapDumpOnOutOfMemoryError
当JVM发生OOM时，自动生成DUMP文件

### -XX:HeapDumpPath=/java/logs/java_heapdump.hprof
表示生成DUMP文件的路径，也可以指定文件名称，例如：−XX:HeapDumpPath={目录}/java_heapdump.hprof。如果不指定文件名，默认为：java_heapDump.hprof

## -XX:-OmitStackTraceInFastThrow

JVM默认是启用：-XX：+OmitStackTraceInFastThrow，如果检测到在代码里某个位置连续多次抛出同一类型异常的话，当打印同样的错误日志到一定次数就会被JVM默认优化掉，-XX:-OmitStackTraceInFastThrow关闭JVM日志优化


## 垃圾回收统计信息

### -XX:+PrintGCDetails
用于打印输出详细的GC收集日志的信息

### -XX:+PrintGCDateStamps
GC的打印基于日期的时间戳

### -XX:+PrintGCTimeStamps
打印CG发生的时间戳

### -XX:+UseGCLogFileRotation
开启gc日志分割

### -XX:NumberOfGCLogFiles=10
最多分割几个文件，超过之后从头开始写

### -XX:GCLogFileSize=100M
GC文件滚动大小，需开启UseGCLogFileRotation，表示个文件上限大小，超过就触发分割

### -Xloggc:/home/ubuntu/nacos/logs/nacos_gc.log
指定gc日志输出位置

### -verbose:gc
同-XX:+PrintGC，开启了简单GC日志模式，为每一次新生代(young generation)的GC和每一次的Full GC打印一行信息

## 1 > /dev/null 2>&1 &

- 1 > /dev/null：首先表示标准输出重定向到空设备文件，也就是不输出任何信息到终端，说白了就是不显示任何信息。
- 2>&1 ：接着，标准错误输出重定向（等同于）标准输出，因为之前标准输出已经重定向到了空设备文件，所以标准错误输出也重定向到空设备文件。
- 末尾&：守护进程启动

## 1 > &null 2>&1 &

- 1 > &null：当前文件夹下输出一个名为null的日志文件
- 同上


参考原文
-

- <a href="https://blog.csdn.net/Augusdi/article/details/108628131" target="_blank">https://blog.csdn.net/Augusdi/article/details/108628131</a>
- <a href="https://www.cnblogs.com/MistyRain-wp/p/16423838.html" target="_blank">https://www.cnblogs.com/MistyRain-wp/p/16423838.html</a>
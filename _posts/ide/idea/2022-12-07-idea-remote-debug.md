---
layout: post
title:  IDEA远程debug
categories: IDE
tag: idea
---


* content
{:toc}


## ~~pom.xml新增配置~~

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <!-- 远程调试配置 -->
                <jvmArguments>-Xdebug -Xrunjdwp:transport=dt_socket,address=5005,server=y,suspend=n</jvmArguments>
                <excludes>
                    <exclude>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-configuration-processor</artifactId>
                    </exclude>
                </excludes>
            </configuration>
        </plugin>
        <plugin>
            <artifactId>maven-surefire-plugin</artifactId>
            <configuration>
                <skipTests>true</skipTests>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### ~~参数详解~~
- -Xdebug 通知JVM工作在DEBUG模式下； 
- -Xrunjdwp 通知JVM使用(Java debug wire protocol)运行调试环境。该参数同时包含了一系列的调试选项； 
- **transport **指定了调试数据的传送方式，dt_socket是指用SOCKET模式，另有dt_shmem指用共享内存方式，其中，dt_shmem只适用于Windows平台； 
- address 调试服务器的端口号，客户端用来连接服务器的端口号； 
- server=y/n VM 是否需要作为调试服务器执行； 
- suspend=y/n 是否在调试客户端建立连接之后启动 VM； 

## ~~重新打包~~

![打包]({{ '/assets/posts/ide/idea/2022-12-07-idea-remote-debug/Snipaste_2022-12-07_16-09-18.png' | prepend: site.baseurl  }})

## ~~启动jar并且带启动参数支持远程调试~~

```sh
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 -Xms2g -Xmx2g -Xmn1g -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m -XX:-OmitStackTraceInFastThrow -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=./java_heapdump.hprof -Xloggc:./java_gc.log -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=100M  -jar remote-test.jar --spring.profiles.active=prod >> /dev/null 2>&1 &
```

## IDEA远程DEBUG配置

### 服务启动命令

```sh
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 -jar remote-debug-test.jar
```

### IDEA启动项下拉，添加配置

![启动项下拉，选择 Add Configurations编辑配置]({{ '/assets/posts/ide/idea/2022-12-07-idea-remote-debug/Snipaste_2022-12-07_16-17-23.png' | prepend: site.baseurl  }})


### 点击+，选择Remote，添加远程DEBUG配置

![选择Remote，添加远程DEBUG配置]({{ '/assets/posts/ide/idea/2022-12-07-idea-remote-debug/Snipaste_2022-12-07_17-01-25.png' | prepend: site.baseurl  }})


### 添加远程DEBUG配置项，Host和Port，选择一个模块，配置后，点击Apply和OK按钮

![配置Remote]({{ '/assets/posts/ide/idea/2022-12-07-idea-remote-debug/Snipaste_2022-12-07_16-53-11.png' | prepend: site.baseurl  }})


## 启动调试，在需要调试的位置打上断点

![配置Remote]({{ '/assets/posts/ide/idea/2022-12-07-idea-remote-debug/Snipaste_2022-12-07_16-58-48.png' | prepend: site.baseurl  }})


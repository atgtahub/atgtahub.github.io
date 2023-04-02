---
layout: post
title:  Docker学习
categories: linux
tag: docker
---


* content
{:toc}


## Docker概述

虚拟化容器技术。Docker基于镜像，可以秒级启动各种容器。每一种容器都是一个完整的运行

环境，容器之间互相隔离

- Docker是一个开源的应用容器引擎
- 诞生于2013年初，基于Go语言实现，dotCloud公司出品（后改名为Docker Inc）
- Docker可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的Linux机器上
- 容器是完全使用沙箱机制，相互隔离
- 容器性能开销极低
- Docker从17.03版本之后CE（Community Edition：社区版）和EE（Enterprise Edition：企业版）

## 架构

Clients：客户端

###  Hosts：docker核心

- local host：本机
- remote host：远程
- daemon：docker以守护进程方式存在，后台运行
- container：容器、根据镜像文件所创建出来的一个动态实例
- image：镜像、一种静态文件，来源于docker远程仓库

###  Registries：docker仓库

- Docker Hub：docker官方仓库
- private registry：私有仓库、私服

### 概念

- **镜像（Image）**：Docker 镜像（Image），就相当于是一个 root 文件系统。比如官方镜像 ubuntu:16.04 就包含了完整的一套 Ubuntu16.04 最小系统的 root 文件系统。
- **容器（Container）**：镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和对象一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。
- **仓库（Repository）**：仓库可看成一个代码控制中心，用来保存镜像。

### 与虚拟机相比较

docker容器虚拟化 与 传统虚拟机比较

容器就是将软件打包成标准化单元，以用于开发、交付和部署。

- 容器镜像是轻量的、可执行的独立软件包 ，包含软件运行所需的所有内容：代码、运行时环境、系统工具、系统库和设置。
- 容器化软件在任何环境中都能够始终如一地运行。
- 容器赋予了软件独立性，使其免受外在环境差异的影响，从而有助于减少团队间在相同基础设施上运行不同软件时的冲突。

#### 相同

容器和虚拟机具有相似的资源隔离和分配优势

#### 不同

- 容器虚拟化的是操作系统，虚拟机虚拟化的是硬件。
- 传统虚拟机可以运行不同的操作系统，容器只能运行同一类型操作系统

## 安装

安装文档：https://docs.docker.com/engine/install/centos/

### docker内核版本必须是3.10+以上的版本

```sh
#查看方式
uname -r

#更新yum
yum update
```

### 卸载系统之前的docker

```sh
 sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

### 依赖

- 安装 yum-utils，它提供了 yum-config-manager，可用来管理yum源
- 安装需要的软件包， yum-util 提供yum-config-manager功能，另外两个是devicemapper驱动依赖的

```sh
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

### docker存储库地址添加yum源

#### aliyun镜像

```sh
sudo yum-config-manager \
            --add-repo \
            http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

#### 官方镜像

```sh
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

### 客户端

```sh
sudo yum install -y docker-ce docker-ce-cli containerd.io
```

- 安装 docker-ce 引擎

  ```sh
  sudo yum install -y docker-ce
  ```

- 安装操作 docker客户端

  ```sh
  sudo yum install -y docker-ce-cli
  ```

- 容器

  ```sh
  sudo yum install -y containerd.io
  ```

### 启动与停止Docker

#### 启动docker服务

```sh
sudo systemctl start docker
```

#### 停止docker服务

```sh
sudo systemctl stop docker
```

#### 重启docker服务

```sh
sudo systemctl restart docker
```

#### 查看docker服务状态

```sh
sudo systemctl status docker
```

#### 设置开机自启

```sh
sudo systemctl enable docker
```

#### 验证是否安装成功

```sh
sudo docker info
```

#### 查看docker版本，验证是否验证成功

```sh
sudo docker -v
```

### 配置docker阿里云镜像加速

<a href="https://www.aliyun.com" target="_blank">https://www.aliyun.com</a>

登陆 => 控制台 => 容器镜像服务 => 镜像工具 => 镜像加速器

#### 创建文件夹

```sh
sudo mkdir -p /etc/docker
```

#### 配置加速地址

```sh
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://abcde.mirror.aliyuncs.com"]
}
EOF
```

#### 重启后台线程

```sh
sudo systemctl daemon-reload
```

#### 重启docker

```sh
sudo systemctl restart docker
```

## 命令

### 镜像

#### 查看镜像

```sh
docker images
```

#### 查看所有镜像id列表

```sh
docker images -q
```

#### 搜索镜像

```sh
docker search `imageName`
```

#### 拉取镜像

从Docker仓库下载镜像到本地,镜像名称格式为 名称:版本号，如果版本号不指定即拉取最新的版本 latest

```sh
docker pull `imageName:versionNum`
```

#### 删除指定本地镜像

```sh
docker rmi `imageId`|`imageName`|`imageName:versionNum`
```

#### 删除所有本地镜像

```sh
docker rmi `docker images -q`
```

### 容器

#### 查看现在正在运行的容器列表

```sh
docker ps -a
```
- -a：查看所有历史运行的容器

#### 创建容器

通过-it方式创建的容器: 一创建后自动立马容器 exit退出后容器立马关闭

```sh
docker run -id --name=`conName` `imageName:versionNum`
```

```sh
docker run -it --name=`conName` `imageName:versionNum` /bin/bash
```

- -i：保持容器运行。通常与 -t 同时使用。加入it这两个参数后，容器创建后自动进入容器中，退出容器后，容器自动关闭
- -t：为容器重新分配一个伪输入终端，通常与 -i 同时使用
- --name：表示给容器起一个名字，可以写= 也可以写空格
- /bin/bash：打开一个shell窗口、脚本
- -d：以守护（后台）模式运行容器，创建一个容器在后台运行，但不会立即进入容器，通过命令才能进入容器，需要使用docker exec 进入容器，操作之后通过exit退出后容器不会自动关闭

#### 进入容器

```sh
docker exec -it `conName`|`conId` /bin/bash
```

#### 启动容器

```sh
docker start `conName`|`conId`
```

#### 开启容器的自动重启

```sh
docker update `conName`|`conId` --restart=always
```

#### 关闭容器的自动重启

```sh
docker update `conName`|`conId` --restart=no
```

#### 停止容器

```sh
docker stop `conName`|`conId`
```

#### 查看容器信息

```sh
docker inspect `conName`|`conId`
```

#### 查看容器启动日志

```sh
docker logs `conName`|`conId`
```

#### 查看容器动态日志

```sh
docker logs -f -t --tail=100 `conName`|`conId` --since="2021-01-01"
```

- -f：查看实时日志
- -t：查看日志产生的日期
- --tail=100：查看最后的100条日志。
- --since：此参数指定了输出日志开始日期，即只输出指定日期之后的日志。

#### 查看所有容器id

```sh
docker ps -aq
```

#### 删除容器

```sh
docker rm `conName`|`conId`
```

#### 删除所有容器（无法删除正在运行的容器）

```sh
docker rm `docker ps -aq`
```

- -it：创建的容器一般称为交互式容器
- -id：创建的容器一般称为守护式容器

#### 从外部复制到容器内

```sh
docker cp source container:target_path
```

#### 从容器内部复制到容器外

```sh
docker cp container:source_path output_path
```

## Dockerfile

| 关键字      | 作用                     | 备注                                                         |
| ----------- | ------------------------ | ------------------------------------------------------------ |
| FROM        | 指定父镜像               | 指定dockerfile基于那个image构建                              |
| MAINTAINER  | 作者信息                 | 用来标明这个dockerfile谁写的                                 |
| LABEL       | 标签                     | 用来标明dockerfile的标签 可以使用Label代替Maintainer 最终都是在docker image基本信息中可以查看 |
| RUN         | 执行命令                 | 执行一段命令 默认是/bin/sh 格式: RUN command 或者 RUN ["command" , "param1","param2"] |
| CMD         | 容器启动命令             | 提供启动容器时候的默认命令 和ENTRYPOINT配合使用.格式 CMD command param1 param2 或者 CMD ["command" , "param1","param2"] |
| ENTRYPOINT  | 入口                     | 一般在制作一些执行就关闭的容器中会使用                       |
| COPY        | 复制文件                 | build的时候复制文件到image中                                 |
| ADD         | 添加文件                 | build的时候添加文件到image中 不仅仅局限于当前build上下文 可以来源于远程服务 |
| ENV         | 环境变量                 | 指定build时候的环境变量 可以在启动的容器的时候 通过-e覆盖 格式ENV name=value |
| ARG         | 构建参数                 | 构建参数 只在构建的时候使用的参数 如果有ENV 那么ENV的相同名字的值始终覆盖arg的参数 |
| VOLUME      | 定义外部可以挂载的数据卷 | 指定build的image那些目录可以启动的时候挂载到文件系统中 启动容器的时候使用 -v 绑定 格式 VOLUME ["目录"] |
| EXPOSE      | 暴露端口                 | 定义容器运行的时候监听的端口 启动容器的使用-p来绑定暴露端口 格式: EXPOSE 8080 或者 EXPOSE 8080/udp |
| WORKDIR     | 工作目录                 | 指定容器内部的工作目录 如果没有创建则自动创建 如果指定/ 使用的是绝对地址 如果不是/开头那么是在上一条workdir的路径的相对路径 |
| USER        | 指定执行用户             | 指定build或者启动的时候 用户 在RUN CMD ENTRYPONT执行的时候的用户 |
| HEALTHCHECK | 健康检查                 | 指定监测当前容器的健康监测的命令 基本上没用 因为很多时候 应用本身有健康监测机制 |
| ONBUILD     | 触发器                   | 当存在ONBUILD关键字的镜像作为基础镜像的时候 当执行FROM完成之后 会执行 ONBUILD的命令 但是不影响当前镜像 用处也不怎么大 |
| STOPSIGNAL  | 发送信号量到宿主机       | 该STOPSIGNAL指令设置将发送到容器的系统调用信号以退出。       |
| SHELL       | 指定执行脚本的shell      | 指定RUN CMD ENTRYPOINT 执行命令的时候 使用的shell            |

> ### 案例：需求
>
> 定义dockerfile，发布springboot项目
>
> ### 案例：实现步骤
>
> vim dockerfile_name
>
> ```
> FROM java:8
> MAINTAINER author <author@gmail.com>
> ADD springboot-hello-0.0.1-SNAPSHOT.jar springboot.jar
> CMD java -jar springboot.jar
> ```
>
> 1. 定义父镜像：FROM java:8
>
> 2. 定义作者信息：MAINTAINER author @itcast.cn >@itcast.cn >
>
> 3. 将jar包添加到容器：ADD springboot.jar app.jar
>
> 4. 定义容器启动执行的命令：CMD java -jar app.jar
>
> 5. 通过dockerfile构建镜像：docker build -f dockerfile文件路径 -t 镜像名称:版本
>
>    ```sh
>    docker build -f filepath -t imgName:ver .
>          
>    docker run -id -p 9000:8080 app
>          
>    docker start conID/conName
>    #参数
>    #-f指定dockerfile文件路径
>    #-t设置新的镜像名称以及版本
>    #. 代表一个路径，将来寻址的路径，在这条命令中，上下文路径是.
>    #小数点.代表着当前目录。所以docker build -t myimage .中小数点.其实就是将当前目录设置为上下文路径。
>    #执行docker build后，会首先将上下文目录的所有文件都打包，然后传给Docker daemon，这样 Docker daemon收到这个上下文包后，展开就会获得构建镜像所需的一切文件
>    ```

## docker-compose

compose 是用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务

Compose 使用的三个步骤

- 使用 Dockerfile 定义应用程序的环境。
- 使用 docker-compose.yml 定义构成应用程序的服务，这样它们可以在隔离环境中一起运行。
- 最后，执行 docker-compose up 命令来启动并运行整个应用程序
- 微服务架构的应用系统中一般包含若干个微服务，每个微服务一般都会部署多个实例，如果每个微服务都要手动启停，维护的工作量会很大
- 要从Dockerfile build image 或者去dockerhub拉取image
- 要创建多个container
- 要管理这些container（启动停止删除）
  **服务编排：**按照一定的业务规则批量管理容器
  Docker Compose是一个编排多容器分布式部署的工具，提供命令集管理容器化应用的完整开发周期，包括服务构建，启动和停止

### 安装

- github

```sh
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

- daocloud

```sh
curl -L "https://get.daocloud.io/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

#### 将可执行权限应用于二进制文件

```sh
chmod +x /usr/local/bin/docker-compose
```

#### 测试是否安装成功

```sh
docker-compose --version
```

查看版本(*.yml 头字段)

```sh
docker-compose version
```

### 启动

```sh
docker-compose -f es.yml up -d
```

- -f：指定构建文件
- up：创建并启动容器
- -d：后台运行容器(container)，打印容器(container)ID

#### yml exmple

```yml
version: "3.7"

services:
  elasticsearch:
    image: elasticsearch:7.13.3
    container_name: elasticsearch
    restart: always
    environment:
      - discovery.type=single-node
      - ES_JAVA_OPTS=-Xms64m -Xmx512m
    volumes:
      - /works/elasticsearch/plugins:/usr/share/elasticsearch/plugins
      - /works/elasticsearch/data:/usr/share/elasticsearch/data
      - /works/elasticsearch/logs:/usr/share/elasticsearch/logs
      - /works/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml
    ports:
      - "9200:9200"
      - "9300:9300"
  kibana:
    image: kibana:7.13.3
    container_name: kibana
    restart: always
    links:
      - elasticsearch:elasticsearch
    environment:
      - ELASTICSEARCH_HOSTS=http://192.168.19.129:9200
    volumes:
      - /works/kibana/plugins:/usr/share/kibana/plugins
      - /works/kibana/data:/usr/share/kibana/data
      - /works/kibana/config/kibana.yml:/usr/share/kibana/config/kibana.yml
    ports:
      - "5601:5601"
  skywalking-oap-server:
    image: apache/skywalking-oap-server:6.6.0-es7
    container_name: oap
    restart: always
    links:
      - elasticsearch:elasticsearch
    environment:
      - TZ=Asia/Shanghai
      - SW_STORAGE=elasticsearch
      - SW_STORAGE_ES_CLUSTER_NODES=192.168.19.129:9200
    ports:
      - "12800:12800"
      - "11800:11800"
  skywalking-ui:
    image: apache/skywalking-ui:6.6.0
    container_name: skywalking-ui
    restart: always
    links:
      - skywalking-oap-server:skywalking-oap-server
    environment:
      - TZ=Asia/Shanghai
      - SW_OAP_ADDRESS=192.168.19.129:12800
    ports:
      - "8088:8080"

```



### 卸载

二进制包方式安装的，删除二进制文件即可

```sh
rm /usr/local/bin/docker-compose
```

### docker compose编排nginx+springboot项目

#### 创建docker-compose目录

```sh
mkdir ~/docker-compose
cd ~/docker-compose
```

####  docker-compose.yml

```sh
version: '3'
services:
  nginx:
   image: nginx
   ports:
    - 80:80
   links:
    - app
   volumes:
    - ./nginx/conf.d:/etc/nginx/conf.d
  app:
    image: app
    expose:
      - "8080"
```

#### 创建./nginx/conf.d目录

```sh
mkdir -p ./nginx/conf.d
```

#### 在./nginx/conf.d目录下 编写nginx.conf文件

```sh
server {
    listen 80;
    access_log off;

    location / {
        proxy_pass http://app:8080;
    }
   
}
```

### 在~/docker-compose 目录下 使用docker-compose 启动容器

```sh
docker-compose up
```

## 常用软件安装

### docker hub

https://registry.hub.docker.com/

### elasticsearch

#### pull

```sh
docker pull elasticsearch:7.13.3
```

#### mkdir

```sh
mkdir -p /elasticsearch/plugins
```

```sh
mkdir -p /elasticsearch/data
```

```sh
mkdir -p /elasticsearch/logs
```

```sh
mkdir -p /elasticsearch/config
touch /elasticsearch/config/elasticsearch.yml
```

#### 授权

```sh
chmod -R 777 /space
```

#### run

```sh
docker run -p 9200:9200 -p 9300:9300 -d --name elasticsearch \
   --restart=always \
   -e "discovery.type=single-node" \
   -e ES_JAVA_OPTS="-Xms64m -Xmx512m" \
   -v $PWD/plugins:/usr/share/elasticsearch/plugins \
   -v $PWD/data:/usr/share/elasticsearch/data \
   -v $PWD/logs:/usr/share/elasticsearch/logs \
   -v $PWD/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
   elasticsearch:7.13.3
   
   
   -e "cluster.name=elasticsearch" \
```

- -p：端口映射
- -d：后台进程
- -e "discovery.type=single-node"：单节点
- -e "cluster.name=es7"：集群名 没有则不设置
- -e ES_JAVA_OPTS="-Xms64m -Xmx512m"：单阶段运行、指定占用的内存大小，生产时可以设置32G
- -v: volumes目录挂载

#### es可以被远程任何机器访问

```sh
echo "http.host: 0.0.0.0" >/space/elasticsearch/config/elasticsearch.yml
```

### kibana

#### pull

```sh
docker pull kibana:7.13.3
```

#### run

```sh
docker run --link es7 -d --name kibana --restart=always -p 5601:5601  kibana:7.13.3


docker run -d \
  --name=kibana \
  --restart=always \
  -p 5601:5601 \
  -e ELASTICSEARCH_HOSTS=http://192.168.183.10:9200 \
  -v $PWD/config/kibana.yml:/usr/share/kibana/config/kibana.yml \
  kibana:7.13.3
  
  
  docker run -d \
  --link elasticsearch \
  --name=kibana \
  --restart=always \
  -p 5601:5601 \
  -v $PWD/config/kibana.yml:/usr/share/kibana/config/kibana.yml \
  kibana:7.13.3
```

#### host

ES交互端口9200

```sh
docker run --name kibana --restart=always -e ELASTICSEARCH_HOSTS=http://192.168.19.128:9200 -p 5601:5601 -d kibana:7.13.3
```

#### volume
在外部挂载kibana后 需要给配置文件添加上 server.host 即可
```yml
i18n.locale: "en"
server.port: 5601
server.host: "0.0.0.0"
elasticsearch.hosts: ["http://192.168.19.129:9200"]
elasticsearch.requestTimeout: 3000
```
-  i18n.locale: "en"：中英文设置 zh-CN
- server.port: 5601：端口
- server.host: "0.0.0.0"：允许访问的主机
- server.name: "kibana" ：kibana服务名
- elasticsearch.hosts: ["http://192.168.19.129:9200"]：elasticsearch地址
- elasticsearch.requestTimeout: 3000：请求elasticsearch超时时间，默认为30000

### skywalking(es)

#### server

##### pull

```sh
docker pull apache/skywalking-oap-server:6.6.0-es7
```

##### run

```sh
docker run --name oap --restart always -d \
   --restart=always \
   -e TZ=Asia/Shanghai \
   -p 12800:12800 \
   -p 11800:11800 \
   --link es7:es7 \
   -e SW_STORAGE=elasticsearch \
   -e SW_STORAGE_ES_CLUSTER_NODES=es7:9200 \
   apache/skywalking-oap-server:6.6.0-es7
```

##### ip

```sh
docker run --name oap --restart always -d \
   --restart=always \
   -e TZ=Asia/Shanghai \
   -p 12800:12800 \
   -p 11800:11800 \
   --link es7:es7 \
   -e SW_STORAGE=elasticsearch \
   -e SW_STORAGE_ES_CLUSTER_NODES=192.168.19.128:9200 \
   apache/skywalking-oap-server:6.6.0-es7
```

#### ui

##### pull

```sh
docker pull apache/skywalking-ui:6.6.0
```

##### run

```sh
docker run -d --name skywalking-ui \
   --restart=always \
   -e TZ=Asia/Shanghai \
   -p 8088:8080 \
   --link oap:oap \
   -e SW_OAP_ADDRESS=oap:12800 \
   apache/skywalking-ui:6.6.0
```

##### ip

```sh
docker run -d --name skywalking-ui \
   --restart=always \
   -e TZ=Asia/Shanghai \
   -p 8088:8080 \
   --link oap:oap \
   -e SW_OAP_ADDRESS=192.168.19.128:12800 \
   apache/skywalking-ui:6.6.0
```



### Nginx

#### pull

```sh
docker pull nginx
```

#### mkdir

```sh
# 在/root目录下创建nginx目录用于存储nginx数据信息
mkdir -p ~/nginx/conf
cd ~/nginx
```

#### edit conf

```sh
# 在~/nginx/conf/下创建nginx.conf文件,粘贴下面内容
vim ~/nginx/conf/nginx.conf
```

#### nginx.conf

```ini
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

#### run

```sh
docker run -id --name=nginx \
-p 80:80 \
-v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf \
-v $PWD/logs:/var/log/nginx \
-v $PWD/html:/usr/share/nginx/html \
nginx
```

- -p 80:80：将容器的 80端口映射到宿主机的 80 端口。
- -v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf：将主机当前目录下的 /conf/nginx.conf 挂载到容器的 :/etc/nginx/nginx.conf。配置目录
- -v $PWD/logs:/var/log/nginx：将主机当前目录下的 logs 目录挂载到容器的/var/log/nginx。日志目录

### mysql

#### pull

```sh
sudo docker pull mysql:5.7
```

#### create&run

```sh
#在/root目录下创建mysql目录用于存储mysql数据信息
mkdir ~/mysql
cd ~/mysql

#创建实例并启动
docker run -p 3306:3306 --name=mysql \
-v $PWD/log:/var/log/mysql \
-v $PWD/data:/var/lib/mysql \
-v $PWD/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql:5.7

#param
-p 3306:3306：将容器的3306端口映射主机的3306端口
-v $PWD/log:/var/log/mysql：将日志文件夹挂载到主机
-v $PWD/data:/var/lib/mysql：将配置文件夹挂载到主机
-v $PWD/conf:/etc/mysql：将配置文件夹挂载到主机
-e MYSQL_ROOT_PASSWORD=root：初始化 root 用户密码
-d：后台方式运行
```

#### enter

```sh
#进入容器
docker exec -it `conId`|`conName` /bin/bash
#进入mysql
mysql -uroot -proot
#退出mysql
exit|quit
#退出容器
exit
```

#### config

```sh
vi ~/mysql/conf/my.cnf
```

```ini
[client]
default-character-set=utf8mb4

[mysql]
default-character-set=utf8mb4

[mysqld]
init_connect='SET collation_connection=utf8mb4_unicode_ci'
init_connect='SET NAMES utf8mb4'
character_set_server=utf8mb4
collation-server=utf8mb4_unicode_ci
skip-character-set-client-handshake
skip-name-resolve
```

### redis

#### pull

```sh
docker pull redis:6.0
```

#### create&run

```sh
mkdir ~/redis
cd ~/redis
mkdir conf
touch conf/redis.conf
cd ~/redis

docker run -p 6379:6379 --name redis \
-v $PWD/data:/data \
-v $PWD/conf/redis.conf:/etc/redis/redis.conf \
-d redis:6.0 redis-server /etc/redis/redis.conf

#param
-d redis redis-server /etc/redis/redis.conf：redis服务器以后面的配置文件加载启动
```

#### connection

```sh
docker exec -it redis redis-cli
set key
get key
del key
exit
docker restart redis

vi ~/redis/conf/redis.conf

#redis启用aof的持久化
appendonly yes
```

### tomcat

#### pull

```sh
docker pull tomcat:9.0
```

#### mkdir

```sh
# 在/root目录下创建tomcat目录用于存储tomcat数据信息
mkdir ~/tomcat
cd ~/tomcat
```

#### run

```sh
docker run -id --name=c_tomcat \
-p 8080:8080 \
-v $PWD:/usr/local/tomcat/webapps \
tomcat:9.0
```

- -p：将容器的8080端口映射到主机的8080端口
- -v $PWD:/usr/local/tomcat/webapps：将主机中当前目录挂载到容器的webapps

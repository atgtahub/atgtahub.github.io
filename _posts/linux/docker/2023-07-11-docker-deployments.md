---
layout: post
title:  Docker部署常用服务
categories: linux
tag: docker
---


* content
{:toc}


## Docker Hub

https://hub.docker.com/



## Web服务器



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
-v ~/nginx/conf.d:/etc/nginx/conf.d\
-v ~/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v ~/nginx/logs:/var/log/nginx \
-v ~/nginx/html:/usr/share/nginx/html \
nginx
```

- -p 80:80：将容器的 80端口映射到宿主机的 80 端口。
- -v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf：将主机当前目录下的 /conf/nginx.conf 挂载到容器的 :/etc/nginx/nginx.conf。配置目录
- -v $PWD/logs:/var/log/nginx：将主机当前目录下的 logs 目录挂载到容器的/var/log/nginx。日志目录



### Tomcat

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



## 存储

### 数据库



#### MySQL

##### pull

```sh
docker pull mysql:5.7
```



##### mkdir

```sh
mkdir ~/mysql
```



##### run

```sh
# 创建实例并启动
docker run -p 3306:3306 --name=mysql \
-v ~/mysql/log:/var/log/mysql \
-v ~/mysql/data:/var/lib/mysql \
-v ~/mysql/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql:5.7
```

- -p 3306:3306：将容器的3306端口映射主机的3306端口
- -v ~/mysql/log:/var/log/mysql：将日志文件夹挂载到主机
- -v ~/mysql/data:/var/lib/mysql：将数据文件夹挂载到主机
- -v ~/mysql/conf:/etc/mysql：将配置文件夹挂载到主机
- -e MYSQL_ROOT_PASSWORD=root：初始化 root 用户密码
- -d：后台方式运行



##### exec

```sh
# 进入容器
docker exec -it `conId`|`conName` /bin/bash
# 进入mysql
mysql -uroot -proot
# 退出mysql
exit|quit
# 退出容器
exit
```

##### config

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



#### PostgreSQL

##### pull

```sh
docker pull postgres
```



##### mkdir

```sh
mkdir -p ~/postgresql/data
```



##### run

```sh
docker run -d -p 5432:5432 \
--name postgresql-release \
--privileged=true \
-e POSTGRES_PASSWORD=123456 \
-v ~/postgresql/data:/var/lib/postgresql/data \
postgres
```



##### exec

```sh
docker exec -it postgresql-release bash

# 创建postgressql容器时，默认创建了一个postgres库，一个postgres用户
# psql -h <ip> -p <端口> [数据库名称] [用户名称]
psql -h 127.0.0.1 -p 5432 postgres postgres
```





### NoSQL

#### Redis

##### pull

```sh
docker pull redis:6.0
```



##### mkdir

```sh
mkdir -p ~/redis/conf
mkdir -p ~/redis/data
touch ~/redis/conf/redis.conf
```



##### run

```sh
docker run -p 6379:6379 --name redis \
-v ~/redis/data:/data \
-v ~/redis/conf/redis.conf:/etc/redis/redis.conf \
-d redis:6.0 redis-server /etc/redis/redis.conf

# param
-d redis redis-server /etc/redis/redis.conf：redis服务器以后面的配置文件加载启动
```



##### connection

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



### MQ



#### RabbitMQ

##### pull

```sh
docker pull rabbitmq:management
```



##### run

```sh
docker run -d --name rabbitmq \
-p 5671:5671 \
-p 5672:5672 \
-p 4369:4369 \
-p 25672:25672 \
-p 15671:15671 \
-p 15672:15672 \
rabbitmq:management
```



## 检索



### Elasticsearch

#### pull

```sh
docker pull elasticsearch:7.13.3
```



#### mkdir

```sh
mkdir -p ~/elasticsearch/plugins
mkdir -p ~/elasticsearch/data
mkdir -p ~/elasticsearch/logs
mkdir -p ~/elasticsearch/config
touch ~/elasticsearch/config/elasticsearch.yml
```



#### run

```sh
docker run -p 9200:9200 -p 9300:9300 -d --name elasticsearch \
   --restart=always \
   -e "discovery.type=single-node" \
   -e ES_JAVA_OPTS="-Xms64m -Xmx512m" \
   -v ~/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
   -v ~/elasticsearch/data:/usr/share/elasticsearch/data \
   -v ~/elasticsearch/logs:/usr/share/elasticsearch/logs \
   -v ~/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
   elasticsearch:7.13.3
   -e "cluster.name=elasticsearch" \
```

- -p：端口映射
- -d：后台进程
- -e "discovery.type=single-node"：单节点
- -e "cluster.name=es7"：集群名 没有则不设置
- -e ES_JAVA_OPTS="-Xms64m -Xmx512m"：单阶段运行、指定占用的内存大小，生产时可以设置32G
- -v: volumes目录挂载

#### config

```sh
echo "http.host: 0.0.0.0" > ~/elasticsearch/config/elasticsearch.yml
```

- "http.host: 0.0.0.0"：远程机器访问



### Kibana

#### pull

```sh
docker pull kibana:7.13.3
```



#### mkdir

```sh
mkdir -p ~/kibana/config
touch ~/kibana/config/kibana.yml
```



#### run

```sh
docker run -d \
  --name=kibana \
  --restart=always \
  -p 5601:5601 \
  -e ELASTICSEARCH_HOSTS=http://192.168.183.10:9200 \
  -v ~/kibana/config/kibana.yml:/usr/share/kibana/config/kibana.yml \
  kibana:7.13.3

# --link
docker run -d \
  --link elasticsearch_container_name \
  --name=kibana \
  --restart=always \
  -p 5601:5601 \
  -v ~/kibana/config/kibana.yml:/usr/share/kibana/config/kibana.yml \
  kibana:7.13.3
```



#### config

在外部挂载kibana后 需要给配置文件添加上 server.host 即可

```yml
i18n.locale: "en"
server.port: 5601
server.host: "0.0.0.0"
elasticsearch.hosts: ["http://192.168.19.129:9200"]
elasticsearch.requestTimeout: 3000
```

-  i18n.locale: "en"：中英文设置 zh-CN
-  server.port: 5601：端口
-  server.host: "0.0.0.0"：允许访问的主机
-  server.name: "kibana" ：kibana服务名
-  elasticsearch.hosts: ["http://192.168.19.129:9200"]：elasticsearch地址
-  elasticsearch.requestTimeout: 3000：请求elasticsearch超时时间，默认为30000





### SkyWalking(基于elasticsearch)

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

docker run -d --name skywalking-ui \
   --restart=always \
   -e TZ=Asia/Shanghai \
   -p 8088:8080 \
   --link oap:oap \
   -e SW_OAP_ADDRESS=192.168.19.128:12800 \
   apache/skywalking-ui:6.6.0
```


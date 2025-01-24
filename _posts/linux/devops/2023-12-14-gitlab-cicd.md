---
layout: post
title: Gitlab CICD部署
categories: linux
tag: devops
---


* content
{:toc}

## Gitlab实现CICD



### 环境搭建

#### git

工作节点执行

```sh
yum install -y git
```



#### gitlab

gitlab服务节点执行

- arm架构的gitlab软件包目前只支持centos el8和el9，因此使用Docker进行服务部署
- EL是Red Hat Enterprise Linux（**EL**）红帽企业级Linux的缩写
- 官方文档：https://docs.gitlab.com/
- 社区版精简包：https://packages.gitlab.com/gitlab/gitlab-ce
- 配置要求：https://docs.gitlab.com/ee/install/requirements.html
- 虚拟机配置：硬盘50GB，内存4GB，CPU*2



##### 部署docker

```sh
# 更新yum
yum update

# 安装 yum-utils，它提供了 yum-config-manager，可用来管理yum源
yum install -y yum-utils device-mapper-persistent-data lvm2

# 存储库地址添加yum源
yum-config-manager \
            --add-repo \
            http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
            
# 安装客户端
yum install -y docker-ce docker-ce-cli containerd.io

# 启动docker
systemctl start docker

# 设置开机自启
systemctl enable docker

# 验证安装
docker info
```



##### 部署gitlab

```sh
# 拉取镜像
docker pull yrzr/gitlab-ce-arm64v8

# 运行
docker run \
  --detach \
  --restart always \
  --name gitlab-ce \
  --privileged \
  --memory 2048M \
  --publish 80:80 \
  --publish 443:443 \
  --hostname 192.168.39.135 \
  --env GITLAB_OMNIBUS_CONFIG=" \
    nginx['redirect_http_to_https'] = true; "\
  --volume /opt/docker/volumes/gitlab/config:/etc/gitlab:z \
  --volume /opt/docker/volumes/gitlab/logs:/var/log/gitlab:z \
  --volume /opt/docker/volumes/gitlab/data:/var/opt/gitlab:z \
  yrzr/gitlab-ce-arm64v8:latest

# 进入docker容器中，查看当前gitlab的初始密码
docker exec -it gitlab-ce bash
cat /etc/gitlab/initial_root_password

# 访问
http://192.168.39.134

# 查看版本号
docker exec -it gitlab-ce cat /opt/gitlab/embedded/service/gitlab-rails/VERSION
```



## Git操作

### 切换到工作目录

```sh
cd ~/jxcms/

ls
# pom.xml  src  target
```



### 初始化本地仓库

```sh
git init .

ls -a
# .  ..  .git  pom.xml  src  target
```



### 配置用户名和邮箱

```sh
git config user.name gtahub
git config user.email gtahub

# 添加--global参数代表全局配置
```



### 添加代码到暂存区

```sh
git add src pom.xml

# 查看状态
git status .
```



### 提交代码到本地仓库

```sh
git commit -m "feat: init code"

# 查看提交日志
git log
```



### 本地仓库同步到gitlab远程仓库

- 注意：gitlab14.0之后到版本默认受保护分支为main
- 文档说明：https://docs.gitlab.com/ee/user/project/repository/branches/default.html
- 修改默认分支：
  - 登录管理员`root`账号
  - 打开admin面板：`http://192.168.39.134/admin/application_settings/repository`
  - 修改默认分支名称

```sh
# 添加远程仓库地址
git remote add origin http://192.168.39.134/pastor/jxcms.git

# 列出当前仓库中已配置的远程仓库
git remote -v

# 重命名默认分支
git branch -M main

# 推送到远程仓库
git push -uf origin main
```

## Linux工具

### 文本对比

```sh
vimdiff file1 file2
```



### 根据关键字快速补全历史命令

- ctrl + r



## 配置ssh免密登录



### gitlab服务节点执行

```sh
ssh-keygen
```



### 拷贝到工作节点

```sh
ssh-copy-id root@192.168.39.133
```



## gitlab-runner

### 管理员界面创建一个新Runner

- http://192.168.39.135/admin/runners/new
- 输入标签名



### 创建gitlab-runner容器

```sh
docker run -d --name gitlab-runner --restart always \
-v /opt/docker/volumes/gitlab-runner/config:/etc/gitlab-runner \
gitlab/gitlab-runner:v16.6.0
```



### 进入容器执行命令

```sh
docker exec -it gitlab-runner bash

gitlab-runner register  --url http://192.168.39.135  --token glrt-n56sXhAHfWWFoNa1-DuD

untime platform                                    arch=arm64 os=linux pid=23 revision=3046fee8 version=16.6.0
Running in system-mode.

#Enter the GitLab instance URL (for example, https://gitlab.com/):
#输入gitlab服务地址
[http://192.168.39.135]: http://192.168.39.135
#Verifying runner... is valid                        runner=n56sXhAHf
#Enter a name for the runner. This is stored only in the local config.toml file:
#输入runner名称
[50a79c9f5850]: ops-133
#Enter an executor: docker, docker-windows, shell, instance, docker-autoscaler, docker+machine, kubernetes, custom, parallels, ssh, virtualbox:
#选择执行器 ssh
ssh
#Enter the SSH server address (for example, my.server.com):
#输入远程机器ip
192.168.39.136
#Enter the SSH server port (for example, 22):
#输入远程机器ssh端口
22
#Enter the SSH user (for example, root):
#输入用户名
root
#Enter the SSH password (for example, docker.io):
#输入密码
root
#Enter the path to the SSH identity file (for example, /home/user/.ssh/id_rsa):
#输入ssh公钥位置
/root/.ssh/id_rsa
#Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!

#Configuration (with the authentication token) was saved in "/etc/gitlab-runner/config.toml"
```



### 将公钥拷贝到容器内

```sh
#拷贝.ssh目录到容器内
docker cp /root/.ssh 50:/root/

#查看目录
docker exec 50 ls /root/.ssh
```



## 流水线剧本



### killall命令安装

```sh
yum install psmisc
```



`.gitlab-ci.yml`

```yaml
# 定义阶段
stages:
  - build  # 构建阶段
  - test   # 测试阶段

# 定义job工作
job-build:
  stage: build # 属于构建阶段
  tags:
    - ops-133 # 交给带有ops-81标签的执行器
  script:
    - mvn package
    - killall java -9
    - rm /usr/local/tomcat8/webapps/ROOT* -rf
    - cp /root/jxcms/target/virstu.war /usr/local/tomcat8/webapps/ROOT.war
    - /usr/local/tomcat8/bin/startup.sh

job-test:
  stage: test
  tags:
    - ops-133
  script:
    - curl localhost/a.html
```





## vim缩进混乱

使用vim粘贴代码或配置时缩进混乱，使用`paste`模式

```sh
#进入命令行模式
:set paste
```


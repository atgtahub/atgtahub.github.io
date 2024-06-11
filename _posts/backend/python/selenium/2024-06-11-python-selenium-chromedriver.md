---
layout: post
title:  Python使用selenium + chromedriver
categories: python
tag: selenium
---


* content
{:toc}


## 服务器上使用

系统为Centos7

### 安装chrome

```sh
yum install -y wget unzip

# 安装google chrome
wget https://mirrors.aliyun.com/google-chrome/google-chrome/google-chrome-stable-114.0.5735.90-1.x86_64.rpm
yum install google-chrome-stable-114.0.5735.90-1.x86_64.rpm -y

# 查看chrome版本
google-chrome --version

# 安装依赖
yum install -y glibc.x86_64 libXcomposite.x86_64 \
      libXcursor.x86_64 libXi.x86_64 libXtst.x86_64 \
      libXrandr.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 \
      alsa-lib.x86_64 pango.x86_64 atk.x86_64 libXss.x86_64 libXft.x86_64 libXinerama.x86_64

# 安装chromedriver
# 下载对应版本的驱动: https://registry.npmmirror.com/binary.html?path=chromedriver/
wget https://registry.npmmirror.com/-/binary/chromedriver/114.0.5735.90/chromedriver_linux64.zip

# 解压安装驱动
sudo unzip chromedriver_linux64.zip chromedriver -d /usr/local/bin/
sudo chmod +x /usr/local/bin/chromedriver

# 测试驱动
chromedriver
```

### 安装python

```sh
# 安装依赖
yum -y groupinstall “Development tools”
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel
yum install -y libffi-devel zlib1g-dev
yum install zlib* -y

# 安装openssl
wget https://www.openssl.org/source/openssl-1.1.1n.tar.gz --no-check-certificate
tar -zxvf openssl-1.1.1n.tar.gz
cd openssl-1.1.1n
./config--prefix=/usr/local/openssl
# 编译并安装
make -j && make install

# 安装python
wget https://www.python.org/ftp/python/3.10.4/Python-3.10.4.tgz
tar -xvzf Python-3.10.4.tgz
cd Python-3.10.4/
./configure --prefix=/usr/local/python3 --with-openssl=/usr/local/openssl --with-openssl-rpath=auto
# 编译并安装
make -j && make install
```

### 项目启动

FastAPI

#### 启动脚本

项目根目录下执行
```sh
#!/bin/bash
if [ ! -d venv ]; then
    # 当前虚拟环境不存在则创建虚拟环境
    python3 -m venv venv
fi

# 激活虚拟环境
source "venv/bin/activate"

# 安装依赖
pip install --upgrade pip && \
    pip install -r ./requirements.txt -i https://mirrors.aliyun.com/pypi/simple/

# 后台启动web程序
nohup uvicorn app:app --host 0.0.0.0 --port 8080 > /dev/null 2>&1 &

# 退出虚拟环境
# deactivate
```

#### 重启脚本

项目根目录下执行
```sh
#!/bin/bash
pid=$(ps -ef | grep python | grep -v grep | awk '{print $2}' | sed -n '2p')

if [ -z "$pid" ]; then
    echo "未找到对应的Python进程"
else
    kill -9 "$pid"
    if [ $? -eq 0 ]; then
        echo "进程 $pid 已终止"
    else
        echo "终止进程 $pid 失败"
    fi
fi

source venv/bin/activate

nohup uvicorn app:app --host 0.0.0.0 --port 8080 > /dev/null 2>&1 &
new_pid=$(ps -ef | grep python | grep -v grep | awk '{print $2}' | sed -n '2p')

if [ -z "$new_pid" ]; then
    echo "启动失败"
else
    echo "启动成功，PID: $new_pid"
fi
```


## docker

FastAPI

### Dockerfile

```dockerfile
# 基础镜像: https://github.com/joyzoursky/docker-python-chromedriver.git
FROM joyzoursky/python-chromedriver:3.8-selenium

# 时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
  echo $TZ > /etc/timezone

# pip镜像地址
ARG PROXY_PYPI='https://mirrors.aliyun.com/pypi/simple/'
RUN pip config set global.index-url ${PROXY_PYPI}

ARG PROJECT_HOME=/app
WORKDIR ${PROJECT_HOME}

# 添加代码依赖和启动脚本到镜像中
COPY ./app ${PROJECT_HOME}/app
ADD ./requirements.txt ${PROJECT_HOME}/
ADD ./docker-entrypoint.sh ${PROJECT_HOME}/docker-entrypoint.sh

RUN chmod +x ${PROJECT_HOME}//docker-entrypoint.sh

RUN pip install --upgrade pip && \
    pip install -r ./requirements.txt

ENV FASTAPI_PROJECT_PORT=8080

EXPOSE ${FASTAPI_PROJECT_PORT}

ENTRYPOINT ["/app/docker-entrypoint.sh"]
```

### requirements.txt

```text
selenium==4.21.0
webdriver-manager==4.0.1
loguru==0.7.2
uvicorn==0.23.2
fastapi==0.104.1
pydantic==1.10.2
starlette==0.27.0
```

### docker-entrypoint.sh

```sh
#!/bin/bash
# 检查python环境
which python3

# 启动项目
uvicorn app:app --host 0.0.0.0 --port $FASTAPI_PROJECT_PORT
```

### 构建镜像

```sh
docker rmi $(docker images | grep none | awk '{print $3}')
docker build -t whoami/python-selenium:latest -f ./Dockerfile .
```

### 启动容器

```sh
docker run -id \
  --name my-python-app \
  --restart=always \
  -p 8080:8080 \
  -v $(pwd)/volume/log:/app/log \
  whoami/python-selenium
```

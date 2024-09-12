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

# arm架构
yum install -y glibc.aarch64 libXcomposite.aarch64 \
      libXcursor.aarch64 libXi.aarch64 libXtst.aarch64 \
      libXrandr.aarch64 libXScrnSaver.aarch64 alsa-lib.aarch64 \
      pango.aarch64 atk.aarch64 libXss.aarch64 libXft.aarch64 libXinerama.aarch64

# 安装chromedriver
# 下载对应版本的驱动: https://registry.npmmirror.com/binary.html?path=chromedriver/
wget https://registry.npmmirror.com/-/binary/chromedriver/114.0.5735.90/chromedriver_linux64.zip

# 解压安装驱动
sudo unzip chromedriver_linux64.zip chromedriver -d /usr/local/bin/
sudo chmod +x /usr/local/bin/chromedriver

# 测试驱动
chromedriver
```

### 安装依赖

```sh
yum install -y gcc make
yum -y groupinstall "Development Tools"
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel
yum install -y libffi-devel zlib1g-dev
yum install zlib* -y
```

### 安装openssl

```sh
wget https://www.openssl.org/source/openssl-1.1.1n.tar.gz --no-check-certificate
tar -zxvf openssl-1.1.1n.tar.gz
cd openssl-1.1.1n
./config--prefix=/usr/local/openssl
# 编译并安装
make -j && make install

# 更新 LD_LIBRARY_PATH 环境变量
echo "export LD_LIBRARY_PATH=/usr/local/openssl/lib" >> ~/.bash_profile
source ~/.bash_profile

# 将 OpenSSL 的库路径添加到系统的动态链接器配置中，使其永久生效
echo "/usr/local/openssl/lib" >> /etc/ld.so.conf.d/openssl.conf
ldconfig

# 重新检查 OpenSSL 安装： 确保 OpenSSL 的库文件在指定的目录中存在。看到类似 libssl.so.1.1 和 libcrypto.so.1.1 的文件
ls /usr/local/openssl/lib/

# 验证：OpenSSL 1.1.1n  15 Mar 2022
/usr/local/openssl/bin/openssl version
```

### 安装python

```sh
# 安装python
wget https://www.python.org/ftp/python/3.10.4/Python-3.10.4.tgz
tar -xvzf Python-3.10.4.tgz
cd Python-3.10.4/
./configure --prefix=/usr/local/python3 --with-openssl=/usr/local/openssl --with-openssl-rpath=auto
# 编译并安装
make -j && make install

# 添加python3的软链接
ln -s /usr/local/python3/bin/python3.10 /usr/bin/python3
 
# 查看版本
python3 -V
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

if [ ! -d "venv" ]; then
    echo "创建虚拟环境..."
    python3 -m venv "venv"
fi

echo "激活虚拟环境..."
source venv/bin/activate
pip install --upgrade pip && \
    pip install -r ./requirements.txt -i https://mirrors.aliyun.com/pypi/simple/

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

## 模拟元素点击

`browser.py`

```python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager


class BrowserContext:
    def __init__(self, download_dir):
        self.browser = None
        self.download_dir = download_dir
        self.__init_browser()

    def __init_browser(self):
        options = webdriver.ChromeOptions()
        chrome_driver_options_experimental = {
            "download.default_directory": self.download_dir,
            "download.prompt_for_download": False,
            "download.directory_upgrade": True,
            "safebrowsing.enabled": True
        }
        options.add_experimental_option('prefs', chrome_driver_options_experimental)

        arguments = ["--headless", "--no-sandbox", "--disable-dev-shm-usage",
                                                 "--disable-extensions", "--disable-gpu", "--window-size=1920x1080"]
        for argument in arguments:
            options.add_argument(argument)

        service = ChromeService(ChromeDriverManager().install())
        self.browser = webdriver.Chrome(service=service, options=options)

        return self.browser

    def set_download_dir(self, download_dir):
        self.download_dir = download_dir
        self.browser.command_executor._commands["send_command"] = ("POST", '/session/$sessionId/chromium/send_command')
        params = {'cmd': 'Page.setDownloadBehavior', 'params': {'behavior': 'allow', 'downloadPath': download_dir}}
        self.browser.execute("send_command", params)

    def __enter__(self):
        return self.browser

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.browser:
            self.browser.quit()
```

`util.py`

```python
from loguru import logger
from selenium.common import StaleElementReferenceException, ElementNotInteractableException, \
    ElementClickInterceptedException
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as ExpectedConditions
from selenium.webdriver.support.wait import WebDriverWait

from browser import BrowserContext

def event_listeners(url: str, temp_dir: str):
    with BrowserContext(temp_dir) as browser:
        browser.get(url)

        wait = WebDriverWait(browser, 60)
        elements = wait.until(
            ExpectedConditions.presence_of_all_elements_located(
                (By.XPATH, "//div | //a | //button | //input[@type='button']")))
        if not elements:
            return None

        for element in elements:
            try:
                if element.is_displayed():
                    # 点击之前将鼠标移动到目标元素上，绕过其他元素的遮盖
                    ActionChains(browser).move_to_element(element).click().perform()
            except StaleElementReferenceException as e:
                logger.debug(f"元素已经不再有效")
                continue
            except (ElementNotInteractableException, ElementClickInterceptedException) as e:
                logger.debug(f"无法点击此元素")
                continue
```

---
layout: post
title:  mac安装nvm
categories: mac
tag: nodejs
---


* content
{:toc}



## 描述

- nvm：一个nodejs的版本管理工具，可以实现一个系统多个npm版本切换
- github地址：<a href="https://github.com/nvm-sh/nvm" target="_blank">https://github.com/nvm-sh/nvm</a>


## Mac 删除node

### 官方安装包
- 删除 /usr/local/lib 下的任意 node 和 node_modules 的文件或目录
- 删除 /usr/local/include 下的任意 node 和 node_modules 的文件或目录
- 删除 Home 目录下的任意 node 和 node_modules 的文件或目录
- 删除 /usr/local/bin 下的任意 node 的可执行文件

```shell
# 这里是卸载npm的
sudo npm uninstall npm -g

# 这里是用来删除node创建的各种文件夹
sudo rm -rf /usr/local/lib/node
sudo rm -rf /usr/local/lib/node_modules
sudo rm -rf /var/db/receipts/org.nodejs.*
sudo rm -rf /usr/local/include/node /Users/$USER/.npm*

# 删除node命令
sudo rm /usr/local/bin/node

# 删除node的所有man手册
sudo rm /usr/local/share/man/man1/node.1
sudo rm /usr/local/share/man/man1/npm-*
sudo rm /usr/local/share/man/man1/npm.1
sudo rm /usr/local/share/man/man1/npx.1
sudo rm /usr/local/share/man/man5/npm*
sudo rm /usr/local/share/man/man5/package.json.5
sudo rm /usr/local/share/man/man7/npm*

# 这个命令也是删除一个node文件，但不知道这文件有什么用
sudo rm /usr/local/lib/dtrace/node.d
```

### 查找遗留文件

```shell
# 在/usr/local文件夹下查找以npm开头的文件
find /usr/local -name 'npm*'
# 在/usr/local文件夹下查找以node开头的文件
find /usr/local -name 'node*'
```

### 删除完成后测试命令

```shell
npm -v  
// 结果应该是 -bash: npm: command not found
node -v
// 结果应该是 -bash: node: command not found
```


## 安装nvm

### 方式一


#### 安装命令

release：<a href="https://github.com/nvm-sh/nvm/releases" target="_blank">https://github.com/nvm-sh/nvm/releases</a>
```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.37.0/install.sh | bash
```

#### 查看版本

```sh
nvm --version
```


### 方式二：brew


#### 安装命令

```sh
brew install nvm
```

#### 配置环境

编辑~/.bash_profile文件或/etc/profile文件，添加该行到文件中
```sh
# brew nvm
source $(brew --prefix nvm)/nvm.sh
```

激活配置
```sh
source ~/.bash_profile
```

## 使用nvm

### 安装nodejs

```shell
nvm install node版本号
```

### 查看已安装Node版本列表

```shell
nvm list
```

### 切换node

```shell
nvm use node版本号
```

### 官方release

- <a href="https://nodejs.org/en/download/releases/" target="_blank">https://nodejs.org/en/download/releases/</a>


参考原文
-

- <a href="https://www.pudn.com/news/62cc10813662401f6fd03545.html" target="_blank">【nvm】mac安装nvm & 解决所有遇到的问题</a>
- <a href="https://www.jianshu.com/p/6167da4981de" target="_blank">Mac 删除node</a>
- <a href="https://blog.csdn.net/qq_38969618/article/details/124623632" target="_blank">Mac如何安装：node的多版本管理工具（nvm 或 n）</a>
- <a href="https://www.cnblogs.com/lonae/p/14899110.html" target="_blank">nvm for Mac 安装及使用教程</a>
- <a href="https://www.jianshu.com/p/46bcfad1403f" target="_blank">brew install nvm</a>

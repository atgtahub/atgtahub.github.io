---
layout: post
title: poetry
categories: python
tag: poetry
---


* content
{:toc}


## poetry

### python依赖管理，Mac安装使用

```sh
# 安装
curl -sSL https://install.python-poetry.org | python3 -

# 配置环境
echo 'export PATH=$PATH:$HOME/.local/bin' >> ~/.bash_profile
source ~/.bash_profile

# 验证版本
poetry --version
```

### 常用命令

- poetry init: 初始化
- poetry install: 已有项目中安装依赖
- poetry show: 查看当前项目依赖
- poetry add: 添加一个新依赖
- poetry remove: 删除一个依赖

---
layout: post
title:  Docker镜像标签
categories: linux
tag: docker
---


* content
{:toc}

## 完整官方镜像

如：python:3.8.3、node:14.1.1，这些镜像基于最新的稳定Debian操作系统发行版。 当试图让一个项目快速启动和运行时，通常会从其中的一个开始，并不关心最终镜像的大小。完整镜像是最安全的选择。

## alpine

/ˈælpaɪn/ , 基于alpine linux项目，专门为容器内部使用而构建的操作系统，体积非常小。

## slim

/slɪm/ , 完整镜像的精简版本，通常只安装运行特定工具所需的最小包

## bookworm/bullseye/stretch/jessie/buster

- Bookworm：/ˈbʊkwɜːrm/
- Bullseye：/ˈbʊlzaɪ/
- Stretch：/stretʃ/
- Jessie：/ˈdʒesi/
- Buster：/ˈbʌstər/

带有bullseye、bookworm、stretch、buster或jessie标签的镜像是不同Debian版本的代号。稳定的Debian版本是12，其代号是Bookworm。 Bullseye是Debian 11。Buster是 10。Stretch是所有版本9变体的代号，Jessie是所有版本8变体的代号。

## slim-bookworm/slim-bullseye

将slim与特定Debian版本结合时，会得到一个只包含运行该特定版本操作系统所需最基本文件的slim版本。

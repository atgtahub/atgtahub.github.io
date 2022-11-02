---
layout: post
title:  使用jekyll搭建博客
categories: jekyll
tag: jekyll
topping: true
---


* content
{:toc}


## 需要的环境

- <a href="https://zh.wikipedia.org/wiki/Git" target="_blank">git</a>：一个开源的分布式版本控制系统 
- <a href="https://github.com" target="_blank">github</a>账号：GitHub是一个面向开源及私有软件项目的托管平台
- <a href="https://zh.wikipedia.org/wiki/Ruby" target="_blank">Ruby</a>：一种简单快捷的面向对象（面向对象程序设计）脚本语言
- DEVKIT：windows平台下编译和使用本地C/C++扩展包的工具
- <a href="http://jekyllcn.com/" target="_blank">jekyll</a>：一个简单的免费的Blog生成工具



## 安装GIt

### 下载链接

<a href="https://github.com/git-for-windows/git/releases/download/v2.35.1.windows.2/Git-2.35.1.2-64-bit.exe" target="_blank">点击即可下载</a>

### 官网地址

<a href="https://git-scm.com" target="_blank">https://git-scm.com</a>

### 点击Downloads

![1649036843](/styles/images/use-jekyll-to-build-blog/1649036843.jpg)


### 选择Windows

![1649036881(1)](/styles/images/use-jekyll-to-build-blog/1649036881(1).jpg)

### 选择32位或64位操作系统

![1649037069(1)](/styles/images/use-jekyll-to-build-blog/1649037069(1).jpg)

### 安装

#### 双击打开Git-2.23.0-64-bit.exe，点击next

![1649037304(1)](/styles/images/use-jekyll-to-build-blog/1649037304(1).jpg)

#### 选择安装目录后一直next

![1649037529(1)](/styles/images/use-jekyll-to-build-blog/1649037529(1).jpg)

#### 安装完成后win+R快捷键打开dos窗口

![1649037706(1)](/styles/images/use-jekyll-to-build-blog/1649037706(1).jpg)

#### 输入命令

```sh
git version
```

![1649037781(1)](/styles/images/use-jekyll-to-build-blog/1649037781(1).jpg)



## 注册Github

<a href="https://github.com" target="_blank">https://github.com</a>

### 点击Sign up进行注册

![1649037948(1)](/styles/images/use-jekyll-to-build-blog/1649037948(1).jpg)

### 输入邮箱、密码和用户名(仅可使用英文大小写+数字)，是否通过电子邮件接收产品更新和公告吗？输入y或n，点击continue，过一下人机验证点击create account

![1649038518(1)](/styles/images/use-jekyll-to-build-blog/1649038518(1).jpg)

### 登录邮箱查看验证码，填写

![1649038810(1)](/styles/images/use-jekyll-to-build-blog/1649038810(1).jpg)

![1649038876(1)](/styles/images/use-jekyll-to-build-blog/1649038876(1).jpg)

![1649039048(1)](/styles/images/use-jekyll-to-build-blog/1649039048(1).jpg)

### 新建一个仓库

![1649039228(1)](/styles/images/use-jekyll-to-build-blog/1649039228(1).jpg)

### 仓库名称为: 账号名.github.io，公共仓库，初始化添加一个readme.md文件

![1649039561(1)](/styles/images/use-jekyll-to-build-blog/1649039561(1).jpg)

### 配置ssh key

#### 在桌面鼠标右击选择Git Bash Here

![1649040647(1)](/styles/images/use-jekyll-to-build-blog/1649040647(1).jpg)



#### 输入命令生成密钥

##### 生成密钥

youremail@example.com改成注册github时的邮箱账号，然后会有三次回车

```sh
ssh-keygen -t rsa -C "youremail@example.com"
```


##### 查看密钥文件

```sh
cat ~/.ssh/id_rsa.pub
```

查看列表
```sh
ls -al ~/.ssh
```


##### ~~如果~/.ssh目录下已经有密钥文件，则可以使用指定文件路径的方式去生成~~

```sh
ssh-keygen -t ed25519 -C "your_email@example.com" -f "$HOME\.ssh\dir\id_ed25519"
```

#### ~~将 SSH 密钥添加到 ssh-agent~~

```sh
ssh-agent bash --login -i
```

```sh
ssh-add ~/.ssh/id_ed25519
```

#### 点击头像选择settings

![1649039798(1)](/styles/images/use-jekyll-to-build-blog/1649039798(1).jpg)

![1649039902(1)](/styles/images/use-jekyll-to-build-blog/1649039902(1).jpg)

#### 选择添加一个密钥

![1649040975(1)](/styles/images/use-jekyll-to-build-blog/1649040975(1).jpg)

#### 随便输入一个标题，使用文本编辑器打开id_rsa.pub文件将里面的内容复制粘贴到Key的文本框中，点击Add SSH Key

![1649041051(1)](/styles/images/use-jekyll-to-build-blog/1649041051(1).jpg)

#### 测试连接

```sh
ssh -T git@github.com
```

### 使用git

#### 回到主页点击左侧边栏刚刚创建的仓库，复制仓库地址SSH链接

![1649041409(1)](/styles/images/use-jekyll-to-build-blog/1649041409(1).jpg)

#### 回到桌面，右键打开Git Bash Here

**输入命令将此项目clone到本地，后面的仓库地址替换掉**

```sh
git clone git@github.com:username/username.github.io.git
```

#### 打开clone下来的仓库目录，右键新建一个文件，随便写几个字

![1649041736(1)](/styles/images/use-jekyll-to-build-blog/1649041736(1).jpg)

#### 将文件提交到本地仓库

添加到暂存区

```sh
git add .
或
git add xx.txt
```

查看状态

```sh
git status
```

提交本地仓库

```sh
git commit -m "注释"
```

#### 推送到远程仓库查看

```sh
git push
```

#### 附加文档
- 参考：<a href="https://blog.csdn.net/qq934235475/article/details/119794518" target="_blank">https://blog.csdn.net/qq934235475/article/details/119794518</a>
- ~~两种验证方式：<a href="https://www.cnblogs.com/sober-orange/p/git-token-push.html" target="_blank">https://www.cnblogs.com/sober-orange/p/git-token-push.html</a>~~
- ~~官方文档：<a href="https://docs.github.com/cn/authentication/connecting-to-github-with-ssh" target="_blank">https://docs.github.com/cn/authentication/connecting-to-github-with-ssh</a>~~

## 安装Ruby

- 官方下载地址：<a href="https://rubyinstaller.org/downloads/" target="_blank">https://rubyinstaller.org/downloads/</a>请选择WITH DEVKIT下的安装包

- 三方地址：<a href="http://www.uzzf.com/soft/708115.html" target="_blank">http://www.uzzf.com/soft/708115.html</a>

### 双击运行rubyinstaller-devkit-3.0.2-1-x64.exe

#### 选择I accept the License

![1649044104(1)](/styles/images/use-jekyll-to-build-blog/1649044104(1).jpg)

#### 选择安装目录，install、下一步即可

![1649044143(1)](/styles/images/use-jekyll-to-build-blog/1649044143(1).jpg)

#### 安装验证

- 验证ruby

```sh
ruby -v
```

- 验证gem

```sh
gem -v
```

#### ~~修改gem镜像源~~

- 淘宝镜像源：https://ruby.taobao.org/
- 其他：https://gems.ruby-china.org/

```sh
gem sources --add https://ruby.taobao.org/ --remove https://rubygems.org/
```

```sh
gem sources -l
```

~~更新gem~~

```sh
gem update --system
```

## 安装jeklly

安装

```sh
gem install jekyll
```

验证

```sh
jekyll -v
```

```
bundle -v
```



### 使用jekyll

#### 随便找个文件夹在窗口栏输入cmd打开

![1649045277(1)](/styles/images/use-jekyll-to-build-blog/1649045277(1).jpg)

#### 输入命令新建博客

```sh
jekyll new blog
```

![1649045472(1)](/styles/images/use-jekyll-to-build-blog/1649045472(1).jpg)

#### 运行

切换目录

```sh
cd blog
```

```sh
jekyll server
```

![1649045523](/styles/images/use-jekyll-to-build-blog/1649045523.jpg)

#### 报错先运行此命令再重新运行

```sh
bundle add webrick
```

#### 启动成功在浏览器访问<a href="http://127.0.0.1:4000" target="_blank">127.0.0.1:4000</a>

![1649045648(1)](/styles/images/use-jekyll-to-build-blog/1649045648(1).jpg)

#### 附加其他报错参考：<a href="https://blog.csdn.net/wudalang_gd/article/details/74619791" target="_blank">https://blog.csdn.net/wudalang_gd/article/details/74619791</a>

## 推送远程地址

- 将blog下的文件拷贝到clone的本地仓库目录下
- git add . 命令将所有文件添加到暂存区
- git commit -m "注释" 命令将文件提交到本地仓库
- 最后使用git push命令推送到远程地址
- 访问 username.github.io 即可成功看到博客页面，username替换为自己的用户名

### 主题

jekyll 主题：<a href="http://jekyllthemes.org/" target="_blank">http://jekyllthemes.org/</a>

选择一款合适的博客主题，将仓库clone到本地，除了.git和.github，其他文件复制到自己的本地仓库目录下

使用jekyll server 命令运行，再推送到远程仓库即可
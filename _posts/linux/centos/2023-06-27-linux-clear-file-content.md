---
layout: post
title:  Linux清空文件内容
categories: linux
tag: centos
---


* content
{:toc}



## echo

```sh
echo > file
```

## vi


### 方式一：命令行模式

```sh
vi file

:%d
```

### 方式二：普通模式

```sh
vi file

# 键盘组合 d + G（shift + g）
# 描述：d为删除，大写G为光标跳转到末尾行
```


## 测试

打开终端

```sh
# 写入100行到文件中
for i in {1..100};
do echo "a b c" >> file
done

# 查看文件行数
wc file

100     300     600 file
```

- 100：行数
- 300：字数
- 600：字节大小

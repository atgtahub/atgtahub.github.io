---
layout: post
title:  Linux学习（02 Shell篇）
categories: linux
tag: centos
---


* content
{:toc}


## Shell概述

Shell是一个命令行解释器，它接受应用程序/用户命令，然后调用操作系统内核<br/>Shell还是一个功能相当强大的编程语言，易编写、易调试、灵活性强



### 查看Linux提供的Shell解析器

```sh
cat /etc/shells
```



### bash和sh的关系

```sh
ls -l /bin/ | grep bash

-rwxr-xr-x.   1 root root      971768 11月 25 2021 bash
lrwxrwxrwx.   1 root root          10 12月  4 17:59 bashbug -> bashbug-64
-rwxr-xr-x.   1 root root        6948 11月 25 2021 bashbug-64
lrwxrwxrwx.   1 root root           4 12月  4 17:59 sh -> bash
```



### CentOS默认的解析器是bash

```sh
echo $0
-bash

echo $SHELL
/bin/bash
```



## Shell脚本入门

### 脚本格式

脚本以 `#!/bin/bash` 开头（指定解析器）



### helloworld.sh

#### 创建一个Shell脚本

```sh
touch ~/helloworld.sh
```

#### 输入内容

```sh
#!/bin/bash
echo "hello world"
```

#### 脚本的常用执行方式

##### 1）bash或sh

采用bash或sh+脚本的相对路径或绝对路径（不用赋予脚本+x权限）<br/>sh+脚本的相对路径

```sh
sh ./helloworld.sh
```

sh+脚本的绝对路径

```sh
sh /root/scripts/helloworld.sh
```

bash+脚本的相对路径

```sh
bash ./helloworld.sh
```

bash+脚本的绝对路径

```sh
bash /root/scripts/helloworld.sh
```



##### 2）直接执行

采用输入脚本的绝对路径或相对路径执行脚本（必须具有可执行权限+x）<br/>首先要赋予helloworld.sh脚本+x权限

```sh
chmod +x helloworld.sh
```

执行脚本相对路径

```sh
./helloworld.sh
```

绝对路径

```sh
/root/scripts/helloworld.sh
```

注意：**第一种执行方法，本质是 bash 解析器帮你执行脚本，所以脚本本身不需要执行权限。第二种执行方法，本质是脚本需要自己执行，所以需要执行权限。**

##### 3）使用“.”或者source

在脚本的路径前加上“.”或者source<br/>

test.sh

```sh
#!/bin/bash
A=5
echo $A
```

使用sh、bash、./和 . 的方式来执行

```sh
[root@localhost scripts]# bash test.sh
[root@localhost scripts]# echo $A

[root@localhost scripts]# sh test.sh
[root@localhost scripts]# echo $A

[root@localhost scripts]# ./test.sh
[root@localhost scripts]# echo $A

[root@localhost scripts]# . test.sh
[root@localhost scripts]# echo $A
5
```

原因：前两种方式都是在当前shell中打开一个子shell来执行脚本内容，当脚本内容结束，则子shell关闭，回到父shell中<br/>第三中，也就是使用在脚本路径前加“.”或者source的方式，可以使脚本内容在当前shell里执行，而无需打开子shell，这也是为什么每次修改完/etc/profile文件以后，需要source一下的原因<br/>开子shell与不开shell的区别就在于，环境变量的继承关系，如在子shell中设置的当前变量，父shell是不可见的



## 变量



### 系统预定义变量

#### 常用系统变量

```tex
$HOME、$PWD、$SHELL、$USER等
```

#### 查看系统变量的值

```sh
echo $HOME
```

#### 显示当前shell中所有变量

```sh
set
```



### 自定义变量

#### 基本语法

- 定义变量：变量名=变量值，**注意，=号前后不能有空格**
- 撤销变量：unset 变量名
- 声明静态变量：readonly 变量，**注意：不能unset**



#### 变量定义规则

- 变量名称可以由字母、数字和下划线组成，但是不能以数字开头，环境变量名建议大写
- 等号两侧不能有空格
- 在bash中，变量默认类型都是字符串类型，无法直接进行数值运算
- 变量的值如果有空格，需要使用双引号或单引号括起来



#### 案例实操

##### 定义变量A

```sh
A=5
```

##### 给变量A重新赋值

```sh
A=8
```

##### 撤销变量A

```sh
unset A
```

##### 声明静态的变量B=2，不能unset

```sh
readonly B=2
```

##### 在bash中，变量默认类型都是字符串类型，无法直接进行数值运算

```sh
C=1+2
echo $C
1+2
```

##### 变量的值如果有空格，需要使用双引号或单引号括起来

```sh
D="hello world"
```

##### 可把变量提升为全局环境变量，可供其他Shell程序使用

```sh
export 变量名
```



### 特殊变量

#### $n

##### 基本语法

```sh
$n（功能描述：n为数字，$0代表该脚本名称，$1-$9代表第一到第九个参数，十以上的参数需要大括号包含，例如${10}）
```

##### 案例实操

```sh
[root@localhost scripts]# touch param.sh
[root@localhost scripts]# vim param
#!/bin/bash
echo $0
echo $1
echo $2
[root@localhost scripts]# chmod +x param.sh
[root@localhost scripts]# ./param.sh
./param.sh
aa
bb
```



#### $#

##### 基本语法

```sh
$#（功能描述：获取所有输入参数个数，常用于循环，判断参数的个数是否正确以及加强脚本的健壮性）
```

##### 案例实操

```sh
[root@localhost scripts]# vim param.sh
#!/bin/bash

echo $0
echo $1
echo $#
[root@localhost scripts]# ./param.sh aa
./param.sh
aa
1
```



#### $*、$@

##### 基本语法

```sh
$*（功能描述：这个变量代表命令行中所有的参数，$*把所有的参数看成一个整体）
$@（功能描述：这个变量代表命令行中所有的参数，不过$@把每个参数区分对待）
```

##### 案例实操

```sh
[root@localhost scripts]# vim param.sh
#!/bin/bash

echo $0
echo $1
echo $*
echo $@
[root@localhost scripts]# ./param.sh a b c d e f g
./param.sh
a
a b c d e f g
a b c d e f g
```



#### $?

##### 基本语法

```sh
$?（功能描述：最后一次执行的命令的返回状态。如果这个变量的值为0，证明上一个命令正确执行；如果这个变量的值为非0（具体是哪个数，由命令自己来决定），则证明上一个命令执行不正确）
```

##### 案例实操

```sh
[root@localhost scripts]# ./helloworld.sh
helloworld
[root@localhost scripts]# echo $?
0
```



## 运算符

### 基本语法

```sh
$((运算式)) 或 $[运算式]
```



### 案例实操

```sh
[root@localhost scripts]# S=$[(2+3)*4]
[root@localhost scripts]# echo $S
20
```



## 条件判断

### 基本语法

- test condition
- [ condition ]（**注意condition前后要有空格**）
- 条件非空即为true，[ hello ]返回true，[  ]返回false



### 常用判断条件

- 两个整数之间比较
  - -eq等于（equal）
  - -ne不等于（not equal）
  - -lt小于（less than）
  - -le小于等于（less equal）
  - -gt大于（greater than）
  - -ge大于等于（greater equal）
  - 如果是字符串之间的比较，用等号“=”判断相等，用“!=”判断不等
- 按照文件权限进行判断
  - -r 有读的权限（read）
  - -w 有写的权限（write）
  - -x 有执行的权限（execute）
- 按照文件类型进行判断
  - -e文件存在（existence）
  - -f文件存在并且是一个常规的文件（file）
  - -d文件存在并且是一个目录（directory）
- 判断是否为空
  - -z


### 案例实操

#### 数值判断

```sh
[root@localhost scripts]# [ 23 -ge 22 ]
echo $?
0
```

#### 权限判断

```sh
[root@localhost scripts]# [ -w helloworld.sh ]
echo $?
0
```

#### 判断文件是否存在

```sh
[root@localhost scripts]# [ -e hello.sh ]
[root@localhost scripts]# echo $?
1
```

#### 多条件判断

&&表示前一条命令执行成功时，才执行后一条命令，||表示上一条命令执行失败后，才执行下一条命令

```sh
[ helloworld ] && echo OK || echo notOK
OK
[  ] && echo OK || echo notOK
notOk
```





## 流程控制



### if判断

#### 基本语法

##### 单分支

```sh
if [ 条件判断式 ];then
	程序
fi
```

```sh
if [ 条件判断式 ]
then
	程序
fi
```

##### 多分支

```sh
if [ 条件判断式 ]
then
	程序
elif [ 条件判断式 ]
then
	程序
else
	程序
fi
```

##### 注意事项

- [ 条件判断式 ]，中括号和条件判断式之间必须有空格
- if后要有空格
- -a（and）：if [ true -a true ]
- -o（or）：if [ true -o false ]



#### 案例实操

输入一个数字，如果是1，则输出hello，如果是2，则输出world，如果为其他，什么都不输出

```sh
[root@localhost scripts]# vim if.sh
#!/bin/bash

if [ $1 -eq 1 ]
then
	echo "hello"
elif [ $1 -eq 2 ]
then
	echo "world"
fi
[root@localhost scripts]# chmod u+x if.sh
[root@localhost scripts]# ./if.sh 1
hello
[root@localhost scripts]# ./if.sh 2
world
[root@localhost scripts]# ./if.sh 3
```



### case语句

#### 基本语法

```sh
case $变量名 in
"值1")
	如果变量的值等于值1，则执行程序1
;;
"值2")
	如果变量的值等于值2，则执行程序2
;;
*)
	如果变量的值都不是以上的值，则执行此程序
;;
esac
```

注意事项： 

- （1）case 行尾必须为单词“in”，每一个模式匹配必须以右括号“）”结束。 

- （2）双分号“**;;**”表示命令序列结束，相当于 java 中的 break。 

- （3）最后的“*）”表示默认模式，相当于 java 中的 default。



#### 案例实操

输入一个数字，如果是 1，则输出 hello，如果是 2，则输出 world，如果是其它，输出helloworld

```sh
[root@localhost scripts]# vi case.sh
#!/bin/bash

case $1 in
"1")
	echo "hello"
;;
"2")
	echo "world"
;;
*)
	echo "hello world"
;;
esac
[root@localhost scripts]# chmod u+x case.sh
[root@localhost scripts]# ./case.sh 1
hello
[root@localhost scripts]# ./case.sh 2
world
[root@localhost scripts]# ./case.sh 3
hello world
```



### for循环

#### 基本语法

```sh
for ((初始值;循环控制条件;变量变化))
do
	程序
done
```



#### 案例实操

从1加到100

```sh
[root@localhost scripts]# vi for1.sh
#!/bin/bash

sum=0
for((i=0;i<=100;i++))
do
	sum=$[$sum+$i]
done
echo $sum
[root@localhost scripts]# chmod u+x for1.sh
[root@localhost scripts]# ./for1.sh
5050
```



#### 基本语法2

```sh
for 变量 in 值1 值2 值3...
do
	程序
done
```

#### 案例实操

##### 打印所有参数

```sh
[root@localhost scripts]# vi for2.sh
#!/bin/bash

for i in a b c
do
	echo "haha $i"
done
[root@localhost scripts]# chmod u+x for2.sh
[root@localhost scripts]# ./for2.sh
haha a
haha b
haha c
```

##### 比较$*和$@区别

$*和$@都表示传递给函数或脚本的所有参数，不被双引号“”包含时，都以$1 $2 …$n的形式输出所有参数

```sh
[root@localhost scripts]# vi for3.sh
#!/bin/bash

echo '---------$*-----------'
for i in $*
do
	echo "hello $i"
done

echo '----------$@----------'
for j in $@
do
	echo "hello $j"
done
[root@localhost scripts]# chmod u+x for3.sh
[root@localhost scripts]# ./for3.sh a b
---------$*-----------
hello a
hello b
----------$@----------
hello a
hello b
```

当它们被双引号“”包含时，$*会将所有的参数作为一个整体，以“$1 $2 …$n”的形式输出所有参数；$@会将各个参数分开，以“$1” “$2”…“$n”的形式输出所有参数

```sh
[root@localhost scripts]# vi for4.sh
#!/bin/bash

echo '---------$*-----------'
# $*中的所有参数看成是一个整体，所以这个for循环只会循环一次
for i in "$*"
do
	echo "hello $i"
done

echo '----------$@----------'
# $@中的每个参数都看成是独立的，所以$@中有几个参数，就会循环几次
for j in $@
do
	echo "hello $j"
done
[root@localhost scripts]# chmod u+x for4.sh
[root@localhost scripts]# ./for4.sh a b c
---------$*-----------
hello a b c
----------$@----------
hello a
hello b
hello c
```



### while循环

#### 基本语法

```sh
while [ 条件判断式 ]
do
	程序
done
```

#### 实操案例

从1加到100

```sh
[root@localhost scripts]# vi while.sh
#!/bin/bash

sum=0
i=1
while [ $i -le 100 ]
do
	sum=$[$sum+$i]
	i=$[$i+1]
	#let sum+=i
	#let i+=1
done

echo $sum
[root@localhost scripts]# chmod u+x while.sh
[root@localhost scripts]# ./while.sh
5050
```



## read读取控制台输入

### 基本语法

```sh
read (选项) (参数)
```

- 选项
  - -p：指定读取值时的提示符
  - -t：指定读取值时等待的时间（秒）如果-t不加表示一直等待
- 参数
  - 变量：指定读取值的变量名



### 案例实操

提示7秒内，读取控制台输入的名称

```sh
[root@localhost scripts]# vi read.sh
#!/bin/bash

read -t 7 -p "Enter your name in 7 seconds :" NN
echo $NN
[root@localhost scripts]# chmod u+x read.sh
[root@localhost scripts]# ./read.sh
Enter your name in 7 seconds :haha
haha
```



## 函数



### 系统函数

#### basename

##### 基本语法

```sh
basename [string/pathname] [suffix](功能描述：basename命令会删掉所有的前缀包括最后一个（‘/’）字符，然后将字符串显示出来，basename可以理解为取路径里的文件名称)
选项：suffix为后缀，如果suffix被指定里，basename会将pathname或string中的suffix去掉
```

##### 案例实操

截取文件名称

```sh
[root@localhost ~]# basename hello.txt .txt
hello
```



#### dirname

##### 基本语法

```sh
dirname 文件绝对路径 （功能描述：从给定的包含绝对路径的文件名中去除文件名 （非目录的部分），然后返回剩下的路径（目录的部分）） dirname 可以理解为取文件路径的绝对路径名称
```

##### 案例实操

获取文件路径

```sh
[root@localhost ~]# dirname ~/hello.txt
/root
```



### 自定义函数

#### 基本语法

```sh
[ function ] funname[()]
{
	Action;
	[return int;]
}
```

#### 经验技巧

- 必须在调用函数地方之前，先声明函数，shell 脚本是逐行运行。不会像其它语言一样先编译。 

- 函数返回值，只能通过$?系统变量获得，可以显示加：return 返回，如果不加，将以最后一条命令运行结果，作为返回值。return 后跟数值 n(0-255)

#### 案例实操

计算两个输入参数的和

```sh
[root@localhost ~]# vi fun.sj
#!/bin/bash

function sum()
{
	s=0
	s=$[$1+$2]
	echo "$s"
}

read -p "Please input the number1:" n1;
read -p "Please input the number2:" n2;
sum $n1 $n2;
[root@localhost ~]# chmod u+x fun.sh
[root@localhost ~]# ./fun.sh
Please input the number1:2
Please input the number2:5
7
```



## 正则表达式入门

正则表达式使用单个字符串来描述、匹配一系列符合某个语法规则的字符串。在很多文本编辑器里，正则表达式通常被用来检索、替换那些符合某个模式的文本。在 Linux 中，grep，sed，awk 等文本处理工具都支持通过正则表达式进行模式匹配。



### 常规匹配

一串不包含特殊字符的正则表达式匹配它自己

```sh
[root@localhost ~]# cat /etc/passwd | grep root
root:x:0:0:root:/root:/bin/bash
operator:x:11:0:operator:/root:/sbin/nologin
```



### 常用特殊字符



#### 特殊字符：^

^匹配一行的开头，匹配所有以a开头的行

```sh
[root@localhost ~]# cat /etc/passwd | grep ^a
adm:x:3:4:adm:/var/adm:/sbin/nologin
```



#### 特殊字符：$

$匹配一行的结束，匹配所有以t结尾的行

```sh
[root@localhost ~]# cat /etc/passwd | grep t$
halt:x:7:0:halt:/sbin:/sbin/halt
```



#### 特殊字符：.

.匹配一个任意的字符，匹配包含 rabt,rbbt,rxdt,root 等的所有行

```sh
[root@localhost ~]# cat /etc/passwd | grep r..t
root:x:0:0:root:/root:/bin/bash
operator:x:11:0:operator:/root:/sbin/nologin
ftp:x:14:50:FTP User:/var/ftp:/sbin/nologin
```



#### 特殊字符：*

\* 不单独使用，他和上一个字符连用，表示匹配上一个字符 0 次或多次，会匹配 rt, rot, root, rooot, roooot 等所有行

```sh
[root@localhost ~]# cat /etc/passwd | grep ro*t
root:x:0:0:root:/root:/bin/bash
operator:x:11:0:operator:/root:/sbin/nologin
```



#### 字符区间（中括号）：[]

[]表示匹配某个范围内的一个字符

- [6,8]------匹配 6 或者 8 

- [0-9]------匹配一个 0-9 的数字 

- [0-9]*------匹配任意长度的数字字符串 

- [a-z]------匹配一个 a-z 之间的字符 

- [a-z]* ------匹配任意长度的字母字符串 

- [a-c, e-f]-匹配 a-c 或者 e-f 之间的任意字符

匹配 rt,rat, rbt, rabt, rbact,rabccbaaacbt 等等所有行 

```sh
[root@localhost ~]# cat /etc/passwd | grep r[a,b,c]*t
operator:x:11:0:operator:/root:/sbin/nologin
sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin
```



#### 特殊字符：\

\ 表示转义，并不会单独使用。由于所有特殊字符都有其特定匹配模式，当我们想匹配某一特殊字符本身时（例如，我想找出所有包含 '$' 的行），就会碰到困难。此时我们就要将转义字符和特殊字符连用，来表示特殊字符本身<br/>匹配所有包含 a$b 的行。注意需要使用单引号将表达式引起来

```sh
[root@localhost ~]# cat /etc/passwd | grep 'a\$b'
```



## 文本处理工具



### cut

cut 的工作就是“剪”，具体的说就是在文件中负责剪切数据用的。cut 命令从文件的每一行剪切字节、字符和字段并将这些字节、字符和字段输出



#### 基本用法

```sh
cut [选项参数] filename（默认分隔符是制表符）
```

#### 选项参数说明

| 选项参数 | 功能                                           |
| -------- | ---------------------------------------------- |
| -f       | 列号，提取第几列                               |
| -d       | 分隔符，按照指定分隔符分隔列，默认是制表符“\t” |
| -c       | 按字符进行切割后加n表示取第几列，比如：-c 1    |

#### 案例实操

数据准备

```sh
[root@localhost scripts]# vi cut.txt
dong shen
guan zhen
wo wo
lai lai
le le
```

切割第一列

```sh
[root@localhost scripts]# cut -d " " -f 1 cut.txt
dong
guan
wo
lai
le
```

切割第二、三列

```sh
[root@localhost scripts]# cut -d " " -f 2,3 cut.txt
shen
zhen
wo
lai
le
```

切割出guan

```sh
[root@localhost scripts]# cat cut.txt | grep guan | cut -d " " -f 1
guan
```

选取系统PATH变量值，第二个“：”开始后的所有路径

```sh
[root@localhost scripts]# echo $PATH | cut -d ":" -f 3-
/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
```

切割ifconfig后打印的ip地址

```sh
[root@localhost scripts]# ifconfig eth0 | grep netmask | cut -d " " -f 10
192.168.64.2
```



### awk

一个强大的文本分析工具，把文件逐行的读入，以空格为默认分隔符将每行切片，切开的部分再进行分析处理。

#### 基本用法

```sh
awk [选项参数] ‘/pattern1/{action1} /pattern2/{action2}...’ filename
pattern：表示 awk 在数据中查找的内容，就是匹配模式
action：在找到匹配内容时所执行的一系列命令
```

#### 选项参数说明

| 选项参数 | 功能                 |
| -------- | -------------------- |
| -F       | 指定输入文件分隔符   |
| -v       | 赋值一个用户定义变量 |

#### 案例实操

数据准备

```sh
[root@localhost scripts]# cp /etc/passwd ./
```

搜索passwd文件以root关键字开头的所有行，并输出该行的第7列

```sh
[root@localhost scripts]# awk -F : '/^root/{print $7}' passwd
/bin/bash
```

搜索passwd文件以root关键字开头的所有行，并输出该行的第1列和第7列，中间以“，”号分割

```sh
[root@localhost scripts]# awk -F : '/^root/{print $1","$7}' passwd
root,/bin/bash
```

只显示/etc/passwd的第一列和第七列，以逗号分割，且在所有行前面添加列名user，shell在最后一行添加“hello，/bin/helloworld”

```sh
[root@localhost scripts]# awk -F : 'BEGIN{print "user, shell"} {print $1","$7} END{print "hello,/bin/helloworld"}' passwd
user, shell
root,/bin/bash
bin,/sbin/nologin
daemon,/sbin/nologin
adm,/sbin/nologin
lp,/sbin/nologin
sync,/bin/sync
shutdown,/sbin/shutdown
halt,/sbin/halt
mail,/sbin/nologin
operator,/sbin/nologin
games,/sbin/nologin
ftp,/sbin/nologin
nobody,/sbin/nologin
systemd-network,/sbin/nologin
dbus,/sbin/nologin
polkitd,/sbin/nologin
sshd,/sbin/nologin
postfix,/sbin/nologin
chrony,/sbin/nologin
hello,/bin/helloworld
```

注意：BEGIN在所有数据读取行之前执行；END在所有数据执行之后执行

将passwd文件中的用户id增加数值1并输出

```sh
[root@localhost scripts]# awk -v i=1 -F : '{print $3+i}' passwd
1
2
3
4
5
6
7
8
9
12
13
15
100
193
82
1000
75
90
999
```

#### awk内置变量

| 变量     | 说明                                   |
| -------- | -------------------------------------- |
| FILENAME | 文件名                                 |
| NR       | 已读的记录数（行号）                   |
| NF       | 浏览记录的域的个数（切割后，列的个数） |

#### 案例实操

统计passwd文件名，每行的行号，每行的列数

```sh
[root@localhost scripts]# awk -F : '{print "filename:" FILENAME ",linenum:" NR ",col:" NF}' passwd
filename:passwd,linenum:1,col:7
filename:passwd,linenum:2,col:7
filename:passwd,linenum:3,col:7
filename:passwd,linenum:4,col:7
filename:passwd,linenum:5,col:7
filename:passwd,linenum:6,col:7
filename:passwd,linenum:7,col:7
filename:passwd,linenum:8,col:7
filename:passwd,linenum:9,col:7
filename:passwd,linenum:10,col:7
filename:passwd,linenum:11,col:7
filename:passwd,linenum:12,col:7
filename:passwd,linenum:13,col:7
filename:passwd,linenum:14,col:7
filename:passwd,linenum:15,col:7
filename:passwd,linenum:16,col:7
filename:passwd,linenum:17,col:7
filename:passwd,linenum:18,col:7
filename:passwd,linenum:19,col:7
```

查询ifconfig命令输出结果中的空行所在的行号

```sh
[root@localhost scripts]# ifconfig | awk '/^$/{print NR}'
9
19
28
36
44
52
60
68
76
```

切割IP

```sh
[root@localhost scripts]# ifconfig eth0 | awk '/netmask/ {print $2}'
192.168.64.2
```


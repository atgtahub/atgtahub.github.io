---
layout: post
title:  Python学习（01）
categories: python
tag: python3
---


* content
{:toc}




## Python简介

Python 是一个高层次的结合了解释性、编译性、互动性和面向对象的脚本语言。

Python 的设计具有很强的可读性，相比其他语言经常使用英文关键字，其他语言的一些标点符号，它具有比其他语言更有特色语法结构。

- **Python 是一种解释型语言：** 这意味着开发过程中没有了编译这个环节。类似于PHP和Perl语言。
- **Python 是交互式语言：** 这意味着，您可以在一个 Python 提示符 >>> 后直接执行代码。
- **Python 是面向对象语言:** 这意味着Python支持面向对象的风格或代码封装在对象的编程技术。
- **Python 是初学者的语言：**Python 对初级程序员而言，是一种伟大的语言，它支持广泛的应用程序开发，从简单的文字处理到 WWW 浏览器再到游戏。

### Python特点

- **1.易于学习：**Python有相对较少的关键字，结构简单，和一个明确定义的语法，学习起来更加简单。
- **2.易于阅读：**Python代码定义的更清晰。
- **3.易于维护：**Python的成功在于它的源代码是相当容易维护的。
- **4.一个广泛的标准库：**Python的最大的优势之一是丰富的库，跨平台的，在UNIX，Windows和Macintosh兼容很好。
- **5.互动模式：**互动模式的支持，您可以从终端输入执行代码并获得结果的语言，互动的测试和调试代码片断。
- **6.可移植：**基于其开放源代码的特性，Python已经被移植（也就是使其工作）到许多平台。
- **7.可扩展：**如果你需要一段运行很快的关键代码，或者是想要编写一些不愿开放的算法，你可以使用C或C++完成那部分程序，然后从你的Python程序中调用。
- **8.数据库：**Python提供所有主要的商业数据库的接口。
- **9.GUI编程：**Python支持GUI可以创建和移植到许多系统调用。
- **10.可嵌入:** 你可以将Python嵌入到C/C++程序，让你的程序的用户获得"脚本化"的能力。



## Python下载

下载地址：https://www.python.org/downloads/

```sh
# 查看python3版本
python3 -V
Python 3.8.9
```

### PyCharm下载

下载地址：https://www.jetbrains.com/pycharm/download/



## Python中的输出函数

### print()函数

可以直接使用的函数叫`print()`，直接将展示东西输出在控制台

- 向计算机发出打印指令
- 把代码编译成计算机能听懂的机器语言
- 做出相应的执行，在控制台上输出结果

```python
print('hello world')
```

### print()函数的使用

#### print()函数可以输出哪些内容

- print()函数输出的内容可以是数字
- print()函数输出的内容可以是字符串
- print()函数输出的内容可以是含有运算符的表达式



#### print()函数可以将内容输出的目的地

- 显示器
- 文件



#### print()函数的输出形式

- 换行
- 不换行



### 代码

```python
# 输出数字
print(520)
print(98.5)

# 输出字符串
# 单引号
print('hello world')
# 双引号
print("hello world")
# 三引号
print("""hello world""")

# 含有运算符的表达式
print(3 + 1)

# 将数据输出到文件中
_file = open('./text.txt', 'a+')
# a+：如果文件不存在就创建，存在就在文件内容的后面继续追加
print('hello world', file=_file)
_file.close()

# 不进行换行输出（输出内容在一行当中）
print('hello', 'world', 'Python')
```



## 转义字符

### 什么是转义字符

就是反斜杠 + 想要实现的转义功能首字母



### 为什么需要转义字符

当字符串中包含反斜杠、单引号和双引号等有特殊用途的字符时，必须使用反斜杠对这些字符进行转义（转换一个含义）

- 反斜杠：\\\\
- 单引号：\\'
- 双引号：\\"

当字符串中包含换行、回车，水平制表符或退格等无法直接表示的特殊字符时，也可以

使用转义字符

- 换行\\n newline光标移动到下一行到开头
- 回车\\r： return光标移动到本行的开头
- 水平制表符\\t：tab键，光标移动到下一组4个空格的开始处
- 退格\\b：键盘上的backspace键，回退一个字符



### 代码

```python
# 转义字符
# \ + 转义功能的首字母 n：newline的首字符表示换行
print('hello\nworld')
# 制表符
print('hello\tworld')
print('helloooo\tworld')
# 回车：world将hello进行了覆盖
print('hello\rworld')
# \b是退一个格，将o退没了
print('hello\bworld')

# 反斜杠转义
print('http:\\\\www.baidu.com')
print('你好：\'hello\'')

# 原字符，不希望字符串中的转义字符起作用，就使用原字符，就是在字符串之前加上r，或R
print(r'hello\nworld')
# 注意事项：原字符最后一个字符串不能是反斜杠
# print(r'hello\nworld\')
```



## 二进制与字符编码

### 代码

```python
# 十进制unicode
print(ord('乘'))

# 十进制转二进制
print(bin(ord('乘')))

# 二进制
print(chr(0b100111001011000))
```



## Python中的标识符和保留字

### 保留字

一些单词被赋予了特定的意义，这些单词在你给任何对象起名字的时候都不能用

```python
import keyword
print(keyword.kwlist)
```



### 命名规则

- 变量、函数、类、模块和其他对象起的名字叫做标识符

- 规则：

  - 字母、数字、下划线_
  - 不能以数字开头
  - 不能是保留字
  - 严格区分大小写
  - 变量名一般多个单词之前用下划线分割，类名用大驼峰命名法

  



## 变量

变量是内存中一个带标签的盒子

```python
# name变量名
# =复制运算符
# myname值
name = 'my name'
```

变量由三部分组成

- 标识：标识对象所存储的内存地址，使用内置函数`id(obj)`来获取
- 类型：表示的是对象的数据类型，使用内置函数`type(obj)`来获取
- 值：表示对象所存储的具体数据，使用`print(obj)`可以将值进行打印输出



### 代码

```python
name = 'my name'
print('标识', id(name))
print('类型', type(name))
print('值', name)
```



### 变量的定义和使用

当多次赋值之后，变量名会指向新的空间

```python
name = 'my name'
print('标识', id(name))
print('类型', type(name))
print('值', name)

print('---------')
name = 'new name'
print('标识', id(name))
print('类型', type(name))
print('值', name)

# 第一个数据5792没有被使用变成了内存垃圾
# 标识 4343655792
# 类型 <class 'str'>
# 值 my name
# ---------
# 标识 4343632112
# 类型 <class 'str'>
# 值 new name
```





## 数据类型

### 常用的数据类型

- 整数类型`int`：98
- 浮点数类型`float`：3.14159
- 布尔类型`bool`：True，False
- 字符串类型`str`：'人生苦短，我用Python'



### 整数类型

整数类型

- 英文为integer，简写为int，可以表示整数、负数和零
- 整数的不同进制表示方式
  - 十进制：默认的进制
  - 二进制：以0b开头
  - 八进制：以0o开头
  - 十六进制：0x开头



| 进制     | 基本数                                         | 逢几进一 | 表示形式  |
| -------- | ---------------------------------------------- | -------- | --------- |
| 十进制   | 0，1，2，3，4，5，6，7，8，9                   | 10       | 118       |
| 二进制   | 0，1                                           | 2        | 0b1110110 |
| 八进制   | 0，1，2，3，4，5，6，7                         | 8        | 0o166     |
| 十六进制 | 0，1，2，3，4，5，6，7，8，9，A，B，C，D，E，F | 16       | 0x76      |



#### 代码

```python
# 整数类型
# 可以表示，正数，负数，0
n1=90
n2=-76
n3=0
print(n1, type(n1))
print(n2, type(n2))
print(n3, type(n3))

# 整数可以表示为二进制，十进制，八进制，十六进制
print('十进制', 118)
print('二进制', 0b1110110)
print('八进制', 0o166)
print('十六进制', 0x76)
```



### 浮点类型

浮点类型

- 浮点数由整数部分和小数部分组成
- 浮点数存储不精确性
  - 使用浮点数进行计算时，可能会出现小数位数不确定的情况
  - 解决方案：导入模块decimal



#### 代码

```python
from decimal import Decimal

a=3.14159
print(a, type(a))

n1=1.1
n2=2.2
print(n1 + n2)

print(Decimal(n1.__str__()) + Decimal(n2.__str__()))
```



### 布尔类型

布尔类型

- 用来表示真或假的值
- True表示真，False表示假
- 布尔值可以转化为整数
  - True：1
  - False：0



#### 代码

```python
f1 = True
f2 = False

print(f1, type(f1))
print(f2, type(f2))

# 布尔值可以转成整数计算
print(f1 + 1)  # 1 + 1
print(f2 + 1)  # 0 + 1
```



### 字符串类型

字符串类型

- 字符串又被称为不可变的字符序列
- 可以使用单引号`' '`双引号`" "`三引号`‘’‘ ’‘’`或`""" """`来定义
- 单引号和双引号定义的字符串必须在一行
- 三引号定义的字符串可以分布在连续的多行



#### 代码

```python
str1 = '人生苦短，我用Python'
str2 = "人生苦短，我用Python"
str3 = """人生苦短，我用Python"""

str4='''人生苦短，我用Python'''

print(str1, type(str1))
print(str2, type(str2))
print(str3, type(str3))
print(str4, type(str4))
```



### 数据类型转换

为什么需要数据类型转换

- 需要将不同数据类型的数据拼接在一起



数据类型转换的函数

| 函数名  | 作用                     | 注意事项                                                     | 举例                      |
| ------- | ------------------------ | ------------------------------------------------------------ | ------------------------- |
| str()   | 将其他数据类型转成字符串 | 也可用引号转换                                               | str(123)<br/>'123'        |
| int()   | 将其他数据类型转成整数   | 1.文字类和小数类字符串，无法转化成整数<br/>2.浮点数转化成整数，抹零取整 | int('123')<br/>int(9.8)   |
| float() | 将其他数据类型转成浮点数 | 1.文字类无法转成小数<br/>2.整数转成浮点数，末尾为.0          | float('9.9')<br/>float(9) |



#### 代码

```python
name = '张三'
age = 20

print(type(name), type(age))  # 说明name与age的数据类型不相同
# print('我叫' + name + '今年,' + age + '岁')  # 将str类型与int类型进行连接时，报错，解决方案，类型转换
print('我叫' + name + '今年,' + str(age) + '岁')

print('-------------str()将其他类型转成str类型---------------')
a = 10
b = 198.8
c = False
print(type(a), type(b), type(c))
print(str(a), str(b), str(c))
print(type(str(a)), type(str(b)), type(str(c)))

print('-------------int()将其他类型转成int类型---------------')
s1 = '128'
s2 = '76.77'
s3 = 'hello'
f1 = 98.7
ff = True

print(type(s1), type(s2), type(s3), type(f1), type(ff))
print(int(s1), type(s1))  # 将str类型转成int类型，字符串为数字串
# print(int(s2), type(s2))  # 将str类型转成int类型，报错，因为字符串为小数字符串
# print(int(s3), type(s3))  # 将str类型转成int类型时，字符串必须为数字字符串（整数），非数字串不允许转换
print(int(f1), type(f1))  # float转成int类型，截取整数部分，舍掉小数部分
print(int(ff), type(ff))

print('-------------float()将其他类型转成float类型---------------')

s1 = '128.98'
s2 = '76'
s3 = 'hello'
ff = True
i = 98

print(type(s1), type(s2), type(s3), type(ff), type(i))
print(float(s1), type(float(s1)))
print(float(s2), type(float(s2)))
# print(float(s3), type(float(s3)))  # 字符串中的数据如果是非数字字符串，则不允许转换
print(float(ff), type(float(ff)))
print(float(i), type(float(i)))

```



## Python中的注释

注释

- 在代码中对代码的功能进行解释说明的标注性文字，可以提高代码的可读性
- 注释的内容会被Python解释器忽略
- 通常包括三种类型的注释
  - 单行注释：以`#`开头，直到换行结束
  - 多行注释：并没有单独的多行注释标记，将一对三引号之间的代码成为多行注释
  - 中文编码声明注释：在文件开头加上中文声明注释，用以指定源码文件的编码格式`# coding:gbk`



### 代码

```python
# coding:gbk

# 输入功能（单行注释）
print('hello')

'''
多行注释
'''
```



## Python的输入函数input()

### input函数的介绍

input函数

- 作用：接收来自用户的输入
- 返回值类型：输入值的类型为str
- 值的存储：使用=对输入的值进行存储



### input函数的基本使用

```python
# present：变量
# =：赋值运算符，将输入函数的结果赋值给变量
# input()是一个输入函数，需要输入回答
present = input('输入内容')
```



### 代码

```python
present = input('输入内容')
print(present, type(present))

a = int(input('输入一个加数'))
b = int(input('输入另一个加数'))

print(type(a), type(b))
print(a + b)
```



## Python中的运算符

### Python中常用的运算符

常用运算符

- 算术运算符
  - 标准算术运算符
    - 加（+）、减（-）、乘（*）、除（/）、整除（//）
  - 取余运算符
    - %
  - 幂运算符
    - **
- 赋值运算符
- 比较运算符
- 布尔运算符
- 位运算符



### 常用运算符

#### 标准算术运算符

| 运算符 | 表示                                           | 例子                          | 结果            |
| ------ | ---------------------------------------------- | ----------------------------- | --------------- |
| +      | 加                                             | 1+1                           | 2               |
| -      | 减                                             | 1-1                           | 0               |
| *      | 乘                                             | 2*4                           | 8               |
| /      | 除                                             | 1/2                           | 0.5             |
| %      | 取余（一正一负要公式）<br/>余数=被除数-除数*商 | 9%4<br/>9%-4<br/>9-(-4)*)(-3) | 1<br/>-3        |
| **     | 幂运算                                         | 2**3                          | 2³=8            |
| //     | 整数（一正一负向下取整）                       | 11//2<br/>9//4<br/>-9//4      | 5<br/>-3<br/>-3 |



##### 代码

```python
print(1 + 1)  # 加法运算
print(1 - 1)  # 减法运算
print(2 * 4)  # 乘法运算
print(1 / 2)  # 除法运算
print(11 / 2)  # 除法运算
print(11 // 2)  # 5 整除运算
print(11 % 2)  # 取余运算
print(2 ** 2)  # 表示2的2次方
print(2 ** 3)  # 表示2的三次方

print('--------------')
print(9 // 4) # 2
print(-9 // -4) # 2

print(9 // -4) # -3
print(-9 // 4) # -3 一正一负的整数公式，向下取整

print(9 % -4) # -3 公式 余数=被除数-除数*商 9-(-4)*(-3) 9-12 = -3
print(-9 % 4) # 3  -9-4*(-3) -9+12 = 3
```



#### 赋值运算符

=

- 执行顺序：从右到左
- 支持链式赋值：a=b=c=20
- 支持参数赋值：+=、-=、*=、/=、//=、%=
- 支持系列解包赋值：a,b,c=20,30,40



##### 代码

```python
a = 3 + 4
print(a)

a = b = c = 20
print(a, id(a))
print(b, id(b))
print(c, id(c))
print('-------支持参数赋值-------')
a = 20
a += 30  # 相当于a=a+30
print(a)
a -= 10  # 相当于a=a-10
print(a)
a *= 2
print(a)
a /= 3  # 相当于a=a*2
print(a)
print(type(a))  # float
a //= 2
print(a)
a %= 3
print(a)

print('-------------解包赋值--------------')
a, b, c = 20, 30, 40
print(a, id(a))
print(b, id(b))
print(c, id(c))

# a,b=20,30,40 报错，因为左右变量的个数和值的个数不对应
print('-------------交换两个变量的值--------------')
a, b = 10, 20
print('交换之前：', a, b)
# 交换
a, b = b, a
print('交换之后：', a, b)

```



#### 比较运算符

对变量或表达式对结果进行大小、真假等比较

- \>,<,\>=,<=,!=
- ==：对象value的比较
- is，is not：对象的id的比较



##### 代码

```python
a, b = 10, 20
print('a>b', a > b)  # False
print('a<b', a < b)  # True
print('a<=b', a <= b)  # True
print('a>=b', a >= b)  # False
print('a==b', a == b)  # False
print('a!=b', a != b)  # True

'''
    一个=称为赋值运算符，==称为比较运算符
    一个变量由三部分组成，标识，类型，值
    == 比较的是值，比较对象的标识使用is
'''
a = 10
b = 10
print(a == b)  # True 说明a与b的value相等
print(a is b)  # True 说明a与b的id标识相等

list1 = [11, 22, 33, 44]
list2 = [11, 22, 33, 44]
print(list1 == list2)  # value True
print(list1 is list2)  # id False
print(id(list1))
print(id(list2))

print(a is not b)  # False
print(list1 is not list2)  # True

```



#### 布尔运算符

对于布尔值之间的运算

- and：两个运算数都为True时，运算结果才为True
- or：只要有一个运算数为True，运算结果就为True
- not：如果运算数为True，运算结果为False
- in：
- not in



##### 代码

```python
a, b = 1, 2
print('-------------and并且-----------------')
print(a == 1 and b == 2)  # True
print(a == 1 and b < 2)  # False
print(a != 1 and b == 2)  # False
print(a != 1 and b != 2)  # False

print('-------------or或者-----------------')
print(a == 1 or b == 2)  # True
print(a == 1 or b < 2)  # True
print(a != 1 or b == 2)  # True
print(a != 1 or b != 2)  # False

print('-------------not对bool类型操作数取反-----------------')
f = True
f2 = False
print(not f)
print(not f2)

print('-------------in与not in-----------------')
s='helloworld'
print('w' in s)
print('k' in s)
print('w' not in s)
print('k' not in s)

```



#### 位运算符

将数据转成二进制进行计算

- 位与&：对应数位都是1，结果数位才是1，否则为0
- 位或\|：对应数位都是0，结果数位才是0，否则为1
- 左移位运算符<<：高位溢出舍弃，低位补0
- 右移位运算符>>：低位溢出舍弃，高位补0



##### 代码

```python
# 4的二进制：0000 0100
# 8的二进制：0000 1000
# 对应位数都为1结果才是1：0000 0000
print(bin(4))
print(bin(8))
# 按位与&，同为1时结果才为1
print(4 & 8)

# 对应位数都是0，结果位数才是0：0000 1100
print(0b00001100)
# 按位或|，同为0时结果为0
print(4 | 8)


# 左移位：左高位截断，右低位补0
# 0000 1000，一位，相当于乘以2
print(0b00001000)
# 向左移动1位（移动1个位置）
print(4 << 1)
# 0001 0000，二位，相当于乘以4
print(0b00010000)
# 向左移动2位（移动2个位置）
print(4 << 2)

# 右移位：左高位补0，右低位截断
# 0000 0010，一位，相当于除以2
print(0b00000010)
# 向右移动1位（移动1个位置）
print(4 >> 1)
# 0000 0001，二位，相当于除以4
print(0b00000001)
# 向右移动2位（移动2个位置）
print(4 >> 2)


```



#### 运算符的优先级

- ()：括号优先级最高
- 算术运算符
- 位运算符
- 比较运算符
- 布尔运算符
- 赋值运算符



## 对象的布尔值

Python一切皆对象，所有对象都有一个布尔值

- 获取对象的布尔值：使用内置函数bool()

- 以下对象的布尔值为False
  - False
  - 数值0
  - None
  - 空字符串
  - 空列表
  - 空元组
  - 空字典
  - 空集合



### 代码

```python
# 对象的布尔值
print(bool(False))  # False
print(bool(0))  # False
print(bool(0.0))  # False
print(bool(None))  # None
print(bool(''))  # 空字符
print(bool(""))  # 空字符
print(bool([]))  # 空列表
print(bool(list()))  # 空列表
print(bool(()))  # 空元组
print(bool(tuple()))  # 空元组
print(bool({}))  # 空字典
print(bool(dict()))  # 空字典
print(bool(set()))  # 空集合
```





## 程序的组织结构

1996年，计算机科学家证明了这样的事实：任何简单或复杂的算法都可以由顺序结构、选择结构和循环结构这三种基本结构组合而成<br/>

计算机的流程控制

- 顺序结构
- 选择结构
- 循环结构



### 顺序结构

程序从上到下顺序地执行代码，中间没有任何的判断和跳转，直到程序结束



### 选择结构

程序根据判断条件的布尔值选择性地执行部分代码，明确的让计算机知道在什么条件下，该去做什么



#### 单分支结构

##### 语法结构

```python
if 条件表达式:
		条件执行体
```



##### 代码

```python
money = 1000
s = int(input('输入取款金额'))
# 判断余额是否充足
if money >= s:
    money -= s
    print('取款成功，余额为:', money)
```



#### 双分支结构

##### 语法结构

```python
if 条件表达式:
  	条件执行体1
else:
  	条件执行体2
```



##### 代码

```python
# 双分支结构if...else，二选一执行
'''
从键盘录入一个整数，编写程序让计算机判断是奇数还是偶数
'''
num = int(input('输入一个整数'))

# 条件判断
if num % 2 == 0:
    print(num, '是偶数')
else:
    print(num, '是奇数')
```



#### 多分支结构

##### 语法结构

```python
if 条件表达式:
  	条件执行体1
elif 条件表达式2:
  	条件执行体2
elif 条件表达式N:
  	条件执行体N
else:
  	条件执行体N+1
```



##### 代码

```python

'''
多分支结构，多选一执行
从键盘录入一个整数 成绩

90-100 A
80-89 B
70-79 C
60-69 D
0-59 E
小于0或大于100 为非法数据
'''

score = int(input('输入一个成绩：'))
# 判断
if score >= 90 and score <= 100:
    print('A')
elif score >= 80 and score <= 89:
    print('B')
elif score >= 70 and score <= 79:
    print('C')
elif score >= 60 and score <= 69:
    print('D')
elif score >= 0 and score <= 59:
    print('E')
else:
    print('成绩有误，不在成绩的有效范围')

'-----------------写法二------------------'

if 90 <= score <= 100:
    print('A')
elif 80 <= score <= 89:
    print('B')
elif 70 <= score <= 79:
    print('C')
elif 60 <= score <= 69:
    print('D')
elif 0 <= score <= 59:
    print('E')
else:
    print('成绩有误，不在成绩的有效范围')
```



#### 嵌套if

##### 语法结构

```python
if 条件表达式:
  	if 内层条件表达式:
      	内层条件执行体1
     else:
        内层条件执行体2
else:
  	条件执行体
```



##### 代码

```python
'''
会员 >= 200 8折
    >= 100 9折
    不打折
非会员 >=200 9.5折
    不打折
'''
answer = input('会员y/n')
money = float(input('购物金额：'))

# 外层判断是否是会员
if answer == 'y':
    if money >= 200:
        print('打8折，付款金额为：', money * 0.8)
    elif money >= 100:
        print('打9折，付款金额为：', money * 0.9)
    else:
        print('不打折，付款金额为：', money)
else:  # 非会员
    if money >= 200:
        print('打9.5折，付款金额为：', money * 0.95)
    else:
        print('不打折，付款金额为：', money)

```



### 条件表达式

条件表达式是if...else的简写

#### 语法结构

```python
x if 判断条件 else y
```

运算规则：如果判断条件的布尔值为True，条件表达式的返回值为x，否则条件表达式的返回值为False



##### 代码

```python
'''
从键盘录入两个整数，比较大小
'''

num_a = int(input('第一个整数'))
num_b = int(input('第二个整数'))
# 比较大小
'''
if num_a >= num_b:
    print(num_a, '大于等于', num_b)
else:
    print(num_a, '小于', num_b)
'''

print('使用条件表达式进行比较')
print(num_a.__str__() + '大于等于' + num_b.__str__() if num_a >= num_b else num_a.__str__() + '小于' + num_b.__str__())

```



### pass语句

语句什么都不做，只是一个占位符，用在语法上需要的地方

#### 什么时候使用

先搭建语法结构，还没想好代码怎么写的时候



#### 哪些语句一起使用

- if语句的条件执行体
- for-in语句的循环体
- 定义函数时的函数体



#### 代码

```python
# pass语句，什么都不做，只是一个占位符，用到需要写语句的地方
answer = input('会员y/n')

# 判断是否是会员
if answer == 'y':
    pass
else:
    pass
```



### range函数

range()函数

- 用于生成一个整数序列
- 创建range对象的三种方式
  - range(stop)：创建一个(0,stop)之间的整数序列，步长为1
  - range(start,stop)：创建一个(start,stop)之间的整数序列，步长为1
  - range(start,stop,step)：创建一个(start,stop)之间的整数序列，步长为1

- 返回值是一个迭代器对象
- range类型的优点：不管range对象表示的整数序列有多长，所以range对象占用的内存空间都是相同的，因为仅仅需要存储start,stop和step，只有当用到range对象时，才会去计算序列中的相关元素
- in与not in判断整数序列中是否存在（不存在）指定的整数



#### 代码

```python
# range()的三种创建方式

'''第一种，只有一个参数（小括号中只给了一个数）'''
r = range(10)  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],默认从0开始，默认相差1称为步长
print(r)  # range(0, 10)
print(list(r))  # 用于查看range对象中的整数序列，list是列表的意思

'''第二种，给了两个参数（小括号中给了两个数）'''
r = range(1, 10)  # 指定了起始值，从1开始，到10结束（不包含10），默认步长为1
print(list(r))  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

'''第三种，给了三个参数（小括号中给了三个数）'''
r = range(1, 10, 2)
print(list(r))  # [1, 3, 5, 7, 9]

'''判断指定的整数 在序列中是否存在in， not in'''
print(10 in r)
print(9 in r)

print(10 not in r)
print(9 not in r)

print(range(1, 20, 1))  # [1...19]
print(range(1, 101, 1))  # [1...100]

```



### 循环结构

反复做同一件事情的情况，称为循环，循环的分类

- while
- for-in



#### while

##### 语法结构

```python
while 条件表达式
			条件执行体（循环体）
```



选择结构的if与循环结构while的区别

- if判断一次，条件为True执行一次
- while是判断N+1次，条件为True执行N次



##### while循环的执行流程

四步循环法

- 初始化变量
- 条件判断
- 条件执行体（循环体）
- 改变变量



##### 代码

```python

a = 1
# 判断条件表达式
while a < 10:
    # 执行条件执行体
    print(a)
    a += 1
```



#### for-in

for-in循环

- in表达从（字符串、序列等）中依次取值，又称为遍历
- for-in遍历等对象必须是可迭代对象

##### 语法结构

```python
for 变量 in 可迭代对象:
  		循环体
```

循环体内不需要访问自定义变量，可以将自定义变量替代为下划线



##### 代码

```python

# 遍历字符串
for item in 'Python':
    print(item)

# range()产生一个整数序列，也是一个可迭代对象
for i in range(10):
    print(i)

# 如果在循环体中不需要使用到自定义遍历，可将自定义变量写为"_"
for _ in range(5):
    print('人生苦短，我用Python')

# 使用for循环，计算1到100之间到偶数和
sum = 0  # 用于存储偶数和
for i in range(1, 101):
    if not i % 2:
        sum += i
print(sum)

```



### 流程控制语句break

break语句

- 用于结束循环结构，通常与分支结构if一起使用



#### 代码

```python

'''从键盘录入密码，最多录入三次，如果正确就结束循环'''
for item in range(3):
    pwd = input('输入密码：')
    if pwd == '8888':
        print('正确')
        break
    else:
        print('不正确')

a = 0
while a < 3:
    pwd = input('输入密码：')
    if pwd == '8888':
        print('正确')
        break
    else:
        print('不正确')
    a += 1

```



### 流程控制语句continue

continue语句

- 用于结束当前循环，进入下一次循环，通常与分支结构中的if一起使用



#### 代码

```python

'''
要求输出1到50之间5的倍数，5，10，15，20，25...
5的倍数的共同点：和5的余数为0的数字都是5的倍数
'''

for item in range(1, 51):
    # 模5等于0取反
    if not item % 5:
        print(item)

print('--------使用continue----------')
for item in range(1,51):
    if item % 5:
        continue
    print(item)
```



### else语句

else语句配合使用的三种情况

- if...else：if条件表达式不成立时执行else
- 循环的正常执行次数执行完，没有碰到break时执行else
  - while...else
  - for...else



#### 代码

```python

for i in range(3):
    pwd = input('输入密码')
    if pwd == '8888':
        print('密码正确')
        break
    else:
        print('不正确')
else:
    print('三次密码均输入错误')

a = 0
while a < 3:
    pwd = input('输入密码：')
    if pwd == '8888':
        print('正确')
        break
    else:
        print('不正确')
    a += 1
else:
    print('三次密码均输入错误')

```



## 列表

变量可以存储一个元素，而列表是一个大容器可以存储N多个元素，程序可以方便地对这些数据进行整体操作，列表相当于其他语言中的数组

|      |       |       |      |
| ---- | ----- | ----- | ---- |
| 索引 | -3    | -2    | -1   |
| 数据 | hello | world | 123  |
| 索引 | 0     | 1     | 2    |



### 代码

```python
a = 10  # 变量存储的是一个对象的引用
lst = ['hello', 'world', 98]
print(id(lst))
print(type(lst))
print(lst)
```



### 列表的创建

列表需要使用中括号`[]`，元素之间使用英文的逗号进行分隔

列表的创建方式

- 使用中括号
- 调用内置函数`list()`



#### 代码

```python
'''创建列表的第一种方式，使用[]'''
lst = ['hello', 'world', 98]

'''创建列表的第二种方式，使用内置函数list()'''
lst2 = list(['hello', 'world', 98])
```



### 列表的特点

列表的特点

- 列表元素按顺序有序排序
- 索引映射唯一一个数据
- 列表可以存储重复数据
- 任意数据类型混存
- 根据需要动态分配和回收内存



#### 代码

```python
'''创建列表的第一种方式，使用[]'''
lst = ['hello', 'world', 98, 'hello']
print(lst)
print(lst[0], lst[-4])

'''创建列表的第二种方式，使用内置函数list()'''
lst2 = list(['hello', 'world', 98])
```



### 列表的查询操作

#### 获取列表中指定元素的索引

index()

- 如果查询的列表中存在N个相同元素，只返回相同元素中的第一个元素的索引
- 如果查询的元素在列表中不存在，则会抛出ValueError
- 还可以在指定的start和stop之间进行查找



#### 获取列表中的单个元素

获取单个元素

- 正向索引从0到N-1 举例：lst[0]
- 逆向索引从-N到-1 举例：lst[-N]
- 指定索引不存在，则抛出IndexError



#### 代码

```python

lst = ['hello', 'world', 98, 'hello']
print(lst.index('hello'))  # 如果列表中有相同元素只返回列表中相同元素的第一个元素的索引
# print(lst.index('Python')) # ValueError: 'Python' is not in list

# lst.index('hello', 1, 3) # ValueError: 'hello' is not in list 从下标为1的索引查找，到3结束，不包括3

print(lst.index('hello', 1, 4))

# 获取索引为2的元素
print(lst[2])
# 获取索引为-3的元素
print(lst[-3])

# 获取索引为10的元素
# print(lst[10]) # IndexError: list index out of range
```



#### 获取列表中的多个元素

##### 语法格式

```python
列表[start:stop:step]
```



##### 切片操作

- 切片的结果：原列表片段的拷贝
- 切片的范围：[start,stop]
- step默认为1：简写为[start:stop]
- step为正数
  - [:stop:step]：切片的第一个元素默认是列表的第一个元素
  - [start::step]：切片的最后一个元素默认是列表的最后一个元素
  - 从start开始往后计算切片
- step为负数
  - [:stop:step]：切片的第一个元素默认是列表的最后一个元素
  - [start::step]：切片的最后一个元素默认是列表的第一个元素
  - 从start开始往前计算切片



##### 代码

```python
lst = [10, 20, 30, 40, 50, 60, 70, 80]
# start=1,stop=6,step=1
print(lst[1:6:1])
print('原列表', id(lst))
lst2 = lst[1:6:1]
print('切的片段：', id(lst2))

print(lst[1:6])  # 默认步长为1
print(lst[1:6:])
# start=1,stop=6,step=2
print(lst[1:6:2])
# stop=6,step=2, start采用默认
print(lst[:6:2])
# start=1,step=2,stop采用默认
print(lst[1::2])

print('---------step步长为负数的情况----------')
print('原列表', lst)
print(lst[::-1])
# start=7,stop 省略 step=-1
print(lst[7::-1])
# start=6,stop=0,step=-2
print(lst[6:0:-2])

print('---------列表查询操作----------')
lst = [10, 20, 'python', 'hello']
print(10 in lst)  # True
print(100 in lst)  # False
print(10 not in lst)  # False
print(100 not in lst)  # True
for item in lst:
    print(item)

```





### 列表元素的增加操作

| 方法     | 操作描述                         |
| -------- | -------------------------------- |
| append() | 在列表的末尾添加一个元素         |
| extend() | 在列表的末尾至少添加一个元素     |
| insert() | 在列表的任意位置添加一个元素     |
| 切片     | 在列表的任意位置添加至少一个元素 |



#### 代码

```python
# 向列表的末尾添加一个元素

lst = [10, 20, 30]
print('添加元素之前', lst, id(lst))
lst.append(100)
print('添加元素之后', lst, id(lst))
lst2 = ['hello', 'world']
# lst.append(lst2) # 将lst2作为一个元素添加到列表到末尾
print(lst)

# 向列表到末尾一次性添加多个元素
lst.extend(lst2)
print(lst)

# 在任意位置上添加一个元素
lst.insert(1,90)
print(lst)


lst3=[True,False,'hello']
# 在任意到位置上添加N多个元素，切掉的部分用新列表去替换
lst[1:]=lst3
print(lst)

```



### 列表元素的删除操作

| 方法     | 操作描述                                                     |
| -------- | ------------------------------------------------------------ |
| remove() | 一次删除一个元素。重复元素只删除第一个。元素不存在抛出ValueError |
| pop()    | 删除一个指定索引位置上的元素。指定索引不存在抛出IndexError。不指定索引，删除列表中最后一个元素 |
| 切片     | 一次至少删除一个元素                                         |
| clear()  | 清空列表                                                     |
| del      | 删除列表                                                     |



#### 代码

```python
lst = [10, 20, 30, 40, 50, 60, 30]
lst.remove(30)  # 从列表中移除一个元素，如果有重复元素只移除第一个元素
print(lst)

# lst.remove(100) # ValueError: list.remove(x): x not in list

# pop()根据索引移除元素
lst.pop(1)
print(lst)
# lst.pop(5) # IndexError: pop index out of range 如果指定的索引不存在，将抛出异常

lst.pop()  # 如果不指定参数（索引），将删除列表中的最后一个元素
print(lst)

'-------切片操作-删除至少一个元素，产生一个新的列表对象-----'
new_lst = lst[1:3]
print('原列表', lst)
print('切片后的列表', new_lst)

'''不产生新的列表对象，而是删除原列表中的内容'''
# 空列表替代
lst[1:3] = []
print(lst)


'''清除列表中的所有元素'''
lst.clear()
print(lst)

'''del语句将列表对象删除'''
del lst
# print(lst) # NameError: name 'lst' is not defined

```



### 列表元素的修改操作

- 为指定索引的元素赋予一个新值
- 为指定的切片赋予一个新值



#### 代码

```python
lst = [10, 20, 30, 40]
# 一次修改一个值
lst[2] = 100
print(lst)
lst[1:3] = [300, 400, 500, 600]
print(lst)
```



### 列表元素的排序操作

常见的两种方式

- 调用sort()方法，列表中的所有元素按照从小到大的顺序进行排序，可以指定reverse=True，进行降序排序
- 调用内置函数sorted()，可以指定reverse=True，进行降序排序，原列表不发生改变



#### 代码

```python
lst = [20, 40, 10, 98, 54]
print('排序前的列表', lst, id(lst))
# 开始排序，调用列表对象的sort方法，升序排序
lst.sort()
print('排序后的列表', lst, id(lst))

# 通过指定关键字参数，将列表中的元素进行降序排序
lst.sort(reverse=True)  # reverse=True表示降序排序，reverse=False就是升序排序
print(lst)
lst.sort(reverse=False)
print(lst)

print('---------使用内置函数sorted()对列表进行排序，将产生一个新的列表对象---------')
lst = [20, 40, 10, 98, 54]
print('原列表', lst, id(lst))
# 开始排序
new_list = sorted(lst)
print(lst, id(lst))
print(new_list, id(new_list))
# 指定关键字参数，实现列表元素的降序排序
desc_list = sorted(lst, reverse=True)
print(desc_list)

```



### 列表生成式

列表生成式简称：生成列表的公式

#### 语法格式

```python
# i*i:表示列表元素的表达式
# i:自定义变量
# range(1,10):可迭代对象
[ i*i for i in range(1,10) ]
```

注意事项：表示列表元素的表达式中通常包含自定义变量



#### 代码

```python
lst = [i for i in range(1, 10)]
print(lst)

'''列表中的元素的值为2,4,6,8,10'''
lst2 = [i * 2 for i in range(1, 11)]
print(lst2)
```





## 字典

### 什么是字典

- Python内置的数据结构之一，与列表一样是一个可变序列
- 以键值对的方式存储数据，字典是一个无序的序列



### 语法格式

```python
# scores:字典名
# {}:花括号
scores = { '张三': 100,... }
```



### 字典的实现原理

字典的实现原理与查字典类似，查字典是先根据部首或拼音查找对应的页码，Python中的字典是根据key查找value所在的位置



### 字典的创建

- 使用花括号`{}`
- 使用内置函数`dict()`



#### 代码

```python
'''字典的创建方式'''
'''使用{}创建字典'''
scores = {
    '张三': 100,
    '李四': 98,
    '王五': 45
}
print(scores)
print(type(scores))

'''创建dict()'''
student = dict(name='jack', age=20)
print(student)

'''空字典'''
d = {}
print(d)

```



### 字典的常用操作

#### 字典中元素的获取

- []：举例scores['张三']
- get()方法：举例scores.get('张三')
- []取值与get()取值的区别
  - []如果字典中不存在指定的key，抛出keyError异常
  - get()方法取值，如果字典中不存在指定的key，并不会抛出KeyError而是返回None，可以通过参数设置默认的value，以便指定的key不存在时返回



##### 代码

```python
'''获取字典的元素'''
scores = {'张三': 100, '李四': 98, '王五': 45}
'''第一种方式，使用[]'''
print(scores['张三'])
# print(scores['陈六']) # KeyError: '陈六'

'''第二种方式，使用get()方法'''
print(scores.get('张三'))
print(scores.get('陈六'))  # None
print(scores.get('麻七', 99))  # 99是在查找'麻七'所对应对key不存在时，提供对一个默认值

```



#### key的判断

- in：指定key在字典中存在返回True
- not in：指定key在字典中不存在返回True



#### 字典的删除

语法

```python
del scores[key]
```



#### 字典元素的新增

语法

```python
scores[key]=90
```



##### 代码

```python
'''key的判断'''
scores = {'张三': 100, '李四': 98, '王五': 45}
print('张三' in scores)
print('张三' not in scores)

del scores['张三']  # 删除指定的key-value对
# scores.clear()  # 清空字典的元素
print(scores)

scores['陈六'] = 98  # 新增元素
print(scores)

scores['陈六'] = 100  # 修改元素
print(scores)
```



#### 获取字典视图

- keys()：获取字典中所有key
- values()：获取字典中所有value
- items()：获取字典中所有key,value对



##### 代码

```python
scores = {'张三': 100, '李四': 98, '王五': 45}

# 获取所有key
keys = scores.keys()
print(keys)
print(type(keys))
print(list(keys))

# 获取所有的value
values = scores.values()
print(values)
print(type(values))
print(list(values))

# 获取所有的键值对
items = scores.items()
print(items)
print(type(items))
print(list(items)) # 转换之后的列表元素是由元组组成
```



#### 字典元素的遍历

语法

```python
for item in scores:
  	print(item)
```

##### 代码

```python
scores = {'张三': 100, '李四': 98, '王五': 45}
# 字典元素的遍历
for item in scores:
    print(item, scores[item], scores.get(item))

```



#### 字典的特点

- 字典中的所有元素都是一个key-value对，key不允许重复，value可以重复
- 字典中的元素是无序的
- 字典中的key必须是不可变对象
- 字典也可以根据需要动态地伸缩
- 字典会浪费较大的内存，是一种使用空间换时间的数据结构



##### 代码

```python
d = {'name': '张三', 'name': '李四'}  # key不允许重复
print(d)

d = {'name': '张三', 'nickname': '张三'}  # value可以重复
print(d)

lst = [10, 20, 30]
lst.insert(1, 100)
print(lst)

d = {lst: 100}  # TypeError: unhashable type: 'list'
print(d)

```





#### 字典生成式

内置函数zip()

- 用于将可迭代的对象作为参数，将对象中对应的元素打包成一个元组，然后返回由这些元组组成的列表

语法格式

```python
# item.upper():表示字典key的表达式
# price:表示字典value的表达式
# item,price:自定义表示key，value的变量
# zip(items,prices):可迭代对象
{ item.upper(): price for item,price in zip(items,prices) }
```



##### 代码

```python
items = ['f', 'b', 'o']
prices = [96, 78, 85, 100, 120]

# 进行压缩的过程中，会以元素少的列表为基准
d = {item.upper(): price for item, price in zip(items, prices)}
print(d)

```



## 元组

### 什么是元组

Python内置的数据结构之一，是一个不可变序列

- 不可变序列与可变序列
  - 不可变序列：字符串、元组
    - 不可变序列：没有增、删、改的操作
  - 可变序列：列表、字典
    - 可变序列：可以对序列执行增、删、改操作，对象地址不发生更改



### 语法格式

```python
t = ('Python', 'hello')
```



### 元组的创建方式

- 小括号`()`：(value)
- 内置函数`tuple`：tuple((value))
- 只包含一个元素的元组需要使用逗号和小括号：t=(10,)



#### 代码

```python
'''元组的创建方式'''

'''第一种创建方式，使用()'''
t = ('Python', 'world', 98)
print(t)
print(type(t))
print(type(t) is tuple)

t2 = 'Python', 'world', 98  # 省略了小括号
print(t2)
print(type(t2))

t3 = ('Python',)  # 如果元组中只有一个元素，逗号不能省
print(t3)
print(type(t3))

'''第二种创建方式，使用内置函数tuple()'''
t1 = tuple(('Python', 'world', 98))
print(t1)
print(type(t1))

'''空元组的创建方式'''
t4 = ()
t5 = tuple()

'''空列表的创建方式'''
lst = []
lst1 = list()

'''空字典的创建方式'''
d = {}
d2 = dict()

print('空列表', lst, lst1)
print('空字典', d, d2)
print('空元组', t4, t5)

```





### 为什么要将元组设计成不可变序列

- 在多任务环境下，同时操作对象时不需要加锁
- 因此，在程序中尽量使用不可变序列
- 注意事项：元组中存储的是对象的引用
  - 如果元组中对象本身是不可变对象，则不能再引用其他对象
  - 如果元组中的对象是可变对象，则可变对象的引用不允许改变，但数据可以改变



### 元组的遍历

元组是可迭代对象，可以使用for...in进行遍历

#### 代码

```python
'''元组的遍历'''

t = ('Python', 'world', 98)
'''第一种获取元组元素的方式，使用索引'''
print(t[0])
print(t[1])
print(t[2])
'''遍历元组'''
for item in t:
    print(item)

```





## 集合

### 什么是集合

- Python语言提供的内置数据结构
- 与列表、字典一样都属于可变类型的序列
- 集合是没有value的字典



### 集合的创建方式

- 直接`{}`：s={'Python', 'hello', 90}
- 使用内置函数`set()`：s=set(range(6))



#### 代码

```python
# 集合的创建方式
'''第一种创建方式使用{}'''
s = {2, 3, 4, 5, 5, 6, 7, 7}  # 集合中的元素不允许重复
print(s)

'''第二种创建方式'''
s1 = set(range(6))
print(s1, type(s1))

s2 = set([1, 2, 3, 4, 5, 5, 6, 6])
print(s2, type(s2))

s3 = set((1, 2, 4, 4, 5, 65))  # 集合中的元素是无序的
print(s3, type(s3))

s4 = set('python')
print(s4, type(s4))

s5 = set({12, 4, 34, 55, 66})
print(s5, type(s5))

# 定义一个空集合
s6 = {}  # dict字典类型
print(type(s6))

s7 = set()
print(type(s7))

```



### 集合相关操作

#### 集合元素的判断操作

- in 或 not in



#### 集合元素的新增操作

- 调用`add()`方法，一次添加一个元素
- 调用`update()`方法，至少添加一个元素



#### 集合元素的删除操作

- 调用`remove()`方法，一次删除一个指定元素，如果指定的元素不存在抛出KeyError
- 调用`discard()`方法，一次删除一个指定元素，如果指定的元素不存在不抛出异常
- 调用`pop()`方法，一次只删除一个任意元素
- 调用`clear()`方法，清空集合



#### 代码

```python
# 集合的相关操作
s = {10, 20, 30, 405, 60}
print(10 in s)  # True
print(100 in s)  # False
print(10 not in s)  # False
print(100 not in s)  # True

''' 集合元素的新增操作'''
s.add(80) # add一次添加一个元素
print(s)

s.update({200,400,300}) # 一次至少添加一个元素
print(s)

s.update([100,99,8])
s.update((78,64,56))
print(s)


'''集合元素的删除操作'''
s.remove(100)
print(s)

# s.remove(500) # KeyError: 500
s.discard(500)
print(s)

s.pop()
print(s)

s.clear()
print(s)
```



### 集合间的关系

两个集合是否相等

- 使用运算符==或!=进行判断

一个集合是否是另一个集合的子集

- 可以调用方式`issubset`进行判断

一个集合是否是另一个集合的超集

- 可以调用方法`issuperset`进行判断

两个集合是否没有交集

- 可以调用方法`isdisjoint`进行判断



#### 代码

```python
'''两个集合是否相等（元素相同，就相等）'''

s = {10, 20, 30, 40}
s2 = {30, 40, 20, 10}
print(s == s2)  # True
print(s != s2)  # False

''' 一个集合是否是另一个集合的子集'''
s1 = {10, 20, 30, 40, 50, 60}
s2 = {10, 20, 30, 40}
s3 = {10, 20, 90}
print(s2.issubset(s1))  # True
print(s3.issubset(s1))  # False

'''一个集合是否是另一个集合的超集'''
print(s1.issuperset(s2))  # True
print(s1.issuperset(s3))  # False

'''两个集合是否没有交集'''
print(s2.isdisjoint(s3))  # False 有交集
s4 = {100, 200, 300}

print(s2.isdisjoint(s4))  # True 没有交集

```



### 集合的数学操作

```python
# 集合的数学操作

# 交集
s1={1,2,3,4}
s2={2,3,4,5,6}
print(s1.intersection(s2))
print(s1 & s2) # intersection()与&等价，交集操作

# 并集操作
print(s1.union(s2))
print(s1 | s2) # union与 | 等价，并集操作
print(s1)
print(s2)

# 差集操作
print(s1.difference(s2))
print(s1 - s2)

# 对称差集
print(s1.symmetric_difference(s2))
print(s1 ^ s2)
```



### 集合生成式

#### 用于生成集合的公式

```python
# i*i表示集合元素的表达式
# i自定义变量
# range(1,10)可迭代对象
{ i*i for i in range(1,10) }
```

- 将{}修改为[]就是列表生成式
- 没有元组生成式

#### 代码

```python
# 列表生成式
lst = [i * i for i in range(6)]
print(lst)

# 集合生成式
s = {i * i for i in range(6)}
print(s)
```





## 列表、字典、元组、集合总结

| 数据结构    | 是否可变 | 是否重复                 | 是否有序 | 定义符号    |
| ----------- | -------- | ------------------------ | -------- | ----------- |
| 列表(list)  | 可变     | 可重复                   | 有序     | []          |
| 元组(tuple) | 不可变   | 可重复                   | 有序     | ()          |
| 字典(dict)  | 可变     | key不可重复，value可重复 | 无序     | {key:value} |
| 集合(set)   | 可变     | 不可重复                 | 无序     | {}          |



## 字符串的驻留机制

### 字符串

在Python中字符串是基本数据类型，是一个不可变的字符序列



### 什么是字符串驻留机制

仅保存一份相同且不可变字符串的方法，不同的值被存放在字符串的驻留池中，Python的驻留机制对相同的字符串只保留一份拷贝，后续创建相同字符串时，不会开辟新空间，而是把字符串的地址赋给新创建的变量



### 驻留机制的几种情况（交互模式）

- 字符串的长度为0或1时
- 符合标识符的字符串：含有字母数字下划线的字符串称为符合标识符的字符串
- 字符串只在编译时进行驻留，而非运行时
- [-5,256]之间的整数数字
- sys中的intern方法强制2个字符串指向同一个对象
- PyCharm对字符串进行了优化处理



### 代码

```python
# 字符串的驻留机制
a = 'Python'
b = "Python"
c = '''Python'''
print(a, id(a))
print(b, id(b))
print(c, id(c))

'''字符串长度为0或1'''
s1 = ''
s2 = ''
print(s1 is s2)  # True
s1 = '%'
s2 = '%'
print(s1 is s2)  # True

'''符合标识符的字符串'''
s1 = 'abc%'
s2 = 'abc%'
print(s1 == s2)  # True
print(s1 is s2)  # False

'''字符串只在编译时进行驻留，而非运行时'''
a = 'abc'
# b的值在运行之前就已经连接完成
b = 'ab' + 'c'
# c的值是在运行时使用join对列表进行连接
c = ''.join(['ab', 'c'])
print(a is b)  # True
print(a is c)  # False

'''[-5,256]之间的整数数字'''
a = -5
b = -5
print(a is b)  # True
a = -6
b = -6
print(a is b)  # False

import sys

a='abc%'
b='abc%'
'''使用sys中对intern方法强制驻留'''
a = sys.intern(b)
print(a is b) # True

```



### 字符串驻留机制对优缺点

- 当需要值相同的字符串时，可以直接从字符串池里拿来使用，避免频繁的创建和销毁，提升效率和节约内存，因此拼接字符串和修改字符串时会比较影响性能的
- 在需要进行字符串拼接时建议使用str类型的join方法，而非+，因为join方法先计算出所有字符串的长度，然后再拷贝，只new一次对象，效率要比“+”效率高



## 字符串的常用操作

### 字符串的查询操作的方法

| 方法名称 | 作用                                                         |
| -------- | ------------------------------------------------------------ |
| index()  | 查找字符串substr第一次出现的位置，如果查找的字符串不存在时，则抛出ValueError |
| rindex() | 查找字符串substr最后一次出现的位置，如果查找的字符串不存在时，则抛出ValueError |
| find()   | 查找字符串substr第一次出现的位置，如果查找的字符串不存在时，则返回-1 |
| rfind()  | 查找字符串substr最后一次出现的位置，如果查找的字符串不存在，则返回-1 |



#### 代码

```python
# 字符串的查询操作
s = 'hello,hello'
print(s.index('lo'))  # 3
print(s.find('lo'))  # 3
print(s.rindex('lo'))  # 9
print(s.rfind('lo'))  # 9

# print(s.index('k')) # ValueError: substring not found
print(s.find('k'))  # -1
# s.rindex('k')
print(s.rfind('k'))
```



### 字符串的大小写转换操作的方法

| 方法名称     | 作用                                                         |
| ------------ | ------------------------------------------------------------ |
| upper()      | 把字符串中所有字符都转成大写字母                             |
| lower()      | 把字符串中所有字符都转成小写字母                             |
| swapcase()   | 把字符串中所有大小字母转换为小写字母，把所有小写字母转成大写字母 |
| capitalize() | 把第一个字符转换为大写，把其他字符转换为小写                 |
| title()      | 把每个单词的第一个字符转换为大写，把每个单词的剩余字符转换为小写 |



#### 代码

```python
# 字符串中的大小写转换的方法

s='hello,python'
a=s.upper() # 转成大写之后，会产生一个新的字符串对象
print(a, id(a))
print(s, id(s))

b=s.lower()
print(b, id(b))
print(s, id(s))

print(b == s)
print(b is s)

s2='hello,Python'
print(s2.swapcase())

print(s2.title())

print(s2.capitalize())
```



### 字符串内容对齐操作的方法

| 方法名称 | 作用                                                         |
| -------- | ------------------------------------------------------------ |
| center() | 居中对齐，第1个参数指定宽度，第2个参数指定填充符，第2个参数是可选的，默认是空格，如果设置宽度小于实际宽度则返回原字符串 |
| ljust()  | 左对齐，第1个参数指定宽度，第2个参数指定填充符，第2个参数是可选的，默认是空格，如果设置宽度小于实际宽度则返回原字符串 |
| rjust()  | 右对齐，第1个参数指定宽度，第2个参数指定填充符，第2个参数是可选的，默认是空格如果设置宽度小于实际宽度则返回原字符串 |
| zfill()  | 右对齐，左边用0填充，该方法只接收一个参数，用于指定字符串的宽度，如果指定的宽度小于等于字符串的长度，返回字符串本身 |



#### 代码

```python
s='hello,Python'
'''居中对齐'''
print(s.center(20, '*'))

'''左对齐'''
print(s.ljust(20, '*'))
print(s.ljust(10))
print(s.ljust(20))

'''右对齐'''
print(s.rjust(20, '*'))
print(s.rjust(20))
print(s.rjust(10))

'''右对齐，使用0进行填充'''
print(s.zfill(20))
print(s.zfill(10))
print('-8910'.zfill(8))
```



### 字符串拆分操作的方法

| 方法名称 | 作用                                                         |
| -------- | ------------------------------------------------------------ |
| split()  | 从字符串的左边开始拆分，默认的拆分字符是空格，返回的值是一个列表。通过参数sep指定拆分字符串的分隔符。通过参数maxsplit指定拆分字符串时的最大拆分次数，在经过最大拆分之后，剩余的字符串会单独作为一部分 |
| rsplit() | 从字符串的右边开始拆分，默认的拆分字符是空格，返回的值是一个列表。以通过参数sep指定拆分字符串的分隔符。通过maxsplit指定拆分字符串时最大拆分次数，在经过最大拆分之后，剩余的字符串会单独作为一部分 |



#### 代码

```python

s='hello world Python'
lst=s.split()
print(lst)

s1='hello|world|Python'
print(s1.split(sep='|',maxsplit=1))
print('---------------')
'''rsplit()从右侧开始拆分'''
print(s.rsplit())
print(s1.rsplit('|'))
print(s1.rsplit(sep='|', maxsplit=1))
```





### 判断字符串操作的方法

| 方法名称       | 作用                                                         |
| -------------- | ------------------------------------------------------------ |
| isidentifier() | 判断指定的字符串是不是合法的标识符                           |
| isspace()      | 判断指定的字符串是否全部由空白字符组成（回车、换行、水平制表符） |
| isalpha()      | 判断指定的字符串是否全部由字母组成                           |
| isdecimal()    | 判断指定字符串是否全部由十进制的数字组成                     |
| isnumeric()    | 判断指定的字符串是否全部由数字组成                           |
| isalnum()      | 判断指定字符串是否全部由字母和数字组成                       |



#### 代码

```python
s='hello,python'
print(s.isidentifier())
print('hello'.isidentifier())
print('张三_'.isidentifier())
print('张三_123'.isidentifier())

print('\t'.isspace())

print('abc'.isalpha())
print('张三'.isalpha()) # 拼音
print('张三1'.isalpha())

print('123'.isdecimal())
print('123四'.isdecimal())
print('Ⅱ'.isdecimal())

print('123'.isnumeric())
print('123四'.isnumeric())
print('Ⅱ'.isnumeric())

print('abc1'.isalnum())
print('张三123'.isalnum())
print('abc!'.isalnum())
```



### 字符串操作的其他方法

| 功能         | 方法名称  |                                                              |
| ------------ | --------- | ------------------------------------------------------------ |
| 字符串替换   | replace() | 第1个参数指定被替换的字符串，第2个参数指定替换字符串的字符串，该方法返回替换后得到的字符串，替换前的字符串不发生变化，调用该方法时可以通过第3个参数指定最大替换次数 |
| 字符串的合并 | join()    | 将列表或元组中的字符串合并成一个字符串                       |



#### 代码

```python
s = 'hello,Python'
print(s.replace('Python', 'java'))
s1='hello,Python,Python,Python'
print(s1.replace('Python', 'java', 2))

lst = ['hello','java','Python']
print('|'.join(lst))
print(''.join(lst))

t=('hello','Java','Python')
print(''.join(t))


print('*'.join('Python'))
```



### 字符串的比较操作

- 运算符：>,>=,<,<=,==,!=
- 比较规则：首先比较两个字符串中的第一个字符，如果相等则继续比较下一个字符，依次比较下去，直到两个字符串中的字符不相等时，其比较结果就是两个字符串的比较结果，两个字符串中的所有后续字符将不再被比较
- 比较原理：两个字符进行比较时，比较的是其ordinal value（原始值），调用内置函数ord可以得到指定字符的ordinal value。与内置函数ord对应的是内置函数chr，调用内置函数chr时指定ordinal value可以得到其对应的字符



#### 代码

```python
print('apple' > 'app')
print('apple' > 'banana')

print(ord('a'), ord('b'))
print(ord('杨'))

print(chr(97), chr(98))
print(chr(26472))

'''
==与is的区别
==比较的是value
is比较的是id是否相等
'''

a=b='Python'
c='Python'
print(a == b)
print(b == c)

# a,b,c指向的是同一块内存空间
print(a is b)
print(a is c)
```





### 字符串的切片操作

字符串是不可变类型

- 不具备增、删、改等操作
- 切片操作将产生新的对象



#### 代码

```python
s = 'hello,Python'

s1 = s[:5]  # 由于没有指定起始位置，所以从0开始切
s2 = s[6:]  # 由于没有指定结束位置，所以切到字符串的最后一个元素
s3 = '!'

new_str = s1 + s3 + s2

print(s1)
print(s2)
print(new_str)

print(id(s))
print(id(s1))
print(id(s2))
print(id(s3))
print(id(new_str))

print('切片[start:end:step]')
print(s[1:5:1])  # 从1开始截到5（不包括5），步长为1
print(s[::2])  # 默认从0开始，没有写结束，默认到字符串到最后一个元素，步长为2，两个元素之间到索引间隔为2
print(s[::-1])  # 默认从字符串到最后一个元素开始，到字符串到第一个元素结束，因为步长为负数
print(s[-6::1])  # 从索引为-6开始，到字符串到最后一个元素结束，步长为1

```





### 格式化字符串

- %作占位符
- {}作占位符

#### 代码

```python
# 格式化字符串

# %占位符
name = '张三'
age = 20
print('我叫%s,今年%d岁' % (name, age))

# {}占位符
print('我叫{0},今年{1}岁'.format(name, age))

# f-string
print(f'我叫{name},今年{age}岁')

# 字符宽度
print('%10d' % 99)  # 10表示的是宽度
print('%.3f' % 3.1415926)  # .3表示小数点后三位

# 同时表示宽度和精度
print('%10.3f' % 3.1415926)  # 总宽度为10，小数点后3位

# {}格式化
print('{0:.3}'.format(3.1415926))  # .3表示一共是3位数
print('{:.3f}'.format(3.1415926))  # .3f表示3位小数
print('{:10.3f}'.format(3.1415926))  # .3f表示3位小数，10表示宽度，同时设置宽度和精度

```



### 字符串的编码转换

编码和解码的方式

- 编码：将字符串转换为二进制数据（bytes）
- 解码：将bytes类型的数据转换成字符串类型



#### 代码

```python

# byte代表一个二进制数据（字节类型的数据）

s = '天涯共此时'
byte=s.encode(encoding='GBK') # 编码
print(byte)
print(byte.decode(encoding='GBK')) # 解码

byte = s.encode(encoding='UTF-8')
print(byte.decode(encoding='UTF-8'))
```



## 函数

### 函数的创建和调用

#### 什么是函数

函数就是执行特定任务和完成特定功能的一段代码



#### 为什么需要函数

- 复用代码
- 隐藏实现细节
- 提高可维护性
- 提高可读性便于调试



#### 函数的创建

语法

```python
def 函数名([输入参数]):
  	函数体
    [return xxx]
```



#### 代码

```python
def calc(a, b):
    c = a + b
    return c

result = calc(10, 20)
print(result)
```



### 函数的参数传递

- 位置实参
  - 根据形参对应的位置进行实参传递
- 关键字实参
  - 根据形参名称进行实参传递



#### 代码

```python
def calc(a, b):  # a,b称为形式参数，简称形参，形参的位置是在函数的定义处
    c = a + b
    return c


result = calc(10, 20)  # 10,20称为实际参数的值，简称实参，实参的位置是函数的调用处
print(result)

res = calc(a=10, b=20) # =左侧的变量名称称为关键字参数
print(res)

'''
在函数调用过程中，进行参数的传递
如果是不可变对象，在函数体的修改不会影响实参的值 arg1修改为100，不会影响n1的值
如果是可变对象，在函数体的修改会影响到实参的值 arg2修改.append(10)，会影响到n2点值
'''
```



### 函数定义默认值参数

函数定义时，给形参设置默认值，只有与默认值不符的时候才需要传递实参

#### 代码

```python
def fun(a, b=10):  # b称为默认值参数
    print(a, b)


# 函数的调用
fun(100)
fun(20, 30)

print('hello', end='\t')
print('world')
```



### 函数的参数定义

个数可变的位置参数

- 定义函数时，可能无法事先确定传递的位置实参的个数时，使用可变的位置参数
- 使用*定义个数可变的位置形参
- 结果为一个元组

个数可变的关键字形参

- 定义函数时，无法实现确定传递的关键字是实参的个数时，使用可变的关键字形参
- 使用**定义个数可变的关键字形参
- 结果为一个字典



#### 代码

```python
# 函数定义时的可变的位置参数
def fun(*args):
    print(args)
    # print(args[0])


fun(10)
fun(10, 20, 30)
fun(10, 20, 30, 40)


# 函数定义时的可变的关键字参数
def fun1(**args):
    print(args)


fun1(a=10)
fun1(a=10, b=30, c=40)

'''
def fun2(*args, *a):
    pass
    以上代码，程序会报错，可变的位置参数，只能是一个
def fun2(**arg, **a):
    pass
    以上代码，程序会报错，个数可变的关键字参数，只能是一个
'''

def fun2(*args, **args2):
    pass

'''
def fun3(**args1, *args2):
    pass
    在一个函数的定义过程中，既有个数可变的关键字形参，也有个数可变的位置形参
    要求，个数可变的位置形参，放在个数可变的关键字形参之前
'''
```



### 函数的参数总结

| 参数的类型                                            | 函数的定义 | 函数的调用 | 备注   |
| ----------------------------------------------------- | ---------- | ---------- | ------ |
| 位置实参<br/>将序列中的每个元素都转换为位置实参       |            | ✅          | 使用*  |
| 关键字实参<br/>将字典中的每个键值对都转换为关键字实参 |            | ✅          | 使用** |
| 默认值形参                                            | ✅          |            |        |
| 关键字形参                                            | ✅          |            | 使用*  |
| 个数可变的位置形参                                    | ✅          |            | 使用*  |
| 个数可变的关键字形参                                  | ✅          |            | 使用** |



#### 代码

```python
# a,b,c在函数的定义处，所以是形式参数
def fun(a, b, c):
    print('a=', a)
    print('b=', b)
    print('c=', c)


'''-------------位置传参---------------'''
# 在函数调用时的参数传递，称为位置传参
fun(10, 20, 30)

# 将列表参数传入
lst = [11, 22, 33]
# 在函数调用时，将列表中的每个元素都转换为位置实参传入
fun(*lst)

'''-------------关键字传参---------------'''
# 关键字实参传入
fun(a=100, c=300, b=200)

# 将字典参数传入
dic = {'a': 111, 'b': 222, 'c': 333}
# 在函数调用时，将字典中的键值对都转换为关键字实参传入
fun(**dic)
```

##### 代码2

```python
'''----------默认值形参------------'''
# b是在函数的定义处，所以b是形参，而且进行了赋值，所以b称为默认值形参
def fun(a, b=10):
    print('a=', a)
    print('b=', b)


'''----------个数可变的位置形参------------'''
# 个数可变的位置形参
def fun2(*args):
    print(args)


'''----------个数可变的关键字形参------------'''
# 个数可变的关键字形参
def fun3(**args):
    print(args)


fun2(10, 20, 30)
fun3(a=11, b=22, c=33)

# 从*之后的参数，在函数调用时，只能采用关键字参数传递
def fun4(a, b,*, c, d):
    print('a=', a)
    print('b=', b)
    print('c=', c)
    print('d=', d)

# 位置实参传递
# fun4(10,20,30,40)
# 关键字实参传递
fun4(a=10,b=2,c=30,d=40)
# 前两个参数，采用的是位置实参传递，而c，d采用的是关键字实参传递
fun4(10,20,c=30,d=40)
# c，d只能采用关键字传递

'''函数定义时的形参的顺序问题'''
def fun5(a,b,*,c,d,**args):
    pass

def fun6(*args, **args2):
    pass

def fun7(a,b=10,*args,**args2):
    pass
```



### 变量的作用域

- 程序代码能访问该变量的区域
- 根据变量的有效范围可分为
  - 局部变量
    - 在函数内定义并使用的变量，只在函数内部有效，局部变量使用global声明，这个变量就会变成全局变量
  - 全局变量
    - 函数体外定义的变量，可作用于函数内外



#### 代码

```python

def fun(a,b):
    # c，就称为局部变量，因为c是在函数体内进行定义的变量，a,b为函数的形参，作用范围也是函数内部，相当于局部变量
    c = a+b
    print(c)


# 因为a,c超出了起作用的范围（超出了作用域）
# print(c)
# print(a)

# name的作用范围为函数内部和外部都可以使用--称为全局变量
name = '张三'
print(name)

def fun2():
    print(name)

fun2()

def fun3():
    # 函数内部定义的变量，局部变量，使用global声明，这个变量实际上就变成了全局变量
    global age
    age = 20
    print(age)

fun3()
print(age)
```





### 递归函数

什么是递归函数

- 如果在一个函数的函数体内调用了该函数本身，这个函数就称为递归函数

递归的组成部分

- 递归调用与递归终止条件

递归的调用过程

- 每递归调用一次函数，都会在栈内存分配一个栈帧
- 每执行完一次函数，都会释放相应的空间

递归的优缺点

- 缺点：占用内存多，效率低下
- 优点：思路和代码简单



#### 代码

```python

def fac(n):
    if n == 1:
        return 1
    else:
        return n * fac(n - 1)


print(fac(6))
```





## Bug

### Bug的常见类型

- 粗心导致的语法错误SyntaxError

- ```python
  age = input('输入年龄')
  # str类型与整数比较
  if age >= 18:
    print()
  ```

- ```python
  # 未声明变量直接使用
  # 循环没有终止条件
  while i<10:
    print(i)
  ```



### 异常处理机制

- Python提供了异常处理机制，可以在异常出现时即时捕获，然后内部“消化”，让程序继续运行
- 多个except结构
  - 捕获异常的顺序按照先子类后父类的顺序，为了避免遗漏可能出现的异常，可以在最后增加BaseException

```python
try:
    a = int(input('第一个整数'))
    b = int(input('第二个整数'))
    result = a / b
    print('结果为：', result)
except ZeroDivisionError:
    print('除数不允许为0')
except ValueError:
    print('只能输入数字')

print('程序结束')
```





#### try...except...else结构

如果try块中没有抛出异常，则执行else块，如果try中抛出异常，则执行except块

##### 代码

```python
try:
    a = int(input('第一个整数'))
    b = int(input('第二个整数'))
    result = a / b
    print('结果为：', result)
except BaseException as e:
    print('出错了', e)
else:
    print('计算结果为：', result)

```



#### try...except..else...finally结构

finally块无论是否发生异常都会被执行，常用来释放try块中申请的资源

##### 代码

```python
try:
    a = int(input('第一个整数'))
    b = int(input('第二个整数'))
    result = a / b
    print('结果为：', result)
except BaseException as e:
    print('出错了', e)
else:
    print('计算结果为：', result)
finally:
    print('谢谢使用')

```



### Python常见的异常类型

| 异常类型          | 描述                           |
| ----------------- | ------------------------------ |
| ZeroDivisionError | 除（或取模）零（所有数据类型） |
| IndexError        | 序列中没有此序列（index）      |
| KeyError          | 映射中没有这个键               |
| NameError         | 未声明/初始化对象（没有属性）  |
| SyntaxError       | Python语法错误                 |
| ValueError        | 传入无效的参数                 |



### trackback模块

```python
import traceback

try:
    print('------------')
    num = 10 / 0
except:
    traceback.print_exc()

```





## 编程思想

### 两大思想

|        | 面向过程                                                     | 面向对象                                 |
| ------ | ------------------------------------------------------------ | ---------------------------------------- |
| 区别   | 事物比较简单，可以用线性的思维去解决                         | 事物比较复杂，使用简单的线性思维无法解决 |
| 共同点 | 面向过程和面向对象都是解决实际问题的一种思维方式             |                                          |
|        | 二者相辅相成，并不是对立的。解决复杂问题，通过面向对象方式便于我们从宏观上把握事物之间复杂的关系、方便我们分析整个系统；具体到微观操作，仍然使用面向过程方式来处理 |                                          |



## 类与对象

- 类：类是多个类似事物组成的群体的统称。能够帮助我们快速理解和判断事物的性质
- 数据类型
  - 不同的数据类型属于不同的类
  - 使用内置函数`type`查看数据类型
- 对象
  - 100，99都是int类之下包含的相似的不同个例，这些个例被称为实例或对象



### 类的创建

#### 语法

```python
class Student:
  pass
```



#### 类的组成

- 类属性
- 实例方法
- 静态方法
- 类方法



#### 代码

```python


# Student为类的名称（类名）由一个或多个单词组成，每个单词的首字母大写，其余小写
class Student:
    native_pace = '吉林' # 直接写在类里的变量，称为类属性

    def __init__(self, name, age):
        # self.name 称为实例属性，进行类一个赋值的操作，将局部变量的name的值赋给实例属性
        self.name = name
        self.age = age

    # 实例方法
    def eat(self):
        print('学生在吃饭...')

    # 静态方法
    @staticmethod
    def method():
        print('静态方法')

    @classmethod
    def cm(cls):
        print('类方法')


# 在类之外定义的称为函数，在类之内定义的称为方法
def drink():
    print('喝水')

print(id(Student))
print(type(Student))
print(Student)
```



### 对象的创建

- 对象的创建又称为类的实例化
- 语法：实例名=类名()



#### 代码

```python


# Student为类的名称（类名）由一个或多个单词组成，每个单词的首字母大写，其余小写
class Student:
    native_pace = '吉林' # 直接写在类里的变量，称为类属性

    def __init__(self, name, age):
        # self.name 称为实例属性，进行类一个赋值的操作，将局部变量的name的值赋给实例属性
        self.name = name
        self.age = age

    # 实例方法
    def eat(self):
        print('学生在吃饭...')

    # 静态方法
    @staticmethod
    def method():
        print('静态方法')

    @classmethod
    def cm(cls):
        print('类方法')


# 在类之外定义的称为函数，在类之内定义的称为方法
def drink():
    print('喝水')

print(id(Student))
print(type(Student))
print(Student)
print('-----------------')
# 创建Student对象
stu1 = Student('张三',20)
stu1.eat()
print(stu1.name)
print(stu1.age)
print(id(stu1))
print(type(stu1))
print(stu1)

print('-----------------')
Student.eat(stu1)
```





### 类属性、类方法、静态方法

- 类属性：类中方法外的变量称为类属性，被该类的所有对象所共享
- 类方法：使用@classmethod修饰的方法，使用类名直接访问的方法
- 静态方法：使用@staticmethod修饰的方法，使用类名直接访问的方法



#### 代码

```python


# Student为类的名称（类名）由一个或多个单词组成，每个单词的首字母大写，其余小写
class Student:
    native_pace = '吉林' # 直接写在类里的变量，称为类属性

    def __init__(self, name, age):
        # self.name 称为实例属性，进行类一个赋值的操作，将局部变量的name的值赋给实例属性
        self.name = name
        self.age = age

    # 实例方法
    def eat(self):
        print('学生在吃饭...')

    # 静态方法
    @staticmethod
    def method():
        print('静态方法')

    @classmethod
    def cm(cls):
        print('类方法')


print(Student.native_pace)
stu1=Student('张三',20)
stu2=Student('李四',20)
print(stu1.native_pace)
print(stu2.native_pace)
Student.native_pace = '天津'

print(stu1.native_pace)
print(stu2.native_pace)

print('类方法的使用方式')
Student.cm()
print('静态方法的使用方式')
Student.method()
```



### 动态绑定属性和方法

Python是动态语言，在创建对象之后，可以动态地绑定属性和方法



#### 代码

```python
class Student:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def eat(self):
        print(self.name + '在吃饭...')


stu1 = Student('张三', 20)
stu2 = Student('李四', 20)
print(id(stu1))
print(id(stu2))
print('为stu2动态绑定属性')
stu2.gender = '女'
print(stu1.name, stu1.age)
print(stu2.name, stu2.age, stu2.gender)

stu1.eat()
stu2.eat()


def show():
    print('调用了show')


stu1.show = show
stu1.show()

# stu2.show() # 因为stu2没有绑定show方法

```



### 封装

面向对象的三大特征

- 封装：提高程序的安全性
  - 将数据（属性）和行为（方法）包装到类对象中。在方法内部对属性进行操作，在类对象外部调用方法。这样，无需关心方法内部对具体实现细节，从而隔离了复杂度
  - 在Python中没有专门的修饰符用于属性的私有，如果该属性不希望在类对象外部被访问，前边使用两个“_”
- 继承：提高代码的复用性
- 多态：提高程序的可扩展性和可维护性



#### 代码

```python
class Student:

    def __init__(self, name, age):
        self.name = name
        self.__age = age # 年龄不希望在类的外部被使用，所以加类两个__

    def show(self):
        print(self.name, self.__age)

stu = Student('张三', 20)
stu.show()
print(stu.name)
# print(stu.__age)

print(dir(stu))
print(stu._Student__age)
```



### 继承

- 语法格式

  ```python
  class 子类(父类1, 父类2...):
    pass
  ```

- 如果一个类没有继承任何类，则默认继承object
- Python支持多继承
- 定义子类时，必须在其构造函数中调用父类的构造函数



#### 代码

```python

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def info(self):
        print(self.name, self.age)

class Student(Person):
    def __init__(self,name, age,stu_no):
        super().__init__(name,age)
        self.stu_no = stu_no

class Teacher(Person):
    def __init__(self, name,age,teachofyear):
        super().__init__(name,age)
        self.teachofyear=teachofyear

stu = Student('张三',20,'1001')
teacher=Teacher('李四',34,10)

stu.info()
teacher.info()

'''多继承'''
class A:
    pass

class B:
    pass

class C(A,B):
    pass

```



### 方法重写

- 如果子类对继承自父类的某个属性或方法不满意，可以在子类中对其（方法体）进行重新编写
- 子类重写后的方法中可以通过`super().xxx()`调用父类中被重写的方法



#### 代码

```python

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def info(self):
        print(self.name, self.age)

class Student(Person):
    def __init__(self,name, age,stu_no):
        super().__init__(name,age)
        self.stu_no = stu_no

    def info(self):
        super().info()
        print(self.stu_no)

class Teacher(Person):
    def __init__(self, name,age,teachofyear):
        super().__init__(name,age)
        self.teachofyear=teachofyear

    def info(self):
        super().info()
        print(self.teachofyear)

stu = Student('张三',20,'1001')
teacher=Teacher('李四',34,10)

stu.info()
teacher.info()


```



### object类

- object类是所有类的父类，因此所有类都有object类的属性和方法
- 内置函数`dir()`可以查看指定对象所有属性
- Object有一个`__str__()`方法，用于返回一个对于对象的描述，对应于内置函数`str()`经常用于`print()`方法，帮我买查看对象的信息，所以经常会对`__str()__`进行重写



### 多态

- 多态就是具有多种形态，指的是：即便不知道一个变量所引用的对象到底是什么类型，仍然可以通过这个变量调用的方法，在运行过程中根据变量所引用对象的类型，动态决定调用哪个对象中的方法

#### 代码

```python

class Animal:
    def eat(self):
        print('动物会吃')
class Dog(Animal):
    def eat(self):
        print('狗会吃')
class Pig(Animal):
    def eat(self):
        print('猪会吃')

class Person:
    def eat(self):
        print('人会吃')

def fun(o):
    o.eat()

fun(Animal())
fun(Dog())
fun(Pig())
fun(Person())
```





#### 静态语言与动态语言

静态语言和动态语言关于多态的区别

- 静态语言实现多态的三个必要条件
  - 继承
  - 方法重写
  - 父类引用指向子类对象
- 动态语言的多态崇尚类型，不需要关心对象是什么类型，只关心对象的行为





### 特殊方法和特殊属性

|          | 名称         | 描述                                                         |
| -------- | ------------ | ------------------------------------------------------------ |
| 特殊属性 | `__dict__`   | 获得类对象或实例对象所绑定的所以属性和方法的字典             |
| 特殊方法 | `__len__()`  | 通过重写`__len__()`方法，让内置函数`len()`的参数可以是自定义类型 |
|          | `__add__()`  | 通过重写`__add__()`方法，可使用自定义对象具有'+'功能         |
|          | `__new__()`  | 用于创建对象                                                 |
|          | `__init__()` | 对创建的对象进行初始化                                       |

#### 代码

```python
class A:
    pass


class B:
    pass


class C(A, B):
    def __init__(self, name):
        self.name = name


class D(A):
    pass


x = C('xxxx')  # x是C类型的一个实例对象
print(x.__dict__)  # 实例对象的属性字典
print(C.__dict__)

print(x.__class__)  # 对象所属的类
print(C.__bases__)  # C类的父类类型的元素
print(C.__base__)  # 类的基类（最近的继承）
print(C.__mro__)  # 类的层次结构
print(A.__subclasses__())  # 子类的列表

```



### 类的浅拷贝与深拷贝

- 变量的赋值操作
  - 只是形成两个变量，实际上还是指向同一个对象
- 浅拷贝
  - Python拷贝一般都是浅拷贝，拷贝时，对象包含的子对象内容不拷贝，因为，源对象与拷贝对象会引用同一个子对象
- 深拷贝
  - 使用copy模块的deepcopy函数，递归拷贝对象中包含的子对象，源对象和拷贝对象所有的子对象也不相同



#### 代码

```python

class CPU:
    pass

class Disk:
    pass

class Computer:
    def __init__(self, cpu, disk):
        self.cpu = cpu
        self.disk = disk

# 变量的赋值
cpu1=CPU()
cpu2=cpu1
print(cpu1, id(cpu1))
print(cpu2, id(cpu2))

# 类的浅拷贝
disk = Disk()
computer= Computer(cpu1, disk)

# 浅拷贝
import copy
computer2 = copy.copy(computer)
print(computer, computer.cpu, computer.disk)
print(computer2, computer2.cpu, computer2.disk)

# 深拷贝
computer3 = copy.deepcopy(computer)
print(computer, computer.cpu, computer.disk)
print(computer3, computer3.cpu, computer3.disk)
```



## 模块



- 函数与模块的关系
  - 一个模块中可以包含N多个函数
- 在Python中一个扩展名为`.py`的文件就是一个模块
- 使用模块的好处
  - 方便其他程序和脚本的导入并使用
  - 避免函数名和变量名冲突
  - 提高代码的可维护性
  - 提高代码的可重用性



### 自定义模块

- 创建模块

  - 新建一个.py文件，名称不要与Python自带的标准模块名称相同

- 导入模块

  ```python
  import 模块名称 [as 别名]
  from 模块名称 import 函数/变量/类
  ```



#### 代码

```python

import math

print(id(math))
print(type(math))
print(math)
print(math.pi)

print(dir(math))
# 2的三次方
print(math.pow(2, 3), type(math.pow(2, 3)))
print(math.ceil(9.001))
print(math.floor(9.999))
```

或

```python
from math import pi
from math import pow

print(pi)
print(pow(2, 3))
```



## 以主程序形式运行

在每个模块的定义中都包括一个记录模块名称的变量`__name__`，程序可以检查该变量，以确定在哪个模块中执行。如果一个模块不是被导入到其他程序中执行，那么它可能在解释器的顶级模块中执行。顶级模块的`__name__`变量的值为`__main__`

#### 代码

```python
```calc.py
def add(a,b):
    return a+b


if __name__ == '__main__':
    print(add(10, 20)) # 只有运行calc时，才会执行运算
    
```calc2.py

import calc

print(calc.add(100,200))
```



## Python中的包

- 包是一个分层次的目录结构，它将一组功能相近的模块组织在一个目录下

- 作用

  - 代码规范
  - 避免模块名称冲突

- 包与目录的区别

  - 包含`__init__.py`文件的目录称为包
  - 目录里通常不包含`__init__.py`文件

- 包的导入

  ```python
  import 包名.模块名
  ```



## Python中常用的内置模块

| 模块名   | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| sys      | 与Python解释器及其环境操作相关的标准库                       |
| time     | 提供与时间相关的各种函数的标准库                             |
| os       | 提供了访问操作系统服务功能的标准库                           |
| calendar | 提供与日期相关的各种函数的标准库                             |
| urllib   | 用于读取来自网上（服务器）的数据标准库                       |
| json     | 用于使用JSON序列话和反序列化对象                             |
| re       | 用于在字符串中执行正则表达式匹配和替换                       |
| math     | 提供标准算术运算函数的标准库                                 |
| decimal  | 用于进行精确控制运算精度、有效数位和四舍五入操作的十进制运算 |
| logging  | 提供了灵活的记录事件、错误、警告和调试信息等日志信息的功能   |



#### 代码

```python

import sys
import time
import urllib.request

print(sys.getsizeof(24))
print(sys.getsizeof(45))
print(sys.getsizeof(True))
print(sys.getsizeof(False))
print(time.time())
print(time.localtime(time.time()))
print(urllib.request.urlopen('http://www.baidu.com').read())

```



## 第三方模块的安装及使用

- 第三方模块的安装

  ```sh
  pip install 模块名
  ```

- 第三方模块的使用

  ```python
  import 模块名
  ```



#### 代码

```python
import schedule
import time

def job():
    print('哈哈-----')

schedule.every(3).seconds.do(job)

while True:
    schedule.run_pending()
    time.sleep(1)
```





## 文件读写

- 内置函数`open()`创建文件对象

- 语法规则

  ```python
  file = open(filename, [,mode,encoding])
  # 打开模式默认只读
  # 默认文本文件中字符的编码格式为gbk
  ```



### 读取文件

```python
file = open('a.txt', 'r')
print(file.readlines())
file.close()
```



### 常用的文件打开模式

文件的类型

- 按文件中数据的组织形式，文件分为两大类
  - 文本文件：存储的是普通“字符”文本，默认为unicode字符集，可以使用记事本程序打开
  - 二进制文件：把数据内容用”字节“进行存储，无法用记事本打开，必须使用专用的软件打开，举例：mp3音频文件，jpg图片，.doc文档等

| 打开模式 | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| r        | 以只读模式打开文件，文件的指针将会放在文件的开头             |
| w        | 以只写模式打开文件，如果文件不存在则创建，如果文件存在，则覆盖原有内容，文件指针在文件的开头 |
| a        | 以追加模式打开文件，如果文件不存在则创建，文件指针在文件开头，如果文件存在，则在文件末尾追加内容，文件指针在原文件末尾 |
| b        | 以二进制方式打开文件，不能单独使用，需要与其他模式一起使用，rb，或者wb |
| +        | 以读写方式打开文件，不能单独使用，需要与其他模式一起使用，a+ |



#### 代码

```python
'''追加写入'''
file = open('b.txt', 'a')
file.write('p')
file.close()

'''复制文件操作'''
src_file = open('logo.png', 'rb')
target_file = open('copylogo.png', 'wb')

target_file.write(src_file.read())
target_file.close()
src_file.close()
```



### 文件对象的常用方法

| 方法名                | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| read([size])          | 从文件中读取size个字节或字符内容返回。若省略[size]，则读取到文件末尾，即一次读取文件所有内容 |
| readline()            | 从文本文件中读取一行内容                                     |
| readlines()           | 把文本文件中每一行都作为独立的字符串对象，并将这些对象放入列表返回 |
| write(str)            | 将字符串str内容写入文件                                      |
| writelines(s_list)    | 将字符串列表s_list写入文本文件，不添加换行符                 |
| seek(offset[,whence]) | 把文件指针移动到新的位置，offset表示相对于whence的位置：<br/>offset：为正向结束方向移动，为负向开始方向移动<br/>whence不同的值代表不同含义：<br/>0:从文件头开始计算（默认值）<br/>1:从当前位置开始计算<br/>2:从文件尾开始计算 |
| tell()                | 返回文件指针的当前位置                                       |
| flush()               | 把缓冲区的内容写入文件，但不关闭文件                         |
| close()               | 把缓冲区的内容写入文件，同时关闭文件，释放文件对象相关资源   |



### with语句

上下文管理器

- with语句可以自动管理上下文资源，不论什么原因跳出with块，都能确保文件正确的关闭，以此来达到释放资源的目的

- 实现了`__enter__()`方法和`__exit__()`方法，离开运行时上下文，自动调用上下文管理器的特殊方法`__exit__()`



#### 代码

```python
'''读取文件内容'''
with open('a.txt', 'r') as file:
    print(file.read())

'''自定义上下文管理器'''
class ContentMgr:
    def __enter__(self):
        print('enter execute')
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print('exit execute')

    def show(self):
        print('show execute')


with ContentMgr() as file:
    file.show()

'''复制文件操作'''
with open('logo.png', 'rb') as src_file:
    with open('copylogo.png', 'wb') as target_file:
        target_file.write(src_file.read())
```





### 目录操作

- os模块是Python内置的与操作系统功能和文件系统相关的模块，该模块中的语句的执行结果通常与操作系统有关，在不同的操作系统上运行，得到的结果可能不一样
- os模块与os.path模块用于对目录或文件进行操作



### os模块操作目录相关函数

| 函数                             | 说明                           |
| -------------------------------- | ------------------------------ |
| getcwd()                         | 返回当前的工作目录             |
| listdir(path)                    | 返回指定路径下的文件和目录信息 |
| mkdir(path,[,mode])              | 创建目录                       |
| makedirs(path1/path2,...[,mode]) | 创建多级目录                   |
| rmdir(path)                      | 删除目录                       |
| removedirs(path1/path2......)    | 删除多级目录                   |
| chdir(path)                      | 将path设置为当前工作目录       |

#### 代码

```python

import os

print(os.getcwd())
lst = os.listdir()
print(lst)

# os.mkdir('directory')
# os.makedirs('a/b/c')

# os.rmdir('a')
# os.removedirs('a/b/c')

os.chdir('../')
print(os.getcwd())
```





### os.path模块操作目录相关函数

| 函数            | 说明                                                        |
| --------------- | ----------------------------------------------------------- |
| abspath(path)   | 用于获取文件或目录的绝对路径                                |
| exists(path)    | 用于判断文件或目录是否存在，如果存在返回True，否则返回False |
| join(path,name) | 将目录与目录或者文件名拼接起来                              |
| splitext()      | 分离文件名和扩展名                                          |
| basename(path)  | 从一个目录中提取文件名                                      |
| dirname(path)   | 从一个路径中提取文件路径，不包括文件名                      |
| isdir(path)     | 用于判断是否为路径                                          |



#### 代码

```python

import os.path

print(os.path.abspath('demo1.py'))
print(os.path.exists('demo1.py'), os.path.exists('demo20.py'))
print(os.path.join('/home', 'demo1.py'))
print(os.path.split(os.path.abspath('demo1.py')))
print(os.path.splitext('demo1.py'))
print(os.path.basename(os.path.abspath('demo1.py')))
print(os.path.dirname(os.path.abspath('demo1.py')))
print(os.path.isdir(os.path.abspath('demo1.py')))

print('--------------递归读取文件---------------')
path = os.getcwd()
lst_files = os.walk(path)
for dirpath,dirname,filename in lst_files:
    print(dirpath)
    print(dirname)
    print(filename)
    print('------------')
    for dir in dirname:
        print(os.path.join(dirpath, dir))
    for file in filename:
        print(os.path.join(dirpath, file))
```





参考教程

-



- <a href="https://www.bilibili.com/video/BV1Sw411Z779" target="_blank">https://www.bilibili.com/video/BV1Sw411Z779</a>






















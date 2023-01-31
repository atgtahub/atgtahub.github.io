---
layout: post
title:  ES6新特性
categories: javascript
tag: es6
---

* content
{:toc}

## ES6

ECMAScript 6.0（简称ES6，ECMAScirpt是一种由 Ecma 国际(前身为欧洲计算机制造商协会，英文名称是European Computer Manufactures
Association)通过 ECMA-262 标准化的脚本程序设计语言）是JavaScript语言的下一代标准，已经在2015年6月正式发布了，并且从ECMAScript6开始，开始采用年号来做版本，即ECMAScript
2015，就是ECMAScript。它的目标，是使得JavaScript语言可以用来编写复杂的大型应用程序，成为企业级开发语言。每年一个新版本

- **ECMAScript是浏览器脚本语言的规范，JavaScript则是规范的具体实现**

## ES6新特性

### let

 ```javascript
 // var声明的变量往往会越域
 // let声明的变量有严格局部作用域
{
    var a = 1;
    let b = 2;
}
console.log(a); // 1
console.log(b); // ReferenceError: b is not defind

// var 可以声明多次
// let 只能声明一次
var m = 1
var m = 2
let n = 3
// let n = 4
console.log(m) // 2
console.log(n) // Identifer 'n' has already been declared

// var 会变量提升
// let 不存在变量提升
console.log(x); // undefined
var x = 10;
console.log(y); // ReferenceError: y is not defind
let y = 20;
 ```

### const 声明常量（只读变量）

 ```javascript
 // 1. 声明之后不允许改变
 // 2. 一旦声明必须初始化，否则会报错
const a = 1;
a = 3; // Uncaught TypeError: Assignment to constant variable.
 ```

### 解构表达式

#### 数组解构

 ```javascript
 let arr = [1, 2, 3];
// 以前我们想获取其中的值，只能通过角标。ES6可以这样
const [x, y, z] = arr; // x, y, z将与 arr 中的每个位置对应来取值
// 然后打印
console.log(x, y, z);
 ```

#### 对象解构

 ```javascript
 const person = {
    name: "jack",
    age: 21,
    language: ['java', 'js', 'css']
}
// 解构表达式获取值，将 person 里面每一个属性和左边对应赋值
const {name, age, language} = person;
// 等价于下面
// const name = person.name;
// const age = person.age;
// const language = person.language;
// 可以分别打印
console.log(name, age, language);
console.log(name);
console.log(age);
console.log(language);

// 扩展：如果想要将 name 的值赋值给其他变量，可以如下，nn 是新的变量名
const {name: nn, age, language} = person;
console.log(nn);
console.log(age);
console.log(language);
 ```

### 字符串扩展

#### 几个新的API

ES6 为字符串扩展了几个新的API

- includes()：返回布尔值，表示是否找到了参数字符串
- startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部
- endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部

 ```javascript
 let str = "hello.vue";
console.log(str.startsWith("hello")); // true
console.log(str.endsWith(".vue")); // true
console.log(str.includes("e")); // true
console.log(str.includes("hello")); // true
 ```

#### 字符串模板

模板字符串相当于加强版的字符串，用反引号 ` ，除了作为普通字符串，还可以用来定义多行字符串，还可以在字符串中加入变量和表达式

 ```javascript
 // 多行字符串
let ss = `
 	<div>
 		<span>hello world</span>
 	</div>
 	`
console.log(ss);

// 字符串插入变量和表达式。变量名写在 ${} 中，${} 中可以放入 JavaScript 表达式
let name = "张三";
let age = 18;
let info = `我是${name}，今年${age}了`;
console.log(info)

// 字符串中调用函数
function fun() {
    return "这是一个函数"
}

let sss = `O(∩_∩)O哈哈~，${fun()}`;
console.log(sss); // O(∩_∩)O哈哈~，这是一个函数
 ```

### 函数优化

#### 函数参数默认值

 ```javascript
 // 在 ES6 以前，我们无法给一个函数参数设置默认值，只能采用变通写法
function add(a, b) {
    // 判断b是否为空，为空就给默认值1
    b = b || 1;
    return a + b;
}

// 传一个参数
console.log(add(10));

// 现在可以这么写：直接给参数写上默认值，没传就会自动使用默认值
function add2(a, b = 1) {
    return a + b;
}

// 传一个参数
console.log(add2(10));
 ```

### 不定参数

不定参数用来表示不确定参数个数，形如，...变量名，由...加上一个具名参数标识符组成。具名参数只能放在参数列表的最后，并且有且只有一个不定参数

 ```javascript
function fun(...values) {
    console.log(value.length)
}

fun(1, 2) // 2
fun(1, 2, 3, 4) // 4
 ```

### 箭头函数

ES6 中定义函数的简写方式

一个参数

 ```javascript
// 以前声明一个方法
var print = function (obj) {
    console.log(obj);
}
// 可以简写为：
var print = obj => console.log(obj);
// 测试调用
print(100);
 ```

多个参数

 ```javascript
// 两个参数的情况
var sum = function (a, b) {
    return a + b;
}
// 简写为
// 当只有一行语句，并且需要返回结果时，可以省略 {} , 结果会自动返回
var sum2 = (a, b) => a + b;
// 测试调用
console.log(sum2(10, 10)); // 20

// 代码不止一行，可以用 {} 括起来
var sum3 = (a, b) => {
    c = a + b;
    return a + c;
}
console.log(sum3(10, 20));
 ```

#### 箭头函数结合解构表达式

 ```javascript
// 需求，声明一个对象，hello 方法需要对象的个别属性
// 以前的方式
const person = {
    name: "jack",
    age: 21,
    language: ['java', 'js', 'css']
}

function hello(person) {
    console.log("hello," + person.name)
}

// 箭头函数+解构
var hello2 = ({name}) => console.log("hello," + name);
hello2(person)
 ```

### 对象优化

#### 新增的API

ES6 给 Object 拓展了许多新的方法

- keys(obj)：获取对象的所有 key 形成的数组
- values(obj)：获取对象的所有 value 形成的数组
- entries(obj)：获取对象的所有 key 和 value 形成的二维数组。格式：[ [ k1, v1 ], [ k2, v2 ], ... ] 键值对
- assign(dest, ...src)：将多个 src 对象的值 拷贝到 dest 中。(第一层为深拷贝，第二层为浅拷贝)

 ```javascript
const person = {
    name: "jack",
    age: 21,
    language: ['java', 'js', 'css']
}
console.log(Object.keys(person)); // [ "name", "age", "language" ]
console.log(Object.values(person)); // [ "jack", 21, Array(3) ]
console.log(Object.entries(person)); // [ Array(2), Array(2), Array(2) ]


const target = {a: 1};
const source1 = {b: 2};
const source2 = {c: 3};
// Object.assign 方法的第一个参数是目标对象，后面的参数都是源对象
Object.assign(target, source1, source);
console.log(target) // { a: 1, b: 2, c: 3 }
 ```

#### 声明对象简写

 ```javascript
const age = 23;
const name = "张三";
// 传统
const person1 = {age: age, name: name}
console.log(person1)

// ES6：属性名和属性值变量名一样，可以省略
const person2 = {age, name}
console.log(person2) // { age: 23, name: "张三" }
 ```

#### 对象的函数属性简写

 ```javascript
let person = {
    name: "jack",
    // 以前
    eat: function (food) {
        console.log(this.name + "在吃" + food);
    },
    // 箭头函数版：这里拿不到this 必须 对象.属性
    eat2: food => console.log(person.name + "在吃" + food),
    // 简写版
    eat3(food) {
        console.log(this.name + "在吃" + food);
    }
}
person.eat("apple");
person.eat2("banana");
person.eat3("orange");
 ```

#### 对象拓展运算符

拓展运算符 (...) 用于取出参数对象所有可遍历属性然后拷贝到当前对象

 ```javascript
// 拷贝对象(深拷贝)
let person1 = {name: "Amy", age: 15}
let someone = {...person1}

// 合并对象
let age = {age: 15}
let name = {name: "Amy"}
let person2 = {...age, ...name} // 如果两个对象的字段名重复，后面对象字段值会覆盖前面对象的字段值
console.log(person2) // { age: 15, name: "Amy" }
 ```

### map和reduce

数组中新增了map和reduce方法

map()：接收一个函数，将原数组中的所有元素用这个函数处理后放入新数组返回

 ```javascript
let arr = ['1', '20', '-5', '3'];
arr = arr.map(item => item * 2)

console.log(arr); // [ 2, 40, -10, 6 ]
 ```

reduce() 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素

```javascript
/**
 arr.reduce(callback, [initialValue])
 1、previousValue（上一次调用回调返回的值，或者是提供的初始值（initialValue））
 2、currentValue（数组中当前被处理的元素）
 3、index（当前元素在数组中的索引）
 4、array（调用reduce的数组）
 */
let result = arr.reduce((a, b) => {
        console.log("上一次处理后：" + a)
        console.log("当前正在处理：" + b)
        return a + b;
    });
console.log(result) // 38
```

### Promise

Promise可以封装异步操作

```javascript
let p = new Promise((resolve, reject) => {
    $.ajax({
        url: "*.json",
        success: function (data) {
            resolve(data);
        },
        error: function (err) {
            reject(err);
        }
    });
});
p.then((obj) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "*.json",
            success: function (data) {
                resolve(data);
            },
            error: function (err) {
                reject(err);
            }
        });
    })
}).then((data) => {
    $.ajax({
        url: "*.json",
        success: function (data) {
        },
        error: function (err) {
        }
    });
});

function get(url, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            data: data,
            success: function (data) {
                resolve(data);
            },
            error: function (err) {
                reject(err);
            }
        })
    });
}

get("*.json")
    .then((data) => {
        return get("*.json");
    })
    .then((data) => {
        return get("*.json");
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
```

### 模块化

#### 什么是模块化

模块化就是把代码进行拆分，方便重复利用。类似java中的导包：要使用一个包，必须先导包。而js中没有包的概念，换来的是模块

模块功能主要由两个命令构成：export 和 import

- export 命令用于规定模块的对外接口
- import 命令用于导入其他模块提供的功能

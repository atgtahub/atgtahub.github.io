---
layout: post
title:  IDEA打开项目未出现git选项卡
categories: IDE
tag: idea
---

* content
{:toc}


## 查找路径

```text
C:\Users\用户名\AppData\Roaming\JetBrains\IntelliJIdea2021.3\options\trusted-paths.xml
```


### 修改文件

找到对应的项目路径，将entry标签的value属性改为true，如果改项目上层目录未修改为信任，则先修改上层

#### 示例

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<map>
    <!-- 上层目录未信任 -->
    <entry key="C:\Users\用户名\Desktop" value="false" />
    <!-- 项目路径 -->
    <entry key="C:\Users\用户名\Desktop\project1" value="false" />
</map>
```

先修改`C:\Users\用户名\Desktop`的value为true，再修改项目路径的value为true，重启idea即可

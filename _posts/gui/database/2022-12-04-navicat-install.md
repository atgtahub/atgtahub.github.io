---
layout: post
title:  mac安装navicat
categories: GUI
tag: gui
---


* content
{:toc}




## 下载navicat

[//]: # (下载地址：<a href="{{ '/resource/Navicat Premium Mac 12.0.22/navicat120_premium_cs.dmg' | prepend: site.baseurl  }}"><navicat120_premium_cs/a>)


## 安装

打开镜像，将navicat拖入到Application中（鼠标按住不松，等待闪烁）



先打开navicat后不做任何操作再退出，然后断网



## 激活

在访达中点击应用程序找到navicat右键查看包内容

编辑Contents\Resource\rpk文件，将里面的密钥替换为

```text
-----BEGIN PUBLIC KEY-----
MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQB8vXG0ImYhLHvHhpi5FS3g
d2QhxSQiU6dQ04F1OHB0yRRQ3NXF5py2NNDw962i4WP1zpUOHh94/mg/KA8KHNJX
HtQVLXMRms+chomsQCwkDi2jbgUa4jRFN/6N3QejJ42jHasY3MJfALcnHCY3KDEF
h0N89FV4yGLyDLr+TLqpRecg9pkPnOp++UTSsxz/e0ONlPYrra/DiaBjsleAESZS
I69sPD9xZRt+EciXVQfybI/2SYeAdXMm1B7tHCcFlOxeUgqYV03VEqiC0jVMwRCd
+03NU3wvEmLBvGOmNGudocWIF/y3VOqyW1byXFLeZxl7s+Y/SthxOYXzu3mF+2/p
AgMBAAE=
-----END PUBLIC KEY-----
```



### 断网断网断网

**断网**打开navicat后输入密钥序列号

```text
中文版64位密钥序列号： NAVH-T4PX-WT8W-QBL5
英文版64位密钥序列号： NAVG-UJ8Z-EVAP-JAUW
```



点击激活，手动激活，复制请求码

打开<a href="http://www.metools.info/code/c81.html" target="_blank">在线RSA加解密网址</a>

输入私钥

```text
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQB8vXG0ImYhLHvHhpi5FS3gd2QhxSQiU6dQ04F1OHB0yRRQ3NXF
5py2NNDw962i4WP1zpUOHh94/mg/KA8KHNJXHtQVLXMRms+chomsQCwkDi2jbgUa
4jRFN/6N3QejJ42jHasY3MJfALcnHCY3KDEFh0N89FV4yGLyDLr+TLqpRecg9pkP
nOp++UTSsxz/e0ONlPYrra/DiaBjsleAESZSI69sPD9xZRt+EciXVQfybI/2SYeA
dXMm1B7tHCcFlOxeUgqYV03VEqiC0jVMwRCd+03NU3wvEmLBvGOmNGudocWIF/y3
VOqyW1byXFLeZxl7s+Y/SthxOYXzu3mF+2/pAgMBAAECggEAK5qZbYt8wenn1uZg
6onRwJ5bfUaJjApL+YAFx/ETtm83z9ByVbx4WWT7CNC7fK1nINy20/mJrOTZkgIx
x6otiNC4+DIsACJqol+RLoo8I9pk77Ucybn65ZteOz7hVZIU+8j6LzW0KDt6yowX
e75r7G/NEpfibNc3Zz81+oDd2x+bHyGbzc9QcePIVuEzkof6jgpbWrQZU14itx9l
VxEgj/fbMccvBx8brR/l9ClmDZd9Y6TWsF1rfJpF3+DPeqFkKCiD7PGz3bs4O/Zd
ZrfV21ZNVusBW49G6bU63gQVKsOf1qGo3efbAW1HVxgTQ/lExVdcMvdenZm+ADKp
L4/wUQKBgQDOfBjn3OC2IerUFu18EgCS7pSjTSibXw+TeX3D5zwszLC091G2rGlT
5DihBUhMfesNdpoZynrs4YB6Sz9C3wSGAB8AM/tNvPhtSVtbMHmrdT2DEEKCvLkO
RNBnt+8aTu2hGRanw9aL1189gzwrmXK5ZuuURfgLrB9ihrvjo4VznQKBgQCapx13
dEA1MwapBiIa3k8hVBCoGPsEPWqM33RBdUqUsP33f9/PCx00j/akwmjgQNnBlAJo
Y7LOqPCyiwOkEf40T4IlHdzYntWQQvHhfBwqSgdkTE9tKj43Ddr7JVFRL6yMSbW3
9qAp5UX/+VzOLGAlfzJ8CBnkXwGrnKPCVbnZvQKBgQCd+iof80jlcCu3GteVrjxM
LkcAbb8cqG1FWpVTNe4/JFgqDHKzPVPUgG6nG2CGTWxxv4UFKHpGE/11E28SHYjb
cOpHAH5LqsGy84X2za649JkcVmtclUFMXm/Ietxvl2WNdKF1t4rFMQFIEckOXnd8
y/Z/Wcz+OTFF82l7L5ehrQKBgFXl9m7v6e3ijpN5LZ5A1jDL0Yicf2fmePUP9DGb
ZTZbbGR46SXFpY4ZXEQ9GyVbv9dOT1wN7DXvDeoNXpNVzxzdAIt/H7hN2I8NL+4v
EjHG9n4WCJO4v9+yWWvfWWA/m5Y8JqusV1+N0iiQJ6T4btrE4JSVp1P6FSJtmWOK
W/T9AoGAcMhPMCL+N+AvWcYt4Y4mhelvDG8e/Jj4U+lwS3g7YmuQuYx7h5tjrS33
w4o20g/3XudPMJHhA3z+d8b3GaVM3ZtcRM3+Rvk+zSOcGSwn3yDy4NYlv9bdUj/4
H+aU1Qu1ZYojFM1Gmbe4HeYDOzRsJ5BhNrrV12h27JWkiRJ4F/Q=
-----END RSA PRIVATE KEY-----
```

内容中输入请求码，点击RSA解密



得到类似于这样的json

```json
{
	"K": "*",
	"N": "52pojie",
	"O": "52pojie.cn",
	"DI": "*",
	"T": 1666703957
}
```

将上文中json的K和DI替换为解密后内容所对应的K和DI



打开<a href="https://tool.lu/timestamp/" target="_blank">获取unix时间戳(秒级别)</a>，然后将上文中的T替换为获取的时间戳



打开<a href="http://www.metools.info/code/c81.html" target="_blank">在线RSA加解密网址</a>（刚刚打开的加解密网站）填入私钥，再将替换好的内容粘贴到待加解密的内容中



点击加密得到激活码密钥



复制激活码密钥再打开navicat粘贴到激活码中点击激活即可完成

（后面再补图片和排版）

参考原文
-

- <a href="https://www.yingsoo.com/news/database/49223.html" targer="_blank">https://www.yingsoo.com/news/database/49223.html</a>


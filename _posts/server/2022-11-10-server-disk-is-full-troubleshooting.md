---
layout: post
title:  排查服务器磁盘占满
categories: server
tag: centos
---


* content
{:toc}


## 查看各挂载

### df -l

```sh
df -l


Filesystem     1K-blocks     Used Available Use% Mounted on
udev             8181332        0   8181332   0% /dev
tmpfs            1639148      792   1638356   1% /run
/dev/xvda1      60923672 36269392  24637896  60% /
tmpfs            8195724        0   8195724   0% /dev/shm
tmpfs               5120        0      5120   0% /run/lock
tmpfs            8195724        0   8195724   0% /sys/fs/cgroup
/dev/loop4         25728    25728         0 100% /snap/amazon-ssm-agent/5656
tmpfs            1639144        0   1639144   0% /run/user/1000
/dev/loop3         56960    56960         0 100% /snap/core18/2566
/dev/loop0         49152    49152         0 100% /snap/snapd/17029
/dev/loop2         25088    25088         0 100% /snap/amazon-ssm-agent/6312
/dev/loop5         49152    49152         0 100% /snap/snapd/17336
/dev/loop1         56960    56960         0 100% /snap/core18/2620
```

### df -h

```sh
df -h


Filesystem      Size  Used Avail Use% Mounted on
udev            7.9G     0  7.9G   0% /dev
tmpfs           1.6G  824K  1.6G   1% /run
/dev/xvda1       59G   36G   23G  62% /
tmpfs           7.9G     0  7.9G   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
tmpfs           7.9G     0  7.9G   0% /sys/fs/cgroup
/dev/loop4       26M   26M     0 100% /snap/amazon-ssm-agent/5656
tmpfs           1.6G     0  1.6G   0% /run/user/1000
/dev/loop2       25M   25M     0 100% /snap/amazon-ssm-agent/6312
/dev/loop1       56M   56M     0 100% /snap/core18/2620
/dev/loop0       56M   56M     0 100% /snap/core18/2632
/dev/loop3       50M   50M     0 100% /snap/snapd/17883
```


## 查看目录占用情况
```sh
du -h --max-depth=1


75M	./boot
3.1G	./usr
178M	./lib
0	./dev
1.8G	./root
15M	./bin
885M	./snap
4.0K	./srv
6.5M	./etc
1.8G	./opt
16K	./lost+found
5.3G	./home
du: cannot access './proc/11101/task/11101/fd/4': No such file or directory
du: cannot access './proc/11101/task/11101/fdinfo/4': No such file or directory
du: cannot access './proc/11101/fd/3': No such file or directory
du: cannot access './proc/11101/fdinfo/3': No such file or directory
0	./proc
2.8G	./var
5.2M	./tmp
792K	./run
4.0K	./lib64
0	./sys
4.0K	./mnt
20G	./data
15M	./sbin
4.0K	./media
36G	.
```


## 切换到占用了大量空间的目录下，继续查看该目录占用情况
```sh
cd data

du -h --max-depth=1
```

## 查看已删除空间却没有释放的进程

```sh
lsof -n / | grep deleted less
```

- less: 命令行以翻页形式

```text
java       5021                  root    0u      CHR              136,5         0t0          8 /dev/pts/5 (deleted)
java       5021                  root    1w      REG              202,1 33555754705    2576253 /server/null (deleted)
java       5021                  root    2w      REG              202,1 33555754705    2576253 /server/null (deleted)
java       5021  5033            root    0u      CHR              136,5         0t0          8 /dev/pts/5 (deleted)
java       5021  5033            root    1w      REG              202,1 33555742901    2576253 /server/null (deleted)
java       5021  5033            root    2w      REG              202,1 33555742901    2576253 /server/null (deleted)
java       5021  5034            root    0u      CHR              136,5         0t0          8 /dev/pts/5 (deleted)
java       5021  5034            root    1w      REG              202,1 33555742901    2576253 /server/null (deleted)
java       5021  5034            root    2w      REG              202,1 33555742901    2576253 /server/null (deleted)
java       5021  5035            root    0u      CHR              136,5         0t0          8 /dev/pts/5 (deleted)
java       5021  5035            root    1w      REG              202,1 33555745171    2576253 /server/null (deleted)
java       5021  5035            root    2w      REG              202,1 33555745171    2576253 /server/null (deleted)
java       5021  5036            root    0u      CHR              136,5         0t0          8 /dev/pts/5 (deleted)
java       5021  5036            root    1w      REG              202,1 33555745398    2576253 /server/null (deleted)
java       5021  5036            root    2w      REG              202,1 33555745398    2576253 /server/null (deleted)
java       5021  5037            root    0u      CHR              136,5         0t0          8 /dev/pts/5 (deleted)
java       5021  5037            root    1w      REG              202,1 33555745625    2576253 /server/null (deleted)
java       5021  5037            root    2w      REG              202,1 33555745625    2576253 /server/null (deleted)
```

### kill进程

```sh
kill -9 5021
```


参考原文
-

- <a href="https://m.php.cn/article/472912.html" target="_blank">https://m.php.cn/article/472912.html</a>
- <a href="https://blog.csdn.net/allway2/article/details/102546095" target="_blank">https://blog.csdn.net/allway2/article/details/102546095</a>


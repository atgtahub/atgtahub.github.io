---
layout: post
title:  Docker对运行中的容器新增挂载
categories: linux
tag: docker
---


* content
{:toc}



## 查看容器存放目录

```sh
docker info | grep Root
```

```text
Docker Root Dir: /var/lib/docker
```

## 查看新增挂载的容器id

```sh
docker ps
```

![查看容器id]({{ '/assets/posts/linux/docker/2023-01-29-docker-volumes/Snipaste_2023-01-29_14-53-13.png' | prepend: site.baseurl  }})


## 进入新增挂载的容器目录

```sh
[root@192 docker]# cd /var/lib/docker/
[root@192 docker]# ls
buildkit  containers  image  network  overlay2  plugins  runtimes  swarm  tmp  trust  volumes
[root@192 docker]# cd containers/
[root@192 containers]# ls
2e1c2544c22dee6404d7622edb2ce643bdf2c34e94ebfcefe2d56141fc93f063  80ae4f34a895f61216eb00d35b0ecd0ac4cbaf3a411123e64adffcd68bf9e50e
3551d17650ccada5b63c6c1307c4fea4b9df61f84a1f49be9c7120df6f5342fb  c1192f40477e53bf30a2a400c65258316438d2172304f2048ee7056d503b586a
3835680ce5d4064c308ca986b1d1cb4fc8b9d8be1d11a8cdeea134c6c4ccb4a0
[root@192 containers]# cd 3551d17650ccada5b63c6c1307c4fea4b9df61f84a1f49be9c7120df6f5342fb/
[root@192 3551d17650ccada5b63c6c1307c4fea4b9df61f84a1f49be9c7120df6f5342fb]# ls
3551d17650ccada5b63c6c1307c4fea4b9df61f84a1f49be9c7120df6f5342fb-json.log  hostname             resolv.conf
checkpoints                                                                hostconfig.json      hosts     resolv.conf.hash
config.v2.json                                                             mounts
[root@192 3551d17650ccada5b63c6c1307c4fea4b9df61f84a1f49be9c7120df6f5342fb]#
```

## 挂载之前可提前将容器中的文件或目录拷贝到宿主机上(可选)

```sh
docker cp 容器id或容器名:容器内文件或目录 宿主机存放文件或目录位置
```

```sh
docker cp 355:/etc/my.cnf /usr/local/docker/volumes/mysql/conf/
```

## 停止docker

```sh
systemctl stop docker
```

## 修改`config.v2.json`

将容器中`/etc/my.cnf`文件映射到宿主机的`/usr/local/docker/volumes/mysql/conf/my.cnf`文件上，
在`config.v2.json`文件中找到`MountPoints`，添加如下`/etc/my.cnf`的映射即可

### 查看文件内容

```sh
less config.v2.json
```

### 复制文件内容到编辑器中并格式化

从上方复制出一段json，按照格式修改即可

![添加一个挂载内容]({{ '/assets/posts/linux/docker/2023-01-29-docker-volumes/Snipaste_2023-01-29_15-01-57.png' | prepend: site.baseurl  }})

```json
        "/etc/my.cnf": {
            "Source": "/usr/local/docker/volumes/mysql/conf/my.cnf",
            "Destination": "/etc/my.cnf",
            "RW": true,
            "Name": "",
            "Driver": "",
            "Type": "bind",
            "Propagation": "rprivate",
            "Spec": {
                "Type": "bind",
                "Source": "/usr/local/docker/volumes/mysql/conf/my.cnf",
                "Target": "/etc/my.cnf"
            },
            "SkipMountpointCreation": false
        }
```

- "/etc/my.cnf": 容器内要挂载的文件
- "Source": 宿主机上的文件或目录地址
- "Destination": 容器内目标文件或目录
- "Spec":"Source": 宿主机文件或目录地址
- "Spec":"Target": 容器内文件或目录地址

### 备份文件

```sh
cp config.v2.json config.v2.json.bak
```

### 修改文件

先将文件写为空
```sh
echo "" > config.v2.json
```

打开在线<a href="https://www.sojson.com/" target="_blank">json格式化</a>地址，将修改后的json内容进行压缩

```sh
vi config.v2.json
```

修改完成后esc、冒号、wq保存并退出


## 修改`hostconfig.json`

`Binds`中新增一个挂载`"宿主机文件或目录:容器中文件或目录"`

```json
{
    "Binds": [
        "/usr/local/docker/volumes/mysql/log:/var/log/mysql",
        "/usr/local/docker/volumes/mysql/data:/var/lib/mysql",
        "/usr/local/docker/volumes/mysql/conf/my.cnf:/etc/my.cnf"
    ],
    "ContainerIDFile": "",
    "LogConfig": {
        "Type": "json-file",
        "Config": {}
    },
    "NetworkMode": "default",
    "PortBindings": {
        "3306/tcp": [
            {
                "HostIp": "",
                "HostPort": "3306"
            }
        ]
    },
    "RestartPolicy": {
        "Name": "always",
        "MaximumRetryCount": 0
    },
    "AutoRemove": false,
    "VolumeDriver": "",
    "VolumesFrom": null,
    "CapAdd": null,
    "CapDrop": null,
    "CgroupnsMode": "host",
    "Dns": [],
    "DnsOptions": [],
    "DnsSearch": [],
    "ExtraHosts": null,
    "GroupAdd": null,
    "IpcMode": "private",
    "Cgroup": "",
    "Links": null,
    "OomScoreAdj": 0,
    "PidMode": "",
    "Privileged": false,
    "PublishAllPorts": false,
    "ReadonlyRootfs": false,
    "SecurityOpt": null,
    "UTSMode": "",
    "UsernsMode": "",
    "ShmSize": 67108864,
    "Runtime": "runc",
    "ConsoleSize": [
        0,
        0
    ],
    "Isolation": "",
    "CpuShares": 0,
    "Memory": 0,
    "NanoCpus": 0,
    "CgroupParent": "",
    "BlkioWeight": 0,
    "BlkioWeightDevice": [],
    "BlkioDeviceReadBps": null,
    "BlkioDeviceWriteBps": null,
    "BlkioDeviceReadIOps": null,
    "BlkioDeviceWriteIOps": null,
    "CpuPeriod": 0,
    "CpuQuota": 0,
    "CpuRealtimePeriod": 0,
    "CpuRealtimeRuntime": 0,
    "CpusetCpus": "",
    "CpusetMems": "",
    "Devices": [],
    "DeviceCgroupRules": null,
    "DeviceRequests": null,
    "KernelMemory": 0,
    "KernelMemoryTCP": 0,
    "MemoryReservation": 0,
    "MemorySwap": 0,
    "MemorySwappiness": null,
    "OomKillDisable": false,
    "PidsLimit": null,
    "Ulimits": null,
    "CpuCount": 0,
    "CpuPercent": 0,
    "IOMaximumIOps": 0,
    "IOMaximumBandwidth": 0,
    "MaskedPaths": [
        "/proc/asound",
        "/proc/acpi",
        "/proc/kcore",
        "/proc/keys",
        "/proc/latency_stats",
        "/proc/timer_list",
        "/proc/timer_stats",
        "/proc/sched_debug",
        "/proc/scsi",
        "/sys/firmware"
    ],
    "ReadonlyPaths": [
        "/proc/bus",
        "/proc/fs",
        "/proc/irq",
        "/proc/sys",
        "/proc/sysrq-trigger"
    ]
}
```

### 备份文件

```sh
cp hostconfig.json hostconfig.json.bak
```

### 修改文件

先将文件写为空
```sh
echo "" > hostconfig.json
```

```sh
vi hostconfig.json
```

将修改完成后的json内容，压缩并粘贴到文件中保存

## 重启docker和容器

```sh
systemctl start docker
```

```sh
docker start 容器id或容器名
```

## 验证挂载

```sh
docker inspect 容器id或容器名
```

### HostConfig

```text
"HostConfig": {
            "Binds": [
                "/usr/local/docker/volumes/mysql/log:/var/log/mysql",
                "/usr/local/docker/volumes/mysql/data:/var/lib/mysql",
                "/usr/local/docker/volumes/mysql/conf/my.cnf:/etc/my.cnf"
            ],
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {
                "3306/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "3306"
                    }
                ]
            },
```

### Mounts

```text
 "Mounts": [
            {
                "Type": "bind",
                "Source": "/usr/local/docker/volumes/mysql/conf/my.cnf",
                "Destination": "/etc/my.cnf",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            },
            {
                "Type": "bind",
                "Source": "/usr/local/docker/volumes/mysql/data",
                "Destination": "/var/lib/mysql",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            },
            {
                "Type": "bind",
                "Source": "/usr/local/docker/volumes/mysql/log",
                "Destination": "/var/log/mysql",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            }
        ],
```
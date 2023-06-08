---
layout: post
title:  Kubernetes
categories: linux
tag: k8s
---


* content
{:toc}






## Kubernetes简介

**Kubernetes** 这个名字源于希腊语，意为“舵手”或“飞行员”。k8s 这个缩写是因为 k 和 s 之间有八个字符的关系。

### Kubernetes 作用

- 传统部署时代：早期，各个组织机构在物理服务器上运行应用程序。无法为物理服务器中的应用程序定义资源边界，这会导致资源分配问题。 例如，如果在物理服务器上运行多个应用程序，则可能会出现一个应用程序占用大部分资源的情况， 结果可能导致其他应用程序的性能下降。 一种解决方案是在不同的物理服务器上运行每个应用程序，但是由于资源利用不足而无法扩展， 并且维护许多物理服务器的成本很高。

- 虚拟化部署时代：作为解决方案，引入了虚拟化。虚拟化技术允许你在单个物理服务器的 CPU 上运行多个虚拟机（VM）。 虚拟化允许应用程序在 VM 之间隔离，并提供一定程度的安全，因为一个应用程序的信息 不能被另一应用程序随意访问。虚拟化技术能够更好地利用物理服务器上的资源，并且因为可轻松地添加或更新应用程序 而可以实现更好的可伸缩性，降低硬件成本等等。每个 VM 是一台完整的计算机，在虚拟化硬件之上运行所有组件，包括其自己的操作系统。

- 容器部署时代：容器类似于 VM，但是它们具有被放宽的隔离属性，可以在应用程序之间共享操作系统（OS）。 因此，容器被认为是轻量级的。容器与 VM 类似，具有自己的文件系统、CPU、内存、进程空间等。 由于它们与基础架构分离，因此可以跨云和 OS 发行版本进行移植。



### Kubernetes 特性

- **服务发现和负载均衡** 

Kubernetes 可以使用 DNS 名称或自己的 IP 地址公开容器，如果进入容器的流量很大， Kubernetes 可以负载均衡并分配网络流量，从而使部署稳定。

- **存储编排** 

Kubernetes 允许你自动挂载你选择的存储系统，例如本地存储、公共云提供商等。

- **自动部署和回滚**

你可以使用 Kubernetes 描述已部署容器的所需状态，它可以以受控的速率将实际状态 更改为期望状态。例如，你可以自动化 Kubernetes 来为你的部署创建新容器， 删除现有容器并将它们的所有资源用于新容器。

- **自动完成装箱计算**

Kubernetes 允许你指定每个容器所需 CPU 和内存（RAM）。 当容器指定了资源请求时，Kubernetes 可以做出更好的决策来管理容器的资源。

- **自我修复**

Kubernetes 重新启动失败的容器、替换容器、杀死不响应用户定义的 运行状况检查的容器，并且在准备好服务之前不将其通告给客户端。

- **密钥与配置管理**

Kubernetes 允许你存储和管理敏感信息，例如密码、OAuth 令牌和 ssh 密钥。 你可以在不重建容器镜像的情况下部署和更新密钥和应用程序配置，也无需在堆栈配置中暴露密钥。



### Kubernetes 架构

#### 工作方式

Kubernetes 安装都是 集群模式，部署完 Kubernetes, 即拥有了一个完整的集群。

Kubernetes Cluster = N Master Node + N Worker Node

 N 主节点           + N 工作节点 	（ N >= 1）



#### 组件架构

<a href="https://kubernetes.io/zh-cn/docs/concepts/overview/components/" target="_blank">https://kubernetes.io/zh-cn/docs/concepts/overview/components/</a>

![Kubernetes 的组件](https://d33wubrfki0l68.cloudfront.net/2475489eaf20163ec0f54ddc1d92aa8d4c87c96b/e7c81/images/docs/components-of-kubernetes.svg)







## 安装Docker

### 卸载docker

```sh
yum remove docker*
```



### 安装 yum-utils

```sh
yum install -y yum-utils
```



### 存储库地址添加docker下载yum源

```sh
#aliyun
yum-config-manager \
            --add-repo \
            http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

#docker
yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```



### 下载docker

```sh
yum install -y docker-ce docker-ce-cli containerd.io
```



### 启动docker并设置为开机自启

```sh
systemctl enable docker --now
```



### 验证docker

```sh
docker info
```



## Kubernetes集群搭建



### 设置hostname

#### 主节点

```sh
hostnamectl set-hostname k8s-master
```



#### 节点1

```sh
hostnamectl set-hostname k8s-node1
```



#### 节点2

```sh
hostnamectl set-hostname k8s-node2
```





### 将 SELinux 设置为 permissive 模式（相当于将其禁用）
```sh
# 第一行是临时禁用，第二行是永久禁用
sudo setenforce 0
sudo sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config
```



### 关闭swap

```sh
# 第一行是临时禁用，第二行是永久禁用
swapoff -a
sed -ri 's/.*swap.*/#&/' /etc/fstab
```





### 允许 iptables 检查桥接流量

```sh
#允许 iptables 检查桥接流量 （K8s 官方要求）
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
br_netfilter
EOF

cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sudo sysctl --system
```



### 安装kubelet、kubeadm、kubectl



#### 配置镜像地址

镜像地址：<a href="https://developer.aliyun.com/mirror/kubernetes" target="_blank">https://developer.aliyun.com/mirror/kubernetes</a>

```sh
#配置k8s的yum源地址
cat <<EOF | sudo tee /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-aarch64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
   http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```



#### 安装 kubelet，kubeadm，kubectl

```sh
sudo yum install -y kubelet-1.20.9 kubeadm-1.20.9 kubectl-1.20.9
```



#### 启动kubelet

```sh
sudo systemctl enable --now kubelet
```



### 需要下载的镜像

查看所需镜像

```sh
kubeadm config images list
```



```sh
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver:v1.20.15
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager:v1.20.15
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler:v1.20.15
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.20.15
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.2
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/etcd:3.4.13-0
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:1.7.0


#docker pull dyrnq/kube-apiserver
#docker pull dyrnq/kube-proxy
#docker pull dyrnq/kube-controller-manager
#docker pull dyrnq/kube-scheduler
#docker pull dyrnq/coredns
#docker pull dyrnq/etcd
#docker pull dyrnq/pause
```



image.sh

```sh
#!/bin/bash
images=(
kube-apiserver:v1.20.15
kube-controller-manager:v1.20.15
kube-scheduler:v1.20.15
kube-proxy:v1.20.15
pause:3.2
etcd:3.4.13-0
coredns:1.7.0
)

for imageName in ${images[@]}; do
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName
done
```



```sh
chmod u+x ./images.sh && ./images.sh
```



### 所有机器配置master域名

```sh
[root@k8s-master ~]# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 2a:9c:76:3c:c6:85 brd ff:ff:ff:ff:ff:ff
    inet 192.168.64.6/24 brd 192.168.64.255 scope global noprefixroute dynamic eth0
       valid_lft 84763sec preferred_lft 84763sec
    inet6 fd34:4e53:b7de:e857:f52b:5176:72c6:fa27/64 scope global noprefixroute dynamic
       valid_lft 2591959sec preferred_lft 604759sec
    inet6 fe80::8e34:8439:47f4:e1f5/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default
    link/ether 02:42:64:92:7a:e3 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
```

```sh
echo "192.168.64.6  k8s-master" >> /etc/hosts
```



### 初始化master节点



#### 初始化

```sh
kubeadm init \
--apiserver-advertise-address=192.168.64.6 \
--control-plane-endpoint=k8s-master \
--image-repository registry.aliyuncs.com/google_containers \
--kubernetes-version v1.20.9 \
--service-cidr=10.96.0.0/16 \
--pod-network-cidr=10.244.0.0/16
```



#### 记录打印信息

```sh
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now join any number of control-plane nodes by copying certificate authorities
and service account keys on each node and then running the following as root:

  kubeadm join k8s-master:6443 --token mq2nck.4vm76ar207pf97qo \
    --discovery-token-ca-cert-hash sha256:f6ce63678d7b8d3da67462c5730449d9165996d619abec14b0305aaf7f17f597 \
    --control-plane

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join k8s-master:6443 --token mq2nck.4vm76ar207pf97qo \
    --discovery-token-ca-cert-hash sha256:f6ce63678d7b8d3da67462c5730449d9165996d619abec14b0305aaf7f17f597
```



### 安装Calico网络插件

```sh
curl https://docs.projectcalico.org/v3.8/manifests/calico.yaml -O

#打开配置文件查找192.168.0.0/16，修改为--pod-network-cidr记录的ip
kubectl apply -f calico.yaml
```



### 工作节点加入集群

#### 关闭防火墙

```sh
systemctl stop firewalld
systemctl disable firewalld
```



#### 加入集群

```sh
kubeadm join k8s-master:6443 --token mq2nck.4vm76ar207pf97qo \
    --discovery-token-ca-cert-hash sha256:f6ce63678d7b8d3da67462c5730449d9165996d619abec14b0305aaf7f17f597
```



#### 重新获取令牌
```sh
kubeadm token create --print-join-command
```



### 安装可视化界面



```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.3.1/aio/deploy/recommended.yaml
```



#### 修改配置文件 找到 type，将 ClusterIP 改成 NodePort
```sh
kubectl edit svc kubernetes-dashboard -n kubernetes-dashboard
```



#### 找到端口，在安全组放行
```sh
kubectl get svc -A |grep kubernetes-dashboard


kubernetes-dashboard   dashboard-metrics-scraper   ClusterIP   10.96.236.251   <none>        8000/TCP                 7m4s
kubernetes-dashboard   kubernetes-dashboard        NodePort    10.96.218.159   <none>        443:32702/TCP            7m4s
```



#### 打开界面

<a href="https://192.168.64.6:32702" target="_blank">https://192.168.64.6:32702</a>

```sh
提示：Client sent an HTTP request to an HTTPS server.
键盘输入：thisisunsafe
```



#### 创建访问账号

```sh
vi dash-usr.yaml
```

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
```



#### 在 k8s 集群中创建资源
```sh
kubectl apply -f dash-usr.yaml
```



#### 获取访问令牌
```sh
kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard get sa/admin-user -o jsonpath="{.secrets[0].name}") -o go-template="{{.data.token | base64decode}}"
```



```tex
eyJhbGciOiJSUzI1NiIsImtpZCI6InVXeDl5SlBobzFqa2NVSDBveDNJTWNXVGdiNk5JNktONlEtc2tjNXB0RUUifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyLXRva2VuLW43cWJiIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiIxNGUwYTVkYS00NjVhLTRlYzgtODFkMy0xZTJhZWM4OGQ0OTgiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZXJuZXRlcy1kYXNoYm9hcmQ6YWRtaW4tdXNlciJ9.aVrbeNTYoC1UWzXE2Po8qug-hOt-O82_eMgDkbNaa5t03bhWAveHDvivbGU7JZsuC3c8o2g3HjIDfhwXCt3Sq84aCCbWpDHF6fT4_U_CK_TArSyoNZ5OPPi3CMLTYeUdUD87XBLRW1gcRRvS8rHcsMmoXfKXNnsn7iTCn-hIbInF2OTXXayC_9V39Fi62QOySReXrAbSuNJ8K3_AGEzQxdxNPiY6nc0Ig-tKsrPXYbDA9eg1knMMu67DqKwaveZvetX-zPS-L7xHpGNM1OlEbF1lG3-OshHXGcwHc1o9asLKFsbks7WxUEYwb8-DuZ1clc_xgWw9aqGDrV0s_4N7gQ
```





## Kubernetes实战



### 资源创建方式



#### yaml

用 yaml 配置 在 kubernetes 中创建资源

```bash
kubectl apply -f xxxx.yaml
```



#### 命令行

用命令行 在 kubernetes 中创建资源

```sh
#查看所有命名空间
kubectl get ns

#创建命名空间
kubectl create ns xxx

#删除命名空间
kubectl delete ns xxx
```



### Namespace

名称空间用来隔离资源

#### 命令行创建

```sh
# 查看命名空间
kubectl get ns

# 查看 部署了哪些应用
kubectl get pods -A
# 查看 默认命名空间（default）部署的应用
kubectl get pods

# 查看 某个命名空间（kubernetes-dashboard）部署的应用
kubectl get pod -n kubernetes-dashboard

# 创建命名空间
kubectl create ns hello
# 删除命名空间
kubectl delete ns hello
```



#### yaml创建

```yaml
# 版本号
apiVersion: v1
# 类型
kind: Namespace
# 元数据
metadata:
# Namespace（命名空间） 的 名称
  name: hello
```



```sh
vi hello.yaml

# 将上述内容 粘贴进 hello.yaml
kubectl apply -f hello.yaml

kubectl get ns
# kubectl delete ns hello
# 配置文件创建的资源 用配置文件 删
kubectl delete -f hello.yaml
```



### Pod

运行中的一组容器，Pod是kubernetes中应用的最小单位.

#### 命令行创建

```sh
# mynginx 是自定义的名称，nginx 镜像; 默认到 default 命名空间
kubectl run mynginx --image=nginx

# 查看default名称空间的Pod
kubectl get pods

# 查看描述，STATUS 是 ContainerCreating 的，查看进度（Events 属性）
kubectl describe pod mynginx

# 每个Pod - k8s都会分配一个ip
kubectl get pod -owide

# 查看Pod的运行日志
kubectl logs Pod名字

# 进入pod容器
kubectl exec -it Pod名字 -- bash

# 删除 Pod（默认的命名空间），kubectl delete pod mynginx -n 命名空间  （非默认命名空间）
kubectl delete pod mynginx
```



#### yaml 创建

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: mynginx
  # Pod 的 名字  
  name: mynginx
  # 指定命名空间 （不写是 默认 default）
  namespace: default
spec:
  containers:
  # 多个 容器，多个 - 
  - image: nginx
    # 容器的名字
    name: mynginx
```

```sh
vi mynginx.yaml

# 将上述内容 粘贴进来
kubectl apply -f mynginx.yaml

kubectl get pod
kubectl describe pod mynginx

# 配置文件创建的资源 用配置文件 删
kubectl delete -f mynginx.yaml

# 集群中的任意一个机器以及任意的应用都能通过Pod分配的ip来访问这个Pod，只能在集群内访问，
# 如果要在集群外访问，暴露 k8s 端口
```



#### 多容器部署

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: myapp
  # Pod 的 名字  
  name: myapp
  # 指定命名空间 （不写是 默认 default）
  namespace: default
spec:
  containers:
  # 多个 容器，多个 - 
  - image: nginx
    # 容器的名字
    name: mynginx
  - image: tomcat:8.5.68
    name: mytomcat
```

```sh
vi multicontainer-pod.yaml

# 将上述内容 粘贴进来

kubectl apply -f multicontainer-pod.yaml

kubectl get pod
kubectl describe pod myapp

# 查看日志
kubectl logs myapp -c mynginx

# 配置文件创建的资源 用配置文件 删
kubectl delete -f multicontainer-pod.yaml
```



### Deployment

控制Pod，使Pod拥有多副本，自愈，扩缩容等能力



#### 自愈和故障转移

应用：某一个 节点宕机后，用 Deployment 部署的容器 会在 另一个 节点 重新启动。

##### 自愈

```sh
kubectl create deployment mytomcat --image=tomcat:8.5.68

# 删了之后，以一个 新的 ID 重新启动了；用 delete 删不掉的
kubectl delete pod mytomcat-xxx -n default

# 查看 deployment 创建的资源
kubectl get deploy

# 删除 deployment 创建的资源
kubectl delete deploy mytomcat
```

##### 故障转移

```sh
kubectl create deployment mytomcat --image=tomcat:8.5.68
kubectl get pod -owide

docker ps | grep xxx

docker stop xxx

kubectl get pod
Restarts，重启次数 + 1。
```

把部署节点的服务器关机，强制关机。 

```sh
# 动态查看
kubectl get pod -w

一开始所在的node1关机后，又在node2启了一个。
这样子，k8s 天天 杀 Pod，起 Pod；可以设置一个时间 2min / 5min 等。
```









#### 多副本

--replicas：一次性部署多个 Pod。

##### 命令行 创建

```sh
# --replicas=3，部署 3个 Pod my-dep
kubectl create deployment my-dep --image=nginx --replicas=3

kubectl get deploy
```



##### yaml 创建

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: my-dep
  name: my-dep
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-dep
  template:
    metadata:
      labels:
        app: my-dep
    spec:
      containers:
      - image: nginx
        name: mynginx
```



#### 扩缩容

当流量过大时候，想增加 Pod 来分担压力，缩容类似。 Kubernetes 可以 动态的 对 Pod 扩缩容。以便资源分配

```sh
# 扩容
kubectl scale deployment/my-dep --replicas=5

# 缩容
kubectl scale deployment/my-dep --replicas=2

# 也可以通过 修改 yaml 中的 replicas 来达到 扩缩容
kubectl edit deploy my-dep

# 修改replicas的值
spec:
  progressDeadlineSeconds: 600
  replicas: 2

```



#### 滚动更新

类似于 灰度发布，先启动 一个新的 Pod，然后将旧的 Pod 下线。

```sh
# 查看之前用的镜像名称（spec.container.name）
kubectl get deploy my-dep -oyaml

# 改变 my-dep 中 nginx 的版本 （最新 -> 1.16.1）   --record 在 rollout histroy 中记录
kubectl set image deployment/my-dep mynginx=nginx:1.16.1 --record
kubectl rollout status deployment/my-dep
```



#### 版本回退

```sh
# 历史记录
kubectl rollout history deployment/my-dep

# 查看某个历史详情
kubectl rollout history deployment/my-dep --revision=2

# 回滚（回到上个版本）
kubectl rollout undo deployment/my-dep

# 观察过程，也是 先 启动新的，在终止旧的
kubectl get pod -w

# 查看 nginx 版本
kubectl get deploy/my-dep -oyaml | grep image

# 回滚（回到指定版本）
kubectl rollout undo deployment/my-dep --to-revision=2
```



#### 其他工作负载

除了Deployment，k8s 还有 `StatefulSet` 、`DaemonSet` 、`Job`  等 类型资源，我们都称为`工作负载`有状态应用使用`StatefulSet`  部署，无状态应用使用 `Deployment` 部署。无状态的 进容器，有状态的 物理部署（如Mysql、Redis等）

官网文档：<a href="https://kubernetes.io/zh/docs/concepts/workloads/controllers/" target="_blank">https://kubernetes.io/zh/docs/concepts/workloads/controllers/</a>

- Deployment：无状态应用部署，比如微服务，提供多副本等功能
- StatefulSet：有状态应用部署，比如redis，提供稳定的存储，网络等功能
- DaemonSet：守护型应用部署，比如日志收集组件，在每个机器都运行一份
- Job/CronJob：定时任务部署，比如垃圾清理组件，可以在指定时间运行



### Service

Pod 的服务发现 与 负载均衡；将一组 Pods 公开为 网络服务的抽象方法。（服务）



#### ClusterIP

只能在集群内部 ClusterIP 访问

##### 命令行创建

```sh
# kubectl expose 暴露端口。--type=ClusterIP 不传默认就是 ClusterP，target-port 目标端口（源端口） 
kubectl expose deploy my-dep --port=8000 --target-port=80

# 查看 service，里面有 CLUSTER-IP
# kubectl get service 或者 kubectl get svc
kubectl get service

# 查看 pod 标签
kubectl get pod --show-labels

# 删除
kubectl delete svc my-dep

#域名：默认是 服务.所在命名空间.svc,这个域名只能在pod内可以访问
curl my-dep.default.svc
```



##### yaml创建

```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app: my-dep
  name: my-dep
spec:
  selector:
    app: my-dep
  ports:
    - port: 8000
      protocal: TCP
      targetPort: 80
  type: ClusterIP
```





#### NodePort

可以在公网访问，暴露出来的端口是随机的。NodePort范围在 30000-32767 之间

##### 命令行创建

```sh
kubectl expose deployment my-dep --port=8000 --target-port=80 --type=NodePort
```



##### yaml创建

```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app: my-dep
  name: my-dep
spec:
  ports:
  - port: 8000
    protocol: TCP
    targetPort: 80
  selector:
    app: my-dep
  type: NodePort
```





### Ingress

**Ingress**：Service 的统一网关入口，底层就是 nginx。（服务），官网地址：<a href="https://kubernetes.github.io/ingress-nginx/" target="_blank">https://kubernetes.github.io/ingress-nginx/</a>，所有的请求都先通过 Ingress，由 Ingress 来 打理这些请求。类似微服务中的 网关。



#### 安装 Ingress

```sh
wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.47.0/deploy/static/provider/baremetal/deploy.yaml

# 安装资源
kubectl apply -f deploy.yaml

# 检查安装的结果
kubectl get pod,svc -n ingress-nginx
```



#### 域名访问

```sh
kubectl get svc -A

kubectl get nodes
```



##### 搭建 Service

```sh
vi test.yaml

# 复制下面

kubectl apply -f test.yaml
```



```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-server
spec:
  replicas: 2
  selector:
    matchLabels:
      app: hello-server
  template:
    metadata:
      labels:
        app: hello-server
    spec:
      containers:
      - name: hello-server
        image: registry.cn-hangzhou.aliyuncs.com/lfy_k8s_images/hello-server
        ports:
        - containerPort: 9000
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: nginx-demo
  name: nginx-demo
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-demo
  template:
    metadata:
      labels:
        app: nginx-demo
    spec:
      containers:
      - image: nginx
        name: nginx
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: nginx-demo
  name: nginx-demo
spec:
  selector:
    app: nginx-demo
  ports:
  - port: 8000
    protocol: TCP
    targetPort: 80
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: hello-server
  name: hello-server
spec:
  selector:
    app: hello-server
  ports:
  - port: 8000
    protocol: TCP
    targetPort: 9000
```



##### 配置 Ingress

```sh
vi ingress-rule.yaml

# 复制下面配置

kubectl apply -f ingress-rule.yaml

# 查看 集群中的 Ingress
kubectl get ingress
```



```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress  
metadata:
  name: ingress-host-bar
spec:
  ingressClassName: nginx
  rules:
  - host: "hello.atguigu.com"
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: hello-server
            port:
              number: 8000 # hello-server （service） 的端口是 8000
  - host: "demo.atguigu.com"
    http:
      paths:
      - pathType: Prefix
        path: "/"  # 把请求会转给下面的服务，下面的服务一定要能处理这个路径，不能处理就是404
        backend:
          service:
            name: nginx-demo  #java，比如使用路径重写，去掉前缀nginx
            port:
              number: 8000


apiVersion: networking.k8s.io/v1
kind: Ingress  
metadata:
  name: ingress-host-bar
spec:
  ingressClassName: nginx
  rules:
    - host: "hello.atguigu.com"
      http:
        paths:
          - pathType: Prefix
            path: "/"
            backend:
              service:
                name: hello-server
                port:
                  number: 8000 # hello-server 的端口是 8000
    - host: "demo.atguigu.com"
      http:
        paths:
          - pathType: Prefix
            path: "/"
            backend:
              service:
                name: nginx-demo
                port:
                  number: 8000
```



#### 路径重写

```sh
vi ingress-nginx.yaml

kubectl apply -f ingress-nginx.yaml
```



```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress  
metadata:
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
  name: ingress-host-bar
spec:
  ingressClassName: nginx
  rules:
  - host: "hello.atguigu.com"
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: hello-server
            port:
              number: 8000
  - host: "demo.atguigu.com"
    http:
      paths:
      - pathType: Prefix
        path: "/nginx(/|$)(.*)" 
        backend:
          service:
            name: nginx-demo  
            port:
              number: 8000
```



#### 限流

官网文档：<a href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration" target="_blank">https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration</a>

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-limit-rate
  annotations:
    # 限流
    nginx.ingress.kubernetes.io/limit-rps: "1"
spec:
  ingressClassName: nginx
  rules:
  - host: "haha.atguigu.com"
    http:
      paths:
      - pathType: Exact
        path: "/"
        backend:
          service:
            name: nginx-demo
            port:
              number: 8000
```

```sh
vim ingress-rule-2.yaml

# 复制上面配置
kubectl apply -f ingress-rule-2.yaml

kubect get ing
```



### Kubernetes 存储抽象

类似于 Docker 中的挂载。但要考虑自愈、故障转移时的情况。

####  NFS 搭建

网络文件系统

##### 主节点

```sh
# 所有机器执行
yum install -y nfs-utils

# master机器执行：nfs主节点，rw读写，暴露 /nfs/data/ 目录，以安全读写方式同步
echo "/nfs/data/ *(insecure,rw,sync,no_root_squash)" > /etc/exports

# 创建该文件夹
mkdir -p /nfs/data

# 启动rpc远程绑定；开机启动，现在启动
systemctl enable rpcbind --now
# 启动nfs服务器
systemctl enable nfs-server --now

# 配置生效
exportfs -r

# 查看
exportfs
```



##### 从节点

```sh
# 检查远程机器有哪些目录可以同步挂载，下面的 IP 是master IP
showmount -e 192.168.64.6

# 执行以下命令挂载nfs服务器上的共享目录到本机路径/nfs/data
mkdir -p /nfs/data

# 使用nfs网络文件系统挂载，将远程和本地的文件夹挂载
mount -t nfs 192.168.64.6:/nfs/data /nfs/data

# 在master服务器，写入一个测试文件
echo "hello nfs server" > /nfs/data/test.txt

# 在 2 个从服务器查看
cat /nfs/data/test.txt
```



#### 原生方式数据挂载

在 /nfs/data/nginx-pv 挂载，然后修改， 里面两个 Pod 也会同步修改。

问题：删掉之后，文件还在，内容也在，是没法管理大小的。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: nginx-pv-demo
  name: nginx-pv-demo
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-pv-demo
  template:
    metadata:
      labels:
        app: nginx-pv-demo
    spec:
      containers:
      - image: nginx
        name: nginx
        volumeMounts:
        - name: html
        	#挂载目录
          mountPath: /usr/share/nginx/html
      volumes:
        #volumeMounts.name
        - name: html
          nfs:
          	#master ip
            server: 192.168.64.6
            path: /nfs/data/nginx-pv
```



```sh
mkdir -p /nfs/data/nginx-pv

vi deploy-nginx-pv.yaml

#创建部署
kubectl apply -f deploy-nginx-pv.yaml

#查看pod状态
kubectl get pod -n default -owide

#nginx-pv-demo-99c9b4845-krnnl   1/1     Running   0          6m56s   10.244.36.85     k8s-node1   <none>           <none>
#nginx-pv-demo-99c9b4845-vnww2   1/1     Running   0          6m56s   10.244.169.152   k8s-node2   <none>           <none>


echo 1111 > /nfs/data/nginx-pv/index.html

# 进入容器内部查看
kubectl exec -it nginx-pv-demo-99c9b4845-krnnl -- bash

cd /usr/share/nginx/html

cat index.html
```



##### 占用空间

```sh
kubectl delete -f deploy-nginx-pv.yaml

ls /nfs/data/nginx-pv/

#删掉之后，文件还在，内容也在，是没法管理大小的。
```



#### PV和PVC

**PV**：持久卷（Persistent Volume），将应用需要持久化的数据保存到指定位置

**PVC**：持久卷申明（Persistent Volume Claim），申明需要使用的持久卷规格

这里是静态的， 就是自己创建好了容量，然后 PVC 去挑。 还有动态供应的，不用手动去创建 PV池子。

##### 创建PV池

```sh
# 在 nfs主节点（master服务器） 执行
mkdir -p /nfs/data/01
mkdir -p /nfs/data/02
mkdir -p /nfs/data/03
```



##### 创建PV

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv01-10m
spec:
  # 限制容量
  capacity:
    storage: 10M
  # 读写模式：可读可写
  accessModes:
    - ReadWriteMany
  storageClassName: nfs
  nfs:
    # 挂载上面创建过的文件夹
    path: /nfs/data/01
    # nfs主节点服务器的IP
    server: 192.168.64.6
---
apiVersion: v1
kind: PersistentVolume
metadata:
  # 这个name要小写，如Gi大写就不行
  name: pv02-1gi
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteMany
  storageClassName: nfs
  nfs:
    path: /nfs/data/02
    # nfs主节点服务器的IP
    server: 192.168.64.6
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv03-3gi
spec:
  capacity:
    storage: 3Gi
  accessModes:
    - ReadWriteMany
  storageClassName: nfs
  nfs:
    path: /nfs/data/03
    # nfs主节点服务器的IP
    server: 192.168.64.6
```



```sh
vi pv.yaml

# 复制上面文件

kubectl apply -f pv.yaml

# 查看pv， kubectl get pv
kubectl get persistentvolume
```



#### PVC创建与绑定

##### 创建PVC

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nginx-pvc
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      # 需要 200M的 PV
      storage: 200Mi
  # 上面 PV 写的什么 这里就写什么    
  storageClassName: nfs
```

```sh
vi pvc.yaml

# 复制上面配置

kubectl get pv

kubectl apply -f pvc.yaml

kubectl get pv

kubectl get pvc
```

##### 创建 Pod 绑定 PVC

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: nginx-deploy-pvc
  name: nginx-deploy-pvc
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-deploy-pvc
  template:
    metadata:
      labels:
        app: nginx-deploy-pvc
    spec:
      containers:
      - image: nginx
        name: nginx
        volumeMounts:
        - name: html
          mountPath: /usr/share/nginx/html
      volumes:
        - name: html
          # 之前是 nfs，这里用 pvc
          persistentVolumeClaim:
            claimName: nginx-pvc
```

```sh
vi dep02.yaml

# 复制上面 yaml

kubectl apply -f dep02.yaml

kubectl get pod

kubectl get pv

kubectl get pvc
```



#### ConfigMap

**ConfigMap**：抽取应用配置，并且可以自动更新。挂载配置文件， PV 和 PVC 是挂载目录的。

##### redis示例

创建 ConfigMap

```sh
echo "appendonly yes" > ~/redis.conf

#创建配置，redis保存到k8s到etcd
kubectl create cm redis-conf --from-file=redis.conf

#查看
kubectl get cm

rm -f ~/redis.conf

# 查看ConfigMap的yaml配置
kubectl get cm redis-conf -oyaml
```



```yaml
apiVersion: v1
data:    # data是所有真正的数据，key：默认是文件名   value：配置文件的内容 d
  redis.conf: |
    appendonly yes
kind: ConfigMap
metadata:
  name: redis-conf
  namespace: default
```

##### 创建Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
spec:
  containers:
  - name: redis
    image: redis
    command:
      # 启动命令
      - redis-server
      # 指的是redis容器内部的位置
      - "/redis-master/redis.conf"  
    ports:
    - containerPort: 6379
    volumeMounts:
    - mountPath: /data
      #挂载下方空目录
      name: data
    - mountPath: /redis-master
      #挂载下方config的配置
      name: config
  volumes:
    - name: data
      emptyDir: {}
    - name: config
      configMap:
        #名称为redis-conf的配置集
        name: redis-conf
        items:
        #获取data中key为redis.conf的配置
        - key: redis.conf
        #redis-master路径下会创建这个文件
          path: redis.conf
```



```sh
vi redis.yaml

# 复制上面配置

kubectl apply -f redis.yaml

kubectl get pod

# 进入容器内部查看
kubectl exec -it redis -- bash

cd /redis-master
ls
```



##### 修改ConfigMap

```sh
kubectl get cm

# 修改配置 里 redis.conf 的内容
kubectl edit cm redis-conf
```



检查默认配置

```sh
kubectl exec -it redis -- redis-cli

127.0.0.1:6379> CONFIG GET appendonly
127.0.0.1:6379> CONFIG GET requirepass
```



- 修改了 ConfigMap，Pod里面的配置文件会跟着同步。
- 但配置值 未更改，需要重新启动 Pod 才能从关联的ConfigMap 中获取 更新的值。 Pod 部署的中间件 自己本身没有热更新能力。



#### Secret

**Secret** ：是对象类型，用来保存敏感信息，例如密码、OAuth 令牌和 SSH 密钥。 将这些信息放在 secret 中比放在 [Pod](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/) 的定义或者 [容器镜像](https://kubernetes.io/zh/docs/reference/glossary/?all=true#term-image) 中来说更加安全和灵活。



##### 创建Secret

```sh
kubectl create secret docker-registry docker-secret \
--docker-username=xxx \
--docker-password=xxx \
--docker-email=xxx@gmail.com

##命令格式
kubectl create secret docker-registry regcred \
  --docker-server=<你的镜像仓库服务器> \
  --docker-username=<你的用户名> \
  --docker-password=<你的密码> \
  --docker-email=<你的邮箱地址>

# 查看
kubectl get secret

kubectl get secret docker-secret -oyaml
```



```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mynginx
spec:
  containers:
  - name: mynginx
    image: gtahub/mynginx:1.0
  # 加上 Secret  
  imagePullSecrets:
  - name: docker-secret
```

```sh
vi mypod.yaml

# 复制上面配置

kubectl apply -f mypod.yaml

kubectl get pod
```








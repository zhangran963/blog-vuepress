---
title: 'ssh'
---


## 登录

* 登录: `ssh -p 2020 root@121.5.116.59`

## sshd服务

* 启动`service sshd start`
* 重启`service sshd restart`
* 停止`service sshd stop`

## 查看sshd服务占用的端口

* `netstat -tnlp | grep ssh`

## 更改默认端口

* 配置文件在: `/etc/ssh/sshd_config`
* 更改里面的内容

  

``` sh
    # 更改前
    #Port 22

    # 更改后(开启多个端口)
    Port 22
    Port 2020
  ```

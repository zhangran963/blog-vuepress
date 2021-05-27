---
title: '占用资源高'
---

## 禁止用户

1. `top`: 查看服务占用情况
2. `top -H -p [PID值]`: 查看具体某个服务的占用情况
3. `vim /etc/passwd`: 在要禁止的用户前, 添加 "#"
   ![](https://ran-1303246897.cos.ap-guangzhou.myqcloud.com/www/markdown/20200201123445.png)
4. `kill -9 [PID码]`: 踢出用户

## 限制内容使用量

* 更改配置文件`/etc/security/limits.conf`, 添加如下内容
* 具体内存量, 可通过`free`查看内存信息后, 酌情限制; 

```sh
# [进程名称] soft as [限制内存量]
sshd soft as 84120
sshd hard as 84120
```

## 限制优先级
* 使用 nice/renice 命令
> 注: 资源充足时, 优先级低的进程也可能占用资源高
- 通过`top`获取的列表中, `ni`值表示的即是优先级;

* `nice -n [优先级] ./文件地址等`: 运行并设置优先级;
* `renice [优先级] [PID值]`: 更新某 PID 的优先级, 值越大优先级越低;


## 限制cpu使用率
* 使用 cpulimit 工具
> 受限的内容, 严格不超过限制值运行, 无论资源是否富裕;

1. `apt install cpulimit`: 安装 cpulimit 工具;
2. `cpulimit --limit [最高比例] --pid [PID值] --background`: 启用对某 PID 的限制;

- 示例: `cpulimit --limit 30 --pid 27229 --background`

---
title: 'shadowsocks'
sidebar: 'auto'
---

## 以下在 GoogleCloud + Debian 上操作;

注: 谷歌云, 每次停止一次实例, 再次打开时, ip地址更换了;

* `logout` 或 `exit`: 退出系统连接;
* `sudo -i`: 切换到root用户;


## 免密码登录
```md
`ssh-copy-id -i ~/.ssh/id_rsa.pub 用户名@服务器IP -p 端口号`
```
或
```md
1. 找到本地`id_rsa.pub`文件(一般在`/Users/ran/.ssh/id_rsa.pub`);
2. 上传到远程服务器(在 googleCloud 上用的网页自带上传);
    * 上传后, 文件在用户目录下;
3. 把 本地机的公钥插入到远程服务器的 authorized_keys 文件中: `cat ~/id_rsa.pub >> ~/.ssh/authorized_keys`;
4. 更改权限: `chmod 600 ~/.ssh/authorized_keys`;
```



## 开启 sshd (默认未开启)
1. `vi /etc/ssh/sshd_config`: 编辑 ssh的配置文件;
2. 将`#PasswordAuthentication no`改为`PasswordAuthentication yes`;
3. `[esc]` + `wq!` + `[enter]`: 保存并退出编辑;
4. `/etc/init.d/ssh start` 或 `service ssh start`: 启动 ssh 服务;
5. `/etc/init.d/ssh status`: 查看 ssh 状态;
6. `update-rc.d ssh enable`: 添加开机启动(重启生效);(disabled 开机不启动);


## 配置 ss
1. `wget --no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks.sh`: 下载安装包;
2. `chmod +x shadowsocks.sh`;
3. `sudo ./shadowsocks.sh 2>&1 | tee shadowsocks.log`: 启动, 加上`sudo`是要有 root 权限;
4. 其他就是设置密码 / 端口 之类的;
5. `./shadowsocks.sh uninstall`: 卸载 shadowsocks;


## 开启TCP BBR拥塞控制算法
[教程地址](https://github.com/iMeiji/shadowsocks_install/wiki/开启TCP-BBR拥塞控制算法)

1. 查看内核 `uname -r`, 需要内核>=4.9;
2. 看见机器中有没有开启 bbr: `lsmod | grep bbr`, 有 tcp_bbr 模块, 就是已经开启了 BBR;
3. 若没有 BBR, 依次执行(没有权限时, 添加 `sudo`);
    * `modprobe tcp_bbr`;
    * `echo "tcp_bbr" | sudo tee --append /etc/modules-load.d/modules.conf`;
    * `echo "net.core.default_qdisc=fq" | sudo tee --append /etc/sysctl.conf`
    * `echo "net.ipv4.tcp_congestion_control=bbr" | sudo tee --append /etc/sysctl.conf`  
    * `sysctl -p`: 保存生效
4. 执行以下两条, 若都有 bbr, 说明已经开启 bbr;
    * `sysctl net.ipv4.tcp_available_congestion_control`
    * `sysctl net.ipv4.tcp_congestion_control`;
5. 再次执行第2条, 查看tcp_bbr 模块;
---
title: '准备'
---

## 更新软件
1. 登录后, 一般为普通用户身份, 用`su -` 或 `sudo -i`切换成 root用户;
2. `sudo apt update`
3. `apt list --upgradable`: 查看可更新的软件;
4. `sudo apt upgrade`或`sudo apt -f upgrade`: 更新; 
5. `sudo apt autoremove`: 清理旧组件;
6. 以上所有命令适合ubuntu16.04以上系统, 以下系统尝试`apt-get`替换`apt`;

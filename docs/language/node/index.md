---
home: true
heroText: Node.js
footer: MIT Licensed | Copyright © 2021-present ran
---


## 目录
- [File](./file/main)
- [Path](./path/main)
- [http](./http/main)
- [https](./https/main)
- [process](./process/main)
- [crypto](./crypto/main)

- [常见错误](./error/main)

## linux环境安装 node
1. 下载:`wget https://nodejs.org/dist/v10.14.1/node-v10.14.1-linux-x64.tar.xz`;
2. `tar -xvf node-v10.7.0-linux-x64.tar.xz`: 解压
3. `mv node-v10.7.0-linux-x64 node-v12.12.0`: 重命名为 node-v12.12.0 (仅是为了方便);
4. `mv ~/node-v12.12.0 /usr/local/etc/`: 移动到合适的位置
5. 设置全局环境变量
```sh
  export NODE_HOME=/usr/local/etc/node-v12.12.0/bin
  export PATH=$PATH:$NODE_HOME
```
或 设置软链接
```sh
  ln -s /root/node-server/bin/node /usr/local/bin/    # 给 node 建立软链接;
  ln -s /root/node-server/bin/npm /usr/local/bin/     # 给 npm 建立软链接;
```



## 升级node 和 npm
1. `node -v`: 查看一下版本;
2. `sudo npm cache clean -f`: 清除缓存;
3. `sudo npm install -g n`: 安装 n工具, 这个工具是管理 nodejs 版本的, 名称就叫 n;
4. `sudo n stable`: 安装最新版 node.js(是最新版,不是稳定版);
5. `node -v`: 查看更新后的版本;
6. `sudo npm install npm@latest -g`: 更新 npm ;
7. `npm -v`: 查看更新后的版本;


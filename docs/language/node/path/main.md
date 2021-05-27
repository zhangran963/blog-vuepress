---
title: '路径相关'
---

## __dirname, __filename, cwd()等

* `__dirname`: 当前文件的路径
* `__dirname`: 当前文件的路径+文件名
* `process.cwd()`: 执行命令的入口文件
  + 注意: 执行命令的入口, 不一定是项目根目录

## 被引用

* `require.main.path`: 引用"本文件"的文件的(路径)
* `require.main.filename`: 引用"本文件"的文件的(路径 + 文件名)

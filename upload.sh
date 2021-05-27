#!/bin/bash

rootPath=$PWD

yarn docs:build

echo '打包完成'

sleep 1

# 上传 dist/* 到远程
scp -r -p 2020 ${rootPath}/docs/.vuepress/dist/* root@121.5.116.59:/root/www/blog-md-vuepress/

echo '已更新'
---
title: 'ffmpeg'
sidebar: 'auto'
---

[教程地址](http://www.ruanyifeng.com/blog/2020/01/ffmpeg.html)

## 安装

* `brew install ffmpeg`

## 查看文件信息

* `ffmpeg -i input.mp4`: 查看信息
* `ffmpeg -i input.mp4 -hide_banner`: 查看元信息

## 下载m3u8视频

* `ffmpeg -i [m3u8视频地址] /Users/ran/Downloads/abc.mp4`

## 下载指定时间区间的视频

* `ffmpeg -i [m3u8视频地址] -ss 00:02:00 -to 01:10:00 /Users/ran/Downloads/abc.mp4`

## 截取某时间区间

* `ffmpeg -i ./source.mp4 -vcodec copy -acodec copy -ss 00:08:43 ~/Desktop/convert.mp4 -y`

## 转格式

* `ffmpeg -i input.avi output.mp4`
* `ffmpeg -i input.avi -c:v libx265 output.mp4`

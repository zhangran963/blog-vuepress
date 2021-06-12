---
title: '响应'
---

## 响应报文

```md
HTTP/1.1 200 OK
Server: bfe/1.0.8.18
Date: Thu, 30 Mar 2017 12:28:00 GMT
Content-Type: text/html; charset=utf-8
Connection: keep-alive
Cache-Control: private
Expires: Thu, 30 Mar 2017 12:27:43 GMT
Set-Cookie: BDSVRTM=0; path=/
```

1. 状态行
    - HTTP/协议版本 状态码 状态码描述
2. 响应头
    - Date: 服务器时间
    - Content-Type: 资源类型
    - Connection:
      * close: 连接已关闭
      * keep-alive: 连接保持中, 可用用后续请求
    - Cache-Control: 缓存控制
    - Expires: 设置过期时间
    - Set-Cookie: 设置Cookie信息
3. 空行

4. 响应体

```md
<!DOCTYPE html>
<!--STATUS OK-->
<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <link rel="icon" sizes="any" mask href="//www.baidu.com/img/baidu.svg">
    <title>百度一下，你就知道</title>
</head>
<body>
  ...
</body>
</html>
```

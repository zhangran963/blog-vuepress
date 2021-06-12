---
title: '请求'
---

## MIME

* 设定 **某种扩展名的文件** 用一种 **(特定)应用程序** 来打开的方式类型
* 示例: `text/html`, `text/plain`, `image/png`, `application/pdf`

***

## 请求报文

1. 请求行
    - 请求方法 &nbsp;&nbsp; URL地址 &nbsp;&nbsp; HTTP/版本
2. 请求头
    - Accept: 客户端可识别得内容类型列表 - text/html,application/xhtml+xml,application/xml
    - Host: 请求的主机名，允许多个域名同处一个IP地址，即虚拟主机
      * 如, 在 `https://todolist.thesoundofsilence.top` 中
      ![](https://tva1.sinaimg.cn/large/006y8mN6ly1g7k5buk8yrj30hs040dfq.jpg)

    - connection：连接方式
      * close：告诉WEB服务器或代理服务器，在完成本次请求的响应后，断开连接
      * keep-alive：告诉WEB服务器或代理服务器。在完成本次请求的响应后，保持连接，以等待后续请求, HTTP/1.1支持
    - Cookie：存储于客户端扩展字段，向同一域名的服务端发送属于该域的cookie
3. 空行
4. 请求体
  + 只在 POST方法中使用
  + 响应中的有关参数: `Content-Length`, `Content-Length`

```md
GET / HTTP/1.1
Host: www.baidu.com
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate, sdch, br
Accept-Language: zh-CN,zh;q=0.8,en;q=0.6,id;q=0.4
Cookie: PSTM=1490844191; BIDUPSID=2145FF54639208435F60E1E165379255; BAIDUID=CFA344942EE2E0EE081D8B13B5C847F9:FG=1;
```

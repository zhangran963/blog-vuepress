---
title: 'CORS'
---

## 跨域

* 跨域产生的原因是**浏览器同源策略**的限制; 
* 当前域名下的 js 只能读取同域的数据。\
  当使用 js 获取不同域名下的数据时，就会产生跨域的问题。\
  只有双方在协议、主机和端口号都完全匹配的情况下，可以被授权访问; 
* 能否跨域成功关键在服务器的配置
* 浏览器检测到跨域请求, 自动添加某些头信息

### 条件

* 协议
* 域名
* 端口号

### 过程

* 浏览器: 发现本次是简单请求(肯定是 CORS), 自动添加 `Origin: http://api.bob.com`
* 服务器: 响应结果中带有 `Access-Control-Allow-Origin`

```sh
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```

### Access-Control-Allow-Origin

* 合法的客户端域名

### Access-Control-Allow-Methods

* 合法的方法

### Access-Control-Allow-Headers

* CORS请求，XHR对象的getResponseHeader方法只能获取6个基本字段
* Cache-Control Content-Language Content-Type Expires Last-Modified Pragma
* 如果你需要获取其它字段、则需要在Access-Control-Expose-Headers指定

### Access-Control-Expose-Headers

:::

### Access-Control-Allow-Credentials

* 是否允许带有cookie; (默认不允许)
* 设置cookie, 浏览器需开启 withCredentials 属性

```js
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

::: tip
若需要发送cookie, 则Access-Control-Allow-Origin不能是"*", 得是具体的值; 
:::
::: tip
Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传
:::


### Access-Control-Max-Age
* 预检请求的有效期, 单位: 秒
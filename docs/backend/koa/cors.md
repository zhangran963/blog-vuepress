---
title: 'CORS'
---

## [跨域资源共享](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

## 涉及到跨域的情况

* 由 XMLHttpRequest 或 Fetch 发起的跨域 HTTP 请求。
* Web 字体 (CSS 中通过 @font-face 使用跨域字体资源), 因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用。
* WebGL 贴图
* 使用 drawImage 将 Images/video 画面绘制到 canvas
* 样式表（使用 CSSOM）
注, 不包含: 
* `<img>` `<script></script>` `background-image: url('xxx')`等; 

理解: 跨域需要在目标服务器上做配置, 允许哪个域名的网站访问, 
* 服务器 `localhost:5555` 和 `localhost:7777`; 5555服务器的页面访问7777服务器的服务, 需要在7777中配置'允许5555服务器来访问'; 
* `跨站请求可以正常发起，但是返回结果被浏览器拦截了。`: 测试结果是 http 请求返回了数据, `.then`的回调中不能接收数据, 真的是response被浏览器拦截了, 而不是没发出request; 

## 跨域

### 直接指定域名

```js
// 7777服务器
app.use(async (ctx, next) => {
  ctx.response.set('Access-Control-Allow-Origin', 'http://localhost:5555');
  ctx.response.set('Access-Control-Allow-Credentials', true);
  ctx.response.set('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
  // 下面这段, 看起来并不必须;
  // ctx.response.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');

  await next();
});
```

### koa2-cors插件

* 安装`yarn add koa2-cors`
* 使用

```js
// 在目标服务器中
const cors = require('koa2-cors');

// 必须的只有 credentials 选项;
app.use(cors({
  // origin: function(ctx){
  //     return 'http://localhost:5555';
  // },
  // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  // maxAge: 5,
  credentials: true,
  // allowMethods: ['GET', 'POST', 'DELETE'],
  // allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
```

## 关键参数

* `Access-Control-Allow-Origin: <origin> | *`:
    - 设置为`*`时, 得是不需要携带身份凭证(cookie,token)的请求;
* `Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header`: 允许浏览器获取头部参数(除了几项可以直接获取的参数以外的, 如 Cacne-Control, Content-Language, Content-Type, Last-Modified 等)的白名单; 
    - 浏览器通过`XMLHttpRequest.getResponseHeader(headerName)`获取;
* `Access-Control-Allow-Credentials: true`: 当浏览器的credentials设置为true时是否允许浏览器读取response的内容, 只有 `true` 一个值; 
* `Access-Control-Allow-Methods: <method>[, <method>]*`: 实际请求允许的方法; 
* `Access-Control-Allow-Headers: <field-name>[, <field-name>]*`: 实际请求中允许携带的头部字段; 

---
title: 'Response对象'
---

## Response对象

* `fetch(...)`的结果
* 除了包含异步的 `res.json` 方法外, 还有其它属性
* res.ok | boolean: 请求是否成功; 
  + true: 状态码是200 ~ 299
  + false: 其它
* res.status: 状态码
* res.statusText: 状态信息; 如请求成功的"OK"; 
* res.url: 请求的URL(或 跳转后的URL)
* res.type: 
  + `basic`: 同源请求
  + `cors`: 跨域请求
  + `error`: 网络错误
  + `opaque`: 简单的跨域请求(类似"form表单")
* res.redirected: 是否发生过跳转
* res.headers: 响应头

### 响应头

* `res.headers.get('Content-Type')`: 获取响应头部信息

```JS
const response = await fetch(url);

for (let [key, value] of response.headers) {
  console.log(`${key} : ${value}`);
}
```

### 响应数据1

* `res.text()`: 文本字符串
* `res.json()`: json对象
* `res.blob()`: 二进制Blob对象
* `res.formData()`: FormData表单对象
* `res.arrayBuffer()`: 二进制ArrayBuffer对象

* 如上方法, 只能读取1次; 
* 所以有了复制自身: `res.clone()`

### 响应数据2

* `res.body`: 这个属性是Response对象暴露的底层接口, 返回 ReadableStream对象; 

```JS
const response = await fetch('flower.jpg');
const reader = response.body.getReader(); /* 遍历器 */

while (true) {
  const {
    done,
    value
  } = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

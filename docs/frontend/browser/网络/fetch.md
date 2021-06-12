---
title: 'fetch'
---

## fetch与XMLHttpRequest的差异

* fetch使用Promise; 不是回调函数; 
* 才用模块化设计, API分散在多个对象上(Response对象, Request对象, Headers对象), 设计更合理 
* fetch通过数据流(Stream对象)处理, 支持分块读取, 有利于减少内存占用, 提升性能; 对大文件或网速慢时有用; 
* XMLHttpRequest对象不支持数据流, 所有数据放到缓存中, 不能分块读取; 

## 常见用法

* `res.json()`是异步操作, 取出所有内容+转换成JSON对象

```JS
fetch('https://api.github.com/users/ruanyf')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log('Request Failed', err));
```

```JS
async function getJSON() {
  let url = 'https://api.github.com/users/ruanyf';
  try {
    let res = await fetch(url);
    return await res.json(); /* res.json()是异步操作 */
  } catch (error) {
    console.log('Request Failed', error);
  }
}
```

## 语法

### POST

```JS
fetch(url, {
  method: 'POST',
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: 'foo=bar&lorem=ipsum',
});
```

### JSON数据

```JS
const user = {
  name: 'John',
  surname: 'Smith'
};
/* 请求 */
fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});
```

### 表单数据

```JS
/* 上传的文件 */
const input = document.querySelector('input[type="file"]');
/* 表单对象 */
const data = new FormData();
data.append('file', input.files[0]);
data.append('user', 'foo');

fetch('/upload', {
  method: 'POST',
  body: data
});
```

### 二进制数据

```JS
let blob = await new Promise(resolve =>
  canvasElem.toBlob(resolve, 'image/png')
);

let response = await fetch('/article/fetch/post/image', {
  method: 'POST',
  body: blob
});
```

## 配置项的完整API

* fetch()请求的底层用的是 Request对象 的接口，参数完全一样，因此上面的 API 也是Request对象 的 API

```JS
const response = fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined,
  referrer: "about:client",
  referrerPolicy: "no-referrer-when-downgrade",
  mode: "cors",
  credentials: "same-origin",
  cache: "default",
  redirect: "follow",
  integrity: "",
  keepalive: false,
  signal: undefined
});
```

### mode

* `cors(默认)`: 支持跨域
* `same-origin`: 仅支持同源
* `no-cors`: 同源 + 简单请求的跨域

### credentials

* `same-origin(默认)`: 同源时发送Cookie, 跨域时不发送; 
* `include`: 都发送; 
* `omit`: 都不发送; 

## 取消

* fetch()请求发送以后，如果中途想要取消，需要使用AbortController对象

```JS
let controller = new AbortController();
let signal = controller.signal;

fetch(url, {
  signal: controller.signal
});

signal.addEventListener('abort',
  () => console.log('abort!')
);

controller.abort(); // 取消

console.log(signal.aborted); // true
```

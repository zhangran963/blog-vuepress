## iframe错误



## Script error

- 一般是跨域问题

## 崩溃和卡顿

1. `load`和`beforeunload`, 统计加载和卸载;
2. `Service Worker`
   - 和网页是独立的工作线程;
   - 生命周期比网页长;
   - 网页通过`navigator.serverWorker.controller.postMessage`发送消息;

## 发送数据的方法之一

- 在`beforeunload`或`unload`阶段, 发送**同步**网络请求(会阻塞网页卸载);
- "同步"是为了保证数据发送成功;

```js
window.addEventListener('unload', logData, false);

function logData() {
	var client = new XMLHttpRequest();
	client.open('POST', '/log', false); // 第三个参数表明是同步的 xhr
	client.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
	client.send(analyticsData);
}
```

## 发送数据方法之一

[sendBeacon](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)

- 卸载网页之前发送数据
- `sendBeacon`是异步的; 卸载当前网页后, 浏览器依旧能发送成功;

```js
window.addEventListener('unload', logData, false);
```

function logData() {
navigator.sendBeacon("/log", analyticsData);
}

```

```

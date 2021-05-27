---
title: 'JsBridge'
---

## 定义

* 在移动操作系统中, JavaScript运行在容器中，例如 WebView 和 JSCore。
* 构建 Native 和非 Native 间消息通信的通道
* 类似 RPC (Remote Procedure Call，远程过程调用）通信
* 主要逻辑: 通信调用Native与JS） 和 句柄解析调用。类似JSONP

### 功能

* 打开 相册、摄像头、通信、蓝牙、指纹支付等；

## JS调用Native

### 1. 注入 API 

> 基于 Webview 提供的能力，我们可以向 Window 上注入对象或方法。使用该方式时，JS 需要等到 Native 执行完对应的逻辑后才能进行回调里面的操作。

* Native通过Webview的API, 更改全局对象; 
* 单需要等待全局对象更改完成后, 才能使用; 

```JS
window.NativeApi.share();
```

### 2. 拦截 URL Scheme

* URLScheme: 类似url的链接, 是为了方便app直接互相调用设计的; 

> Android 和 iOS 都可以通过拦截 URL Scheme 并解析 scheme 来决定是否进行对应的 Native 代码逻辑处理

### 3. 重写 prompt

> 通过修改浏览器的部分 Window 对象的方法来完成操作。主要是拦截 alert、confirm、prompt、console.log 四个方法，分别被 Webview 的 onJsAlert、onJsConfirm、onConsoleMessage、onJsPrompt 监听

* 重写window对象上的方法, 如`alert`、`confirm`、`prompt`、`console.log`等

## Native调用JS

* 把方法挂载在window上, 供Native调用; 

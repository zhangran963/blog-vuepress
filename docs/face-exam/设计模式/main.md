---
title: '设计模式'
---

## 发布订阅模式

> 在软件架构中，发布-订阅是一种消息范式，消息的发送者（称为发布者）不会将消息直接发送给特定的接收者（称为订阅者）。而是将发布的消息分为不同的类别，无需了解哪些订阅者（如果有的话）可能存在。同样的，订阅者可以表达对一个或多个类别的兴趣，只接收感兴趣的消息，无需了解哪些发布者（如果有的话）存在; 

* 发布者发布消息
* 订阅者订阅消息, 可多个

```JS
class Event {
  constructor() {
    // 所有 eventType 监听器回调函数（数组）
    this.listeners = {}
  }
  /**
   * 订阅事件
   * @param {String} eventType 事件类型
   * @param {Function} listener 订阅后发布动作触发的回调函数，参数为发布的数据
   */
  on(eventType, listener) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = []
    }
    this.listeners[eventType].push(listener)
  }
  /**
   * 发布事件
   * @param {String} eventType 事件类型
   * @param {Any} data 发布的内容
   */
  emit(eventType, data) {
    const callbacks = this.listeners[eventType]
    if (callbacks) {
      callbacks.forEach((c) => {
        c(data)
      })
    }
  }
}

const event = new Event()
event.on('open', (data) => {
  console.log(data)
})
event.emit('open', {
  open: true
})
```

## 观察者模式

## 装饰者模式

## 策略模式

* 配置

## 适配器模式

* 接口返回第一种数据, 后来改变为第二种数据, 需要适配器模式

```JS
[{
    "label": "选择一",
    "value": 0
  },
  {
    "label": "选择二",
    "value": 1
  }
]

[{
    "label": "选择一",
    "text": 0
  },
  {
    "label": "选择二",
    "text": 1
  }
]
```

## 单例模式

* 有些场景, 实例化1次就缓存, 可以减少内存占用
* 如DOM不变, 里面的内容可以更新

```JS
/* 原函数 */
const createLoginLayer = function() {
  const div = document.createElement('div')
  div.innerHTML = '登入浮框'
  div.style.display = 'none'
  document.body.appendChild(div)
  return div
}

/* 缓存化 */
const getSingle = function(fn) {
  const result
  return function() {
    return result || result = fn.apply(this, arguments)
  }
}
/* 缓存化的"createLoginLayer" */
const createSingleLoginLayer = getSingle(createLoginLayer)

document.getElementById('loginBtn').onclick = function() {
  createSingleLoginLayer()
}
```

## 代理模式

> 定义：为一个对象提供一个代用品或占位符，以便控制对它的访问。

* 代理对象拥有本体对象的一切功能的同时，可以拥有而外的功能。而且代理对象和本体对象具有一致的接口，对使用者友好。

* 下面这段代码运用代理模式来实现图片预加载, 可以看到通过代理模式巧妙地将创建图片与预加载逻辑分离, ，并且在未来如果不需要预加载，只要改成请求本体代替请求代理对象就行。

```JS
const myImage = (function() {
  const imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc: function(src) {
      imgNode.src = src
    }
  }
})()

const proxyImage = (function() {
  const img = new Image()
  img.onload = function() { // http 图片加载完毕后才会执行
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function(src) {
      myImage.setSrc('loading.jpg') // 本地 loading 图片
      img.src = src
    }
  }
})()

proxyImage.setSrc('http://loaded.jpg')
```

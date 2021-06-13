### 从浏览器打开到显示页面的过程:
```sh
浏览器解析->查询缓存->dns查询->建立链接->服务器处理请求->服务器发送响应->客户端收到页面->解析HTML->构建渲染树->开始显示内容(白屏时间)->首屏内容加载完成(首屏时间)->用户可交互(DOMContentLoaded)->加载完成(load)
```

### 浏览器api
`performance.timing`
```
DNS解析时间： domainLookupEnd - domainLookupStart
TCP建立连接时间： connectEnd - connectStart
白屏时间： responseStart - navigationStart
dom渲染完成时间： domContentLoadedEventEnd - navigationStart
页面onload时间： loadEventEnd - navigationStart
```


### 获取页面元素宽高和位置:
* 宽度: 等于content+padding `xxx.clientWidth`;
* 高度: 等于content+padding `xxx.clientHeight`;
* left: `xxx.getBoundingClientReact().left` 左侧距浏览器左边界的距离, 支持浮点数;
* right: `xxx.getBoundingClientRect().right` 右侧距左边界的距离;
* top: `xxx.getBoundingClientRect().top`;
* bottom: `xxx.getBoundingClientRect().bottom`;
* width: 等于content+padding+border;
* height: 等于content+padding+border;


* `.offsetWidth`元素宽度(整数)content+padding+border;
* `.offsetHeight`元素高度(整数)content+padding+border;
* `.offsetParent`上一个定位的祖元素;


### DOM0、DOM2级的事件区分
DOM0:
* `<input onclick="xxx">` `xxx.onclick = ()=>{ xxx }`
* 兼容性好, 速度快, 相同事件会覆盖不会连续触发;
DOM2:
* `xxx.addEventListener( "click", func)`;
* 包含 事件捕获阶段,处于目标阶段,事件冒泡阶段; 在各阶段提供拦截方式`e.stopPropagation()`;


### 事件冒泡 & 事件捕获
IE浏览器用事件冒泡形式, 其他浏览器默认采用事件冒泡形式;
* `xxx.addEventListener(类型, 处理方法[, 冒泡or捕获])`, true: 捕获形式; false:冒泡形式(默认);
* `xxx.removeEventListener(类型, 处理方法)`;
* `xxx.attachEvent("onclick", 处理方法)` `xxx.detachEvent("onclick", 处理方法)` IE的方法;


### 你做的页面在哪些流览器测试过？这些浏览器的内核分别是什么?

IE: Trident内核 
Firefox：Gecko内核 
Safari: Webkit内核
Opera:以前是presto内核，Opera现已改用Google Chrome的Blink内核
Chrome:Blink(基于webkit，Google与Opera Software共同开发)


### 区分alt 和 title
* alt: 图片不能显示时的提示文字;
* title: 鼠标hover上的时候, 显示的建议性信息;

---
title: 'iPhone'
---

## iPhone X系列安全区域适配问题

* 安全区域: 不包含 刘海两侧、底部横条、弧度的侧边; 
* `viewport-fit`:
  + auto: 不影响初始布局视图端口，并且整个web页面都是可查看的
  + contain: 视图端口按比例缩放，以适合显示内嵌的最大矩形
  + cover: 视图端口被缩放以填充设备显示

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no, viewport-fit=cover" />
```

* `safe-area-inset-top`, `safe-area-inset-bottom`, `safe-area-inset-left`, `safe-area-inset-right`,  `safe-area-inset-*` 分别代表边缘的危险区域;
```css
padding-bottom: constant(safe-area-inset-bottom);
/* 兼容 iOS<11.2 */
padding-bottom: env(safe-area-inset-bottom);
/* 兼容 iOS>11.2 */
```

## 滑动不流畅

* 在iOS5.0以及之后的版本，滑动有定义有两个值:
  + auto: 手指从屏幕移开, 滚动会立即停止; 默认; 
  + touch: 手指从屏幕移开, 滚动逐渐减速到停止; 

```css
/* 容器上 */
-webkit-overflow-scrolling: touch;

/* 滚动条隐藏 */
.container ::-webkit-scrollbar {
  display: none;
}
```

## click点击事件延时与穿透

* 对某元素做单击操作, 会延迟约 300ms 后触发

### 原因

> 穿透: 双层元素叠加时，在上层元素上绑定 touch 事件，下层元素绑定 click 事件。由于 click 发生在 touch 之后，点击上层元素，元素消失，下层元素会触发 click 事件，由此产生了点击穿透的效果。

* 穿透问题是在 touch 和 click 混用时产生; 
* 事件触发顺序: `touchstart > touchmove > touchend > click`; 

> 延迟: iOS 中的 safari，为了实现双击缩放操作，在单击 300ms 之后，如果未进行第二次点击，则执行 click 单击操作。也就是说来判断用户行为是否为双击产生的。在 App 中，无论是否需要双击缩放这种行为，click 单击都会产生 300ms 延迟; 

### 方案1: 使用 touchstart 替换 click

1. 解决了穿透问题, 因为下层绑定的touchstart事件, 在技术上早于上层绑定的 touchmove事件; 但在交互上, 上层的元素阻挡了下层的触发;
2. touchstart没有延迟;

### 不适用情况

* 在需要 滑动 和 点击 操作同时存在时, 优先执行点击, 顺序错误; 

### 方案2: 使用 fastclick 库

```JS
import FastClick from 'fastclick';
FastClick.attach(document.body, options);
```

## meta区域

```HTML
<!-- 桌面图标 -->
<link rel="apple-touch-icon" href="<大小为256*256的png图标地址>" />

<!-- 默认全屏显示 -->
<meta content="yes" name="apple-mobile-web-app-capable">

<!-- 地址栏背景颜色 -->
<meta content="black" name="apple-mobile-web-app-status-bar-style">
```

 

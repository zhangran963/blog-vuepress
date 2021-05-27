---
title: '兼容性'
---

[H5常见问题及解决方案](https://mp.weixin.qq.com/s/kG7Df7nR_zu4DbiKfabeVQ)

## 对IE浏览器的js处理

```html
<!--[if IE 8]> ie8 <![endif]-->

<!--[if IE 9]> 骚气的 ie9 浏览器 <![endif]-->
```

***

## 放大缩小

* 因初期, 移动端浏览器访问主要是PC网页, 需支持放大缩小
* "user-scalable"控制是否可以缩放, 有两个值`yes` 和 `no`

```HTML
<meta name=viewport content="width=device-width, initial-scale=1.0, minimum-scale=1.0 maximum-scale=1.0, user-scalable=no">
```

## 软键盘将页面顶起来, 收起未回落问题

> 问题: Android 手机中，点击 input 框时，键盘弹出，将页面顶起来，导致页面样式错乱。 移开焦点时，键盘收起，键盘区域空白，未回落。

### 原因

> 在app 布局中会有个固定的底部。安卓一些版本中，输入弹窗出来，会将解压 absolute 和 fixed 定位的元素。导致可视区域变小，布局错乱

* focusout事件支持冒泡; 

```JS
/* 软键盘收起的事件 */
document.body.addEventListener('focusout', () => {
  window.scroll(0, 0);
});
```

## 软键盘关闭, input输入框未失去焦点

* focusin事件: 元素获取焦点(可以是window)
* focusout事件: 元素失去焦点(可以是window)
* 事件顺序: `focusin > focus`、` focusout > blur`

### "收起键盘"事件

* 用window上的focusout事件代表 收起键盘 这个行为; 
* iOS平台, 对focusout兼容性好, 直接用事件即可; 
* Android平台, 对focusout兼容性不好, 需用resize事件模拟; 
  + 根据resize前后, 页面高度变高 => 收起软键盘, 页面高度变低 => 弹出软键盘; 

```JS
/**
 * 收起键盘事件: 
 * @param {function} callback 回调函数
 */
const useFocusoutHandler = callback => {
  if (/Android/gi.test(navigator.userAgent)) {
    const innerHeight = window.innerHeight;
    window.addEventListener("resize", () => {
      const newInnerHeight = window.innerHeight;
      if (innerHeight > newInnerHeight) {
        // 键盘弹出事件处理
      } else {
        // 键盘收起事件处理
        isDefFunc(callback) && callback();
      }
    });
  } else {
    window.addEventListener("focusout", () => {
      isDefFunc(callback) && callback();
    });
  }
};
export function useFocusout(callback) {
  useEffect(useFocusoutHandler.bind(null, callback), []);
}
```

### input元素焦点未取消

* 在安卓机中, 存在关掉软键盘后, input元素的焦点未取消的问题; 

```JS
/* fix: 安卓机, 关掉键盘后, 不会失去焦点 */
useFocusout.handler(() => {
  const inputEles = document.getElementsByTagName("input");
  Array.from(inputEles).forEach(input => input.blur());
});
```

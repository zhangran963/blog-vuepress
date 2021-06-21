---
title: 'BOM和DOM'
---

## 定义

* BOM（browser object model）；浏览器对象模型，提供一些属性和方法可以操作浏览器
* DOM（document object model）：文档对象模型，提供操作页面元素的方法和属性

## BOM

* `location.href`
* `histroy`
* `window.open`

### 区域

* 1区（浏览器的标签页，地址栏，搜索栏，书签栏，窗口放大还原关闭按钮，菜单栏等等） 
* 2区（滚动条scroll bar） 
* 3区（浏览器的右键菜单） 
* 4区（document加载时的状态栏，显示http状态码等） 

## DOM

* 能以编程的方法操作HTML的内容（比如添加、修改、删除、查找元素）
* 把HTML看做对象树(DOM树)

### 区域

* 5区 (页面区域)
  + 就是document。由开发人员写出来的一个文件夹，里面有index.html，CSS和JS的，部署在服务器上，我们可以通过浏览器的地址栏输入URL然后回车将这个document加载到本地，浏览，右键查看源代码等

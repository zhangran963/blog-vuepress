---
title: 'alert'
---

### 
* 同步代码 => 渲染
* alert会阻塞渲染
* P元素都是红色, 点击后, 弹出alert, 关闭, 变成绿色

```JS
let ps = document.getElementsByTagName("p");
for (let i = 0; i < ps.length; i++) {
  ps[i].style.backgroundColor = "red";
  ps[i].onclick = function() {
    this.style.backgroundColor = "blue";
    alert(i);
    this.style.backgroundColor = "green";
  };
}
```


### 上传文件
1. form形式, 使用preventDefalut
2. 断点续传


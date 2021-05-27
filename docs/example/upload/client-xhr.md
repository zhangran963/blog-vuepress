---
title: '页面 - XHR'
---

## XHR形式

* 优点: 不会刷新页面, 能显示进度等

### html部分

* 增加`progress`元素, 用于显示进度

```html{12-15}
<! DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>1.2 无刷新上传</title>
</head>

<body>
  <!-- 页面内容 -->
  <input id="select-btn" type="file" name="file" />
  <input id="upload-btn" type="button" value="开始上传" />
  <progress id="upload-progress" value="0" max="100"></progress>
</body>

</html>

```

### js部分

* FormData
  + 脚本创建FormData对象
  + 把file对象放进去
  + 发送 FormData对象

* 上传对象:`request.upload`
  + 类型: `<XMLHttpRequestUpload>`
  + 支持 "onloadstart" "onprogress" "onloadend" "ontimeout" "onabort" 等事件

```JS
/* 元素 */
const selectBtn = document.querySelector('#select-btn');
const uploadBtn = document.querySelector('#upload-btn');
const uploadProgress = document.querySelector('#upload-progress');

/* 点击事件 */
uploadBtn.addEventListener('click', () => {
  /* 数据 */
  const formData = new FormData();
  formData.append('selfName', selectBtn.files[0]);

  /* 定义网络 */
  const request = new XMLHttpRequest();
  request.open('POST', '/upload');

  request.onload = function() {
    if (this.status === 200) {
      /* 响应数据 */
      const res = JSON.parse(request.responseText);

      /* 插入到body中 */
      const img = document.createElement('img');
      img.src = res.path;
      img.style.maxWidth = `100px`;
      img.style.maxHeight = `200px`;
      img.onload = () => {
        document.body.appendChild(img);
      };
    }
  };

  /* 进度 */
  request.upload.onprogress = (e) => {
    const {
      loaded,
      total,
      lengthComputable
    } = event;
    if (lengthComputable) {
      let percent = (loaded / total) * 100;
      uploadProgress.setAttribute('value', percent);
      console.debug('* 进度e', percent);
    }
  };

  /* 开始 | 结束 | 超时 */
  request.upload.onloadstart = () => {
    console.debug('* onloadstart', '开始');
  };
  request.upload.ontimeout = () => {
    console.debug('* ontimeout', '超时');
  };
  request.upload.onloadend = () => {
    console.debug('* onloadend', '结束');
  };

  /* 发送请求 */
  request.send(formData);
});
```

### 示例

![](https://ran-1303246897.cos.ap-guangzhou.myqcloud.com/www/markdown/20210612105207.png)

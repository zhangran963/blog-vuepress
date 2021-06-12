---
title: 'JSONP'
---

## 原理
* 利用script标签不存在域的限制;
* 定义一个全局执行上下文中的回调函数;

## 特性

* 仅适用于 GET 请求; 
* 缺乏**查无处理机制**, 没调用成功时没反应, 没有 400, 500 提示, 只能超过给定时间自定义错误; 
* 安全漏洞: 远程脚本可以注入任何内容，有严重的安全漏洞。
  + 有可能进行跨站请求伪造攻击（CSRF）
  > 恶意网站使用访问者的浏览器向服务器端发送请求并进行数据变更时被称为 CSRF 攻击-->因为请求会携带用户的 cookie 信息。

### 服务器

* 获取参数 和 回调方法名
* 业务处理
* 拼接响应字符串: [回调方法名](参数)
* 返回`application/javascript`类型的数据

```js
/* 路由区 */
router.get('/jsonp', (ctx) => {
  const {
    query,
    querystring
  } = ctx.request;
  console.debug('* 请求参数:', query, querystring);
  const {
    callback,
    type
  } = query;

  let resStr = ``;
  if (type === 'name') {
    /* 填充数据 */
    let data = {
      name: '理查德*克莱德曼'
    };
    resStr = `${callback}(${JSON.stringify(data)})`;
  }
  /* 脚本类型 */
  ctx.set('Content-Type', 'application/javascript');
  ctx.body = resStr;
});
```

### 浏览器

1. 定义回调函数
2. 发送GET请求
  + 创建`script元素`
  + 设置`script.src`属性, 包含 地址、发送数据、函数名
  + 插入`script`到DOM中
  + 注册`移除script事件`

```HTML
<script>
  function paramsToString(obj = {}) {
    return new URLSearchParams(obj).toString();
  }
</script>
<script>
  const sendBtn = document.querySelector('#send-btn');

  const host = `http://localhost:3005`;
  sendBtn.addEventListener('click', () => {
    /**
     * 1. 创建script元素
     * 2. 设置script.src属性, 包含 地址、发送数据、函数名
     * 3. 插入script到DOM中
     * 4. 注册移除script事件
     */
    const script = document.createElement('script');
    script.src = `${host}/jsonp?${paramsToString({ type: 'name', callback: 'getFromHttp' })}`;
    document.body.insertBefore(script, document.body.firstChild);
    script.onload = () => {
      document.body.removeChild(script);
      /* yi */
      console.debug('* 移除');
    };
  });

  /* 定义的网络请求 */
  function getFromHttp(obj) {
    if (typeof obj === 'string') {
      obj = JSON.parse(obj);
    }
    console.debug('* 响应数据: ', obj);
  }
</script>
```

![](https://ran-1303246897.cos.ap-guangzhou.myqcloud.com/www/markdown/20210613175041.png)

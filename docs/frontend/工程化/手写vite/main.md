---
title: 'ESModule与Vite原理剖析'
---

## 不支持的路径怎么处理

* "xxx.js"文件中, 包含`import { createApp, h } from 'vue'`
* 替换: "vue" => "/@modules/vue"
* 浏览器主动请求: '/@modules/vue'
* 服务接受到以"/@modules/"开头, 并获取到 "vue"
* node_modules文件夹中查找"vue/package.json"文件, 并获取`module`属性
* 读取文件: "node_modules/vue/[module的值]"
* 返回"application/javascript"文件; 

* "package.json"中`module`属性的值指esModule版本的路径

## 主要逻辑

```JS
/* 获取静态文件 */
app.use(async (ctx) => {
  const {
    url,
    query
  } = ctx.request;

  if (url === '/') {
    ctx.type = `text/html`;
    let content = fs.readFileSync('./index.html', {
      encoding: 'utf-8'
    });
    /* vue框架需要 process.env.NODE_ENV; 模拟一个; */
    content = content.replace(
      '<script></script>',
      `<script>
      window.process = { env: { NODE_ENV: 'development' } };
      </script>`
    );
    ctx.body = content;
  } else if (url.endsWith('.js')) {
    const p = path.resolve(__dirname, url.slice(1));
    ctx.type = `application/javascript`;
    const content = fs.readFileSync(p, 'utf-8');
    /* 普通js文件中; 第三方库的头部添加 /@modules/; 使浏览器能主动发起get请求 */
    ctx.body = rewriteImport(content);
  } else if (url.startsWith('/@modules/')) {
    /* 第三方库对应的ES入口 */

    const prefix = path.resolve(__dirname, 'node_modules', url.replace('/@modules/', ''));
    /* 在对应库的package.json => module位置, 有ESModule形式的包路径 */
    const module = require(prefix + '/package.json').module;
    const p = path.resolve(prefix, module);
    const ret = fs.readFileSync(p, 'utf-8');

    ctx.type = `application/javascript`;
    /* 第三方库中, 也会有引用第三方包的情况 */
    ctx.body = rewriteImport(ret);
  }
});
```

```JS
/**
 * 替换: "vue" => "/@modules/vue"
 */
function rewriteImport(content) {
  /* import xxx from "xxx" */
  let reg = / from ['|"]/g;
  return content.replace;
}
```

## html模板

```html
<!DOCTYPE html>
<html lang="zh-cmn">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>示例</title>
</head>

<body>
  <h1>示例</h1>

  <script></script>
  <script src="./main.js" type="module"></script>
</body>

</html>
```

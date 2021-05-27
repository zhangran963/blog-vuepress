---
title: '服务端 - koa-body'
---

## 服务端

* 依赖`koa-body`的能力
* 上传结果在 `ctx.request.files` 中; 

```JS
const Path = require('path');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaStatic = require('koa-static');
const KoaBody = require('koa-body');

const app = new Koa();
const router = new KoaRouter();

/* 静态页面 */
app.use(KoaStatic('./pages'));

/* 上传文件的目录 */
const resolveUploadDir = Path.resolve.bind(null, __dirname, './pages/public');
/* 支持上传文件 */
app.use(
  KoaBody({
    multipart: true /* 支持文件 */ ,
    formidable: {
      uploadDir: resolveUploadDir() /* 存储的文件夹 */ ,
      keepExtensions: true /* 保留拓展名 */ ,
    },
  })
);

/* 路由: 上传 */
router.post('/upload', (ctx) => {
  const {
    files
  } = ctx.request;

  /* files是上传文件的对象;  'selfName'是自定义名称, 需与页面元素的'name'值一致 */
  const {
    path
  } = files['selfName'];
  if (path) {
    let name = Path.basename(path);

    ctx.body = {
      path: `/public/${name}`,
    };
  } else {
    ctx.body = {
      path: null,
    };
  }
});

app.use(router.routes());

const port = 3000;
app.listen(port, () => {
  console.debug(`* listen: http://localhost:${port}`);
});
```

---
title: 'moa'
---

## Koa 的语法特点

* 实例化: `const app = new Koa()`; 
* 支持中间件:
  + 中间件中有 `ctx` 和 `next`

```JS
app.use(async (ctx, next) => {
  ctx.body = '*****';
  await next();
});
```

* 接受路由: `app.use(router.routes())`; 
* 监听端口: `app.listen(port, () => { /* 回调函数 */ })`

## 1. Moa 的类型

* 应该是带有`use` 和 `listen` 方法的 class

```JS
/**
 * Moa类
 */
module.exports = class Moa {
  constructor() {
    /* 存储用于 app.use|中间件 的函数数组 */
    this._middleWares = [];
  }

  /* 函数: 注册中间件 */
  use(fn = () => {}) {
    if (typeof fn === 'function') {
      this._middleWares.push(fn);
    }
  }

  /* 启动服务 */
  listen(port = 3000, cb = () => {}) {
    http
      .createServer(async (req, res) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.writeHead(200);
        res.end(ctx.body);
      })
      .listen(port, cb);
  }
}
```

## 2. 中间件需要每次执行

* 需要在"http.createServer"函数中

```JS{4-5, 8-12}
  /* 启动服务 */
  listen(port = 3000, cb = () => {}) {

    /* 中间件: 生成(中间件函数数组)串行化函数 */
    const middleWaresHandler = Moa.compose(this._middleWares);
    http
      .createServer(async (req, res) => {
        /* 创建ctx对象 */
        let ctx = Moa.createContext(req, res);

        /* 中间件: 执行 */
        await middleWaresHandler(ctx);

        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.writeHead(200);
        res.end(ctx.body);
      })
      .listen(port, cb);

  }

```
* 上述代码中, 有2个关键点
  * 串行化中间件组
  * 创建ctx对象

## 3. ctx对象

* ctx带有两个属性"ctx.request", "ctx.response";

``` JS
/**
 * @param {Request} req 原始请求对象
 * @param {Response} res 原始响应对象
 * @returns {ctx}
 */
static createContext(req, res) {
  /* 继承 ctx.__proto__ === {get body(){}, set body(){}} */
  let ctx = Object.create(context);
  ctx.request = Object.create(request);
  ctx.response = Object.create(response);

  /* Moa上下文中的请求和响应: ctx.request, ctx.response */
  ctx.req = ctx.request.req = req;
  ctx.res = ctx.response.res = res;

  return ctx;
}
```

### 3.1 ctx的继承源

* 用于操作 ctx 上的属性

```JS
/**
 * ctx实例的继承源
 */
module.exports = {
  get body() {
    const _body = this.response.body
    return _body;
  },
  set body(value) {
    this.response.body = value;
  },
};
```

### 3.2 ctx.request的继承源

* 用于操作 ctx.request 上的属性

```JS
module.exports = {
  get url() {
    return this.req.url;
  },
  get method() {
    return this.req.method.toLowerCase();
  },
};
```

### 3.3 ctx.response的继承源

* 用于操作 ctx.response 的继承源

```JS
/* 唯一性 */
const bodyKey = Symbol('body的key值');

module.exports = {
  [bodyKey]: null,
  get body() {
    return this[bodyKey];
  },
  set body(value) {
    this[bodyKey] = value;
  },
};
```

## 4. 串行化中间件组

* 把函数组串行化; 
* 执行时, 只需从"index=0"开始; 

```JS
/**
 * @param {function[]} middleWares 中间件函数数组
 * @returns {function}
 */
static compose(middleWares = []) {

  /* 结果是函数, 中间包含"函数组" */
  return function(ctx) {
    return dispatch(0);

    function dispatch(index /* 起始索引 */ ) {
      /* 当前函数 */
      const fn = middleWares[index];

      if (typeof fn === 'function') {
        return Promise.resolve(
          /**
           * 递归dispatch自身
           * 当前函数(ctx, function next(){
           *    return dispatch(index+1)
           * })
           */
          fn(ctx, function next() {
            return dispatch(index + 1);
          })
        );
      } else {
        /* 函数全部遍历完成 */
        return Promise.resolve();
      }
    }
  };
}
```

---
title: 'moa-router'
---

## Koa-router 的语法特点

* 实例化: `const router = new KoaRouter()`; 
* 支持"get"和"post"方法

```JS
router.get('/', async (ctx) => {
  ctx.body += 'index page';
});
```

* 生效: `app.use(router.routes())`; 
* `router.routes()`的结果是 中间件, 需要每次执行; 

## 1. MoaRouter 的类型

```JS
module.exports = class Router {
  constructor() {
    this.stacks = [];
    this.defStack = null;
  }
}
```

## 2. 方法

```JS
/* 存储到栈中 { 路径, 方法, 回调函数 } */
_register(path, method, callback) {
  const stack = {
    path,
    method: method.toLowerCase(),
    callback
  };
  if (path === '*') {
    this.defStack = stack;
  } else {
    this.stacks.push(stack);
  }
}
```

```JS
get(path, callback) {
  this._register(path, 'get', callback);
}

post(path, middleware) {
  this._register(path, 'post', middleware);
}
```

## 3. 生效

* 写在最后部分, 当做中间件执行
* 按中间件的写法, app.use的参数应该是函数
* `router.routes()`返回一个函数; 有参数(ctx, next); 

```JS
	routes() {
	  /* 中间件, 放到最后, 每个请求都会执行 */
	  return async (ctx, next) => {
	    /* 查找条件: 路径和方法 */
	    const url = ctx.req.url === '/index' ? '/' : ctx.req.url;
	    const method = ctx.request.method;
	    /* 注册路由中, 查找匹配对象 */
	    let item = this.stacks.find((item) => item.path === url && item.method === method.toLowerCase());

	    /* 找到(合格的方法)方法, 执行 */
	    if (typeof item === 'object' && typeof item.callback === 'function') {
	      await item.callback(ctx, next);
	    } else if (this.defStack) {
	      await this.defStack.callback(ctx, next);
	    } else {
	      await next();
	    }
	  };
	}
```

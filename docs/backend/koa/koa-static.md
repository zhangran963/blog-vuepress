* `npm install --save koa-static`;
```js
/**้ๆๆไปถ */
const path = require("path");
const Static = require("koa-static");
app.use(Static(path.join(__dirname, "./public")));

```
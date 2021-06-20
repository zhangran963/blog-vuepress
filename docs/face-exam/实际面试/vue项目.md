---
title: 'Vue项目'
---

## 有哪些优化

### v-if 和 v-show

### computed 和 watch 区分使用场景

### v-for 遍历必须为 item 添加 key，且避免同时使用 v-if

### 事件及时销毁

### 图片资源懒加载

### 路由懒加载

### 第三方插件按需引入

* babel-plugin-import

### 服务端渲染

## vue-router

### query 和 params
* query: 类型get请求, 参数在路径中
* params: 用于动态路径的参数, 一般用路径的名称

```JS
this.$router.push({
  name: "dynamicpath",
  params: {
    id: 1101
  }
})
```

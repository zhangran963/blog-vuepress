---
title: 'Babel'
---

## babel

* Babel是一个工具链, 主要用于转换JavaScript代码, 把 ES6+ 语法, 转换成兼容版本的语法
* 一般在`.babelrc`中配置

### @babel/core：

* `@babel/core`是整个 babel 的核心，它负责调度 babel 的各个组件来进行代码编译，是整个行为的组织者和调度者。

### @babel/preset-env：

* 这是一个预设的插件集合，包含了一组相关的插件，Bable中是通过各种插件来指导如何进行代码转换。该插件包含所有es6转化为es5的翻译规则
* targets: 适配到的浏览器版本

### @babel/polyfill

* @babel/preset-env只是提供了语法转换的规则; 
* @babel/polyfill拟补浏览器缺失的新功能, 如Promise, Array.from等

## 流程

* 解析parse => AST抽象语法树
* 转换transform
* 生成generate
![](https://ran-1303246897.cos.ap-guangzhou.myqcloud.com/www/markdown/20210621073618.png)

### AST抽象语法树

```JS
{
  "type": "Program",
  "start": 0,
  "end": 11,
  "body": [{
    "type": "VariableDeclaration",
    "start": 0,
    "end": 11,
    "declarations": [{
      "type": "VariableDeclarator",
      "start": 6,
      "end": 11,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "name": "a"
      },
      "init": {
        "type": "Literal",
        "start": 10,
        "end": 11,
        "value": 1,
        "raw": "1"
      }
    }],
    "kind": "const"
  }],
  "sourceType": "module"
}
```

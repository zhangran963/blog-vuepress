---
title: '手写webpack'
---

## 目标文件

* 代码中使用到了`require`和`exports`; 
* 模拟实现`require`和`exports`; 
* 把模拟的代码嵌套到"立即执行函数"中; 

```JS
(function(list) {
  /* 模拟require */
  function require(file) {
    /* 模拟exports */
    var exports = {};

    (function(exports, code) {
      eval(code);
    })(exports, list[file]);

    return exports;
  }

  /* 文件入口 */
  require('index.js');
})({
  /* 这是代码数据库 */
  'index.js': `var add = require('add.js').default;
    console.debug('* ', add(2, 3))`,
  'add.js': `
  var dubble = require('dubble.js').default;
  exports.default = function (a, b) {
    a = dubble(a);
    return a + b;
  }`,
  'dubble.js': `exports.default = function(a){ return a*2 }`,
});
```

## 简易源码

### 依赖

```JS
const fs = require('fs');
const path = require('path');
/* 解析出AST */
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
/* ES6 => ES5 */
const babel = require('@babel/core');
```

### 分析单个模块

```JS
/**
 * 分析(单个)模块
 * @param {string} file
 */
function getModuleInfo(file) {
  /* 读取内容 */
  const body = fs.readFileSync(file, {
    encoding: 'utf-8'
  });

  /**
   * 转换语法数
   * string => AST(抽象语法树)
   */
  const AST = parser.parse(body, {
    sourceType: 'module'
  });

  /* 查找依赖 */
  const deps = {};
  traverse(AST, {
    /* 访问者模式 */
    ImportDeclaration({
      node
    }) {
      const dirname = path.dirname(file);
      const absPath = './' + path.join(dirname, node.source.value);

      deps[node.source.value] = absPath;
    },
  });

  /* ES6 => ES5 */
  const {
    code
  } = babel.transformFromAst(AST, null, {
    presets: ['@babel/preset-env'],
  });

  return {
    file,
    deps,
    code,
  };
}
```

### 解析入口模块

```JS
/**
 * 解析入口模块
 * @param {*} file
 */
function parseModules(file) {
  const entry = getModuleInfo(file);
  /* 入口是默认依赖 */
  const temp = [entry];
  /* 依赖树(图结构) */
  const depsGraph = {};
  /* 递归调用 */
  getDeps(temp, entry);

  temp.forEach((info) => {
    depsGraph[info.file] = {
      deps: info.deps,
      code: info.code,
    };
  });

  return depsGraph;
}
```

### (递归)获取依赖

```JS
function getDeps(temp, {
  deps
}) {
  Object.keys(deps).forEach((key) => {
    const child = getModuleInfo(deps[key]);
    temp.push(child);
    getDeps(temp, child);
  });
}
```

### 从入口开始

```JS
const content = parseModules('./src/index.js');
```

### 包裹"壳子"

```JS
function bundle(file) {
  const depsGraph = JSON.stringify(parseModules(file));
  return `(function (graph) {
        function require(file) {
            function absRequire(relPath) {
                return require(graph[file].deps[relPath])
            }
            var exports = {};
            (function (require,exports,code) {
                eval(code)
            })(absRequire,exports,graph[file].code)
            return exports
        }
        require('${file}')
    })(${depsGraph})`;
}
```

### 其它

```JS
/* 打包后的代码(string) */
const content = bundle('./src/index.js');

/* 存储到文件 */
!fs.existsSync('./dist') && fs.mkdirSync('./dist');
fs.writeFileSync('./dist/bundle.js', content);
```

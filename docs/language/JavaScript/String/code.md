---
title: 'code相关(待完成)'
---

## 基础

* Unicode编码，包含各个国家的文字，每个字符用**2字节**表示(`\uxxxx`)
* 内存中用utf-8，不定长编码，1~6个字节（英文字符1个字节，汉字3个字节），用于网络传输
* JavaScript内部, 字节以 utf-16格式存储, 每个字符占2字节, 若超出, 认为是两个字符

```JS
`\u{1F680}`.length /* "🚀" */
  // 输出: 2

  '？'.length /* 汉字问号 */
// 输出: 1
```

```JS
`\u{1F680}`
// 输出: "🚀"

`\u{1F680}` === `\uD83D\uDE80`
// 输出: true
```

## 字符串的6种表示方法

```JS
'z' === 'z' // true
'\z' === 'z' // true
'\172' === 'z' // true,
'\x7A' === 'z' // true
'\u007A' === 'z' // true, Unicode码点
'\u{7A}' === 'z' // true, Unicode码点
```

## charAt

* 语法`str.charAt(index)`
* 从一个字符串中返回指定的字符
* 开起来等同于 `str[index]`

```JS
let str = 'apple';
str.charAt(2);
// 输出: "p"
```

## charCodeAt

* 语法`str.charCodeAt(index)`
* 返回给定索引处的UTF-16代码单元(0到65535之间的整数)

```JS
let str = 'apple';
str.charCodeAt(2);
// 输出: 112
```

## codePointAt

* 语法`str.codePointAt(pos)`
* ES6, 返回准确的码点
* `charCodeAt`的升级版

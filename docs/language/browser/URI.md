---
title: 'URI'
---

## URI

* 完整: `http://username:password@www.example.com:80/path/to/file.php?foo=316&bar=this+has+spaces#anchor`

```js

```

## escape 和 unescape

* 处理字符串, 由"十六进制转义序列" 替换 "原字符串"; 
* 这些字符不转换: `ASCII字符` 和 `@*_+-./`; 

```JS
let url = 'name=四叶草';
escape(url);
/* 结果: name%3D%u56DB%u53F6%u8349 */
// %3D = '='
// '\u56DB\u53F6\u8349' = '四叶草'
```

## encodeURI 和 decodeURI

* 只对参数值编码(常见的连接符`; / ? : @ & = + $ , #`不编码)

```js
let url = `http://username:password@www.example.com:80/path/to/file.php?name=四叶草&age=12#anchor`
encodeURI(url)
// "http://username:password@www.example.com:80/path/to/file.php?name=%E5%9B%9B%E5%8F%B6%E8%8D%89&age=12#anchor"
```

## encodeURIComponent 和 decodeURIComponent

* 不转移的字符: `A-Z a-z 0-9 - _ . ! ~ * ' ( )`

```js
let url = `http://username:password@www.example.com:80/path/to/file.php?name=四叶草&age=12#anchor`
encodeURIComponent(url)
// "http%3A%2F%2Fusername%3Apassword%40www.example.com%3A80%2Fpath%2Fto%2Ffile.php%3Fname%3D%E5%9B%9B%E5%8F%B6%E8%8D%89%26age%3D12%23anchor"
```

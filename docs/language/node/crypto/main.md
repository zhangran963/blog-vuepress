---
title: 'crypto'
sidebar: 'auto'
---


## MD5
* 哈希算法
* 给数据生成"签名"(和内容有关, 和时间无关)
* 十六进制数字表示
```js
const crypto = require('crypto');
const hash = crypto.createHash('md5');

// 可任意多次调用 update()
let key = 3;
if(key === 1){
  hash.update('Hello World')
}else if(key === 2){
  hash.update('Hello')
  hash.update(' World')
}else if(key === 3){
  hash.update('Hello')
  hash.update(' ')
  hash.update('World')
}

console.log('打印hex:',key, ':' ,hash.digest('hex'));
// 三次生成的哈希值都是: b10a8db164e0754105b7a99be72e3fe5
```
![哈希值](http://ww3.sinaimg.cn/large/006y8mN6gy1g72lsfsoyxj30im06sdfy.jpg)
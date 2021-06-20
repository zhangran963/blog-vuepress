---
title: 'main'
---

## 去掉一个数字数组的重复值

1. Set

```js
var unique = function(arr) {
  let result = new Set(arr);
  return [...result];
}
```

2. 对象保存

```js
var func = function(a) {
  if (!arguments.length) {
    return;
  }

  let result = []; // 定义返回结果
  let hasArr = {}; // 保存数量

  a.forEach(function(val, i, arr) {
    if (!hasArr[val]) {
      result.push(val);
      hasArr[val] = 1;
    } else {
      hasArr[val]++;
    }
  });

  return result;
}
```

## 统计出现次数最多的信息

返回出现最多的值+次数; 

```js
var maxNumChar = function(arr) {
    function maxNumber(arr) {
      let map = new Map();

      arr.forEach((item, index, arr) => {
        if (map.has(item)) {
          map.set(item, map.get(item) + 1);
        } else {
          map.set(item, 1);
        }
      });

      let result = {
        name: null,
        maxNum: 0
      }
      for (let [key, value] of map.entries()) {
        if (result.maxNum < value) {
          result.name = key;
          result.maxNum = value;
        }
      }
      return result;
    }
```

## 排序(冒泡)

```js
var bubbleSort = function(a) {
  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      // 小 → 大
      if (a[i] > a[j]) {
        let item = a[i];
        a[i] = a[j];
        a[j] = item;
      }
    }
  }

  return a;
}
```

## 排序(快速)

```js
// 我的理解: 把数组分割>大的小的区域分开排序>再次分割>大的小的区域分开排序> ...
var func = function(arr) {
  // 当数组长度小于等于1时, 不再分割, 结束!
  if (arr.length <= 1) {
    return arr;
  }
  // 一般取中间位置的值
  let midIndex = Math.floor(arr.length / 2);
  let midValue = arr[midIndex];
  // 左右数组,分别用于盛放(小于中间值)和(大于中间值)的数组;
  let left = [];
  let right = [];

  for (let i = 0; i < arr.length; i++) {
    // 小的数放在前面, 大的数放在后面
    if (arr[i] < midValue) {
      left.push(arr[i]);
    } else if (arr[i] > midValue) { // 这里一定要有2个判断条件,以防有等于的值时,进入死循环;
      right.push(arr[i]);
    }
  }
  // 把分割的数组连接在一起
  return func(left).concat(midValue, func(right));
}
```

## 交换2项(不借助第三项)

```js
var swap = function(a, b) {
  b = b - a;
  // 开始交换
  a = a + b;
  // {a}=a+(b-a) > {a}=b;
  b = a - b;
  // {b}=b-(b-a) > {b}=a;
  return [a, b]
}
```

## 斐波那契数列

* `1,1,2,3,5,8,13,21,34...`

自己写的

```js
function feibo(n) {
  switch (n) {
    case 1:
      return [1];
      break;
    case 2:
      return [1, 1];
      break;
    default:
      return [];
  }

  let result = [1, 1]
  for (let i = 2; i < n; i++) {
    result[i] = result[i - 1] + result[i - 2];
  }
  return result;
}
```

## 找出数组的最大差值

```js
var getMaxProfit = function(a) {
  let max = a[0],
    min = a[0];
  for (let i = 0; i < a.length; i++) {
    max = Math.max(max, a[i]);
    min = Math.min(min, a[i]);
  }
  return (max - min);
}

/* 数组之间的最大差值 */
function maxProfit(arr) {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j <= i; j++) {
      let tempMax = Math.abs(arr[i] - arr[j]);
      max = Math.max(tempMax, max);
    }
  }
  return max;
}
```

## 随机生成指定长度的字符串

```js
var randomString = function(n) {
  let originStr = "abcdefghigklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < n; i++) {
    let index = Math.floor(Math.random() * 36);
    str = str + originStr[index];
  }
  return str;
}
```

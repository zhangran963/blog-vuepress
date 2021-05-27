---
title: 配置
description: 描述内容
head:
  - - meta
    - name: description
      content: hello
  - - meta
    - name: keywords
      content: vitepress 语法
selfdef: '自定义文本'
sidebar: 'auto'
---

## 配置nav部分
* 头部配置: `navbar: true`

## 配置sidebar部分
* 不显示: `sidebar: false`
* 自动生成目录: `sidebar: 'auto'`

## 自定义文本

* frontmatter: 头部的变量对象;
* `{{ $frontmatter.selfdef }}`
```md{2}
---
selfdef: '自定义文本'
---

{{ $frontmatter.selfdef }}
```
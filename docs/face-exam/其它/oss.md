---
title: '阿里云OSS'
---

## 上传
[STS模式](https://static-aliyun-doc.oss-accelerate.aliyuncs.com/assets/img/zh-CN/8213221261/p273744.jpg)
* 小程序做业务方登录;
* 服务器确定 最小访问权限和有效期, 请求STS服务获取安全令牌(SecurityToken）
* STS返回给App服务器一个临时访问凭证，包括一个安全令牌（SecurityToken）、临时访问密钥（AccessKeyId和AccessKeySecret）以及过期时间
* 服务器返回给小程序
* 小程序用 临时访问凭证 请求业务
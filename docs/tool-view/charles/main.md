---
title: charles常见问题
sidebar: 'auto'
---

## 抓到的信息都是有小锁的
![有锁示例](https://tva1.sinaimg.cn/large/006y8mN6ly1g91xco8culj30ju09s3yi.jpg)

### 解决方式
Charles 中设置
1. `Proxy > SSL Proxying Setting...`
2. 在 `SSL Proxying` 选项卡中(第一项)
3. `Add => OK` (会增加一项: `*`)
4. 再次请求, 就不会有锁了

![无锁示例](https://tva1.sinaimg.cn/large/006y8mN6ly1g91xg0kgiij30mc0g6wen.jpg)
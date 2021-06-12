---
title: rebase
---


## 合并 commit
* 暂时只看了最简单方法
1. `git rebase -i HEAD~2`: 合并最新的两个commit;
2. 列出的修改项中, 第一个`pick`不变, 其他 `pick`改为`s`, 保存退出;
3. 直接保存退出;
4. 合并成功;

## 合并 commit
* `git rebase -i HEAD~起始点到最新点的个数`: 先定位到起始点;
* 被合并项前的`pick`改为`s`, `:wq`, 保存退出;
    * `s`: 合并;
    * `d`,`drop`: 删除此分支;
* 查找中;
* 修改注释;
* 完成;


## 删除 commit
* `git rebase -i 起始点`
* 被删除项前的`pick`改为`d` 或 `drop`;
* `:wq`, 保存退出;
* 查找中;
* 修改注释;
* 完成;
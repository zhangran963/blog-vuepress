---
title: '其它'
sidebar: 'auto'
---

## 完全卸载
* 直接删除软件, 会遗留数据; 如需要删除全部数据, 还需要
```sh
rm -fr ~/Library/Preferences/com.microsoft.VSCode.helper.plist 
rm -fr ~/Library/Preferences/com.microsoft.VSCode.plist 
rm -fr ~/Library/Caches/com.microsoft.VSCode
rm -fr ~/Library/Caches/com.microsoft.VSCode.ShipIt/
rm -fr ~/Library/Application\ Support/Code/
rm -fr ~/Library/Saved\ Application\ State/com.microsoft.VSCode.savedState/
rm -fr ~/.vscode/
```
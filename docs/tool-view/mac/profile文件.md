---
title: 'profile'
sidebar: 'auto'
---

## 更改文件
* .bash_profile 或 .zhsrc 文件中可以自定义的命令
```bash
###  自定义命令

# git显示图形化分支
alias g-lg="git log --graph --decorate --oneline --simplify-by-decoration --all"

alias g-b="git branch"
alias g-c="git checkout"
alias g-c-b="git checkout -b"
alias g-r="git rebase"
alias git-a-c-p="git add . && git commit -m 'auto' && git push"

# VSCode
alias code="/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code"

# VSCode 知识库
alias code-learn="code /Users/ran/Documents/GitHub/knowledgement"
alias cd-learn="cd /Users/ran/Documents/GitHub/knowledgement"

# leetcode-cn
alias code-leet="code /Users/ran/test-project/leetcode"
alias cd-leet="cd /Users/ran/test-project/leetcode"

#  主站
alias code-m2="code /Users/ran/weiaicoding/h5"
alias cd-m2="cd /Users/ran/weiaicoding/h5"

#  互助
alias code-huzhu="code /Users/ran/h5"
alias cd-huzhu="cd /Users/ran/h5"

# 会员
alias code-vip="code /Users/ran/h5_vip_member"
alias cd-vip="cd /Users/ran/h5_vip_member"

# 主目录
alias code-mine="code ~"

# open Downloads
alias open-download="open /Users/ran/Downloads"

# 服务器
alias ssh-root="ssh root@39.106.53.163"

# nginx
alias code-nginx="code /usr/local/etc/nginx/"

# 段
alias open-duan="open /Users/duan/"
alias open-duan-lyric="open /Users/duan/www/lyric/"
alias open-duan-lyric-server="open /Users/duan/www/lyric-servr/"

alias cd-duan="cd /Users/duan/"
alias cd-duan-lyric="cd /Users/duan/www/lyric/"
alias cd-duan-lyric-server="cd /Users/duan/www/lyric-servr/"

alias code-duan="code /Users/duan"
alias code-duan-nginx="code /Users/duan/nginx"

# python3 爬虫
alias code-spider="code /Users/ran/Documents/python/spider/duan.code-workspace"
alias open-spider="open /Users/ran/Documents/python/spider/"
alias code-spider="code /Users/ran/Documents/python/spider"

# secret
alias code-secret="code /Users/ran/Documents/GitHub/secret/"

# 这段代码写在文件最后
source $ZSH/oh-my-zsh.sh
source ~/.bash_profile
```
---
sidebar_position: 2
---

# 私のdotfiles

私向けのdotfilesの中身を書く。


## .zshrc

aliasの設定

```shell title=".zshrc"
alias ls="ls -F --color=auto"
alias la="ls -a"
alias ll="ls -l"
alias lla="ls -la"
alias cdp='cd ~/desktop/programming'
alias cdd='cd ~/desktop'
alias ga='git add'
alias gc='git-cz'
alias gcm='git commit -m'
alias gco='git checkout'
alias gp='git push origin HEAD'
alias gb='git branch'
alias gcob='git checkout -b'
alias gs='git status'
alias gf='git fetch'
alias gm='git merge'
alias gd='git diff'
alias gl='git log --oneline --decorate'
alias cp='cp -i -v'
alias mv='mv -i -v'
alias rm='rm -i -v'
alias dcr='docker compose run --rm'
alias dce="docker compose exec"
alias dup="docker compose up"
alias dc="docker compose"
```
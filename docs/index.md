---
layout: home
titleTemplate: nanari

hero:
  name: ℕ𝕠𝕥𝕖𝕓𝕠𝕠𝕜 𝟚
  tagline: どんな幻覚だって酔っぱらいの私には効かないよ。酔う事で最高の力が引き出せるってもんだねぇ
  actions:
    - theme: brand
      text: 靈藥
      link: /elixir/

features:
  - title: 𝑒𝑙𝑖𝑥𝑖𝑟
    icon: ⚗️
    details: 長生不老藥
  - title: 𝑔𝑙𝑒𝑎𝑚
    icon: 🌟
    details: 最受歡迎的程式語言，rust只能排第二
  - title: 贊助商:虛以待位
    icon: 🀄
    details: 四川麻將好像沒有紅中吧
---

## 先決條件

需要安裝以下工具

### 軟體分發以及管理工具

#### Windows

Windows 請先確保 `choco` 若無 用以下命令

```powershell
iwr https://chocolatey.org/install.ps1 -UseBasicParsing | iex
```

若警告：`因為在此系统上禁止運行脚本`，可以查看是否具有運行 ps1 腳本的權限

```powershell
get-executionpolicy
```

輸入：`Restricted` 可以使用以下命令：

```powershell
set-ExecutionPolicy RemoteSigned
```

屆時刪除 `C:\ProgramData\chocolatey` 後再次嘗試安裝

### 版本控制以及編輯器

#### Windows

```shell
choco install git
choco install vscode
```

後續你都可以用 `choco` 安裝 `pgsql` `redis` 等

#### MacOS

```shell
brew install git
brew install --cask visual-studio-code
```

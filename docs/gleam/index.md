# 安装 Gleam

## choco

::: danger 不推薦從 `choco` 安裝
`choco` 分發 `gleam` 更新遲緩

且會自動安裝最新的 `Erlang OTP`, 這個版本往往過於新不適用於 `elixir`
:::

使用 `choco` 安裝需要以管理员身份運行命令：

```shell
choco install gleam -y
```

或者更新：

```shell
choco upgrade gleam
```

環境變量會自動設置

### github

**推薦**從 [GitHub 發布頁面](https://github.com/gleam-lang/gleam/releases) 下載編譯器的預先建置版本

需要手動設置環境變量

需要自己安裝 `Erlang OTP`

## 验证安装成功

使用命令直接顯示版本

```powershell
PS C:\Users\Administrator>gleam -V
gleam 1.9.1
```

## 創建和運行 helloworld 專案

```shell
gleam new helloworld
cd ./demo
gleam run
```

vscode 的 gleam 拓展不需要從 GITHUB 取得，在中国大陆的體驗要比 elixir 拓展好很多

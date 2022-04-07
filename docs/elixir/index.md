# 安裝 ErlangVM 和 Elixir

## Windows

需要以管理員身份運行命令來安装：

```shell
choco install elixir -y
```

或者更新：

```shell
choco upgrade elixir
```

更新 elixir 时會連带更新 erlang

安装或更新後會提示：

```powershell
------------------------------------------------------------------------
NOTE:

The Elixir commands have been installed to:

C:\ProgramData\chocolatey\lib\Elixir\tools\bin

Please add this directory to your PATH,
then your shell session to access these commands:

elixir
elixirc
mix
iex
------------------------------------------------------------------------
```

erlang 的環境變量已经自动設置，但是 elixir 還需要按照上面提示的路徑**手动**設置：

```powershell
$elixirPath = "C:\ProgramData\chocolatey\lib\Elixir\tools\bin"
$env:Path = [System.Environment]::GetEnvironmentVariable("PATH", "Machine")
$env:Path += ";$elixirPath"
[System.Environment]::SetEnvironmentVariable("PATH", $env:Path, "Machine")
```

### 安裝包

安裝包安裝也是可以的：

- [erlang](https://erlang.org/download/)
- [elixir](https://github.com/elixir-lang/elixir/releases)

elixir 依然需要設置環境變量

## 验证安装成功

使用命令直接顯示版本

```powershell
PS C:\Users\Administrator> elixir -v
Erlang/OTP 26 [erts-14.2.2] [source] [64-bit] [smp:16:16] [ds:16:16:10] [async-threads:1] [jit:ns]

Elixir 1.16.1 (compiled with Erlang/OTP 26)

```

在 cmd 中使用 `iex` 可以進入交互式環境，powershell 里不可以進，因為 iex 是 powershell 的内置命令。

在 iex 中使用 `clear` 回车可以清空输入

## 運行 helloworld 脚本

創建 helloworld.exs 文件，在 vscode 中透過 codeRunner 插件運行 或 `elixir ./helloworld.exs`，

```elixir
"Hello world!" |> IO.puts
```

vscode 會自己提示需要安装的插件，但是 LSP 頻繁從 GITHUB 拉取，在中国大陆難用

## 使用 mix 創建專案

```powershell
mix --help
```

::: danger `size_object: matchstate term not allowed`
mix 發佈了使用不匹配的 erlang/OTP 版本所編譯而导致
降低 elixir 到上一個中版本即可 比如 1.17.x 會报错
在 GitHub 上查詢到 1.16 的最後一個版本後安装：
`choco install elixir --allow-downgrade -version 1.16.3`
:::

### 初始化空專案

使用 `mix new MyProject` 命令創建新的專案，里面有一些樣板程式碼

進入生成的專案根目錄後 使用 `iex -S mix` 進入交互式環境，且自动导入了專案的主函數（java 專案是一個主類，elixir 的專案是一個函數）

在 iex 中使用 `recompile` 回车可以重新編譯專案

在 iex 中使用 `c` 可以編譯某個 ex 文件

### 依赖管理

使用 hex 來管理套件

使用 `mix local.hex --force` 命令安装或尝试升级它

使用 `mix compile` 編譯專案

使用 `mix deps.get` 安装專案依赖

使用 `mix deps.compile` 編譯專案依赖

使用 `mix format` 格式化專案程式碼

使用 `mix test` 運行所有\_test 结尾的 .exs 文件里的测试用例

### 使用目標框架的脚手架創建空專案

hex 安装好是前提。

使用 `mix archive.install hex Framework_new` 安装需要的脚手架

使用 `mix Framework.new MyProject` 命令創建新的目標框架專案，里面有目標框架的樣板結構和程式碼

### 設置镜像

默認的 [hex](https://repo.hex.pm) 的 S3 伺服器在中国大陆稍逊

```powershell
mix hex.repo set hexpm --url https://hexpm.upyun.com
```

### vscode

有的版本會不适用 ElixirLS（語言伺服器）需要降低或提高版本：

> Erlang OTP 26.0 and 26.1 have critical bugs on Windows. Please make sure OTP 26.2 or greater is installed

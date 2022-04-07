# 基本語法

笔记也只是記錄一個大概，详细還是得看官方文档

- [docs](https://hexdocs.pm/elixir/basic-types.html)
- [elixirschool](https://elixirschool.com/zh-hans/lessons/basics/basics)

## 注释

同 python

```elixir
# hello
```

## 運算符

運算符與 JavaScript 的一樣 特別的:

`===` 才能区分浮点和整數

`<>` 字串拼接

`and` `or` `not` 用於布尔值（第一個参數）

## 模式匹配 `=`

相當於 宣告賦值/重新分配

```elixir
iex> x = 1
1
iex> {x, ^x} = {2, 1}
{2, 1}
iex> x
2

iex> s = "www"
"www"
iex> "w" <> s = s
"www"
iex> s
"ww"

iex> li = [1, 2, 3]
[1, 2, 3]
iex> [_, _| li] = li
[1, 2, 3]
iex> li
[3]
```

- `^` 匹配已被賦值的常數名
- `—` 是通配符
- `|` 将列表分成前幾個和剩餘部分

## 模板字串

```elixir
"Hello #{name}"
```

## 流程控制

```elixir
if String.valid?("Hello") do
  "Valid string!"
else
  "Invalid string."
end
```

`unless` 相當於其他語言 if not

```elixir
case {:ok, "Hello World"} do
  {:ok, result} -> result
  {:error} -> "Uh oh!"
  _ -> "Catch all"
end
```

- `_` 用來兜底
- 和 `=` 和 具名函數 一樣的模式匹配规则
- `->` 前支援 `when` 條件
- 嵌套时可能可以用 `with` 優化

```elixir
cond do
  7 + 1 == 0 -> "Incorrect"
  true -> "Catch all"
end
```

`cond` 相當於其他語言的 `match`

## 縮進

官方推薦 2 空格縮進，如果

```elixir
def fun do
  :todo
end
```

中 縮進的 `:todo` 只有一行 那么也可以簡寫為

```elixir
def fun do: :todo
```

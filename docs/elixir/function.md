# 函數

## 匿名

调用要加`.()`

```elixir
iex> sum = fn (a, b) -> a + b end
iex> sum.(2, 3)
5
```

簡寫，但是必须要有参數

```elixir
iex> sum = &(&1 + &2)
iex> sum.(2, 3)
5
```

多個签名根据参數匹配

```elixir
iex> handle_result = fn
...>     {:ok, result} -> IO.puts "Handling result..."
...>     {:ok, _} -> IO.puts "This would be never run as previous will be matched beforehand."
...>     {:error} -> IO.puts "An error has occurred!"
...> end
iex> handle_result.({:ok, "hello"})
Handling result...
:ok
```

## 具名

宣告在模塊内, 调用可以加 `()`，也可以省略

```elixir
defmodule Greeter do
  def hello(name) do
    "Hello, " <> name
  end
end

iex> Greeter.hello("Sean")
"Hello, Sean"
```

分配给一個變數 调用方法同匿名函數

```elixir
hello = &Greeter.hello/1
iex> hello.("Sean")
"Hello, Sean"
```

模塊内的具名函數直接寫同名的即可多個签名根据参數匹配

`defp` 宣告私有函數

`do` 之前支援 `when` 條件 和 `case` 的子句一樣

`\\` 参數設置默認值 實際是生成 2 個同名具名函數 如：`foo/0` 和 `foo/1`

## 递归

```elixir
defmodule Length do
  def of([]), do: 0
  def of([_ | tail]), do: 1 + of(tail)
end

iex> Length.of []
0
iex> Length.of [1, 2, 3]
3
```

## 参數解構

参數是 map 等时支援結構，結構失败算参數匹配失败轉走其他签名

`=` 左右順序无关

```elixir
defmodule Greeter do
  def hello(%{name: person_name} = person) do
    IO.puts "Hello, " <> person_name
    IO.inspect person
  end
end
```

## 管道

具名函數的 `()` 推薦省略

```elixir
foo(bar(:a))
:a |> bar() |> foo()
:a |> bar |> foo

foo(bar(:a, 1), 2)
:a |> bar(1) |> foo(2)
```

有多個参數的时候前置

```elixir
iex> sum = &(&1 + &2)
iex> 1 |> sum.(2) |> sum.(3)
6
```

::: warning 高阶函數可能有歧義？

不會，因為高阶函數只能返回匿名函數，而匿名函數调用时的 `.()` 不能省略

隔壁的 [`gleam`](https://gleam.run/) 語言存在歧義：

> It will first check to see if the left-hand value could be used as the first argument to the call. For example, `a |> b(1, 2)` would become `b(a, 1, 2)`. If not, it falls back to calling the result of the right-hand side as a function, e.g., `b(1, 2)(a)`

:::

## 結構体

```elixir
defmodule Example.User do
  defstruct name: "Sean", roles: []
end

iex> %Example.User{name: "Steve"}
```

可以和 map 相互匹配

可以用`alias` 继承另一個結構体

## sigils

類似 JavaScript 等語言的字串模板的 tag，如 `` html`<p>${'你好'}</p>` ``

或者 python 内置的 f-string，r-string，如 `f"{var}"`

### 内置

- 字元：

  - `~C` 創建一個不處理插值和轉義字元的字元列表
  - `~c` 創建一個處理插值和轉義字元的字元列表 过去由单引号創建：`'a'`

  ```elixir
  iex> 'op'
  ~c"op"
  ```

- 字串：

  - `~S` 創建一個不處理插值和轉義字元的字串
  - `~s` 創建一個處理插值和轉義字元的字串
  - `~W` 創建一個不處理插值和轉義字元的单词列表
  - `~w` 創建一個處理插值和轉義字元的单词列表

- 正则表达式：

  ```elixir
  iex> String.match?("123abc", ~r/^[[:alnum:]]+$/)
  true
  ```

  - `~R` 創建一個不處理插值和轉義字元的正则表达式
  - `~r` 創建一個處理插值和轉義字元的正则表达式

- 时间日期有关：

  ```elixir
  iex> Time.utc_now
  ~T[19:39:31.056226]
  iex> Date.utc_today
  ~D[2028-10-21]
  iex> NaiveDateTime.utc_now
  ~N[2029-01-21 19:55:10.008965]
  iex> ~U[2019-01-01T12:00:00+00:00]
  ~U[2019-01-01 12:00:00Z]
  ```

  - `~N` 創建一個 `NaiveDateTime` 數据結構
  - `~U` 創建一個 `DateTime` 數据結構

- 自訂：

  ```elixir
  defmodule MySigils do
    def sigil_p(string, []), do: String.upcase(string)
  end

  iex> import MySigils
  nil

  iex> ~p/nanari/
  NANARI
  ```

## 宏

可以用 `import` 解構整個模塊的函數和宏

可以用 `require` 解構整個模塊的宏

可以用 `use` 调用模塊的`__using__`宏函數钩子

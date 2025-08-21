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

`\\` 参數設置默認值 實際是生成 2 個同名具名函數 如：`foo/0` 和 `foo/1`

## 遞迴

寫一個快速排序:

```elixir
defmodule LinkedList do
  # 链表长度
  def len([]), do: 0
  def len([_ | tail]), do: 1 + len(tail)

  # 链表筛选
  def filter([], _), do: []

  def filter([head | tail], f) do
    if f.(head) do
    [head] ++ filter(tail, f)
    else
    filter(tail, f)
    end
  end

  # 链表排序
  def sorted([]), do: []

  def sorted([head | tail]) do
    left = filter(tail, fn n -> n >= head end)
    right = filter(tail, fn n -> n < head end)
    sorted(left) ++ [head] ++ sorted(right)
  end
end


iex> LinkedList.len []
0
iex> LinkedList.len [1, 2, 3]
3
```

沒有循環指令的情況下，僅僅是獲取链表长度長度就地規遞迴

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

輸出個位數乘法表

```elixir
defmodule Main do
  def print99(), do: print1(1, 1)
  defp print1(_, i) when i > 9, do: 0

  defp print1(i, i) do
    IO.puts("#{i} * #{i} = #{i * i}")
    print1(1, i + 1)
  end

  defp print1(i, j) do
    IO.write("#{i} * #{j} = #{i * j}\t")
    print1(i + 1, j)
  end
end

iex> Main.print99
1 * 1 = 1
1 * 2 = 2    2 * 2 = 4
1 * 3 = 3    2 * 3 = 6     3 * 3 = 9
1 * 4 = 4    2 * 4 = 8     3 * 4 = 12    4 * 4 = 16
1 * 5 = 5    2 * 5 = 10    3 * 5 = 15    4 * 5 = 20    5 * 5 = 25
1 * 6 = 6    2 * 6 = 12    3 * 6 = 18    4 * 6 = 24    5 * 6 = 30    6 * 6 = 36
1 * 7 = 7    2 * 7 = 14    3 * 7 = 21    4 * 7 = 28    5 * 7 = 35    6 * 7 = 42    7 * 7 = 49
1 * 8 = 8    2 * 8 = 16    3 * 8 = 24    4 * 8 = 32    5 * 8 = 40    6 * 8 = 48    7 * 8 = 56    8 * 8 = 64
1 * 9 = 9    2 * 9 = 18    3 * 9 = 27    4 * 9 = 36    5 * 9 = 45    6 * 9 = 54    7 * 9 = 63    8 * 9 = 72     9 * 9 = 81
0
```

`defp` 宣告私有函數

`do` 之前支援 `when` 條件 和 `case` 的子句一樣

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

不會，因為高阶函數只能傳回匿名函數，而匿名函數调用时的 `.()` 不能省略

隔壁的 [`gleam`](https://gleam.run/) 語言存在歧義：

> It will first check to see if the left-hand value could be used as the first argument to the call. For example, `a |> b(1, 2)` would become `b(a, 1, 2)`. If not, it falls back to calling the result of the right-hand side as a function, e.g., `b(1, 2)(a)`

:::

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

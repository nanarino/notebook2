# 數据類型

## 基本類型

- integer 支援 `0b` `0o` `0x`
- float 不支援 `.`开頭
- boolean 除了 `false` 和 `nil` 之外所有的值都為真。
- atom 一种 symbol 類型 `:true == true` 模塊名也是原子
- string 字面量 `"OP"` 或 `<<79,80>>` 前者是 utf8 且支援`\u`轉義的。支援换行。单引号的字元列表的字面量表示标记棄用了
- list 字面量`[i,]` 實際上是用**链表**實现 獲取长度是 O(n)
  - 使用 `++` 拼接两個列表
  - 使用 `[ head | list ]` 插入頭尾
  - 使用 `--` 过滤（只过滤相同的數量）
  - `hd()` `tl()` 獲取頭元素和尾列 （第一個是頭元素 剩下的都在尾列）
  - 使用 `[head | tail] = list` 解構頭尾，頭可以一次取出多個
- tuple 字面量`{i,}` 不可变數组 内存連續
  - 第一個元素是 atom 时也称 Record
- function

## 集合類型

### Associative

- Keyword 字面量：`[{k, v},]`，二元元组列表 用 js 表达相當於 `obj.entries()` key 可重复
  - `{:key, v}` 可以寫成 `key:v` 但得後置 如 `[{:hello, "world"}, foo: "bar"]`
- Map 字面量：`%{k => v,}` 无序 鍵類型任意
  - `map.hello` 和 `map["hello"]` 獲取值
  - `:key =>` 可以寫成 `key:` 但得後置 如 `%{:hello => "world", foo: "bar"}`
  - `%{ map | **map }` 用 js 表达相當於 `{...o1, ...o2}` 但鍵若不存在會 `KeyError`
  - `Map.put(map, key, value)` 添加新 key，用 js 表达相當於 `{...o1, key: value}`
- MapSet 没有字面量 使用 `MapSet.new([1, :two, {"three"}])` 創建

### Comprehensions

```elixir
# 关鍵字列表
iex> for {_key, val} <- [one: 1, two: 2, three: 3], do: val
[1, 2, 3]

# 映射
iex> for {k, v} <- %{"a" => "A", "b" => "B"}, do: {k, v}
[{"a", "A"}, {"b", "B"}]

# 二進制
iex> for <<c <- "hello">>, do: <<c>>
["h", "e", "l", "l", "o"]

# 过滤 可以多個
import Integer
iex> for x <- 1..10, is_even(x), do: x
[2, 4, 6, 8, 10]
```

#### `into`

```elixir
iex> for {k, v} <- [one: 1, two: 2, three: 3], into: %{}, do: {k, v}
%{one: 1, three: 3, two: 2}
iex> for c <- [72, 101, 108, 108, 111], into: "", do: <<c>>
"Hello"
```

### Range

語法 `first..last//step` 如 `1..10` `10..1//-1` 左閉右閉

不支援 `1..<10` 寫法

### Enum

内置了 70 多個操作枚舉類型的函數 `all` `any` `map` `filter` `reduce` 等

```elixir
iex> Enum.map([1, 2, 3, 4, 5], fn(x) -> x ** 2 end)
[1, 4, 9, 16, 25]

iex> Enum.map([1, 2, 3, 4, 5], &(&1 ** 2))
[1, 4, 9, 16, 25]

iex> Enum.map([1,2,3], &:math.sqrt(&1))
[1.0, 1.4142135623730951, 1.7320508075688772]

iex> Enum.map([1,2,3], &:math.sqrt/1)
[1.0, 1.4142135623730951, 1.7320508075688772]
```

## 結構体

```elixir
defmodule Example.User do
  defstruct name: "Sean", roles: []
end

iex> %Example.User{name: "Steve"}
```

可以和 map 相互匹配

可以用 `alias` 继承另一個結構体

### 協議

```elixir
defmodule Demo do
  defstruct name: nil, id: nil
  # 实现协议
  defimpl String.Chars do
    def to_string(term), do: "<Demo##{term.id} name=#{term.name}>"
  end
end

iex> demo = %Demo{name: "nanari", id: 1}
iex> "#{demo}" === "<Demo#1 name=nanari>"
true
```

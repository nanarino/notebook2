# 基本語法

## 引包

```gleam
import gleam/io
io.println("Hello, Vivian!")
```

```gleam
import gleam/io.{println}
println("Hello, Vivian!")
```

```gleam
import gleam/string as text
text.reverse("Hello, Jane!")
```

```gleam
import gleam/string_tree.{type StringTree}
let _text: StringTree = string_tree.new()
```

## 變數宣告

```gleam
let _is_cool: Bool = True
const ints: List(Int) = [1, 2, 3]

let _triple = #(1, 2.2, "three")
<<"Hello, Joe!":utf8>>

// Bit arrays
let _i8m = <<2147483647>>
let _hello = <<"Hello, Joe!":utf8>>

import gleam/dict
let _scores = dict.from_list([#("Lucy", 13), #("Drew", 15)])
```

`const` 只能在模組的頂層定義

## 運算符

普通, 只有浮點數略為特別

```gleam
echo 1.0 +. 1.5
echo 5.0 -. 1.5
echo 5.0 /. 2.5
echo 3.0 *. 3.5

echo 2.2 >. 1.3
echo 2.2 <. 1.3
echo 2.2 >=. 1.3
echo 2.2 <=. 1.3
```

## 類型自訂

```gleam
pub type UserId = Int

pub type Season {
  Spring
  Summer
  Autumn
  Winter
}

pub type Person {
  Person(name: String, age: Int, needs_glasses: Bool)
}

pub type SchoolPerson {
  Teacher(name: String, subject: String)
  Student(name: String)
}

pub type Option(inner) {
  Some(inner)
  None
}
pub const name: Option(String) = Some("Annah")
```

## 自執行塊

```gleam
let fahrenheit = {
  let degrees = 64
  degrees
}
```

## 解構

比 js 少一個 `.`

```gleam
let ints = [1, 2, 3]
echo [-1, 0, ..ints]


pub type SchoolPerson {
  Teacher(name: String, subject: String, floor: Int, room: Int)
}
let teacher1 = Teacher(name: "Mr Dodd", subject: "ICT", floor: 2, room: 2)
// Use the update syntax
let teacher2 = Teacher(..teacher1, subject: "PE", room: 6)
```

## 函數

```gleam
pub fn main() {
  // Assign an anonymous function to a variable
  let add_one = fn(a) { a + 1 }
  echo twice(1, add_one)

  // Pass an anonymous function as an argument
  echo twice(1, fn(a) { a * 2 })

  let secret_number = 42
  // This anonymous function always returns 42
  let secret = fn() { secret_number }
  echo secret()
}

fn twice(argument: Int, my_function: fn(Int) -> Int) -> Int {
  my_function(my_function(argument))
}
```

### 偏函數

```gleam
let add_one_v2 = add(1, _) // 等效於:
let add_one_v1 = fn(x) { add(1, x) }
```

### 管道

```gleam
"Hello" |> io.println
```

它會先檢查左側值是否可以用作呼叫的第一個參數。例如， `a |> b(1, 2)` 會變成 `b(a, 1, 2)` 。如果不是，則傳回將右側的結果作為函數調用，例如 `b(1, 2)(a)`

### 標記參數

```gleam
pub fn main() {
  // Without using labels
  echo calculate(1, 2, 3)

  // Using the labels
  echo calculate(1, add: 2, multiply: 3)

  // Using the labels in a different order
  let add = 2
  echo calculate(1, multiply: 3, add:)
}

fn calculate(value: Int, add addend: Int, multiply multiplier: Int) {
  value * multiplier + addend
}
```

當局部變數與函數的標籤參數同名時，呼叫函數時可以省略變數名

## 流程控制

```gleam
let x = int.random(5)
echo x

let result = case x {
  // Match specific values
  2 | 4  -> "even number"
  1 | 3  -> "odd number"

  // Match any other value
  _ -> "Other"
  // Match any other value and assign it to a variable
  // other -> "It is " <> int.to_string(other)
}
echo result
```

階乘

```gleam
pub fn factorial(x: Int) -> Int {
  case x {
    // Base case
    0 -> 1
    1 -> 1

    // Recursive case
    _ -> x * factorial(x - 1)
  }
}
```

尾調用

```gleam
pub fn factorial(x: Int) -> Int {
  // The public function calls the private tail recursive function
  factorial_loop(x, 1)
}

fn factorial_loop(x: Int, accumulator: Int) -> Int {
  case x {
    0 -> accumulator
    1 -> accumulator

    // The last thing this function does is call itself
    // In the previous lesson the last thing it did was multiply two ints
    _ -> factorial_loop(x - 1, accumulator * x)
  }
}
```

### 模式匹配

匹配以 AAA 開頭的字串

```gleam
let result case x {
  "AAA" <> name -> name
  _ -> "Unknown"
}
```

匹配符合解構的鏈表

```gleam
let result = case x {
  [] -> "Empty list"
  [1] -> "List of just 1"
  [4, ..] -> "List starting with 4"
  [_, _] -> "List of 2 elements"
  _ -> "Some other list"
}
```

鏈表求和

```gleam
fn sum_list(list: List(Int), total: Int) -> Int {
  case list {
    [first, ..rest] -> sum_list(rest, total + first)
    [] -> total
  }
}
```

設置別名

```gleam
fn get_first_non_empty(lists: List(List(t))) -> List(t) {
  case lists {
    [[_, ..] as first, ..] -> first
    [_, ..rest] -> get_first_non_empty(rest)
    [] -> []
  }
}
```

多組

```gleam
let result = case x, y {
  0, 0 -> "Both are zero"
  0, _ -> "First is zero"
  _, 0 -> "Second is zero"
  _, _ -> "Neither are zero"
}
```

自訂類型

```gleam
pub type Fish {
  Starfish(name: String, favourite_color: String)
  Jellyfish(name: String, jiggly: Bool)
}

let zako = case fish {
  Starfish(_, favourite_color) -> io.println(favourite_color)
  Jellyfish(name, ..) -> io.println(name)
}
```

## ~~異常~~

Gleam 不使用異常，而是將成功或失敗的計算傳回內建 Result(value, error) 類型的值:

- `Ok`
- `Error`

```gleam
pub type PurchaseError {
  NotEnoughMoney(required: Int)
  NotLuckyEnough
}

fn buy_pastry(money: Int) -> Result(Int, PurchaseError) {
  case money >= 5 {
    True ->
      case int.random(4) == 0 {
        True -> Error(NotLuckyEnough)
        False -> Ok(money - 5)
      }
    False -> Error(NotEnoughMoney(required: 5))
  }
}
```

### 捷徑

```gleam
import gleam/int
import gleam/io
import gleam/result

pub fn main() {
  io.println("=== map ===")
  let _ = echo result.map(Ok(1), fn(x) { x * 2 })
  let _ = echo result.map(Error(1), fn(x) { x * 2 })

  io.println("=== try ===")
  let _ = echo result.try(Ok("1"), int.parse)
  let _ = echo result.try(Ok("no"), int.parse)
  let _ = echo result.try(Error(Nil), int.parse)

  io.println("=== unwrap ===")
  echo result.unwrap(Ok("1234"), "default")
  echo result.unwrap(Error(Nil), "default")

  io.println("=== pipeline ===")
  int.parse("-1234")
  |> result.map(int.absolute_value)
  |> result.try(int.remainder(_, 42))
  |> echo
}
```

## `use`

```gleam
pub fn main() -> Nil {
  use a, b <- my_function
  next(a)
  next(b)
}
```

等價於

```gleam
pub fn main() -> Nil {
  my_function(fn(a, b) {
    next(a)
    next(b)
  })
}
```

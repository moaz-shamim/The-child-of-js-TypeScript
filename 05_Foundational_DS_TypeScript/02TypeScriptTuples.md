# Tuples in TypeScript :

A tuple is a special type of array where:

* The **order** of elements matters.
* The **type of each position** is fixed.
* The **length** can be fixed or partially fixed.

---

## Basic tuple

```ts
let chaiTuple: [string, number];

chaiTuple = ["Masala", 20]; // ✅
```

The tuple means:

```ts
[string, number]
```

* First value → `string`
* Second value → `number`

❌ Wrong order:

```ts
chaiTuple = [20, "Masala"];
```

Error:

```text
Type 'number' is not assignable to type 'string'.
```

---

## Tuple with optional elements

```ts
let userInfo: [string, number, boolean?];
```

The `?` makes the third element optional.

✅ Valid:

```ts
userInfo = ["hitesh", 100];

userInfo = ["hitesh", 100, true];
```

❌ Invalid:

```ts
userInfo = ["hitesh"];

userInfo = ["hitesh", true];
```

The second element must always be a number.

---

## Readonly tuple

```ts
const location: readonly [number, number] = [28.66, 32.22];
```

This represents a fixed pair of coordinates.

You can read values:

```ts
console.log(location[0]); // 28.66
```

But you cannot modify them:

```ts
location[0] = 30.5; // ❌

location.push(40); // ❌
```

---

## Named tuples

TypeScript allows labels to improve readability:

```ts
const chaiItems: [name: string, price: number] = [
  "Masala",
  25
];
```

The labels (`name` and `price`) are only for documentation and editor hints.

They do not create object properties.

You still access values by index:

```ts
console.log(chaiItems[0]); // "Masala"
console.log(chaiItems[1]); // 25
```

❌ This does not work:

```ts
chaiItems.name;
chaiItems.price;
```

Because tuples are arrays, not objects.

---

## Tuple vs object

Use a tuple when the data is:

* Small
* Fixed in size
* Position-based

Example:

```ts
type Coordinate = [number, number];
type RGB = [number, number, number];
```

Use an object when the data has meaning beyond position:

```ts
type Chai = {
  name: string;
  price: number;
};
```

Objects are usually easier to read:

```ts
const chai = {
  name: "Masala",
  price: 25
};
```

instead of:

```ts
const chai: [string, number] = ["Masala", 25];
```

With tuples, readers must remember:

* index `0` → name
* index `1` → price

With objects, the property names make it obvious.

---

## Quick summary

| Type                            | Meaning                     |
| ------------------------------- | --------------------------- |
| `[string, number]`              | Fixed two-element tuple     |
| `[string, number, boolean?]`    | Third element is optional   |
| `readonly [number, number]`     | Immutable tuple             |
| `[name: string, price: number]` | Named tuple for readability |

Think of tuples as **arrays with rules**.

# Tuple features in TypeScript :

Your code demonstrates four tuple features in TypeScript:

1. Basic tuples
2. Optional tuple elements
3. Readonly tuples
4. Named tuples

---

## 1. Basic tuple

```ts
let chaiTuple: [string, number];

chaiTuple = ["Masala", 20]; // ✅
```

The tuple type:

```ts
[string, number]
```

means:

* Index `0` must be a `string`
* Index `1` must be a `number`

❌ Wrong order:

```ts
chaiTuple = [20, "Masala"];
```

Error:

```text
Type 'number' is not assignable to type 'string'.
```

Tuples enforce both **type** and **position**.

---

## 2. Tuple with optional elements

```ts
let userInfo: [string, number, boolean?];

userInfo = ["hitesh", 100];       // ✅
userInfo = ["hitesh", 100, true]; // ✅
```

The `?` makes the third element optional.

Equivalent meaning:

```ts
[
  name: string,
  score: number,
  isAdmin?: boolean
]
```

❌ Invalid:

```ts
userInfo = ["hitesh"];
userInfo = ["hitesh", true];
```

The first two elements are still required.

---

## 3. Readonly tuple

```ts
const location: readonly [number, number] = [28.66, 32.22];
```

This creates an immutable tuple.

✅ Reading values:

```ts
console.log(location[0]); // 28.66
```

❌ Modifying values:

```ts
location[0] = 30.5;
location.push(40);
```

Both operations produce errors.

A common use case is coordinates:

```ts
type Coordinate = readonly [number, number];
```

---

## 4. Named tuples

```ts
const chaiItems: [name: string, price: number] = [
  "Masala",
  25
];
```

The names (`name` and `price`) improve readability and editor hints.

However, they do not create object properties.

You still access values by index:

```ts
console.log(chaiItems[0]); // "Masala"
console.log(chaiItems[1]); // 25
```

❌ This does not work:

```ts
chaiItems.name;
chaiItems.price;
```

Because tuples are arrays, not objects.

---

## Tuple vs Object

Use tuples when:

* The number of elements is fixed
* The order matters
* The meaning comes from position

Examples:

```ts
type RGB = [number, number, number];

type Coordinate = [number, number];

type HttpResponse = [number, string];
```

Use objects when property names matter:

```ts
type Chai = {
  name: string;
  price: number;
};
```

Objects are usually easier to understand:

```ts
const chai = {
  name: "Masala",
  price: 25
};
```

instead of:

```ts
const chai: [string, number] = ["Masala", 25];
```

---

### Quick summary

| Type                            | Meaning                   |
| ------------------------------- | ------------------------- |
| `[string, number]`              | Fixed two-element tuple   |
| `[string, number, boolean?]`    | Third element is optional |
| `readonly [number, number]`     | Immutable tuple           |
| `[name: string, price: number]` | Named tuple               |

Think of a tuple as an **array with a fixed structure**.

# Arrays in TypeScript :

Your code shows the two common ways to define arrays in TypeScript.

## 1. Array of strings

```ts
const chaiFlavours: string[] = ["Masala", "Adrak"];
```

This means:

* `chaiFlavours` must be an array.
* Every element inside the array must be a `string`.

✅ Valid:

```ts
chaiFlavours.push("Elaichi");
```

❌ Error:

```ts
chaiFlavours.push(10);
```

---

## 2. Array of numbers

```ts
const chaiPrice: number[] = [10, 20];

const rating: number[] = [4.5, 5.0];
```

Only numbers are allowed.

```ts
rating.push(4.8); // ✅
rating.push("5"); // ❌
```

---

## 3. Generic array syntax

TypeScript also provides a generic syntax:

```ts
const rating: Array<number> = [4.5, 5.0];
```

This is exactly the same as:

```ts
const rating: number[] = [4.5, 5.0];
```

Both are equivalent.

Developers usually prefer the shorter syntax:

```ts
number[]
string[]
boolean[]
```

---

## 4. Array of objects

First, you define the shape of each object:

```ts
type Chai = {
  name: string;
  price: number;
};
```

Then create an array where every element must follow that structure:

```ts
const menu: Chai[] = [
  { name: "Masala", price: 15 },
  { name: "Adrak", price: 25 },
];
```

Each object in `menu` must have:

* `name` → `string`
* `price` → `number`

✅ Valid:

```ts
menu.push({
  name: "Elaichi",
  price: 30,
});
```

❌ Missing property:

```ts
menu.push({
  name: "Elaichi",
});
```

Error:

```text
Property 'price' is missing.
```

❌ Wrong type:

```ts
menu.push({
  name: "Elaichi",
  price: "30",
});
```

Error:

```text
Type 'string' is not assignable to type 'number'.
```

---

## 5. Generic syntax for object arrays

You can also write:

```ts
const menu: Array<Chai> = [
  { name: "Masala", price: 15 },
  { name: "Adrak", price: 25 },
];
```

This is equivalent to:

```ts
const menu: Chai[] = [...];
```

---

### Quick rule

Use:

```ts
Type[]
```

for most cases.

Examples:

```ts
string[]
number[]
boolean[]
Chai[]
```

Use:

```ts
Array<Type>
```

when working with more complex types, such as nested arrays:

```ts
const matrix: Array<Array<number>> = [
  [1, 2],
  [3, 4],
];
```

which is equivalent to:

```ts
const matrix: number[][] = [
  [1, 2],
  [3, 4],
];
```

Both styles are correct—choose one and stay consistent throughout your project.

# Readonly Arrays and Multidimensional Arrays :

Your examples introduce two more important TypeScript array concepts: **readonly arrays** and **multidimensional arrays**.

---

## 1. Readonly arrays

```ts
const cities: readonly string[] = ["Delhi", "Jaipur"];
```

This means:

* `cities` is an array of strings.
* The array cannot be modified after creation.

✅ Allowed:

```ts
console.log(cities[0]);

for (const city of cities) {
  console.log(city);
}
```

❌ Not allowed:

```ts
cities.push("Pune");
cities.pop();
cities.splice(0, 1);
cities[0] = "Mumbai";
```

TypeScript will show errors because these operations mutate the array.

---

### Alternative syntax

You can also write:

```ts
const cities: ReadonlyArray<string> = ["Delhi", "Jaipur"];
```

This is equivalent to:

```ts
const cities: readonly string[] = ["Delhi", "Jaipur"];
```

Many developers prefer the shorter syntax:

```ts
readonly string[]
```

---

### Important distinction: `const` vs `readonly`

This often confuses beginners.

```ts
const cities = ["Delhi", "Jaipur"];
```

`const` prevents reassigning the variable:

```ts
cities = ["Mumbai"]; // ❌
```

But mutation is still allowed:

```ts
cities.push("Pune"); // ✅
```

To prevent mutation, use `readonly`:

```ts
const cities: readonly string[] = ["Delhi", "Jaipur"];

cities.push("Pune"); // ❌
```

---

## 2. Multidimensional arrays

```ts
const table: number[][] = [
  [1, 2, 3],
  [4, 5, 6]
];
```

`number[][]` means:

* The outer array contains arrays.
* Each inner array contains numbers.

Think of it as a grid or matrix:

```text
[
  [1, 2, 3],
  [4, 5, 6]
]
```

You can access values using two indexes:

```ts
console.log(table[0][1]); // 2
console.log(table[1][2]); // 6
```

---

### Generic syntax

You can also write:

```ts
const table: Array<Array<number>> = [
  [1, 2, 3],
  [4, 5, 6]
];
```

This is equivalent to:

```ts
const table: number[][] = [
  [1, 2, 3],
  [4, 5, 6]
];
```

---

### More examples

Array of arrays of strings:

```ts
const teams: string[][] = [
  ["Virat", "Rohit"],
  ["Dhoni", "Jadeja"]
];
```

Readonly multidimensional array:

```ts
const matrix: readonly (readonly number[])[] = [
  [1, 2],
  [3, 4]
];
```

Now neither the outer array nor the inner arrays can be modified.

---

### Quick summary

| Type                    | Meaning                     |
| ----------------------- | --------------------------- |
| `string[]`              | Array of strings            |
| `readonly string[]`     | Immutable array of strings  |
| `number[][]`            | Array of number arrays      |
| `ReadonlyArray<string>` | Same as `readonly string[]` |
| `Array<Array<number>>`  | Same as `number[][]`        |


# Methods work exactly the same way in TypeScript :

Yes—almost all JavaScript array methods work exactly the same way in TypeScript because TypeScript is a superset of JavaScript.

For example, these methods are all valid:

```ts
const prices: number[] = [10, 20, 30];

prices.push(40);

const doubled = prices.map(price => price * 2);

const filtered = prices.filter(price => price > 15);

const total = prices.reduce((sum, price) => sum + price, 0);

prices.forEach(price => console.log(price));

const hasTwenty = prices.includes(20);
```

TypeScript adds **type checking** on top of these methods.

---

## Example: `map()`

```ts
const numbers: number[] = [1, 2, 3];

const strings = numbers.map(num => num.toString());
```

TypeScript automatically infers:

```ts
strings; // string[]
```

---

## Example: `filter()`

```ts
const values: (number | null)[] = [1, null, 3];

const filtered = values.filter(
  (value): value is number => value !== null
);
```

TypeScript understands:

```ts
filtered; // number[]
```

---

## Type safety with array methods

```ts
const cities: string[] = ["Delhi", "Jaipur"];

cities.push("Pune"); // ✅

cities.push(100); // ❌ Error
```

Error:

```text
Argument of type 'number' is not assignable to parameter of type 'string'.
```

The JavaScript method exists, but TypeScript ensures you use it correctly.

---

## When array methods are restricted

Some array types limit which methods you can use.

### Readonly arrays

```ts
const cities: readonly string[] = ["Delhi", "Jaipur"];
```

❌ Mutation methods are blocked:

```ts
cities.push("Pune");
cities.pop();
cities.splice(0, 1);
```

✅ Non-mutating methods still work:

```ts
cities.map(city => city.toUpperCase());

cities.filter(city => city.startsWith("D"));

cities.includes("Delhi");
```

---

## Tuples

Tuples are arrays with fixed positions and types:

```ts
let chai: [string, number] = ["Masala", 20];
```

Some array methods can break tuple guarantees, so TypeScript is more restrictive.

For example:

```ts
chai.push(30); // Allowed in some TS versions ⚠️
```

This is one reason many developers use `readonly` tuples:

```ts
const chai: readonly [string, number] = ["Masala", 20];
```

---

## Summary

| Array type          | JS methods available?          |
| ------------------- | ------------------------------ |
| `string[]`          | ✅ Yes                          |
| `number[]`          | ✅ Yes                          |
| `Chai[]`            | ✅ Yes                          |
| `readonly string[]` | ⚠️ Only non-mutating methods   |
| Tuples              | ⚠️ Some methods are restricted |

TypeScript does not change how arrays work at runtime—it only checks your code at compile time.

So a good rule is:

> If an array method exists in JavaScript, it also exists in TypeScript. TypeScript simply ensures you use it with the correct types.

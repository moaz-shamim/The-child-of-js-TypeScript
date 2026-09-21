# TypeScript Union

In TypeScript, a union type allows a variable to hold values of multiple types. It is defined using the `|` (pipe) symbol, making code flexible while still enforcing type safety.

### Syntax

```ts
type Variable = Type1 | Type2 | Type3;

let value: Variable;
```

### Explanation

- `|` (pipe symbol) is used to create a union type.
- `Variable` is a custom type that can be `Type1`, `Type2`, or `Type3`.
- A variable declared as `Variable` can store a value of any one of the listed types.
- This helps in cases where a value can come in different formats (e.g., `number` or `string`).

---

### Example: Basic Union Type

```ts
let value: number | string;

value = 190;
console.log("Numeric value of the value: " + value);

value = "Welcome to TypeScript!";
console.log("String value of the value: " + value);
```

### Output

```text
190
Welcome to TypeScript!
```

---

### Example: Union Type with Multiple Assignments

```ts
let geeks: string | number;

geeks = 123;
console.log(geeks);

geeks = "XYZ";
console.log(geeks);

// Error
// geeks = true;
```

### Output

```text
123
XYZ
```

### Explanation

- The variable `geeks` is of union type (`string | number`).
- It can hold either a `string` or a `number`.
- Any other type (such as `boolean`) is not allowed.

---

## Function Parameter as Union Type

We can use union types for function parameters. In the following example, the parameter `geeks` can be either a `string` or a `number`.

### Example

```ts
function displayType(geeks: string | number) {
  if (typeof geeks === "number") {
    console.log("geeks is number.");
  } else if (typeof geeks === "string") {
    console.log("geeks is string.");
  }
}

// Valid calls
displayType(49);
displayType("GFG");

// Invalid call
// displayType(true);
// Compiler Error:
// Argument of type 'boolean' is not assignable to parameter of type 'string | number'
```

### Output

```text
geeks is number.
geeks is string.
```

### Explanation

- `displayType()` accepts a `string` or a `number`.
- The `typeof` operator is used to determine the actual type at runtime.
- Passing a `number` or `string` works correctly.
- Passing a `boolean` causes a compile-time error.

---

## Array as Union Type

Union types can also be used with arrays. A variable can represent either a numeric collection or a string collection.

### Example

```ts
let arr: number[] | string[];

arr = [2, 5, 7, 5, 11, 15];

console.log("Display the array elements");

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

arr = ["Geeks", "G4G", "GFG", "GeeksforGeeks"];

console.log("Display the array elements");

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

### Output

```text
Display the array elements
2
5
7
5
11
15

Display the array elements
Geeks
G4G
GFG
GeeksforGeeks
```

### Explanation

1. A number array `[2, 5, 7, 5, 11, 15]` is assigned and printed.
2. Later, the same variable is assigned a string array.
3. Since the type is `number[] | string[]`, both assignments are valid.

---

### Key Points

- Union types allow a variable to store values of multiple types.
- Created using the `|` (pipe) operator.
- Improve flexibility while maintaining type safety.
- Commonly used for:
  - Variables
  - Function parameters
  - Arrays
  - API responses
  - Optional values (`string | undefined`, `number | null`, etc.)

### Examples

```ts
let id: string | number;

let userName: string | undefined;

let result: "success" | "error";

let data: number[] | string[];
```

# Literal Union Type in TypeScript:

```ts
let airlineSeat: "aisle" | "window" | "middle" = "window";
```

### Breaking it down

#### 1. String Literal Types

Each of these:

```ts
"aisle"
"window"
"middle"
```

is a **string literal type**, meaning the variable can hold exactly that string value and nothing else.

#### 2. Union Type (`|`)

The `|` operator creates a **union type**, meaning the variable can be one of several allowed types/values.

```ts
"aisle" | "window" | "middle"
```

#### Combined: Literal Union Type

So the variable `airlineSeat` can only be one of these three values:

```ts
let airlineSeat: "aisle" | "window" | "middle";

airlineSeat = "aisle";  // ✅
airlineSeat = "window"; // ✅
airlineSeat = "middle"; // ✅

airlineSeat = "front";  // ❌ Error
```

### Why use it?

It gives you **type safety** and **autocomplete**.

Without it:

```ts
let airlineSeat: string;
```

Any string is allowed.

With a literal union:

```ts
let airlineSeat: "aisle" | "window" | "middle";
```

Only valid seat types are allowed.

This pattern is very common in TypeScript for things like:

```ts
type Theme = "light" | "dark";
type Status = "loading" | "success" | "error";
type Role = "admin" | "user" | "guest";
```

So if you're organizing your TypeScript notes, put this under **Type Aliases & Union Types** or **Advanced Types**, and refer to it specifically as a **string literal union type**.


# Optional Value Pattern :

```ts
const orders = ["10", "20", "30", "40", "50"];

let currentOrder :string;

for (let order of orders) {
	if (order === "28") {
		currentOrder = order;
		break;
	}
}


console.log(currentOrder);
```

When you change:

```ts
let currentOrder: string;
```

to

```ts
let currentOrder: string | undefined;
```

you are using a **union type**.

Specifically:

```ts
string | undefined
```

means:

> "`currentOrder` can either contain a string value or be undefined."

TypeScript complains in your original code because it cannot guarantee that the loop will find `"20"` and assign a value.

For example:

```ts
const orders = ["10", "30", "40"];
```

In this case, `currentOrder` would never be assigned, so:

```ts
console.log(currentOrder);
```

would access an uninitialized variable.

By writing:

```ts
let currentOrder: string | undefined;
```

you explicitly tell TypeScript:

> "It's okay if this variable ends up not having a string value."

A very common TypeScript pattern is:

```ts
let user: string | undefined;
let age: number | null;
let data: object | undefined;
```

because the value might not be available yet.

You could also initialize the variable immediately:

# Some Important webisite to deep dive :

[Type Annotations in TypeScript](https://www.geeksforgeeks.org/typescript/what-is-type-annotations-in-typescript/)

[TypeScript Inference](https://www.geeksforgeeks.org/typescript/typescript-inference/)

[TypeScript Union](https://www.geeksforgeeks.org/typescript/typescript-union/)

[Avoid Any](https://blog.bitsrc.io/stop-using-any-type-in-typescript-48ebefc8b299)
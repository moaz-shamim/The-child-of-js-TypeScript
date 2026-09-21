# Type Narrowing in TypeScript

In TypeScript, **narrowing** refers to the process of reducing the type of a variable from a broader type to a more specific type within a certain code block or context.

This is often done through **conditional statements** or **type guards**, which help the TypeScript compiler understand more precisely what the type of a variable is at a given point in the code.

## Common Ways Narrowing Can Occur

### Type Guards: `typeof`

JavaScript supports a `typeof` operator which can give basic information about the type of values we have at runtime.

TypeScript expects `typeof` to return one of the following strings:

- `"string"`
- `"number"`
- `"bigint"`
- `"boolean"`
- `"symbol"`
- `"undefined"`
- `"object"`
- `"function"`

Like we saw with `padLeft`, this operator comes up pretty often in JavaScript libraries, and TypeScript can understand it to narrow types in different branches.

In TypeScript, checking against the value returned by `typeof` is called a **type guard**.

Because TypeScript encodes how `typeof` operates on different values, it understands some JavaScript quirks as well. For example, notice that `typeof null` returns `"object"`, not `"null"`.

## Example

```ts
function example(value: number | string): void {
	if (typeof value === "number") {
		// Inside this block, value is narrowed to a number
		console.log(value.toFixed(2));
	} else {
		// Inside this block, value is narrowed to a string
		console.log(value.length);
	}
}
```

### How It Works

- `value` starts with the union type `number | string`.
- When TypeScript sees `typeof value === "number"`, it narrows `value` to `number` inside that block.
- In the `else` block, TypeScript knows `value` must be a `string`.
- This allows you to safely access methods that belong to the narrowed type.

## Benefits of Narrowing

- Improves type safety.
- Reduces runtime errors.
- Enables better autocomplete and IntelliSense.
- Makes code easier to understand and maintain.

# TypeScript `never` Type

## Summary

In this tutorial, you will learn about the TypeScript `never` type, which represents a value that never occurs.

---

## Introduction to the TypeScript `never` Type

In TypeScript, a type can be thought of as a set of values.

For example:

- `number` contains values like `1`, `2`, `3`, etc.
- `string` contains values like `"Hi"`, `"Hello"`, etc.
- `null` contains a single value: `null`.

The `never` type is a type that contains **no values at all**. It is like an empty set.

Since a `never` type holds no values, you cannot assign any value to a variable of type `never`.

### Example

```ts
let empty: never = "hello";
```

TypeScript reports:

```txt
Type 'string' is not assignable to type 'never'
```

---

## Why Do We Need `never`?

Since `never` contains zero values, it is useful for representing **impossible situations** in the type system.

### Example: Impossible Intersection

```ts
type Alphanumeric = string & number;
```

TypeScript infers:

```ts
type Alphanumeric = never;
```

This is because a value cannot be both a `string` and a `number` at the same time.

---

## Functions That Never Return

A common use of `never` is for functions that never return control to the caller.

### Example: Function That Always Throws

```ts
function raiseError(message: string): never {
	throw new Error(message);
}
```

> Don't confuse this with `void`. A `void` function returns control to the caller, while a `never` function does not.

---

## Infinite Loop Example

If a function never finishes execution, its return type should also be `never`.

```ts
function forever(): never {
	while (true) {}
}
```

Because the loop never ends, the function never returns.

---

## TypeScript `never` Example

Consider the following code:

```ts
type Role = "admin" | "user";

const authorize = (role: Role): string => {
	switch (role) {
		case "admin":
			return "You can do anything";

		case "user":
			return "You can do something";

		default:
			// never reach here until we add a new role
			const _unreachable: never = role;
			throw new Error(`Invalid role: ${_unreachable}`);
	}
};

console.log(authorize("admin"));
```

---

## How It Works

### Step 1: Define a Union Type

```ts
type Role = "admin" | "user";
```

The `Role` type can only be:

- `"admin"`
- `"user"`

---

### Step 2: Handle Every Possible Case

```ts
const authorize = (role: Role): string => {
	switch (role) {
		case "admin":
			return "You can do anything";

		case "user":
			return "You can do something";

		default:
			const _unreachable: never = role;
			throw new Error(`Invalid role: ${_unreachable}`);
	}
};
```

The `default` branch should never be reached because all possible values of `Role` are already handled.

---

## Why Handle the Default Case?

Imagine you later add a new role:

```ts
type Role = "admin" | "user" | "guest";
```

But forget to update the `switch` statement.

Now TypeScript reports:

```txt
Type 'string' is not assignable to type 'never'.ts(2322)
```

This happens because:

```ts
const _unreachable: never = role;
```

In the `default` branch, `role` can now be `"guest"`, which is not assignable to `never`.

This error reminds you to handle the new role.

---

## Fixing the Error

Add a case for the new role:

```ts
const authorize = (role: Role): string => {
	switch (role) {
		case "admin":
			return "You can do anything";

		case "user":
			return "You can do something";

		case "guest":
			return "You can do nothing";

		default:
			const _unreachable: never = role;
			throw new Error(`Invalid role: ${_unreachable}`);
	}
};
```

Now every possible value of `Role` is covered.

---

## Cleaner Approach Using a Helper Function

You can move the `never` check into a reusable helper function.

```ts
type Role = "admin" | "user" | "guest";

const unknownRole = (role: never): never => {
	throw new Error(`Invalid role: ${role}`);
};

const authorize = (role: Role): string => {
	switch (role) {
		case "admin":
			return "You can do anything";

		case "user":
			return "You can do something";

		case "guest":
			return "You can do nothing";

		default:
			return unknownRole(role);
	}
};

console.log(authorize("admin"));
```

This pattern is commonly used for **exhaustive checking** in TypeScript.

---

## Exhaustive Checking with `never`

The `never` type helps TypeScript ensure that every member of a union type is handled.

```ts
type Status = "loading" | "success" | "error";

function handleStatus(status: Status) {
	switch (status) {
		case "loading":
			return "Loading...";

		case "success":
			return "Success!";

		case "error":
			return "Something went wrong.";

		default:
			const exhaustiveCheck: never = status;
			return exhaustiveCheck;
	}
}
```

If a new status is added later, TypeScript will immediately report an error until you handle it.

---

## Summary

- `never` is a type that contains **no values**.
- It represents situations that are **impossible**.
- You cannot assign any value to a variable of type `never`.
- TypeScript infers `never` for impossible intersections like:

  ```ts
  type Example = string & number;
  ```

- Functions that never return should use `never` as their return type.
- `never` is commonly used for **exhaustive checking** in `switch` statements.
- Exhaustive checks help catch missing cases when union types are extended.

# Exhaustive Type Checking with TypeScript

**Tags:** TypeScript, Productivity, Functional Programming, TDD

---

# Introduction

Wouldn't it be great if you could spot a bug the moment you wrote it down?

That's what **static type analysis** is all about: catching bugs at compile time while you're coding. This is one reason TypeScript is such a powerful productivity tool, especially when using strict compiler settings.

Because TypeScript is a superset of JavaScript, some advanced type-safety features are achieved through patterns and principles rather than dedicated language keywords. One such feature is **Exhaustive Type Checking**.

In short, exhaustive type checking means the compiler verifies that **all possible cases have been handled**. A good way to understand this concept is by looking at TypeScript's type narrowing behavior.

---

# Type Narrowing Example

```ts
function test(x: string | null) {
	if (x === null) {
		return;
	}

	x; // type of x is string here
}
```

### How It Works

Initially:

```ts
x: string | null;
```

After this check:

```ts
if (x === null) {
	return;
}
```

TypeScript knows that execution can only continue if `x` is not `null`.

Therefore:

```ts
x: string;
```

This process is called **type narrowing**.

---

# Exhausting All Possibilities

Now let's handle every possible value of `x`:

```ts
function test(x: string | null) {
	if (x === null) {
		return;
	}

	if (typeof x === "string") {
		return;
	}

	x; // type of x is never here
}
```

At this point:

- `x` cannot be `null`
- `x` cannot be `string`

There are no remaining possibilities.

Therefore:

```ts
x: never;
```

This is the foundation of exhaustive type checking.

---

# Exhaustive Type Checking

TypeScript supports **literal types**.

Suppose we have a function that creates a dessert based on a fruit:

```ts
type Fruit = "banana" | "orange";

function makeDessert(fruit: Fruit) {
	// make dessert from Fruit
}
```

How can we ensure the compiler verifies that every possible fruit is handled?

---

# Handling All Cases

```ts
type Fruit = "banana" | "orange";

function makeDessert(fruit: Fruit) {
	switch (fruit) {
		case "banana":
			return "Banana Shake";

		case "orange":
			return "Orange Juice";
	}

	fruit; // fruit is never here
}
```

Because every member of the union has been handled, TypeScript knows that `fruit` is:

```ts
never;
```

after the `switch`.

---

# Method 1: Explicit Return Type

One approach is to specify the function's return type:

```ts
function makeDessert(fruit: Fruit): string {
	switch (fruit) {
		case "banana":
			return "Banana Shake";

		case "orange":
			return "Orange Juice";
	}
}
```

This helps TypeScript detect missing return paths.

### Limitation

If you later throw an error after the switch, TypeScript may consider that a valid path and not always provide the desired exhaustiveness guarantee.

For stronger checks, many developers prefer the second approach.

---

# Method 2: Exhaustive Check Function

Create a helper function that only accepts a value of type `never`.

```ts
function exhaustiveCheck(param: never) {}
```

Then call it after handling all cases:

```ts
type Fruit = "banana" | "orange";

function exhaustiveCheck(param: never) {}

function makeDessert(fruit: Fruit) {
	switch (fruit) {
		case "banana":
			return "Banana Shake";

		case "orange":
			return "Orange Juice";
	}

	exhaustiveCheck(fruit); // ✅ No error
}
```

Since all possible values have been handled, `fruit` is inferred as `never`, making the call valid.

---

# Detecting Missing Cases

Now add a new fruit:

```ts
type Fruit = "banana" | "orange" | "mango";
```

But forget to update the switch:

```ts
type Fruit = "banana" | "orange" | "mango";

function exhaustiveCheck(param: never) {}

function makeDessert(fruit: Fruit) {
	switch (fruit) {
		case "banana":
			return "Banana Shake";

		case "orange":
			return "Orange Juice";
	}

	exhaustiveCheck(fruit);
}
```

TypeScript reports:

```txt
Argument of type '"mango"' is not assignable to parameter of type 'never'.
```

### Why?

At the bottom of the switch:

```ts
fruit: "mango";
```

is still possible.

Therefore `fruit` is no longer `never`.

The compiler immediately alerts you that a case is missing.

---

# Fixing the Error

Handle the missing value:

```ts
type Fruit = "banana" | "orange" | "mango";

function exhaustiveCheck(param: never) {}

function makeDessert(fruit: Fruit) {
	switch (fruit) {
		case "banana":
			return "Banana Shake";

		case "orange":
			return "Orange Juice";

		case "mango":
			return "Mango Smoothie";
	}

	exhaustiveCheck(fruit); // ✅ No error
}
```

Now all values are covered, so `fruit` becomes `never` again after the switch.

---

# Making the Exhaustive Check Safer

Sometimes values may enter your function through `any`, bypassing TypeScript's type checking.

To protect against unexpected runtime values, make the exhaustive check throw an error:

```ts
function exhaustiveCheck(param: never): never {
	throw new Error("Should not reach here");
}
```

This provides:

- Compile-time safety through TypeScript
- Runtime safety if invalid values somehow slip through

---

# Complete Example

```ts
type Fruit = "banana" | "orange" | "mango";

function exhaustiveCheck(param: never): never {
	throw new Error("Should not reach here");
}

function makeDessert(fruit: Fruit) {
	switch (fruit) {
		case "banana":
			return "Banana Shake";

		case "orange":
			return "Orange Juice";

		case "mango":
			return "Mango Smoothie";
	}

	return exhaustiveCheck(fruit);
}
```

---

# Why Use Exhaustive Type Checking?

Benefits include:

- Detect missing cases at compile time
- Safer refactoring
- Better maintainability
- More reliable union types
- Fewer runtime bugs
- Self-documenting code

This pattern is especially useful when working with:

- String literal unions
- Discriminated unions
- State machines
- Redux reducers
- API response types
- Event handlers

---

# Summary

- TypeScript narrows types based on control flow.
- When all possible values have been eliminated, the remaining type becomes `never`.
- Exhaustive type checking ensures every member of a union type is handled.
- A helper function accepting `never` is a common pattern for enforcing exhaustiveness.
- Adding a new union member automatically triggers compiler errors until all code paths are updated.
- Returning or throwing from an `exhaustiveCheck()` function provides both compile-time and runtime safety.

The `never` type is one of the most powerful tools in TypeScript for writing safer and more maintainable code.

[Deep Dive Type Exhaustive](https://dev.to/babak/exhaustive-type-checking-with-typescript-4l3f)

# Optional parameters in TypeScript:

This demonstrates **optional parameters** in TypeScript.

```ts
function serveChai(msg?: string) {
	if (msg) {
		return `Serving ${msg}`;
	}

	return `Serving Default Masala chai`;
}
```

### What `msg?: string` means

The `?` makes the parameter **optional**.

So TypeScript treats it as:

```ts
msg: string | undefined;
```

This means the function can be called in either of these ways:

```ts
serveChai("Ginger Chai"); // ✓
serveChai(); // ✓
```

### What's happening inside the `if`?

```ts
if (msg)
```

This is called **type narrowing** (or a **truthiness check**).

Before the `if`, TypeScript sees:

```ts
msg: string | undefined;
```

Inside the `if` block, TypeScript knows:

```ts
msg: string;
```

because `undefined` would make the condition false.

### Related concept: Default Parameters

Another common way to do this is:

```ts
function serveChai(msg = "Default Masala Chai") {
	return `Serving ${msg}`;
}
```

Here `msg` is never `undefined` inside the function because a default value is provided.

So the main TypeScript concepts in your example are:

1. **Optional Parameter** (`msg?: string`)
2. **Union Type** (`string | undefined`)
3. **Type Narrowing** using a truthiness check (`if (msg)`)

# Type Guard in TypeScript :

If by "total guard" you mean **all the common type guards in TypeScript**, here are the main ones:

## 1. `typeof`

Used for primitive types.

```ts
function print(value: string | number) {
	if (typeof value === "string") {
		console.log(value.toUpperCase());
	} else {
		console.log(value.toFixed(2));
	}
}
```

Possible `typeof` results:

```ts
typeof x === "string";
typeof x === "number";
typeof x === "boolean";
typeof x === "undefined";
typeof x === "bigint";
typeof x === "symbol";
typeof x === "function";
typeof x === "object";
```

---

## 2. `instanceof`

Used with classes and constructor functions.

```ts
class Tea {}
class Coffee {}

function serve(drink: Tea | Coffee) {
	if (drink instanceof Tea) {
		console.log("Tea");
	} else {
		console.log("Coffee");
	}
}
```

---

## 3. `in` Operator

Checks whether a property exists.

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
	if ("swim" in animal) {
		animal.swim();
	} else {
		animal.fly();
	}
}
```

---

## 4. Equality Narrowing

Using `===`, `!==`, etc.

```ts
function process(value: string | number) {
	if (value === "chai") {
		// value is "chai"
	}
}
```

---

## 5. Truthiness Narrowing

```ts
function serve(msg?: string) {
	if (msg) {
		// msg is string
	}
}
```

This removes `undefined`, `null`, `""`, `0`, `false`, etc. from consideration.

---

## 6. User-Defined Type Guards

You create your own guard using `is`.

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(animal: Fish | Bird): animal is Fish {
	return "swim" in animal;
}

function move(animal: Fish | Bird) {
	if (isFish(animal)) {
		animal.swim();
	} else {
		animal.fly();
	}
}
```

---

## 7. Discriminated Union Guards

A very common TypeScript pattern.

```ts
type Success = {
	status: "success";
	data: string;
};

type Error = {
	status: "error";
	message: string;
};

function handle(result: Success | Error) {
	if (result.status === "success") {
		console.log(result.data);
	} else {
		console.log(result.message);
	}
}
```

---

### Most important type guards to know

1. `typeof`
2. `instanceof`
3. `in`
4. Equality checks (`===`, `!==`)
5. Truthiness checks (`if (value)`)
6. User-defined guards (`value is Type`)
7. Discriminated unions (checking a tag like `status`, `kind`, or `type`)

These are the type guards you'll encounter most often in real TypeScript code.

# Type Narowing in Class with the help of instance of :

This example shows **type narrowing with `instanceof`** in TypeScript.

```ts
class KulhadChai {
	serve() {
		return `Serving Kulhad Chai`;
	}
}

class Cutting {
	serve() {
		return `Serving Cutting Chai`;
	}
}

function serve(chai: KulhadChai | Cutting) {
	if (chai instanceof KulhadChai) {
		return chai.serve();
	}
}
```

### Step 1: Union Type

The parameter `chai` can be either:

```ts
KulhadChai | Cutting;
```

So TypeScript only knows that `chai` is one of these two classes.

---

### Step 2: `instanceof`

```ts
chai instanceof KulhadChai;
```

checks at runtime:

> "Was this object created using the `KulhadChai` class?"

Example:

```ts
const kulhad = new KulhadChai();

console.log(kulhad instanceof KulhadChai); // true
console.log(kulhad instanceof Cutting); // false
```

---

### Step 3: Type Narrowing

Inside this block:

```ts
if (chai instanceof KulhadChai) {
	return chai.serve();
}
```

TypeScript narrows the type from:

```ts
KulhadChai | Cutting;
```

to:

```ts
KulhadChai;
```

So inside the `if` block, `chai` is treated as a `KulhadChai` object.

---

### Complete Example

```ts
class KulhadChai {
	makeKulhad() {
		return "Making Kulhad Chai";
	}
}

class Cutting {
	makeCutting() {
		return "Making Cutting Chai";
	}
}

function prepare(chai: KulhadChai | Cutting) {
	if (chai instanceof KulhadChai) {
		return chai.makeKulhad(); // OK
	}

	return chai.makeCutting(); // OK
}
```

Without `instanceof`, TypeScript would give an error because it wouldn't know which class it is dealing with.

### `typeof` vs `instanceof`

- `typeof` → for primitive values

```ts
typeof "chai" === "string";
typeof 10 === "number";
```

- `instanceof` → for class objects

```ts
chai instanceof KulhadChai;
```

A simple rule:

> Use `typeof` for primitives (`string`, `number`, `boolean`, etc.) and `instanceof` for objects created from classes.

# Type keyword in TypeScript:

The type keyword in TypeScript is a way for you to provide type aliases to your variables, objects, and functions. These aliases essentially describe what your data is going to look like. You can describe what your data is going to look like by using the core types (e.g. string, number, boolean etc.) or by creating your own custom types. Let’s take a look at a few examples.

```ts
// the Year type is a number
type Year number;
// the currentYear variable is of type Year and must be a number
const currentYear: Year = 2021;
// a custom Car object type
type Car = {
year: number;
make: string;
model: string;
};
// the myCar object is of type Car and must include a year, make, and model
const myCar: Car = {
year: 2021,
make: "BMW",
model: "M4401",
};
// a custom Residence type
type Residence = "house" | "apartment" | "townhouse";
// the myResidence variable is of type Residence and must be either a house, apartment, or townhouse
const myResidence: Residence = "apartment";
```

# `type` keyword in TypeScript Example.

### Defining Types

```ts
type MasalaChai = {
  flavour: "Masala";
  spiceLevel: number;
};

type GingerChai = {
  flavour: "Ginger";
  amount: number;
};

type ElaichiChai = {
  flavour: "Elaichi";
  aroma: number;
};
```

Here, each `type` describes the shape of an object.

---

### Creating a Union Type

```ts
type Chai = MasalaChai | GingerChai | ElaichiChai;
```

This means a `Chai` can be **either** a `MasalaChai`, `GingerChai`, or `ElaichiChai`.

---

### Discriminated Union

```ts
function makeChai(order: Chai) {
  switch (order.flavour) {
    case "Masala":
      return `Masala chai`;

    case "Elaichi":
      return `Elaichi chai`;

    case "Ginger":
      return `Ginger chai`;
  }
}
```

The `flavour` property acts as a **discriminant** (or tag). TypeScript automatically narrows the type based on its value.

For example:

```ts
case "Masala":
  order.spiceLevel; // ✅ Available
```

Inside this block, TypeScript knows `order` is `MasalaChai`.

---

### Checking Whether a Property Exists

```ts
function brew(order: Chai) {
  if ("spiceLevel" in order) {
    console.log(order.spiceLevel);
  }
}
```

The `in` operator is a **type guard**.

After this check:

```ts
if ("spiceLevel" in order) {
  // order is MasalaChai here
}
```

TypeScript narrows `order` to `MasalaChai`.

---

### Another Simple Example of `type`

```ts
type User = {
  name: string;
  age: number;
};

const user: User = {
  name: "Michael",
  age: 25,
};
```

Common uses of `type`:

```ts
// Object type
type User = {
  name: string;
};

// Union type
type Status = "loading" | "success" | "error";

// Function type
type Add = (a: number, b: number) => number;

// Type alias
type ID = string | number;
```

So in your chai example, you're mainly demonstrating:

1. **Object types**
2. **Union types**
3. **Discriminated unions**
4. **Type narrowing with `switch`**
5. **Type guards using the `in` operator**

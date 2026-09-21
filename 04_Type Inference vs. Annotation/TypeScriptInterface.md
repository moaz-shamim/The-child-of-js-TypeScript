# TypeScript, implements :

In TypeScript, `implements` is used by a **class** to promise that it follows the structure of an **interface**.

Your code:

```ts
type TeaReceipe = {
	water: number;
	milk: number;
};

class MasalaChai implements TeaReceipe {
	water = 100;
	milk = 50;
}
```

### What does `implements TeaReceipe` mean?

It means:

> "The `MasalaChai` class must have all the properties defined in `TeaReceipe`."

Since `TeaReceipe` requires:

```ts
{
  water: number;
  milk: number;
}
```

the class must contain both:

```ts
water: number;
milk: number;
```

So this is valid:

```ts
class MasalaChai implements TeaReceipe {
	water = 100;
	milk = 50;
}
```

---

### What if a property is missing?

```ts
class MasalaChai implements TeaReceipe {
	water = 100;
}
```

❌ Error:

```txt
Class 'MasalaChai' incorrectly implements type 'TeaReceipe'.
Property 'milk' is missing.
```

TypeScript checks that the class fulfills the contract.

---

### Think of it as a contract

```ts
type TeaReceipe = {
	water: number;
	milk: number;
};
```

This says:

> Every tea recipe must specify water and milk.

Then:

```ts
class MasalaChai implements TeaReceipe {
	water = 100;
	milk = 50;
}
```

says:

> I agree to follow that recipe format.

---

### Methods can also be enforced

```ts
interface TeaRecipe {
	water: number;
	milk: number;
	makeTea(): void;
}

class MasalaChai implements TeaRecipe {
	water = 100;
	milk = 50;

	makeTea() {
		console.log("Tea is ready");
	}
}
```

If `makeTea()` is missing, TypeScript will show an error.

---

### One important thing

Usually `implements` is used with an **interface**, not a type alias:

```ts
interface TeaRecipe {
	water: number;
	milk: number;
}

class MasalaChai implements TeaRecipe {
	water = 100;
	milk = 50;
}
```

But your example works because `TeaReceipe` is an object-shaped type alias, and TypeScript allows classes to implement such types.

**In short:** `implements` tells TypeScript to verify that a class contains all the properties and methods required by a given interface/type. It's a compile-time check only; it does not generate any JavaScript code.

# Main reasons to create a type :

Instead of repeating the same object structure multiple times:

```ts
function makeChai(order: { type: string; sugar: number; strong: boolean }) {
	console.log("order");
}

function serveChai(order: { type: string; sugar: number; strong: boolean }) {
	console.log("order");
}
```

you can define it once:

```ts
type ChaiOrder = {
	type: string;
	sugar: number;
	strong: boolean;
};
```

and reuse it:

```ts
function makeChai(order: ChaiOrder) {
	console.log("order");
}

function serveChai(order: ChaiOrder) {
	console.log("order");
}
```

### Benefits

#### 1. Avoid repetition (DRY)

You write the shape only once.

#### 2. Easier maintenance

Suppose you add a new property:

```ts
type ChaiOrder = {
	type: string;
	sugar: number;
	strong: boolean;
	size: "small" | "medium" | "large";
};
```

Now all functions using `ChaiOrder` automatically know about `size`.

#### 3. Better readability

Compare:

```ts
function makeChai(order: { type: string; sugar: number; strong: boolean })
```

vs

```ts
function makeChai(order: ChaiOrder)
```

The second version immediately tells us what kind of object is expected.

### Relation to `implements`

The `ChaiOrder` type can also be used with a class:

```ts
type ChaiOrder = {
	type: string;
	sugar: number;
	strong: boolean;
};

class Order implements ChaiOrder {
	constructor(
		public type: string,
		public sugar: number,
		public strong: boolean
	) {}
}
```

Here, `implements ChaiOrder` means:

> "This class must have all the properties required by `ChaiOrder`."

So:

* **Type aliases (`type`)** → define a shape that can be reused.
* **Function parameters** can use that shape.
* **Classes** can use `implements` to guarantee they follow that shape.

# Types that does not work with Class :

> A class can implement an **object shape**, but it cannot implement a **primitive union type**.

### ❌ Doesn't work

```ts
type CupSize = "small" | "large";

class Chai implements CupSize {}
```

`CupSize` describes a value:

```ts
"small" | "large"
```

But a class instance is an object:

```ts
new Chai() // {}
```

TypeScript asks:

> How can this object be `"small"` or `"large"`?

It can't, so you get an error.

---

### ✅ Works

```ts
interface CupSize {
	size: "small" | "large";
}

class Chai implements CupSize {
	size: "small" | "large" = "large";
}
```

Now `CupSize` describes an object shape:

```ts
{
  size: "small" | "large";
}
```

and the class instance has that property:

```ts
const chai = new Chai();

chai.size; // "large"
```

So the contract is satisfied.

---

### You can also use a type alias

It doesn't have to be an interface:

```ts
type CupSize = {
	size: "small" | "large";
};

class Chai implements CupSize {
	size: "small" | "large" = "large";
}
```

✅ This works too.

---

### Easy rule to remember

```ts
type Size = "small" | "large";
```

❌ Cannot be implemented by a class.

```ts
type SizeInfo = {
	size: "small" | "large";
};
```

✅ Can be implemented by a class.

So it's not **type vs interface** that matters. It's **value type vs object shape** that matters.


# 1. Union Type (`|`)

```ts
type TeaType = "masala" | "ginger" | "lemon";
```

Means the value can be **one of several possible types/values**.

```ts
orderChai("masala"); // ✅
orderChai("ginger"); // ✅
orderChai("green");  // ❌
```

Think: **OR**

```
"masala" OR "ginger" OR "lemon"
```

---

# 2. Intersection Type (`&`)

```ts
type BaseChai = { teaLeaves: number };
type Extra = { masala: number };

type NewMasalaChai = BaseChai & Extra;
```

Means combine both types.

Equivalent to:

```ts
type NewMasalaChai = {
	teaLeaves: number;
	masala: number;
};
```

So:

```ts
const cup: NewMasalaChai = {
	teaLeaves: 10,
	masala: 10,
};
```

✅ Valid

Think: **AND**

```
BaseChai AND Extra
```

---

# 3. Optional Property (`?`)

```ts
type User = {
	username: string;
	bio?: string;
};
```

`bio` may or may not exist.

```ts
const u1: User = {
	username: "Hitesh",
}; // ✅

const u2: User = {
	username: "Hitesh",
	bio: "hitesh.ai",
}; // ✅
```

TypeScript sees:

```ts
bio: string | undefined
```

---

# 4. Readonly Property

```ts
type Config = {
	readonly appName: string;
	version: number;
};
```

After creation:

```ts
cfg.version = 2; // ✅

cfg.appName = "New App"; // ❌
```

The property can be **read** but not **reassigned**.

---

### Quick Summary

| Feature      | Syntax             | Meaning                             |
| ------------ | ------------------ | ----------------------------------- |
| Union        | `A \| B`           | Value can be A **or** B             |
| Intersection | `A & B`            | Must contain A **and** B            |
| Optional     | `prop?: T`         | Property may be missing             |
| Readonly     | `readonly prop: T` | Cannot be reassigned after creation |

These four are among the most commonly used TypeScript type features in real projects.

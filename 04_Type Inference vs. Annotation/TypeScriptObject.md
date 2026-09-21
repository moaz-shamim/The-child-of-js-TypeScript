# TypeScript performs type inference behind the scenes :

When you write:

```ts
const chai = {
    name: "Masala chai",
    price: 20,
    isHot: true
}
```

TypeScript automatically infers the type as:

```ts
const chai: {
    name: string;
    price: number;
    isHot: boolean;
}
```

### What happens internally?

TypeScript looks at each property value:

```ts
name: "Masala chai"  // string
price: 20            // number
isHot: true          // boolean
```

and creates an object type:

```ts
{
    name: string;
    price: number;
    isHot: boolean;
}
```

So you don't need to write:

```ts
const chai: {
    name: string;
    price: number;
    isHot: boolean;
} = {
    name: "Masala chai",
    price: 20,
    isHot: true
}
```

because TypeScript can infer it automatically.

### Hover in VS Code

If you hover over `chai`, you'll see something similar to:

```ts
const chai: {
    name: string;
    price: number;
    isHot: boolean;
}
```

### Special case: `as const`

If you write:

```ts
const chai = {
    name: "Masala chai",
    price: 20,
    isHot: true
} as const;
```

then TypeScript infers the **exact literal values**:

```ts
{
    readonly name: "Masala chai";
    readonly price: 20;
    readonly isHot: true;
}
```

Notice the difference:

| Normal inference | `as const` inference |
| ---------------- | -------------------- |
| `string`         | `"Masala chai"`      |
| `number`         | `20`                 |
| `boolean`        | `true`               |
| mutable          | readonly             |

This is one of the most important examples of TypeScript's type inference system.

# Inline object type :

```ts
let tea: {
    name: string;
    price: number;
    isHot: boolean;
};

tea = {
    name: "Ginger Tea",
    price: 25,
    isHot: true
};
```

```ts
let student: {
    name: string;
    age: number;
    passed: boolean;
};

student = {
    name: "Rahul",
    age: 18,
    passed: true
};
```

# When we have to use Type :

Not always.

You need to provide a type **only when TypeScript cannot infer it** or when you want to explicitly define the shape.

### Case 1: TypeScript can infer

```ts
const tea = {
    name: "Ginger Tea",
    price: 25,
    isHot: true
};
```

TypeScript automatically infers:

```ts
{
    name: string;
    price: number;
    isHot: boolean;
}
```

No need to write the type yourself.

---

### Case 2: Variable declared first, value assigned later

```ts
let tea;

tea = {
    name: "Ginger Tea",
    price: 25,
    isHot: true
};
```

Here `tea` initially gets type `any`, which is not type-safe.

So it's better to specify the type:

```ts
let tea: {
    name: string;
    price: number;
    isHot: boolean;
};

tea = {
    name: "Ginger Tea",
    price: 25,
    isHot: true
};
```

---

### Better approach: Type Alias

Instead of repeating the object type:

```ts
type Tea = {
    name: string;
    price: number;
    isHot: boolean;
};

let tea: Tea;
```

This is how TypeScript code is usually written in real projects.

---

### Rule of thumb

✅ If you create and initialize the object at the same time → let TypeScript infer the type.

```ts
const tea = {
    name: "Ginger Tea",
    price: 25,
    isHot: true
};
```

✅ If the variable is declared first and assigned later → provide a type.

```ts
let tea: Tea;
```

This is why you'll often see inference with `const` and explicit types with `let` declarations that are initialized later.

# Structural Typing (or Duck Typing) in TypeScript :

This concept is called **Structural Typing** (or **Duck Typing**) in TypeScript.

```ts
type Cup = { size: string };

let smallCup: Cup = { size: "200ml" };
let bigCup = { size: "500ml", material: "steel" };

smallCup = bigCup;
```

### Why is this allowed?

`smallCup` expects a value of type:

```ts
{
  size: string;
}
```

`bigCup` has:

```ts
{
  size: string;
  material: string;
}
```

Since `bigCup` contains **at least** the required property `size`, TypeScript allows the assignment.

Think of it like:

```txt
Cup requires:
✓ size

bigCup provides:
✓ size
✓ material

Result: Allowed
```

---

### After assignment

```ts
smallCup = bigCup;

console.log(smallCup.size); // OK
console.log(smallCup.material); // Error
```

Even though the actual object has `material`, the variable `smallCup` is typed as `Cup`, so TypeScript only lets you access properties defined in `Cup`.

---

### Example where it fails

```ts
type Cup = { size: string };

let wrongCup = {
    material: "steel"
};

smallCup = wrongCup;
```

❌ Error:

```txt
Property 'size' is missing
```

because `Cup` requires a `size` property.

---

### Real-world analogy

Suppose a function needs a user with a name:

```ts
type User = {
    name: string;
};

function greet(user: User) {
    console.log(user.name);
}
```

You can pass:

```ts
const admin = {
    name: "Michael",
    role: "Admin",
    permissions: ["read", "write"]
};

greet(admin); // ✅
```

The function only cares about `name`. Extra properties don't matter.

That's the core idea of **structural typing**:

> TypeScript checks the **shape of an object**, not its exact type name. If the required properties exist with the correct types, the object is compatible.


## Example 1: Student

```ts
type Student = {
    name: string;
};

let student: Student;

const michael = {
    name: "Michael",
    age: 20,
    city: "Patna"
};

student = michael; // ✅ Allowed
```

Why?

```txt
Student needs:
✓ name

michael has:
✓ name
✓ age
✓ city
```

Extra properties are okay.

---

## Example 2: Tea

```ts
type Tea = {
    name: string;
    price: number;
};

const masalaTea = {
    name: "Masala Tea",
    price: 20,
    ingredients: ["ginger", "milk"]
};

const tea: Tea = masalaTea; // ✅
```

TypeScript only checks:

```txt
✓ name
✓ price
```

It ignores `ingredients`.

---

## Example 3: Function Parameter

```ts
type User = {
    name: string;
};

function greet(user: User) {
    console.log(`Hello ${user.name}`);
}

const admin = {
    name: "Michael",
    role: "Admin"
};

greet(admin); // ✅
```

The function only needs `name`.

---

## Example 4: Vehicle

```ts
type Vehicle = {
    wheels: number;
};

const car = {
    wheels: 4,
    engine: "Petrol",
    color: "White"
};

const bike = {
    wheels: 2,
    engine: "Petrol"
};

const v1: Vehicle = car;  // ✅
const v2: Vehicle = bike; // ✅
```

Both have `wheels`.

---

## Example 5: Missing Property

```ts
type Tea = {
    name: string;
    price: number;
};

const tea = {
    name: "Green Tea"
};

const t: Tea = tea; // ❌ Error
```

Error because:

```txt
Tea needs:
✓ name
✓ price

tea has:
✓ name
✗ price
```

---

## Example 6: Real-Life Analogy

Imagine a job application:

```txt
Requirements:
- Name
- Email
```

Applicant A:

```txt
Name: Michael
Email: abc@gmail.com
Phone: 12345
Address: Patna
```

Accepted ✅

Applicant B:

```txt
Name: Michael
Phone: 12345
```

Rejected ❌

because Email is missing.

TypeScript works the same way.

---

## One Important Rule

This works:

```ts
const bigCup = {
    size: "500ml",
    material: "steel"
};

let cup: { size: string };

cup = bigCup; // ✅
```

But this gives an error:

```ts
let cup: { size: string };

cup = {
    size: "500ml",
    material: "steel"
}; // ❌
```

Why?

Because when you assign an **object literal directly**, TypeScript performs an **excess property check** and complains about unexpected properties.

So remember:

```txt
Variable with extra properties → Usually OK ✅
Direct object literal with extra properties → May error ❌
```

This is one of the most important TypeScript concepts you'll see in interviews and real projects.

# Custom types using TypeScript's type : 

This code defines **custom types** using TypeScript's `type` keyword.

```ts
type Item = {
  name: string;
  quantity: number;
}

type Address = {
  street: string;
  pin: number;
}

type Order = {
  id: string;
  items: Item[];
  address: Address;
}
```

Let's break it down.

---

## 1. `Item` Type

```ts
type Item = {
  name: string;
  quantity: number;
}
```

An `Item` represents a product in an order.

Example:

```ts
const tea: Item = {
  name: "Masala Tea",
  quantity: 2
};
```

Here:

* `name` → string
* `quantity` → number

---

## 2. `Address` Type

```ts
type Address = {
  street: string;
  pin: number;
}
```

An `Address` represents a delivery address.

Example:

```ts
const address: Address = {
  street: "MG Road",
  pin: 110001
};
```

---

## 3. `Order` Type

```ts
type Order = {
  id: string;
  items: Item[];
  address: Address;
}
```

This is a more complex type.

### `id`

```ts
id: string
```

Order ID.

Example:

```ts
id: "ORD123"
```

---

### `items`

```ts
items: Item[]
```

`Item[]` means:

> An array of `Item` objects.

Example:

```ts
items: [
  {
    name: "Masala Tea",
    quantity: 2
  },
  {
    name: "Coffee",
    quantity: 1
  }
]
```

Each object in the array must follow the `Item` type.

---

### `address`

```ts
address: Address
```

Means:

> The `address` property must be an object that follows the `Address` type.

Example:

```ts
address: {
  street: "MG Road",
  pin: 110001
}
```

---

## Complete Example

```ts
const order: Order = {
  id: "ORD123",
  items: [
    {
      name: "Masala Tea",
      quantity: 2
    },
    {
      name: "Coffee",
      quantity: 1
    }
  ],
  address: {
    street: "MG Road",
    pin: 110001
  }
};
```

Visualizing the structure:

```txt
Order
│
├── id
│   └── "ORD123"
│
├── items
│   ├── Item
│   │   ├── name
│   │   └── quantity
│   │
│   └── Item
│       ├── name
│       └── quantity
│
└── address
    ├── street
    └── pin
```

---

## Why create separate types?

Instead of writing:

```ts
type Order = {
  id: string;
  items: {
    name: string;
    quantity: number;
  }[];
  address: {
    street: string;
    pin: number;
  };
}
```

you create reusable types:

```ts
type Item = { ... }
type Address = { ... }
type Order = { ... }
```

Benefits:

* Easier to read
* Reusable in many places
* Easier to maintain
* Common practice in real TypeScript projects

This is called **nested types** because `Order` contains other custom types (`Item` and `Address`) inside it.

# TypeScript's built-in utility type Partial<T>:

This example uses TypeScript's built-in utility type **`Partial<T>`**.

```ts
type Chai = {
  name: string;
  price: number;
  isHot: boolean;
};

const updateChai = (updates: Partial<Chai>) => {
  console.log("updating chai with", updates);
};

updateChai({ price: 25 });
```

## What does `Partial<Chai>` do?

Normally, `Chai` requires **all properties**:

```ts
const chai: Chai = {
  name: "Masala Chai",
  price: 20,
  isHot: true
};
```

If you omit one:

```ts
const chai: Chai = {
  price: 20
};
```

❌ Error because `name` and `isHot` are missing.

---

### `Partial<Chai>`

TypeScript transforms:

```ts
type Chai = {
  name: string;
  price: number;
  isHot: boolean;
};
```

into:

```ts
type PartialChai = {
  name?: string;
  price?: number;
  isHot?: boolean;
};
```

Notice the `?`.

All properties become **optional**.

---

### Therefore this is valid

```ts
updateChai({ price: 25 });
```

because:

```ts
{
  price: 25
}
```

matches:

```ts
{
  name?: string;
  price?: number;
  isHot?: boolean;
}
```

---

### These are also valid

```ts
updateChai({ name: "Adrak Chai" });

updateChai({ isHot: false });

updateChai({
  name: "Green Tea",
  price: 30
});

updateChai({});
```

All allowed because every property is optional.

---

### Real-world use case

Imagine you have:

```ts
const chai = {
  name: "Masala Chai",
  price: 20,
  isHot: true
};
```

You only want to update the price:

```ts
updateChai({ price: 25 });
```

instead of sending the whole object:

```ts
updateChai({
  name: "Masala Chai",
  price: 25,
  isHot: true
});
```

That's why `Partial<T>` is commonly used for **update functions**, forms, APIs, and database updates.

### Mental model

```txt
Chai
├─ name     (required)
├─ price    (required)
└─ isHot    (required)

Partial<Chai>
├─ name?    (optional)
├─ price?   (optional)
└─ isHot?   (optional)
```

So `Partial<T>` means:

> "Give me the same type `T`, but make every property optional."


# TypeScript utility type: Required<T> :

This example uses another TypeScript utility type: **`Required<T>`**.

```ts id="j5hk5s"
type ChaiOrder = {
  name?: string;
  quantity?: number;
};

const placeOrder = (order: Required<ChaiOrder>) => {
  console.log(order);
};

placeOrder({
  name: "Masala Chai",
  quantity: 2
});
```

---

## Step 1: Original Type

```ts id="1ly5tw"
type ChaiOrder = {
  name?: string;
  quantity?: number;
};
```

Both properties are optional because of `?`.

So these are valid:

```ts id="uy1j5o"
const order1: ChaiOrder = {};
const order2: ChaiOrder = { name: "Masala Chai" };
const order3: ChaiOrder = { quantity: 2 };
```

---

## Step 2: Apply `Required<T>`

```ts id="i5hzv6"
Required<ChaiOrder>
```

TypeScript transforms it into:

```ts id="d1r7ao"
{
  name: string;
  quantity: number;
}
```

It removes all the `?` marks.

---

### Behind the scenes

```ts id="vwvudm"
type ChaiOrder = {
  name?: string;
  quantity?: number;
};
```

becomes:

```ts id="49nz0r"
type RequiredChaiOrder = {
  name: string;
  quantity: number;
};
```

---

## Therefore this works

```ts id="ltn6gt"
placeOrder({
  name: "Masala Chai",
  quantity: 2
});
```

because both required properties are provided.

---

## This will fail

```ts id="7s4tf5"
placeOrder({
  name: "Masala Chai"
});
```

❌ Error:

```txt id="wm4gdu"
Property 'quantity' is missing
```

---

## This will also fail

```ts id="7f1k2f"
placeOrder({});
```

❌ Error because both properties are required.

---

## Compare with `Partial`

### `Partial<T>`

Makes everything optional:

```ts id="z8p1n4"
type Chai = {
  name: string;
  quantity: number;
};
```

becomes:

```ts id="1wfrdf"
{
  name?: string;
  quantity?: number;
}
```

---

### `Required<T>`

Makes everything required:

```ts id="jnnyn7"
type ChaiOrder = {
  name?: string;
  quantity?: number;
};
```

becomes:

```ts id="o5u7zh"
{
  name: string;
  quantity: number;
}
```

---

## Easy way to remember

```txt id="qqnh5n"
Partial<T>
❌ Required
✅ Optional

Required<T>
❌ Optional
✅ Required
```

Think:

* `Partial` = "I can send only some fields."
* `Required` = "I must send all fields."

These utility types are very common when working with forms, APIs, database records, and update/create operations in TypeScript.


# TypeScript utility type Pick<T, K> :

type Chai = {
  name: string;
  price: number;
  isHot: boolean;
  ingredients: string[];
};

type BasicChaiInfo = Pick<Chai, "name" | "price">;

const chaiInfo: BasicChaiInfo = {
  name: "Lemon Tea",
  price: 30
};

# TypeScript utility type Omit<T, K> :

This example uses the TypeScript utility type **`Omit<T, K>`**.

```ts id="g7r1kt"
type Chai = {
  name: string;
  price: number;
  isHot: boolean;
  secretIngredients: string;
};

type PublicChai = Omit<Chai, "secretIngredients">;
```

## What does `Omit` do?

`Omit<T, K>` means:

> "Create a new type from `T` but remove the specified keys `K`."

---

### Original Type

```ts id="otw4p2"
type Chai = {
  name: string;
  price: number;
  isHot: boolean;
  secretIngredients: string;
};
```

---

### Omit the secret field

```ts id="htlj6k"
type PublicChai = Omit<Chai, "secretIngredients">;
```

TypeScript creates:

```ts id="mnwdfv"
type PublicChai = {
  name: string;
  price: number;
  isHot: boolean;
};
```

The `secretIngredients` property is removed.

---

## Example

```ts id="h2wvnq"
const chai: PublicChai = {
  name: "Masala Chai",
  price: 20,
  isHot: true
};
```

✅ Valid

---

## This will fail

```ts id="m8vbxy"
const chai: PublicChai = {
  name: "Masala Chai",
  price: 20,
  isHot: true,
  secretIngredients: "Grandma's recipe"
};
```

❌ Error

Because `secretIngredients` is not part of `PublicChai`.

---

## Pick vs Omit

Suppose:

```ts id="1t5r7i"
type Chai = {
  name: string;
  price: number;
  isHot: boolean;
  secretIngredients: string;
};
```

### Using Pick

```ts id="0kgv70"
type PublicChai = Pick<Chai, "name" | "price" | "isHot">;
```

You specify what to **keep**.

---

### Using Omit

```ts id="q5q3hh"
type PublicChai = Omit<Chai, "secretIngredients">;
```

You specify what to **remove**.

Both produce:

```ts id="v4r6yn"
{
  name: string;
  price: number;
  isHot: boolean;
}
```

---

## Real-world Example

A user type:

```ts id="w3e9v2"
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
```

Before sending user data to the frontend:

```ts id="lg5g1k"
type PublicUser = Omit<User, "password">;
```

Result:

```ts id="4yfw9r"
{
  id: string;
  name: string;
  email: string;
}
```

The password is hidden.

---

### Easy way to remember

```txt
Pick<T, K>
👉 Keep these keys

Omit<T, K>
👉 Remove these keys
```

Example:

```txt
Chai
├─ name
├─ price
├─ isHot
└─ secretIngredients
```

```ts id="8l9s8s"
Omit<Chai, "secretIngredients">
```

Result:

```txt
Chai
├─ name
├─ price
└─ isHot
```

So **`Omit` is the opposite of `Pick`**:

* `Pick` → select fields
* `Omit` → exclude fields



funtion
optional parameter
default parameter
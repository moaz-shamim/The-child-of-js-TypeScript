# TypeScript Class :

Your example is a basic TypeScript class. A class is a blueprint for creating objects.

```ts id="pjlwmn"
class Chai {
  flavour: string;
  price: number;

  constructor(flavour: string, price: number) {
    this.flavour = flavour;
    this.price = price;
  }
}

const masalaChai = new Chai("Masala", 20);

console.log(masalaChai.flavour); // "Masala"
```

---

## How it works

### 1. Class properties

```ts id="ktd48c"
flavour: string;
price: number;
```

These define the shape of each `Chai` object.

Every instance must have:

* `flavour` → `string`
* `price` → `number`

TypeScript checks the types at compile time.

---

### 2. Constructor

```ts id="8tbck4"
constructor(flavour: string, price: number) {
  this.flavour = flavour;
  this.price = price;
}
```

The constructor runs when you create a new object with `new`.

```ts id="n8j0fr"
const masalaChai = new Chai("Masala", 20);
```

Behind the scenes:

* `"Masala"` is assigned to `this.flavour`
* `20` is assigned to `this.price`

---

### 3. Creating objects

```ts id="chvt8n"
const gingerChai = new Chai("Ginger", 25);
```

Now you have:

```ts id="rkluhz"
console.log(gingerChai.flavour); // "Ginger"
console.log(gingerChai.price);   // 25
```

---

## Constructor shorthand

TypeScript provides a shorter syntax:

```ts id="d72z6z"
class Chai {
  constructor(
    public flavour: string,
    public price: number
  ) {}
}
```

This is equivalent to your original class.

TypeScript automatically:

* Creates the properties
* Assigns constructor values

Usage remains the same:

```ts id="i7s6o4"
const masalaChai = new Chai("Masala", 20);
```

---

## Adding methods

Classes can contain methods:

```ts id="clchpv"
class Chai {
  constructor(
    public flavour: string,
    public price: number
  ) {}

  describe(): string {
    return `${this.flavour} chai costs ₹${this.price}`;
  }
}
```

Usage:

```ts id="18gl0f"
const masalaChai = new Chai("Masala", 20);

console.log(masalaChai.describe());
```

Output:

```text id="z4n0i2"
Masala chai costs ₹20
```

---

## Access modifiers

TypeScript adds access modifiers to classes.

### `public` (default)

Accessible everywhere.

```ts id="s4z79t"
class Chai {
  constructor(
    public flavour: string
  ) {}
}
```

```ts id="skz6pq"
chai.flavour; // ✅
```

---

### `private`

Accessible only inside the class.

```ts id="4fe8vf"
class Chai {
  constructor(
    public flavour: string,
    private secretRecipe: string
  ) {}
}
```

```ts id="h54s1q"
chai.secretRecipe; // ❌ Error
```

---

### `protected`

Accessible inside the class and subclasses.

```ts id="rz1zwx"
class Chai {
  protected price: number = 20;
}
```

---

### `readonly`

Can only be assigned once.

```ts id="6vk1jv"
class Chai {
  constructor(
    public readonly id: number,
    public flavour: string
  ) {}
}
```

```ts id="cazx4v"
chai.id = 2; // ❌ Error
```

---

## Inheritance

Classes can extend other classes.

```ts id="sjn9ko"
class Chai {
  constructor(public flavour: string) {}
}

class SpecialChai extends Chai {
  constructor(
    flavour: string,
    public toppings: string[]
  ) {
    super(flavour);
  }
}
```

Usage:

```ts id="3xbh0q"
const chai = new SpecialChai(
  "Masala",
  ["Tulsi", "Honey"]
);
```

---

## Class vs type

For data-only structures, prefer `type` or `interface`:

```ts id="2s7qnn"
type Chai = {
  flavour: string;
  price: number;
};
```

Use classes when you need:

* Methods
* Encapsulation
* Inheritance
* Object creation with `new`

---

### Quick summary

| Feature           | Example               |
| ----------------- | --------------------- |
| Property          | `flavour: string`     |
| Constructor       | `constructor(...) {}` |
| Method            | `describe() {}`       |
| Create object     | `new Chai()`          |
| Public property   | `public flavour`      |
| Private property  | `private recipe`      |
| Readonly property | `readonly id`         |
| Inheritance       | `extends`             |

TypeScript classes compile to normal JavaScript classes, but with extra type checking during development.


# access Modifiers in TypeScript :

TypeScript provides **access specifiers** (also called access modifiers) to control where class properties and methods can be accessed.

There are three main access specifiers:

1. `public`
2. `private`
3. `protected`

TypeScript also provides `readonly`, which controls modification rather than access.

---

## `public` (default)

Members marked as `public` can be accessed from anywhere.

```ts id="m4t7ks"
class Chai {
  public flavour: string;

  constructor(flavour: string) {
    this.flavour = flavour;
  }
}

const chai = new Chai("Masala");

console.log(chai.flavour); // ✅ Masala
```

You can omit `public` because it is the default.

```ts id="s6a7zn"
class Chai {
  flavour: string; // same as public flavour: string

  constructor(flavour: string) {
    this.flavour = flavour;
  }
}
```

---

## `private`

Members marked as `private` can only be accessed inside the same class.

```ts id="9n4xlh"
class Chai {
  public flavour: string;
  private secretRecipe: string;

  constructor(flavour: string, recipe: string) {
    this.flavour = flavour;
    this.secretRecipe = recipe;
  }

  getRecipe() {
    return this.secretRecipe;
  }
}

const chai = new Chai("Masala", "Special Spices");

console.log(chai.flavour);     // ✅
console.log(chai.getRecipe()); // ✅

// console.log(chai.secretRecipe); ❌ Error
```

`secretRecipe` is hidden from the outside world.

---

## `protected`

Members marked as `protected` can be accessed:

* Inside the class itself
* Inside subclasses

But not outside the class.

```ts id="bm5b4x"
class Chai {
  protected price: number;

  constructor(price: number) {
    this.price = price;
  }
}

class SpecialChai extends Chai {
  showPrice() {
    return this.price; // ✅ Accessible here
  }
}

const chai = new SpecialChai(20);

console.log(chai.showPrice()); // ✅

// console.log(chai.price); ❌ Error
```

---

## `readonly`

`readonly` prevents modification after initialization.

```ts id="bltxrl"
class Chai {
  readonly id: number;

  constructor(id: number) {
    this.id = id;
  }
}

const chai = new Chai(1);

// chai.id = 2; ❌ Error
```

You can combine `readonly` with access modifiers:

```ts id="e38s8o"
class Chai {
  constructor(
    public readonly id: number,
    public flavour: string
  ) {}
}
```

---

## Constructor shorthand

Instead of declaring properties separately:

```ts id="crxhdy"
class Chai {
  public flavour: string;
  private recipe: string;

  constructor(flavour: string, recipe: string) {
    this.flavour = flavour;
    this.recipe = recipe;
  }
}
```

You can write:

```ts id="5bmjlwm"
class Chai {
  constructor(
    public flavour: string,
    private recipe: string
  ) {}
}
```

TypeScript automatically creates and initializes the properties.

---

## Quick comparison

| Modifier    | Same Class | Subclass | Outside Class |
| ----------- | ---------- | -------- | ------------- |
| `public`    | ✅          | ✅        | ✅             |
| `private`   | ✅          | ❌        | ❌             |
| `protected` | ✅          | ✅        | ❌             |

---

## Real-world example

```ts id="7lg0kn"
class BankAccount {
  constructor(
    public accountHolder: string,
    private balance: number
  ) {}

  deposit(amount: number) {
    this.balance += amount;
  }

  getBalance() {
    return this.balance;
  }
}

const account = new BankAccount("Hitesh", 1000);

account.deposit(500);

console.log(account.accountHolder); // ✅
console.log(account.getBalance());  // ✅

// console.log(account.balance); ❌ Error
```

The `balance` is private so users cannot change it directly:

```ts id="4yy19m"
account.balance = 1000000; // ❌
```

Instead, they must use controlled methods like `deposit()`.

# extends keyword :

The `extends` keyword is used to create a new class based on an existing class.

The new class (called the **child class** or **subclass**) inherits properties and methods from the existing class (called the **parent class** or **base class**).

---

## Basic syntax

```ts id="ygl8sl"
class Parent {
  // properties and methods
}

class Child extends Parent {
  // additional properties and methods
}
```

---

## Example

```ts id="r1x8gw"
class Chai {
  constructor(
    public flavour: string,
    public price: number
  ) {}

  describe() {
    return `${this.flavour} chai costs ₹${this.price}`;
  }
}

class SpecialChai extends Chai {
  constructor(
    flavour: string,
    price: number,
    public toppings: string[]
  ) {
    super(flavour, price);
  }
}
```

Create an object:

```ts id="nt1jlz"
const chai = new SpecialChai(
  "Masala",
  30,
  ["Tulsi", "Honey"]
);

console.log(chai.flavour);   // "Masala"
console.log(chai.price);     // 30
console.log(chai.toppings);  // ["Tulsi", "Honey"]

console.log(chai.describe());
```

Output:

```text id="dlxz9u"
Masala chai costs ₹30
```

`SpecialChai` inherits:

* `flavour`
* `price`
* `describe()`

from `Chai`.

---

## `super()` keyword

When a child class has its own constructor, it must call `super()` before using `this`.

```ts id="78d5n1"
constructor(
  flavour: string,
  price: number,
  toppings: string[]
) {
  super(flavour, price);

  this.toppings = toppings;
}
```

`super()` calls the parent class constructor.

❌ Invalid:

```ts id="r3g0kp"
class SpecialChai extends Chai {
  constructor() {
    this.toppings = []; // Error
  }
}
```

Error:

```text id="ywcyjp"
'super' must be called before accessing 'this'.
```

---

## Overriding methods

A child class can provide its own implementation of a parent method.

```ts id="sdst6t"
class Chai {
  describe() {
    return "Regular chai";
  }
}

class SpecialChai extends Chai {
  describe() {
    return "Special masala chai";
  }
}
```

Usage:

```ts id="rxn0sp"
const chai = new SpecialChai();

console.log(chai.describe());
```

Output:

```text id="2q8ewr"
Special masala chai
```

---

## Using `super` inside methods

You can call the parent method using `super`.

```ts id="lrybxj"
class Chai {
  describe() {
    return "Regular chai";
  }
}

class SpecialChai extends Chai {
  describe() {
    return `${super.describe()} with extra spices`;
  }
}
```

Output:

```text id="vwfjlwm"
Regular chai with extra spices
```

---

## Access modifiers with inheritance

```ts id="vt4uq5"
class Chai {
  public flavour = "Masala";
  protected price = 20;
  private recipe = "Secret";
}

class SpecialChai extends Chai {
  showDetails() {
    console.log(this.flavour); // ✅
    console.log(this.price);   // ✅

    // console.log(this.recipe); ❌
  }
}
```

Remember:

* `public` → accessible everywhere
* `protected` → accessible in subclasses
* `private` → accessible only within the same class

---

## Multiple levels of inheritance

```ts id="cbnkrn"
class Beverage {
  serve() {
    console.log("Serving beverage");
  }
}

class Chai extends Beverage {
  brew() {
    console.log("Brewing chai");
  }
}

class MasalaChai extends Chai {
  addSpices() {
    console.log("Adding spices");
  }
}
```

Usage:

```ts id="8d74l8"
const chai = new MasalaChai();

chai.serve();
chai.brew();
chai.addSpices();
```

---

## Quick summary

| Keyword          | Purpose                    |
| ---------------- | -------------------------- |
| `extends`        | Inherit from another class |
| `super()`        | Call parent constructor    |
| `super.method()` | Call parent method         |
| Override         | Replace inherited method   |

Think of inheritance like this:

```text id="e4ul26"
Beverage
   ↓
Chai
   ↓
SpecialChai
```

Each child class gets everything from its parent and can add more functionality.

# readonly keyword makes a property immutable :

In TypeScript, the `readonly` keyword makes a property **immutable after it has been initialized**.

A `readonly` property can only be assigned:

* When it is declared, or
* Inside the constructor

After that, its value cannot be changed.

---

## Basic example

```ts id="y64vkn"
class Chai {
  readonly id: number;
  flavour: string;

  constructor(id: number, flavour: string) {
    this.id = id;
    this.flavour = flavour;
  }
}

const chai = new Chai(1, "Masala");

console.log(chai.id); // 1
```

❌ Not allowed:

```ts id="7prjlwm"
chai.id = 2;
```

Error:

```text id="cmkl2v"
Cannot assign to 'id' because it is a read-only property.
```

✅ Allowed:

```ts id="jlr3dg"
chai.flavour = "Ginger";
```

because `flavour` is not `readonly`.

---

## Initialize at declaration

You can assign a value directly when declaring the property:

```ts id="l63h0q"
class Chai {
  readonly country = "India";
}
```

The value cannot be changed later:

```ts id="r75x5a"
const chai = new Chai();

// chai.country = "Nepal"; ❌
```

---

## Constructor shorthand

TypeScript supports a shorter syntax:

```ts id="ye3w2a"
class Chai {
  constructor(
    public readonly id: number,
    public flavour: string
  ) {}
}
```

This is equivalent to:

```ts id="13tfwi"
class Chai {
  readonly id: number;
  flavour: string;

  constructor(id: number, flavour: string) {
    this.id = id;
    this.flavour = flavour;
  }
}
```

---

## `readonly` with arrays

`readonly` prevents reassigning the property, but not necessarily mutating the array itself.

```ts id="65vcrp"
class Menu {
  readonly items: string[];

  constructor() {
    this.items = ["Masala", "Ginger"];
  }
}

const menu = new Menu();

menu.items.push("Elaichi"); // ✅
```

❌ But you cannot replace the whole array:

```ts id="myl08o"
menu.items = ["Green Tea"];
```

To make the array itself immutable, use:

```ts id="24h41s"
class Menu {
  readonly items: readonly string[] = [
    "Masala",
    "Ginger"
  ];
}
```

Now both are disallowed:

```ts id="2jhrk4"
menu.items.push("Elaichi"); // ❌

menu.items = []; // ❌
```

---

## `readonly` vs `const`

These are different concepts:

### `const`

Prevents variable reassignment.

```ts id="wrlzt7"
const chai = new Chai(1, "Masala");

// chai = new Chai(2, "Ginger"); ❌
```

### `readonly`

Prevents property reassignment.

```ts id="8j6jlwm"
chai.id = 2; // ❌
```

You can have both:

```ts id="l2zv9t"
const chai = new Chai(1, "Masala");
```

* `chai` cannot point to another object.
* `chai.id` cannot change.

---

## Real-world example

IDs are commonly `readonly` because they should never change.

```ts id="pwbl7o"
class User {
  constructor(
    public readonly id: number,
    public name: string
  ) {}
}

const user = new User(1, "Hitesh");

user.name = "Piyush"; // ✅

// user.id = 2; ❌
```

---

## Quick summary

| Feature             | Can change?                |
| ------------------- | -------------------------- |
| Normal property     | ✅ Yes                      |
| `readonly` property | ❌ No                       |
| `const` variable    | ❌ Cannot reassign variable |
| `readonly string[]` | ❌ Cannot mutate array      |

Use `readonly` when a property should stay the same for the lifetime of an object, such as:

* IDs
* Creation dates
* Configuration values
* Coordinates
* API keys loaded at startup

# Getters and setters :

Getters and setters let you **control how class properties are read and updated**.

Instead of accessing a property directly, you can run custom logic when someone gets or sets a value.

In TypeScript, you use the `get` and `set` keywords.

---

## Basic syntax

```ts id="3klr8a"
class Chai {
  private _price = 0;

  get price() {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }
}
```

Usage:

```ts id="xtjlwm"
const chai = new Chai();

chai.price = 20;        // Calls the setter
console.log(chai.price); // Calls the getter
```

Output:

```text id="1cw9xr"
20
```

Notice that you access `price` like a normal property, not a method.

---

## Why use getters and setters?

They allow you to:

* Validate data
* Transform values
* Hide internal implementation
* Compute values dynamically

---

## Example: validation with a setter

```ts id="e1km9r"
class Chai {
  private _price = 0;

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    if (value < 0) {
      throw new Error("Price cannot be negative");
    }

    this._price = value;
  }
}
```

Usage:

```ts id="13ngl0"
const chai = new Chai();

chai.price = 25; // ✅

// chai.price = -10; ❌ Error
```

---

## Example: computed property with a getter

```ts id="2xj7wd"
class Chai {
  constructor(
    public flavour: string,
    public price: number
  ) {}

  get description(): string {
    return `${this.flavour} chai costs ₹${this.price}`;
  }
}
```

Usage:

```ts id="svqavj"
const chai = new Chai("Masala", 20);

console.log(chai.description);
```

Output:

```text id="5nlvzu"
Masala chai costs ₹20
```

No setter is needed because `description` is derived from other properties.

---

## Read-only computed property

If you define only a getter, the property becomes read-only.

```ts id="20uyta"
class Circle {
  constructor(public radius: number) {}

  get area(): number {
    return Math.PI * this.radius ** 2;
  }
}
```

Usage:

```ts id="o96x05"
const circle = new Circle(5);

console.log(circle.area);

// circle.area = 100; ❌ Error
```

---

## Important rules

### Use a different internal property name

This causes an infinite loop:

```ts id="7dgx2m"
class Chai {
  private price = 0;

  set price(value: number) {
    this.price = value; // ❌ Recursive call
  }
}
```

Instead, use a separate property:

```ts id="p0gr7g"
class Chai {
  private _price = 0;

  set price(value: number) {
    this._price = value;
  }
}
```

Using `_price` is a common convention.

---

### Setter parameters cannot have return types

❌ Invalid:

```ts id="c0r2tk"
set price(value: number): void {
  this._price = value;
}
```

✅ Correct:

```ts id="0tj89a"
set price(value: number) {
  this._price = value;
}
```

Setters implicitly return `void`.

---

## Complete example

```ts id="w8m3d6"
class User {
  private _age = 0;

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (value < 0) {
      throw new Error("Age cannot be negative");
    }

    this._age = value;
  }
}

const user = new User();

user.age = 25;

console.log(user.age); // 25
```

---

## Quick summary

| Keyword         | Purpose                    |
| --------------- | -------------------------- |
| `get`           | Read or compute a value    |
| `set`           | Validate or update a value |
| Getter only     | Read-only property         |
| Getter + Setter | Controlled access          |

Think of it like this:

```ts id="hn9s0y"
obj.price = 20;      // setter runs
console.log(obj.price); // getter runs
```

The property looks normal from the outside, but your class controls what happens behind the scenes.

# static keyword :

The `static` keyword makes a property or method belong to the **class itself**, not to individual objects (instances).

Without `static`, each object gets its own copy of the property.

With `static`, there is only one shared property or method on the class.

---

## Instance members (default)

```ts id="vfzmrp"
class Chai {
  flavour: string;

  constructor(flavour: string) {
    this.flavour = flavour;
  }
}

const masala = new Chai("Masala");
const ginger = new Chai("Ginger");

console.log(masala.flavour); // "Masala"
console.log(ginger.flavour); // "Ginger"
```

Here, `flavour` belongs to each object.

---

## Static properties

```ts id="wjlwm1"
class Chai {
  static shopName = "Chai Corner";
}

console.log(Chai.shopName);
```

Output:

```text id="nyl4b7"
Chai Corner
```

Access static members using the class name:

```ts id="lgyhs0"
Chai.shopName; // ✅
```

Not through an object:

```ts id="g6u9y2"
const chai = new Chai();

chai.shopName; // ❌ Error
```

---

## Static methods

```ts id="n6xt3v"
class Chai {
  static makeTea() {
    return "Making chai...";
  }
}

console.log(Chai.makeTea());
```

Output:

```text id="kbxvdt"
Making chai...
```

Again, call the method on the class:

```ts id="2xk7h8"
Chai.makeTea(); // ✅
```

Not on an instance:

```ts id="73rf8z"
const chai = new Chai();

chai.makeTea(); // ❌ Error
```

---

## Example: counting instances

A common use case for `static` is tracking shared data.

```ts id="t9mcg4"
class Chai {
  static totalOrders = 0;

  constructor(public flavour: string) {
    Chai.totalOrders++;
  }
}

new Chai("Masala");
new Chai("Ginger");
new Chai("Elaichi");

console.log(Chai.totalOrders);
```

Output:

```text id="b2ghm5"
3
```

All instances share the same `totalOrders`.

---

## Accessing static members inside a class

Use the class name, not `this`.

```ts id="q4k0mn"
class Chai {
  static totalOrders = 0;

  constructor() {
    Chai.totalOrders++;
  }
}
```

Avoid:

```ts id="4q81ol"
this.totalOrders++; // ❌
```

because `this` refers to the instance.

---

## Static + readonly

You can combine `static` and `readonly`.

```ts id="z1pr7g"
class Chai {
  static readonly GST = 0.18;
}

console.log(Chai.GST);
```

❌ Not allowed:

```ts id="9s0c3r"
Chai.GST = 0.2;
```

---

## Utility classes

Classes that only contain static methods don't need objects.

```ts id="4zjlwm"
class MathHelper {
  static square(num: number) {
    return num * num;
  }
}

console.log(MathHelper.square(5));
```

Output:

```text id="oqwdj8"
25
```

This is similar to built-in JavaScript classes:

```ts id="v53h90"
Math.max(10, 20);

Date.now();

Object.keys({ a: 1 });
```

These are static methods.

---

## Quick summary

| Member type       | Accessed with    |
| ----------------- | ---------------- |
| Instance property | `obj.property`   |
| Instance method   | `obj.method()`   |
| Static property   | `Class.property` |
| Static method     | `Class.method()` |

Example:

```ts id="vjlwmn"
class Chai {
  static shopName = "Chai Corner";

  constructor(public flavour: string) {}
}

const chai = new Chai("Masala");

console.log(chai.flavour);   // ✅
console.log(Chai.shopName);  // ✅

console.log(chai.shopName);  // ❌
```

Remember:

> **Instance members belong to objects.**
>
> **Static members belong to the class itself.**

# TypeScript's private is only checked at compile time :

This happens because **TypeScript's `private` is only checked at compile time**. It is not true runtime privacy (unless you use JavaScript's `#` private fields).

Your code:

```ts
class Chaia {
  constructor(
    public flavour: string,
    private secretRecipe: string,
  ) {}
}

const masalaChai = new Chaia("Pan", "PanBahar");
console.log(masalaChai.secretRecipe);
```

TypeScript correctly gives an error:

```
Property 'secretRecipe' is private and only accessible within class 'Chaia'.
```

But if you ignore the error and compile/run anyway, the generated JavaScript looks like:

```js
class Chaia {
  constructor(flavour, secretRecipe) {
    this.flavour = flavour;
    this.secretRecipe = secretRecipe;
  }
}

const masalaChai = new Chaia("Pan", "PanBahar");
console.log(masalaChai.secretRecipe);
```

Since JavaScript doesn't know about TypeScript's `private`, it prints:

```
PanBahar
```

---

## True Runtime Privacy

Use JavaScript private fields with `#`:

```ts
class Chaia {
  #secretRecipe: string;

  constructor(
    public flavour: string,
    secretRecipe: string
  ) {
    this.#secretRecipe = secretRecipe;
  }
}

const masalaChai = new Chaia("Pan", "PanBahar");

// ❌ SyntaxError / compile error
console.log(masalaChai.#secretRecipe);
```

Or using TypeScript's shorthand:

```ts
class Chaia {
  constructor(
    public flavour: string,
    #secretRecipe: string // ❌ Not allowed in parameter properties
  ) {}
}
```

You cannot use the shorthand with `#`; you must declare the field separately.

---

### Summary

| Syntax                         | Enforced by TypeScript | Enforced at Runtime |
| ------------------------------ | ---------------------- | ------------------- |
| `private secretRecipe: string` | ✅                      | ❌                   |
| `#secretRecipe: string`        | ✅                      | ✅                   |

So your code works because TypeScript's `private` is a **compile-time check only**, and JavaScript still creates a normal property called `secretRecipe`.

# When do we call Super() :

Good question — this is a key concept in TypeScript/JavaScript inheritance.

The reason is:

> You use `super()` **only when the parent class has a constructor that must be called with arguments OR when you're defining a constructor in the child class.**

Let’s break both examples.

---

## ✅ Example 1 (You MUST use `super`)

```ts
class Chai {
  constructor(
    public flavour: string,
    public price: number
  ) {}

  describe() {
    return `${this.flavour} chai costs ₹${this.price}`;
  }
}

class SpecialChai extends Chai {
  constructor(
    flavour: string,
    price: number,
    public toppings: string[]
  ) {
    super(flavour, price);
  }
}
```

### Why `super()` is needed here?

Because:

* You wrote a **constructor in `SpecialChai`**
* The parent `Chai` constructor needs:

```ts
(flavour, price)
```

So TypeScript forces you to call:

```ts
super(flavour, price)
```

👉 This is how parent class properties get initialized.

Without it, `flavour` and `price` would not be set.

---

## ✅ Example 2 (No need to write constructor → no need for super)

```ts
class Chai {
  constructor(protected price: number) {}
}

class SpecialChai extends Chai {
  showPrice() {
    return this.price;
  }
}
```

### Why NO `super()` here?

Because:

👉 You did NOT define a constructor in `SpecialChai`.

So JavaScript automatically creates this behind the scenes:

```ts
class SpecialChai extends Chai {
  constructor(...args) {
    super(...args);
  }
}
```

So `super()` is called automatically.

---

## ⚡ Key Rule (Very Important)

## 1. If child class has NO constructor

```ts
class Child extends Parent {}
```

👉 `super()` is called automatically

---

## 2. If child class HAS constructor

```ts
class Child extends Parent {
  constructor(...) {
    super(...);
  }
}
```

👉 You MUST call `super()` manually

---

## 🧠 Simple Mental Model

Think like this:

### Parent = "base setup"

Child constructor = "custom setup"

So:

* If you override constructor → you must call parent manually (`super`)
* If you don’t override → JS handles it for you

---

## 🔥 Your two cases summarized

| Case      | constructor in child? | super needed? |
| --------- | --------------------- | ------------- |
| Example 1 | ✅ Yes                 | ✅ Yes         |
| Example 2 | ❌ No                  | ❌ Not needed  |

---

If you want, I can also show:

* what happens internally in compiled JavaScript
* or common interview questions from this topic (very important for React/Node interviews)

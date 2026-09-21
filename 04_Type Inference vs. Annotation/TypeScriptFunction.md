Functions in TypeScript are just JavaScript functions with **type annotations** added.

## Basic Function

```ts
function makeTea(name: string): string {
  return `Making ${name}`;
}
```

### Breakdown

```ts
function makeTea(name: string): string
```

* `name: string` → parameter must be a string
* `: string` → function must return a string

Example:

```ts
makeTea("Masala Chai"); // ✅

makeTea(10); // ❌ Error
```

---

## Function Expression

```ts
const makeTea = (name: string): string => {
  return `Making ${name}`;
};
```

Same thing, different syntax.

---

## Multiple Parameters

```ts
function orderTea(name: string, quantity: number): string {
  return `${quantity} cups of ${name}`;
}
```

Usage:

```ts
orderTea("Adrak Chai", 2); // ✅
orderTea("Adrak Chai");    // ❌ Missing argument
```

---

## Void Return Type

If a function doesn't return anything:

```ts
function serveTea(): void {
  console.log("Tea served");
}
```

`void` means:

> This function returns nothing.

---

## Optional Parameters

```ts
function makeTea(name: string, sugar?: number) {
  console.log(name, sugar);
}
```

Valid:

```ts
makeTea("Masala Chai");
makeTea("Masala Chai", 2);
```

The `?` makes the parameter optional.

---

## Default Parameters

```ts
function makeTea(name: string, sugar: number = 1) {
  console.log(name, sugar);
}
```

Usage:

```ts
makeTea("Masala Chai");    // sugar = 1
makeTea("Masala Chai", 3);
```

---

## Function Type

You can define the shape of a function:

```ts
type TeaMaker = (name: string) => string;
```

Then:

```ts
const makeTea: TeaMaker = (name) => {
  return `Making ${name}`;
};
```

TypeScript ensures the function follows that signature.

---

## Object Parameter

```ts
type Tea = {
  name: string;
  price: number;
};

function printTea(tea: Tea): void {
  console.log(tea.name, tea.price);
}
```

Usage:

```ts
printTea({
  name: "Green Tea",
  price: 30
});
```

---

## Function Returning an Object

```ts
type Tea = {
  name: string;
  price: number;
};

function createTea(name: string, price: number): Tea {
  return {
    name,
    price
  };
}
```

The returned object must match the `Tea` type.

---

## Rest Parameters

```ts
function totalPrice(...prices: number[]): number {
  return prices.reduce((sum, p) => sum + p, 0);
}
```

Usage:

```ts
totalPrice(10, 20, 30); // 60
```

`number[]` means all arguments must be numbers.

---

### Quick Summary

```txt
name: string          → parameter type
(): string            → return type
(): void              → returns nothing
param?: string        → optional parameter
param = value         → default parameter
(...args: number[])   → rest parameter
type Fn = (...) => .. → function type
```

These are the function concepts you'll use most often in TypeScript projects and interviews.

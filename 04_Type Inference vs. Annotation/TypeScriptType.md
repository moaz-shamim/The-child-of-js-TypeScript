# Type Annotations in TypeScript

Type annotations in TypeScript are used to explicitly specify the type of a variable, function parameter, or object property. This helps catch errors early, improves code readability, and ensures type safety.

## Example

```ts
const str: string = "GeeksforGeeks";
const num: number = 6;
const arr: (number | string)[] = [
    "GFG",
    "TypeScript",
    500,
    20
];

console.log(typeof str);
console.log(typeof num);
console.log(arr);
```

### Output

```txt
string
number
["GFG", "TypeScript", 500, 20]
```

### Explanation

In this example:

- `str` is assigned the type `string`, so it will only accept string values.
- `num` is assigned the type `number`, ensuring it will only store numbers.
- `arr` is an array that can hold both `number` and `string` values.

---

## Function with Type Annotations

Type annotations in functions let you specify the expected types of parameters and the return value. This improves readability, enforces correctness, and helps catch errors early.

### Example

```ts
function greet(name: string): string {
    return `Hello, ${name}!`;
}

console.log(greet("Alice"));
```

### Output

```txt
Hello, Alice!
```

### Explanation

- The `greet` function accepts a parameter `name` of type `string`.
- The function returns a value of type `string`.
- This ensures that both the input and output are of the expected types, preventing type-related errors.

---

## Object with Type Annotations

Type annotations for objects define the structure and types of properties the object must have. This ensures type safety and prevents invalid assignments.

### Example

```ts
const person: { name: string; age: number } = {
    name: "Alice",
    age: 30
};

console.log(person);
```

### Output

```txt
{ name: 'Alice', age: 30 }
```

### Explanation

- The `person` object is explicitly typed to have:
  - a `name` property of type `string`
  - an `age` property of type `number`
- This enforces the structure of the object and ensures it adheres to the specified types.

---

## Array with Type Annotations

Array type annotations explicitly specify the type of elements an array can hold. This helps catch errors and improves code readability.

### Example

```ts
const numbers: number[] = [1, 2, 3, 4, 5];

console.log(numbers);
```

### Output

```txt
[1, 2, 3, 4, 5]
```

### Explanation

- The `numbers` array is annotated to contain only `number` elements.
- This prevents the inclusion of elements of other types, maintaining type safety.

---

## Class with Type Annotations

Type annotations in classes define the types of properties and method parameters/returns, ensuring that objects of the class follow a consistent structure. This improves type safety and code clarity.

### Example

```ts
class Rectangle {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    area(): number {
        return this.width * this.height;
    }
}

const rect = new Rectangle(5, 10);

console.log(rect);
console.log(rect.area());
```

### Output

```txt
Rectangle { width: 5, height: 10 }
50
```

### Explanation

- The `Rectangle` class has two properties:
  - `width` of type `number`
  - `height` of type `number`
- The constructor accepts two `number` arguments.
- The `area()` method returns a `number`, representing the area of the rectangle.

---

## Summary

Type annotations help TypeScript:

- Catch type-related errors during development.
- Improve code readability and maintainability.
- Provide better editor support and autocompletion.
- Ensure variables, functions, objects, arrays, and classes use the correct types.

Using type annotations makes your TypeScript code safer, more predictable, and easier to understand.


# TypeScript Inference

TypeScript's type inference automatically determines the types of variables, function return values, objects, and arrays based on their assigned values and usage.

This feature reduces the need for explicit type annotations, simplifying code while maintaining type safety. By analyzing the context and initial values, TypeScript ensures that variables and functions operate with consistent and expected types throughout the codebase.

## Basic Example

```ts
let age = 25;
let name = "John";

console.log(`Age: ${age}`);
console.log(`Name: ${name}`);
```

### Explanation

In this example:

- TypeScript infers `age` as a `number`.
- TypeScript infers `name` as a `string`.
- This automatic detection ensures type safety without requiring explicit type annotations.

---

## Inference of Variable Type

Variable type inference means TypeScript automatically determines the type of a variable from the value assigned to it, without the programmer explicitly specifying the type.

### Example

```ts
let x = 10; // TypeScript infers x as a number

console.log(typeof x);
```

### Output

```txt
number
```

### Explanation

- TypeScript infers the type of `x` as `number` based on the initial value `10`.
- This ensures `x` can only hold numerical values, improving type safety.

---

## Inference of Array Type

Array type inference means TypeScript automatically determines the type of an array based on the elements it contains.

### Example

```ts
let fruits = ["Apple", "Banana", "Cherry"]; // TypeScript infers fruits as string[]

console.log(fruits);
```

### Output

```txt
[ 'Apple', 'Banana', 'Cherry' ]
```

### Explanation

- TypeScript infers the type of `fruits` as `string[]`.
- Since all elements are strings, TypeScript treats the array as an array of strings.
- This prevents adding values of other types, maintaining array consistency.

---

## Inference of Function Return Type

Function return type inference means TypeScript automatically determines the return type of a function based on the value it returns.

### Example

```ts
function add(a: number, b: number) {
    return a + b; // TypeScript infers the return type as number
}

console.log(add(5, 10));
```

### Output

```txt
15
```

### Explanation

- The `add` function returns the sum of two numbers.
- TypeScript infers the return type as `number`.
- This ensures the function always returns a numerical value and helps prevent type-related errors.

---

## Benefits of Type Inference

Type inference helps TypeScript:

- Reduce the need for explicit type annotations.
- Keep code cleaner and more concise.
- Maintain strong type safety.
- Improve developer productivity through better autocompletion and error checking.
- Detect type-related issues during development.

---

## Summary

TypeScript inference automatically determines types from assigned values and usage. Common areas where inference occurs include:

- Variables
- Arrays
- Objects
- Function return values
- Function parameters (in some contexts)

By using type inference, TypeScript provides strong type safety while allowing developers to write less code.
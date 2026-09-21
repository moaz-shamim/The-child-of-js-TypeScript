# Type Assertion in TypeScript

Type assertion is a way of overriding TypeScript's default type inference to manually specify the type of a variable. It doesn't perform any runtime checks or conversions; it simply tells the compiler:

> "Trust me, I know what I'm doing!"

## Syntax for Type Assertion

There are two ways to assert a type in TypeScript:

### 1. Angle-Bracket Syntax (Not Recommended with JSX)

```ts
let someValue: any = "Hello, TypeScript!";
let strLength: number = (<string>someValue).length;
```

### 2. `as` Syntax (Preferred)

```ts
let someValue: any = "Hello, TypeScript!";
let strLength: number = (someValue as string).length;
```

## Key Points

- Type assertion doesn't alter the actual type of the value at runtime.
- It is purely a compile-time construct.
- It helps TypeScript understand what type you expect a value to be.
- No runtime type checking or conversion takes place.

---

[Deep Dive Type Asertion](https://abhishekw.medium.com/typescript-understanding-type-assertion-c06be90e1ba1)

# How to Fix This Code?

```ts
const getItem = (item: number | undefined) => {
  return item.toString();
};
```

## Problem

The `item` parameter is declared as `number | undefined`, meaning it can either be a number or `undefined`.

Calling `.toString()` directly on `item` causes an error because TypeScript recognizes that `undefined` does not have a `.toString()` method.

---

## Solution Using Type Assertion

```ts
const getItem = (item: number | undefined) => {
  if (item !== undefined) {
    return (item as number).toString();
  }

  return "No item provided";
};
```

## Explanation

- The condition `item !== undefined` ensures that `item` is not `undefined` before calling `.toString()`.
- `(item as number)` explicitly tells TypeScript that `item` is a `number` at this point.
- This allows TypeScript to safely permit the `.toString()` method call.

---

## Better Approach (Recommended)

In this case, the type assertion is actually unnecessary because TypeScript automatically narrows the type inside the `if` block:

```ts
const getItem = (item: number | undefined) => {
  if (item !== undefined) {
    return item.toString();
  }

  return "No item provided";
};
```

### Why?

TypeScript's **type narrowing** understands that after the check:

```ts
if (item !== undefined)
```

the variable `item` can only be a `number`, so no type assertion is needed.

This approach is cleaner and safer because it relies on TypeScript's built-in type analysis rather than manually overriding types.

# Methods Suggestion with the help of Type Assertion :

> Type Assertion tells TypeScript: "Trust me, I know the type of this value."

It does **not** change the value at runtime. It only affects TypeScript's understanding during type checking.

---

## Example 1: String Methods Suggestion

Suppose:

```ts
let response: unknown = "Hello TypeScript";
```

Now if you write:

```ts
response.
```

TypeScript won't show string methods because `unknown` could be anything.

It doesn't know whether `response` is:

```text
string
number
boolean
object
```

So this won't work:

```ts
let numericLength: number = response.length;
```

TypeScript error:

```text
Object is of type 'unknown'
```

---

### Using Type Assertion

```ts
let numericLength: number = (response as string).length;
```

Now TypeScript treats `response` as a string.

So after:

```ts
(response as string).
```

you'll get suggestions like:

```text
length
toUpperCase()
toLowerCase()
trim()
split()
```

because TypeScript now believes the value is a string.

---

## Example 2: JSON.parse()

Consider:

```ts
type Book = {
  name: string;
};

let bookString = `{"name":"who move my cheese"}`;
```

When you do:

```ts
let bookObject = JSON.parse(bookString);
```

TypeScript sees:

```ts
bookObject: any
```

(or `unknown` in stricter code)

It doesn't know the structure.

---

### With Type Assertion

```ts
let bookObject = JSON.parse(bookString) as Book;
```

Now TypeScript assumes:

```ts
bookObject: Book
```

which means:

```ts
{
  name: string;
}
```

Therefore:

```ts
bookObject.name
```

works perfectly.

You'll get:

* Autocomplete
* Type checking
* IntelliSense

for the `name` property.

---

## Real-world Example: localStorage

This is very common.

```ts
type User = {
  name: string;
  age: number;
};

const userString = localStorage.getItem("user");

const user = JSON.parse(userString!) as User;
```

Now TypeScript knows:

```ts
user.name
user.age
```

exist and provides autocomplete.

---

## Important Warning

Type Assertion does **not** verify the data.

Example:

```ts
type Book = {
  name: string;
};

let bookObject = JSON.parse(`{"title":"TS Guide"}`) as Book;
```

TypeScript is happy because you asserted `Book`.

But at runtime:

```ts
console.log(bookObject.name);
```

prints:

```text
undefined
```

because the JSON actually contains `title`, not `name`.

That's why:

> Type Assertion is not type checking. It is you telling TypeScript to trust your knowledge of the value's type.

A good mental model is:

```ts
value as SomeType
```

means:

> "TypeScript, please treat `value` as `SomeType` from now on."

## Example 3: HTMLElement :

This is actually one of the **most common real-world uses of Type Assertion** in frontend development.

```ts
const inputElement = document.getElementById("username") as HTMLInputElement;
```

Let's understand why we need it.

---

## What does `getElementById()` return?

TypeScript defines it roughly like this:

```ts
document.getElementById(id: string): HTMLElement | null
```

So:

```ts
const inputElement = document.getElementById("username");
```

TypeScript thinks:

```ts
const inputElement: HTMLElement | null
```

because the element might:

* Exist → `HTMLElement`
* Not exist → `null`

---

## The Problem

Suppose your HTML is:

```html
<input id="username" />
```

You want to access:

```ts
inputElement.value
```

TypeScript gives an error:

```text
Property 'value' does not exist on type 'HTMLElement'
```

Why?

Because not every HTML element has a `.value` property.

Examples:

```html
<div></div>
<p></p>
<h1></h1>
```

These are `HTMLElement`s but don't have `.value`.

---

## Using Type Assertion

```ts
const inputElement =
  document.getElementById("username") as HTMLInputElement;
```

Now TypeScript thinks:

```ts
const inputElement: HTMLInputElement
```

and you get autocomplete for:

```ts
inputElement.value
inputElement.placeholder
inputElement.focus()
inputElement.select()
```

because `HTMLInputElement` specifically represents:

```html
<input />
```

elements.

---

## What's happening mentally?

Without assertion:

```ts
document.getElementById("username")
```

TypeScript says:

> "I only know this is some generic HTML element."

With assertion:

```ts
document.getElementById("username") as HTMLInputElement
```

You're saying:

> "Trust me, I know this element is an `<input>`."

---

## Another Example

HTML:

```html
<textarea id="message"></textarea>
```

TypeScript:

```ts
const textarea =
  document.getElementById("message") as HTMLTextAreaElement;

console.log(textarea.value);
```

Now you get textarea-specific properties.

---

## Important Warning

Type Assertion does not check reality.

Example:

HTML:

```html
<div id="username"></div>
```

TypeScript:

```ts
const inputElement =
  document.getElementById("username") as HTMLInputElement;
```

TypeScript trusts you and won't complain.

But in reality the element is a `<div>`, not an `<input>`.

So:

> `as HTMLInputElement` doesn't convert the element into an input. It only changes TypeScript's understanding of the type.

---

### Rule to Remember

```ts
value as SomeType
```

means:

> "TypeScript, I know more about this value than you do. Please treat it as `SomeType`."

Common real-world assertions:

```ts
JSON.parse(data) as User

response as string

event.target as HTMLInputElement

document.getElementById("username") as HTMLInputElement
```

These are all cases where **you know the actual type, but TypeScript cannot automatically infer it**.

# Difference between unknown and any:

Yes, that's exactly the main difference.

### `any` = "Turn off TypeScript"

```ts
let value: any;

value = "chai";
value = [1, 3, 4, 5];
value = 3.9;

value.toUpperCase();
```

TypeScript allows this because `any` means:

> "I don't care about the type. Skip type checking."

So TypeScript won't complain even though:

```ts
value = 3.9;
value.toUpperCase();
```

would cause a runtime error because numbers don't have `toUpperCase()`.

With `any`, TypeScript trusts you completely.

---

### `unknown` = "I don't know the type yet"

```ts
let anotherValue: unknown;

anotherValue = "chai";
anotherValue = [1, 3, 4, 5];
anotherValue = 3.9;
```

This is fine because `unknown` can hold any value.

But:

```ts
anotherValue.toUpperCase();
```

❌ Error

TypeScript says:

> "I know nothing about this value, so I won't let you use string methods."

---

### Type Guard

Before using the value, you must prove its type:

```ts
if (typeof anotherValue === "string") {
  anotherValue.toUpperCase();
}
```

Inside the `if` block, TypeScript narrows the type:

```text
unknown
   ↓
string
```

Now string methods are allowed.

This process is called **type narrowing** using a **type guard**.

---

### Real-World Analogy

#### `any`

Imagine a sealed box.

```text
Box → any
```

You can do whatever you want:

```text
Open it
Eat it
Throw it
```

Nobody checks whether it's safe.

---

#### `unknown`

Imagine a sealed box with a warning:

```text
Contents Unknown
```

Before using it, you must inspect it:

```text
Is it food?
Is it a book?
Is it a phone?
```

Only after checking can you safely use it.

---

### Why `unknown` is safer

Suppose data comes from an API:

```ts
const response: unknown = await fetchData();
```

You don't know what the server returned.

So TypeScript forces you to verify:

```ts
if (typeof response === "string") {
  console.log(response.toUpperCase());
}
```

This prevents many runtime bugs.

---

### Quick Summary

| `any`                          | `unknown`                          |
| ------------------------------ | ---------------------------------- |
| Can store any value            | Can store any value                |
| Can perform any operation      | Cannot perform operations directly |
| No type checking               | Requires type checking             |
| Less safe                      | More safe                          |
| Disables TypeScript protection | Preserves TypeScript protection    |

A common saying among TypeScript developers is:

> **`any` means "trust me", while `unknown` means "prove it first".**


# try catch precaution :

In TypeScript, the `catch` variable is often treated as `unknown` (especially with strict settings).

```ts
try {
  // some code
} catch (error) {
  // error is unknown
}
```

TypeScript does this because **anything can be thrown**, not just `Error` objects.

For example, JavaScript allows:

```ts
throw new Error("Something went wrong");
```

but also:

```ts
throw "Something went wrong";
throw 404;
throw { message: "Not Found" };
```

So inside `catch`, TypeScript cannot assume:

```ts
error.message
```

exists.

That's why this is unsafe:

```ts
catch (error) {
  console.log(error.message); // ❌
}
```

TypeScript says:

> "How do you know `error` is an Error object?"

---

### Precaution Using a Type Guard

```ts
catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }

  console.log("Error:", error);
}
```

Here:

```ts
error instanceof Error
```

is a **type guard**.

You're checking:

> "Is this value actually an instance of the Error class?"

If yes, TypeScript narrows:

```text
unknown
   ↓
Error
```

and now:

```ts
error.message
error.name
error.stack
```

are available safely.

---

### Real Example

```ts
try {
  throw "Server Down";
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
```

Without the check, TypeScript would allow code that might crash because `"Server Down"` is just a string, not an `Error`.

---

### Mental Model

Think of `catch` like `unknown`:

```ts
catch (error) {
  // error: unknown
}
```

Before using it, you must verify its type:

```ts
if (error instanceof Error) {
  // Safe to use error.message
}
```

This is a defensive programming technique that helps prevent bugs when the thrown value isn't actually an `Error` object.

A good way to summarize it:

> Since JavaScript allows throwing values of any type, TypeScript cannot guarantee that the `catch` variable is an `Error`. Using `instanceof Error` is a safety check (type guard) that lets us access `error.message` and other Error properties without risking type-related bugs.

# Unknown response data :

```ts
const data: unknown = "chai aur code";
const strData: string = data as string;
```

### What's happening?

Initially:

```ts
const data: unknown = "chai aur code";
```

TypeScript knows:

```ts
data: unknown
```

Even though the actual value is a string, TypeScript treats it as **unknown**.

So this won't work:

```ts
data.toUpperCase(); // Error
```

because TypeScript says:

> "I don't know whether `data` is a string, number, array, object, etc."

---

### Using Type Assertion

```ts
const strData: string = data as string;
```

You're telling TypeScript:

> "Trust me, I know `data` is a string."

Now:

```ts
strData.toUpperCase(); // ✅
strData.length;        // ✅
strData.trim();        // ✅
```

because `strData` has type:

```ts
string
```

---

### But be careful

This compiles:

```ts
const data: unknown = 42;

const strData: string = data as string;

console.log(strData.toUpperCase());
```

TypeScript trusts you and allows it.

But at runtime:

```text
TypeError: strData.toUpperCase is not a function
```

because the value is actually a number.

---

### Safer Approach: Type Guard

Instead of asserting:

```ts
const strData: string = data as string;
```

you can verify first:

```ts
if (typeof data === "string") {
  console.log(data.toUpperCase());
}
```

Now TypeScript narrows:

```text
unknown
   ↓
string
```

and you get safety plus autocomplete.

---

### When to use which?

**Type Assertion (`as string`)**

Use when you're confident about the type:

```ts
const data = localStorage.getItem("token") as string;
```

---

**Type Guard (`typeof`)**

Use when you're not sure:

```ts
if (typeof data === "string") {
  // safe
}
```

A good mental model is:

```ts
data as string
```

means:

> "I know this value is a string."

while

```ts
typeof data === "string"
```

means:

> "Let's prove this value is a string before using it."

# Never say never : 

```ts
type Role = "admin" | "user";

function redirectBasedOnRole(role: Role): void {
  if (role === "admin") {
    console.log("Redirect to admin dashboard");
    return;
  }

  if (role === "user") {
    console.log("Redirect to user dashboard");
    return;
  }

  role;
}
```

---

### Why does TypeScript show `role: never`?

Initially:

```ts
role: "admin" | "user"
```

When TypeScript reaches:

```ts
if (role === "admin")
```

inside that block:

```ts
role: "admin"
```

After that block, TypeScript knows:

```ts
role: "user"
```

might still be possible.

Then:

```ts
if (role === "user")
```

inside that block:

```ts
role: "user"
```

After handling `"user"` too, TypeScript reasons:

```text
admin ✓ handled
user  ✓ handled
```

There are no values left.

So at the final line:

```ts
role;
```

TypeScript infers:

```ts
role: never
```

`never` means:

> "This code path should be impossible."

---

### When you add a new role

```ts
type Role = "admin" | "user" | "superadmin";
```

Now TypeScript sees:

```text
admin      ✓ handled
user       ✓ handled
superadmin ✗ not handled
```

So at the last line:

```ts
role;
```

it becomes:

```ts
role: "superadmin"
```

because that's the only remaining possibility.

---

### Why is this useful?

Imagine:

```ts
type Role = "admin" | "user" | "superadmin";
```

but you forgot:

```ts
if (role === "superadmin")
```

TypeScript can help you find the missing case.

A common pattern is:

```ts
function redirectBasedOnRole(role: Role): void {
  if (role === "admin") return;
  if (role === "user") return;

  const exhaustiveCheck: never = role;
}
```

Now if someone adds:

```ts
type Role = "admin" | "user" | "superadmin";
```

TypeScript immediately errors:

```text
Type '"superadmin"' is not assignable to type 'never'
```

which tells you:

> "You added a new role but forgot to handle it."

---

### Mental Model

Think of TypeScript crossing values off a list:

```text
Role = "admin" | "user"

role = admin | user

if admin:
  admin ❌ removed

remaining:
  user

if user:
  user ❌ removed

remaining:
  nothing

=> never
```

When you add `"superadmin"`:

```text
Role = admin | user | superadmin

admin ❌ removed
user ❌ removed

remaining:
  superadmin

=> role: "superadmin"
```

This process is called **control flow analysis** and **type narrowing**, and it's one of the reasons TypeScript is so good at catching bugs when unions grow over time.

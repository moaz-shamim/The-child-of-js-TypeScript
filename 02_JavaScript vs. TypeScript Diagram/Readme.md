These diagrams are showing the **internal pipeline of the TypeScript Compiler (`tsc`)**. Think of it as a factory that takes your TypeScript code and eventually produces JavaScript.

Let's walk through it using your example:

```ts
function greet(name: string): string {
  return `Hello ${name}`;
}

console.log(greet("Hitesh"));
```

# 1. TS Code → Lexer

Your code starts as plain text:

```text
function greet(name: string): string {
  return `Hello ${name}`;
}
```

The **Lexer** (Tokenizer) breaks the text into small pieces called **tokens**.

Example:

```text
function
greet
(
name
:
string
)
:
string
{
return
`Hello ${name}`
;
}
```

The lexer doesn't understand meaning yet.

It only says:

> "I found a keyword."
>
> "I found an identifier."
>
> "I found a colon."
>
> "I found parentheses."

---

# 2. Lexer → Parser

The **Parser** takes those tokens and checks whether they follow TypeScript grammar rules.

Example:

```ts
function greet(name: string): string {
```

The parser understands:

```text
Function Declaration
 ├─ Name: greet
 ├─ Parameter: name
 ├─ Parameter Type: string
 └─ Return Type: string
```

---

# 3. Parser → AST

AST = **Abstract Syntax Tree**

This is the most important concept.

Instead of text, TypeScript converts your code into a tree structure.

Very simplified:

```text
FunctionDeclaration
│
├── Name: greet
│
├── Parameter
│     ├── name
│     └── string
│
└── ReturnType
      └── string
```

TypeScript now has a structured representation of your code.

This AST becomes the source of truth for everything that follows.

---

# 4. Binder

This is where your second image starts.

The Binder walks through the AST and creates relationships.

Example:

```ts
const age = 20;

function show() {
  console.log(age);
}
```

The Binder connects:

```text
age usage
    ↓
age declaration
```

It builds:

* Symbol Tables
* Parent pointers
* Scope information

Think:

> "Where was this variable declared?"

> "Which function does this belong to?"

---

# 5. Symbol Tables

The Binder creates symbol tables.

Example:

```ts
const age = 20;
const name = "Hitesh";
```

Symbol table:

```text
age  -> number
name -> string
```

TypeScript can now quickly find identifiers.

---

# 6. Checker (The Magic Part)

This is the heart of TypeScript.

The **Checker** performs type checking.

Example:

```ts
function greet(name: string) {
  return `Hello ${name}`;
}

greet(123);
```

Checker sees:

```text
Expected: string
Received: number
```

Error:

```text
Argument of type 'number'
is not assignable to parameter of type 'string'
```

This is why TypeScript exists.

The checker:

* Checks parameter types
* Checks return types
* Checks interfaces
* Checks generics
* Checks inheritance
* Performs type inference

---

# 7. Syntax Check / Short Circuit

If TypeScript finds serious errors:

```ts
function greet(
```

it may stop further processing because the code is incomplete.

That's what the "Syntax Check / Short Circuit" box represents.

---

# 8. Emitter

After type checking succeeds, the **Emitter** generates output files.

Your TypeScript:

```ts
function greet(name: string): string {
  return `Hello ${name}`;
}
```

becomes:

```js
function greet(name) {
  return `Hello ${name}`;
}
```

Notice:

```ts
: string
```

disappears.

Type information exists only during development.

---

# 9. Output Files

The emitter can generate:

### `.js`

JavaScript that Node.js or browsers run.

```js
function greet(name) {
  return `Hello ${name}`;
}
```

---

### `.d.ts`

Declaration files.

Example:

```ts
declare function greet(name: string): string;
```

Libraries publish these so users get type information.

---

### `.map`

Source maps.

They connect:

```text
Generated JS
      ↕
Original TS
```

So when debugging in Chrome DevTools or VS Code, you can see your original TypeScript instead of generated JavaScript.

---

# The Entire Flow

```text
TS Code
   ↓
Lexer
   ↓
Parser
   ↓
AST
   ↓
Binder
   ↓
Symbol Tables
   ↓
Checker
   ↓
Emitter
   ↓
.js
.d.ts
.map
```

### Why this matters

When you write:

```ts
function greet(name: string): string
```

the **Checker** uses the AST and Symbol Tables to verify:

* `name` must be a string
* return value must be a string

After verification, the **Emitter** removes the type annotations and outputs plain JavaScript.

That's why people often say:

> TypeScript is essentially a powerful static analysis and type-checking system that runs before JavaScript is generated. The browser never sees the types—it only sees the emitted JavaScript.

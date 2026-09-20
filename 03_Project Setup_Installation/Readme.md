# Installing TypeScript :

### Global Installation

```bash
npm install -g typescript
```

This installs `tsc` globally, so you can run:

```bash
tsc --version
tsc app.ts
```

from anywhere on your computer.

---

### Project-wise Installation (Recommended)

Inside a project:

```bash
npm install --save-dev typescript
```

TypeScript is added to `devDependencies` because it is needed during development, not at runtime.

Example `package.json`:

```json
{
  "devDependencies": {
    "typescript": "^5.x.x"
  }
}
```

---

## 2. TypeScript Can Be Used Anywhere

TypeScript is not tied to Node.js.

You can use it with:

* Node.js
* React
* Next.js
* NestJS
* Angular
* Vue
* Express
* Fastify

Basically, any JavaScript project can use TypeScript.

---

## 3. Type Definitions (`@types/...`)

JavaScript libraries often don't include type information.

So the community provides type packages.

For Node.js:

```bash
npm install --save-dev @types/node
```

This gives TypeScript knowledge of:

```ts
console.log()
process
fs
path
Buffer
```

Similarly:

```bash
npm install --save-dev @types/react
```

provides React type definitions.

---

## 4. Running the Local TypeScript Compiler

When TypeScript is installed locally:

```text
node_modules/
  .bin/
    tsc
```

The compiler exists inside your project.

Instead of installing globally, you can run it using:

```bash
npx tsc
```

`npx` temporarily executes:

```text
./node_modules/.bin/tsc
```

---

## 5. Initializing a TypeScript Project

Run:

```bash
npx tsc --init
```

TypeScript creates:

```text
tsconfig.json
```

Example:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs"
  }
}
```

This file tells TypeScript:

* Which JavaScript version to generate
* Which module system to use
* Strictness rules
* Output folder
* Source folder
* And many other compiler settings

---

## 6. Compiling TypeScript

Suppose you have:

```ts
function greet(name: string): string {
  return `Hello ${name}`;
}
```

Run:

```bash
npx tsc
```

TypeScript:

```text
TS File
   ↓
Lexer
   ↓
Parser
   ↓
AST
   ↓
Checker
   ↓
Emitter
   ↓
JS File
```

Generated JavaScript:

```js
function greet(name) {
  return `Hello ${name}`;
}
```

---

## Typical Setup Flow

```bash
mkdir my-project
cd my-project

npm init -y

npm install --save-dev typescript (npm i -D typescript)

npx tsc --init

npm install --save-dev @types/node
```

Now your project is ready for TypeScript development.

A concise summary is:

> We install TypeScript as a dev dependency inside a project. `npx tsc` runs the local TypeScript compiler from `node_modules`, and `npx tsc --init` creates a `tsconfig.json` file that configures how TypeScript checks code and emits JavaScript.


# The scripts section in `package.json`

Your scripts:

```json
"scripts": {
  "start": "node dist/index.js",
  "dev": "npx tsc"
}
```

---

### `npm run dev`

Runs:

```bash
npx tsc
```

This tells TypeScript:

> Compile all `.ts` files according to `tsconfig.json`.

Example:

```text
src/index.ts
      ↓
npx tsc
      ↓
dist/index.js
```

However, this only **compiles** the code. It does **not** run your application.

---

### `npm start`

Runs:

```bash
node dist/index.js
```

This executes the generated JavaScript file.

Example flow:

```text
src/index.ts
      ↓
npm run dev
      ↓
dist/index.js
      ↓
npm start
      ↓
Program runs
```

---

### Typical Workflow

After changing your TypeScript code:

```bash
npm run dev
```

Compile TS → JS

Then:

```bash
npm start
```

Run the generated JavaScript.

---

### A common improvement

Many developers use watch mode:

```json
"scripts": {
  "dev": "tsc --watch",
  "start": "node dist/index.js"
}
```

Now:

```bash
npm run dev
```

keeps TypeScript watching your files and recompiles automatically whenever you save.

---

### Even better for development

Install:

```bash
npm install -D tsx
```

Then:

```json
"scripts": {
  "dev": "tsx src/index.ts"
}
```

Now you can run:

```bash
npm run dev
```

and TypeScript files execute directly in development without manually running `tsc` and then `node`.

For learning TypeScript, your current setup is actually good because it helps you clearly see the two separate steps:

```text
TypeScript (.ts)
       ↓
tsc compiler
       ↓
JavaScript (.js)
       ↓
Node.js executes
```

# Property Binding in Angular :

In Angular, **property binding** lets you set a property of an HTML element, component, or directive using a value from your component class.

### Basic syntax

```html
[property]="expression"
```

For example:

```ts
export class AppComponent {
  imageUrl = 'assets/profile.png';
  isDisabled = true;
}
```

```html
<img [src]="imageUrl">
<button [disabled]="isDisabled">Submit</button>
```

Angular evaluates the expression on the right and assigns the result to the property on the left.

### Property binding vs interpolation

These often look similar:

```html
<img src="{{ imageUrl }}">
<img [src]="imageUrl">
```

Both can work, but property binding is especially useful for **non-string values**:

```html
<button [disabled]="isDisabled">Save</button>
```

Here `isDisabled` is a boolean, not the string `"true"` or `"false"`.

### Common examples

```html
<!-- DOM properties -->
<input [value]="username">
<button [disabled]="loading">Submit</button>

<!-- CSS class -->
<div [class.active]="isActive">...</div>

<!-- Style -->
<div [style.width.px]="width">...</div>

<!-- Component input -->
<app-user [user]="selectedUser"></app-user>
```

For the last example, if `app-user` has an input:

```ts
@Input() user!: User;
```

Angular passes `selectedUser` from the **parent component → child component**.

A useful way to remember it is:

**`[ ]` = data flows from TypeScript → template/child**

By comparison:

```html
<button (click)="save()">Save</button>
```

**`( )` = events flow from template → TypeScript**

And:

```html
<input [(ngModel)]="username">
```

**`[( )]` = two-way binding**.


# Example-1 Explanation :

Yes — these two forms can **look similar**, but Angular treats them differently.

## 1. `[src]` — Property Binding

```html
<img [src]="imageUrl">
```

Here Angular directly sets the **DOM `src` property**.

If your TypeScript has:

```typescript
imageUrl = "photo.jpg";
```

Angular effectively does:

```text
img.src = imageUrl
```

So this is the proper **property binding** syntax.

---

## 2. `src={{imageUrl}}` — Interpolation

```html
<img src={{imageUrl}}>
```

Here you're using **interpolation**.

Angular first converts the value into **text** and puts that text into the `src` attribute.

You can think of it roughly as:

```html
<img src="photo.jpg">
```

### For `src`, both usually appear to work

So:

```html
<img [src]="imageUrl">
```

and:

```html
<img src="{{imageUrl}}">
```

will normally produce the same visible result.

But they are **not conceptually the same**:

|                | Property Binding         | Interpolation        |
| -------------- | ------------------------ | -------------------- |
| Syntax         | `[src]="imageUrl"`       | `src="{{imageUrl}}"` |
| Purpose        | Set a property           | Insert text          |
| Value handling | Property value           | String/text          |
| Best for       | DOM/component properties | Displaying text      |

---

## Now your `disabled` example is more interesting

You have:

```html
<button [disabled]="isDisabled">
  Submit
</button>
```

versus:

```html
<button disabled={{isDisabled}}>
  Submit
</button>
```

Suppose:

```typescript
isDisabled = false;
```

### Property binding

```html
<button [disabled]="isDisabled">
```

Angular sees:

```text
isDisabled = false
        ↓
button.disabled = false
```

So the button is **enabled**.

---

### Interpolation

```html
<button disabled={{isDisabled}}>
```

Angular is dealing with the value as **text**.

Conceptually:

```html
<button disabled="false">
```

And this is where the problem occurs.

For a boolean HTML attribute like `disabled`, the **presence of the attribute itself** means disabled.

So:

```html
<button disabled="false">
```

can still be **disabled**.

That's why you should **not use interpolation for boolean properties like `disabled`**.

---

## 🔥 This is the key difference

Think of it this way:

### Interpolation

> "Give me some **text**."

```html
<p>{{ username }}</p>
<img src="{{ imageUrl }}">
```

### Property binding

> "Set this **property** to this actual value."

```html
<button [disabled]="isDisabled">
<input [value]="username">
<img [src]="imageUrl">
```

---

## Easy rule for your Angular learning

If you're setting a **DOM property**, especially a boolean or non-string value:

```html
[property]="expression"
```

Examples:

```html
<button [disabled]="isDisabled">
<input [readonly]="isReadOnly">
<input [value]="age">
<img [src]="imageUrl">
```

If you're simply putting a value into **text**, use interpolation:

```html
<h2>{{ productName }}</h2>
<p>{{ price }}</p>
```

### One sentence to remember

> **Interpolation is mainly for putting values into text; property binding is for assigning values directly to properties.**


# Example-2 Explanatin and Challanges :

Yes. Your observation is correct, and there's an important Angular concept behind it.

The key is that **property binding and change detection are two different things**.

## 1. Your normal property-binding version

You have:

```typescript
isLoading = false;
buttonText = 'Login';
```

and:

```html
<button
  [disabled]="isLoading"
  (click)="handleLogin()"
>
  {{ buttonText }}
</button>
```

When you click:

```typescript
handleLogin() {
  this.isLoading = true;
  this.buttonText = 'Logging in...';
}
```

It works.

Why?

Because the click came through Angular:

```text
(click)
   ↓
handleLogin()
   ↓
properties change
   ↓
Angular knows an Angular event happened
   ↓
Angular runs change detection
   ↓
HTML is updated
```

So the UI changes to:

```text
Logging in...
[disabled]
```

---

## 2. Now add `setTimeout`

You do:

```typescript
setTimeout(() => {
  this.isLoading = false;
  this.buttonText = 'Login Successful';
}, 3000);
```

The property values **really do change**.

You've already proved that with:

```text
this.isLoading false
this.buttonText Login Successful
```

But your UI remains:

```text
Logging in...
```

This means:

> **The JavaScript value changed, but Angular didn't run the change-detection pass that updates this template.**

That's why pressing `Ctrl + S` suddenly makes the UI correct.

---

## 3. Why does `setTimeout()` cause this in your Angular 21 project?

Your project is using Angular's newer **zoneless change-detection approach**.

The important idea is:

### Normal JavaScript

```typescript
setTimeout(() => {
  this.buttonText = 'Login Successful';
}, 3000);
```

JavaScript knows:

> "The variable changed."

But Angular needs to know:

> "The template that uses this variable needs to be checked again."

With your normal property:

```typescript
buttonText = 'Login';
```

Angular doesn't have a reactive notification attached to the property itself.

So:

```text
buttonText changes
       ↓
JavaScript knows
       ↓
Angular isn't necessarily notified
       ↓
UI stays unchanged
```

---

## 4. Why does the Signal version work?

You changed:

```typescript
buttonText = 'Login';
```

to:

```typescript
buttonText = signal('Login');
```

Now when you do:

```typescript
this.buttonText.set('Login Successful');
```

you're not simply changing a JavaScript variable.

You're changing **Angular reactive state**.

Angular knows that the signal is being used here:

```html
{{ buttonText() }}
```

So when:

```typescript
this.buttonText.set('Login Successful');
```

happens, Angular knows:

> "The signal used by this template changed. I need to update this part of the UI."

The flow becomes:

```text
setTimeout()
    ↓
buttonText.set(...)
    ↓
Signal changes
    ↓
Angular knows the template depends on this signal
    ↓
Change detection/update
    ↓
UI changes
```

---

## 5. The most important distinction

This is the part I want you to remember.

### Property binding

```html
[disabled]="isLoading"
```

answers:

> **"How does Angular put my component value into the HTML?"**

It does **not** itself answer:

> "When should Angular check my component?"

---

### Signal

```typescript
isLoading = signal(false);
```

provides **reactive state** that Angular can track.

So:

```typescript
this.isLoading.set(false);
```

helps Angular know that the state used by the template changed.

---

## 6. Why does removing `setTimeout()` make your property version work?

This is the most important part of your question.

When you have:

```typescript
handleLogin() {
  this.isLoading = true;
  this.buttonText = 'Logging in...';
}
```

the entire operation happens during:

```text
Angular click event
       ↓
handleLogin()
       ↓
property changes
       ↓
Angular's event-driven change detection
       ↓
UI updates
```

There is no asynchronous boundary.

But when you have:

```typescript
handleLogin() {

  this.isLoading = true;
  this.buttonText = 'Logging in...';

  setTimeout(() => {

    this.isLoading = false;
    this.buttonText = 'Login Successful';

  }, 3000);
}
```

you have two separate moments:

### First moment

```text
Angular click
    ↓
handleLogin()
    ↓
isLoading = true
buttonText = "Logging in..."
    ↓
Angular updates UI
```

### Second moment — 3 seconds later

```text
setTimeout callback
    ↓
isLoading = false
buttonText = "Login Successful"
```

Your values change, but in your **zoneless Angular setup**, those plain-property changes aren't themselves a reactive notification.

That's why your UI doesn't update.

---

## 7. Think of it with a simple analogy

Imagine Angular is a person watching a whiteboard.

You have:

```text
isLoading = true
```

Angular looks at the whiteboard and updates the UI.

Then `setTimeout()` comes along and changes the whiteboard:

```text
isLoading = false
```

But nobody tells Angular:

> "Hey, the whiteboard changed."

So Angular doesn't necessarily look again.

With a signal:

```typescript
isLoading.set(false);
```

it's like the whiteboard has a notification system:

> **"Angular! This value changed!"**

Angular checks the template and updates the UI.

---

## 8. One more important correction

It's not accurate to say:

> **"Property binding doesn't work with setTimeout."**

Your property binding **does work**.

This:

```html
[disabled]="isLoading"
```

is perfectly valid.

The problem is:

```typescript
this.isLoading = false;
```

doesn't automatically guarantee a UI refresh in your particular **zoneless Angular configuration**.

So there are two separate concepts:

```text
                 Angular
                    │
        ┌───────────┴───────────┐
        ↓                       ↓
 Property Binding          Change Detection
        │                       │
 [disabled]="isLoading"    When should Angular
                           update the template?
```

Your property binding is fine.

The issue is **how Angular knows that the plain property changed asynchronously**.

---

## 9. Why Signals are becoming important in modern Angular

This is one reason Angular's modern code increasingly uses:

```typescript
isLoading = signal(false);
```

instead of:

```typescript
isLoading = false;
```

Then asynchronous operations become very natural:

```typescript
setTimeout(() => {
  this.isLoading.set(false);
}, 3000);
```

And the template:

```html
<button [disabled]="isLoading()">
  {{ buttonText() }}
</button>
```

Angular can track the relationship:

```text
isLoading signal
      ↓
used by template
      ↓
signal changes
      ↓
Angular knows
      ↓
UI updates
```

---

## 🧠 Final mental model

Don't combine these three concepts:

### **1. Property binding**

```html
[disabled]="isLoading"
```

**"Put this component value into this element property."**

### **2. Normal property**

```typescript
isLoading = false;
```

**"This is just a JavaScript/TypeScript class property."**

### **3. Signal**

```typescript
isLoading = signal(false);
```

**"This is reactive state that Angular can track."**

And your experiment demonstrates the difference perfectly:

```text
Normal property + click
        ↓
       WORKS
because Angular handles the click/change detection


Normal property + setTimeout
        ↓
       YOUR UI DOESN'T REFRESH
because the async plain-property mutation isn't notifying
your zoneless Angular change detection


Signal + setTimeout
        ↓
       WORKS
because the signal mutation notifies Angular
```

So **you were right to notice that removing `setTimeout()` makes the original version work**. That observation is exactly what exposes the difference between **property binding** and **reactive state/change detection**.


# The easiest way to decide Interpolation or data binding :

Yes — this is a very common Angular question. The easiest way to decide is:

> **If you are putting text into HTML, use interpolation.**
> **If you are controlling an HTML property/behavior, use property binding.**

### 1. Interpolation `{{ }}` → mainly for displaying text

Suppose your component has:

```ts
export class AppComponent {
  username = 'Moaz';
  age = 25;
}
```

You want to **show these values**:

```html
<h1>Hello {{ username }}</h1>
<p>Your age is {{ age }}</p>
```

Here you're basically saying:

> "Angular, put this value into my HTML text."

So use **interpolation**.

---

### 2. Property binding `[ ]` → when you want to control a property

Suppose:

```ts
export class AppComponent {
  isDisabled = true;
  imageUrl = 'profile.jpg';
}
```

You want to control the button's `disabled` property:

```html
<button [disabled]="isDisabled">
  Login
</button>
```

Or control the image's `src` property:

```html
<img [src]="imageUrl">
```

Here you're saying:

> "Angular, set this DOM property's value."

So use **property binding**.

---

### The important difference

Consider this:

```html
<button disabled="{{ isDisabled }}">
```

versus:

```html
<button [disabled]="isDisabled">
```

With interpolation, Angular is essentially dealing with **text/string representation**.

With property binding:

```html
[disabled]="isDisabled"
```

Angular assigns the actual **boolean value** to the DOM property.

For example:

```ts
isDisabled = false;
```

Property binding:

```html
<button [disabled]="isDisabled">
```

means roughly:

```text
button.disabled = false
```

That's why property binding is the appropriate choice when you're controlling behavior/properties.

---

### A simple rule to remember

| What you want to do            | Use           |
| ------------------------------ | ------------- |
| Display text                   | `{{ }}`       |
| Display a variable inside text | `{{ }}`       |
| Set `src`                      | `[src]`       |
| Set `disabled`                 | `[disabled]`  |
| Set `value`                    | `[value]`     |
| Set CSS/style properties       | `[style...]`  |
| Set classes                    | `[class...]`  |
| Pass data to a child component | `[inputName]` |

### Think of it like this

```text
        TypeScript
            │
            │
       ┌────┴─────┐
       │          │
       ▼          ▼
   "Show this"  "Control this"
       │          │
       ▼          ▼
  {{ username }} [disabled]="isDisabled"
  {{ price }}    [src]="imageUrl"
```

So when you're writing Angular templates, ask yourself:

**"Am I displaying a value as text?"** → `{{ }}`

**"Am I setting/controling something's property?"** → `[ ]`

One more important point: **interpolation can sometimes be used with properties too**, so the two can appear interchangeable in simple cases. The key distinction is that **property binding preserves the value's type and directly targets the property**, which makes it the right tool for booleans, objects, arrays, etc.
































## 1. What is a Signal?

A **signal is a wrapper around a value that Angular can track for changes.**

For example:

```ts
import { signal } from '@angular/core';

const firstName = signal('Morgan');
```

Here:

```ts
firstName
```

is **not directly the string `"Morgan"`**.

It is a **Signal object/function that holds `"Morgan"`**.

Think of it like:

```text
Signal
 └── value → "Morgan"
```

---

## 2. How do I read a Signal?

You read a signal by **calling it like a function**:

```ts
console.log(firstName());
```

Output:

```text
Morgan
```

So:

```ts
firstName
```

means → the signal itself

while:

```ts
firstName()
```

means → the value stored inside the signal.

### Important for interviews

> **A signal is read by calling it as a function.**

---

## 3. How do I change its value?

Angular provides the `.set()` method:

```ts
firstName.set('Jaime');
```

Now:

```ts
console.log(firstName());
```

gives:

```text
Jaime
```

So the flow is:

```text
const firstName = signal('Morgan');

             ↓

       Signal
       ┌─────────┐
       │ Morgan  │
       └─────────┘

firstName.set('Jaime');

             ↓

       Signal
       ┌─────────┐
       │ Jaime   │
       └─────────┘
```

---

## 4. What is `update()`?

`update()` is useful when the new value depends on the **previous value**.

Example:

```ts
const firstName = signal('Morgan');

firstName.update((name) => name.toUpperCase());
```

Here Angular gives the current value to the callback:

```ts
name = "Morgan"
```

Then:

```ts
name.toUpperCase()
```

returns:

```text
MORGAN
```

So the signal becomes:

```text
Morgan
   ↓
MORGAN
```

### Difference between `set()` and `update()`

```ts
firstName.set('Jaime');
```

You directly provide the new value.

```ts
firstName.update((name) => name.toUpperCase());
```

You calculate the new value using the existing value.

---

## 5. Why do we need Signals?

This is the most important part of the documentation.

Angular **tracks where a signal is being read**.

Suppose your component has:

```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <h1>Hello {{ firstName() }}</h1>
  `
})
export class UserComponent {

  firstName = signal('Morgan');

}
```

Initially Angular sees:

```text
firstName()
     ↓
"Morgan"
     ↓
DOM
     ↓
Hello Morgan
```

Now suppose:

```ts
this.firstName.set('Jaime');
```

Angular knows:

> "The template is using `firstName()`, and that signal has changed."

So Angular can update the relevant DOM:

```text
Hello Morgan
       ↓
Signal changes
       ↓
Hello Jaime
```

This is what Angular means by **reactivity**.

---

## 6. What does "reactivity" mean?

In simple terms:

> **Reactivity means that when some state changes, Angular can automatically respond to that change and update the places that depend on it.**

Think:

```text
Signal changes
      ↓
Angular detects the change
      ↓
Angular knows where the signal was used
      ↓
Angular updates the affected UI
```

That's the core idea.

---

## 7. Connection with what you already learned

You were learning Angular **interpolation** earlier.

For example:

```html
<h1>{{ title }}</h1>
```

With Signals, you'll commonly see:

```html
<h1>{{ title() }}</h1>
```

Why the `()`?

Because `title` is now a signal.

```ts
title = signal('My Angular App');
```

So:

```html
{{ title() }}
```

means:

> "Read the current value from the `title` signal."

---

## Interview perspective

If an interviewer asks:

**"What is a Signal in Angular?"**

You can answer:

> **A Signal is a reactive wrapper around a value that Angular uses to track state changes. We can read a signal by calling it as a function, and we can update it using methods like `set()` and `update()`. Angular tracks where signals are read and can reactively update the UI when their values change.**

And remember these three:

```ts
signal()   // create
set()      // replace value
update()   // update based on previous value
```

Example:

```ts
count = signal(0);

count();                         // read → 0
count.set(10);                   // set → 10
count.update(value => value + 1); // update → 11
```

That is essentially the foundation of Angular Signals.

Exactly. This section introduces **`computed()`**, which becomes very easy once you understand normal signals.

## 1. What is a `computed` signal?

A **computed signal is a signal whose value is calculated from other signals.**

For example:

```ts
import { signal, computed } from '@angular/core';

const firstName = signal('Morgan');

const firstNameCapitalized = computed(
  () => firstName().toUpperCase()
);
```

Here we have two signals:

```text
firstName
   ↓
"Morgan"

        ↓ computed()

firstNameCapitalized
   ↓
"MORGAN"
```

So you can think of `computed()` as:

> **"Create a value that automatically derives itself from other signals."**

---

## 2. Why is `firstName()` inside `computed()`?

Look carefully:

```ts
const firstNameCapitalized = computed(
  () => firstName().toUpperCase()
);
```

The important part is:

```ts
firstName()
```

Angular sees that `firstNameCapitalized` **depends on `firstName`**.

So Angular creates this relationship:

```text
firstName
   │
   │ changes
   ↓
computed()
   │
   │ recalculates
   ↓
firstNameCapitalized
```

For example:

```ts
console.log(firstNameCapitalized());
```

Output:

```text
MORGAN
```

---

## 3. What happens when the original signal changes?

Suppose:

```ts
firstName.set('Jaime');
```

Now Angular knows:

```text
firstName
"Morgan"
   ↓
set("Jaime")
   ↓
"Jaime"
```

Because `firstNameCapitalized` depends on `firstName`, its value automatically becomes:

```text
JAIME
```

Therefore:

```ts
console.log(firstNameCapitalized());
```

outputs:

```text
JAIME
```

You **don't manually update** `firstNameCapitalized`.

That's the important part.

---

## 4. `computed` is read-only

This is a very important difference.

Normal signal:

```ts
const firstName = signal('Morgan');

firstName.set('Jaime');
```

Works.

But:

```ts
const firstNameCapitalized =
  computed(() => firstName().toUpperCase());
```

You **cannot** do:

```ts
firstNameCapitalized.set('HELLO');
```

or:

```ts
firstNameCapitalized.update(...);
```

because a computed signal is **read-only**.

Why?

Because its value is determined by:

```ts
firstName()
```

and:

```ts
firstName().toUpperCase()
```

You don't directly control the computed value.

Instead, you change the **source signal**:

```ts
firstName.set('Jaime');
```

and the computed value changes automatically.

---

## 5. Think of it like a formula

This is probably the easiest way to understand `computed`.

Suppose:

```ts
const price = signal(100);

const priceWithTax = computed(() => price() * 1.18);
```

Think of:

```text
price = 100

priceWithTax = price × 1.18
             = 118
```

Now:

```ts
price.set(200);
```

Automatically:

```text
price = 200

priceWithTax = 200 × 1.18
             = 236
```

You don't write:

```ts
priceWithTax.set(236); ❌
```

Angular calculates it for you.

---

## 6. Real Angular example

Imagine a shopping cart:

```ts
cartItems = signal(5);

pricePerItem = signal(100);

totalPrice = computed(() =>
  cartItems() * pricePerItem()
);
```

Initially:

```text
cartItems = 5
pricePerItem = 100

totalPrice = 5 × 100
           = 500
```

Now:

```ts
cartItems.set(10);
```

Angular automatically recalculates:

```text
10 × 100 = 1000
```

And:

```ts
console.log(totalPrice());
```

gives:

```text
1000
```

---

## 7. One `computed` can depend on multiple signals

This is another important concept.

```ts
const quantity = signal(2);
const price = signal(500);

const total = computed(() =>
  quantity() * price()
);
```

Here:

```text
quantity ─────┐
              ↓
           computed()
              ↓
price ────────┘
              ↓
            total
```

Angular tracks **both** `quantity` and `price`.

If either changes:

```ts
quantity.set(3);
```

or:

```ts
price.set(600);
```

the `total` value is recalculated.

---

## 8. Signal vs Computed Signal

| Normal Signal       | Computed Signal          |
| ------------------- | ------------------------ |
| Stores state        | Derives state            |
| Can change directly | Cannot change directly   |
| Has `set()`         | No `set()`               |
| Has `update()`      | No `update()`            |
| `signal(100)`       | `computed(() => ...)`    |
| Source of data      | Depends on other signals |

### Simple rule to remember

> **`signal()` → I own/change this value.**
> **`computed()` → I calculate this value from other signals.**

For example:

```ts
const firstName = signal('Morgan'); // I control this

const capitalized = computed(
  () => firstName().toUpperCase()
); // Angular derives this
```

### The mental model

```text
             SOURCE SIGNALS
          ┌──────────────────┐
          │ quantity = 2     │
          │ price = 500      │
          └────────┬─────────┘
                   │
                   ↓
              computed()
                   │
                   ↓
             total = 1000
                   │
                   ↓
                  UI
```

So the key idea from this Angular section is:

**A `computed()` signal is derived/read-only state that automatically recalculates when the signals it depends on change.**


## Important Conept Related to computed() :

This section adds **three important concepts** to what you already learned about `computed()`:

1. **Lazy evaluation**
2. **Memoization (caching)**
3. **Dynamic dependencies**

Let's understand them with simple examples.

---

## 1. Computed signal = derived state

First:

```ts
const count: WritableSignal<number> = signal(0);

const doubleCount: Signal<number> = computed(() => count() * 2);
```

Here:

```text
count
  ↓
  0
  ↓
computed(() => count() * 2)
  ↓
doubleCount
  ↓
  0
```

`count` is a **writable signal**:

```ts
count.set(10);
```

`doubleCount` is a **read-only computed signal**:

```ts
doubleCount(); // 20
```

You cannot do:

```ts
doubleCount.set(20); // ❌
```

---

## 2. Lazy evaluation

This is the first new concept.

Look at:

```ts
const count = signal(0);

const doubleCount = computed(() => {
  console.log('computed executed');

  return count() * 2;
});
```

At this point:

```ts
const doubleCount = computed(...);
```

Angular **doesn't immediately execute**:

```ts
count() * 2
```

Why?

Because nobody has asked for the value yet.

So:

```ts
console.log('computed executed');
```

hasn't necessarily run.

That's what **lazy evaluation** means.

> **The computed derivation doesn't execute until the computed signal is actually read.**

For example:

```ts
console.log(doubleCount());
```

Now Angular needs the value, so it executes:

```text
doubleCount()
     ↓
computed function runs
     ↓
count() * 2
     ↓
0
```

---

## 3. Memoization = caching the result

Now suppose:

```ts
const count = signal(10);

const doubleCount = computed(() => {
  console.log('Calculating...');

  return count() * 2;
});
```

First time:

```ts
console.log(doubleCount());
```

Angular calculates:

```text
10 × 2 = 20
```

and caches:

```text
doubleCount cache
       ↓
      20
```

Now suppose you do:

```ts
console.log(doubleCount());
console.log(doubleCount());
console.log(doubleCount());
```

Angular doesn't need to execute:

```ts
count() * 2
```

three times.

Instead:

```text
First read
   ↓
Calculate → 20
   ↓
Cache 20

Second read
   ↓
Return cached 20

Third read
   ↓
Return cached 20
```

That's **memoization**.

> **Memoization means Angular remembers the previously calculated result and reuses it until its dependencies change.**

---

## 4. What happens when `count` changes?

Suppose:

```ts
const count = signal(10);

const doubleCount = computed(() => count() * 2);
```

You read it:

```ts
doubleCount();
```

Result:

```text
20
```

Angular caches `20`.

Now:

```ts
count.set(20);
```

Angular knows:

```text
count changed
     ↓
doubleCount depends on count
     ↓
old cached value is invalid
```

Notice something important:

**Angular doesn't necessarily calculate `doubleCount` immediately.**

The cache is simply considered **invalid/stale**.

Then when you read:

```ts
doubleCount();
```

Angular calculates again:

```text
20 × 2
   ↓
40
```

and caches `40`.

So:

```text
count changes
     ↓
cache becomes invalid
     ↓
wait until doubleCount is read
     ↓
calculate again
     ↓
cache new value
```

This combines **lazy evaluation + memoization**.

---

## 5. Why is this useful?

Imagine an expensive calculation:

```ts
const filteredProducts = computed(() => {
  return products().filter(product =>
    product.price > 1000
  );
});
```

Suppose there are 10,000 products.

You don't want Angular to repeatedly run:

```ts
products().filter(...)
```

every time you read `filteredProducts`.

Instead:

```text
First read
    ↓
Filter 10,000 products
    ↓
Cache result

Next read
    ↓
Use cached result
```

Only when `products` changes does Angular invalidate the cached result.

That's why Angular says you can safely perform **computationally expensive derivations** inside computed signals.

---

## 6. Now the interesting part: Dynamic dependencies

This is probably the most important concept in this section.

Consider:

```ts
const showCount = signal(false);
const count = signal(0);

const conditionalCount = computed(() => {
  if (showCount()) {
    return `The count is ${count()}.`;
  } else {
    return 'Nothing to see here!';
  }
});
```

There are two signals:

```text
showCount
count
```

But Angular does **not automatically assume that `conditionalCount` always depends on both**.

Instead:

> Angular tracks the signals that are **actually read during the execution of the computed function**.

---

## 7. Initially `showCount = false`

We have:

```ts
showCount = false;
count = 0;
```

Now:

```ts
conditionalCount();
```

The computed function executes:

```ts
if (showCount()) {
```

Angular reads:

```ts
showCount()
```

which is `false`.

So it goes here:

```ts
return 'Nothing to see here!';
```

It **never executes**:

```ts
count()
```

Therefore Angular's dependency tracking becomes:

```text
conditionalCount
       │
       ↓
   showCount
```

There is **no dependency on `count` yet**.

---

## 8. Now change `count`

Suppose:

```ts
count.set(10);
```

Does `conditionalCount` need to recalculate?

**No.**

Why?

Because at the moment its dependency list is:

```text
conditionalCount
       ↓
   showCount
```

`count` isn't a dependency.

So:

```text
count changes
     ↓
conditionalCount
     ↓
No recomputation
```

This is what Angular means by:

> **Only signals actually read during the derivation are tracked.**

---

## 9. Now change `showCount`

Suppose:

```ts
showCount.set(true);
```

Now `conditionalCount` is invalidated because:

```text
conditionalCount
       ↓
   showCount
```

Then we read it:

```ts
conditionalCount();
```

The computed function executes again:

```ts
if (showCount()) {
    return `The count is ${count()}.`;
}
```

Now `showCount()` is `true`.

So Angular executes:

```ts
count()
```

Therefore the dependency list becomes:

```text
conditionalCount
       │
       ├────→ showCount
       │
       └────→ count
```

Now Angular knows that `conditionalCount` depends on **both**.

---

## 10. Now changing `count` matters

Suppose:

```ts
count.set(20);
```

This time:

```text
count changes
     ↓
conditionalCount depends on count
     ↓
conditionalCount becomes invalid
```

Then:

```ts
conditionalCount();
```

recalculates:

```text
"The count is 20."
```

---

## 11. Dependencies can also be removed

This is the part that often confuses beginners.

Suppose currently:

```text
showCount = true
```

So dependencies are:

```text
conditionalCount
   ├── showCount
   └── count
```

Now:

```ts
showCount.set(false);
```

Read the computed again:

```ts
conditionalCount();
```

The computation goes through:

```ts
if (showCount()) {
    // not executed
} else {
    return 'Nothing to see here!';
}
```

`count()` is no longer read.

Therefore Angular removes `count` from the dependency list:

```text
conditionalCount
       ↓
   showCount
```

`count` is no longer a dependency.

So later:

```ts
count.set(100);
```

will **not** invalidate `conditionalCount`.

---

## 12. Complete picture

You can visualize the dependency changing dynamically:

### Initially

```text
showCount = false

conditionalCount
       ↓
   showCount
```

`count` isn't read.

---

### After `showCount = true`

```text
conditionalCount
       ├──→ showCount
       └──→ count
```

Now both are dependencies.

---

### After `showCount = false` again

```text
conditionalCount
       ↓
   showCount
```

`count` is removed as a dependency.

---

## 13. The key rule

Remember this sentence:

> **Angular tracks dependencies based on which signals are actually read during the latest execution of the computed function.**

Not:

> "Every signal mentioned somewhere inside the function is always a dependency."

Instead:

```text
Signal is actually READ
        ↓
Angular tracks it
```

If a branch doesn't execute:

```ts
if (false) {
    count();
}
```

then `count()` isn't read, so `count` isn't tracked for that execution.

---

## 14. Interview-ready summary

If you're asked **"What are the characteristics of computed signals in Angular?"**, remember these four points:

### ① Read-only

```ts
const double = computed(() => count() * 2);

double.set(10); // ❌
```

A computed signal cannot be directly modified.

### ② Lazy

```ts
computed(() => ...)
```

doesn't need to execute its derivation until the computed value is actually read.

### ③ Memoized

Once calculated:

```text
calculated value
      ↓
    cached
```

Repeated reads use the cached value until a dependency changes.

### ④ Dynamic dependencies

Angular tracks the signals **actually read** during the latest derivation.

```text
computed()
   ↓
which signals did I actually read?
   ↓
track those signals
```

And those dependencies can be **added or removed** when the computed function executes again.

### One-line mental model

> **`signal()` stores state, while `computed()` derives and caches state from the signals it actually reads.**


# 1. What is an Effect?

An Angular `effect()` is basically:

> **“Watch these signals, and whenever they change, run this code.”**

For example:

```ts
username = signal('Harry');

constructor() {
  effect(() => {
    console.log(this.username());
  });
}
```

Here Angular sees that the effect is reading:

```ts
this.username()
```

So Angular remembers:

> “This effect depends on `username`.”

Therefore:

```ts
username.set('John');
```

causes the effect to run again.

### Think of it like a security guard 👮

```text
username signal
      ↓
   [ WATCH ]
      ↓
    effect()
      ↓
console.log(...)
```

The effect doesn't calculate a value for you. It **does something**.

---

# 2. Effect vs Signal vs Computed

This distinction is very important.

### Signal

Stores a value:

```ts
count = signal(10);
```

```text
count → 10
```

### Computed

Calculates another value:

```ts
doubleCount = computed(() => this.count() * 2);
```

```text
count → computed → doubleCount
  10                20
```

### Effect

Performs an action:

```ts
effect(() => {
  console.log(this.count());
});
```

```text
count
  ↓
effect
  ↓
console.log()
```

So:

| Feature      | Purpose               |
| ------------ | --------------------- |
| `signal()`   | Store/change data     |
| `computed()` | Derive/calculate data |
| `effect()`   | Perform a side effect |

A simple way to remember:

> **Signal = Data**
> **Computed = Calculation**
> **Effect = Action**

---

# 3. Why doesn't Effect return a value?

Suppose:

```ts
count = signal(5);

doubleCount = computed(() => this.count() * 2);
```

You can do:

```ts
console.log(this.doubleCount());
```

because `computed()` produces a value.

But:

```ts
effect(() => {
  console.log(this.count());
});
```

isn't meant to produce another value.

Its purpose is to **do something**.

For example:

```ts
effect(() => {
  localStorage.setItem(
    'count',
    this.count().toString()
  );
});
```

Here the purpose isn't to calculate a value.

The purpose is:

> Whenever `count` changes → save it to localStorage.

That's a **side effect**.

---

# 4. What does "side effect" mean?

A side effect means:

> Something your code does that affects something outside the reactive calculation.

For example:

```ts
effect(() => {
  console.log(this.count());
});
```

`console.log()` is a side effect.

Another example:

```ts
effect(() => {
  localStorage.setItem(
    'count',
    this.count().toString()
  );
});
```

Saving to localStorage is a side effect.

Another:

```ts
effect(() => {
  chart.update(this.count());
});
```

Updating a chart is a side effect.

So:

```text
Signal changes
      ↓
   Effect runs
      ↓
   Do something
      ↓
outside world
```

---

# 5. Why does the Effect run immediately?

Look at:

```ts
username = signal('Harry');

constructor() {
  effect(() => {
    console.log(this.username());
  });
}
```

When Angular creates the component, the effect starts running.

So initially:

```text
username = "Harry"

       ↓

effect runs

       ↓

"Harry"
```

Then:

```ts
this.username.set('John');
```

Angular notices:

```text
username changed
      ↓
effect depends on username
      ↓
run effect
      ↓
"John"
```

So generally you can think:

```text
effect()
   ↓
runs initially
   ↓
waits for dependencies
   ↓
signal changes
   ↓
runs again
```

---

# 6. How does Angular know which signals the Effect depends on?

This is the really interesting part.

Consider:

```ts
effect(() => {
  console.log(this.username());
});
```

Angular executes the effect and notices:

```ts
this.username()
```

Because you're **reading** the signal using `()`.

Angular therefore records:

```text
Effect
  ↓
depends on username
```

Now if you have:

```ts
effect(() => {
  console.log(this.username());
  console.log(this.age());
});
```

Angular knows:

```text
Effect
 ├── username
 └── age
```

Therefore changing either one can cause the effect to run.

---

# 7. Now let's understand the important part: "Effect triggers only once"

You wrote:

> Effects trigger only once after all the dependent signals are updated.

This means Angular doesn't necessarily run the effect immediately after **every single signal update**.

Imagine:

```ts
count = signal(0);
name = signal('Harry');

effect(() => {
  console.log(this.count());
  console.log(this.name());
});
```

The effect depends on:

```text
count
name
```

Now imagine some code does:

```ts
this.count.set(10);
this.name.set('John');
```

You might imagine:

```text
count changes
   ↓
effect runs

name changes
   ↓
effect runs
```

Potentially:

```text
effect
effect
```

But Angular's reactive scheduling can **coalesce these changes** so the effect is scheduled to run after the current synchronous work has finished.

Conceptually:

```text
count.set(10)
       ↓
   change recorded

name.set("John")
       ↓
   change recorded

current JavaScript work finishes
       ↓
   Angular runs effect
       ↓
effect sees:
count = 10
name = John
```

So you can think:

> **Angular waits until the current work is finished and then runs the effect with the latest values.**

---

# 8. What does "thread is ideal and empty" mean?

The wording **"thread is ideal and empty"** isn't the best way to describe it.

A better beginner-friendly explanation is:

> **The effect is scheduled to run after the current synchronous work has completed.**

For example:

```ts
this.count.set(1);
this.count.set(2);
this.count.set(3);
```

The effect doesn't need to meaningfully react to each intermediate state:

```text
1
2
3
```

Instead, Angular can schedule the effect and it will see the latest state:

```text
3
```

Conceptually:

```text
set(1)
set(2)
set(3)
   ↓
current code finishes
   ↓
effect runs
   ↓
sees count = 3
```

This is one reason you shouldn't think of an effect as:

> "Run this code instantly every time `.set()` is called."

Think instead:

> **"React to changes and run this side-effect when Angular schedules it."**

---

# 9. A practical example you can run

Since you're learning Angular locally, try this:

```ts
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Count: {{ count() }}</h1>

    <button (click)="increase()">
      Increase
    </button>
  `
})
export class App {

  count = signal(0);

  constructor() {

    effect(() => {
      console.log('Effect running');
      console.log('Current count:', this.count());
    });

  }

  increase() {
    this.count.update(value => value + 1);
  }
}
```

When the application starts:

```text
Effect running
Current count: 0
```

Click the button:

```text
Effect running
Current count: 1
```

Click again:

```text
Effect running
Current count: 2
```

And so on.

---

# 10. Try multiple updates

Now change your method:

```ts
increase() {
  this.count.set(1);
  this.count.set(2);
  this.count.set(3);
}
```

You can observe how Angular schedules the effect rather than treating each `.set()` as a separate immediate effect execution.

The important thing is that the effect sees the **latest state**.

---

# 11. Why is Effect usually inside the constructor?

You previously asked this, and this example connects directly to that question.

Angular effects need an **injection context** by default.

A component's constructor is a natural place because Angular is currently creating the component:

```text
Angular creates component
        ↓
constructor runs
        ↓
effect() created
        ↓
Angular knows the component context
        ↓
effect can participate in Angular's lifecycle
```

So:

```ts
constructor() {
  effect(() => {
    console.log(this.count());
  });
}
```

is the normal pattern.

It's **not because effects are JavaScript constructors**.

It's because the constructor provides Angular's injection/lifecycle context.

---

# 12. When should you actually use `effect()`?

Good examples:

### Save data

```ts
effect(() => {
  localStorage.setItem(
    'theme',
    this.theme()
  );
});
```

### Log something

```ts
effect(() => {
  console.log('Count:', this.count());
});
```

### Synchronize with something external

```ts
effect(() => {
  someExternalLibrary.update(this.count());
});
```

### Perform an external/async operation

You may see patterns such as:

```ts
effect(() => {
  const value = this.value();

  this.service.save(value);
});
```

But you should be careful with effects that modify other signals or perform repeated async work, because they can create unwanted reactive loops or race conditions.

---

## The easiest way to remember Effect

Imagine your Angular application has a **watchman**:

```text
             SIGNAL
                │
                │ changes
                ▼
          ┌───────────┐
          │  EFFECT   │
          │  Watchman │
          └─────┬─────┘
                │
                ▼
          DO SOMETHING
                │
        ┌───────┼────────┐
        ▼       ▼        ▼
      Log    Storage    API/
                         Chart
```

So when you see:

```ts
effect(() => {
   // code
});
```

ask yourself:

> **"What external action do I want to perform whenever these signals change?"**

And one very important distinction:

```ts
computed(() => ...)
```

is generally for **deriving a value**.

```ts
effect(() => ...)
```

is for **doing something because a value changed**.

**Signal → data**
**Computed → derived data**
**Effect → side effect/action**

# Code Go through :

### What is happening here?

You have:

```ts
speed = signal(0);
color = "black";
```

`speed` is a **signal**, so Angular tracks its value.

Then:

```ts
effect(() => {
  if (this.speed() > 0 && this.speed() < 80) {
    this.color = 'green';
  }

  if (this.speed() >= 80 && this.speed() < 120) {
    this.color = 'orange';
  }

  if (this.speed() >= 120) {
    this.color = 'red';
  }

  console.log("speed", this.speed());
});
```

The important part is:

```ts
this.speed()
```

Because the effect reads `speed()`, Angular creates a dependency:

```text
effect()
   ↓
reads speed()
   ↓
Angular tracks speed
   ↓
speed changes
   ↓
effect() runs again
```

So if the button changes:

```ts
speed.set(50)
```

the effect automatically runs and changes:

```ts
color = "green"
```

Then:

```ts
speed.set(100)
```

causes the effect to run again:

```ts
color = "orange"
```

And:

```ts
speed.set(130)
```

causes:

```ts
color = "red"
```

Your template:

```html
<h2 [style.color]="color">
  {{ speed() }}
</h2>
```

then displays the speed using that color.

---

### But is this the *best* use of `effect()`?

**Not really.** This particular example is useful for **demonstrating how `effect()` works**, but in real Angular code, `computed()` would usually be more appropriate.

Why?

Because `color` is **derived from `speed`**:

```text
speed → color
```

Whenever one piece of state can be calculated from another piece of state, `computed()` is generally the better model.

For example:

```ts
speed = signal(0);

color = computed(() => {
  if (this.speed() > 0 && this.speed() < 80) {
    return 'green';
  }

  if (this.speed() >= 80 && this.speed() < 120) {
    return 'orange';
  }

  if (this.speed() >= 120) {
    return 'red';
  }

  return 'black';
});
```

Then:

```html
<h2 [style.color]="color()">
  {{ speed() }}
</h2>
```

Here:

```text
speed()
   ↓
computed()
   ↓
color()
```

That's a **derived value**, so `computed()` fits naturally.

---

### So when should you use `effect()`?

Think of it this way:

### `computed()` → calculate something

```ts
fullName = computed(() => this.firstName() + this.lastName());
```

### `effect()` → do something because something changed

For example:

```ts
effect(() => {
  console.log("Speed changed:", this.speed());
});
```

Or a more realistic example:

```ts
effect(() => {
  localStorage.setItem('speed', this.speed().toString());
});
```

Here you're not calculating another value. You're performing a **side effect**:

```text
speed changes
      ↓
effect runs
      ↓
localStorage updated
```

Other common side effects include:

* logging
* saving to `localStorage`
* sending analytics
* interacting with browser APIs
* synchronizing with an external library
* triggering some external operation

### Simple interview definition

> **`effect()` is used when we want Angular to automatically execute some side-effecting code whenever the signals read inside the effect change.**

Your example demonstrates the **reactivity of `effect()`**, but for `speed → color`, I'd teach it as:

> **`computed()` for derived state, `effect()` for side effects.**

### A better way to understand it is:

> **Use `effect()` when a signal changes and you need to perform some action outside of Angular's normal template/state calculation.**

### Scenario: Save user preference to `localStorage`

Suppose your application has a dark/light mode.

The user changes the theme:

```text
User clicks Dark Mode
        ↓
theme signal changes
        ↓
effect() detects the change
        ↓
Save theme to localStorage
```

Here, `localStorage` is an **external/browser API**. We aren't calculating a new value; we're doing something because the value changed.

### Complete example

```typescript
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  theme = signal('light');

  constructor() {

    effect(() => {

      const currentTheme = this.theme();

      // Side effect
      localStorage.setItem('theme', currentTheme);

      console.log('Theme saved:', currentTheme);

    });

  }

  toggleTheme() {

    this.theme.update(currentTheme =>
      currentTheme === 'light' ? 'dark' : 'light'
    );

  }

}
```

### `app.html`

```html
<h1>Effect Example</h1>

<p>Current Theme: {{ theme() }}</p>

<button (click)="toggleTheme()">
  Toggle Theme
</button>
```

Now every time you click:

```text
light
  ↓
dark
  ↓
light
  ↓
dark
```

the effect automatically runs:

```typescript
effect(() => {
  const currentTheme = this.theme();

  localStorage.setItem('theme', currentTheme);
});
```

---

## When vs. How

### When should I use `effect()`?

Ask yourself:

> **"When this signal changes, do I need to DO something?"**

If yes, `effect()` may be appropriate.

Examples:

```text
Signal changes
     ↓
     ├── Save to localStorage
     ├── Log something
     ├── Send analytics
     ├── Update a browser API
     ├── Synchronize with an external library
     └── Perform another side effect
```

### How does `effect()` work?

You put the signal you want to watch inside the effect:

```typescript
effect(() => {
  console.log(this.theme());
});
```

Angular sees:

```typescript
this.theme()
```

and tracks it.

When:

```typescript
this.theme.set('dark');
```

happens, Angular automatically executes the effect again.

---

## `computed()` vs `effect()`

This is probably the **most important distinction** to remember.

### If you're calculating a value → `computed()`

```typescript
fullName = computed(() => {
  return this.firstName() + ' ' + this.lastName();
});
```

You're saying:

> "Give me another value based on my signals."

```text
firstName + lastName
        ↓
     fullName
```

### If you're doing something → `effect()`

```typescript
effect(() => {
  localStorage.setItem('name', this.name());
});
```

You're saying:

> "Whenever this signal changes, perform this action."

```text
name changes
     ↓
 effect()
     ↓
localStorage
```

### One-line memory trick

> **`computed()` = calculate**
> **`effect()` = react and do something**

So your original **speed → color** example is useful for learning the mechanics of `effect()`, but **speed → color is actually a better use case for `computed()`**. The `localStorage` example demonstrates the real reason you'd reach for `effect()`.


### Your code

```ts
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  data = 10;

  count = signal(0);

  constructor() {
    effect(() => {

      // console.log("this is data", this.data);

      console.log("this is count", this.count());

      if (this.count() == 10) {
        this.count.set(0);
      }

    });
  }
}
```

---

# 1. First understand `count`

```ts
count = signal(0);
```

Angular creates a **WritableSignal**.

You can think of it as:

```text
count
┌─────────┐
│    0    │
└─────────┘
```

Because it is writable, you can do:

```ts
this.count.set(5);
```

Now:

```text
count
┌─────────┐
│    5    │
└─────────┘
```

And you read it using:

```ts
this.count()
```

---

# 2. Now what is `effect()`?

This is the important part.

```ts
effect(() => {
   // code
});
```

`effect()` basically means:

> **"Run this function, and then run it again whenever a signal that this function reads changes."**

So Angular looks inside your effect:

```ts
effect(() => {

  console.log(this.count());

});
```

It sees:

```ts
this.count()
```

Therefore Angular records a dependency:

```text
       effect()
          │
          │ reads
          ↓
        count
```

So `effect()` is now **watching `count`**.

---

# 3. What happens initially?

When the component is created, Angular runs the effect for the first time.

Your initial value is:

```ts
count = signal(0);
```

So:

```ts
this.count()
```

returns:

```text
0
```

Therefore:

```text
this is count 0
```

gets printed.

---

# 4. Now suppose the template changes the count

Imagine your HTML has:

```html
<button (click)="count.set(count() + 1)">
  Increment
</button>
```

Initially:

```text
count = 0
```

You click:

```text
count.set(1)
```

Angular knows:

```text
count changed
      ↓
effect depends on count
      ↓
run effect again
```

So:

```ts
console.log("this is count", this.count());
```

prints:

```text
this is count 1
```

---

# 5. What happens when count becomes 10?

Suppose you keep clicking.

Eventually:

```text
count = 10
```

Angular notices that `count` changed and runs the effect:

```ts
effect(() => {

  console.log("this is count", this.count());

  if (this.count() == 10) {
    this.count.set(0);
  }

});
```

First:

```ts
this.count()
```

is:

```text
10
```

So it prints:

```text
this is count 10
```

Then:

```ts
if (this.count() == 10)
```

is true.

Therefore:

```ts
this.count.set(0);
```

changes the signal:

```text
10
 ↓
0
```

---

# 6. And now something interesting happens

You changed `count` **inside the effect itself**.

Remember:

```text
effect
  ↓
reads count
  ↓
count changes
  ↓
effect runs again
```

So changing:

```ts
this.count.set(0);
```

causes the effect to react to the new signal value.

Conceptually:

```text
count = 10
    ↓
effect runs
    ↓
condition true
    ↓
count.set(0)
    ↓
count changed
    ↓
effect runs again
    ↓
count = 0
    ↓
condition false
    ↓
stop
```

So the final value is:

```text
count = 0
```

---

# 7. Why doesn't `data` trigger the effect?

You have:

```ts
data = 10;
```

and:

```ts
effect(() => {
  console.log(this.count());
});
```

Notice that the effect **doesn't read `data`**.

If you did:

```ts
effect(() => {
  console.log(this.data);
});
```

`data` is just a normal JavaScript property, **not a signal**.

Changing:

```ts
this.data = 20;
```

doesn't create the same signal dependency.

This is why your commented line is useful:

```ts
// console.log("this is data", this.data);
```

If you uncomment it, it does **not** make `data` reactive.

---

# 8. The key concept: dependency tracking

This is probably the most important thing to understand about `effect()`.

Angular doesn't simply say:

> "Run this effect whenever anything in the component changes."

Instead, Angular tracks **which signals are read inside the effect**.

For example:

```ts
effect(() => {
  console.log(this.count());
});
```

Dependency:

```text
effect
  │
  └──────→ count
```

If you had:

```ts
name = signal("Moaz");
count = signal(0);

effect(() => {
  console.log(this.name());
  console.log(this.count());
});
```

Angular tracks both:

```text
              effect
             /     \
            ↓       ↓
          name     count
```

Changing either one can cause the effect to run again.

---

# 9. `effect()` vs `computed()`

Since you were just learning `computed()`, this distinction is very important.

### `computed()`

Used when you want to **derive a value**.

```ts
const doubleCount = computed(() => this.count() * 2);
```

Think:

```text
count = 5
   ↓
computed
   ↓
doubleCount = 10
```

It produces another signal.

---

### `effect()`

Used when you want to **perform some side effect** when signals change.

```ts
effect(() => {
  console.log(this.count());
});
```

Think:

```text
count changes
     ↓
effect runs
     ↓
do something
```

For example:

```ts
effect(() => {
  console.log("Count changed:", this.count());
});
```

Or potentially:

```ts
effect(() => {
  localStorage.setItem("count", this.count().toString());
});
```

---

## Your example in one diagram

```text
                    count
              WritableSignal<number>
                       │
                       │ count()
                       ↓
                    effect()
                       │
                       ↓
              console.log(count)
                       │
                       ↓
               Is count === 10?
                    /       \
                  No         Yes
                  ↓           ↓
                finish    count.set(0)
                              │
                              ↓
                         count changes
                              │
                              ↓
                         effect runs
                              │
                              ↓
                         count = 0
                              │
                              ↓
                       condition false
```

### The simplest mental model

Remember these three:

```text
signal()
   ↓
"Store reactive state"


computed()
   ↓
"Calculate reactive state from other signals"


effect()
   ↓
"Do something when the signals I read change"
```

And in your specific code:

> **`count()` inside the `effect()` tells Angular that the effect depends on `count`. Therefore, whenever `count` changes, Angular re-runs the effect.**


## 1. Creating a Signal

```ts
name: WritableSignal<String> = signal('');
```

Here you're creating a **writable signal** called `name`.

Think of a signal as a **reactive box that stores a value**.

Initially:

```text
name
 ↓
""
```

Because you used:

```ts
signal('')
```

the initial value is an empty string.

### Why `WritableSignal`?

Angular has different signal types. Here you need to **change** the value, so you use:

```ts
WritableSignal
```

That's why you can do:

```ts
this.name.set("Md Moaz Shamim");
```

If the signal were read-only, you couldn't use `.set()`.

---

## 2. Reading the Signal

In your HTML:

```html
<p class="value">
  {{ name() }}
</p>
```

Notice:

```ts
name()
```

not:

```ts
name
```

A signal is read by **calling it like a function**.

```ts
name()
```

means:

> "Give me the current value stored inside `name`."

For example:

```ts
name = signal("Moaz");
```

Then:

```html
{{ name() }}
```

displays:

```text
Moaz
```

---

## 3. Why does Angular use `name()`?

This is one of the important concepts about Signals.

A normal property:

```ts
name = "Moaz";
```

is accessed using:

```ts
name
```

But a signal:

```ts
name = signal("Moaz");
```

is accessed using:

```ts
name()
```

So:

```text
Normal property
      ↓
    name

Signal
      ↓
    name()
```

The `()` tells Angular that you're **reading the current signal value**.

---

## 4. `[value]="name()"`

Your input contains:

```html
<input
  type="text"
  [value]="name()"
  ...
/>
```

This is **property binding**.

You're saying:

> Set the input's `value` property to whatever the signal currently contains.

For example:

```text
name() = "Md Moaz Shamim"
```

Angular effectively does:

```text
<input value="Md Moaz Shamim">
```

So the signal controls the input's displayed value.

### Data flow

```text
Signal
  │
  │ name()
  ↓
Input value
```

This is **one-way data flow from component → template**.

---

## 5. `(input)="..."`

Now look at:

```html
(input)="setValue($any($event.target).value)"
```

This is **event binding**.

The browser fires the `input` event whenever the user changes the input.

For example, the user types:

```text
M
Mo
Moa
Moaz
```

Every time the input changes, Angular executes:

```ts
setValue(...)
```

---

## 6. Understanding `$event`

This is probably the most important part of your input example.

```html
(input)="setValue($any($event.target).value)"
```

When the user types something, Angular gives you an event object:

```ts
$event
```

Conceptually:

```text
$event
   │
   └── target
         │
         └── input element
```

And the input element has:

```ts
value
```

So:

```ts
$event.target.value
```

means:

> Get the value currently typed inside the input.

---

## 7. Why are you using `$any()`?

You wrote:

```ts
$any($event.target).value
```

Angular's template type checking may not know that `$event.target` is specifically an HTML input element.

So you're telling Angular:

> Treat this as any type.

Therefore:

```ts
$any($event.target).value
```

allows you to access:

```ts
.value
```

### In plain JavaScript thinking

You can think of:

```ts
$any($event.target).value
```

as:

```text
event
 ↓
target
 ↓
input element
 ↓
value
```

---

## 8. `setValue()` method

Your component has:

```ts
setValue(val: string) {
  this.name.set(val);
}
```

Suppose the user types:

```text
Moaz
```

Then:

```ts
val = "Moaz"
```

and:

```ts
this.name.set(val);
```

changes the signal.

So:

```text
Before

name()
 ↓
""

        ↓ user types "Moaz"

After

name()
 ↓
"Moaz"
```

---

## 9. What happens after `.set()`?

This is where Signals become powerful.

You have:

```html
<p class="value">
  {{ name() }}
</p>
```

and:

```html
<input [value]="name()">
```

Both are reading the signal.

When you do:

```ts
this.name.set("Moaz");
```

Angular knows that `name` changed.

It can therefore update the parts of the UI that depend on that signal.

So your flow becomes:

```text
User types
     ↓
input event
     ↓
setValue()
     ↓
name.set(value)
     ↓
Signal changes
     ↓
Angular updates UI
     ↓
<p> displays new value
     ↓
<input> gets new value
```

---

## 10. Your `resetValue()` method

You have:

```ts
resetValue() {
  this.name.set("Md Moaz Shamim");
}
```

When the button is clicked:

```html
<button (click)="resetValue()">
  Reset Value
</button>
```

Angular executes:

```ts
resetValue()
```

which does:

```ts
this.name.set("Md Moaz Shamim");
```

So the signal changes:

```text
name()
 ↓
"Md Moaz Shamim"
```

And because your template depends on `name()`:

```html
<p>{{ name() }}</p>
```

and:

```html
<input [value]="name()">
```

both reflect the new value.

---

## 11. The complete data flow

Your entire application can be understood like this:

```text
                    ┌──────────────────┐
                    │  WritableSignal  │
                    │      name        │
                    └────────┬─────────┘
                             │
                       name()
                             │
              ┌──────────────┴──────────────┐
              ↓                             ↓
       <p>{{ name() }}</p>          <input [value]="name()">
                                            │
                                            │ user types
                                            ↓
                                     (input) event
                                            │
                                            ↓
                                      setValue()
                                            │
                                            ↓
                                      name.set()
                                            │
                                            └───────────┐
                                                        │
                                                        ↓
                                                Signal changes
                                                        │
                                                        ↓
                                                  UI updates
```

---

## 12. You are actually using two different directions

This is an important Angular concept.

### Component → Template

You have:

```html
[value]="name()"
```

This sends data **from your component's signal to the input**.

```text
Component
   │
   │ name()
   ↓
Template/Input
```

### Template → Component

You have:

```html
(input)="setValue(...)"
```

This sends the user's input **back to your component**.

```text
Input
   │
   │ input event
   ↓
setValue()
   │
   ↓
name.set()
```

So together:

```text
          COMPONENT
              │
          name signal
              │
              ↓
           TEMPLATE
              │
          input field
              │
          user types
              │
              ↓
          COMPONENT
              │
          name.set()
              │
              ↓
        signal changes
              │
              ↓
           TEMPLATE
```

That's the fundamental idea behind your example.

---

## 13. Why isn't this technically `[(ngModel)]`?

You could also write something like:

```html
<input [(ngModel)]="name">
```

but your example is intentionally showing **how the mechanism works underneath**.

You're manually combining:

```html
[value]="name()"
```

with:

```html
(input)="setValue(...)"
```

This is essentially:

```text
[value]       → send value to input
(input)       → receive value from input
```

This pattern is very useful for understanding Angular's **property binding + event binding**.

---

## 14. One small terminology correction

Your method:

```ts
resetValue()
```

doesn't really "reset" the value to the original empty value:

```ts
signal('')
```

Instead, it changes the value to:

```text
"Md Moaz Shamim"
```

So technically it's more like:

```ts
setDefaultValue() {
  this.name.set("Md Moaz Shamim");
}
```

If you wanted a true reset to the initial state, you could do:

```ts
resetValue() {
  this.name.set('');
}
```

But your current code is perfectly valid if your intention is to set the name back to `"Md Moaz Shamim"`.

### The three concepts you should remember from this example

| Code               | Concept          | Meaning                               |
| ------------------ | ---------------- | ------------------------------------- |
| `signal('')`       | Signal           | Creates reactive state                |
| `name()`           | Signal read      | Gets current value                    |
| `name.set(value)`  | Signal write     | Changes value                         |
| `[value]="name()"` | Property binding | Component → HTML                      |
| `(input)="..."`    | Event binding    | HTML → Component                      |
| `$event`           | Event object     | Information about the event           |
| `$any(...)`        | Type escape      | Tells Angular to treat value as `any` |

The **core pattern** in your code is:

```text
[value]="name()"       → READ the signal
        +
(input)="setValue(...)" → WRITE to the signal
```

That is a very good exercise for understanding how Angular Signals interact with the DOM.


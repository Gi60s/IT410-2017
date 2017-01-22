# JavaScript Introduction (Part 1)

## About JavaScript

> JavaScript&copy; (often shortened to JS) is a lightweight, interpreted, object-oriented language with first-class functions, and is best known as the scripting language for Web pages, but it's used in many non-browser environments as well. It is a prototype-based, multi-paradigm scripting language that is dynamic, and supports object-oriented, imperative, and functional programming styles.
>
> -- *Mozilla Developer Network* (https://developer.mozilla.org/en-US/docs/Web/JavaScript/About_JavaScript)

<br>

- **Interpreted:** There are JavaScript engines (SpiderMonkey, V8, Spartan) that read the code and convert it into machine language as the code is running.

- **Multiple Environments:** - The web is where it started but servers are also using it now.

- **Dynamic:** - Data, structures, and even the code can be rewritten on the fly. (Side note: imagine writing code that rewrites it's own code.)

- **Multi Paradigm:** - Can be written as object-oriented, imperative, and functional (all mixed together if you want).

- **Prototype Based:** Object structures can use classical inheritance, object composition, and prototypical inheritance. You have full control on exactly what is inherited.

## JavaScript in the Browser vs. the Server

- Both run the same. Code and logic in one will execute identically to code and logic in the other.

- The Browser provides some libraries that the server does not and vice versa.

    - Browser has: Window, Document Object Model (DOM).
    - Server has: Operating System, File System, Network Systems, etc.

## First Bit of Code

1. Open a web browser and open the developer tools to the console.

    Open your developer tools:

    - **Chrome**
        1. Click the Menu button
        2. Click *More tools*
        3. Click *Developer tools*
        4. Make sure you're on the *Console* tab.

    - **Firefox**
        1. Click the Menu button
        2. Click *Developer*
        3. Click *Web Console*

2. Enter this code:

    ```js
    alert('Hello, World!');
    ```

3. Run the code. (Try pressing Enter key or find a play button.)

<br>

### About That Code

- `alert` is a function that only exists within browsers.

- Double quotes or single quotes are fine and have identical results. (I prefer single so that I don't have to hold the shift button.)

- Semi-colons are placed at the end of the *Expression Statement*.

## Console Logging

- For logging, it is better to use the console than the alert.

- You can execute JavaScript from the console.

### Exercise

With the developer console open, enter the following JavaScript into the console and hit the *Enter* key.

**Tip:** To enter multiple lines, use `Shift-Enter` to go to the next line.

```js
alert('Hello');
console.log('Good bye');
```

## Comments

Comments can be for a single line:

```js
// anything following two slashes is a comment
alert('Hello'); // say hello
```

Comments can also be for a block:

```js
/*
This is a comment.
*/
```

## Data Types

### Primitives vs Objects

- Primitives cannot have properties.
- Objects can have properties.

<br>

### Variable Assignment

- Assignment can be by value.

    ```js
    var x = '123';  // x has '123'
    var y = x;      // y has the same value as x, but it's a copy of the value
    ```

- Assignments can be by reference.

    ```js
    var x = {};     // x has {}
    var y = x;      // y is the same as x, not a copy.
    ```

<br>

### Immutable vs Mutable

*We're not talking about volume levels here.*

**Question:** What is the difference between immutable and mutable data?
<br>

**Answer:** Mutable has the same base as mutation, so:

- **Immutable** means that the data cannot be changed.

    ```js
    var x = '123';  // x is assigned the value '123'
    x = 'abc';      // x is assigned the value 'abc'
    ```

    The variable `x` is assigned a new value, we did not modify `'123'`.

- **Mutable** means that the data can be changed.

    ```js
    var x = {};     // x is assigned an empty object
    x.foo = 'bar';  // we modify the object to add the property `foo` with value `'bar'`
    ```

<br>

### JavaScript's Data Types

| Data Type     | Primitive     | Assign by Value   | Assign by Reference   | Immutable |
| ------------- | ------------- | ----------------- | --------------------- | --------- |
| undefined     | x             | x                 |                       | x         |
| null          | x             | x                 |                       | x         |
| boolean       | x             | x                 |                       | x         |
| number        | x             | x                 |                       | x         |
| string        | x             | x                 |                       | x         |
| symbol        | x             |                   | x                     | x         |
| object        |               |                   | x                     |           |

To determine the type of a variable:

```js
var a = 5;
console.log(typeof a);        // will log 'number'
```

## Variables

There are three types of variable declarations:

### var

- Create a variable that can be set to a value any number of times.
- Scoped to the nearest closure. (More on this in a minute.)
- Universal browser support
- Supported by all versions of NodeJS

```js
var a;
var b = 5;
```

<br>

### const

- Create a variable that must have it's value set immediately.
- The value can not change.
- Scoped to the nearest block.
- Good browser support
- Support by NodeJS 4.0+

```js
if (true) {
    const a = 123;
    console.log(a);     // 123
    // a = 5            <-- would throw an error because it cannot be set again
}
console.log(a);         // undefined
```

<br>

### let

- Create a variable that can be set any number of times.
- Scoped to the nearest block.
- Evergreen browser support
- Support by NodeJS 4.3.2+

```js
if (true) {
    let a = 123;
    console.log(a);     // 123
    a = 5;
}
console.log(a);         // undefined
```

## Loops

There are many types of loops in JavaScript, but here we're going to look at just the imperative loop styles.

**Question:** What does imperative mean?
<br>

**Answer:** You give the computer very specific instructions onw how to do something. In this case we'll be explicitly telling the computer how to loop.

<br>

### For Loop

```js
var i;
for (i = 0; i < 10; i++) {
    console.log(i);
}
```

<br>

### While Loop

```js
var i;
while (i < 10) {
    console.log(i);
}
```

<br>

### Do Loop

Will execute at least once.

```js
var i;
do {
    console.log(i);
} while (i < 10);
```

<br>

### Break and Continue

You can exit a loop early by calling `break`.

```js
var i;
for (i = 0; i < 10; i++) {
    console.log(i);
    break;              // break the loop on the first iteration
}
```

You can start the next iteration early by calling `continue`.

```js
var i;
for (i = 0; i < 10; i++) {
    console.log(i);
    continue;                   // start the loop with next index
    console.log(i * 2);         // never reaches this line
}
```

## Operators

### Assignment Operator

You've already seen this one, a single `=`.

```js
var x = 5;
x = 6;
```

<br>

### Math Operators

- **Addition:** `1 + 2`

- **Subtraction:** `5 - 2`

- **Multiplication:** `2 * 3`

- **Division:** `5 / 2`

- **Modulus:** `5 % 3`  (remainder of dividing 5 / 3 )

- **Increment:**

    ```js
    var a = 1;
    a++;        // increment after expression evaluation
    ++a;        // increment before expression evaluation
    ```

- **Decrement:**

    ```js
    var a = 5;
    a--;        // decrement after expression evaluation
    --a;        // decrement before expression evaluation
    ```

<br>

### Comparison Operators

- **Less Than:** `<`

- **Less Than or Equal:** `<=`

- **Greater Than:** `>`

- **Greater Than or Equal:** `>=`

- **Value is Equal:** `==`

- **Value and Type is Equal:** `===`

- **Value is not Equal:** `!=`

- **Value and Type is not Equal:** `!==`

<br>

#### Pro Tip

To reduce the number of logic errors in your code:

- Use `===` more than `==`
- Use `!==` more than `!=`

```js
0 == ""         // true
0 === ""        // false

0 == false      // true
0 === false     // false
```

<br>

### Truthy or Falsy

Falsy Values:

- `0`
- `null`
- `''` (empty string)
- `false`

Truthy Values:

- Everything that isn't falsy.

## Conditional Statements

- With conditional statements you can execute logic based on current state information.

**Single Line If Statement**

```js
if (a === b) console.log('They are equal');
```

<br>

**Multi Line If Statement**

The code block is enclosed by squiggly brackets.

```js
if (a === b) {
    console.log('They are equal');
}
```

<br>

**Compound If Statement**

```js
if (a === b) {
    console.log('They are equal');
} else if (a < b) {
    console.log('"A" is smaller');
} else {
    console.log('"B" is smaller');
}
```

<br>

**Switch Statement**

- When a case is met it will execute all code blocks until a break is reached.
- Don't forget to break at the end of a block.

```js
switch (a) {
    case 1:
    case 2:
        console.log('It is a number 1 or 2');
        break;
    case 'One':
        console.log('It is the string One');
        break;
    default:
        console.log('It is something else');
}
```

## Functions

- Functions create a closure scope.

- A variable declared outside of a function is accessible within the function.

- A variable declared within a function is not accessible outside the function.

```js
var a = 1;
var b = 2;

function foo() {	    //define the function
  var a = 10;
  var x = 'Hello';
  console.log(a, b, x); // 10, 2, 'Hello'
}

foo();	                //call the function
console.log(a, b, x);   // 1, 2, undefined
```

<br>

#### Pro Tip

- Be very careful setting the values of variables outside of the closure you are working on.

- If you forget to declare a variable you may unintentionally set the value for a variable of a higher closure (perhaps a global variable).

<br>

### Function Referencing

- You can create *named* functions.

    ```js
    function foo() {}       // the name is foo

    foo();                  // call the function
    ```

<br>

- You can assign functions to variables. This is what makes JavaScript a first-class functional language.

    ```js
    var x = function foo() {};      // define foo and assign to x
    x();                            // call foo
    foo();                          // call foo

    function bar() {}               // define function and make assignment
    var y = bar;
    ```

<br>

- You can create *anonymous* functions that you assign to variables.

    ```js
    var x = function() {}   // the name is undefined
    x();                    // call the anonymous function
    ```
<br>

**Question:** Can you assign the same function to two variables?
<br>

**Answer:** Yes. Functions are not primitives, therefore they are objects. Specifically, they inherit from *Object*. Any assignments made are pointing to the same place in memory.
<br>

<hr>

**Question:** Would you ever create an anonymous function that wasn't assigned to a variable? If so, why?
<br>

**Answer:** You might do it in a callback situation where you pass a function as a parameter to another function. More on callbacks later. Another reason would be for creating an immediately invoked functional expression (IIFE). More on that later too.
<br>

### Function Parameters

- A function can take any number of parameters.

- The defined function gets to choose the name of those parameters within the function.

```js
function add(a, b) {
    console.log(a + b);             // output the result of a + b to the console
}

var multiply = function(a, b) {
    console.log(a * b);             // output the result of a * b to the console
}
```

<br>

### Function Returns

- A function can only return one value.

- You can any number of return statements within a function, but it can only return once.

```js
function greet(name) {
    return 'Hello, ' + name;
}
```

<br>

### Function Calls

- Use the name of the function (or a variable with it's reference) to call the function.

- You must have parenthesis after the function name or reference to call it.

- Parameters values can be passed in within the parenthesis.

- The calling signature does not need to match the function signature.

```js
const G = function greet(name) {
    return 'Hello, ' + name;
}

var x = greet('Bob');           // x gets the value 'Hello, Bob'
var y = greet();                // y gets the value 'Hello, undefined'
var z = greet('Sue', 'Amy');    // z gets the value 'Hello, Sue'
var a = G('you');               // a gets the value 'Hello, you'
```

<br>

**Question:** How does the last line in the example work without using the function name of `greet`?
<br>

**Answer:** We stored a reference to the function in variable `G`.
<br>

### When is a Function Available

When a named function is defined it is immediately available to the entire closure scope.

```js
add(2, 3);

function add(a, b) {
    return a + b;
}
```

<br>

When a function is assigned to the variable, it is only availbe to call via the variable after the assignment.

```js
var add = function(a, b) {
    return a + b;
}

add(2, 3);
```

<br>

### IIFE - Immediately Invoked Functional Expression

- A function that is executed right as it is defined.

- Great for limiting variable scope.

    - Complex functions use a lot of variables and you don't want those to conflict with other variables that might be named the same.

    - The closure protects your function from the outside.

    - The closure protects the outside from your function.

- It can return a value but does not need to.

```js
var str = (function(name, age) {
    return name + ' is ' + age + ' years old.';
})('Bob', 5);

console.log(str);       // logs 'Bob is 5 years old.'
```

<br>

**Question:** Why would you use an IIFE?
<br>

**Answer:** Functions create closure (scope). Variables defined within the closer are limited to the closure. You can run a bunch of code without having to muck up the higher level scope.

<br>

#### Pro Tip

For every JavaScript file you write, you should wrap all of the code for that file in an IIFE. Note that when writing JavaScript files for NodeJS that NodeJS does this for you.

<br>

### Arrow Functions

- They are shorthand anonymous functions.

- They cannot be named.

- You can assign them to a variable or pass them to another function as that function's parameter.

- If the body has a single expression then the result of it's body's expression is automatically returned.

**With One Parameter**

```js
x => x + 5;
```

**With No Parameters**

```js
() => 5;
```

**With More Than One Parameter**

```js
(a, b) => a + b;
```

**With a More Complex Body**

```js
(a, b) => {
    console.log(a, b);
    return a + b;
}
```

<br>

### Variable Arguments

- Because the function signature doesn't have to match the calling signature we can receive any number of parameters.

- It is possible to see how many arguments a function received.

- We use the `arguments` keyword within a function.

- `arguments` is an array-like object (not an array).

```js
function greet() {
    var i;
    var name;

    for (i = 0; i < arguments.length; i++) {
        name = arguments[i];
        console.log('Hello, ' + name);
    }
}

greet('Amy', 'Andrew', 'Kim', 'Lance', 'Tyler', 'Zoe');
```
<br>

**Question:** What are some specific examples that could leverage variable arguments?
<br>

**Answer:** 1) You could have a function that takes one or more optional arguments. 2) You could have a function that uses all arguments passed in to calculate a response.

<br>

### Optional Arguments

- Using the variable arguments also makes it possible to use optional arguments.

```js
function greet(name) {
    if (arguments.length === 0) name = 'stranger';
    return 'Hello, ' + name;
}

greet('Bob');   // returns: Hello, Bob
greet();        // returns: Hello, stranger
```

<br>

**Question:** How could you create a function that takes two parameters and the first parameter is an optional string and the second is a required number?
<br>

**Answer:** You could detect how many arguments were used to call the function `arguments.length`, but it would be better to detect the first argument's type:

```js
function foo(str, num) {
    if (arguments.length === 1) {
        if (typeof arguments[0] === 'number') {
            num = arguments[0];
            str = '';           // give str a default value
        } else {
            throw new Error('Invalid input parameters');
        }
    }
    // ... additional logic
}
```


Note: We'll talk about Errors next class.

## Callback Functions

Pass a function (A) to another function (B) as a parameter. Function B calls Function A.

**Question:** Why would you ever do this?
<br>

**Answer:** There are many reasons to do this, including but not limited to: asynchronous operations, functional programming, and currying.
<br>

<hr>

**Question:** Which function gets to define the calling signature, function A or function B? Why?
<br>

**Answer:** Function B calls function A, so it gets to decide what parameters it passes when it calls function A.
<br>

### Currying

- Currying allow for defining a function that uses partial application.

- Improve processing performance.

- Smaller JavaScript file sizes.

- Write less code.

- More consistent operation.

**Non-Currying Example**

```js
function greet(greeting, name) {
    return greeting + ', ' + name;
}

greet('Hello', 'Bob');
greet('Hello', 'Jan');
greet('Hola', 'Juan');
```

<br>

**Currying Example**

```js
function makeGreetFunction(greeting) {
    return function(name) {
        return greeting + ', ' + name;
    };
}

var englishGreeting = makeGreetFunction('Hello');
var spanishGreeting = makeGreetFunction('Hola');

englishGreeting('Bob');     // 'Hello, Bob'
englishGreeting('Jan');     // 'Hello, Jan'
spanishGreeting('Juan');    // 'Hola, Juan'
```
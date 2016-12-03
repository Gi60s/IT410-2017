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

1. Open a web browser to: http://labs.codecademy.com/

2. Enter this code:

    ```js
    alert('Hello, World!');
    ```

3. Click the `Run` button.

### About That Code

- `alert` is a function that only exists within browsers.

- Double quotes or single quotes are fine. (I prefer single so that I don't have to hold the shift button.)

- Semi-colon at the end of the *Expression Statement*.

## Console

- The console is another way to provide input out get output.

- For logging, it is better to use the console than the alert.

- You can execute JavaScript from the console.

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

### Immutable vs Mutable

*Where not talking about volume levels here.*

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
alert(typeof a);        // will alert 'number'
```

## Variables

There are three types of variable declarations:

### var

- Create a variable that can be set to a value any number of times.
- Scoped to the nearest closure. (More on this in a minute.)
- Universal browser support

```js
var a;
var b = 5;
```

### const

- Create a variable that must have it's value set immediately.
- The value can not change.
- Scoped to the nearest block.
- Good browser support

```js
if (true) {
    const a = 123;
    console.log(a);     // 123
    // a = 5            <-- would throw an error because it cannot be set again
}
console.log(a);         // undefined
```

### let

- Create a variable that can be set any number of times.
- Scoped to the nearest block.
- Evergreen browser support

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

**Answer:** You tell the computer how to do something. In this case we'll be explicitly telling the computer how to loop.

### For Loop

```js
var i;
for (i = 0; i < 10; i++) {
    console.log(i);
}
```

### While Loop

```js
var i;
while (i < 10) {
    console.log(i);
}
```

### Do Loop

Will execute at least once.

```js
var i;
do {
    console.log(i);
} while (i < 10);
```

## Operators

### Assignment Operator

You've already seen this one, a single `=`.

```js
var x = 5;
x = 6;
```

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

### Comparison Operators

- **Less Than:** `<`

- **Less Than or Equal:** `<=`

- **Greater Than:** `>`

- **Greater Than or Equal:** `>=`

- **Value is Equal:** `==`

- **Value and Type is Equal:** `===`

- **Value is not Equal:** `!=`

- **Value and Type is not Equal:** `!==`

#### Expert Advice

To reduce the number of logic errors in your code:

- Use `===` more than `==`
- Use `!==` more than `!=`

```js
0 == ""         // true
0 === ""        // false

0 == false      // true
0 === false     // false
```

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

**Multi Line If Statement**

The code block is enclosed by squiggly brackets.

```js
if (a === b) {
    console.log('They are equal');
}
```

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

- Functions create a closure.

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

#### Expert Advice

- Be very careful setting the values of variables outside of the closure you are working on.

- If you forget to declare a variable you may unintentionally set the value for a variable of a higher closure (perhaps a global variable).

### Function Referencing

- You can give a function a name.

    ```js
    function foo() {        // the name is foo
    }
    ```

- You can store the function in a reference (with or without a name).

    ```js
    var x = function() {    // the name is undefined
    }
    ```

### Function Parameters

- A function can take any number of parameters.

- You specify the name of those parameters within the function.

```js
function add(a, b) {
    console.log(a, b);  // output the values from variables a and b to the console
}
```

### Function Returns

- A function can only return one value.

- It can only return once.

```js
function greet(name) {
    return 'Hello, ' + name;
}
```

### Function Calls

- Use the name of the function (or a variable with it's reference) to call the function.

- You must have parenthesis after the function name or reference to call it.

- Parameters values can be passed in within the parenthesis.

- The calling signature does not need to meet the function signature.

```js
const G = function greet(name) {
    return 'Hello, ' + name;
}

var x = greet('Bob');           // x gets the value 'Hello, Bob'
var y = greet();                // y gets the value 'Hello, undefined'
var z = greet('Sue', 'Amy');    // z gets the value 'Hello, Sue'
var a = G('you');               // a gets the value 'Hello, you'
```

**Question:** How does the last line in the example work without using the function name of `greet`?
<br>

**Answer:** We stored a reference to the function in variable `G`.

### Assignment

- **Purpose:** Show that you can create a function that takes parameters and returns a result.

- **Assignment ID:** `js-intro-functions`

- **Value:** 3 Points

**Instructions:**

1. Create a file called `js-intro-functions.js`

2. Create a function named `add` that takes two parameters.

3. Inside the function, add the two parameters together and return the result.

5. Test the assignment until you have it working and then submit it.

    [Need Help Submitting?](./introduction.html#how-to-submit-assignments)

### Variable Arguments

- Because the function signature doesn't have to match the calling signature we can recieve any number of parameters.

- It is possible to see how many arguments a function received.

- We use the `arguments` keyword within a function.

- `arguments` is an array-like structure (not an array)

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

### Assignment

- **Purpose:** Show that you can accept variable arguments for a function.

- **Assignment ID:** `js-intro-function-arguments`

- **Value:** 3 Points

**Instructions:**

1. Create a file called `js-intro-function-arguments.js`

2. Add to that file a function named `sum` that takes any number of arguments, adds them all together, and returns the result.

3. Test the assignment until you have it working and then submit it.

    [Need Help Submitting?](./introduction.html#how-to-submit-assignments)
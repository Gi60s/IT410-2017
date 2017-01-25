# JavaScript Introduction (Part 2)

## Objects

**Question:** What is the difference between an object and a primitive?
<br>

**Answer:** Objects can have properties, primitives cannot.
<br>

## Object Composition

- The act of building objects piece by piece.

- Creating objects directly.

### Create a Plain Object

These two lines do the same thing, but one is less to write.

```js
var obj1 = {};
var obj2 = new Object();
```

<br>

### Object Properties

- An object can have any number of properties.

- Each property can be assigned any value (just like variables).

**Initialize an Object with Properties**

```js
var obj = {
    name: 'Bob',
    age: 20,
    gender: 'male'
}
```

<br>

**Add Properties to an Existing Object**

```js
var obj = {};
obj.name = 'Bob';
obj['age'] = 20;

var x = 'gender';
obj[x] = 'male';
```

<br>

**Get Properties from an Object**

```js
var obj = {};
obj.name = 'Bob';
obj['age'] = 20;

var name = obj.name;
var age = obj.age;
```

<br>

**Remove Properties from an Object**

```js
var obj = { name: 'Bob' };
delete obj.name;
```

<br>

**Defining Properties for an Object**

- You can use `Object.defineProperty` to define getters and setters.

- [MDN Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

<br>

### Detecting if an Object has a Specific Property

**Non-Inherited Check**

```js
var obj = { name: 'Bob' };
var hasNameProperty = obj.hasOwnProperty('name');
```

**Inherited or Non-Inherited Check**

```js
var obj = { name: 'Bob' };
var hasNameProperty = 'name' in obj;
```

<br>

**Question:** Are objects mutable or immutable? What's the difference?
<br>

**Answer:** Objects are mutable, meaning that they can be mutated (modified) without reassignment to another variable.
<br>

<hr>

**Question:** In the following example, what properties does the object in variable `a` have? Why?

```js
var a = { phone: '555-555-1234' };
var b = a;
b.email = 'foo@email.com';
```

<br>

**Answer:** It has `phone` and `email`. Variables `a` and `b` are pointing to the same place in memory. A modification to one is a modification to the other.

Objects are assigned by reference, so `a` and `b` are pointing to the same location in memory.

<br>

### Avoid Object Mutation Out of Scope

- You can pass objects as parameters.

- Modifying an object that was received as a parameter is dangerous.

- You should not return an object that shouldn't be modified.

The following code shows what you should avoid:

```js
var o = {
    important: 'Do not delete'
};

function deleteStuff(obj) {
    delete obj.important;
}

deleteStuff(o);
```

<br>

**Question:** Can you make an object reference itself in a property? If so, then how?
<br>

**Answer:** The object needs to be created first, then you can add a property that references it.

```js
var o = {
    name: 'Bob'
};
o.me = o;

o.me.me.me.me.me.me.name;       // 'Bob'
```

## This

The JavaScript keyword `this` refers to the current context and is always tied to some object.

```js
var obj = {
    name: 'Bob',
    greet: function() {
        return 'Hello, ' + this.name + ' [' + arguments.length + ']';
    }
}

obj.greet();    // 'Hello, Bob [0]'
```

<br>

Be aware that the context can be redefined by the caller.

- All functions inherit two properties that allow modification of context. They are `apply` and `call`.

- You call `apply` when you have a collection of parameters and cannot hard code the parameters.

- You call `call` when you know exactly how many parameters you have and they are not in a collection.

```js
var obj = {
    name: 'Bob',
    greet: function() {
        return 'Hello, ' + this.name + ' [' + arguments.length + ']';
    }
}

var amy = { name: 'Amy' };

obj.greet();                        // 'Hello, Bob [0]'
obj.name.call(amy);                 // 'Hello, Amy [0]'
obj.name.call(obj, 1, 2, 3);        // 'Hello, Bob [3]'
obj.name.apply(amy, [1, 2, 3]);     // 'Hello, Amy [3]'
```

## Prototype

- Inheritance in JavaScript works through the prototype.

- A prototype is an object that defines properties that will be assigned to new objects.

- Using a prototype reduces performance slightly.

- Using a prototype can have large memory savings.

<br>

The following example explores several parts of the prototype:

```js
// create a prototype object
const myPrototype = {
    name: 'stranger',
    greet: function() {
        return 'Hello, ' + this.name;
    }
};

// create an object that inherits the prototype
const obj = Object.create(myPrototype);
obj.greet();                    // returns 'Hello, stranger'
obj.hasOwnProperty('name');     // false
'name' in obj;                  // true

// update name, overshadowing prototype name property
obj.name = 'Bob';
obj.greet();                    // returns 'Hello, Bob'
obj.hasOwnProperty('name');     // false

// overshadow prototype greet property
obj.greet = function() {
    return 'Hola, ' + this.name;
}
obj.greet();        // returns 'Hola, Bob'

// overwrite previous greet, overshadow prototype greet and extend it
obj.greet = function() {
    return Object.getPrototypeOf(this).greet.call(this) + '!';
}
obj.greet();        // returns 'Hello, Bob!'
```

## Constructor Functions

- Any function can be turned into a constructor by calling it with the `new` keyword.

- Because functions inherit from Object they have a prototype that you can add properties to.

```js
function Person (name) {
    if (arguments.length > 0) this.name = name;
}

Person.prototype.name = 'stranger';

Person.prototype.greet = function() {
    return 'Hello, ' + this.name;
}
```

<br>

Create an object using the `new` keyword.

```js
const p = new Person();
p.greet();              // 'Hello, stranger'

const bob = new Person('Bob');
bob.greet();            // 'Hello, Bob'
bob.name = 'Robert';
bob.greet();            // 'Hello, Robert'
```

<br>

A function still has ultimate say in what it returns.

**Force calling using the `new` keyword**

```js
function Person (name) {
    const result = !this || typeof this !== 'object' || this.constructor !== Person
        ? new Person()
        : this;
    if (arguments.length > 0) result.name = name;
    return result;
}
```

<br>

**Return a Different Object than New**

```js
function Cake() {

}

function Person (name) {
    return arguments.length > 0
        ? this
        : new Cake()
}

const p = new Person();
p instanceof Person;        // false

const q = new Person('a');
q instanceof Person;        // true
```

## Factory Functions

- Produce a result.

- Great to use with object composition.

- Take longer to create, consume more memory, but run faster.

- Less confusing.

- Does not matter if you call with or without `new` keyword.

```js
function Person(name) {
    const person = {};

    person.name = arguments.length > 0 ? name : 'stranger';

    person.greet = function() {
        return 'Hello, ' + person.name
    };

    return person;
}
```

## Private Variables

- Private variables can be used inside of the constructor or factory functions.

- They are not accessible to the prototype or anywhere else outside of the constructor or factory.

```js
function Counter(init) {
    const counter = {};
    let num = init || 0;

    counter.increment = function() {
        num++;
    };

    counter.decrement = function() {
        if (num > 0) num--;
    };

    Object.defineProperty(counter, 'value', {
        get: function() {
            return num;
        }
    });

    return counter;
}
```

<br>

**Question:** What advantages can you think of for creating a counter factory like this as opposed to just having a variable with `num++` or `num--`?
<br>

**Answer:** You can encompass logic (minimum of zero, can only change value by + or - one).

## Property Chaining

- Allows multiple operations within a single statement.

- Simplifies functional programming. (More on this soon.)

```js
function Counter(init) {
    const counter = {};
    let num = init || 0;

    counter.increment = function() {
        num++;
        return counter;
    };

    counter.decrement = function() {
        if (num > 0) num--;
        return counter;
    };

    Object.defineProperty(counter, 'value', {
        get: function() {
            return num;
        }
    });

    return counter;
}

// value === 2
const value = Counter(0).increment().increment().increment().decrement().value;
```

## Classical Inheritance

- We've talked about prototypical inheritance and object composition. Both can be used to mimic all of the features of classical inheritance, but they can also do much more.

- Have only the properties that you want on an object, no more, no less.

- Classical inheritance is too ridged. Think: gorilla and a banana and the entire jungle.

## Arrays

There are many ways to create an Array, but here is the simplest:

```js
var ar = [];
```

<br>

- Each item in the array can store any data type.

- Data types do not need to be consistent between items.

- The Array inherits from Object and has multiple properties.

- The `Array.prototype.length` property returns the length of the Array.

```js
var ar = [1, 'a', {}];
ar.length;      // 3
```

<br>

### Array Manipulation

**Set an item**

```js
var ar = [];
ar[0] = 'First';
```

<br>

**Get an item**
```js
var ar = ['First'];
var x = ar[0];      // 'First'
```

<br>

**Other Useful Methods**

Look these up on the web for details: [MDN Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

- `Array.prototype.push` - Add an item to the end of the array.
- `Array.prototype.pop` - Remove an item from the end of the array.
- `Array.prototype.unshift` - Add an item to the front of the array.
- `Array.prototype.shift` - Remove an item from the front of the array.
- `Array.prototype.splice` - Add and/or remove items in the array at a specified index.
- `Array.prototype.slice` - Copy a portion of the array.

<br>

**Question:** What is dangerous about the following function? How could we fix it?

```js
function joinStrings(ar) {
    var result = '';
    while (ar.length > 0) result += ar.shift();
    return result;
}
```
<br>

**Answer:** The developer who is calling the function may not know that the array passed in is being manipulated. It would be better to not manipulate the passed in array.

```js
function joinStrings(ar) {
    var result = '';
    const copy = ar.slice(0);
    while (copy.length > 0) result += copy.shift();
    return result;
}
```

Also, there is already a function that does this, `Array.prototype.join`:

```js
const ar = ['The', 'quick', 'brown', 'fox'];
const str = ar.join(' ');   // 'The quick brown fox'
```

## Functional Programming

- Same input always produces same output.

- Does not modify state outside of itself.

- Fewer bugs.

<br>

Arrays provide a good introduction to functional programming.

1. We'll take the following input: `[1, 2, 3, 4, 5, 6, 7, 8, 9]`.
2. We'll strip out the even numbers.
3. We'll multiply each remaining entry by `2`.
4. We'll sum the remaining numbers.

**Imperative Solution**

```js
const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const result = calculate(input);

function calculate(input) {
    let i;
    let sum = 0;
    for (i = 0; i < input.length; i++) {
        if (input[i] % 2) {
            sum += input[i] * 2;
        }
    }
    return sum;
}
```

<br>

**Functional Solution**

```js
const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const result = input
    .filter(v => v % 2)
    .map(v => v * 2)
    .reduce((prev, curr) => prev + curr, 0);
```

## Modifying Core Prototypes

<br>

<div style='font-size: 200%; font-weight: bold; color: red'>DON'T</div>

- Because JavaScript is a dynamic language it is possible to modify core functionality or to add functionality to the core.

- Modifying prototypes that you did not create can lead to unforeseen consequences.

<br>

**Bad Example - Augmenting String Prototype**

```js
String.prototype.trim = function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
};

const str = '   Hello, World!    ';
const trimmed = str.trim();             // 'Hello, World!'
```

**Better Alternative**

```js
function trimString(str) {
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
};

const str = '   Hello, World!    ';
const trimmed = trimString(str);        // 'Hello, World!'
```
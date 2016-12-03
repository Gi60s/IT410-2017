# JavaScript Introduction (Part 2)

## Objects

### Create a Plain Object

There are many ways to create an Object, but here is the simplest:

```js
var obj1 = {};
```

### Object Properties

- An object can have any number of properties.

- Each property can be assigned any value (just like variables).

**Create an Object with Properties**

```js
var obj = {
    name: 'Bob',
    age: 20,
    gender: 'male'
}
```

**Add Properties to an Object**

```js
var obj = {};
obj.name = 'Bob';
obj['age'] = 20;

var x = 'gender';
obj[x] = 'male';
```

**Get Properties from an Object**

```js
var obj = {};
obj.name = 'Bob';
obj['age'] = 20;

var name = obj.name;
var age = obj.age;
```

**Remove Properties from an Object**

```js
var obj = { name: 'Bob' };
delete obj.name;
```

### Assignment

- **Purpose:** To become more comfortable with objects.

- **Assignment ID:** `js-intro-objects`

- **Value:** 10 Points

**Instructions:**

1. Create a file called `js-intro-objects.js`

2. Create a function named `makeCar` that creates and returns an object. The object will represent a car should have the following properties with any string value for each property:

    - color
    - make
    - model
    - year

3. The object must also have a property called `report` that has a value of a function. The function should return a string that lists the color, make, model, and year in that order, separated by a space.

4. Test the assignment until you have it working and then submit it.

    [Need Help Submitting?](./introduction.html#how-to-submit-assignments)

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
### Questions

**Remember:**

- Object assignments are by reference.

- Objects are the only mutable data type in JavaScript.

**Question 1:** What does it mean to be mutable vs immutable?
<br>

**Answer 1:** Mutable means it can be changed, immutable means it cannot be changed.
<br>

**Question 2:** Looking at the following example:

```js
var a = { phone: '555-555-1234' };
var b = a;
b.email = 'foo@email.com';
```

1. What properties does the object in variable `a` have?

2. What properties does the object in variable `b` have?
<br>

**Answer 2:** Both `a` and `b` are referencing the same object. Changes to one are changes to the other. Both have the properties `phone` and `email`.
<br>

**Question 3:** Can you assign an object as a value to a property?

```js
var o = {
    foo: {
        bar: 1,
        baz: {}
    }
}
```
<br>

**Answer 3:** Yes. Anything you can assign to a variable can be assigned to a property.
<br>

## This

- The JavaScript keyword `this` refers to the current context and is always tied to some object.

- Using `this` can be helpful, but be aware that the context is dynamic.

- The `Function.prototype.apply` and `Function.prototype.call` methods can be used to alter context.

    - More on prototype later.

    - We wont really cover `Function.prototype.apply` and `Function.prototype.call`, but you can look it up.

```js
var obj = {
    fname: 'Bob',
    lname: 'Smith',
    name: function() {
        return this.fname + ' ' + this.lname;
    }
}

obj.name()                                          // returns 'Bob Smith'
obj.name.call({ fname: 'Amy', lname: 'Jones' });    // returns 'Amy Jones'
```

## Arrays

There are many ways to create an Array, but here is the simplest:

```js
var ar = [];
```

- Each item in the array can store any data type.

- Data types do not need to be consistent between items.

- The Array inherits for Object and has multiple properties.

- The `Array.prototype.length` property returns the length of the Array.

```js
var ar = [1, 'a', {}];
ar.length;      // 3
```

### Array Manipulation

**Set an item**

```js
var ar = [];
ar[0] = 'First';
```

**Get an item**
```js
var ar = ['First'];
var x = ar[0];      // 'First'
```

**Other Useful Methods**

Look these up on the web for details:

- `Array.prototype.push` - Add an item to the end of the array.
- `Array.prototype.pop` - Remove an item from the end of the array.
- `Array.prototype.unshift` - Add an item to the front of the array.
- `Array.prototype.shift` - Remove an item from the front of the array.
- `Array.prototype.splice` - Add and/or remove items in the array at a specified index.
- `Array.prototype.slice` - Copy the array.

### Questions

**Question 1:** What's the difference between assigning by value vs by reference?
<br>

**Answer 1:** Assigning by value means that you have a new value in a second variable. Assigning by reference means you have the same value (as in same computer memory address) as the first variable.
<br>

**Question 2:** Are arrays assigned by value or by reference?
<br>

**Answer 2:** Because arrays are objects they are assigned by reference.
<br>

**Question 3:** What is dangerous about this function?

```js
function joinStrings(ar) {
    var result = '';
    while (ar.length > 0) result += ar.shift();
    return result;
}
```
<br>

**Answer 3:** The developer who is calling the function may not know that the array passed in is being manipulated. It would be better to not manipulate the passed array.

## Closure

TODO: working here

### Questions

**Question 1:** How can we make a variable private in JavaScript?
<br>

**Answer 1:** Any variable declared within a closure is limited to that closure. It can't be read or writen to outside of the closure.
<br>

**Question 2:** How do we create a closure?
<br>

**Answer 2:** When we create a function, the body of that function has it's own closure.

### Factories

- A factory is a function that produces an object.

**Incrementer Example**

```js
function incrementer(value) {

    // create the object
    var factory = {};

    // set default initial value if value was not provided
    if (arguments.length === 0) value = 0;

    // define an function that increments the value and assign it to the factory object's "increment" property
    factory.increment = function() {

    }

    return factory;
}
```

## Prototypes

TODO: cover what they are, show how to extend but don't get in depth

### Constructor Functions

### Factory Functions

### Avoid Classical Inheritance
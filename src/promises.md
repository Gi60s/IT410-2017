
# Promises

## About

Promises simplify complex asynchronous data flow.

Without promises, a simple asynchronous operation can be complex. For example, simultaneously loading the contents of three files and getting there data back in the order you requested. You can see an example of this below:

```js
var fs = require('fs');
var start = Date.now();
var results = [];
var done = 3;

function checkDone(err) {
    done--;
    if (err) {
        done = -1;
        console.error(err.stack);
        console.log(Date.now() - time);
    } else if (done === 0) {
        results.forEach(function(result) {
            console.log(result);
        });
        console.log(Date.now() - start);
    }
}

fs.readFile('./small.txt', 'utf8', function(err, data) {
    results[0] = data.substr(0, 6);
    checkDone();
});

fs.readFile('./medium.txt', 'utf8', function(err, data) {
    results[1] = data.substr(0, 6);
    checkDone();
});

fs.readFile('./large.txt', 'utf8', function(err, data) {
    results[2] = data.substr(0, 6);
    checkDone();
});
```

With promises that same operation is trivial:

```js
const fsp = require('fs-promise');
const start = Date.now();

Promise
    .all([
        fsp.readFile('./small.txt', 'utf8'),
        fsp.readFile('./medium.txt', 'utf8'),
        fsp.readFile('./large.txt', 'utf8')
    ])
    .then(function(data) {
        results.forEach(function(result) {
            console.log(result);
        });
    });
    .catch(function(err) {
        console.error(err.stack);
    })
    .finally(function() {
        console.log(Date.now() - start);
    });
```

## Basics

- A Promise is a JavaScript object with properties.

- Some properties contain status information about the asynchronous operation.

- Some properties have functions that allow you to access the result of the asynchronous operation once it is ready.

- Promises mimic synchronous data flow.

<br>

### Mimicking Synchronous Data Flow

The following two examples show the similarities between synchronous and asynchronous promise code structures.

These two examples would produce the exact same results, pass or fail.

#### Synchronous Example

```js
try {
    var content = readFileSync('./file.txt');
    console.log(content);
} catch (err) {
    console.error(err.stack);
}
```

#### Asynchronous Example

```js
readFile('./file.txt')
    .then(function(content) {
        console.log(content);
    })
    .catch(err) {
        console.error(err.stack);
    });
```

## A+ Promises

- A standard was created to define how promises should work.

- Before browsers or NodeJS implemented promises, other developers followed the promise specifications to build libraries that implemented promises.

- There are many Promise libraries. For a list of fully compliant promise libraries, visit https://promisesaplus.com/implementations.

- Bluebird is currently considered the best implementation due to it's high performance nature, in some cases even [out performing native implementations](http://programmers.stackexchange.com/questions/278778/why-are-native-es6-promises-slower-and-more-memory-intensive-than-bluebird).

- Bluebird also has more functionality that native promises.

<br>

### Terminology

Here are some terms you should be familiar with and that you should use when talking about promises.

- **promise** - An object with a `then` method whose behavior conforms to the [A+ Promise specifications](https://promisesaplus.com/)

- **resolve** - If a promise completes successfully then the promise has been *resolved* and it returns a *value*.

- **reject** - If a promise does not complete succesfully then the promise has been *rejected* and it returns a *reason*.

- **reason** - The value that indicates why the promise was *rejected*.

- **value** - The value that was returned by a successful promise resolution.

## Creating a Promise

Creating a promise can be daunting at first, so let's break it up before we see the whole:

<br>

#### 1. Function Signature

The function signature for a promise is simple. You pass a callback function into the Promise function as its first
parameter. The Promise function must be called with the `new` keyword so that you can get back an instance of a promise.

```js
var promise = new Promise (promiseCallback);
```

<br>

#### 2. Callback Signature

- The callback function will be called with two parameters: resolve and reject.
- Resolve and reject are functions.
- To *resolve* the promise, call the resolve function and optionally give it one parameter, a *value*.
- To *reject* the promise, call the reject function and optionally give it one parameter, a *reason*.
- If an Error is thrown within the promise callback and it is not caught then the promise instance will catch the Error for you and cause a rejection to occur, with the reason being the Error.
- Once you resolve or reject the promise, you cannot resolve or reject it again later.

```js
var promise = new Promise(function(resolve, reject) {
    if ( ... ) return reject("Didn't work.");
    resolve("It worked");
});
```

<br>

#### 3. Returning a Promise

It is common to write a function that returns a promise. Here is an example of how you would do that:

```js
function doSomething(x, y) {
    return new Promise(function(resolve, reject) {
        if (x > y) return resolve(x);
        reject(y);
    });
}
```

## Exercise

Create a function that does the same thing as `setTimeout` except that it uses a promise paradigm instead of a callback paradigm.

- The function should only take one parameter, the delay in milliseconds.

- The promise returned by the function is never rejected.

- The promise returned by the function resolves to the actual delay time.

You adapt your solution from the example we just saw:

```js
function doSomething(x, y) {
    return new Promise(function(resolve, reject) {
        if (x > y) return resolve(x);
        reject(y);
    });
}
```

<br>

**Exercise Solution**

Keep a copy of this code because we'll be using it in the next few exercises.

```js
function timeoutPromise(delay) {
    const start = Date.now();
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(Date.now() - start);
        }, delay);
    });
}
```

## Processing a Promise's Outcome

### Promise.then

- The `then` property from a Promise is a function that accepts a callback function.

- The callback function will only get one parameter, the result of the asynchronous operation.

```js
var promise = readFile('./file.txt');
promise.then(function(content) {
    console.log('File Contents: ' + content);
});
```

<br>

- There is also a second optional parameter for `then`.

- This parameter also must be a callback function, but it will receive any thrown errors.

```js
var promise = readFile('./file.txt');
promise.then(function(content) { ... }, function(err) {
    console.error(err.stack);
});
```

So this is the function signature for `then`: **.then ( successCallback [, errorCallback ] );**

It's subtle difference, but I usually omit the error callback function an instead use the `catch` function (below).

<br>

### Promise.catch

- The `catch` property is a function that accepts a callback function.

- The callback that you give the `catch` will only be called if an error is thrown.

```js
var promise = readFile('./file.txt');
promise.catch(function(err) {
    console.error(err.stack);
});
```

<br>

### Promise Property Chains

An interesting thing about `then` and `catch` is that they ***always*** return a promise. If you are in a `then` or a `catch` callback and your callback...

- Returns a value, then the value is returned as a *resolved* promise *value*.

- Returns a Promise instance, then that instance is returned.

- Throws an Error, then a promise is returned that is *rejected* with the *reason* being the error.

What that means is that you can create promise property chains where you call `then` or `catch` after any `then` or `catch`.

Note that if a promise is ever *rejected* then all `then` functions that follow will be skipped until a `catch` function catches the *rejected* promise.

#### Example

```js
getPromise()
    .then(function(value) {
        console.log(value);
    })
    .catch(function(reason) {
        console.error(reason);
    });
```

## Exercises

### Task 1: Resolved Value

1. Take the following code and chain another `then` function to it.

    ```js
    timeoutPromise(500)
        .then(function(value) {
            console.log('Actual delay: ' + value);
        });
    ```

2. Determine what the resolved value of the first `then` function is.

3. Log the resolved value to the console.

<br>

**Question:** What did the second `then` function resolve to? Why?

<br>

**Solution:**

```js
timeoutPromise(500)
    .then(function(value) {
        console.log('Actual delay: ' + value);
    })
    .then(function(value) {
        console.log('Resolved value: ' + value);
    });
```

**Answer:** The resolved value for the second `then` function resolved to `undefined` because the previous `then` function didn't return anything, so by default it returned undefined.

<br>

### Task 2: Resolved Values

In the first then function try the following:

1. Return a value and see what the result is.

    ```js
    timeoutPromise(500)
        .then(function(value) {
            console.log('Actual delay: ' + value);
            return 'Hello';
        })
        .then(function(value) {
            console.log('Resolved value: ' + value);
        });
    ```

<br>

2. Return a promise by returning the value from a second `timeoutPromise` and see what the result is.

    ```js
    timeoutPromise(500)
        .then(function(value) {
            console.log('Actual delay: ' + value);
            return timeoutPromise(300);
        })
        .then(function(value) {
            console.log('Resolved value: ' + value);
        });
    ```

<br>

**Question:** Why is the resolved value in the first `then` function `'Hello'`? Why is the resolved value in the second `then` function a number instead of a promise object?
<br>

**Answer:** Whatever value is returned inside of a `then` function gets wrapped into a promise (unless it is already a promise). The following `then` function gets the resolved value from that promise.

<br>

### Task 3 - Rejected Reasons

Take the following code:

```js
timeoutPromise(500)
    .then(function(value) {
        console.log('Actual delay: ' + value);
        throw Error('Fail');
    })
    .then(function(value) {
        console.log('Resolved value: ' + value);
    })
    .catch(function(err) {
        console.log('Rejected reason: ' + err.stack);
    });
```

**Question:** Which functions get executed and why?
<br>

**Answer:** The first `then` function and the `catch` function execute. The second `then` function is skipped because an error occurred preventing further processing.
<br>

- The catch can be used to fix errors.

- You can add a `then` in the chain after the catch.

- If the catch cannot fix the error, be sure to rethrow it.

## Promise Static Methods

### Promise.all

Takes an array of promises and returns a promise that resolves when all resolve or rejects immediately when one rejects.

```js
var promises = [];
for (var i = 0; i < collection.length; ++i) {
    promises.push(getPromise(collection[i]));
}
Promise.all(promises)
    .then(function(results) {
        console.log(results);
    });
```

<br>

### Promise.race

Take a collection of promises and the first to resolve or reject is used.

```js
const promises = [
    promiseTimeout(200).then(v => 200),
    promiseTimeout(500).then(v => 500)
];

Promise.race(promises)
    .then(function(value) {
        console.log(value);         // 200
    });
```

<br>

### Promise.resolve

Create a promise that is immediately resolved to a specific value.

```js
const promise = Promise.resolve('Hello');

promise.then(function(value) {
    console.log(value);     // 'Hello'
});
```

<br>

### Promise.reject

Create a promise that is immediately rejected with a reason.

**Important:** It is a best practice to only reject with Error objects. That enables a stack trace of where the error occurred.

```js
const promise = Promise.reject(Error('Fail'));

promise.catch(function(err) {
    console.error(err.stack);
});
```

## Reusing Promises

- You can call `then` or `catch` on a promise as many times as you want. Once the promise resolves or rejects then it will run all attached callbacks.

- You can call `then` or `catch` before or after the promise resolves or rejects.

```js
const promise = timeoutPromise(500);

promise.then(function(value) {
    // do something
});

promise.then(function(value) {
    // do something
});

setTimeout(function() {
    promise.then(function(value) {
        // do something
    });
}, 1000);
```

## Resources

- [Native Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

- [Bluebird Promise API](http://bluebirdjs.com/docs/api-reference.html)
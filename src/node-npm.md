# NodeJS and NPM

## NodeJS

### About JavaScript and NodeJS

- JavaScript is a scripted language.

- An interpreter reads the code and executes it.

- Web Browsers that are capable of executing JavaScript have a JavaScript interpreter.

- The interpreters are known as JavaScript engines.

- Most browsers have their own JavaScript engine, but some share the same engine.

- NodeJS takes Chrome's V8 engine and uses it to run JavaScript on a server.

<br>

### Browser JavaScript vs Server JavaScript

- The language is identical.

- The libraries are mostly different.

    - Browser specific libraries: window, document, DOM, alert, etc.

    - NodeJS specific libraries: file system, network, operating system, cryptography, etc.

- In browser JavaScript, all files share the same global scope.

- In NodeJS, all files are automatically wrapped in a closure.

## First NodeJS File

Create a factory function that produces a counter with methods to increment, decrement, and output current value. The counter can also be initialized when created.

After it is created, write some code to initialize a counter, increment it a few times, and then log the value to the console.

<br>

**Solution**

```js
function Counter (initialValue) {
    const counter = {};
    let value = initialValue || 0;

    counter.increment = function () {
        value++;
        return counter;
    };

    counter.decrement = function () {
        value--;
        return counter;
    };

    Object.defineProperty(counter, 'value', {
        get: function() {
            return value;
        }
    });

    return counter;
}

const counter = Counter();
const value = counter.increment().increment().increment().value;
console.log(value);
```

<br>

## Modules

**Question:** What does it mean to be a module?
<br>

**Answer:** It is a small set of code with a specific purpose. It is reusable in many instances and along with other modules to produce code with more complex capabilities.
 <br>

 - Remember that in NodeJS, each file is automatically wrapped with a closure. To be precise, this closure:

    [NodeJS Module Wrapper](https://nodejs.org/dist/latest-v6.x/docs/api/modules.html#modules_the_module_wrapper)

    ```js
    (function (exports, require, module, __filename, __dirname) {
    // Your module code actually lives in here
    });
    ```

 - We can use the `exports` object to expose properties to files outside of our file.

 - We can get that `exports` object in a different file by using the `require` function from that other file.

 <br>

 **counter.js**

 ```js
 exports.counter = function (initialValue) {
     const counter = {};
     let value = initialValue || 0;

     counter.increment = function () {
         value++;
         return counter;
     };

     counter.decrement = function () {
         value--;
         return counter;
     };

     Object.defineProperty(counter, 'value', {
         get: function() {
             return value;
         }
     });

     return counter;
 }

 // this still runs when I first require counter.js
 const counter = exports.counter();
 const value = counter.increment().increment().increment().value;
 console.log(value);
 ```

 **index.js**

 ```js
 const Counter = require('./counter');      // get the counter.js module

 const counter = Counter();
 const value = counter.increment().increment().increment().value;
 console.log(value);
 ```

<br>

### Your First NodeJS API

**Question:** What is an API?
<br>

**Answer:** It is an interface that provides some set of functionality. Imagine a black box that does a lot of stuff, but you don't care about the details of how it does it, you just need to be able to tell it to do it for you.
<br>

- We aren't going to write your first NodeJS API now because we already did our first one with the counter example.

- Each module is an API for other files.

<br>

### More About the Module Wrapper

```js
(function (exports, require, module, __filename, __dirname) {
// Your module code actually lives in here
});
```

- *exports* - An empty object that you can put properties on.

- *require* - A function that will get the value from the `module.exports` property of another file.

- *module* - An object with various properties. This object represents the current file as a module.

    - This object has a property `exports` that is the same object as the exports variable. In other words: `exports === module.exports`

    - Because of this you can export something other than an object from a module. More on this soon.

- *__filename* - The filename plus full path on the hard drive to this current file.

- *__dirname* - The full directory path for the directory that contains this file.

<br>

### Exporting Something Else

If you want to export a function instead of an object, you can't do this:

```js
exports = function() { ... }
```

You have to do this:

```js
module.exports = function() { ... }
```

**Question:** What is the difference between these two examples?
<br>

**Answer:** The first example reassigns `exports` to a new value. The second example mutates the `module` object by updating a property on it.
<br>

Also remember that `require` gets the value from the `module.exports` property.

## NodeJS Core Modules

- There are many core modules for NodeJS that allow you to interact with many parts of the server: file system, network, operating system, cryptography, etc.

- [API Documentation](https://nodejs.org/en/docs/)

## Packages

- A package is a set of modules that are combined to produce a single API interface.

- Node has a package manager called **npm**.

- npm can be used for:

    - Getting packages off the internet.

    - Keeping package dependencies up to date.

    - Deploying packages.

    - Providing run scripts for packages.

    - etc.

- Each project you work on is a package, whether it gets published or not.

<br>

### Creating Our First Package

- From a terminal: `npm init`

- Follow the prompts.

<br>

- Now we have a `package.json` file.

- This file contains information about our package:

    - Dependencies and their versions.

    - Run scripts.

    - Version

    - Name

    - etc.

<br>

### Getting a Package Dependency

We're going to get the `request` package that makes it easy to perform HTTP requests from NodeJS.

- From the terminal: `npm install --save request`

- Notice that `package.json` now has the `request` dependency because we used the `--save` flag.

- Where did this package come from? https://npmjs.com

- The [npmjs.com](https://npmjs.com) website is the official repository for all published packages.

- Lookup the request module to see documentation on how to use it.

- Create an `index.js` file where you require the `request` package and then make a web request to Google or some other website.

<br>

**Solution**

```js
const request = require('request');

request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
})
```
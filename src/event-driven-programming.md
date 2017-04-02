# Event Driven Programming

## About 

- Use events and reactions to events to execute code.

- Can allow for loose coupling of code. In other words, code is less dependent on other pieces of code.

- Improves flexibility in your code, making it easy to add features without compromising existing features.

- Everything is asynchronous.

- Is generally harder to debug.

- Becoming more common.

## Callbacks and Promises

- The callback paradigm and promises use events that are tightly coupled.

- You call a function that will cause an event that calls the callback provided.

- For tightly coupled code we might say: *read this file then call this function*

This example shows a tightly coupled event based callback function.

```js
const fs = require('fs');
fs.writeFile('./file.txt', 'Hello, World', function(err) {
    console.log(err, data);
});
```

## Loosely Coupled Events

- Loosely coupled events use a subscription model.
 
- For loosely coupled code we might say: *when any file is read call this function*

- In NodeJS we can use loosely coupled events using the [EventEmitter](https://nodejs.org/dist/latest-v6.x/docs/api/events.html).

- Check out an example from `https://github.com/Gi60s/it410-resources` in the `event-driven` directory.
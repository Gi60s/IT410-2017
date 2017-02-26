# Project Set Up

## Directory Structure

- The structure is not set in stone.

- This example shows some good practices:

    - Put files to be served to the browser under one directory. In this case: `www`

    - Put files to be run only on the server in another directory. In this case: `server`

    - Have a single `index.html` at the root of your project. This is a minimal footprint file and serves as the entry point for starting your web application.

**Example**

- **node_modules**
- **server**
    - **controllers**
        - foo-controller.js
        - bar-controller.js
    - **routes**
        - foo-routes.js
        - bar-routes.js
    - server.js
- **www**
    - **bower_components**
    - **css**
        - main.css
    - **js**
        - main.js
    - bower.json
    - index.html
- index.js
- package.json

<br>

**Exercise**

Get your semester project directory organized.

## Express

- A NodeJS package that uses the core http modules to create a web server.

- From [expressjs.com](http://expressjs.com): Fast, unopinionated, minimalist web framework for Node.js

- It doesn't do anything on its own.

<br>

**Exercise**

1. Install the express package in your project: `npm install --save express`

2. Create file named: `server.js`.

2. Within that file start up an express server with a simple `get` route. [Check out the Hello World Example](http://expressjs.com/en/starter/hello-world.html).

3. Use a web browser to hit the route.

## The HTTP Request

1. The URL

    ```
    http://someplace.com:3000/the/path?param1=foo&param2&param3=bar#hash
    ```

    - `http` - the protocol

    - `3000` - the port number. If the protocol is `http` then the default port is `80`. If the protocol is `https` then the default port is `443`.

    - `someplace.com` - the domain

    - `/the/path` - the path

    - `param1=foo&param2&param3=bar` - the query parameters, follow the `?`, each parameter is separated by `&` and can be assigned a value with `=`.

2. The headers

    - Formatted like ```Header-Name: header-value``` per header.

    - Includes cookies and other metadata (content types, user agent, etc).

    - Sometimes the server cares about the incoming headers and sometimes it doesn't.

3. The body: a payload of information that can be of any format.

## The HTTP Response

1. The status code: gives state information about the response. [Status Code Reference](http://www.restapitutorial.com/httpstatuscodes.html)

2. The body: a payload of information that can be of any format.

3. The headers:

    - Formatted the same as the request headers.

    - Contains cookies to set or clear and metadata.

## HTTP Methods

- There are several different methods that your server can listen for and respond to.

- Each method has guidelines, but not restrictions.


The most commonly used methods are:

- GET

- POST

- PUT

- DELETE

## Postman

Before we talk about these HTTP methods and play with them:

- It is easy to make a GET request because when you use a browser's URL input, that is a GET request.

- It is more difficult to use the other methods because you have to use JavaScript code or a tool of some sort.

- [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) is a Chrome extension that allows you to send requests using any HTTP method, URL, headers, and body.

- [Download Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) before continuing.

## GET

- Probably the most commonly used method.

- Shouldn't be used to save data.

- Should not include a body.

- Should be idempotent.

<br>

**Question:** What does *idempotent* mean?
<br>

**Answer:** No matter how many times to do an operation the result is the same.
<br>

<hr>

**Question:** How could you send data with a GET request without using the body?
<br>

**Answer:** You could send information using query parameters, but it's not a good idea to send information with GET.
<br>

**Exercise**

Use the Postman extension to make a GET request to your only route so far (from the previous exercise).

## POST

- With a POST you can send information in the body of the request.

- Should not be idempotent - each time it's used it should make a change.

- Is not the CRUD equivalent of *create*, although it is often similar.

<br>

**Exercise**

1. In your `server.js` file create a POST endpoint to `/` (same as GET, but with POST).

2. Have the response body be "POST".

3. Restart your server.

4. Use Postman to hit your POST endpoint.

<br>

### Send a Body

- Can be of any format.

- Is sent as binary stream.

- The server uses the `Content-Type` header in the request to determine the body format.

- The server needs a parser to parse the content. [npm body-parser package](https://www.npmjs.com/package/body-parser)

- We can implement the [body-parser](https://www.npmjs.com/package/body-parser) as connect middleware.

<br>

### Connect Middleware

- A function that looks like this:

    ```js
    function(req, res, next) {
        // do something
    }
    ```

- The parameters for that function are:

    - `req` - An object that represents the request object.

    - `res` - An object that represents the response API.

    - `next` - A function that can be called to execute the next middleware in line. Can also be called with an Error passed in as a parameter.

- Used in servers to add or modifiy function on the request and response objects or to fulfill the request.

- You implement the middlware using the `use` function.

    ```js
    const express = require('express');
    const app = express();

    // middleware that adds an id property to the request object
    app.use(function(req, res, next) {
        req.id = Math.random();
        next();
    });

    app.get('/', function (req, res) {
      res.send('Hello World!')
    });

    app.listen(3000, function () {
      console.log('Example app listening on port 3000!')
    });
    ```

- You probably wont create custom middleware so much as you'll use other people's created middleware.

<br>

**Exercise**

1. Use the [body-parser middleware](https://www.npmjs.com/package/body-parser) to capture the body of the POST request.

2. Send that content back with `res.send()`.

## PUT

- With a PUT you can send information in the body of the request.

- Should be idempotent - no matter how many times you call it, the result is the same.

- Is not the CRUD equivalent of *update*. It can also be used to create. Example: Put the data to this state. If it doesn't exist then it creates it into that state.

## DELETE

- With a DELETE you can send information with the body.

- Should be idempotent - no matter how many times you call it, the result is the same.

- If is is already deleted it shouldn't complain because the job is done.

## Static Middleware

- Express comes bundled with the static middleware: static

- The middleware is used for serving static files (files that are in the local file system) to the brower.

- [Express Static Documentation](http://expressjs.com/en/starter/static-files.html)

- Using the directory structure that we specified at the start of this lesson, you'd do something like this:

    ```js
    const express = require('express');
    const app = express();

    // middleware that serves files from www directory
    app.use(express.static('./www'));

    app.listen(3000, function () {
      console.log('Example app listening on port 3000!')
    });
    ```

## Routing

- Express comes with built in routing for all of the HTTP methods we've seen so far.

- It also has an `all` routes function that gets called for any route.

- You can specify routes directly onto the server instance or through a routing middleware.

**Example: Routing via Server Instance**


```js
const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('You used GET');
});

app.post('/', function(req, res) {
    res.send('You used POST');
});

app.put('/', function(req, res) {
    res.send('You used PUT');
});

app.delete('/', function(req, res) {
    res.send('You used DELETE');
});

app.add('/', function(req, res) {
    res.send('You used ' + req.method);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
```

<br>

### Route Parameters

- It is also possible to specify parameters in your routing.

- Any path parameters specified can be read from the `req.params` object.


```js
const express = require('express');
const app = express();

app.get('/foo/:myParam', function(req, res) {
    res.send('Path parameter: ' + req.params.myParam);
});

app.get('/bar/:optionalParam?', function(req, res) {
    res.send('Path parameter: ' + req.params.optionalParam);
});

app.get('/bar/:multiPath*', function(req, res) {
    res.send('Path parameter: ' + req.params.multiPath);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
```

## Final Project

1. Organize your directory structure appropriately.

    - **node_modules**
    - **server**
        - **controllers**
            - foo-controller.js
            - bar-controller.js
        - **routes**
            - foo-routes.js
            - bar-routes.js
        - server.js
    - **www**
        - **bower_components**
        - **css**
            - main.css
        - **js**
            - main.js
        - bower.json
        - index.html
    - index.js
    - package.json

2. Use static middleware to set up the routing of your front-end files.

    ```js
    const express = require('express');
    const app = express();

    // middleware that serves files from www directory
    app.use(express.static('../www'));

    app.listen(3000, function () {
      console.log('Server running on port 3000')
    });
    ```
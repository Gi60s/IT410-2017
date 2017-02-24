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
    - server.js
    - other-files.js
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

<br>

### Postman

Before we talk about these HTTP methods and play with them:

- It is easy to make a GET request because when you use a browser's URL input, that is a GET request.

- It is more difficult to use the other methods because you have to use JavaScript code or a tool of some sort.

- [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) is a Chrome extension that allows you to send requests using any HTTP method, URL, headers, and body.

- [Download Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) before continuing.

<br>

### GET

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

<br>

### POST

- With a POST you can send information in the body of the request.

- Should not be idempotent - each time it's used it should make a change.

- Is not the CRUD equivalent of *create*, although it is often similar.

<br>

**Exercise**

1. In your `server.js` file create a POST endpoint to `/` (same as GET, but with POST).

2. Have the response body be "POST".

3. Restart your server.

4. Use Postman to hit your POST endpoint.

TODO: working here

### REST Request Body

In express if you want to get the body of the request you may want to use the [body-parser module](https://www.npmjs.com/package/body-parser) that you can install with `npm install body-parser`.

- With this modules, if a request has a body then the module will attempt to parse it.
- Without this module if you want the body you'll have to manage gzip, deflate, and binary conversion on your own.

Look at the [body-parser examples](https://www.npmjs.com/package/body-parser#examples) and then complete the following exercise.

#### Exercise

In your `rest.js` file modify the post instruction so that it no long returns "POST", but instead returns the content that was sent in the body in all capital letters. You should use the bodyParser.text() to accomplish this.

<hr>

#### Solution

```js
var express = require('express')
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.text())

app.post('/', function (req, res) {
    res.send(req.body.toUpperCase());
});
```

<hr>

## PUT

- With a PUT you can send information in the body of the request.
- Should be idempotent - no matter how many times you call it, the result is the same.
- Is not the CRUD equivalent of *update*. It can also be used to create. Example: Put the data to this state. If it doesn't exist then it creates it into that state.

<hr>

## DELETE

- With a DELETE you can send information with the body.
- Should be idempotent - no matter how many times you call it, the result is the same.
- If is is already deleted it shouldn't complain because the job is done.



TODO: static middleware
# REST

## About

- Stands for: Representational State Transfer

- Used for sending data bidirectionally between the browser and the server.

- Commonly the browser uses AJAX to make requests to the server.

## Swagger

> Swagger is a powerful open source framework backed by a large ecosystem of tools that helps you design, build, document, and consume your RESTful APIs.
>
> http://swagger.io/

- Helps you to plan and organize your REST API.

- Documents your API for other's to consume.

- Has tools that enforce your API.

- [Specification](http://swagger.io/specification/) - How to write swagger documents.

- [Swagger UI](http://editor.swagger.io) - A tool for writing swagger documents.

## REST Routes

Remember this directory structure?

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

**Exercise**

1. Create a person API. A person object will look like this:

    ```js
    {
        id: 0,
        name: 'Bob',
        age: 20
    }
    ```

2. We'll put the routes in `./server/routes/people.js` and we'll use the [express router middleware](http://expressjs.com/en/guide/routing.html).

2. Set up a POST for `/people` that can add a person, not needing the ID because that will be determined by the server.

    - Use `body-parser` middleware for JSON to decode body from the browser.

    - Store the added person in memory. (Later we'll use databases, but for now we'll use memory.)

3. Set up a GET for `/people` that get's an array of people.

4. Set up a GET for '/people/:personId' that get's a single person by ID.

5. Create a PUT for '/people/:personId' that is used to update a person.

6. Create a DELETE for '/people/:personId' that is used to delete a person.
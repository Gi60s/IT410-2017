# NoSQL, Document Databases, and MongoDB

## NoSQL

- NoSQL stands for Not Only Structured Query Language

- You can organize your data in fixed structures or they can be free.

- NoSQL databases promote denormalization and eventual consistency.

    - Denormalization - there is duplicate data (faster to read, slower to update)

    - Eventual consistency - writes must occur but it is less important that reads are immediately up to date.

## Document Databases

- Highly available, high performance, easy to scale.

- Instead of storing rows (like you would do in an SQL database) you store documents. A document is very similar to the JavaScript object.

    ```js
    {
        name: 'Bob',
        age: 25,
        roles: ['Support', 'Developer']
    }
    ```

- You can perform searches using the document key (very fast) or by searching for documents with specific structures (slower).

<br>

### SQL Databases vs Document Databases

There isn't exactly a one-to-one relationship between the concepts you may be familiar with from SQL, but there are similarities.

- [SQL Comparison](https://docs.mongodb.org/manual/reference/sql-comparison/)
- [SQL Aggregation](https://docs.mongodb.org/manual/reference/sql-aggregation-comparison/)

## MongoDB

- One of several document databases.

- Run a server that has an API to get and set data in the database.

- Use a client that interfaces with the server API.

<br>

### Installation

There are also two versions of mongo you can install.

- The community version is open source and can do everything that the enterprise version does.

- The enterprise version comes with some extra features that make it easier to manage and monitor your databases.

- [Install Community](https://docs.mongodb.org/manual/administration/install-community/)

- [Install Enterprise](https://docs.mongodb.org/manual/administration/install-enterprise/)

Take a few minutes to install [MongoDB Community Edition](https://docs.mongodb.org/manual/administration/install-community/) on your machine.

<br>

### MongoDB Node Client

- [mongodb](https://www.npmjs.com/package/mongodb) - Use this module for a simple interface for connecting to your MongoDB instance.

- [Documentation](http://mongodb.github.io/node-mongodb-native/2.2/)

- Check out the [Quick Start Guide](http://mongodb.github.io/node-mongodb-native/2.2/quick-start/quick-start/)

<br>

### Node MongoDB API

- Find the API at http://mongodb.github.io/node-mongodb-native/2.2/api/

- Functions in the API that take a callback often also will return a promise if no callback is supplied.

<br>

### Collections

Before you can start reading from and writing to your database, you'll have to specify the collection that you are interested in. If you specify a collection that doesn't exist then it will create it for you when you do an insert.

```js
MongoClient.connect(url)
    .then(db => {
        const collection = db.collection('test');
        collection.insertOne({ foo: 'bar' })
            .then(function(result) {
                console.log(result);
                db.close();
            })
            .catch(function(e) {
                console.error(e.stack);
            });

    });
```

<br>

### Insert

There are various insert methods. Here are two:

- [insertOne](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#insertOne)

- [insertMany](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#insertMany)

<br>

### Find

You can use find to get back a cursor. A cursor is a pointer to data. You can iterate over the cursor to get the data from the database.

- [Projections](http://mongodb.github.io/node-mongodb-native/2.2/tutorials/projections/) are used to query the database.

- [find](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find)

- [cursor](http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html)

Two common functions that you can use from the cursor are [forEach](http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html#forEach) and [each](http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html#each).

<br>

### Update

- [findOneAndUpdate](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate) - An atomic operation that performs a lock on the database.

- [updateOne](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#updateOne) - Update the first document that matches the filter.

- [updateMany](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#updateMany) - Update multiple documents at once.

<br>

### Delete

- [deleteMany](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#deleteMany) - Delete all documents that match the filter.

- [deleteOne](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#deleteOne) - Delete the first document that matches the filter.

## Unit Tests

- Your controllers will be the last layer of code before interacting with the database.

- You want to test your controllers thoroughly otherwise errors here will cause errors everywhere.

- You don't want to test on a production database so you should use dependency injection to specify the database to use.

- The database to load should also be specified via a function.

**db.js**

```js
const MongoClient = require('mongodb').MongoClient;

// returns a promise for a dabase connection
module.exports = function(dbName) {
    const url = 'mongodb://localhost:27017/' + dbName;
    return MongoClient.connect(url);
};
```

**controller.js**

```js
module.exports = function (dbPromise) {
    const ctrl = {};
    const collectionPromise = dbPromise
        .then(db => db.collection('myCollection'));

    ctrl.findById = function(id) {
        return collectionPromise
            .then(collection => {
                return collection
                    .find({ _id: id })
                    .limit(1)
                    .toArray();
            })
            .then(array => array[0]);
    }

    return ctrl;
}
```

**Unit Test Example**

```js
const Database = require('./db');
const Controller = require('./controller');

describe('some test group', () => {
    let dbPromise;
    let controllerPromise;

    before(() => {
        dbPromise = Database('temporaryDatabase');
        controllerPromise = Controller(dbPromise);
    });

    after(() => {
        dbPromise
            .then(db => db.dropDatabase())
            .then(() => db.close());
    });

    it('can find by id', () => {
        return controller.findById('foo')
            .then(value => {
                // run assertions
            });
    });

});
```
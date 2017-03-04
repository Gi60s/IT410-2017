# Unit Tests

## About Testing

- There are two main types of testing: unit tests and end-to-end tests.

    - Unit tests are use to test the individual components of your application.

    - End-to-end tests verify that all of the components are working together for a complete solution.

- There are three aspects to testing:

    - Test runners execute the tests.

    - Assertion libraries are used to verify that input produces expected output.

    - Reporters format the results of the test to be readable by people or applications.

- Some test libraries combine runners, assertions, and reporters into one inseparable library.

- There are various assertion styles:

    - BDD - Behavior driven development

    - TDD - Test driven development

    - Assertion driven development.

    - ATDD - Acceptance test driven development.

## Mocha

https://mochajs.org/

- A test runner.

- Allow you to choose your assertion library and your reporter.

- High flexibility, lots of plugins.

- Needs to be installed globally `npm install -g mocha` as well as within your project `npm install --save-dev mocha`.

<br>

### Basic Mocha Example

```js
describe('some group of tests', () => {

    it('test #1 description', () => {
        // put assertions here
    });

    it('test #2 description', () => {
        // put assertions here
    });

});
```

<br>

### BDD Example

```js
describe('user', () => {

    it('can add a new user', () => {
        // put assertions here
    });

    it('cannot add a user with duplicate username', () => {
        // put assertions here
    });

});
```

<br>

### Set Up and Take Down

- Each test should be run from an expected state.

- Avoid letting other tests modify state.

```js
describe('some group of tests', () => {

    before(() => {
        // do something before all tests in this group - initial setup
    });

    after(() => {
        // do something after all tests in this group - final clean up
    });

    beforeEach(() => {
        // do something before each test in this group - reset the environment
    });

    afterEach(() => {
        // do something after each tests in this group - clean up
    });

    it('test #1 description', () => {
        // put assertions here
    });

});
```

<br>

### Sub Groups

- You can organize your code into sub-groups.

- Allows you to be more specific in set up and take down of test environment.

- Produces easier to read reports.

```js
describe('some group of tests', () => {

    describe('a sub group of tests', () => {

        it('test #1 description within subgroup', () => {
            // put assertions here
        });

    });

});
```

<br>

### Asynchronous Testing

- Each test can use the callback paradigm or the promise paradigm.

- To use the callback paradigm add the `done` parameter to a test.

- To use the promise paradigm return a promise.

```js
describe('some group of tests', () => {

    it('callback', done => {
        // run assertions
        done();     // or done(err) to send an error
    });

    it('promise', () => {
        return foo()
            .then(value) {
                // run assertions
            });
    });

});
```

<br>

### Running Tests

- Put all of your tests in one directory that is separate from the rest of your files.

- Import/require the libraries you're testing.

- Run the tests using the command line: `mocha directoryToTest`

## Chai

http://chaijs.com/

- A test assertion library.

- Can be used with mocha but does not need to be used with mocha.

- It uses [language chains](http://chaijs.com/api/bdd/) to make tests human readable.

- Install for your project: `npm install --save-dev chai`.

```js
const expect = require('chai').expect;      // use BDD assertions
const users = require('../bin/users');      // the library we're testing

describe('user', () => {

    beforeEach(() => {
        users.deleteAll();
    });

    it('has no users', () => {
        const actual = users.getAll().length;
        expect(actual).to.equal(0);
    });

    it('can add a new user', () => {
        const obj = { user: 'Bob', age: 5 };
        users.add(obj);

        const actual = users.get('Bob');
        expect(actual).to.deep.equal(obj);
    });

});
```

## Exercise

1. Clone from github the https://github.com/Gi60s/it410-resources repository: `git` clone https://github.com/Gi60s/it410-resources.git`

2. Navigate to the `unit-tests` directory and run `npm install`.

3. Write some tests to test the `users.js` file.

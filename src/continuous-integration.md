# Continuous Integration (CI)

## About

- The practice of releasing code updates on a regular basis, sometimes several times per day.

- It is becoming less common to have long development cycles.

- Bug fixes and small features don't need to wait for the next big release.

<br>

### Testing

- Unit tests and integration tests go hand in hand with CI.

- Without tests it is hard to have confidence that your changes haven't broken things.

<br>

### Deployment

- Once tests pass then code can be pushed to production automatically.

## How to Implement CI

- There are many services for implementing the CI pipepline. Here are a few:

    - Bamboo

    - Bitwise

    - CircleCI

    - Codeship

    - Jenkins

    - TravisCI

- Many of these rely on a version control system (VCS) that has web hooks, like github.

    - A web hook is a service where one server can be notified of events by another.

- You choose your CI service, hook it up to your VCS, and tell it which tests to run and how to deploy on success.

## Travis CI

- [Travis CI Documentation](https://docs.travis-ci.com/)

- [Getting Started Guide](https://docs.travis-ci.com/user/getting-started)

<br>

### NodeJS

[NodeJS Getting Started Guide](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)

- Travis looks for a `.travis.yaml` configuration file in the root of your project.

- The configuration file can define the project's language (`node_js` in our case), the versions to test, and the script to run for your tests, etc.

- Travis CI will by default run `npm install` installing all of your project's dependencies.

- Example configuration file:

    ```yaml
    language: node_js
    node_js:
      - 7                   // any version accepted by nvm are OK to use
      - 6
      - 5
      - 4
    script: npm test        // this is the default script
    ```

<br>

### Additional Steps

- Create an account with Travis CI

- Allow Travis CI to access your Github and to set up hooks.

- Through Travis CI website add repositories

The next time you push your code to Github, Travis detects the push and starts the build.

(Show example Travis CI Log)

## Deploy

- Deployment is the final step for CI.

- If the tests all pass then the code is ready to be deployed.

- Deployment is configured via the `deploy` attribute in the configuration file.

- [Deployment Documentation](https://docs.travis-ci.com/user/deployment/)

## Code Coverage Reports

- You have the option to have Travis CI produce a code coverage report for [Coveralls](https://coveralls.io).

- You'll need to set up a Coveralls account and link it to github too.

- Inside of your `package.json` file you'll need to create a script that sends a report to coveralls. See the example below with the script: `coverage:report`

    ```json
    {
      "name": "my-package",
      "version": "1.0.3",
      "main": "index.js",
      "scripts": {
        "test": "mocha test/*.js",
        "coverage": "nyc mocha test/*.js",
        "coverage:report": "nyc mocha test/*.js && nyc report --reporter=text-lcov | coveralls"
      },
      "author": "Your Name",
      "license": "Apache-2.0",
    }
    ```
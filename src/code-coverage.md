# Code Coverage

## About

- Goes hand in hand with testing

- Tells you what parts of your code haven't been been run during testing.

- Makes it easier to know where you need to test your code still.

- Does not guarantee that your code is thoroughly tested.

## How to Use It

- Istanbul is a good code coverage tool.

- The `nyc` npm package runs the istanbul test coverage tool for you.

- There are [multiple reporters](https://github.com/istanbuljs/istanbul-reports).

- [Instructions on Instanbul with Mocha](https://istanbul.js.org/docs/tutorials/mocha/)

    1. `npm install --save-dev nyc`

    2. Update your package.json to have a new run script:

        ```json
        "scripts": {
            "test": "mocha test/*.js",
            "coverage": "nyc --reporter=html --reporter=text mocha test/*.js"
        },
        ```

    3. Run the coverage script: `npm run coverage`

<br>

**Exercise**

1. Clone the repository: `https://github.com/Gi60s/it410-resources.git`

2. Navigate to the `code-coverage` directory.

3. Use `npm install` to install dependencies.

4. Write tests.

5. Write a coverage script in your `package.json` and run it.
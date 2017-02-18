# Asynchronous JavaScript

## An Introduction to the FS Core Module

- We are going to create a JavaScript file that reads a file.

- First read a file using [fs.readFileSync](https://nodejs.org/api/fs.html#fs_fs_readfilesync_file_options). This is a synchronous blocking operation.

- Next read a file using [fs.readFile](https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback) that uses a callback. This is an asynchronous non-blocking operation.

    - Notice that the callback gets two parameters: error and data.

<br>

**Question:** We are passing a callback function to `fs.readFile`. Were is our callback function being called?
<br>

**Answer:** The callback is being called by `fs.readFile` once it has read the file.
<br>

<hr>

**Question:** Who decides what parameters the callback function will receive, the callback function itself or `fs.readFile`? Why?
<br>

**Answer:** `fs.readFile` is the calling function so it gets to decide which parameters it will send to our callback function. Remember that the calling signature does not need to match the function definition's signature.
<br>

### Examples

There are some examples files we can use to look more into the behaviour of synchronous vs asynchronous functions.

- Use git to clone the repository: `https://github.com/Gi60s/it410-resources.git`

- Navigate into the directory: `async`

- We need to initialize the files. Run the command: `node 0-make-files`

    - This will generate three large files (`small.txt`, `medium.txt`, and `large.txt`) into the `async/files` directory.

    - You will probably want to delete these files when we're done with the examples.

<br>

#### Example 1

- File name: `1-sync.js`

- This will read each of the files using synchronous blocking functions.

- The time to read each file will be output (in milliseconds) as well as the total time.

- Run the example: `node 1-sync`

<br>

#### Example 2

- File name: `2-async.js`

- This will read each of the files using asynchronous non-blocking functions.

- The time to read each file will be output (in milliseconds) as well as the total time.

- Run the example: `node 1-sync`

<br>

**Question:** There is something wrong with the output. Can you tell what the code did wrong?
<br>

**Answer:** The event queue had not yet resolved the asynchronous requests when we logged the total time.
<br>

### The Event Queue

- JavaScript continues to execute it's current set of instructions until completed.

- Once idle JavaScript checks the event queue for events to take action on.

- The event queue will never to accessed if the code never idles.

#### Example 3

- File name: `3-event-queue.js`

- This will add an event to the event queue that should run after 100 milliseconds, as soon as the process is idle.

- The event will trigger a function call that will output the delay.

- Run the example: `node 3-event-queue`

<br>

- Now uncomment the synchronous blocking call to read the large file.

- Run the example again and observe the change in time.

- The event appeared on the event queue at 100 milliseconds but the process was busy for a while before it could fire the event's callback function.

#### Example 4

- File name: `4-async.js`

- Will load all three files asynchronously and output the time for each as well as the total time.

- Run the example: `node 3-event-queue`

<br>

**Question:** Why wasn't this any faster than the synchronous blocking code?
<br>

**Answer:** We didn't start to read the next file until the previous had finished. We didn't block the process so it could have done other things, but it waited on the previous file before loading the next file.
<br>

**Question:** How can we read all three files simultaneously and report their load times and the total read time?
<br>

**Answer:** Look at the example in `5-async.js`.

## Managing Complex Asynchronous Operations

- Callbacks provide a nice way to use asynchronous functions.

- Unfortunately they can create the pyramid of doom.

- Under complex conditional asynchronous programming they become difficult to manage flow.

- Promises to the rescue.
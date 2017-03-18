# Process Management

## What is a Process

A process is a running computer program. When we write a NodeJS application and then run it `node myapp.js` we create a running process for our NodeJS application.

Some processes are meant to be run once and then terminate. Some processes are meant to run indefinitely.

<br>

**Question:** What is an example of an process that should run once and then terminate?
<br>

**Answer:** A few examples in Linux: grep, cat, ls.
<br>

**Question:** What is an example of an application that should run indefinitely?
<br>

**Answer:** A web server.
<br>

**Question:** What happens if a process is running and a error occurs?
<br>

**Answer:** The process terminates with an exit error code.

## Uncaught Exceptions (Errors)

If your program throws an error and it is not caught then your program will crash.

**Question:** How do you catch an error in JavaScript?
<br>

**Answer:** Use a try catch block.

```js
try {
    throw Error('Error occurred.');
} catch (e) {

}
```

<br>

It is also possible to catch all errors:

```js
process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});
```

<br>

**Question:** Should you catch all errors or should you let your program crash sometimes?
<br>

**Answer:** Although you can catch all errors, some errors should not be recovered from.

> By the very nature of how throw works in JavaScript, there is almost never any way to safely "pick up where you left off", without leaking references, or creating some other sort of undefined brittle state. https://nodejs.org/api/domain.html

<br>

You should catch the errors that you can deal with and let any other propagate upwards.

**Recoverable Error Example**

You've created a web server. A client makes a request to your webserver for a specific file. You attempt to read the file but it doesn't exist, throwing an error. You can catch the error and return a 404 status code (file not found) and your code can continue to run with stability.

If your process becomes unstable your best option is to shut it down.

## The PM2 Daemon

Pronounced [dee-muh n] http://dictionary.reference.com/browse/daemon

A daemon is a computer process that runs in the background and often starts up with the operating system. Often they are used to start other processes.

PM2 is a NodeJS module that is best installed globally on the machine. It's primary role is to start your application and keep it running. If your program crashes, it starts it again.

- [PM2 Homepage](http://pm2.keymetrics.io/)

- [PM2 Quick Start](http://pm2.keymetrics.io/docs/usage/quick-start/)

Install pm2 globally: `npm install -g pm2`

<br>

**Exercise Part 1**

1. Do a git clone of `https://github.com/Gi60s/it410-resources.git`.

2. Navigate to the `process-management` directory.

3. This is an app that will randomly crash. Run it with `node index.js`.

<br>

**Exercise Part 2**

1. Start the same application using pm2: `pm2 start index.js --name crashing-app`

2. Use the command `pm2 status` to check that status of the app a few times.

3. Use the command `pm2 logs` to view the logs.

4. Use the command `pm2 stop crashing-app` to stop the process.

## Useful PM2 Commands

Try some of these commands out to see for yourself how easy they are to use and to see their output.

### Process Management

`pm2 status` or `pm2 list` - Get the current status of all running processes.

`pm2 start <file> --name "App"` - Start the node app at <file> and give it the name "App".

`pm2 stop <app_name|id>` - Stop a specific process.

`pm2 restart <app_name|id>` - Restart a specific process.

`pm2 start <file> --watch` - Start the node app and watch it, files in the same directory, and files in sub-directories for changes. If a change occurs then the app will automatically restart.

`pm2 stop <app_name|id> --watch` - Stop watching for changes.

### Logs

`pm2 logs` - Get a live stream of all logs for all pm2 applications.

`pm2 logs 0` - Get a live stream of all logs for a single application.

### Monitoring

`pm2 monit` - Get CPU and memory usage for all running processes.

<hr>

## Clustering

- Modern CPUs have multiple cores that allow it to process multiple things concurrently.

- Clustering has to do with running your node application on multiple CPUs at the same time.

- Clustering is load balancing for a single machine.

`pm2 start <file> -i 0` - Start clustering on all CPUs.

`pm2 start <file> -i 2` - Start clustering on 2 CPUs.

`pm2 reload <app_name|id>` - Gracefully restart the application. At least one clustered process will be running at all times during the restart. This maintains 100% up time of your application, ideal for production environments.
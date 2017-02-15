# Gulp

## About Gulp

- Gulp is a task orchestration system.

- Run multiple small tasks to accomplish one large end task.

- Example: You can use gulp to automatically transpile your [SASS](/sass/1) into CSS.

- Similar to Grunt, but less configuration and it runs faster. [Objective Comparison of Grunt vs Gulp](https://medium.com/@preslavrachev/gulp-vs-grunt-why-one-why-the-other-f5d3b398edc4#.l50838ihv)

<br>

### Why Use a Task Orchestration System

- Front-end web development code is often transpiled.

    - Write code using the latest tools.

    - Makes code smaller to reduce download times.

    - Improves code compatibility for older browsers.

- Run automated testing and deployment.

## Getting Started

1. Clone the repository: `https://github.com/Gi60s/it410-resources.git`

2. Navigate to the directory `gulp`.

3. From the command line: `npm init`

4. Follow the [Getting Started Guide](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md).

5. From the command line run: `gulp`

## Gulp Tasks

[gulp.task](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname--deps-fn)

Notice that there is a second argument that is optional that allows you to pass in an array of tasks to run before the callback is called.

## JavaScript Streams

- Gulp uses file streams to process input and produce output.

- Streams are similar to arrays except that they can have an infinite length.

- Often in a stream some code is feeding into the stream while other code is reading from the stream.

- The first item in the stream is usually the first one out.

- The stream reader waits until data arrives.

- The stream write writes data whenever it chooses to.

- You may be familiar with pipes (from Unix) and how you can pipe (or stream) the output from one command into the input of another command.

## Gulp File Streams

- Streams consist of objects called Vinyl files. It is a simple metadata object that describes a file's properties (such as file size, location, content, etc.)

- Vinyl files are virtual files that exist only in memory, saving time by not writing to disk.

- Gulp provides vinyl adapters that transform real files into vinyl files and vinyl files into real files.

- Gulp vinyl adapters:

    - `gulp.src(globs)` - Match a pattern for actual files and create a steam of vinyl objects.

    - `gulp.dest(globs)` - Take vinyl files and produce actual files.

    - `gulp.watch(globs)`. - Watch actual files for changes and create a vinyl stream for any changed files.

    - The parameters for these functions can be either a string or an array of strings.

## Globs

- Globs are a file path matching pattern system.

- They originated with Unix.

- The glob library that gulp uses: [node-glob](https://github.com/isaacs/node-glob)

## Define a SASS Transpiler Task

Continuing from the Getting Started section:

1. Create a SASS Transpiler task using [gulp-sass](https://www.npmjs.com/package/gulp-sass).

2. Have the default task start the watcher.

3. Start the default task from the terminal: `gulp` or `gulp default`.

4. Modify the SASS file while the task is running, save, and watch the file update.

## Useful Gulp Plugins

- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) - Will automatically add vendor specific prefixes to your CSS.

- [gulp-csso](https://www.npmjs.com/package/gulp-csso) - Will minify CSS.

- [gulp-if](https://www.npmjs.com/package/gulp-if) - Conditionally runs streams.

- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) - Will automatically optimize your images for faster web page loading.

- [gulp-minify-html](https://www.npmjs.com/package/gulp-minify-html) - Will take comments and unnecissary white space out ouf your HTML.

- [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) - Will prevent errors from crashing your streams.

- [gulp-sass](https://www.npmjs.com/package/gulp-sass) - Will convert your SASS and SCSS files into CSS files.

- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) - Will minify your JavaScript.

## Gulp Homework Cancelled

The title says it all.
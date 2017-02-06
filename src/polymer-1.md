# Polymer

## Setup

1. Download or clone the resource files from: https://github.com/Gi60s/it410-resources
2. We'll be working in the directory `polymer/stars`.
3. We need to install several dependencies: `npm install -g bower http-server`

## Bower

- A package manager.
- Helps you to acquire all dependencies.
- Easy to add and remove dependencies.
- Stores dependencies in a configuration file.
- Easy to reinstall dependencies from configuration file.

<br>

### Initialize Bower

1. From the `polymer/stars` directory, run the command: `bower init`.
2. Allow defaults for command prompts, except make sure that the package is set to private.
3. Now we have a `bower.json` file.

<br>

### Add Bower Dependencies

For this project we need to add the Polymer iron-icon and iron-icons dependencies.

- Documentation: https://www.webcomponents.org/element/PolymerElements/iron-icon and https://www.webcomponents.org/element/PolymerElements/iron-icons
- Bower install: `bower install --save PolymerElements/iron-icon PolymerElements/iron-icons`

What did bower install do?

- Because we included the `--save` argument, those dependencies have been added to the `bower.json` file.
- We now have a directory called `bower_components` that has all of our dependencies.

## Project Structure

Lets take a minute to look at the current project structure:

### index.html

- A single HTML page that includes `web-components-lite.js`. This is a polyfill for web components.

    -Browsers that don't support Web Components v0 will use this file to implement web components.

- An import statement for `demo.html`. That is the main file for our application.

    - An import essentially just injects the HTML from another file into this file.

    - Most browsers have decided not to implement this, but the polyfill will do this for us.

- An HTML element called `icon-toggle-demo`.

<br>

### demo.html

- Imports the Polymer library and the `icon-toggle.html`.

- Defines a DOM module element with ID. The ID is also used in the JavaScript to link the DOM module to the Polymer web component.

<br>

### icon-toggle.html

- Imports Polymer library, iron-icons, and iron-icon.

- Defines an icon toggle component that wraps iron-icon.

<br>

## Static File Server

We need some way to serve our files.

- When we used the command: `npm install -g http-server` we installed a static file server onto the computer.

- Call `http-server` from the command line to start the server in the current directory.

## Styling

We can add CSS variables to the icon-toggle that will allow different icon color.

Define a CSS variable: `var(--variable-name, defaultValue)`

1. Allow for specifying the fill and stroke color.

2. Allow for specifying the fill color for the pressed state.

3. Go to the `demo.html` file and in the `:host` assign values to those CSS variables.

4. Reload the page to see that the colors have changed.

## Properties

- Polymer web component properties can be created by adding properties to the Polymer object for that component.

- Any properties that are to be tied to attributes must be within a `properties` property.

We want to be able to specify what icon we want the icon-toggle to use.

1. Notice in the demo.html that their are attributes for the `icon-toggle` elements called `toggle-icon`. We want this attribute to tell the icon-toggle which icon to use.

2. In the togle-icon.html file, add a properties object and within that add a `toggleIcon` property that is of type `String`. The type is used to deserialize the attribute value.

3. Add a one-way binding (using double square brackets) for the iron-icon to specify the icon to use.

4. Reload the page to see that the icons have changed.

<br>

Now we want to be able to click the icon to toggle its pressed state.

1. Notice in the demo.html file that some `toggle-icon` elements have the `pressed` attribute. (Their look is currently controlled with the CSS.)

2. In the `toggle-icon.html` file add an attribute property: `pressed`

    - type: `Boolean`

    - value: false

    - notify: true

    - reflectToAttribute: true

3. Add a listener property and within that the key value pair: `tap: 'toggle'`.

4. Add a `toggle` property that is a function that toggles the pressed state.

5. Reload the page and observe changes.

## One Way Binding vs Two Way Binding

- If you use square brackets then it's a read only binding.

- If you use curly braces then it's a read-write binding, but the child component must also notify of property change.

We're going to make it so that clicking one star causes both to have the same state, but clicking the other star only changes the state of that star.

1. Define a property called `starState`:

    - type: Boolean

    - value: false

2. Add a two way binding for one star and a two way binding for the other.

**Note:** This only works because within the `icon-toggle.html`, the pressed state has been set to `notify` of changes.

## Dom-Repeat

Polymer comes with some template modifiers. This is an introduction to dom-repeat.

1. Create a new section on the `demo.html` page called "Many Stars".

2. Add a `paper-button` element that says 'Add Star'. You'll also need to use bower to add the paper-button dependency.

3. Add a template with dom-repeat: `<template is='dom-repeat' items=[[stars]]></template>`. The items attribute binds an iterable data source to be repeated.

4. Add a property `stars`:

    - type: Array

    - value: []

5. Add a property method: `addStar`.

    - We use a different way to push items on an array (due to object observation constraints).

    - We push objects instead of primitives because each item in the dom-repeat must be unique and primitives can easily violate that constraint.

    - `this.push('stars', { value: false })`

6. Add an `on-tap="addStar"` to the "Add Star" button.

7. Within the dom-repeat add toggle-icons with stars and add a paper-button with attribute `on-tap="removeStar"`.

8. Create a `removeStar` method with this body:

    ```js
    var item = event.model.get('item');
    var index = this.stars.indexOf(item);
    this.splice('stars', index, 1);
    ```

9. Reload the page to see changes.

## Resources to Learn Polymer

There is a lot to learn about Polymer and we won't attempt to cover it all in one class, so here are some great learning resources:

- [Polycasts with Rob Dodson](https://www.youtube.com/playlist?list=PLNYkxOF6rcIDdS7HWIC_BYRunV6MHs5xo) - A series of very well done, clear, and concise videos that teach you how to write Polymer applications and web components.
- [Polymer Home Page](https://www.polymer-project.org)
   - [Developer Guide](https://www.polymer-project.org/1.0/docs/devguide/feature-overview.html) - A comprehensive guide on everything you need to know about how polymer works. Read this very carefully, twice.
   - [Elements Catalog](https://elements.polymer-project.org/)

<hr>

## The Elements Catalog

[Elements Catalog](https://elements.polymer-project.org/)

- **Iron Elements** - These are the core polymer elements upon which other elements are built.
- **Paper Elements** - Material design elements.
- **Google Web Components** - Components that use Google's API's and services.
- **Gold Elements** - Ecommerce elements.
- **Neon Elements** - Animation and special effects.
- **Platinum Elements** - Offline, push, and more.
- **Molecules** - Wrappers for third-party libraries.
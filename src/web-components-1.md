# Web Components (Part 1)

## Reference

These two pages will provide you everything you need to know about web components.

- https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom
- https://developers.google.com/web/fundamentals/getting-started/primers/customelements

## The Problem and the Solution

**The Problem**

Web applications are becoming increasingly complex. Complexity is hard to manage:

- Subtle bugs begin to occur.

- CSS specificity becomes a burden.

- Performance degradation.

- Difficult to isolate parts of your application.

<br>

**The Solution**

Web Components

- Introduces scoped styles.

- Hides HTML, JS, and CSS details.

- Creates reusable bundles of HTML, CSS, and JS.

- Reduces complexity - focus on small pieces of code.

- Has an API

## Button Toggle Web Component

We're going to build a web component in class:

- It will be a toggleable button.

- Clicking the button will toggle the state.

- The toggle state will by synchronized with HTML element attributes.

- The button can also be disabled during which clicking the button will not toggle the state.

- Toggle state and disabled state can also be conrolled via JavaScript.

<br>

### Instructions

1. Get the source files from `https://github.com/Gi60s/it410-resources.git`.

2. The file we'll be modifying is at `it410-resources/web-components/button-toggle/button-toggle.js`.

3. Using an evergreen browser, open the file at `it410-resources/web-components/button-toggle/index.html`.

<br>

### About index.html

- It loads the web component script.

- It has a toggle buttons initialized to all four possible states.

- It has one button that interacts with the Light DOM.

<br>

### About button-toggle.js

- Uses Web Components v1 Standard

- All evergreen browsers support this standard (except Edge which will have support by the end of March 2017).

- Older browsers will need Polyfills.

- Uses ES6 backticks to denote a multiline string.

- Uses ES6 classes (syntactic sugar on top of prototypical inheritance).

- Uses the Shadow DOM.

- Uses Custom Elements.

<br>

### About the Shadow DOM

**Question:** If you lived in the Star Wars universe and had the ability to use the Force, would you be a Jedi or a Sith?
<br>

**FYI:** You are about to get a little taste of the *dark-side*. Be careful that it does not draw you in.
<br>

There are three DOM types:

- *The light DOM* - What web pages have operated in since the beginning.

- *The shadow DOM* - Allows for encapsulation of HTML, CSS, and JavaScript.

- *The shady DOM* - An area between the light DOM and shadow DOM where both have a little control.

<br>

### Styles

- Styles within the Shadow DOM are unaffected by Light DOM styles and vice versa.

- Styles in the Shady DOM are affected by both the Shadow DOM and Light DOM, but the Light DOM has priority.

- The `:host` and `::slotted` are part of the Shady DOM. More on those later.

#### Style Encapsulation

- Make the div look like a button.

- Demonstrate that the Light DOM styling does not affect the div.

- Demonstrate that the Shadow DOM styling does not affect the Light DOM.

<br>

We want out Shadow DOM styles to be affected by Light DOM HTML:

- Introduce `:host`.

- Any styles applied directly to `:host` can be overwritten by Light DOM styles.

- We want to add styles to the `div` within our custom element for:

    1. An enabled untoggled state.

    2. An enabled toggled state.

    3. A disabled untoggled state.

    4. A disabled toggled state.

<br>

### JavaScript

- Using JavaScript, add getters and setters for:

    - disabled

    - pressed

- Add a method: `toggle` that will toggle the pressed state.

- Add a click listener to the `div` that will toggle the pressed state if not disabled.

<br>

### Slots

- Slots are insertion points for content from the Light DOM.

- Slot content resides within the Shady DOM.

- Shadow DOM styles can only penetrate the slots one level deep.

<br>

We're going to:

1. Add a default slot to our component.

2. Inject custom content into a button-toggle.


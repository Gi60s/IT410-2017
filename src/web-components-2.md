# Web Components (Part 2)

## Reference

These two pages will provide you everything you need to know about web components.

- https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom
- https://developers.google.com/web/fundamentals/getting-started/primers/customelements

## Web Component Names

All web components must have two or more words separated by a dash.

- A web component called `button-toggle` is valid.

- A web component called `buttontoggle` would not be valid.

- All native HTML elements have a single word, so web components are distinguished by having multiple.

## Today's Objective

- Create a `tabbed-content` web component.

- Provides a way to put tabs at the top of a content area.

- Tabs can have custom titles and HTML within them.

- Clicking a tab will reveal the associated content and hide other tabs' content.

- We'll provide a CSS interface for sending custom styling into the Shadow DOM.
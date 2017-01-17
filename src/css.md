# CSS

## Questions

**Question:** What is CSS used for?
<br>

**Answer:** It is the style portion of your web application. It controls the look.

*Regular Button* vs *Styled Button*

<button>My Button</button>
<button style="border: 1px solid #09D; background-color: #0BF; border-radius: 4px; padding: 5px 10px; color: #FFF; font-weight: bold">My Button</button>

Styles applied to second button:

```css
border: 1px solid #09D;
background-color: #0BF;
border-radius: 4px;
padding: 5px 10px;
color: #FFF;
font-weight: bold;
```
<br>

**Question:** What does CSS stand for?
<br>

**Answer:** Cascading Style Sheets

## Style Rules

There are a lot of CSS style rules to know, but you'll generally only use a small set of them.

[W3Schools CSS Tutorial](http://www.w3schools.com/css/)

## CSS Selectors

A selector tells the CSS *where* styles should be applied. There are three main types of selectors:

- **Tag** - A tag selector will match a given tag.
- **Class** - A class selector will match elements that have the same class name.
- **ID** - An ID selector will apply to the element with the specified ID.

### Tag Selector

All tags that match the selector will have the defined style applied. The following rule will make all `<p>` tags have bold red content.

**CSS**

```css
p {
    font-weight: bold;
    color: red;
}
```

**HTML**

```html
<p>Hello, World!</p>
```
<br>

### Class Selector

Class selectors start with a `.` (dot). For example:

**CSS**

```css
.my-class {
    border: 1px solid black;
}
```

**HTML**

```html
<p class="my-class">Hello, World!</p>
```
<br>

### ID Selector

ID selectors start with a `#`. For example:

**CSS**

```css
#my-id {
    text-align: center;
}
```

**HTML**

```html
<p id="my-id">Hello, World!</p>
```
<br>

### Compound Selectors

It is possible to join multiple selectors together to create more specific selectors.

This example shows how you can make all `<p>` tags with the `important` class have a specific style. In your html you'd write `<p class='important'> ... </p>` to have this style apply to it.

```css
p.important {
    font-weight: bold;
    color: red;
}
```
<br>

### Nested Selectors

You can also specify how something should look when it is a child or descendant of another selector.

- `div p { ... }` - This style rule would apply to all paragraph tags that are somewhere within a div tag.
- `div > p` { ... }` - This style would apply to all paragraph tags that are immediate children of a div tag.
- `#my-id > p > em { ... }` - This style applies to `em` tags that are immediate children of `p` tags that are immediate children of the element with attribute ID of `my-id`.
<br>

### Pseudo Selectors

Pseudo selectors are applied for certain states, such as checked, hover, focus, first-child, etc. [See a full list of pseudo selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes). A common use for this is to modify the way links work in different states.

```html
<style>
    a#styled {
        display: inline-block;
        color: #666;
        border: 1px solid #CCC;
        padding: 5px 10px;
        text-decoration: none;

        transition: background-color 500ms;
    }
    a#styled:hover {
        background-color: #e7a61a
    }

    a#styled:active {
        background-color: #e7d816;
    }
</style>

<a href="javascript: void 0">Example Link</a>
<a id="styled" href="javascript: void 0">Example Link</a>
```

<style>
    a#styled {
        display: inline-block;
        color: #666;
        border: 1px solid #CCC;
        padding: 5px 10px;
        text-decoration: none;

        transition: background-color 500ms;
    }
    a#styled:hover {
        background-color: #e7a61a
    }

    a#styled:active {
        background-color: #e7d816;
    }
</style>

<a href="javascript: void 0">Example Link</a>
<a id="styled" href="javascript: void 0">Example Link</a>
<br>

### Multiple Selectors

You can combine selectors so that more than one selector uses a specific style by separating selectors by commas.

```css
div > p,
ul > li {
    font-weight: bold;
}
```
<br>

### Additional Selectors

[Awesome Selectors Tutorial](https://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048)
<br>

### Selector Conflicts

Sometimes two selectors will try to apply competing styles to an element.

Rule of thumb: **The more specific selector has precedence or, all things being equal the last selector has precedence.**
<br>

#### Questions

**Question:** What is more specific, an ID or a tag?
<br>

**Answer:** An ID. Each ID should be unique, but the same tag can be used many times. For example, the `<p>` tag is used to generate many paragraphs.
<br>

<hr>

**Question:** What is more specific, a tag or a class?
<br>

**Answer:** According to CSS rules, a class is slightly more specific than a tag.
<br>

<hr>

**Question:** Looking at the following code example, what will the `<p>` look like?

CSS

```css
#main {
    border-color: blue;
}
p {
    border: 1px solid red;
}
p {
    border-bottom-width: 2px;
}
```

HTML

```html
<p id='main'>Hello, World!</p>
```
<br>

**Answer:**

<p style='border: 1px solid blue; border-bottom-width: 2px;'>Hello, World!</p>

## Adding CSS to your HTML

There are three ways to add CSS to your HTML:

### Including an External Style Sheet

- Generally preferred.
- Can improve performance for subsequent loads.
- Better code reuse.
- Non-blocking, the page continues to load while the CSS is being fetched.
- Use the `<link>` element, generally in the `<head>` of your document.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="my-styles.css">
</head>
<body>
    <p>Hello, World!</p>
</body>
</html>
```
<br>

### Inline Styles

- Loads with the page; no style flicker.
- Can cause the page to load slower.
- Poor code reuse.
- Use the `<style>` element, generally in the `<head>` of your document.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
    <style type="text/css">
        body {
              font-family: Arial, Helvetica, sans-serif;
        }
    </style>
</head>
<body>
    <p>Hello, World!</p>
</body>
</html>
```
<br>

### Styles on Element

- High priority, overwrites other rules (except with `!important`).
- Loads with the page; no style flicker.
- Can cause the page to load slower.
- Poor code reuse.
- Hard to update code.
- Should be avoided in most cases.
- Use the `style` attribute on an element. Separate style rules using the semi-colon.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
</head>
<body style="font-family: Arial, Helvetica, sans-serif;">
    <p>Hello, World!</p>
</body>
</html>
```

## Media Queries

Media queries allow you to specify what styles are defined under different conditions:

- *Width* - Useful for responsive design.
- *Screen* and *Print* - Simplify for print.

[Media Queries Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)

### Responsive Design

The layout of the page changes to fit the device width. Great for large screens and small screens.

Common breakpoints:

```css
/* Smartphones */
@media screen and (max-width : 767px) {

}

/* Tablets */
@media screen and (min-width : 768px) and (max-width : 991px) {

}

/* Desktop */
@media screen and (min-width : 991px) and (max-width : 1199px) {

}

/* Wide Screen Desktop */
@media screen and (min-width : 1200px) {

}
```

## Flexbox

- Advanced CSS layouts
- No need for tables to do layout

**Resources:**

- [Using Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)
- [Quick Reference](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Holy Grail Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes#Holy_Grail_Layout_example)
- [Flexbox Froggy](http://flexboxfroggy.com/)

## CSS Transitions and Animations

Perform transition between styles:

- Opacity
- Size
- Color

Animations perform multiple transitions with specialized timing:

**Demos:**

- [Gooey Menu](http://codepen.io/lbebber/pen/LELBEo)
- [3D Boxes](http://codepen.io/joshnh/full/paxbE)
- [Animated Buttons](https://tympanus.net/Tutorials/AnimatedButtons/index6.html)

**Resources:**

- [Transitions Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)
- [Animations Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [CSS Animation Library](https://daneden.github.io/animate.css/)

## CSS Tricks and Techniques

### Center a DIV Horizontally

Example URL: http://home.byu.edu/home/

- Set the width to a specific value
- Set the left and right margin's to `auto`.

**CSS**

```CSS
.container {
    width: 1024px;
    max-width: 100%;
    margin: 0 auto;
}
```

**HTML**

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="my-style.css">
</head>
<body>
    <div class='container'>
        <!-- put content here -->
    </div>
</body>
</html>
```
<br>

### Absolute Relative Position

You have an element on your page and you want to position another element into an exact location that is relative to the parent element.

- The parent element should be positioned as `relative`, `absolute`, `fixed`, or `sticky`.
- A descendant element should be positioned as `absolute` with one or more of `top`, `bottom`, `left`, `right`

**CSS**

```CSS
.container {
    width: 1024px;
    max-width: 100%;
    margin: 0 auto;
    position: relative;
}
#back-to-top {
    position: absolute;
    right: 0;
    bottom: 0;
}
```

**HTML**

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="my-style.css">
</head>
<body>
    <div class='container'>
        <a href='#top' id='back-to-top'>Back to Top</a>
        <!-- put content here -->
    </div>
</body>
</html>
```
# CSS

## Questions

**Question:** What is CSS used for?
<br>

**Answer:** It is the style portion of your web application. It controls the look.

*Regular Button* vs *Styled Button*

<button>My Button</button>
<button style="border: 1px solid #09D; background-color: #0BF; border-radius: 4px; padding: 5px 10px; color: #FFF; font-weight: bold">My Button</button>
<br>

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

### Compound Selectors

It is possible to join multiple selectors together to create more specific selectors.

This example shows how you can make all `<p>` tags with the `important` class have a specific style. In your html you'd write `<p class='important'> ... </p>` to have this style apply to it.

```css
p.important {
    font-weight: bold;
    color: red;
}
```

### Nested Selectors

You can also specify how something should look when it is a child or descendant of another selector.

- `div p { ... }` - This style rule would apply to all paragraph tags that are somewhere within a div tag.
- `div > p` { ... }` - This style would apply to all paragraph tags that are immediate children of a div tag.
- `#my-id > p > em { ... }` - This style applies to `em` tags that are immediate children of `p` tags that are immediate children of the element with attribute ID of `my-id`.

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

### Multiple Selectors

You can combine selectors so that more than one selector uses a specific style by separating selectors by commas.

```css
div > p,
ul > li {
    font-weight: bold;
}
```

### Selector Conflicts

Sometimes two selectors will try to apply competing styles to an element.

Rule of thumb: **The more specific selector has precedence or, all things being equal the last selector has precedence.**

#### Questions

1. What is more specific, an ID or a tag?
2. What is more specific, a tag or a class?
3. Looking at the following code example, what will the `<div>` look like?

CSS

```css
#main {
    border-color: blue;
}
div {
    border: 1px solid red;
}
div {
    border-bottom-width: 2px;
}
```

HTML

```html
<div id='main'>Hello, World!</div>
```

## Adding CSS to your HTML

There are three ways to add CSS to your HTML:

1. Including a style sheet (generally preferred)
2. Include an inline style (great for high performance styles)
3. Include a style rule on an element (generally frowned down upon)

### Exercises

Create an index.html file with this content:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
</head>
<body>
    <p>Hello, World!</p>
</body>
</html>
```

#### Exercise 1: Include Style Sheet

1. Create a file named `my-styles.css` in the same directory as the index.html file.
2. Add css to the my-styles.css file that will make the paragraph text bold, using: `font-weight: bold`.
3. Inside the `<head>` tag of your index.html file, include your my-style.css using: `<link type='text/css' rel='stylesheet' href='my-style.css'>`

##### Exercise 2: Inline Style

1. Inside the `<head>` tag of your index.html file and *after* your included style sheet add a `<style>` tag.
2. Inside that `<style>` tag add css to make the paragraph text underlined using: `text-decoration: underline`.

#### Exercise 3: Element Style Rule

1. On the `<p>` tag add an attribute `style` equal to `text-align: center; color: blue;`.

<hr>

### Exercise Solution

CSS

```css
p {
    font-weight: bold;
}
```

HTML

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
    <link type='text/css' rel='stylesheet' href='my-style.css'>
    <style>
        p {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <p style='text-align: center; color: blue;'>Hello, World!</p>
</body>
</html>
```

<hr>
# HTML

## HTML Template

The below template was taken from https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Sections_and_Outlines_of_an_HTML5_document and modified.

- CSS is generally included in the head of the file.
- JavaScript is generally included at the end of the body.
- Each section affects the size of headers.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
    <link type="text/css" rel="stylesheet" href="css/main.css">
</head>
<body>

<section>
    <h1>Forest elephants</h1>
    <section>
        <h1>Introduction</h1>
        <p>In this section, we discuss the lesser known forest elephants.</p>
    </section>
    <section>
        <h1>Habitat</h1>
        <p>Forest elephants do not live in trees but among them.</p>
    </section>
    <aside>
        <p>advertising block</p>
    </aside>
</section>

<footer>
    <p>(c) 2010 The Example company</p>
</footer>

<script type="text/javascript" src="js/main.js"></script>

</body>
</html>
```

<br>

### Tags

- A tag is used to define an HTML element.
- A tag starts and ends with `<` and `>` respectively. For example, the paragraph tag: `<p>`.
- Many tags also expect a closing tag to match an opening tag, like the paragraph. Closing tags start with `<\` and end with `>`. For example: `<p>Content</p>`
- If a tag doesn't need a closing tag then you just put the opening tag. For example, the horizontal rule tag: `<hr>`.
- [HTML Element Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

<br>

### Attributes

- All tags have attributes that can be used to further define how the tag looks or what it should do.
- Attributes exist within the opening tag, for example the image tag takes a source to define what image to display: `<img src='image.png'>`
- Two attributes that all elements can have are `class` and `id`.

<br>

### ID Attribute

- The `id` attribute defines a unique ID for an element. This id should be unique for the entire page. Example usage: `<p id='Main'></p>`.
- This attribute is often used to find the element using JavaScript.
- CSS also uses the ID attribute to define styles.

### The DOM

<br>

- The DOM is the document object model.
- A web browser produces the DOM after reading your HTML.
- The DOM is a tree structure made up of nodes. The tree structure mimics your HTML.
- There are [12 node types](http://www.w3schools.com/jsref/prop_node_nodetype.asp).
- An element is one type of node (represented in text by an HTML tag).

### Elements

<br>

- Each element has it's own attributes and display properties.
- The following code shows the difference between two very similar elements, the `div` and `span`.

**Code**

```html
<div>A</div>
<div>B</div>
<div>C</div>

<span>A</span>
<span>B</span>
<span>C</span>
```

**Output**

<div>A</div>
<div>B</div>
<div>C</div>

<span>A</span>
<span>B</span>
<span>C</span>

**Question:** What difference can you see between the `div` and `span`?
<br>

**Answer:**

- The `div` takes up the entire line while the `span` takes up just enough space for its content.
- The `div` is known as a [block-level](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements) element where the `span` is an [inline](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements) element.
<br>

Take a moment to look at:
- [block-level elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)
- [inline elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)

## Forms

- A form is a common way to provide a user input interface.
- There are many elements that are used together to make up forms.
- Any form elements with a `name` attribute are distinguished by that name.
- [Forms Reference](http://www.w3schools.com/html/html_forms.asp)

**Code**

```html
<form>
    <p>
        <label for='color'>Favorite Color:</label>
        <input id='color'>
    </p>

    <p>
        <label for='food'>Favorite Food:</label>
        <select id="food" name="food">
          <option value="fruit">Fruit</option>
          <option value="ice cream">Ice Cream</option>
          <option value="pizza">Pizza</option>
          <option value="vegetables">Vegetables</option>
        </select>
    </p>

    <p>
        <label>Gender</label>
        <label><input type="radio" name="gender" value="male"> Male</label>
        <label><input type="radio" name="gender" value="female"> Female</label>
    </p>

    <p>
        <button type="button" onclick="alert('Hello')">Hello Button</button>
    </p>
</form>
```

**Output**

<form>
    <p>
        <label for='color'>Favorite Color:</label>
        <input id='color'>
    </p>

    <p>
        <label for='food'>Favorite Food:</label>
        <select id="food" name="food">
          <option value="fruit">Fruit</option>
          <option value="ice cream">Ice Cream</option>
          <option value="pizza">Pizza</option>
          <option value="vegetables">Vegetables</option>
        </select>
    </p>

    <p>
        <label>Gender</label>
        <label><input type="radio" name="gender" value="male"> Male</label>
        <label><input type="radio" name="gender" value="female"> Female</label>
    </p>

    <p>
        <button type="button" onclick="alert('Hello')">Hello Button</button>
    </p>
</form>

## Developer Tools

- The latest browsers (IE, Edge, Firefox, Chrome, Safari) all have developer tools.
- You can look at how a webpage works using these tools.
- The tools are usually accessed through the browser menu.

### Try it Out

1. Open a browser to http://www.byu.edu
2. Open the developer tools.
3. Click on the Elements tab (or equivalent).
4. Click on elements in the developer console.
5. Use the element selector to select an element on the page.

## DOM Navigation and Manipulation

The content of a DOM can be modified via the browser DOM API.

### Selectors

- Used to select the elements of interest.
- Can use `document.querySelector` or `document.querySelectorAll` to get an array-like object.
- Select by tag, class, id, pseudo, etc.

<br>

### Navigation

Each DOM Node has properties that can be used to navigate the DOM. Here are some element properties:

- *children* - Get child elements.
- *nextElementSibling* - Get next sibling element.
- *previousElementSibling* - Get previous sibling element.
- *parent* - Get the element that is parent of this element.

Here are some Node properties:

- *childNodes* - Get all child nodes.
- *nextSibling* - Get next sibling node.
- *previousSibling* - Get previous sibling node.

<br>

### Manipulation

- *createElement*
- *getAttribute*, *setAttribute*, *removeAttribute*
- *appendChild*, *insertBefore*

<br>

### API Documentation

- [Node API](https://developer.mozilla.org/en-US/docs/Web/API/Node)
- [Element API](https://developer.mozilla.org/en-US/docs/Web/API/Element)
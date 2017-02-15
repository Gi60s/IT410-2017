# SASS

## About

- It stands for Syntactically Awesome Style Sheets

- Makes it easier to create complex style sheets.

- Easier to modify style sheets.

- It's a programming language that generates style sheets.

- Similar to CSS.

- Requires a transpiler: [Online SASS Transpiler](http://www.sassmeister.com/) or [Gulp Plugin](https://www.npmjs.com/package/gulp-sass).

## The Situation

- Your boss asked you to create a modal popup and following your boss's instructions you created the modal found at: https://github.com/Gi60s/it410-resources/tree/master/sass

- After you create it your boss wants to try some different looks:

    - How about a different amount of rounded edges in the corner of the window?

    - How about a different color than gray and black?

    - What about a different border width?

    - Lets try making the border 35% darker than the primary color.

- Changes to a single aspect of the design happen in multiple locations in the CSS.

- This is a relatively small CSS file.

- The problem can quickly get out of hand.

## Using SASS

1. Create a file called `modal.scss`.

2. Set up [nested selectors](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#nested_rules).

3. [Create variables](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#variables_)

4. [Create mixins](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) for browser vendor prefixes and use `@include` to call them.

5. [Use SASS Functions](http://sass-lang.com/documentation/Sass/Script/Functions.html) to darken the primary color, specifically look at [darken](http://sass-lang.com/documentation/Sass/Script/Functions.html#darken-instance_method).

6. Use a SASS Transpiler to turn the SASS into CSS.
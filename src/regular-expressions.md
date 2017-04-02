# Regular Expressions

## About

- A way to identify complicated string matches.

- High performance.

- [Cheat Sheet](https://www.debuggex.com/cheatsheet/regex/javascript)

- [Online RegEx Tester](http://www.regexpal.com/)

## Challenges

**Challenge** Write a regex that identifies a binary string.

These should pass:
 
```txt
1
0
11111
0000
010100010101
01010101
10
```

These should fail:

Anything that isn't just `0` or `1`.

<br>

**Solution**

```regexp
/^[01]+$/
```

<br>

**Challenge** Write a regex that identifies a binary string that is a multiple of 8 bits. In other words, one or more bytes.

These should pass:
 
```txt
01010101
0101011101110101
```

These should fail:
 
```txt
0101000101
01010111011110101
```

<br>

**Solution**

```regexp
/^(?:[01]{8})+$/
```

<br>

**Challenge** Write a regex that identifies hex strings. Only these characters are acceptable, but case doesn't matter: `0123456789ABCDEF`

Passes:

```txt
ab038f
abcdef0123456789
```

Fails:

```txt
hello
abcdefg0123456789
```

<br>

**Solution**

```regexp
/^[a-f0-9]+$/i
```

<br>

**Challenge** Find any two vowels `aeiouy` that are side by side.

<br>

**Solution**

```regexp
/[aeiouy]{2,}/
```

**Challenge** Capture everything between double dashes.

Passes:

```txt
abc --easy as 123-- abc come dance with me
```

<br>

**Solution**

```regexp
/--[\s\S]*?--/
```

<br>

## JavaScript and RegExp

- Test if a string matches the regular expression: 

    ```js
    const rx = /foo/;
    
    rx.test('some string');     // false
    rx.test('abc foo bar');     // true
    ```

- Replace a sequence in a string:

    ```js
    const str = 'Hello world';
    const modified = str.replace(/l/g, 't');  // Hetto wortd 
    ```
    
- Get capture groups:

    ```js
    const rx = /[a-z]*([aeiouy]{2,})[a-z]*/g;
    const str = 'I took the book to the lake to read at eight and you can too';
    
    let match;
    while (match = rx.exec(str)) {
        console.log(match);
    }
    ```
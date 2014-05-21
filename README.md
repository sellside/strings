# strings [![NPM version](https://badge.fury.io/js/strings.png)](http://badge.fury.io/js/strings)

> Easily replace and transform :props in strings.

Strings is the result of many hours on [screenhero](http://screenhero.com/) and a truly collaborative effort between [Brian Woodward](https://github.com/doowb) and [Jon Schlinkert](https://github.com/jonschlinkert).

Please [report any bugs or feature requests](https://github.com/assemble/strings/issues/new), thanks!

## Install
Install with [npm](npmjs.org):

```bash
npm i strings --save
```


### [bower](https://github.com/bower/bower)

```bash
bower install strings --save
```

## Basics
Main **Strings** concepts:

* [prop-strings](#prop-strings)
* [parsers](#parsers)
* [context](#context)

#### prop-strings

A prop-string, or `propstring`, is a sort of template with one or more delimiters denoting the strings that will replaced with actual values.

Example prop-string:

```js
:a/:b/:c
```

#### context

The data that will be used to replace properties in the prop-strings.

Example context:

```js
{
  a: 'aaa',
  b: 'bbb',
  c: 'ccc'
}
```

If used to replace the prop-strings in the previous section, the result would be:

```js
aaa/bbb/ccc
```

#### parsers

By default, Strings will parse and replace the values in the previous examples with no problem. Parsers are used to tell Strings how to process patterns that it can't natively.

Example:

```js
// replace all occurrences of `a` with `b`
strings.parser('a', {pattern: /a/g, replacement: 'b'});
```

## API
Initialize a new `Strings` object.

```js
var strings = new Strings();
```

Optionally pass a default [context](#context) to use:

```js
var strings = new Strings({dirname: 'foo/bar'});
```

An example use case is dynamically generating dest filepaths from source filepaths, in which case you might have "constants" that shouldn't change regardless of the filepath. like `destBase` or `cwd` etc.


#### .propstring( name, propstring )

Store a **named** prop-string:

```js
strings.propstring('foo', ':alpha/:beta/:gamma');
```


#### .parser( name, replacements )

Define a named parser to be used against any given prop-string.

Params:

* `name` (`String`): the name of the parser
* `replacements` (`object|array`): the replacement patterns to use, this is the logic for the parser. Replacement patterns consist of the following properties:
  - `pattern` (`regex|string`): the pattern to be replaced
  - `replacement` (`string|function`): the actual replacement to use. This is a string value or function used to replace or tranform the prop-strings. Also, in replacement functions `this` is the given context.


Example:

```js
strings.parser('foo', {
  pattern: /a/g,    // find all occurences of `a`
  replacement: 'b'  // and replace them with `b`
});
```

Or using a function:

```js
strings.parser('foo', {
  pattern: /a/g, // find all occurences of `a`
  replacement: function(match) {
    // and replace them with uppercase `A`
    return match.toUpperCase();
  }
});
```


#### .template( propstring, groups, context )

1. process a prop-string, using
1. an object or array of replacement patterns, with
1. context from the given object

```js
strings.template('{foo}/{bar}/{baz}/index.html', ['path'], context);
strings.template('{{foo}}/{{bar}}/{{baz}}/index.html', ['path'], context);
strings.template(':foo/:bar/:baz/index.html', ['path'], context);
strings.template(':foo/:bar/:baz/index.html', [{
  pattern: ':dirname',
  replacement: function () {
    return path.dirname(this.filepath);
  }
}], context);
```

#### .process( propstring, parsers, context )

Process the _named_ propstring using a _named_ collection of replacement patterns, and a context.

Params:

* `propstring` {String}: Named template used for building the final string
* `name` {String}: Name of replacement group to use for building the final string
* `context` {Object}: Optional Object to bind to replacment function as `this`

```js
strings.process('foo', 'a', context);
// or
strings.process('foo', ['a', 'b']);
```

#### .group( name, propstring, parsers )

Store a named group of propstring/parser mappings.

Params:

* `name` {String} the name of the group to store
* `propstring` {String}: the propstring to use
* `parsers` {String|Array}: name or array of names of parsers to use.

```js
strings.group('mapA', 'foo', ['a', 'b', 'c']);
strings.group('mapB', 'foo', ['d', 'e', 'slugify']);
```

#### .run( group, context )

Run the named [group](#group) using the given context.

* `group` {String}: The name of the group to use
* `context` {Object}: Optional Object to bind to replacment function as `this`

```js
strings.run('group-foo', context);
```


## Authors

**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/doowb)


**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2014 Brian Woodward, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on May 21, 2014._
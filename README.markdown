yarnify
=======

Knit together html, css, and javascript into reusable
[browserifiable](https://github.com/substack/node-browserify)
bundles.

example
=======

build a widget
--------------

Widgets are just html, css, and javascript.

Just hack up a widget/beep.html:

``` html
<div class="beep">
  <div class="title"></div>
  <div class="body"></div>
</div>
```

then bundle all the html in `widget/` into `widget/yarn.js`:

```
$ cd widget
$ yarnify knit -o yarn.js
```

now just `require('./yarn')` in a widget/index.js:

``` js
var yarn = require('./yarn');

module.exports = function (title) {
    var elem = yarn('./beep.html');
    elem.find('.title').text(title);
    
    return {
        body : function (x) { elem.find('.body').text(x) },
        appendTo : function (e) { elem.appendTo(e) }
    };
};
```

Now you can use this widget as a module with browserify!

``` js
var $ = require('jquery-browserify');
var widget = require('./widget');

$(function () {
    var w = widget('robots');
    w.body('in SPACE!');
    w.appendTo(document.body);
});
```

If you make a nifty reusable widget that other people could benefit from,
consider releasing it on npm!

usage
=====

```
Usage: yarnify [directory] OPTIONS

Generate a yarn output bundle from all the html and css files in [directory].

  OPTIONS
    -o output file or '-' (default)
```

methods
=======

These are the methods you can call on generated yarn bundles.

```
var yarn = require('./yarn')
```

yarn(file)
----------

Return a jquery handle on the html content at `file`.

todo
====

### scoped id and classes

Add a prefix to every `class` and `id` in the html based on the `package.json`
`name` field with a fallback to the parent directory name.

### bind css files to html files of the same name

Parse the corresponding css file for each html file
and also re-run the rules on appended elements.

### knit static assets (images) into a target directory

`cp -r $src/static $dst`

### register template engines for browser-side templating

install
=======

With [npm](http://npmjs.org) do:

```
npm install -g yarnify
```

license
=======

MIT

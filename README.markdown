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

Just hack up a beep.html:

``` html
<div class="beep">
  <div class="title"></div>
  <div class="body"></div>
</div>
```

then hack up a main.js:

``` js
var yarn = require('yarnify')(__dirname);

module.exports = function (title) {
    var elem = yarn('./beep.html');
    elem.find('.title').text(title);
    
    return {
        body : function (x) { elem.find('.body').text(x) },
        appendTo : function (e) { elem.appendTo(e) }
    };
};
```

Bundle up the `main.js` with all the html and css:

```
$ cd widget
$ yarnify knit main.js -o index.js
$ cd ..
```

Now you can use this widget as a module with browserify!

``` js
var widget = require('./widget');
var w = widget('robots');
w.body('in SPACE!');
w.appendTo(document.body);
```

You can publish your widgets to npm too! Just make a package.json and set the
"main" to point at the `index.js` or whichever file you wrote the bundle to.

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

To install the command-line tool to knit bundles,
with [npm](http://npmjs.org) do:

```
npm install -g yarnify
```

then to use the bundles, install yarnify into your project with:

```
npm install yarnify
```

license
=======

MIT

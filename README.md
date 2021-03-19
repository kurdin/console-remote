<img src="http://console.re/assets/img/logo.png"/>

## CONSOLE REMOTE VERSION 2 RELEASED

## Remote JavaScript <a href="http://console.re">Console.Re</a> connector script for advanced logging, debugging and testing

Send log, debug or test information from any webpage, web mobile app or node.js server to remote logger. View output results on any device: tablet, phone or desktop in a separate browser window at http://console.re/project-channel-name.

Connector script extends `console` object adding new methods for sending messages to remote logger with:

<a href="#consolerelog">`console.re.log();`</a> <a href="#consolereinfo">`console.re.info();`</a> <a href="#consoleredebug">`console.re.debug();`</a> <a href="#consolerewarn">`console.re.warn();`</a> <a href="#consolereerror">`console.re.error();`</a> <a href="#consolerecount">`console.re.count();`</a> <a href="#consoleretest">`console.re.test();`</a> <a href="#consoleretype">`console.re.type();`</a> <a href="#consolereassert">`console.re.assert();`</a> <a href="#consoleretime">`console.re.time();`</a> <a href="#consoleretimeend">`console.re.timeEnd();`</a> <a href="#consolerenow">`console.re.now();`</a> <a href="#consoleretrace">`console.re.trace();`</a> <a href="#consolereclear">`console.re.clear();`</a> <a href="#consoleremark">`console.re.mark();`</a>

Moreover, while using in browsers, you can log information about DOM elements, CSS properties, track Media Queries and Window size changes with:

<a href="#consoleresize">`console.re.size();`</a> <a href="#consolerecss">`console.re.css();`</a> <a href="#consoleremedia">`console.re.media();`</a>

Remote JavaScript Console simplifies front-end (in browsers) and backend (in node.js) web development and testing. No plugins, no browser extensions requred, pure JavaScript.

<a href="http://console.re">Console.Re</a> connector (client) script works in **<a href="#supported-platforms">all major browsers</a>** (desktop or mobile) and **node.js** servers running on Linux, Mac, and Windows.

_Note:_ This is a client script, not a server. With this code, you can connect and send messages to any **project-channel-name** you want on our public `http://console.re` server, you can see your logs at `http://console.re/project-channel-name`. If you need your own private server please look at this.

_Warning:_ **Use Console.Re for development and testing environments only. DO NOT USE IT ON PRODUCTION WEBSITES AND SERVERS.**

## What's New in Version 2

### Console API has new methods

<a href="#consolerenow">`console.re.now(label)`</a> - returns the relative distance between two time points, measured in milliseconds

<a href="#consoleretype">`console.re.type()`</a> - returns the type of a variable or property

<a href="#consoleremark">`console.re.mark()`</a> - action to mark current log position in console output

### Console connector has a new options

`redirectDefaultConsoleToRemote` [boolean] - if true, default calls to `console.[log|warn|error|debug]` methods will be redirected to remote console log calls

`disableDefaultConsoleOutput` [boolean] - if true, default console log output will be removed for all remote console log calls

`server [string]` - remote console server url, to connect and output remote logs to your own, remote console server, default is `http://console.re`

### Console API shortcuts

#### `relog()` shortcut for `console.re.log()`

instead of using `console.re.log('test')`, now you can just a shortcut `relog('test');`

#### `re.[api]()` shortcut for `console.re.[api]()`

instead of using `console.re.log('test')`, now you can just a shortcut `re.log('test');` or `console.re.test('test')` has shortcuts `re.test('test');`

#### console.re.[api] shortcuts

instead of using `console.re.log('test')`, now you can just a shortcut `console.re.l('test')` or `re.l('test');`

<a href="#full-list-of-api-shortcuts">Full list of API shortcuts</a>

# Installation and Use

## Node.Js

1. Install module using npm as follows:

```
npm install console-remote-client
```

2. In your node.js app, use `require` to include module and connect to remote server:

```
var consolere = require('console-remote-client').connect({
  server: 'https://console.re', // optional, default: https://console.re
  channel: 'YOUR-CHANNEL-NAME' // required
});
```

3. **[required]** change connect function argument `YOUR-CHANNEL-NAME` to your own `your-project-channel-name` (any string)

4. add in your code: `console.re.log('remote log test');`

5. open remote logger in a separate browser: `http://console.re/your-project-channel-name`

6. restart your app.js, and you should see in logger the following: `[log] remote log test`

## Browser

#### Install with import. (recommended)

1. install `console-remote-client` module

```
npm install console-remote-client
```

2. import once into your javascript file. (in your app root index.js file)

```
import consolere from 'console-remote-client'
```

2. connect with options for your server and channel

```
consolere.connect({
  server: 'https://console.re', // optional, default: https://console.re
  channel: 'YOUR-CHANNEL-NAM', // required
  redirectDefaultConsoleToRemote: true, // optional, default: false
  disableDefaultConsoleOutput: true, // optional, default: false
});
```

3. **[required]** change `YOUR-CHANNEL-NAME` in attribute `data-channel` to `your-project-channel-name` (any string)

4. in your JavaScript code: `console.re.log('remote log test');` or `console.log('remote log test');` if `redirectDefaultConsoleToRemote` is true.

#### Install with single `<script>` tag.

1. open your template header or main HTML file and include `connector.js` **FIRST** thing in `<head>` tag or **BEFORE** any other `<script>` tags:

```html
<script src="//console.re/connector.js" data-channel="YOUR-CHANNEL-NAME" id="consolerescript"></script>
```

2. **[required]** change `YOUR-CHANNEL-NAME` in attribute `data-channel` to `your-project-channel-name` (any string)

3. add in your JavaScript code: `console.re.log('remote log test');`

4. open remote logger in a separate browser: `http://console.re/your-project-channel-name`

5. reload your webpage or app, you should see in logger the following: `[log] remote log test`

Below is an example how to include connector.js in `<head>`:

```html
<!DOCTYPE html>
<html>
  <head>
    <script
      src="//console.re/connector.js"
      data-server="https://console.re"
      data-channel="my-website-channel"
      id="consolerescript"
    ></script>
    <script src="/js/lib/jquery.js"></script>
    <script src="/js/your-script1.js"></script>
    <script src="/js/your-script2.js"></script>
  </head>
  ...
</html>
```

#### Install with inline javascript code. (in case you don't have access to head)

1. include this code JavaScript **BEFORE** your code :

```javascript
var consolere = {
  channel: 'YOUR-CHANNEL-NAME',
  api: '//console.re/connector.js',
  server: 'https://console.re'
  ready: function (c) {
    var d = document,
      s = d.createElement('script'),
      l
    s.src = this.api
    s.id = 'consolerescript'
    s.setAttribute('data-channel', this.channel)
    s.onreadystatechange = s.onload = function () {
      if (!l) {
        c()
      }
      l = true
    }
    d.getElementsByTagName('head')[0].appendChild(s)
  }
}
```

2. **[required]** change `YOUR-CHANNEL-NAME` in key `channel` to `your-project-channel-name` (any string)

3. in your JavaScript code, use `consolere.ready()` callback to wrap console.re API:

```javascript
consolere.ready(function () {
  console.re.log('remote log test')
})
```

4. open logger in a separate browser: `http://console.re/your-project-channel-name`

5. reload your webpage or app, you should see in logger the following: `[log] remote log test`

## API

### console.re.log()

Sends `LOG` level message with `object`, `array`, `string`, `number`, `DOM Element` to the remote console. ####`console.re.log(object|array|selector|'string %s',string|'string %d',number[,object, ...]);`
Interpolation allows to insert the value of next argument inside previous string with `%s` or `%d`. <a href="#logging-string-or-number-value-with-interpolation-try-it-on-jsfiddle">See usage examples</a>.

### console.re.info()

Sends `INFO` level message to remote console with optional arguments same as `console.re.log()`. #####`console.re.info(message);`

### console.re.warn()

Sends `WARN` level message to remote console with optional arguments same as `console.re.log()`. #####`console.re.warn(message);`

### console.re.debug()

Sends `DEBUG` level message to remote console with optional arguments same as `console.re.log()`. #####`console.re.debug(message);`

### console.re.error()

Sends `ERROR` level message to remote console with optional arguments same as `console.re.log()`. #####`console.re.error(message);`

### console.re.size()

Displays size of DOM element(s), `width` and `height` for given `selector(s)` or displays current `Window` size if called with no arguments. Use any `jQuery` selectors if `jQuery` library included in project. _This is browser only API_. #####`console.re.size([selector],[,selector,...]);`

### console.re.css()

Displays value of specified CSS `properties` in array for given `selector(s)`. Use any `jQuery` selectors if `jQuery` library included in project. _This is browser only API_. #####`console.re.css(selector,['property','property2', ... 'propertyN']);`

### console.re.media()

Displays value of CSS Media Queries for current `Window` size. An optional `'watch'` argument sets listener to display value of Media Queries on browser's `resize` or device's `orientation` change events. _This is browser only API_. #####`console.re.media(['watch']);`

Displays all types of Media Queries for current `Window` size included `screen` and `print`. _This is browser only API_. #####`console.re.media(['all']);`

### console.re.now()

Creates a new performance timer under the given `label`, it returns the relative distance between two time points, measured in milliseconds #####`console.re.now(label);`

### console.re.time()

Creates a new timer under the given `label`. To stop timer and display time result, call `console.re.timeEnd(label);` with the same `label`. #####`console.re.time(label);`

### console.re.timeEnd()

Stops timer and displays time result started before with given `label`. #####`console.re.timeEnd(label);`

### console.re.type()

Displays the type of a variable or property #####`console.re.type(expression|string|array|object|number);`

### console.re.test()

Stops timer and displays time result started before with given `label`. #####`console.re.timeEnd(label);`

### console.re.count()

Displays the number of times count call with given `label` was executed. #####`console.re.count(label);`

### console.re.test()

Displays result of test for given `expression`, `object`, `string`, `array`, `number`. #####`console.re.test('expression|string|array|object|number'[,object, ...]);`

Use `quotes` to wrap logic and display original `expression` string along with the results. <a href="#logging-test-results-for-given-expression-try-it-on-jsfiddle">See usage examples</a>.

### console.re.assert()

Tests if a given expression is `true`. Only if `false`, it will display an error `message`. #####`console.re.assert(expression[, object, ...],[message]);`

### console.re.trace()

Displays stack trace of JavaScript execution at the point where it was called. #####`console.re.trace();`

### console.re.clear()

Clears remote console logs. #####`console.re.clear();`

### console.re.mark()

Mark current log position in console. #####`console.re.mark();`

## Usage Examples

###### Logging String or Number value with interpolation. Try it on <a href="http://jsfiddle.net/32bFp/">jsFiddle</a>

```javascript
var str = 'Test', num = 43;
console.re.log('This is a string %s and number %d', str, num);

// Remote Logger Output
[log] This is a string 'Test' and number 43
```

###### Logging {Object} and its content. Try it on <a href="http://jsfiddle.net/xeZx2/">jsFiddle</a>

```javascript
var obj = {key1:1,key2:2,key3:3};
console.re.log('This is an %s', obj);

// Remote Logger Output
[log] This is an {Object}
// clicking on {Object} opens its content
{
    "key1": 1,
    "key2": 2,
    "key3": 3
}
```

###### Logging [Array] and its content. Try it on <a href="http://jsfiddle.net/Mw3RL/">jsFiddle</a>

```javascript
var arr = ['element1','element2','element3'];
console.re.log('This is an %s', arr);

// Remote Logger Output
[log] This is an [Array]
// clicking on [Array] opens its content
[
    "element1",
    "element2",
    "element3"
]
```

###### Logging DOM elements and its HTML content with JavaScript or jQuery selectors. Try it on <a href="http://jsfiddle.net/FXRFF/">jsFiddle</a>

_Note:_ using jQuery selectors requires jQuery library to be included in your project.

```javascript
console.re.log('This is an %s', document.body, 'Paragraphs %s:', $('p'));

// Remote Logger Output
[log] This is an <BODY Element>,Paragraphs [Array Elements]
// clicking on <BODY Element> opens its HTML content
```

```HTML
<body>
 <div class="test">
  <p class="t4">test 4</p>
 </div>
 ...
 <div class="test-two">
  <p class="t8">test-two 4</p>
 </div>
</body>
```

##### In general, instead of `log`, you can use `info`,`debug`,`error`, or `warn` to ouput results with different log levels.

###### Logging test results for given expression. Try it on <a href="http://jsfiddle.net/LLaaT/">jsFiddle</a>

```javascript
console.re.test("1!==1","'this string'","[1,2,3,4,5,6]","document.body");

// Remote Logger Output
[test] 1!==1 is false,'this string' is "String",[1,2,3,4,5,6] is [Array],document.body is <BODY Element>‌
```

###### Logging message if a given expression is not true. Try it on <a href="http://jsfiddle.net/9MQWf/">jsFiddle</a>

```javascript
console.re.assert(1!==1, 'It is not true');

// Remote Logger Output
[assert] It is not true
```

###### Logging time passed between timer start and end calls with the same label. Try it on <a href="http://jsfiddle.net/G44uN/">jsFiddle</a>

```javascript
console.re.time('1000000-loops');
for (var i = 0; i < 1000000; i++) {
  var b = document.body;
}
console.re.timeEnd('1000000-loops');

// Remote Logger Output
[time] 1000000-loops,started‌
[time] 1000000-loops,ends in 31 ms‌
```

###### Logging number of times counter called with the same label. Try it on <a href="http://jsfiddle.net/C9Jzq/">jsFiddle</a>

```javascript
for (var i = 0; i < 10; i++) {
  var b = document.body;
  console.re.count('loop number:%d');
}

// Remote Logger Output
[count] loop number:1‌
[count] loop number:2‌
[count] loop number:3‌
...
[count] loop number:10
```

###### Logging size in pixels of DOM elements or Window. Try it on <a href="http://jsfiddle.net/2v5z4/">jsFiddle</a>

Note: using jQuery selectors requires jQuery library to be included in your project.

```javascript
// get Window size
console.re.size();
// get size of all P elements
console.re.size('all P elements %s', document.getElementsByTagName('p'));
// get size of DIV elements with class 'test' using jQuery
console.re.size($('div.test')[0]);

// Remote Logger Output
[size] Window Size: 1274px by 683px‌
[size] all P elements [Array]
[size] <DIV> 300px by 250px
```

###### Logging CSS properties for specified DOM elements. Try it on <a href="http://jsfiddle.net/j9KqF/">jsFiddle</a>

Note: using jQuery selectors requires jQuery library to be included in your project.

```javascript
// get value of CSS property 'background-color' of <body>
console.re.css(document.body, 'background-color');
// get value of CSS properties 'border' and 'color' for all P elements
console.re.css('P elements %s', document.getElementsByTagName('p'), ['border','color']);
// get value of CSS property 'margin' and 'padding' using jQuery
console.re.css('DIV.test %s', $('div.test'), ['margin','padding']);

// Remote Logger Output
[css] <BODY> background-color:rgb(255, 255, 255);
[css] P elements [Array]
[css] DIV.test [Array]
// clicking on [Array] opens value of CSS properties
[
    {
        "margin": "20px",
        "padding": "10px"
    }
]
```

###### Logging Media Query rules used for current Window size. Try it on <a href="http://jsfiddle.net/2yS7V/">jsFiddle</a>

```javascript
// get applied Media Query rulers for current Window size
console.re.media();
// get all types of Media Query applied, including print and screen
console.re.media('all');
// get applied Media Query rulers and send updates on Window resize or device orientation change
console.re.media('watch');

// Remote Logger Output for each line
[media] screen and (max-width: 1080px) and (min-width: 320px)‌
```

###### Logging JavaScript Stack Trace information. Try it on <a href="http://jsfiddle.net/GZGS5/">jsFiddle</a>

```javascript
(function test(){
  console.re.trace('Stack Trace');
})();

// Remote Logger Output
[trace] Stack Trace, [Array]
// clicking on [Array] opens current line stack trace information
[
    ...
    "test@http://fiddle.jshell.net/_display/:90:13",
    "HTMLIFrameElement.fload@http://fiddle.jshell.net/_display/:91:3"
]
```

###### Using [bbcodes] you can send message to remote logger in styles, colors and size. Try it on <a href="http://jsfiddle.net/7Sy5S/">jsFiddle</a>

```javascript
console.re.error('output [i]any[/i] [size=15]errors[/size] using [red]Error log level[/red]')
```

```javascript
console.re.info(
  'output anything in colors: [red]%s[/red] [green]%s[/green] [blue]%s[/blue] [yellow]%s[/yellow] [orange]%s[/orange] [lime]%s[/lime] [white]%s[/white] [black]%s[/black]',
  'red',
  'green',
  'blue',
  'yellow',
  'orange',
  'lime',
  'white',
  'black'
)
```

##### List of available bbcodes:

###### styles:

`[b]bold[/b]` `[i]italic[/i]` `[u]underline[/u]` `[s]strike-through[/s]` `[size=X]1-20[/size]`

###### colors:

`[red]` `[green]` `[blue]` `[yellow]` `[orange]` `[lime]` `[white]` `[black]`

###### Clearing remote logger console before sending a new messages. Try it on <a href="http://jsfiddle.net/DJcX5/">jsFiddle</a>

```javascript
console.re.clear();
console.re.info('first info message');
console.re.log('second log message');

// Remote Logger Output
[info] 'first info message'
[log] 'second log message'
```

Try more Console.Re API Demos on jsFiddle: http://jsfiddle.net/jQYs5/

## Features

- Realtime, effective cross browser development and device independent testing
- Detached remote logging and debuging with extended console API functionality
- View JavaScript logs on any mobile device, tablet or phones (iOS, Android, Windows)
- Easy to read, pretty log output for Objects, Array, JSON, HTML elements, and CSS
- Faster Responsive Design development with Media Query logging and tracking
- Watch Media Query changes on browser resize event and device orientation change
- Using [BBcodes] display log information in different styles and colors
- Better logging output with string and number interpolation using `%s` and `%d`
- Connector script is light, framework independent, pure JavaScript solution
- Connector script works in all major browsers (IE6+) and can be used to debug desktop and mobile web applications
- Works on server in Node.js running on Linux, Mac, Windows
- Command line interface (CLI) on server allows to send remote logs from OS shell

Enjoy faster web development process!

## Supported Platforms

Console.Re Connector API (client) works on Desktop, Mobile and Server:

###Desktop browser:
Internet Explorer 6+

Safari 3+

Google Chrome 4+

Firefox 3+

Opera 10+

###Mobile browser:
iPhone Safari

iPad Safari

Android WebKit

WebOs WebKit

###Server:
Node.js

Shell via Command Line Interface

####Support for IE6-7?

Yes, you can include `connector.js` script and use console.re API in IE6-7, but also you have to add support for JSON. Just include link to `JSON2.js` file in your HTML `<head>` **BEFORE** console.re `connector.js` scripts:

```html
/* JSON support for old browsers */
<script src="//cdn.jsdelivr.net/json2/0.1/json2.min.js"></script>
<script src="//console.re/connector.js" data-channel="YOUR-CHANNEL-NAME" id="consolerescript"></script>
```

## Command Line (CLI)

Install it globally with npm as follows:

```
$ npm install console-remote-client -g
```

or get local copy and use `npm link`:

```
$ git clone https://github.com/kurdin/console-remote.git
$ cd console-remote
$ npm link
```

Run with:

```
$ consolere -c YOUR-CHANNEL-NAME log 'sent from command line'
```

where you need to change `-c` option `YOUR-CHANNEL-NAME` to your `project-channel-name` (any string)

You can edit `./console-remote-client/bin/config.js` and permanently change `YOUR-CHANNEL-NAME` then you can run it without `-c` option:

```
$ consolere info 'sent from command line'
```

to see all available options and commands, use `--help`:

```
$ consolere --help
```

## Run Tests

```
$ CHANNEL=YOUR-CHANNEL-NAME node tests.js
```

Change `YOUR-CHANNEL-NAME` to `project-channel-name` and run tests

## Full list of API shortcuts

`console.re.log` -> `console.re.l` -> `re.l`

`console.re.warn` -> `console.re.w` -> `re.w`

`console.re.info` -> `console.re.i` -> `re.i`

`console.re.debug` -> `console.re.d` -> `re.d`

`console.re.error` -> `console.re.e` -> `re.e`

`console.re.trace` -> `console.re.te` -> `re.te`

`console.re.time` -> `console.re.ti` -> `re.ti`

`console.re.timeEnd` -> `console.re.te` -> `re.te`

`console.re.count` -> `console.re.c` -> `re.c`

`console.re.size` -> `console.re.s` -> `re.s`

`console.re.assert` -> `console.re.a` -> `re.a`

`console.re.type` -> `console.re.t` -> `re.t`

`console.re.test` -> `console.re.ts` -> `re.ts`

`console.re.css` -> `console.re.c` -> `re.c`

`console.re.now` -> `console.re.n` -> `re.n`

`console.re.media` -> `console.re.mq` -> `re.mq`

`console.re.mark` -> `console.re.m` -> `re.m`

`console.re.clear` -> `console.re.cl` -> `re.cl`

## Public and Private Servers

For moderate use, you can connect and see your logging information on our public server at http://console.re for FREE. No registration required. Just install connector script and use any string as your channel name.

All information sent to the public server will be open for anyone who knows your channel name.

If you need private and more secure solution, we can offer a dedicated or virtual servers for personal or corporate usage. We can provide a complete solution where you can use your own Remote JavaScript Console server installed behide your firewall, inside your private network.

If you are interested, please contact us with additional information about your company size and approximate number of users.

In addition, we can provide custom solution with full support for the large clients. We can customize logger server software and connector API to fit customers' unique needs.

## More Information

- Any **issues or questions** (no matter how basic), please open an issue

## Contact

- website form: http://console.re#contact

## Copyright

Copyright (c) 2021 Sergey Kurdin, https://runjs.co

Based on http://jsoverson.github.io/rcl
Copyright (c) 2012 by Jarrod Overson

## License

The MIT License (MIT)

###Warning: Use Console.Re for Development and Testing environments only. PLEASE MAKE SURE IT REMOVED FROM YOUR PRODUCTION WEBSITES AND SERVERS.

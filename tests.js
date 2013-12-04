// Console.Re API Tests

var testing = require('testing'),
  configs = require('./config'), // edit ./config.js and change console.re channel name
  disconnect = true;

if (process.env.CHANNEL) process.env.SERVER_CHANNEL = process.env.CHANNEL;
if (process.env.SERVER_CHANNEL === 'YOUR-CHANNEL-NAME') process.env.SERVER_CHANNEL = 'NodeTest';

var cl = require('./lib/connector.node.js').connect(process.env.SERVER_DOMAIN,process.env.SERVER_PORT,process.env.SERVER_CHANNEL,disconnect);

function consolereTests()
{
    var string = 'Test',
      object = {key1:1,key2:2},
      array = [1,2,3,4,5],
      number = 43, 
      bbcodes = [
      '[noparse][i]Italic[/i][/noparse]',
      '[noparse][b]Bold[/b][/noparse]',
      '[noparse][u]Underline[/u][/noparse]',
      '[noparse][<color>]red|green|blue|yellow|orange|lime|white|black[/<color>][/noparse]',
      '[noparse][size=<X>]1-20[/size][/noparse]'
    ];

    // clear
    testing.assert(
      console.re.clear()
      );
    testing.success("console.re.clear(); passed");

    console.re.info('Console.Re API Tests %s', 'started');

    // time
    testing.assert(
      console.re.time('run timer')
      );
    testing.success("console.re.time('run timer'); passed");

    // log
    testing.assert(
      console.re.log('This is a %s', string)
      );
    testing.success("console.re.log('This is a %s', string); passed");

    testing.assert(
      console.re.log('This is an %s', object)
      );
    testing.success("console.re.log('This is an %s', object); passed");

    testing.assert(
      console.re.log('This is an %s', array)
      );
    testing.success("console.re.log('This is an %s', array); passed");

    testing.assert(
      console.re.log('This is a number %d', number)
      );
    testing.success("console.re.log('This is a number %d', number); passed");

    testing.assert(
      console.re.log('simple log output of [i]process.env[/i] %s', process.env)
      );
    testing.success("console.re.log('simple log output of [i]process.env[/i] %s', process.env); passed");    

    // info
    testing.assert(
    console.re.info('using [[i]bbcodes[/i]] %s output can has in styles: [i]Italic[/i] [b]Bold[/b] [u]Underline[/u] and colors: [red]%s[/red] [green]%s[/green] [blue]%s[/blue] [yellow]%s[/yellow] [orange]%s[/orange] [lime]%s[/lime] [white]%s[/white] [black]%s[/black]', bbcodes, 'red', 'green', 'blue', 'yellow',  'orange', 'lime', 'white', 'black')
    );

    testing.success("console.re.info('using [[i]bbcodes[/i]] %s output can has styles: [i]Italic[/i] [b]Bold[/b] [u]Underline[/u] and colors: [red]%s[/red] [green]%s[/green] [blue]%s[/blue] [yellow]%s[/yellow] [orange]%s[/orange] [lime]%s[/lime] [white]%s[/white] [black]%s[/black]', bbcodes, 'red', 'green', 'blue', 'yellow',  'orange', 'lime', 'white', 'black'); passed");    

    // count 1
    testing.assert(
      console.re.count('counter one %d')
      );
    testing.success("console.re.count('counter one %d'); passed");

    // debug
    testing.assert(
      console.re.debug("debug output for %s and %s", {key1:'one',key2:'two',key3:'three'}, [1,2,3,'one','two','three'])
      );
    testing.success("console.re.debug('debug output for %s and %s', {key1:'one',key2:'two',key3:'three'}, [1,2,3,'one','two','three']); passed");

    // warn
    testing.assert(
      console.re.warn('this is a warning level message')
      );
    testing.success("console.re.warn('this is a warning level message'); passed");

    // error
    testing.assert(
      console.re.error('[red]output any error message using error level[/red]')
      );
    testing.success("console.re.error('[red]output any error message using error level[/red]'); passed");    

    // test
    testing.assert(
      console.re.test("10 + 1","[1,2,3,4,5,6]", "'text'","1==1","'ab'=='ba'")
      );
    testing.success('console.re.test("10 + 1","[1,2,3,4,5,6]","text","1==2","ab==ba"); passed');        

    // test
    testing.assert(
      console.re.assert(1!==1, '1!==1 Assertion Failure‌')
      );
    testing.success("console.re.assert(1!==1, 'Assertion 1!==1 has Failure‌'); passed");

    // trace
    (function testFunction(){
      testing.assert(
        console.re.trace('Stack Trace output')
        );
      testing.success("console.re.trace('Stack Trace output'); passed");
    })();

    // timeEnd
    testing.assert(
      console.re.timeEnd('run timer')
      );
    testing.success("console.re.timeEnd('run timer'); passed");    
  
    console.re.info('Console.Re API Tests %s', 'end');
}

testing.run({
    this: consolereTests
}, testResults);

function testResults() {
  console.info('Console.Re API all tests passed');
}

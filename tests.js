// Console.Re API Tests

const testing = require('testing'),
  configs = require('./config'), // edit ./config.js and change console.re channel name
  disconnect = true;

if (process.env.CHANNEL) process.env.SERVER_CHANNEL = process.env.CHANNEL;
if (process.env.SERVER_CHANNEL === 'YOUR-CHANNEL-NAME') process.env.SERVER_CHANNEL = 'NodeTest';

const cl = require('./lib/connector.node.js').connect(
  process.env.SERVER_DOMAIN,
  process.env.SERVER_PORT,
  process.env.SERVER_CHANNEL,
  disconnect
);

const string = 'Test',
  object = {
    key1: 1,
    key2: 2
  },
  array = [1, 2, 3, 4, 5],
  number = 43,
  bbcodes = [
    '[noparse][i]Italic[/i][/noparse]',
    '[noparse][b]Bold[/b][/noparse]',
    '[noparse][u]Underline[/u][/noparse]',
    '[noparse][<color>]red|green|blue|yellow|orange|lime|white|black[/<color>][/noparse]',
    '[noparse][size=<X>]1-20[/size][/noparse]'
  ];

function testConsoleClear(callback) {
  testing.assert(console.re.clear(), 'testConsoleClear', callback);
  testing.success('console.re.clear(); passed', callback);
}

function testConsoleTime(callback) {
  testing.assert(console.re.time('run timer'), 'testConsoleTime', callback);
  testing.success("console.re.time('run timer'); passed", callback);
}

function testConsoleLog(callback) {
  testing.assert(console.re.log('This is a %s', string), 'testConsoleLog string', callback);
  testing.success("console.re.log('This is a %s', string); passed");

  testing.assert(console.re.log('This is an %s', object), 'testConsoleLog object', callback);
  testing.success("console.re.log('This is an %s', object); passed");

  testing.assert(console.re.log('This is an %s', array), 'testConsoleLog array', callback);
  testing.success("console.re.log('This is an %s', array); passed");

  testing.assert(console.re.log('This is a number %d', number), 'testConsoleLog number', callback);
  testing.success("console.re.log('This is a number %d', number); passed");

  testing.assert(
    console.re.log('simple log output of [i]process.env[/i] %s', process.env),
    'testConsoleLog process.env',
    callback
  );
  testing.success("console.re.log('simple log output of [i]process.env[/i] %s', process.env); passed", callback);
}

function testConsoleInfo(callback) {
  testing.assert(
    console.re.info(
      'using [[i]bbcodes[/i]] %s output can has in styles: [i]Italic[/i] [b]Bold[/b] [u]Underline[/u] and colors: [red]%s[/red] [green]%s[/green] [blue]%s[/blue] [yellow]%s[/yellow] [orange]%s[/orange] [lime]%s[/lime] [white]%s[/white] [black]%s[/black]',
      bbcodes,
      'red',
      'green',
      'blue',
      'yellow',
      'orange',
      'lime',
      'white',
      'black'
    ),
    'testConsoleInfo',
    callback
  );
  testing.success(
    "console.re.info('using [[i]bbcodes[/i]] %s output can has styles: [i]Italic[/i] [b]Bold[/b] [u]Underline[/u] and colors: [red]%s[/red] [green]%s[/green] [blue]%s[/blue] [yellow]%s[/yellow] [orange]%s[/orange] [lime]%s[/lime] [white]%s[/white] [black]%s[/black]', bbcodes, 'red', 'green', 'blue', 'yellow',  'orange', 'lime', 'white', 'black'); passed",
    callback
  );
}

function testConsoleCount(callback) {
  testing.assert(console.re.count('counter one %d'), 'testConsoleCount', callback);
  testing.success("console.re.count('counter one %d'); passed", callback);
}

function testConsoleDebug(callback) {
  testing.assert(
    console.re.debug(
      'debug output for %s and %s',
      {
        key1: 'one',
        key2: 'two',
        key3: 'three'
      },
      [1, 2, 3, 'one', 'two', 'three']
    ),
    'testConsoleDebug',
    callback
  );
  testing.success(
    "console.re.debug('debug output for %s and %s', {key1:'one',key2:'two',key3:'three'}, [1,2,3,'one','two','three']); passed",
    callback
  );
}

function testConsoleWarn(callback) {
  testing.assert(console.re.warn('this is a warning level message'), 'testConsoleWarn', callback);
  testing.success("console.re.warn('this is a warning level message'); passed", callback);
}

function testConsoleError(callback) {
  testing.assert(
    console.re.error('[red]output any error message using error level[/red]'),
    'testConsoleError',
    callback
  );
  testing.success("console.re.error('[red]output any error message using error level[/red]'); passed", callback);
}

function testConsoleTest(callback) {
  testing.assert(
    console.re.test('10 + 1', '[1,2,3,4,5,6]', "'text'", '1==1', "'ab'=='ba'"),
    'testConsoleTest',
    callback
  );
  testing.success('console.re.test("10 + 1","[1,2,3,4,5,6]","text","1==2","ab==ba"); passed', callback);
}

function testConsoleAssert(callback) {
  testing.assert(console.re.assert(1 !== 1, '1!==1 Assertion Failure‌'), 'testConsoleAssert', callback);
  testing.success("console.re.assert(1!==1, 'Assertion 1!==1 has Failure‌'); passed", callback);
}

function testConsoleTrace(callback) {
  testing.assert(console.re.trace('Stack Trace output'), 'testConsoleTrace', callback);
  testing.success("console.re.trace('Stack Trace output'); passed", callback);
}

function testConsoleTimeEnd(callback) {
  testing.assert(console.re.timeEnd('run timer'), 'testConsoleTimeEnd', callback);
  testing.success("console.re.timeEnd('run timer'); passed", callback);
}

function testResults(error, result) {
  console.re.info('Console.Re API Tests %s', 'end');

  if (error) {
    testing.failure(`Console.Re API tests failed: ${error}`);
  } else {
    console.info('Console.Re API all tests passed');
  }
}

function consoleReTests() {
  console.re.info('Console.Re API Tests %s', 'started');

  testing.run(
    [
      testConsoleClear,
      testConsoleTime,
      testConsoleLog,
      testConsoleInfo,
      testConsoleCount,
      testConsoleDebug,
      testConsoleWarn,
      testConsoleError,
      testConsoleTest,
      testConsoleAssert,
      testConsoleTrace,
      testConsoleTimeEnd
    ],
    testResults
  );
}

consoleReTests();

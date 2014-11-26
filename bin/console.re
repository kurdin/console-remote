#!/usr/bin/env node

var updateNotifier = require('update-notifier');
var pkg = require('../package.json');

var program = require('commander'),
configs = require('./config'),
disconnect = true;

updateNotifier({packageName: pkg.name, packageVersion: pkg.version}).notify();

program
  .version('0.4.3')
  .option('-c, --channel [YOUR-CHANNEL-NAME]', 'channel you want to connect (edit ./bin/config.js)', process.env.SERVER_CHANNEL)
  .option('-h, --host [console.re]', 'console.re server host', process.env.SERVER_DOMAIN)
  .option('-p, --port [80]', 'console.re server port', process.env.SERVER_PORT)

program
  .command('log [msg]')
  .description('send [log] level message to remote console')
  .action(function(msg, options){
    sendArgs('log', options.parent.rawArgs);
  });

program
  .command('info [msg]')
  .description('send [info] level message to remote console')
  .action(function(msg, options){
    sendArgs('info', options.parent.rawArgs);
  });

program
  .command('debug [msg]')
  .description('send [debug] level message to remote console')
  .action(function(msg, options){
    sendArgs('debug', options.parent.rawArgs);
  });

program
  .command('warn [msg]')
  .description('send [warn] level message to remote console')
  .action(function(msg, options){
    sendArgs('warn', options.parent.rawArgs);
  });

program
  .command('error [msg]')
  .description('send [error] level message to remote console')
  .action(function(msg, options){
    sendArgs('error', options.parent.rawArgs);
  });

program
  .command('test [expression]')
  .description('do [test] expression and send results to remote console')
  .action(function(msg, options){
    sendArgs('test', options.parent.rawArgs);
  });

program
  .command('assert [expression]')
  .description('do [assert] expression if false throw an exception to remote console')
  .action(function(msg, options){
    sendArgs('assert', options.parent.rawArgs);
  });

program
  .command('trace')
  .description('send [trace] info to remote console')
  .action(function(msg, options){
    connect();
    console.re.trace();
  });  

program
  .command('clear')
  .description('send clear command to remote console')
  .action(function(msg, options){
    connect();
    console.re.clear();
  });  

program.parse(process.argv);

if (program.channel === 'YOUR-CHANNEL-NAME') {
        console.log('You must specify channel name with "-c YOUR-CHANNEL-NAME" or edit ./bin/config.js then see results at http://'+
        program.host+'/YOUR-CHANNEL-NAME');
        process.exit(1);
}

function connect() {
  var cl = require('../lib/connector.node.js').connect(program.host,program.port,program.channel,disconnect);
}

function sendArgs(l,args) {
   var f = false, 
    ar = [];
   args.forEach(function (a,i) {
      if (f) { 
        try {
        a = JSON.parse(a);
        } catch (e) {
         if (+a) a = +a;
        }
        ar.push(a);
      }
      if (a === l) f = true;
   });
   connect();
   console.re[l].apply(this, ar);
}

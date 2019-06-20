/*    connector.node.js
 *     Remote JavaScript Console.Re client for Node.Js
 *     Version: 0.5.1
 *
 *     Install:
 *     npm install console-remote-client
 *
 *     Include with require in your node app:
 *     var consolere = require('console-remote-client').connect('console.re','80','YOU-CHANNEL-NAME');
 *     //! change YOUR-CHANNEL-NAME with your own UNIQUE channel name you want to connect
 *
 *     Access Console.Re Logger:
 *     http://console.re/YOUR-UNIQUE-CHANNEL-NAME
 *
 *     API:
 *     console.re.log(object|array|'string %s',string|'string %d',number[,object, ...]);
 *     console.re.info(object|array|'string %s',string|'string %d',number[,object, ...]);
 *     console.re.warn(message);
 *     console.re.debug(message);
 *     console.re.error(message);
 *     console.re.time(label);
 *     console.re.timeEnd(label);
 *     console.re.count(label);
 *     console.re.test(expression[,object, ...],[message]);
 *     console.re.assert(expression[, object, ...],[message]);
 *     console.re.trace();
 *     console.re.clear();
 *
 *     Usage Examples:
 *     var s = 'Test';
 *     console.re.log('This is a string %s', s);
 *     => [log] This is a string 'Test'
 *
 *     var n = 43;
 *     console.re.log('This is a number %d', n);
 *     => [log] This is a number 43
 *
 *     var o = {key1:1,key2:2};
 *     console.re.log('This is an %d', o);
 *     => [log] This is an {Object}
 *
 *     Complete API Documentation: http://console.re#API
 *     Copyright (c) 2013 Sergey Kurdin, AnotherVision.com
 *
 *     Based on http://jsoverson.github.io/rcl
 *     Copyright (c) 2012 by Jarrod Overson
 */

exports = module.exports.connect = function(host, port, _channel, _cli) {
	var root = this,
		io = require('socket.io-client'),
		cprotocol = port === '443' ? 'https://' : 'http://',
		cport = '',
		chost = host || 'console.re',
		channel = _channel || 'NodePublic',
		name = 'toServerRe',
		cli = _cli || false;

	if (port !== '' && typeof port !== 'undefined' && port !== 80 && cprotocol !== 'https://') {
		cport = ':' + port;
	}

	var isArray =
		Array.isArray ||
		function(a) {
			return Object.prototype.toString.call(a) === '[object Array]';
		};

	function getCaller() {
		try {
			throw new Error('');
		} catch (err) {
			var d,
				s,
				c,
				cp,
				o = '',
				p = [];

			if (err.stack) {
				d = 5;
				s = err.stack.split('\n');
				c = s[d];
				cp = c.match(/\s*\(?([^\s\)]*)\)?$/);
				o = cp[1];
				p = o.match(/^.*([\/<][^\/>]*>?):(\d*):(\d*)$/);
			}

			return {
				file: p ? p[1] : '',
				line: p ? p[2] : '0',
				col: p ? p[3] : '0'
			};
		}
	}

	function getOtherTypes(t) {
		var e,
			o = '';
		try {
			e = eval(t);
			if (e === true) {
				o = '[booltrue]true[/booltrue]';
			} else if (e === false) {
				o = '[boolfalse]false[/boolfalse]';
			} else if (!isNaN(parseFloat(e)) && isFinite(e)) {
				o = '[number]' + e + '[/number]';
			} else if (typeof e === 'number') {
				o = '[number][Number][/number]';
			} else if (typeof e === 'string') {
				o = '"String"';
			} else if (typeof e === 'function') {
				o = '[Function]';
			} else if (e.nodeType) {
				o = '<' + e.nodeName + ' Element>';
			} else if (typeof e === 'object') {
				o = '{Object}';
				if (isArray(e)) o = '[Array]';
			} else {
				o = '[color=red]undefined[/color]';
			}
		} catch (err) {
			o = '[color=red]' + err + '[/color]';
		}
		return o;
	}

	function getType(t) {
		var o = '';
		if (typeof t !== 'string') return getOtherTypes(t);
		try {
			var obj = JSON.parse(t);
			if (typeof obj === 'object') {
				o = '{Object}';
				if (isArray(obj)) o = '[Array]';
			} else {
				o = getOtherTypes(t);
			}
		} catch (err) {
			o = getOtherTypes(t);
		}
		return o;
	}

	function stringify(obj) {
		if (typeof obj === 'undefined') return '___undefined___';
		if (typeof obj !== 'object') return obj;
		var cache = [],
			k_map = [],
			t_array,
			i,
			s = JSON.stringify(obj, function(k, v) {
				if (typeof v === 'undefined') {
					return '___undefined___';
				}
				if (!v) return v;
				if (typeof v === 'function') return '[Function]';
				if (typeof v === 'object' && v !== null) {
					if (v.length && (t_array = Array.prototype.slice.call(v)).length === v.length) v = t_array;
					i = cache.indexOf(v);
					if (i !== -1) {
						return '[ Circular {' + (k_map[i] || 'root') + '} ]';
					}
					cache.push(v);
					k_map.push(k);
				}
				return v;
			});
		return s;
	}
	root[name] = (function() {
		var socket,
			caller = [],
			cache = [],
			gcount = [],
			gtimer = [],
			api = {
				client: true,
				server: true,
				loaded: false
			},
			levels = [
				'trace',
				'debug',
				'info',
				'log',
				'warn',
				'error',
				'size',
				'test',
				'assert',
				'count',
				'css',
				'media',
				'time',
				'time',
				'command'
			];

		function emit(level, args, cmd, cal) {
			caller = cal || getCaller();
			if ((!args.length || levels.indexOf(level) === -1) && level !== 'command') return;
			if (api.client) logConsole.apply(null, arguments);
			if (api.server) logIo.apply(null, arguments);
			if (!socket) return api.connect();
		}

		function logConsole(level, args) {
			if (level === 'trace') return;
			if (console.log) {
				var a = args.toString().replace(/\[(\w+)[^w]*?](.*?)\[\/\1]/g, '$2');
				Function.prototype.apply.call(console.log, console, ['console.re [' + level + ']'].concat(a));
			}
		}

		function logIo(level, args, cmd) {
			var data,
				counter,
				timer,
				t_end,
				last,
				command = '';
			cmd = cmd || '';
			if (typeof args === 'object' && !args.length) data = args;
			else {
				if (level == 'command') command = cmd;
				data = {
					command: command,
					channel: channel,
					browser: browser,
					level: level,
					args: args,
					caller: caller
				};
			}
			if (cmd === 'count') {
				counter = args.toString();
				if (isNaN(gcount[counter])) {
					gcount[counter] = 1;
				} else {
					gcount[counter]++;
				}
				args.push(gcount[counter]);
			} else if (cmd === 'time') {
				timer = args.toString();
				gtimer[timer] = new Date().getTime();
				args.push('[white]started[/white]');
			} else if (cmd === 'timeEnd') {
				timer = args.toString();
				t_end = new Date().getTime() - gtimer[timer];
				if (!isNaN(t_end)) {
					args.push('[white]ends[/white] in [number]' + t_end + '[/number] ms');
				} else {
					args.push('[white]not started[/white]');
				}
			}

			for (var i = 0; i < args.length; i++) {
				args[i] = stringify(args[i], cmd, last);
			}
			if (socket) {
				if (cache.length) {
					sendCached(cache);
				}
				socket.emit(name, data, function(data) {
					if (data === 'success' && cli) {
						console.log('Sent to http://' + chost + '/' + channel);
						socket.disconnect();
					}
				});
			} else {
				cache.push([level, data]);
			}
		}

		for (var i = 0, l; i < levels.length; i++) {
			l = levels[i];
			api[l] = logLevel(l);
		}

		function logLevel(level) {
			return function() {
				api._dispatch(level, [].slice.call(arguments));
				return this;
			};
		}

		function onConnect() {
			var a = 'console.re [info] Connected';
			if (socket) {
				socket.emit('channel', channel);
			}
			sendCached(cache);
		}

		function sendCached(c) {
			var ced = null;
			while ((ced = c.shift())) {
				logIo.apply(null, ced);
			}
		}

		api.disconnect = function() {
			socket.disconnect();
		};

		api.connect = function(redux) {
			if (io) {
				socket = io.connect(cprotocol + chost + cport);
				socket.on('connect', onConnect);
				socket.on('error', function(e) {
					console.log('console.re [error] ' + e);
				});
			} else if (!redux) {
				api.connect(true);
			}
		};

		api.size = function() {
			return this;
		};

		api.count = function() {
			api._dispatch('count', [].slice.call(arguments), 'count');
			return this;
		};

		api.time = function() {
			api._dispatch('time', [].slice.call(arguments), 'time');
			return this;
		};

		api.timeEnd = function() {
			api._dispatch('time', [].slice.call(arguments), 'timeEnd');
			return this;
		};

		api.trace = function() {
			var es,
				el = '',
				a = [].slice.call(arguments);
			try {
				throw new Error('');
			} catch (err) {
				es = err.stack
					.replace(/^\s+|\s+$/gm, '')
					.split('\n')
					.slice(2);
				es.forEach(function(l) {
					el = el + '\n    ' + l;
				});
				console.log('console.re [trace] ' + a.toString() + ':', el);
			}
			api._dispatch('trace', [a.toString(), es]);
			return this;
		};

		api.css = function() {
			return this;
		};

		api.test = function() {
			var a = [].slice.call(arguments),
				type = '',
				out = [];
			a.forEach(function(t) {
				type = getType(t);
				if (/|[Function]|{Object}|[Array]|Element|/gi.test(type)) {
					type = '[color=#BBB519]' + type + '[/color]';
				}
				out.push('[color=#BC9044]' + t + '[/color]' + '[color=gray] is [/color]' + type);
			});
			api._dispatch('test', out);
			return this;
		};
		api.assert = function() {
			var a = [].slice.call(arguments),
				out = [];
			a.forEach(function(t, i) {
				if (typeof t !== 'string') {
					if (!t) {
						if (typeof a[i + 1] === 'string') {
							out.push('[color=red]' + a[i + 1] + '[/color]');
						} else {
							out.push('[color=red]Assertion Failure[/color]');
						}
					}
				}
			});
			if (out.length) api._dispatch('assert', out);
			return this;
		};

		api.media = function() {
			return this;
		};

		api._dispatch = function(level, args, cmd, cal) {
			emit(level, args, cmd, cal);
		};

		api.clear = function() {
			api._dispatch('command', '', 'clear');
			return this;
		};

		return api;
	})();

	console.re = root[name];
	module.exports.re = root[name];

	var BrowserDetect = {
		searchString: function(data) {
			var d_string;
			for (var i = 0; i < data.length; i++) {
				d_string = data[i].str;
				if (d_string.indexOf(data[i].substr) != -1) return data[i].name;
			}
		},
		dataOS: [
			{
				str: process.platform,
				substr: 'win32',
				name: 'Windows'
			},
			{
				str: process.platform,
				substr: 'sunos',
				name: 'SunOS'
			},
			{
				str: process.platform,
				substr: 'darwin',
				name: 'Mac'
			},
			{
				str: process.platform,
				substr: 'linux',
				name: 'Linux'
			}
		],
		init: function() {
			return {
				browser: {
					f: 'NodeJs',
					s: 'NJ'
				},
				version: process.versions.node || '',
				OS: this.searchString(this.dataOS) || 'an unknown OS'
			};
		}
	};
	var browser = BrowserDetect.init();

	process.on('uncaughtException', function(err) {
		console.re.error('[red]' + err.toString() + '[/red]');
	});

	return root;
};

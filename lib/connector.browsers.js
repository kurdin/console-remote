// Console.Re Client Script ver: 0.5.1
if (!window.console) window.console = {};
(function(root, console) {
	'use strict';

	var chost = 'console.re',
		cport,
		name = 'toServerRe',
		channel;
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(obj, fromIndex) {
			if (fromIndex == null) {
				fromIndex = 0;
			} else if (fromIndex < 0) {
				fromIndex = Math.max(0, this.length + fromIndex);
			}
			for (var i = fromIndex, j = this.length; i < j; i++) {
				if (this[i] === obj) return i;
			}
			return -1;
		};
	}
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function(fn, scope) {
			var i, len;
			for (i = 0, len = this.length; i < len; ++i) {
				if (i in this) {
					fn.call(scope, this[i], i, this);
				}
			}
		};
	}
	var isArray =
		Array.isArray ||
		function(a) {
			return Object.prototype.toString.call(a) === '[object Array]';
		};
	if (!window.location.origin) window.location.origin = window.location.protocol + '//' + window.location.host;
	if (window.consolere === undefined || window.consolere.channel === 'YOUR-CHANNEL-NAME') {
		channel =
			(document.getElementById('consolerescript') &&
				document.getElementById('consolerescript').getAttribute('data-channel')) ||
			'';
	} else {
		channel = window.consolere.channel || '';
	}

	if (!channel) {
		channel = 'public';
	}

	function askChannel(t) {
		t = t || '';
		var c = prompt(t + 'Enter Channel to using on Console.Re/Your-Channel-Name', 'Your-Channel-Name');
		if (c && c !== null && c !== 'Your-Channel-Name') {
			return c;
		} else {
			askChannel('Please ');
		}
	}

	function getCaller(d) {
		d = d || 7;
		var t = printStackTrace(),
			c = t[d],
			p;
		if (c !== undefined) {
			p = c.match(/^.*([\/<][^\/>]*>?):(\d*):(\d*)?$/);
			if (p === null) p = c.match(/^.*([\/<][^\/>]*>?):(\d*)?$/);
		} else {
			// IE 7-9
			p[1] = '';
			p[2] = '0';
			p[3] = '0';
		}
		return {
			file: p ? p[1] : '',
			line: p ? p[2] : '0',
			col: p ? p[3] : '0'
		};
	}

	function getWindowSize() {
		var w = document.width || window.outerWidth || document.documentElement.clientWidth,
			h = document.height || window.outerHeight || document.documentElement.clientHeight;
		return 'Window Size: [number]' + w + 'px[/number] by [number]' + h + 'px[/number]';
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

	function replaceWithNum(s) {
		var st = '' + s;
		return st.replace(/([0-9]+)(px|em||)/g, '[number]$1$2[/number]');
	}

	function getSize(targetElement) {
		var w, h;
		if (targetElement) {
			w = getStyle(targetElement, 'width');
			h = getStyle(targetElement, 'height');
			return '[number]' + w + '[/number]' + ' by ' + '[number]' + h + '[/number]';
		}
		return '';
	}

	function getStyle(targetElement, styleProp) {
		if (targetElement) {
			if (targetElement.currentStyle) return targetElement.currentStyle[styleProp];
			else if (window.getComputedStyle)
				return document.defaultView.getComputedStyle(targetElement, null).getPropertyValue(styleProp);
		}
	}

	function stringify(obj, cmd, prop) {
		if (typeof obj === 'undefined') return '___undefined___';
		if (typeof obj !== 'object') return obj;
		var cache = [],
			k_map = [],
			t_array,
			i,
			d_node = {},
			nid = '',
			nclass = '',
			ps,
			s = JSON.stringify(obj, function(k, v) {
				if (typeof v === 'undefined') {
					return '___undefined___';
				}
				if (!v) return v;
				if (v.nodeType) {
					if (v.id) nid = v.id;
					if (v.className) nclass = v.className;
					if (cmd === 'size') {
						return '[tag]<' + v.nodeName + '>[/tag] ' + getSize(v);
					} else if (cmd === 'css') {
						if (isArray(prop)) {
							prop.forEach(function(p) {
								d_node[p] = replaceWithNum(getStyle(v, p));
							});
							return d_node;
						} else if (prop) {
							ps = ' ' + prop + ':' + getStyle(v, prop) + ';';
							if (nid) nid = " [attr]id=[/attr][string]'" + nid + "'[/string]";
							if (nclass) nclass = " [attr]class=[/attr][string]'" + nclass + "'[/string]";
							return '[tag]<' + v.nodeName + '' + nid + '' + nclass + '>[/tag]' + replaceWithNum(ps);
						}
					} else {
						d_node.element = v.nodeName;
						if (nid) d_node.id = nid;
						if (nclass) d_node['class'] = nclass;
						d_node.visible = VISIBILITY.isVisible(v);
						d_node.size = getSize(v);
						d_node.html = v.outerHTML;
					}
					return d_node;
				}
				if (v.window && v.window == v.window.window) return '{Window Object}';
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
			or_change = false,
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
			level = level === 'trace' ? 'debug' : level;
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
			if (cmd === 'css') {
				last = args[args.length - 1];
				if (isArray(last) || 'string' === typeof last) args.pop();
				else cmd = '';
			} else if (cmd === 'count') {
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
				socket.emit(name, data);
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
			if (consolereio) {
				socket = consolereio(chost + (typeof cport !== 'undefined' ? ':' + cport : ''));
				socket.on('connect', onConnect);
			} else if (!redux) {
				api.connect(true);
			}
		};

		api.size = function(s) {
			if (!s || typeof s === 'undefined' || s == 'window') {
				api._dispatch('size', [getWindowSize()]);
			} else {
				api._dispatch('size', [].slice.call(arguments), 'size');
			}
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
			var t = printStackTrace(),
				out = [],
				a = [].slice.call(arguments);
			for (i = 0; t.length > i; i++) {
				if (!/console.re.js/gi.test(t[i])) out.push(t[i]);
			}
			api._dispatch('trace', [a.toString(), out]);
			return this;
		};

		api.css = function() {
			api._dispatch('css', [].slice.call(arguments), 'css');
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

		api._dispatch = function(level, args, cmd, cal) {
			emit(level, args, cmd, cal);
		};

		api.media = function(a, cal) {
			var mq_list = [],
				out = [],
				m = [],
				s_type = false,
				s_query = true,
				o_t = 'landscape',
				o_r = window.orientation || 0,
				timer_cal;
			if (a === 'type') {
				s_type = true;
				s_query = false;
			} else if (a === 'all-types' || a === 'all') {
				s_query = s_type = true;
			}
			if (a === 'watch') {
				var _timerVar;
				timer_cal = getCaller(5);
				if (window.addEventListener) {
					window.addEventListener(
						'resize',
						function() {
							watchMediaQuery(timer_cal);
						},
						false
					);
					window.addEventListener(
						'orientationchange',
						function() {
							if (o_r !== window.orientation) or_change = true;
							watchMediaQuery(timer_cal);
						},
						false
					);
				}
			}
			createMQList();
			m = mqChange();
			if (m.length) {
				if (m.length == 1) out.push(mqChange()[0]);
				else out.push(mqChange());
			} else {
				out.push('[yellow]No Media Query Rules[/yellow]');
			}
			if (a === 'w') {
				out.push(getWindowSize());
				if (or_change) {
					if (Math.abs(window.orientation) !== 90) o_t = 'portrait';
					out.push('Orientation: [yellow]' + o_t + '[/yellow]');
				}
				api._dispatch('media', out, '', cal);
			} else {
				api._dispatch('media', out);
			}
			return this;

			function watchMediaQuery(t) {
				if (window.matchMedia) {
					clearTimeout(_timerVar);
					_timerVar = setTimeout(function() {
						api.media('w', t);
					}, 500);
				}
			}

			function inList(media) {
				for (var i = mq_list.length - 1; i >= 0; i--) {
					if (mq_list[i].media === media) {
						return true;
					}
				}
				return false;
			}

			function createMQList() {
				var mq = getMediaQueries(),
					i;
				if (s_query) {
					for (i = mq.length - 1; i >= 0; i--) {
						if (!inList(mq[i])) {
							mq_list.push(window.matchMedia(mq[i]));
						}
					}
				}
				if (s_type) {
					var links = document.getElementsByTagName('link');
					for (i = links.length - 1; i >= 0; i--) {
						if (links[i].media) {
							mq_list.push(window.matchMedia(links[i].media));
						}
					}
				}
			}

			function getMediaQueries() {
				var s = document.styleSheets,
					r,
					i,
					j,
					mq = [];
				for (i = s.length - 1; i >= 0; i--) {
					try {
						r = s[i].cssRules;
						if (r) {
							for (j = 0; j < r.length; j++) {
								if (r[j].type == CSSRule.MEDIA_RULE) {
									mq.push(r[j].media.mediaText);
								}
							}
						}
					} catch (e) {}
				}
				return mq;
			}

			function mqChange() {
				var q = [];
				for (var i in mq_list) {
					if (mq_list[i].matches) {
						q.push(replaceWithNum(mq_list[i].media));
					}
				}
				return q;
			}
		};

		api.clear = function() {
			api._dispatch('command', '', 'clear');
			return this;
		};

		return api;
	})();
	console.re = root[name];
	var BrowserDetect = {
		searchString: function(data) {
			for (var i = 0; i < data.length; i++) {
				var d_string = data[i].str;
				var d_prop = data[i].prop;
				this.versionSearchString = data[i].vsearch || data[i].name;
				if (d_string) {
					if (d_string.indexOf(data[i].substr) != -1) return data[i].name;
				} else if (d_prop) return data[i].name;
			}
		},
		searchVersion: function(dString) {
			var i = dString.indexOf(this.versionSearchString);
			if (i == -1) return;
			return parseFloat(dString.substr(i + this.versionSearchString.length + 1));
		},
		dataBrowser: [
			{
				str: navigator.userAgent,
				substr: 'OPR',
				vsearch: 'OPR',
				name: {
					f: 'Opera',
					s: 'OP'
				}
			},
			{
				str: navigator.userAgent,
				substr: 'Chrome',
				vsearch: 'Chrome',
				name: {
					f: 'Chrome',
					s: 'CR'
				}
			},
			{
				str: navigator.userAgent,
				substr: 'OmniWeb',
				vsearch: 'OmniWeb',
				name: {
					f: 'OmniWeb',
					s: 'OW'
				}
			},
			{
				str: navigator.vendor,
				substr: 'Apple',
				name: {
					f: 'Safari',
					s: 'SF'
				},
				vsearch: 'Version'
			},
			{
				prop: window.opera,
				name: {
					f: 'Opera',
					s: 'OP'
				},
				vsearch: 'Version'
			},
			{
				str: navigator.vendor,
				substr: 'iCab',
				name: {
					f: 'iCab',
					s: 'iC'
				}
			},
			{
				str: navigator.vendor,
				substr: 'KDE',
				name: {
					f: 'Konqueror',
					s: 'KDE'
				}
			},
			{
				str: navigator.userAgent,
				substr: 'Firefox',
				name: {
					f: 'Firefox',
					s: 'FF'
				},
				vsearch: 'Firefox'
			},
			{
				str: navigator.vendor,
				substr: 'Camino',
				name: {
					f: 'Camino',
					s: 'CM'
				}
			},
			{
				str: navigator.userAgent,
				substr: 'Netscape',
				name: {
					f: 'Netscape',
					s: 'NS'
				}
			},
			{
				str: navigator.userAgent,
				substr: 'MSIE',
				name: {
					f: 'Explorer',
					s: 'IE'
				},
				vsearch: 'MSIE'
			},
			{
				str: navigator.userAgent,
				substr: 'Trident',
				name: {
					f: 'Explorer',
					s: 'IE'
				},
				vsearch: 'rv'
			},
			{
				str: navigator.userAgent,
				substr: 'Mozilla',
				name: {
					f: 'Netscape',
					s: 'NS'
				},
				vsearch: 'Mozilla'
			}
		],
		dataOS: [
			{
				str: navigator.platform,
				substr: 'Win',
				name: 'Win'
			},
			{
				str: navigator.platform,
				substr: 'Mac',
				name: 'Mac'
			},
			{
				str: navigator.userAgent,
				substr: 'iPhone',
				name: 'iOS'
			},
			{
				str: navigator.userAgent,
				substr: 'iPad',
				name: 'iOS'
			},
			{
				str: navigator.userAgent,
				substr: 'Android',
				name: 'Android'
			},
			{
				str: navigator.platform,
				substr: 'Linux',
				name: 'Linux'
			}
		],
		init: function() {
			return {
				browser: this.searchString(this.dataBrowser) || 'An unknown browser',
				version: this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || '',
				OS: this.searchString(this.dataOS) || 'an unknown OS'
			};
		}
	};
	var browser = BrowserDetect.init();

	function handleError(msg, url, num) {
		if (!url && msg.indexOf('Script error') === 0 && num === 0) return;
		var r = new RegExp(window.location.origin, 'g');
		url = url.replace(r, '');
		console.re.error('[color=red]' + msg + '[/color] in [i]' + url + '[/i] Line: [b]' + num + '[/b]');
		/* return true; */
	}
	window.onerror = handleError;
	window.ConsoleRe = true;
	window.console.re.settings = function(opt) {
		chost = opt.host || 'console.re';
		channel = opt.channel;

		var cprotocol = opt.port === '443' ? 'https://' : 'http://';

		if (opt.port !== '' && typeof opt.port !== 'undefined' && opt.port !== 80 && cprotocol !== 'https://') {
			cport = ':' + opt.port;
		}
	};
})(this, window.console);

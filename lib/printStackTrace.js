export var printStackTrace = function (options) {
  options = options || { guess: !0 };
  var ex = options.e || null,
    guess = !!options.guess,
    mode = options.mode || null;
  var p = new printStackTrace.implementation(),
    result = p.run(ex, mode);
  return guess ? p.guessAnonymousFunctions(result) : result;
};
printStackTrace.implementation = function () {};
printStackTrace.implementation.prototype = {
  run: function (e, t) {
    e = e || this.createException();
    t = t || this.mode(e);
    if (t === 'other') {
      return this.other(arguments.callee);
    } else {
      return this[t](e);
    }
  },
  createException: function () {
    try {
      this.undef();
    } catch (e) {
      return e;
    }
  },
  mode: function (e) {
    if (e['arguments'] && e.stack) {
      return 'chrome';
    } else if (e.stack && e.sourceURL) {
      return 'safari';
    } else if (e.stack && e.number) {
      return 'ie';
    } else if (e.stack && e.fileName) {
      return 'firefox';
    } else if (e.message && e['opera#sourceloc']) {
      if (!e.stacktrace) {
        return 'opera9';
      }
      if (e.message.indexOf('\n') > -1 && e.message.split('\n').length > e.stacktrace.split('\n').length) {
        return 'opera9';
      }
      return 'opera10a';
    } else if (e.message && e.stack && e.stacktrace) {
      if (e.stacktrace.indexOf('called from line') < 0) {
        return 'opera10b';
      }
      return 'opera11';
    } else if (e.stack && !e.fileName) {
      return 'chrome';
    }
    return 'other';
  },
  instrumentFunction: function (t, n, r) {
    t = t || window;
    var i = t[n];
    t[n] = function () {
      r.call(this, e().slice(4));
      return t[n]._instrumented.apply(this, arguments);
    };
    t[n]._instrumented = i;
  },
  deinstrumentFunction: function (e, t) {
    if (e[t].constructor === Function && e[t]._instrumented && e[t]._instrumented.constructor === Function) {
      e[t] = e[t]._instrumented;
    }
  },
  chrome: function (e) {
    return (e.stack + '\n')
      .replace(/^\s+(at eval )?at\s+/gm, '')
      .replace(/^([^\(]+?)([\n$])/gm, '{anonymous}() ($1)$2')
      .replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}() ($1)')
      .replace(/^(.+) \((.+)\)$/gm, '$1@$2')
      .split('\n')
      .slice(1, -1);
  },
  safari: function (e) {
    return e.stack
      .replace(/\[native code\]\n/m, '')
      .replace(/^(?=\w+Error\:).*$\n/m, '')
      .replace(/^@/gm, '{anonymous}()@')
      .split('\n');
  },
  ie: function (e) {
    return e.stack
      .replace(/^\s*at\s+(.*)$/gm, '$1')
      .replace(/^Anonymous function\s+/gm, '{anonymous}() ')
      .replace(/^(.+)\s+\((.+)\)$/gm, '$1@$2')
      .split('\n')
      .slice(1);
  },
  firefox: function (e) {
    return e.stack
      .replace(/(?:\n@:0)?\s+$/m, '')
      .replace(/^(?:\((\S*)\))?@/gm, '{anonymous}($1)@')
      .split('\n');
  },
  opera11: function (e) {
    var t = '{anonymous}',
      n = /^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/;
    var r = e.stacktrace.split('\n'),
      i = [];
    for (var s = 0, o = r.length; s < o; s += 2) {
      var u = n.exec(r[s]);
      if (u) {
        var a = u[4] + ':' + u[1] + ':' + u[2];
        var f = u[3] || 'global code';
        f = f.replace(/<anonymous function: (\S+)>/, '$1').replace(/<anonymous function>/, t);
        i.push(f + '@' + a + ' -- ' + r[s + 1].replace(/^\s+/, ''));
      }
    }
    return i;
  },
  opera10b: function (e) {
    var t = /^(.*)@(.+):(\d+)$/;
    var n = e.stacktrace.split('\n'),
      r = [];
    for (var i = 0, s = n.length; i < s; i++) {
      var o = t.exec(n[i]);
      if (o) {
        var u = o[1] ? o[1] + '()' : 'global code';
        r.push(u + '@' + o[2] + ':' + o[3]);
      }
    }
    return r;
  },
  opera10a: function (e) {
    var t = '{anonymous}',
      n = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
    var r = e.stacktrace.split('\n'),
      i = [];
    for (var s = 0, o = r.length; s < o; s += 2) {
      var u = n.exec(r[s]);
      if (u) {
        var a = u[3] || t;
        i.push(a + '()@' + u[2] + ':' + u[1] + ' -- ' + r[s + 1].replace(/^\s+/, ''));
      }
    }
    return i;
  },
  opera9: function (e) {
    var t = '{anonymous}',
      n = /Line (\d+).*script (?:in )?(\S+)/i;
    var r = e.message.split('\n'),
      i = [];
    for (var s = 2, o = r.length; s < o; s += 2) {
      var u = n.exec(r[s]);
      if (u) {
        i.push(t + '()@' + u[2] + ':' + u[1] + ' -- ' + r[s + 1].replace(/^\s+/, ''));
      }
    }
    return i;
  },
  other: function (e) {
    var t = '{anonymous}',
      n = /function\s*([\w\-$]+)?\s*\(/i,
      r = [],
      i,
      s,
      o = 10;
    try {
      while (e && e['arguments'] && r.length < o) {
        i = n.test(e.toString()) ? RegExp.$1 || t : t;
        s = Array.prototype.slice.call(e['arguments'] || []);
        r[r.length] = i + '(' + this.stringifyArguments(s) + ')';
        e = e.caller;
      }
      return r;
    } catch (e) {
      return '';
    }
  },
  stringifyArguments: function (e) {
    var t = [];
    var n = Array.prototype.slice;
    for (var r = 0; r < e.length; ++r) {
      var i = e[r];
      if (i === undefined) {
        t[r] = 'undefined';
      } else if (i === null) {
        t[r] = 'null';
      } else if (i.constructor) {
        if (i.constructor === Array) {
          if (i.length < 3) {
            t[r] = '[' + this.stringifyArguments(i) + ']';
          } else {
            t[r] =
              '[' + this.stringifyArguments(n.call(i, 0, 1)) + '...' + this.stringifyArguments(n.call(i, -1)) + ']';
          }
        } else if (i.constructor === Object) {
          t[r] = '#object';
        } else if (i.constructor === Function) {
          t[r] = '#function';
        } else if (i.constructor === String) {
          t[r] = '"' + i + '"';
        } else if (i.constructor === Number) {
          t[r] = i;
        }
      }
    }
    return t.join(',');
  },
  sourceCache: {},
  ajax: function (e) {
    return '';
    var t = this.createXMLHTTPObject();
    if (t) {
      try {
        t.open('GET', e, false);
        t.send(null);
        return t.responseText;
      } catch (n) {}
    }
    return '';
  },
  createXMLHTTPObject: function () {
    var e,
      t = [
        function () {
          return new XMLHttpRequest();
        },
        function () {
          return new ActiveXObject('Msxml2.XMLHTTP');
        },
        function () {
          return new ActiveXObject('Msxml3.XMLHTTP');
        },
        function () {
          return new ActiveXObject('Microsoft.XMLHTTP');
        },
      ];
    for (var n = 0; n < t.length; n++) {
      try {
        e = t[n]();
        this.createXMLHTTPObject = t[n];
        return e;
      } catch (r) {}
    }
  },
  isSameDomain: function (e) {
    return typeof location !== 'undefined' && e.indexOf(location.hostname) !== -1;
  },
  getSource: function (e) {
    if (!(e in this.sourceCache)) {
      this.sourceCache[e] = this.ajax(e).split('\n');
    }
    return this.sourceCache[e];
  },
  guessAnonymousFunctions: function (e) {
    for (var t = 0; t < e.length; ++t) {
      var n = /\{anonymous\}\(.*\)@(.*)/,
        r = /^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/,
        i = e[t],
        s = n.exec(i);
      if (s) {
        var o = r.exec(s[1]);
        if (o) {
          var u = o[1],
            a = o[2],
            f = o[3] || 0;
          if (u && this.isSameDomain(u) && a) {
            var l = this.guessAnonymousFunction(u, a, f);
            e[t] = i.replace('{anonymous}', l);
          }
        }
      }
    }
    return e;
  },
  guessAnonymousFunction: function (e, t, n) {
    var r;
    try {
      r = this.findFunctionName(this.getSource(e), t);
    } catch (i) {
      r = 'getSource failed with url: ' + e + ', exception: ' + i.toString();
    }
    return r;
  },
  findFunctionName: function (e, t) {
    var n = /function\s+([^(]*?)\s*\(([^)]*)\)/;
    var r = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/;
    var i = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/;
    var s = '',
      o,
      u = Math.min(t, 20),
      a,
      f;
    for (var l = 0; l < u; ++l) {
      o = e[t - l - 1];
      f = o.indexOf('//');
      if (f >= 0) {
        o = o.substr(0, f);
      }
      if (o) {
        s = o + s;
        a = r.exec(s);
        if (a && a[1]) {
          return a[1];
        }
        a = n.exec(s);
        if (a && a[1]) {
          return a[1];
        }
        a = i.exec(s);
        if (a && a[1]) {
          return a[1];
        }
      }
    }
    return '(?)';
  },
};

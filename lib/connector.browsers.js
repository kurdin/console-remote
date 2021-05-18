/* globals CONSOLE_VERSION, location, prompt, performance, navigator, CSSRule, localStorage, consoleDefault */
/* eslint-env es6 */
/* eslint-disable no-console */

const io = require('socket.io-client')
const { printStackTrace } = require('./printStackTrace')
const { matchMedia, VISIBILITY, IEArraysPolyfill, isArray } = require('./polyfills')
const { kindOf } = require('./kindof')
const { XBBCODE } = require('./xbbcode')

const DEFAULT_CONSOLERE_SERVER = 'https://console.re'
const DEFAULT_CONSOLERE_CHANNEL = 'default'

if (!window.console) window.console = {}

window.matchMedia = window.matchMedia || matchMedia
IEArraysPolyfill()

var name = 'toServerRe'

var consoleReOptions = {
  redirectDefaultConsoleToRemote: false,
  disableDefaultConsoleOutput: false,
  channel: DEFAULT_CONSOLERE_CHANNEL,
  server: DEFAULT_CONSOLERE_SERVER
}

var consolereScriptTag = document.getElementById('consolerescript') || null

if (consolereScriptTag) {
  var options = consolereScriptTag.getAttribute('data-options')
  if (options && options.indexOf('redirectDefaultConsoleToRemote') !== -1) {
    consoleReOptions['redirectDefaultConsoleToRemote'] = true
  }
  if (options && options.indexOf('disableDefaultConsoleOutput') !== -1) {
    consoleReOptions['disableDefaultConsoleOutput'] = true
  }
  consoleReOptions.channel = consolereScriptTag.getAttribute('data-channel') || consoleReOptions.channel
  consoleReOptions.server = consolereScriptTag.getAttribute('data-server') || consoleReOptions.server
}

var isPrivate = consoleReOptions.server !== DEFAULT_CONSOLERE_SERVER

var isLocal =
  window.location.port ||
  /localhost|[0-9]{2,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}|::1|\.local|local|runjs\.co|\.dev|console.re|^$/gi.test(
    window.location.hostname
  )

if (!window.location.origin) window.location.origin = window.location.protocol + '//' + window.location.host

function getCaller(d) {
  d = d || 7
  var t = printStackTrace(),
    c = t[d],
    p
  if (c !== undefined) {
    p = c.match(/^.*([\/<][^\/>]*>?):(\d*):(\d*)?$/)
    if (p === null) p = c.match(/^.*([\/<][^\/>]*>?):(\d*)?$/)
  } else {
    // IE 7-9
    p[1] = ''
    p[2] = '0'
    p[3] = '0'
  }
  return {
    file: p ? p[1] : '',
    line: p ? p[2] : '0',
    col: p ? p[3] : '0'
  }
}

function getWindowSize() {
  var w = document.width || window.outerWidth || document.documentElement.clientWidth,
    h = document.height || window.outerHeight || document.documentElement.clientHeight
  return 'Window Size: [number]' + w + 'px[/number] by [number]' + h + 'px[/number]'
}

function getOtherTypes(t) {
  var e,
    o = ''
  try {
    e = eval(t)
    if (e === true) {
      o = '[booltrue]true[/booltrue]'
    } else if (e === false) {
      o = '[boolfalse]false[/boolfalse]'
    } else if (!isNaN(parseFloat(e)) && isFinite(e)) {
      o = '[number]' + e + '[/number]'
    } else if (typeof e === 'number') {
      o = '[number][Number][/number]'
    } else if (typeof e === 'string') {
      o = '"String"'
    } else if (typeof e === 'function') {
      o = '[Function]'
    } else if (e.nodeType) {
      o = '<' + e.nodeName + ' Element>'
    } else if (typeof e === 'object') {
      o = '{Object}'
      if (isArray(e)) o = '[Array]'
    } else {
      o = '[color=red]undefined[/color]'
    }
  } catch (err) {
    o = '[color=red]' + err + '[/color]'
  }
  return o
}

function getType(t) {
  var o = ''
  if (typeof t !== 'string') return getOtherTypes(t)
  try {
    var obj = JSON.parse(t)
    if (typeof obj === 'object') {
      o = '{Object}'
      if (isArray(obj)) o = '[Array]'
    } else {
      o = getOtherTypes(t)
    }
  } catch (err) {
    o = getOtherTypes(t)
  }
  return o
}

function replaceWithNum(s) {
  var st = '' + s
  return st.replace(/([0-9]+)(px|em||)/g, '[number]$1$2[/number]')
}

function getSize(targetElement) {
  var w, h
  if (targetElement) {
    w = getStyle(targetElement, 'width')
    h = getStyle(targetElement, 'height')
    return '[number]' + w + '[/number]' + ' by ' + '[number]' + h + '[/number]'
  }
  return ''
}

function getStyle(targetElement, styleProp) {
  if (targetElement && targetElement.currentStyle) return targetElement.currentStyle[styleProp]
  else if (window.getComputedStyle)
    return document.defaultView.getComputedStyle(targetElement, null).getPropertyValue(styleProp)
  else return ''
}

var truncate = function (n, useWordBoundary) {
  if (this.length <= n) {
    return this
  }
  var subString = this.substr(0, n - 1)
  return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + '...'
}

function stringify(obj, cmd, prop) {
  if (typeof obj === 'undefined') return '___undefined___'
  if (typeof obj !== 'object') return obj
  var cache = [],
    k_map = [],
    i,
    d_node = {},
    nid = '',
    nclass = '',
    ps,
    s = JSON.stringify(obj, function (k, v) {
      if (typeof v === 'undefined') {
        return '___undefined___'
      }
      if (!v) return v
      if (v.nodeType) {
        if (v.id) nid = v.id
        if (v.className) nclass = v.className
        if (cmd === 'size') {
          return '[tag]<' + v.nodeName + '>[/tag] ' + getSize(v)
        } else if (cmd === 'css') {
          if (isArray(prop)) {
            prop.forEach(function (p) {
              d_node[p] = replaceWithNum(getStyle(v, p))
            })
            return d_node
          } else if (prop) {
            ps = ' ' + prop + ':' + getStyle(v, prop) + ';'
            if (nid) nid = " [attr]id=[/attr][string]'" + nid + "'[/string]"
            if (nclass) nclass = " [attr]class=[/attr][string]'" + nclass + "'[/string]"
            return '[tag]<' + v.nodeName + '' + nid + '' + nclass + '>[/tag]' + replaceWithNum(ps)
          }
        } else {
          d_node.element = v.nodeName
          if (nid) d_node.id = nid
          if (nclass) d_node['class'] = nclass
          d_node.visible = VISIBILITY().isVisible(v)
          d_node.size = getSize(v)
          d_node.html = v.outerHTML
        }
        return d_node
      }
      if (v.window && v.window === v.window.window) return '{Window Object}'
      if (typeof v === 'function') return '[Function]'
      if (typeof v === 'object' && v !== null) {
        var t_array = Array.prototype.slice.call(v)
        if (v.length && t_array.length === v.length) v = t_array
        i = cache.indexOf(v)
        if (i !== -1) {
          return '[ Circular {' + (k_map[i] || 'root') + '} ]'
        }
        cache.push(v)
        k_map.push(k)
      }
      return v
    })
  return s
}

var root = (function () {
  var socket
  var caller = []
  var cache = []
  var gcount = []
  var now_labels = {}
  var gtimer = []
  var or_change = false
  var api = {
    client: true,
    server: true,
    loaded: false
  }
  var levels = [
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
    'timeEnd',
    'now',
    'type',
    'mark',
    'command'
  ]

  function emit(level, args, cmd, cal) {
    caller = cal || getCaller()

    if ((!args.length || levels.indexOf(level) === -1) && level !== 'command') return
    if (api.client && consoleReOptions['disableDefaultConsoleOutput'] === false) {
      logConsole.apply(null, arguments)
    }
    if (api.server) {
      logIo.apply(null, arguments)
    }
    if (!socket) {
      api.connectIO()
    }
  }

  function logConsole(level, args) {
    level = level === 'trace' ? 'debug' : level
    args = isArray(args) ? args : [args]
    if (level !== 'command') {
      args.forEach(function (arg) {
        if (typeof arg === 'string' && arg !== '') {
          if (arg.indexOf('consoleRe [') === 0) return
          var p = XBBCODE.process({
            text: arg
          })
          if (!p.error) arg = p.html
        }
        outputToDefaultConsole(arg, level)
      })
    }
  }

  function outputToDefaultConsole(arg, level) {
    if (!arg || arg === '' || arg === '-') return
    var consl = {}
    if (consoleReOptions['redirectDefaultConsoleToRemote'] && window.consoleDefault) {
      consl = consoleDefault[level] ? consoleDefault[level] : consoleDefault.log
    } else {
      consl = console[level] ? console[level] : console.log
    }
    try {
      consl('consoleRe [' + level + ']', arg)
    } catch (e) {
      void 0
    }
  }

  function logIo(level, args, cmd) {
    var data,
      counter,
      timer,
      t_end,
      last,
      command = ''
    cmd = cmd || ''
    if (cmd === 'css') {
      last = args[args.length - 1]
      if (isArray(last) || 'string' === typeof last) args.pop()
      else cmd = ''
    } else if (cmd === 'count') {
      counter = args.toString()
      if (isNaN(gcount[counter])) {
        gcount[counter] = 1
      } else {
        gcount[counter]++
      }
      args.push(gcount[counter])
    } else if (cmd === 'time') {
      timer = args.toString()
      gtimer[timer] = new Date().getTime()
      args.push('[white]started[/white]')
    } else if (cmd === 'timeEnd') {
      timer = args.toString()
      t_end = new Date().getTime() - gtimer[timer]
      if (!isNaN(t_end)) {
        args.push('[white]ends[/white] in [number]' + t_end + '[/number] ms')
      } else {
        args.push('[white]not started[/white]')
      }
    } else if (cmd === 'now') {
      var nowAt = args.toString()
      var pNow = perfNow()
      var timeNow
      var lastCall
      if (now_labels[nowAt]) {
        timeNow = pNow - now_labels[nowAt]
        lastCall = ' [color=gray]from last call[/color]'
      } else {
        timeNow = pNow
        lastCall = ' [color=gray]from navigation start[/color]'
      }
      now_labels[nowAt] = pNow
      nowAt = nowAt !== '-' ? lastCall + '[color=gray] at `' + nowAt + '` [/color]' : lastCall
      args = []
      args.push('[white]performance now is[/white] [number]' + timeNow.toFixed(2) + '[/number] ms' + nowAt)
    }

    if (cmd !== '' && isArray(args)) logConsole(cmd, args)

    for (var i = 0; i < args.length; i++) {
      args[i] = stringify(args[i], cmd, last)
    }

    if (typeof args === 'object' && !args.length) data = args
    else {
      if (level === 'command') command = cmd
      data = {
        command: command,
        channel: consoleReOptions.channel,
        browser: browser,
        level: level,
        args: args,
        caller: caller
      }
    }

    if (socket) {
      if (cache.length) {
        sendCached(cache)
      }
      socket.emit(name, data)
    } else {
      cache.push([level, data])
    }
  }

  for (var i = 0, l; i < levels.length; i++) {
    l = levels[i]
    api[l] = logLevel(l)
  }

  function logLevel(level) {
    return function () {
      api._dispatch(level, [].slice.call(arguments))
    }
  }

  function onConnect() {
    if (socket) {
      var connectMessage =
        'consoleRe [info] connected to server `' +
        consoleReOptions.server +
        '` channel `' +
        consoleReOptions.channel +
        '`'

      if (window.consoleDefault && consoleDefault.log) {
        consoleDefault.log(connectMessage)
      } else {
        console.log(connectMessage)
      }
      socket.emit('channel', consoleReOptions.channel)
    }
    sendCached(cache)
  }

  function sendCached(c) {
    var ced = c.shift()
    api._dispatch('command', '', 'autoclear')
    api._dispatch('command', '', 'automark')
    while (ced) {
      logIo.apply(null, ced)
      ced = c.shift()
    }
  }

  api.connectIO = function (r) {
    if (!isLocal && !isPrivate) {
      console.warn(
        'consoleRe [warning] seems like you trying to use console remote on public, production server. Console.Re is for light, local development only, for production you can install and use self hosted solution https://console.re/#self-hosted-server'
      )
      return
    }
    if (io) {
      socket = io.connect(consoleReOptions.server, {
        withCredentials: false,
        extraHeaders: {
          'x-consolere': 'true'
        },
        reconnectionDelay: 500,
        reconnectionDelayMax: 'Infinity'
      })
      socket.on('connect', onConnect)
      socket.on('connect_failed', function () {
        var connectionError = 'consoleRe [error] connection failed to server `' + consoleReOptions.server + '`'
        if (window.consoleDefault && consoleDefault.error) {
          consoleDefault.error(connectionError)
        } else {
          console.error(connectionError)
        }
      })
    } else if (!r) {
      api.connectIO(true)
    }
  }

  api.size = api.s = function (s) {
    if (!s || typeof s === 'undefined' || s === 'window') {
      api._dispatch('size', [getWindowSize()])
    } else {
      api._dispatch('size', [].slice.call(arguments), 'size')
    }
  }

  api.count = api.c = function () {
    api._dispatch('count', [].slice.call(arguments), 'count')
  }

  api.time = api.ti = function () {
    api._dispatch('time', [].slice.call(arguments), 'time')
  }

  api.timeEnd = api.te = function () {
    api._dispatch('time', [].slice.call(arguments), 'timeEnd')
  }

  api.trace = api.tr = function () {
    var t = printStackTrace(),
      out = [],
      a = [].slice.call(arguments)
    for (i = 0; t.length > i; i++) {
      if (!/console.re.js/gi.test(t[i])) out.push(t[i])
    }
    api._dispatch('trace', [a.toString(), out])
  }

  api.error = api.e = function () {
    var a = [].slice.call(arguments),
      type = '',
      out = []
    a.forEach(function (t) {
      type = '[color=red]' + t + '[/color]'
      out.push(type)
    })
    api._dispatch('error', out)
  }

  api.css = api.cs = function () {
    api._dispatch('css', [].slice.call(arguments), 'css')
  }

  api.test = api.ts = function () {
    var a = [].slice.call(arguments),
      type = '',
      out = []
    a.forEach(function (t) {
      var nameOut
      type = kindOf(t)
      if (/|Function|Object|Array|Element|/gi.test(type)) {
        type = '[color=#BBB519]' + type + '[/color]'
      }
      try {
        nameOut = truncate.apply(t.toString(), [30, false])
      } catch (e) {
        nameOut = t
      }
      out.push('[color=#BC9044]' + nameOut + '[/color]' + '[color=gray] is [/color]' + type)
    })
    api._dispatch('test', out)
  }

  api.type = api.t = function () {
    var a = [].slice.call(arguments),
      type = '',
      out = []
    a.forEach(function (t) {
      type = '[color=#BBB519]' + kindOf(t) + '[/color]'
      out.push('type is ' + type)
    })
    api._dispatch('type', out)
  }

  api.assert = api.a = function () {
    var a = [].slice.call(arguments),
      out = []
    a.forEach(function (t, i) {
      if (typeof t !== 'string') {
        if (!t) {
          if (typeof a[i + 1] === 'string') {
            out.push('[color=red]' + a[i + 1] + '[/color]')
          } else {
            out.push('[color=red]Assertion Failure[/color]')
          }
        }
      }
    })
    if (out.length) api._dispatch('assert', out)
  }

  api._dispatch = function (level, args, cmd, cal) {
    emit(level, args, cmd, cal)
  }

  api.media = api.mq = function (a, cal) {
    var mq_list = [],
      out = [],
      m = [],
      s_type = false,
      s_query = true,
      o_t = 'landscape',
      o_r = window.orientation || 0,
      timer_cal
    if (a === 'type') {
      s_type = true
      s_query = false
    } else if (a === 'all-types' || a === 'all') {
      s_query = s_type = true
    }
    if (a === 'watch') {
      var _timerVar
      timer_cal = getCaller(5)
      if (window.addEventListener) {
        window.addEventListener(
          'resize',
          function () {
            watchMediaQuery(timer_cal)
          },
          false
        )
        window.addEventListener(
          'orientationchange',
          function () {
            if (o_r !== window.orientation) or_change = true
            watchMediaQuery(timer_cal)
          },
          false
        )
      }
    }
    createMQList()
    m = mqChange()
    if (m.length) {
      if (m.length === 1) out.push(mqChange()[0])
      else out.push(mqChange())
    } else {
      out.push('[yellow]No Media Query Rules[/yellow]')
    }
    if (a === 'w') {
      out.push(getWindowSize())
      if (or_change) {
        if (Math.abs(window.orientation) !== 90) o_t = 'portrait'
        out.push('Orientation: [yellow]' + o_t + '[/yellow]')
      }
      api._dispatch('media', out, '', cal)
    } else {
      api._dispatch('media', out)
    }

    function watchMediaQuery(t) {
      if (window.matchMedia) {
        clearTimeout(_timerVar)
        _timerVar = setTimeout(function () {
          api.media('w', t)
        }, 500)
      }
    }

    function inList(media) {
      for (var i = mq_list.length - 1; i >= 0; i--) {
        if (mq_list[i].media === media) {
          return true
        }
      }
      return false
    }

    function createMQList() {
      var mq = getMediaQueries(),
        i
      if (s_query) {
        for (i = mq.length - 1; i >= 0; i--) {
          if (!inList(mq[i])) {
            mq_list.push(window.matchMedia(mq[i]))
          }
        }
      }
      if (s_type) {
        var links = document.getElementsByTagName('link')
        for (i = links.length - 1; i >= 0; i--) {
          if (links[i].media) {
            mq_list.push(window.matchMedia(links[i].media))
          }
        }
      }
    }

    function getMediaQueries() {
      var s = document.styleSheets,
        r,
        i,
        j,
        mq = []
      for (i = s.length - 1; i >= 0; i--) {
        try {
          r = s[i].cssRules
          if (r) {
            for (j = 0; j < r.length; j++) {
              if (r[j].type === CSSRule.MEDIA_RULE) {
                mq.push(r[j].media.mediaText)
              }
            }
          }
        } catch (e) {
          console.error(e)
        }
      }
      return mq
    }

    function mqChange() {
      var q = []
      for (var i in mq_list) {
        if (mq_list[i].matches) {
          q.push(replaceWithNum(mq_list[i].media))
        }
      }
      return q
    }
  }

  api.now = api.n = function (label) {
    if (typeof label == 'undefined') label = '-'
    api._dispatch('now', label, 'now')
  }

  api.clear = api.cl = function () {
    api._dispatch('command', '', 'clear')
  }

  api.mark = api.m = function () {
    var args = [].slice.call(arguments)
    var strg = args.length === 0 ? '' : args
    api._dispatch('command', strg, 'mark')
  }

  api.l = api.log
  api.i = api.info
  api.d = api.debug
  api.w = api.warn

  api.redirectDefaultLog = function () {
    if ((window.consoleDefault && consoleDefault.log) || (!isLocal && !isPrivate)) {
      return
    }
    if (consoleReOptions['redirectDefaultConsoleToRemote']) {
      window.consoleDefault = {}
      var redirectMethods = ['log', 'info', 'warn', 'error', 'debug', 'time', 'timeEnd']
      redirectMethods.forEach(function (method) {
        window.consoleDefault[method] = console[method]
        console[method] = logLevel(method)
      })
    }
  }

  api.redirectDefaultLog()
  return api
})()

var perfNow = function () {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime

  if (typeof performance !== 'undefined' && performance !== null && performance.now) {
    return performance.now()
  } else if (typeof process !== 'undefined' && process !== null && process.hrtime) {
    hrtime = process.hrtime
    getNanoSeconds = function () {
      var hr
      hr = hrtime()
      return hr[0] * 1e9 + hr[1]
    }
    moduleLoadTime = getNanoSeconds()
    upTime = process.uptime() * 1e9
    nodeLoadTime = moduleLoadTime - upTime
    return (getNanoSeconds() - nodeLoadTime) / 1e6
  } else if (Date.now) {
    loadTime = Date.now()
    return Date.now() - loadTime
  } else {
    loadTime = new Date().getTime()
    return new Date().getTime() - loadTime
  }
}

var BrowserDetect = {
  searchString: function (data) {
    var name = ''
    for (var i = 0; i < data.length; i++) {
      var d_string = data[i].str
      var d_prop = data[i].prop
      this.versionSearchString = data[i].vsearch || data[i].name
      if (d_string && d_string.indexOf(data[i].substr) !== -1) {
        name = data[i].name
        break
      } else if (d_prop) {
        name = data[i].name
        break
      }
    }
    return name
  },
  searchVersion: function (dString) {
    var i = dString.indexOf(this.versionSearchString)
    if (i === -1) return false
    return parseFloat(dString.substr(i + this.versionSearchString.length + 1))
  },
  dataBrowser: [
    {
      str: navigator.userAgent,
      substr: 'Edg',
      vsearch: 'Edg',
      name: {
        f: 'Edge',
        s: 'EG'
      }
    },
    {
      str: navigator.userAgent,
      substr: 'Edge',
      vsearch: 'Edge',
      name: {
        f: 'Edge',
        s: 'EG'
      }
    },
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
  init: function () {
    return {
      browser: this.searchString(this.dataBrowser) || 'An unknown browser',
      version: this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || '',
      OS: this.searchString(this.dataOS) || 'an unknown OS'
    }
  }
}
var browser = BrowserDetect.init()

function handleError(msg, url, num) {
  if (!url && msg.indexOf('Script error') === 0 && num === 0) return
  var r = new RegExp(window.location.origin, 'g')
  url = url.replace(r, '')
  if (console.re) {
    console.re.error('[color=red]' + msg + '[/color] in [i]' + url + '[/i] Line: [b]' + num + '[/b]')
  }
}

window.onerror = handleError
window.ConsoleRe = true
window.ConsoleReConnectorVersion = CONSOLE_VERSION

root.connect = function (options) {
  if (options != null) {
    if (options.redirectDefaultConsoleToRemote != null) {
      consoleReOptions.redirectDefaultConsoleToRemote = options.redirectDefaultConsoleToRemote
    }
    if (options.disableDefaultConsoleOutput !== null) {
      consoleReOptions.disableDefaultConsoleOutput = options.disableDefaultConsoleOutput
    }
    if (options.channel != null) {
      consoleReOptions.channel = options.channel
    }
    if (options.server != null) {
      consoleReOptions.server = options.server
    }
  }
  root.redirectDefaultLog()
  root.connectIO()
  return root
}

export default root

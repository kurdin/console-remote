export var VISIBILITY = function () {
  function e(r, i, s, o, u, a, f) {
    var l = r.parentNode,
      c = 2;
    if (!n(r)) {
      return false;
    }
    if (9 === l.nodeType) {
      return true;
    }
    if ('0' === t(r, 'opacity') || 'none' === t(r, 'display') || 'hidden' === t(r, 'visibility')) {
      return false;
    }
    if (
      'undefined' === typeof i ||
      'undefined' === typeof s ||
      'undefined' === typeof o ||
      'undefined' === typeof u ||
      'undefined' === typeof a ||
      'undefined' === typeof f
    ) {
      i = r.offsetTop;
      u = r.offsetLeft;
      o = i + r.offsetHeight;
      s = u + r.offsetWidth;
      a = r.offsetWidth;
      f = r.offsetHeight;
    }
    if (l) {
      if ('hidden' === t(l, 'overflow') || 'scroll' === t(l, 'overflow')) {
        if (
          u + c > l.offsetWidth + l.scrollLeft ||
          u + a - c < l.scrollLeft ||
          i + c > l.offsetHeight + l.scrollTop ||
          i + f - c < l.scrollTop
        ) {
          return false;
        }
      }
      if (r.offsetParent === l) {
        u += l.offsetLeft;
        i += l.offsetTop;
      }
      return e(l, i, s, o, u, a, f);
    }
    return true;
  }
  function t(e, t) {
    if (window.getComputedStyle) {
      return document.defaultView.getComputedStyle(e, null)[t];
    }
    if (e.currentStyle) {
      return e.currentStyle[t];
    }
  }
  function n(e) {
    while ((e = e.parentNode)) {
      if (e == document) {
        return true;
      }
    }
    return false;
  }
  return { getStyle: t, isVisible: e };
};

export var matchMedia = function () {
  var e = window.styleMedia || window.media;
  if (!e) {
    var t = document.createElement('style'),
      n = document.getElementsByTagName('script')[0],
      r = null;
    t.type = 'text/css';
    t.id = 'matchmediajs-test';
    n.parentNode.insertBefore(t, n);
    r = ('getComputedStyle' in window && window.getComputedStyle(t, null)) || t.currentStyle;
    e = {
      matchMedium: function (e) {
        var n = '@media ' + e + '{ #matchmediajs-test { width: 1px; } }';
        if (t.styleSheet) {
          t.styleSheet.cssText = n;
        } else {
          t.textContent = n;
        }
        return r.width === '1px';
      },
    };
  }
  return function (t) {
    return { matches: e.matchMedium(t || 'all'), media: t || 'all' };
  };
};

export var IEArraysPolyfill = function () {
  // IE array polyfills
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, fromIndex) {
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
    Array.prototype.forEach = function (fn, scope) {
      var i, len;
      for (i = 0, len = this.length; i < len; ++i) {
        if (i in this) {
          fn.call(scope, this[i], i, this);
        }
      }
    };
  }
};

export var isArray =
  Array.isArray ||
  function (a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

// \ IE array polyfills

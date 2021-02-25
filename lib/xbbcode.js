export var XBBCODE = (function () {
    function h(e, t, n, r, o, a, f) {
        f = f || [];
        n++;
        var l = new RegExp('(<bbcl=' + n + ' )(' + s.join('|') + ')([ =>])', 'gi'),
            c = new RegExp('(<bbcl=' + n + ' )(' + s.join('|') + ')([ =>])', 'i'),
            p = a.match(l) || [],
            d,
            v,
            m,
            g,
            y = i[e] || {};
        l.lastIndex = 0;
        if (!p) {
            a = '';
        }
        for (m = 0; m < p.length; m++) {
            c.lastIndex = 0;
            g = p[m].match(c)[2].toLowerCase();
            if (y.restrictChildrenTo.length > 0) {
                if (!y.validChildLookup[g]) {
                    v = 'The tag "' + g + '" is not allowed as a child of the tag "' + e + '".';
                    f.push(v);
                }
            }
            d = i[g] || {};
            if (d.restrictParentsTo.length > 0) {
                if (!d.validParentLookup[e]) {
                    v = 'The tag "' + e + '" is not allowed as a parent of the tag "' + g + '".';
                    f.push(v);
                }
            }
        }
        a = a.replace(u, function (e, t, n, r, i) {
            f = h(n, e, t, n, r, i, f);
            return e;
        });
        return f;
    }

    function p(e) {
        e = e.replace(/\<([^\>][^\>]*?)\>/gi, function (e, t) {
            var n = t.match(/^bbcl=([0-9]+) /);
            if (n === null) {
                return '<bbcl=0 ' + t + '>';
            } else {
                return (
                    '<' +
                    t.replace(/^(bbcl=)([0-9]+)/, function (e, t, n) {
                        return t + (parseInt(n, 10) + 1);
                    }) +
                    '>'
                );
            }
        });
        return e;
    }

    function d(e) {
        return e
            .replace(/<bbcl=[0-9]+ \/\*>/gi, '')
            .replace(/<bbcl=[0-9]+ /gi, '&#91;')
            .replace(/>/gi, '&#93;');
    }

    function m(e) {
        var t = e.text;
        t = t.replace(u, v);
        return t;
    }

    function g(e) {
        e = e.replace(/\[(?!\*[ =\]]|list([ =][^\]]*)?\]|\/list[\]])/gi, '<');
        e = e.replace(/\[(?=list([ =][^\]]*)?\]|\/list[\]])/gi, '>');
        while (
            e !==
            (e = e.replace(/>list([ =][^\]]*)?\]([^>]*?)(>\/list])/gi, function (e, t, n) {
                var r = e;
                while (
                    r !==
                    (r = r.replace(/\[\*\]([^\[]*?)(\[\*\]|>\/list])/i, function (e, t, n) {
                        if (n === '>/list]') {
                            n = '</*]</list]';
                        } else {
                            n = '</*][*]';
                        }
                        var r = '<*]' + t + n;
                        return r;
                    }))
                );
                r = r.replace(/>/g, '<');
                return r;
            }))
        );
        e = e.replace(/</g, '[');
        return e;
    }

    function y(e) {
        while (
            e !==
            (e = e.replace(a, function (e, t, n, r) {
                e = e.replace(/\[/g, '<');
                e = e.replace(/\]/g, '>');
                return p(e);
            }))
        );
        return e;
    }
    var e = {},
        t = /^(?:https?|file|c):(?:\/{1,3}|\\{1})[-a-zA-Z0-9:@#%&()~_?\+=\/\\\.]*$/,
        n = /^(?:red|green|blue|orange|yellow|black|white|brown|gray|silver|purple|maroon|fushsia|lime|olive|navy|teal|aqua)$/,
        r = /^#?[a-fA-F0-9]{6}$/,
        i,
        s,
        o = [],
        u,
        a,
        f,
        l,
        c;
    i = {
        b: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        string: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        attr: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        booltrue: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        boolfalse: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        bbcode: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        color: {
            openTag: function (e, t) {
                var i = e.substr(1) || '#FFF';
                r.lastIndex = 0;
                if (!n.test(i)) {
                    if (!r.test(i)) {
                        i = 'black';
                    } else {
                        if (i.substr(0, 1) !== '#') {
                            i = '#' + i;
                        }
                    }
                }
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        noparse: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
            noParse: true,
        },
        i: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        tag: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        number: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        img: {
            openTag: function (e, n) {
                var r = n;
                t.lastIndex = 0;
                if (!t.test(r)) {
                    r = '';
                }
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
            displayContent: false,
        },
        s: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        size: {
            openTag: function (e, t) {
                var n = parseInt(e.substr(1), 10) || 0;
                if (n < 1 || n > 20) {
                    n = 1;
                }
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        u: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        url: {
            openTag: function (e, n) {
                var r;
                if (!e) {
                    r = n.replace(/<.*?>/g, '');
                } else {
                    r = e.substr(1);
                }
                t.lastIndex = 0;
                if (!t.test(r)) {
                    r = '#';
                }
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        red: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        blue: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        green: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        yellow: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        orange: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        white: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        black: {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
        '*': {
            openTag: function (e, t) {
                return '';
            },
            closeTag: function (e, t) {
                return '';
            },
        },
    };
    s = [];
    (function () {
        var e, t, n;
        for (e in i) {
            if (i.hasOwnProperty(e)) {
                if (e === '*') {
                    s.push('\\' + e);
                } else {
                    s.push(e);
                    if (i[e].noParse) {
                        o.push(e);
                    }
                }
                i[e].validChildLookup = {};
                i[e].validParentLookup = {};
                i[e].restrictParentsTo = i[e].restrictParentsTo || [];
                i[e].restrictChildrenTo = i[e].restrictChildrenTo || [];
                n = i[e].restrictChildrenTo.length;
                for (t = 0; t < n; t++) {
                    i[e].validChildLookup[i[e].restrictChildrenTo[t]] = true;
                }
                n = i[e].restrictParentsTo.length;
                for (t = 0; t < n; t++) {
                    i[e].validParentLookup[i[e].restrictParentsTo[t]] = true;
                }
            }
        }
    })();
    u = new RegExp('<bbcl=([0-9]+) (' + s.join('|') + ')([ =][^>]*?)?>((?:.|[\\r\\n])*?)<bbcl=\\1 /\\2>', 'gi');
    a = new RegExp('\\[(' + s.join('|') + ')([ =][^\\]]*?)?\\]([^\\[]*?)\\[/\\1\\]', 'gi');
    f = new RegExp('\\[(' + o.join('|') + ')([ =][^\\]]*?)?\\]([\\s\\S]*?)\\[/\\1\\]', 'gi');
    (function () {
        var e = [];
        for (var t = 0; t < s.length; t++) {
            if (s[t] !== '\\*') {
                e.push('/' + s[t]);
            }
        }
        l = new RegExp('(\\[)((?:' + s.join('|') + ')(?:[ =][^\\]]*?)?)(\\])', 'gi');
        c = new RegExp('(\\[)(' + e.join('|') + ')(\\])', 'gi');
    })();
    var v = function (e, t, n, r, s) {
        n = n.toLowerCase();
        var o = i[n].noParse ? d(s) : s.replace(u, v),
            a = i[n].openTag(r, o),
            f = i[n].closeTag(r, o);
        if (i[n].displayContent === false) {
            o = '';
        }
        return a + o + f;
    };
    e.process = function (e) {
        var t = {
                html: '',
                error: false,
            },
            n = [];
        e.text = e.text.replace(/</g, '<');
        e.text = e.text.replace(/>/g, '>');
        e.text = e.text.replace(l, function (e, t, n, r) {
            return '<' + n + '>';
        });
        e.text = e.text.replace(c, function (e, t, n, r) {
            return '<' + n + '>';
        });
        e.text = e.text.replace(/\[/g, '&#91;');
        e.text = e.text.replace(/\]/g, '&#93;');
        e.text = e.text.replace(/</g, '[');
        e.text = e.text.replace(/>/g, ']');
        while (
            e.text !==
            (e.text = e.text.replace(f, function (e, t, n, r) {
                r = r.replace(/\[/g, '&#91;');
                r = r.replace(/\]/g, '&#93;');
                n = n || '';
                r = r || '';
                return '[' + t + n + ']' + r + '[/' + t + ']';
            }))
        );
        e.text = g(e.text);
        e.text = y(e.text);
        n = h('bbcode', e.text, -1, '', '', e.text);
        t.html = m(e);
        if (t.html.indexOf('[') !== -1 || t.html.indexOf(']') !== -1) {
            n.push('Some tags appear to be misaligned.');
        }
        if (e.removeMisalignedTags) {
            t.html = t.html.replace(/\[.*?\]/g, '');
        }
        if (e.addInLineBreaks) {
            t.html = t.html.replace(/\r\n/g, '\n');
            t.html = t.html.replace(/(\r|\n)/g, '$1<br/>');
        }
        t.html = t.html.replace('&#91;', '[');
        t.html = t.html.replace('&#93;', ']');
        t.error = n.length === 0 ? false : true;
        t.errorQueue = n;
        return t;
    };
    return e;
})();

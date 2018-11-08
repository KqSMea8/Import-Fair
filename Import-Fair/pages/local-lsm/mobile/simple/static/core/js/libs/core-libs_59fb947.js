var require, define; !
function(e) {
    function t(e, t, n) {
        function r(t, n) {
            var r = new window.XMLHttpRequest;
            r.onreadystatechange = function() {
                if (4 == r.readyState) {
                    if (200 != r.status) throw new Error("A unkown error occurred.");
                    a = r.responseText;
                    var i = o.getItem(e);
                    i && o.removeItem(i);
                    try {
                        o.setItem(t, a),
                        o.setItem(e, t)
                    } catch(c) {}
                    n(a)
                }
            },
            r.open("get", t),
            r.send(null)
        }
        var a, o = localStorage;
        if (a = o.getItem(t)) {
            if (!o.getItem(e)) try {
                o.setItem(e, t)
            } catch(i) {}
            n(a)
        } else r(t, n)
    }
    function n(e, t) {
        if (! (e in s)) {
            s[e] = !0;
            var n = document.createElement("script");
            if (t) {
                var r = setTimeout(t, require.timeout);
                n.onerror = function() {
                    clearTimeout(r),
                    t()
                },
                n.onreadystatechange = function() {
                    "complete" == this.readyState && clearTimeout(r)
                }
            }
            return n.type = "text/javascript",
            n.src = e,
            a.appendChild(n),
            n
        }
    }
    function r(e, r, i) {
        var c = o[e] || (o[e] = []);
        c.push(r);
        var p, f = u[e] || {},
        d = f.pkg;
        p = d ? l[d].url: f.url || e,
        window.XMLHttpRequest ? p in s || (s[p] = !0, t(e, p,
        function(e) {
            script = document.createElement("script"),
            script.type = "text/javascript",
            script.innerHTML = e,
            a.appendChild(script)
        })) : n(p, i &&
        function() {
            i(e)
        })
    }
    var a = document.getElementsByTagName("head")[0],
    o = {},
    i = {},
    c = {},
    s = {},
    u = {},
    l = {};
    define = function(e, t) {
        i[e] = t;
        var n = o[e];
        if (n) {
            for (var r = n.length - 1; r >= 0; --r) n[r]();
            delete o[e]
        }
    },
    require = function(e) {
        e = require.alias(e);
        var t = c[e];
        if (t) return t.exports;
        var n = i[e];
        if (!n) throw Error("Cannot find module `" + e + "`");
        t = c[e] = {
            exports: {}
        };
        var r = "function" == typeof n ? n.apply(t, [require, t.exports, t]) : n;
        return r && (t.exports = r),
        t.exports
    },
    require.on = function(t, n) {
        function r(e) {
            for (var t = e.length - 1; t >= 0; --t) {
                var n = e[t];
                if (! (n in i)) {
                    s++;
                    var r = o[n] || (o[n] = []);
                    r.push(a)
                }
            }
        }
        function a() {
            0 == s--&&setTimeout(function() {
                var r, a = [];
                for (r = 0; r < t.length; r++) a[r] = require(t[r]);
                n && n.apply(e, a)
            },
            10)
        }
        "string" == typeof t && (t = [t]);
        for (var c = t.length - 1; c >= 0; --c) t[c] = require.alias(t[c]);
        var s = 0;
        r(t),
        a()
    },
    require.async = function(t, n, a) {
        function o(e) {
            for (var t = e.length - 1; t >= 0; --t) {
                var n = e[t];
                if (! (n in i || n in l)) {
                    l[n] = !0,
                    p++,
                    r(n, c, a);
                    var s = u[n];
                    s && "deps" in s && o(s.deps)
                }
            }
        }
        function c() {
            if (0 == p--) {
                var r, a, o = [];
                for (r = 0, a = t.length; a > r; ++r) o[r] = require(t[r]);
                n && n.apply(e, o)
            }
        }
        "string" == typeof t && (t = [t]);
        for (var s = t.length - 1; s >= 0; --s) t[s] = require.alias(t[s]);
        var l = {},
        p = 0;
        o(t),
        c()
    },
    require.resourceMap = function(e) {
        var t, n;
        n = e.res;
        for (t in n) n.hasOwnProperty(t) && (u[t] = n[t]);
        n = e.pkg;
        for (t in n) n.hasOwnProperty(t) && (l[t] = n[t])
    },
    require.loadJs = function(e) {
        n(e)
    },
    require.loadCss = function(e) {
        if (e.content) {
            var t = document.createElement("style");
            t.type = "text/css",
            t.styleSheet ? t.styleSheet.cssText = e.content: t.innerHTML = e.content,
            a.appendChild(t)
        } else if (e.url) {
            var n = document.createElement("link");
            n.href = e.url,
            n.rel = "stylesheet",
            n.type = "text/css",
            a.appendChild(n)
        }
    },
    require.alias = function(e) {
        return e
    },
    require.timeout = 5e3,
    define.amd = {
        jQuery: !0,
        version: "1.0.0"
    }
} (this);
var BigPipe = function() {
    function parseJSON(json) {
        return window.JSON ? JSON.parse(json) : eval("(" + json + ")")
    }
    function isPageRequest(e) {
        return /pagelets\[\]=pager/.test(e)
    }
    function ajax(e, t, n, r) {
        window._EXP_INFO && 1 === window._EXP_INFO.useXijiangData && (e += "&hitxijiangtest=1"),
        r = r || {};
        var a = r.isPage === !0,
        o = new(window.XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP");
        a && alog("cus.fire", "count", ["z_request_all", "page:16_10"]);
        var i = setTimeout(function() {
            isPageRequest(e) && alog("cus.fire", "count", ["z_response_timeout", "page:16_10"])
        },
        3e3);
        o.onreadystatechange = function() {
            if (4 == o.readyState) if (clearInterval(i), 200 === o.status) {
                if (a && alog("cus.fire", "count", ["z_response_all", "page:16_10"]), o.getResponseHeader("X-Redirect") && o.getResponseHeader("X-Location")) return void(location.href = o.getResponseHeader("X-Location"));
                t(o.responseText)
            } else a && alog("cus.fire", "count", ["z_ajax_error", "page:16_10"])
        },
        o.open(n ? "POST": "GET", e + "&t=" + ~~ (1e6 * Math.random()), !0),
        n && o.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
        o.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
        o.send(n)
    }
    function getCommentById(e) {
        var t = document.getElementById(e);
        if (!t) return "";
        var n = t.firstChild.nodeValue;
        return n = n.substring(1, n.length - 1).replace(/\\([\s\S]|$)/g, "$1"),
        t.parentNode.removeChild(t),
        n
    }
    function renderPagelet(e, t, n) {
        if (! (e.id in n)) {
            n[e.id] = !0,
            e.parent_id && renderPagelet(t[e.parent_id], t, n);
            var r = document.getElementById(e.id);
            r || (r = document.createElement("div"), r.id = e.id, container ? container.appendChild(r) : document.body.appendChild(r)),
            r.innerHTML = e.html || getCommentById(e.html_id)
        }
    }
    function render(e, t) {
        pagelets = t ? t: pagelets;
        var n, r = pagelets.length,
        a = {},
        o = {},
        e = e || {};
        for (n = 0; r > n; n++) {
            var i = pagelets[n];
            a[i.id] = i
        }
        for (n = 0; r > n; n++) renderPagelet(pagelets[n], a, o);
        e.trigger === !0 && trigger("pagerendercomplete", {
            url: pageUrl,
            resource: resource
        })
    }
    function process(e, t, n) {
        function r() {
            var n = getNeedLoad(e.js);
            if (e.style) {
                var r = document.createElement("style");
                r.innerHTML = e.style,
                document.getElementsByTagName("head")[0].appendChild(r)
            }
            if (t(), a && alog("cus.fire", "count", ["z_js_all", "page:16_10"]), n) {
                var o = location.href;
                LazyLoad.js(n,
                function() {
                    recordLoaded(n),
                    o === location.href && (e.script && window.eval(e.script), a && alog("cus.fire", "count", ["z_js_success", "page:16_10"]), trigger("onpageloaded"), a && alog("cus.fire", "count", ["z_page_load", "page:16_10"]))
                })
            } else e.script && window.eval(e.script),
            a && alog("cus.fire", "count", ["z_js_success", "page:16_10"]),
            trigger("onpageloaded"),
            a && alog("cus.fire", "count", ["z_page_load", "page:16_10"])
        }
        n = n || {};
        var a = n.isPage === !0;
        e.async && require.resourceMap(e.async);
        var o = getNeedLoad(e.css);
        o ? LazyLoad.css(o.reverse(),
        function() {
            recordLoaded(o),
            r()
        }) : r()
    }
    function getNeedLoad(e) {
        var t = [];
        if ("string" == typeof e) t = [e];
        else if ("[object Array]" === Object.prototype.toString.call(e)) for (var n = 0; n < e.length; n++) loadedResource[e[n]] !== LOADED && t.push(e[n]);
        return 0 === t.length && (t = null),
        t
    }
    function recordLoaded(e) {
        var t = e;
        "string" == typeof t && (t = [t]);
        for (var n = 0; n < t.length; n++) loadedResource[e[n]] = LOADED
    }
    function register(e) {
        process(e,
        function() {
            render({
                trigger: !0
            }),
            "function" == typeof onReady && onReady()
        })
    }
    function fetch(e, t, n, r) {
        var a, o = location.href,
        n = n || {},
        i = {},
        c = isPageRequest(e);
        containerId = t;
        var s = function(n, a) {
            var i = parseJSON(n);
            a = a || {},
            o === location.href && t == containerId && (pageUrl = e, resource = i, trigger("pagearrived", a), onPagelets(i, t, r, a))
        };
        isCacheAvailable(e) && n.cache !== !1 ? (a = getCachedResource(e), i.initiator = initiatorType.FROM_CACHE, i.isPage = !1, statRecord(e), s(a, i)) : (i.isPage = c, ajax(e,
        function(t) {
            i.initiator = initiatorType.QUICKLING,
            addResourceToCache(e, t),
            s(t, i)
        },
        null, {
            isPage: c
        }))
    }
    function refresh(e, t, n, r) {
        fetch(e, t, n, r)
    }
    function asyncLoad(e, t, n) {
        function r(e) {
            resource = e,
            pageUrl = s,
            process(e.resource_map,
            function() {
                render({},
                e.pagelets),
                "function" == typeof n && n()
            })
        }
        e instanceof Array || (e = [e]),
        t = t || {};
        var a, o = [],
        i = location.href,
        c = t.param ? "&" + t.param: "",
        s = "string" == typeof t.url ? t.url: location.href.split("#")[0];
        for (a = e.length - 1; a >= 0; a--) {
            var u = e[a].id;
            if (!u) throw Error("[BigPipe] missing pagelet id");
            o.push("pagelets[]=" + u)
        }
        s = s.replace(/\/$/, "") + "&" + o.join("&") + "&force_mode=1&fis_widget=true" + c,
        ajax(s,
        function(e) {
            i === location.href && r(parseJSON(e))
        })
    }
    function statRecord(e) {
        if ("string" == typeof e) {
            var t = -1 === e.indexOf("?") ? "/?": "&";
            e = e + t + "pagecache=1",
            ajax(e,
            function() {},
            null, {
                isPage: !1
            })
        }
    }
    function addResourceToCache(e, t) {
        resourceCache[e] = {
            data: t,
            time: Date.now()
        }
    }
    function getCachedResource(e) {
        return resourceCache[e] ? resourceCache[e].data: void 0
    }
    function isCacheAvailable(e) {
        return !! resourceCache[e] && Date.now() - resourceCache[e].time <= cacheMaxTime
    }
    function onPageletArrived(e) {
        pagelets.push(e)
    }
    function onPagelets(e, t, n, r) {
        r = r || {},
        e.title && (document.title = e.title),
        container = document.getElementById(t),
        container.innerHTML = "",
        pagelets = e.pagelets,
        process(e.resource_map,
        function() {
            n && n(),
            render({
                trigger: !0
            })
        },
        r)
    }
    function onPageReady(e) {
        onReady = e,
        trigger("pageready", pagelets)
    }
    function onPageChange(e) {
        fetch(location.pathname + (location.search ? location.search + "&": "?") + "pagelets=" + e)
    }
    function trigger(e) {
        var t = events[e];
        if (t) for (var n = SLICE.call(arguments, 1), r = 0, a = t.length; a > r; r++) {
            var o = t[r];
            if (o.f.apply(o.o, n) === !1) break
        }
    }
    function on(e, t, n) {
        var r = events[e] || (events[e] = []);
        r.push({
            f: t,
            o: n
        })
    }
    var pagelets = [],
    loadedResource = {},
    container,
    containerId,
    pageUrl = location.pathname + (location.search ? "?" + location.search: ""),
    resource,
    resourceCache = {},
    onReady,
    _pageletUseCache = !1,
    initiatorType = {
        LANDING: 0,
        QUICKLING: 1,
        FROM_CACHE: 2
    },
    LOADED = 1,
    cacheMaxTime = 3e5,
    WEBSQL_DB_NAME = location.hostname,
    WEBSQL_TATBLE_NAME = "fis_bigpipe_cache",
    conn,
    SLICE = [].slice,
    events = {};
    return {
        asyncLoad: asyncLoad,
        register: register,
        refresh: refresh,
        onPageReady: onPageReady,
        onPageChange: onPageChange,
        onPageletArrived: onPageletArrived,
        onPagelets: onPagelets,
        pageletUseCache: _pageletUseCache,
        on: on,
        trigger: trigger
    }
} (); !
function(e) {
    function t(e) {
        n(e),
        I = C(),
        r(),
        a()
    }
    function n(e) {
        var t = {
            selector: "a,[data-href]",
            cacheMaxTime: 3e5,
            pushState: !0,
            layer: document.body,
            spa: !0
        };
        H = g(t, e),
        U = H.cacheMaxTime,
        N = H.pushState,
        M = o(H.layer),
        B = H.root || "/",
        !/\/$/.test(B) && (B += "/")
    }
    function r() {
        var e = "index/index/" + location.search;
        if (N) {
            var t = C();
            "/mobile/" === t && T(e, {
                replace: !0
            })
        }
    }
    function a() {
        var e = N ? "popstate": "hashchange";
        window.addEventListener(e, l, !1),
        M.addEventListener("click", v, !0),
        BigPipe.on("pagerendercomplete", p, this),
        BigPipe.on("pagearrived", f, this),
        BigPipe.on("onpageloaded", d, this)
    }
    function o(e) {
        return "string" == typeof e ? document.querySelector(e) : e && e.nodeType ? e: document.body
    }
    function i(e, t, n) {
        D.prevent = t === !0 ? !0 : !1,
        D.preventPageRefresh = n === !0 ? !0 : !1,
        "function" == typeof e && (D.callback = e);
        var r = window._APP_HASH;
        D.uri = r.module + r.action + r.page,
        D.registUrl = C()
    }
    function c(e) { (e === !0 || e === !1) && (D.prevent = e),
        D.preventPageRefresh = !1,
        D.callback = null,
        D.uri = "",
        D.registUrl = ""
    }
    function s(e) {
        D.prevent = e === !1 ? !1 : !0,
        c(),
        history.back()
    }
    function u() {
        var e = window._APP_HASH,
        t = e.module + e.action + e.page;
        return t === D.uri ? !0 : !1
    }
    function l() {
        var e = C();
        if (u()) {
            if (D.prevent) return void(D.registUrl === e ? "function" == typeof D.callback && D.callback() : history.go(1));
            if (D.preventPageRefresh === !0 && "function" == typeof D.callback) return void D.callback();
            "function" == typeof D.callback && (D.callback(), c())
        } else c(!1);
        I && e !== I && (A("historyback"), A("onpagerenderstart"), j(e))
    }
    function p(e) {
        q[e.url] = {
            resource: e.resource,
            time: Date.now()
        },
        A("onpagerendercomplete", {
            url: e.url
        })
    }
    function f(e) {
        A("onpagearrived", e)
    }
    function d() {
        A("onpageloaded")
    }
    function g(e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e
    }
    function h() {
        var e = window.localStorage.getItem("webapp-loc"),
        t = {},
        n = {};
        if (e) try {
            t = JSON.parse(e)
        } catch(r) {}
        return t.t && !isNaN(t.t) && +new Date - t.t < 3e5 && (n.c = t.addr.cityCode, t.isExactPoi && (n.addr = t.addr.city + t.addr.district + t.addr.street, n.x = t.point.x, n.y = t.point.y)),
        n
    }
    function v(e) {
        for (var t = e.target,
        n = t,
        r = H.selector; n !== document.body;) {
            if (y(n, r)) {
                if ("false" === n.getAttribute("data-redirect")) return;
                urlAttr = "a" === n.tagName.toLowerCase() ? "href": "data-href";
                var a = n.getAttribute(urlAttr),
                o = n.getAttribute("adt-parm"),
                i = {},
                c = {},
                s = h(),
                u = [];
                if (o) try {
                    i = JSON.parse(o)
                } catch(e) {}
                for (var l in i) switch (i[l]) {
                case "nb_x":
                    s.x && (c[l] = s.x);
                    break;
                case "nb_y":
                    s.y && (c[l] = s.y);
                    break;
                case "c":
                    s.c && (c[l] = s.c);
                    break;
                case "addr":
                    s.addr && (c[l] = s.addr)
                }
                for (var l in c) u.push(l + "=" + encodeURIComponent(c[l]));
                if (u = u.join("&"), u && (a += /\/$/.test(a) ? u: "&" + u), m(a)) {
                    e.stopPropagation(),
                    e.preventDefault();
                    var p = {
                        replace: n.getAttribute("data-replace") || !1,
                        containerId: n.getAttribute("data-area"),
                        pagelets: n.getAttribute("data-area"),
                        target: n,
                        refresh: "true" === n.getAttribute("refresh"),
                        cache: "false" === n.getAttribute("cache") ? !1 : !0
                    };
                    _(a, p)
                } else u && (e.stopPropagation(), e.preventDefault(), window.location.href = a);
                return
            }
            n = n.parentNode
        }
    }
    function y(e, t) {
        if (!e || 1 !== e.nodeType) return ! 1;
        var n, r, a = e.webkitMatchesSelector || e.matchesSelector;
        return a ? r = a.call(e, t) : (n = e.parentNode, r = !!n.querySelector(t)),
        r
    }
    function m(e) {
        var t = H.validate,
        n = Object.prototype.toString.call(t);
        return "[object RegExp]" === n ? t.test(e) : "[object Function]" === n ? t(e) : !0
    }
    function w(e) {
        var t = "";
        return X.test(e) ? (t = N || "" === RegExp.$9 ? RegExp.$5: RegExp.$9, b(t)) : ("console" in window && console.error("[url error]:", e), !1)
    }
    function b(e) {
        return e.replace(B, "")
    }
    function C() {
        return w(window.location.href)
    }
    function P() {
        var e = C();
        return B + e
    }
    function _(e, t) {
        if (t = t || {},
        t.refresh || H.spa === !1) return void x(e, t.replace);
        if (e = w(e), C() !== e) {
            var n = {
                trigger: !0,
                forword: !0,
                replace: !1
            },
            r = {
                url: e
            };
            if (t = g(n, t), r.target = t.target || null, t.trigger === !1) return void T(e, t);
            window.appPage && !window.appPage.switchedPage && (appPage.switchedPage = !0),
            A("onpagerenderstart", r),
            j(e, t,
            function() {
                t.forword && T(e, t)
            })
        }
    }
    function x(e, t) {
        var n = !!t;
        /^http/.test(e) || (e = "http://" + location.host + e),
        n === !0 ? location.replace(e) : location.href = e
    }
    function E(e, t, n, r) {
        var a = {},
        o = "object" == typeof n ? n: {},
        i = "function" == typeof n ? n: r;
        "function" != typeof i && (i = function() {}),
        "string" == typeof t && (a.param = t),
        a.url = "string" == typeof o.url ? o.url: B + C();
        var c = function() {
            A("asyncloaded", a),
            i()
        };
        o.removeStatCookie !== !1 && L(),
        A("beforeasyncload", a),
        BigPipe.asyncLoad(e, a, c)
    }
    function L() {
        if (/(?:^| )H_MAP_CLK=([^;]*)(?:;|$)/i.test(document.cookie)) {
            var e = new Date;
            e.setTime(e.getTime() - 1e4),
            document.cookie = 'H_MAP_CLK="";expires=' + e.toGMTString() + ";path=/;"
        }
    }
    function T(e, t) {
        t = t || {};
        var n = !!t.replace;
        N ? (e = B + e, k(e, n)) : R(e, n),
        I = e
    }
    function k(e, t) {
        var n = t ? "replaceState": "pushState";
        window.history[n]({},
        document.title, e)
    }
    function R(e, t) {
        var n = e.replace(/^\//, ""),
        r = location.href.replace(/(javascript:|#).*$/, "");
        t ? location.replace(r + "#" + n) : location.href = r + "#" + n
    }
    function j(e, t, n) {
        if (e) {
            var t = (Date.now(), t || {}),
            r = [],
            a = {},
            o = t.containerId ? t.containerId: H.containerId,
            i = t.pagelets ? t.pagelets: H.pagelets;
            if ("string" == typeof i && (i = [i]), I = e, i.length > 0) {
                for (var c = 0,
                s = i.length; s > c; c++) r.push("pagelets[]=" + i[c]);
                e = -1 === e.indexOf("?") ? e + "/?" + r.join("&") : e + "&" + r.join("&")
            }
            e = B + e,
            t.cache === !1 && (a.cache = !1),
            BigPipe.refresh(e, o, a,
            function() {
                n && n()
            })
        }
    }
    function A(e) {
        var t = $[e];
        if (t) for (var n = z.call(arguments, 1), r = 0, a = t.length; a > r; r++) {
            var o = t[r];
            if (o.f.apply(o.o, n) === !1) break
        }
    }
    function S(e, t, n) {
        var r = $[e] || ($[e] = []);
        r.push({
            f: t,
            o: n
        })
    }
    var I, N, M, O = e,
    q = {},
    U = 0,
    H = {},
    B = "",
    D = {
        prevent: !1,
        preventPageRefresh: !1,
        callback: null,
        uri: "",
        registUrl: ""
    },
    X = /^/g,// /^(([^:/ ? #] + ) : ) ? (\ / \ / ([ ^ /?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i,
    z = [].slice, 
    $ = {}; 
    O.appPage = {
        start: t,
        redirect: _,
        on: S,
        getFragment: P,
        asyncLoad: E,
        onpageunload: i,
        back: s
    },
    "define" in window && "undefined" != typeof module && (module.exports = O.appPage)
} (this), !
function() {
    var e = 50,
    t = 25,
    n = {},
    r = [].slice,
    a = {},
    o = function(e, t, r, o) {
        var i = a[e];
        i || (i = a[e] = {}),
        i[t] = i[t] || [],
        i[t].push({
            func: r,
            context: o || n
        })
    },
    i = function(e, t, r, a) {
        var i = function() {
            return n.off(e, t, i),
            r.apply(a || n, arguments)
        };
        o(e, t, i, a)
    },
    c = function(n, o) {
        if (a[n] && a[n][o] && a[n][o].length) {
            for (var i = a[n][o], c = [], s = i.length; s--;) c.push({
                handler: i[s],
                args: r.call(arguments, 1)
            }); !
            function() {
                var n = +new Date;
                do {
                    var r = c.shift(), a = r.handler;
                    try {
                        a.func.apply(a.context, r.args)
                    } catch(o) {}
                } while ( c . length && + new Date - n < e );
                c.length > 0 && setTimeout(arguments.callee, t)
            } ()
        }
    },
    s = function(e, t, r, o) {
        if (o = o || n, a[e] && a[e][t] && a[e][t].length) for (var i, c = a[e][t], s = c.length; s--;) i = c[s],
        i.func === r && i.context === o && c.splice(s, 1)
    };
    n.on = o,
    n.once = i,
    n.trigger = c,
    n.off = s,
    window.listener = window.listener || n
} (), window.EventRecorder = function(e, t) {
    "use strict";
    var n, r = {
        click: !0
    },
    a = {
        MouseEvent: "initMouseEvent",
        MouseEvents: "initMouseEvent"
    },
    o = {
        add: function(e, n) {
            var a;
            e = e || t;
            for (a in r) r[a] && e.addEventListener(a, n, !1)
        },
        remove: function(e, n) {
            var a;
            e = e || t;
            for (a in r) r[a] && e.removeEventListener(a, n, !1)
        },
        execute: function(e, t) {
            if (e) {
                var n = o.simulate(e.event);
                "function" == typeof r[n.type] && r[n.type](n),
                "function" == typeof t && t()
            }
        },
        simulate: function(e) {
            var t = this.create(e);
            return this.dispatch(e.target, t),
            t
        },
        create: function(n) {
            var r = n.constructor.name,
            o = t.createEvent(r);
            return a[r] ? (o[a[r]](n.type, n.bubbles, n.cancelable, e, n.detail, n.screenX, n.screenY, n.clientX, n.clientY, n.altKey, n.shiftKey, n.metaKey, n.button, n.relatedTarget), o) : void 0
        },
        dispatch: function(e, t) {
            e && e.dispatchEvent(t)
        },
        get: function(e) {
            return t.getElementById(e)
        }
    },
    i = 0,
    c = 1,
    s = 2;
    return n = function(e, n) {
        this.elem = e || t,
        this.lastEvent = null,
        this.status = s,
        this.captureListener = null,
        this.popup = n
    },
    n.prototype.record = function() {
        var e = this,
        t = function(t) {
            var n = {
                event: t || window.event,
                context: window,
                time: Date.now()
            },
            r = window.userClickTime || {};
            e.matchTarget(n) ? (("record" !== r.type || "number" != typeof r.time) && (window.userClickTime = {
                time: Date.now(),
                type: "record"
            }), e.popup && e.popup.show(), e.lastEvent = n) : "se-input-poi" === n.event.target.id && (window.currInputFocused = !0)
        },
        n = function(e) {
            switch (e.type) {
            case "click":
                t(e)
            }
        };
        this.status = i,
        o.add(this.elem, n),
        this.captureListener = n
    },
    n.prototype.play = function() {
        this.status = c,
        this.execute(this.lastEvent, c)
    },
    n.prototype.stop = function() {
        this.status = s,
        this.captureListener && (o.remove(this.elem, this.captureListener), this.captureListener = null),
        this.popup && this.popup.hide()
    },
    n.prototype.execute = function(e, t) {
        return e ? void(this.matchTarget(e) && t === this.status && o.execute(e,
        function() {})) : void this.stop()
    },
    n.prototype.matchTarget = function(e) {
        function n(e) {
            return "a" === e.tagName.toLowerCase() && e.attributes.href && -1 == e.attributes.href.value.indexOf("tel:") || "button" === e.tagName.toLowerCase() || "input" === e.tagName.toLowerCase() && ("button" == e.getAttribute("type") || "submit" == e.getAttribute("type")) || e.hasAttribute("jsaction") || e.hasAttribute("data-href") || "se-btn" === e.id && o.get("se-input-poi") && /[^\s]/.test(o.get("se-input-poi").value)
        }
        var r = e.event.target,
        a = t.body;
        do {
            if (n(r)) return ! 0;
            r = r.parentNode
        } while ( r && r !== a );
        return ! 1
    },
    n.prototype.setPopup = function(e) {
        this.popup = e
    },
    n
} (window, document), !
function() {
    "use strict";
    var e = window.spaConfig;
    window.appPage.start({
        selector: "a,[data-href]",
        validate: /^\/mobile\/webapp/i,
        pagelets: ["pager", "page_data"],
        containerId: "wrapper",
        pushState: window._isPushState,
        layer: "#wrapper",
        root: "/mobile/webapp",
        spa: !!e.spa
    }),
    window.EventRecorder && (window.eventRecorder = new window.EventRecorder(document.getElementById("wrapper")), window.eventRecorder.record())
} (), !
function(e, t) {
    "use strict";
    var n = {
        show: function() {
            var n = e.getElementById("loading_popup");
            if (n) return n.style.left = (t.innerWidth - 124) / 2 + "px",
            void(n.style.top = t.innerHeight / 2 - 42 + "px");
            var n = e.createElement("div");
            n.id = "loading_popup",
            n.className = "common-widget-popup",
            n.style.left = (t.innerWidth - 124) / 2 + "px",
            n.style.top = t.innerHeight / 2 - 42 + "px",
            n.style.visibility = "visibile",
            n.innerText = "正在加载中",
            e.body.appendChild(n)
        },
        hide: function() {
            var t = e.getElementById("loading_popup");
            t && e.body.removeChild(t)
        }
    };
    appPage.on("onpagerenderstart",
    function() {
        n.show()
    }),
    appPage.on("onpagerendercomplete",
    function() {
        n.hide()
    }),
    eventRecorder.setPopup(n)
} (document, window), LazyLoad = function(e) {
    "use strict";
    function t(t, n) {
        var r, a = e.createElement(t);
        for (r in n) n.hasOwnProperty(r) && a.setAttribute(r, n[r]);
        return a
    }
    function n(e) {
        var t, n, r = l[e];
        if (r && (t = r.callback, n = r.urls, n.shift(), p = 0, !n.length)) {
            try {
                t && t.call(r.context, r.obj)
            } catch(o) {
                window.console && console.error(o.stack)
            }
            u.hasUrlsNeedCache() && window.addEventListener("load",
            function() {
                setTimeout(function() {
                    u.hasUrlsNeedCache() && u.storeUrlsToCache()
                },
                500)
            }),
            l[e] = null,
            f[e].length && a(e)
        }
    }
    function r() {
        var t = navigator.userAgent;
        c = {
            async: e.createElement("script").async === !0
        },
        (c.webkit = /AppleWebKit\//.test(t)) || (c.ie = /MSIE|Trident/.test(t)) || (c.opera = /Opera/.test(t)) || (c.gecko = /Gecko\//.test(t)) || (c.unknown = !0)
    }
    function a(a, u, p, d, g) {
        var h, v, y, m, w, b, C = function() {
            n(a)
        },
        P = "css" === a,
        _ = [];
        if (c || r(), u) if (u = "string" == typeof u ? [u] : u.concat(), P || c.async || c.gecko || c.opera) f[a].push({
            urls: u,
            callback: p,
            obj: d,
            context: g
        });
        else for (h = 0, v = u.length; v > h; ++h) f[a].push({
            urls: [u[h]],
            callback: h === v - 1 ? p: null,
            obj: d,
            context: g
        });
        if (!l[a] && (m = l[a] = f[a].shift())) {
            for (s || (s = e.head || e.getElementsByTagName("head")[0]), w = m.urls, h = 0, v = w.length; v > h; ++h) {
                if (b = w[h], y = P ? c.gecko ? t("style") : t("link", {
                    href: b,
                    rel: "stylesheet"
                }) : t("script", {
                    src: b,
                    type: "text/javascript"
                }), y.className = "lazyload", y.setAttribute("charset", "utf-8"), navigator.userAgent.indexOf("AppleWebKit") && (c.webkit = !0), c.ie && !P && "onreadystatechange" in y && !("draggable" in y)) y.onreadystatechange = function() { / loaded | complete / .test(y.readyState) && (y.onreadystatechange = null, C())
                };
                else if (P && (c.gecko || c.webkit)) if (c.webkit) {
                    var x;
                    if (m.urls[h] = y.href, x = i()) {
                        h--,
                        v = w.length;
                        continue
                    }
                } else y.innerHTML = '@import "' + b + '";',
                o(y);
                else y.onload = y.onerror = C;
                _.push(y)
            }
            for (h = 0, v = _.length; v > h; ++h) s.appendChild(_[h])
        }
    }
    function o(e) {
        var t;
        try {
            t = !!e.sheet.cssRules
        } catch(r) {
            return p += 1,
            void(200 > p ? setTimeout(function() {
                o(e)
            },
            50) : t && n("css"))
        }
        n("css")
    }
    function i() {
        var e, t = l.css,
        r = !1;
        if (t) {
            for (e = d.length; --e >= 0;) if (d[e].href === t.urls[0]) {
                r = !0,
                n("css");
                break
            }
            p += 1,
            t && (200 > p ? setTimeout(i, 50) : n("css"))
        }
        return r
    }
    var c, s, u = function() {
        var e = {
            "common-sync-0-js": /\/static\/common\/pkg\/common_sync_js_0/,
            "mapapi-js": /\/static\/mapapi\/pkg\/api/,
            "core-js-js": /\/static\/core\/pkg\/core-js/
        },
        t = window.localcache,
        n = {},
        r = {};
        return {
            processUrls: function(e) {
                if (t) {
                    if (n = this.findCacheUrls(e), Object.keys(n).length > 0) for (var a in n) {
                        var o = n[a],
                        i = this.formatCacheUrl(o);
                        t.loadJS(a, i) && (r[a] = o, delete n[a], e.splice(e.indexOf(o), 1))
                    }
                    return e
                }
            },
            findCacheUrls: function(t) {
                for (var a in r) {
                    var o = t.indexOf(r[a]); - 1 !== o && t.splice(t.indexOf(r[a]), 1)
                }
                for (var a in e) for (var i = e[a], c = 0; c < t.length; c++) if (i.test(t[c])) {
                    n[a] = t[c];
                    break
                }
                return n
            },
            formatCacheUrl: function(e) {
                return e.replace("http://", "/")
            },
            hasUrlsNeedCache: function() {
                return t ? Object.keys(n).length > 0 : !1
            },
            storeUrlsToCache: function() {
                if (t) for (var e in n) {
                    var a = this.formatCacheUrl(n[e]);
                    this.storeUrlContent(e, a),
                    r[e] = n[e],
                    delete n[e]
                }
            },
            storeUrlContent: function(e, n) {
                var r = new XMLHttpRequest;
                r && (r.open("GET", n, !0), r.onreadystatechange = function() {
                    4 == r.readyState && t.store(e, n, r.responseText)
                },
                r.send(""))
            }
        }
    } (),
    l = {},
    p = 0,
    f = {
        css: [],
        js: []
    },
    d = e.styleSheets;
    return {
        css: function(e, t, n, r) {
            a("css", e, t, n, r)
        },
        js: function(e, t, n, r) {
            if ("localcache" in window) var e = u.processUrls(e);
            e.length > 0 ? a("js", e, t, n, r) : t && t()
        }
    }
} (this.document);
define("subway:static/js/base/coords.js",
function(t, o, i) {
    function n(t, o) {
        this.x = t,
        this.y = o
    }
    n.prototype.toString = function() {
        return [this.x, this.y].join(",")
    },
    n.prototype.floor = function() {
        return new n(this.x >> 0, this.y >> 0)
    },
    i.exports = n
});;
define("subway:static/js/base/line.js",
function(s, i, t) {
    function h(s, i, t, h, l, n, b, o, e, a) {
        this.lid = s,
        this.lb = i,
        this.slb = t,
        this.uid = h,
        this.n = l,
        this.loop = n,
        this.lbx = b,
        this.lby = o,
        this.lbr = e,
        this.lc = a,
        this.stations = []
    }
    t.exports = h
});;
define("subway:static/js/base/station.js",
function(s, t, i) {
    function h(s, t, i, h, n, o, r, x, c, y, d, e, u, a, b, l, f, p, j, _, w) {
        this.sid = s,
        this.lb = t,
        this.uid = i,
        this.px = h,
        this.py = n,
        this.x = o,
        this.y = r,
        this.rx = x,
        this.ry = c,
        this.st = y,
        this.ex = d,
        this.iu = e,
        this.rc = u,
        this.slb = a,
        this.ln = b,
        this.color = l,
        this.icon = f,
        this.dx = p,
        this.dy = j,
        this.trs_x = _,
        this.trs_y = w
    }
    i.exports = h
});;
define("subway:static/js/base/subway.js",
function(t, n, i) {
    function s(t, n, i) {
        this.fullName = n,
        this.shortName = t,
        this.lines_number = i,
        this.lines = [],
        this.width = null,
        this.height = null
    }
    var e = t("common:widget/util/map-util.js"),
    a = t("common:static/js/searchdata.js"),
    o = (t("subway:static/js/base/coords.js"), t("subway:static/js/base/station.js")),
    r = t("subway:static/js/base/line.js");
    s.prototype.findBy = function(t) {
        var n = [];
        if ("function" == typeof t) for (var i, s = this.lines.length - 1; s >= 0; s--) {
            i = this.lines[s],
            t.apply(i) && n.push(i);
            for (var e = i.stations.length - 1; e >= 0; e--) {
                var a = i.stations[e];
                t.apply(a) && n.push(a)
            }
        }
        return n
    },
    s.prototype.findNearestStation = function(t, n, i) {
        var s = Number.POSITIVE_INFINITY,
        e = 0,
        a = null,
        o = "point" === n ? "p": "";
        if (t && t.x && t.y) for (var r = this.lines,
        h = 0; h < r.length; h++) for (var l = r[h], f = 0; f < l.stations.length; f++) {
            var u = l.stations[f];
            u.slb && (e = Math.pow(u[o + "x"] - t.x, 2) + Math.pow(u[o + "y"] - t.y, 2), s > e && (s = e, a = u))
        }
        if (! (i > 0 && s > i * i)) return a
    },
    s.prototype.findLineOneWayDirection = function(t, n) {
        var i, s;
        if (n) {
            var e = this.findBy(function() {
                return this instanceof o && this.st && this.sid && this.lid == t.lid && this.sid == n
            });
            if (0 === e.length) i = t.stations[0],
            s = t.stations[t.stations.length - 1];
            else if (i = e[0], t.stations[0] == i) {
                for (var a = t.stations.length - 1; a > 0; a--) if (t.stations[a].st) {
                    s = t.stations[a];
                    break
                }
            } else for (var r = 0; r < t.stations.length; r++) if (t.stations[r].st) {
                s = t.stations[r];
                break
            }
        } else i = t.stations[0],
        s = t.stations[t.stations.length - 1];
        return {
            firstStation: i,
            lastStation: s
        }
    },
    s.prototype.parseStationExt = function(t) {
        var n = this;
        if (t && t.content && t.content.ext && t.content.ext.line_info) {
            var i = {},
            s = [];
            $.each(t.content.ext.line_info,
            function(t, e) {
                var a = e.line_name;
                if (void 0 === i[a]) {
                    var o = n.findBy(function() {
                        return this instanceof r && this.lid.indexOf(a) >= 0
                    });
                    0 === o.length ? s.push(e) : i[a] = {
                        line: o[0],
                        ext: [e]
                    }
                } else i[a].ext.push(e)
            }),
            $.each(s,
            function(t, s) {
                var e = s.line_name,
                a = s.terminals,
                o = n.findBy(function() {
                    return this instanceof r && 0 === this.lid.indexOf(e) && this.lid.indexOf(a) > 0
                });
                0 !== o.length && $.each(o,
                function(t, n) {
                    var e = n.lid;
                    if (void 0 === i[e]) i[e] = {
                        line: n,
                        ext: [s],
                        lost: !0
                    };
                    else {
                        var a = !1;
                        $.each(i[e].ext,
                        function(t, n) {
                            n.terminals == s.terminals && (a = !0)
                        }),
                        a || i[e].ext.push(s)
                    }
                })
            });
            var a = [];
            $.each(i,
            function(t, n) {
                n.lost && 1 == n.ext.length && a.push(t)
            }),
            $.each(a,
            function(t, n) {
                i[n] = null,
                delete i[n]
            });
            var h = [];
            $.each(i,
            function(t, n) {
                var i = n.line,
                s = n.ext,
                e = {};
                e.color = i.lc,
                e.name = i.lid,
                e.dirs = [],
                $.each(s,
                function(t, n) {
                    e.dirs.push({
                        name: n.terminals,
                        startTime: n.first_time,
                        endTime: n.last_time
                    })
                }),
                h.push(e)
            });
            var l = n.findBy(function() {
                return this instanceof o && this.st && this.uid === t.content.uid
            });
            if (0 === l.length && (l = this.findBy(function() {
                return this instanceof o && this.st && this.sid && 0 === t.content.name.indexOf(this.sid)
            }), 0 === l.length)) return;
            var f = l[0],
            u = e.parseGeo(t.content.geo).points;
            return {
                station: f,
                points: u,
                lines: h
            }
        }
    },
    s.prototype.getStationExt = function(t, n, i, s) {
        var e = this;
        e._currentQueryUID = n;
        var o = "qt=" + t + "&c=" + this.cityCode + "&uid=" + n;
        a.fetch(o,
        function(t) {
            n === e._currentQueryUID && (e._currentQueryUID = null, t = e.parseStationExt(t), i && i(t))
        },
        function(t) {
            s && s(t)
        })
    },
    i.exports = s
});;
define("subway:static/js/libs/hammer.js",
function(t, e, n) {
    "use strict";
    function r() {
        if (!i.READY) {
            i.event.determineEventTypes();
            for (var t in i.gestures) i.gestures.hasOwnProperty(t) && i.detection.register(i.gestures[t]);
            i.event.onTouch(i.DOCUMENT, i.EVENT_MOVE, i.detection.detect),
            i.event.onTouch(i.DOCUMENT, i.EVENT_END, i.detection.detect),
            i.READY = !0
        }
    }
    var i = function(t, e) {
        return new i.Instance(t, e || {})
    };
    i.defaults = {
        stop_browser_behavior: {
            userSelect: "none",
            touchAction: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    },
    i.HAS_POINTEREVENTS = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
    i.HAS_TOUCHEVENTS = "ontouchstart" in window,
    i.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i,
    i.NO_MOUSEEVENTS = i.HAS_TOUCHEVENTS && window.navigator.userAgent.match(i.MOBILE_REGEX),
    i.EVENT_TYPES = {},
    i.DIRECTION_DOWN = "down",
    i.DIRECTION_LEFT = "left",
    i.DIRECTION_UP = "up",
    i.DIRECTION_RIGHT = "right",
    i.POINTER_MOUSE = "mouse",
    i.POINTER_TOUCH = "touch",
    i.POINTER_PEN = "pen",
    i.EVENT_START = "start",
    i.EVENT_MOVE = "move",
    i.EVENT_END = "end",
    i.DOCUMENT = window.document,
    i.plugins = {},
    i.READY = !1,
    i.Instance = function(t, e) {
        var n = this;
        return r(),
        this.element = t,
        this.enabled = !0,
        this.options = i.utils.extend(i.utils.extend({},
        i.defaults), e || {}),
        this.options.stop_browser_behavior && i.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior),
        i.event.onTouch(t, i.EVENT_START,
        function(t) {
            n.enabled && i.detection.startDetect(n, t)
        }),
        this
    },
    i.Instance.prototype = {
        on: function(t, e) {
            for (var n = t.split(" "), r = 0; r < n.length; r++) this.element.addEventListener(n[r], e, !1);
            return this
        },
        off: function(t, e) {
            for (var n = t.split(" "), r = 0; r < n.length; r++) this.element.removeEventListener(n[r], e, !1);
            return this
        },
        trigger: function(t, e) {
            e || (e = {});
            var n = i.DOCUMENT.createEvent("Event");
            n.initEvent(t, !0, !0),
            n.gesture = e;
            var r = this.element;
            return i.utils.hasParent(e.target, r) && (r = e.target),
            r.dispatchEvent(n),
            this
        },
        enable: function(t) {
            return this.enabled = t,
            this
        }
    };
    var o = null,
    a = !1,
    s = !1;
    i.event = {
        bindDom: function(t, e, n) {
            for (var r = e.split(" "), i = 0; i < r.length; i++) t.addEventListener(r[i], n, !1)
        },
        onTouch: function(t, e, n) {
            var r = this;
            this.bindDom(t, i.EVENT_TYPES[e],
            function(c) {
                var u = c.type.toLowerCase();
                if (!u.match(/mouse/) || !s) {
                    u.match(/touch/) || u.match(/pointerdown/) || u.match(/mouse/) && 1 === c.which ? a = !0 : u.match(/mouse/) && 1 !== c.which && (a = !1),
                    u.match(/touch|pointer/) && (s = !0);
                    var h = 0;
                    a && (i.HAS_POINTEREVENTS && e != i.EVENT_END ? h = i.PointerEvent.updatePointer(e, c) : u.match(/touch/) ? h = c.touches.length: s || (h = u.match(/up/) ? 0 : 1), h > 0 && e == i.EVENT_END ? e = i.EVENT_MOVE: h || (e = i.EVENT_END), (h || null === o) && (o = c), n.call(i.detection, r.collectEventData(t, e, r.getTouchList(o, e), c)), i.HAS_POINTEREVENTS && e == i.EVENT_END && (h = i.PointerEvent.updatePointer(e, c))),
                    h || (o = null, a = !1, s = !1, i.PointerEvent.reset())
                }
            })
        },
        determineEventTypes: function() {
            var t;
            t = i.HAS_POINTEREVENTS ? i.PointerEvent.getEvents() : i.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"],
            i.EVENT_TYPES[i.EVENT_START] = t[0],
            i.EVENT_TYPES[i.EVENT_MOVE] = t[1],
            i.EVENT_TYPES[i.EVENT_END] = t[2]
        },
        getTouchList: function(t) {
            return i.HAS_POINTEREVENTS ? i.PointerEvent.getTouchList() : t.touches ? t.touches: (t.indentifier = 1, [t])
        },
        collectEventData: function(t, e, n, r) {
            var o = i.POINTER_TOUCH;
            return (r.type.match(/mouse/) || i.PointerEvent.matchType(i.POINTER_MOUSE, r)) && (o = i.POINTER_MOUSE),
            {
                center: i.utils.getCenter(n),
                timeStamp: (new Date).getTime(),
                target: r.target,
                touches: n,
                eventType: e,
                pointerType: o,
                srcEvent: r,
                preventDefault: function() {
                    this.srcEvent.preventManipulation && this.srcEvent.preventManipulation(),
                    this.srcEvent.preventDefault && this.srcEvent.preventDefault()
                },
                stopPropagation: function() {
                    this.srcEvent.stopPropagation()
                },
                stopDetect: function() {
                    return i.detection.stopDetect()
                }
            }
        }
    },
    i.PointerEvent = {
        pointers: {},
        getTouchList: function() {
            var t = this,
            e = [];
            return Object.keys(t.pointers).sort().forEach(function(n) {
                e.push(t.pointers[n])
            }),
            e
        },
        updatePointer: function(t, e) {
            return t == i.EVENT_END ? this.pointers = {}: (e.identifier = e.pointerId, this.pointers[e.pointerId] = e),
            Object.keys(this.pointers).length
        },
        matchType: function(t, e) {
            if (!e.pointerType) return ! 1;
            var n = {};
            return n[i.POINTER_MOUSE] = e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == i.POINTER_MOUSE,
            n[i.POINTER_TOUCH] = e.pointerType == e.MSPOINTER_TYPE_TOUCH || e.pointerType == i.POINTER_TOUCH,
            n[i.POINTER_PEN] = e.pointerType == e.MSPOINTER_TYPE_PEN || e.pointerType == i.POINTER_PEN,
            n[t]
        },
        getEvents: function() {
            return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
        },
        reset: function() {
            this.pointers = {}
        }
    },
    i.utils = {
        extend: function(t, e, n) {
            for (var r in e) void 0 !== t[r] && n || (t[r] = e[r]);
            return t
        },
        hasParent: function(t, e) {
            for (; t;) {
                if (t == e) return ! 0;
                t = t.parentNode
            }
            return ! 1
        },
        getCenter: function(t) {
            for (var e = [], n = [], r = 0, i = t.length; i > r; r++) e.push(t[r].pageX),
            n.push(t[r].pageY);
            return {
                pageX: (Math.min.apply(Math, e) + Math.max.apply(Math, e)) / 2,
                pageY: (Math.min.apply(Math, n) + Math.max.apply(Math, n)) / 2
            }
        },
        getVelocity: function(t, e, n) {
            return {
                x: Math.abs(e / t) || 0,
                y: Math.abs(n / t) || 0
            }
        },
        getAngle: function(t, e) {
            var n = e.pageY - t.pageY,
            r = e.pageX - t.pageX;
            return 180 * Math.atan2(n, r) / Math.PI
        },
        getDirection: function(t, e) {
            var n = Math.abs(t.pageX - e.pageX),
            r = Math.abs(t.pageY - e.pageY);
            return n >= r ? t.pageX - e.pageX > 0 ? i.DIRECTION_LEFT: i.DIRECTION_RIGHT: t.pageY - e.pageY > 0 ? i.DIRECTION_UP: i.DIRECTION_DOWN
        },
        getDistance: function(t, e) {
            var n = e.pageX - t.pageX,
            r = e.pageY - t.pageY;
            return Math.sqrt(n * n + r * r)
        },
        getScale: function(t, e) {
            return t.length >= 2 && e.length >= 2 ? this.getDistance(e[0], e[1]) / this.getDistance(t[0], t[1]) : 1
        },
        getRotation: function(t, e) {
            return t.length >= 2 && e.length >= 2 ? this.getAngle(e[1], e[0]) - this.getAngle(t[1], t[0]) : 0
        },
        isVertical: function(t) {
            return t == i.DIRECTION_UP || t == i.DIRECTION_DOWN
        },
        stopDefaultBrowserBehavior: function(t, e) {
            var n, r = ["webkit", "khtml", "moz", "Moz", "ms", "o", ""];
            if (e && t.style) {
                for (var i = 0; i < r.length; i++) for (var o in e) e.hasOwnProperty(o) && (n = o, r[i] && (n = r[i] + n.substring(0, 1).toUpperCase() + n.substring(1)), t.style[n] = e[o]);
                "none" == e.userSelect && (t.onselectstart = function() {
                    return ! 1
                }),
                "none" == e.userDrag && (t.ondragstart = function() {
                    return ! 1
                })
            }
        }
    },
    i.detection = {
        gestures: [],
        current: null,
        previous: null,
        stopped: !1,
        startDetect: function(t, e) {
            this.current || (this.stopped = !1, this.current = {
                inst: t,
                startEvent: i.utils.extend({},
                e),
                lastEvent: !1,
                name: ""
            },
            this.detect(e))
        },
        detect: function(t) {
            if (this.current && !this.stopped) {
                t = this.extendEventData(t);
                for (var e = this.current.inst.options,
                n = 0,
                r = this.gestures.length; r > n; n++) {
                    var o = this.gestures[n];
                    if (!this.stopped && e[o.name] !== !1 && o.handler.call(o, t, this.current.inst) === !1) {
                        this.stopDetect();
                        break
                    }
                }
                return this.current && (this.current.lastEvent = t),
                t.eventType == i.EVENT_END && !t.touches.length - 1 && this.stopDetect(),
                t
            }
        },
        stopDetect: function() {
            this.previous = i.utils.extend({},
            this.current),
            this.current = null,
            this.stopped = !0
        },
        extendEventData: function(t) {
            var e = this.current.startEvent;
            if (e && (t.touches.length != e.touches.length || t.touches === e.touches)) {
                e.touches = [];
                for (var n = 0,
                r = t.touches.length; r > n; n++) e.touches.push(i.utils.extend({},
                t.touches[n]))
            }
            var o = t.timeStamp - e.timeStamp,
            a = t.center.pageX - e.center.pageX,
            s = t.center.pageY - e.center.pageY,
            c = i.utils.getVelocity(o, a, s);
            return i.utils.extend(t, {
                deltaTime: o,
                deltaX: a,
                deltaY: s,
                velocityX: c.x,
                velocityY: c.y,
                distance: i.utils.getDistance(e.center, t.center),
                angle: i.utils.getAngle(e.center, t.center),
                interimAngle: this.current.lastEvent && i.utils.getAngle(this.current.lastEvent.center, t.center),
                direction: i.utils.getDirection(e.center, t.center),
                interimDirection: this.current.lastEvent && i.utils.getDirection(this.current.lastEvent.center, t.center),
                scale: i.utils.getScale(e.touches, t.touches),
                rotation: i.utils.getRotation(e.touches, t.touches),
                startEvent: e
            }),
            t
        },
        register: function(t) {
            var e = t.defaults || {};
            return void 0 === e[t.name] && (e[t.name] = !0),
            i.utils.extend(i.defaults, e, !0),
            t.index = t.index || 1e3,
            this.gestures.push(t),
            this.gestures.sort(function(t, e) {
                return t.index < e.index ? -1 : t.index > e.index ? 1 : 0
            }),
            this.gestures
        }
    },
    i.gestures = i.gestures || {},
    i.gestures.Tap = {
        name: "tap",
        index: 100,
        defaults: {
            tap_max_touchtime: 250,
            tap_max_distance: 10,
            tap_always: !0,
            doubletap_distance: 20,
            doubletap_interval: 300
        },
        handler: function(t, e) {
            if (t.eventType == i.EVENT_END && "touchcancel" != t.srcEvent.type) {
                var n = i.detection.previous,
                r = !1;
                if (t.deltaTime > e.options.tap_max_touchtime || t.distance > e.options.tap_max_distance) return;
                n && "tap" == n.name && t.timeStamp - n.lastEvent.timeStamp < e.options.doubletap_interval && t.distance < e.options.doubletap_distance && (e.trigger("doubletap", t), r = !0),
                (!r || e.options.tap_always) && (i.detection.current.name = "tap", e.trigger(i.detection.current.name, t))
            }
        }
    },
    i.gestures.Drag = {
        name: "drag",
        index: 50,
        defaults: {
            drag_min_distance: 10,
            correct_for_drag_min_distance: !0,
            drag_max_touches: 1,
            drag_block_horizontal: !1,
            drag_block_vertical: !1,
            drag_lock_to_axis: !1,
            drag_lock_min_distance: 25
        },
        triggered: !1,
        handler: function(t, e) {
            if (i.detection.current.name != this.name && this.triggered) return e.trigger(this.name + "end", t),
            void(this.triggered = !1);
            if (! (e.options.drag_max_touches > 0 && t.touches.length > e.options.drag_max_touches)) switch (t.eventType) {
            case i.EVENT_START:
                this.triggered = !1;
                break;
            case i.EVENT_MOVE:
                if (t.distance < e.options.drag_min_distance && i.detection.current.name != this.name) return;
                if (i.detection.current.name != this.name && (i.detection.current.name = this.name, e.options.correct_for_drag_min_distance)) {
                    var n = Math.abs(e.options.drag_min_distance / t.distance);
                    i.detection.current.startEvent.center.pageX += t.deltaX * n,
                    i.detection.current.startEvent.center.pageY += t.deltaY * n,
                    t = i.detection.extendEventData(t)
                } (i.detection.current.lastEvent.drag_locked_to_axis || e.options.drag_lock_to_axis && e.options.drag_lock_min_distance <= t.distance) && (t.drag_locked_to_axis = !0);
                var r = i.detection.current.lastEvent.direction;
                t.drag_locked_to_axis && r !== t.direction && (t.direction = i.utils.isVertical(r) ? t.deltaY < 0 ? i.DIRECTION_UP: i.DIRECTION_DOWN: t.deltaX < 0 ? i.DIRECTION_LEFT: i.DIRECTION_RIGHT),
                this.triggered || (e.trigger(this.name + "start", t), this.triggered = !0),
                e.trigger(this.name, t),
                e.trigger(this.name + t.direction, t),
                (e.options.drag_block_vertical && i.utils.isVertical(t.direction) || e.options.drag_block_horizontal && !i.utils.isVertical(t.direction)) && t.preventDefault();
                break;
            case i.EVENT_END:
                this.triggered && e.trigger(this.name + "end", t),
                this.triggered = !1
            }
        }
    },
    i.gestures.Transform = {
        name: "transform",
        index: 45,
        defaults: {
            transform_min_scale: .01,
            transform_min_rotation: 1,
            transform_always_block: !1
        },
        triggered: !1,
        handler: function(t, e) {
            if (i.detection.current.name != this.name && this.triggered) return e.trigger(this.name + "end", t),
            void(this.triggered = !1);
            if (! (t.touches.length < 2)) switch (e.options.transform_always_block && t.preventDefault(), t.eventType) {
            case i.EVENT_START:
                this.triggered = !1;
                break;
            case i.EVENT_MOVE:
                var n = Math.abs(1 - t.scale),
                r = Math.abs(t.rotation);
                if (n < e.options.transform_min_scale && r < e.options.transform_min_rotation) return;
                i.detection.current.name = this.name,
                this.triggered || (e.trigger(this.name + "start", t), this.triggered = !0),
                e.trigger(this.name, t),
                r > e.options.transform_min_rotation && e.trigger("rotate", t),
                n > e.options.transform_min_scale && (e.trigger("pinch", t), e.trigger("pinch" + (t.scale < 1 ? "in": "out"), t));
                break;
            case i.EVENT_END:
                this.triggered && e.trigger(this.name + "end", t),
                this.triggered = !1
            }
        }
    },
    n.exports = i
});;
define("subway:static/js/libs/svg.js",
function(t, e, n) {
    var i = this.SVG = function(t) {
        return i.supported ? new i.Doc(t) : void 0
    };
    if (i.ns = "http://www.w3.org/2000/svg", i.xlink = "http://www.w3.org/1999/xlink", i.did = 1e3, i.eid = function(t) {
        return "svgjs" + t.charAt(0).toUpperCase() + t.slice(1) + i.did++
    },
    i.create = function(t) {
        var e = document.createElementNS(this.ns, t);
        return e.setAttribute("id", this.eid(t)),
        e
    },
    i.extend = function() {
        var t, e, n, i;
        for (t = [].slice.call(arguments), e = t.pop(), i = t.length - 1; i >= 0; i--) if (t[i]) for (n in e) t[i].prototype[n] = e[n]
    },
    i.get = function(t) {
        var e = document.getElementById(t);
        return e ? e.instance: void 0
    },
    i.supported = function() {
        return !! document.createElementNS && !!document.createElementNS(i.ns, "svg").createSVGRect
    } (), !i.supported) return ! 1;
    i.regex = {
        test: function(t, e) {
            return this[e].test(t)
        },
        unit: /^(-?[\d\.]+)([a-z%]{0,2})$/,
        rgb: /rgb\((\d+),(\d+),(\d+)\)/,
        isRgb: /^rgb\(/,
        isCss: /[^:]+:[^;]+;?/,
        isStyle: /^font|text|leading|cursor/,
        isBlank: /^(\s+)?$/,
        isNumber: /^-?[\d\.]+$/
    },
    i.defaults = {
        matrix: "1,0,0,1,0,0",
        attrs: {
            "fill-opacity": 1,
            "stroke-opacity": 1,
            "stroke-width": 0,
            fill: "#000",
            stroke: "#000",
            opacity: 1,
            x: 0,
            y: 0,
            cx: 0,
            cy: 0,
            width: 0,
            height: 0,
            r: 0,
            rx: 0,
            ry: 0,
            offset: 0
        },
        trans: function() {
            return {
                x: 0,
                y: 0,
                scaleX: 1,
                scaleY: 1,
                matrix: this.matrix,
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                e: 0,
                f: 0
            }
        }
    },
    i.Color = function(t) {
        var e;
        this.r = 0,
        this.g = 0,
        this.b = 0,
        "string" == typeof t && i.regex.isRgb.test(t) && (e = i.regex.rgb.exec(t.replace(/\s/g, "")), this.r = parseInt(e[1]), this.g = parseInt(e[2]), this.b = parseInt(e[3]))
    },
    i.extend(i.Color, {
        toString: function() {
            return this.toHex()
        },
        toHex: function() {
            return "#" + this._compToHex(this.r) + this._compToHex(this.g) + this._compToHex(this.b)
        },
        _compToHex: function(t) {
            var e = t.toString(16);
            return 1 == e.length ? "0" + e: e
        }
    }),
    i.Color.test = function(t) {
        return t += "",
        i.regex.isRgb.test(t)
    },
    i.Color.isRgb = function(t) {
        return t && "number" == typeof t.r
    },
    i.ViewBox = function(t) {
        var e, n, i, s, r = t.bbox(),
        o = (t.attr("viewBox") || "").match(/-?[\d\.]+/g);
        this.x = r.x,
        this.y = r.y,
        this.width = t.node.clientWidth || t.node.getBoundingClientRect().width,
        this.height = t.node.clientHeight || t.node.getBoundingClientRect().height,
        o && (e = parseFloat(o[0]), n = parseFloat(o[1]), i = parseFloat(o[2]), s = parseFloat(o[3]), this.zoom = this.width / this.height > i / s ? this.height / s: this.width / i, this.x = e, this.y = n, this.width = i, this.height = s),
        this.zoom = this.zoom || 1
    },
    i.extend(i.ViewBox, {
        toString: function() {
            return this.x + " " + this.y + " " + this.width + " " + this.height
        }
    }),
    i.BBox = function(t) {
        var e;
        try {
            e = t.node.getBBox()
        } catch(n) {
            e = {
                x: t.node.clientLeft,
                y: t.node.clientTop,
                width: t.node.clientWidth,
                height: t.node.clientHeight
            }
        }
        this.x = e.x + t.trans.x,
        this.y = e.y + t.trans.y,
        this.width = e.width * t.trans.scaleX,
        this.height = e.height * t.trans.scaleY,
        this.cx = this.x + this.width / 2,
        this.cy = this.y + this.height / 2
    },
    i.Element = function(t) {
        this._stroke = i.defaults.attrs.stroke,
        this.styles = {},
        this.trans = i.defaults.trans(),
        (this.node = t) && (this.type = t.nodeName, this.node.instance = this)
    },
    i.extend(i.Element, {
        x: function(t) {
            return t && (t /= this.trans.scaleX),
            this.attr("x", t)
        },
        y: function(t) {
            return t && (t /= this.trans.scaleY),
            this.attr("y", t)
        },
        cx: function(t) {
            return null == t ? this.bbox().cx: this.x(t - this.bbox().width / 2)
        },
        cy: function(t) {
            return null == t ? this.bbox().cy: this.y(t - this.bbox().height / 2)
        },
        move: function(t, e) {
            return this.x(t).y(e)
        },
        center: function(t, e) {
            return this.cx(t).cy(e)
        },
        size: function(t, e) {
            return this.attr({
                width: t,
                height: e
            })
        },
        remove: function() {
            return this.parent && this.parent.removeElement(this),
            this
        },
        doc: function(t) {
            return this._parent(t || i.Doc)
        },
        attr: function(t, e, n) {
            if (null == t) {
                for (t = {},
                e = this.node.attributes, n = e.length - 1; n >= 0; n--) t[e[n].nodeName] = i.regex.test(e[n].nodeValue, "isNumber") ? parseFloat(e[n].nodeValue) : e[n].nodeValue;
                return t
            }
            if ("object" == typeof t) for (e in t) this.attr(e, t[e]);
            else if (null === e) this.node.removeAttribute(t);
            else {
                if (null == e) return this._isStyle(t) ? "text" == t ? this.content: "leading" == t && this.leading ? this.leading() : this.style(t) : (e = this.node.getAttribute(t), null == e ? i.defaults.attrs[t] : i.regex.test(e, "isNumber") ? parseFloat(e) : e);
                if ("style" == t) return this.style(e);
                if ("x" == t && Array.isArray(this.lines)) for (n = this.lines.length - 1; n >= 0; n--) this.lines[n].attr(t, e);
                "stroke-width" == t ? this.attr("stroke", parseFloat(e) > 0 ? this._stroke: null) : "stroke" == t && (this._stroke = e),
                (i.Color.test(e) || i.Color.isRgb(e)) && (e = new i.Color(e).toHex()),
                null != n ? this.node.setAttributeNS(n, t, e.toString()) : this.node.setAttribute(t, e.toString()),
                this._isStyle(t) && ("text" == t ? this.text(e) : "leading" == t && this.leading ? this.leading(e) : this.style(t, e), this.rebuild && this.rebuild(t, e))
            }
            return this
        },
        transform: function(t, e) {
            if (0 == arguments.length) return this.trans;
            if ("string" == typeof t) {
                if (arguments.length < 2) return this.trans[t];
                var n = {};
                return n[t] = e,
                this.transform(n)
            }
            var n = [];
            t = this._parseMatrix(t);
            for (e in t) null != t[e] && (this.trans[e] = t[e]);
            return this.trans.matrix = this.trans.a + "," + this.trans.b + "," + this.trans.c + "," + this.trans.d + "," + this.trans.e + "," + this.trans.f,
            t = this.trans,
            t.matrix != i.defaults.matrix && n.push("matrix(" + t.matrix + ")"),
            (1 != t.scaleX || 1 != t.scaleY) && n.push("scale(" + t.scaleX + "," + t.scaleY + ")"),
            (0 != t.x || 0 != t.y) && n.push("translate(" + t.x / t.scaleX + "," + t.y / t.scaleY + ")"),
            this._offset && 0 != this._offset.x && 0 != this._offset.y && n.push("translate(" + -this._offset.x + "," + -this._offset.y + ")"),
            0 == n.length ? this.node.removeAttribute("transform") : this.node.setAttribute("transform", n.join(" ")),
            this
        },
        style: function(t, e) {
            if (0 == arguments.length) return this.attr("style") || "";
            if (arguments.length < 2) if ("object" == typeof t) for (e in t) this.style(e, t[e]);
            else {
                if (!i.regex.isCss.test(t)) return this.styles[t];
                t = t.split(";");
                for (var n = 0; n < t.length; n++) e = t[n].split(":"),
                2 == e.length && this.style(e[0].replace(/\s+/g, ""), e[1].replace(/^\s+/, "").replace(/\s+$/, ""))
            } else null === e || i.regex.test(e, "isBlank") ? delete this.styles[t] : this.styles[t] = e;
            t = "";
            for (e in this.styles) t += e + ":" + this.styles[e] + ";";
            return "" == t ? this.node.removeAttribute("style") : this.node.setAttribute("style", t),
            this
        },
        data: function(t, e, n) {
            if (arguments.length < 2) try {
                return JSON.parse(this.attr("data-" + t))
            } catch(i) {
                return this.attr("data-" + t)
            } else this.attr("data-" + t, null === e ? null: n === !0 || "string" == typeof e || "number" == typeof e ? e: JSON.stringify(e));
            return this
        },
        bbox: function() {
            return new i.BBox(this)
        },
        show: function() {
            return this.style("display", "")
        },
        hide: function() {
            return this.style("display", "none")
        },
        visible: function() {
            return "none" != this.style("display")
        },
        toString: function() {
            return this.attr("id")
        },
        _parent: function(t) {
            for (var e = this; null != e && !(e instanceof t);) e = e.parent;
            return e
        },
        _isStyle: function(t) {
            return "string" == typeof t ? i.regex.test(t, "isStyle") : !1
        },
        _parseMatrix: function(t) {
            if (t.matrix) {
                var e = t.matrix.replace(/\s/g, "").split(",");
                6 == e.length && (t.a = parseFloat(e[0]), t.b = parseFloat(e[1]), t.c = parseFloat(e[2]), t.d = parseFloat(e[3]), t.e = parseFloat(e[4]), t.f = parseFloat(e[5]))
            }
            return t
        }
    }),
    i.Container = function(t) {
        this.constructor.call(this, t)
    },
    i.Container.prototype = new i.Element,
    i.extend(i.Container, {
        children: function() {
            return this._children || (this._children = [])
        },
        add: function(t, e) {
            if (!this.has(t)) {
                if (e = null == e ? this.children().length: e, t.parent) {
                    var n = t.parent.children().indexOf(t);
                    t.parent.children().splice(n, 1)
                }
                this.children().splice(e, 0, t),
                this.node.insertBefore(t.node, this.node.childNodes[e] || null),
                t.parent = this
            }
            return this
        },
        put: function(t, e) {
            return this.add(t, e),
            t
        },
        has: function(t) {
            return this.children().indexOf(t) >= 0
        },
        each: function(t) {
            var e, n = this.children();
            for (e = 0, length = n.length; length > e; e++) n[e] instanceof i.Shape && t.apply(n[e], [e, n]);
            return this
        },
        removeElement: function(t) {
            var e = this.children().indexOf(t);
            return this.children().splice(e, 1),
            this.node.removeChild(t.node),
            t.parent = null,
            this
        },
        group: function() {
            return this.put(new i.G)
        },
        rect: function(t, e) {
            return this.put((new i.Rect).size(t, e))
        },
        circle: function(t) {
            return this.ellipse(t, t)
        },
        ellipse: function(t, e) {
            return this.put((new i.Ellipse).size(t, e).move(0, 0))
        },
        line: function(t, e, n, s) {
            return this.put((new i.Line).plot(t, e, n, s))
        },
        polyline: function(t, e) {
            return this.put(new i.Polyline(e)).plot(t)
        },
        path: function(t, e) {
            return this.put(new i.Path(e)).plot(t)
        },
        image: function(t, e, n) {
            return e = null != e ? e: 100,
            this.put((new i.Image).load(t).size(e, null != n ? n: e))
        },
        text: function(t) {
            return this.put((new i.Text).text(t))
        },
        viewbox: function(t) {
            return 0 == arguments.length ? new i.ViewBox(this) : (t = 1 == arguments.length ? [t.x, t.y, t.width, t.height] : [].slice.call(arguments), this.attr("viewBox", t.join(" ")))
        },
        clear: function() {
            for (var t = this.children().length - 1; t >= 0; t--) this.removeElement(this.children()[t]);
            return this
        }
    }),
    ["click", "dblclick", "mousedown", "mouseup", "mouseover", "mouseout", "mousemove", "mouseenter", "mouseleave", "touchstart", "touchend", "touchmove", "touchcancel"].forEach(function(t) {
        i.Element.prototype[t] = function(e) {
            var n = this;
            return this.node["on" + t] = "function" == typeof e ?
            function() {
                return e.apply(n, arguments)
            }: null,
            this
        }
    }),
    i.on = function(t, e, n) {
        t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent("on" + e, n)
    },
    i.off = function(t, e, n) {
        t.removeEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent("on" + e, n)
    },
    i.extend(i.Element, {
        on: function(t, e) {
            return i.on(this.node, t, e),
            this
        },
        off: function(t, e) {
            return i.off(this.node, t, e),
            this
        }
    }),
    i.G = function() {
        this.constructor.call(this, i.create("g"))
    },
    i.G.prototype = new i.Container,
    i.extend(i.G, {
        x: function(t) {
            return null == t ? this.trans.x: this.transform("x", t)
        },
        y: function(t) {
            return null == t ? this.trans.y: this.transform("y", t)
        }
    }),
    i.Doc = function(t) {
        this.parent = "string" == typeof t ? document.getElementById(t) : t,
        this.constructor.call(this, "svg" == this.parent.nodeName ? this.parent: i.create("svg")),
        this.attr({
            xmlns: i.ns,
            version: "1.1",
            width: "100%",
            height: "100%"
        }).attr("xlink", i.xlink, i.ns),
        "svg" != this.parent.nodeName && this.stage()
    },
    i.Doc.prototype = new i.Container,
    i.extend(i.Doc, {
        stage: function() {
            var t, e = this,
            n = document.createElement("div");
            return n.style.cssText = "position:relative;height:100%;",
            e.parent.appendChild(n),
            n.appendChild(e.node),
            t = function() {
                "complete" === document.readyState ? (e.style("position:absolute;"), setTimeout(function() {
                    e.style("position:relative;"),
                    e.parent.removeChild(e.node.parentNode),
                    e.node.parentNode.removeChild(e.node),
                    e.parent.appendChild(e.node),
                    e.fixSubPixelOffset(),
                    i.on(window, "resize",
                    function() {
                        e.fixSubPixelOffset()
                    })
                },
                5)) : setTimeout(t, 10)
            },
            t(),
            this
        },
        fixSubPixelOffset: function() {
            var t = this.node.getScreenCTM();
            this.style("left", -t.e % 1 + "px").style("top", -t.f % 1 + "px")
        }
    }),
    i.Shape = function(t) {
        this.constructor.call(this, t)
    },
    i.Shape.prototype = new i.Element,
    i.Rect = function() {
        this.constructor.call(this, i.create("rect"))
    },
    i.Rect.prototype = new i.Shape,
    i.Ellipse = function() {
        this.constructor.call(this, i.create("ellipse"))
    },
    i.Ellipse.prototype = new i.Shape,
    i.extend(i.Ellipse, {
        x: function(t) {
            return null == t ? this.cx() - this.attr("rx") : this.cx(t + this.attr("rx"))
        },
        y: function(t) {
            return null == t ? this.cy() - this.attr("ry") : this.cy(t + this.attr("ry"))
        },
        cx: function(t) {
            return null == t ? this.attr("cx") : this.attr("cx", t / this.trans.scaleX)
        },
        cy: function(t) {
            return null == t ? this.attr("cy") : this.attr("cy", t / this.trans.scaleY)
        },
        size: function(t, e) {
            return this.attr({
                rx: t / 2,
                ry: e / 2
            })
        }
    }),
    i.Line = function() {
        this.constructor.call(this, i.create("line"))
    },
    i.Line.prototype = new i.Shape,
    i.extend(i.Line, {
        x: function(t) {
            var e = this.bbox();
            return null == t ? e.x: this.attr({
                x1: this.attr("x1") - e.x + t,
                x2: this.attr("x2") - e.x + t
            })
        },
        y: function(t) {
            var e = this.bbox();
            return null == t ? e.y: this.attr({
                y1: this.attr("y1") - e.y + t,
                y2: this.attr("y2") - e.y + t
            })
        },
        cx: function(t) {
            var e = this.bbox().width / 2;
            return null == t ? this.x() + e: this.x(t - e)
        },
        cy: function(t) {
            var e = this.bbox().height / 2;
            return null == t ? this.y() + e: this.y(t - e)
        },
        size: function(t, e) {
            var n = this.bbox();
            return this.attr(this.attr("x1") < this.attr("x2") ? "x2": "x1", n.x + t).attr(this.attr("y1") < this.attr("y2") ? "y2": "y1", n.y + e)
        },
        plot: function(t, e, n, i) {
            return this.attr({
                x1: t,
                y1: e,
                x2: n,
                y2: i
            })
        }
    }),
    i.Polyline = function() {
        this.constructor.call(this, i.create("polyline"))
    },
    i.Polyline.prototype = new i.Shape,
    i.Path = function(t) {
        this.constructor.call(this, i.create("path")),
        this.unbiased = !!t
    },
    i.Path.prototype = new i.Shape,
    i.extend(i.Path, {
        _plot: function(t) {
            return this.attr("d", t || "M0,0")
        }
    }),
    i.extend(i.Polyline, i.Path, {
        x: function(t) {
            return null == t ? this.bbox().x: this.transform("x", t)
        },
        y: function(t) {
            return null == t ? this.bbox().y: this.transform("y", t)
        },
        size: function(t, e) {
            var n = t / this._offset.width;
            return this.transform({
                scaleX: n,
                scaleY: null != e ? e / this._offset.height: n
            })
        },
        plot: function(t) {
            var e = this.trans.scaleX,
            n = this.trans.scaleY;
            return this._plot(t),
            this._offset = this.transform({
                scaleX: 1,
                scaleY: 1
            }).bbox(),
            this.unbiased ? this._offset.x = this._offset.y = 0 : (this._offset.x -= this.trans.x, this._offset.y -= this.trans.y),
            this.transform({
                scaleX: e,
                scaleY: n
            })
        }
    }),
    i.Image = function() {
        this.constructor.call(this, i.create("image"))
    },
    i.Image.prototype = new i.Shape,
    i.extend(i.Image, {
        load: function(t) {
            return t ? this.attr("href", this.src = t, i.xlink) : this
        }
    });
    var s = "size family weight stretch variant style".split(" ");
    i.Text = function() {
        this.constructor.call(this, i.create("text")),
        this.styles = {
            "font-size": 16,
            "font-family": "Helvetica, Arial, sans-serif",
            "text-anchor": "start"
        },
        this._leading = 1.2,
        this._base = .276666666
    },
    i.Text.prototype = new i.Shape,
    i.extend(i.Text, {
        x: function(t, e) {
            return null == t ? e ? this.attr("x") : this.bbox().x: (e || (e = this.style("text-anchor"), t = "start" == e ? t: "end" == e ? t + this.bbox().width: t + this.bbox().width / 2), this.attr("x", t))
        },
        cx: function(t) {
            return null == t ? this.bbox().cx: this.x(t - this.bbox().width / 2)
        },
        cy: function(t, e) {
            return null == t ? this.bbox().cy: this.y(e ? t: t - this.bbox().height / 2)
        },
        move: function(t, e, n) {
            return this.x(t, n).y(e)
        },
        center: function(t, e, n) {
            return this.cx(t, n).cy(e, n)
        },
        text: function(t) {
            if (null == t) return this.content;
            this.clear(),
            this.content = i.regex.isBlank.test(t) ? "text": t;
            var e, n, s = t.split("\n");
            for (e = 0, n = s.length; n > e; e++) this.tspan(s[e]);
            return this.attr("textLength", 1).attr("textLength", null)
        },
        tspan: function(t) {
            var e = (new i.TSpan).text(t);
            return this.node.appendChild(e.node),
            this.lines.push(e),
            e.attr("style", this.style())
        },
        size: function(t) {
            return this.attr("font-size", t)
        },
        leading: function(t) {
            return null == t ? this._leading: (this._leading = t, this.rebuild("leading", t))
        },
        rebuild: function() {
            var t, e, n = this.styles["font-size"];
            for (t = 0, e = this.lines.length; e > t; t++) this.lines[t].attr({
                dy: n * this._leading - (0 == t ? n * this._base: 0),
                x: this.attr("x") || 0,
                style: this.style()
            });
            return this
        },
        clear: function() {
            for (; this.node.hasChildNodes();) this.node.removeChild(this.node.lastChild);
            return this.lines = [],
            this
        }
    }),
    i.TSpan = function() {
        this.constructor.call(this, i.create("tspan"))
    },
    i.TSpan.prototype = new i.Shape,
    i.extend(i.TSpan, {
        text: function(t) {
            return this.node.appendChild(document.createTextNode(t)),
            this
        }
    }),
    i.Nested = function() {
        this.constructor.call(this, i.create("svg")),
        this.style("overflow", "visible")
    },
    i.Nested.prototype = new i.Container,
    i._stroke = ["color", "width", "opacity", "linecap", "linejoin", "miterlimit", "dasharray", "dashoffset"],
    i._fill = ["color", "opacity", "rule"];
    var r = function(t, e) {
        return "color" == e ? t: t + "-" + e
    }; ["fill", "stroke"].forEach(function(t) {
        var e = {};
        e[t] = function(e) {
            if ("string" == typeof e || i.Color.isRgb(e)) this.attr(t, e);
            else for (index = i["_" + t].length - 1; index >= 0; index--) null != e[i["_" + t][index]] && this.attr(r(t, i["_" + t][index]), e[i["_" + t][index]]);
            return this
        },
        i.extend(i.Shape, e)
    }),
    i.extend(i.Element, {
        scale: function(t, e) {
            return this.transform({
                scaleX: t,
                scaleY: null == e ? t: e
            })
        },
        matrix: function(t) {
            return this.transform({
                matrix: t
            })
        },
        opacity: function(t) {
            return this.attr("opacity", t)
        }
    }),
    i.Text && i.extend(i.Text, {
        font: function(t) {
            for (var e in t)"anchor" == e ? this.attr("text-anchor", t[e]) : s.indexOf(e) > -1 ? this.attr("font-" + e, t[e]) : this.attr(e, t[e]);
            return this
        }
    }),
    n.exports = i
});;
define("subway:static/js/parser/jsonparser.js",
function(s, a, t) {
    var e = s("subway:static/js/base/station.js"),
    r = s("subway:static/js/base/line.js"),
    n = s("subway:static/js/base/subway.js"),
    i = function(s) {
        this.data = s
    };
    i.prototype.parse = function() {
        if (!this.data) return null;
        var s = new n,
        a = this.data;
        for (var t in a) if ("lines" == t.toLowerCase()) for (var i = a[t], o = 0; o < i.length; o++) {
            var u = i[o],
            f = new r;
            for (var w in u) if ("stations" == w.toLowerCase()) for (var j = u[w], l = 0; l < j.length; l++) {
                var v = j[l],
                b = new e;
                for (var p in v) b[p] = v[p];
                f.stations.push(b)
            } else f[w] = u[w];
            s.lines.push(f)
        } else s[t] = a[t];
        return s
    },
    t.exports = i
});;
define("subway:static/js/model/subway.js",
function(a, t, e) {
    {
        var A = a("common:widget/util/map-util.js"),
        i = a("common:static/js/localstorage.js");
        a("subway:static/js/base/subway.js")
    }
    e.exports = {
        imageDataEncoded: {
        	uc:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMKSURBVHja7Jq/TxRBFMc/c2hiDGclVgo5twD1WqMokJyRqJHaw9iKjdyJHf4F2PkLG7xoh3CdicYYjBb+IMZQCQSL1SgdWIExNjgWM0QTbmb3dnb5EfZVlzdv377vzJv3a09IKdnKlGGLUwogBeBIO9ZwhLe5b7X0RepCKYAYSTglMuE1ABeAfqAdEGE9GZgEhoEq0l9ZfwDCOw3cA9ocN3EOKCH9l+sDQHi7gDvAlZi9YQS4hvR/JwdAeE3AM+BoQi79ETiP9BfjB6CMfwO0JnwvPwOdYUGEAyC83cAr4FiA5HfgsZadBRaBncB+oAUo6EufC9DzATiF9H/FBeABcDnA8EGgCgRFlNXIdRNotshVkH6fOwAVbSYsEk+BS8BSna6SBUaBHotMd1B0sgMQXgaYBg4ZJO4C14E/Don0FlC2hNi8LU8EZeKixfhxYMDBePSzA1pXLWrT7ha5lLhq4M8DfUjfvXJVOvr0PapF/dEACC8HnDCsDiL95RhL5GXghmG1HeEdjHICZw21zTfLkbvQuNa9ZiuBM1EAnDTwx1yKL8sprABjddpiBXDEwH+dYBY26T4cBcABA386QQAm3S1RAGQN/B8JAjDVP43bsqU0hcm9CdrTZOD/jAJg3sDPJwggbykW6wYwa+AXEgRg0j0TBcBbA79XN/Mxjxe8DNBrWH0XBcALPT2oFdKKCex+ryFcSm1LnQCk/wV4b1gdQniNMe5+IzBkWJ3UtkQKo/cN/GaggvBEDMYLoGLpzoZdyumqbipMvcJtx1yS0TqKloamGh2AKrBKFoky8ATYE8H4rH62bNUfUDgG757qSR9ZJHqAT8DFkKfRoGWnA/rhh0h/YiPGKqO6qpwBFjR/n65uC9pd1nmssokHW+EvoFLYBUwlaPwU0FXPaLG+CCL9BaATNYiNm0aADv2O8FHYYbzejRqvt8bgMqUwFzZeAArE6piwBBwn/AcOlWFVkhrfmA8c/0Cs/soB54AO1ECq+b/8sKQj1JwuEp8DX7Vbur0+/a9ECmCbA/g7AGfn9krdrbXBAAAAAElFTkSuQmCC",
        	up3g:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAKDSURBVHja7JmxbxMxFMZ/ziFSItKJMpVK7VJU2BloB1CqiP+A9C/qylhVMAfWDmww0CChdoQmTNUVNrYWISiij8EOnKLz3cVntxw9S0+Knp8/v+9y9/zZViJClVuDireawEW3K+Uh1PjHIvAIWAVuAwvArOk7Bo6AEbALvAQOdVfJb1BEShiRCBsivJ1y6JkZ09MY7jmUSX5dhFEp/tpGGuvcCDAjwpaHxCdtS4RrgQlwU4T9AMmPbV/PUXyAKr6QqTngDbAcuLB8BNZAvngso6oF7BRI/hDYBLrAPHDV2LzxbZpqlNWW9Vyq5bEK8TQnJP5bUSDHGiY2zsF85ukbYD0nZEeEdoHEJ23WjM3C7pQkQCTCMCPkiXmiOFrDYNjwh3nrRB6BXkZ3XxcB5+THpgyWbZ5eGQKDjHf+uokpaYLGsn4Tu44EWDJLflr3RiLOAwHBSBKb7Fiy5ZlVRrtJpZZoMdAPUP+fG+w0tdh1WQfuW/x9kDP/+cuvjAez6kLgjsX/OuAqbMNecSGwYPG/D0jAhn3LqhHsWkj9MDJgsjVBTlM2NK6vTnLOJvA9JegUpHnp9sRfLf65gPncsPhPXAjEFv/dgARs2J9cCBxY/A8CErBhf3AhMLD4H4OK/OeuIo09VS6VkRKLIcRc26OYa4tw5FnM/R9y+qI3NAc6ptyWslPhLeUfEtseN/VRwU39tsdzIdUCXgH3ChyrvDCqMgY+Az/N6r0CPAR6GUJx3N7pWPmWm9klOdgCA7gG7AVMfm+a5B2P14Me7s6c5/F6J6fEFrVhkWoTgIAkK8ogQ3bY5MHAxwVHykes/vF7V1H1LWVNIOw1q6j6H6gJ1ASq034PAPkAGERyRC/yAAAAAElFTkSuQmCC",
        	up3gex:"data:image/png;base64,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",
        	down3g:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDMTkwOTRBRTZGNDYxMUU2OTFBQkFDNkYxNjMwNTg1NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDMTkwOTRBRjZGNDYxMUU2OTFBQkFDNkYxNjMwNTg1NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkMxOTA5NEFDNkY0NjExRTY5MUFCQUM2RjE2MzA1ODU2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkMxOTA5NEFENkY0NjExRTY5MUFCQUM2RjE2MzA1ODU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+EXQBlgAAAppJREFUeNrsmjFPGzEUx+072gZEmRomKIKlVcveoaUSKAj4AoXkWzEiRMcW5g7d2qEQqUhsbUinKmGDDRBSkMLxd+y0Icnz+Xy2mpQ76XfDO/v5/RP73bN1PIoiNsxXwIb8ygRkAlJeI70mPuCrOuLZFMoE+BUg5pgprTVUAmXRMclEVn1K0keiMbs84U1sByuAY+vufzmWvuw62wSeA1sOAu9mS/r2KoDlwaGH4NscyjHMO3DzYo7ncfsGnnlel7/AAn7aM6OozATwMdy+gFcxDevgo2pbASKIB2AKzIBF8A7Mxvj5DpYg4io+HZhNne2YJjVQBKGcllpC1bYW43Pb0RpoZRtdk09gwiDwbh6rvjrfhZQCWAAqmiabqg2zJFA+dCk2TCOgqHm8K5OAdfBtuPJFjVNMI2CfeFSXUyBi6QVE7elErYkDSwFsFtwQj0sd7RwIaPkpEWOJGOaoOHXF3KrIn33sNbDnIf/vKd89ORys2FSjrwn7Ln63poeNSlP6ThSLVsBLwv7V41uY8v3CRsA0Yf/hUQDle8ailOAN3B72eZDD3924O0VTTZ3OMcV4jT6NrtHu0b3bUl4Q9ice48kT9ksbASeEfd6jgHlNlZtYQIWwL3oUQPn+aSNgn7BvYLGF7mPngfTd9zqw2A+I1/fglxK2xZwovMYdFnPjHoq5/6OcDmPOfgZ9Q/PPt5TLjs6F2HvDTX3gcFO/4/BcKNGxygdVVYrcfarsk6q6FXl+3eWxytAfbCUo5loO34Ijj8EfyTHMgrc8nWajQ3y4e0cIMgSrOgi8apJtPAiIOjNKWVN2UJRV+RCmiYGn/9Tgz45MZJY18AY8B0/BhHp2rjJUVRWJn8Hv3h2ZxejZtxKZgHsu4FaAAQBA/65Q3NCgOgAAAABJRU5ErkJggg==",
        	down3gex:"data:image/png;base64,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",
        	up4g:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBM0MyNEFDNDZGNDYxMUU2OTJDNTk4RDU3QjhERjAzOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBM0MyNEFDNTZGNDYxMUU2OTJDNTk4RDU3QjhERjAzOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEzQzI0QUMyNkY0NjExRTY5MkM1OThENTdCOERGMDM4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEzQzI0QUMzNkY0NjExRTY5MkM1OThENTdCOERGMDM4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+e+mj0AAAAkxJREFUeNrsWbtOAkEU3WU1PgJWQoOGYOXrD7QxQfkF4Q/4EmwtDdGa3srKBowxlj6oVLTUDltZz5i7Cdl4h915KKs7N6e5s3PmnDgOd2Zc3/edJLeMk/CWGkgNaLYpXQIXQa0MVIFtYA0oATnqGwB94B7oAGfAo+jwHc1NROxCqsDcHlADusDwS020GNIYMdbT06AuvgLcxxDNheCo/JgBTDYLHBkQHg7BOWvVACbIA1cWxAchuPNWDJD4nkXxQfTimIgqfh64jDB5HzgA9oAlYAbIAqtAlfoeIvCIueZNGmhFEF6jXckZg2Dn6o/hbBkxQLuNLE6BhQjCw8jRWFlUtAyAIAPcSSY4pG8cRWSIQ7bFejoGahLyNuBqiA/gEhcXNR0DHYb0WSwB+kYLxJGT/E90lQxgYFlSHtRHvtM2QDx1SdmxomKgwRA+ja5LgwY84v4uGpxOWTm9xeTbGPphuiwmznZMLVIDG0z+3GJ5z3GvqxhYZvI3Fg1w3CUVAzkm/2bRwCuTz/7LM/GAyS9a1JNn8u8qBl6Y/KZFAxz3s4qBOya/Y9EAx32rYqDD5Pddx/VMKwen0LLPdHdj30qIn+9ElxJjijlReGUNFnNZ48XcXymnvTF3P5N9oJmAI+WuqUP9ScRDfcbgof74t65VmnStUgSmCUXKNX/lWiXxF1sjJgrAtUXxgrtg+3J3LrGXuyEju4aWVC/KbmPcQOiB4yLmA4dPY+q6Dxxu+J0YRdVEPxxDtpu+UqYGbD6zhtdY+hdIDfxxA58CDAAqSleFTG/AkwAAAABJRU5ErkJggg==",
        	up4gex:"data:image/png;base64,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",
        	down4g:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NDVEQTMxMTZGNDYxMUU2OENBQUE4NkVCRTdDQjgyRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NDVEQTMxMjZGNDYxMUU2OENBQUE4NkVCRTdDQjgyRSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk0NURBMzBGNkY0NjExRTY4Q0FBQTg2RUJFN0NCODJFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk0NURBMzEwNkY0NjExRTY4Q0FBQTg2RUJFN0NCODJFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3FiXHAAAAlVJREFUeNrsWrtOwzAUjRsQD7WdKAsvwVQBfwALUgHxB23/gC+BlREhmLszMLJAhRAjlE48R5iAFcJxuZGqiOsmfoiGJldHqm7s43Mkx762KoIg8NL85LyUP5mBzIDhMxRNCE/09VcdeIHIplBmwKUBOcfigr6hOtDsdE0ylX/6yL5DCceMMGEn1gEkVIBb6dgwJEdFX0dy4aPAvgXh0ZCco04NYIAScOlAfBiSu+TEAIlvOxQfRjuJibjix4GLGIM/ArvABjANjAB5oAxs0ru7GDxyrHGbBg5iCK8Bfmd9UcOnto89OA+sGKDVRhXHQDGG8CgK1FcVFSMDIMgBLcUAe9TG00SOOFRLrG9ioKYgbwDCQHwIQVxc1EwMnDGkT3IKUBsjEEdB8U2caxlAx3ngiyGtd7UzNkA8dWYsqWFBx8A2Q/jQPS8tGvCJ+7fY5nSqqtEVJt9A108HBxXJ2UioRWlgicmfOqyOOe5FHQMzTP7aoQGOe07HQIHJvzo08MLk8wN5pHxn8hMO9ZSY/IeOgWcmv+zQAMf9pGOgxeTXHBrguG90DJwx+arwhG9bOTillirz+pzfQPideCHVpUSPYk4WXnmLxVzeejH3X8ppv8fdT38faPrgSLlu61B/FPNQn7N4qD/8q2uVHbpWmQKGCVOU2/mTa5XUX2x1mZgErhyKl9yTri93x1J7uRsxsm5pSrXjrDbWDXTtE3JFaSrKDi6aVD74JhqE6V8NUISFP+eBLWAVKAOzQJHevVFJ3KYi8QS4p8O82fjZfyUyAwNu4FuAAQDRwA7qK2Cl2wAAAABJRU5ErkJggg==",
        	down4gex:"data:image/png;base64,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",
            transfer: "data:image/png;base64,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",
            airport: "data:image/png;base64,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"
        },
        imageDataLoadedLength: 2,
        cityCode: "",
        cityName: "",
        fileName: "",
        fetch: function(a, t, e) {
            if (!a.cityNode || !a.cityNode[2] || a.version === !1) return void(e && e( - 2));
            var A = a.cityNode,
            s = this;
            this.imageData = [],
            this.imageDataLoaded = 0;
            for (var o in this.imageDataEncoded) this.imageData[o] || (this.imageData[o] = new Image, this.imageData[o].onload = function() {
                s.imageData[o] = this,
                s.imageDataLoaded++,
                s.imageDataLoaded === s.imageDataLoadedLength && (s.onresourceload = !0, listener.trigger("subway", "onresourceload"))
            },
            this.imageData[o].src = this.imageDataEncoded[o]);
            a.city || a.c || a.cc;
            if (!A) return void(e && e( - 1));
            this.fileName = A[0],
            this.cityName = A[1],
            this.cityCode = A[2];
            var o, r, n = this.fileName,
            c = "http://map.baidu.com/?qt=subways&c=" + this.cityCode + "&format=json";
            o = -1 === a.version ? this.findSubwayDataKey(this.fileName) : "sw_" + n + "_" + a.version,
            s._getJSONOffline(o,
            function(a) {
                r = s._parseJSON(a),
                r.cityName = s.fileName,
                r.cityCode = s.cityCode,
                r.imageData = s.imageData,
                r.imageDataEncoded = s.imageDataEncoded,
                s.subway = r,
                t && t(r)
            },
            function() {
                var a = s.findSubwayDataKey(s.fileName);
                i.deleteData(a),
                s._getJSONOnline(c,
                function(a) {
                    r = a,
                    i.addData(o, r),
                    r = s._parseJSON(a),
                    r.cityName = s.fileName,
                    r.cityCode = s.cityCode,
                    r.imageData = s.imageData,
                    r.imageDataEncoded = s.imageDataEncoded,
                    s.subway = r,
                    t && t(r)
                },
                function() {
                    e && e(A)
                })
            })
        },
        _parseJSON: function(t) {
            var e = a("subway:static/js/parser/jsonparser.js"),
            A = new e(t);
            return A.parse()
        },
        getCityNode: function(a) {
            return this._checkIfSupportSubway(a)
        },
        findSubwayDataKey: function(a) {
            var t = null,
            e = new RegExp("sw_" + a + ".*");
            try {
                for (var A = Object.keys(window.localStorage), i = A.length - 1; i >= 0; i--) if (e.test(A[i])) {
                    t = A[i];
                    break
                }
                return t
            } catch(s) {
                return null
            }
        },
        _checkIfSupportSubway: function(a) {
            var t = A.ifSupportSubway(a),
            e = this.isBrowserNotSupport = t === !1;
            return t && t.split(",")[0] ? t.split(",") : e ? -3 : -2
        },
        _getJSONOnline: function(a, t, e) {
            if (!a) return void(e && e());
            var A = this;
            $.ajax({
                type: "GET",
                url: a,
                dataType: "jsonp",
                jsonp: "callback",
                timeout: 5e3,
                success: function(a) {
                    a ? (a = A._translateJSON(a), t && t(a)) : e && e()
                },
                error: function() {
                    e && e()
                }
            })
        },
        _getJSONOffline: function(a, t, e) {
            return a ? void i.selectData(a, {
                success: function(a) {
                    a ? t && t(a) : e && e()
                },
                error: function() {
                    e && e()
                }
            }) : void(e && e())
        },
        _translateJSON: function(a) {
            var t = {
                left: Number.POSITIVE_INFINITY,
                right: Number.NEGATIVE_INFINITY,
                top: Number.POSITIVE_INFINITY,
                bottom: Number.NEGATIVE_INFINITY
            },
            e = {},
            A = a.subways.sw_xmlattr,
            i = a.subways.l,
            s = 1.1,
            o = 1.3,
            r = {};
            r.fullName = A.cid,
            r.shortName = A.c,
            r.lines_number = A.n,
            r.lines = [];
            for (var n = 0,
            c = i.length; c > n; n++) {
                var l = r.lines[n] = {};
                $.extend(l, i[n].l_xmlattr),
                l.stations = [],
                l.lbx = l.lbx * o,
                l.lby = l.lby * o + 15 * o,
                l.lc = "#" + l.lc.slice(2);
                for (var u = 0,
                g = i[n].p.length; g > u; u++) {
                    var d = l.stations[u] = {};
                    $.extend(d, i[n].p[u].p_xmlattr),
                    d.lid = i[n].l_xmlattr.lid,
                    d.x = d.x * o,
                    d.y = d.y * o,
                    d.rx = d.rx * o + 2 * o,
                    d.ry = d.ry * o + 12 * o,
                    d.dx = parseFloat(d.dx) * o,
                    d.dy = parseFloat(d.dy) * o,
                    d.trs_x = 0,
                    d.trs_y = 0;
                    try {
                        d.trs_x = parseFloat(d.trs_x) * o || 0,
                        d.trs_y = parseFloat(d.trs_y) * o || 0
                    } catch(N) {}
                    d.trs_x -= 8 * o,
                    d.trs_y -= 8 * o;
                    var x = d.sid,
                    p = d.slb;
                    d.x < t.left && (t.left = d.x),
                    d.x > t.right && (t.right = d.x),
                    d.y < t.top && (t.top = d.y),
                    d.y > t.bottom && (t.bottom = d.y),
                    p === !0 && (e[x] === !0 ? r.lines[n].stations[u].slb = !1 : e[x] = !0)
                }
            }
            for (var m = r.lines,
            h = t.left * s >> 0,
            f = t.top * s >> 0,
            y = 0,
            b = m.length; b > y; y++) {
                var w = m[y];
                for (w.lbx -= h, w.lby -= f, n = 0, c = w.stations.length; c > n; n++) {
                    var I = w.stations[n];
                    I.x -= h,
                    I.y -= f,
                    I.lc = w.lc
                }
            }
            return r.bounds = t,
            r.width = Math.abs(t.left - t.right) * s >> 0,
            r.height = Math.abs(t.bottom - t.top) * s >> 0,
            r
        }
    }
});;
define("subway:static/js/parser/xmldocumentparser.js",
function(t, e, r) {
    var a = t("subway:static/js/base/station.js"),
    s = t("subway:static/js/base/line.js"),
    i = t("subway:static/js/base/subway.js"),
    o = function(t, e) {
        this.xmlDoc = t,
        this.transformScale = e || 1.3,
        this.marginRatio = 1.1
    };
    o.prototype.parse = function() {
        if (!this.xmlDoc) return null;
        for (var t, e, r, a, s = this.xmlDoc.getElementsByTagName("sw")[0], i = this.parseSubway(s), o = {
            left: Number.POSITIVE_INFINITY,
            right: Number.NEGATIVE_INFINITY,
            top: Number.POSITIVE_INFINITY,
            bottom: Number.NEGATIVE_INFINITY
        },
        l = [], u = this.xmlDoc.getElementsByTagName("l"), n = 0; n < u.length; n++) {
            for (var b = this.parseLine(u[n]), g = [], h = u[n].getElementsByTagName("p"), p = 0; p < h.length; p++) {
                var c = this.parseStation(h[p]);
                c.lid = b.lid,
                c.x < o.left && (o.left = c.x, t = c.sid),
                c.x > o.right && (o.right = c.x, e = c.sid),
                c.y < o.top && (o.top = c.y, r = c.sid),
                c.y > o.bottom && (o.bottom = c.y, a = c.sid),
                g.push(c)
            }
            b.stations = g,
            l.push(b)
        }
        for (var m = o.left * this.marginRatio >> 0,
        A = o.top * this.marginRatio >> 0,
        f = 0; f < l.length; f++) {
            var y = l[f];
            y.lbx -= m,
            y.lby -= A;
            for (var S = 0; S < y.stations.length; S++) {
                var x = y.stations[S];
                x.x -= m,
                x.y -= A,
                x.lc = y.lc
            }
        }
        return i.bounds = o,
        i.lines = l,
        i.width = Math.abs(o.left - o.right) * this.marginRatio >> 0,
        i.height = Math.abs(o.bottom - o.top) * this.marginRatio >> 0,
        i
    },
    o.prototype.parseSubway = function(t) {
        var e = t.getAttribute("c"),
        r = t.getAttribute("cid"),
        a = t.getAttribute("n");
        return new i(e, r, a)
    },
    o.prototype.parseLine = function(t) {
        var e = t.getAttribute("lid"),
        r = t.getAttribute("lb"),
        a = t.getAttribute("slb"),
        i = t.getAttribute("uid"),
        o = parseInt(t.getAttribute("n"), 10),
        l = "true" == t.getAttribute("loop"),
        u = parseFloat(t.getAttribute("lbx")) * this.transformScale,
        n = parseFloat(t.getAttribute("lby")) * this.transformScale + 15 * this.transformScale,
        b = parseFloat(t.getAttribute("lbr")),
        g = "#" + t.getAttribute("lc").slice(2);
        return new s(e, r, a, i, o, l, u, n, b, g)
    },
    o.prototype.parseStation = function(t) {
        var e = t.getAttribute("sid"),
        r = t.getAttribute("lb"),
        s = t.getAttribute("uid"),
        i = parseFloat(t.getAttribute("px")),
        o = parseFloat(t.getAttribute("py")),
        l = parseFloat(t.getAttribute("x")) * this.transformScale,
        u = parseFloat(t.getAttribute("y")) * this.transformScale,
        n = parseFloat(t.getAttribute("rx")) * this.transformScale + 2 * this.transformScale,
        b = parseFloat(t.getAttribute("ry")) * this.transformScale + 12 * this.transformScale,
        g = "true" == t.getAttribute("st"),
        h = "true" == t.getAttribute("ex"),
        p = "true" == t.getAttribute("iu"),
        c = "true" == t.getAttribute("rc"),
        m = "true" == t.getAttribute("slb"),
        A = t.getAttribute("ln"),
        f = t.getAttribute("icon") || "",
        y = parseFloat(t.getAttribute("dx")) * this.transformScale,
        S = parseFloat(t.getAttribute("dy")) * this.transformScale,
        x = 0,
        I = 0;
        try {
            x = parseFloat(t.getAttribute("trs_x")) * this.transformScale || 0,
            I = parseFloat(t.getAttribute("trs_y")) * this.transformScale || 0
        } catch(d) {}
        x -= 8 * this.transformScale,
        I -= 8 * this.transformScale;
        var F;
        return new a(e, r, s, i, o, l, u, n, b, g, h, p, c, m, A, F, f, y, S, x, I)
    },
    r.exports = o
});;
define("subway:static/js/renderer/canvas.js",
function(t, i, e) {
    function s() {}
    var a = t("subway:static/js/base/coords.js");
    $.extend(s.prototype, {
        initialize: function(t, i) {
            this.$el = t,
            this.subway = i,
            this.container = null,
            this.canvas = null,
            this.devicePixelRatio = this.getDevicePixelRatio(),
            this.marginRatio = 0,
            this.deviceWidth = $("#subway-holder").offset().width,
            this.deviceHeight = $("#subway-holder").offset().height,
            this.canvasWidth = this.deviceWidth * this.devicePixelRatio * (1 + 2 * this.marginRatio),
            this.canvasHeight = this.deviceHeight * this.devicePixelRatio * (1 + 2 * this.marginRatio),
            this.mapWidth = i.width,
            this.mapHeight = i.height,
            this.scaleRatio = 1,
            this.maxScaleRatio = 2.4,
            this.minScaleRatio = .2 * this.devicePixelRatio,
            this.scaleRate = 1.25,
            this.zoomInRate = this.scaleRate,
            this.zoomOutRate = 1 / this.scaleRate,
            this.orig_x = null,
            this.orig_y = null,
            this.tolerance = 20,
            this._createElement()
        },
        _createElement: function() {
            this.$el.find("#sw_renderer").remove();
            var t = this.canvas = document.createElement("canvas");
            t.width = this.canvasWidth,
            t.height = this.canvasHeight,
            t.style.position = "absolute",
            t.style.left = this._toInt( - this.deviceWidth * this.marginRatio) + "px",
            t.style.top = this._toInt( - this.deviceHeight * this.marginRatio) + "px",
            t.style.width = this._toInt(this.deviceWidth * (1 + 2 * this.marginRatio)) + "px",
            t.style.height = this._toInt(this.deviceHeight * (1 + 2 * this.marginRatio)) + "px",
            this.container = $('<div id="sw_renderer" style="position: relative; width: 100%; height: 100%" />'),
            this.$el.append(this.container.append(t))
        },
        clear: function() {
            var t = this.canvas;
            if (t) {
                var i = t.getContext("2d");
                i.save(),
                i.fillStyle = "white",
                i.fillRect(0, 0, t.width, t.height),
                i.restore()
            }
        },
        plot: function() {
            this._fitCanvas(),
            this._plotCanvas()
        },
        _plotCanvas: function(t, i, e) {
            var s = this.canvas,
            a = s.getContext("2d"),
            h = this.subway;
            this.orig_x = void 0 == t ? -this.mapWidth / 2 : t,
            this.orig_y = void 0 == i ? -this.mapHeight / 2 : i,
            e = e || this.scaleRatio,
            this._plotMap(a, h)
        },
        _plotMap: function(t, i) {
            this.clear(),
            t.save(),
            t.translate(0, 0),
            t.scale(this.scaleRatio, this.scaleRatio),
            t.translate(this.orig_x + this._toUnit(this.canvasWidth / 2), this.orig_y + this._toUnit(this.canvasHeight / 2));
            for (var e = i.lines,
            s = 0; s < e.length; s++) this._plotLine(t, e[s]);
            for (var a = 0; a < e.length; a++) this._plotLineStations(t, e[a]);
            t.restore()
        },
        _plotLine: function(t, i) {
            t.beginPath(),
            t.fillStyle = i.lc,
            t.font = "bold 16px 微软雅黑",
            t.fillText(i.lb, i.lbx, i.lby);
            for (var e = 0; e < i.stations.length; e++) {
                var s = i.stations[e],
                a = s.x,
                h = s.y,
                o = s.rc;
                if (t.lineWidth = 8, t.strokeStyle = i.lc, o) {
                    var n = i.stations[e - 1],
                    r = i.stations[e + 1],
                    l = n.x,
                    c = r.x,
                    v = n.y,
                    d = r.y,
                    g = 2 * a - (l + c) / 2,
                    f = 2 * h - (v + d) / 2;
                    t.quadraticCurveTo(g, f, c, d)
                } else t.lineTo(a, h);
                if (i.loop && e == i.stations.length - 1) {
                    var m = i.stations[0].x,
                    u = i.stations[0].y;
                    t.lineTo(m, u)
                }
            }
            t.stroke()
        },
        _plotLineStations: function(t, i) {
            for (var e = 0; e < i.stations.length; e++) this._plotStation(t, i.stations[e])
        },
        _plotStation: function(t, i) {
            if (i.slb) {
                if (i.icon) {
                    var e = i.icon.split(",");
                    t.drawImage(this.subway.imageData.airport, i.x + this._toInt(e[1]), i.y + this._toInt(e[2]), 32, 32)
                }
                i.ex ? t.drawImage(this.subway.imageData.transfer, i.x + i.trs_x, i.y + i.trs_y, 20, 20) : (t.beginPath(), t.arc(i.x, i.y, 6.5, 0, 2 * Math.PI, !1), t.strokeStyle = i.lc, t.lineWidth = 2.5, t.fillStyle = "white", t.fill(), t.stroke()),
                t.fillStyle = "black",
                t.font = "normal 16px 微软雅黑",
                t.fillText(i.lb, i.x + i.rx, i.y + i.ry)
            }
        },
        zoomIn: function() {
            this.scaleRatio *= this.zoomInRate,
            this._plotCanvas(this.orig_x, this.orig_y)
        },
        zoomOut: function() {
            this.scaleRatio *= this.zoomOutRate,
            this._plotCanvas(this.orig_x, this.orig_y)
        },
        zoom: function(t, i, e) {
            e = Math.max(Math.min(e, this.maxScaleRatio), this.minScaleRatio),
            this.scaleRatio = e,
            this._plotCanvas(this.orig_x, this.orig_y)
        },
        getOriginPoint: function() {
            return new a(this.orig_x, this.orig_y)
        },
        getDevicePixelRatio: function() {
            return window.devicePixelRatio && window.devicePixelRatio > 1 ? 2 : 1
        },
        moveTo: function(t, i) {
            this._clearCSSTransform(),
            this._plotCanvas(t, i, this.scaleRatio)
        },
        move: function(t, i) {
            this._setCSSTransform(t, i)
        },
        _clearCSSTransform: function() {
            this._setCSSTransform(0, 0, 1)
        },
        _setCSSTransform: function(t, i, e) { (void 0 == t || void 0 == i) && (t = this.orig_x || 0, i = this.orig_y || 0),
            void 0 == e && (e = 1);
            var s = this._getTransformMatrix(t, i, e);
            this.container.css({
                transform: s,
                "-webkit-transform": s
            })
        },
        isOutOfBounds: function(t, i, e, s) {
            var a = t + this.getPointUnitFromPixelValue(e),
            h = i + this.getPointUnitFromPixelValue(s);
            return a > 0 || a < -this.mapWidth || h > 0 || h < -this.mapHeight ? {
                delta_x: this.getPixelValueFromPointUnit((a > 0 ? 0 : a < -this.mapWidth ? -this.mapWidth: a) - t),
                delta_y: this.getPixelValueFromPointUnit((h > 0 ? 0 : h < -this.mapHeight ? -this.mapHeight: h) - i)
            }: !1
        },
        resize: function(t, i) {
            if (i && i != this.deviceHeight) {
                var e = this.getPointFromPixel(new a(this.deviceWidth / 2, this.deviceHeight / 2)),
                s = this.scaleRatio;
                this.deviceWidth = $("#subway-holder").offset().width,
                this.deviceHeight = $("#subway-holder").offset().height,
                this.canvas.width = this.canvasWidth = this.deviceWidth * this.devicePixelRatio * (1 + 2 * this.marginRatio),
                this.canvas.height = this.canvasHeight = this.deviceHeight * this.devicePixelRatio * (1 + 2 * this.marginRatio),
                this.canvas.style.width = this._toInt(this.deviceWidth * (1 + 2 * this.marginRatio)) + "px",
                this.canvas.style.height = this._toInt(this.deviceHeight * (1 + 2 * this.marginRatio)) + "px",
                this.zoom(e.x, e.y, s)
            }
        },
        _fitCanvas: function() {
            var t, i, e = this.deviceWidth > this.deviceHeight;
            e ? (t = this.mapHeight, i = this.deviceHeight) : (t = this.mapWidth, i = this.deviceWidth);
            for (var s, a, h = this.scaleRatio; t > i && (s = h * this.zoomOutRate, a = t * this.zoomOutRate, !(s < this.minScaleRatio));) h = s,
            t = a;
            this.scaleRatio = h
        },
        _getTransformMatrix: function(t, i, e) {
            var s = [e, 0, 0, e, t, i];
            return "matrix(" + s.join(",") + ")"
        },
        getPointUnitFromPixelValue: function(t) {
            return this._toUnit(t * this.devicePixelRatio)
        },
        getPixelValueFromPointUnit: function(t) {
            return this._toPixel(t) / this.devicePixelRatio
        },
        getPointFromPixel: function(t) {
            var i = t.x * this.devicePixelRatio,
            e = t.y * this.devicePixelRatio;
            if (! (0 > i || 0 > e || i > this.mapWidth || e > this.mapHeight)) {
                var s = this._toInt(this._toUnit(i - this.canvasWidth / 2) - this.orig_x),
                h = this._toInt(this._toUnit(e - this.canvasHeight / 2) - this.orig_y);
                return new a(s, h)
            }
        },
        getPixelFromPoint: function(t) {
            var i = t.x + this.orig_x,
            e = t.y + this.orig_y,
            s = (this._toPixel(i) + this.canvasWidth / 2 / (1 + 2 * this.marginRatio)) / this.devicePixelRatio,
            h = (this._toPixel(e) + this.canvasHeight / 2 / (1 + 2 * this.marginRatio)) / this.devicePixelRatio;
            return new a(s, h)
        },
        isMaxScale: function() {
            return this.scaleRatio * this.zoomInRate > this.maxScaleRatio
        },
        isMinScale: function() {
            return this.scaleRatio * this.zoomOutRate < this.minScaleRatio
        },
        _toInt: function(t) {
            return t >> 0
        },
        _toUnit: function(t) {
            return t / this.scaleRatio
        },
        _toPixel: function(t) {
            return t * this.scaleRatio
        }
    }),
    e.exports = s
});;
define("subway:static/js/renderer/svg.js",
function(t, i, e) {
    function s() {}
    var o = t("subway:static/js/base/coords.js"),
    h = t("subway:static/js/libs/svg.js");
    s.supported = h.supported,
    $.extend(s.prototype, {
        initialize: function(t, i) {
            this.$el = t,
            this.subway = i,
            this.container = null,
            this.svg = null,
            this.deviceWidth = $("#subway-holder").offset().width,
            this.deviceHeight = $("#subway-holder").offset().height,
            this.mapWidth = i.width,
            this.mapHeight = i.height,
            this.rectWidth = Math.max(this.mapWidth, this.deviceWidth),
            this.rectHeight = Math.max(this.mapHeight, this.deviceHeight),
            this.scaleRatio = 3,
            this.maxScaleRatio = 2,
            this.minScaleRatio = .2,
            this.scaleRate = 1.25,
            this.zoomInRate = this.scaleRate,
            this.zoomOutRate = 1 / this.scaleRate,
            this.orig_x = null,
            this.orig_y = null,
            this.tolerance = 16,
            this._plotStations = $.proxy(this._plotStations, this),
            this._createElement();
        },
        _createElement: function() {
            this.$el.find("#sw_renderer").remove();
            var t = $('<svg id="sw_svg" stlye="position: absolute" />').get(0);
            this.container = $('<div id="sw_renderer" style="position: relative; width: 100%; height: 100%" />'),
            this.container.append(t),
            this.svg = h(t).size(this.rectWidth, this.rectHeight),
            this.context = this.svg.group(),
            window.svg2 = this,
            window.context = this.context
        },
        animation: function(t, i) {
            window.requestAnimationFrame ? window.requestAnimationFrame(t) : (i = i || 20, window.setTimeout(t, i))
        },
        clear: function() {
            var t = this.context;
            t.clear()
        },
        plot: function() {
            this.clear(),
            this._plotSVG(),
            this.$el.append(this.container),
            this._fitSVG()
        },
        _plotSVG: function(t, i, e) {
            var s = this.context,
            o = this.subway;
            this.orig_x = void 0 == t ? 0 : t,
            this.orig_y = void 0 == i ? 0 : i,
            e = e || this.scaleRatio,
            this._plotMap(s, o)
        },
        _plotMap: function(t, i) {
            var e = i.lines;
            t.rect(this.rectWidth, this.rectHeight).attr({
                fill: "none"
            });
            for (var s = 0; s < e.length; s++) {
                var o = e[s];
                this._plotLine(t, i, o)
            }
            this._plotStationsIndex = 0,
            this.animation(this._plotStations, 20)
        },
        _plotLine: function(t, i, e) {
            var text=t.text(e.lb).font({
                size: 16,
                weight: "bold"
            }).fill({
                color: e.lc
            }).move(e.lbx, e.lby - 16);
            for (var s = ["M"], o = 0; o < e.stations.length; o++) {
                var h = e.stations[o],
                n = h.x,
                a = h.y,
                r = h.rc;
                if (r) {
                    var c = e.stations[o - 1],
                    l = e.stations[o + 1],
                    d = c.x,
                    u = l.x,
                    m = c.y,
                    x = l.y,
                    g = 2 * n - (d + u) / 2,
                    v = 2 * a - (m + x) / 2;
                    o > 0 && s.push("Q"),
                    s.push([g, v, u, x].join(","))
                } else o > 0 && s.push("L"),
                s.push(n.toFixed(2) + "," + a.toFixed(2))
            }
            e.loop && s.push("Z");
            var line=t.path(s.join(""), !0).attr({
                fill: "none",
                stroke: e.lc,
                "stroke-width": 8
            });
            $(line.node).attr("lid",e.lid);
            $(line.node).attr("class","linePathSelector lineSelector");
            
            $(text.node).attr("lid",e.lid);
            $(text.node).attr("class","lineTextSelector lineSelector");
            
        },
        _plotStations: function() {
            var t = this.context,
            i = this.subway,
            e = this._plotStationsIndex==undefined?0:this._plotStationsIndex,
            s = i.lines;
            if (! (e >= s.length)) {
                for (var o = s[e], h = 0; h < o.stations.length; h++) {
                    var n = o.stations[h];
                    this._plotStation(t, i, n)
                }
                this._plotStationsIndex++,
                this.animation(this._plotStations, 20)
            }else{
            	subwayInited();
            }
        },
        _plotStation: function(t, i, e) {
            if (e.slb) {
                if (e.icon) {
                    var s = e.icon.split(",");
                    t.image(i.imageDataEncoded.airport, 32, 32).move(e.x + this._toInt(s[1]), e.y + this._toInt(s[2]))
                }
                var stationName=e.lb;
                var lineName=e.lid;
                var ln=e.ln;
                var reg = /\d+/g;
                var ms = lineName.match(reg);
                var lineIndex=lineName;
                if(ms!=null&&ms.length>0){
                	lineIndex=ms[0];
                }
                var stationType="";
                var ntType="3g";
                if(STATION_TYPE[lineIndex]!=null&&STATION_TYPE[lineIndex][stationName]!=null){
                	stationType=STATION_TYPE[lineIndex][stationName];
                }
                if(STATION_NT_TYPE[lineIndex]!=null&&STATION_NT_TYPE[lineIndex][stationName]!=null){
                	var nts=STATION_NT_TYPE[lineIndex][stationName];
                	if(nts["4G"]>0){
                		ntType="4g";
                	}
                }
                var imgDataKey="";
                if(stationType=="地面"||stationType=="高架"){
                	imgDataKey="up";
                }else{
                	imgDataKey="down";
                }
                imgDataKey+=ntType;
                if(e.ex){
                	imgDataKey+="ex";
                }
                if(UNCONTINUE_MAP[stationName]){
                	imgDataKey="uc";
                }
                var circle=t.circle(15).fill({
	                  color: "white"
	              }).stroke({
	                  color: e.lc,
	                  width: 2.5
	              }).move(e.x - 7.5, e.y - 7.5);
                var img=t.image(i.imageDataEncoded[imgDataKey], 20, 20).move(e.x + e.trs_x, e.y + e.trs_y)
                
//                e.ex ? t.image(i.imageDataEncoded.transfer, 20, 20).move(e.x + e.trs_x, e.y + e.trs_y) 
//                
//                : t.circle(13).fill({
//                    color: "white"
//                }).stroke({
//                    color: e.lc,
//                    width: 2.5
//                }).move(e.x - 6.5, e.y - 6.5),
                
                //站点文字
               var text=t.text(e.lb).font({
                    size: 16,
                    weight: "normal"
                }).fill({
                    color: "#000"
                }).move(e.x + e.rx, e.y + e.ry - 16);
                
                $(img.node).attr("uc",UNCONTINUE_MAP[stationName]);
                $(img.node).attr("ex",e.ex);
                $(img.node).attr("ntType",ntType);
                $(img.node).attr("stationType",stationType);
                $(img.node).attr("lineIndex",lineIndex);
                $(img.node).attr("ln",ln);
                $(img.node).attr("stationName",stationName);
                $(img.node).attr("class","stationNodeSelector stationSelector");
                
                $(circle.node).attr("uc",UNCONTINUE_MAP[stationName]);
                $(circle.node).attr("ex",e.ex);
                $(circle.node).attr("ntType",ntType);
                $(circle.node).attr("stationType",stationType);
                $(circle.node).attr("lineIndex",lineIndex);
                $(circle.node).attr("ln",ln);
                $(circle.node).attr("stationName",stationName);
                $(circle.node).attr("class","stationBgCircleSelector stationSelector");
                
                $(text.node).attr("uc",UNCONTINUE_MAP[stationName]);
                $(text.node).attr("ex",e.ex);
                $(text.node).attr("ntType",ntType);
                $(text.node).attr("stationType",stationType);
                $(text.node).attr("lineIndex",lineIndex);
                $(text.node).attr("ln",ln);
                $(text.node).attr("stationName",stationName);
                $(text.node).attr("class","stationTextSelector stationSelector");
            }
        },
        zoomIn: function(t, i) {
            t = t || this.deviceWidth / 2,
            i = i || this.deviceHeight / 2;
            var e = this.getPointFromPixel(new o(t, i));
            this.zoom(e.x, e.y, this.scaleRatio * this.zoomInRate)
        },
        zoomOut: function(t, i) {
            t = t || this.deviceWidth / 2,
            i = i || this.deviceHeight / 2;
            var e = this.getPointFromPixel(new o(t, i));
            this.zoom(e.x, e.y, this.scaleRatio * this.zoomOutRate)
        },
        zoom: function(t, i, e) {
            var s = this.context;
            e = Math.max(Math.min(e, this.maxScaleRatio), this.minScaleRatio),
            s.scale(e, e),
            this.scaleRatio = e,
            this.center(t, i)
        },
        center: function(t, i) {
            var e = this.context;
            e.move(this._toPixel( - t) + this.deviceWidth / 2, this._toPixel( - i) + this.deviceHeight / 2),
            this.orig_x = e.x(),
            this.orig_y = e.y()
        },
        getOriginPoint: function() {
            return new o(this._toUnit(this.orig_x - this.deviceWidth / 2), this._toUnit(this.orig_y - this.deviceHeight / 2))
        },
        move: function(t, i) {
            this.context,
            this.orig_x + t,
            this.orig_y + i;
            this._setCSSTransform(t, i, 1)
        },
        moveTo: function(t, i) {
            var e = this.context;
            t = this._toPixel(t) + this.deviceWidth / 2,
            i = this._toPixel(i) + this.deviceHeight / 2,
            e.move(t, i),
            this.orig_x = t,
            this.orig_y = i,
            this._clearCSSTransform()
        },
        isOutOfBounds: function(t, i, e, s) {
            var o = t + this.getPointUnitFromPixelValue(e),
            h = i + this.getPointUnitFromPixelValue(s);
            return o > 0 || o < -this.mapWidth || h > 0 || h < -this.mapHeight ? {
                delta_x: this.getPixelValueFromPointUnit((o > 0 ? 0 : o < -this.mapWidth ? -this.mapWidth: o) - t),
                delta_y: this.getPixelValueFromPointUnit((h > 0 ? 0 : h < -this.mapHeight ? -this.mapHeight: h) - i)
            }: !1
        },
        resize: function(t, i) {
            if (i && i != this.deviceHeight) {
                var e = this.getPointFromPixel(new o(this.deviceWidth / 2, this.deviceHeight / 2)),
                s = this.scaleRatio;
                this.deviceWidth = $("#subway-holder").offset().width,
                this.deviceHeight = $("#subway-holder").offset().height,
                this.clear(),
                this._plotSVG(),
                this.zoom(e.x, e.y, s)
            }
        },
        _fitSVG: function() {
            var t, i, e = this.deviceWidth > this.deviceHeight;
            e ? (t = this.mapHeight, i = this.deviceHeight) : (t = this.mapWidth, i = this.deviceWidth);
            for (var s, o, h = this.scaleRatio; t > i && (s = h * this.zoomOutRate, o = t * this.zoomOutRate, !(s < this.minScaleRatio));) h = s,
            t = o;
            this.context.scale(h, h).center(this.deviceWidth / 2, this.deviceHeight / 2),
            this.orig_x = this.context.x(),
            this.orig_y = this.context.y(),
            this.scaleRatio = h
        },
        _setCSSTransform: function(t, i, e) { (void 0 == t || void 0 == i) && (t = this.orig_x || 0, i = this.orig_y || 0),
            void 0 == e && (e = 1);
            var s = this._getTransformMatrix(t, i, e);
            this.container.css({
                transform: s,
                "-webkit-transform": s
            })
        },
        _clearCSSTransform: function() {
            this._setCSSTransform(0, 0, 1)
        },
        _getTransformMatrix: function(t, i, e) {
            var s = [e, 0, 0, e, t, i];
            return "matrix(" + s.join(",") + ")"
        },
        getPointUnitFromPixelValue: function(t) {
            return this._toUnit(t)
        },
        getPixelValueFromPointUnit: function(t) {
            return this._toPixel(t)
        },
        getPointFromPixel: function(t) {
            var i = this.context,
            e = t.x,
            s = t.y,
            h = this._toInt(this._toUnit(e - i.x())),
            n = this._toInt(this._toUnit(s - i.y()));
            return new o(h, n)
        },
        getPixelFromPoint: function(t) {
            var i = this.context,
            e = t.x,
            s = t.y,
            h = this._toPixel(e) + i.x(),
            n = this._toPixel(s) + i.y();
            return new o(h, n)
        },
        isMaxScale: function() {
            return this.scaleRatio * this.zoomInRate > this.maxScaleRatio
        },
        isMinScale: function() {
            return this.scaleRatio * this.zoomOutRate < this.minScaleRatio
        },
        _toInt: function(t) {
            return t >> 0
        },
        _toUnit: function(t) {
            return t / this.scaleRatio
        },
        _toPixel: function(t) {
            return t * this.scaleRatio
        }
    }),
    e.exports = s
});;
define("subway:widget/popupwindow/popupwindow.js",
function(require, exports, module) {
    var url = require("core:widget/url/url.js"),
    util = require("core:widget/util/url-util.js"),
    Coords = require("subway:static/js/base/coords.js"),
    stat = require("core:widget/stat/stat.js");
    module.exports = $.extend({},
    {
        offset: {
            left: 1,
            top: -5
        },
        init: function(data) {
            this.data = data;
            var tpl = this.tpl = [function(_template_object) {
                var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    if (eval(_template_varName), _template_fun_array.push('<div id="sw_pw">    '), data.notification) _template_fun_array.push('        <div class="sw-pw-notification">这是离您最近的地铁站</div>    ');
                    else {
                        _template_fun_array.push('        <ul class="sw-pw-title">            <li class="sw-pw-tl"></li>            <li class="sw-pw-tc">', "undefined" == typeof data.station.lb ? "": data.station.lb, '</li>            <li class="sw-pw-tr"></li></ul>        <div class="sw-pw-content">            ');
                        for (var i = 0; i < data.lines.length; i++) {
                            _template_fun_array.push('                <div class="sw-pw-line">                    <div class="sw-pw-line-title" style="border-color:', "undefined" == typeof data.lines[i].color ? "": data.lines[i].color, '">                        <span class="line_title_content" style="background-color:', "undefined" == typeof data.lines[i].color ? "": data.lines[i].color, '">', "undefined" == typeof data.lines[i].name ? "": data.lines[i].name, "</span></div>                    ");
                            for (var j = 0; j < data.lines[i].dirs.length; j++) _template_fun_array.push("                        "),
                            data.lines[i].dirs[j].startTime && data.lines[i].dirs[j].endTime && _template_fun_array.push('                        <ul class="sw-pw-line-list">                            <li class="sw-pw-line-dir">                                <span class="sw-pw-line-dir-name">', "undefined" == typeof data.lines[i].dirs[j].name ? "": data.lines[i].dirs[j].name, '</span><span class="sw-pw-text-gray">方向</span>                            </li>                            <li class="sw-pw-line-time">                                <span class="sw-pw-text-gray-bkg">始</span><span class="sw-pw-text-inline-block">', "undefined" == typeof(data.lines[i].dirs[j].startTime || "00:00") ? "": data.lines[i].dirs[j].startTime || "00:00", '</span><span class="sw-pw-text-gray-bkg">末</span><span class="sw-pw-text-inline-block">', "undefined" == typeof(data.lines[i].dirs[j].endTime || "00:00") ? "": data.lines[i].dirs[j].endTime || "00:00", "</span>                            </li></ul>                        "),
                            _template_fun_array.push("                    ");
                            _template_fun_array.push("                </div>            ")
                        }
                        _template_fun_array.push("        </div>    ")
                    }
                    _template_fun_array.push("</div>"),
                    _template_varName = null
                } (_template_object);
                return fn = null,
                _template_fun_array.join("")
            }][0],
            $el = this.$el = $(tpl({
                data: data
            }));
            $("#sw_renderer").append($el),
            this.bind()
        },
        bind: function() {
            var t = this,
            a = $(".sw-pw-tl");
            a.on("touchstart",
            function(t) {
                a.start = {
                    x: t.touches[0].pageX,
                    y: t.touches[0].pageY
                },
                t.target.handled = !0
            }),
            a.on("click",
            function(e) {
                if (a.start) {
                    var s = e.pageX - a.start.x,
                    i = e.pageY - a.start.y,
                    n = s * s + i * i;
                    if (n > 100) return void(a.start = null)
                }
                a.start = null,
                t.nbSearch()
            });
            var e = $(".sw-pw-tr");
            e.on("touchstart",
            function(t) {
                e.start = {
                    x: t.touches[0].pageX,
                    y: t.touches[0].pageY
                },
                t.target.handled = !0
            }),
            e.on("click",
            function(a) {
                if (e.start) {
                    var s = a.pageX - e.start.x,
                    i = a.pageY - e.start.y,
                    n = s * s + i * i;
                    if (n > 100) return void(e.start = null)
                }
                e.start = null,
                t.lineSearch()
            });
            var s = $(".sw-pw-tc, .sw-pw-content");
            s.on("touchstart",
            function(t) {
                s.start = {
                    x: t.touches[0].pageX,
                    y: t.touches[0].pageY
                },
                t.target.handled = !0
            }),
            s.on("click",
            function(a) {
                if (s.start) {
                    var e = a.pageX - s.start.x,
                    i = a.pageY - s.start.y,
                    n = e * e + i * i;
                    if (n > 100) return void(s.start = null)
                }
                s.start = null,
                t.poiSearch()
            })
        },
        destroy: function() {
            $(".sw-pw-tl, .sw-pw-tr, .sw-pw-tc, .sw-pw-content").off(),
            this.$el.remove()
        },
        show: function(t, a) {
            var e = this.$el;
            e.css({
                visibility: "hidden"
            }).show();
            var s = this.width = parseFloat(e.width()),
            i = this.height = parseFloat(e.height());
            e.css({
                left: t.x - s / 2 + this.offset.left,
                top: t.y - i / 2 + this.offset.top,
                visibility: ""
            }),
            a && a(s / 2, i / 2)
        },
        hide: function() {
            this.$el.hide()
        },
        move: function(t, a) {
            var e = this.$el,
            s = parseFloat(e.css("left")),
            i = parseFloat(e.css("top"));
            e.css({
                left: s + t,
                top: i + a
            })
        },
        setPosition: function(t, a) {
            var e = this.$el;
            e.css({
                left: t - this.width / 2 + this.offset.left,
                top: a - this.height + this.offset.top
            })
        },
        getPosition: function() {
            var t = this.$el;
            return {
                left: parseFloat(t.css("left")),
                top: parseFloat(t.css("top"))
            }
        },
        getPoint: function() {
            return new Coords(this.data.x, this.data.y)
        },
        nbSearch: function() {
            stat.addCookieStat(STAT_CODE.SUBWAY_IW_NB_SEARCH);
            var t = this.data,
            a = {
                nb_x: t.lng,
                nb_y: t.lat,
                center_name: t.station.lb || "",
                from: "searchnearby"
            };
            url.update({
                module: "index",
                action: "searchnearby",
                query: {
                    foo: "bar"
                },
                pageState: a
            },
            {
                trigger: !0,
                queryReplace: !0,
                pageStateReplace: !0
            })
        },
        lineSearch: function() {
            stat.addCookieStat(STAT_CODE.SUBWAY_IW_LINE_SEARCH);
            var t = this.data,
            a = {
                word: t.station.lb || "",
                point: t.lng + "," + t.lat
            },
            e = {};
            e.end = util.jsonToQuery(a),
            url.update({
                module: "place",
                action: "linesearch",
                query: {
                    foo: "bar"
                },
                pageState: e
            },
            {
                trigger: !0,
                pageStateReplace: !0,
                queryReplace: !0
            })
        },
        poiSearch: function() {
            this.data.uid && (stat.addCookieStat(STAT_CODE.SUBWAY_IW_DETAIL_SEARCH), url.update({
                module: "place",
                action: "detail",
                query: {
                    qt: "inf",
                    uid: this.data.uid
                }
            },
            {
                trigger: !0,
                pageStateReplace: !0,
                queryReplace: !0
            }))
        }
    })
});;
define("subway:widget/subway/subway.js",
function(e, t, i) {
    var n = e("core:widget/url/url.js"),
    r = e("common:widget/appresize/appresize.js"),
    o = e("subway:static/js/libs/hammer.js"),
    s = e("subway:static/js/model/subway.js"),
    a = e("core:widget/stat/stat.js"),
    u = e("subway:static/js/base/coords.js");
    i.exports = $.extend({},
    {
        subway: null,
        renderer: null,
        rendererKind: null,
        init: function(e) {
            r.update();
            var t = this.$parent = $("#main"),
            i = t.height();
            t.children().each(function() {
                i -= $(this).height()
            }),
            this.$el = $("#subway-holder"),
            this.$el.css({
                height: i,
                visibility: "hidden"
            }).show(),
            this.params = n.get(),
            this.initHammer(),
            this.render(e),
            this.bind(),
            this.initCenterLocation()
        },
        render: function(e) {
            this.subway = e;
            var t = this.renderer = this._getRenderer();
            t.initialize(this.$el, e);
            s.onresourceload ? t.plot() : listener.once("subway", "onresourceload",
            function() {
                t.plot()
            })
        },
        _getRenderer: function() {
            var t, i = this.params;
            return i && i.pageState && "canvas" === i.pageState.force ? (t = e("subway:static/js/renderer/canvas.js"), this.rendererKind = "canvas", new t) : (this._isSupportSVG() ? (this.rendererKind = "svg", t = e("subway:static/js/renderer/svg.js")) : (this.rendererKind = "canvas", t = e("subway:static/js/renderer/canvas.js")), new t)
        },
        _isSupportSVG: function() {
            return !! document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
        },
        initHammer: function() {
            var e = this,
            t = this.$el.get(0);
            this.hammer && (this.hammer.off("transformstart transform transformend dragstart drag dragend tap"), this.renderer.locked = !1);
            var i, r = this.hammer = new o(t, {
                prevent_default: !0,
                drag: !0,
                drag_block_vertical: !0,
                drag_block_horizontal: !0,
                drag_min_distance: 10,
                transform: !0,
                transform_always_block: !0,
                tap: !0
            });
            r.on("transformstart",
            function() {
                var t = (e.subway, e.renderer);
                t.locked = !0
            }),
            r.on("transform",
            function(t) {
                var n = (e.subway, e.renderer);
                t.gesture && t.gesture.preventDefault(),
                i = n.scaleRatio * t.gesture.scale,
                n._setCSSTransform(0, 0, t.gesture.scale)
            }),
            r.on("transformend",
            function(t) {
                var n = (e.subway, e.renderer);
                n.locked = !1,
                t.gesture && t.gesture.preventDefault(),
                t.gesture.stopDetect(),
                n._clearCSSTransform();
                var r = n.getPointFromPixel(new u(n.deviceWidth / 2, n.deviceHeight / 2));
                if (n.zoom(r.x, r.y, i), e.popupWindow) {
                    var o = n.getPixelFromPoint(e.popupWindow.getPoint());
                    e.popupWindow.setPosition(o.x, o.y)
                }
            });
            var s, d;
            r.on("dragstart",
            function(t) {
                var i = (e.subway, e.renderer);
                i.locked || (t.gesture && t.gesture.preventDefault(), origin = i.getOriginPoint(), s = origin.x, d = origin.y)
            }),
            r.on("drag",
            function(t) {
                var i = (e.subway, e.renderer);
                i.locked || (t.gesture && t.gesture.preventDefault(), i.move(t.gesture.deltaX, t.gesture.deltaY))
            }),
            r.on("dragend",
            function(t) {
                var i = (e.subway, e.renderer);
                if (!i.locked) {
                    if (t.gesture && t.gesture.preventDefault(), null == s || null == d) return void i._clearCSSTransform();
                    var n = i.isOutOfBounds(s, d, t.gesture.deltaX, t.gesture.deltaY);
                    n && (t.gesture.deltaX = n.delta_x, t.gesture.deltaY = n.delta_y);
                    var r = s + i.getPointUnitFromPixelValue(t.gesture.deltaX),
                    o = d + i.getPointUnitFromPixelValue(t.gesture.deltaY);
                    e.popupWindow && e.popupWindow.move(t.gesture.deltaX, t.gesture.deltaY),
                    i.moveTo(r, o),
                    s = null,
                    d = null
                }
            }),
            r.on("tap",
            function(i) {
                var r = e.subway,
                o = e.renderer;
                if (i.gesture && i.gesture.preventDefault(), (!i.target || !(i.target.handled || $(i.target).parents("#sw_pw").size() > 0)) && i.gesture && 1 === i.gesture.touches.length) {
                    var s = t.getBoundingClientRect(),
                    d = i.gesture.touches[0],
                    l = new u(d.clientX - s.left, d.clientY - s.top);
                    e.hidePopupWindow();
                    var c = o.getPointFromPixel(l),
                    p = r.findNearestStation(c, "pixel", o.tolerance || 16);
                    p && p.uid && (a.addStat(STAT_CODE.SUBWAY_STATION_MARKER_CLICK), n.update({
                        query: {
                            station_uid: p.uid
                        }
                    },
                    {
                        replace: !0,
                        trigger: !1
                    }), e.popupStationWindow(p, {
                        zoomToNormal: !1,
                        isNotification: !1
                    }))
                }
            })
        },
        bind: function() {
            listener.on("subway", "swZoomIn", this.zoomIn, this),
            listener.on("subway", "swZoomOut", this.zoomOut, this),
            listener.on("common", "sizechange", this.onSizeChange, this)
        },
        zoomIn: function() {
            var e, t = this.renderer,
            i = this.popupWindow;
            t.isMaxScale() || (t.zoomIn(), i && (e = t.getPixelFromPoint(i.getPoint()), i.setPosition(e.x, e.y))),
            listener.trigger("subway", "swZoomEnd", {
                isMinScale: t.isMinScale(),
                isMaxScale: t.isMaxScale()
            })
        },
        zoomOut: function() {
            var e, t = this.renderer,
            i = this.popupWindow;
            t.isMinScale() || (t.zoomOut(), i && (e = t.getPixelFromPoint(i.getPoint()), i.setPosition(e.x, e.y))),
            listener.trigger("subway", "swZoomEnd", {
                isMinScale: t.isMinScale(),
                isMaxScale: t.isMaxScale()
            })
        },
        isMaxScale: function() {
            return this.renderer ? this.renderer.isMaxScale() : !1
        },
        isMinScale: function() {
            return this.renderer ? this.renderer.isMinScale() : !1
        },
        initCenterLocation: function() {
            var t = this,
            i = this.params;
            if (i && i.query && i.query.station_uid) this.popupStationWindow({
                uid: i.query.station_uid
            },
            {
                zoomToNormal: !0,
                isNotification: !1,
                successCallback: function() {
                    t.$el.css({
                        visibility: ""
                    })
                }
            });
            else if (i && i.query && i.query.line_uid);
            else {
                var n = e("core:widget/geolocation/location.js");
                n.hasExactPoi() && this.subway.cityCode == n.getCityCode() && this.onGeoSuccess({
                    point: n.getCenterPoi()
                })
            }
            t.$el.css({
                visibility: ""
            })
        },
        onGeoSuccess: function(e) {
            var t = this;
            if (e) {
                var i = this.subway.findNearestStation(e.point, "point", 1e6);
                this.popupStationWindow(i, {
                    zoomToNormal: !0,
                    isNotification: !0,
                    successCallback: function() {
                        t.$el.css({
                            visibility: ""
                        })
                    }
                })
            }
        },
        onSizeChange: function(e, t) {
            var i = this.renderer,
            n = this.popupWindow,
            r = t ? t.width: window.innerWidth,
            o = t ? t.height: window.innerHeight,
            s = o - $(".common-widget-nav").height();
            if ($("#subway-holder").css("height", s + "px"), i) {
                var a = Math.abs(o - i.deviceHeight),
                u = Math.abs(r - i.deviceWidth);
                if (!o || !r || !(a > 50 || u > 50)) return;
                if (i.resize(r, o), n) {
                    var d = i.getPixelFromPoint(n.getPoint());
                    n.setPosition(d.x, d.y)
                }
            }
        },
        popupStationWindow: function(e, t) {
            var i = this;
            i.renderer.locked || e && this.subway.getStationExt("inf", e.uid, $.proxy(function(e) {
                e && (i.renderer.locked = !0, t.zoomToNormal && i.renderer.zoom(e.station.x, e.station.y, 1), i.showPopupWindow({
                    notification: t.isNotification,
                    x: e.station.x,
                    y: e.station.y,
                    uid: e.station.uid,
                    lng: e.points.split(",")[0],
                    lat: e.points.split(",")[1],
                    station: e.station,
                    lines: e.lines
                }), i.renderer.locked = !1, t.successCallback && t.successCallback())
            },
            i), $.proxy(function() {
                t.failureCallback && t.failureCallback()
            },
            i))
        },
        showPopupWindow: function(t) {
            var i = this.renderer;
            this.popupWindow = this.popupWindow || e("subway:widget/popupwindow/popupwindow.js"),
            this.popupWindow.init(t),
            this.popupWindow.show({
                x: i.deviceWidth / 2,
                y: i.deviceHeight / 2
            },
            function(e, n) {
                i.moveTo( - t.x, -t.y + i.getPointUnitFromPixelValue(n))
            })
        },
        hidePopupWindow: function() {
            this.popupWindow && this.popupWindow.destroy()
        }
    })
});;
define("subway:widget/zoomcontrol/zoomcontrol.js",
function(o, s, t) {
    t.exports = {
        init: function() {
            "use strict";
            this.bind()
        },
        bind: function() {
            $("#swZoomOut").on("touchstart",
            function(o) {
                $("#swZoomOut").addClass("zoom_btn_tap"),
                o.target.handled = !0
            }),
            $("#swZoomOut").on("click",
            function() {
                $("#swZoomOut").removeClass("zoom_btn_tap"),
                listener.trigger("subway", "swZoomOut")
            }),
            $("#swZoomIn").on("touchstart",
            function(o) {
                $("#swZoomIn").addClass("zoom_btn_tap"),
                o.target.handled = !0
            }),
            $("#swZoomIn").on("click",
            function() {
                $("#swZoomIn").removeClass("zoom_btn_tap"),
                listener.trigger("subway", "swZoomIn")
            }),
            listener.on("subway", "swZoomEnd", this.reset, this)
        },
        reset: function(o, s) {
            s = s || {},
            $("#swZoomOut").removeClass("disable_zoom_btn"),
            s.isMinScale && $("#swZoomOut").addClass("disable_zoom_btn"),
            $("#swZoomIn").removeClass("disable_zoom_btn"),
            s.isMaxScale && $("#swZoomIn").addClass("disable_zoom_btn")
        }
    }
});
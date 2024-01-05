 "use strict";
 ! function(e, t) {
   "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).Popper = {})
 }(this, (function(e) {
   function t(e) {
     return {
       width: (e = e.getBoundingClientRect()).width,
       height: e.height,
       top: e.top,
       right: e.right,
       bottom: e.bottom,
       left: e.left,
       x: e.left,
       y: e.top
     }
   }

   function n(e) {
     return "[object Window]" !== e.toString() ? (e = e.ownerDocument) && e.defaultView || window : e
   }

   function r(e) {
     return {
       scrollLeft: (e = n(e)).pageXOffset,
       scrollTop: e.pageYOffset
     }
   }

   function o(e) {
     return e instanceof n(e).Element || e instanceof Element
   }

   function i(e) {
     return e instanceof n(e).HTMLElement || e instanceof HTMLElement
   }

   function a(e) {
     return e ? (e.nodeName || "").toLowerCase() : null
   }

   function s(e) {
     return ((o(e) ? e.ownerDocument : e.document) || window.document).documentElement
   }

   function f(e) {
     return t(s(e)).left + r(e).scrollLeft
   }

   function c(e) {
     return n(e).getComputedStyle(e)
   }

   function p(e) {
     return e = c(e), /auto|scroll|overlay|hidden/.test(e.overflow + e.overflowY + e.overflowX)
   }

   function l(e, o, c) {
     void 0 === c && (c = !1);
     var l = s(o);
     e = t(e);
     var u = i(o),
       d = {
         scrollLeft: 0,
         scrollTop: 0
       },
       m = {
         x: 0,
         y: 0
       };
     return (u || !u && !c) && (("body" !== a(o) || p(l)) && (d = o !== n(o) && i(o) ? {
       scrollLeft: o.scrollLeft,
       scrollTop: o.scrollTop
     } : r(o)), i(o) ? ((m = t(o)).x += o.clientLeft, m.y += o.clientTop) : l && (m.x = f(l))), {
       x: e.left + d.scrollLeft - m.x,
       y: e.top + d.scrollTop - m.y,
       width: e.width,
       height: e.height
     }
   }

   function u(e) {
     return {
       x: e.offsetLeft,
       y: e.offsetTop,
       width: e.offsetWidth,
       height: e.offsetHeight
     }
   }

   function d(e) {
     return "html" === a(e) ? e : e.assignedSlot || e.parentNode || e.host || s(e)
   }

   function m(e, t) {
     void 0 === t && (t = []);
     var r = function e(t) {
       return 0 <= ["html", "body", "#document"].indexOf(a(t)) ? t.ownerDocument.body : i(t) && p(t) ? t : e(d(t))
     }(e);
     e = "body" === a(r);
     var o = n(r);
     return r = e ? [o].concat(o.visualViewport || [], p(r) ? r : []) : r, t = t.concat(r), e ? t : t.concat(m(d(r)))
   }

   function h(e) {
     if (!i(e) || "fixed" === c(e).position) return null;
     if (e = e.offsetParent) {
       var t = s(e);
       if ("body" === a(e) && "static" === c(e).position && "static" !== c(t).position) return t
     }
     return e
   }

   function g(e) {
     for (var t = n(e), r = h(e); r && 0 <= ["table", "td", "th"].indexOf(a(r)) && "static" === c(r).position;) r = h(r);
     if (r && "body" === a(r) && "static" === c(r).position) return t;
     if (!r) e: {
       for (e = d(e); i(e) && 0 > ["html", "body"].indexOf(a(e));) {
         if ("none" !== (r = c(e)).transform || "none" !== r.perspective || r.willChange && "auto" !== r.willChange) {
           r = e;
           break e
         }
         e = e.parentNode
       }
       r = null
     }
     return r || t
   }

   function v(e) {
     var t = new Map,
       n = new Set,
       r = [];
     return e.forEach((function(e) {
       t.set(e.name, e)
     })), e.forEach((function(e) {
       n.has(e.name) || function e(o) {
         n.add(o.name), [].concat(o.requires || [], o.requiresIfExists || []).forEach((function(r) {
           n.has(r) || (r = t.get(r)) && e(r)
         })), r.push(o)
       }(e)
     })), r
   }

   function b(e) {
     var t;
     return function() {
       return t || (t = new Promise((function(n) {
         Promise.resolve().then((function() {
           t = void 0, n(e())
         }))
       }))), t
     }
   }

   function y(e) {
     return e.split("-")[0]
   }

   function O(e, t) {
     var r, o = t.getRootNode && t.getRootNode();
     if (e.contains(t)) return !0;
     if ((r = o) && (r = o instanceof(r = n(o).ShadowRoot) || o instanceof ShadowRoot), r)
       do {
         if (t && e.isSameNode(t)) return !0;
         t = t.parentNode || t.host
       } while (t);
     return !1
   }

   function w(e) {
     return Object.assign(Object.assign({}, e), {}, {
       left: e.x,
       top: e.y,
       right: e.x + e.width,
       bottom: e.y + e.height
     })
   }

   function x(e, o) {
     if ("viewport" === o) {
       o = n(e);
       var a = s(e);
       o = o.visualViewport;
       var p = a.clientWidth;
       a = a.clientHeight;
       var l = 0,
         u = 0;
       o && (p = o.width, a = o.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (l = o.offsetLeft, u = o.offsetTop)), e = w(e = {
         width: p,
         height: a,
         x: l + f(e),
         y: u
       })
     } else i(o) ? ((e = t(o)).top += o.clientTop, e.left += o.clientLeft, e.bottom = e.top + o.clientHeight, e.right = e.left + o.clientWidth, e.width = o.clientWidth, e.height = o.clientHeight, e.x = e.left, e.y = e.top) : (u = s(e), e = s(u), l = r(u), o = u.ownerDocument.body, p = Math.max(e.scrollWidth, e.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = Math.max(e.scrollHeight, e.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), u = -l.scrollLeft + f(u), l = -l.scrollTop, "rtl" === c(o || e).direction && (u += Math.max(e.clientWidth, o ? o.clientWidth : 0) - p), e = w({
       width: p,
       height: a,
       x: u,
       y: l
     }));
     return e
   }

   function j(e, t, n) {
     return t = "clippingParents" === t ? function(e) {
       var t = m(d(e)),
         n = 0 <= ["absolute", "fixed"].indexOf(c(e).position) && i(e) ? g(e) : e;
       return o(n) ? t.filter((function(e) {
         return o(e) && O(e, n) && "body" !== a(e)
       })) : []
     }(e) : [].concat(t), (n = (n = [].concat(t, [n])).reduce((function(t, n) {
       return n = x(e, n), t.top = Math.max(n.top, t.top), t.right = Math.min(n.right, t.right), t.bottom = Math.min(n.bottom, t.bottom), t.left = Math.max(n.left, t.left), t
     }), x(e, n[0]))).width = n.right - n.left, n.height = n.bottom - n.top, n.x = n.left, n.y = n.top, n
   }

   function M(e) {
     return 0 <= ["top", "bottom"].indexOf(e) ? "x" : "y"
   }

   function E(e) {
     var t = e.reference,
       n = e.element,
       r = (e = e.placement) ? y(e) : null;
     e = e ? e.split("-")[1] : null;
     var o = t.x + t.width / 2 - n.width / 2,
       i = t.y + t.height / 2 - n.height / 2;
     switch (r) {
       case "top":
         o = {
           x: o,
           y: t.y - n.height
         };
         break;
       case "bottom":
         o = {
           x: o,
           y: t.y + t.height
         };
         break;
       case "right":
         o = {
           x: t.x + t.width,
           y: i
         };
         break;
       case "left":
         o = {
           x: t.x - n.width,
           y: i
         };
         break;
       default:
         o = {
           x: t.x,
           y: t.y
         }
     }
     if (null != (r = r ? M(r) : null)) switch (i = "y" === r ? "height" : "width", e) {
       case "start":
         o[r] -= t[i] / 2 - n[i] / 2;
         break;
       case "end":
         o[r] += t[i] / 2 - n[i] / 2
     }
     return o
   }

   function D(e) {
     return Object.assign(Object.assign({}, {
       top: 0,
       right: 0,
       bottom: 0,
       left: 0
     }), e)
   }

   function P(e, t) {
     return t.reduce((function(t, n) {
       return t[n] = e, t
     }), {})
   }

   function L(e, n) {
     void 0 === n && (n = {});
     var r = n;
     n = void 0 === (n = r.placement) ? e.placement : n;
     var i = r.boundary,
       a = void 0 === i ? "clippingParents" : i,
       f = void 0 === (i = r.rootBoundary) ? "viewport" : i;
     i = void 0 === (i = r.elementContext) ? "popper" : i;
     var c = r.altBoundary,
       p = void 0 !== c && c;
     r = D("number" != typeof(r = void 0 === (r = r.padding) ? 0 : r) ? r : P(r, T));
     var l = e.elements.reference;
     c = e.rects.popper, a = j(o(p = e.elements[p ? "popper" === i ? "reference" : "popper" : i]) ? p : p.contextElement || s(e.elements.popper), a, f), p = E({
       reference: f = t(l),
       element: c,
       strategy: "absolute",
       placement: n
     }), c = w(Object.assign(Object.assign({}, c), p)), f = "popper" === i ? c : f;
     var u = {
       top: a.top - f.top + r.top,
       bottom: f.bottom - a.bottom + r.bottom,
       left: a.left - f.left + r.left,
       right: f.right - a.right + r.right
     };
     if (e = e.modifiersData.offset, "popper" === i && e) {
       var d = e[n];
       Object.keys(u).forEach((function(e) {
         var t = 0 <= ["right", "bottom"].indexOf(e) ? 1 : -1,
           n = 0 <= ["top", "bottom"].indexOf(e) ? "y" : "x";
         u[e] += d[n] * t
       }))
     }
     return u
   }

   function k() {
     for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
     return !t.some((function(e) {
       return !(e && "function" == typeof e.getBoundingClientRect)
     }))
   }

   function B(e) {
     void 0 === e && (e = {});
     var t = e.defaultModifiers,
       n = void 0 === t ? [] : t,
       r = void 0 === (e = e.defaultOptions) ? V : e;
     return function(e, t, i) {
       function a() {
         f.forEach((function(e) {
           return e()
         })), f = []
       }
       void 0 === i && (i = r);
       var s = {
           placement: "bottom",
           orderedModifiers: [],
           options: Object.assign(Object.assign({}, V), r),
           modifiersData: {},
           elements: {
             reference: e,
             popper: t
           },
           attributes: {},
           styles: {}
         },
         f = [],
         c = !1,
         p = {
           state: s,
           setOptions: function(i) {
             return a(), s.options = Object.assign(Object.assign(Object.assign({}, r), s.options), i), s.scrollParents = {
               reference: o(e) ? m(e) : e.contextElement ? m(e.contextElement) : [],
               popper: m(t)
             }, i = function(e) {
               var t = v(e);
               return N.reduce((function(e, n) {
                 return e.concat(t.filter((function(e) {
                   return e.phase === n
                 })))
               }), [])
             }(function(e) {
               var t = e.reduce((function(e, t) {
                 var n = e[t.name];
                 return e[t.name] = n ? Object.assign(Object.assign(Object.assign({}, n), t), {}, {
                   options: Object.assign(Object.assign({}, n.options), t.options),
                   data: Object.assign(Object.assign({}, n.data), t.data)
                 }) : t, e
               }), {});
               return Object.keys(t).map((function(e) {
                 return t[e]
               }))
             }([].concat(n, s.options.modifiers))), s.orderedModifiers = i.filter((function(e) {
               return e.enabled
             })), s.orderedModifiers.forEach((function(e) {
               var t = e.name,
                 n = e.options;
               n = void 0 === n ? {} : n, "function" == typeof(e = e.effect) && (t = e({
                 state: s,
                 name: t,
                 instance: p,
                 options: n
               }), f.push(t || function() {}))
             })), p.update()
           },
           forceUpdate: function() {
             if (!c) {
               var e = s.elements,
                 t = e.reference;
               if (k(t, e = e.popper))
                 for (s.rects = {
                     reference: l(t, g(e), "fixed" === s.options.strategy),
                     popper: u(e)
                   }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach((function(e) {
                     return s.modifiersData[e.name] = Object.assign({}, e.data)
                   })), t = 0; t < s.orderedModifiers.length; t++)
                   if (!0 === s.reset) s.reset = !1, t = -1;
                   else {
                     var n = s.orderedModifiers[t];
                     e = n.fn;
                     var r = n.options;
                     r = void 0 === r ? {} : r, n = n.name, "function" == typeof e && (s = e({
                       state: s,
                       options: r,
                       name: n,
                       instance: p
                     }) || s)
                   }
             }
           },
           update: b((function() {
             return new Promise((function(e) {
               p.forceUpdate(), e(s)
             }))
           })),
           destroy: function() {
             a(), c = !0
           }
         };
       return k(e, t) ? (p.setOptions(i).then((function(e) {
         !c && i.onFirstUpdate && i.onFirstUpdate(e)
       })), p) : p
     }
   }

   function W(e) {
     var t, r = e.popper,
       o = e.popperRect,
       i = e.placement,
       a = e.offsets,
       f = e.position,
       c = e.gpuAcceleration,
       p = e.adaptive;
     e.roundOffsets ? (e = window.devicePixelRatio || 1, e = {
       x: Math.round(a.x * e) / e || 0,
       y: Math.round(a.y * e) / e || 0
     }) : e = a;
     var l = e;
     e = void 0 === (e = l.x) ? 0 : e, l = void 0 === (l = l.y) ? 0 : l;
     var u = a.hasOwnProperty("x");
     a = a.hasOwnProperty("y");
     var d, m = "left",
       h = "top",
       v = window;
     if (p) {
       var b = g(r);
       b === n(r) && (b = s(r)), "top" === i && (h = "bottom", l -= b.clientHeight - o.height, l *= c ? 1 : -1), "left" === i && (m = "right", e -= b.clientWidth - o.width, e *= c ? 1 : -1)
     }
     return r = Object.assign({
       position: f
     }, p && z), c ? Object.assign(Object.assign({}, r), {}, ((d = {})[h] = a ? "0" : "", d[m] = u ? "0" : "", d.transform = 2 > (v.devicePixelRatio || 1) ? "translate(" + e + "px, " + l + "px)" : "translate3d(" + e + "px, " + l + "px, 0)", d)) : Object.assign(Object.assign({}, r), {}, ((t = {})[h] = a ? l + "px" : "", t[m] = u ? e + "px" : "", t.transform = "", t))
   }

   function A(e) {
     return e.replace(/left|right|bottom|top/g, (function(e) {
       return G[e]
     }))
   }

   function H(e) {
     return e.replace(/start|end/g, (function(e) {
       return J[e]
     }))
   }

   function R(e, t, n) {
     return void 0 === n && (n = {
       x: 0,
       y: 0
     }), {
       top: e.top - t.height - n.y,
       right: e.right - t.width + n.x,
       bottom: e.bottom - t.height + n.y,
       left: e.left - t.width - n.x
     }
   }

   function S(e) {
     return ["top", "right", "bottom", "left"].some((function(t) {
       return 0 <= e[t]
     }))
   }
   var T = ["top", "bottom", "right", "left"],
     q = T.reduce((function(e, t) {
       return e.concat([t + "-start", t + "-end"])
     }), []),
     C = [].concat(T, ["auto"]).reduce((function(e, t) {
       return e.concat([t, t + "-start", t + "-end"])
     }), []),
     N = "beforeRead read afterRead beforeMain main afterMain beforeWrite write afterWrite".split(" "),
     V = {
       placement: "bottom",
       modifiers: [],
       strategy: "absolute"
     },
     I = {
       passive: !0
     },
     _ = {
       name: "eventListeners",
       enabled: !0,
       phase: "write",
       fn: function() {},
       effect: function(e) {
         var t = e.state,
           r = e.instance,
           o = (e = e.options).scroll,
           i = void 0 === o || o,
           a = void 0 === (e = e.resize) || e,
           s = n(t.elements.popper),
           f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
         return i && f.forEach((function(e) {
             e.addEventListener("scroll", r.update, I)
           })), a && s.addEventListener("resize", r.update, I),
           function() {
             i && f.forEach((function(e) {
               e.removeEventListener("scroll", r.update, I)
             })), a && s.removeEventListener("resize", r.update, I)
           }
       },
       data: {}
     },
     U = {
       name: "popperOffsets",
       enabled: !0,
       phase: "read",
       fn: function(e) {
         var t = e.state;
         t.modifiersData[e.name] = E({
           reference: t.rects.reference,
           element: t.rects.popper,
           strategy: "absolute",
           placement: t.placement
         })
       },
       data: {}
     },
     z = {
       top: "auto",
       right: "auto",
       bottom: "auto",
       left: "auto"
     },
     F = {
       name: "computeStyles",
       enabled: !0,
       phase: "beforeWrite",
       fn: function(e) {
         var t = e.state,
           n = e.options;
         e = void 0 === (e = n.gpuAcceleration) || e;
         var r = n.adaptive;
         r = void 0 === r || r, n = void 0 === (n = n.roundOffsets) || n, e = {
           placement: y(t.placement),
           popper: t.elements.popper,
           popperRect: t.rects.popper,
           gpuAcceleration: e
         }, null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign(Object.assign({}, t.styles.popper), W(Object.assign(Object.assign({}, e), {}, {
           offsets: t.modifiersData.popperOffsets,
           position: t.options.strategy,
           adaptive: r,
           roundOffsets: n
         })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign(Object.assign({}, t.styles.arrow), W(Object.assign(Object.assign({}, e), {}, {
           offsets: t.modifiersData.arrow,
           position: "absolute",
           adaptive: !1,
           roundOffsets: n
         })))), t.attributes.popper = Object.assign(Object.assign({}, t.attributes.popper), {}, {
           "data-popper-placement": t.placement
         })
       },
       data: {}
     },
     X = {
       name: "applyStyles",
       enabled: !0,
       phase: "write",
       fn: function(e) {
         var t = e.state;
         Object.keys(t.elements).forEach((function(e) {
           var n = t.styles[e] || {},
             r = t.attributes[e] || {},
             o = t.elements[e];
           i(o) && a(o) && (Object.assign(o.style, n), Object.keys(r).forEach((function(e) {
             var t = r[e];
             !1 === t ? o.removeAttribute(e) : o.setAttribute(e, !0 === t ? "" : t)
           })))
         }))
       },
       effect: function(e) {
         var t = e.state,
           n = {
             popper: {
               position: t.options.strategy,
               left: "0",
               top: "0",
               margin: "0"
             },
             arrow: {
               position: "absolute"
             },
             reference: {}
           };
         return Object.assign(t.elements.popper.style, n.popper), t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
           function() {
             Object.keys(t.elements).forEach((function(e) {
               var r = t.elements[e],
                 o = t.attributes[e] || {};
               e = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((function(e, t) {
                 return e[t] = "", e
               }), {}), i(r) && a(r) && (Object.assign(r.style, e), Object.keys(o).forEach((function(e) {
                 r.removeAttribute(e)
               })))
             }))
           }
       },
       requires: ["computeStyles"]
     },
     Y = {
       name: "offset",
       enabled: !0,
       phase: "main",
       requires: ["popperOffsets"],
       fn: function(e) {
         var t = e.state,
           n = e.name,
           r = void 0 === (e = e.options.offset) ? [0, 0] : e,
           o = (e = C.reduce((function(e, n) {
             var o = t.rects,
               i = y(n),
               a = 0 <= ["left", "top"].indexOf(i) ? -1 : 1,
               s = "function" == typeof r ? r(Object.assign(Object.assign({}, o), {}, {
                 placement: n
               })) : r;
             return o = (o = s[0]) || 0, s = ((s = s[1]) || 0) * a, i = 0 <= ["left", "right"].indexOf(i) ? {
               x: s,
               y: o
             } : {
               x: o,
               y: s
             }, e[n] = i, e
           }), {}))[t.placement],
           i = o.x;
         o = o.y, null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += i, t.modifiersData.popperOffsets.y += o), t.modifiersData[n] = e
       }
     },
     G = {
       left: "right",
       right: "left",
       bottom: "top",
       top: "bottom"
     },
     J = {
       start: "end",
       end: "start"
     },
     K = {
       name: "flip",
       enabled: !0,
       phase: "main",
       fn: function(e) {
         var t = e.state,
           n = e.options;
         if (e = e.name, !t.modifiersData[e]._skip) {
           var r = n.mainAxis;
           r = void 0 === r || r;
           var o = n.altAxis;
           o = void 0 === o || o;
           var i = n.fallbackPlacements,
             a = n.padding,
             s = n.boundary,
             f = n.rootBoundary,
             c = n.altBoundary,
             p = n.flipVariations,
             l = void 0 === p || p,
             u = n.allowedAutoPlacements;
           p = y(n = t.options.placement), i = i || (p !== n && l ? function(e) {
             if ("auto" === y(e)) return [];
             var t = A(e);
             return [H(e), t, H(t)]
           }(n) : [A(n)]);
           var d = [n].concat(i).reduce((function(e, n) {
             return e.concat("auto" === y(n) ? function(e, t) {
               void 0 === t && (t = {});
               var n = t.boundary,
                 r = t.rootBoundary,
                 o = t.padding,
                 i = t.flipVariations,
                 a = t.allowedAutoPlacements,
                 s = void 0 === a ? C : a,
                 f = t.placement.split("-")[1];
               0 === (i = (t = f ? i ? q : q.filter((function(e) {
                 return e.split("-")[1] === f
               })) : T).filter((function(e) {
                 return 0 <= s.indexOf(e)
               }))).length && (i = t);
               var c = i.reduce((function(t, i) {
                 return t[i] = L(e, {
                   placement: i,
                   boundary: n,
                   rootBoundary: r,
                   padding: o
                 })[y(i)], t
               }), {});
               return Object.keys(c).sort((function(e, t) {
                 return c[e] - c[t]
               }))
             }(t, {
               placement: n,
               boundary: s,
               rootBoundary: f,
               padding: a,
               flipVariations: l,
               allowedAutoPlacements: u
             }) : n)
           }), []);
           n = t.rects.reference, i = t.rects.popper;
           var m = new Map;
           p = !0;
           for (var h = d[0], g = 0; g < d.length; g++) {
             var v = d[g],
               b = y(v),
               O = "start" === v.split("-")[1],
               w = 0 <= ["top", "bottom"].indexOf(b),
               x = w ? "width" : "height",
               j = L(t, {
                 placement: v,
                 boundary: s,
                 rootBoundary: f,
                 altBoundary: c,
                 padding: a
               });
             if (O = w ? O ? "right" : "left" : O ? "bottom" : "top", n[x] > i[x] && (O = A(O)), x = A(O), w = [], r && w.push(0 >= j[b]), o && w.push(0 >= j[O], 0 >= j[x]), w.every((function(e) {
                 return e
               }))) {
               h = v, p = !1;
               break
             }
             m.set(v, w)
           }
           if (p)
             for (r = function(e) {
                 var t = d.find((function(t) {
                   if (t = m.get(t)) return t.slice(0, e).every((function(e) {
                     return e
                   }))
                 }));
                 if (t) return h = t, "break"
               }, o = l ? 3 : 1; 0 < o && "break" !== r(o); o--);
           t.placement !== h && (t.modifiersData[e]._skip = !0, t.placement = h, t.reset = !0)
         }
       },
       requiresIfExists: ["offset"],
       data: {
         _skip: !1
       }
     },
     Q = {
       name: "preventOverflow",
       enabled: !0,
       phase: "main",
       fn: function(e) {
         var t = e.state,
           n = e.options;
         e = e.name;
         var r = n.mainAxis,
           o = void 0 === r || r;
         r = void 0 !== (r = n.altAxis) && r;
         var i = n.tether;
         i = void 0 === i || i;
         var a = n.tetherOffset,
           s = void 0 === a ? 0 : a;
         n = L(t, {
           boundary: n.boundary,
           rootBoundary: n.rootBoundary,
           padding: n.padding,
           altBoundary: n.altBoundary
         }), a = y(t.placement);
         var f = t.placement.split("-")[1],
           c = !f,
           p = M(a);
         a = "x" === p ? "y" : "x";
         var l = t.modifiersData.popperOffsets,
           d = t.rects.reference,
           m = t.rects.popper,
           h = "function" == typeof s ? s(Object.assign(Object.assign({}, t.rects), {}, {
             placement: t.placement
           })) : s;
         if (s = {
             x: 0,
             y: 0
           }, l) {
           if (o) {
             var v = "y" === p ? "top" : "left",
               b = "y" === p ? "bottom" : "right",
               O = "y" === p ? "height" : "width";
             o = l[p];
             var w = l[p] + n[v],
               x = l[p] - n[b],
               j = i ? -m[O] / 2 : 0,
               E = "start" === f ? d[O] : m[O];
             f = "start" === f ? -m[O] : -d[O], m = t.elements.arrow, m = i && m ? u(m) : {
               width: 0,
               height: 0
             };
             var D = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
               top: 0,
               right: 0,
               bottom: 0,
               left: 0
             };
             v = D[v], b = D[b], m = Math.max(0, Math.min(d[O], m[O])), E = c ? d[O] / 2 - j - m - v - h : E - m - v - h, c = c ? -d[O] / 2 + j + m + b + h : f + m + b + h, h = t.elements.arrow && g(t.elements.arrow), d = t.modifiersData.offset ? t.modifiersData.offset[t.placement][p] : 0, h = l[p] + E - d - (h ? "y" === p ? h.clientTop || 0 : h.clientLeft || 0 : 0), c = l[p] + c - d, i = Math.max(i ? Math.min(w, h) : w, Math.min(o, i ? Math.max(x, c) : x)), l[p] = i, s[p] = i - o
           }
           r && (r = l[a], i = Math.max(r + n["x" === p ? "top" : "left"], Math.min(r, r - n["x" === p ? "bottom" : "right"])), l[a] = i, s[a] = i - r), t.modifiersData[e] = s
         }
       },
       requiresIfExists: ["offset"]
     },
     Z = {
       name: "arrow",
       enabled: !0,
       phase: "main",
       fn: function(e) {
         var t, n = e.state;
         e = e.name;
         var r = n.elements.arrow,
           o = n.modifiersData.popperOffsets,
           i = y(n.placement),
           a = M(i);
         if (i = 0 <= ["left", "right"].indexOf(i) ? "height" : "width", r && o) {
           var s = n.modifiersData[e + "#persistent"].padding,
             f = u(r),
             c = "y" === a ? "top" : "left",
             p = "y" === a ? "bottom" : "right",
             l = n.rects.reference[i] + n.rects.reference[a] - o[a] - n.rects.popper[i];
           o = o[a] - n.rects.reference[a], l = (r = (r = g(r)) ? "y" === a ? r.clientHeight || 0 : r.clientWidth || 0 : 0) / 2 - f[i] / 2 + (l / 2 - o / 2), i = Math.max(s[c], Math.min(l, r - f[i] - s[p])), n.modifiersData[e] = ((t = {})[a] = i, t.centerOffset = i - l, t)
         }
       },
       effect: function(e) {
         var t = e.state,
           n = e.options;
         e = e.name;
         var r = n.element;
         if (r = void 0 === r ? "[data-popper-arrow]" : r, n = void 0 === (n = n.padding) ? 0 : n, null != r) {
           if ("string" == typeof r && !(r = t.elements.popper.querySelector(r))) return;
           O(t.elements.popper, r) && (t.elements.arrow = r, t.modifiersData[e + "#persistent"] = {
             padding: D("number" != typeof n ? n : P(n, T))
           })
         }
       },
       requires: ["popperOffsets"],
       requiresIfExists: ["preventOverflow"]
     },
     $ = {
       name: "hide",
       enabled: !0,
       phase: "main",
       requiresIfExists: ["preventOverflow"],
       fn: function(e) {
         var t = e.state;
         e = e.name;
         var n = t.rects.reference,
           r = t.rects.popper,
           o = t.modifiersData.preventOverflow,
           i = L(t, {
             elementContext: "reference"
           }),
           a = L(t, {
             altBoundary: !0
           });
         n = R(i, n), r = R(a, r, o), o = S(n), a = S(r), t.modifiersData[e] = {
           referenceClippingOffsets: n,
           popperEscapeOffsets: r,
           isReferenceHidden: o,
           hasPopperEscaped: a
         }, t.attributes.popper = Object.assign(Object.assign({}, t.attributes.popper), {}, {
           "data-popper-reference-hidden": o,
           "data-popper-escaped": a
         })
       }
     },
     ee = B({
       defaultModifiers: [_, U, F, X]
     }),
     te = [_, U, F, X, Y, K, Q, Z, $],
     ne = B({
       defaultModifiers: te
     });
   e.applyStyles = X, e.arrow = Z, e.computeStyles = F, e.createPopper = ne, e.createPopperLite = ee, e.defaultModifiers = te, e.detectOverflow = L, e.eventListeners = _, e.flip = K, e.hide = $, e.offset = Y, e.popperGenerator = B, e.popperOffsets = U, e.preventOverflow = Q, Object.defineProperty(e, "__esModule", {
     value: !0
   })
 }));
 /*! * Bootstrap v5.1.1 (https://getbootstrap.com/)  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)*/
 ! function(t, e) {
   "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("@popperjs/core")) : "function" == typeof define && define.amd ? define(["@popperjs/core"], e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e(t.Popper)
 }(this, (function(t) {
   "use strict";

   function e(t) {
     if (t && t.__esModule) return t;
     var e = Object.create(null);
     return t && Object.keys(t).forEach((function(i) {
       if ("default" !== i) {
         var s = Object.getOwnPropertyDescriptor(t, i);
         Object.defineProperty(e, i, s.get ? s : {
           enumerable: !0,
           get: function() {
             return t[i]
           }
         })
       }
     })), e.default = t, Object.freeze(e)
   }
   var i = e(t);
   const s = t => {
       let e = t.getAttribute("data-bs-target");
       if (!e || "#" === e) {
         let i = t.getAttribute("href");
         if (!i || !i.includes("#") && !i.startsWith(".")) return null;
         i.includes("#") && !i.startsWith("#") && (i = "#" + i.split("#")[1]), e = i && "#" !== i ? i.trim() : null
       }
       return e
     },
     n = t => {
       const e = s(t);
       return e && document.querySelector(e) ? e : null
     },
     o = t => {
       const e = s(t);
       return e ? document.querySelector(e) : null
     },
     r = t => {
       t.dispatchEvent(new Event("transitionend"))
     },
     a = t => !(!t || "object" != typeof t) && (void 0 !== t.jquery && (t = t[0]), void 0 !== t.nodeType),
     l = t => a(t) ? t.jquery ? t[0] : t : "string" == typeof t && t.length > 0 ? document.querySelector(t) : null,
     c = (t, e, i) => {
       Object.keys(i).forEach(s => {
         const n = i[s],
           o = e[s],
           r = o && a(o) ? "element" : null == (l = o) ? "" + l : {}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase();
         var l;
         if (!new RegExp(n).test(r)) throw new TypeError(`${t.toUpperCase()}: Option "${s}" provided type "${r}" but expected type "${n}".`)
       })
     },
     h = t => !(!a(t) || 0 === t.getClientRects().length) && "visible" === getComputedStyle(t).getPropertyValue("visibility"),
     d = t => !t || t.nodeType !== Node.ELEMENT_NODE || !!t.classList.contains("disabled") || (void 0 !== t.disabled ? t.disabled : t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled")),
     u = t => {
       if (!document.documentElement.attachShadow) return null;
       if ("function" == typeof t.getRootNode) {
         const e = t.getRootNode();
         return e instanceof ShadowRoot ? e : null
       }
       return t instanceof ShadowRoot ? t : t.parentNode ? u(t.parentNode) : null
     },
     g = () => {},
     p = t => {
       t.offsetHeight
     },
     f = () => {
       const {
         jQuery: t
       } = window;
       return t && !document.body.hasAttribute("data-bs-no-jquery") ? t : null
     },
     _ = [],
     m = () => "rtl" === document.documentElement.dir,
     b = t => {
       var e;
       e = () => {
         const e = f();
         if (e) {
           const i = t.NAME,
             s = e.fn[i];
           e.fn[i] = t.jQueryInterface, e.fn[i].Constructor = t, e.fn[i].noConflict = () => (e.fn[i] = s, t.jQueryInterface)
         }
       }, "loading" === document.readyState ? (_.length || document.addEventListener("DOMContentLoaded", () => {
         _.forEach(t => t())
       }), _.push(e)) : e()
     },
     v = t => {
       "function" == typeof t && t()
     },
     w = (t, e, i = !0) => {
       if (!i) return void v(t);
       const s = (t => {
         if (!t) return 0;
         let {
           transitionDuration: e,
           transitionDelay: i
         } = window.getComputedStyle(t);
         const s = Number.parseFloat(e),
           n = Number.parseFloat(i);
         return s || n ? (e = e.split(",")[0], i = i.split(",")[0], 1e3 * (Number.parseFloat(e) + Number.parseFloat(i))) : 0
       })(e) + 5;
       let n = !1;
       const o = ({
         target: i
       }) => {
         i === e && (n = !0, e.removeEventListener("transitionend", o), v(t))
       };
       e.addEventListener("transitionend", o), setTimeout(() => {
         n || r(e)
       }, s)
     },
     y = (t, e, i, s) => {
       let n = t.indexOf(e);
       if (-1 === n) return t[!i && s ? t.length - 1 : 0];
       const o = t.length;
       return n += i ? 1 : -1, s && (n = (n + o) % o), t[Math.max(0, Math.min(n, o - 1))]
     },
     E = /[^.]*(?=\..*)\.|.*/,
     A = /\..*/,
     T = /::\d+$/,
     C = {};
   let k = 1;
   const L = {
       mouseenter: "mouseover",
       mouseleave: "mouseout"
     },
     S = /^(mouseenter|mouseleave)/i,
     O = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);

   function N(t, e) {
     return e && `${e}::${k++}` || t.uidEvent || k++
   }

   function D(t) {
     const e = N(t);
     return t.uidEvent = e, C[e] = C[e] || {}, C[e]
   }

   function I(t, e, i = null) {
     const s = Object.keys(t);
     for (let n = 0, o = s.length; n < o; n++) {
       const o = t[s[n]];
       if (o.originalHandler === e && o.delegationSelector === i) return o
     }
     return null
   }

   function P(t, e, i) {
     const s = "string" == typeof e,
       n = s ? i : e;
     let o = j(t);
     return O.has(o) || (o = t), [s, n, o]
   }

   function x(t, e, i, s, n) {
     if ("string" != typeof e || !t) return;
     if (i || (i = s, s = null), S.test(e)) {
       const t = t => function(e) {
         if (!e.relatedTarget || e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget)) return t.call(this, e)
       };
       s ? s = t(s) : i = t(i)
     }
     const [o, r, a] = P(e, i, s), l = D(t), c = l[a] || (l[a] = {}), h = I(c, r, o ? i : null);
     if (h) return void(h.oneOff = h.oneOff && n);
     const d = N(r, e.replace(E, "")),
       u = o ? function(t, e, i) {
         return function s(n) {
           const o = t.querySelectorAll(e);
           for (let {
               target: r
             } = n; r && r !== this; r = r.parentNode)
             for (let a = o.length; a--;)
               if (o[a] === r) return n.delegateTarget = r, s.oneOff && H.off(t, n.type, e, i), i.apply(r, [n]);
           return null
         }
       }(t, i, s) : function(t, e) {
         return function i(s) {
           return s.delegateTarget = t, i.oneOff && H.off(t, s.type, e), e.apply(t, [s])
         }
       }(t, i);
     u.delegationSelector = o ? i : null, u.originalHandler = r, u.oneOff = n, u.uidEvent = d, c[d] = u, t.addEventListener(a, u, o)
   }

   function M(t, e, i, s, n) {
     const o = I(e[i], s, n);
     o && (t.removeEventListener(i, o, Boolean(n)), delete e[i][o.uidEvent])
   }

   function j(t) {
     return t = t.replace(A, ""), L[t] || t
   }
   const H = {
       on(t, e, i, s) {
         x(t, e, i, s, !1)
       },
       one(t, e, i, s) {
         x(t, e, i, s, !0)
       },
       off(t, e, i, s) {
         if ("string" != typeof e || !t) return;
         const [n, o, r] = P(e, i, s), a = r !== e, l = D(t), c = e.startsWith(".");
         if (void 0 !== o) {
           if (!l || !l[r]) return;
           return void M(t, l, r, o, n ? i : null)
         }
         c && Object.keys(l).forEach(i => {
           ! function(t, e, i, s) {
             const n = e[i] || {};
             Object.keys(n).forEach(o => {
               if (o.includes(s)) {
                 const s = n[o];
                 M(t, e, i, s.originalHandler, s.delegationSelector)
               }
             })
           }(t, l, i, e.slice(1))
         });
         const h = l[r] || {};
         Object.keys(h).forEach(i => {
           const s = i.replace(T, "");
           if (!a || e.includes(s)) {
             const e = h[i];
             M(t, l, r, e.originalHandler, e.delegationSelector)
           }
         })
       },
       trigger(t, e, i) {
         if ("string" != typeof e || !t) return null;
         const s = f(),
           n = j(e),
           o = e !== n,
           r = O.has(n);
         let a, l = !0,
           c = !0,
           h = !1,
           d = null;
         return o && s && (a = s.Event(e, i), s(t).trigger(a), l = !a.isPropagationStopped(), c = !a.isImmediatePropagationStopped(), h = a.isDefaultPrevented()), r ? (d = document.createEvent("HTMLEvents"), d.initEvent(n, l, !0)) : d = new CustomEvent(e, {
           bubbles: l,
           cancelable: !0
         }), void 0 !== i && Object.keys(i).forEach(t => {
           Object.defineProperty(d, t, {
             get: () => i[t]
           })
         }), h && d.preventDefault(), c && t.dispatchEvent(d), d.defaultPrevented && void 0 !== a && a.preventDefault(), d
       }
     },
     B = new Map;
   var z = {
     set(t, e, i) {
       B.has(t) || B.set(t, new Map);
       const s = B.get(t);
       s.has(e) || 0 === s.size ? s.set(e, i) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`)
     },
     get: (t, e) => B.has(t) && B.get(t).get(e) || null,
     remove(t, e) {
       if (!B.has(t)) return;
       const i = B.get(t);
       i.delete(e), 0 === i.size && B.delete(t)
     }
   };
   class R {
     constructor(t) {
       (t = l(t)) && (this._element = t, z.set(this._element, this.constructor.DATA_KEY, this))
     }
     dispose() {
       z.remove(this._element, this.constructor.DATA_KEY), H.off(this._element, this.constructor.EVENT_KEY), Object.getOwnPropertyNames(this).forEach(t => {
         this[t] = null
       })
     }
     _queueCallback(t, e, i = !0) {
       w(t, e, i)
     }
     static getInstance(t) {
       return z.get(l(t), this.DATA_KEY)
     }
     static getOrCreateInstance(t, e = {}) {
       return this.getInstance(t) || new this(t, "object" == typeof e ? e : null)
     }
     static get VERSION() {
       return "5.1.1"
     }
     static get NAME() {
       throw new Error('You have to implement the static method "NAME", for each component!')
     }
     static get DATA_KEY() {
       return "bs." + this.NAME
     }
     static get EVENT_KEY() {
       return "." + this.DATA_KEY
     }
   }
   const F = (t, e = "hide") => {
     const i = "click.dismiss" + t.EVENT_KEY,
       s = t.NAME;
     H.on(document, i, `[data-bs-dismiss="${s}"]`, (function(i) {
       if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), d(this)) return;
       const n = o(this) || this.closest("." + s);
       t.getOrCreateInstance(n)[e]()
     }))
   };
   class q extends R {
     static get NAME() {
       return "alert"
     }
     close() {
       if (H.trigger(this._element, "close.bs.alert").defaultPrevented) return;
       this._element.classList.remove("show");
       const t = this._element.classList.contains("fade");
       this._queueCallback(() => this._destroyElement(), this._element, t)
     }
     _destroyElement() {
       this._element.remove(), H.trigger(this._element, "closed.bs.alert"), this.dispose()
     }
     static jQueryInterface(t) {
       return this.each((function() {
         const e = q.getOrCreateInstance(this);
         if ("string" == typeof t) {
           if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
           e[t](this)
         }
       }))
     }
   }
   F(q, "close"), b(q);
   class W extends R {
     static get NAME() {
       return "button"
     }
     toggle() {
       this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
     }
     static jQueryInterface(t) {
       return this.each((function() {
         const e = W.getOrCreateInstance(this);
         "toggle" === t && e[t]()
       }))
     }
   }

   function $(t) {
     return "true" === t || "false" !== t && (t === Number(t).toString() ? Number(t) : "" === t || "null" === t ? null : t)
   }

   function U(t) {
     return t.replace(/[A-Z]/g, t => "-" + t.toLowerCase())
   }
   H.on(document, "click.bs.button.data-api", '[data-bs-toggle="button"]', t => {
     t.preventDefault();
     const e = t.target.closest('[data-bs-toggle="button"]');
     W.getOrCreateInstance(e).toggle()
   }), b(W);
   const K = {
       setDataAttribute(t, e, i) {
         t.setAttribute("data-bs-" + U(e), i)
       },
       removeDataAttribute(t, e) {
         t.removeAttribute("data-bs-" + U(e))
       },
       getDataAttributes(t) {
         if (!t) return {};
         const e = {};
         return Object.keys(t.dataset).filter(t => t.startsWith("bs")).forEach(i => {
           let s = i.replace(/^bs/, "");
           s = s.charAt(0).toLowerCase() + s.slice(1, s.length), e[s] = $(t.dataset[i])
         }), e
       },
       getDataAttribute: (t, e) => $(t.getAttribute("data-bs-" + U(e))),
       offset(t) {
         const e = t.getBoundingClientRect();
         return {
           top: e.top + window.pageYOffset,
           left: e.left + window.pageXOffset
         }
       },
       position: t => ({
         top: t.offsetTop,
         left: t.offsetLeft
       })
     },
     V = {
       find: (t, e = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e, t)),
       findOne: (t, e = document.documentElement) => Element.prototype.querySelector.call(e, t),
       children: (t, e) => [].concat(...t.children).filter(t => t.matches(e)),
       parents(t, e) {
         const i = [];
         let s = t.parentNode;
         for (; s && s.nodeType === Node.ELEMENT_NODE && 3 !== s.nodeType;) s.matches(e) && i.push(s), s = s.parentNode;
         return i
       },
       prev(t, e) {
         let i = t.previousElementSibling;
         for (; i;) {
           if (i.matches(e)) return [i];
           i = i.previousElementSibling
         }
         return []
       },
       next(t, e) {
         let i = t.nextElementSibling;
         for (; i;) {
           if (i.matches(e)) return [i];
           i = i.nextElementSibling
         }
         return []
       },
       focusableChildren(t) {
         const e = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map(t => t + ':not([tabindex^="-"])').join(", ");
         return this.find(e, t).filter(t => !d(t) && h(t))
       }
     },
     X = {
       interval: 5e3,
       keyboard: !0,
       slide: !1,
       pause: "hover",
       wrap: !0,
       touch: !0
     },
     Y = {
       interval: "(number|boolean)",
       keyboard: "boolean",
       slide: "(boolean|string)",
       pause: "(string|boolean)",
       wrap: "boolean",
       touch: "boolean"
     },
     Q = "next",
     G = "prev",
     Z = "left",
     J = "right",
     tt = {
       ArrowLeft: J,
       ArrowRight: Z
     };
   class et extends R {
     constructor(t, e) {
       super(t), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._indicatorsElement = V.findOne(".carousel-indicators", this._element), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent), this._addEventListeners()
     }
     static get Default() {
       return X
     }
     static get NAME() {
       return "carousel"
     }
     next() {
       this._slide(Q)
     }
     nextWhenVisible() {
       !document.hidden && h(this._element) && this.next()
     }
     prev() {
       this._slide(G)
     }
     pause(t) {
       t || (this._isPaused = !0), V.findOne(".carousel-item-next, .carousel-item-prev", this._element) && (r(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
     }
     cycle(t) {
       t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config && this._config.interval && !this._isPaused && (this._updateInterval(), this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
     }
     to(t) {
       this._activeElement = V.findOne(".active.carousel-item", this._element);
       const e = this._getItemIndex(this._activeElement);
       if (t > this._items.length - 1 || t < 0) return;
       if (this._isSliding) return void H.one(this._element, "slid.bs.carousel", () => this.to(t));
       if (e === t) return this.pause(), void this.cycle();
       const i = t > e ? Q : G;
       this._slide(i, this._items[t])
     }
     _getConfig(t) {
       return t = {
         ...X,
         ...K.getDataAttributes(this._element),
         ..."object" == typeof t ? t : {}
       }, c("carousel", t, Y), t
     }
     _handleSwipe() {
       const t = Math.abs(this.touchDeltaX);
       if (t <= 40) return;
       const e = t / this.touchDeltaX;
       this.touchDeltaX = 0, e && this._slide(e > 0 ? J : Z)
     }
     _addEventListeners() {
       this._config.keyboard && H.on(this._element, "keydown.bs.carousel", t => this._keydown(t)), "hover" === this._config.pause && (H.on(this._element, "mouseenter.bs.carousel", t => this.pause(t)), H.on(this._element, "mouseleave.bs.carousel", t => this.cycle(t))), this._config.touch && this._touchSupported && this._addTouchEventListeners()
     }
     _addTouchEventListeners() {
       const t = t => this._pointerEvent && ("pen" === t.pointerType || "touch" === t.pointerType),
         e = e => {
           t(e) ? this.touchStartX = e.clientX : this._pointerEvent || (this.touchStartX = e.touches[0].clientX)
         },
         i = t => {
           this.touchDeltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this.touchStartX
         },
         s = e => {
           t(e) && (this.touchDeltaX = e.clientX - this.touchStartX), this._handleSwipe(), "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(t => this.cycle(t), 500 + this._config.interval))
         };
       V.find(".carousel-item img", this._element).forEach(t => {
         H.on(t, "dragstart.bs.carousel", t => t.preventDefault())
       }), this._pointerEvent ? (H.on(this._element, "pointerdown.bs.carousel", t => e(t)), H.on(this._element, "pointerup.bs.carousel", t => s(t)), this._element.classList.add("pointer-event")) : (H.on(this._element, "touchstart.bs.carousel", t => e(t)), H.on(this._element, "touchmove.bs.carousel", t => i(t)), H.on(this._element, "touchend.bs.carousel", t => s(t)))
     }
     _keydown(t) {
       if (/input|textarea/i.test(t.target.tagName)) return;
       const e = tt[t.key];
       e && (t.preventDefault(), this._slide(e))
     }
     _getItemIndex(t) {
       return this._items = t && t.parentNode ? V.find(".carousel-item", t.parentNode) : [], this._items.indexOf(t)
     }
     _getItemByOrder(t, e) {
       const i = t === Q;
       return y(this._items, e, i, this._config.wrap)
     }
     _triggerSlideEvent(t, e) {
       const i = this._getItemIndex(t),
         s = this._getItemIndex(V.findOne(".active.carousel-item", this._element));
       return H.trigger(this._element, "slide.bs.carousel", {
         relatedTarget: t,
         direction: e,
         from: s,
         to: i
       })
     }
     _setActiveIndicatorElement(t) {
       if (this._indicatorsElement) {
         const e = V.findOne(".active", this._indicatorsElement);
         e.classList.remove("active"), e.removeAttribute("aria-current");
         const i = V.find("[data-bs-target]", this._indicatorsElement);
         for (let e = 0; e < i.length; e++)
           if (Number.parseInt(i[e].getAttribute("data-bs-slide-to"), 10) === this._getItemIndex(t)) {
             i[e].classList.add("active"), i[e].setAttribute("aria-current", "true");
             break
           }
       }
     }
     _updateInterval() {
       const t = this._activeElement || V.findOne(".active.carousel-item", this._element);
       if (!t) return;
       const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
       e ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = e) : this._config.interval = this._config.defaultInterval || this._config.interval
     }
     _slide(t, e) {
       const i = this._directionToOrder(t),
         s = V.findOne(".active.carousel-item", this._element),
         n = this._getItemIndex(s),
         o = e || this._getItemByOrder(i, s),
         r = this._getItemIndex(o),
         a = Boolean(this._interval),
         l = i === Q,
         c = l ? "carousel-item-start" : "carousel-item-end",
         h = l ? "carousel-item-next" : "carousel-item-prev",
         d = this._orderToDirection(i);
       if (o && o.classList.contains("active")) return void(this._isSliding = !1);
       if (this._isSliding) return;
       if (this._triggerSlideEvent(o, d).defaultPrevented) return;
       if (!s || !o) return;
       this._isSliding = !0, a && this.pause(), this._setActiveIndicatorElement(o), this._activeElement = o;
       const u = () => {
         H.trigger(this._element, "slid.bs.carousel", {
           relatedTarget: o,
           direction: d,
           from: n,
           to: r
         })
       };
       if (this._element.classList.contains("slide")) {
         o.classList.add(h), p(o), s.classList.add(c), o.classList.add(c);
         const t = () => {
           o.classList.remove(c, h), o.classList.add("active"), s.classList.remove("active", h, c), this._isSliding = !1, setTimeout(u, 0)
         };
         this._queueCallback(t, s, !0)
       } else s.classList.remove("active"), o.classList.add("active"), this._isSliding = !1, u();
       a && this.cycle()
     }
     _directionToOrder(t) {
       return [J, Z].includes(t) ? m() ? t === Z ? G : Q : t === Z ? Q : G : t
     }
     _orderToDirection(t) {
       return [Q, G].includes(t) ? m() ? t === G ? Z : J : t === G ? J : Z : t
     }
     static carouselInterface(t, e) {
       const i = et.getOrCreateInstance(t, e);
       let {
         _config: s
       } = i;
       "object" == typeof e && (s = {
         ...s,
         ...e
       });
       const n = "string" == typeof e ? e : s.slide;
       if ("number" == typeof e) i.to(e);
       else if ("string" == typeof n) {
         if (void 0 === i[n]) throw new TypeError(`No method named "${n}"`);
         i[n]()
       } else s.interval && s.ride && (i.pause(), i.cycle())
     }
     static jQueryInterface(t) {
       return this.each((function() {
         et.carouselInterface(this, t)
       }))
     }
     static dataApiClickHandler(t) {
       const e = o(this);
       if (!e || !e.classList.contains("carousel")) return;
       const i = {
           ...K.getDataAttributes(e),
           ...K.getDataAttributes(this)
         },
         s = this.getAttribute("data-bs-slide-to");
       s && (i.interval = !1), et.carouselInterface(e, i), s && et.getInstance(e).to(s), t.preventDefault()
     }
   }
   H.on(document, "click.bs.carousel.data-api", "[data-bs-slide], [data-bs-slide-to]", et.dataApiClickHandler), H.on(window, "load.bs.carousel.data-api", () => {
     const t = V.find('[data-bs-ride="carousel"]');
     for (let e = 0, i = t.length; e < i; e++) et.carouselInterface(t[e], et.getInstance(t[e]))
   }), b(et);
   const it = {
       toggle: !0,
       parent: null
     },
     st = {
       toggle: "boolean",
       parent: "(null|element)"
     };
   class nt extends R {
     constructor(t, e) {
       super(t), this._isTransitioning = !1, this._config = this._getConfig(e), this._triggerArray = [];
       const i = V.find('[data-bs-toggle="collapse"]');
       for (let t = 0, e = i.length; t < e; t++) {
         const e = i[t],
           s = n(e),
           o = V.find(s).filter(t => t === this._element);
         null !== s && o.length && (this._selector = s, this._triggerArray.push(e))
       }
       this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle()
     }
     static get Default() {
       return it
     }
     static get NAME() {
       return "collapse"
     }
     toggle() {
       this._isShown() ? this.hide() : this.show()
     }
     show() {
       if (this._isTransitioning || this._isShown()) return;
       let t, e = [];
       if (this._config.parent) {
         const t = V.find(".collapse .collapse", this._config.parent);
         e = V.find(".collapse.show, .collapse.collapsing", this._config.parent).filter(e => !t.includes(e))
       }
       const i = V.findOne(this._selector);
       if (e.length) {
         const s = e.find(t => i !== t);
         if (t = s ? nt.getInstance(s) : null, t && t._isTransitioning) return
       }
       if (H.trigger(this._element, "show.bs.collapse").defaultPrevented) return;
       e.forEach(e => {
         i !== e && nt.getOrCreateInstance(e, {
           toggle: !1
         }).hide(), t || z.set(e, "bs.collapse", null)
       });
       const s = this._getDimension();
       this._element.classList.remove("collapse"), this._element.classList.add("collapsing"), this._element.style[s] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
       const n = "scroll" + (s[0].toUpperCase() + s.slice(1));
       this._queueCallback(() => {
         this._isTransitioning = !1, this._element.classList.remove("collapsing"), this._element.classList.add("collapse", "show"), this._element.style[s] = "", H.trigger(this._element, "shown.bs.collapse")
       }, this._element, !0), this._element.style[s] = this._element[n] + "px"
     }
     hide() {
       if (this._isTransitioning || !this._isShown()) return;
       if (H.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;
       const t = this._getDimension();
       this._element.style[t] = this._element.getBoundingClientRect()[t] + "px", p(this._element), this._element.classList.add("collapsing"), this._element.classList.remove("collapse", "show");
       const e = this._triggerArray.length;
       for (let t = 0; t < e; t++) {
         const e = this._triggerArray[t],
           i = o(e);
         i && !this._isShown(i) && this._addAriaAndCollapsedClass([e], !1)
       }
       this._isTransitioning = !0, this._element.style[t] = "", this._queueCallback(() => {
         this._isTransitioning = !1, this._element.classList.remove("collapsing"), this._element.classList.add("collapse"), H.trigger(this._element, "hidden.bs.collapse")
       }, this._element, !0)
     }
     _isShown(t = this._element) {
       return t.classList.contains("show")
     }
     _getConfig(t) {
       return (t = {
         ...it,
         ...K.getDataAttributes(this._element),
         ...t
       }).toggle = Boolean(t.toggle), t.parent = l(t.parent), c("collapse", t, st), t
     }
     _getDimension() {
       return this._element.classList.contains("collapse-horizontal") ? "width" : "height"
     }
     _initializeChildren() {
       if (!this._config.parent) return;
       const t = V.find(".collapse .collapse", this._config.parent);
       V.find('[data-bs-toggle="collapse"]', this._config.parent).filter(e => !t.includes(e)).forEach(t => {
         const e = o(t);
         e && this._addAriaAndCollapsedClass([t], this._isShown(e))
       })
     }
     _addAriaAndCollapsedClass(t, e) {
       t.length && t.forEach(t => {
         e ? t.classList.remove("collapsed") : t.classList.add("collapsed"), t.setAttribute("aria-expanded", e)
       })
     }
     static jQueryInterface(t) {
       return this.each((function() {
         const e = {};
         "string" == typeof t && /show|hide/.test(t) && (e.toggle = !1);
         const i = nt.getOrCreateInstance(this, e);
         if ("string" == typeof t) {
           if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
           i[t]()
         }
       }))
     }
   }
   H.on(document, "click.bs.collapse.data-api", '[data-bs-toggle="collapse"]', (function(t) {
     ("A" === t.target.tagName || t.delegateTarget && "A" === t.delegateTarget.tagName) && t.preventDefault();
     const e = n(this);
     V.find(e).forEach(t => {
       nt.getOrCreateInstance(t, {
         toggle: !1
       }).toggle()
     })
   })), b(nt);
   const ot = new RegExp("ArrowUp|ArrowDown|Escape"),
     rt = m() ? "top-end" : "top-start",
     at = m() ? "top-start" : "top-end",
     lt = m() ? "bottom-end" : "bottom-start",
     ct = m() ? "bottom-start" : "bottom-end",
     ht = m() ? "left-start" : "right-start",
     dt = m() ? "right-start" : "left-start",
     ut = {
       offset: [0, 2],
       boundary: "clippingParents",
       reference: "toggle",
       display: "dynamic",
       popperConfig: null,
       autoClose: !0
     },
     gt = {
       offset: "(array|string|function)",
       boundary: "(string|element)",
       reference: "(string|element|object)",
       display: "string",
       popperConfig: "(null|object|function)",
       autoClose: "(boolean|string)"
     };
   class pt extends R {
     constructor(t, e) {
       super(t), this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar()
     }
     static get Default() {
       return ut
     }
     static get DefaultType() {
       return gt
     }
     static get NAME() {
       return "dropdown"
     }
     toggle() {
       return this._isShown() ? this.hide() : this.show()
     }
     show() {
       if (d(this._element) || this._isShown(this._menu)) return;
       const t = {
         relatedTarget: this._element
       };
       if (H.trigger(this._element, "show.bs.dropdown", t).defaultPrevented) return;
       const e = pt.getParentFromElement(this._element);
       this._inNavbar ? K.setDataAttribute(this._menu, "popper", "none") : this._createPopper(e), "ontouchstart" in document.documentElement && !e.closest(".navbar-nav") && [].concat(...document.body.children).forEach(t => H.on(t, "mouseover", g)), this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add("show"), this._element.classList.add("show"), H.trigger(this._element, "shown.bs.dropdown", t)
     }
     hide() {
       if (d(this._element) || !this._isShown(this._menu)) return;
       const t = {
         relatedTarget: this._element
       };
       this._completeHide(t)
     }
     dispose() {
       this._popper && this._popper.destroy(), super.dispose()
     }
     update() {
       this._inNavbar = this._detectNavbar(), this._popper && this._popper.update()
     }
     _completeHide(t) {
       H.trigger(this._element, "hide.bs.dropdown", t).defaultPrevented || ("ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach(t => H.off(t, "mouseover", g)), this._popper && this._popper.destroy(), this._menu.classList.remove("show"), this._element.classList.remove("show"), this._element.setAttribute("aria-expanded", "false"), K.removeDataAttribute(this._menu, "popper"), H.trigger(this._element, "hidden.bs.dropdown", t))
     }
     _getConfig(t) {
       if (t = {
           ...this.constructor.Default,
           ...K.getDataAttributes(this._element),
           ...t
         }, c("dropdown", t, this.constructor.DefaultType), "object" == typeof t.reference && !a(t.reference) && "function" != typeof t.reference.getBoundingClientRect) throw new TypeError("dropdown".toUpperCase() + ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.');
       return t
     }
     _createPopper(t) {
       if (void 0 === i) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
       let e = this._element;
       "parent" === this._config.reference ? e = t : a(this._config.reference) ? e = l(this._config.reference) : "object" == typeof this._config.reference && (e = this._config.reference);
       const s = this._getPopperConfig(),
         n = s.modifiers.find(t => "applyStyles" === t.name && !1 === t.enabled);
       this._popper = i.createPopper(e, this._menu, s), n && K.setDataAttribute(this._menu, "popper", "static")
     }
     _isShown(t = this._element) {
       return t.classList.contains("show")
     }
     _getMenuElement() {
       return V.next(this._element, ".dropdown-menu")[0]
     }
     _getPlacement() {
       const t = this._element.parentNode;
       if (t.classList.contains("dropend")) return ht;
       if (t.classList.contains("dropstart")) return dt;
       const e = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
       return t.classList.contains("dropup") ? e ? at : rt : e ? ct : lt
     }
     _detectNavbar() {
       return null !== this._element.closest(".navbar")
     }
     _getOffset() {
       const {
         offset: t
       } = this._config;
       return "string" == typeof t ? t.split(",").map(t => Number.parseInt(t, 10)) : "function" == typeof t ? e => t(e, this._element) : t
     }
     _getPopperConfig() {
       const t = {
         placement: this._getPlacement(),
         modifiers: [{
           name: "preventOverflow",
           options: {
             boundary: this._config.boundary
           }
         }, {
           name: "offset",
           options: {
             offset: this._getOffset()
           }
         }]
       };
       return "static" === this._config.display && (t.modifiers = [{
         name: "applyStyles",
         enabled: !1
       }]), {
         ...t,
         ..."function" == typeof this._config.popperConfig ? this._config.popperConfig(t) : this._config.popperConfig
       }
     }
     _selectMenuItem({
       key: t,
       target: e
     }) {
       const i = V.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter(h);
       i.length && y(i, e, "ArrowDown" === t, !i.includes(e)).focus()
     }
     static jQueryInterface(t) {
       return this.each((function() {
         const e = pt.getOrCreateInstance(this, t);
         if ("string" == typeof t) {
           if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
           e[t]()
         }
       }))
     }
     static clearMenus(t) {
       if (t && (2 === t.button || "keyup" === t.type && "Tab" !== t.key)) return;
       const e = V.find('[data-bs-toggle="dropdown"]');
       for (let i = 0, s = e.length; i < s; i++) {
         const s = pt.getInstance(e[i]);
         if (!s || !1 === s._config.autoClose) continue;
         if (!s._isShown()) continue;
         const n = {
           relatedTarget: s._element
         };
         if (t) {
           const e = t.composedPath(),
             i = e.includes(s._menu);
           if (e.includes(s._element) || "inside" === s._config.autoClose && !i || "outside" === s._config.autoClose && i) continue;
           if (s._menu.contains(t.target) && ("keyup" === t.type && "Tab" === t.key || /input|select|option|textarea|form/i.test(t.target.tagName))) continue;
           "click" === t.type && (n.clickEvent = t)
         }
         s._completeHide(n)
       }
     }
     static getParentFromElement(t) {
       return o(t) || t.parentNode
     }
     static dataApiKeydownHandler(t) {
       if (/input|textarea/i.test(t.target.tagName) ? "Space" === t.key || "Escape" !== t.key && ("ArrowDown" !== t.key && "ArrowUp" !== t.key || t.target.closest(".dropdown-menu")) : !ot.test(t.key)) return;
       const e = this.classList.contains("show");
       if (!e && "Escape" === t.key) return;
       if (t.preventDefault(), t.stopPropagation(), d(this)) return;
       const i = this.matches('[data-bs-toggle="dropdown"]') ? this : V.prev(this, '[data-bs-toggle="dropdown"]')[0],
         s = pt.getOrCreateInstance(i);
       if ("Escape" !== t.key) return "ArrowUp" === t.key || "ArrowDown" === t.key ? (e || s.show(), void s._selectMenuItem(t)) : void(e && "Space" !== t.key || pt.clearMenus());
       s.hide()
     }
   }
   H.on(document, "keydown.bs.dropdown.data-api", '[data-bs-toggle="dropdown"]', pt.dataApiKeydownHandler), H.on(document, "keydown.bs.dropdown.data-api", ".dropdown-menu", pt.dataApiKeydownHandler), H.on(document, "click.bs.dropdown.data-api", pt.clearMenus), H.on(document, "keyup.bs.dropdown.data-api", pt.clearMenus), H.on(document, "click.bs.dropdown.data-api", '[data-bs-toggle="dropdown"]', (function(t) {
     t.preventDefault(), pt.getOrCreateInstance(this).toggle()
   })), b(pt);
   class ft {
     constructor() {
       this._element = document.body
     }
     getWidth() {
       const t = document.documentElement.clientWidth;
       return Math.abs(window.innerWidth - t)
     }
     hide() {
       const t = this.getWidth();
       this._disableOverFlow(), this._setElementAttributes(this._element, "paddingRight", e => e + t), this._setElementAttributes(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", "paddingRight", e => e + t), this._setElementAttributes(".sticky-top", "marginRight", e => e - t)
     }
     _disableOverFlow() {
       this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden"
     }
     _setElementAttributes(t, e, i) {
       const s = this.getWidth();
       this._applyManipulationCallback(t, t => {
         if (t !== this._element && window.innerWidth > t.clientWidth + s) return;
         this._saveInitialAttribute(t, e);
         const n = window.getComputedStyle(t)[e];
         t.style[e] = i(Number.parseFloat(n)) + "px"
       })
     }
     reset() {
       this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, "paddingRight"), this._resetElementAttributes(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", "paddingRight"), this._resetElementAttributes(".sticky-top", "marginRight")
     }
     _saveInitialAttribute(t, e) {
       const i = t.style[e];
       i && K.setDataAttribute(t, e, i)
     }
     _resetElementAttributes(t, e) {
       this._applyManipulationCallback(t, t => {
         const i = K.getDataAttribute(t, e);
         void 0 === i ? t.style.removeProperty(e) : (K.removeDataAttribute(t, e), t.style[e] = i)
       })
     }
     _applyManipulationCallback(t, e) {
       a(t) ? e(t) : V.find(t, this._element).forEach(e)
     }
     isOverflowing() {
       return this.getWidth() > 0
     }
   }
   const _t = {
       className: "modal-backdrop",
       isVisible: !0,
       isAnimated: !1,
       rootElement: "body",
       clickCallback: null
     },
     mt = {
       className: "string",
       isVisible: "boolean",
       isAnimated: "boolean",
       rootElement: "(element|string)",
       clickCallback: "(function|null)"
     };
   class bt {
     constructor(t) {
       this._config = this._getConfig(t), this._isAppended = !1, this._element = null
     }
     show(t) {
       this._config.isVisible ? (this._append(), this._config.isAnimated && p(this._getElement()), this._getElement().classList.add("show"), this._emulateAnimation(() => {
         v(t)
       })) : v(t)
     }
     hide(t) {
       this._config.isVisible ? (this._getElement().classList.remove("show"), this._emulateAnimation(() => {
         this.dispose(), v(t)
       })) : v(t)
     }
     _getElement() {
       if (!this._element) {
         const t = document.createElement("div");
         t.className = this._config.className, this._config.isAnimated && t.classList.add("fade"), this._element = t
       }
       return this._element
     }
     _getConfig(t) {
       return (t = {
         ..._t,
         ..."object" == typeof t ? t : {}
       }).rootElement = l(t.rootElement), c("backdrop", t, mt), t
     }
     _append() {
       this._isAppended || (this._config.rootElement.append(this._getElement()), H.on(this._getElement(), "mousedown.bs.backdrop", () => {
         v(this._config.clickCallback)
       }), this._isAppended = !0)
     }
     dispose() {
       this._isAppended && (H.off(this._element, "mousedown.bs.backdrop"), this._element.remove(), this._isAppended = !1)
     }
     _emulateAnimation(t) {
       w(t, this._getElement(), this._config.isAnimated)
     }
   }
   const vt = {
       trapElement: null,
       autofocus: !0
     },
     wt = {
       trapElement: "element",
       autofocus: "boolean"
     };
   class yt {
     constructor(t) {
       this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null
     }
     activate() {
       const {
         trapElement: t,
         autofocus: e
       } = this._config;
       this._isActive || (e && t.focus(), H.off(document, ".bs.focustrap"), H.on(document, "focusin.bs.focustrap", t => this._handleFocusin(t)), H.on(document, "keydown.tab.bs.focustrap", t => this._handleKeydown(t)), this._isActive = !0)
     }
     deactivate() {
       this._isActive && (this._isActive = !1, H.off(document, ".bs.focustrap"))
     }
     _handleFocusin(t) {
       const {
         target: e
       } = t, {
         trapElement: i
       } = this._config;
       if (e === document || e === i || i.contains(e)) return;
       const s = V.focusableChildren(i);
       0 === s.length ? i.focus() : "backward" === this._lastTabNavDirection ? s[s.length - 1].focus() : s[0].focus()
     }
     _handleKeydown(t) {
       "Tab" === t.key && (this._lastTabNavDirection = t.shiftKey ? "backward" : "forward")
     }
     _getConfig(t) {
       return t = {
         ...vt,
         ..."object" == typeof t ? t : {}
       }, c("focustrap", t, wt), t
     }
   }
   const Et = {
       backdrop: !0,
       keyboard: !0,
       focus: !0
     },
     At = {
       backdrop: "(boolean|string)",
       keyboard: "boolean",
       focus: "boolean"
     };
   class Tt extends R {
     constructor(t, e) {
       super(t), this._config = this._getConfig(e), this._dialog = V.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollBar = new ft
     }
     static get Default() {
       return Et
     }
     static get NAME() {
       return "modal"
     }
     toggle(t) {
       return this._isShown ? this.hide() : this.show(t)
     }
     show(t) {
       this._isShown || this._isTransitioning || H.trigger(this._element, "show.bs.modal", {
         relatedTarget: t
       }).defaultPrevented || (this._isShown = !0, this._isAnimated() && (this._isTransitioning = !0), this._scrollBar.hide(), document.body.classList.add("modal-open"), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), H.on(this._dialog, "mousedown.dismiss.bs.modal", () => {
         H.one(this._element, "mouseup.dismiss.bs.modal", t => {
           t.target === this._element && (this._ignoreBackdropClick = !0)
         })
       }), this._showBackdrop(() => this._showElement(t)))
     }
     hide() {
       if (!this._isShown || this._isTransitioning) return;
       if (H.trigger(this._element, "hide.bs.modal").defaultPrevented) return;
       this._isShown = !1;
       const t = this._isAnimated();
       t && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), this._focustrap.deactivate(), this._element.classList.remove("show"), H.off(this._element, "click.dismiss.bs.modal"), H.off(this._dialog, "mousedown.dismiss.bs.modal"), this._queueCallback(() => this._hideModal(), this._element, t)
     }
     dispose() {
       [window, this._dialog].forEach(t => H.off(t, ".bs.modal")), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
     }
     handleUpdate() {
       this._adjustDialog()
     }
     _initializeBackDrop() {
       return new bt({
         isVisible: Boolean(this._config.backdrop),
         isAnimated: this._isAnimated()
       })
     }
     _initializeFocusTrap() {
       return new yt({
         trapElement: this._element
       })
     }
     _getConfig(t) {
       return t = {
         ...Et,
         ...K.getDataAttributes(this._element),
         ..."object" == typeof t ? t : {}
       }, c("modal", t, At), t
     }
     _showElement(t) {
       const e = this._isAnimated(),
         i = V.findOne(".modal-body", this._dialog);
       this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0, i && (i.scrollTop = 0), e && p(this._element), this._element.classList.add("show"), this._queueCallback(() => {
         this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, H.trigger(this._element, "shown.bs.modal", {
           relatedTarget: t
         })
       }, this._dialog, e)
     }
     _setEscapeEvent() {
       this._isShown ? H.on(this._element, "keydown.dismiss.bs.modal", t => {
         this._config.keyboard && "Escape" === t.key ? (t.preventDefault(), this.hide()) : this._config.keyboard || "Escape" !== t.key || this._triggerBackdropTransition()
       }) : H.off(this._element, "keydown.dismiss.bs.modal")
     }
     _setResizeEvent() {
       this._isShown ? H.on(window, "resize.bs.modal", () => this._adjustDialog()) : H.off(window, "resize.bs.modal")
     }
     _hideModal() {
       this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide(() => {
         document.body.classList.remove("modal-open"), this._resetAdjustments(), this._scrollBar.reset(), H.trigger(this._element, "hidden.bs.modal")
       })
     }
     _showBackdrop(t) {
       H.on(this._element, "click.dismiss.bs.modal", t => {
         this._ignoreBackdropClick ? this._ignoreBackdropClick = !1 : t.target === t.currentTarget && (!0 === this._config.backdrop ? this.hide() : "static" === this._config.backdrop && this._triggerBackdropTransition())
       }), this._backdrop.show(t)
     }
     _isAnimated() {
       return this._element.classList.contains("fade")
     }
     _triggerBackdropTransition() {
       if (H.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented) return;
       const {
         classList: t,
         scrollHeight: e,
         style: i
       } = this._element, s = e > document.documentElement.clientHeight;
       !s && "hidden" === i.overflowY || t.contains("modal-static") || (s || (i.overflowY = "hidden"), t.add("modal-static"), this._queueCallback(() => {
         t.remove("modal-static"), s || this._queueCallback(() => {
           i.overflowY = ""
         }, this._dialog)
       }, this._dialog), this._element.focus())
     }
     _adjustDialog() {
       const t = this._element.scrollHeight > document.documentElement.clientHeight,
         e = this._scrollBar.getWidth(),
         i = e > 0;
       (!i && t && !m() || i && !t && m()) && (this._element.style.paddingLeft = e + "px"), (i && !t && !m() || !i && t && m()) && (this._element.style.paddingRight = e + "px")
     }
     _resetAdjustments() {
       this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
     }
     static jQueryInterface(t, e) {
       return this.each((function() {
         const i = Tt.getOrCreateInstance(this, t);
         if ("string" == typeof t) {
           if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
           i[t](e)
         }
       }))
     }
   }
   H.on(document, "click.bs.modal.data-api", '[data-bs-toggle="modal"]', (function(t) {
     const e = o(this);
     ["A", "AREA"].includes(this.tagName) && t.preventDefault(), H.one(e, "show.bs.modal", t => {
       t.defaultPrevented || H.one(e, "hidden.bs.modal", () => {
         h(this) && this.focus()
       })
     });
     const i = V.findOne(".modal.show");
     i && Tt.getInstance(i).hide(), Tt.getOrCreateInstance(e).toggle(this)
   })), F(Tt), b(Tt);
   const Ct = {
       backdrop: !0,
       keyboard: !0,
       scroll: !1
     },
     kt = {
       backdrop: "boolean",
       keyboard: "boolean",
       scroll: "boolean"
     };
   class Lt extends R {
     constructor(t, e) {
       super(t), this._config = this._getConfig(e), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners()
     }
     static get NAME() {
       return "offcanvas"
     }
     static get Default() {
       return Ct
     }
     toggle(t) {
       return this._isShown ? this.hide() : this.show(t)
     }
     show(t) {
       this._isShown || H.trigger(this._element, "show.bs.offcanvas", {
         relatedTarget: t
       }).defaultPrevented || (this._isShown = !0, this._element.style.visibility = "visible", this._backdrop.show(), this._config.scroll || (new ft).hide(), this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add("show"), this._queueCallback(() => {
         this._config.scroll || this._focustrap.activate(), H.trigger(this._element, "shown.bs.offcanvas", {
           relatedTarget: t
         })
       }, this._element, !0))
     }
     hide() {
       this._isShown && (H.trigger(this._element, "hide.bs.offcanvas").defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.remove("show"), this._backdrop.hide(), this._queueCallback(() => {
         this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._element.style.visibility = "hidden", this._config.scroll || (new ft).reset(), H.trigger(this._element, "hidden.bs.offcanvas")
       }, this._element, !0)))
     }
     dispose() {
       this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
     }
     _getConfig(t) {
       return t = {
         ...Ct,
         ...K.getDataAttributes(this._element),
         ..."object" == typeof t ? t : {}
       }, c("offcanvas", t, kt), t
     }
     _initializeBackDrop() {
       return new bt({
         className: "offcanvas-backdrop",
         isVisible: this._config.backdrop,
         isAnimated: !0,
         rootElement: this._element.parentNode,
         clickCallback: () => this.hide()
       })
     }
     _initializeFocusTrap() {
       return new yt({
         trapElement: this._element
       })
     }
     _addEventListeners() {
       H.on(this._element, "keydown.dismiss.bs.offcanvas", t => {
         this._config.keyboard && "Escape" === t.key && this.hide()
       })
     }
     static jQueryInterface(t) {
       return this.each((function() {
         const e = Lt.getOrCreateInstance(this, t);
         if ("string" == typeof t) {
           if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
           e[t](this)
         }
       }))
     }
   }
   H.on(document, "click.bs.offcanvas.data-api", '[data-bs-toggle="offcanvas"]', (function(t) {
     const e = o(this);
     if (["A", "AREA"].includes(this.tagName) && t.preventDefault(), d(this)) return;
     H.one(e, "hidden.bs.offcanvas", () => {
       h(this) && this.focus()
     });
     const i = V.findOne(".offcanvas.show");
     i && i !== e && Lt.getInstance(i).hide(), Lt.getOrCreateInstance(e).toggle(this)
   })), H.on(window, "load.bs.offcanvas.data-api", () => V.find(".offcanvas.show").forEach(t => Lt.getOrCreateInstance(t).show())), F(Lt), b(Lt);
   const St = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
     Ot = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i,
     Nt = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
     Dt = (t, e) => {
       const i = t.nodeName.toLowerCase();
       if (e.includes(i)) return !St.has(i) || Boolean(Ot.test(t.nodeValue) || Nt.test(t.nodeValue));
       const s = e.filter(t => t instanceof RegExp);
       for (let t = 0, e = s.length; t < e; t++)
         if (s[t].test(i)) return !0;
       return !1
     };

   function It(t, e, i) {
     if (!t.length) return t;
     if (i && "function" == typeof i) return i(t);
     const s = (new window.DOMParser).parseFromString(t, "text/html"),
       n = Object.keys(e),
       o = [].concat(...s.body.querySelectorAll("*"));
     for (let t = 0, i = o.length; t < i; t++) {
       const i = o[t],
         s = i.nodeName.toLowerCase();
       if (!n.includes(s)) {
         i.remove();
         continue
       }
       const r = [].concat(...i.attributes),
         a = [].concat(e["*"] || [], e[s] || []);
       r.forEach(t => {
         Dt(t, a) || i.removeAttribute(t.nodeName)
       })
     }
     return s.body.innerHTML
   }
   const Pt = new Set(["sanitize", "allowList", "sanitizeFn"]),
     xt = {
       animation: "boolean",
       template: "string",
       title: "(string|element|function)",
       trigger: "string",
       delay: "(number|object)",
       html: "boolean",
       selector: "(string|boolean)",
       placement: "(string|function)",
       offset: "(array|string|function)",
       container: "(string|element|boolean)",
       fallbackPlacements: "array",
       boundary: "(string|element)",
       customClass: "(string|function)",
       sanitize: "boolean",
       sanitizeFn: "(null|function)",
       allowList: "object",
       popperConfig: "(null|object|function)"
     },
     Mt = {
       AUTO: "auto",
       TOP: "top",
       RIGHT: m() ? "left" : "right",
       BOTTOM: "bottom",
       LEFT: m() ? "right" : "left"
     },
     jt = {
       animation: !0,
       template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
       trigger: "hover focus",
       title: "",
       delay: 0,
       html: !1,
       selector: !1,
       placement: "top",
       offset: [0, 0],
       container: !1,
       fallbackPlacements: ["top", "right", "bottom", "left"],
       boundary: "clippingParents",
       customClass: "",
       sanitize: !0,
       sanitizeFn: null,
       allowList: {
         "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
         a: ["target", "href", "title", "rel"],
         area: [],
         b: [],
         br: [],
         col: [],
         code: [],
         div: [],
         em: [],
         hr: [],
         h1: [],
         h2: [],
         h3: [],
         h4: [],
         h5: [],
         h6: [],
         i: [],
         img: ["src", "srcset", "alt", "title", "width", "height"],
         li: [],
         ol: [],
         p: [],
         pre: [],
         s: [],
         small: [],
         span: [],
         sub: [],
         sup: [],
         strong: [],
         u: [],
         ul: []
       },
       popperConfig: null
     },
     Ht = {
       HIDE: "hide.bs.tooltip",
       HIDDEN: "hidden.bs.tooltip",
       SHOW: "show.bs.tooltip",
       SHOWN: "shown.bs.tooltip",
       INSERTED: "inserted.bs.tooltip",
       CLICK: "click.bs.tooltip",
       FOCUSIN: "focusin.bs.tooltip",
       FOCUSOUT: "focusout.bs.tooltip",
       MOUSEENTER: "mouseenter.bs.tooltip",
       MOUSELEAVE: "mouseleave.bs.tooltip"
     };
   class Bt extends R {
     constructor(t, e) {
       if (void 0 === i) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
       super(t), this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this._config = this._getConfig(e), this.tip = null, this._setListeners()
     }
     static get Default() {
       return jt
     }
     static get NAME() {
       return "tooltip"
     }
     static get Event() {
       return Ht
     }
     static get DefaultType() {
       return xt
     }
     enable() {
       this._isEnabled = !0
     }
     disable() {
       this._isEnabled = !1
     }
     toggleEnabled() {
       this._isEnabled = !this._isEnabled
     }
     toggle(t) {
       if (this._isEnabled)
         if (t) {
           const e = this._initializeOnDelegatedTarget(t);
           e._activeTrigger.click = !e._activeTrigger.click, e._isWithActiveTrigger() ? e._enter(null, e) : e._leave(null, e)
         } else {
           if (this.getTipElement().classList.contains("show")) return void this._leave(null, this);
           this._enter(null, this)
         }
     }
     dispose() {
       clearTimeout(this._timeout), H.off(this._element.closest(".modal"), "hide.bs.modal", this._hideModalHandler), this.tip && this.tip.remove(), this._disposePopper(), super.dispose()
     }
     show() {
       if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
       if (!this.isWithContent() || !this._isEnabled) return;
       const t = H.trigger(this._element, this.constructor.Event.SHOW),
         e = u(this._element),
         s = null === e ? this._element.ownerDocument.documentElement.contains(this._element) : e.contains(this._element);
       if (t.defaultPrevented || !s) return;
       "tooltip" === this.constructor.NAME && this.tip && this.getTitle() !== this.tip.querySelector(".tooltip-inner").innerHTML && (this._disposePopper(), this.tip.remove(), this.tip = null);
       const n = this.getTipElement(),
         o = (t => {
           do {
             t += Math.floor(1e6 * Math.random())
           } while (document.getElementById(t));
           return t
         })(this.constructor.NAME);
       n.setAttribute("id", o), this._element.setAttribute("aria-describedby", o), this._config.animation && n.classList.add("fade");
       const r = "function" == typeof this._config.placement ? this._config.placement.call(this, n, this._element) : this._config.placement,
         a = this._getAttachment(r);
       this._addAttachmentClass(a);
       const {
         container: l
       } = this._config;
       z.set(n, this.constructor.DATA_KEY, this), this._element.ownerDocument.documentElement.contains(this.tip) || (l.append(n), H.trigger(this._element, this.constructor.Event.INSERTED)), this._popper ? this._popper.update() : this._popper = i.createPopper(this._element, n, this._getPopperConfig(a)), n.classList.add("show");
       const c = this._resolvePossibleFunction(this._config.customClass);
       c && n.classList.add(...c.split(" ")), "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach(t => {
         H.on(t, "mouseover", g)
       });
       const h = this.tip.classList.contains("fade");
       this._queueCallback(() => {
         const t = this._hoverState;
         this._hoverState = null, H.trigger(this._element, this.constructor.Event.SHOWN), "out" === t && this._leave(null, this)
       }, this.tip, h)
     }
     hide() {
       if (!this._popper) return;
       const t = this.getTipElement();
       if (H.trigger(this._element, this.constructor.Event.HIDE).defaultPrevented) return;
       t.classList.remove("show"), "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach(t => H.off(t, "mouseover", g)), this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1;
       const e = this.tip.classList.contains("fade");
       this._queueCallback(() => {
         this._isWithActiveTrigger() || ("show" !== this._hoverState && t.remove(), this._cleanTipClass(), this._element.removeAttribute("aria-describedby"), H.trigger(this._element, this.constructor.Event.HIDDEN), this._disposePopper())
       }, this.tip, e), this._hoverState = ""
     }
     update() {
       null !== this._popper && this._popper.update()
     }
     isWithContent() {
       return Boolean(this.getTitle())
     }
     getTipElement() {
       if (this.tip) return this.tip;
       const t = document.createElement("div");
       t.innerHTML = this._config.template;
       const e = t.children[0];
       return this.setContent(e), e.classList.remove("fade", "show"), this.tip = e, this.tip
     }
     setContent(t) {
       this._sanitizeAndSetContent(t, this.getTitle(), ".tooltip-inner")
     }
     _sanitizeAndSetContent(t, e, i) {
       const s = V.findOne(i, t);
       e || !s ? this.setElementContent(s, e) : s.remove()
     }
     setElementContent(t, e) {
       if (null !== t) return a(e) ? (e = l(e), void(this._config.html ? e.parentNode !== t && (t.innerHTML = "", t.append(e)) : t.textContent = e.textContent)) : void(this._config.html ? (this._config.sanitize && (e = It(e, this._config.allowList, this._config.sanitizeFn)), t.innerHTML = e) : t.textContent = e)
     }
     getTitle() {
       const t = this._element.getAttribute("data-bs-original-title") || this._config.title;
       return this._resolvePossibleFunction(t)
     }
     updateAttachment(t) {
       return "right" === t ? "end" : "left" === t ? "start" : t
     }
     _initializeOnDelegatedTarget(t, e) {
       return e || this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig())
     }
     _getOffset() {
       const {
         offset: t
       } = this._config;
       return "string" == typeof t ? t.split(",").map(t => Number.parseInt(t, 10)) : "function" == typeof t ? e => t(e, this._element) : t
     }
     _resolvePossibleFunction(t) {
       return "function" == typeof t ? t.call(this._element) : t
     }
     _getPopperConfig(t) {
       const e = {
         placement: t,
         modifiers: [{
           name: "flip",
           options: {
             fallbackPlacements: this._config.fallbackPlacements
           }
         }, {
           name: "offset",
           options: {
             offset: this._getOffset()
           }
         }, {
           name: "preventOverflow",
           options: {
             boundary: this._config.boundary
           }
         }, {
           name: "arrow",
           options: {
             element: `.${this.constructor.NAME}-arrow`
           }
         }, {
           name: "onChange",
           enabled: !0,
           phase: "afterWrite",
           fn: t => this._handlePopperPlacementChange(t)
         }],
         onFirstUpdate: t => {
           t.options.placement !== t.placement && this._handlePopperPlacementChange(t)
         }
       };
       return {
         ...e,
         ..."function" == typeof this._config.popperConfig ? this._config.popperConfig(e) : this._config.popperConfig
       }
     }
     _addAttachmentClass(t) {
       this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(t)}`)
     }
     _getAttachment(t) {
       return Mt[t.toUpperCase()]
     }
     _setListeners() {
       this._config.trigger.split(" ").forEach(t => {
         if ("click" === t) H.on(this._element, this.constructor.Event.CLICK, this._config.selector, t => this.toggle(t));
         else if ("manual" !== t) {
           const e = "hover" === t ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN,
             i = "hover" === t ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
           H.on(this._element, e, this._config.selector, t => this._enter(t)), H.on(this._element, i, this._config.selector, t => this._leave(t))
         }
       }), this._hideModalHandler = () => {
         this._element && this.hide()
       }, H.on(this._element.closest(".modal"), "hide.bs.modal", this._hideModalHandler), this._config.selector ? this._config = {
         ...this._config,
         trigger: "manual",
         selector: ""
       } : this._fixTitle()
     }
     _fixTitle() {
       const t = this._element.getAttribute("title"),
         e = typeof this._element.getAttribute("data-bs-original-title");
       (t || "string" !== e) && (this._element.setAttribute("data-bs-original-title", t || ""), !t || this._element.getAttribute("aria-label") || this._element.textContent || this._element.setAttribute("aria-label", t), this._element.setAttribute("title", ""))
     }
     _enter(t, e) {
       e = this._initializeOnDelegatedTarget(t, e), t && (e._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !0), e.getTipElement().classList.contains("show") || "show" === e._hoverState ? e._hoverState = "show" : (clearTimeout(e._timeout), e._hoverState = "show", e._config.delay && e._config.delay.show ? e._timeout = setTimeout(() => {
         "show" === e._hoverState && e.show()
       }, e._config.delay.show) : e.show())
     }
     _leave(t, e) {
       e = this._initializeOnDelegatedTarget(t, e), t && (e._activeTrigger["focusout" === t.type ? "focus" : "hover"] = e._element.contains(t.relatedTarget)), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = "out", e._config.delay && e._config.delay.hide ? e._timeout = setTimeout(() => {
         "out" === e._hoverState && e.hide()
       }, e._config.delay.hide) : e.hide())
     }
     _isWithActiveTrigger() {
       for (const t in this._activeTrigger)
         if (this._activeTrigger[t]) return !0;
       return !1
     }
     _getConfig(t) {
       const e = K.getDataAttributes(this._element);
       return Object.keys(e).forEach(t => {
         Pt.has(t) && delete e[t]
       }), (t = {
         ...this.constructor.Default,
         ...e,
         ..."object" == typeof t && t ? t : {}
       }).container = !1 === t.container ? document.body : l(t.container), "number" == typeof t.delay && (t.delay = {
         show: t.delay,
         hide: t.delay
       }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), c("tooltip", t, this.constructor.DefaultType), t.sanitize && (t.template = It(t.template, t.allowList, t.sanitizeFn)), t
     }
     _getDelegateConfig() {
       const t = {};
       for (const e in this._config) this.constructor.Default[e] !== this._config[e] && (t[e] = this._config[e]);
       return t
     }
     _cleanTipClass() {
       const t = this.getTipElement(),
         e = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, "g"),
         i = t.getAttribute("class").match(e);
       null !== i && i.length > 0 && i.map(t => t.trim()).forEach(e => t.classList.remove(e))
     }
     _getBasicClassPrefix() {
       return "bs-tooltip"
     }
     _handlePopperPlacementChange(t) {
       const {
         state: e
       } = t;
       e && (this.tip = e.elements.popper, this._cleanTipClass(), this._addAttachmentClass(this._getAttachment(e.placement)))
     }
     _disposePopper() {
       this._popper && (this._popper.destroy(), this._popper = null)
     }
     static jQueryInterface(t) {
       return this.each((function() {
         const e = Bt.getOrCreateInstance(this, t);
         if ("string" == typeof t) {
           if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
           e[t]()
         }
       }))
     }
   }
   b(Bt);
   const zt = {
       ...Bt.Default,
       placement: "right",
       offset: [0, 8],
       trigger: "click",
       content: "",
       template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
     },
     Rt = {
       ...Bt.DefaultType,
       content: "(string|element|function)"
     },
     Ft = {
       HIDE: "hide.bs.popover",
       HIDDEN: "hidden.bs.popover",
       SHOW: "show.bs.popover",
       SHOWN: "shown.bs.popover",
       INSERTED: "inserted.bs.popover",
       CLICK: "click.bs.popover",
       FOCUSIN: "focusin.bs.popover",
       FOCUSOUT: "focusout.bs.popover",
       MOUSEENTER: "mouseenter.bs.popover",
       MOUSELEAVE: "mouseleave.bs.popover"
     };
   class qt extends Bt {
     static get Default() {
       return zt
     }
     static get NAME() {
       return "popover"
     }
     static get Event() {
       return Ft
     }
     static get DefaultType() {
       return Rt
     }
     isWithContent() {
       return this.getTitle() || this._getContent()
     }
     setContent(t) {
       this._sanitizeAndSetContent(t, this.getTitle(), ".popover-header"), this._sanitizeAndSetContent(t, this._getContent(), ".popover-body")
     }
     _getContent() {
       return this._resolvePossibleFunction(this._config.content)
     }
     _getBasicClassPrefix() {
       return "bs-popover"
     }
     static jQueryInterface(t) {
       return this.each((function() {
         const e = qt.getOrCreateInstance(this, t);
         if ("string" == typeof t) {
           if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
           e[t]()
         }
       }))
     }
   }
   b(qt);
   const Wt = {
       offset: 10,
       method: "auto",
       target: ""
     },
     $t = {
       offset: "number",
       method: "string",
       target: "(string|element)"
     },
     Ut = ".nav-link, .list-group-item, .dropdown-item";
   class Kt extends R {
     constructor(t, e) {
       super(t), this._scrollElement = "BODY" === this._element.tagName ? window : this._element, this._config = this._getConfig(e), this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, H.on(this._scrollElement, "scroll.bs.scrollspy", () => this._process()), this.refresh(), this._process()
     }
     static get Default() {
       return Wt
     }
     static get NAME() {
       return "scrollspy"
     }
     refresh() {
       const t = this._scrollElement === this._scrollElement.window ? "offset" : "position",
         e = "auto" === this._config.method ? t : this._config.method,
         i = "position" === e ? this._getScrollTop() : 0;
       this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), V.find(Ut, this._config.target).map(t => {
         const s = n(t),
           o = s ? V.findOne(s) : null;
         if (o) {
           const t = o.getBoundingClientRect();
           if (t.width || t.height) return [K[e](o).top + i, s]
         }
         return null
       }).filter(t => t).sort((t, e) => t[0] - e[0]).forEach(t => {
         this._offsets.push(t[0]), this._targets.push(t[1])
       })
     }
     dispose() {
       H.off(this._scrollElement, ".bs.scrollspy"), super.dispose()
     }
     _getConfig(t) {
       return (t = {
         ...Wt,
         ...K.getDataAttributes(this._element),
         ..."object" == typeof t && t ? t : {}
       }).target = l(t.target) || document.documentElement, c("scrollspy", t, $t), t
     }
     _getScrollTop() {
       return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
     }
     _getScrollHeight() {
       return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
     }
     _getOffsetHeight() {
       return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
     }
     _process() {
       const t = this._getScrollTop() + this._config.offset,
         e = this._getScrollHeight(),
         i = this._config.offset + e - this._getOffsetHeight();
       if (this._scrollHeight !== e && this.refresh(), t >= i) {
         const t = this._targets[this._targets.length - 1];
         this._activeTarget !== t && this._activate(t)
       } else {
         if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
         for (let e = this._offsets.length; e--;) this._activeTarget !== this._targets[e] && t >= this._offsets[e] && (void 0 === this._offsets[e + 1] || t < this._offsets[e + 1]) && this._activate(this._targets[e])
       }
     }
     _activate(t) {
       this._activeTarget = t, this._clear();
       const e = Ut.split(",").map(e => `${e}[data-bs-target="${t}"],${e}[href="${t}"]`),
         i = V.findOne(e.join(","), this._config.target);
       i.classList.add("active"), i.classList.contains("dropdown-item") ? V.findOne(".dropdown-toggle", i.closest(".dropdown")).classList.add("active") : V.parents(i, ".nav, .list-group").forEach(t => {
         V.prev(t, ".nav-link, .list-group-item").forEach(t => t.classList.add("active")), V.prev(t, ".nav-item").forEach(t => {
           V.children(t, ".nav-link").forEach(t => t.classList.add("active"))
         })
       }), H.trigger(this._scrollElement, "activate.bs.scrollspy", {
         relatedTarget: t
       })
     }
     _clear() {
       V.find(Ut, this._config.target).filter(t => t.classList.contains("active")).forEach(t => t.classList.remove("active"))
     }
     static jQueryInterface(t) {
       return this.each((function() {
         const e = Kt.getOrCreateInstance(this, t);
         if ("string" == typeof t) {
           if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
           e[t]()
         }
       }))
     }
   }
   H.on(window, "load.bs.scrollspy.data-api", () => {
     V.find('[data-bs-spy="scroll"]').forEach(t => new Kt(t))
   }), b(Kt);
   class Vt extends R {
     static get NAME() {
       return "tab"
     }
     show() {
       if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains("active")) return;
       let t;
       const e = o(this._element),
         i = this._element.closest(".nav, .list-group");
       if (i) {
         const e = "UL" === i.nodeName || "OL" === i.nodeName ? ":scope > li > .active" : ".active";
         t = V.find(e, i), t = t[t.length - 1]
       }
       const s = t ? H.trigger(t, "hide.bs.tab", {
         relatedTarget: this._element
       }) : null;
       if (H.trigger(this._element, "show.bs.tab", {
           relatedTarget: t
         }).defaultPrevented || null !== s && s.defaultPrevented) return;
       this._activate(this._element, i);
       const n = () => {
         H.trigger(t, "hidden.bs.tab", {
           relatedTarget: this._element
         }), H.trigger(this._element, "shown.bs.tab", {
           relatedTarget: t
         })
       };
       e ? this._activate(e, e.parentNode, n) : n()
     }
     _activate(t, e, i) {
       const s = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? V.children(e, ".active") : V.find(":scope > li > .active", e))[0],
         n = i && s && s.classList.contains("fade"),
         o = () => this._transitionComplete(t, s, i);
       s && n ? (s.classList.remove("show"), this._queueCallback(o, t, !0)) : o()
     }
     _transitionComplete(t, e, i) {
       if (e) {
         e.classList.remove("active");
         const t = V.findOne(":scope > .dropdown-menu .active", e.parentNode);
         t && t.classList.remove("active"), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
       }
       t.classList.add("active"), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), p(t), t.classList.contains("fade") && t.classList.add("show");
       let s = t.parentNode;
       if (s && "LI" === s.nodeName && (s = s.parentNode), s && s.classList.contains("dropdown-menu")) {
         const e = t.closest(".dropdown");
         e && V.find(".dropdown-toggle", e).forEach(t => t.classList.add("active")), t.setAttribute("aria-expanded", !0)
       }
       i && i()
     }
     static jQueryInterface(t) {
       return this.each((function() {
         const e = Vt.getOrCreateInstance(this);
         if ("string" == typeof t) {
           if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
           e[t]()
         }
       }))
     }
   }
   H.on(document, "click.bs.tab.data-api", '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', (function(t) {
     ["A", "AREA"].includes(this.tagName) && t.preventDefault(), d(this) || Vt.getOrCreateInstance(this).show()
   })), b(Vt);
   const Xt = {
       animation: "boolean",
       autohide: "boolean",
       delay: "number"
     },
     Yt = {
       animation: !0,
       autohide: !0,
       delay: 5e3
     };
   class Qt extends R {
     constructor(t, e) {
       super(t), this._config = this._getConfig(e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners()
     }
     static get DefaultType() {
       return Xt
     }
     static get Default() {
       return Yt
     }
     static get NAME() {
       return "toast"
     }
     show() {
       H.trigger(this._element, "show.bs.toast").defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove("hide"), p(this._element), this._element.classList.add("show"), this._element.classList.add("showing"), this._queueCallback(() => {
         this._element.classList.remove("showing"), H.trigger(this._element, "shown.bs.toast"), this._maybeScheduleHide()
       }, this._element, this._config.animation))
     }
     hide() {
       this._element.classList.contains("show") && (H.trigger(this._element, "hide.bs.toast").defaultPrevented || (this._element.classList.add("showing"), this._queueCallback(() => {
         this._element.classList.add("hide"), this._element.classList.remove("showing"), this._element.classList.remove("show"), H.trigger(this._element, "hidden.bs.toast")
       }, this._element, this._config.animation)))
     }
     dispose() {
       this._clearTimeout(), this._element.classList.contains("show") && this._element.classList.remove("show"), super.dispose()
     }
     _getConfig(t) {
       return t = {
         ...Yt,
         ...K.getDataAttributes(this._element),
         ..."object" == typeof t && t ? t : {}
       }, c("toast", t, this.constructor.DefaultType), t
     }
     _maybeScheduleHide() {
       this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
         this.hide()
       }, this._config.delay)))
     }
     _onInteraction(t, e) {
       switch (t.type) {
         case "mouseover":
         case "mouseout":
           this._hasMouseInteraction = e;
           break;
         case "focusin":
         case "focusout":
           this._hasKeyboardInteraction = e
       }
       if (e) return void this._clearTimeout();
       const i = t.relatedTarget;
       this._element === i || this._element.contains(i) || this._maybeScheduleHide()
     }
     _setListeners() {
       H.on(this._element, "mouseover.bs.toast", t => this._onInteraction(t, !0)), H.on(this._element, "mouseout.bs.toast", t => this._onInteraction(t, !1)), H.on(this._element, "focusin.bs.toast", t => this._onInteraction(t, !0)), H.on(this._element, "focusout.bs.toast", t => this._onInteraction(t, !1))
     }
     _clearTimeout() {
       clearTimeout(this._timeout), this._timeout = null
     }
     static jQueryInterface(t) {
       return this.each((function() {
         const e = Qt.getOrCreateInstance(this, t);
         if ("string" == typeof t) {
           if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
           e[t](this)
         }
       }))
     }
   }
   return F(Qt), b(Qt), {
     Alert: q,
     Button: W,
     Carousel: et,
     Collapse: nt,
     Dropdown: pt,
     Modal: Tt,
     Offcanvas: Lt,
     Popover: qt,
     ScrollSpy: Kt,
     Tab: Vt,
     Toast: Qt,
     Tooltip: Bt
   }
 }));
 /*! * Splide.js * Version: Enabled Modified * License  : MIT * Copyright: Naotoshi Fujita */
 ! function() {
   "use strict";
   var t = {
       d: function(n, e) {
         for (var i in e) t.o(e, i) && !t.o(n, i) && Object.defineProperty(n, i, {
           enumerable: !0,
           get: e[i]
         })
       },
       o: function(t, n) {
         return Object.prototype.hasOwnProperty.call(t, n)
       },
       r: function(t) {
         "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
           value: "Module"
         }), Object.defineProperty(t, "__esModule", {
           value: !0
         })
       }
     },
     n = {};
   t.r(n), t.d(n, {
     CREATED: function() {
       return R
     },
     DESTROYED: function() {
       return X
     },
     IDLE: function() {
       return F
     },
     MOUNTED: function() {
       return B
     },
     MOVING: function() {
       return G
     }
   });

   function e() {
     return (e = Object.assign || function(t) {
       for (var n = 1; n < arguments.length; n++) {
         var e = arguments[n];
         for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
       }
       return t
     }).apply(this, arguments)
   }
   var i = Object.keys;

   function o(t, n) {
     i(t).some((function(e, i) {
       return n(t[e], e, i)
     }))
   }

   function r(t) {
     return i(t).map((function(n) {
       return t[n]
     }))
   }

   function s(t) {
     return "object" == typeof t
   }

   function a(t, n) {
     var i = e({}, t);
     return o(n, (function(t, n) {
       s(t) ? (s(i[n]) || (i[n] = {}), i[n] = a(i[n], t)) : i[n] = t
     })), i
   }

   function u(t) {
     return Array.isArray(t) ? t : [t]
   }

   function c(t, n, e) {
     return Math.min(Math.max(t, n > e ? e : n), n > e ? n : e)
   }

   function d(t, n) {
     var e = 0;
     return t.replace(/%s/g, (function() {
       return u(n)[e++]
     }))
   }

   function f(t) {
     var n = typeof t;
     return "number" === n && t > 0 ? parseFloat(t) + "px" : "string" === n ? t : ""
   }

   function l(t) {
     return t < 10 ? "0" + t : t
   }

   function h(t, n) {
     if ("string" == typeof n) {
       var e = m("div", {});
       E(e, {
         position: "absolute",
         width: n
       }), w(t, e), n = e.clientWidth, b(e)
     }
     return +n || 0
   }

   function p(t, n) {
     return t ? t.querySelector(n.split(" ")[0]) : null
   }

   function g(t, n) {
     return v(t, n)[0]
   }

   function v(t, n) {
     return t ? r(t.children).filter((function(t) {
       return P(t, n.split(" ")[0]) || t.tagName === n
     })) : []
   }

   function m(t, n) {
     var e = document.createElement(t);
     return o(n, (function(t, n) {
       return C(e, n, t)
     })), e
   }

   function y(t) {
     var n = m("div", {});
     return n.innerHTML = t, n.firstChild
   }

   function b(t) {
     u(t).forEach((function(t) {
       if (t) {
         var n = t.parentElement;
         n && n.removeChild(t)
       }
     }))
   }

   function w(t, n) {
     t && t.appendChild(n)
   }

   function x(t, n) {
     if (t && n) {
       var e = n.parentElement;
       e && e.insertBefore(t, n)
     }
   }

   function E(t, n) {
     t && o(n, (function(n, e) {
       null !== n && (t.style[e] = n)
     }))
   }

   function _(t, n, e) {
     t && u(n).forEach((function(n) {
       n && t.classList[e ? "remove" : "add"](n)
     }))
   }

   function k(t, n) {
     _(t, n, !1)
   }

   function S(t, n) {
     _(t, n, !0)
   }

   function P(t, n) {
     return !!t && t.classList.contains(n)
   }

   function C(t, n, e) {
     t && t.setAttribute(n, e)
   }

   function z(t, n) {
     return t ? t.getAttribute(n) : ""
   }

   function I(t, n) {
     u(n).forEach((function(n) {
       u(t).forEach((function(t) {
         return t && t.removeAttribute(n)
       }))
     }))
   }

   function M(t) {
     return t.getBoundingClientRect()
   }
   var T = "slide",
     A = "loop",
     O = "fade",
     L = function(t, n) {
       var e, i;
       return {
         mount: function() {
           e = n.Elements.list, t.on("transitionend", (function(t) {
             t.target === e && i && i()
           }), e)
         },
         start: function(o, r, s, a, u) {
           var c = t.options,
             d = n.Controller.edgeIndex,
             f = c.speed;
           i = u, t.is(T) && (0 === s && r >= d || s >= d && 0 === r) && (f = c.rewindSpeed || f), E(e, {
             transition: "transform " + f + "ms " + c.easing,
             transform: "translate(" + a.x + "px," + a.y + "px)"
           })
         }
       }
     },
     W = function(t, n) {
       function e(e) {
         var i = t.options;
         E(n.Elements.slides[e], {
           transition: "opacity " + i.speed + "ms " + i.easing
         })
       }
       return {
         mount: function() {
           e(t.index)
         },
         start: function(t, i, o, r, s) {
           var a = n.Elements.track;
           E(a, {
             height: f(a.clientHeight)
           }), e(i), setTimeout((function() {
             s(), E(a, {
               height: ""
             })
           }))
         }
       }
     };

   function H(t) {
     console.error("[SPLIDE] " + t)
   }

   function j(t, n) {
     if (!t) throw new Error(n)
   }
   var q = "splide",
     D = {
       active: "is-active",
       visible: "is-visible",
       loading: "is-loading"
     },
     N = {
       type: "slide",
       rewind: !1,
       speed: 400,
       rewindSpeed: 0,
       waitForTransition: !0,
       width: 0,
       height: 0,
       fixedWidth: 0,
       fixedHeight: 0,
       heightRatio: 0,
       autoWidth: !1,
       autoHeight: !1,
       perPage: 1,
       perMove: 0,
       clones: 0,
       start: 0,
       focus: !1,
       gap: 0,
       padding: 0,
       arrows: !0,
       arrowPath: "",
       pagination: !0,
       autoplay: !1,
       interval: 5e3,
       pauseOnHover: !0,
       pauseOnFocus: !0,
       resetProgress: !0,
       lazyLoad: !1,
       preloadPages: 1,
       easing: "cubic-bezier(.42,.65,.27,.99)",
       keyboard: "global",
       drag: !0,
       dragAngleThreshold: 30,
       swipeDistanceThreshold: 150,
       flickVelocityThreshold: .6,
       flickPower: 600,
       flickMaxPages: 1,
       direction: "ltr",
       cover: !1,
       accessibility: !0,
       slideFocus: !0,
       isNavigation: !1,
       trimSpace: !0,
       updateOnMove: !1,
       throttle: 100,
       destroy: !1,
       breakpoints: !1,
       classes: {
         root: q,
         slider: q + "__slider",
         track: q + "__track",
         list: q + "__list",
         slide: q + "__slide",
         container: q + "__slide__container",
         arrows: q + "__arrows",
         arrow: q + "__arrow",
         prev: q + "__arrow--prev",
         next: q + "__arrow--next",
         pagination: q + "__pagination",
         page: q + "__pagination__page",
         clone: q + "__slide--clone",
         progress: q + "__progress",
         bar: q + "__progress__bar",
         autoplay: q + "__autoplay",
         play: q + "__play",
         pause: q + "__pause",
         spinner: q + "__spinner",
         sr: q + "__sr"
       },
       i18n: {
         prev: "Previous slide",
         next: "Next slide",
         first: "Go to first slide",
         last: "Go to last slide",
         slideX: "Go to slide %s",
         pageX: "Go to page %s",
         play: "Start autoplay",
         pause: "Pause autoplay"
       }
     },
     R = 1,
     B = 2,
     F = 3,
     G = 4,
     X = 5;

   function V(t, n) {
     for (var e = 0; e < n.length; e++) {
       var i = n[e];
       i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
     }
   }
   var U = function() {
       function t(t, e, i) {
         var o;
         void 0 === e && (e = {}), void 0 === i && (i = {}), this.root = t instanceof Element ? t : document.querySelector(t), j(this.root, "An invalid element/selector was given."), this.Components = null, this.Event = function() {
           var t = [];

           function n(t) {
             t.elm && t.elm.removeEventListener(t.event, t.handler, t.options)
           }
           return {
             on: function(n, e, i, o) {
               void 0 === i && (i = null), void 0 === o && (o = {}), n.split(" ").forEach((function(n) {
                 i && i.addEventListener(n, e, o), t.push({
                   event: n,
                   handler: e,
                   elm: i,
                   options: o
                 })
               }))
             },
             off: function(e, i) {
               void 0 === i && (i = null), e.split(" ").forEach((function(e) {
                 t = t.filter((function(t) {
                   return !t || t.event !== e || t.elm !== i || (n(t), !1)
                 }))
               }))
             },
             emit: function(n) {
               for (var e = arguments.length, i = new Array(e > 1 ? e - 1 : 0), o = 1; o < e; o++) i[o - 1] = arguments[o];
               t.forEach((function(t) {
                 t.elm || t.event.split(".")[0] !== n || t.handler.apply(t, i)
               }))
             },
             destroy: function() {
               t.forEach(n), t = []
             }
           }
         }(), this.State = (o = R, {
           set: function(t) {
             o = t
           },
           is: function(t) {
             return t === o
           }
         }), this.STATES = n, this._o = a(N, e), this._i = 0, this._c = i, this._e = {}, this._t = null
       }
       var e, i, s, u = t.prototype;
       return u.mount = function(t, n) {
         var e = this;
         void 0 === t && (t = this._e), void 0 === n && (n = this._t), this.State.set(R), this._e = t, this._t = n, this.Components = function(t, n, e) {
           var i = {};
           return o(n, (function(n, e) {
             i[e] = n(t, i, e.toLowerCase())
           })), e || (e = t.is(O) ? W : L), i.Transition = e(t, i), i
         }(this, a(this._c, t), n);
         try {
           o(this.Components, (function(t, n) {
             var i = t.required;
             void 0 === i || i ? t.mount && t.mount() : delete e.Components[n]
           }))
         } catch (t) {
           return void H(t.message)
         }
         var i = this.State;
         return i.set(B), o(this.Components, (function(t) {
           t.mounted && t.mounted()
         })), this.emit("mounted"), i.set(F), this.emit("ready"), E(this.root, {
           visibility: "visible"
         }), this.on("move drag", (function() {
           return i.set(G)
         })).on("moved dragged", (function() {
           return i.set(F)
         })), this
       }, u.sync = function(t) {
         return this.sibling = t, this
       }, u.on = function(t, n, e, i) {
         return void 0 === e && (e = null), void 0 === i && (i = {}), this.Event.on(t, n, e, i), this
       }, u.off = function(t, n) {
         return void 0 === n && (n = null), this.Event.off(t, n), this
       }, u.emit = function(t) {
         for (var n, e = arguments.length, i = new Array(e > 1 ? e - 1 : 0), o = 1; o < e; o++) i[o - 1] = arguments[o];
         return (n = this.Event).emit.apply(n, [t].concat(i)), this
       }, u.go = function(t, n) {
         return void 0 === n && (n = this.options.waitForTransition), (this.State.is(F) || this.State.is(G) && !n) && this.Components.Controller.go(t, !1), this
       }, u.is = function(t) {
         return t === this._o.type
       }, u.add = function(t, n) {
         return void 0 === n && (n = -1), this.Components.Elements.add(t, n, this.refresh.bind(this)), this
       }, u.remove = function(t) {
         return this.Components.Elements.remove(t), this.refresh(), this
       }, u.refresh = function() {
         return this.emit("refresh:before").emit("refresh").emit("resize"), this
       }, u.destroy = function(t) {
         var n = this;
         if (void 0 === t && (t = !0), !this.State.is(R)) return r(this.Components).reverse().forEach((function(n) {
           n.destroy && n.destroy(t)
         })), this.emit("destroy", t), this.Event.destroy(), this.State.set(X), this;
         this.on("ready", (function() {
           return n.destroy(t)
         }))
       }, e = t, (i = [{
         key: "index",
         get: function() {
           return this._i
         },
         set: function(t) {
           this._i = parseInt(t)
         }
       }, {
         key: "length",
         get: function() {
           return this.Components.Elements.length
         }
       }, {
         key: "options",
         get: function() {
           return this._o
         },
         set: function(t) {
           var n = this.State.is(R);
           n || this.emit("update"), this._o = a(this._o, t), n || this.emit("updated", this._o)
         }
       }, {
         key: "classes",
         get: function() {
           return this._o.classes
         }
       }, {
         key: "i18n",
         get: function() {
           return this._o.i18n
         }
       }]) && V(e.prototype, i), s && V(e, s), t
     }(),
     Y = function(t) {
       var n = z(t.root, "data-splide");
       if (n) try {
         t.options = JSON.parse(n)
       } catch (t) {
         H(t.message)
       }
       return {
         mount: function() {
           t.State.is(R) && (t.index = t.options.start)
         }
       }
     },
     J = "rtl",
     K = "ttb",
     Q = "update.slide",
     Z = function(t, n) {
       var e = t.root,
         i = t.classes,
         s = [];
       if (!e.id) {
         window.splide = window.splide || {};
         var a = window.splide.uid || 0;
         window.splide.uid = ++a, e.id = "splide" + l(a)
       }
       var u = {
         mount: function() {
           var n = this;
           this.init(), t.on("refresh", (function() {
             n.destroy(), n.init()
           })).on("updated", (function() {
             S(e, c()), k(e, c())
           }))
         },
         destroy: function() {
           s.forEach((function(t) {
             t.destroy()
           })), s = [], S(e, c())
         },
         init: function() {
           var t = this;
           ! function() {
             u.slider = g(e, i.slider), u.track = p(e, "." + i.track), u.list = g(u.track, i.list), j(u.track && u.list, "Track or list was not found."), u.slides = v(u.list, i.slide);
             var t = d(i.arrows);
             u.arrows = {
               prev: p(t, "." + i.prev),
               next: p(t, "." + i.next)
             };
             var n = d(i.autoplay);
             u.bar = p(d(i.progress), "." + i.bar), u.play = p(n, "." + i.play), u.pause = p(n, "." + i.pause), u.track.id = u.track.id || e.id + "-track", u.list.id = u.list.id || e.id + "-list"
           }(), k(e, c()), this.slides.forEach((function(n, e) {
             t.register(n, e, -1)
           }))
         },
         register: function(n, e, i) {
           var o = function(t, n, e, i) {
             var o = t.options.updateOnMove,
               s = "ready.slide updated.slide resized.slide moved.slide" + (o ? " move.slide" : ""),
               a = {
                 slide: i,
                 index: n,
                 realIndex: e,
                 container: g(i, t.classes.container),
                 isClone: e > -1,
                 mount: function() {
                   var r = this;
                   this.isClone || (i.id = t.root.id + "-slide" + l(n + 1)), t.on(s, (function() {
                     return r.update()
                   })).on(Q, c).on("click", (function() {
                     return t.emit("click", r)
                   }), i), o && t.on("move.slide", (function(t) {
                     t === e && u(!0, !1)
                   })), E(i, {
                     display: ""
                   }), this.styles = z(i, "style") || ""
                 },
                 destroy: function() {
                   t.off(s).off(Q).off("click", i), S(i, r(D)), c(), I(this.container, "style")
                 },
                 update: function() {
                   u(this.isActive(), !1), u(this.isVisible(), !0)
                 },
                 isActive: function() {
                   return t.index === n
                 },
                 isVisible: function() {
                   var n = this.isActive();
                   if (t.is(O) || n) return n;
                   var e = Math.ceil,
                     o = M(t.Components.Elements.track),
                     r = M(i);
                   return t.options.direction === K ? o.top <= r.top && r.bottom <= e(o.bottom) : o.left <= r.left && r.right <= e(o.right)
                 },
                 isWithin: function(e, i) {
                   var o = Math.abs(e - n);
                   return t.is(T) || this.isClone || (o = Math.min(o, t.length - o)), o < i
                 }
               };

             function u(n, e) {
               var o = e ? "visible" : "active",
                 r = D[o];
               n ? (k(i, r), t.emit("" + o, a)) : P(i, r) && (S(i, r), t.emit(e ? "hidden" : "inactive", a))
             }

             function c() {
               C(i, "style", a.styles)
             }
             return a
           }(t, e, i, n);
           o.mount(), s.push(o)
         },
         getSlide: function(t) {
           return s.filter((function(n) {
             return n.index === t
           }))[0]
         },
         getSlides: function(t) {
           return t ? s : s.filter((function(t) {
             return !t.isClone
           }))
         },
         getSlidesByPage: function(e) {
           var i = n.Controller.toIndex(e),
             o = t.options,
             r = !1 !== o.focus ? 1 : o.perPage;
           return s.filter((function(t) {
             var n = t.index;
             return i <= n && n < i + r
           }))
         },
         add: function(t, n, e) {
           if ("string" == typeof t && (t = y(t)), t instanceof Element) {
             var i = this.slides[n];
             E(t, {
                 display: "none"
               }), i ? (x(t, i), this.slides.splice(n, 0, t)) : (w(this.list, t), this.slides.push(t)),
               function(t, n) {
                 var e = t.querySelectorAll("img"),
                   i = e.length;
                 if (i) {
                   var r = 0;
                   o(e, (function(t) {
                     t.onload = t.onerror = function() {
                       ++r === i && n()
                     }
                   }))
                 } else n()
               }(t, (function() {
                 e && e(t)
               }))
           }
         },
         remove: function(t) {
           b(this.slides.splice(t, 1)[0])
         },
         each: function(t) {
           s.forEach(t)
         },
         get length() {
           return this.slides.length
         },
         get total() {
           return s.length
         }
       };

       function c() {
         var n = i.root,
           e = t.options;
         return [n + "--" + e.type, n + "--" + e.direction, e.drag ? n + "--draggable" : "", e.isNavigation ? n + "--nav" : "", D.active]
       }

       function d(t) {
         return g(e, t) || g(u.slider, t)
       }
       return u
     },
     $ = Math.floor,
     tt = function(t, n) {
       var e, i, o = {
         mount: function() {
           e = t.options, i = t.is(A), t.on("move", (function(n) {
             t.index = n
           })).on("updated refresh", (function(n) {
             e = n || e, t.index = c(t.index, 0, o.edgeIndex)
           }))
         },
         go: function(t, e) {
           var i = this.trim(this.parse(t));
           n.Track.go(i, this.rewind(i), e)
         },
         parse: function(n) {
           var i = t.index,
             r = String(n).match(/([+\-<>]+)(\d+)?/),
             s = r ? r[1] : "",
             a = r ? parseInt(r[2]) : 0;
           switch (s) {
             case "+":
               i += a || 1;
               break;
             case "-":
               i -= a || 1;
               break;
             case ">":
             case "<":
               i = function(t, n, i) {
                 if (t > -1) return o.toIndex(t);
                 var r = e.perMove,
                   s = i ? -1 : 1;
                 if (r) return n + r * s;
                 return o.toIndex(o.toPage(n) + s)
               }(a, i, "<" === s);
               break;
             default:
               i = parseInt(n)
           }
           return i
         },
         toIndex: function(n) {
           if (r()) return n;
           var i = t.length,
             o = e.perPage,
             s = n * o;
           return i - o <= (s -= (this.pageLength * o - i) * $(s / i)) && s < i && (s = i - o), s
         },
         toPage: function(n) {
           if (r()) return n;
           var i = t.length,
             o = e.perPage;
           return $(i - o <= n && n < i ? (i - 1) / o : n / o)
         },
         trim: function(t) {
           return i || (t = e.rewind ? this.rewind(t) : c(t, 0, this.edgeIndex)), t
         },
         rewind: function(t) {
           var n = this.edgeIndex;
           if (i) {
             for (; t > n;) t -= n + 1;
             for (; t < 0;) t += n + 1
           } else t > n ? t = 0 : t < 0 && (t = n);
           return t
         },
         isRtl: function() {
           return e.direction === J
         },
         get pageLength() {
           var n = t.length;
           return r() ? n : Math.ceil(n / e.perPage)
         },
         get edgeIndex() {
           var n = t.length;
           return n ? r() || e.isNavigation || i ? n - 1 : n - e.perPage : 0
         },
         get prevIndex() {
           var n = t.index - 1;
           return (i || e.rewind) && (n = this.rewind(n)), n > -1 ? n : -1
         },
         get nextIndex() {
           var n = t.index + 1;
           return (i || e.rewind) && (n = this.rewind(n)), t.index < n && n <= this.edgeIndex || 0 === n ? n : -1
         }
       };

       function r() {
         return !1 !== e.focus
       }
       return o
     },
     nt = Math.abs,
     et = function(t, n) {
       var e, i, o, r = t.options.direction === K,
         s = t.is(O),
         a = t.options.direction === J,
         u = !1,
         d = a ? 1 : -1,
         f = {
           sign: d,
           mount: function() {
             i = n.Elements, e = n.Layout, o = i.list
           },
           mounted: function() {
             var n = this;
             s || (this.jump(0), t.on("mounted resize updated", (function() {
               n.jump(t.index)
             })))
           },
           go: function(e, i, o) {
             var r = h(e),
               a = t.index;
             t.State.is(G) && u || (u = e !== i, o || t.emit("move", i, a, e), Math.abs(r - this.position) >= 1 || s ? n.Transition.start(e, i, a, this.toCoord(r), (function() {
               l(e, i, a, o)
             })) : e !== a && "move" === t.options.trimSpace ? n.Controller.go(e + e - a, o) : l(e, i, a, o))
           },
           jump: function(t) {
             this.translate(h(t))
           },
           translate: function(t) {
             E(o, {
               transform: "translate" + (r ? "Y" : "X") + "(" + t + "px)"
             })
           },
           cancel: function() {
             t.is(A) ? this.shift() : this.translate(this.position), E(o, {
               transition: ""
             })
           },
           shift: function() {
             var n = nt(this.position),
               e = nt(this.toPosition(0)),
               i = nt(this.toPosition(t.length)),
               o = i - e;
             n < e ? n += o : n > i && (n -= o), this.translate(d * n)
           },
           trim: function(n) {
             return !t.options.trimSpace || t.is(A) ? n : c(n, d * (e.totalSize() - e.size - e.gap), 0)
           },
           toIndex: function(t) {
             var n = this,
               e = 0,
               o = 1 / 0;
             return i.getSlides(!0).forEach((function(i) {
               var r = i.index,
                 s = nt(n.toPosition(r) - t);
               s < o && (o = s, e = r)
             })), e
           },
           toCoord: function(t) {
             return {
               x: r ? 0 : t,
               y: r ? t : 0
             }
           },
           toPosition: function(t) {
             var n = e.totalSize(t) - e.slideSize(t) - e.gap;
             return d * (n + this.offset(t))
           },
           offset: function(n) {
             var i = t.options.focus,
               o = e.slideSize(n);
             return "center" === i ? -(e.size - o) / 2 : -(parseInt(i) || 0) * (o + e.gap)
           },
           get position() {
             var t = r ? "top" : a ? "right" : "left";
             return M(o)[t] - (M(i.track)[t] - e.padding[t] * d)
           }
         };

       function l(n, e, i, r) {
         E(o, {
           transition: ""
         }), u = !1, s || f.jump(e), r || t.emit("moved", e, i, n)
       }

       function h(t) {
         return f.trim(f.toPosition(t))
       }
       return f
     },
     it = function(t, n) {
       var e = [],
         i = 0,
         o = n.Elements,
         r = {
           mount: function() {
             var n = this;
             t.is(A) && (s(), t.on("refresh:before", (function() {
               n.destroy()
             })).on("refresh", s).on("resize", (function() {
               i !== a() && (n.destroy(), t.refresh())
             })))
           },
           destroy: function() {
             b(e), e = []
           },
           get clones() {
             return e
           },
           get length() {
             return e.length
           }
         };

       function s() {
         r.destroy(),
           function(t) {
             var n = o.length,
               i = o.register;
             if (n) {
               for (var r = o.slides; r.length < t;) r = r.concat(r);
               r.slice(0, t).forEach((function(t, r) {
                 var s = u(t);
                 w(o.list, s), e.push(s), i(s, r + n, r % n)
               })), r.slice(-t).forEach((function(o, s) {
                 var a = u(o);
                 x(a, r[0]), e.push(a), i(a, s - t, (n + s - t % n) % n)
               }))
             }
           }(i = a())
       }

       function a() {
         var n = t.options;
         if (n.clones) return n.clones;
         var e = n.autoWidth || n.autoHeight ? o.length : n.perPage,
           i = n.direction === K ? "Height" : "Width",
           r = h(t.root, n["fixed" + i]);
         return r && (e = Math.ceil(o.track["client" + i] / r)), e * (n.drag ? n.flickMaxPages + 1 : 1)
       }

       function u(n) {
         var e = n.cloneNode(!0);
         return k(e, t.classes.clone), I(e, "id"), e
       }
       return r
     };

   function ot(t, n) {
     var e;
     return function() {
       e || (e = setTimeout((function() {
         t(), e = null
       }), n))
     }
   }
   var rt = function(t, n) {
       var e, o, r = n.Elements,
         s = t.options.direction === K,
         a = (e = {
           mount: function() {
             t.on("resize load", ot((function() {
               t.emit("resize")
             }), t.options.throttle), window).on("resize", c).on("updated refresh", u), u(), this.totalSize = s ? this.totalHeight : this.totalWidth, this.slideSize = s ? this.slideHeight : this.slideWidth
           },
           destroy: function() {
             I([r.list, r.track], "style")
           },
           get size() {
             return s ? this.height : this.width
           }
         }, o = s ? function(t, n) {
           var e, i, o = n.Elements,
             r = t.root;
           return {
             margin: "marginBottom",
             init: function() {
               this.resize()
             },
             resize: function() {
               i = t.options, e = o.track, this.gap = h(r, i.gap);
               var n = i.padding,
                 s = h(r, n.top || n),
                 a = h(r, n.bottom || n);
               this.padding = {
                 top: s,
                 bottom: a
               }, E(e, {
                 paddingTop: f(s),
                 paddingBottom: f(a)
               })
             },
             totalHeight: function(n) {
               void 0 === n && (n = t.length - 1);
               var e = o.getSlide(n);
               return e ? M(e.slide).bottom - M(o.list).top + this.gap : 0
             },
             slideWidth: function() {
               return h(r, i.fixedWidth || this.width)
             },
             slideHeight: function(t) {
               if (i.autoHeight) {
                 var n = o.getSlide(t);
                 return n ? n.slide.offsetHeight : 0
               }
               var e = i.fixedHeight || (this.height + this.gap) / i.perPage - this.gap;
               return h(r, e)
             },
             get width() {
               return e.clientWidth
             },
             get height() {
               var t = i.height || this.width * i.heightRatio;
               return j(t, '"height" or "heightRatio" is missing.'), h(r, t) - this.padding.top - this.padding.bottom
             }
           }
         }(t, n) : function(t, n) {
           var e, i = n.Elements,
             o = t.root,
             r = t.options;
           return {
             margin: "margin" + (r.direction === J ? "Left" : "Right"),
             height: 0,
             init: function() {
               this.resize()
             },
             resize: function() {
               r = t.options, e = i.track, this.gap = h(o, r.gap);
               var n = r.padding,
                 s = h(o, n.left || n),
                 a = h(o, n.right || n);
               this.padding = {
                 left: s,
                 right: a
               }, E(e, {
                 paddingLeft: f(s),
                 paddingRight: f(a)
               })
             },
             totalWidth: function(n) {
               void 0 === n && (n = t.length - 1);
               var e = i.getSlide(n),
                 o = 0;
               if (e) {
                 var s = M(e.slide),
                   a = M(i.list);
                 o = r.direction === J ? a.right - s.left : s.right - a.left, o += this.gap
               }
               return o
             },
             slideWidth: function(t) {
               if (r.autoWidth) {
                 var n = i.getSlide(t);
                 return n ? n.slide.offsetWidth : 0
               }
               var e = r.fixedWidth || (this.width + this.gap) / r.perPage - this.gap;
               return h(o, e)
             },
             slideHeight: function() {
               var t = r.height || r.fixedHeight || this.width * r.heightRatio;
               return h(o, t)
             },
             get width() {
               return e.clientWidth - this.padding.left - this.padding.right
             }
           }
         }(t, n), i(o).forEach((function(t) {
           e[t] || Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t))
         })), e);

       function u() {
         a.init(), E(t.root, {
           maxWidth: f(t.options.width)
         }), r.each((function(t) {
           t.slide.style[a.margin] = f(a.gap)
         })), c()
       }

       function c() {
         var n = t.options;
         a.resize(), E(r.track, {
           height: f(a.height)
         });
         var e = n.autoHeight ? null : f(a.slideHeight());
         r.each((function(t) {
           E(t.container, {
             height: e
           }), E(t.slide, {
             width: n.autoWidth ? null : f(a.slideWidth(t.index)),
             height: t.container ? null : e
           })
         })), t.emit("resized")
       }
       return a
     },
     st = Math.abs,
     at = function(t, n) {
       var e, i, r, s, a = n.Track,
         u = n.Controller,
         d = t.options.direction === K,
         f = d ? "y" : "x",
         l = {
           disabled: !1,
           mount: function() {
             var e = this,
               i = n.Elements,
               r = i.track;
             t.on("touchstart mousedown", h, r).on("touchmove mousemove", g, r, {
               passive: !1
             }).on("touchend touchcancel mouseleave mouseup dragend", v, r).on("mounted refresh", (function() {
               o(i.list.querySelectorAll("img, a"), (function(n) {
                 t.off("dragstart", n).on("dragstart", (function(t) {
                   t.preventDefault()
                 }), n, {
                   passive: !1
                 })
               }))
             })).on("mounted updated", (function() {
               e.disabled = !t.options.drag
             }))
           }
         };

       function h(t) {
         l.disabled || s || p(t)
       }

       function p(t) {
         e = a.toCoord(a.position), i = m(t, {}), r = i
       }

       function g(n) {
         if (i)
           if (r = m(n, i), s) {
             if (n.cancelable && n.preventDefault(), !t.is(O)) {
               var o = e[f] + r.offset[f];
               a.translate(function(n) {
                 if (t.is(T)) {
                   var e = a.sign,
                     i = e * a.trim(a.toPosition(0)),
                     o = e * a.trim(a.toPosition(u.edgeIndex));
                   (n *= e) < i ? n = i - 7 * Math.log(i - n) : n > o && (n = o + 7 * Math.log(n - o)), n *= e
                 }
                 return n
               }(o))
             }
           } else(function(n) {
             var e = n.offset;
             if (t.State.is(G) && t.options.waitForTransition) return !1;
             var i = 180 * Math.atan(st(e.y) / st(e.x)) / Math.PI;
             d && (i = 90 - i);
             return i < t.options.dragAngleThreshold
           })(r) && (t.emit("drag", i), s = !0, a.cancel(), p(n))
       }

       function v() {
         i = null, s && (t.emit("dragged", r), function(e) {
           var i = e.velocity[f],
             o = st(i);
           if (o > 0) {
             var r = t.options,
               s = t.index,
               d = i < 0 ? -1 : 1,
               l = s;
             if (!t.is(O)) {
               var h = a.position;
               o > r.flickVelocityThreshold && st(e.offset[f]) < r.swipeDistanceThreshold && (h += d * Math.min(o * r.flickPower, n.Layout.size * (r.flickMaxPages || 1))), l = a.toIndex(h)
             }
             l === s && o > .1 && (l = s + d * a.sign), t.is(T) && (l = c(l, 0, u.edgeIndex)), u.go(l, r.isNavigation)
           }
         }(r), s = !1)
       }

       function m(t, n) {
         var e = t.timeStamp,
           i = t.touches,
           o = i ? i[0] : t,
           r = o.clientX,
           s = o.clientY,
           a = n.to || {},
           u = a.x,
           c = void 0 === u ? r : u,
           d = a.y,
           f = {
             x: r - c,
             y: s - (void 0 === d ? s : d)
           },
           l = e - (n.time || 0);
         return {
           to: {
             x: r,
             y: s
           },
           offset: f,
           time: e,
           velocity: {
             x: f.x / l,
             y: f.y / l
           }
         }
       }
       return l
     },
     ut = function(t, n) {
       var e = !1;

       function i(t) {
         e && (t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation())
       }
       return {
         required: t.options.drag,
         mount: function() {
           t.on("click", i, n.Elements.track, {
             capture: !0
           }).on("drag", (function() {
             e = !0
           })).on("dragged", (function() {
             setTimeout((function() {
               e = !1
             }))
           }))
         }
       }
     },
     ct = 1,
     dt = 2,
     ft = 3,
     lt = function(t, n, e) {
       var i, o, r, s = t.classes,
         a = t.root,
         u = n.Elements;

       function c() {
         var r = n.Controller,
           s = r.prevIndex,
           a = r.nextIndex,
           u = t.length > t.options.perPage || t.is(A);
         i.disabled = s < 0 || !u, o.disabled = a < 0 || !u, t.emit(e + ":updated", i, o, s, a)
       }

       function d(n) {
         return y('<button class="' + s.arrow + " " + (n ? s.prev : s.next) + '" type="button"><svg xmlns="http://www.w3.org/2000/svg"\tviewBox="0 0 40 40"\twidth="40"\theight="40"><path d="' + (t.options.arrowPath || "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z") + '" />')
       }
       return {
         required: t.options.arrows,
         mount: function() {
           i = u.arrows.prev, o = u.arrows.next, i && o || !t.options.arrows || (i = d(!0), o = d(!1), r = !0, function() {
             var n = m("div", {
               class: s.arrows
             });
             w(n, i), w(n, o);
             var e = u.slider,
               r = "slider" === t.options.arrows && e ? e : a;
             x(n, r.firstElementChild)
           }()), i && o && t.on("click", (function() {
             t.go("<")
           }), i).on("click", (function() {
             t.go(">")
           }), o).on("mounted move updated refresh", c), this.arrows = {
             prev: i,
             next: o
           }
         },
         mounted: function() {
           t.emit(e + ":mounted", i, o)
         },
         destroy: function() {
           I([i, o], "disabled"), r && b(i.parentElement)
         }
       }
     },
     ht = "move.page",
     pt = "updated.page refresh.page",
     gt = function(t, n, e) {
       var i = {},
         o = n.Elements,
         r = {
           mount: function() {
             var n = t.options.pagination;
             if (n) {
               i = function() {
                 var n = t.options,
                   e = t.classes,
                   i = m("ul", {
                     class: e.pagination
                   }),
                   r = o.getSlides(!1).filter((function(t) {
                     return !1 !== n.focus || t.index % n.perPage == 0
                   })).map((function(n, r) {
                     var s = m("li", {}),
                       a = m("button", {
                         class: e.page,
                         type: "button"
                       });
                     return w(s, a), w(i, s), t.on("click", (function() {
                       t.go(">" + r)
                     }), a), {
                       li: s,
                       button: a,
                       page: r,
                       Slides: o.getSlidesByPage(r)
                     }
                   }));
                 return {
                   list: i,
                   items: r
                 }
               }();
               var e = o.slider;
               w("slider" === n && e ? e : t.root, i.list), t.on(ht, s)
             }
             t.off(pt).on(pt, (function() {
               r.destroy(), t.options.pagination && (r.mount(), r.mounted())
             }))
           },
           mounted: function() {
             if (t.options.pagination) {
               var n = t.index;
               t.emit(e + ":mounted", i, this.getItem(n)), s(n, -1)
             }
           },
           destroy: function() {
             b(i.list), i.items && i.items.forEach((function(n) {
               t.off("click", n.button)
             })), t.off(ht), i = {}
           },
           getItem: function(t) {
             return i.items[n.Controller.toPage(t)]
           },
           get data() {
             return i
           }
         };

       function s(n, o) {
         var s = r.getItem(o),
           a = r.getItem(n),
           u = D.active;
         s && S(s.button, u), a && k(a.button, u), t.emit(e + ":updated", i, s, a)
       }
       return r
     },
     vt = "data-splide-lazy",
     mt = "data-splide-lazy-srcset",
     yt = "aria-current",
     bt = "aria-controls",
     wt = "aria-label",
     xt = "aria-hidden",
     Et = "tabindex",
     _t = {
       ltr: {
         ArrowLeft: "<",
         ArrowRight: ">",
         Left: "<",
         Right: ">"
       },
       rtl: {
         ArrowLeft: ">",
         ArrowRight: "<",
         Left: ">",
         Right: "<"
       },
       ttb: {
         ArrowUp: "<",
         ArrowDown: ">",
         Up: "<",
         Down: ">"
       }
     },
     kt = function(t, n) {
       var e = t.i18n,
         i = n.Elements,
         o = [xt, Et, bt, wt, yt, "role"];

       function r(n, e) {
         C(n, xt, !e), t.options.slideFocus && C(n, Et, e ? 0 : -1)
       }

       function s(t, n) {
         var e = i.track.id;
         C(t, bt, e), C(n, bt, e)
       }

       function a(n, i, o, r) {
         var s = t.index,
           a = o > -1 && s < o ? e.last : e.prev,
           u = r > -1 && s > r ? e.first : e.next;
         C(n, wt, a), C(i, wt, u)
       }

       function u(n, i) {
         i && C(i.button, yt, !0), n.items.forEach((function(n) {
           var i = t.options,
             o = d(!1 === i.focus && i.perPage > 1 ? e.pageX : e.slideX, n.page + 1),
             r = n.button,
             s = n.Slides.map((function(t) {
               return t.slide.id
             }));
           C(r, bt, s.join(" ")), C(r, wt, o)
         }))
       }

       function c(t, n, e) {
         n && I(n.button, yt), e && C(e.button, yt, !0)
       }

       function f(t) {
         i.each((function(n) {
           var i = n.slide,
             o = n.realIndex;
           h(i) || C(i, "role", "button");
           var r = o > -1 ? o : n.index,
             s = d(e.slideX, r + 1),
             a = t.Components.Elements.getSlide(r);
           C(i, wt, s), a && C(i, bt, a.slide.id)
         }))
       }

       function l(t, n) {
         var e = t.slide;
         n ? C(e, yt, !0) : I(e, yt)
       }

       function h(t) {
         return "BUTTON" === t.tagName
       }
       return {
         required: t.options.accessibility,
         mount: function() {
           t.on("visible", (function(t) {
             r(t.slide, !0)
           })).on("hidden", (function(t) {
             r(t.slide, !1)
           })).on("arrows:mounted", s).on("arrows:updated", a).on("pagination:mounted", u).on("pagination:updated", c).on("refresh", (function() {
             I(n.Clones.clones, o)
           })), t.options.isNavigation && t.on("navigation:mounted navigation:updated", f).on("active", (function(t) {
             l(t, !0)
           })).on("inactive", (function(t) {
             l(t, !1)
           })), ["play", "pause"].forEach((function(t) {
             var n = i[t];
             n && (h(n) || C(n, "role", "button"), C(n, bt, i.track.id), C(n, wt, e[t]))
           }))
         },
         destroy: function() {
           var t = n.Arrows,
             e = t ? t.arrows : {};
           I(i.slides.concat([e.prev, e.next, i.play, i.pause]), o)
         }
       }
     },
     St = "move.sync",
     Pt = "mouseup touchend",
     Ct = [" ", "Enter", "Spacebar"],
     zt = {
       Options: Y,
       Breakpoints: function(t) {
         var n, e, i = t.options.breakpoints,
           o = ot(s, 50),
           r = [];

         function s() {
           var o, s = (o = r.filter((function(t) {
             return t.mql.matches
           }))[0]) ? o.point : -1;
           if (s !== e) {
             e = s;
             var a = t.State,
               u = i[s] || n,
               c = u.destroy;
             c ? (t.options = n, t.destroy("completely" === c)) : (a.is(X) && t.mount(), t.options = u)
           }
         }
         return {
           required: i && matchMedia,
           mount: function() {
             r = Object.keys(i).sort((function(t, n) {
               return +t - +n
             })).map((function(t) {
               return {
                 point: t,
                 mql: matchMedia("(max-width:" + t + "px)")
               }
             })), this.destroy(!0), addEventListener("resize", o), n = t.options, s()
           },
           destroy: function(t) {
             t && removeEventListener("resize", o)
           }
         }
       },
       Controller: tt,
       Elements: Z,
       Track: et,
       Clones: it,
       Layout: rt,
       Drag: at,
       Click: ut,
       Autoplay: function(t, n, e) {
         var i, o = [],
           r = n.Elements,
           s = {
             required: t.options.autoplay,
             mount: function() {
               var n = t.options;
               r.slides.length > n.perPage && (i = function(t, n, e) {
                 var i, o, r, s = window.requestAnimationFrame,
                   a = !0,
                   u = function u(c) {
                     a || (i || (i = c, r && r < 1 && (i -= r * n)), r = (o = c - i) / n, o >= n && (i = 0, r = 1, t()), e && e(r), s(u))
                   };
                 return {
                   pause: function() {
                     a = !0, i = 0
                   },
                   play: function(t) {
                     i = 0, t && (r = 0), a && (a = !1, s(u))
                   }
                 }
               }((function() {
                 t.go(">")
               }), n.interval, (function(n) {
                 t.emit(e + ":playing", n), r.bar && E(r.bar, {
                   width: 100 * n + "%"
                 })
               })), function() {
                 var n = t.options,
                   e = t.sibling,
                   i = [t.root, e ? e.root : null];
                 n.pauseOnHover && (a(i, "mouseleave", ct, !0), a(i, "mouseenter", ct, !1));
                 n.pauseOnFocus && (a(i, "focusout", dt, !0), a(i, "focusin", dt, !1));
                 r.play && t.on("click", (function() {
                   s.play(dt), s.play(ft)
                 }), r.play);
                 r.pause && a([r.pause], "click", ft, !1);
                 t.on("move refresh", (function() {
                   s.play()
                 })).on("destroy", (function() {
                   s.pause()
                 }))
               }(), this.play())
             },
             play: function(n) {
               void 0 === n && (n = 0), (o = o.filter((function(t) {
                 return t !== n
               }))).length || (t.emit(e + ":play"), i.play(t.options.resetProgress))
             },
             pause: function(n) {
               void 0 === n && (n = 0), i.pause(), -1 === o.indexOf(n) && o.push(n), 1 === o.length && t.emit(e + ":pause")
             }
           };

         function a(n, e, i, o) {
           n.forEach((function(n) {
             t.on(e, (function() {
               s[o ? "play" : "pause"](i)
             }), n)
           }))
         }
         return s
       },
       Cover: function(t, n) {
         function e(t) {
           n.Elements.each((function(n) {
             var e = g(n.slide, "IMG") || g(n.container, "IMG");
             e && e.src && i(e, t)
           }))
         }

         function i(t, n) {
           E(t.parentElement, {
             background: n ? "" : 'center/cover no-repeat url("' + t.src + '")'
           }), E(t, {
             display: n ? "" : "none"
           })
         }
         return {
           required: t.options.cover,
           mount: function() {
             t.on("lazyload:loaded", (function(t) {
               i(t, !1)
             })), t.on("mounted updated refresh", (function() {
               return e(!1)
             }))
           },
           destroy: function() {
             e(!0)
           }
         }
       },
       Arrows: lt,
       Pagination: gt,
       LazyLoad: function(t, n, e) {
         var i, r, s = t.options,
           a = "sequential" === s.lazyLoad;

         function u() {
           r = [], i = 0
         }

         function c(n) {
           n = isNaN(n) ? t.index : n, (r = r.filter((function(t) {
             return !t.Slide.isWithin(n, s.perPage * (s.preloadPages + 1)) || (d(t.img, t.Slide), !1)
           })))[0] || t.off("moved." + e)
         }

         function d(n, e) {
           k(e.slide, D.loading);
           var i = m("span", {
             class: t.classes.spinner
           });
           w(n.parentElement, i), n.onload = function() {
             l(n, i, e, !1)
           }, n.onerror = function() {
             l(n, i, e, !0)
           }, C(n, "srcset", z(n, mt) || ""), C(n, "src", z(n, vt) || "")
         }

         function f() {
           if (i < r.length) {
             var t = r[i];
             d(t.img, t.Slide)
           }
           i++
         }

         function l(n, i, o, r) {
           S(o.slide, D.loading), r || (b(i), E(n, {
             display: ""
           }), t.emit(e + ":loaded", n).emit("resize")), a && f()
         }
         return {
           required: s.lazyLoad,
           mount: function() {
             t.on("mounted refresh", (function() {
               u(), n.Elements.each((function(t) {
                 o(t.slide.querySelectorAll("[data-splide-lazy], [" + mt + "]"), (function(n) {
                   n.src || n.srcset || (r.push({
                     img: n,
                     Slide: t
                   }), E(n, {
                     display: "none"
                   }))
                 }))
               })), a && f()
             })), a || t.on("mounted refresh moved." + e, c)
           },
           destroy: u
         }
       },
       Keyboard: function(t) {
         var n;
         return {
           mount: function() {
             t.on("mounted updated", (function() {
               var e = t.options,
                 i = t.root,
                 o = _t[e.direction],
                 r = e.keyboard;
               n && (t.off("keydown", n), I(i, Et)), r && ("focused" === r ? (n = i, C(i, Et, 0)) : n = document, t.on("keydown", (function(n) {
                 o[n.key] && t.go(o[n.key])
               }), n))
             }))
           }
         }
       },
       Sync: function(t) {
         var n = t.sibling,
           e = n && n.options.isNavigation;

         function i() {
           t.on(St, (function(t, e, i) {
             n.off(St).go(n.is(A) ? i : t, !1), o()
           }))
         }

         function o() {
           n.on(St, (function(n, e, o) {
             t.off(St).go(t.is(A) ? o : n, !1), i()
           }))
         }

         function r() {
           n.Components.Elements.each((function(n) {
             var e = n.slide,
               i = n.index;
             t.off(Pt, e).on(Pt, (function(t) {
               t.button && 0 !== t.button || s(i)
             }), e), t.off("keyup", e).on("keyup", (function(t) {
               Ct.indexOf(t.key) > -1 && (t.preventDefault(), s(i))
             }), e, {
               passive: !1
             })
           }))
         }

         function s(e) {
           t.State.is(F) && n.go(e)
         }
         return {
           required: !!n,
           mount: function() {
             i(), o(), e && (r(), t.on("refresh", (function() {
               setTimeout((function() {
                 r(), n.emit("navigation:updated", t)
               }))
             })))
           },
           mounted: function() {
             e && n.emit("navigation:mounted", t)
           }
         }
       },
       A11y: kt
     };
   var It = function(t) {
     var n, e;

     function i(n, e) {
       return t.call(this, n, e, zt) || this
     }
     return e = t, (n = i).prototype = Object.create(e.prototype), n.prototype.constructor = n, n.__proto__ = e, i
   }(U);
   window.Splide = It
 }();
 /*! * LazyLoad.jsVersion 17 - https://github.com/verlok/vanilla-lazyload*/
 ! function(t, n) {
   "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (t = t || self).LazyLoad = n()
 }(this, (function() {
   "use strict";

   function t() {
     return (t = Object.assign || function(t) {
       for (var n = 1; n < arguments.length; n++) {
         var e = arguments[n];
         for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
       }
       return t
     }).apply(this, arguments)
   }
   var n = "undefined" != typeof window,
     e = n && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),
     i = n && "IntersectionObserver" in window,
     o = n && "classList" in document.createElement("p"),
     r = n && window.devicePixelRatio > 1,
     a = {
       elements_selector: ".preload-img",
       container: e || n ? document : null,
       threshold: 300,
       thresholds: null,
       data_src: "src",
       data_srcset: "srcset",
       data_sizes: "sizes",
       data_bg: "src",
       data_bg_hidpi: "bg-hidpi",
       data_bg_multi: "bg-multi",
       data_bg_multi_hidpi: "bg-multi-hidpi",
       data_poster: "poster",
       class_applied: "applied",
       class_loading: "loading",
       class_loaded: "loaded",
       class_error: "error",
       class_entered: "entered",
       class_exited: "exited",
       unobserve_completed: !0,
       unobserve_entered: !1,
       cancel_on_exit: !0,
       callback_enter: null,
       callback_exit: null,
       callback_applied: null,
       callback_loading: null,
       callback_loaded: null,
       callback_error: null,
       callback_finish: null,
       callback_cancel: null,
       use_native: !1
     },
     c = function(n) {
       return t({}, a, n)
     },
     s = function(t, n) {
       var e, i = "LazyLoad::Initialized",
         o = new t(n);
       try {
         e = new CustomEvent(i, {
           detail: {
             instance: o
           }
         })
       } catch (t) {
         (e = document.createEvent("CustomEvent")).initCustomEvent(i, !1, !1, {
           instance: o
         })
       }
       window.dispatchEvent(e)
     },
     l = "loading",
     u = "loaded",
     d = "applied",
     f = "error",
     _ = "native",
     g = "data-",
     v = "ll-status",
     p = function(t, n) {
       return t.getAttribute(g + n)
     },
     b = function(t) {
       return p(t, v)
     },
     h = function(t, n) {
       return function(t, n, e) {
         var i = "data-ll-status";
         null !== e ? t.setAttribute(i, e) : t.removeAttribute(i)
       }(t, 0, n)
     },
     m = function(t) {
       return h(t, null)
     },
     E = function(t) {
       return null === b(t)
     },
     y = function(t) {
       return b(t) === _
     },
     A = [l, u, d, f],
     I = function(t, n, e, i) {
       t && (void 0 === i ? void 0 === e ? t(n) : t(n, e) : t(n, e, i))
     },
     L = function(t, n) {
       o ? t.classList.add(n) : t.className += (t.className ? " " : "") + n
     },
     w = function(t, n) {
       o ? t.classList.remove(n) : t.className = t.className.replace(new RegExp("(^|\\s+)" + n + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
     },
     k = function(t) {
       return t.llTempImage
     },
     O = function(t, n) {
       if (n) {
         var e = n._observer;
         e && e.unobserve(t)
       }
     },
     x = function(t, n) {
       t && (t.loadingCount += n)
     },
     z = function(t, n) {
       t && (t.toLoadCount = n)
     },
     C = function(t) {
       for (var n, e = [], i = 0; n = t.children[i]; i += 1) "SOURCE" === n.tagName && e.push(n);
       return e
     },
     N = function(t, n, e) {
       e && t.setAttribute(n, e)
     },
     M = function(t, n) {
       t.removeAttribute(n)
     },
     R = function(t) {
       return !!t.llOriginalAttrs
     },
     G = function(t) {
       if (!R(t)) {
         var n = {};
         n.src = t.getAttribute("src"), n.srcset = t.getAttribute("srcset"), n.sizes = t.getAttribute("sizes"), t.llOriginalAttrs = n
       }
     },
     T = function(t) {
       if (R(t)) {
         var n = t.llOriginalAttrs;
         N(t, "src", n.src), N(t, "srcset", n.srcset), N(t, "sizes", n.sizes)
       }
     },
     j = function(t, n) {
       N(t, "sizes", p(t, n.data_sizes)), N(t, "srcset", p(t, n.data_srcset)), N(t, "src", p(t, n.data_src))
     },
     D = function(t) {
       M(t, "src"), M(t, "srcset"), M(t, "sizes")
     },
     F = function(t, n) {
       var e = t.parentNode;
       e && "PICTURE" === e.tagName && C(e).forEach(n)
     },
     P = {
       IMG: function(t, n) {
         F(t, (function(t) {
           G(t), j(t, n)
         })), G(t), j(t, n)
       },
       IFRAME: function(t, n) {
         N(t, "src", p(t, n.data_src))
       },
       VIDEO: function(t, n) {
         ! function(t, e) {
           C(t).forEach((function(t) {
             N(t, "src", p(t, n.data_src))
           }))
         }(t), N(t, "poster", p(t, n.data_poster)), N(t, "src", p(t, n.data_src)), t.load()
       }
     },
     S = function(t, n) {
       var e = P[t.tagName];
       e && e(t, n)
     },
     V = function(t, n, e) {
       x(e, 1), L(t, n.class_loading), h(t, l), I(n.callback_loading, t, e)
     },
     U = ["IMG", "IFRAME", "VIDEO"],
     $ = function(t, n) {
       !n || function(t) {
         return t.loadingCount > 0
       }(n) || function(t) {
         return t.toLoadCount > 0
       }(n) || I(t.callback_finish, n)
     },
     q = function(t, n, e) {
       t.addEventListener(n, e), t.llEvLisnrs[n] = e
     },
     H = function(t, n, e) {
       t.removeEventListener(n, e)
     },
     B = function(t) {
       return !!t.llEvLisnrs
     },
     J = function(t) {
       if (B(t)) {
         var n = t.llEvLisnrs;
         for (var e in n) {
           var i = n[e];
           H(t, e, i)
         }
         delete t.llEvLisnrs
       }
     },
     K = function(t, n, e) {
       ! function(t) {
         delete t.llTempImage
       }(t), x(e, -1),
         function(t) {
           t && (t.toLoadCount -= 1)
         }(e), w(t, n.class_loading), n.unobserve_completed && O(t, e)
     },
     Q = function(t, n, e) {
       var i = k(t) || t;
       B(i) || function(t, n, e) {
         B(t) || (t.llEvLisnrs = {});
         var i = "VIDEO" === t.tagName ? "loadeddata" : "load";
         q(t, i, n), q(t, "error", e)
       }(i, (function(o) {
         ! function(t, n, e, i) {
           var o = y(n);
           K(n, e, i), L(n, e.class_loaded), h(n, u), I(e.callback_loaded, n, i), o || $(e, i)
         }(0, t, n, e), J(i)
       }), (function(o) {
         ! function(t, n, e, i) {
           var o = y(n);
           K(n, e, i), L(n, e.class_error), h(n, f), I(e.callback_error, n, i), o || $(e, i)
         }(0, t, n, e), J(i)
       }))
     },
     W = function(t, n, e) {
       ! function(t) {
         t.llTempImage = document.createElement("IMG")
       }(t), Q(t, n, e),
         function(t, n, e) {
           var i = p(t, n.data_bg),
             o = p(t, n.data_bg_hidpi),
             a = r && o ? o : i;
           a && (t.style.backgroundImage = 'url("'.concat(a, '")'), k(t).setAttribute("src", a), V(t, n, e))
         }(t, n, e),
         function(t, n, e) {
           var i = p(t, n.data_bg_multi),
             o = p(t, n.data_bg_multi_hidpi),
             a = r && o ? o : i;
           a && (t.style.backgroundImage = a, function(t, n, e) {
             L(t, n.class_applied), h(t, d), n.unobserve_completed && O(t, n), I(n.callback_applied, t, e)
           }(t, n, e))
         }(t, n, e)
     },
     X = function(t, n, e) {
       ! function(t) {
         return U.indexOf(t.tagName) > -1
       }(t) ? W(t, n, e): function(t, n, e) {
         Q(t, n, e), S(t, n), V(t, n, e)
       }(t, n, e)
     },
     Y = ["IMG", "IFRAME"],
     Z = function(t) {
       return t.use_native && "loading" in HTMLImageElement.prototype
     },
     tt = function(t, n, e) {
       t.forEach((function(t) {
         return function(t) {
           return t.isIntersecting || t.intersectionRatio > 0
         }(t) ? function(t, n, e, i) {
           h(t, "entered"), L(t, e.class_entered), w(t, e.class_exited),
             function(t, n, e) {
               n.unobserve_entered && O(t, e)
             }(t, e, i), I(e.callback_enter, t, n, i),
             function(t) {
               return A.indexOf(b(t)) >= 0
             }(t) || X(t, e, i)
         }(t.target, t, n, e) : function(t, n, e, i) {
           E(t) || (L(t, e.class_exited), function(t, n, e, i) {
             e.cancel_on_exit && function(t) {
               return b(t) === l
             }(t) && "IMG" === t.tagName && (J(t), function(t) {
               F(t, (function(t) {
                 D(t)
               })), D(t)
             }(t), function(t) {
               F(t, (function(t) {
                 T(t)
               })), T(t)
             }(t), w(t, e.class_loading), x(i, -1), m(t), I(e.callback_cancel, t, n, i))
           }(t, n, e, i), I(e.callback_exit, t, n, i))
         }(t.target, t, n, e)
       }))
     },
     nt = function(t) {
       return Array.prototype.slice.call(t)
     },
     et = function(t) {
       return t.container.querySelectorAll(t.elements_selector)
     },
     it = function(t) {
       return function(t) {
         return b(t) === f
       }(t)
     },
     ot = function(t, n) {
       return function(t) {
         return nt(t).filter(E)
       }(t || et(n))
     },
     rt = function(t, e) {
       var o = c(t);
       this._settings = o, this.loadingCount = 0,
         function(t, n) {
           i && !Z(t) && (n._observer = new IntersectionObserver((function(e) {
             tt(e, t, n)
           }), function(t) {
             return {
               root: t.container === document ? null : t.container,
               rootMargin: t.thresholds || t.threshold + "px"
             }
           }(t)))
         }(o, this),
         function(t, e) {
           n && window.addEventListener("online", (function() {
             ! function(t, n) {
               var e;
               (e = et(t), nt(e).filter(it)).forEach((function(n) {
                 w(n, t.class_error), m(n)
               })), n.update()
             }(t, e)
           }))
         }(o, this), this.update(e)
     };
   return rt.prototype = {
     update: function(t) {
       var n, o, r = this._settings,
         a = ot(t, r);
       z(this, a.length), !e && i ? Z(r) ? function(t, n, e) {
         t.forEach((function(t) {
           -1 !== Y.indexOf(t.tagName) && (t.setAttribute("loading", "lazy"), function(t, n, e) {
             Q(t, n, e), S(t, n), h(t, _)
           }(t, n, e))
         })), z(e, 0)
       }(a, r, this) : (o = a, function(t) {
         t.disconnect()
       }(n = this._observer), function(t, n) {
         n.forEach((function(n) {
           t.observe(n)
         }))
       }(n, o)) : this.loadAll(a)
     },
     destroy: function() {
       this._observer && this._observer.disconnect(), et(this._settings).forEach((function(t) {
         delete t.llOriginalAttrs
       })), delete this._observer, delete this._settings, delete this.loadingCount, delete this.toLoadCount
     },
     loadAll: function(t) {
       var n = this,
         e = this._settings;
       ot(t, e).forEach((function(t) {
         O(t, n), X(t, e, n)
       }))
     }
   }, rt.load = function(t, n) {
     var e = c(n);
     X(t, e)
   }, rt.resetStatus = function(t) {
     m(t)
   }, n && function(t, n) {
     if (n)
       if (n.length)
         for (var e, i = 0; e = n[i]; i += 1) s(t, e);
       else s(t, n)
   }(rt, window.lazyLoadOptions), rt
 }));
 /*Enabled AJAX Custom SWUP Plugin*/
 ! function(e, t) {
   "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Swup = t() : e.Swup = t()
 }(window, function() {
   return function(e) {
     var t = {};

     function n(i) {
       if (t[i]) return t[i].exports;
       var r = t[i] = {
         i: i,
         l: !1,
         exports: {}
       };
       return e[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
     }
     return n.m = e, n.c = t, n.d = function(e, t, i) {
       n.o(e, t) || Object.defineProperty(e, t, {
         enumerable: !0,
         get: i
       })
     }, n.r = function(e) {
       "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
         value: "Module"
       }), Object.defineProperty(e, "__esModule", {
         value: !0
       })
     }, n.t = function(e, t) {
       if (1 & t && (e = n(e)), 8 & t) return e;
       if (4 & t && "object" == typeof e && e && e.__esModule) return e;
       var i = Object.create(null);
       if (n.r(i), Object.defineProperty(i, "default", {
           enumerable: !0,
           value: e
         }), 2 & t && "string" != typeof e)
         for (var r in e) n.d(i, r, function(t) {
           return e[t]
         }.bind(null, r));
       return i
     }, n.n = function(e) {
       var t = e && e.__esModule ? function() {
         return e.default
       } : function() {
         return e
       };
       return n.d(t, "a", t), t
     }, n.o = function(e, t) {
       return Object.prototype.hasOwnProperty.call(e, t)
     }, n.p = "", n(n.s = 2)
   }([function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     }), t.Link = t.markSwupElements = t.getCurrentUrl = t.transitionEnd = t.fetch = t.getDataFromHtml = t.createHistoryRecord = t.classify = void 0;
     var i = d(n(8)),
       r = d(n(9)),
       o = d(n(10)),
       a = d(n(11)),
       s = d(n(12)),
       u = d(n(13)),
       l = d(n(14)),
       c = d(n(15));

     function d(e) {
       return e && e.__esModule ? e : {
         default: e
       }
     }
     t.classify = i.default, t.createHistoryRecord = r.default, t.getDataFromHtml = o.default, t.fetch = a.default, t.transitionEnd = s.default, t.getCurrentUrl = u.default, t.markSwupElements = l.default, t.Link = c.default
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     }), t.query = function(e) {
       var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
       return "string" != typeof e ? e : t.querySelector(e)
     }, t.queryAll = function(e) {
       var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
       return "string" != typeof e ? e : Array.prototype.slice.call(t.querySelectorAll(e))
     }
   }, function(e, t, n) {
     "use strict";
     var i, r = (i = n(3)) && i.__esModule ? i : {
       default: i
     };
     e.exports = r.default
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     });
     var i = Object.assign || function(e) {
         for (var t = 1; t < arguments.length; t++) {
           var n = arguments[t];
           for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
         }
         return e
       },
       r = function() {
         function e(e, t) {
           for (var n = 0; n < t.length; n++) {
             var i = t[n];
             i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
           }
         }
         return function(t, n, i) {
           return n && e(t.prototype, n), i && e(t, i), t
         }
       }(),
       o = y(n(4)),
       a = y(n(6)),
       s = y(n(7)),
       u = y(n(16)),
       l = y(n(17)),
       c = y(n(18)),
       d = y(n(19)),
       f = y(n(20)),
       h = y(n(21)),
       p = y(n(22)),
       m = n(23),
       g = n(1),
       v = n(0);

     function y(e) {
       return e && e.__esModule ? e : {
         default: e
       }
     }
     var w = function() {
       function e(t) {
         ! function(e, t) {
           if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
         }(this, e);
         var n = {
             animateHistoryBrowsing: !1,
             animationSelector: '[class*="transition-"]',
             linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
             cache: !0,
             containers: ["#swup"],
             requestHeaders: {
               "X-Requested-With": "swup",
               Accept: "text/html, application/xhtml+xml"
             },
             plugins: [],
             skipPopStateHandling: function(e) {
               return !(e.state && "swup" === e.state.source)
             }
           },
           r = i({}, n, t);
         this._handlers = {
           animationInDone: [],
           animationInStart: [],
           animationOutDone: [],
           animationOutStart: [],
           animationSkipped: [],
           clickLink: [],
           contentReplaced: [],
           disabled: [],
           enabled: [],
           openPageInNewTab: [],
           pageLoaded: [],
           pageRetrievedFromCache: [],
           pageView: [],
           popState: [],
           samePage: [],
           samePageWithHash: [],
           serverError: [],
           transitionStart: [],
           transitionEnd: [],
           willReplaceContent: []
         }, this.scrollToElement = null, this.preloadPromise = null, this.options = r, this.plugins = [], this.transition = {}, this.delegatedListeners = {}, this.boundPopStateHandler = this.popStateHandler.bind(this), this.cache = new a.default, this.cache.swup = this, this.loadPage = s.default, this.renderPage = u.default, this.triggerEvent = l.default, this.on = c.default, this.off = d.default, this.updateTransition = f.default, this.getAnimationPromises = h.default, this.getPageData = p.default, this.log = function() {}, this.use = m.use, this.unuse = m.unuse, this.findPlugin = m.findPlugin, this.enable()
       }
       return r(e, [{
         key: "enable",
         value: function() {
           var e = this;
           if ("undefined" != typeof Promise) {
             this.delegatedListeners.click = (0, o.default)(document, this.options.linkSelector, "click", this.linkClickHandler.bind(this)), window.addEventListener("popstate", this.boundPopStateHandler);
             var t = (0, v.getDataFromHtml)(document.documentElement.outerHTML, this.options.containers);
             t.url = t.responseURL = (0, v.getCurrentUrl)(), this.options.cache && this.cache.cacheUrl(t), (0, v.markSwupElements)(document.documentElement, this.options.containers), this.options.plugins.forEach(function(t) {
               e.use(t)
             }), window.history.replaceState(Object.assign({}, window.history.state, {
               url: window.location.href,
               random: Math.random(),
               source: "swup"
             }), document.title, window.location.href), this.triggerEvent("enabled"), document.documentElement.classList.add("swup-enabled"), this.triggerEvent("pageView")
           } else console.warn("Promise is not supported")
         }
       }, {
         key: "destroy",
         value: function() {
           var e = this;
           this.delegatedListeners.click.destroy(), window.removeEventListener("popstate", this.boundPopStateHandler), this.cache.empty(), this.options.plugins.forEach(function(t) {
             e.unuse(t)
           }), (0, g.queryAll)("[data-swup]").forEach(function(e) {
             e.removeAttribute("data-swup")
           }), this.off(), this.triggerEvent("disabled"), document.documentElement.classList.remove("swup-enabled")
         }
       }, {
         key: "linkClickHandler",
         value: function(e) {
           if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) this.triggerEvent("openPageInNewTab", e);
           else if (0 === e.button) {
             this.triggerEvent("clickLink", e), e.preventDefault();
             var t = new v.Link(e.delegateTarget);
             if (t.getAddress() == (0, v.getCurrentUrl)() || "" == t.getAddress()) "" != t.getHash() ? (this.triggerEvent("samePageWithHash", e), null != document.querySelector(t.getHash()) ? history.replaceState({
               url: t.getAddress() + t.getHash(),
               random: Math.random(),
               source: "swup"
             }, document.title, t.getAddress() + t.getHash()) : console.warn("Element for offset not found (" + t.getHash() + ")")) : this.triggerEvent("samePage", e);
             else {
               "" != t.getHash() && (this.scrollToElement = t.getHash());
               var n = e.delegateTarget.getAttribute("data-swup-transition");
               this.loadPage({
                 url: t.getAddress(),
                 customTransition: n
               }, !1)
             }
           }
         }
       }, {
         key: "popStateHandler",
         value: function(e) {
           if (!this.options.skipPopStateHandling(e)) {
             var t = new v.Link(e.state ? e.state.url : window.location.pathname);
             "" !== t.getHash() ? this.scrollToElement = t.getHash() : e.preventDefault(), this.triggerEvent("popState", e), this.loadPage({
               url: t.getAddress()
             }, e)
           }
         }
       }]), e
     }();
     t.default = w
   }, function(e, t, n) {
     var i = n(5);
     e.exports = function(e, t, n, r, o) {
       var a = function(e, t, n, r) {
         return function(n) {
           n.delegateTarget = i(n.target, t), n.delegateTarget && r.call(e, n)
         }
       }.apply(this, arguments);
       return e.addEventListener(n, a, o), {
         destroy: function() {
           e.removeEventListener(n, a, o)
         }
       }
     }
   }, function(e, t) {
     if ("undefined" != typeof Element && !Element.prototype.matches) {
       var n = Element.prototype;
       n.matches = n.matchesSelector || n.mozMatchesSelector || n.msMatchesSelector || n.oMatchesSelector || n.webkitMatchesSelector
     }
     e.exports = function(e, t) {
       for (; e && 9 !== e.nodeType;) {
         if ("function" == typeof e.matches && e.matches(t)) return e;
         e = e.parentNode
       }
     }
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     });
     var i = function() {
         function e(e, t) {
           for (var n = 0; n < t.length; n++) {
             var i = t[n];
             i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
           }
         }
         return function(t, n, i) {
           return n && e(t.prototype, n), i && e(t, i), t
         }
       }(),
       r = t.Cache = function() {
         function e() {
           ! function(e, t) {
             if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
           }(this, e), this.pages = {}, this.last = null
         }
         return i(e, [{
           key: "cacheUrl",
           value: function(e) {
             e.url in this.pages == 0 && (this.pages[e.url] = e), this.last = this.pages[e.url], this.swup.log("Cache (" + Object.keys(this.pages).length + ")", this.pages)
           }
         }, {
           key: "getPage",
           value: function(e) {
             return this.pages[e]
           }
         }, {
           key: "getCurrentPage",
           value: function() {
             return this.getPage(window.location.pathname + window.location.search)
           }
         }, {
           key: "exists",
           value: function(e) {
             return e in this.pages
           }
         }, {
           key: "empty",
           value: function() {
             this.pages = {}, this.last = null, this.swup.log("Cache cleared")
           }
         }, {
           key: "remove",
           value: function(e) {
             delete this.pages[e]
           }
         }]), e
       }();
     t.default = r
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     });
     var i = Object.assign || function(e) {
         for (var t = 1; t < arguments.length; t++) {
           var n = arguments[t];
           for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
         }
         return e
       },
       r = n(0);
     t.default = function(e, t) {
       var n = this,
         o = [],
         a = void 0;
       this.triggerEvent("transitionStart", t), null != e.customTransition ? (this.updateTransition(window.location.pathname, e.url, e.customTransition), document.documentElement.classList.add("to-" + (0, r.classify)(e.customTransition))) : this.updateTransition(window.location.pathname, e.url), !t || this.options.animateHistoryBrowsing ? function() {
         if (n.triggerEvent("animationOutStart"), document.documentElement.classList.add("is-changing"), document.documentElement.classList.add("is-leaving"), document.documentElement.classList.add("is-animating"), t && document.documentElement.classList.add("is-popstate"), document.documentElement.classList.add("to-" + (0, r.classify)(e.url)), o = n.getAnimationPromises("out"), Promise.all(o).then(function() {
             n.triggerEvent("animationOutDone")
           }), !t) {
           var i;
           i = null != n.scrollToElement ? e.url + n.scrollToElement : e.url, (0, r.createHistoryRecord)(i)
         }
       }() : this.triggerEvent("animationSkipped"), this.cache.exists(e.url) ? (a = new Promise(function(e) {
         e()
       }), this.triggerEvent("pageRetrievedFromCache")) : a = this.preloadPromise && this.preloadPromise.route == e.url ? this.preloadPromise : new Promise(function(t, o) {
         (0, r.fetch)(i({}, e, {
           headers: n.options.requestHeaders
         }), function(i) {
           if (500 === i.status) return n.triggerEvent("serverError"), void o(e.url);
           var r = n.getPageData(i);
           null != r ? (r.url = e.url, n.cache.cacheUrl(r), n.triggerEvent("pageLoaded"), t()) : o(e.url)
         })
       }), document.getElementById("preloader").classList.remove("preloader-hide"), setTimeout(function() {
         Promise.all(o.concat([a])).then(function() {
           n.renderPage(n.cache.getPage(e.url), t), n.preloadPromise = null, setTimeout(function() {
             document.getElementById("preloader").classList.add("preloader-hide")
           }, 50)
         }).catch(function(e) {
           n.options.skipPopStateHandling = function() {
             return window.location = e, !0
           }, window.history.go(-1)
         }), window.scrollTo(0, 0)
       }, 180)
     }
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     }), t.default = function(e) {
       var t = e.toString().toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
       return "/" === t[0] && (t = t.splice(1)), "" === t && (t = "homepage"), t
     }
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     }), t.default = function(e) {
       window.history.pushState({
         url: e || window.location.href.split(window.location.hostname)[1],
         random: Math.random(),
         source: "swup"
       }, document.getElementsByTagName("title")[0].innerText, e || window.location.href.split(window.location.hostname)[1])
     }
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     });
     var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
         return typeof e
       } : function(e) {
         return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
       },
       r = n(1);
     t.default = function(e, t) {
       var n = document.createElement("html");
       n.innerHTML = e;
       for (var o = [], a = function(e) {
           if (null == n.querySelector(t[e])) return {
             v: null
           };
           (0, r.queryAll)(t[e]).forEach(function(i, a) {
             (0, r.queryAll)(t[e], n)[a].setAttribute("data-swup", o.length), o.push((0, r.queryAll)(t[e], n)[a].outerHTML)
           })
         }, s = 0; s < t.length; s++) {
         var u = a(s);
         if ("object" === (void 0 === u ? "undefined" : i(u))) return u.v
       }
       var l = {
         title: n.querySelector("title").innerText,
         pageClass: n.querySelector("body").className,
         originalContent: e,
         blocks: o
       };
       return n.innerHTML = "", n = null, l
     }
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     });
     var i = Object.assign || function(e) {
       for (var t = 1; t < arguments.length; t++) {
         var n = arguments[t];
         for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
       }
       return e
     };
     t.default = function(e) {
       var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
         n = {
           url: window.location.pathname + window.location.search,
           method: "GET",
           data: null,
           headers: {}
         },
         r = i({}, n, e),
         o = new XMLHttpRequest;
       return o.onreadystatechange = function() {
         4 === o.readyState && (o.status, t(o))
       }, o.open(r.method, r.url, !0), Object.keys(r.headers).forEach(function(e) {
         o.setRequestHeader(e, r.headers[e])
       }), o.send(r.data), o
     }
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     }), t.default = function() {
       var e = document.createElement("div"),
         t = {
           WebkitTransition: "webkitTransitionEnd",
           MozTransition: "transitionend",
           OTransition: "oTransitionEnd otransitionend",
           transition: "transitionend"
         };
       for (var n in t)
         if (void 0 !== e.style[n]) return t[n];
       return !1
     }
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     }), t.default = function() {
       return window.location.pathname + window.location.search
     }
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     });
     var i = n(1);
     t.default = function(e, t) {
       for (var n = 0, r = function(r) {
           null == e.querySelector(t[r]) ? console.warn("Element " + t[r] + " is not in current page.") : (0, i.queryAll)(t[r]).forEach(function(o, a) {
             (0, i.queryAll)(t[r], e)[a].setAttribute("data-swup", n), n++
           })
         }, o = 0; o < t.length; o++) r(o)
     }
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     });
     var i = function() {
         function e(e, t) {
           for (var n = 0; n < t.length; n++) {
             var i = t[n];
             i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
           }
         }
         return function(t, n, i) {
           return n && e(t.prototype, n), i && e(t, i), t
         }
       }(),
       r = function() {
         function e(t) {
           ! function(e, t) {
             if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
           }(this, e), t instanceof Element || t instanceof SVGElement ? this.link = t : (this.link = document.createElement("a"), this.link.href = t)
         }
         return i(e, [{
           key: "getPath",
           value: function() {
             var e = this.link.pathname;
             return "/" !== e[0] && (e = "/" + e), e
           }
         }, {
           key: "getAddress",
           value: function() {
             var e = this.link.pathname + this.link.search;
             return this.link.getAttribute("xlink:href") && (e = this.link.getAttribute("xlink:href")), "/" !== e[0] && (e = "/" + e), e
           }
         }, {
           key: "getHash",
           value: function() {
             return this.link.hash
           }
         }]), e
       }();
     t.default = r
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     });
     var i = Object.assign || function(e) {
         for (var t = 1; t < arguments.length; t++) {
           var n = arguments[t];
           for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
         }
         return e
       },
       r = (n(1), n(0));
     t.default = function(e, t) {
       var n = this;
       document.documentElement.classList.remove("is-leaving");
       var o = new r.Link(e.responseURL);
       window.location.pathname !== o.getPath() && (window.history.replaceState({
         url: o.getPath(),
         random: Math.random(),
         source: "swup"
       }, document.title, o.getPath()), this.cache.cacheUrl(i({}, e, {
         url: o.getPath()
       }))), t && !this.options.animateHistoryBrowsing || document.documentElement.classList.add("is-rendering"), this.triggerEvent("willReplaceContent", t);
       for (var a = 0; a < e.blocks.length; a++) document.body.querySelector('[data-swup="' + a + '"]').outerHTML = e.blocks[a];
       if (document.title = e.title, this.triggerEvent("contentReplaced", t), this.triggerEvent("pageView", t), this.options.cache || this.cache.empty(), setTimeout(function() {
           t && !n.options.animateHistoryBrowsing || (n.triggerEvent("animationInStart"), document.documentElement.classList.remove("is-animating"))
         }, 10), !t || this.options.animateHistoryBrowsing) {
         var s = this.getAnimationPromises("in");
         Promise.all(s).then(function() {
           n.triggerEvent("animationInDone"), n.triggerEvent("transitionEnd", t), document.documentElement.className.split(" ").forEach(function(e) {
             (new RegExp("^to-").test(e) || "is-changing" === e || "is-rendering" === e || "is-popstate" === e) && document.documentElement.classList.remove(e)
           })
         })
       } else this.triggerEvent("transitionEnd", t);
       this.scrollToElement = null
     }
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     }), t.default = function(e, t) {
       this._handlers[e].forEach(function(e) {
         try {
           e(t)
         } catch (e) {
           console.error(e)
         }
       });
       var n = new CustomEvent("swup:" + e, {
         detail: e
       });
       document.dispatchEvent(n)
     }
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     }), t.default = function(e, t) {
       this._handlers[e] ? this._handlers[e].push(t) : console.warn("Unsupported event " + e + ".")
     }
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     }), t.default = function(e, t) {
       var n = this;
       if (null != e)
         if (null != t)
           if (this._handlers[e] && this._handlers[e].filter(function(e) {
               return e === t
             }).length) {
             var i = this._handlers[e].filter(function(e) {
                 return e === t
               })[0],
               r = this._handlers[e].indexOf(i);
             r > -1 && this._handlers[e].splice(r, 1)
           } else console.warn("Handler for event '" + e + "' no found.");
       else this._handlers[e] = [];
       else Object.keys(this._handlers).forEach(function(e) {
         n._handlers[e] = []
       })
     }
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     }), t.default = function(e, t, n) {
       this.transition = {
         from: e,
         to: t,
         custom: n
       }
     }
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     });
     var i = n(1),
       r = n(0);
     t.default = function() {
       var e = [];
       return (0, i.queryAll)(this.options.animationSelector).forEach(function(t) {
         var n = new Promise(function(e) {
           t.addEventListener((0, r.transitionEnd)(), function(n) {
             t == n.target && e()
           })
         });
         e.push(n)
       }), e
     }
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     });
     var i = n(0);
     t.default = function(e) {
       var t = e.responseText,
         n = (0, i.getDataFromHtml)(t, this.options.containers);
       return n ? (n.responseURL = e.responseURL ? e.responseURL : window.location.href, n) : (console.warn("The link you are hovering over does not exist (404 ERROR) Please make sure your link is pointing to a valid location."), null)
     }
   }, function(e, t, n) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: !0
     }), t.use = function(e) {
       if (e.isSwupPlugin) return this.plugins.push(e), e.swup = this, "function" == typeof e._beforeMount && e._beforeMount(), e.mount(), this.plugins;
       console.warn("Not swup plugin instance " + e + ".")
     }, t.unuse = function(e) {
       var t = void 0;
       if (t = "string" == typeof e ? this.plugins.find(function(t) {
           return e === t.name
         }) : e) {
         t.unmount(), "function" == typeof t._afterUnmount && t._afterUnmount();
         var n = this.plugins.indexOf(t);
         return this.plugins.splice(n, 1), this.plugins
       }
       console.warn("No such plugin.")
     }, t.findPlugin = function(e) {
       return this.plugins.find(function(t) {
         return e === t.name
       })
     }
   }])
 });
 /*Enabled AJAX Custom Preload SWUP Function*/
 (function e(t, r) {
   if (typeof exports === "object" && typeof module === "object") module.exports = r();
   else if (typeof define === "function" && define.amd) define([], r);
   else if (typeof exports === "object") exports["SwupPreloadPlugin"] = r();
   else t["SwupPreloadPlugin"] = r()
 })(window, function() {
   return function(e) {
     var t = {};

     function r(n) {
       if (t[n]) {
         return t[n].exports
       }
       var o = t[n] = {
         i: n,
         l: false,
         exports: {}
       };
       e[n].call(o.exports, o, o.exports, r);
       o.l = true;
       return o.exports
     }
     r.m = e;
     r.c = t;
     r.d = function(e, t, n) {
       if (!r.o(e, t)) {
         Object.defineProperty(e, t, {
           enumerable: true,
           get: n
         })
       }
     };
     r.r = function(e) {
       if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
         Object.defineProperty(e, Symbol.toStringTag, {
           value: "Module"
         })
       }
       Object.defineProperty(e, "__esModule", {
         value: true
       })
     };
     r.t = function(e, t) {
       if (t & 1) e = r(e);
       if (t & 8) return e;
       if (t & 4 && typeof e === "object" && e && e.__esModule) return e;
       var n = Object.create(null);
       r.r(n);
       Object.defineProperty(n, "default", {
         enumerable: true,
         value: e
       });
       if (t & 2 && typeof e != "string")
         for (var o in e) r.d(n, o, function(t) {
           return e[t]
         }.bind(null, o));
       return n
     };
     r.n = function(e) {
       var t = e && e.__esModule ? function t() {
         return e["default"]
       } : function t() {
         return e
       };
       r.d(t, "a", t);
       return t
     };
     r.o = function(e, t) {
       return Object.prototype.hasOwnProperty.call(e, t)
     };
     r.p = "";
     return r(r.s = 1)
   }([function(e, t, r) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: true
     });
     var n = t.query = function e(t) {
       var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
       if (typeof t !== "string") {
         return t
       }
       return r.querySelector(t)
     };
     var o = t.queryAll = function e(t) {
       var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
       if (typeof t !== "string") {
         return t
       }
       return Array.prototype.slice.call(r.querySelectorAll(t))
     }
   }, function(e, t, r) {
     "use strict";
     var n = r(2);
     var o = a(n);

     function a(e) {
       return e && e.__esModule ? e : {
         default: e
       }
     }
     e.exports = o.default
   }, function(e, t, r) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: true
     });
     var n = function() {
       function e(e, t) {
         for (var r = 0; r < t.length; r++) {
           var n = t[r];
           n.enumerable = n.enumerable || false;
           n.configurable = true;
           if ("value" in n) n.writable = true;
           Object.defineProperty(e, n.key, n)
         }
       }
       return function(t, r, n) {
         if (r) e(t.prototype, r);
         if (n) e(t, n);
         return t
       }
     }();
     var o = r(3);
     var a = s(o);
     var u = r(4);
     var i = s(u);
     var l = r(0);
     var f = r(6);

     function s(e) {
       return e && e.__esModule ? e : {
         default: e
       }
     }

     function c(e, t) {
       if (!(e instanceof t)) {
         throw new TypeError("Cannot call a class as a function")
       }
     }

     function d(e, t) {
       if (!e) {
         throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
       }
       return t && (typeof t === "object" || typeof t === "function") ? t : e
     }

     function p(e, t) {
       if (typeof t !== "function" && t !== null) {
         throw new TypeError("Super expression must either be null or a function, not " + typeof t)
       }
       e.prototype = Object.create(t && t.prototype, {
         constructor: {
           value: e,
           enumerable: false,
           writable: true,
           configurable: true
         }
       });
       if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t
     }
     var v = function(e) {
       p(t, e);

       function t() {
         var e;
         var r, n, o;
         c(this, t);
         for (var a = arguments.length, u = Array(a), i = 0; i < a; i++) {
           u[i] = arguments[i]
         }
         return o = (r = (n = d(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(u))), n), n.name = "PreloadPlugin", n.onContentReplaced = function() {
           n.swup.preloadPages()
         }, n.onMouseover = function(e) {
           var t = n.swup;
           t.triggerEvent("hoverLink", e);
           var r = new f.Link(e.delegateTarget);
           if (r.getAddress() !== (0, f.getCurrentUrl)() && !t.cache.exists(r.getAddress()) && t.preloadPromise == null) {
             t.preloadPromise = t.preloadPage(r.getAddress());
             t.preloadPromise.route = r.getAddress();
             t.preloadPromise.finally(function() {
               t.preloadPromise = null
             })
           }
         }, n.preloadPage = function(e) {
           var t = n.swup;
           var r = new f.Link(e);
           return new Promise(function(e, n) {
             if (r.getAddress() != (0, f.getCurrentUrl)() && !t.cache.exists(r.getAddress())) {
               (0, f.fetch)({
                 url: r.getAddress(),
                 headers: t.options.requestHeaders
               }, function(o) {
                 if (o.status === 500) {
                   t.triggerEvent("serverError");
                   n()
                 } else {
                   var a = t.getPageData(o);
                   if (a != null) {
                     a.url = r.getAddress();
                     t.cache.cacheUrl(a, t.options.debugMode);
                     t.triggerEvent("pagePreloaded")
                   } else {
                     n(r.getAddress());
                     return
                   }
                   e(t.cache.getPage(r.getAddress()))
                 }
               })
             } else {
               e(t.cache.getPage(r.getAddress()))
             }
           })
         }, n.preloadPages = function() {
           (0, l.queryAll)("[data-swup-preload]").forEach(function(e) {
             n.swup.preloadPage(e.href)
           })
         }, r), d(n, o)
       }
       n(t, [{
         key: "mount",
         value: function e() {
           var t = this.swup;
           t._handlers.pagePreloaded = [];
           t._handlers.hoverLink = [];
           t.preloadPage = this.preloadPage;
           t.preloadPages = this.preloadPages;
           t.delegatedListeners.mouseover = (0, i.default)(document.body, t.options.linkSelector, "mouseover", this.onMouseover.bind(this));
           t.preloadPages();
           t.on("contentReplaced", this.onContentReplaced)
         }
       }, {
         key: "unmount",
         value: function e() {
           var t = this.swup;
           t._handlers.pagePreloaded = null;
           t._handlers.hoverLink = null;
           t.preloadPage = null;
           t.preloadPages = null;
           t.delegatedListeners.mouseover.destroy();
           t.off("contentReplaced", this.onContentReplaced)
         }
       }]);
       return t
     }(a.default);
     t.default = v
   }, function(e, t, r) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: true
     });
     var n = function() {
       function e(e, t) {
         for (var r = 0; r < t.length; r++) {
           var n = t[r];
           n.enumerable = n.enumerable || false;
           n.configurable = true;
           if ("value" in n) n.writable = true;
           Object.defineProperty(e, n.key, n)
         }
       }
       return function(t, r, n) {
         if (r) e(t.prototype, r);
         if (n) e(t, n);
         return t
       }
     }();

     function o(e, t) {
       if (!(e instanceof t)) {
         throw new TypeError("Cannot call a class as a function")
       }
     }
     var a = function() {
       function e() {
         o(this, e);
         this.isSwupPlugin = true
       }
       n(e, [{
         key: "mount",
         value: function e() {}
       }, {
         key: "unmount",
         value: function e() {}
       }, {
         key: "_beforeMount",
         value: function e() {}
       }, {
         key: "_afterUnmount",
         value: function e() {}
       }]);
       return e
     }();
     t.default = a
   }, function(e, t, r) {
     var n = r(5);

     function o(e, t, r, n, o) {
       var a = u.apply(this, arguments);
       e.addEventListener(r, a, o);
       return {
         destroy: function() {
           e.removeEventListener(r, a, o)
         }
       }
     }

     function a(e, t, r, n, a) {
       if (typeof e.addEventListener === "function") {
         return o.apply(null, arguments)
       }
       if (typeof r === "function") {
         return o.bind(null, document).apply(null, arguments)
       }
       if (typeof e === "string") {
         e = document.querySelectorAll(e)
       }
       return Array.prototype.map.call(e, function(e) {
         return o(e, t, r, n, a)
       })
     }

     function u(e, t, r, o) {
       return function(r) {
         r.delegateTarget = n(r.target, t);
         if (r.delegateTarget) {
           o.call(e, r)
         }
       }
     }
     e.exports = a
   }, function(e, t) {
     var r = 9;
     if (typeof Element !== "undefined" && !Element.prototype.matches) {
       var n = Element.prototype;
       n.matches = n.matchesSelector || n.mozMatchesSelector || n.msMatchesSelector || n.oMatchesSelector || n.webkitMatchesSelector
     }

     function o(e, t) {
       while (e && e.nodeType !== r) {
         if (typeof e.matches === "function" && e.matches(t)) {
           return e
         }
         e = e.parentNode
       }
     }
     e.exports = o
   }, function(e, t, r) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: true
     });
     t.Link = t.markSwupElements = t.getCurrentUrl = t.transitionEnd = t.fetch = t.getDataFromHTML = t.createHistoryRecord = t.classify = undefined;
     var n = r(7);
     var o = b(n);
     var a = r(8);
     var u = b(a);
     var i = r(9);
     var l = b(i);
     var f = r(10);
     var s = b(f);
     var c = r(11);
     var d = b(c);
     var p = r(12);
     var v = b(p);
     var y = r(13);
     var h = b(y);
     var g = r(14);
     var m = b(g);

     function b(e) {
       return e && e.__esModule ? e : {
         default: e
       }
     }
     var w = t.classify = o.default;
     var P = t.createHistoryRecord = u.default;
     var _ = t.getDataFromHTML = l.default;
     var k = t.fetch = s.default;
     var M = t.transitionEnd = d.default;
     var j = t.getCurrentUrl = v.default;
     var O = t.markSwupElements = h.default;
     var E = t.Link = m.default
   }, function(e, t, r) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: true
     });
     var n = function e(t) {
       var r = t.toString().toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
       if (r[0] === "/") r = r.splice(1);
       if (r === "") r = "homepage";
       return r
     };
     t.default = n
   }, function(e, t, r) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: true
     });
     var n = function e(t) {
       window.history.pushState({
         url: t || window.location.href.split(window.location.hostname)[1],
         random: Math.random(),
         source: "swup"
       }, document.getElementsByTagName("title")[0].innerText, t || window.location.href.split(window.location.hostname)[1])
     };
     t.default = n
   }, function(e, t, r) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: true
     });
     var n = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
       return typeof e
     } : function(e) {
       return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
     };
     var o = r(0);
     var a = function e(t, r) {
       var a = t.replace("<body", '<div id="swupBody"').replace("</body>", "</div>");
       var u = document.createElement("div");
       u.innerHTML = a;
       var i = [];
       var l = function e(t) {
         if (u.querySelector(r[t]) == null) {
           return {
             v: null
           }
         } else {
           (0, o.queryAll)(r[t]).forEach(function(e, n) {
             (0, o.queryAll)(r[t], u)[n].dataset.swup = i.length;
             i.push((0, o.queryAll)(r[t], u)[n].outerHTML)
           })
         }
       };
       for (var f = 0; f < r.length; f++) {
         var s = l(f);
         if ((typeof s === "undefined" ? "undefined" : n(s)) === "object") return s.v
       }
       var c = {
         title: u.querySelector("title").innerText,
         pageClass: u.querySelector("#swupBody").className,
         originalContent: t,
         blocks: i
       };
       u.innerHTML = "";
       u = null;
       return c
     };
     t.default = a
   }, function(e, t, r) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: true
     });
     var n = Object.assign || function(e) {
       for (var t = 1; t < arguments.length; t++) {
         var r = arguments[t];
         for (var n in r) {
           if (Object.prototype.hasOwnProperty.call(r, n)) {
             e[n] = r[n]
           }
         }
       }
       return e
     };
     var o = function e(t) {
       var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
       var o = {
         url: window.location.pathname + window.location.search,
         method: "GET",
         data: null,
         headers: {}
       };
       var a = n({}, o, t);
       var u = new XMLHttpRequest;
       u.onreadystatechange = function() {
         if (u.readyState === 4) {
           if (u.status !== 500) {
             r(u)
           } else {
             r(u)
           }
         }
       };
       u.open(a.method, a.url, true);
       Object.keys(a.headers).forEach(function(e) {
         u.setRequestHeader(e, a.headers[e])
       });
       u.send(a.data);
       return u
     };
     t.default = o
   }, function(e, t, r) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: true
     });
     var n = function e() {
       var t = document.createElement("div");
       var r = {
         WebkitTransition: "webkitTransitionEnd",
         MozTransition: "transitionend",
         OTransition: "oTransitionEnd otransitionend",
         transition: "transitionend"
       };
       for (var n in r) {
         if (t.style[n] !== undefined) {
           return r[n]
         }
       }
       return false
     };
     t.default = n
   }, function(e, t, r) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: true
     });
     var n = function e() {
       return window.location.pathname + window.location.search
     };
     t.default = n
   }, function(e, t, r) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: true
     });
     var n = r(0);
     var o = function e(t, r) {
       var o = 0;
       var a = function e(a) {
         if (t.querySelector(r[a]) == null) {
           console.warn("Element " + r[a] + " is not in current page.")
         } else {
           (0, n.queryAll)(r[a]).forEach(function(e, u) {
             (0, n.queryAll)(r[a], t)[u].dataset.swup = o;
             o++
           })
         }
       };
       for (var u = 0; u < r.length; u++) {
         a(u)
       }
     };
     t.default = o
   }, function(e, t, r) {
     "use strict";
     Object.defineProperty(t, "__esModule", {
       value: true
     });
     var n = function() {
       function e(e, t) {
         for (var r = 0; r < t.length; r++) {
           var n = t[r];
           n.enumerable = n.enumerable || false;
           n.configurable = true;
           if ("value" in n) n.writable = true;
           Object.defineProperty(e, n.key, n)
         }
       }
       return function(t, r, n) {
         if (r) e(t.prototype, r);
         if (n) e(t, n);
         return t
       }
     }();

     function o(e, t) {
       if (!(e instanceof t)) {
         throw new TypeError("Cannot call a class as a function")
       }
     }
     var a = function() {
       function e(t) {
         o(this, e);
         if (t instanceof Element || t instanceof SVGElement) {
           this.link = t
         } else {
           this.link = document.createElement("a");
           this.link.href = t
         }
       }
       n(e, [{
         key: "getPath",
         value: function e() {
           var t = this.link.pathname;
           if (t[0] !== "/") {
             t = "/" + t
           }
           return t
         }
       }, {
         key: "getAddress",
         value: function e() {
           var t = this.link.pathname + this.link.search;
           if (this.link.getAttribute("xlink:href")) {
             t = this.link.getAttribute("xlink:href")
           }
           if (t[0] !== "/") {
             t = "/" + t
           }
           return t
         }
       }, {
         key: "getHash",
         value: function e() {
           return this.link.hash
         }
       }]);
       return e
     }();
     t.default = a
   }])
 });
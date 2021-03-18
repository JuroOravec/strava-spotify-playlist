// @ts-ignore
/* eslint-disable */
// Taken from https://js-cdn.music.apple.com/musickit/v1/musickit.js
// See https://developer.apple.com/documentation/musickitjs

/**
 * Notes:
 * 1. `MusicKit.configure` calls `MusicKitInstance(developerToken, config)`
 * 2. `MusicKit.configure` config has `features` option
 *      {
 *        legacy-authenticate-method: "POST" | "GET";
 *        equivalencies: boolean;
 *        api-data-store: boolean;
 *        api-artist-include: boolean;
 *      }
 */

! function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(e.MusicKit = {})
}(this, function (e) {
  "use strict";
  var t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

  function unwrapExports(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
  }

  function createCommonjsModule(e, t) {
    return e(t = {
      exports: {}
    }, t.exports), t.exports
  }
  var r = createCommonjsModule(function (e) {
      var t = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
      "number" == typeof __g && (__g = t)
    }),
    i = createCommonjsModule(function (e) {
      var t = e.exports = {
        version: "2.6.3"
      };
      "number" == typeof __e && (__e = t)
    }),
    n = (i.version, function (e) {
      return "object" == typeof e ? null !== e : "function" == typeof e
    }),
    o = function (e) {
      if (!n(e)) throw TypeError(e + " is not an object!");
      return e
    },
    a = function (e) {
      try {
        return !!e()
      } catch (e) {
        return !0
      }
    },
    s = !a(function () {
      return 7 != Object.defineProperty({}, "a", {
        get: function () {
          return 7
        }
      }).a
    }),
    u = r.document,
    c = n(u) && n(u.createElement),
    l = !s && !a(function () {
      return 7 != Object.defineProperty((e = "div", c ? u.createElement(e) : {}), "a", {
        get: function () {
          return 7
        }
      }).a;
    }),
    d = Object.defineProperty,
    p = {
      f: s ? Object.defineProperty : function (e, t, r) {
        if (o(e), t = function (e, t) {
            if (!n(e)) return e;
            var r, i;
            if (t && "function" == typeof (r = e.toString) && !n(i = r.call(e))) return i;
            if ("function" == typeof (r = e.valueOf) && !n(i = r.call(e))) return i;
            if (!t && "function" == typeof (r = e.toString) && !n(i = r.call(e))) return i;
            throw TypeError("Can't convert object to primitive value")
          }(t, !0), o(r), l) try {
          return d(e, t, r)
        } catch (e) {}
        if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");
        return "value" in r && (e[t] = r.value), e
      }
    },
    h = s ? function (e, t, r) {
      return p.f(e, t, function (e, t) {
        return {
          enumerable: !(1 & e),
          configurable: !(2 & e),
          writable: !(4 & e),
          value: t
        }
      }(1, r))
    } : function (e, t, r) {
      return e[t] = r, e
    },
    f = {}.hasOwnProperty,
    y = function (e, t) {
      return f.call(e, t)
    },
    m = 0,
    b = Math.random(),
    _ = function (e) {
      return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++m + b).toString(36))
    },
    v = createCommonjsModule(function (e) {
      var t = _("src"),
        n = Function.toString,
        o = ("" + n).split("toString");
      i.inspectSource = function (e) {
        return n.call(e)
      }, (e.exports = function (e, i, n, a) {
        var s = "function" == typeof n;
        s && (y(n, "name") || h(n, "name", i)), e[i] !== n && (s && (y(n, t) || h(n, t, e[i] ? "" + e[i] : o.join(String(i)))), e === r ? e[i] = n : a ? e[i] ? e[i] = n : h(e, i, n) : (delete e[i], h(e, i, n)))
      })(Function.prototype, "toString", function () {
        return "function" == typeof this && this[t] || n.call(this)
      })
    }),
    g = function (e, t, r) {
      if (function (e) {
          if ("function" != typeof e) throw TypeError(e + " is not a function!")
        }(e), void 0 === t) return e;
      switch (r) {
        case 1:
          return function (r) {
            return e.call(t, r)
          };
        case 2:
          return function (r, i) {
            return e.call(t, r, i)
          };
        case 3:
          return function (r, i, n) {
            return e.call(t, r, i, n)
          }
      }
      return function () {
        return e.apply(t, arguments)
      }
    },
    P = function (e, t, n) {
      var o, a, s, u, c = e & P.F,
        l = e & P.G,
        d = e & P.S,
        p = e & P.P,
        f = e & P.B,
        y = l ? r : d ? r[t] || (r[t] = {}) : (r[t] || {}).prototype,
        m = l ? i : i[t] || (i[t] = {}),
        b = m.prototype || (m.prototype = {});
      for (o in l && (n = t), n) s = ((a = !c && y && void 0 !== y[o]) ? y : n)[o], u = f && a ? g(s, r) : p && "function" == typeof s ? g(Function.call, s) : s, y && v(y, o, s, e & P.U), m[o] != s && h(m, o, u), p && b[o] != s && (b[o] = s)
    };
  r.core = i, P.F = 1, P.G = 2, P.S = 4, P.P = 8, P.B = 16, P.W = 32, P.U = 64, P.R = 128;
  var w, S, k = P,
    E = {}.toString,
    T = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
      return "String" == function (e) {
        return E.call(e).slice(8, -1)
      }(e) ? e.split("") : Object(e)
    },
    I = function (e) {
      if (void 0 == e) throw TypeError("Can't call method on  " + e);
      return e
    },
    A = function (e) {
      return T(I(e))
    },
    C = Math.ceil,
    D = Math.floor,
    R = function (e) {
      return isNaN(e = +e) ? 0 : (e > 0 ? D : C)(e)
    },
    O = Math.min,
    M = Math.max,
    L = Math.min,
    N = createCommonjsModule(function (e) {
      var t = r["__core-js_shared__"] || (r["__core-js_shared__"] = {});
      (e.exports = function (e, r) {
        return t[e] || (t[e] = void 0 !== r ? r : {})
      })("versions", []).push({
        version: i.version,
        mode: "global",
        copyright: "Â© 2019 Denis Pushkarev (zloirock.ru)"
      })
    })("keys"),
    j = (w = !1, function (e, t, r) {
      var i, n, o = A(e),
        a = (i = o.length) > 0 ? O(R(i), 9007199254740991) : 0,
        s = function (e, t) {
          return (e = R(e)) < 0 ? M(e + t, 0) : L(e, t)
        }(r, a);
      if (w && t != t) {
        for (; a > s;)
          if ((n = o[s++]) != n) return !0
      } else
        for (; a > s; s++)
          if ((w || s in o) && o[s] === t) return w || s || 0;
      return !w && -1
    }),
    U = N[S = "IE_PROTO"] || (N[S] = _(S)),
    x = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),
    B = Object.keys || function (e) {
      return function (e, t) {
        var r, i = A(e),
          n = 0,
          o = [];
        for (r in i) r != U && y(i, r) && o.push(r);
        for (; t.length > n;) y(i, r = t[n++]) && (~j(o, r) || o.push(r));
        return o
      }(e, x)
    },
    z = {
      f: Object.getOwnPropertySymbols
    },
    K = {
      f: {}.propertyIsEnumerable
    },
    V = Object.assign,
    q = !V || a(function () {
      var e = {},
        t = {},
        r = Symbol(),
        i = "abcdefghijklmnopqrst";
      return e[r] = 7, i.split("").forEach(function (e) {
        t[e] = e
      }), 7 != V({}, e)[r] || Object.keys(V({}, t)).join("") != i
    }) ? function (e, t) {
      for (var r = Object(I(e)), i = arguments.length, n = 1, o = z.f, a = K.f; i > n;)
        for (var s, u = T(arguments[n++]), c = o ? B(u).concat(o(u)) : B(u), l = c.length, d = 0; l > d;) a.call(u, s = c[d++]) && (r[s] = u[s]);
      return r
    } : V;
  k(k.S + k.F, "Object", {
    assign: q
  });
  i.Object.assign;
  ! function (e) {
    if (!e.fetch) {
      var t = {
        searchParams: "URLSearchParams" in e,
        iterable: "Symbol" in e && "iterator" in Symbol,
        blob: "FileReader" in e && "Blob" in e && function () {
          try {
            return new Blob, !0
          } catch (e) {
            return !1
          }
        }(),
        formData: "FormData" in e,
        arrayBuffer: "ArrayBuffer" in e
      };
      if (t.arrayBuffer) var r = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
        i = function (e) {
          return e && DataView.prototype.isPrototypeOf(e)
        },
        n = ArrayBuffer.isView || function (e) {
          return e && r.indexOf(Object.prototype.toString.call(e)) > -1
        };
      Headers.prototype.append = function (e, t) {
        e = normalizeName(e), t = normalizeValue(t);
        var r = this.map[e];
        this.map[e] = r ? r + "," + t : t
      }, Headers.prototype.delete = function (e) {
        delete this.map[normalizeName(e)]
      }, Headers.prototype.get = function (e) {
        return e = normalizeName(e), this.has(e) ? this.map[e] : null
      }, Headers.prototype.has = function (e) {
        return this.map.hasOwnProperty(normalizeName(e))
      }, Headers.prototype.set = function (e, t) {
        this.map[normalizeName(e)] = normalizeValue(t)
      }, Headers.prototype.forEach = function (e, t) {
        for (var r in this.map) this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this)
      }, Headers.prototype.keys = function () {
        var e = [];
        return this.forEach(function (t, r) {
          e.push(r)
        }), iteratorFor(e)
      }, Headers.prototype.values = function () {
        var e = [];
        return this.forEach(function (t) {
          e.push(t)
        }), iteratorFor(e)
      }, Headers.prototype.entries = function () {
        var e = [];
        return this.forEach(function (t, r) {
          e.push([r, t])
        }), iteratorFor(e)
      }, t.iterable && (Headers.prototype[Symbol.iterator] = Headers.prototype.entries);
      var o = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      Request.prototype.clone = function () {
        return new Request(this, {
          body: this._bodyInit
        })
      }, Body.call(Request.prototype), Body.call(Response.prototype), Response.prototype.clone = function () {
        return new Response(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new Headers(this.headers),
          url: this.url
        })
      }, Response.error = function () {
        var e = new Response(null, {
          status: 0,
          statusText: ""
        });
        return e.type = "error", e
      };
      var a = [301, 302, 303, 307, 308];
      Response.redirect = function (e, t) {
        if (-1 === a.indexOf(t)) throw new RangeError("Invalid status code");
        return new Response(null, {
          status: t,
          headers: {
            location: e
          }
        })
      }, e.Headers = Headers, e.Request = Request, e.Response = Response, e.fetch = function (e, r) {
        return new Promise(function (res, rej) {
          var o = new Request(e, r),
            a = new XMLHttpRequest;
          a.onload = function () {
            var e, t, r = {
              status: a.status,
              statusText: a.statusText,
              headers: (e = a.getAllResponseHeaders() || "", t = new Headers, e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function (e) {
                var r = e.split(":"),
                  i = r.shift().trim();
                if (i) {
                  var n = r.join(":").trim();
                  t.append(i, n)
                }
              }), t)
            };
            r.url = "responseURL" in a ? a.responseURL : r.headers.get("X-Request-URL");
            var n = "response" in a ? a.response : a.responseText;
            res(new Response(n, r))
          }, a.onerror = function () {
            rej(new TypeError("Network request failed"))
          }, a.ontimeout = function () {
            rej(new TypeError("Network request failed"))
          }, a.open(o.method, o.url, !0), "include" === o.credentials ? a.withCredentials = !0 : "omit" === o.credentials && (a.withCredentials = !1), "responseType" in a && t.blob && (a.responseType = "blob"), o.headers.forEach(function (e, t) {
            a.setRequestHeader(t, e)
          }), a.send(void 0 === o._bodyInit ? null : o._bodyInit)
        })
      }, e.fetch.polyfill = !0
    }

    function normalizeName(e) {
      if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
      return e.toLowerCase()
    }

    function normalizeValue(e) {
      return "string" != typeof e && (e = String(e)), e
    }

    function iteratorFor(e) {
      var r = {
        next: function () {
          var t = e.shift();
          return {
            done: void 0 === t,
            value: t
          }
        }
      };
      return t.iterable && (r[Symbol.iterator] = function () {
        return r
      }), r
    }

    function Headers(e) {
      this.map = {}, e instanceof Headers ? e.forEach(function (e, t) {
        this.append(t, e)
      }, this) : Array.isArray(e) ? e.forEach(function (e) {
        this.append(e[0], e[1])
      }, this) : e && Object.getOwnPropertyNames(e).forEach(function (t) {
        this.append(t, e[t])
      }, this)
    }

    function consumed(e) {
      if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
      e.bodyUsed = !0
    }

    function fileReaderReady(e) {
      return new Promise(function (res, rej) {
        e.onload = function () {
          res(e.result)
        }, e.onerror = function () {
          rej(e.error)
        }
      })
    }

    function readBlobAsArrayBuffer(e) {
      var t = new FileReader,
        r = fileReaderReady(t);
      return t.readAsArrayBuffer(e), r
    }

    function bufferClone(e) {
      if (e.slice) return e.slice(0);
      var t = new Uint8Array(e.byteLength);
      return t.set(new Uint8Array(e)), t.buffer
    }

    function Body() {
      return this.bodyUsed = !1, this._initBody = function (e) {
        if (this._bodyInit = e, e)
          if ("string" == typeof e) this._bodyText = e;
          else if (t.blob && Blob.prototype.isPrototypeOf(e)) this._bodyBlob = e;
        else if (t.formData && FormData.prototype.isPrototypeOf(e)) this._bodyFormData = e;
        else if (t.searchParams && URLSearchParams.prototype.isPrototypeOf(e)) this._bodyText = e.toString();
        else if (t.arrayBuffer && t.blob && i(e)) this._bodyArrayBuffer = bufferClone(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
        else {
          if (!t.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(e) && !n(e)) throw new Error("unsupported BodyInit type");
          this._bodyArrayBuffer = bufferClone(e)
        } else this._bodyText = "";
        this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : t.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
      }, t.blob && (this.blob = function () {
        var e = consumed(this);
        if (e) return e;
        if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
        if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        if (this._bodyFormData) throw new Error("could not read FormData body as blob");
        return Promise.resolve(new Blob([this._bodyText]))
      }, this.arrayBuffer = function () {
        return this._bodyArrayBuffer ? consumed(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(readBlobAsArrayBuffer)
      }), this.text = function () {
        var e, t, r, i = consumed(this);
        if (i) return i;
        if (this._bodyBlob) return e = this._bodyBlob, t = new FileReader, r = fileReaderReady(t), t.readAsText(e), r;
        if (this._bodyArrayBuffer) return Promise.resolve(function (e) {
          for (var t = new Uint8Array(e), r = new Array(t.length), i = 0; i < t.length; i++) r[i] = String.fromCharCode(t[i]);
          return r.join("")
        }(this._bodyArrayBuffer));
        if (this._bodyFormData) throw new Error("could not read FormData body as text");
        return Promise.resolve(this._bodyText)
      }, t.formData && (this.formData = function () {
        return this.text().then(decode)
      }), this.json = function () {
        return this.text().then(JSON.parse)
      }, this
    }

    function Request(e, t) {
      var r, i, n = (t = t || {}).body;
      if (e instanceof Request) {
        if (e.bodyUsed) throw new TypeError("Already read");
        this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new Headers(e.headers)), this.method = e.method, this.mode = e.mode, n || null == e._bodyInit || (n = e._bodyInit, e.bodyUsed = !0)
      } else this.url = String(e);
      if (this.credentials = t.credentials || this.credentials || "omit", !t.headers && this.headers || (this.headers = new Headers(t.headers)), this.method = (r = t.method || this.method || "GET", i = r.toUpperCase(), o.indexOf(i) > -1 ? i : r), this.mode = t.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");
      this._initBody(n)
    }

    function decode(e) {
      var t = new FormData;
      return e.trim().split("&").forEach(function (e) {
        if (e) {
          var r = e.split("="),
            i = r.shift().replace(/\+/g, " "),
            n = r.join("=").replace(/\+/g, " ");
          t.append(decodeURIComponent(i), decodeURIComponent(n))
        }
      }), t
    }

    function Response(e, t) {
      t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new Headers(t.headers), this.url = t.url || "", this._initBody(e)
    }
  }("undefined" != typeof self ? self : void 0);
  var F = function (e, t) {
    return (F = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function (e, t) {
        e.__proto__ = t
      } || function (e, t) {
        for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
      })(e, t)
  };

  function __extends(e, t) {
    function __() {
      this.constructor = e
    }
    F(e, t), e.prototype = null === t ? Object.create(t) : (__.prototype = t.prototype, new __)
  }

  function __awaiter(e, t, r, i) {
    return new(r || (r = Promise))(function (n, o) {
      function fulfilled(e) {
        try {
          step(i.next(e))
        } catch (e) {
          o(e)
        }
      }

      function rejected(e) {
        try {
          step(i.throw(e))
        } catch (e) {
          o(e)
        }
      }

      function step(e) {
        e.done ? n(e.value) : new r(function (t) {
          t(e.value)
        }).then(fulfilled, rejected)
      }
      step((i = i.apply(e, t || [])).next())
    })
  }

  function __generator(e, t) {
    var r, i, n, o, a = {
      label: 0,
      sent: function () {
        if (1 & n[0]) throw n[1];
        return n[1]
      },
      trys: [],
      ops: []
    };
    return o = {
      next: verb(0),
      throw: verb(1),
      return: verb(2)
    }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
      return this
    }), o;

    function verb(o) {
      return function (s) {
        return function (o) {
          if (r) throw new TypeError("Generator is already executing.");
          for (; a;) try {
            if (r = 1, i && (n = 2 & o[0] ? i.return : o[0] ? i.throw || ((n = i.return) && n.call(i), 0) : i.next) && !(n = n.call(i, o[1])).done) return n;
            switch (i = 0, n && (o = [2 & o[0], n.value]), o[0]) {
              case 0:
              case 1:
                n = o;
                break;
              case 4:
                return a.label++, {
                  value: o[1],
                  done: !1
                };
              case 5:
                a.label++, i = o[1], o = [0];
                continue;
              case 7:
                o = a.ops.pop(), a.trys.pop();
                continue;
              default:
                if (!(n = (n = a.trys).length > 0 && n[n.length - 1]) && (6 === o[0] || 2 === o[0])) {
                  a = 0;
                  continue
                }
                if (3 === o[0] && (!n || o[1] > n[0] && o[1] < n[3])) {
                  a.label = o[1];
                  break
                }
                if (6 === o[0] && a.label < n[1]) {
                  a.label = n[1], n = o;
                  break
                }
                if (n && a.label < n[2]) {
                  a.label = n[2], a.ops.push(o);
                  break
                }
                n[2] && a.ops.pop(), a.trys.pop();
                continue
            }
            o = t.call(e, a)
          } catch (e) {
            o = [6, e], i = 0
          } finally {
            r = n = 0
          }
          if (5 & o[0]) throw o[1];
          return {
            value: o[0] ? o[1] : void 0,
            done: !0
          }
        }([o, s])
      }
    }
  }
  var H = createCommonjsModule(function (e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = function () {
      function Nonsole() {}
      return Nonsole.prototype.log = function () {}, Nonsole
    }();
    t.Nonsole = r;
    var i = function () {
      function Logger(e) {
        void 0 === e && (e = 5), this._level = e, this._console = this._availableConsole()
      }
      return Object.defineProperty(Logger.prototype, "enabled", {
        get: function () {
          return this.level < 5
        },
        set: function (e) {
          this.level = e ? 1 : 5
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Logger.prototype, "level", {
        get: function () {
          return this._level
        },
        set: function (e) {
          this._level = e, this._console = this._availableConsole()
        },
        enumerable: !0,
        configurable: !0
      }), Logger.prototype.debug = function (e) {
        for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        this._perform("debug", arguments)
      }, Logger.prototype.error = function (e) {
        for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        this._perform("error", arguments)
      }, Logger.prototype.log = function (e) {
        for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        this._perform("log", arguments)
      }, Logger.prototype.trace = function (e) {
        for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        this._perform("trace", arguments)
      }, Logger.prototype.warn = function (e) {
        for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        this._perform("warn", arguments)
      }, Logger.prototype._availableConsole = function () {
        return console && this.level < 5 ? console : new r
      }, Logger.prototype._perform = function (e) {
        for (var t, r = [], i = 1; i < arguments.length; i++) r[i - 1] = arguments[i];
        var n = ["trace", "debug", "info", "warn", "error", "silent"].splice(this.level),
          o = "log" === e ? "debug" : e; - 1 !== n.indexOf(o) && (this._console[e] || (e = "log"), (t = this._console[e]).apply.apply(t, [this._console].concat(r)))
      }, Logger
    }();
    t.Logger = i
  });
  unwrapExports(H);
  H.Nonsole;
  var W = H.Logger,
    G = function () {
      function Timeline() {
        this._events = {}, this._keys = []
      }
      return Object.defineProperty(Timeline.prototype, "events", {
        get: function () {
          return this._events
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Timeline.prototype, "first", {
        get: function () {
          return this.at(0)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Timeline.prototype, "keys", {
        get: function () {
          return this._keys
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Timeline.prototype, "last", {
        get: function () {
          return this.at(this.length - 1)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Timeline.prototype, "length", {
        get: function () {
          return this._keys.length
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Timeline.prototype, "second", {
        get: function () {
          return this.at(1)
        },
        enumerable: !0,
        configurable: !0
      }), Timeline.prototype.at = function (e) {
        if (e > this.length - 1) throw new Error("Invalid timeline index");
        var t = this._keys[e];
        return this._events[t]
      }, Timeline.prototype.before = function (e) {
        if ("number" != typeof e) {
          var t = [];
          for (var r in this._events) this._events.hasOwnProperty(r) && t.push(this._events[r]);
          e = this._keys[t.indexOf(e)]
        }
        var i = this._keys.indexOf(e);
        if (-1 === i) throw new Error("Key not found");
        if (i > 0) return this._events[this._keys[i - 1]]
      }, Timeline.prototype.drain = function () {
        var e = this,
          t = this._keys.map(function (t) {
            return e._events[t]
          });
        return this.reset(), t
      }, Timeline.prototype.reset = function () {
        this._events = {}, this._keys = []
      }, Timeline.prototype.pop = function () {
        return __awaiter(this, void 0, void 0, function () {
          var e, t;
          return __generator(this, function (r) {
            return (e = this._keys.pop()) ? (t = this._events[e], delete this._events[e], [2, Promise.resolve(t)]) : [2, Promise.reject("TIMELINE IS EMPTY")]
          })
        })
      }, Timeline.prototype.add = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.push(e, t)]
          })
        })
      }, Timeline.prototype.push = function (e, t) {
        return void 0 === t && (t = Date.now()), __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            for (; - 1 !== this._keys.indexOf(t);) t++;
            return this._events[t] = e, this._keys.push(t), [2, Promise.resolve(t)]
          })
        })
      }, Timeline.prototype.shift = function () {
        return __awaiter(this, void 0, void 0, function () {
          var e, t;
          return __generator(this, function (r) {
            return (e = this._keys.shift()) ? (t = this._events[e], delete this._events[e], [2, Promise.resolve(t)]) : [2, Promise.reject("TIMELINE IS EMPTY")]
          })
        })
      }, Timeline.prototype.unshift = function (e, t) {
        return void 0 === t && (t = Date.now()), __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            for (; - 1 !== this._keys.indexOf(t);) t++;
            return this._events[t] = e, this._keys.unshift(t), [2, Promise.resolve(t)]
          })
        })
      }, Timeline
    }(),
    Y = "\n#musickit-dialog-scrim {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.35);\n}\n\n#musickit-dialog * {\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  -ms-touch-action: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  font-family: -apple-system, SF UI Text, Helvetica Neue, Helvetica, sans-serif;\n  font-size: 15px;\n  line-height: 20px;\n  font-weight: 300;\n}\n\n#musickit-dialog *:focus { outline: 0; }\n\n#musickit-dialog {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  flex-direction: column;\n  -webkit-justify-content: space-between;\n  -moz-justify-content: space-between;\n  justify-content: space-between;\n  min-width: 277px;\n  max-width: 283px;\n  min-height: 109px;\n  max-height: 150px;\n  background: rgba(255, 255, 255, 1);\n  box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.18);\n  border-radius: 10px;\n  color: #333;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  margin-left: -142px;\n  margin-top: -67px;\n  background: rgba(255, 255, 255, 0.95);\n  z-index: 9999999999999999999999999;\n}\n\n#musickit-dialog aside {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  flex-direction: column;\n  flex-grow: 1;\n  -webkit-justify-content: space-evenly;\n  -moz-justify-content: space-evenly;\n  justify-content: space-evenly;\n  -webkit-align-items: stretch;\n  align-items: stretch;\n  padding: 0px 20px;\n  max-height: 108px;\n  min-height: 74px;\n  text-align: center;\n}\n\n#musickit-dialog aside h5 {\n  font-weight: 500;\n  line-height: 20px;\n  margin: 7px 0 0 0;\n  padding: 0;\n}\n\n#musickit-dialog aside p {\n  margin: 0 0 7px 0;\n  padding: 0;\n  line-height: 18px;\n  font-size: 13px;\n}\n\n#musickit-dialog nav {\n  border-top: 1px solid #E2E2E2;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: row;\n  -moz-flex-direction: colrowumn;\n  flex-direction: row;\n  max-height: 41px;\n  min-height: 34px;\n  -webkit-justify-self: flex-end;\n  -moz-justify-self: flex-end;\n  justify-self: flex-end;\n}\n\n#musickit-dialog nav button {\n  flex-grow: 1;\n  border: 0;\n  background: none;\n  color: #C82C4C;\n  padding: 0;\n  margin: 0;\n  min-height: 34px;\n  height: 41px;\n  text-align: center;\n}\n\n#musickit-dialog nav *:nth-child(2) {\n  border-left: 1px solid #E2E2E2;\n  font-weight: 500;\n}\n",
    Q = function () {
      function MKDialog(e, t) {
        void 0 === t && (t = ""), this._message = e, this._explanation = t, this.id = "musickit-dialog", this.scrimId = this.id + "-scrim", this.styleId = this.id + "-style", this._okButtonString = "OK", [this.id, this.scrimId, this.styleId].forEach(function (e) {
          try {
            var t = document.getElementById(e);
            t.parentElement.removeChild(t)
          } catch (e) {}
        }), this._appendStyle(Y)
      }
      return MKDialog.serverDialog = function (e) {
        var t = new this(e.message, e.explanation);
        return e.okButtonAction && e.okButtonAction.url && (t._okButtonActionURL = e.okButtonAction.url), e.okButtonString && (t._okButtonString = e.okButtonString), e.cancelButtonString && (t._cancelButtonString = e.cancelButtonString), t
      }, Object.defineProperty(MKDialog.prototype, "actions", {
        get: function () {
          return this.cancelButton ? "<nav>" + this.cancelButton + this.okButton + "</nav>" : "<nav>" + this.okButton + "</nav>"
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MKDialog.prototype, "cancelButton", {
        get: function () {
          if ("string" == typeof this._cancelButtonString) return "<button>" + this._cancelButtonString + "</button>"
        },
        set: function (e) {
          this._cancelButtonString = e
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MKDialog.prototype, "explanation", {
        get: function () {
          return "<p>" + this._explanation + "</p>"
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MKDialog.prototype, "hasOKButtonAction", {
        get: function () {
          return !!this._okButtonActionURL
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MKDialog.prototype, "message", {
        get: function () {
          return "<h5>" + this._message + "</h5>"
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MKDialog.prototype, "okButton", {
        get: function () {
          return this.hasOKButtonAction ? "<button data-ok-action-url='" + this._okButtonActionURL + "'>" + this._okButtonString + "</button>" : "<button>" + this._okButtonString + "</button>"
        },
        enumerable: !0,
        configurable: !0
      }), MKDialog.prototype.present = function () {
        var e = this,
          t = document.createDocumentFragment(),
          r = document.createElement("div");
        r.id = this.scrimId, t.appendChild(r);
        var i = document.createElement("div");
        i.id = this.id;
        var n = "<aside>" + this.message + this.explanation + "</aside>";
        n = "" + n + this.actions, i.innerHTML = n, t.appendChild(i), document.body.appendChild(t), setTimeout(function () {
          document.querySelector("#" + i.id + " nav *:first-child").addEventListener("mouseup", function () {
            i.parentElement.removeChild(i), r.parentElement.removeChild(r)
          }), e.hasOKButtonAction && document.querySelector("#" + i.id + " nav *:last-child").addEventListener("mouseup", function (e) {
            window.open(e.target.dataset.okActionUrl, "_blank"), i.parentElement.removeChild(i), r.parentElement.removeChild(r)
          })
        })
      }, MKDialog.prototype._appendStyle = function (e) {
        var t = document.createElement("style");
        t.id = this.styleId, t.type = "text/css", t.styleSheet ? t.styleSheet.cssText = e : t.innerHTML = e, document.body.appendChild(t)
      }, MKDialog
    }(),
    $ = "UNKNOWN_ERROR",
    Z = {
      400: "REQUEST_ERROR",
      401: "UNAUTHORIZED_ERROR",
      403: "ACCESS_DENIED",
      404: "NOT_FOUND",
      405: "NOT_FOUND",
      413: "REQUEST_ERROR",
      414: "REQUEST_ERROR",
      429: "QUOTA_EXCEEDED",
      500: "SERVER_ERROR",
      501: "NOT_FOUND",
      503: "SERVICE_UNAVAILABLE"
    },
    X = {
      1010: Z[404],
      2002: "AUTHORIZATION_ERROR",
      2034: "TOKEN_EXPIRED",
      3059: "DEVICE_LIMIT",
      3063: "SUBSCRIPTION_ERROR",
      3076: "CONTENT_UNAVAILABLE",
      3082: "CONTENT_RESTRICTED",
      3084: "STREAM_UPSELL",
      5002: Z[500]
    },
    J = [],
    MKError = function (e) {
      function MKError(t, r) {
        var i = e.call(this) || this;
        return i.errorCode = $, r || "string" != typeof t ? (i.name = i.errorCode = t || $, r && (i.message = i.description = r)) : (i.name = i.errorCode = $, i.message = i.description = t), J.push(i), Error.captureStackTrace && Error.captureStackTrace(i, MKError), i.presentDialog = function () {
          i.dialog ? Q.serverDialog(i.dialog).present() : new Q(i.message).present()
        }, i
      }
      return __extends(MKError, e), Object.defineProperty(MKError, "errors", {
        get: function () {
          return J
        },
        enumerable: !0,
        configurable: !0
      }), MKError.playActivityError = function (e) {
        return new this("PLAY_ACTIVITY", e)
      }, MKError.parseError = function (e) {
        return new this("PARSE_ERROR", e)
      }, MKError.responseError = function (e) {
        var t = e.status,
          r = e.statusText;
        return new this(Z[t] || "NETWORK_ERROR", r || "" + t)
      }, MKError.serverError = function (e) {
        var t = e.status,
          r = e.dialog,
          i = e.failureType,
          n = e.customerMessage,
          o = e.errorMessage,
          a = e.message;
        r && (a = r.message || r.customerMessage || r.errorMessage);
        var s = X[i] || X[t] || $,
          u = new this(s, a || n || o);
        return "STREAM_UPSELL" === s && r.okButtonAction && r.okButtonAction.url && (r.okButtonAction.url = r.okButtonAction.url.replace(/\&(?:challenge|key-system|uri|user-initiated)=[^\&]+/gim, "")), u.dialog = r, u
      }, MKError.ACCESS_DENIED = Z[403], MKError.AUTHORIZATION_ERROR = X[2002], MKError.CONFIGURATION_ERROR = "CONFIGURATION_ERROR", MKError.CONTENT_EQUIVALENT = "CONTENT_EQUIVALENT", MKError.CONTENT_RESTRICTED = X[3082], MKError.CONTENT_UNAVAILABLE = X[3076], MKError.DEVICE_LIMIT = X[3059], MKError.INVALID_ARGUMENTS = "INVALID_ARGUMENTS", MKError.MEDIA_CERTIFICATE = "MEDIA_CERTIFICATE", MKError.MEDIA_DESCRIPTOR = "MEDIA_DESCRIPTOR", MKError.MEDIA_LICENSE = "MEDIA_LICENSE", MKError.MEDIA_KEY = "MEDIA_KEY", MKError.MEDIA_PLAYBACK = "MEDIA_PLAYBACK", MKError.MEDIA_SESSION = "MEDIA_SESSION", MKError.NETWORK_ERROR = "NETWORK_ERROR", MKError.NOT_FOUND = X[1010], MKError.PARSE_ERROR = "PARSE_ERROR", MKError.PLAY_ACTIVITY = "PLAY_ACTIVITY", MKError.QUOTA_EXCEEDED = Z[429], MKError.REQUEST_ERROR = Z[400], MKError.SERVER_ERROR = X[5002], MKError.SERVICE_UNAVAILABLE = Z[503], MKError.STREAM_UPSELL = X[3084], MKError.SUBSCRIPTION_ERROR = X[3063], MKError.TOKEN_EXPIRED = X[2034], MKError.UNAUTHORIZED_ERROR = Z[401], MKError.UNKNOWN_ERROR = $, MKError.UNSUPPORTED_ERROR = "UNSUPPORTED_ERROR", MKError
    }(Error),
    te = /\/([a-z]{2})\/(album|playlist|podcast|song|station)\/(?:[^\/]*\/)?(?:id)?(\d+|[a-z]{2}\.[a-z0-9\-]+)(?:.*(?:[\?|\&]i=(\d+)).*)?.*$/i;

  function formattedSeconds(e) {
    return {
      hours: Math.floor(e / 3600),
      minutes: Math.floor(e % 3600 / 60)
    }
  }

  function formatMediaTime(e, t) {
    void 0 === t && (t = ":");
    var r = formattedSeconds(e),
      i = r.hours,
      n = r.minutes;
    e = Math.floor(e % 3600 % 60);
    var o = [];
    return i ? (o.push("" + i), o.push(n < 10 ? "0" + n : "" + n)) : o.push("" + n), o.push(e < 10 ? "0" + e : "" + e), o.join(t)
  }

  function formattedMediaURL(e) {
    if (!te.test(e)) throw new TypeError("Invalid Media URL: " + e);
    var t = e.match(te),
      r = t[1],
      i = t[2],
      n = t[3],
      o = t[4];
    return -1 !== ["album", "playlist"].indexOf(i) && o ? (i = "song", n = o) : "podcast" === i && o && (i = "episode", n = o), {
      storefrontId: r,
      kind: i,
      contentId: n
    }
  }

  function isLibraryType(e) {
    return /^[a|i|l|p]{1}\.[a-zA-Z0-9]+$/.test(e)
  }

  function hasAuthorization(e) {
    return void 0 !== e && e.hasAuthorized && e.userTokenIsValid
  }
  var re = createCommonjsModule(function (e, t) {
    function strRandomizer() {
      return Math.random().toString(16).substring(2)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.generateUUID = function () {
      for (var e = strRandomizer() + strRandomizer(); e.length < 16;) e += strRandomizer();
      return e.slice(0, 16)
    }, t.isLibraryType = function (e) {
      return /^(?:[a|i|l|p]{1}\.|pl\.u\-)[a-zA-Z0-9]+$/.test(e)
    }
  });
  unwrapExports(re);
  var ie = re.generateUUID,
    ne = (re.isLibraryType, createCommonjsModule(function (e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = function () {
        function GenericStorage() {
          this._data = {}
        }
        return GenericStorage.prototype.clear = function () {
          this._data = {}
        }, GenericStorage.prototype.getItem = function (e) {
          return this._data[e]
        }, GenericStorage.prototype.removeItem = function (e) {
          delete this._data[e]
        }, GenericStorage.prototype.setItem = function (e, t) {
          this._data[e] = t
        }, GenericStorage
      }();
      t.GenericStorage = r, t.getCookie = function (e) {
        void 0 === e && (e = "");
        var t = document.cookie.match(new RegExp("(?:^|;\\s*)" + e + "=([^;]*)"));
        if (t) return t[1]
      }, t.setCookie = function (e, t, r, i) {
        void 0 === r && (r = ""), void 0 === i && (i = 14);
        var n = new Date,
          o = /\./.test(window.location.hostname) ? window.location.hostname : "";
        /^(?:[a-z\-]+\.)?(?:music|itunes)\.apple\.com$/i.test(o) && (o = "domain=apple.com"), n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3), window.document.cookie = e + "=" + t + "; expires=" + n.toUTCString() + "; " + o + "; path=" + r
      }
    }));
  unwrapExports(ne);
  ne.GenericStorage;
  var oe, ae, se, ue, ce, le, de, pe, he, fe = ne.getCookie,
    ye = ne.setCookie;
  ! function (e) {
    e.MUSICKIT = "music_kit-integration", e.OTHER = "other", e.MINI = "mini", e.SONG = "song", e.ALBUM = "album", e.ALBUM_CLASSICAL = "album-classical", e.ARTIST = "artist", e.COMPILATION = "compilation", e.COMPILATION_CLASSICAL = "compilation-classical", e.PLAYLIST = "playlist", e.PLAYLIST_CLASSICAL = "playlist-classical", e.SEARCH = "search"
  }(oe || (oe = {})),
  function (e) {
    e[e.UNKNOWN = 0] = "UNKNOWN", e[e.RADIO = 1] = "RADIO", e[e.PLAYLIST = 2] = "PLAYLIST", e[e.ALBUM = 3] = "ALBUM", e[e.ARTIST = 4] = "ARTIST"
  }(ae || (ae = {})),
  function (e) {
    e[e.NOT_APPLICABLE = 0] = "NOT_APPLICABLE", e[e.OTHER = 1] = "OTHER", e[e.TRACK_SKIPPED_FORWARDS = 2] = "TRACK_SKIPPED_FORWARDS", e[e.PLAYBACK_MANUALLY_PAUSED = 3] = "PLAYBACK_MANUALLY_PAUSED", e[e.PLAYBACK_SUSPENDED = 4] = "PLAYBACK_SUSPENDED", e[e.MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM = 5] = "MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM", e[e.PLAYBACK_PAUSED_DUE_TO_INACTIVITY = 6] = "PLAYBACK_PAUSED_DUE_TO_INACTIVITY", e[e.NATURAL_END_OF_TRACK = 7] = "NATURAL_END_OF_TRACK", e[e.PLAYBACK_STOPPED_DUE_TO_SESSION_TIMEOUT = 8] = "PLAYBACK_STOPPED_DUE_TO_SESSION_TIMEOUT", e[e.TRACK_BANNED = 9] = "TRACK_BANNED", e[e.FAILED_TO_LOAD = 10] = "FAILED_TO_LOAD", e[e.PAUSED_ON_TIMEOUT = 11] = "PAUSED_ON_TIMEOUT", e[e.SCRUB_BEGIN = 12] = "SCRUB_BEGIN", e[e.SCRUB_END = 13] = "SCRUB_END", e[e.TRACK_SKIPPED_BACKWARDS = 14] = "TRACK_SKIPPED_BACKWARDS", e[e.NOT_SUPPORTED_BY_CLIENT = 15] = "NOT_SUPPORTED_BY_CLIENT", e[e.QUICK_PLAY = 16] = "QUICK_PLAY", e[e.EXITED_APPLICATION = 17] = "EXITED_APPLICATION"
  }(se || (se = {})),
  function (e) {
    e[e.NOT_SPECIFIED = 0] = "NOT_SPECIFIED", e[e.CONTAINER_CHANGED = 1] = "CONTAINER_CHANGED"
  }(ue || (ue = {})),
  function (e) {
    e[e.PLAY_END = 0] = "PLAY_END", e[e.PLAY_START = 1] = "PLAY_START"
  }(ce || (ce = {})),
  function (e) {
    e[e.INVALID = 0] = "INVALID", e[e.ITUNES_STORE_CONTENT = 1] = "ITUNES_STORE_CONTENT", e[e.NON_SONG_CLIP = 2] = "NON_SONG_CLIP", e[e.AD = 3] = "AD", e[e.STREAM = 4] = "STREAM", e[e.AUDIO_AD = 5] = "AUDIO_AD", e[e.VIDEO_AD = 6] = "VIDEO_AD", e[e.TIMED_METADATA_PING = 7] = "TIMED_METADATA_PING", e[e.ARTIST_UPLOADED_CONTENT = 8] = "ARTIST_UPLOADED_CONTENT", e[e.AGGREGATE_NON_CATALOG_PLAY_TIME = 9] = "AGGREGATE_NON_CATALOG_PLAY_TIME", e[e.ORIGINAL_CONTENT_MOVIES = 10] = "ORIGINAL_CONTENT_MOVIES", e[e.ORIGINAL_CONTENT_SHOWS = 11] = "ORIGINAL_CONTENT_SHOWS"
  }(le || (le = {})),
  function (e) {
    e[e.AUDIO = 0] = "AUDIO", e[e.VIDEO = 1] = "VIDEO"
  }(de || (de = {})),
  function (e) {
    e[e.AUTO = 0] = "AUTO", e[e.MANUAL = 1] = "MANUAL"
  }(pe || (pe = {})),
  function (e) {
    e[e.WEBPLAYER = 8] = "WEBPLAYER", e[e.MUSICKIT = 10] = "MUSICKIT"
  }(he || (he = {}));

  function mediaRequiresPlayActivity(e) {
    return e && "song" === e.type
  }
  var me, PlayActivity = function () {
      function PlayActivity(e, t, r, i) {
        this.accessToken = e, this.musicUserToken = t, this.storefrontId = r, this.privateEnabled = !1, this.siriInitiated = !1, this.clientId = "JSCLIENT", this.eventType = "JSPLAY", this.internalBuild = !1, this.sourceType = he.MUSICKIT, this.timeline = new G, this._logInfo = !1, this._mode = pe.AUTO, this._navigator = navigator, this._utcOffset = (new Date).getTimezoneOffset(), i && (this._appInfo = i.app, this._logInfo = i.logInfo || !1, this._utcOffset = i.utcOffset || (new Date).getTimezoneOffset(), this._userAgent = i.userAgent, this.sourceType = i.sourceType && "number" == typeof i.sourceType ? i.sourceType : he.MUSICKIT), this.buildVersion = this._generateBuildVersion()
      }
      return Object.defineProperty(PlayActivity.prototype, "appID", {
        get: function () {
          if (!this._appInfo || !this._appInfo.name) return "MusicKitApp/1.0";
          if (!this._appId) {
            var e = this._appInfo.name.toLowerCase().replace(/[-_]+/g, " ").replace(/[^\w\s]/g, "").replace(/\b./g, function (e) {
              return e.toUpperCase()
            }).replace(/\s/g, "");
            this._appId = e + "/" + (this._appInfo.version || "1.0")
          }
          return this._appId
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(PlayActivity.prototype, "utcOffsetInSeconds", {
        get: function () {
          if (!this._utcOffsetInSeconds && this._utcOffset) {
            var e = 60 * this._utcOffset;
            this._utcOffsetInSeconds = e < 0 ? Math.abs(e) : -e
          }
          return this._utcOffsetInSeconds
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(PlayActivity.prototype, "userAgent", {
        get: function () {
          return this._userAgent || navigator.userAgent
        },
        enumerable: !0,
        configurable: !0
      }), PlayActivity.prototype.activate = function (e) {
        return void 0 === e && (e = !1), __awaiter(this, void 0, void 0, function () {
          var t;
          return __generator(this, function (r) {
            switch (r.label) {
              case 0:
                return e ? [4, this.flush()] : [3, 2];
              case 1:
                r.sent(), r.label = 2;
              case 2:
                return (t = this.timeline.last) && t.endReasonType === se.EXITED_APPLICATION ? [2, this.timeline.pop()] : [2]
            }
          })
        })
      }, PlayActivity.prototype.exit = function (e) {
        return void 0 === e && (e = 0), __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (t) {
            return [2, this.stop(e, se.EXITED_APPLICATION)]
          })
        })
      }, PlayActivity.prototype.pause = function (e) {
        return void 0 === e && (e = 0), __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (t) {
            return [2, this.stop(e, se.PLAYBACK_MANUALLY_PAUSED)]
          })
        })
      }, PlayActivity.prototype.play = function (e, t) {
        return void 0 === t && (t = 0), __awaiter(this, void 0, void 0, function () {
          var r, i, n, o, a;
          return __generator(this, function (s) {
            switch (s.label) {
              case 0:
                return r = this.timeline.length > 0, !e && r ? ((n = this._previousDescriptor()).eventType === ce.PLAY_END && delete n.endReasonType, i = Object.assign(n, {
                  eventType: ce.PLAY_START,
                  timestamp: Date.now()
                }), [2, this._addToTimeline(i)]) : r ? (n = this._previousDescriptor()).eventType !== ce.PLAY_START && n.endReasonType !== se.SCRUB_END ? [3, 2] : (o = Object.assign(n, {
                  eventType: ce.PLAY_END,
                  endReasonType: se.MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM,
                  timestamp: Date.now(),
                  position: t
                }), [4, this._addToTimeline(o)]) : [3, 2];
              case 1:
                s.sent(), t = 0, s.label = 2;
              case 2:
                return a = Object.assign(e, {
                  eventType: ce.PLAY_START,
                  timestamp: Date.now(),
                  position: t
                }), [2, this._addToTimeline(a)]
            }
          })
        })
      }, PlayActivity.prototype.scrub = function (e, t) {
        return void 0 === e && (e = 0), void 0 === t && (t = se.SCRUB_BEGIN), __awaiter(this, void 0, void 0, function () {
          var r, i;
          return __generator(this, function (n) {
            return r = this._previousDescriptor(), t === se.SCRUB_END && r.endReasonType !== se.SCRUB_BEGIN ? [2, Promise.reject(MKError.playActivityError("The scrub() method was called with the SCRUB_END action without a previous SCRUB_START descriptor"))] : (i = Object.assign(r, {
              eventType: ce.PLAY_END,
              endReasonType: t,
              timestamp: Date.now(),
              position: e
            }), [2, this._addToTimeline(i)])
          })
        })
      }, PlayActivity.prototype.skip = function (e, t, r) {
        return void 0 === t && (t = se.TRACK_SKIPPED_FORWARDS), void 0 === r && (r = 0), __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, this.stop(r, t)];
              case 1:
                return i.sent(), [2, this.play(e)]
            }
          })
        })
      }, PlayActivity.prototype.stop = function (e, t) {
        return void 0 === e && (e = 0), void 0 === t && (t = se.NATURAL_END_OF_TRACK), __awaiter(this, void 0, void 0, function () {
          var r, i;
          return __generator(this, function (n) {
            switch (n.label) {
              case 0:
                return (r = this._previousDescriptor()).endReasonType !== se.EXITED_APPLICATION ? [3, 2] : [4, this.timeline.pop()];
              case 1:
                n.sent(), ye("amupaee", "", "/", 0), r = this._previousDescriptor(), n.label = 2;
              case 2:
                return r.eventType === ce.PLAY_START || r.endReasonType === se.SCRUB_END ? (i = Object.assign(r, {
                  eventType: ce.PLAY_END,
                  timestamp: Date.now(),
                  endReasonType: t,
                  position: e
                }), [2, this._addToTimeline(i)]) : [2, Promise.reject(MKError.playActivityError("A play stop() method was called without a previous play() descriptor"))]
            }
          })
        })
      }, PlayActivity.prototype.build = function (e, t) {
        if (void 0 === e && (e = this.timeline.last), !e) throw MKError.playActivityError("build() called without a play activity descriptor");
        var r = e.cloudId,
          i = e.container,
          n = e.duration,
          o = void 0 === n ? 0 : n,
          a = e.endReasonType,
          s = e.eventType,
          u = void 0 === s ? ce.PLAY_START : s,
          c = e.id,
          l = e.itemType,
          d = void 0 === l ? le.ITUNES_STORE_CONTENT : l,
          p = e.mediaType,
          h = void 0 === p ? de.AUDIO : p,
          f = e.position,
          y = void 0 === f ? 0 : f,
          m = e.timestamp,
          b = "-1" === c ? {} : {
            "subscription-adam-id": c
          };
        if (r && (b["cloud-id"] = r), t || (t = this.timeline.before(e)), u === ce.PLAY_END && !t) throw MKError.playActivityError("Cannot build() for PLAY_END descriptors without previous descriptors");
        var _ = !1;
        i && (_ = !t || !t.container || i.id !== t.container.id);
        var v = Math.round(1e3 * o),
          g = m ? Date.now() - m : 0,
          P = Math.round(1e3 * y),
          w = {
            "build-version": this.buildVersion,
            "developer-token": this.accessToken,
            "event-type": u,
            ids: b,
            "internal-build": this.internalBuild,
            "media-duration-in-milliseconds": v,
            "media-type": h,
            "milliseconds-since-play": g,
            offline: !1,
            "persistent-id": ie(),
            "private-enabled": this.privateEnabled,
            "sb-enabled": !0,
            "siri-initiated": this.siriInitiated,
            "source-type": this.sourceType,
            "start-position-in-milliseconds": P,
            "store-front": this.storefrontId,
            type: d,
            "user-agent": this.userAgent,
            "user-token": this.musicUserToken,
            "utc-offset-in-seconds": this.utcOffsetInSeconds || -1
          };
        if (u === ce.PLAY_START ? w["event-reason-hint-type"] = _ ? ue.CONTAINER_CHANGED : ue.NOT_SPECIFIED : u === ce.PLAY_END && t && void 0 !== t.position && (w["end-position-in-milliseconds"] = P, P > v && (w["media-duration-in-milliseconds"] = P), w["start-position-in-milliseconds"] = Math.round(1e3 * t.position), w["end-reason-type"] = a), i) {
          var S = void 0;
          if ("string" == typeof i.type) switch (i.type) {
            case "album":
            case "albums":
            case "library-albums":
              S = ae.ALBUM;
              break;
            case "artist":
            case "artists":
            case "library-artists":
              S = ae.ARTIST;
              break;
            case "playlist":
            case "playlists":
            case "library-playlists":
              S = ae.PLAYLIST;
              break;
            case "radio":
            case "radioStation":
            case "station":
            case "stations":
              S = ae.RADIO
          } else "number" == typeof i.type && (S = i.type);
          w["feature-name"] = "" + (i.name || oe.MUSICKIT), S && (w["container-type"] = S, S === ae.PLAYLIST ? w["container-ids"] = {
            "global-playlist-id": i.id
          } : w["container-ids"] = isLibraryType(i.id) ? {
            "cloud-album-id": i.id
          } : {
            "album-adam-id": i.id
          })
        }
        return w
      }, PlayActivity.prototype.flush = function () {
        return __awaiter(this, void 0, void 0, function () {
          var e, t;
          return __generator(this, function (r) {
            switch (r.label) {
              case 0:
                if (!(e = fe("amupaee"))) return [3, 4];
                r.label = 1;
              case 1:
                return r.trys.push([1, 3, , 4]), t = JSON.parse(atob(e)), [4, this.send(t)];
              case 2:
                return r.sent(), ye("amupaee", "", "/", 0), [3, 4];
              case 3:
                return r.sent(), [2, Promise.reject(MKError.playActivityError("flush"))];
              case 4:
                return [2, Promise.resolve()]
            }
          })
        })
      }, PlayActivity.prototype.send = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          var t, r;
          return __generator(this, function (i) {
            switch (i.label) {
              case 0:
                return t = new Headers({
                  Authorization: "Bearer " + this.accessToken,
                  "Content-Type": "application/json",
                  "X-Apple-Music-User-Token": "" + this.musicUserToken
                }), (r = {
                  client_id: this.clientId,
                  event_type: this.eventType,
                  data: Array.isArray(e) ? e : [e]
                }).data.length > 0 ? [4, fetch("https://universal-activity-service.itunes.apple.com/play", {
                  method: "POST",
                  body: JSON.stringify(r),
                  headers: t
                })] : [3, 3];
              case 1:
                return [4, i.sent().text()];
              case 2:
                return i.sent(), this._logInfo && console.info("play activity:", r), [2, r];
              case 3:
                throw MKError.playActivityError("send() called without any data")
            }
          })
        })
      }, PlayActivity.prototype._addToTimeline = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          var t;
          return __generator(this, function (r) {
            switch (r.label) {
              case 0:
                return [4, this.timeline.add(e)];
              case 1:
                return t = r.sent(), this._mode !== pe.AUTO || e.endReasonType === se.EXITED_APPLICATION ? [3, 3] : [4, this.send(this.build())];
              case 2:
                return r.sent(), [3, 4];
              case 3:
                ye("amupaee", btoa(JSON.stringify(this.build())), "/"), r.label = 4;
              case 4:
                return [2, t]
            }
          })
        })
      }, PlayActivity.prototype._generateBuildVersion = function () {
        var e, t = this.userAgent.toLowerCase(),
          r = this._navigator && this._navigator.platform ? this._navigator.platform : "Unavailable",
          i = "Unidentified OS",
          n = "0.0",
          o = /mobile/.test(t);
        o && /android|adr/.test(t) ? (i = "Android", e = t.match(/(?:android|adr)\ ((\d+[._])+\d+)/)) : o && /iphone|ipad|ipod/.test(t) ? (i = "iOS", e = t.match(/os\ ((\d+[._])+\d+)\ like\ mac\ os\ x/)) : /tizen/.test(t) ? (i = "Tizen", e = t.match(/tizen (.*)/)) : /web0s|webos/.test(t) ? (i = "WebOS", e = t.match(/[web0s|webos] (.*)/)) : !o && /cros/.test(t) ? i = "ChromeOS" : !o && /macintosh/.test(t) ? (i = "macOS", e = t.match(/os\ x\ ((\d+[._])+\d+)\b/)) : !o && /linux/.test(t) ? i = "Linux" : !o && /windows/.test(t) && (i = "Windows", e = t.match(/windows ([^\)]*)/)), e && e[1] && (n = e[1].replace(/_/g, "."));
        var a = this._appInfo && this._appInfo.build ? this._appInfo.build : "0.0.0";
        return this.appID + " " + i + "/" + n + " model/" + r + " build/" + a
      }, PlayActivity.prototype._previousDescriptor = function () {
        var e = this.timeline.last;
        if (!e) throw MKError.playActivityError("A method was called without a previous descriptor");
        return Object.assign({}, e)
      }, PlayActivity
    }(),
    _e = function () {
      function PlayActivityStub() {}
      return PlayActivityStub.prototype.activate = function (e) {
        return void 0 === e && (e = !1), __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            return [2, Promise.resolve()]
          })
        })
      }, PlayActivityStub.prototype.exit = function (e) {
        return void 0 === e && (e = 0), __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            return [2, Promise.resolve(0)]
          })
        })
      }, PlayActivityStub.prototype.flush = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            return [2, Promise.resolve(0)]
          })
        })
      }, PlayActivityStub.prototype.pause = function (e) {
        return void 0 === e && (e = 0), __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            return [2, Promise.resolve(0)]
          })
        })
      }, PlayActivityStub.prototype.play = function (e, t) {
        return void 0 === t && (t = 0), __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            return [2, Promise.resolve(0)]
          })
        })
      }, PlayActivityStub.prototype.scrub = function (e, t) {
        return void 0 === e && (e = 0), void 0 === t && (t = se.SCRUB_BEGIN), __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            return [2, Promise.resolve(0)]
          })
        })
      }, PlayActivityStub.prototype.skip = function (e, t, r) {
        return void 0 === t && (t = se.TRACK_SKIPPED_FORWARDS), void 0 === r && (r = 0), __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            return [2, Promise.resolve(0)]
          })
        })
      }, PlayActivityStub.prototype.stop = function (e, t) {
        return void 0 === e && (e = 0), void 0 === t && (t = se.NATURAL_END_OF_TRACK), __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            return [2, Promise.resolve(0)]
          })
        })
      }, PlayActivityStub
    }(),
    ve = function () {
      return function (e) {
        void 0 === e && (e = window.navigator.userAgent);
        var t = e.toLowerCase();
        this.isEdge = /\sedge\//.test(t), this.isChrome = !this.isEdge && /chrome/.test(t), this.isSafari = !this.isEdge && !this.isChrome && /safari/.test(t), this.isFirefox = !this.isEdge && !this.isChrome && !this.isSafari && /firefox/.test(t), this.isIE = !this.isEdge && !this.isChrome && !this.isSafari && !this.isFirefox && /trident|msie/.test(t), this.isMobile = /mobile/.test(t), this.isAndroid = this.isMobile && /android/.test(t), this.isiOS = this.isMobile && /iphone|ipad|ipod/.test(t), this.isWebView = /(webview|(iphone|ipod|ipad)(?!.*safari\/)|android.*(wv|\.0\.0\.0)|\bfb[\w_]+\/(?:messenger)?|\binstagram|\btwitter)/.test(t), this.isEdge ? this.engineVersion = t.match(/(?:edge).(\d+)/) : (this.version = t.match(/(?:chrome|version|firefox|msie|rv).(\d+)\.(\d+)/), this.engineVersion = t.match(/(?:applewebkit|gecko|trident).(\d+)/)), this.version && (this.majorVersion = parseInt(this.version[1], 10), this.minorVersion = parseInt(this.version[2], 10)), this.engineVersion && (this.engineMajorVersion = parseInt(this.engineVersion[1], 10))
      }
    }(),
    ge = "explicit",
    Pe = 'audio/mp4;codecs="mp4a.40.2"',
    globalConfig = {
      app: {},
      browser: function () {
        return me || (me = new ve), me
      },
      features: {
        equivalencies: !0
      },
      logger: new W,
      sourceType: he.MUSICKIT,
      supportedMediaTypes: ["song"],
      urls: {
        api: "https://api.music.apple.com/v1",
        play: "https://play.itunes.apple.com/WebObjects/MZPlay.woa/wa/webPlayback"
      }
    },
    Se = createCommonjsModule(function (e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.mapFeatures = function (e) {
        void 0 === e && (e = []);
        var t = {};
        return e.forEach(function (e) {
          "-" === e.charAt(0) ? (e = e.substr(1), t[e] = !1) : t[e] = !0
        }), t
      }
    });
  unwrapExports(Se);
  var ke = Se.mapFeatures,
    Ee = createCommonjsModule(function (e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = "undefined" != typeof FastBoot ? FastBoot.require("buffer").Buffer : "undefined" != typeof process && null !== process.versions && null !== process.versions.node ? Buffer : window.Buffer
    });
  unwrapExports(Ee);
  var Te = createCommonjsModule(function (e, r) {
    var i = t && t.__read || function (e, t) {
      var r = "function" == typeof Symbol && e[Symbol.iterator];
      if (!r) return e;
      var i, n, o = r.call(e),
        a = [];
      try {
        for (;
          (void 0 === t || t-- > 0) && !(i = o.next()).done;) a.push(i.value)
      } catch (e) {
        n = {
          error: e
        }
      } finally {
        try {
          i && !i.done && (r = o.return) && r.call(o)
        } finally {
          if (n) throw n.error
        }
      }
      return a
    };

    function strRandomizer() {
      return Math.random().toString(16).substring(2)
    }

    function isNodeEnvironment(e) {
      var t = function (e) {
        return void 0 !== e && null !== e
      };
      if (0 === arguments.length) {
        if ("undefined" == typeof process) return !1;
        e = process
      }
      return 0 === arguments.length && "undefined" != typeof process && (e = process), t(e) && t(e.versions) && t(e.versions.node) || "undefined" != typeof FastBoot
    }

    function memoize(e) {
      return function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        for (var i = "", n = t.length; n--;) {
          var o = t[n];
          i += o === Object(o) ? JSON.stringify(o) : o, e._memoized || (e._memoized = {})
        }
        return i in e._memoized ? e._memoized[i] : e._memoized[i] = e.apply(void 0, t)
      }
    }
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), r.generateUUID = function () {
      for (var e = strRandomizer() + strRandomizer(); e.length < 16;) e += strRandomizer();
      return e.slice(0, 16)
    }, r.isLibraryType = memoize(function (e) {
      return /^(?:[a|i|l|p]{1}\.|pl\.u\-)[a-zA-Z0-9]+$/.test(e)
    }), r.isNodeEnvironment = isNodeEnvironment, r.atob = memoize(function (e) {
      return isNodeEnvironment() ? Ee.default.from(e, "base64").toString("ascii") : window.atob(e)
    }), r.btoa = memoize(function (e) {
      return isNodeEnvironment() ? Ee.default.from(e).toString("base64") : window.btoa(e)
    }), r.memoize = memoize, r.urlEncodeParameters = function (e) {
      return e ? Object.keys(e).reduce(function (t, r) {
        var i = e[r];
        return i.constructor === Object ? Object.keys(i).reduce(function (e, t) {
          return e + (e ? "&" : "") + encodeURIComponent(r) + "[" + encodeURIComponent(t) + "]=" + encodeURIComponent(i[t])
        }, t) : t + (t ? "&" : "") + encodeURIComponent(r) + "=" + encodeURIComponent(e[r])
      }, "") : ""
    }, r.getArtworkFromURL = function (e) {
      var t = e.split("/").pop(),
        r = i(!!t && t.match(/\d+/g) || ["100", "100"], 2),
        n = r[0],
        o = r[1];
      return {
        width: parseInt(n, 10),
        height: parseInt(o, 10),
        url: e.replace(n + "x" + o, "{w}x{h}")
      }
    }, r.throttled = function (e, t) {
      var r = 0;
      return function () {
        var i = Date.now();
        if (!(i - r < e)) return r = i, t.apply(this, Array.from(arguments))
      }
    }, r.debounce = function (e, t, r) {
      var i;
      return void 0 === t && (t = 250), void 0 === r && (r = {
          isImmediate: !1
        }),
        function () {
          for (var n = [], o = 0; o < arguments.length; o++) n[o] = arguments[o];
          var a = this,
            s = r.isImmediate && void 0 === i;
          void 0 !== i && clearTimeout(i), i = setTimeout(function () {
            i = void 0, r.isImmediate || e.apply(a, n)
          }, t), s && e.apply(a, n)
        }
    }
  });
  unwrapExports(Te);
  Te.generateUUID, Te.isLibraryType, Te.isNodeEnvironment, Te.atob, Te.btoa, Te.memoize, Te.urlEncodeParameters, Te.getArtworkFromURL, Te.throttled, Te.debounce;
  var Ie = createCommonjsModule(function (e, r) {
    var i = t && t.__read || function (e, t) {
      var r = "function" == typeof Symbol && e[Symbol.iterator];
      if (!r) return e;
      var i, n, o = r.call(e),
        a = [];
      try {
        for (;
          (void 0 === t || t-- > 0) && !(i = o.next()).done;) a.push(i.value)
      } catch (e) {
        n = {
          error: e
        }
      } finally {
        try {
          i && !i.done && (r = o.return) && r.call(o)
        } finally {
          if (n) throw n.error
        }
      }
      return a
    };
    Object.defineProperty(r, "__esModule", {
      value: !0
    });
    var n = function () {
      function DeveloperToken(e) {
        if (this.token = e, !e || !/^[a-z0-9\-\_]{16,}\.[a-z0-9\-\_]{16,}\.[a-z0-9\-\_]{16,}/i.test(e)) throw new Error("Invalid token.");
        var t = i(e.split("."), 2),
          r = t[0],
          n = t[1],
          o = this._decode(n),
          a = o.exp,
          s = o.iss;
        if (this.expiration = 1e3 * a, this.isExpired) throw new Error("Initialized with an expired token.");
        this.teamId = s;
        var u = this._decode(r).kid;
        this.keyId = u
      }
      return Object.defineProperty(DeveloperToken.prototype, "isExpired", {
        get: function () {
          return this.expiration < Date.now()
        },
        enumerable: !0,
        configurable: !0
      }), DeveloperToken.prototype._decode = function (e) {
        return JSON.parse(Te.atob(e))
      }, DeveloperToken
    }();
    r.DeveloperToken = n
  });
  unwrapExports(Ie);
  Ie.DeveloperToken;
  var Ae = createCommonjsModule(function (e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = function () {
      function Notifications(e) {
        void 0 === e && (e = []);
        var t = this;
        this._registry = {}, e.forEach(function (e) {
          t._registry[e] = []
        })
      }
      return Notifications.prototype.addEventListener = function (e, t) {
        Array.isArray(this._registry[e]) && this._registry[e].push(t)
      }, Notifications.prototype.dispatchEvent = function (e, t) {
        Array.isArray(this._registry[e]) && this._registry[e].forEach(function (e) {
          return e(t)
        })
      }, Notifications.prototype.removeEventListener = function (e, t) {
        if (Array.isArray(this._registry[e])) {
          var r = this._registry[e].indexOf(t);
          this._registry[e].splice(r, 1)
        }
      }, Notifications
    }();
    t.Notifications = r
  });
  unwrapExports(Ae);
  Ae.Notifications;
  var Ce = createCommonjsModule(function (e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = function () {
      function GenericStorage(e) {
        void 0 === e && (e = {}), this._data = e
      }
      return GenericStorage.prototype.clear = function () {
        this._data = {}
      }, GenericStorage.prototype.getItem = function (e) {
        return this._data[e]
      }, GenericStorage.prototype.removeItem = function (e) {
        delete this._data[e]
      }, GenericStorage.prototype.setItem = function (e, t) {
        this._data[e] = t
      }, GenericStorage
    }();
    t.GenericStorage = r, t.getCookie = function (e, t) {
      void 0 === e && (e = ""), void 0 === t && (t = document.cookie);
      var r = t.match(new RegExp("(?:^|;\\s*)" + e + "=([^;]*)"));
      if (r) return r[1]
    }, t.setCookie = function (e, t, r, i, n) {
      void 0 === r && (r = ""), void 0 === i && (i = 14), void 0 === n && (n = window);
      var o = new Date,
        a = /\./.test(n.location.hostname) ? n.location.hostname : "";
      /^.+\.apple\.com$/i.test(a) && (a = "apple.com");
      var s = a.length > 0 ? "domain=" + a + "; " : "";
      o.setTime(o.getTime() + 24 * i * 60 * 60 * 1e3), n.document.cookie = e + "=" + t + "; expires=" + o.toUTCString() + "; " + s + "path=" + r
    }
  });
  unwrapExports(Ce);
  Ce.GenericStorage, Ce.getCookie, Ce.setCookie;
  var De = createCommonjsModule(function (e, t) {
    var r;
    Object.defineProperty(t, "__esModule", {
        value: !0
      }),
      function (e) {
        e.APP = "music", e.P = "subscribe"
      }(r = t.Defaults || (t.Defaults = {})),
      // TODO: 6) This builds query params out of obj and adds 'app=music' and 'p=subscribe'
      // E.g. data {
      //    a: "eyJ0aGlyZFBhcnR5SWNvblVSTCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9pbWcvaWNvbnMvYXBwbGUtdG91Y2gtaWNvbi0xNTJ4MTUyLnBuZyIsInRoaXJkUGFydHlOYW1lIjoibG9jYWxob3N0OjgwODAiLCJ0aGlyZFBhcnR5VG9rZW4iOiJleUpoYkdjaU9pSkZVekkxTmlJc0luUjVjQ0k2SWtwWFZDSXNJbXRwWkNJNklsWXlWamhUVEVFMVVGWWlmUS5leUpwWVhRaU9qRTJNVFUxTURZNE5qRXNJbVY0Y0NJNk1UWXpNVEExT0RnMk1Td2lhWE56SWpvaU1rZEdTbFUxUWtJeU5pSjkuWXpVbk1hVFpMLTdkODE0RTZUR2pHelozaFVFejJZVjk1blVTNks0TVlmRyJ9"
      //    app: "music"
      //    p: "subscribe"
      //    referrer: "http://localhost:8080/"
      //  }
      // E.g. return "a=eyJ0aGlyZFBhcnR5SWNvblVSTCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9pbWcvaWNvbnMvYXBwbGUtdG91Y2gtaWNvbi0xNTJ4MTUyLnBuZyIsInRoaXJkUGFydHlOYW1lIjoibG9jYWxob3N0OjgwODAiLCJ0aGlyZFBhcnR5VG9rZW4iOiJleUpoYkdjaU9pSkZVekkxTmlJc0luUjVjQ0k2SWtwWFZDSXNJbXRwWkNJNklsWXlWamhUVEVFMVVGWWlmUS5leUpwWVhRaU9qRTJNVFUxTURZNE5qRXNJbVY0Y0NJNk1UWXpNVEExT0RnMk1Td2lhWE56SWpvaU1rZEdTbFUxUWtJeU5pSjkuWXpVbk1hVFpMLTdkODE0RTZUR2pHelozaFVFejJZVjk1blVTNks0TVlmRyJ9&referrer=http%3A%2F%2Flocalhost%3A8080%2F&app=music&p=subscribe"
      t.buildQueryParams = function (e) {
        return void 0 === e && (e = {
          app: r.APP,
          p: r.P
        }), e.app || (e.app = r.APP), e.p || (e.p = r.P), Object.keys(e).map(function (t) {
          return encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
        }).join("&")
      }, t.parseQueryParams = function (e) {
        return e ? (-1 !== e.indexOf("?") && (e = e.substr(e.indexOf("?")).replace("?", "")), e.split("&").reduce(function (e, t) {
          var r = t.split("="),
            i = r[0],
            n = r[1];
          return e[i] = n ? decodeURIComponent(n.replace(/\+/g, " ")) : "", e
        }, {})) : {}
      }
  });
  unwrapExports(De);
  De.Defaults, De.buildQueryParams;
  var Re = De.parseQueryParams,
    Oe = createCommonjsModule(function (e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.arrayBufferToString = Te.memoize(function (e) {
        for (var t = new Uint16Array(e), r = t.length, i = "", n = 0; n < r; n++) i += String.fromCharCode(t[n]);
        return i
      }), t.base64ToUint8Array = Te.memoize(function (e) {
        var r = Te.atob(e);
        return t.stringToUint8Array(r)
      }), t.ensureArray = function (e) {
        return void 0 === e && (e = []), Array.isArray(e) ? e : [e]
      }, t.stringToHashCode = Te.memoize(function (e) {
        var t = 0;
        if (0 !== e.length)
          for (var r = 0; r < e.length; r++) t = (t << 5) - t + e.charCodeAt(r), t |= 0;
        return t
      }), t.stringToUint8Array = Te.memoize(function (e) {
        for (var t = e.length, r = new ArrayBuffer(t), i = new Uint8Array(r), n = 0; n < t; n++) i[n] = e.charCodeAt(n);
        return i
      }), t.stringToUint16Array = Te.memoize(function (e) {
        for (var t = e.length, r = new ArrayBuffer(2 * t), i = new Uint16Array(r), n = 0; n < t; n++) i[n] = e.charCodeAt(n);
        return i
      }), t.uint8ArrayToBase64 = Te.memoize(function (e) {
        for (var t, r, i, n, o, a, s, u = 0, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", l = ""; u < e.length;) n = (t = e[u++]) >> 2, o = (3 & t) << 4 | (r = u < e.length ? e[u++] : Number.NaN) >> 4, a = (15 & r) << 2 | (i = u < e.length ? e[u++] : Number.NaN) >> 6, s = 63 & i, isNaN(r) ? a = s = 64 : isNaN(i) && (s = 64), l += c.charAt(n) + c.charAt(o) + c.charAt(a) + c.charAt(s);
        return l
      })
    });
  unwrapExports(Oe);
  Oe.arrayBufferToString, Oe.base64ToUint8Array, Oe.ensureArray, Oe.stringToHashCode, Oe.stringToUint8Array, Oe.stringToUint16Array, Oe.uint8ArrayToBase64;
  var Me = createCommonjsModule(function (e, r) {
    var i, n = t && t.__awaiter || function (e, t, r, i) {
        return new(r || (r = Promise))(function (n, o) {
          function fulfilled(e) {
            try {
              step(i.next(e))
            } catch (e) {
              o(e)
            }
          }

          function rejected(e) {
            try {
              step(i.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function step(e) {
            e.done ? n(e.value) : new r(function (t) {
              t(e.value)
            }).then(fulfilled, rejected)
          }
          step((i = i.apply(e, t || [])).next())
        })
      },
      o = t && t.__generator || function (e, t) {
        var r, i, n, o, a = {
          label: 0,
          sent: function () {
            if (1 & n[0]) throw n[1];
            return n[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: verb(0),
          throw: verb(1),
          return: verb(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
          return this
        }), o;

        function verb(o) {
          return function (s) {
            return function (o) {
              if (r) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (r = 1, i && (n = 2 & o[0] ? i.return : o[0] ? i.throw || ((n = i.return) && n.call(i), 0) : i.next) && !(n = n.call(i, o[1])).done) return n;
                switch (i = 0, n && (o = [2 & o[0], n.value]), o[0]) {
                  case 0:
                  case 1:
                    n = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, i = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(n = (n = a.trys).length > 0 && n[n.length - 1]) && (6 === o[0] || 2 === o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!n || o[1] > n[0] && o[1] < n[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < n[1]) {
                      a.label = n[1], n = o;
                      break
                    }
                    if (n && a.label < n[2]) {
                      a.label = n[2], a.ops.push(o);
                      break
                    }
                    n[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], i = 0
              } finally {
                r = n = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };
    Object.defineProperty(r, "__esModule", {
        value: !0
      }),
      function (e) {
        e[e.ParseError = -32700] = "ParseError", e[e.InvalidRequest = -32600] = "InvalidRequest", e[e.MethodNotFound = -32601] = "MethodNotFound", e[e.InvalidParams = -32602] = "InvalidParams", e[e.InternalError = -32603] = "InternalError"
      }(i = r.RPCErrorCodes || (r.RPCErrorCodes = {}));
    var a = "*",
      s = "2.0",
      u = function () {
        function Dispatch(e) {
          void 0 === e && (e = {});
          var t = this;
          this._registry = {}, this._sequence = 0, this.handle = function (e) {
            e.data && e.data.jsonrpc === s && (t.origin !== a && t.origin !== e.origin || (e.data.method && t.destination ? t.handleRequest(e.data).then(function (e) {
              t.send(t.destination, e)
            }) : (e.data.hasOwnProperty("result") || e.data.error) && t.handleResponse(e.data)))
          }, this.destination = e.destination, this.methods = e.methods || {}, this.origin = e.origin || a, e.source && (this.source = e.source)
        }
        return Object.defineProperty(Dispatch.prototype, "source", {
          get: function () {
            return this._source
          },
          set: function (e) {
            if (!e && this._source) return this._source.removeEventListener("message", this.handle), void(this._source = void 0);
            e.addEventListener("message", this.handle), this._source = e
          },
          enumerable: !0,
          configurable: !0
        }), Dispatch.prototype.apply = function (e, t) {
          var r = this;
          if (!this.destination) throw new Error("No destination");
          var i = this._sequence++,
            n = new Promise(function (res, rej) {
              r._registry[i] = {
                resolve: res,
                reject: rej
              }
            });
          return this.send(this.destination, {
            jsonrpc: s,
            id: i,
            method: e,
            params: t
          }), n
        }, Dispatch.prototype.call = function (e) {
          for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
          return this.apply(e, t)
        }, Dispatch.prototype.handleRequest = function (e) {
          return n(this, void 0, void 0, function () {
            var t, r, n, a;
            return o(this, function (o) {
              switch (o.label) {
                case 0:
                  if (t = {
                      jsonrpc: s,
                      id: e.id
                    }, !(r = this.methods[e.method])) return [2, Object.assign(t, {
                    error: {
                      code: i.MethodNotFound,
                      message: "Method not found"
                    }
                  })];
                  o.label = 1;
                case 1:
                  return o.trys.push([1, 3, , 4]), [4, r.apply(null, Oe.ensureArray(e.params))];
                case 2:
                  return n = o.sent(), [2, Object.assign(t, {
                    result: n
                  })];
                case 3:
                  return a = o.sent(), [2, Object.assign(t, {
                    error: {
                      code: a.code || i.InternalError,
                      message: a.message
                    }
                  })];
                case 4:
                  return [2]
              }
            })
          })
        }, Dispatch.prototype.handleResponse = function (e) {
          var t = this._registry[e.id];
          delete this._registry[e.id], t && (e.error ? t.reject(Object.assign(Error(), e.error)) : t.resolve(e.result))
        }, Dispatch.prototype.send = function (e, t) {
          e.postMessage(t, e.window === e ? this.origin : void 0)
        }, Dispatch
      }();
    r.Dispatch = u
  });
  unwrapExports(Me);
  Me.RPCErrorCodes, Me.Dispatch;
  var Le = createCommonjsModule(function (e, r) {
    var i, n, o = t && t.__assign || Object.assign || function (e) {
        for (var t, r = 1, i = arguments.length; r < i; r++)
          for (var n in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e
      },
      a = t && t.__awaiter || function (e, t, r, i) {
        return new(r || (r = Promise))(function (n, o) {
          function fulfilled(e) {
            try {
              step(i.next(e))
            } catch (e) {
              o(e)
            }
          }

          function rejected(e) {
            try {
              step(i.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function step(e) {
            e.done ? n(e.value) : new r(function (t) {
              t(e.value)
            }).then(fulfilled, rejected)
          }
          step((i = i.apply(e, t || [])).next())
        })
      },
      s = t && t.__generator || function (e, t) {
        var r, i, n, o, a = {
          label: 0,
          sent: function () {
            if (1 & n[0]) throw n[1];
            return n[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: verb(0),
          throw: verb(1),
          return: verb(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
          return this
        }), o;

        function verb(o) {
          return function (s) {
            return function (o) {
              if (r) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (r = 1, i && (n = 2 & o[0] ? i.return : o[0] ? i.throw || ((n = i.return) && n.call(i), 0) : i.next) && !(n = n.call(i, o[1])).done) return n;
                switch (i = 0, n && (o = [2 & o[0], n.value]), o[0]) {
                  case 0:
                  case 1:
                    n = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, i = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(n = (n = a.trys).length > 0 && n[n.length - 1]) && (6 === o[0] || 2 === o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!n || o[1] > n[0] && o[1] < n[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < n[1]) {
                      a.label = n[1], n = o;
                      break
                    }
                    if (n && a.label < n[2]) {
                      a.label = n[2], a.ops.push(o);
                      break
                    }
                    n[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], i = 0
              } finally {
                r = n = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };

    function validateToken(e) {
      if ("string" != typeof e) return !1;
      var t = e.match(/[a-zA-Z0-9=\/+]{32,}==$/);
      return !(!t || !t.length) && t.length > 0
    }
    Object.defineProperty(r, "__esModule", {
        value: !0
      }),
      function (e) {
        e[e.UNAVAILABLE = -1] = "UNAVAILABLE", e[e.NOT_DETERMINED = 0] = "NOT_DETERMINED", e[e.DENIED = 1] = "DENIED", e[e.RESTRICTED = 2] = "RESTRICTED", e[e.AUTHORIZED = 3] = "AUTHORIZED"
      }(i = r.AuthorizationStatus || (r.AuthorizationStatus = {})), r.validateToken = validateToken, r.ACTIVATE_REQUEST_URL = "https://activate.apple.com/mkauth", r.AUTHENTICATE_REQUEST_URL = "https://buy.itunes.apple.com/commerce/account/authenticateMusicKitRequest", r.SERVICE_URL = "https://authorize.music.apple.com", r.SUBSCRIBE_URL = r.SERVICE_URL + "/upsell", r.WHITELIST_DOMAIN_REGEX = /^https?:\/\/(.+\.)*(apple\.com|apps\.mzstatic\.com)(\/[\w\d]+)*$/,
      function (e) {
        e[e.AUTHORIZE = 0] = "AUTHORIZE", e[e.SUBSCRIBE = 1] = "SUBSCRIBE"
      }(n = r.ServiceSetupAction || (r.ServiceSetupAction = {}));
    var ServiceSetupView = function () {
      function ServiceSetupView(e, t) {
        void 0 === t && (t = {}), this.developerToken = e, this.authenticateMethod = "GET", this.target = "apple-music-service-view", this.deeplinkParameters = t && t.deeplinkParameters || {}, this.iconURL = t && t.iconURL, this.authenticateMethod = t && t.authenticateMethod || "GET", this.isServiceView && window.opener !== window && (this.dispatch = new Me.Dispatch({
          destination: window.opener,
          origin: "*",
          source: window
        }))
      }
      return Object.defineProperty(ServiceSetupView.prototype, "isServiceView", {
        get: function () {
          return window && window.name === this.target || !1
        },
        enumerable: !0,
        configurable: !0
      }), ServiceSetupView.prototype.focus = function () {
        this._window && window.focus && this._window.focus()
        // TODO: 3) This opens the window for authorization and returns promise with userToken
      }, ServiceSetupView.prototype.load = async function (e = { action: n.AUTHORIZE }) {
        return e.action === n.SUBSCRIBE ? this._subscribeAction(e.parameters) : this._authorizeAction(e.parameters);
        // return a(this, void 0, void 0, function () {
        //   return s(this, function (t) {
        //     return e.action === n.SUBSCRIBE ? [2, this._subscribeAction(e.parameters)] : [2, this._authorizeAction(e.parameters)]
        //   })
        // })
        // TODO: 7) This is called with auth URL and should open the window
      }, ServiceSetupView.prototype.present = function (e, t) {
        void 0 === e && (e = "");
        var r = this._calculateClientDimensions(),
          i = r.height,
          n = r.left,
          a = r.top,
          s = r.width,
          u = {
            height: 650,
            menubar: "no",
            resizable: "no",
            scrollbars: "no",
            status: "no",
            toolbar: "no",
            width: 650
          },
          c = o({}, u, {
            left: s / 2 - u.width / 2 + n,
            top: i / 2 - u.height / 2 + a
          }, t),
          l = Object.keys(c).map(function (e) {
            return e + "=" + c[e]
          }).join(",");
        return /trident|msie/i.test(navigator.userAgent) ? (this._window = window.open(window.location.href, this.target, l) || void 0, this._window.location.href = e) : this._window = window.open(e, this.target, l) || void 0, /\bedge\b/i.test(navigator.userAgent) && (this._window.opener = self), this.focus(), this._window
        // TODO: 4) This opens the auth window
      }, ServiceSetupView.prototype._authorizeAction = function (e) {
        // const currUrl = window.location && window.location.href || "";
        // if ("GET" === this.authenticateMethod) {
        //   const thirdPartyInfo = this._thirdPartyInfo();
        //   const queryParams = De.buildQueryParams({
        //     a: btoa(thirdPartyInfo),
        //     referrer: currUrl,
        //   });
        //   const authUrl = r.SERVICE_URL + "/woa?" + queryParams;
        // } else {
        //   (t = this._buildFormElement(r.AUTHENTICATE_REQUEST_URL), document.body.appendChild(t));
        // } 
        return void 0 === e && (e = {}), a(this, void 0, void 0, function () {
          var t, authUrl, currUrl, self = this;
          return s(this, function (s) {
            // This builds query params
            return currUrl = window.location && window.location.href || "", "GET" === this.authenticateMethod ? authUrl = r.SERVICE_URL + "/woa?" + De.buildQueryParams({
              a: btoa(this._thirdPartyInfo()),
              referrer: currUrl
            }) : (t = this._buildFormElement(r.AUTHENTICATE_REQUEST_URL), document.body.appendChild(t)),
            // TODO: 8) This Promise returns the user token
            [2, new Promise(function (res, rej) {
              var authWindow = self.present(authUrl);
              self.dispatch = new Me.Dispatch({
                methods: {
                  authorize: function (e, t, r) {
                    validateToken(e) ? res({
                      restricted: t && "1" === t,
                      userToken: e,
                      cid: r
                    }) : rej(i.NOT_DETERMINED)
                  },
                  close: function () {},
                  decline: function () {
                    rej(i.DENIED)
                  },
                  switchUserId: function () {
                    rej(i.NOT_DETERMINED)
                  },
                  thirdPartyInfo: function () {
                    return self._thirdPartyInfo(self.developerToken, Object.assign(self.deeplinkParameters, e))
                  },
                  unavailable: function () {
                    rej(i.UNAVAILABLE)
                  }
                },
                origin: r.SERVICE_URL,
                source: window,
                destination: authWindow
              }), t && t.submit()
            })]
          })
        })
      }, ServiceSetupView.prototype._buildFormElement = function (e, t, r) {
        void 0 === t && (t = this.target), void 0 === r && (r = this.developerToken);
        var i = document.createElement("form");
        i.setAttribute("method", "post"), i.setAttribute("action", e), i.setAttribute("target", t), i.style.display = "none";
        var n = document.createElement("input");
        n.setAttribute("name", "jwtToken"), n.setAttribute("value", r), i.appendChild(n);
        var o = document.createElement("input");
        o.setAttribute("name", "isWebPlayer"), o.setAttribute("value", "true"), i.appendChild(o);
        var a = document.createElement("input");
        return a.setAttribute("name", "LogoURL"), a.setAttribute("value", ""), i.appendChild(a), i
      }, ServiceSetupView.prototype._calculateClientDimensions = function (e) {
        return void 0 === e && (e = window), {
          height: e.innerHeight ? e.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
          left: e.screenLeft ? e.screenLeft : screen.availLeft || screen.left,
          top: e.screenTop ? e.screenTop : screen.availTop || screen.top,
          width: e.innerWidth ? e.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
        }
      }, ServiceSetupView.prototype._subscribeAction = function (e) {
        return void 0 === e && (e = {}), a(this, void 0, void 0, function () {
          var t = this;
          return s(this, function (i) {
            return Object.assign(e, this.deeplinkParameters), [2, new Promise(function (res, rej) {
              var o = r.SUBSCRIBE_URL + "?" + De.buildQueryParams(e);
              t.present(o), window.addEventListener("message", function (e) {
                var t = e.data,
                  o = e.origin,
                  a = (e.source, "string" == typeof t ? JSON.parse(t) : t),
                  s = (a.closeWindow, a.launchClient);
                o && !r.WHITELIST_DOMAIN_REGEX.test(o) || (s ? 0 === s.supported ? rej("Unable to subscribe on this platform.") : res(s) : rej("Subscribe action error."))
              })
            })]
          })
        })
        // TODO: 5) This builds the query params for auth page
      }, ServiceSetupView.prototype._thirdPartyInfo = function (e, t) {
        void 0 === e && (e = this.developerToken);
        var r = this.iconURL,
          i = window.location.host || document.referrer,
          n = [].slice.call(document.querySelectorAll('link[rel="apple-music-app-icon"]')).concat([].slice.call(document.querySelectorAll('link[rel="apple-touch-icon-precomposed"]')), [].slice.call(document.querySelectorAll('link[rel="apple-touch-icon"]')));
        if (n && n[0] && n[0].href) {
          var o = n.find(function (e) {
            return !!e.sizes && "120x120" === e.sizes.value
          });
          r = o && o.href ? o.href : n[0].href
        }
        // E.g. "{"thirdPartyIconURL":"http://localhost:8080/img/icons/apple-touch-icon-152x152.png","thirdPartyName":"localhost:8080","thirdPartyToken":"eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlYyVjhTTEE1UFYifQ.eyJpYXQiOjE2MTU1MDY4NjEsImV4cCI6MTYzMTA1ODg2MSwiaXNzIjoiMkdGSlU1QkIyNiJ9.YzUnMaTZL-7d814E6TGjGzZ3hUEz2YV95nUS6K4MYfG"}"
        return JSON.stringify({
          thirdPartyIconURL: r,
          thirdPartyName: i,
          thirdPartyParameters: t,
          thirdPartyToken: e
        })
      }, ServiceSetupView
    }();
    r.ServiceSetupView = ServiceSetupView
  });
  unwrapExports(Le);
  Le.AuthorizationStatus, Le.validateToken, Le.ACTIVATE_REQUEST_URL, Le.AUTHENTICATE_REQUEST_URL, Le.SERVICE_URL, Le.SUBSCRIBE_URL, Le.WHITELIST_DOMAIN_REGEX, Le.ServiceSetupAction, Le.ServiceSetupView;
  var Ne = createCommonjsModule(function (e, r) {
    var i = t && t.__awaiter || function (e, t, r, i) {
        return new(r || (r = Promise))(function (n, o) {
          function fulfilled(e) {
            try {
              step(i.next(e))
            } catch (e) {
              o(e)
            }
          }

          function rejected(e) {
            try {
              step(i.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function step(e) {
            e.done ? n(e.value) : new r(function (t) {
              t(e.value)
            }).then(fulfilled, rejected)
          }
          step((i = i.apply(e, t || [])).next())
        })
      },
      n = t && t.__generator || function (e, t) {
        var r, i, n, o, a = {
          label: 0,
          sent: function () {
            if (1 & n[0]) throw n[1];
            return n[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: verb(0),
          throw: verb(1),
          return: verb(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
          return this
        }), o;

        function verb(o) {
          return function (s) {
            return function (o) {
              if (r) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (r = 1, i && (n = 2 & o[0] ? i.return : o[0] ? i.throw || ((n = i.return) && n.call(i), 0) : i.next) && !(n = n.call(i, o[1])).done) return n;
                switch (i = 0, n && (o = [2 & o[0], n.value]), o[0]) {
                  case 0:
                  case 1:
                    n = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, i = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(n = (n = a.trys).length > 0 && n[n.length - 1]) && (6 === o[0] || 2 === o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!n || o[1] > n[0] && o[1] < n[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < n[1]) {
                      a.label = n[1], n = o;
                      break
                    }
                    if (n && a.label < n[2]) {
                      a.label = n[2], a.ops.push(o);
                      break
                    }
                    n[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], i = 0
              } finally {
                r = n = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };

    function fetchStorefronts(e, t) {
      return void 0 === t && (t = "https://api.music.apple.com/v1"), i(this, void 0, void 0, function () {
        var r, i;
        return n(this, function (n) {
          switch (n.label) {
            case 0:
              return r = new Headers({
                Authorization: "Bearer " + e
              }), [4, fetch(t + "/storefronts", {
                headers: r
              })];
            case 1:
              return [4, n.sent().json()];
            case 2:
              return (i = n.sent()).errors ? [2, Promise.reject(i.errors)] : [2, i.data]
          }
        })
      })
    }
    Object.defineProperty(r, "__esModule", {
        value: !0
      }),
      function (e) {
        e.ID = "us", e.LANGUAGE_TAG = "en-gb"
      }(r.Defaults || (r.Defaults = {})), r.fetchStorefronts = fetchStorefronts;
    var o = function () {
      function Storefront(e, t, r) {
        this.id = e, this.attributes = t, this.type = "storefronts", this.href = r || "/v1/" + this.type + "/" + e
      }
      return Storefront.inferFromLanguages = function (e, t) {
        return void 0 === t && (t = navigator.languages || [navigator.language || navigator.userLanguage]), i(this, void 0, void 0, function () {
          var r, i, o, a, s, u;
          return n(this, function (n) {
            switch (n.label) {
              case 0:
                return [4, fetchStorefronts(e)];
              case 1:
                return r = n.sent(), i = r.map(function (e) {
                  return e.id
                }), o = t[0] || "en-US", a = o.toLowerCase().split(/-|_/), a[0], s = a[1], u = i.includes(s) ? s : "us", [2, r.find(function (e) {
                  return e.id === u
                })]
            }
          })
        })
      }, Storefront
    }();
    r.Storefront = o
  });
  unwrapExports(Ne);
  var je = Ne.Defaults,
    Ue = (Ne.fetchStorefronts, Ne.Storefront, createCommonjsModule(function (e, r) {
      var i, n, o = t && t.__extends || (i = Object.setPrototypeOf || {
            __proto__: []
          }
          instanceof Array && function (e, t) {
            e.__proto__ = t
          } || function (e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
          },
          function (e, t) {
            function __() {
              this.constructor = e
            }
            i(e, t), e.prototype = null === t ? Object.create(t) : (__.prototype = t.prototype, new __)
          }),
        a = t && t.__awaiter || function (e, t, r, i) {
          return new(r || (r = Promise))(function (n, o) {
            function fulfilled(e) {
              try {
                step(i.next(e))
              } catch (e) {
                o(e)
              }
            }

            function rejected(e) {
              try {
                step(i.throw(e))
              } catch (e) {
                o(e)
              }
            }

            function step(e) {
              e.done ? n(e.value) : new r(function (t) {
                t(e.value)
              }).then(fulfilled, rejected)
            }
            step((i = i.apply(e, t || [])).next())
          })
        },
        s = t && t.__generator || function (e, t) {
          var r, i, n, o, a = {
            label: 0,
            sent: function () {
              if (1 & n[0]) throw n[1];
              return n[1]
            },
            trys: [],
            ops: []
          };
          return o = {
            next: verb(0),
            throw: verb(1),
            return: verb(2)
          }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
            return this
          }), o;

          function verb(o) {
            return function (s) {
              return function (o) {
                if (r) throw new TypeError("Generator is already executing.");
                for (; a;) try {
                  if (r = 1, i && (n = 2 & o[0] ? i.return : o[0] ? i.throw || ((n = i.return) && n.call(i), 0) : i.next) && !(n = n.call(i, o[1])).done) return n;
                  switch (i = 0, n && (o = [2 & o[0], n.value]), o[0]) {
                    case 0:
                    case 1:
                      n = o;
                      break;
                    case 4:
                      return a.label++, {
                        value: o[1],
                        done: !1
                      };
                    case 5:
                      a.label++, i = o[1], o = [0];
                      continue;
                    case 7:
                      o = a.ops.pop(), a.trys.pop();
                      continue;
                    default:
                      if (!(n = (n = a.trys).length > 0 && n[n.length - 1]) && (6 === o[0] || 2 === o[0])) {
                        a = 0;
                        continue
                      }
                      if (3 === o[0] && (!n || o[1] > n[0] && o[1] < n[3])) {
                        a.label = o[1];
                        break
                      }
                      if (6 === o[0] && a.label < n[1]) {
                        a.label = n[1], n = o;
                        break
                      }
                      if (n && a.label < n[2]) {
                        a.label = n[2], a.ops.push(o);
                        break
                      }
                      n[2] && a.ops.pop(), a.trys.pop();
                      continue
                  }
                  o = t.call(e, a)
                } catch (e) {
                  o = [6, e], i = 0
                } finally {
                  r = n = 0
                }
                if (5 & o[0]) throw o[1];
                return {
                  value: o[0] ? o[1] : void 0,
                  done: !0
                }
              }([o, s])
            }
          }
        };
      Object.defineProperty(r, "__esModule", {
          value: !0
        }), r.validateToken = Le.validateToken, r.AuthorizationStatus = Le.AuthorizationStatus,
        function (e) {
          e.authorizationStatusDidChange = "authorizationStatusDidChange", e.authorizationStatusWillChange = "authorizationStatusWillChange", e.eligibleForSubscribeView = "eligibleForSubscribeView", e.storefrontCountryCodeDidChange = "storefrontCountryCodeDidChange", e.storefrontIdentifierDidChange = "storefrontIdentifierDidChange", e.userTokenDidChange = "userTokenDidChange"
        }(n = r.StoreKitNotifications || (r.StoreKitNotifications = {}));
      var StoreKit = function (e) {
        function StoreKit(t, r) {
          var i = e.call(this, [n.authorizationStatusDidChange, n.authorizationStatusWillChange, n.eligibleForSubscribeView, n.storefrontCountryCodeDidChange, n.userTokenDidChange]) || this;
          return i.developerToken = t, i.apiBase = "https://api.music.apple.com/v1", i.persist = "localstorage", i.playBase = "https://play.itunes.apple.com/WebObjects/MZPlay.woa/wa", i.prefix = "music", i.storage = window.localStorage, i._authorizationStatus = Le.AuthorizationStatus.NOT_DETERMINED, i._dispatchedSubscribeView = !1, r && (r.deeplink && (i.deeplinkParameters = r.deeplink), r.persist && (i.persist = r.persist), r.prefix && (i.prefix = r.prefix)), i._developerToken = new Ie.DeveloperToken(t), i._serviceSetupView = new Le.ServiceSetupView(t, {
            authenticateMethod: r && r.authenticateMethod,
            iconURL: r && r.iconURL,
            deeplinkParameters: i.deeplinkParameters
          }), i.storagePrefix = (i.prefix + "." + i._developerToken.teamId).toLocaleLowerCase(), i.userTokenIsValid && (i._restrictedEnabled = i.restrictedEnabled, i._authorizationStatus = i.restrictedEnabled ? Le.AuthorizationStatus.RESTRICTED : Le.AuthorizationStatus.AUTHORIZED), i._storefrontCountryCode = i.storefrontCountryCode, Te.isNodeEnvironment() || i._processLocationHash(window.location.hash), i
        }
        return o(StoreKit, e), Object.defineProperty(StoreKit.prototype, "authorizationStatus", {
          get: function () {
            return this._authorizationStatus
          },
          set: function (e) {
            this.dispatchEvent(n.authorizationStatusWillChange, {
              authorizationStatus: this._authorizationStatus,
              newAuthorizationStatus: e
            }), this._authorizationStatus = e, this.dispatchEvent(n.authorizationStatusDidChange, {
              authorizationStatus: e
            })
          },
          enumerable: !0,
          configurable: !0
        }), Object.defineProperty(StoreKit.prototype, "cid", {
          get: function () {
            if (!this._cid) {
              var e = this._getStorageItem(this.storagePrefix + ".c");
              this._cid = e || void 0
            }
            return this._cid
          },
          set: function (e) {
            e ? this._setStorageItem(this.storagePrefix + ".c", e) : this._removeStorageItem(this.storagePrefix + ".c"), this._cid = e
          },
          enumerable: !0,
          configurable: !0
        }), Object.defineProperty(StoreKit.prototype, "eligibleForSubscribeView", {
          get: function () {
            return !this.hasAuthorized && !this._dispatchedSubscribeView
          },
          enumerable: !0,
          configurable: !0
        }), Object.defineProperty(StoreKit.prototype, "hasAuthorized", {
          get: function () {
            return this.authorizationStatus > Le.AuthorizationStatus.DENIED
          },
          enumerable: !0,
          configurable: !0
        }), Object.defineProperty(StoreKit.prototype, "restrictedEnabled", {
          get: function () {
            if (this.userToken && "boolean" != typeof this._restrictedEnabled) {
              var e = this._getStorageItem(this.userToken + ".r");
              if (e) this._restrictedEnabled = "0" !== e;
              else if (this._storefrontCountryCode) {
                this._restrictedEnabled = -1 !== ["br", "ch", "gt", "hu", "id", "in", "it", "kr", "la", "lt", "my", "ru", "sg", "tr"].indexOf(this._storefrontCountryCode) || void 0
              }
            }
            return this._restrictedEnabled
          },
          set: function (e) {
            this.userToken && void 0 !== e && this._setStorageItem(this.userToken + ".r", e ? "1" : "0"), this._restrictedEnabled = e, e && (this.authorizationStatus = Le.AuthorizationStatus.RESTRICTED)
          },
          enumerable: !0,
          configurable: !0
        }), Object.defineProperty(StoreKit.prototype, "storefrontCountryCode", {
          get: function () {
            if (!this._storefrontCountryCode) {
              var e = this._getStorageItem(this.userToken + ".s");
              this._storefrontCountryCode = e || Ne.Defaults.ID
            }
            return this._storefrontCountryCode
          },
          set: function (e) {
            e && this.userToken ? this._setStorageItem(this.userToken + ".s", e) : this._removeStorageItem(this.userToken + ".s"), this._storefrontCountryCode = e, this.dispatchEvent(n.storefrontCountryCodeDidChange, {
              storefrontCountryCode: e
            })
          },
          enumerable: !0,
          configurable: !0
        }), Object.defineProperty(StoreKit.prototype, "storefrontIdentifier", {
          get: function () {
            return this._storefrontIdentifier
          },
          set: function (e) {
            this._storefrontIdentifier = e, this.dispatchEvent(n.storefrontIdentifierDidChange, {
              storefrontIdentifier: e
            })
          },
          enumerable: !0,
          configurable: !0
        }), Object.defineProperty(StoreKit.prototype, "userToken", {
          get: function () {
            if (!this._userToken) {
              var e = this._getStorageItem(this.storagePrefix + ".u");
              this._userToken = e || void 0
            }
            return this._userToken
          },
          set: function (e) {
            e && Le.validateToken(e) ? (this.authorizationStatus = this.restrictedEnabled ? Le.AuthorizationStatus.RESTRICTED : Le.AuthorizationStatus.AUTHORIZED, this._setStorageItem(this.storagePrefix + ".u", e)) : (this.authorizationStatus = Le.AuthorizationStatus.NOT_DETERMINED, this._removeStorageItem(this.storagePrefix + ".u")), this._userToken = e, this.dispatchEvent(n.userTokenDidChange, {
              userToken: e
            })
          },
          enumerable: !0,
          configurable: !0
        }), Object.defineProperty(StoreKit.prototype, "userTokenIsValid", {
          get: function () {
            return Le.validateToken(this.userToken)
          },
          enumerable: !0,
          configurable: !0
        }), StoreKit.prototype.deeplinkURL = function (e) {
          return void 0 === e && (e = {}), e = Object.assign(this.deeplinkParameters || {}, e), "https://finance-app.itunes.apple.com/deeplink?" + De.buildQueryParams(e)
        }, StoreKit.prototype.itunesDeeplinkURL = function (e) {
          return void 0 === e && (e = {
            p: "browse"
          }), e = Object.assign(this.deeplinkParameters || {}, e), "https://itunes.apple.com/deeplink?" + De.buildQueryParams(e)
        }, StoreKit.prototype.renewUserToken = function () {
          return a(this, void 0, void 0, function () {
            var e, t, r;
            return s(this, function (i) {
              switch (i.label) {
                case 0:
                  return this.userToken ? (e = new Headers({
                    Authorization: "Bearer " + this.developerToken,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-Apple-Music-User-Token": "" + this.userToken
                  }), [4, fetch(this.playBase + "/renewMusicToken", {
                    method: "POST",
                    headers: e
                  })]) : [2, this.requestUserToken()];
                case 1:
                  return 401 !== (t = i.sent()).status ? [3, 3] : [4, this.revokeUserToken()];
                case 2:
                  return i.sent(), [2, Promise.reject(new Error("Renew token"))];
                case 3:
                  return [4, t.json()];
                case 4:
                  return (r = i.sent())["music-token"] && (this.userToken = r["music-token"]), [2, this.userToken]
              }
            })
          })
        }, StoreKit.prototype.requestStorefrontCountryCode = function () {
          return a(this, void 0, void 0, function () {
            var e, t, r, i;
            return s(this, function (n) {
              switch (n.label) {
                case 0:
                  return this.authorizationStatus <= Le.AuthorizationStatus.DENIED ? [2, Promise.reject("Not authorized: " + this.authorizationStatus)] : (e = new Headers({
                    Authorization: "Bearer " + this.developerToken,
                    "Music-User-Token": this.userToken
                  }), [4, fetch(this.apiBase + "/me/storefront", {
                    headers: e
                  })]);
                case 1:
                  return (t = n.sent()).ok ? [4, t.json()] : (this._reset(), [2, Promise.reject("Storefront Country Code error.")]);
                case 2:
                  return (r = n.sent()).errors ? [2, Promise.reject(r.errors)] : (i = r.data[0]) && i.id ? (this.storefrontCountryCode = i.id, [2, this.storefrontCountryCode]) : [2, Promise.reject("Storefront Country Code error.")]
              }
            })
          })
        }, StoreKit.prototype.requestStorefrontIdentifier = function () {
          return a(this, void 0, void 0, function () {
            var e;
            return s(this, function (t) {
              switch (t.label) {
                case 0:
                  return this.storefrontIdentifier ? [3, 2] : [4, Ne.Storefront.inferFromLanguages(this.developerToken)];
                case 1:
                  e = t.sent(), this.storefrontIdentifier = e.id, t.label = 2;
                case 2:
                  return [2, this.storefrontIdentifier]
              }
            })
          })
        }, StoreKit.prototype.requestUserToken = function () {
          return a(this, void 0, void 0, function () {
            var e, t;
            return s(this, function (r) {
              switch (r.label) {
                case 0:
                  if (this._serviceSetupView.isServiceView) return [2, this.userToken];
                  r.label = 1;
                case 1:
                  return r.trys.push([1, 3, , 4]), [4, this._serviceSetupView.load({
                    action: Le.ServiceSetupAction.AUTHORIZE
                  })];
                case 2:
                  return e = r.sent(), this.cid = e.cid, this.userToken = e.userToken, this.restrictedEnabled = e.restricted, [3, 4];
                case 3:
                  return t = r.sent(), this._reset(), this.authorizationStatus = t, [2, Promise.reject(t)];
                case 4:
                  return [2, this.userToken]
              }
            })
          })
        }, StoreKit.prototype.revokeUserToken = function () {
          return a(this, void 0, void 0, function () {
            return s(this, function (e) {
              switch (e.label) {
                case 0:
                  return e.trys.push([0, 2, , 3]), [4, this._webPlayerLogout()];
                case 1:
                  return e.sent(), [3, 3];
                case 2:
                  return e.sent(), [3, 3];
                case 3:
                  return this.dispatchEvent(n.authorizationStatusWillChange, {
                    authorizationStatus: this.authorizationStatus,
                    newAuthorizationStatus: Le.AuthorizationStatus.NOT_DETERMINED
                  }), this._reset(), this.dispatchEvent(n.authorizationStatusDidChange, {
                    authorizationStatus: this.authorizationStatus
                  }), this.dispatchEvent(n.userTokenDidChange, {
                    userToken: this._userToken
                  }), [2]
              }
            })
          })
        }, StoreKit.prototype.presentSubscribeView = function (e) {
          return void 0 === e && (e = !0), a(this, void 0, void 0, function () {
            var t;
            return s(this, function (r) {
              switch (r.label) {
                case 0:
                  if (this._serviceSetupView.isServiceView || !this.eligibleForSubscribeView) return [2];
                  if (!e) return this.dispatchEvent(n.eligibleForSubscribeView), this._dispatchedSubscribeView = !0, [2];
                  r.label = 1;
                case 1:
                  return r.trys.push([1, 3, , 4]), [4, this._serviceSetupView.load({
                    action: Le.ServiceSetupAction.SUBSCRIBE
                  })];
                case 2:
                  return t = r.sent(), this._dispatchedSubscribeView = !0, [2, t];
                case 3:
                  return r.sent(), [2, this.revokeUserToken()];
                case 4:
                  return [2]
              }
            })
          })
        }, StoreKit.prototype.me = function () {
          return a(this, void 0, void 0, function () {
            var e, t, r, i;
            return s(this, function (n) {
              switch (n.label) {
                case 0:
                  return this.authorizationStatus <= Le.AuthorizationStatus.DENIED ? [2, Promise.reject("Not authorized: " + this.authorizationStatus)] : (e = new Headers({
                    Authorization: "Bearer " + this.developerToken,
                    "Music-User-Token": this.userToken
                  }), [4, fetch(this.apiBase + "/me/account?meta=subscription", {
                    headers: e
                  })]);
                case 1:
                  return (t = n.sent()).ok ? [4, t.json()] : (this._reset(), [2, Promise.reject("Account error.")]);
                case 2:
                  return (r = n.sent()).errors ? [2, Promise.reject(r.errors)] : (i = r.meta) && i.subscription ? (this.storefrontCountryCode = i.subscription.storefront, [2, i.subscription]) : [2, Promise.reject("Account error.")]
              }
            })
          })
        }, StoreKit.prototype._getStorageItem = function (e) {
          if (e) return "cookie" === this.persist ? Ce.getCookie(btoa(e)) : "localstorage" === this.persist ? this.storage.getItem(e) : void 0
        }, StoreKit.prototype._processLocationHash = function (e) {
          var t = /^\#([a-zA-Z0-9+\/]{200,}={0,2})$/;
          if (t.test(e)) {
            var r = e.replace(t, "$1");
            try {
              var i = JSON.parse(atob(r)),
                n = i.itre,
                o = i.musicUserToken,
                a = i.cid;
              this.restrictedEnabled = n && "1" === n, this.userToken = o, this.cid = a
            } catch (e) {}
            history.replaceState(null, document.title, " ")
          }
        }, StoreKit.prototype._removeStorageItem = function (e) {
          return "cookie" === this.persist ? Ce.setCookie(btoa(e), "", "/", 0) : "localstorage" === this.persist ? this.storage.removeItem(e) : void 0
        }, StoreKit.prototype._reset = function (e) {
          void 0 === e && (e = Le.AuthorizationStatus.NOT_DETERMINED), this._authorizationStatus = e, this._cid = void 0, this._dispatchedSubscribeView = !1, this._restrictedEnabled = void 0, this._storefrontCountryCode = void 0, this._removeStorageItem(this.storagePrefix + ".c"), this._removeStorageItem(this._userToken + ".r"), this._removeStorageItem(this.storagePrefix + ".u"), this._removeStorageItem(this._userToken + ".s"), this._userToken = void 0
        }, StoreKit.prototype._setStorageItem = function (e, t) {
          return "cookie" === this.persist ? Ce.setCookie(btoa(e), t, "/", 180) : "localstorage" === this.persist ? this.storage.setItem(e, t) : void 0
        }, StoreKit.prototype._webPlayerLogout = function () {
          return a(this, void 0, void 0, function () {
            var e, t;
            return s(this, function (r) {
              switch (r.label) {
                case 0:
                  return e = new Headers({
                    Authorization: "Bearer " + this.developerToken,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-Apple-Music-User-Token": "" + this.userToken
                  }), [4, fetch(this.playBase + "/webPlayerLogout", {
                    method: "POST",
                    headers: e
                  })];
                case 1:
                  return (t = r.sent()).ok ? [2, t.json()] : [2, Promise.reject(t.status)]
              }
            })
          })
        }, StoreKit
      }(Ae.Notifications);
      r.StoreKit = StoreKit
    }));
  unwrapExports(Ue);
  Ue.validateToken;
  var xe = Ue.AuthorizationStatus,
    Be = Ue.StoreKitNotifications,
    ze = Ue.StoreKit,
    Ke = {
      configured: "musickitconfigured",
      loaded: "musickitloaded",
      authorizationStatusDidChange: Be.authorizationStatusDidChange,
      authorizationStatusWillChange: Be.authorizationStatusWillChange,
      bufferedProgressDidChange: "bufferedProgressDidChange",
      eligibleForSubscribeView: Be.eligibleForSubscribeView,
      mediaCanPlay: "mediaCanPlay",
      mediaItemDidChange: "mediaItemDidChange",
      mediaItemStateDidChange: "mediaItemStateDidChange",
      mediaItemStateWillChange: "mediaItemStateWillChange",
      mediaItemWillChange: "mediaItemWillChange",
      mediaPlaybackError: "mediaPlaybackError",
      mediaPlaybackPreview: "mediaPlaybackPreview",
      metadataDidChange: "metadataDidChange",
      playbackBitrateDidChange: "playbackBitrateDidChange",
      playbackDurationDidChange: "playbackDurationDidChange",
      playbackProgressDidChange: "playbackProgressDidChange",
      playbackStateDidChange: "playbackStateDidChange",
      playbackStateWillChange: "playbackStateWillChange",
      playbackTargetAvailableDidChange: "playbackTargetAvailableDidChange",
      playbackTimeDidChange: "playbackTimeDidChange",
      playbackVolumeDidChange: "playbackVolumeDidChange",
      primaryPlayerDidChange: "primaryPlayerDidChange",
      queueItemsDidChange: "queueItemsDidChange",
      queueItemForStartPosition: "queueItemForStartPosition",
      queuePositionDidChange: "queuePositionDidChange",
      storefrontCountryCodeDidChange: Be.storefrontCountryCodeDidChange,
      storefrontIdentifierDidChange: Be.storefrontIdentifierDidChange,
      userTokenDidChange: Be.userTokenDidChange
    },
    Ve = createCommonjsModule(function (e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var DeveloperToken = function () {
        function DeveloperToken(e) {
          if (this.token = e, !e || !/^[a-z0-9\-\_]{16,}\.[a-z0-9\-\_]{16,}\.[a-z0-9\-\_]{16,}/i.test(e)) throw new Error("Invalid token.");
          var t = e.split("."),
            r = t[0],
            i = t[1],
            n = this._decode(i),
            o = n.exp,
            a = n.iss;
          if (this.expiration = 1e3 * o, this.isExpired) throw new Error("Initialized with an expired token.");
          this.teamId = a;
          var s = this._decode(r).kid;
          this.keyId = s
        }
        return Object.defineProperty(DeveloperToken.prototype, "isExpired", {
          get: function () {
            return this.expiration < Date.now()
          },
          enumerable: !0,
          configurable: !0
        }), DeveloperToken.prototype._decode = function (e) {
          return JSON.parse(window.atob(e))
        }, DeveloperToken
      }();
      t.DeveloperToken = DeveloperToken
    });
  unwrapExports(Ve);
  Ve.DeveloperToken;
  var qe = createCommonjsModule(function (e, r) {
    var i, n = t && t.__extends || (i = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
        },
        function (e, t) {
          function __() {
            this.constructor = e
          }
          i(e, t), e.prototype = null === t ? Object.create(t) : (__.prototype = t.prototype, new __)
        }),
      o = t && t.__assign || Object.assign || function (e) {
        for (var t, r = 1, i = arguments.length; r < i; r++)
          for (var n in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e
      },
      a = t && t.__awaiter || function (e, t, r, i) {
        return new(r || (r = Promise))(function (n, o) {
          function fulfilled(e) {
            try {
              step(i.next(e))
            } catch (e) {
              o(e)
            }
          }

          function rejected(e) {
            try {
              step(i.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function step(e) {
            e.done ? n(e.value) : new r(function (t) {
              t(e.value)
            }).then(fulfilled, rejected)
          }
          step((i = i.apply(e, t || [])).next())
        })
      },
      s = t && t.__generator || function (e, t) {
        var r, i, n, o, a = {
          label: 0,
          sent: function () {
            if (1 & n[0]) throw n[1];
            return n[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: verb(0),
          throw: verb(1),
          return: verb(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
          return this
        }), o;

        function verb(o) {
          return function (s) {
            return function (o) {
              if (r) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (r = 1, i && (n = 2 & o[0] ? i.return : o[0] ? i.throw || ((n = i.return) && n.call(i), 0) : i.next) && !(n = n.call(i, o[1])).done) return n;
                switch (i = 0, n && (o = [2 & o[0], n.value]), o[0]) {
                  case 0:
                  case 1:
                    n = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, i = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(n = (n = a.trys).length > 0 && n[n.length - 1]) && (6 === o[0] || 2 === o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!n || o[1] > n[0] && o[1] < n[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < n[1]) {
                      a.label = n[1], n = o;
                      break
                    }
                    if (n && a.label < n[2]) {
                      a.label = n[2], a.ops.push(o);
                      break
                    }
                    n[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], i = 0
              } finally {
                r = n = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };
    Object.defineProperty(r, "__esModule", {
      value: !0
    });
    var URLSession = function () {
      function URLSession(e, t, r) {
        this.headers = new Headers, this.prefix = "ï£¿", this.method = "GET", this.url = e, this.storage = t || new ne.GenericStorage, this.ttl = r || 3e5
      }
      return URLSession.prototype.request = function (e, t, r) {
        return a(this, void 0, void 0, function () {
          var i, n, a, u, c, l, d;
          return s(this, function (s) {
            switch (s.label) {
              case 0:
                return r || "object" != typeof e || (r = t || {}, t = e, e = void 0), r = o({
                  method: this.method,
                  headers: this.headers
                }, r), i = e ? this.url + "/" + e : this.url, n = r.method, t && "GET" === n && (a = Object.keys(t).map(function (e) {
                  var r = t[e];
                  return r.constructor === Object ? Object.keys(r).map(function (t) {
                    return encodeURIComponent(e) + "[" + encodeURIComponent(t) + "]=" + encodeURIComponent(r[t])
                  }).join("&") : encodeURIComponent(e) + "=" + encodeURIComponent(t[e])
                }).join("&"), i = i + "?" + a), (u = this.getCacheItem(i)) ? [2, Promise.resolve(u)] : (!t || "POST" !== n && "PUT" !== n || (r.body = JSON.stringify(t)), [4, fetch(i, r)]);
              case 1:
                return (c = s.sent()).ok ? [4, c.json()] : [2, Promise.reject(c)];
              case 2:
                return (l = s.sent()).errors ? [2, Promise.reject(l.errors)] : (d = l.results || l.data || l, this.setCacheItem(i, d), [2, d])
            }
          })
        })
      }, URLSession.prototype.clearCacheItems = function () {
        var e = this,
          t = this.storage.constructor === ne.GenericStorage ? this.storage._data : this.storage;
        Object.keys(t).filter(function (t) {
          return new RegExp("^" + e.prefix).test(t)
        }).forEach(function (t) {
          e.storage.removeItem(t)
        })
      }, URLSession.prototype.getCacheItem = function (e) {
        var t = this._key(e),
          r = this.storage.getItem(t);
        if (r) {
          var i = JSON.parse(r),
            n = i.x,
            o = i.d;
          if (n > Date.now()) return o;
          this.storage.removeItem(t)
        }
      }, URLSession.prototype.setCacheItem = function (e, t, r) {
        void 0 === r && (r = this.ttl);
        var i = this._key(e);
        this.storage.removeItem(i), this.storage.setItem(i, JSON.stringify({
          x: Date.now() + r,
          d: t
        }))
      }, URLSession.prototype._key = function (e) {
        var t = e.toLowerCase().replace(this.url, ""),
          r = this.headers.get("Music-User-Token");
        return r && (t = "" + r.replace(/[^0-9a-z]{1,}/g, "") + t), "" + this.prefix + t.replace(/[^-_0-9a-z]{1,}/g, ".")
      }, URLSession
    }();
    r.URLSession = URLSession;
    var TokenSession = function (e) {
      function TokenSession(t, r, i, n) {
        var o = e.call(this, t, n) || this;
        return o._developerToken = new Ve.DeveloperToken(r), o.headers.append("Authorization", "Bearer " + o.developerToken), o.userToken = i, o.userToken && o.headers.append("Music-User-Token", o.userToken), o
      }
      return n(TokenSession, e), Object.defineProperty(TokenSession.prototype, "developerToken", {
        get: function () {
          return this._developerToken.token
        },
        enumerable: !0,
        configurable: !0
      }), TokenSession
    }(URLSession);
    r.TokenSession = TokenSession
  });
  unwrapExports(qe);
  qe.URLSession;
  var Fe = qe.TokenSession,
    He = createCommonjsModule(function (e, t) {
      function get(e, t) {
        return t.split(".").reduce(function (e, t) {
          if (void 0 !== e) return e[t]
        }, e)
      }

      function set(e, t, r) {
        return t.split(".").reduce(function (t, i, n, o) {
          var a = n === o.length - 1,
            s = t.hasOwnProperty(i),
            u = t[i] instanceof Object,
            c = null === t[i];
          if (!a && s && (!u || c)) throw new TypeError("Value at " + o.slice(0, n + 1).join(".") + " in keypath is not an Object.");
          return a ? (t[i] = r, e) : s ? t[i] : t[i] = {}
        }, e)
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.get = get, t.set = set, t.transform = function (e, t) {
        return Object.keys(e).reduce(function (r, i) {
          var n, o = e[i];
          return (n = "function" == typeof o ? o() : get(t, o)) && set(r, i, n), r
        }, {})
      }
    });
  unwrapExports(He);
  var We = He.get,
    Ge = (He.set, He.transform);

  function transformParameters(e, t) {
    if (void 0 === t && (t = 25), e) return Ge({
      limit: function () {
        return e.limit && e.limit > t ? t : e.limit
      },
      offset: "offset"
    }, e)
  }
  var Ye = createCommonjsModule(function (e, t) {
    function stringToUint8Array(e) {
      for (var t = e.length, r = new ArrayBuffer(t), i = new Uint8Array(r), n = 0; n < t; n++) i[n] = e.charCodeAt(n);
      return i
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.arrayBufferToString = function (e) {
      for (var t = new Uint16Array(e), r = t.length, i = "", n = 0; n < r; n++) i += String.fromCharCode(t[n]);
      return i
    }, t.base64ToUint8Array = function (e) {
      return stringToUint8Array(window.atob(e))
    }, t.ensureArray = function (e) {
      return void 0 === e && (e = []), Array.isArray(e) ? e : [e]
    }, t.stringToUint8Array = stringToUint8Array, t.stringToUint16Array = function (e) {
      for (var t = e.length, r = new ArrayBuffer(2 * t), i = new Uint16Array(r), n = 0; n < t; n++) i[n] = e.charCodeAt(n);
      return i
    }, t.uint8ArrayToBase64 = function (e) {
      for (var t, r, i, n, o, a, s, u = 0, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", l = ""; u < e.length;) n = (t = e[u++]) >> 2, o = (3 & t) << 4 | (r = u < e.length ? e[u++] : Number.NaN) >> 4, a = (15 & r) << 2 | (i = u < e.length ? e[u++] : Number.NaN) >> 6, s = 63 & i, isNaN(r) ? a = s = 64 : isNaN(i) && (s = 64), l += c.charAt(n) + c.charAt(o) + c.charAt(a) + c.charAt(s);
      return l
    }
  });
  unwrapExports(Ye);
  var Qe = Ye.arrayBufferToString,
    $e = Ye.base64ToUint8Array,
    Ze = (Ye.ensureArray, Ye.stringToUint8Array, Ye.stringToUint16Array),
    Xe = Ye.uint8ArrayToBase64,
    Je = createCommonjsModule(function (e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var DataRecord = function () {
        function DataRecord(e, t) {
          this.type = e, this.id = t, this._attributes = [], this._relationships = []
        }
        return DataRecord.prototype.hasAttributes = function (e) {
          if (!e) return this._attributes.length > 0;
          e = Ye.ensureArray(e);
          for (var t = !1, r = 0; r < e.length && (t = this._attributes.indexOf(e[r]) > -1); r++);
          return t
        }, DataRecord.prototype.serialize = function (e) {
          var t = this;
          void 0 === e && (e = !0);
          var r = {
            id: this.id,
            type: this.type
          };
          return this.hasAttributes() && (r.attributes = this._attributes.reduce(function (e, r) {
            return e[r] = t[r], e
          }, {})), this._relationships.length > 0 && (r.relationships = this._relationships.reduce(function (e, r) {
            var i = t[r];
            return Array.isArray(i) ? e[r] = {
              data: i.map(function (e) {
                return "function" == typeof e.serialize ? e.serialize(!1) : e
              })
            } : e[r] = "function" == typeof i.serialize ? i.serialize() : i, e
          }, {})), e ? {
            data: r
          } : r
        }, DataRecord.prototype.setProperty = function (e, t, r) {
          void 0 === r && (r = "attributes"), this.hasOwnProperty(e) || this["_" + r].push(e), this[e] = t
        }, DataRecord
      }();
      t.DataRecord = DataRecord;
      var i = function () {
        function DataStore(e) {
          this.mapping = e, this.clear()
        }
        return DataStore.prototype.clear = function () {
          this._records = {}
        }, DataStore.prototype.peek = function (e, t) {
          var r = this;
          return "string" != typeof t ? !t && this._records[e] ? Object.values(this._records[e]) : Array.isArray(t) && this._records[e] ? t.map(function (t) {
            return r._records[e][t]
          }) : [] : this._records[e] && this._records[e][t] ? this._records[e][t] : null
        }, DataStore.prototype.populateDataRecords = function (e, t, r) {
          var i = this;
          return void 0 === t && (t = {}), void 0 === r && (r = this.mapping), Ye.ensureArray(e.data).map(function (e) {
            var n = i._materializeRecord(e.type, e.id, t);
            return r && Object.assign(e, He.transform(r, e)), e.attributes ? (Object.keys(e.attributes).forEach(function (t) {
              n.setProperty(t, e.attributes[t], "attributes")
            }), e.relationships && Object.keys(e.relationships).forEach(function (o) {
              if (e.relationships[o].data) {
                var a = i.populateDataRecords(e.relationships[o], t, r);
                n.setProperty(o, a, "relationships")
              }
            }), n) : n
          })
        }, DataStore.prototype.save = function (e, t) {
          return void 0 === t && (t = this.mapping), this.populateDataRecords(e, this._records, t)
        }, DataStore.prototype._materializeRecord = function (e, t, i) {
          return i[e] = i[e] || {}, i[e][t] = i[e][t] || new DataRecord(e, t), i[e][t]
        }, DataStore
      }();
      t.DataStore = i
    });
  unwrapExports(Je);
  Je.DataRecord;
  var et, tt = Je.DataStore,
    LocalDataStore = function () {
      function LocalDataStore() {
        this.enableDataStore = !!globalConfig.features["api-data-store"], this.enableDataStore && (this._store = new tt)
      }
      return Object.defineProperty(LocalDataStore.prototype, "hasDataStore", {
        get: function () {
          return this.enableDataStore && void 0 !== this._store
        },
        enumerable: !0,
        configurable: !0
      }), LocalDataStore.prototype.read = function (e, t, r) {
        if (this.hasDataStore) {
          var i = this._store.peek(e, t);
          if (i && i.hasAttributes()) return i
        }
        return r()
      }, LocalDataStore.prototype.write = function (e) {
        var t = this;
        return this._prepareDataForDataStore(e, function (e) {
          return t._store.save(e)
        })
      }, LocalDataStore.prototype.parse = function (e) {
        var t = this;
        return this._prepareDataForDataStore(e, function (e) {
          return t._store.populateDataRecords(e, {})
        })
      }, LocalDataStore.prototype._prepareDataForDataStore = function (e, t) {
        return this.hasDataStore ? Array.isArray(e) ? t({
          data: e
        }) : Object.keys(e).reduce(function (r, i) {
          var n = e[i];
          return n.hasOwnProperty("data") && n.hasOwnProperty("href") && (r[i] = t({
            data: n.data
          })), r
        }, {}) : e
      }, LocalDataStore
    }(),
    it = "me/library",
    Library = function (e) {
      function Library(t, r, i) {
        var n = e.call(this, t, r, i) || this;
        return n._last = 0, n._store = new LocalDataStore, n
      }
      return __extends(Library, e), Library.prototype.add = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          var t, r, i, n;
          return __generator(this, function (o) {
            switch (o.label) {
              case 0:
                if ((t = Date.now()) - this._last < 1e3) return [2, Promise.reject(new MKError(MKError.QUOTA_EXCEEDED))];
                r = new Headers({
                  Authorization: "Bearer " + this.developerToken,
                  "Music-User-Token": this.userToken
                }), i = Object.keys(e).map(function (t) {
                  return "ids[" + t + "]=" + e[t].join(",")
                }).join("&"), o.label = 1;
              case 1:
                return o.trys.push([1, 3, , 4]), [4, fetch(this.url + "/" + it + "?" + i, {
                  method: "POST",
                  headers: r
                })];
              case 2:
                return o.sent(), this._last = t, [2, e];
              case 3:
                return n = o.sent(), [2, Promise.reject(MKError.responseError(n))];
              case 4:
                return [2]
            }
          })
        })
      }, Library.prototype.album = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.resource("albums", e, t)]
          })
        })
      }, Library.prototype.albumRelationship = function (e, t, r) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (i) {
            return [2, this.collection("albums/" + e + "/" + t, void 0, r)]
          })
        })
      }, Library.prototype.albums = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.collection("albums", e, t, !1)]
          })
        })
      }, Library.prototype.artist = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.resource("artists", e, t)]
          })
        })
      }, Library.prototype.artistRelationship = function (e, t, r) {
        return void 0 === t && (t = "albums"), __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (i) {
            return [2, this.collection("artists/" + e + "/" + t, void 0, r)]
          })
        })
      }, Library.prototype.artists = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.collection("artists", e, t)]
          })
        })
      }, Library.prototype.musicVideo = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.resource("music-videos", e, t)]
          })
        })
      }, Library.prototype.musicVideos = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.collection("music-videos", e, t)]
          })
        })
      }, Library.prototype.playlist = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return t = Object.assign({
              include: "tracks"
            }, t), [2, this.resource("playlists", e, t)]
          })
        })
      }, Library.prototype.playlistRelationship = function (e, t, r) {
        return void 0 === t && (t = "tracks"), __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (i) {
            return [2, this.collection("playlists/" + e + "/" + t, void 0, r)]
          })
        })
      }, Library.prototype.playlists = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.collection("playlists", e, t, !1)]
          })
        })
      }, Library.prototype.recentlyAdded = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (t) {
            return [2, this.collection("recently-added", void 0, transformParameters(e, 10), !1)]
          })
        })
      }, Library.prototype.search = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          var r;
          return __generator(this, function (i) {
            return t = this._denormalizeLibraryTypes(t), r = Object.assign({
              term: e,
              types: "library-albums"
            }, t), [2, this.collection("search", void 0, r, !1)]
          })
        })
      }, Library.prototype.song = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.resource("songs", e, t)]
          })
        })
      }, Library.prototype.songs = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.collection("songs", e, t)]
          })
        })
      }, Library.prototype.collection = function (e, t, r, i) {
        return void 0 === i && (i = !0), __awaiter(this, void 0, void 0, function () {
          var n, o, a;
          return __generator(this, function (s) {
            switch (s.label) {
              case 0:
                !t || t.length || r || (r = transformParameters(t, 100), t = void 0), o = t ? Object.assign({
                  ids: t.join(",")
                }, r) : r, s.label = 1;
              case 1:
                return s.trys.push([1, 3, , 4]), [4, this.request(it + "/" + e, o)];
              case 2:
                return n = s.sent(), [3, 4];
              case 3:
                return a = s.sent(), [2, Promise.reject(MKError.responseError(a))];
              case 4:
                try {
                  return [2, i ? this._store.write(n) : this._store.parse(n)]
                } catch (e) {
                  return [2, Promise.reject(MKError.parseError(e))]
                }
            }
          })
        })
      }, Library.prototype.resource = function (e, t, r) {
        return __awaiter(this, void 0, void 0, function () {
          var i, n = this;
          return __generator(this, function (o) {
            return [2, this._store.read(e, t, function () {
              return __awaiter(n, void 0, void 0, function () {
                var n;
                return __generator(this, function (o) {
                  switch (o.label) {
                    case 0:
                      return o.trys.push([0, 2, , 3]), [4, this.request(it + "/" + e + "/" + t, r)];
                    case 1:
                      return i = o.sent(), [3, 3];
                    case 2:
                      return n = o.sent(), [2, Promise.reject(MKError.responseError(n))];
                    case 3:
                      try {
                        return [2, this._store.write(i)[0]]
                      } catch (e) {
                        return [2, Promise.reject(MKError.parseError(e))]
                      }
                  }
                })
              })
            })]
          })
        })
      }, Library.prototype._denormalizeLibraryTypes = function (e, t) {
        void 0 === e && (e = {}), void 0 === t && (t = "types");
        var r = e[t];
        return r ? ("string" == typeof r && (r = r.split(",")), e[t] = r.map(function (e) {
          return e.replace(/^(albums|music-videos|playlists|songs)$/, "library-$1")
        }), e) : e
      }, Library
    }(Fe);

  function formatArtworkURL(e, t, r) {
    return t = t || e.height || 100, r = r || e.width || 100, window.devicePixelRatio >= 1.5 && (r *= 2, t *= 2), e.url.replace("{h}", "" + t).replace("{w}", "" + r).replace("{f}", "jpeg")
  }! function (e) {
    e[e.Global = 0] = "Global", e.Catalog = "catalog", e.Personalized = "me", e.Editorial = "editorial"
  }(et || (et = {}));
  var ot = ["search/hints", "recommendations"],
    API = function (e) {
      function API(t, r, i, n, o, a) {
        var s = e.call(this, t, r, n, a) || this;
        return s.storefrontId = je.ID, s.enablePlayEquivalencies = !!globalConfig.features.equivalencies, s.resourceRelatives = {
          artists: {
            albums: {
              include: "tracks"
            },
            playlists: {
              include: "tracks"
            },
            songs: null
          }
        }, s._store = new LocalDataStore, i && (s.storefrontId = i), n && o && (s.userStorefrontId = o), s.library = new Library(t, r, n), s
      }
      return __extends(API, e), Object.defineProperty(API.prototype, "needsEquivalents", {
        get: function () {
          return this.userStorefrontId && this.userStorefrontId !== this.storefrontId
        },
        enumerable: !0,
        configurable: !0
      }), API.prototype.activity = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.resource(et.Catalog, "activities", e, t)]
          })
        })
      }, API.prototype.activities = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.collection(et.Catalog, "activities", e, t)]
          })
        })
      }, API.prototype.album = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return t = this.equivalentParameters(t, "extend[songs]"), [2, this.resource(et.Catalog, "albums", e, t)]
          })
        })
      }, API.prototype.albumRelationship = function (e, t, r) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (i) {
            return [2, this.collection(et.Catalog, "albums/" + e + "/" + t, void 0, r)]
          })
        })
      }, API.prototype.albums = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return t = this.equivalentParameters(t, "extend[songs]"), [2, this.collection(et.Catalog, "albums", e, t)]
          })
        })
      }, API.prototype.appleCurator = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.resource(et.Catalog, "apple-curators", e, t)]
          })
        })
      }, API.prototype.appleCurators = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.collection(et.Catalog, "apple-curators", e, t)]
          })
        })
      }, API.prototype.artist = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          var r;
          return __generator(this, function (i) {
            return !!!globalConfig.features["api-artist-include"] && t && t.hasOwnProperty("include") && this.resourceRelatives.artists.hasOwnProperty(t.include) ? (r = t.include, delete t.include, t = Object.assign(t, this.resourceRelatives.artists[r] || {}), [2, this.collection(et.Catalog, "artists/" + e + "/" + r, void 0, t)]) : [2, this.resource(et.Catalog, "artists", e, t)]
          })
        })
      }, API.prototype.artistRelationship = function (e, t, r) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (i) {
            return [2, this.collection(et.Catalog, "artists/" + e + "/" + t, void 0, r)]
          })
        })
      }, API.prototype.artists = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.collection(et.Catalog, "artists", e, t)]
          })
        })
      }, API.prototype.charts = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.collection(et.Catalog, "charts", e, t)]
          })
        })
      }, API.prototype.curator = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.resource(et.Catalog, "curators", e, t)]
          })
        })
      }, API.prototype.curators = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.collection(et.Catalog, "curators", e, t)]
          })
        })
      }, API.prototype.genre = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.resource(et.Catalog, "genres", e, t)]
          })
        })
      }, API.prototype.genres = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.collection(et.Catalog, "genres", e, t)]
          })
        })
      }, API.prototype.historyHeavyRotation = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (t) {
            return [2, this.collection(et.Personalized, "history/heavy-rotation", void 0, transformParameters(e, 10))]
          })
        })
      }, API.prototype.musicVideo = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return t = this.equivalentParameters(t), [2, this.resource(et.Catalog, "music-videos", e, t)]
          })
        })
      }, API.prototype.musicVideos = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return t = this.equivalentParameters(t), [2, this.collection(et.Catalog, "music-videos", e, t)]
          })
        })
      }, API.prototype.playlist = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.resource(et.Catalog, "playlists", e, t)]
          })
        })
      }, API.prototype.playlistRelationship = function (e, t, r) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (i) {
            return [2, this.collection(et.Catalog, "playlists/" + e + "/" + t, void 0, r)]
          })
        })
      }, API.prototype.playlists = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.collection(et.Catalog, "playlists", e, t)]
          })
        })
      }, API.prototype.recentPlayed = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (t) {
            return [2, this.collection(et.Personalized, "recent/played", void 0, transformParameters(e, 10))]
          })
        })
      }, API.prototype.recommendation = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          var r;
          return __generator(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, this.recommendations([e], t)];
              case 1:
                return r = i.sent(), [2, r[0]]
            }
          })
        })
      }, API.prototype.recommendations = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          var r;
          return __generator(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, this.collection(et.Personalized, "recommendations", e, t)];
              case 1:
                r = i.sent(), this._reindexRelationships(r, "recommendations");
                try {
                  return [2, this._store.parse(r)]
                } catch (e) {
                  return [2, Promise.reject(MKError.parseError(e))]
                }
            }
          })
        })
      }, API.prototype.search = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          var r;
          return __generator(this, function (i) {
            return r = Object.assign({
              term: e
            }, transformParameters(t)), [2, this.collection(et.Catalog, "search", void 0, r)]
          })
        })
      }, API.prototype.searchHints = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          var r;
          return __generator(this, function (i) {
            return r = Object.assign({
              term: e
            }, transformParameters(t)), [2, this.collection(et.Catalog, "search/hints", void 0, r)]
          })
        })
      }, API.prototype.song = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return t = this.equivalentParameters(t), [2, this.resource(et.Catalog, "songs", e, t)]
          })
        })
      }, API.prototype.songs = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return !t && e && e.constructor === Object && (t = e, e = void 0), t = this.equivalentParameters(t), [2, this.collection(et.Catalog, "songs", e, t)]
          })
        })
      }, API.prototype.station = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.resource(et.Catalog, "stations", e, t)]
          })
        })
      }, API.prototype.stations = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.collection(et.Catalog, "stations", e, t)]
          })
        })
      }, API.prototype.storefront = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.resource(et.Global, "storefronts", e, t)]
          })
        })
      }, API.prototype.storefronts = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            return [2, this.collection(et.Global, "storefronts", e, t)]
          })
        })
      }, API.prototype.addToLibrary = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (t) {
            return this.developerToken && this.userToken && this.library ? [2, this.library.add(e)] : [2, Promise.reject("Invalid tokens")]
          })
        })
      }, API.prototype.collection = function (e, t, r, i, n) {
        return void 0 === n && (n = !0), __awaiter(this, void 0, void 0, function () {
          var o, a, s, u, c, l;
          return __generator(this, function (d) {
            switch (d.label) {
              case 0:
                switch (r && r.length ? ((u = {})["charts" === t ? "types" : "ids"] = r.join(","), o = Object.assign(u, i)) : o = i, e) {
                  case et.Catalog:
                  case et.Editorial:
                    c = this.storefrontId, this.needsEquivalents && "playlists" === t && (c = this.userStorefrontId), a = e + "/" + c + "/" + t;
                    break;
                  case et.Global:
                    a = t;
                    break;
                  case et.Personalized:
                    a = e + "/" + t, n = !1
                }
                d.label = 1;
              case 1:
                return d.trys.push([1, 3, , 4]), [4, this.request(a, o)];
              case 2:
                return 0 === (s = d.sent()).length ? [2, Promise.reject(new MKError(MKError.CONTENT_UNAVAILABLE, "The requested content is not available."))] : void 0 !== ot.find(function (e) {
                  return null !== a.match(e)
                }) ? [2, s] : [3, 4];
              case 3:
                return l = d.sent(), [2, Promise.reject(MKError.responseError(l))];
              case 4:
                try {
                  return [2, n ? this._store.write(s) : this._store.parse(s)]
                } catch (e) {
                  return [2, Promise.reject(MKError.parseError(e))]
                }
            }
          })
        })
      }, API.prototype.resource = function (e, t, r, i, n) {
        return void 0 === n && (n = !0), __awaiter(this, void 0, void 0, function () {
          var o = this;
          return __generator(this, function (a) {
            return [2, this._store.read(t, r, function () {
              return __awaiter(o, void 0, void 0, function () {
                return __generator(this, function (o) {
                  switch (o.label) {
                    case 0:
                      return [4, this.collection(e, t, [r], i, n)];
                    case 1:
                      return [2, o.sent()[0]]
                  }
                })
              })
            })]
          })
        })
      }, API.prototype.equivalentParameters = function (e, t) {
        if (void 0 === e && (e = {}), void 0 === t && (t = "extend"), !this.needsEquivalents || !this.userStorefrontId) return e;
        var r = {
          equivalentStorefronts: this.userStorefrontId
        };
        return this.enablePlayEquivalencies ? r[t] = "equivalentPlayParams" : r.include = "equivalents", Object.assign(e, r)
      }, API.prototype._reindexRelationships = function (e, t) {
        e.forEach(function (e) {
          e.hasOwnProperty("relationships") && e.relationships.hasOwnProperty(t) && e.relationships[t].hasOwnProperty("data") && Array.isArray(e.relationships[t].data) && e.relationships[t].data.forEach(function (e, t) {
            e.id = e.id + "-" + t
          })
        })
      }, API
    }(Fe),
    st = createCommonjsModule(function (e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = function () {
        function Notifications(e) {
          void 0 === e && (e = []);
          var t = this;
          this._registry = {}, e.forEach(function (e) {
            t._registry[e] = []
          })
        }
        return Notifications.prototype.addEventListener = function (e, t) {
          Array.isArray(this._registry[e]) && this._registry[e].push(t)
        }, Notifications.prototype.dispatchEvent = function (e, t) {
          Array.isArray(this._registry[e]) && this._registry[e].forEach(function (e) {
            return e(t)
          })
        }, Notifications.prototype.removeEventListener = function (e, t) {
          if (Array.isArray(this._registry[e])) {
            var r = this._registry[e].indexOf(t);
            this._registry[e].splice(r, 1)
          }
        }, Notifications
      }();
      t.Notifications = r
    });
  unwrapExports(st);
  var ut, ct, lt = st.Notifications;
  ! function (e) {
    e[e.STANDARD = 64] = "STANDARD", e[e.HIGH = 256] = "HIGH"
  }(e.PlaybackBitrate || (e.PlaybackBitrate = {})),
  function (e) {
    e[e.DEFAULT = 0] = "DEFAULT", e[e.PREVIEW_ONLY = 1] = "PREVIEW_ONLY"
  }(ut || (ut = {})),
  function (e) {
    e[e.ACCURATE = 0] = "ACCURATE", e[e.ROUND = 1] = "ROUND"
  }(ct || (ct = {})),
  function (e) {
    e[e.none = 0] = "none", e[e.loading = 1] = "loading", e[e.playing = 2] = "playing", e[e.paused = 3] = "paused", e[e.stopped = 4] = "stopped", e[e.ended = 5] = "ended", e[e.seeking = 6] = "seeking", e[e.waiting = 8] = "waiting", e[e.stalled = 9] = "stalled", e[e.completed = 10] = "completed"
  }(e.PlaybackStates || (e.PlaybackStates = {}));
  var dt, pt = Ke.playbackBitrateDidChange,
    ht = Ke.playbackStateDidChange,
    ft = Ke.playbackStateWillChange,
    yt = Ke.playbackTargetAvailableDidChange,
    Playback = function (t) {
      function Playback(r) {
        void 0 === r && (r = []);
        var i = t.call(this, [pt, ht, ft, yt].concat(r)) || this;
        return i._bitrate = e.PlaybackBitrate.STANDARD, i._playbackState = e.PlaybackStates.none, i._timingAccuracy = ct.ROUND, i._downlinkSamples = [], i._playbackTargetAvailable = !1, i._mode = ut.DEFAULT, i
      }
      return __extends(Playback, t), Object.defineProperty(Playback.prototype, "bitrate", {
        get: function () {
          return this._bitrate
        },
        set: function (e) {
          this._bitrate !== e && (this._bitrate = e, this.dispatchEvent(pt, {
            bitrate: e
          }))
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Playback.prototype, "medianDownlink", {
        get: function () {
          return this._downlinkSamples.reduce(function (e, t) {
            return e + t
          }, 0) / this._downlinkSamples.length || 0
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Playback.prototype, "playbackState", {
        get: function () {
          return this._playbackState
        },
        set: function (e) {
          var t = {
            oldState: this._playbackState,
            state: e
          };
          this.dispatchEvent(ft, t), this._playbackState = e, this.dispatchEvent(ht, t)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Playback.prototype, "playbackTargetAvailable", {
        get: function () {
          return window.WebKitPlaybackTargetAvailabilityEvent && this._playbackTargetAvailable
        },
        set: function (e) {
          this._playbackTargetAvailable = e, this.dispatchEvent(yt, {
            available: e
          })
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Playback.prototype, "previewOnly", {
        get: function () {
          return this._mode === ut.PREVIEW_ONLY
        },
        set: function (e) {
          this._mode = e ? ut.PREVIEW_ONLY : ut.DEFAULT
        },
        enumerable: !0,
        configurable: !0
      }), Playback.prototype.timing = function (e) {
        return void 0 === e && (e = 0), this._timingAccuracy === ct.ROUND ? Math.round(e) : e
      }, Playback.prototype.recalculateBitrate = function (t) {
        this._downlinkSamples.push(t), this.medianDownlink && this.medianDownlink >= 65 ? this.bitrate = e.PlaybackBitrate.HIGH : this.bitrate = e.PlaybackBitrate.STANDARD
      }, Playback
    }(lt);
  ! function (e) {
    e[e.none = 0] = "none", e[e.loading = 1] = "loading", e[e.ready = 2] = "ready", e[e.playing = 3] = "playing", e[e.ended = 4] = "ended", e[e.unavailable = 5] = "unavailable", e[e.restricted = 6] = "restricted", e[e.error = 7] = "error"
  }(dt || (dt = {}));
  var bt = Ke.mediaItemStateDidChange,
    _t = Ke.mediaItemStateWillChange,
    MediaItem = function (e) {
      function MediaItem(t) {
        void 0 === t && (t = {});
        var r = e.call(this, [bt, _t]) || this;
        r._assets = [], r._isPlayable = !0, r._state = dt.none;
        return t.id && t.attributes ? (Object.assign(r, t), r.type = r.playParams && r.playParams.kind ? r.playParams.kind : r.type || "song") : (r.id = t.id || ie(), r.type = t.type || "song", r.attributes = {
          playParams: {
            id: r.id,
            kind: r.type
          }
        }), r._isPlayable = -1 !== globalConfig.supportedMediaTypes.indexOf(r.type), t.container ? r._container = t.container : t.containerId && t.containerType && (r._container = {
          id: t.containerId,
          type: t.containerType
        }), r
      }
      return __extends(MediaItem, e), Object.defineProperty(MediaItem.prototype, "albumInfo", {
        get: function () {
          return this.artistName + " - " + this.albumName
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "albumName", {
        get: function () {
          return this.attributes.albumName
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "artistName", {
        get: function () {
          return this.attributes.artistName
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "artwork", {
        get: function () {
          return this.attributes.artwork
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "artworkURL", {
        get: function () {
          if (this.artwork && this.artwork.url) return this.artwork.url
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "assets", {
        get: function () {
          return this._assets
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "canPlay", {
        get: function () {
          return this.isPlayable && this.isReady
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "container", {
        get: function () {
          return this._container
        },
        set: function (e) {
          this._container = e
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "contentRating", {
        get: function () {
          return this.attributes.contentRating
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "discNumber", {
        get: function () {
          return this.attributes.discNumber
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "equivalent", {
        get: function () {
          return this._equivalent
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "hasContainerArtwork", {
        get: function () {
          return this.container && this.container.attributes && this.container.attributes.artwork && this.container.attributes.artwork.url
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "hasPlaylistContainer", {
        get: function () {
          return this.container && "playlists" === this.container.type && this.container.attributes
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "info", {
        get: function () {
          return this.title + " - " + this.albumInfo
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "isCloudItem", {
        get: function () {
          return isLibraryType(this.id)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "isCloudUpload", {
        get: function () {
          return -1 === this._songId
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "isExplicitItem", {
        get: function () {
          return this.contentRating === ge
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "isLoading", {
        get: function () {
          return this.state === dt.loading
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "isPlayable", {
        get: function () {
          return "song" === this.type ? this._isPlayable && (this.playParams || this.previewURL) : this._isPlayable && !!this.attributes.assetUrl
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "isPlaying", {
        get: function () {
          return this.state === dt.playing
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "isPreparedToPlay", {
        get: function () {
          return "song" === this.type ? !!this._assets && !!this.keyURLs && !!this._songId : !!this.assetURL || this.playRawAssetURL && !!this.attributes.assetUrl
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "isrc", {
        get: function () {
          return this.attributes.isrc
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "isReady", {
        get: function () {
          return this.state === dt.ready
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "isRestricted", {
        get: function () {
          return this.state === dt.restricted
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "isUnavailable", {
        get: function () {
          return this.state === dt.unavailable
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "playbackData", {
        set: function (e) {
          var t;
          void 0 !== e && (this.previewURL && (e.previewURL = this.previewURL), Object.assign(this, Ge({
            "attributes.albumName": "metadata.playlistName",
            "attributes.artistName": "metadata.artistName",
            "attributes.artwork.url": "artworkURL",
            "attributes.composerName": "metadata.composerName",
            "attributes.contentRating": function () {
              if (1 === We(t, "metadata.explicit")) return ge
            },
            "attributes.discNumber": function () {
              return We(t, "metadata.discNumber") || 1
            },
            "attributes.durationInMillis": "metadata.duration",
            "attributes.genreNames": function () {
              return [We(t, "metadata.genre")]
            },
            "attributes.isrc": function () {
              var e = We(t, "metadata.xid");
              if (e) return e.replace(/^([^:]+):isrc:/, "$1")
            },
            "attributes.name": "metadata.itemName",
            "attributes.playParams.id": "metadata.itemId",
            "attributes.playParams.kind": "metadata.kind",
            "attributes.previews": function () {
              return [{
                url: We(t, "previewURL")
              }]
            },
            "attributes.releaseDate": "metadata.releaseDate",
            "attributes.trackNumber": "metadata.trackNumber",
            assetURL: "URL",
            cloudId: "metadata.cloud-id",
            id: function () {
              return "" + We(t, "metadata.itemId")
            },
            flavor: "flavor",
            type: "metadata.kind"
          }, t = e)), this.state = dt.ready)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "playbackDuration", {
        get: function () {
          return this.attributes.durationInMillis || this.attributes.durationInMilliseconds
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "playlistArtworkURL", {
        get: function () {
          return this.hasPlaylistContainer && this.hasContainerArtwork ? this.container.attributes.artwork.url : this.artworkURL
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "playlistName", {
        get: function () {
          return this.hasPlaylistContainer ? this.container.attributes.name : this.albumName
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "playParams", {
        get: function () {
          return this.attributes.playParams
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "playRawAssetURL", {
        get: function () {
          return this.isCloudUpload || "podcast-episodes" === this.type
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "previewURL", {
        get: function () {
          return We(this, "attributes.previews.0.url")
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "releaseDate", {
        get: function () {
          if (this._releaseDate) return this._releaseDate;
          if (this.attributes && (this.attributes.releaseDate || this.attributes.releaseDateTime)) {
            var e = this.attributes.releaseDate || this.attributes.releaseDateTime;
            return this._releaseDate = /^\d{4}-\d{1,2}-\d{1,2}/.test(e) ? new Date(e) : void 0, this._releaseDate
          }
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "songId", {
        get: function () {
          return this._songId && -1 !== this._songId ? this._songId : this.id
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "state", {
        get: function () {
          return this._state
        },
        set: function (e) {
          var t = {
            oldState: this._state,
            state: e
          };
          this._stateWillChange && this._stateWillChange(this), this.dispatchEvent(_t, t), this._state = e, this._stateDidChange && this._stateDidChange(this), this.dispatchEvent(bt, t)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "title", {
        get: function () {
          return this.attributes.name
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaItem.prototype, "trackNumber", {
        get: function () {
          return this.attributes.trackNumber
        },
        enumerable: !0,
        configurable: !0
      }), MediaItem.prototype.beginMonitoringStateDidChange = function (e) {
        this._stateDidChange = e
      }, MediaItem.prototype.beginMonitoringStateWillChange = function (e) {
        this._stateWillChange = e
      }, MediaItem.prototype.endMonitoringStateDidChange = function () {
        this._stateDidChange = void 0
      }, MediaItem.prototype.endMonitoringStateWillChange = function () {
        this._stateWillChange = void 0
      }, MediaItem.prototype.isEqual = function (e) {
        return this.id === e.id && this.type === e.type && this.attributes === e.attributes
      }, MediaItem.prototype.prepareToPlay = function (e, t, r) {
        return __awaiter(this, void 0, void 0, function () {
          var i, n, o, a, s, u, c, l;
          return __generator(this, function (d) {
            switch (d.label) {
              case 0:
                return e || t ? this.isPreparedToPlay ? [2] : (this.state = dt.loading, "podcast-episodes" === this.type ? (this.assetURL = this.attributes.assetUrl, [2]) : [4, this._handleStorefrontEquivalency(r)]) : [2, Promise.reject(new MKError(MKError.AUTHORIZATION_ERROR, "Unable to prepare media item for play."))];
              case 1:
                return d.sent(), i = this.playParams.id, n = new Headers({
                  Authorization: "Bearer " + e,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "X-Apple-Music-User-Token": "" + t
                }), o = {
                  salableAdamId: i
                }, this.isCloudItem && (o = (a = /^a\.(\d+)$/).test(this.id) ? {
                  subscriptionAdamId: parseInt(i.replace(a, "$1"), 10),
                  isLibrary: !0
                } : {
                  universalLibraryId: i,
                  isLibrary: !0
                }), [4, fetch(globalConfig.urls.play, {
                  method: "POST",
                  body: JSON.stringify(o),
                  headers: n
                })];
              case 2:
                return [4, d.sent().text()];
              case 3:
                if (s = d.sent(), !(u = JSON.parse(s)) || !u.songList) {
                  switch ((c = MKError.serverError(u)).errorCode) {
                    case MKError.CONTENT_RESTRICTED:
                      this.state = dt.restricted;
                      break;
                    case MKError.CONTENT_UNAVAILABLE:
                      this.state = dt.unavailable;
                      break;
                    default:
                      this.state = dt.error
                  }
                  return [2, Promise.reject(c)]
                }
                return l = u.songList[0], this._songId = l.songId, this._assets = l.assets, this.keyURLs = {
                  "hls-key-cert-url": l["hls-key-cert-url"],
                  "hls-key-server-url": l["hls-key-server-url"],
                  "widevine-cert-url": l["widevine-cert-url"]
                }, [2]
            }
          })
        })
      }, MediaItem.prototype.restrict = function () {
        this.isExplicitItem && (this.state = dt.restricted, this._isPlayable = !1, this.playParams && delete this.attributes.playParams)
      }, MediaItem.prototype._handleStorefrontEquivalency = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          var t, r;
          return __generator(this, function (i) {
            return e ? (this.attributes.equivalents ? (t = this.attributes.equivalents[e].equivalentPlayParams) && (this.attributes.playParams = t) : this.relationships && this.relationships.equivalents && this.relationships.equivalents.data && this.relationships.equivalents.data.length && (r = this.relationships.equivalents.data[0]).id !== this.id && (this._equivalent = r), [2]) : [2]
          })
        })
      }, MediaItem
    }(lt);

  function isDataRecord(e) {
    return e && void 0 !== e._attributes && "function" == typeof e.serialize
  }

  function isMediaItem(e) {
    return e && void 0 !== e.id
  }

  function isMediaAPIResource(e) {
    return e && void 0 !== e.id && void 0 !== e.type
  }
  var gt = Ke.queueItemsDidChange,
    Pt = Ke.queuePositionDidChange,
    Queue = function (e) {
      function Queue(t) {
        var r = e.call(this, [gt, Pt]) || this;
        if (r._itemIDs = [], r._unshuffledIDs = {}, r._items = [], r._isRestricted = !1, r._position = -1, !t) return r;
        r._items = r._descriptorToMediaItems(t);
        var i = parseInt("" + t.startPosition, 10);
        return isNaN(i) || (r._position = i), r._reindex(), r._itemIDs.forEach(function (e, t) {
          r._unshuffledIDs[e] = t
        }), r
      }
      return __extends(Queue, e), Object.defineProperty(Queue.prototype, "isEmpty", {
        get: function () {
          return 0 === this.length
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Queue.prototype, "isRestricted", {
        get: function () {
          return this._isRestricted
        },
        set: function (e) {
          this._isRestricted = e, this._isRestricted && this._items && (this._items = this._items.map(function (e) {
            return e.restrict(), e
          }))
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Queue.prototype, "items", {
        get: function () {
          return this._items
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Queue.prototype, "length", {
        get: function () {
          return this._items.length
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Queue.prototype, "nextPlayableItem", {
        get: function () {
          if (void 0 !== this.nextPlayableItemIndex) return this.item(this.nextPlayableItemIndex)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Queue.prototype, "nextPlayableItemIndex", {
        get: function () {
          if (void 0 === this._nextPlayableItemIndex)
            for (var e = this.position + 1; e < this.length;) {
              var t = this.item(e);
              if (t && t.isPlayable) {
                this._nextPlayableItemIndex = e;
                break
              }
              e++
            }
          return this._nextPlayableItemIndex
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Queue.prototype, "position", {
        get: function () {
          return this._position
        },
        set: function (e) {
          if (e !== this._position) {
            var t = {
              oldPosition: this._position,
              position: e
            };
            this._nextPlayableItemIndex = void 0, this._previousPlayableItemIndex = void 0, this._position = e, this.dispatchEvent(Pt, t)
          }
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Queue.prototype, "previousPlayableItem", {
        get: function () {
          if (void 0 !== this.previousPlayableItemIndex) return this.item(this.previousPlayableItemIndex)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Queue.prototype, "previousPlayableItemIndex", {
        get: function () {
          if (void 0 === this._previousPlayableItemIndex)
            for (var e = this.position - 1; e > -1;) {
              var t = this.item(e);
              if (t && t.isPlayable) {
                this._previousPlayableItemIndex = e;
                break
              }
              e--
            }
          return this._previousPlayableItemIndex
        },
        enumerable: !0,
        configurable: !0
      }), Queue.prototype.append = function (e) {
        var t, r, i = this._descriptorToMediaItems(e);
        (t = this._items).push.apply(t, i), (r = this._itemIDs).push.apply(r, i.map(function (e) {
          return e.id
        })), this.dispatchEvent(gt, this._items)
      }, Queue.prototype.indexForItem = function (e) {
        return (isMediaItem(e) ? this._items : this._itemIDs).indexOf(e)
      }, Queue.prototype.item = function (e) {
        return this._items && this._items[e]
      }, Queue.prototype.prepend = function (e, t) {
        var r, i;
        void 0 === t && (t = !1);
        var n = this._descriptorToMediaItems(e),
          o = (this.position < 0 ? 0 : this.position) + 1;
        t && (this._items.length = o, this._itemIDs.length = o), (r = this._items).splice.apply(r, [o, 0].concat(n)), (i = this._itemIDs).splice.apply(i, [o, 0].concat(n.map(function (e) {
          return e.id
        }))), this.dispatchEvent(gt, this._items)
      }, Queue.prototype.remove = function (e) {
        if (e === this.position) throw new MKError(MKError.INVALID_ARGUMENTS);
        this._items.splice(e, 1), this._itemIDs.splice(e, 1), this.dispatchEvent(gt, this._items)
      }, Queue.prototype.shuffle = function (e) {
        void 0 === e && (e = !0);
        for (var t = this.length; t--;) {
          var r = Math.floor(t * Math.random()),
            i = this._items[r];
          this._items[r] = this._items[t], this._items[t] = i
        }
        this._handleQueueReorder(e)
      }, Queue.prototype.unshuffle = function (e) {
        var t = this;
        void 0 === e && (e = !0);
        var r = [];
        this._items.forEach(function (e) {
          var i = t._unshuffledIDs[e.id];
          r[i] = e
        }), this._items = r, this._handleQueueReorder(e)
      }, Queue.prototype.requiresPlayActivity = function () {
        return this.items.some(function (e) {
          return mediaRequiresPlayActivity(e)
        })
      }, Queue.prototype._dataRecordToMediaItems = function (e) {
        var t = e.serialize().data;
        return this._resourceToMediaItem(t)
      }, Queue.prototype._descriptorToMediaItems = function (e) {
        var t = this,
          r = [],
          i = e.loaded || e;
        if (void 0 === i) return r;
        if (Array.isArray(i)) return isDataRecord(n = i[0]) ? i.forEach(function (e) {
          r.push.apply(r, t._dataRecordToMediaItems(e))
        }) : isMediaAPIResource(n) && i.forEach(function (e) {
          r.push.apply(r, t._resourceToMediaItem(e))
        }), r;
        if (function (e) {
            return e && e.items && Array.isArray(e.items)
          }(i)) {
          var n, o = i.items;
          return ! function (e) {
            return e && void 0 !== e.contentId && void 0 !== e.metadata && void 0 !== e.metadata.itemId && void 0 !== e.metadata.itemType
          }(n = o[0]) ? isMediaItem(n) && (r = o.map(function (e) {
            return new MediaItem(e)
          })) : r = o.map(function (e) {
            return new MediaItem(function (e) {
              var t = Ge({
                id: "metadata.itemId",
                type: "metadata.itemType",
                "attributes.contentRating": function () {
                  if (1 === We(e, "metadata.isExplicit")) return ge
                },
                "attributes.playParams": function () {
                  return 0 !== We(e, "metadata.isPlayable") && {
                    id: We(e, "metadata.itemId"),
                    kind: We(e, "metadata.itemType")
                  }
                },
                "container.id": "metadata.containerId",
                "container.name": "metadata.containerName",
                "container.type": "metadata.containerType"
              }, e);
              return Object.assign({
                attributes: {}
              }, t)
            }(e))
          }), r
        }
        return isDataRecord(i) ? r = this._dataRecordToMediaItems(i) : isMediaAPIResource(i) && (r = this._resourceToMediaItem(i)), r
      }, Queue.prototype._handleQueueReorder = function (e) {
        this._reindex(), e && this.dispatchEvent(gt, this._items)
      }, Queue.prototype._reindex = function () {
        this._items && (this._itemIDs = this._items.map(function (e) {
          return e.id
        }))
      }, Queue.prototype._resourceToMediaItem = function (e) {
        if (e.relationships && e.relationships.tracks && e.relationships.tracks.data) {
          var t, r = (void 0 === (n = e.relationships.tracks.data) && (n = []), 0 !== n.length && n.filter(function (e) {
            var t = e.attributes;
            return !!t && (t.workName || t.movementName || t.movementCount || t.movementNumber)
          }).length > 0);
          return "albums" === e.type || "library-albums" === e.type ? t = r ? oe.ALBUM_CLASSICAL : oe.ALBUM : "playlists" !== e.type && "library-playlists" !== e.type || (t = r ? oe.PLAYLIST_CLASSICAL : oe.PLAYLIST), t && (t = globalConfig.prefix ? globalConfig.prefix + ":" + t : t), e.relationships.tracks.data.map(function (r) {
            return new MediaItem({
              attributes: r.attributes,
              id: r.id,
              container: {
                attributes: e.attributes,
                id: e.id,
                type: e.type,
                name: t || void 0
              }
            })
          })
        }
        if ("songs" === e.type || "library-songs" === e.type) {
          var i = e.container && e.container.name ? e.container.name : oe.SONG;
          return [new MediaItem({
            relationships: e.relationships,
            attributes: e.attributes,
            id: e.id,
            container: {
              id: e.id,
              name: globalConfig.prefix ? globalConfig.prefix + ":" + i : i
            }
          })]
        }
        var n;
        return []
      }, Queue
    }(lt),
    St = function (e, t) {
      return (St = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
        })(e, t)
    };

  function __extends$1(e, t) {
    function __() {
      this.constructor = e
    }
    St(e, t), e.prototype = null === t ? Object.create(t) : (__.prototype = t.prototype, new __)
  }
  var kt = function () {
    return (kt = Object.assign || function (e) {
      for (var t, r = 1, i = arguments.length; r < i; r++)
        for (var n in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e
    }).apply(this, arguments)
  };

  function __awaiter$1(e, t, r, i) {
    return new(r || (r = Promise))(function (n, o) {
      function fulfilled(e) {
        try {
          step(i.next(e))
        } catch (e) {
          o(e)
        }
      }

      function rejected(e) {
        try {
          step(i.throw(e))
        } catch (e) {
          o(e)
        }
      }

      function step(e) {
        e.done ? n(e.value) : new r(function (t) {
          t(e.value)
        }).then(fulfilled, rejected)
      }
      step((i = i.apply(e, t || [])).next())
    })
  }

  function __generator$1(e, t) {
    var r, i, n, o, a = {
      label: 0,
      sent: function () {
        if (1 & n[0]) throw n[1];
        return n[1]
      },
      trys: [],
      ops: []
    };
    return o = {
      next: verb(0),
      throw: verb(1),
      return: verb(2)
    }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
      return this
    }), o;

    function verb(o) {
      return function (s) {
        return function (o) {
          if (r) throw new TypeError("Generator is already executing.");
          for (; a;) try {
            if (r = 1, i && (n = 2 & o[0] ? i.return : o[0] ? i.throw || ((n = i.return) && n.call(i), 0) : i.next) && !(n = n.call(i, o[1])).done) return n;
            switch (i = 0, n && (o = [2 & o[0], n.value]), o[0]) {
              case 0:
              case 1:
                n = o;
                break;
              case 4:
                return a.label++, {
                  value: o[1],
                  done: !1
                };
              case 5:
                a.label++, i = o[1], o = [0];
                continue;
              case 7:
                o = a.ops.pop(), a.trys.pop();
                continue;
              default:
                if (!(n = (n = a.trys).length > 0 && n[n.length - 1]) && (6 === o[0] || 2 === o[0])) {
                  a = 0;
                  continue
                }
                if (3 === o[0] && (!n || o[1] > n[0] && o[1] < n[3])) {
                  a.label = o[1];
                  break
                }
                if (6 === o[0] && a.label < n[1]) {
                  a.label = n[1], n = o;
                  break
                }
                if (n && a.label < n[2]) {
                  a.label = n[2], a.ops.push(o);
                  break
                }
                n[2] && a.ops.pop(), a.trys.pop();
                continue
            }
            o = t.call(e, a)
          } catch (e) {
            o = [6, e], i = 0
          } finally {
            r = n = 0
          }
          if (5 & o[0]) throw o[1];
          return {
            value: o[0] ? o[1] : void 0,
            done: !0
          }
        }([o, s])
      }
    }
  }
  var Et = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

  function unwrapExports$1(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
  }

  function createCommonjsModule$1(e, t) {
    return e(t = {
      exports: {}
    }, t.exports), t.exports
  }
  var Tt = createCommonjsModule$1(function (e, t) {
    function strRandomizer() {
      return Math.random().toString(16).substring(2)
    }

    function isNodeEnvironment() {
      return "undefined" != typeof process && null != process.versions && null != process.versions.node
    }

    function memoize(e) {
      return function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        for (var i = "", n = t.length; n--;) {
          var o = t[n];
          i += o === Object(o) ? JSON.stringify(o) : o, e._memoized || (e._memoized = {})
        }
        return i in e._memoized ? e._memoized[i] : e._memoized[i] = e.apply(void 0, t)
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.generateUUID = function () {
      for (var e = strRandomizer() + strRandomizer(); e.length < 16;) e += strRandomizer();
      return e.slice(0, 16)
    }, t.isLibraryType = memoize(function (e) {
      return /^(?:[a|i|l|p]{1}\.|pl\.u\-)[a-zA-Z0-9]+$/.test(e)
    }), t.isNodeEnvironment = isNodeEnvironment, t.atob = memoize(function (e) {
      return isNodeEnvironment() ? Buffer.from(e, "base64").toString("ascii") : window.atob(e)
    }), t.btoa = memoize(function (e) {
      return isNodeEnvironment() ? Buffer.from(e).toString("base64") : window.btoa(e)
    }), t.memoize = memoize, t.urlEncodeParameters = function (e) {
      var t = "";
      return e && Object.keys(e).map(function (r, i, n) {
        t += encodeURIComponent(r) + "=" + encodeURIComponent(e[r]), i < n.length - 1 && (t += "&")
      }), t
    }
  });
  unwrapExports$1(Tt);
  Tt.generateUUID, Tt.isLibraryType;
  var It = Tt.isNodeEnvironment,
    At = (Tt.atob, Tt.btoa, Tt.memoize, Tt.urlEncodeParameters, createCommonjsModule$1(function (e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var DeveloperToken = function () {
        function DeveloperToken(e) {
          if (this.token = e, !e || !/^[a-z0-9\-\_]{16,}\.[a-z0-9\-\_]{16,}\.[a-z0-9\-\_]{16,}/i.test(e)) throw new Error("Invalid token.");
          var t = e.split("."),
            r = t[0],
            i = t[1],
            n = this._decode(i),
            o = n.exp,
            a = n.iss;
          if (this.expiration = 1e3 * o, this.isExpired) throw new Error("Initialized with an expired token.");
          this.teamId = a;
          var s = this._decode(r).kid;
          this.keyId = s
        }
        return Object.defineProperty(DeveloperToken.prototype, "isExpired", {
          get: function () {
            return this.expiration < Date.now()
          },
          enumerable: !0,
          configurable: !0
        }), DeveloperToken.prototype._decode = function (e) {
          return JSON.parse(Tt.atob(e))
        }, DeveloperToken
      }();
      t.DeveloperToken = DeveloperToken
    }));
  unwrapExports$1(At);
  var Ct = At.DeveloperToken,
    Dt = createCommonjsModule$1(function (e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var Notifications = function () {
        function Notifications(e) {
          var t = this;
          void 0 === e && (e = []), this._registry = {}, e.forEach(function (e) {
            t._registry[e] = []
          })
        }
        return Notifications.prototype.addEventListener = function (e, t) {
          Array.isArray(this._registry[e]) && this._registry[e].push(t)
        }, Notifications.prototype.dispatchEvent = function (e, t) {
          Array.isArray(this._registry[e]) && this._registry[e].forEach(function (e) {
            return e(t)
          })
        }, Notifications.prototype.removeEventListener = function (e, t) {
          if (Array.isArray(this._registry[e])) {
            var r = this._registry[e].indexOf(t);
            this._registry[e].splice(r, 1)
          }
        }, Notifications
      }();
      t.Notifications = Notifications
    });
  unwrapExports$1(Dt);
  var Rt = Dt.Notifications,
    Ot = createCommonjsModule$1(function (e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var GenericStorage = function () {
        function GenericStorage() {
          this._data = {}
        }
        return GenericStorage.prototype.clear = function () {
          this._data = {}
        }, GenericStorage.prototype.getItem = function (e) {
          return this._data[e]
        }, GenericStorage.prototype.removeItem = function (e) {
          delete this._data[e]
        }, GenericStorage.prototype.setItem = function (e, t) {
          this._data[e] = t
        }, GenericStorage
      }();
      t.GenericStorage = GenericStorage, t.getCookie = function (e) {
        void 0 === e && (e = "");
        var t = document.cookie.match(new RegExp("(?:^|;\\s*)" + e + "=([^;]*)"));
        if (t) return t[1]
      }, t.setCookie = function (e, t, r, i, n) {
        void 0 === r && (r = ""), void 0 === i && (i = 14), void 0 === n && (n = window);
        var o = new Date,
          a = /\./.test(n.location.hostname) ? n.location.hostname : "";
        /^(?:[a-z\-]+\.)?(?:music|itunes)\.apple\.com$/i.test(a) && (a = "apple.com");
        var s = a.length > 0 ? "domain=" + a + "; " : "";
        o.setTime(o.getTime() + 24 * i * 60 * 60 * 1e3), n.document.cookie = e + "=" + t + "; expires=" + o.toUTCString() + "; " + s + "path=" + r
      }
    });
  unwrapExports$1(Ot);
  Ot.GenericStorage;
  var Mt, Lt = Ot.getCookie,
    Nt = Ot.setCookie;

  function buildQueryParams(e) {
    return void 0 === e && (e = {
      app: Mt.APP,
      p: Mt.P
    }), e.app || (e.app = Mt.APP), e.p || (e.p = Mt.P), Object.keys(e).map(function (t) {
      return encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
    }).join("&")
  }! function (e) {
    e.APP = "music", e.P = "subscribe"
  }(Mt || (Mt = {}));
  var jt = createCommonjsModule$1(function (e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.arrayBufferToString = Tt.memoize(function (e) {
      for (var t = new Uint16Array(e), r = t.length, i = "", n = 0; n < r; n++) i += String.fromCharCode(t[n]);
      return i
    }), t.base64ToUint8Array = Tt.memoize(function (e) {
      var r = Tt.atob(e);
      return t.stringToUint8Array(r)
    }), t.ensureArray = function (e) {
      return void 0 === e && (e = []), Array.isArray(e) ? e : [e]
    }, t.stringToUint8Array = Tt.memoize(function (e) {
      for (var t = e.length, r = new ArrayBuffer(t), i = new Uint8Array(r), n = 0; n < t; n++) i[n] = e.charCodeAt(n);
      return i
    }), t.stringToUint16Array = Tt.memoize(function (e) {
      for (var t = e.length, r = new ArrayBuffer(2 * t), i = new Uint16Array(r), n = 0; n < t; n++) i[n] = e.charCodeAt(n);
      return i
    }), t.uint8ArrayToBase64 = Tt.memoize(function (e) {
      for (var t, r, i, n, o, a, s, u = 0, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", l = ""; u < e.length;) n = (t = e[u++]) >> 2, o = (3 & t) << 4 | (r = u < e.length ? e[u++] : Number.NaN) >> 4, a = (15 & r) << 2 | (i = u < e.length ? e[u++] : Number.NaN) >> 6, s = 63 & i, isNaN(r) ? a = s = 64 : isNaN(i) && (s = 64), l += c.charAt(n) + c.charAt(o) + c.charAt(a) + c.charAt(s);
      return l
    })
  });
  unwrapExports$1(jt);
  jt.arrayBufferToString, jt.base64ToUint8Array, jt.ensureArray, jt.stringToUint8Array, jt.stringToUint16Array, jt.uint8ArrayToBase64;
  var Ut = createCommonjsModule$1(function (e, t) {
    var r, i = Et && Et.__awaiter || function (e, t, r, i) {
        return new(r || (r = Promise))(function (n, o) {
          function fulfilled(e) {
            try {
              step(i.next(e))
            } catch (e) {
              o(e)
            }
          }

          function rejected(e) {
            try {
              step(i.throw(e))
            } catch (e) {
              o(e)
            }
          }

          function step(e) {
            e.done ? n(e.value) : new r(function (t) {
              t(e.value)
            }).then(fulfilled, rejected)
          }
          step((i = i.apply(e, t || [])).next())
        })
      },
      n = Et && Et.__generator || function (e, t) {
        var r, i, n, o, a = {
          label: 0,
          sent: function () {
            if (1 & n[0]) throw n[1];
            return n[1]
          },
          trys: [],
          ops: []
        };
        return o = {
          next: verb(0),
          throw: verb(1),
          return: verb(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
          return this
        }), o;

        function verb(o) {
          return function (s) {
            return function (o) {
              if (r) throw new TypeError("Generator is already executing.");
              for (; a;) try {
                if (r = 1, i && (n = 2 & o[0] ? i.return : o[0] ? i.throw || ((n = i.return) && n.call(i), 0) : i.next) && !(n = n.call(i, o[1])).done) return n;
                switch (i = 0, n && (o = [2 & o[0], n.value]), o[0]) {
                  case 0:
                  case 1:
                    n = o;
                    break;
                  case 4:
                    return a.label++, {
                      value: o[1],
                      done: !1
                    };
                  case 5:
                    a.label++, i = o[1], o = [0];
                    continue;
                  case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                  default:
                    if (!(n = (n = a.trys).length > 0 && n[n.length - 1]) && (6 === o[0] || 2 === o[0])) {
                      a = 0;
                      continue
                    }
                    if (3 === o[0] && (!n || o[1] > n[0] && o[1] < n[3])) {
                      a.label = o[1];
                      break
                    }
                    if (6 === o[0] && a.label < n[1]) {
                      a.label = n[1], n = o;
                      break
                    }
                    if (n && a.label < n[2]) {
                      a.label = n[2], a.ops.push(o);
                      break
                    }
                    n[2] && a.ops.pop(), a.trys.pop();
                    continue
                }
                o = t.call(e, a)
              } catch (e) {
                o = [6, e], i = 0
              } finally {
                r = n = 0
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            }([o, s])
          }
        }
      };
    Object.defineProperty(t, "__esModule", {
        value: !0
      }),
      function (e) {
        e[e.ParseError = -32700] = "ParseError", e[e.InvalidRequest = -32600] = "InvalidRequest", e[e.MethodNotFound = -32601] = "MethodNotFound", e[e.InvalidParams = -32602] = "InvalidParams", e[e.InternalError = -32603] = "InternalError"
      }(r = t.RPCErrorCodes || (t.RPCErrorCodes = {}));
    var o = "*",
      jsonRpcVersion = "2.0",
      Dispatch = function () {
        function Dispatch(e = {}) {
          var self = this;
          this._registry = {};
          this._sequence = 0;
          this.handle = (e) => {
            if (!e.data) return;

            const validJsonRpc = e.data.jsonrpc === jsonRpcVersion;
            if (!validJsonRpc) return;

            const validOrigin = self.origin === o || self.origin === e.origin;
            if (!validOrigin) return;

            if (e.data.method && self.destination) {
              return self.handleRequest(e.data).then((e) => self.send(self.destination, e));
            }

            if (e.data.hasOwnProperty("result") || e.data.error) {
              return self.handleResponse(e.data);
            }
          };
          this.destination = e.destination;
          this.methods = e.methods || {};
          this.origin = e.origin || o;
          if (e.source) {
            this.source = e.source
          }
          // void 0 === e && (e = {}), this._registry = {}, this._sequence = 0, this.handle = function (e) {
          //   e.data && e.data.jsonrpc === jsonRpcVersion && ((self.origin !== o && self.origin !== e.origin) || (e.data.method && self.destination ? self.handleRequest(e.data).then(function (e) {
          //     self.send(self.destination, e)
          //   }) : (e.data.hasOwnProperty("result") || e.data.error) && self.handleResponse(e.data)))
          // }, this.destination = e.destination, this.methods = e.methods || {}, this.origin = e.origin || o, e.source && (this.source = e.source)
        }
        return Object.defineProperty(Dispatch.prototype, "source", {
          get: function () {
            return this._source
          },
          set: function (e) {
            if (!e && this._source) return this._source.removeEventListener("message", this.handle), void(this._source = void 0);
            e.addEventListener("message", this.handle), this._source = e
          },
          enumerable: !0,
          configurable: !0
        }), Dispatch.prototype.apply = function (e, t) {
          var r = this;
          if (!this.destination) throw new Error("No destination");
          var i = this._sequence++,
            n = new Promise(function (res, rej) {
              r._registry[i] = {
                resolve: res,
                reject: rej
              }
            });
          return this.send(this.destination, {
            jsonrpc: jsonRpcVersion,
            id: i,
            method: e,
            params: t
          }), n
        }, Dispatch.prototype.call = function (e) {
          for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
          return this.apply(e, t)
        }, Dispatch.prototype.handleRequest = function (e) {
          return i(this, void 0, void 0, function () {
            var t, i, o, s;
            return n(this, function (n) {
              switch (n.label) {
                case 0:
                  if (t = {
                      jsonrpc: jsonRpcVersion,
                      id: e.id
                    }, !(i = this.methods[e.method])) return [2, Object.assign(t, {
                    error: {
                      code: r.MethodNotFound,
                      message: "Method not found"
                    }
                  })];
                  n.label = 1;
                case 1:
                  return n.trys.push([1, 3, , 4]), [4, i.apply(null, jt.ensureArray(e.params))];
                case 2:
                  return o = n.sent(), [2, Object.assign(t, {
                    result: o
                  })];
                case 3:
                  return s = n.sent(), [2, Object.assign(t, {
                    error: {
                      code: s.code || r.InternalError,
                      message: s.message
                    }
                  })];
                case 4:
                  return [2]
              }
            })
          })
        }, Dispatch.prototype.handleResponse = function (e) {
          var t = this._registry[e.id];
          delete this._registry[e.id], t && (e.error ? t.reject(Object.assign(Error(), e.error)) : t.resolve(e.result))
        }, Dispatch.prototype.send = function (targetWindow, message) {
          targetWindow.postMessage(message, targetWindow.window === targetWindow ? this.origin : void 0)
        }, Dispatch
      }();
    t.Dispatch = Dispatch
  });
  unwrapExports$1(Ut);
  Ut.RPCErrorCodes;
  var xt, Bt = Ut.Dispatch;

  function validateToken(e) {
    if ("string" != typeof e) return !1;
    var t = e.match(/[a-zA-Z0-9=\/+]{32,}==$/);
    return !(!t || !t.length) && t.length > 0
  }! function (e) {
    e[e.UNAVAILABLE = -1] = "UNAVAILABLE", e[e.NOT_DETERMINED = 0] = "NOT_DETERMINED", e[e.DENIED = 1] = "DENIED", e[e.RESTRICTED = 2] = "RESTRICTED", e[e.AUTHORIZED = 3] = "AUTHORIZED"
  }(xt || (xt = {}));
  var zt, Kt = "https://authorize.music.apple.com",
    Vt = /^https?:\/\/(.+\.)*(apple\.com|apps\.mzstatic\.com)(\/[\w\d]+)*$/;
  ! function (e) {
    e[e.AUTHORIZE = 0] = "AUTHORIZE", e[e.SUBSCRIBE = 1] = "SUBSCRIBE"
  }(zt || (zt = {}));
  var qt, ServiceSetupView = function () {
    function ServiceSetupView(e, t) {
      void 0 === t && (t = {}), this.developerToken = e, this.authenticateMethod = "GET", this.target = "apple-music-service-view", this.deeplinkParameters = t && t.deeplinkParameters || {}, this.iconURL = t && t.iconURL, this.authenticateMethod = t && t.authenticateMethod || "GET", this.isServiceView && window.opener !== window && (this.dispatch = new Bt({
        destination: window.opener,
        origin: "*",
        source: window
      }))
    }
    return Object.defineProperty(ServiceSetupView.prototype, "isServiceView", {
      get: function () {
        return window && window.name === this.target || !1
      },
      enumerable: !0,
      configurable: !0
    }), ServiceSetupView.prototype.focus = function () {
      this._window && window.focus && this._window.focus()
    }, ServiceSetupView.prototype.load = function (e) {
      return void 0 === e && (e = {
        action: zt.AUTHORIZE
      }), __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (t) {
          return e.action === zt.SUBSCRIBE ? [2, this._subscribeAction(e.parameters)] : [2, this._authorizeAction(e.parameters)]
        })
      })
    }, ServiceSetupView.prototype.present = function (e, t) {
      void 0 === e && (e = "");
      var r = this._calculateClientDimensions(),
        i = r.height,
        n = r.left,
        o = r.top,
        a = r.width,
        s = {
          height: 650,
          menubar: "no",
          resizable: "no",
          scrollbars: "no",
          status: "no",
          toolbar: "no",
          width: 650
        },
        u = kt({}, s, {
          left: a / 2 - s.width / 2 + n,
          top: i / 2 - s.height / 2 + o
        }, t),
        c = Object.keys(u).map(function (e) {
          return e + "=" + u[e]
        }).join(",");
      return /trident|msie/i.test(navigator.userAgent) ? (this._window = window.open(window.location.href, this.target, c) || void 0, this._window.location.href = e) : this._window = window.open(e, this.target, c) || void 0, /\bedge\b/i.test(navigator.userAgent) && (this._window.opener = self), this.focus(), this._window
    }, ServiceSetupView.prototype._authorizeAction = function (e) {
      return void 0 === e && (e = {}), __awaiter$1(this, void 0, void 0, function () {
        var t, r, i, n = this;
        return __generator$1(this, function (o) {
          return i = window.location && window.location.href || "", "GET" === this.authenticateMethod ? r = Kt + "/woa?" + buildQueryParams({
            a: btoa(this._thirdPartyInfo()),
            referrer: i
          }) : (t = this._buildFormElement("https://buy.itunes.apple.com/commerce/account/authenticateMusicKitRequest"), document.body.appendChild(t)), [2, new Promise(function (res, rej) {
            var a = n.present(r);
            n.dispatch = new Bt({
              methods: {
                authorize: function (e, t, r) {
                  validateToken(e) ? res({
                    restricted: t && "1" === t,
                    userToken: e,
                    cid: r
                  }) : rej(xt.NOT_DETERMINED)
                },
                close: function () {},
                decline: function () {
                  rej(xt.DENIED)
                },
                switchUserId: function () {
                  rej(xt.NOT_DETERMINED)
                },
                thirdPartyInfo: function () {
                  return n._thirdPartyInfo(n.developerToken, Object.assign(n.deeplinkParameters, e))
                },
                unavailable: function () {
                  rej(xt.UNAVAILABLE)
                }
              },
              origin: Kt,
              source: window,
              destination: a
            }), t && t.submit()
          })]
        })
      })
    }, ServiceSetupView.prototype._buildFormElement = function (e, t, r) {
      void 0 === t && (t = this.target), void 0 === r && (r = this.developerToken);
      var i = document.createElement("form");
      i.setAttribute("method", "post"), i.setAttribute("action", e), i.setAttribute("target", t), i.style.display = "none";
      var n = document.createElement("input");
      n.setAttribute("name", "jwtToken"), n.setAttribute("value", r), i.appendChild(n);
      var o = document.createElement("input");
      o.setAttribute("name", "isWebPlayer"), o.setAttribute("value", "true"), i.appendChild(o);
      var a = document.createElement("input");
      return a.setAttribute("name", "LogoURL"), a.setAttribute("value", ""), i.appendChild(a), i
    }, ServiceSetupView.prototype._calculateClientDimensions = function (e) {
      return void 0 === e && (e = window), {
        height: e.innerHeight ? e.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
        left: e.screenLeft ? e.screenLeft : screen.availLeft || screen.left,
        top: e.screenTop ? e.screenTop : screen.availTop || screen.top,
        width: e.innerWidth ? e.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
      }
    }, ServiceSetupView.prototype._subscribeAction = function (e) {
      return void 0 === e && (e = {}), __awaiter$1(this, void 0, void 0, function () {
        var t = this;
        return __generator$1(this, function (r) {
          return Object.assign(e, this.deeplinkParameters), [2, new Promise(function (res, rej) {
            var n = "https://authorize.music.apple.com/upsell?" + buildQueryParams(e);
            t.present(n), window.addEventListener("message", function (e) {
              var t = e.data,
                n = e.origin,
                o = (e.source, "string" == typeof t ? JSON.parse(t) : t),
                a = (o.closeWindow, o.launchClient);
              n && !Vt.test(n) || (a ? 0 === a.supported ? rej("Unable to subscribe on this platform.") : res(a) : rej("Subscribe action error."))
            })
          })]
        })
      })
    }, ServiceSetupView.prototype._thirdPartyInfo = function (e, t) {
      void 0 === e && (e = this.developerToken);
      var r = this.iconURL,
        i = window.location.host || document.referrer,
        n = [].slice.call(document.querySelectorAll('link[rel="apple-music-app-icon"]')).concat([].slice.call(document.querySelectorAll('link[rel="apple-touch-icon-precomposed"]')), [].slice.call(document.querySelectorAll('link[rel="apple-touch-icon"]')));
      if (n && n[0] && n[0].href) {
        var o = n.find(function (e) {
          return !!e.sizes && "120x120" === e.sizes.value
        });
        r = o && o.href ? o.href : n[0].href
      }
      return JSON.stringify({
        thirdPartyIconURL: r,
        thirdPartyName: i,
        thirdPartyParameters: t,
        thirdPartyToken: e
      })
    }, ServiceSetupView
  }();
  ! function (e) {
    e.ID = "us", e.LANGUAGE_TAG = "en-gb"
  }(qt || (qt = {}));
  var Ht, Storefront = function () {
    function Storefront(e, t, r) {
      this.id = e, this.attributes = t, this.type = "storefronts", this.href = r || "/v1/" + this.type + "/" + e
    }
    return Storefront.inferFromLanguages = function (e, t) {
      return void 0 === t && (t = navigator.languages || [navigator.language || navigator.userLanguage]), __awaiter$1(this, void 0, void 0, function () {
        var r, i, n, o, a, s;
        return __generator$1(this, function (u) {
          switch (u.label) {
            case 0:
              return [4, function (e, t) {
                return void 0 === t && (t = "https://api.music.apple.com/v1"), __awaiter$1(this, void 0, void 0, function () {
                  var r, i;
                  return __generator$1(this, function (n) {
                    switch (n.label) {
                      case 0:
                        return r = new Headers({
                          Authorization: "Bearer " + e
                        }), [4, fetch(t + "/storefronts", {
                          headers: r
                        })];
                      case 1:
                        return [4, n.sent().json()];
                      case 2:
                        return (i = n.sent()).errors ? [2, Promise.reject(i.errors)] : [2, i.data]
                    }
                  })
                })
              }(e)];
            case 1:
              return r = u.sent(), i = r.map(function (e) {
                return e.id
              }), n = t[0] || "en-US", (o = n.toLowerCase().split(/-|_/))[0], a = o[1], s = i.includes(a) ? a : "us", [2, r.find(function (e) {
                return e.id === s
              })]
          }
        })
      })
    }, Storefront
  }();
  ! function (e) {
    e.authorizationStatusDidChange = "authorizationStatusDidChange", e.authorizationStatusWillChange = "authorizationStatusWillChange", e.eligibleForSubscribeView = "eligibleForSubscribeView", e.storefrontCountryCodeDidChange = "storefrontCountryCodeDidChange", e.storefrontIdentifierDidChange = "storefrontIdentifierDidChange", e.userTokenDidChange = "userTokenDidChange"
  }(Ht || (Ht = {}));
  ! function (e) {
    function StoreKit(t, r) {
      var i = e.call(this, [Ht.authorizationStatusDidChange, Ht.authorizationStatusWillChange, Ht.eligibleForSubscribeView, Ht.storefrontCountryCodeDidChange, Ht.userTokenDidChange]) || this;
      return i.developerToken = t, i.apiBase = "https://api.music.apple.com/v1", i.persist = "localstorage", i.playBase = "https://play.itunes.apple.com/WebObjects/MZPlay.woa/wa", i.prefix = "music", i.storage = window.localStorage, i._authorizationStatus = xt.NOT_DETERMINED, i._dispatchedSubscribeView = !1, r && (r.deeplink && (i.deeplinkParameters = r.deeplink), r.persist && (i.persist = r.persist), r.prefix && (i.prefix = r.prefix)), i._developerToken = new Ct(t), i._serviceSetupView = new ServiceSetupView(t, {
        authenticateMethod: r && r.authenticateMethod,
        iconURL: r && r.iconURL,
        deeplinkParameters: i.deeplinkParameters
      }), i.storagePrefix = (i.prefix + "." + i._developerToken.teamId).toLocaleLowerCase(), i.userTokenIsValid && (i._restrictedEnabled = i.restrictedEnabled, i._authorizationStatus = i.restrictedEnabled ? xt.RESTRICTED : xt.AUTHORIZED), i._storefrontCountryCode = i.storefrontCountryCode, It() || i._processLocationHash(window.location.hash), i
    }
    __extends$1(StoreKit, e), Object.defineProperty(StoreKit.prototype, "authorizationStatus", {
      get: function () {
        return this._authorizationStatus
      },
      set: function (e) {
        this.dispatchEvent(Ht.authorizationStatusWillChange, {
          authorizationStatus: this._authorizationStatus,
          newAuthorizationStatus: e
        }), this._authorizationStatus = e, this.dispatchEvent(Ht.authorizationStatusDidChange, {
          authorizationStatus: e
        })
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(StoreKit.prototype, "cid", {
      get: function () {
        if (!this._cid) {
          var e = this._getStorageItem(this.storagePrefix + ".c");
          this._cid = e || void 0
        }
        return this._cid
      },
      set: function (e) {
        e ? this._setStorageItem(this.storagePrefix + ".c", e) : this._removeStorageItem(this.storagePrefix + ".c"), this._cid = e
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(StoreKit.prototype, "eligibleForSubscribeView", {
      get: function () {
        return !this.hasAuthorized && !this._dispatchedSubscribeView
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(StoreKit.prototype, "hasAuthorized", {
      get: function () {
        return this.authorizationStatus > xt.DENIED
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(StoreKit.prototype, "restrictedEnabled", {
      get: function () {
        if (this.userToken && "boolean" != typeof this._restrictedEnabled) {
          var e = this._getStorageItem(this.userToken + ".r");
          e ? this._restrictedEnabled = "0" !== e : this._storefrontCountryCode && (this._restrictedEnabled = -1 !== ["br", "ch", "gt", "hu", "id", "in", "it", "kr", "la", "lt", "my", "ru", "sg", "tr"].indexOf(this._storefrontCountryCode) || void 0)
        }
        return this._restrictedEnabled
      },
      set: function (e) {
        this.userToken && void 0 !== e && this._setStorageItem(this.userToken + ".r", e ? "1" : "0"), this._restrictedEnabled = e, e && (this.authorizationStatus = xt.RESTRICTED)
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(StoreKit.prototype, "storefrontCountryCode", {
      get: function () {
        if (!this._storefrontCountryCode) {
          var e = this._getStorageItem(this.userToken + ".s");
          this._storefrontCountryCode = e || qt.ID
        }
        return this._storefrontCountryCode
      },
      set: function (e) {
        e && this.userToken ? this._setStorageItem(this.userToken + ".s", e) : this._removeStorageItem(this.userToken + ".s"), this._storefrontCountryCode = e, this.dispatchEvent(Ht.storefrontCountryCodeDidChange, {
          storefrontCountryCode: e
        })
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(StoreKit.prototype, "storefrontIdentifier", {
      get: function () {
        return this._storefrontIdentifier
      },
      set: function (e) {
        this._storefrontIdentifier = e, this.dispatchEvent(Ht.storefrontIdentifierDidChange, {
          storefrontIdentifier: e
        })
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(StoreKit.prototype, "userToken", {
      get: function () {
        if (!this._userToken) {
          var e = this._getStorageItem(this.storagePrefix + ".u");
          this._userToken = e || void 0
        }
        return this._userToken
      },
      set: function (e) {
        e && validateToken(e) ? (this.authorizationStatus = this.restrictedEnabled ? xt.RESTRICTED : xt.AUTHORIZED, this._setStorageItem(this.storagePrefix + ".u", e)) : (this.authorizationStatus = xt.NOT_DETERMINED, this._removeStorageItem(this.storagePrefix + ".u")), this._userToken = e, this.dispatchEvent(Ht.userTokenDidChange, {
          userToken: e
        })
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(StoreKit.prototype, "userTokenIsValid", {
      get: function () {
        return validateToken(this.userToken)
      },
      enumerable: !0,
      configurable: !0
    }), StoreKit.prototype.deeplinkURL = function (e) {
      return void 0 === e && (e = {}), "https://finance-app.itunes.apple.com/deeplink?" + buildQueryParams(e = Object.assign(this.deeplinkParameters || {}, e))
    }, StoreKit.prototype.itunesDeeplinkURL = function (e) {
      return void 0 === e && (e = {
        p: "browse"
      }), "https://itunes.apple.com/deeplink?" + buildQueryParams(e = Object.assign(this.deeplinkParameters || {}, e))
    }, StoreKit.prototype.renewUserToken = function () {
      return __awaiter$1(this, void 0, void 0, function () {
        var e, t, r;
        return __generator$1(this, function (i) {
          switch (i.label) {
            case 0:
              return this.userToken ? (e = new Headers({
                Authorization: "Bearer " + this.developerToken,
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Apple-Music-User-Token": "" + this.userToken
              }), [4, fetch(this.playBase + "/renewMusicToken", {
                method: "POST",
                headers: e
              })]) : [2, this.requestUserToken()];
            case 1:
              return 401 !== (t = i.sent()).status ? [3, 3] : [4, this.revokeUserToken()];
            case 2:
              return i.sent(), [2, Promise.reject(new Error("Renew token"))];
            case 3:
              return [4, t.json()];
            case 4:
              return (r = i.sent())["music-token"] && (this.userToken = r["music-token"]), [2, this.userToken]
          }
        })
      })
    }, StoreKit.prototype.requestStorefrontCountryCode = function () {
      return __awaiter$1(this, void 0, void 0, function () {
        var e, t, r, i;
        return __generator$1(this, function (n) {
          switch (n.label) {
            case 0:
              return this.authorizationStatus <= xt.DENIED ? [2, Promise.reject("Not authorized: " + this.authorizationStatus)] : (e = new Headers({
                Authorization: "Bearer " + this.developerToken,
                "Music-User-Token": this.userToken
              }), [4, fetch(this.apiBase + "/me/storefront", {
                headers: e
              })]);
            case 1:
              return (t = n.sent()).ok ? [4, t.json()] : (this._reset(), [2, Promise.reject("Storefront Country Code error.")]);
            case 2:
              return (r = n.sent()).errors ? [2, Promise.reject(r.errors)] : (i = r.data[0]) && i.id ? (this.storefrontCountryCode = i.id, [2, this.storefrontCountryCode]) : [2, Promise.reject("Storefront Country Code error.")]
          }
        })
      })
    }, StoreKit.prototype.requestStorefrontIdentifier = function () {
      return __awaiter$1(this, void 0, void 0, function () {
        var e;
        return __generator$1(this, function (t) {
          switch (t.label) {
            case 0:
              return this.storefrontIdentifier ? [3, 2] : [4, Storefront.inferFromLanguages(this.developerToken)];
            case 1:
              e = t.sent(), this.storefrontIdentifier = e.id, t.label = 2;
            case 2:
              return [2, this.storefrontIdentifier]
          }
        })
      })
      // TODO: 2) This gets user token or opens the window for authorization
    }, StoreKit.prototype.requestUserToken = function () {
      return __awaiter$1(this, void 0, void 0, function () {
        var e, t;
        return __generator$1(this, function (r) {
          switch (r.label) {
            case 0:
              if (this._serviceSetupView.isServiceView) return [2, this.userToken];
              r.label = 1;
            case 1:
              // TODO: This opens the window for authorization
              return r.trys.push([1, 3, , 4]), [4, this._serviceSetupView.load({
                action: zt.AUTHORIZE
              })];
            case 2:
              return e = r.sent(), this.cid = e.cid, this.userToken = e.userToken, this.restrictedEnabled = e.restricted, [3, 4];
            case 3:
              return t = r.sent(), this._reset(), this.authorizationStatus = t, [2, Promise.reject(t)];
            case 4:
              return [2, this.userToken]
          }
        })
      })
    }, StoreKit.prototype.revokeUserToken = function () {
      return __awaiter$1(this, void 0, void 0, function () {
        return __generator$1(this, function (e) {
          switch (e.label) {
            case 0:
              return e.trys.push([0, 2, , 3]), [4, this._webPlayerLogout()];
            case 1:
            case 2:
              return e.sent(), [3, 3];
            case 3:
              return this.dispatchEvent(Ht.authorizationStatusWillChange, {
                authorizationStatus: this.authorizationStatus,
                newAuthorizationStatus: xt.NOT_DETERMINED
              }), this._reset(), this.dispatchEvent(Ht.authorizationStatusDidChange, {
                authorizationStatus: this.authorizationStatus
              }), this.dispatchEvent(Ht.userTokenDidChange, {
                userToken: this._userToken
              }), [2]
          }
        })
      })
    }, StoreKit.prototype.presentSubscribeView = function (e) {
      return void 0 === e && (e = !0), __awaiter$1(this, void 0, void 0, function () {
        var t;
        return __generator$1(this, function (r) {
          switch (r.label) {
            case 0:
              if (this._serviceSetupView.isServiceView || !this.eligibleForSubscribeView) return [2];
              if (!e) return this.dispatchEvent(Ht.eligibleForSubscribeView), this._dispatchedSubscribeView = !0, [2];
              r.label = 1;
            case 1:
              return r.trys.push([1, 3, , 4]), [4, this._serviceSetupView.load({
                action: zt.SUBSCRIBE
              })];
            case 2:
              return t = r.sent(), this._dispatchedSubscribeView = !0, [2, t];
            case 3:
              return r.sent(), [2, this.revokeUserToken()];
            case 4:
              return [2]
          }
        })
      })
    }, StoreKit.prototype.me = function () {
      return __awaiter$1(this, void 0, void 0, function () {
        var e, t, r, i;
        return __generator$1(this, function (n) {
          switch (n.label) {
            case 0:
              return this.authorizationStatus <= xt.DENIED ? [2, Promise.reject("Not authorized: " + this.authorizationStatus)] : (e = new Headers({
                Authorization: "Bearer " + this.developerToken,
                "Music-User-Token": this.userToken
              }), [4, fetch(this.apiBase + "/me/account?meta=subscription", {
                headers: e
              })]);
            case 1:
              return (t = n.sent()).ok ? [4, t.json()] : (this._reset(), [2, Promise.reject("Account error.")]);
            case 2:
              return (r = n.sent()).errors ? [2, Promise.reject(r.errors)] : (i = r.meta) && i.subscription ? (this.storefrontCountryCode = i.subscription.storefront, [2, i.subscription]) : [2, Promise.reject("Account error.")]
          }
        })
      })
    }, StoreKit.prototype._getStorageItem = function (e) {
      if (e) return "cookie" === this.persist ? Lt(btoa(e)) : "localstorage" === this.persist ? this.storage.getItem(e) : void 0
    }, StoreKit.prototype._processLocationHash = function (e) {
      var t = /^\#([a-zA-Z0-9+\/]{200,}={0,2})$/;
      if (t.test(e)) {
        var r = e.replace(t, "$1");
        try {
          var i = JSON.parse(atob(r)),
            n = i.itre,
            o = i.musicUserToken,
            a = i.cid;
          this.restrictedEnabled = n && "1" === n, this.userToken = o, this.cid = a
        } catch (e) {}
        history.replaceState(null, document.title, " ")
      }
    }, StoreKit.prototype._removeStorageItem = function (e) {
      return "cookie" === this.persist ? Nt(btoa(e), "", "/", 0) : "localstorage" === this.persist ? this.storage.removeItem(e) : void 0
    }, StoreKit.prototype._reset = function (e) {
      void 0 === e && (e = xt.NOT_DETERMINED), this._authorizationStatus = e, this._cid = void 0, this._dispatchedSubscribeView = !1, this._restrictedEnabled = void 0, this._storefrontCountryCode = void 0, this._removeStorageItem(this.storagePrefix + ".c"), this._removeStorageItem(this._userToken + ".r"), this._removeStorageItem(this.storagePrefix + ".u"), this._removeStorageItem(this._userToken + ".s"), this._userToken = void 0
    }, StoreKit.prototype._setStorageItem = function (e, t) {
      return "cookie" === this.persist ? Nt(btoa(e), t, "/", 180) : "localstorage" === this.persist ? this.storage.setItem(e, t) : void 0
    }, StoreKit.prototype._webPlayerLogout = function () {
      return __awaiter$1(this, void 0, void 0, function () {
        var e, t;
        return __generator$1(this, function (r) {
          switch (r.label) {
            case 0:
              return e = new Headers({
                Authorization: "Bearer " + this.developerToken,
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Apple-Music-User-Token": "" + this.userToken
              }), [4, fetch(this.playBase + "/webPlayerLogout", {
                method: "POST",
                headers: e
              })];
            case 1:
              return (t = r.sent()).ok ? [2, t.json()] : [2, Promise.reject(t.status)]
          }
        })
      })
    }
  }(Rt);
  var Buffer = function () {
      function Buffer(e) {
        var t = e.mediaSource,
          r = e.manifest,
          i = e.currentTime,
          n = e.duration;
        this._currentBufferIndex = 0, this.isBufferActionRunning = !1, this.timeToTrim = 10, this.mediaSource = t, globalConfig.logger.trace("mediasource", t), this.sourceBuffer = t.addSourceBuffer(Pe), globalConfig.logger.trace("sourcebuffer", this.sourceBuffer), this.manifest = r, this._currentTime = i || 0, this.duration = n, this.updateEndHandler = this.dequeueBufferAction.bind(this), this.bufferActionsQueue = [], this.sourceBuffer.addEventListener("updateend", this.updateEndHandler), this.addSegment(0)
      }
      return Object.defineProperty(Buffer.prototype, "currentTime", {
        get: function () {
          return this._currentTime
        },
        set: function (e) {
          if (this._currentTime !== e) {
            this._currentTime = e;
            var t = this.isOverBufferLimit,
              r = this.timeToTrim,
              i = e > this.timeToTrim;
            t && i && (this.removeToTime(r), this.addSegment(this.currentBufferIndex + 1), this.timeToTrim += 10)
          }
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Buffer.prototype, "segments", {
        get: function () {
          return this.manifest.segments || []
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Buffer.prototype, "currentBufferIndex", {
        get: function () {
          return this._currentBufferIndex
        },
        set: function (e) {
          var t = this.segments,
            r = this.mediaSource;
          e === t.length - 1 ? this.addBufferAction(r.endOfStream.bind(r)) : this.addSegment(e + 1), this._currentBufferIndex = e
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Buffer.prototype, "isBufferUpdating", {
        get: function () {
          return this.isBufferActionRunning || this.sourceBuffer.updating
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Buffer.prototype, "startBufferedTime", {
        get: function () {
          return 0 === this.sourceBuffer.buffered.length ? 0 : this.sourceBuffer.buffered.start(0)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Buffer.prototype, "endBufferedTime", {
        get: function () {
          return 0 === this.sourceBuffer.buffered.length ? 0 : this.sourceBuffer.buffered.end(0)
        },
        enumerable: !0,
        configurable: !0
      }), Buffer.prototype.waitForSeekToLoad = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          var t = this;
          return __generator(this, function (r) {
            return [2, new Promise(function (res) {
              t.addBufferAction(t._checkSeekFinished(e, res))
            })]
          })
        })
      }, Buffer.prototype._checkSeekFinished = function (e, t) {
        var r = this;
        return function () {
          if (e > r.startBufferedTime && e < r.endBufferedTime) return t();
          r.addBufferAction(r._checkSeekFinished(e, t))
        }
      }, Buffer.prototype.seek = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          var t, r, i, n, o, a, s;
          return __generator(this, function (u) {
            switch (u.label) {
              case 0:
                return r = (t = this).startBufferedTime, i = t.endBufferedTime, n = t.duration, o = t.segments, t.mediaSource, t.sourceBuffer, r <= e && i >= e ? [2] : e > n ? [2] : (this.removeToTime(i), this.timeToTrim = 10 * Math.floor(e / 10), a = e / n < .05 ? e / n : e / n - .05, s = Math.floor(o.length * a), this.addSegment(s), [4, this.waitForSeekToLoad(e)]);
              case 1:
                return u.sent(), [2]
            }
          })
        })
      }, Buffer.prototype.remove = function () {
        this.sourceBuffer.removeEventListener("updateend", this.updateEndHandler);
        try {
          this.mediaSource.removeSourceBuffer(this.sourceBuffer)
        } catch (e) {
          return
        }
      }, Buffer.prototype.dequeueBufferAction = function () {
        return __awaiter(this, void 0, void 0, function () {
          var e, t, r;
          return __generator(this, function (i) {
            switch (i.label) {
              case 0:
                return (e = this).sourceBuffer, t = e.bufferActionsQueue, this.isBufferUpdating ? [2] : (r = t.shift()) ? (this.isBufferActionRunning = !0, [4, r()]) : [3, 2];
              case 1:
                i.sent(), this.isBufferActionRunning = !1, this.isBufferUpdating || this.dequeueBufferAction(), i.label = 2;
              case 2:
                return [2]
            }
          })
        })
      }, Buffer.prototype.addBufferAction = function (e) {
        this.bufferActionsQueue.push(e), this.isBufferUpdating || this.dequeueBufferAction()
      }, Buffer.prototype.addSegment = function (e) {
        var t = this;
        this.addBufferAction(function () {
          return new Promise(function (res) {
            var i = t,
              n = i.segments,
              o = (i.mediaSource, i.endBufferedTime, n[e]);
            o && o.load().then(function (i) {
              try {
                t.sourceBuffer.appendBuffer(i), t.currentBufferIndex = e, t.isOverBufferLimit = !1
              } catch (e) {
                "QuotaExceededError" === e.name && (t.isOverBufferLimit = !0)
              }
              res()
            })
          })
        })
      }, Buffer.prototype.removeToTime = function (e) {
        var t = this;
        this.addBufferAction(function () {
          return t.sourceBuffer.remove(0, e), new Promise(function (res) {
            return res()
          })
        })
      }, Buffer
    }(),
    Yt = /^#EXT-X-KEY:[^\n]+URI="([^"]+)"/im,
    Qt = /^#EXT-X-BYTERANGE:([^\n]+)\n/gim,
    $t = /^#EXT-X-MAP:([^\n]+)\n/im;
  var Zt, Xt, Jt, er, Manifest = function () {
      function Manifest(e, t) {
        this._downlink = 0, this._data = e, this._url = t
      }
      return Manifest.load = function (e, t) {
        return void 0 === t && (t = !0), __awaiter(this, void 0, void 0, function () {
          var r, i, n, o;
          return __generator(this, function (a) {
            switch (a.label) {
              case 0:
                return (i = !!window.sessionStorage && t) && (r = window.sessionStorage.getItem(e)) ? [2, Promise.resolve(new this(r, e))] : (n = (new Date).getTime(), [4, fetch(e)]);
              case 1:
                return [4, a.sent().text()];
              case 2:
                return r = a.sent(), (o = new this(r, e)).downlink = function (e, t) {
                  return 8 * t.length / (((new Date).getTime() - e) / 1e3) / 1024
                }(n, r), i && window.sessionStorage.setItem(e, r), [2, Promise.resolve(o)]
            }
          })
        })
      }, Object.defineProperty(Manifest.prototype, "downlink", {
        get: function () {
          return this._downlink
        },
        set: function (e) {
          this._downlink = e
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Manifest.prototype, "segments", {
        get: function () {
          if (!this._byteRanges) {
            var e = function (e) {
                if (e && $t.test(e)) return e.match($t)[1].split(",").reduce(function (e, t) {
                  var r = t.split("="),
                    i = r[0],
                    n = r[1];
                  return e[i.toLowerCase()] = n.replace(/\"/gi, ""), e
                }, {})
              }(this._data),
              t = function (e) {
                if (e && Qt.test(e)) return e.match(Qt).map(function (e) {
                  var t = e.match(/^#EXT-X-BYTERANGE:([0-9]+)@([0-9]+)\n/);
                  return [t[1], t[2]]
                })
              }(this._data),
              r = this._url.split("/").pop() || "",
              i = this._url.replace(r, e.uri),
              n = t.map(function (e) {
                var t = e[0],
                  r = e[1];
                return new rr({
                  url: i,
                  startByte: r,
                  length: t
                })
              }),
              o = e.byterange.split("@"),
              a = o[0],
              s = o[1];
            n.unshift(new rr({
              url: i,
              startByte: s,
              length: a
            })), this._byteRanges = n
          }
          return this._byteRanges
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(Manifest.prototype, "extURI", {
        get: function () {
          if (!this._extURI) {
            var e = this._data.match(Yt);
            this._extURI = e && e[1] || void 0
          }
          return this._extURI
        },
        enumerable: !0,
        configurable: !0
      }), Manifest
    }(),
    rr = function () {
      function Segment(e) {
        var t = e.url,
          r = e.startByte,
          i = e.length;
        this.url = t, this.startByte = parseInt(r, 10), this.length = parseInt(i, 10), this.endByte = this.startByte + this.length - 1, this.range = "bytes=" + this.startByte + "-" + this.endByte
      }
      return Segment.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
          var e, t, r, i, n;
          return __generator(this, function (o) {
            switch (o.label) {
              case 0:
                return t = (e = this).url, (r = e.range) && t ? ((i = new Headers).append("Range", r), [4, fetch(t, {
                  headers: i
                })]) : [2];
              case 1:
                return [4, o.sent().arrayBuffer()];
              case 2:
                return n = o.sent(), [2, new Uint8Array(n)]
            }
          })
        })
      }, Segment
    }();
  ! function (e) {
    e[e.STANDARD = 64] = "STANDARD", e[e.HIGH = 256] = "HIGH"
  }(Zt || (Zt = {})),
  function (e) {
    e[e.DEFAULT = 0] = "DEFAULT", e[e.PREVIEW_ONLY = 1] = "PREVIEW_ONLY"
  }(Xt || (Xt = {})),
  function (e) {
    e[e.ACCURATE = 0] = "ACCURATE", e[e.ROUND = 1] = "ROUND"
  }(Jt || (Jt = {})),
  function (e) {
    e[e.none = 0] = "none", e[e.loading = 1] = "loading", e[e.playing = 2] = "playing", e[e.paused = 3] = "paused", e[e.stopped = 4] = "stopped", e[e.ended = 5] = "ended", e[e.seeking = 6] = "seeking", e[e.waiting = 8] = "waiting", e[e.stalled = 9] = "stalled", e[e.completed = 10] = "completed"
  }(er || (er = {}));
  var ir, nr, or, ar = "mk-player-tsid",
    sr = Ke.bufferedProgressDidChange,
    ur = Ke.mediaCanPlay,
    cr = Ke.mediaItemDidChange,
    lr = Ke.mediaItemStateDidChange,
    dr = Ke.mediaItemStateWillChange,
    pr = Ke.mediaItemWillChange,
    hr = Ke.mediaPlaybackError,
    fr = Ke.mediaPlaybackPreview,
    yr = Ke.metadataDidChange,
    mr = Ke.primaryPlayerDidChange,
    br = Ke.playbackBitrateDidChange,
    _r = Ke.playbackDurationDidChange,
    vr = Ke.playbackProgressDidChange,
    gr = Ke.playbackStateDidChange,
    Pr = Ke.playbackStateWillChange,
    wr = Ke.playbackTargetAvailableDidChange,
    Sr = Ke.playbackTimeDidChange,
    kr = Ke.playbackVolumeDidChange,
    Er = er.playing,
    BasePlayer = function (e) {
      function BasePlayer(t, r) {
        void 0 === r && (r = []);
        var i = e.call(this, [sr, ur, cr, lr, dr, pr, hr, fr, yr, mr, br, _r, vr, gr, Pr, wr, Sr, kr].concat(r)) || this;
        i.privateEnabled = !1, i.siriInitiated = !1, i._bitrate = Zt.STANDARD, i._currentBufferedProgress = 0, i._paused = !1, i._playbackState = er.none, i._stopped = !1, i._timingAccuracy = Jt.ROUND, i._currentPlaybackProgress = 0, i._downlinkSamples = [], i._isPrimaryPlayer = !0, i._mode = Xt.DEFAULT, i._nowPlayingItem = null, i._playActivityStub = new _e, i._playbackTargetAvailable = !1, i._serial = Date.now().toString(), i._bitrate = t.bitrate || Zt.STANDARD, i._timingAccuracy = t.accurateTiming ? Jt.ACCURATE : Jt.ROUND, window.navigator && window.navigator.connection && window.navigator.connection.downlink && i._recalculateBitrate(100 * (window.navigator.connection.downlink || 0)), i.storekit = t.storekit, i.privateEnabled = t.privateEnabled || !1, i.siriInitiated = t.siriInitiated || !1;
        var n = "visibilitychange",
          o = "visibilityState";
        void 0 !== document.mozHidden ? (n = "mozvisibilitychange", o = "mozVisibilityState") : void 0 !== document.msHidden ? (n = "msvisibilitychange", o = "msVisibilityState") : void 0 !== document.webkitHidden && (n = "webkitvisibilitychange", o = "webkitVisibilityState"), document.addEventListener(n, function (e) {
          return globalConfig.logger.log("visibilityState", e.target[o]), "hidden" === e.target[o] ? i.isPlaying && i.playActivity.exit(i.currentPlaybackTime) : "visible" === e.target[o] ? i.playActivity.activate(!i.isPlaying) : void 0
        });
        var a = "onpagehide" in window ? "pagehide" : "unload";
        return window.addEventListener(a, function () {
          return i.isPlaying && i.playActivity.exit(i.currentPlaybackTime)
        }), window.addEventListener("storage", function (e) {
          var t = e.key,
            r = e.newValue;
          t === ar && r && (i.isPrimaryPlayer = r === i._serial)
        }, !1), localStorage.setItem(ar, i._serial), setTimeout(function () {
          i.playActivity.activate(!i.isPlaying)
        }, 500), i
      }
      return __extends(BasePlayer, e), Object.defineProperty(BasePlayer.prototype, "bitrate", {
        get: function () {
          return this._bitrate
        },
        set: function (e) {
          this._bitrate !== e && (this._bitrate = e, this.dispatchEvent(br, {
            bitrate: e
          }))
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(BasePlayer.prototype, "canSupportDRM", {
        get: function () {
          return !!this.extension && this.extension.hasMediaSession
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(BasePlayer.prototype, "currentBufferedProgress", {
        get: function () {
          return this._currentBufferedProgress
        },
        set: function (e) {
          this._currentBufferedProgress !== e && (this._currentBufferedProgress = e, this.dispatchEvent(sr, {
            progress: e
          }))
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(BasePlayer.prototype, "currentPlaybackDuration", {
        get: function () {
          return !this.previewOnly && this.hasAuthorization && this.nowPlayingItem && this.nowPlayingItem.playbackDuration ? this._timing(this.nowPlayingItem.playbackDuration / 1e3) : this._timing(this._currentDuration)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(BasePlayer.prototype, "currentPlaybackTime", {
        get: function () {
          return this._timing(this._currentTime)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(BasePlayer.prototype, "currentPlaybackTimeRemaining", {
        get: function () {
          return this.currentPlaybackDuration - this.currentPlaybackTime
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(BasePlayer.prototype, "currentPlaybackProgress", {
        get: function () {
          return this._currentPlaybackProgress || 0
        },
        set: function (e) {
          this._currentPlaybackProgress !== e && (this._currentPlaybackProgress = e, this.dispatchEvent(vr, {
            progress: e
          }))
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(BasePlayer.prototype, "formattedCurrentPlaybackDuration", {
        get: function () {
          return formattedSeconds(this.currentPlaybackDuration)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(BasePlayer.prototype, "hasAuthorization", {
        get: function () {
          return hasAuthorization(this.storekit)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(BasePlayer.prototype, "isPlaying", {
        get: function () {
          return this.playbackState === Er
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(BasePlayer.prototype, "isPrimaryPlayer", {
        get: function () {
          return this._isPrimaryPlayer
        },
        set: function (e) {
          e !== this._isPrimaryPlayer && (this._isPrimaryPlayer = e, this._isPrimaryPlayer ? localStorage.setItem(ar, this._serial) : (this.dispatchEvent(mr, {
            target: this
          }), this.pause()))
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(BasePlayer.prototype, "medianDownlink", {
        get: function () {
          return this._downlinkSamples.reduce(function (e, t) {
            return e + t
          }, 0) / this._downlinkSamples.length || 0
        },
        enumerable: !0,
        configurable: !0
      }), BasePlayer.prototype.mute = function () {
        this.volume = 0
      }, Object.defineProperty(BasePlayer.prototype, "nowPlayingItem", {
        get: function () {
          return this._nowPlayingItem
        },
        set: function (e) {
          e ? this._nowPlayingItem && this._nowPlayingItem.isEqual(e) || (this.dispatchEvent(pr, {
            item: e
          }), this.isPlaying && this.pause(), this.canSupportDRM && this.extension.cancelPendingRenewal(), this._nowPlayingItem && (this._nowPlayingItem.state = dt.ended, this._nowPlayingItem.endMonitoringStateDidChange(), this._nowPlayingItem.endMonitoringStateWillChange()), this._nowPlayingItem = e, this._nowPlayingItem.state = dt.playing, e && e.info && this._setTargetElementTitle(e.info), this.dispatchEvent(cr, {
            item: e
          }), this.dispatchEvent(_r, {
            currentTarget: this._targetElement,
            duration: this.currentPlaybackDuration,
            target: this._targetElement,
            type: "durationchange"
          })) : this._nowPlayingItem = null
        },
        enumerable: !0,
        configurable: !0
      }), BasePlayer.prototype.pause = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            switch (e.label) {
              case 0:
                return this.isPlaying ? [4, this._pauseMedia()] : [3, 3];
              case 1:
                return e.sent(), this._paused = !0, [4, this.playActivity.pause(this.currentPlaybackTime)];
              case 2:
                e.sent(), e.label = 3;
              case 3:
                return [2]
            }
          })
        })
      }, BasePlayer.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            switch (e.label) {
              case 0:
                return this.nowPlayingItem ? [4, this._playMedia()] : [2];
              case 1:
                return e.sent(), [4, this.playActivity.play()];
              case 2:
                return e.sent(), [2]
            }
          })
        })
      }, BasePlayer.prototype.preload = function () {
        return this._loadMedia()
      }, BasePlayer.prototype.playMediaItem = function (e, t) {
        return void 0 === t && (t = !1), __awaiter(this, void 0, void 0, function () {
          var r, i, n, o, a = this;
          return __generator(this, function (s) {
            switch (s.label) {
              case 0:
                return e && e.isPlayable ? (e.beginMonitoringStateDidChange(function (e) {
                  return a.dispatchEvent(lr, e)
                }), e.beginMonitoringStateWillChange(function (e) {
                  return a.dispatchEvent(dr, e)
                }), r = this._paused && !t, i = !this.canSupportDRM, this.previewOnly || (!this.hasAuthorization || i) && !e.playRawAssetURL ? (this.nowPlayingItem = e, i && this.dispatchEvent(fr, {
                  item: e
                }), [2, this._playAssetURL(e.previewURL, r)]) : e.playRawAssetURL && e.attributes.assetUrl ? (this.nowPlayingItem = e, [2, this._playAssetURL(e.attributes.assetUrl, r)]) : [4, this._loadMedia()]) : [2, Promise.reject(new MKError(MKError.MEDIA_PLAYBACK, "Not Playable."))];
              case 1:
                return s.sent(), [4, this.prepareToPlay(e, t)];
              case 2:
                return s.sent(), e.playRawAssetURL ? (this.nowPlayingItem = e, [2, this._playAssetURL(e.assetURL, r)]) : (this.extension.initiated = t, this.extension.setMediaItem(e), this.nowPlayingItem = e, e.state = dt.loading, [4, Manifest.load(e.assetURL, !1)]);
              case 3:
                return n = s.sent(), this.extension.extURI = n.extURI, e.state = dt.ready, this.extension.isFairplay ? [2, this._playAssetURL(e.assetURL, r)] : [3, 4];
              case 4:
                return n.downlink && this._recalculateBitrate(n.downlink), this._buffer && this._buffer.remove(), o = new MediaSource, [4, this._playAssetURL(window.window.URL.createObjectURL(o), !0)];
              case 5:
                s.sent(), o.addEventListener("sourceopen", function (t) {
                  if (0 === o.activeSourceBuffers.length && (a._buffer = new Buffer({
                      duration: e.playbackDuration / 1e3,
                      mediaSource: o,
                      manifest: n
                    }), !r && a.playbackState !== er.paused)) return a._playMedia()
                }), s.label = 6;
              case 6:
                return [2]
            }
          })
        })
      }, Object.defineProperty(BasePlayer.prototype, "playbackRate", {
        get: function () {
          return this._playbackRate
        },
        set: function (e) {
          this._playbackRate = e
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(BasePlayer.prototype, "playbackState", {
        get: function () {
          return this._playbackState
        },
        set: function (e) {
          if (e !== this._playbackState) {
            var t = {
              oldState: this._playbackState,
              state: e
            };
            this.dispatchEvent(Pr, t), this._playbackState = e, this.dispatchEvent(gr, t)
          }
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(BasePlayer.prototype, "playbackTargetAvailable", {
        get: function () {
          return void 0 !== window.WebKitPlaybackTargetAvailabilityEvent && this._playbackTargetAvailable
        },
        set: function (e) {
          e !== this._playbackTargetAvailable && (this._playbackTargetAvailable = e, this.dispatchEvent(wr, {
            available: e
          }))
        },
        enumerable: !0,
        configurable: !0
      }), BasePlayer.prototype.prepareToPlay = function (e, t) {
        return void 0 === t && (t = !1), __awaiter(this, void 0, void 0, function () {
          var r;
          return __generator(this, function (i) {
            switch (i.label) {
              case 0:
                if (!this.hasAuthorization) return [2, Promise.reject(new MKError(MKError.AUTHORIZATION_ERROR, "Unable to prepare for playback."))];
                i.label = 1;
              case 1:
                return i.trys.push([1, 3, , 13]), [4, e.prepareToPlay(this.storekit.developerToken, this.storekit.userToken, this.storekit.storefrontCountryCode)];
              case 2:
                return i.sent(), [3, 13];
              case 3:
                return r = i.sent(), [MKError.AUTHORIZATION_ERROR, MKError.SUBSCRIPTION_ERROR].includes(r.errorCode) ? [4, this.storekit.revokeUserToken()] : [3, 5];
              case 4:
                return i.sent(), [3, 12];
              case 5:
                if (r.errorCode !== MKError.TOKEN_EXPIRED) return [3, 11];
                i.label = 6;
              case 6:
                return i.trys.push([6, 9, , 10]), [4, this.storekit.renewUserToken()];
              case 7:
                return i.sent(), [4, e.prepareToPlay(this.storekit.developerToken, this.storekit.userToken, this.storekit.storefrontCountryCode)];
              case 8:
                return i.sent(), e.playbackData = this._playbackDataForItem(e), [2, e];
              case 9:
                return i.sent(), [3, 10];
              case 10:
                return [3, 12];
              case 11:
                r.errorCode === MKError.CONTENT_UNAVAILABLE && e.equivalent && (r = new MKError(MKError.CONTENT_EQUIVALENT, r.message)), i.label = 12;
              case 12:
                return t ? [2, Promise.reject(r)] : (this.dispatchEvent(hr, r), [2]);
              case 13:
                return e.playbackData = this._playbackDataForItem(e), [2, e]
            }
          })
        })
      }, Object.defineProperty(BasePlayer.prototype, "previewOnly", {
        get: function () {
          return this._mode === Xt.PREVIEW_ONLY
        },
        set: function (e) {
          this._mode = e ? Xt.PREVIEW_ONLY : Xt.DEFAULT
        },
        enumerable: !0,
        configurable: !0
      }), BasePlayer.prototype.seekToTime = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          var t;
          return __generator(this, function (r) {
            switch (r.label) {
              case 0:
                return t = this.currentPlaybackTime, this._buffer ? [4, this._buffer.seek(e)] : [3, 2];
              case 1:
                r.sent(), r.label = 2;
              case 2:
                return [4, this._seekToTime(e)];
              case 3:
                return r.sent(), [4, this.playActivity.scrub(t)];
              case 4:
                return r.sent(), [4, this.playActivity.scrub(e, se.SCRUB_END)];
              case 5:
                return r.sent(), [2]
            }
          })
        })
      }, Object.defineProperty(BasePlayer.prototype, "storekit", {
        get: function () {
          return this._storekit
        },
        set: function (e) {
          var t = this;
          e && (e.addEventListener(Ht.authorizationStatusWillChange, function (e) {
            var r = e.authorizationStatus,
              i = e.newAuthorizationStatus;
            return __awaiter(t, void 0, void 0, function () {
              return __generator(this, function (e) {
                switch (e.label) {
                  case 0:
                    return this.isPlaying ? r > xt.DENIED && i < xt.RESTRICTED ? [4, this.stop(se.PLAYBACK_SUSPENDED)] : [3, 2] : [3, 4];
                  case 1:
                    return e.sent(), [3, 4];
                  case 2:
                    return [4, this.stop()];
                  case 3:
                    e.sent(), e.label = 4;
                  case 4:
                    return [2]
                }
              })
            })
          }), this._storekit = e)
        },
        enumerable: !0,
        configurable: !0
      }), BasePlayer.prototype.stop = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (t) {
            switch (t.label) {
              case 0:
                return this._stopped = !0, [4, this._stopMedia()];
              case 1:
                return t.sent(), [4, this.playActivity.stop(this.currentPlaybackTime, e)];
              case 2:
                return t.sent(), this.nowPlayingItem = null, [2]
            }
          })
        })
      }, Object.defineProperty(BasePlayer.prototype, "volume", {
        get: function () {
          return this._volume
        },
        set: function (e) {
          this._volume = e
        },
        enumerable: !0,
        configurable: !0
      }), BasePlayer.prototype._calculatePlaybackProgress = function () {
        this.currentPlaybackProgress = Math.round(100 * (this.currentPlaybackTime / this.currentPlaybackDuration || 0)) / 100
      }, Object.defineProperty(BasePlayer.prototype, "playActivity", {
        get: function () {
          return this._storekit && this._storekit.userTokenIsValid && this._requiresPlayActivity() ? (this._playActivityClient || (this._playActivityClient = new PlayActivity(this._storekit.developerToken, this._storekit.userToken, this._storekit.storefrontCountryCode, {
            app: {
              build: globalConfig.app.build,
              name: globalConfig.app.name,
              version: globalConfig.app.version
            },
            logInfo: globalConfig.logger.enabled,
            sourceType: globalConfig.sourceType
          })), this._playActivityClient) : this._playActivityStub
        },
        enumerable: !0,
        configurable: !0
      }), BasePlayer.prototype._playbackDataForItem = function (e) {
        var t = this;
        return e.isCloudUpload ? e.assets[0] : e.assets.filter(function (e) {
          var r = e.flavor,
            i = new RegExp("\\d{1,2}\\:(c" + (t.extension.isFairplay ? "bc" : "tr") + "p)(\\d{2,3})", "i");
          return i.test(r) && parseInt(r.match(i)[2], 0) <= t.bitrate
        })[0]
      }, BasePlayer.prototype._recalculateBitrate = function (e) {
        this._downlinkSamples.push(e), this.medianDownlink && this.medianDownlink >= 65 ? this.bitrate = Zt.HIGH : this.bitrate = Zt.STANDARD
      }, BasePlayer.prototype._requiresPlayActivity = function () {
        return !!this.nowPlayingItem && mediaRequiresPlayActivity(this.nowPlayingItem)
      }, BasePlayer.prototype._timing = function (e) {
        return void 0 === e && (e = 0), this._timingAccuracy === Jt.ROUND ? Math.round(e) : e
      }, BasePlayer
    }(lt),
    PlayerStub = function () {
      function PlayerStub() {
        this.bitrate = Zt.STANDARD, this.canSupportDRM = !1, this.currentBufferedProgress = NaN, this.currentPlaybackDuration = NaN, this.currentPlaybackProgress = NaN, this.currentPlaybackTime = NaN, this.currentPlaybackTimeRemaining = NaN, this.formattedCurrentPlaybackDuration = {
          hours: NaN,
          minutes: NaN
        }, this.isLooping = !1, this.isPlaying = !1, this.isPrimaryPlayer = !0, this.isReady = !1, this.nowPlayingItem = null, this.playbackRate = NaN, this.playbackState = er.none, this.playbackTargetAvailable = !1, this.volume = NaN, this._playActivity = new _e
      }
      return Object.defineProperty(PlayerStub.prototype, "playActivity", {
        get: function () {
          return this._playActivity
        },
        enumerable: !0,
        configurable: !0
      }), PlayerStub.prototype.activate = function () {}, PlayerStub.prototype.deactivate = function () {}, PlayerStub.prototype.destroy = function () {}, PlayerStub.prototype.mute = function () {}, PlayerStub.prototype.pause = function () {
        return Promise.resolve()
      }, PlayerStub.prototype.play = function () {
        return Promise.resolve()
      }, PlayerStub.prototype.playMediaItem = function (e, t) {
        return Promise.resolve()
      }, PlayerStub.prototype.preload = function () {
        return Promise.resolve()
      }, PlayerStub.prototype.prepareToPlay = function (e, t, r) {
        return Promise.resolve()
      }, PlayerStub.prototype.seekToTime = function (e) {
        return Promise.resolve()
      }, PlayerStub.prototype.showPlaybackTargetPicker = function () {}, PlayerStub.prototype.stop = function (e) {
        return Promise.resolve()
      }, PlayerStub
    }();
  ! function (e) {
    e.MP4 = "audio/mp4"
  }(ir || (ir = {})),
  function (e) {
    e.FAIRPLAY = "com.apple.fps", e.PLAYREADY = "com.microsoft.playready", e.WIDEVINE = "com.widevine.alpha"
  }(nr || (nr = {})),
  function (e) {
    e.playbackLicenseError = "playbackLicenseError", e.playbackSessionError = "playbackSessionError"
  }(or || (or = {}));
  var Ar, Cr, Dr, Rr = /max-age=(\d+)/i,
    KeySession = function (e) {
      function KeySession() {
        var t = e.call(this, [or.playbackLicenseError, or.playbackSessionError]) || this;
        return t.initiated = !0, t.isLibrary = !1, t.keySystem = nr.FAIRPLAY, t._storage = window.sessionStorage, t.boundDispatchKeyError = t.dispatchKeyError.bind(t), t.boundDispatchSessionError = t.dispatchSessionError.bind(t), t.boundHandleSessionCreation = t.handleSessionCreation.bind(t), t
      }
      return __extends(KeySession, e), Object.defineProperty(KeySession.prototype, "extID", {
        get: function () {
          if (this.extURI) return this.extURI.replace("data:;base64,", "")
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(KeySession.prototype, "isFairplay", {
        get: function () {
          return this.keySystem === nr.FAIRPLAY
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(KeySession.prototype, "isPlayready", {
        get: function () {
          return this.keySystem === nr.PLAYREADY
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(KeySession.prototype, "isWidevine", {
        get: function () {
          return this.keySystem === nr.WIDEVINE
        },
        enumerable: !0,
        configurable: !0
      }), KeySession.prototype.acquirePlaybackLicense = function (e, t, r) {
        return void 0 === r && (r = this.initiated), __awaiter(this, void 0, void 0, function () {
          var i, n;
          return __generator(this, function (o) {
            switch (o.label) {
              case 0:
                return this.keyServerURL && this.developerToken && this.userToken ? (i = new Headers({
                  Authorization: "Bearer " + this.developerToken,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "X-Apple-Music-User-Token": "" + this.userToken
                }), [4, fetch(this.keyServerURL, {
                  method: "POST",
                  body: JSON.stringify({
                    "key-system": this.keySystem,
                    "user-initiated": r,
                    adamId: "" + this.adamId,
                    isLibrary: this.isLibrary,
                    challenge: t,
                    uri: e
                  }),
                  headers: i
                })]) : [2];
              case 1:
                return (n = o.sent()).ok ? [4, n.json()] : [2, Promise.reject(new MKError(MKError.MEDIA_LICENSE, "Error acquiring license"))];
              case 2:
                return [2, o.sent()]
            }
          })
        })
      }, KeySession.prototype.cancelPendingRenewal = function () {
        this._pendingRenewal && (clearTimeout(this._pendingRenewal), this._pendingRenewal = void 0)
      }, KeySession.prototype.startLicenseSession = function (e) {
        var t, r = this,
          i = e.message,
          n = e.target;
        if (this.isPlayready) {
          var o = String.fromCharCode.apply(null, new Uint16Array(i.buffer || i)),
            a = (new DOMParser).parseFromString(o, "application/xml");
          t = a.getElementsByTagName("Challenge")[0].childNodes[0].nodeValue
        } else t = Xe(new Uint8Array(i));
        return this.acquirePlaybackLicense(this.extURI, t).then(function (e) {
          r._handleLicenseResponse(e, n, t)
        })
      }, KeySession.prototype.setKeyURLs = function (e) {
        this.keyCertURL = e[this.isFairplay ? "hls-key-cert-url" : "widevine-cert-url"], this.keyServerURL = e["hls-key-server-url"]
      }, KeySession.prototype.dispatchKeyError = function (e) {
        this.dispatchEvent(or.playbackSessionError, new MKError(MKError.MEDIA_KEY, e))
      }, KeySession.prototype.dispatchSessionError = function (e) {
        this.dispatchEvent(or.playbackSessionError, new MKError(MKError.MEDIA_SESSION, e))
      }, KeySession.prototype.loadCertificateBuffer = function () {
        return __awaiter(this, void 0, void 0, function () {
          var e, t, r, i, n, o, a, s, u, c, l, d, p;
          return __generator(this, function (h) {
            switch (h.label) {
              case 0:
                if (!this.keyCertURL) return [2, Promise.reject(new MKError(MKError.MEDIA_SESSION, "No certificate URL"))];
                if ((e = document.createElement("a")).href = this.keyCertURL, t = Date.now(), r = ("" + e.hostname + e.pathname).replace(/[^a-z0-9.]/gi, "."), i = this._storage.getItem(r), n = parseInt(this._storage.getItem("com.ai.mk.vmcc.exp") || "", 10), i && n && n > t) {
                  for (o = new Uint8Array(i.length), a = i.length; a--;) o[a] = i.charCodeAt(a);
                  return [2, o.buffer]
                }
                return [4, fetch(this.keyCertURL + "?t=" + Date.now())];
              case 1:
                return s = h.sent(), u = s.headers.get("cache-control"), c = 86400, u && Rr.test(u) && (l = u.match(Rr)) && l[1] && (c = parseInt(l[1], 10)), [4, s.arrayBuffer()];
              case 2:
                return d = h.sent(), p = String.fromCharCode.apply(String, new Uint8Array(d)), /^\<\?xml/.test(p) ? [2, Promise.reject(new MKError(MKError.MEDIA_CERTIFICATE, "Invalid certificate."))] : (this._storage.setItem(r, p), this._storage.setItem("com.ai.mk.vmcc.exp", (t + 1e3 * c).toString()), [2, d])
            }
          })
        })
      }, KeySession.prototype.handleSessionCreation = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          var t = this;
          return __generator(this, function (r) {
            return [2, this.createSession(e).catch(function (e) {
              t.dispatchSessionError(e)
            })]
          })
        })
      }, KeySession.prototype._handleLicenseResponse = function (e, t, r) {
        var i = this;
        if (e.license) {
          e["renew-after"] && (this._pendingRenewal = setTimeout(function () {
            i.acquirePlaybackLicense(i.extURI, r, !1).then(function (e) {
              i._handleLicenseResponse(e, t, r)
            })
          }, 1e3 * e["renew-after"]));
          var n = $e(e.license);
          return t.update(n)
        }
        var o = MKError.serverError(e);
        if (this.initiated) throw o;
        this.dispatchEvent(or.playbackLicenseError, o)
      }, KeySession
    }(lt),
    EncryptedSession = function (e) {
      function EncryptedSession() {
        return null !== e && e.apply(this, arguments) || this
      }
      return __extends(EncryptedSession, e), EncryptedSession.prototype.attachMedia = function (e, t) {
        var r = this;
        return this.keySystem = t.keySystem, e.addEventListener("encrypted", this.boundHandleSessionCreation, !1), t.createMediaKeys().then(function (t) {
          e.setMediaKeys(t)
        }).catch(function (e) {
          return r.dispatchKeyError(e)
        })
      }, EncryptedSession.prototype.detachMedia = function (e) {
        e.removeEventListener("encrypted", this.boundHandleSessionCreation)
      }, EncryptedSession.prototype.createSession = function (e) {
        var t = this,
          r = e.initData,
          i = e.initDataType,
          n = e.target;
        return this._mediaKeysServerCertificate ? this._createSession(n, r, i) : this.loadCertificateBuffer().then(function (e) {
          return n.mediaKeys.setServerCertificate(e).then(function () {
            return t._mediaKeysServerCertificate = e, t._createSession(n, r, i)
          })
        })
      }, EncryptedSession.prototype.generatePSSH = function (e) {
        for (var t = new Uint8Array([0, 0, 0, 52, 112, 115, 115, 104, 0, 0, 0, 0, 237, 239, 139, 169, 121, 214, 74, 206, 163, 200, 39, 220, 213, 29, 33, 237, 0, 0, 0, 20, 8, 1, 18, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), r = $e(e), i = 0; i < r.length; i++) t[t.length - 16 + i] = r[i];
        return t
      }, EncryptedSession.prototype._createSession = function (e, t, r) {
        var i = e.mediaKeys.createSession(),
          n = this.isWidevine ? this.generatePSSH(this.extID) : t;
        return i.addEventListener("message", this.startLicenseSession.bind(this)), i.generateRequest(r, n)
      }, EncryptedSession
    }(KeySession),
    Lr = function (e) {
      function MSSession() {
        return null !== e && e.apply(this, arguments) || this
      }
      return __extends(MSSession, e), MSSession.prototype.attachMedia = function (e, t) {
        return this.keySystem = t.keySystem, e.addEventListener("msneedkey", this.boundHandleSessionCreation, !1), e.addEventListener("mskeyerror", this.boundDispatchKeyError), e
      }, MSSession.prototype.detachMedia = function (e) {
        e.removeEventListener("msneedkey", this.boundHandleSessionCreation, !1), e.removeEventListener("mskeyerror", this.boundDispatchKeyError)
      }, MSSession.prototype.createSession = function (e) {
        var t = e.initData,
          r = e.target;
        if (!r.msKeys) {
          var i = new MSMediaKeys(this.keySystem);
          r.msSetMediaKeys(i)
        }
        var n = r.msKeys.createSession(ir.MP4, t);
        return n.addEventListener("mskeyerror", this.dispatchKeyError), n.addEventListener("mskeymessage", this.startLicenseSession.bind(this)), n
      }, MSSession
    }(KeySession),
    WebKitSession = function (e) {
      function WebKitSession() {
        return null !== e && e.apply(this, arguments) || this
      }
      return __extends(WebKitSession, e), WebKitSession.prototype.attachMedia = function (e, t) {
        return e.addEventListener("webkitneedkey", this.boundHandleSessionCreation, !1), e.addEventListener("webkitkeyerror", this.boundDispatchKeyError), e
      }, WebKitSession.prototype.detachMedia = function (e) {
        e.removeEventListener("webkitneedkey", this.boundHandleSessionCreation, !1), e.removeEventListener("webkitkeyerror", this.boundDispatchKeyError)
      }, WebKitSession.prototype.createSession = function (e) {
        var t = this,
          r = e.initData,
          i = e.target,
          n = document.createElement("a");
        n.href = Qe(r.buffer);
        var o = i.contentId = n.hostname;
        if (!i.webkitKeys) {
          var a = new window.WebKitMediaKeys(this.keySystem);
          i.webkitSetMediaKeys(a)
        }
        return this.loadCertificateBuffer().then(function (e) {
          var n = t._concatInitDataIdAndCertificate(r, o, e),
            a = i.webkitKeys.createSession(ir.MP4, n);
          a.contentId = o, a.addEventListener("webkitkeyerror", t.dispatchKeyError), a.addEventListener("webkitkeymessage", t.startLicenseSession.bind(t))
        })
      }, WebKitSession.prototype._concatInitDataIdAndCertificate = function (e, t, r) {
        "string" == typeof t && (t = Ze(t)), r = new Uint8Array(r);
        var i = 0,
          n = new ArrayBuffer(e.byteLength + 4 + t.byteLength + 4 + r.byteLength),
          o = new DataView(n);
        new Uint8Array(n, i, e.byteLength).set(e), i += e.byteLength, o.setUint32(i, t.byteLength, !0), i += 4;
        var a = new Uint8Array(n, i, t.byteLength);
        return a.set(t), i += a.byteLength, o.setUint32(i, r.byteLength, !0), i += 4, new Uint8Array(n, i, r.byteLength).set(r), new Uint8Array(n, 0, n.byteLength)
      }, WebKitSession
    }(KeySession),
    MediaExtension = function (e) {
      function MediaExtension(t, r) {
        var i = e.call(this, [or.playbackLicenseError, or.playbackSessionError]) || this;
        if (i.audio = t, globalConfig.browser().isIE || globalConfig.browser().isSafari && globalConfig.browser().engineMajorVersion <= 601) return i;
        if (window.WebKitMediaKeys && window.WebKitMediaKeys.isTypeSupported(nr.FAIRPLAY + ".1_0", ir.MP4)) i.session = new WebKitSession, i.session.attachMedia(t, {
          keySystem: nr.FAIRPLAY
        });
        else if (window.MSMediaKeys && window.MSMediaKeys.isTypeSupported(nr.PLAYREADY, ir.MP4)) i.session = new Lr, i.session.attachMedia(t, {
          keySystem: nr.PLAYREADY
        });
        else if (i.hasMediaKeySupport && t.canPlayType(r)) {
          i.session = new EncryptedSession;
          var n = [{
            initDataTypes: ["cenc", "keyids"],
            audioCapabilities: [{
              contentType: r
            }],
            distinctiveIdentifier: "optional",
            persistentState: "required"
          }];
          navigator.requestMediaKeySystemAccess(nr.WIDEVINE, n).then(function (e) {
            i.session.attachMedia(t, e)
          }).catch(function () {
            navigator.requestMediaKeySystemAccess(nr.PLAYREADY, n).then(function (e) {
              i.session.attachMedia(t, e)
            })
          })
        }
        return i.session && i.session.addEventListener(or.playbackLicenseError, function (e) {
          i.dispatchEvent(or.playbackLicenseError, e)
        }), i
      }
      return __extends(MediaExtension, e), Object.defineProperty(MediaExtension.prototype, "hasMediaKeySupport", {
        get: function () {
          return !!(navigator && navigator.requestMediaKeySystemAccess && window.MediaKeys && window.MediaKeySystemAccess)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaExtension.prototype, "hasMediaSession", {
        get: function () {
          return void 0 !== this.session
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaExtension.prototype, "isFairplay", {
        get: function () {
          return this.session.isFairplay
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaExtension.prototype, "extURI", {
        set: function (e) {
          this.session.extURI = e
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MediaExtension.prototype, "initiated", {
        set: function (e) {
          this.session.initiated = e
        },
        enumerable: !0,
        configurable: !0
      }), MediaExtension.prototype.cancelPendingRenewal = function () {
        this.session.cancelPendingRenewal()
      }, MediaExtension.prototype.setMediaItem = function (e) {
        this.session.developerToken = globalConfig.storekit.developerToken, this.session.userToken = globalConfig.storekit.userToken, this.session.adamId = e.songId, this.session.isLibrary = e.isCloudItem, this.session.setKeyURLs(e.keyURLs)
      }, MediaExtension.prototype.destroy = function (e) {
        this.session && this.session.detachMedia(e)
      }, MediaExtension
    }(lt),
    Ur = Ke.mediaCanPlay,
    xr = Ke.mediaPlaybackError,
    Br = Ke.metadataDidChange,
    zr = Ke.playbackDurationDidChange,
    Kr = Ke.playbackTimeDidChange,
    Vr = Ke.playbackVolumeDidChange,
    qr = (er.completed, er.ended),
    Fr = er.loading,
    Hr = er.paused,
    Wr = er.playing,
    Gr = er.seeking,
    Yr = er.stopped,
    Qr = er.waiting,
    $r = ["canplay", "durationchange", "ended", "error", "loadedmetadata", "loadstart", "pause", "playing", "progress", "seeked", "seeking", "timeupdate", "volumechange", "waiting"],
    AudioPlayer = function (e) {
      function AudioPlayer(t) {
        var r = e.call(this, t) || this;
        r.mediaPlayerType = "audio";
        var i = document.createElement("audio");
        return i.autoplay = !1, i.id = "apple-music-player", i.controls = !1, i.muted = !1, i.playbackRate = 1, i.preload = "metadata", i.volume = 1, $r.forEach(function (e) {
          return i.addEventListener(e, r)
        }), window.WebKitPlaybackTargetAvailabilityEvent && i.addEventListener("webkitplaybacktargetavailabilitychanged", function (e) {
          r.playbackTargetAvailable = "available" === e.availability
        }), r.extension = new MediaExtension(i, Pe), r.extension.addEventListener(or.playbackLicenseError, function (e) {
          r.dispatchEvent(xr, e)
        }), r.extension.addEventListener(or.playbackSessionError, function (e) {
          r.dispatchEvent(xr, new MKError(MKError.MEDIA_SESSION, e))
        }), document.body.appendChild(i), r.audio = i, r
      }
      return __extends(AudioPlayer, e), Object.defineProperty(AudioPlayer.prototype, "isReady", {
        get: function () {
          return 0 !== this.audio.readyState
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(AudioPlayer.prototype, "_currentDuration", {
        get: function () {
          return this.audio.duration
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(AudioPlayer.prototype, "_currentTime", {
        get: function () {
          return this.audio.currentTime
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(AudioPlayer.prototype, "_playbackRate", {
        get: function () {
          return this.audio.playbackRate
        },
        set: function (e) {
          this.audio.playbackRate = e
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(AudioPlayer.prototype, "_targetElement", {
        get: function () {
          return this.audio
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(AudioPlayer.prototype, "_volume", {
        get: function () {
          return this.audio.volume
        },
        set: function (e) {
          this.audio.volume = e
        },
        enumerable: !0,
        configurable: !0
      }), AudioPlayer.prototype.activate = function () {
        return Promise.resolve()
      }, AudioPlayer.prototype.deactivate = function () {
        return Promise.resolve()
      }, AudioPlayer.prototype.destroy = function () {
        var e = this;
        return this.extension.destroy(this.audio), $r.forEach(function (t) {
          return e.audio.removeEventListener(t, e)
        }), null !== this.audio.parentNode && this.audio.parentNode.removeChild(this.audio), Promise.resolve()
      }, AudioPlayer.prototype.handleEvent = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          var t;
          return __generator(this, function (r) {
            switch (e.type) {
              case "canplay":
                this.dispatchEvent(Ur, e);
                break;
              case "durationchange":
                this.audio.duration !== 1 / 0 && (e.duration = this.currentPlaybackDuration, this.dispatchEvent(zr, e), this._calculatePlaybackProgress());
                break;
              case "ended":
                this.playbackState = qr;
                break;
              case "error":
              case "loadedmetadata":
                this.dispatchEvent(Br, e);
                break;
              case "loadstart":
                this.playbackState = Fr;
                break;
              case "pause":
                this.playbackState = this._stopped ? Yr : Hr;
                break;
              case "playing":
                this._paused = !1, this._stopped = !1, this.isPrimaryPlayer = !0, this.playbackState = Wr;
                break;
              case "progress":
                1 === (t = this.audio.buffered).length && 0 === t.start(0) && (this.currentBufferedProgress = Math.round(t.end(0) / this.currentPlaybackDuration * 100));
                break;
              case "seeked":
                this._paused ? this.playbackState = Hr : this._stopped ? this.playbackState = Yr : this.playbackState = Wr;
                break;
              case "seeking":
                this.playbackState === Hr ? this._paused = !0 : this.playbackState === Yr && (this._stopped = !0), this.playbackState = Gr;
                break;
              case "timeupdate":
                this.dispatchEvent(Kr, {
                  currentPlaybackDuration: this.currentPlaybackDuration,
                  currentPlaybackTime: this.currentPlaybackTime,
                  currentPlaybackTimeRemaining: this.currentPlaybackTimeRemaining
                }), this._calculatePlaybackProgress(), this._buffer && (this._buffer.currentTime = this.currentPlaybackTime);
                break;
              case "volumechange":
                this.dispatchEvent(Vr, e);
                break;
              case "waiting":
                this.playbackState = Qr
            }
            return [2]
          })
        })
      }, Object.defineProperty(AudioPlayer.prototype, "isLooping", {
        get: function () {
          return "boolean" == typeof this.audio.loop && this.audio.loop
        },
        set: function (e) {
          "boolean" == typeof this.audio.loop && (this.audio.loop = e)
        },
        enumerable: !0,
        configurable: !0
      }), AudioPlayer.prototype.showPlaybackTargetPicker = function () {
        this.playbackTargetAvailable && this.audio.webkitShowPlaybackTargetPicker()
      }, AudioPlayer.prototype._seekToTime = function (e) {
        return this.audio.currentTime = e, Promise.resolve()
      }, AudioPlayer.prototype._loadMedia = function () {
        return this.audio.load()
      }, AudioPlayer.prototype._pauseMedia = function () {
        return this.audio.pause(), Promise.resolve()
      }, AudioPlayer.prototype._playAssetURL = function (e, t) {
        return void 0 === t && (t = !1), this.audio.src = e, t ? this._loadMedia() : this._playMedia()
      }, AudioPlayer.prototype._playMedia = function () {
        var e = this.audio.play();
        return e && e.catch && e.catch(function () {}), e
      }, AudioPlayer.prototype._setTargetElementTitle = function (e) {
        this.audio && (this.audio.title = e)
      }, AudioPlayer.prototype._stopMedia = function () {
        return this.audio.pause(), this.audio.currentTime = 0, this.audio.removeAttribute("src"), this.audio.removeAttribute("title"), Promise.resolve()
      }, AudioPlayer
    }(BasePlayer),
    Preloader = function (e) {
      function Preloader(t, r) {
        return void 0 === r && (r = .3), e.call(this, t, r) || this
      }
      return __extends(Preloader, e), Preloader.prototype.handlePlaybackThreshold = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            switch (e.label) {
              case 0:
                return [4, this._playbackController.prepareToPlay(this._next, !1, !0)];
              case 1:
                return e.sent(), [2]
            }
          })
        })
      }, Preloader.prototype.shouldMonitor = function () {
        return !!this._playbackController.hasAuthorization && (this._next = this._playbackController.queue.nextPlayableItem, void 0 !== this._next && !this._next.isPreparedToPlay)
      }, Preloader.prototype.reset = function () {
        e.prototype.reset.call(this), this._next = void 0
      }, Preloader
    }(function () {
      function PlaybackMonitor(e, t) {
        var r = this;
        this.isMonitoring = !1, this._threshhold = -1, this._playbackController = e, this._percentage = t, this.reset(), this._boundHandleTimeChange = this.handleTimeChange.bind(this), this._boundUpdateThreshhold = this.updateThreshold.bind(this), this._playbackController.addEventListener(Ke.mediaItemDidChange, function () {
          r.handleMediaItemChange()
        })
      }
      return PlaybackMonitor.prototype.clearMonitor = function () {
        this.clearListeners(), this.reset()
      }, PlaybackMonitor.prototype.reset = function () {
        this._threshhold = -1, this.isMonitoring = !1
      }, PlaybackMonitor.prototype.clearListeners = function () {
        this._playbackController.removeEventListener(Ke.playbackDurationDidChange, this._boundUpdateThreshhold), this._playbackController.removeEventListener(Ke.playbackTimeDidChange, this._boundHandleTimeChange)
      }, PlaybackMonitor.prototype.handleMediaItemChange = function () {
        this.isMonitoring && this.clearMonitor(), this.shouldMonitor() && (this._playbackController.addEventListener(Ke.playbackDurationDidChange, this._boundUpdateThreshhold), this._playbackController.addEventListener(Ke.playbackTimeDidChange, this._boundHandleTimeChange), this.isMonitoring = !0)
      }, PlaybackMonitor.prototype.handleTimeChange = function (e) {
        var t = e.currentPlaybackDuration,
          r = e.currentPlaybackTime;
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            switch (e.label) {
              case 0:
                return this._threshhold < 0 && this.updateThreshold({
                  duration: t
                }), r < this._threshhold ? [2] : (this.clearListeners(), [4, this.handlePlaybackThreshold()]);
              case 1:
                return e.sent(), this.reset(), [2]
            }
          })
        })
      }, PlaybackMonitor.prototype.updateThreshold = function (e) {
        var t = e.duration;
        this._threshhold = t * this._percentage
      }, PlaybackMonitor
    }());
  ! function (e) {
    e[e.none = 0] = "none", e[e.one = 1] = "one", e[e.all = 2] = "all"
  }(Ar || (Ar = {})),
  function (e) {
    e[e.off = 0] = "off", e[e.songs = 1] = "songs"
  }(Cr || (Cr = {})), (Dr = e.PlayerSeek || (e.PlayerSeek = {}))[Dr.FORWARD = 30] = "FORWARD", Dr[Dr.BACK = 15] = "BACK";
  var Jr = Ke.bufferedProgressDidChange,
    ei = Ke.mediaCanPlay,
    ti = Ke.mediaItemDidChange,
    ri = Ke.mediaItemStateDidChange,
    ii = Ke.mediaItemStateWillChange,
    ni = Ke.mediaItemWillChange,
    oi = Ke.mediaPlaybackError,
    ai = Ke.mediaPlaybackPreview,
    si = Ke.metadataDidChange,
    ui = Ke.primaryPlayerDidChange,
    ci = Ke.playbackBitrateDidChange,
    li = Ke.playbackDurationDidChange,
    di = Ke.playbackProgressDidChange,
    pi = Ke.playbackStateDidChange,
    hi = Ke.playbackStateWillChange,
    fi = Ke.playbackTargetAvailableDidChange,
    yi = Ke.playbackTimeDidChange,
    mi = Ke.playbackVolumeDidChange,
    bi = Ke.queueItemsDidChange,
    _i = Ke.queuePositionDidChange,
    vi = [Jr, ei, ti, ri, ii, ni, oi, ai, si, ui, ci, li, di, pi, hi, fi, yi, mi],
    SerialPlayback = function (t) {
      function SerialPlayback(r) {
        var i = t.call(this, [bi, _i].concat(vi)) || this;
        return i._playerState = {
          bitrate: e.PlaybackBitrate.STANDARD,
          isLooping: !1,
          playbackRate: 1,
          volume: 1
        }, i._queue = new Queue({}), i._repeatMode = Ar.none, i._shuffleMode = Cr.off, i._storekit = r.storekit, i._playerOptions = r, i._playersByType = {}, i._currentPlayer = i._getPlayerByType("audio") || new PlayerStub, i._preloader = new Preloader(i), i
      }
      return __extends(SerialPlayback, t), Object.defineProperty(SerialPlayback.prototype, "bitrate", {
        get: function () {
          return this._currentPlayer.bitrate
        },
        set: function (e) {
          this._updatePlayerState("bitrate", e)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "canSupportDRM", {
        get: function () {
          return this._currentPlayer.canSupportDRM
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "continuous", {
        get: function () {
          return this._continuous || this.hasAuthorization
        },
        set: function (e) {
          this._continuous = e
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "currentBufferedProgress", {
        get: function () {
          return this._currentPlayer.currentBufferedProgress
        },
        set: function (e) {
          this._currentPlayer.currentBufferedProgress = e
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "currentPlaybackDuration", {
        get: function () {
          return this._currentPlayer.currentPlaybackDuration
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "currentPlaybackTime", {
        get: function () {
          return this._currentPlayer.currentPlaybackTime
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "currentPlaybackTimeRemaining", {
        get: function () {
          return this._currentPlayer.currentPlaybackTimeRemaining
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "currentPlaybackProgress", {
        get: function () {
          return this._currentPlayer.currentPlaybackProgress
        },
        set: function (e) {
          this._currentPlayer.currentPlaybackProgress = e
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "formattedCurrentPlaybackDuration", {
        get: function () {
          return this._currentPlayer.formattedCurrentPlaybackDuration
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "hasAuthorization", {
        get: function () {
          return hasAuthorization(this.storekit)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "isPlaying", {
        get: function () {
          return this._currentPlayer.isPlaying
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "isReady", {
        get: function () {
          return this._currentPlayer.isReady
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "isPrimaryPlayer", {
        get: function () {
          return this._currentPlayer.isPrimaryPlayer
        },
        set: function (e) {
          this._currentPlayer.isPrimaryPlayer = e
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "nowPlayingItem", {
        get: function () {
          return this._currentPlayer.nowPlayingItem
        },
        set: function (e) {
          this._currentPlayer.nowPlayingItem = e
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "nowPlayingItemIndex", {
        get: function () {
          if (this.queue) return this.queue.position
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "playbackRate", {
        get: function () {
          return this._currentPlayer.playbackRate
        },
        set: function (e) {
          this._updatePlayerState("playbackRate", e)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "queue", {
        get: function () {
          return this._queue
        },
        set: function (e) {
          var t = this;
          this.hasAuthorization && (e.isRestricted = this.storekit.restrictedEnabled || !1), this.shuffleMode === Cr.songs && e.shuffle(!1), this._currentPlayer.nowPlayingItem = null;
          var r = e.item(e.position);
          r && r.isPlayable && this._currentPlayer.prepareToPlay(r).then(function (e) {
            t._currentPlayer.nowPlayingItem = e
          }).catch(function () {}), e.addEventListener(bi, function (e) {
            return t.dispatchEvent(bi, e)
          }), e.addEventListener(_i, function (e) {
            return t.dispatchEvent(_i, e)
          }), this._queue = e, this.dispatchEvent(bi, e.items)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "repeatMode", {
        get: function () {
          return this._repeatMode
        },
        set: function (e) {
          this._repeatMode = e, this._updatePlayerState("isLooping", this._repeatMode === Ar.one)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "shuffle", {
        set: function (e) {
          this.shuffleMode = e ? Cr.songs : Cr.off
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "shuffleMode", {
        get: function () {
          return this._shuffleMode
        },
        set: function (e) {
          e !== this._shuffleMode && (this._shuffleMode = e, e === Cr.songs ? this.queue.shuffle() : this.queue.unshuffle(), this.nowPlayingItem && (this.queue.position = this.queue.indexForItem(this.nowPlayingItem.id)))
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "storekit", {
        get: function () {
          return this._storekit
        },
        set: function (e) {
          var t = this;
          e && (e.addEventListener(Be.authorizationStatusWillChange, function (e) {
            var r = e.authorizationStatus,
              i = e.newAuthorizationStatus;
            return __awaiter(t, void 0, void 0, function () {
              return __generator(this, function (e) {
                switch (e.label) {
                  case 0:
                    return this.isPlaying ? r > xe.DENIED && i < xe.RESTRICTED ? [4, this.stop(se.PLAYBACK_SUSPENDED)] : [3, 2] : [3, 4];
                  case 1:
                    return e.sent(), [3, 4];
                  case 2:
                    return [4, this.stop()];
                  case 3:
                    e.sent(), e.label = 4;
                  case 4:
                    return [2]
                }
              })
            })
          }), this._storekit = e)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(SerialPlayback.prototype, "volume", {
        get: function () {
          return this._currentPlayer.volume
        },
        set: function (e) {
          this._updatePlayerState("volume", e)
        },
        enumerable: !0,
        configurable: !0
      }), SerialPlayback.prototype.changeToMediaAtIndex = function (e) {
        return void 0 === e && (e = 0), __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (t) {
            return [2, this._changeToMediaAtIndex(e, !0)]
          })
        })
      }, SerialPlayback.prototype.changeToMediaItem = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          var t;
          return __generator(this, function (r) {
            return -1 === (t = this.queue.indexForItem(e)) ? [2, Promise.reject(new MKError(MKError.MEDIA_DESCRIPTOR))] : [2, this.changeToMediaAtIndex(t)]
          })
        })
      }, SerialPlayback.prototype.destroy = function () {
        Object.values(this._playersByType).forEach(function (e) {
          return e.destroy()
        })
      }, SerialPlayback.prototype.mute = function () {
        this._currentPlayer.mute()
      }, SerialPlayback.prototype.pause = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            return [2, this._currentPlayer.pause()]
          })
        })
      }, SerialPlayback.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            return this._currentPlayer.nowPlayingItem ? [2, this._currentPlayer.play()] : !this._queue || this._queue.isEmpty ? [2] : -1 !== this.queue.nextPlayableItemIndex ? [2, this.changeToMediaAtIndex(this.queue.nextPlayableItemIndex)] : [2]
          })
        })
      }, Object.defineProperty(SerialPlayback.prototype, "playbackState", {
        get: function () {
          return this._currentPlayer.playbackState
        },
        enumerable: !0,
        configurable: !0
      }), SerialPlayback.prototype.preload = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            return [2, this._currentPlayer.preload()]
          })
        })
      }, SerialPlayback.prototype.prepareToPlay = function (e, t, r) {
        return void 0 === t && (t = !1), void 0 === r && (r = !1), __awaiter(this, void 0, void 0, function () {
          var i;
          return __generator(this, function (n) {
            try {
              return [2, this._currentPlayer.prepareToPlay(e, t, r)]
            } catch (e) {
              if (i = !r && -1 === [MKError.DEVICE_LIMIT, MKError.STREAM_UPSELL].indexOf(e.errorCode), this.continuous && i) return [2, this._next()]
            }
            return [2]
          })
        })
      }, SerialPlayback.prototype.showPlaybackTargetPicker = function () {
        this._currentPlayer.playbackTargetAvailable && this._currentPlayer.showPlaybackTargetPicker()
      }, SerialPlayback.prototype.skipToNextItem = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            return [2, this._next(!0)]
          })
        })
      }, SerialPlayback.prototype.skipToPreviousItem = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            return [2, this._previous(!0)]
          })
        })
      }, SerialPlayback.prototype.seekToTime = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (t) {
            return [2, this._currentPlayer.seekToTime(e)]
          })
        })
      }, SerialPlayback.prototype.seekForward = function () {
        return __awaiter(this, void 0, void 0, function () {
          var t;
          return __generator(this, function (r) {
            return (t = this.currentPlaybackTime + e.PlayerSeek.FORWARD) > this.currentPlaybackDuration ? [2, this.skipToNextItem()] : [2, this.seekToTime(t)]
          })
        })
      }, SerialPlayback.prototype.seekBackward = function () {
        return __awaiter(this, void 0, void 0, function () {
          var t;
          return __generator(this, function (r) {
            return t = this.currentPlaybackTime - e.PlayerSeek.BACK, [2, this.seekToTime(Math.max(0, t))]
          })
        })
      }, SerialPlayback.prototype.stop = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (t) {
            switch (t.label) {
              case 0:
                return [4, this._currentPlayer.stop(e)];
              case 1:
                return t.sent(), [2]
            }
          })
        })
      }, SerialPlayback.prototype._applyPlayerState = function (e) {
        var t = this;
        return Object.keys(this._playerState).forEach(function (r) {
          e.hasOwnProperty(r) && (e[r] = t._playerState[r])
        }), e
      }, SerialPlayback.prototype._changeToMediaAtIndex = function (t, r, i) {
        return void 0 === t && (t = 0), void 0 === r && (r = !1), __awaiter(this, void 0, void 0, function () {
          var n, o, a, s, u, c, l, d;
          return __generator(this, function (p) {
            switch (p.label) {
              case 0:
                if (this.queue.isEmpty) return [2];
                this.queue.position = t, n = this.currentPlaybackTime, o = this.playbackState, a = this.queue.item(t), p.label = 1;
              case 1:
                return p.trys.push([1, 3, , 4]), [4, this._currentPlayer.playMediaItem(a, r)];
              case 2:
                return p.sent(), "song" !== a.type ? [2] : null === this.nowPlayingItem ? [2] : (s = this.nowPlayingItem.container, u = {
                  container: {
                    id: s.id,
                    name: s.name,
                    type: s.type
                  },
                  duration: this.nowPlayingItem.playbackDuration / 1e3,
                  id: this.nowPlayingItem.id,
                  cloudId: this.nowPlayingItem.cloudId
                }, c = i === se.TRACK_SKIPPED_BACKWARDS || i === se.TRACK_SKIPPED_FORWARDS, r && o === e.PlaybackStates.playing && c ? [2, this._currentPlayer.playActivity.skip(u, i, n)] : (l = (c || r) && o !== e.PlaybackStates.playing, [2, this._currentPlayer.playActivity.play(u, l ? 0 : n)]));
              case 3:
                return d = p.sent(), [2, Promise.reject(d)];
              case 4:
                return [2]
            }
          })
        })
      }, SerialPlayback.prototype._getPlayerByType = function (t) {
        var r, i = this;
        if (this._playersByType[t]) return this._applyPlayerState(this._playersByType[t]);
        switch (t) {
          case "audio":
            r = new AudioPlayer(this._playerOptions);
            break;
          default:
            throw new Error("Invalid player type requested: " + t)
        }
        return vi.forEach(function (e) {
          r.addEventListener(e, function (t) {
            return i.dispatchEvent(e, t)
          })
        }), r.addEventListener(Ke.playbackStateDidChange, function (t) {
          var r = t.state;
          return __awaiter(i, void 0, void 0, function () {
            return __generator(this, function (t) {
              switch (t.label) {
                case 0:
                  return r !== e.PlaybackStates.ended ? [3, 4] : this.continuous ? [4, this._next()] : [3, 2];
                case 1:
                  return t.sent(), [3, 4];
                case 2:
                  return [4, this.stop(se.NATURAL_END_OF_TRACK)];
                case 3:
                  t.sent(), t.label = 4;
                case 4:
                  return [2]
              }
            })
          })
        }), this._playersByType[t] = r, this._applyPlayerState(r)
      }, SerialPlayback.prototype._next = function (t) {
        return void 0 === t && (t = !1), __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (r) {
            switch (r.label) {
              case 0:
                return this.queue.isEmpty ? [2] : this.repeatMode !== Ar.one ? [3, 2] : [4, this.seekToTime(0)];
              case 1:
                return r.sent(), [2, this.play()];
              case 2:
                return void 0 === this.queue.nextPlayableItemIndex || -1 === this.queue.nextPlayableItemIndex ? [3, 3] : [2, this._changeToMediaAtIndex(this.queue.nextPlayableItemIndex, t, se.TRACK_SKIPPED_FORWARDS)];
              case 3:
                return this.repeatMode !== Ar.all ? [3, 4] : [2, this._changeToMediaAtIndex(0, !1)];
              case 4:
                return this.isPlaying ? [4, this.stop(se.TRACK_SKIPPED_FORWARDS)] : [3, 6];
              case 5:
                r.sent(), r.label = 6;
              case 6:
                this._currentPlayer.playbackState = e.PlaybackStates.completed, r.label = 7;
              case 7:
                return [2]
            }
          })
        })
      }, SerialPlayback.prototype._previous = function (e) {
        return void 0 === e && (e = !1), __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (t) {
            return this.queue.isEmpty ? [2] : -1 !== this.queue.previousPlayableItemIndex ? [2, this._changeToMediaAtIndex(this.queue.previousPlayableItemIndex, e, se.TRACK_SKIPPED_BACKWARDS)] : [2]
          })
        })
      }, SerialPlayback.prototype._updatePlayerState = function (e, t) {
        this._playerState[e] = t, this._currentPlayer[e] = t
      }, SerialPlayback
    }(lt),
    Pi = "1.1932.0-1",
    MusicKitInstance = function (t) {
      function MusicKitInstance(developerToken, config) {
        void 0 === config && (config = {});
        var n = t.call(this, Object.keys(Ke)) || this;
        if (n.privateEnabled = !1, n.siriInitiated = !1, n.version = Pi, n._bag = globalConfig, n._maxBitrate = e.PlaybackBitrate.STANDARD, n._playbackErrorDialog = !0, "object" == typeof developerToken && (config = developerToken, developerToken = void 0), !developerToken) throw new Error("MusicKit was initialized without an developerToken.");
        Object.assign(globalConfig.features, ke(config.features)), config.debug && (globalConfig.logger.enabled = !0), globalConfig.app = config.app || {}, (config.affiliateToken || config.campaignToken) && (config.linkParameters = Object.assign(config.linkParameters || {}, {
          at: config.affiliateToken,
          ct: config.campaignToken
        }));
        var o = new ze(developerToken, {
          authenticateMethod: globalConfig.features["legacy-authenticate-method"] ? "POST" : "GET",
          deeplink: config.linkParameters,
          iconURL: globalConfig.app.icon,
          persist: config.persist
        });
        return o.addEventListener(Ke.authorizationStatusDidChange, function (e) {
          n.dispatchEvent(Ke.authorizationStatusDidChange, e)
        }), o.addEventListener(Ke.storefrontCountryCodeDidChange, function (e) {
          n.dispatchEvent(Ke.storefrontCountryCodeDidChange, e)
        }), o.addEventListener(Ke.storefrontIdentifierDidChange, function (e) {
          n.dispatchEvent(Ke.storefrontIdentifierDidChange, e)
        }), o.addEventListener(Ke.userTokenDidChange, function (e) {
          n._api && (n._api.clearCacheItems(), n._api = void 0), n.dispatchEvent(Ke.userTokenDidChange, e)
        }), n.storekit = globalConfig.storekit = o, config.bitrate && (n.bitrate = config.bitrate), config.prefix && /^(?:web|preview)$/.test(config.prefix) && (n.prefix = globalConfig.prefix = config.prefix), config.sourceType && (globalConfig.sourceType = config.sourceType), config.storefrontId && (n.storefrontId = config.storefrontId), config.suppressErrorDialog && (n._playbackErrorDialog = !config.suppressErrorDialog), n.privateEnabled = config.privateEnabled || !1, n.siriInitiated = config.siriInitiated || !1, globalConfig.logger.debug("MusicKit JS Version: " + n.version), globalConfig.logger.debug("Link Parameters", config.linkParameters), globalConfig.app && globalConfig.logger.debug("App", globalConfig.app), n
      }
      return __extends(MusicKitInstance, t), Object.defineProperty(MusicKitInstance.prototype, "developerToken", {
        get: function () {
          return this.storekit.developerToken
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MusicKitInstance.prototype, "api", {
        get: function () {
          if (!this._api) {
            var apiSessionStorage = globalConfig.features["api-session-storage"] ? sessionStorage : void 0;
            this._api = new API(globalConfig.urls.api, this.developerToken, this.storefrontId, this.musicUserToken, this.storekit.storefrontCountryCode, apiSessionStorage)
          }
          return this._api
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MusicKitInstance.prototype, "bitrate", {
        get: function () {
          return this.player.bitrate
        },
        set: function (e) {
          this.player.bitrate = e
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MusicKitInstance.prototype, "isAuthorized", {
        get: function () {
          return this.storekit.hasAuthorized
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MusicKitInstance.prototype, "isRestricted", {
        get: function () {
          return this.storekit.authorizationStatus === xe.RESTRICTED
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MusicKitInstance.prototype, "musicUserToken", {
        get: function () {
          return this.storekit.userToken
        },
        set: function (e) {
          this.storekit.userToken = e
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MusicKitInstance.prototype, "subscribeURL", {
        get: function () {
          return this.storekit.deeplinkURL({
            p: "subscribe"
          })
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MusicKitInstance.prototype, "subscribeFamilyURL", {
        get: function () {
          return this.storekit.deeplinkURL({
            p: "subscribe-family"
          })
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MusicKitInstance.prototype, "subscribeIndividualURL", {
        get: function () {
          return this.storekit.deeplinkURL({
            p: "subscribe-individual"
          })
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MusicKitInstance.prototype, "subscribeStudentURL", {
        get: function () {
          return this.storekit.deeplinkURL({
            p: "subscribe-student"
          })
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MusicKitInstance.prototype, "player", {
        get: function () {
          var t = this;
          if (!this._player) {
            this._player = new SerialPlayback({
              accurateTiming: !!globalConfig.features["player-accurate-timing"],
              bitrate: this._maxBitrate,
              privateEnabled: this.privateEnabled,
              siriInitiated: this.siriInitiated,
              storekit: this.storekit
            });
            var r = Ke.bufferedProgressDidChange,
              i = Ke.mediaCanPlay,
              n = Ke.mediaItemDidChange,
              o = Ke.mediaItemStateDidChange,
              a = Ke.mediaItemStateWillChange,
              s = Ke.mediaItemWillChange,
              u = Ke.mediaPlaybackError,
              c = Ke.metadataDidChange,
              l = Ke.playbackDurationDidChange,
              d = Ke.playbackProgressDidChange,
              p = Ke.playbackStateDidChange,
              h = Ke.playbackTimeDidChange,
              f = Ke.playbackVolumeDidChange,
              y = Ke.primaryPlayerDidChange,
              m = Ke.queueItemsDidChange,
              b = Ke.queuePositionDidChange;
            this._player.addEventListener(u, function (e) {
              return t._handlePlaybackError(e)
            }), this._player.addEventListener(p, function (r) {
              e.PlaybackStates.paused !== r.state && e.PlaybackStates.ended !== r.state || t.storekit.presentSubscribeView(!1), t.dispatchEvent(p, r)
            }), [r, i, n, o, a, s, c, y, l, d, h, f, m, b].forEach(function (e) {
              return t._player.addEventListener(e, function (r) {
                return t.dispatchEvent(e, r)
              })
            })
          }
          return this._player
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(MusicKitInstance.prototype, "storefrontId", {
        get: function () {
          return this._apiStorefrontId || this.storekit.storefrontCountryCode
        },
        set: function (e) {
          if (this._api && this._api.storefrontId !== e) {
            this._api.clearCacheItems();
            var t = globalConfig.features["api-session-storage"] ? sessionStorage : void 0;
            this._api = new API(globalConfig.urls.api, this.developerToken, e, this.musicUserToken, this.storekit.storefrontCountryCode, t)
          }
          this._apiStorefrontId = e
        },
        enumerable: !0,
        configurable: !0
      }), MusicKitInstance.prototype.addToLibrary = function (e, t) {
        return __awaiter(this, void 0, void 0, function () {
          var r;
          return __generator(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, this.authorize()];
              case 1:
                return i.sent(), t || (t = /[a-z]{2}\.[a-z0-9\-]+/i.test(e) ? "playlists" : "albums"), (r = {})[t] = [e], [2, this.api.addToLibrary(r)]
            }
          })
        })
        // TODO: 1) Entry point to authorization
      }, MusicKitInstance.prototype.authorize = async function () {
        this.deferPlayback();
        if (this.storekit.userTokenIsValid) return this.storekit.userToken;
        await this.storekit.requestUserToken();
        if (this.storekit.userTokenIsValid) {
          await this.storekit.requestStorefrontCountryCode().catch((e) => {
            this.unauthorize();
            return Promise.reject(e);
          });
        }
        // return __awaiter(this, void 0, void 0, function () {
        //   var e, self = this;
        //   return __generator(this, function (r) {
        //     switch (r.label) {
        //       case 0:
        //         return this.deferPlayback(), this.storekit.userTokenIsValid ? [2, this.storekit.userToken] : [4, this.storekit.requestUserToken()];
        //       case 1:
        //         return e = r.sent(), this.storekit.userTokenIsValid ? [4, this.storekit.requestStorefrontCountryCode().catch(function (e) {
        //           return self.unauthorize(), Promise.reject(e)
        //         })] : [3, 3];
        //       case 2:
        //         return r.sent(), [2, e];
        //       case 3:
        //         return [2]
        //     }
        //   })
        // })
      }, MusicKitInstance.prototype.changeToMediaAtIndex = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (t) {
            switch (t.label) {
              case 0:
                return this._checkAuthorization() ? [4, this.authorize()] : [3, 2];
              case 1:
                t.sent(), t.label = 2;
              case 2:
                return [2, this.player.changeToMediaAtIndex(e)]
            }
          })
        })
      }, MusicKitInstance.prototype.cleanup = function () {
        this._player && this._player.destroy && this._player.destroy()
      }, MusicKitInstance.prototype.deferPlayback = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            switch (e.label) {
              case 0:
                return this.player.isPlaying || this.player.isReady ? [3, 2] : [4, this.player.preload()];
              case 1:
                e.sent(), e.label = 2;
              case 2:
                return [2]
            }
          })
        })
      }, MusicKitInstance.prototype.me = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            switch (e.label) {
              case 0:
                return e.trys.push([0, 2, , 3]), [4, this.storekit.me()];
              case 1:
                return [2, e.sent()];
              case 2:
                return e.sent(), [2, Promise.reject(new MKError(MKError.AUTHORIZATION_ERROR, "Unauthorized"))];
              case 3:
                return [2]
            }
          })
        })
      }, MusicKitInstance.prototype.pause = function () {
        return __awaiter(this, void 0, void 0, function () {
          var e;
          return __generator(this, function (t) {
            switch (t.label) {
              case 0:
                return t.trys.push([0, 2, , 3]), [4, this.player.pause()];
              case 1:
                return t.sent(), [3, 3];
              case 2:
                return e = t.sent(), this._handlePlaybackError(e), [3, 3];
              case 3:
                return [2, Promise.resolve()]
            }
          })
        })
      }, MusicKitInstance.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
          var e;
          return __generator(this, function (t) {
            switch (t.label) {
              case 0:
                return this._checkAuthorization() ? [4, this.authorize()] : [3, 2];
              case 1:
                t.sent(), t.label = 2;
              case 2:
                return t.trys.push([2, 4, , 5]), [4, this.player.play()];
              case 3:
                return t.sent(), [3, 5];
              case 4:
                return e = t.sent(), this._handlePlaybackError(e), [3, 5];
              case 5:
                return [2, Promise.resolve()]
            }
          })
        })
      }, MusicKitInstance.prototype.playNext = function (e, t) {
        return void 0 === t && (t = !1), __awaiter(this, void 0, void 0, function () {
          var r;
          return __generator(this, function (i) {
            switch (i.label) {
              case 0:
                return !this.player.queue || this.player.queue.isEmpty ? [2, this.setQueue(e)] : [4, this._dataForQueueOptions(e)];
              case 1:
                return r = i.sent(), [2, this.player.queue.prepend(r, t)]
            }
          })
        })
      }, MusicKitInstance.prototype.playLater = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          var t;
          return __generator(this, function (r) {
            switch (r.label) {
              case 0:
                return !this.player.queue || this.player.queue.isEmpty ? [2, this.setQueue(e)] : [4, this._dataForQueueOptions(e)];
              case 1:
                return t = r.sent(), [2, this.player.queue.append(t)]
            }
          })
        })
      }, MusicKitInstance.prototype.seekToTime = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          var t;
          return __generator(this, function (r) {
            switch (r.label) {
              case 0:
                return this._checkAuthorization() ? [4, this.authorize()] : [3, 2];
              case 1:
                r.sent(), r.label = 2;
              case 2:
                return r.trys.push([2, 4, , 5]), [4, this.player.seekToTime(e)];
              case 3:
                return r.sent(), [3, 5];
              case 4:
                return t = r.sent(), this._handlePlaybackError(t), [3, 5];
              case 5:
                return [2, Promise.resolve()]
            }
          })
        })
      }, MusicKitInstance.prototype.setQueue = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          var t;
          return __generator(this, function (r) {
            switch (r.label) {
              case 0:
                return [4, this.deferPlayback()];
              case 1:
                return r.sent(), [4, this._dataForQueueOptions(e)];
              case 2:
                return t = r.sent(), this.player.queue = new Queue(t), [2, this.player.queue]
            }
          })
        })
      }, MusicKitInstance.prototype.skipToNextItem = function () {
        return __awaiter(this, void 0, void 0, function () {
          var e;
          return __generator(this, function (t) {
            switch (t.label) {
              case 0:
                return this._checkAuthorization() ? [4, this.authorize()] : [3, 2];
              case 1:
                t.sent(), t.label = 2;
              case 2:
                return t.trys.push([2, 4, , 5]), [4, this.player.skipToNextItem()];
              case 3:
                return t.sent(), [3, 5];
              case 4:
                return e = t.sent(), this._handlePlaybackError(e), [3, 5];
              case 5:
                return [2, Promise.resolve()]
            }
          })
        })
      }, MusicKitInstance.prototype.skipToPreviousItem = function () {
        return __awaiter(this, void 0, void 0, function () {
          var e;
          return __generator(this, function (t) {
            switch (t.label) {
              case 0:
                return this._checkAuthorization() ? [4, this.authorize()] : [3, 2];
              case 1:
                t.sent(), t.label = 2;
              case 2:
                return t.trys.push([2, 4, , 5]), [4, this.player.skipToPreviousItem()];
              case 3:
                return t.sent(), [3, 5];
              case 4:
                return e = t.sent(), this._handlePlaybackError(e), [3, 5];
              case 5:
                return [2, Promise.resolve()]
            }
          })
        })
      }, MusicKitInstance.prototype.seekForward = function () {
        return __awaiter(this, void 0, void 0, function () {
          var e;
          return __generator(this, function (t) {
            switch (t.label) {
              case 0:
                return this._checkAuthorization() ? [4, this.authorize()] : [3, 2];
              case 1:
                t.sent(), t.label = 2;
              case 2:
                return t.trys.push([2, 4, , 5]), [4, this.player.seekForward()];
              case 3:
                return t.sent(), [3, 5];
              case 4:
                return e = t.sent(), this._handlePlaybackError(e), [3, 5];
              case 5:
                return [2, Promise.resolve()]
            }
          })
        })
      }, MusicKitInstance.prototype.seekBackward = function () {
        return __awaiter(this, void 0, void 0, function () {
          var e;
          return __generator(this, function (t) {
            switch (t.label) {
              case 0:
                return this._checkAuthorization() ? [4, this.authorize()] : [3, 2];
              case 1:
                t.sent(), t.label = 2;
              case 2:
                return t.trys.push([2, 4, , 5]), [4, this.player.seekBackward()];
              case 3:
                return t.sent(), [3, 5];
              case 4:
                return e = t.sent(), this._handlePlaybackError(e), [3, 5];
              case 5:
                return [2, Promise.resolve()]
            }
          })
        })
      }, MusicKitInstance.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
          var e;
          return __generator(this, function (t) {
            switch (t.label) {
              case 0:
                return t.trys.push([0, 2, , 3]), [4, this.player.stop()];
              case 1:
                return t.sent(), [3, 3];
              case 2:
                return e = t.sent(), this._handlePlaybackError(e), [3, 3];
              case 3:
                return [2, Promise.resolve()]
            }
          })
        })
      }, MusicKitInstance.prototype.unauthorize = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (e) {
            return this.storekit.revokeUserToken(), [2]
          })
        })
      }, MusicKitInstance.prototype._dataForQueueOptions = function (e) {
        return __awaiter(this, void 0, void 0, function () {
          var t, r, i, n, o, a, s, u, c, l, d;
          return __generator(this, function (p) {
            switch (p.label) {
              case 0:
                if (t = e, e.url && (r = formattedMediaURL(e.url), i = r.contentId, n = r.kind, o = r.storefrontId, e[n] = i, this.storefrontId = o), e.station) throw new MKError(MKError.UNSUPPORTED_ERROR, "station is not a supported option.");
                return e.albums && (e.album = e.albums[0]), e.playlists && (e.playlist = e.playlists[0]), e.song && (e.songs = [e.song]), (a = e.songs ? e.songs[0] : e.album || e.playlist) ? (s = isLibraryType(a), u = s ? this.api.library : this.api, s ? [4, this.authorize()] : [3, 2]) : [3, 8];
              case 1:
                p.sent(), p.label = 2;
              case 2:
                return e.album ? (c = t, [4, u.album(a, e.parameters)]) : [3, 4];
              case 3:
                return c.loaded = p.sent(), [3, 8];
              case 4:
                return e.playlist ? (l = t, [4, u.playlist(a, e.parameters)]) : [3, 6];
              case 5:
                return l.loaded = p.sent(), [3, 8];
              case 6:
                return e.songs ? (d = t, [4, u.songs(e.songs, e.parameters)]) : [3, 8];
              case 7:
                d.loaded = p.sent(), p.label = 8;
              case 8:
                return [2, t]
            }
          })
        })
      }, MusicKitInstance.prototype._handlePlaybackError = function (e) {
        globalConfig.logger.log("mediaPlaybackError", e), this.dispatchEvent(Ke.mediaPlaybackError, e), this._playbackErrorDialog && e.hasOwnProperty("presentDialog") && e.presentDialog()
      }, MusicKitInstance.prototype._checkAuthorization = function () {
        return !this.player.isReady
      }, MusicKitInstance
    }(Playback),
    Si = {
      classes: {
        HIDE: "none",
        SHOW: ""
      }
    },
    ki = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
      setTimeout(e, 16)
    },
    DOMSupport = function () {
      function DOMSupport(e, t) {
        void 0 === e && (e = void 0), void 0 === t && (t = Si.classes);
        var r = this;
        if (this.elements = e, this.classes = t, !document || "function" != typeof MutationObserver || !e) return this.elements = void 0, void(this.identifiers = []);
        this.identifiers = Object.keys(e), this.identifiers.forEach(function (t) {
          for (var i = r._nodesForDefinitionId(t), n = 0; n < i.length; ++n) {
            var o = i[n];
            r.attach(o, e[t])
          }
        }), new MutationObserver(this._mutationDidOccur.bind(this)).observe(document.body, {
          attributes: !0,
          childList: !0,
          subtree: !0
        })
      }
      return DOMSupport.prototype.attach = function (e, t) {
        void 0 === t && (t = this.elements[e.id]), !e.innerText && t.defaultText && (e.innerText = t.defaultText), t.click && e.addEventListener("mouseup", t.click), this._renderDefinition(e, t)
      }, DOMSupport.prototype.detach = function (e, t) {
        void 0 === t && (t = this.elements[e.id]), t && t.click && e.removeEventListener("mouseup", t.click)
      }, DOMSupport.prototype.update = function (e) {
        var t = this;
        void 0 === e && (e = this.identifiers), this.elements && ki(function () {
          e.forEach(function (e) {
            for (var r = t.elements[e], i = t._nodesForDefinitionId(e), n = 0; n < i.length; ++n) {
              var o = i[n];
              r && o && t._renderDefinition(o, r)
            }
          })
        })
      }, DOMSupport.prototype._mutationDidOccur = function (e) {
        var t = this;
        e.forEach(function (e) {
          if ("attributes" === e.type) {
            var r = t.elements[e.attributeName];
            r && t.attach(e.target, r)
          }
          for (var i = function (r) {
              var i = e.addedNodes[r];
              if (!i.id && !i.dataset) return "continue";
              i.id && t.elements[i.id] && t.attach(i, t.elements[i.id]), t.identifiers.forEach(function (e) {
                i.getAttribute(e) && t.attach(i, t.elements[e])
              })
            }, n = 0; n < e.addedNodes.length; ++n) i(n);
          for (var o = function (r) {
              var i = e.removedNodes[r];
              if (!i.id && !i.dataset) return "continue";
              i.id && t.elements[i.id] && t.detach(i, t.elements[i.id]), t.identifiers.forEach(function (e) {
                i.getAttribute(e) && t.detach(i, t.elements[e])
              })
            }, a = 0; a < e.removedNodes.length; ++a) o(a)
        })
      }, DOMSupport.prototype._nodesForDefinitionId = function (e) {
        var t = /^data-/.test(e) ? "[" + e + "]" : "#" + e;
        return document.querySelectorAll(t)
      }, DOMSupport.prototype._renderDefinition = function (e, t) {
        var r = this,
          i = "function" == typeof t.enabled ? t.enabled(e) : t.enabled || !0,
          n = "function" == typeof t.display ? t.display(e) : t.display || !0;
        ki(function () {
          i ? e.removeAttribute("disabled") : e.setAttribute("disabled", !0), e.style.display = n ? r.classes.SHOW : r.classes.HIDE, n && 0 === e.children.length && t.content && (e.innerText = t.content(e))
        })
      }, DOMSupport
    }(),
    Ti = /^http(?:s)?\:\/\/(?:itunes|(embed\.)?(music|podcast))\.apple\.com/i,
    Ii = ["allow-forms", "allow-popups", "allow-same-origin", "allow-scripts", "allow-storage-access-by-user-activation", "allow-top-navigation-by-user-activation"];
  var musicKitInstance, Ci = MKError.errors,
    Di = "undefined" != typeof window && "undefined" != typeof document,
    Ri = "apple-music-now-playing";

  function dispatchDocumentEvent(e) {
    var t = document.createEvent("Event");
    t.initEvent(e, !0, !0), setTimeout(function () {
      return document.dispatchEvent(t)
    })
  }

  function isPlayingContainerOrItem(e, t) {
    if (!e || !t) return !1;
    if (te.test(e)) {
      var r = formattedMediaURL(e).contentId;
      r && (e = r)
    }
    return e === t.id || t.container && t.container.id === e
  }

  function configure(e) {
    if (!e) throw new MKError(MKError.INVALID_ARGUMENTS, "configuration required");
    var t, r, i, n, o, a, s, u, c = e.declarativeMarkup,
      l = e.developerToken,
      d = e.mergeQueryParams;
    if (!l) throw new MKError(MKError.CONFIGURATION_ERROR, "Missing developer token");
    return d && Di && window.location && (e.linkParameters = Object.assign(e.linkParameters || {}, Re(window.location.href))), musicKitInstance && musicKitInstance.cleanup(), musicKitInstance = new MusicKitInstance(l, e), c && (r = {
      defaultText: "Sign In to Apple Music",
      click: (t = musicKitInstance).authorize.bind(t),
      display: function () {
        return t.player.canSupportDRM && !t.isAuthorized
      }
    }, i = {
      content: function () {
        return formatMediaTime(t.player.currentPlaybackDuration)
      },
      display: function () {
        return t.player.nowPlayingItem
      }
    }, n = {
      content: function () {
        return Math.round(100 * t.player.currentPlaybackProgress) + "%"
      },
      display: function () {
        return t.player.nowPlayingItem
      }
    }, o = {
      content: function () {
        return formatMediaTime(t.player.currentPlaybackTime)
      },
      display: function () {
        return t.player.nowPlayingItem
      }
    }, a = {
      click: function (e) {
        var t = e.target;
        t.togglePlaybackTime = !t.togglePlaybackTime
      },
      content: function (e) {
        return formatMediaTime(e.togglePlaybackTime ? t.player.currentPlaybackDuration : t.player.currentPlaybackTimeRemaining)
      },
      display: function () {
        return t.player.nowPlayingItem
      }
    }, s = {
      defaultText: "Sign Out of Apple Music",
      click: t.unauthorize.bind(t),
      display: function () {
        return t.player.canSupportDRM && t.isAuthorized
      }
    }, u = new DOMSupport({
      "apple-music-authorize": r,
      "apple-music-current-playback-duration": i,
      "apple-music-current-playback-progress": n,
      "apple-music-current-playback-time": o,
      "apple-music-current-playback-time-remaining": a,
      "apple-music-unauthorize": s,
      "data-apple-music-authorize": r,
      "data-apple-music-add-to-library": {
        click: function (e) {
          var r = e.target.dataset,
            i = r.appleMusicAddToLibrary,
            n = r.appleMusicType;
          t.addToLibrary(i, n)
        }
      },
      "data-apple-music-current-playback-duration": i,
      "data-apple-music-current-playback-progress": n,
      "data-apple-music-current-playback-time": o,
      "data-apple-music-current-playback-time-remaining": a,
      "data-apple-music-now-playing": {
        content: function (e) {
          var r = e.dataset.appleMusicNowPlaying || "info",
            i = We(t.player.nowPlayingItem, r);
          if (!(/artworkurl$/i.test(r) && e.height && e.width)) return i;
          e.src = formatArtworkURL({
            url: i
          }, e.height, e.width)
        },
        display: function () {
          return t.player.nowPlayingItem
        }
      },
      "data-apple-music-skip-to-next-item": {
        defaultText: "Next",
        click: t.skipToNextItem.bind(t),
        enabled: function () {
          return !t.player.queue.isEmpty
        }
      },
      "data-apple-music-seek-forward": {
        defaultText: "Seek Forward",
        click: t.seekForward.bind(t),
        enabled: function () {
          return !t.player.queue.isEmpty
        }
      },
      "data-apple-music-seek-backward": {
        defaultText: "Seek Backward",
        click: t.seekBackward.bind(t),
        enabled: function () {
          return !t.player.queue.isEmpty
        }
      },
      "data-apple-music-pause": {
        defaultText: "Pause",
        click: t.pause.bind(t),
        display: function () {
          return t.player.isPlaying
        }
      },
      "data-apple-music-play": {
        defaultText: "Play",
        click: t.play.bind(t),
        display: function () {
          return !t.player.isPlaying
        },
        enabled: function () {
          return !t.player.queue.isEmpty
        }
      },
      "data-apple-music-set-queue": {
        click: function (e) {
          var r = e.target.dataset,
            i = r.appleMusicAutoplay,
            n = r.appleMusicSetQueue,
            o = r.appleMusicType;
          if (isPlayingContainerOrItem(n, t.player.nowPlayingItem)) return t.player.isPlaying ? t.pause() : t.play();
          o || (o = te.test(n) ? "url" : /^pl\./i.test(n) ? "playlist" : "album");
          var a = {};
          a[o] = n, t.setQueue(a).then(function (e) {
            "false" !== i && t.play()
          })
        },
        display: function (e) {
          if (t.player.nowPlayingItem) {
            var r = e.dataset,
              i = r.appleMusicSetQueue;
            r.appleMusicType, isPlayingContainerOrItem(i, t.player.nowPlayingItem) ? e.classList.add(Ri) : e.classList.remove(Ri)
          }
          return !0
        }
      },
      "data-apple-music-skip-to-previous-item": {
        defaultText: "Previous",
        click: t.skipToPreviousItem.bind(t),
        enabled: function () {
          return !t.player.queue.isEmpty
        }
      },
      "data-apple-music-unauthorize": s
    }), t.addEventListener(Ke.authorizationStatusDidChange, function () {
      u.update(["apple-music-authorize", "apple-music-unauthorize", "data-apple-music-authorize", "data-apple-music-unauthorize"])
    }), t.addEventListener(Ke.playbackStateDidChange, function () {
      u.update(["data-apple-music-pause", "data-apple-music-play", "data-apple-music-skip-to-next-item", "data-apple-music-skip-to-previous-item", "data-apple-music-seek-forward", "data-apple-music-seek-backward"])
    }), t.addEventListener(Ke.mediaItemDidChange, function () {
      u.update(["data-apple-music-now-playing", "data-apple-music-set-queue"])
    }), t.addEventListener(Ke.playbackDurationDidChange, function () {
      u.update(["apple-music-current-playback-duration", "data-apple-music-current-playback-duration"])
    }), t.addEventListener(Ke.playbackProgressDidChange, function () {
      u.update(["apple-music-current-playback-progress", "data-apple-music-current-playback-progress"])
    }), t.addEventListener(Ke.playbackTimeDidChange, function () {
      u.update(["apple-music-current-playback-time", "apple-music-current-playback-time-remaining", "data-apple-music-current-playback-time", "data-apple-music-current-playback-time-remaining"])
    }), t.addEventListener(Ke.queueItemsDidChange, function () {
      u.update(["data-apple-music-pause", "data-apple-music-play", "data-apple-music-skip-to-next-item", "data-apple-music-skip-to-previous-item", "data-apple-music-seek-forward", "data-apple-music-seek-backward"])
    })), dispatchDocumentEvent(Ke.configured), musicKitInstance
  }
  if (Di) {
    dispatchDocumentEvent(Ke.loaded);
    var Oi = function () {
        function meta(e) {
          var t = document.head.querySelector("meta[name=" + e + "]");
          return t && t.content ? t.content : void 0
        }
        var e, t = meta("apple-music-developer-token") || meta("JWT"),
          r = meta("apple-music-app-build") || meta("version"),
          i = meta("apple-music-app-name"),
          n = meta("apple-music-app-version");
        return (t || r || i || n) && (e = {}, t && (e.developerToken = t), (r || i || n) && (e.app = {}, r && (e.app.build = r), i && (e.app.name = i), n && (e.app.version = n))), e
      }(),
      Mi = /interactive|complete|loaded/.test(document.readyState);
    Oi && Oi.developerToken && !Mi && !musicKitInstance && (Oi.declarativeMarkup = !0, document.addEventListener("DOMContentLoaded", function () {
      return configure(Oi)
    }))
  }
  e.errors = Ci, e.Events = Ke, e.MediaItem = MediaItem, e.MKError = MKError, e.formatArtworkURL = formatArtworkURL, e.formatMediaTime = formatMediaTime, e.configure = configure, e.getInstance = function () {
    if (!musicKitInstance) throw new MKError(MKError.CONFIGURATION_ERROR, "No configured instance");
    return musicKitInstance
  }, e.Queue = Queue, e.version = Pi, e.formattedMediaURL = formattedMediaURL, e.formattedMilliseconds = function (e) {
    return formattedSeconds(e / 1e3)
  }, e.formattedSeconds = formattedSeconds, e.generateEmbedCode = function (e, t) {
    if (void 0 === t && (t = {
        height: "450",
        width: "660"
      }), !Ti.test(e)) throw new Error("Invalid content url");
    "song" === formattedMediaURL(e).kind && (t.height = "150"), t.height = ("" + t.height).replace(/(\d+)px/i, "$1"), t.width = ("" + t.width).replace(/^(\d+)(?!px)%?$/i, "$1px");
    var r = "width:100%;max-width:" + t.width + ";overflow:hidden;background:transparent;",
      i = window.localStorage.getItem("mk-generate-swizzle") || "https://embed.music.apple.com";
    return '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="' + t.height + '" style="' + r + '" sandbox="' + Ii.join(" ") + '" src="' + e.replace(Ti, i) + '"></iframe>'
  }, Object.defineProperty(e, "__esModule", {
    value: !0
  })
});
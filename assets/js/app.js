"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BarbaInit = function BarbaInit() {
  _classCallCheck(this, BarbaInit);

  var nav = document.querySelector('nav');
  var that = this;
  barba.init({
    debug: false,
    transitions: [{
      name: 'default',
      leave: function leave(data) {
        var $out = document.createElement('div');
        $out.classList.add('transition');
        data.current.container.appendChild($out);
        return gsap.from($out, {
          ease: "power2.out",
          duration: 0.5,
          x: '100vw'
        });
      },
      enter: function enter(data) {},
      afterEnter: function afterEnter(data) {
        data.current.container.style.display = 'none';
        var $in = document.createElement('div');
        $in.classList.add('transition');
        data.next.container.appendChild($in);
        return gsap.to($in, {
          ease: "power2.out",
          duration: 0.5,
          x: '-100vw'
        });
      }
    }, {
      name: 'aboutTransition',
      to: {
        namespace: ['about']
      },
      leave: function leave(data) {
        var $out = document.createElement('div');
        $out.classList.add('redTransition');
        data.current.container.appendChild($out);
        return gsap.from($out, {
          ease: "power2.out",
          duration: 0.5,
          x: '100vw'
        });
      },
      enter: function enter(data) {},
      afterEnter: function afterEnter(data) {
        data.current.container.style.display = 'none';
        var $in = document.createElement('div');
        $in.classList.add('redTransition');
        data.next.container.appendChild($in);
        return gsap.to($in, {
          ease: "power2.out",
          duration: 0.5,
          x: '-100vw'
        });
      }
    }, {
      name: 'aboutTransitionOut',
      from: {
        namespace: ['about']
      },
      leave: function leave(data) {
        var $out = document.createElement('div');
        $out.classList.add('redTransition');
        data.current.container.appendChild($out);
        return gsap.from($out, {
          ease: "power2.out",
          duration: 0.5,
          x: '100vw'
        });
      },
      enter: function enter(data) {},
      afterEnter: function afterEnter(data) {
        data.current.container.style.display = 'none';
        var $in = document.createElement('div');
        $in.classList.add('redTransition');
        data.next.container.appendChild($in);
        return gsap.to($in, {
          ease: "power2.out",
          duration: 0.5,
          x: '-100vw'
        });
      }
    }, {
      name: 'caseTransition',
      from: {
        namespace: ['case']
      },
      to: {
        namespace: ['case']
      },
      beforeLeave: function beforeLeave(data) {
        var $nextCase = data.current.container.querySelector('.next-case>.hero');
        var $others = [data.current.container.querySelector('.next-case>.arrow'), data.current.container.querySelector('.react')];
        gsap.to($others, {
          ease: "power4.out",
          duration: 1,
          y: -$nextCase.getBoundingClientRect().top - 200
        });
        return gsap.to($nextCase, {
          ease: "power4.out",
          duration: 1,
          height: '82vh',
          y: -$nextCase.getBoundingClientRect().top
        });
      },
      enter: function enter(data) {},
      afterEnter: function afterEnter(data) {
        var $intro = data.next.container.querySelector('.intro');
        gsap.to(data.current.container, {
          duration: 0,
          opacity: 0
        });
        return gsap.from($intro, {
          ease: "power4.out",
          duration: 1,
          y: 200,
          opacity: 0
        });
      }
    }],
    views: [{
      namespace: 'home',
      beforeEnter: function beforeEnter(data) {
        that.menu = new Menu(data.next.container);
        that.eyeballs = new Eyeballs(data.next.container);
        gsap.to(nav, {
          ease: "power4.out",
          duration: 1,
          y: '-100px'
        });
      },
      afterLeave: function afterLeave() {
        gsap.to(nav, {
          ease: "power4.out",
          duration: 1,
          y: '0px'
        });
      }
    }, {
      namespace: 'about',
      afterEnter: function afterEnter(data) {
        that.menu = new Menu(data.next.container);
        that.eyeballs = new Eyeballs(data.next.container);

        if (data.next.container.dataset.stuff) {
          data.next.container.scrollTo(0, data.next.container.querySelector('#stuff').offsetTop - 100);
        }
      }
    }, {
      namespace: 'case',
      afterEnter: function afterEnter(data) {
        that.fluidContainers = new FluidContainers(data.next.container);

        for (var _i = 0, _Array$from = Array.from(data.next.container.querySelectorAll(".js-autoplay")); _i < _Array$from.length; _i++) {
          var $autoplay = _Array$from[_i];

          if ($autoplay.paused) {
            $autoplay.play();
          }
        }

        if (data.next.container.querySelector('.gallery-grid')) {
          var gallery = new Gallery(data.next.container);
        }

        var $react = data.next.container.querySelector('.react');

        if ($react) {
          var threshold = $react.offsetTop - 0.5 * windowSize[1];
          var react = anims.react($react);
          var playing = false;
          data.next.container.addEventListener('scroll', function () {
            if (data.next.container.scrollTop > threshold && !playing) {
              playing = true;
              react.play();
            }
          });
        }
      }
    }, {
      namespace: 'work',
      afterEnter: function afterEnter(data) {
        gsap.to(nav, {
          ease: "power4.out",
          duration: 1,
          y: '-100px'
        });
        var videoContainer = data.next.container.querySelector('.showreel');
        var video = videoContainer.querySelector('video');
        var columns = data.next.container.querySelectorAll(".column");
        video.play();
        that.fluidContainers = new FluidContainers(data.next.container);
        data.next.container.addEventListener('scroll', function () {
          if (!video.paused && data.next.container.scrollTop > window.innerHeight / 4) {
            video.pause();
          } else if (video.paused && data.next.container.scrollTop < window.innerHeight / 4) {
            video.play();
          }
        });
        video.addEventListener('click', function () {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        });
        video.addEventListener('dblclick', function () {
          video.requestFullscreen();
        });
        video.addEventListener('ended', function () {
          video.currentTime = 0;
          data.next.container.scrollTo(0, 200);
        });
        video.addEventListener('waiting', function () {
          videoContainer.classList.add('load');
          videoContainer.classList.remove('paused');
        });
        video.addEventListener('pause', function () {
          videoContainer.classList.add('paused');
          videoContainer.classList.remove('load');
          gsap.to(nav, {
            ease: "power4.out",
            duration: 1,
            y: '0px'
          });

          if (window.innerWidth > 499) {
            gsap.to(columns[0], {
              ease: "power4.out",
              duration: 1,
              y: '-195'
            });
          } else {
            gsap.to(columns[0], {
              ease: "power4.out",
              duration: 1,
              y: '-100'
            });
          }

          gsap.to(columns[1], {
            ease: "power4.out",
            duration: 1,
            y: '-100'
          });
        });
        video.addEventListener('playing', function () {
          videoContainer.classList.remove('paused');
          videoContainer.classList.remove('load');
          gsap.to(nav, {
            ease: "power4.out",
            duration: 1,
            y: '-100px'
          });
          gsap.to(columns[0], {
            ease: "power4.out",
            duration: 1,
            y: '0'
          });
          gsap.to(columns[1], {
            ease: "power4.out",
            duration: 1,
            y: '0'
          });
        });
      }
    }]
  });
  barba.hooks.after(function () {
    gtag('config', 'UA-113302800-2', {
      'page_path': window.location.pathname
    });
  });
};
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Eyeballs = /*#__PURE__*/function () {
  function Eyeballs(container) {
    _classCallCheck(this, Eyeballs);

    this.container = container;
    this.windowSize = [window.innerWidth, window.innerHeight];
    this.element = this.container.querySelectorAll('.js-eyeballs');
    this.listen();
  }

  _createClass(Eyeballs, [{
    key: "listen",
    value: function listen() {
      var _this = this;

      var pi = Math.PI;
      window.addEventListener('mousemove', function (e) {
        var mouseX = e.clientX / _this.windowSize[0] - 0.5;
        var mouseY = e.clientY / _this.windowSize[1] - 0.5;
        var hypo = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
        var angle = mouseY > 0 ? Math.acos(mouseX / hypo) * 180 / pi : 360 - Math.acos(mouseX / hypo) * 180 / pi;
        _this.element[0].style.transform = "rotate(".concat(angle, "deg) translateX(").concat(hypo >= 0.5 ? 20 : hypo * 40, "px)");
        _this.element[1].style.transform = "rotate(".concat(angle, "deg) translateX(").concat(hypo >= 0.5 ? 20 : hypo * 40, "px)");
      });
    }
  }]);

  return Eyeballs;
}();
"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FluidContainers = /*#__PURE__*/function () {
  function FluidContainers(container) {
    _classCallCheck(this, FluidContainers);

    this.elements = Array.from(container.querySelectorAll('.js-fluid-container'));
    this.adapt();
  }

  _createClass(FluidContainers, [{
    key: "adapt",
    value: function adapt() {
      var _iterator = _createForOfIteratorHelper(this.elements),
          _step;

      try {
        var _loop = function _loop() {
          var element = _step.value;
          var img = element.querySelector('img');

          if (img.complete) {
            if (element.offsetHeight / element.offsetWidth > img.offsetHeight / img.offsetWidth) {
              element.querySelector('img').style.width = 'auto';
              element.querySelector('img').style.height = '100%';
            } else {
              element.querySelector('img').style.width = '100%';
              element.querySelector('img').style.height = 'auto';
            }
          } else {
            img.addEventListener('load', function () {
              if (element.offsetHeight / element.offsetWidth > img.offsetHeight / img.offsetWidth) {
                element.querySelector('img').style.width = 'auto';
                element.querySelector('img').style.height = '100%';
              } else {
                element.querySelector('img').style.width = '100%';
                element.querySelector('img').style.height = 'auto';
              }
            });
          }
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return FluidContainers;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Gallery = /*#__PURE__*/function () {
  function Gallery(container) {
    _classCallCheck(this, Gallery);

    this.container = container;
    var $columns = Array.from(container.querySelectorAll('.column'));
    var $projects = Array.from(container.querySelectorAll('.gallery-project'));
    this.parallax($columns);
    this.lazyload($projects);
  }

  _createClass(Gallery, [{
    key: "parallax",
    value: function parallax($columns) {
      var _this = this;

      if (window.innerWidth > 999) {
        this.container.addEventListener('scroll', function () {
          var scroll = _this.container.scrollTop;
          $columns[1].style.transform = "translateY(-".concat(scroll / 5, "px)");
          $columns[2].style.transform = "translateY(-".concat(scroll / 10, "px)");
        });
      } else if (window.innerWidth > 499) {
        this.container.addEventListener('scroll', function () {
          var scroll = _this.container.scrollTop;
          $columns[1].style.transform = "translateY(-".concat(scroll / 10, "px)");
          $columns[4].style.transform = "translateY(-".concat(scroll / 10, "px)");
        });
      }
    }
  }, {
    key: "lazyload",
    value: function lazyload($projects) {
      var _this2 = this;

      var windowHeight = window.innerHeight;
      this.container.addEventListener('scroll', function () {
        var _loop = function _loop(i) {
          var $project = $projects[i];

          if ($project.getBoundingClientRect().top < 0.8 * windowHeight) {
            if ($project.complete || $project.readyState >= 2) {
              gsap.to($project, {
                duration: 0.4,
                opacity: 1
              });
            } else if ($project.nodeName == 'IMG') {
              $project.addEventListener('load', function () {
                gsap.to($project, {
                  duration: 0.4,
                  opacity: 1
                });
              });
            } else {
              $project.addEventListener('loadeddata', function () {
                gsap.to($project, {
                  duration: 0.4,
                  opacity: 1
                });
              });
            }

            $project.addEventListener('click', function () {
              _this2.viewer($project);
            });
            $projects.splice(i, 1);
          }
        };

        for (var i = 0; i < $projects.length; i++) {
          _loop(i);
        }
      });
    }
  }, {
    key: "viewer",
    value: function viewer($project) {
      var $viewer = document.createElement('div');
      $viewer.classList.add('viewer');
      this.container.appendChild($viewer);
      $viewer.appendChild($project.cloneNode(true));
      $viewer.addEventListener('click', function () {
        $viewer.remove();
      });
    }
  }]);

  return Gallery;
}();
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LottieAnimations = /*#__PURE__*/function () {
  function LottieAnimations(path) {
    _classCallCheck(this, LottieAnimations);

    typeof navigator !== "undefined" && function (root, factory) {
      if (typeof define === "function" && define.amd) {
        define(function () {
          return factory(root);
        });
      } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        module.exports = factory(root);
      } else {
        root.lottie = factory(root);
        root.bodymovin = root.lottie;
      }
    }(window || {}, function (window) {
      "use strict";

      var h,
          e = "http://www.w3.org/2000/svg",
          A = "",
          i = -999999,
          s = !0,
          _ = (/^((?!chrome|android).)*safari/i.test(navigator.userAgent), Math.round, Math.pow),
          k = Math.sqrt,
          c = (Math.abs, Math.floor),
          d = (Math.max, Math.min),
          a = {};

      !function () {
        var t,
            e = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"],
            i = e.length;

        for (t = 0; t < i; t += 1) {
          a[e[t]] = Math[e[t]];
        }
      }(), a.random = Math.random, a.abs = function (t) {
        if ("object" === _typeof(t) && t.length) {
          var e,
              i = x(t.length),
              s = t.length;

          for (e = 0; e < s; e += 1) {
            i[e] = Math.abs(t[e]);
          }

          return i;
        }

        return Math.abs(t);
      };
      var M = 150,
          q = Math.PI / 180,
          y = .5519;

      function r(t) {
        t ? Math.round : function (t) {
          return t;
        };
      }

      function n(t, e, i, s) {
        this.type = t, this.currentTime = e, this.totalTime = i, this.direction = s < 0 ? -1 : 1;
      }

      function o(t, e) {
        this.type = t, this.direction = e < 0 ? -1 : 1;
      }

      function l(t, e, i, s) {
        this.type = t, this.currentLoop = i, this.totalLoops = e, this.direction = s < 0 ? -1 : 1;
      }

      function p(t, e, i) {
        this.type = t, this.firstFrame = e, this.totalFrames = i;
      }

      function f(t, e) {
        this.type = t, this.target = e;
      }

      function m(t, e) {
        this.type = "renderFrameError", this.nativeError = t, this.currentTime = e;
      }

      function u(t) {
        this.type = "configError", this.nativeError = t;
      }

      r(!1);
      var t,
          C = (t = 0, function () {
        return "__lottie_element_" + ++t;
      });

      function g(t, e, i) {
        var s, a, r, n, h, o, l, p;

        switch (o = i * (1 - e), l = i * (1 - (h = 6 * t - (n = Math.floor(6 * t))) * e), p = i * (1 - (1 - h) * e), n % 6) {
          case 0:
            s = i, a = p, r = o;
            break;

          case 1:
            s = l, a = i, r = o;
            break;

          case 2:
            s = o, a = i, r = p;
            break;

          case 3:
            s = o, a = l, r = i;
            break;

          case 4:
            s = p, a = o, r = i;
            break;

          case 5:
            s = i, a = o, r = l;
        }

        return [s, a, r];
      }

      function v(t, e, i) {
        var s,
            a = Math.max(t, e, i),
            r = Math.min(t, e, i),
            n = a - r,
            h = 0 === a ? 0 : n / a,
            o = a / 255;

        switch (a) {
          case r:
            s = 0;
            break;

          case t:
            s = e - i + n * (e < i ? 6 : 0), s /= 6 * n;
            break;

          case e:
            s = i - t + 2 * n, s /= 6 * n;
            break;

          case i:
            s = t - e + 4 * n, s /= 6 * n;
        }

        return [s, h, o];
      }

      function lt(t, e) {
        var i = v(255 * t[0], 255 * t[1], 255 * t[2]);
        return i[1] += e, 1 < i[1] ? i[1] = 1 : i[1] <= 0 && (i[1] = 0), g(i[0], i[1], i[2]);
      }

      function pt(t, e) {
        var i = v(255 * t[0], 255 * t[1], 255 * t[2]);
        return i[2] += e, 1 < i[2] ? i[2] = 1 : i[2] < 0 && (i[2] = 0), g(i[0], i[1], i[2]);
      }

      function ft(t, e) {
        var i = v(255 * t[0], 255 * t[1], 255 * t[2]);
        return i[0] += e / 360, 1 < i[0] ? i[0] -= 1 : i[0] < 0 && (i[0] += 1), g(i[0], i[1], i[2]);
      }

      var b = function () {
        var t,
            e,
            s = [];

        for (t = 0; t < 256; t += 1) {
          e = t.toString(16), s[t] = 1 == e.length ? "0" + e : e;
        }

        return function (t, e, i) {
          return t < 0 && (t = 0), e < 0 && (e = 0), i < 0 && (i = 0), "#" + s[t] + s[e] + s[i];
        };
      }();

      function P() {}

      P.prototype = {
        triggerEvent: function triggerEvent(t, e) {
          if (this._cbs[t]) for (var i = this._cbs[t].length, s = 0; s < i; s++) {
            this._cbs[t][s](e);
          }
        },
        addEventListener: function addEventListener(t, e) {
          return this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(e), function () {
            this.removeEventListener(t, e);
          }.bind(this);
        },
        removeEventListener: function removeEventListener(t, e) {
          if (e) {
            if (this._cbs[t]) {
              for (var i = 0, s = this._cbs[t].length; i < s;) {
                this._cbs[t][i] === e && (this._cbs[t].splice(i, 1), i -= 1, s -= 1), i += 1;
              }

              this._cbs[t].length || (this._cbs[t] = null);
            }
          } else this._cbs[t] = null;
        }
      };
      var j = "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? function (t, e) {
        return "float32" === t ? new Float32Array(e) : "int16" === t ? new Int16Array(e) : "uint8c" === t ? new Uint8ClampedArray(e) : void 0;
      } : function (t, e) {
        var i,
            s = 0,
            a = [];

        switch (t) {
          case "int16":
          case "uint8c":
            i = 1;
            break;

          default:
            i = 1.1;
        }

        for (s = 0; s < e; s += 1) {
          a.push(i);
        }

        return a;
      };

      function x(t) {
        return Array.apply(null, {
          length: t
        });
      }

      function S(t) {
        return document.createElementNS(e, t);
      }

      function w(t) {
        return document.createElement(t);
      }

      function E() {}

      E.prototype = {
        addDynamicProperty: function addDynamicProperty(t) {
          -1 === this.dynamicProperties.indexOf(t) && (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), this._isAnimated = !0);
        },
        iterateDynamicProperties: function iterateDynamicProperties() {
          this._mdf = !1;
          var t,
              e = this.dynamicProperties.length;

          for (t = 0; t < e; t += 1) {
            this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0);
          }
        },
        initDynamicPropertyContainer: function initDynamicPropertyContainer(t) {
          this.container = t, this.dynamicProperties = [], this._mdf = !1, this._isAnimated = !1;
        }
      };

      var F,
          D = (F = {
        0: "source-over",
        1: "multiply",
        2: "screen",
        3: "overlay",
        4: "darken",
        5: "lighten",
        6: "color-dodge",
        7: "color-burn",
        8: "hard-light",
        9: "soft-light",
        10: "difference",
        11: "exclusion",
        12: "hue",
        13: "saturation",
        14: "color",
        15: "luminosity"
      }, function (t) {
        return F[t] || "";
      }),
          I = function () {
        var a = Math.cos,
            r = Math.sin,
            n = Math.tan,
            s = Math.round;

        function t() {
          return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this;
        }

        function e(t) {
          if (0 === t) return this;
          var e = a(t),
              i = r(t);
          return this._t(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        function i(t) {
          if (0 === t) return this;
          var e = a(t),
              i = r(t);
          return this._t(1, 0, 0, 0, 0, e, -i, 0, 0, i, e, 0, 0, 0, 0, 1);
        }

        function h(t) {
          if (0 === t) return this;
          var e = a(t),
              i = r(t);
          return this._t(e, 0, i, 0, 0, 1, 0, 0, -i, 0, e, 0, 0, 0, 0, 1);
        }

        function o(t) {
          if (0 === t) return this;
          var e = a(t),
              i = r(t);
          return this._t(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        function l(t, e) {
          return this._t(1, e, t, 1, 0, 0);
        }

        function p(t, e) {
          return this.shear(n(t), n(e));
        }

        function f(t, e) {
          var i = a(e),
              s = r(e);
          return this._t(i, s, 0, 0, -s, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, n(t), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(i, -s, 0, 0, s, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        function d(t, e, i) {
          return i || 0 === i || (i = 1), 1 === t && 1 === e && 1 === i ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1);
        }

        function m(t, e, i, s, a, r, n, h, o, l, p, f, d, m, c, u) {
          return this.props[0] = t, this.props[1] = e, this.props[2] = i, this.props[3] = s, this.props[4] = a, this.props[5] = r, this.props[6] = n, this.props[7] = h, this.props[8] = o, this.props[9] = l, this.props[10] = p, this.props[11] = f, this.props[12] = d, this.props[13] = m, this.props[14] = c, this.props[15] = u, this;
        }

        function c(t, e, i) {
          return i = i || 0, 0 !== t || 0 !== e || 0 !== i ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, i, 1) : this;
        }

        function u(t, e, i, s, a, r, n, h, o, l, p, f, d, m, c, u) {
          var g = this.props;
          if (1 === t && 0 === e && 0 === i && 0 === s && 0 === a && 1 === r && 0 === n && 0 === h && 0 === o && 0 === l && 1 === p && 0 === f) return g[12] = g[12] * t + g[15] * d, g[13] = g[13] * r + g[15] * m, g[14] = g[14] * p + g[15] * c, g[15] = g[15] * u, this._identityCalculated = !1, this;
          var v = g[0],
              y = g[1],
              b = g[2],
              _ = g[3],
              k = g[4],
              A = g[5],
              M = g[6],
              C = g[7],
              P = g[8],
              x = g[9],
              S = g[10],
              w = g[11],
              E = g[12],
              F = g[13],
              D = g[14],
              T = g[15];
          return g[0] = v * t + y * a + b * o + _ * d, g[1] = v * e + y * r + b * l + _ * m, g[2] = v * i + y * n + b * p + _ * c, g[3] = v * s + y * h + b * f + _ * u, g[4] = k * t + A * a + M * o + C * d, g[5] = k * e + A * r + M * l + C * m, g[6] = k * i + A * n + M * p + C * c, g[7] = k * s + A * h + M * f + C * u, g[8] = P * t + x * a + S * o + w * d, g[9] = P * e + x * r + S * l + w * m, g[10] = P * i + x * n + S * p + w * c, g[11] = P * s + x * h + S * f + w * u, g[12] = E * t + F * a + D * o + T * d, g[13] = E * e + F * r + D * l + T * m, g[14] = E * i + F * n + D * p + T * c, g[15] = E * s + F * h + D * f + T * u, this._identityCalculated = !1, this;
        }

        function g() {
          return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]), this._identityCalculated = !0), this._identity;
        }

        function v(t) {
          for (var e = 0; e < 16;) {
            if (t.props[e] !== this.props[e]) return !1;
            e += 1;
          }

          return !0;
        }

        function y(t) {
          var e;

          for (e = 0; e < 16; e += 1) {
            t.props[e] = this.props[e];
          }
        }

        function b(t) {
          var e;

          for (e = 0; e < 16; e += 1) {
            this.props[e] = t[e];
          }
        }

        function _(t, e, i) {
          return {
            x: t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12],
            y: t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13],
            z: t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14]
          };
        }

        function k(t, e, i) {
          return t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12];
        }

        function A(t, e, i) {
          return t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13];
        }

        function M(t, e, i) {
          return t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14];
        }

        function C() {
          var t = this.props[0] * this.props[5] - this.props[1] * this.props[4],
              e = this.props[5] / t,
              i = -this.props[1] / t,
              s = -this.props[4] / t,
              a = this.props[0] / t,
              r = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / t,
              n = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / t,
              h = new I();
          return h.props[0] = e, h.props[1] = i, h.props[4] = s, h.props[5] = a, h.props[12] = r, h.props[13] = n, h;
        }

        function P(t) {
          return this.getInverseMatrix().applyToPointArray(t[0], t[1], t[2] || 0);
        }

        function x(t) {
          var e,
              i = t.length,
              s = [];

          for (e = 0; e < i; e += 1) {
            s[e] = P(t[e]);
          }

          return s;
        }

        function S(t, e, i) {
          var s = j("float32", 6);
          if (this.isIdentity()) s[0] = t[0], s[1] = t[1], s[2] = e[0], s[3] = e[1], s[4] = i[0], s[5] = i[1];else {
            var a = this.props[0],
                r = this.props[1],
                n = this.props[4],
                h = this.props[5],
                o = this.props[12],
                l = this.props[13];
            s[0] = t[0] * a + t[1] * n + o, s[1] = t[0] * r + t[1] * h + l, s[2] = e[0] * a + e[1] * n + o, s[3] = e[0] * r + e[1] * h + l, s[4] = i[0] * a + i[1] * n + o, s[5] = i[0] * r + i[1] * h + l;
          }
          return s;
        }

        function w(t, e, i) {
          return this.isIdentity() ? [t, e, i] : [t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14]];
        }

        function E(t, e) {
          if (this.isIdentity()) return t + "," + e;
          var i = this.props;
          return Math.round(100 * (t * i[0] + e * i[4] + i[12])) / 100 + "," + Math.round(100 * (t * i[1] + e * i[5] + i[13])) / 100;
        }

        function F() {
          for (var t = 0, e = this.props, i = "matrix3d("; t < 16;) {
            i += s(1e4 * e[t]) / 1e4, i += 15 === t ? ")" : ",", t += 1;
          }

          return i;
        }

        function D(t) {
          return t < 1e-6 && 0 < t || -1e-6 < t && t < 0 ? s(1e4 * t) / 1e4 : t;
        }

        function T() {
          var t = this.props;
          return "matrix(" + D(t[0]) + "," + D(t[1]) + "," + D(t[4]) + "," + D(t[5]) + "," + D(t[12]) + "," + D(t[13]) + ")";
        }

        return function () {
          this.reset = t, this.rotate = e, this.rotateX = i, this.rotateY = h, this.rotateZ = o, this.skew = p, this.skewFromAxis = f, this.shear = l, this.scale = d, this.setTransform = m, this.translate = c, this.transform = u, this.applyToPoint = _, this.applyToX = k, this.applyToY = A, this.applyToZ = M, this.applyToPointArray = w, this.applyToTriplePoints = S, this.applyToPointStringified = E, this.toCSS = F, this.to2dCSS = T, this.clone = y, this.cloneFromProps = b, this.equals = v, this.inversePoints = x, this.inversePoint = P, this.getInverseMatrix = C, this._t = this.transform, this.isIdentity = g, this._identity = !0, this._identityCalculated = !1, this.props = j("float32", 16), this.reset();
        };
      }();

      !function (h, o) {
        var l,
            p = this,
            f = 256,
            d = 6,
            m = "random",
            c = o.pow(f, d),
            u = o.pow(2, 52),
            g = 2 * u,
            v = f - 1;

        function y(t) {
          var e,
              i = t.length,
              n = this,
              s = 0,
              a = n.i = n.j = 0,
              r = n.S = [];

          for (i || (t = [i++]); s < f;) {
            r[s] = s++;
          }

          for (s = 0; s < f; s++) {
            r[s] = r[a = v & a + t[s % i] + (e = r[s])], r[a] = e;
          }

          n.g = function (t) {
            for (var e, i = 0, s = n.i, a = n.j, r = n.S; t--;) {
              e = r[s = v & s + 1], i = i * f + r[v & (r[s] = r[a = v & a + e]) + (r[a] = e)];
            }

            return n.i = s, n.j = a, i;
          };
        }

        function b(t, e) {
          return e.i = t.i, e.j = t.j, e.S = t.S.slice(), e;
        }

        function _(t, e) {
          for (var i, s = t + "", a = 0; a < s.length;) {
            e[v & a] = v & (i ^= 19 * e[v & a]) + s.charCodeAt(a++);
          }

          return k(e);
        }

        function k(t) {
          return String.fromCharCode.apply(0, t);
        }

        o["seed" + m] = function (t, e, i) {
          var s = [],
              a = _(function t(e, i) {
            var s,
                a = [],
                r = _typeof(e);

            if (i && "object" == r) for (s in e) {
              try {
                a.push(t(e[s], i - 1));
              } catch (t) {}
            }
            return a.length ? a : "string" == r ? e : e + "\0";
          }((e = !0 === e ? {
            entropy: !0
          } : e || {}).entropy ? [t, k(h)] : null === t ? function () {
            try {
              if (l) return k(l.randomBytes(f));
              var t = new Uint8Array(f);
              return (p.crypto || p.msCrypto).getRandomValues(t), k(t);
            } catch (t) {
              var e = p.navigator,
                  i = e && e.plugins;
              return [+new Date(), p, i, p.screen, k(h)];
            }
          }() : t, 3), s),
              r = new y(s),
              n = function n() {
            for (var t = r.g(d), e = c, i = 0; t < u;) {
              t = (t + i) * f, e *= f, i = r.g(1);
            }

            for (; g <= t;) {
              t /= 2, e /= 2, i >>>= 1;
            }

            return (t + i) / e;
          };

          return n.int32 = function () {
            return 0 | r.g(4);
          }, n.quick = function () {
            return r.g(4) / 4294967296;
          }, n["double"] = n, _(k(r.S), h), (e.pass || i || function (t, e, i, s) {
            return s && (s.S && b(s, r), t.state = function () {
              return b(r, {});
            }), i ? (o[m] = t, e) : t;
          })(n, a, "global" in e ? e.global : this == o, e.state);
        }, _(o.random(), h);
      }([], a);

      var G = function () {
        var t = {
          getBezierEasing: function getBezierEasing(t, e, i, s, a) {
            var r = a || ("bez_" + t + "_" + e + "_" + i + "_" + s).replace(/\./g, "p");
            if (h[r]) return h[r];
            var n = new o([t, e, i, s]);
            return h[r] = n;
          }
        },
            h = {};
        var l = 11,
            p = 1 / (l - 1),
            e = "function" == typeof Float32Array;

        function s(t, e) {
          return 1 - 3 * e + 3 * t;
        }

        function a(t, e) {
          return 3 * e - 6 * t;
        }

        function r(t) {
          return 3 * t;
        }

        function f(t, e, i) {
          return ((s(e, i) * t + a(e, i)) * t + r(e)) * t;
        }

        function d(t, e, i) {
          return 3 * s(e, i) * t * t + 2 * a(e, i) * t + r(e);
        }

        function o(t) {
          this._p = t, this._mSampleValues = e ? new Float32Array(l) : new Array(l), this._precomputed = !1, this.get = this.get.bind(this);
        }

        return o.prototype = {
          get: function get(t) {
            var e = this._p[0],
                i = this._p[1],
                s = this._p[2],
                a = this._p[3];
            return this._precomputed || this._precompute(), e === i && s === a ? t : 0 === t ? 0 : 1 === t ? 1 : f(this._getTForX(t), i, a);
          },
          _precompute: function _precompute() {
            var t = this._p[0],
                e = this._p[1],
                i = this._p[2],
                s = this._p[3];
            this._precomputed = !0, t === e && i === s || this._calcSampleValues();
          },
          _calcSampleValues: function _calcSampleValues() {
            for (var t = this._p[0], e = this._p[2], i = 0; i < l; ++i) {
              this._mSampleValues[i] = f(i * p, t, e);
            }
          },
          _getTForX: function _getTForX(t) {
            for (var e = this._p[0], i = this._p[2], s = this._mSampleValues, a = 0, r = 1, n = l - 1; r !== n && s[r] <= t; ++r) {
              a += p;
            }

            var h = a + (t - s[--r]) / (s[r + 1] - s[r]) * p,
                o = d(h, e, i);
            return .001 <= o ? function (t, e, i, s) {
              for (var a = 0; a < 4; ++a) {
                var r = d(e, i, s);
                if (0 === r) return e;
                e -= (f(e, i, s) - t) / r;
              }

              return e;
            }(t, h, e, i) : 0 === o ? h : function (t, e, i, s, a) {
              for (var r, n, h = 0; 0 < (r = f(n = e + (i - e) / 2, s, a) - t) ? i = n : e = n, 1e-7 < Math.abs(r) && ++h < 10;) {
                ;
              }

              return n;
            }(t, a, a + p, e, i);
          }
        }, t;
      }();

      function T(t, e) {
        var i,
            s,
            a = t.length;

        for (i = 0; i < a; i += 1) {
          for (var r in s = t[i].prototype) {
            s.hasOwnProperty(r) && (e.prototype[r] = s[r]);
          }
        }
      }

      !function () {
        for (var r = 0, t = ["ms", "moz", "webkit", "o"], e = 0; e < t.length && !window.requestAnimationFrame; ++e) {
          window.requestAnimationFrame = window[t[e] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[e] + "CancelAnimationFrame"] || window[t[e] + "CancelRequestAnimationFrame"];
        }

        window.requestAnimationFrame || (window.requestAnimationFrame = function (t, e) {
          var i = new Date().getTime(),
              s = Math.max(0, 16 - (i - r)),
              a = setTimeout(function () {
            t(i + s);
          }, s);
          return r = i + s, a;
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
          clearTimeout(t);
        });
      }();

      var dt = function () {
        function g(t, e, i, s, a, r) {
          var n = t * s + e * a + i * r - a * s - r * t - i * e;
          return -.001 < n && n < .001;
        }

        Math;

        var p = function p(t, e, i, s) {
          var a,
              r,
              n,
              h,
              o,
              l,
              p = M,
              f = 0,
              d = [],
              m = [],
              c = xt.newElement();

          for (n = i.length, a = 0; a < p; a += 1) {
            for (o = a / (p - 1), r = l = 0; r < n; r += 1) {
              h = _(1 - o, 3) * t[r] + 3 * _(1 - o, 2) * o * i[r] + 3 * (1 - o) * _(o, 2) * s[r] + _(o, 3) * e[r], d[r] = h, null !== m[r] && (l += _(d[r] - m[r], 2)), m[r] = d[r];
            }

            l && (f += l = k(l)), c.percents[a] = o, c.lengths[a] = f;
          }

          return c.addedLength = f, c;
        };

        function v(t) {
          this.segmentLength = 0, this.points = new Array(t);
        }

        function y(t, e) {
          this.partialLength = t, this.point = e;
        }

        var b,
            t = (b = {}, function (t, e, i, s) {
          var a = (t[0] + "_" + t[1] + "_" + e[0] + "_" + e[1] + "_" + i[0] + "_" + i[1] + "_" + s[0] + "_" + s[1]).replace(/\./g, "p");

          if (!b[a]) {
            var r,
                n,
                h,
                o,
                l,
                p,
                f,
                d = M,
                m = 0,
                c = null;
            2 === t.length && (t[0] != e[0] || t[1] != e[1]) && g(t[0], t[1], e[0], e[1], t[0] + i[0], t[1] + i[1]) && g(t[0], t[1], e[0], e[1], e[0] + s[0], e[1] + s[1]) && (d = 2);
            var u = new v(d);

            for (h = i.length, r = 0; r < d; r += 1) {
              for (f = x(h), l = r / (d - 1), n = p = 0; n < h; n += 1) {
                o = _(1 - l, 3) * t[n] + 3 * _(1 - l, 2) * l * (t[n] + i[n]) + 3 * (1 - l) * _(l, 2) * (e[n] + s[n]) + _(l, 3) * e[n], f[n] = o, null !== c && (p += _(f[n] - c[n], 2));
              }

              m += p = k(p), u.points[r] = new y(p, f), c = f;
            }

            u.segmentLength = m, b[a] = u;
          }

          return b[a];
        });

        function E(t, e) {
          var i = e.percents,
              s = e.lengths,
              a = i.length,
              r = c((a - 1) * t),
              n = t * e.addedLength,
              h = 0;
          if (r === a - 1 || 0 === r || n === s[r]) return i[r];

          for (var o = s[r] > n ? -1 : 1, l = !0; l;) {
            if (s[r] <= n && s[r + 1] > n ? (h = (n - s[r]) / (s[r + 1] - s[r]), l = !1) : r += o, r < 0 || a - 1 <= r) {
              if (r === a - 1) return i[r];
              l = !1;
            }
          }

          return i[r] + (i[r + 1] - i[r]) * h;
        }

        var F = j("float32", 8);
        return {
          getSegmentsLength: function getSegmentsLength(t) {
            var e,
                i = Pt.newElement(),
                s = t.c,
                a = t.v,
                r = t.o,
                n = t.i,
                h = t._length,
                o = i.lengths,
                l = 0;

            for (e = 0; e < h - 1; e += 1) {
              o[e] = p(a[e], a[e + 1], r[e], n[e + 1]), l += o[e].addedLength;
            }

            return s && h && (o[e] = p(a[e], a[0], r[e], n[0]), l += o[e].addedLength), i.totalLength = l, i;
          },
          getNewSegment: function getNewSegment(t, e, i, s, a, r, n) {
            var h,
                o = E(a = a < 0 ? 0 : 1 < a ? 1 : a, n),
                l = E(r = 1 < r ? 1 : r, n),
                p = t.length,
                f = 1 - o,
                d = 1 - l,
                m = f * f * f,
                c = o * f * f * 3,
                u = o * o * f * 3,
                g = o * o * o,
                v = f * f * d,
                y = o * f * d + f * o * d + f * f * l,
                b = o * o * d + f * o * l + o * f * l,
                _ = o * o * l,
                k = f * d * d,
                A = o * d * d + f * l * d + f * d * l,
                M = o * l * d + f * l * l + o * d * l,
                C = o * l * l,
                P = d * d * d,
                x = l * d * d + d * l * d + d * d * l,
                S = l * l * d + d * l * l + l * d * l,
                w = l * l * l;

            for (h = 0; h < p; h += 1) {
              F[4 * h] = Math.round(1e3 * (m * t[h] + c * i[h] + u * s[h] + g * e[h])) / 1e3, F[4 * h + 1] = Math.round(1e3 * (v * t[h] + y * i[h] + b * s[h] + _ * e[h])) / 1e3, F[4 * h + 2] = Math.round(1e3 * (k * t[h] + A * i[h] + M * s[h] + C * e[h])) / 1e3, F[4 * h + 3] = Math.round(1e3 * (P * t[h] + x * i[h] + S * s[h] + w * e[h])) / 1e3;
            }

            return F;
          },
          getPointInSegment: function getPointInSegment(t, e, i, s, a, r) {
            var n = E(a, r),
                h = 1 - n;
            return [Math.round(1e3 * (h * h * h * t[0] + (n * h * h + h * n * h + h * h * n) * i[0] + (n * n * h + h * n * n + n * h * n) * s[0] + n * n * n * e[0])) / 1e3, Math.round(1e3 * (h * h * h * t[1] + (n * h * h + h * n * h + h * h * n) * i[1] + (n * n * h + h * n * n + n * h * n) * s[1] + n * n * n * e[1])) / 1e3];
          },
          buildBezierData: t,
          pointOnLine2D: g,
          pointOnLine3D: function pointOnLine3D(t, e, i, s, a, r, n, h, o) {
            if (0 === i && 0 === r && 0 === o) return g(t, e, s, a, n, h);
            var l,
                p = Math.sqrt(Math.pow(s - t, 2) + Math.pow(a - e, 2) + Math.pow(r - i, 2)),
                f = Math.sqrt(Math.pow(n - t, 2) + Math.pow(h - e, 2) + Math.pow(o - i, 2)),
                d = Math.sqrt(Math.pow(n - s, 2) + Math.pow(h - a, 2) + Math.pow(o - r, 2));
            return -1e-4 < (l = f < p ? d < p ? p - f - d : d - f - p : f < d ? d - f - p : f - p - d) && l < 1e-4;
          }
        };
      }();

      var L = function () {
        function d(t, e, i) {
          var s,
              a,
              r,
              n,
              h,
              o,
              l,
              p = t.length;

          for (a = 0; a < p; a += 1) {
            if ("ks" in (s = t[a]) && !s.completed) {
              if (s.completed = !0, s.tt && (t[a - 1].td = s.tt), s.hasMask) {
                var f = s.masksProperties;

                for (n = f.length, r = 0; r < n; r += 1) {
                  if (f[r].pt.k.i) u(f[r].pt.k);else for (o = f[r].pt.k.length, h = 0; h < o; h += 1) {
                    f[r].pt.k[h].s && u(f[r].pt.k[h].s[0]), f[r].pt.k[h].e && u(f[r].pt.k[h].e[0]);
                  }
                }
              }

              0 === s.ty ? (s.layers = m(s.refId, e), d(s.layers, e, i)) : 4 === s.ty ? c(s.shapes) : 5 == s.ty && (0 !== (l = s).t.a.length || "m" in l.t.p || (l.singleShape = !0));
            }
          }
        }

        function m(t, e) {
          for (var i = 0, s = e.length; i < s;) {
            if (e[i].id === t) return e[i].layers.__used ? JSON.parse(JSON.stringify(e[i].layers)) : (e[i].layers.__used = !0, e[i].layers);
            i += 1;
          }
        }

        function c(t) {
          var e, i, s;

          for (e = t.length - 1; 0 <= e; e -= 1) {
            if ("sh" == t[e].ty) {
              if (t[e].ks.k.i) u(t[e].ks.k);else for (s = t[e].ks.k.length, i = 0; i < s; i += 1) {
                t[e].ks.k[i].s && u(t[e].ks.k[i].s[0]), t[e].ks.k[i].e && u(t[e].ks.k[i].e[0]);
              }
            } else "gr" == t[e].ty && c(t[e].it);
          }
        }

        function u(t) {
          var e,
              i = t.i.length;

          for (e = 0; e < i; e += 1) {
            t.i[e][0] += t.v[e][0], t.i[e][1] += t.v[e][1], t.o[e][0] += t.v[e][0], t.o[e][1] += t.v[e][1];
          }
        }

        function h(t, e) {
          var i = e ? e.split(".") : [100, 100, 100];
          return t[0] > i[0] || !(i[0] > t[0]) && (t[1] > i[1] || !(i[1] > t[1]) && (t[2] > i[2] || !(i[2] > t[2]) && void 0));
        }

        var o,
            i = function () {
          var s = [4, 4, 14];

          function a(t) {
            var e,
                i,
                s,
                a = t.length;

            for (e = 0; e < a; e += 1) {
              5 === t[e].ty && (i = t[e], s = i.t.d, i.t.d = {
                k: [{
                  s: s,
                  t: 0
                }]
              });
            }
          }

          return function (t) {
            if (h(s, t.v) && (a(t.layers), t.assets)) {
              var e,
                  i = t.assets.length;

              for (e = 0; e < i; e += 1) {
                t.assets[e].layers && a(t.assets[e].layers);
              }
            }
          };
        }(),
            s = (o = [4, 7, 99], function (t) {
          if (t.chars && !h(o, t.v)) {
            var e,
                i,
                s,
                a,
                r,
                n = t.chars.length;

            for (e = 0; e < n; e += 1) {
              if (t.chars[e].data && t.chars[e].data.shapes) for (s = (r = t.chars[e].data.shapes[0].it).length, i = 0; i < s; i += 1) {
                (a = r[i].ks.k).__converted || (u(r[i].ks.k), a.__converted = !0);
              }
            }
          }
        }),
            a = function () {
          var s = [4, 1, 9];

          function r(t) {
            var e,
                i,
                s,
                a = t.length;

            for (e = 0; e < a; e += 1) {
              if ("gr" === t[e].ty) r(t[e].it);else if ("fl" === t[e].ty || "st" === t[e].ty) if (t[e].c.k && t[e].c.k[0].i) for (s = t[e].c.k.length, i = 0; i < s; i += 1) {
                t[e].c.k[i].s && (t[e].c.k[i].s[0] /= 255, t[e].c.k[i].s[1] /= 255, t[e].c.k[i].s[2] /= 255, t[e].c.k[i].s[3] /= 255), t[e].c.k[i].e && (t[e].c.k[i].e[0] /= 255, t[e].c.k[i].e[1] /= 255, t[e].c.k[i].e[2] /= 255, t[e].c.k[i].e[3] /= 255);
              } else t[e].c.k[0] /= 255, t[e].c.k[1] /= 255, t[e].c.k[2] /= 255, t[e].c.k[3] /= 255;
            }
          }

          function a(t) {
            var e,
                i = t.length;

            for (e = 0; e < i; e += 1) {
              4 === t[e].ty && r(t[e].shapes);
            }
          }

          return function (t) {
            if (h(s, t.v) && (a(t.layers), t.assets)) {
              var e,
                  i = t.assets.length;

              for (e = 0; e < i; e += 1) {
                t.assets[e].layers && a(t.assets[e].layers);
              }
            }
          };
        }(),
            r = function () {
          var s = [4, 4, 18];

          function l(t) {
            var e, i, s;

            for (e = t.length - 1; 0 <= e; e -= 1) {
              if ("sh" == t[e].ty) {
                if (t[e].ks.k.i) t[e].ks.k.c = t[e].closed;else for (s = t[e].ks.k.length, i = 0; i < s; i += 1) {
                  t[e].ks.k[i].s && (t[e].ks.k[i].s[0].c = t[e].closed), t[e].ks.k[i].e && (t[e].ks.k[i].e[0].c = t[e].closed);
                }
              } else "gr" == t[e].ty && l(t[e].it);
            }
          }

          function a(t) {
            var e,
                i,
                s,
                a,
                r,
                n,
                h = t.length;

            for (i = 0; i < h; i += 1) {
              if ((e = t[i]).hasMask) {
                var o = e.masksProperties;

                for (a = o.length, s = 0; s < a; s += 1) {
                  if (o[s].pt.k.i) o[s].pt.k.c = o[s].cl;else for (n = o[s].pt.k.length, r = 0; r < n; r += 1) {
                    o[s].pt.k[r].s && (o[s].pt.k[r].s[0].c = o[s].cl), o[s].pt.k[r].e && (o[s].pt.k[r].e[0].c = o[s].cl);
                  }
                }
              }

              4 === e.ty && l(e.shapes);
            }
          }

          return function (t) {
            if (h(s, t.v) && (a(t.layers), t.assets)) {
              var e,
                  i = t.assets.length;

              for (e = 0; e < i; e += 1) {
                t.assets[e].layers && a(t.assets[e].layers);
              }
            }
          };
        }();

        var t = {
          completeData: function completeData(t, e) {
            t.__complete || (a(t), i(t), s(t), r(t), d(t.layers, t.assets, e), t.__complete = !0);
          }
        };
        return t.checkColors = a, t.checkChars = s, t.checkShapes = r, t.completeLayers = d, t;
      }(),
          R = function () {
        var r = {
          w: 0,
          size: 0,
          shapes: []
        },
            t = [];

        function u(t, e) {
          var i = w("span");
          i.style.fontFamily = e;
          var s = w("span");
          s.innerHTML = "giItT1WQy@!-/#", i.style.position = "absolute", i.style.left = "-10000px", i.style.top = "-10000px", i.style.fontSize = "300px", i.style.fontVariant = "normal", i.style.fontStyle = "normal", i.style.fontWeight = "normal", i.style.letterSpacing = "0", i.appendChild(s), document.body.appendChild(i);
          var a = s.offsetWidth;
          return s.style.fontFamily = function (t) {
            var e,
                i = t.split(","),
                s = i.length,
                a = [];

            for (e = 0; e < s; e += 1) {
              "sans-serif" !== i[e] && "monospace" !== i[e] && a.push(i[e]);
            }

            return a.join(",");
          }(t) + ", " + e, {
            node: s,
            w: a,
            parent: i
          };
        }

        t = t.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);

        var e = function e() {
          this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.isLoaded = !1, this.initTime = Date.now(), this.setIsLoadedBinded = this.setIsLoaded.bind(this), this.checkLoadedFontsBinded = this.checkLoadedFonts.bind(this);
        };

        return e.getCombinedCharacterCodes = function () {
          return t;
        }, e.prototype = {
          addChars: function addChars(t) {
            if (t) {
              this.chars || (this.chars = []);
              var e,
                  i,
                  s,
                  a = t.length,
                  r = this.chars.length;

              for (e = 0; e < a; e += 1) {
                for (i = 0, s = !1; i < r;) {
                  this.chars[i].style === t[e].style && this.chars[i].fFamily === t[e].fFamily && this.chars[i].ch === t[e].ch && (s = !0), i += 1;
                }

                s || (this.chars.push(t[e]), r += 1);
              }
            }
          },
          addFonts: function addFonts(t, e) {
            if (t) {
              if (this.chars) return this.isLoaded = !0, void (this.fonts = t.list);
              var i,
                  s,
                  a,
                  r,
                  n = t.list,
                  h = n.length,
                  o = h;

              for (i = 0; i < h; i += 1) {
                var l,
                    p,
                    f = !0;

                if (n[i].loaded = !1, n[i].monoCase = u(n[i].fFamily, "monospace"), n[i].sansCase = u(n[i].fFamily, "sans-serif"), n[i].fPath) {
                  if ("p" === n[i].fOrigin || 3 === n[i].origin) {
                    if (0 < (l = document.querySelectorAll('style[f-forigin="p"][f-family="' + n[i].fFamily + '"], style[f-origin="3"][f-family="' + n[i].fFamily + '"]')).length && (f = !1), f) {
                      var d = w("style");
                      d.setAttribute("f-forigin", n[i].fOrigin), d.setAttribute("f-origin", n[i].origin), d.setAttribute("f-family", n[i].fFamily), d.type = "text/css", d.innerHTML = "@font-face {font-family: " + n[i].fFamily + "; font-style: normal; src: url('" + n[i].fPath + "');}", e.appendChild(d);
                    }
                  } else if ("g" === n[i].fOrigin || 1 === n[i].origin) {
                    for (l = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), p = 0; p < l.length; p++) {
                      -1 !== l[p].href.indexOf(n[i].fPath) && (f = !1);
                    }

                    if (f) {
                      var m = w("link");
                      m.setAttribute("f-forigin", n[i].fOrigin), m.setAttribute("f-origin", n[i].origin), m.type = "text/css", m.rel = "stylesheet", m.href = n[i].fPath, document.body.appendChild(m);
                    }
                  } else if ("t" === n[i].fOrigin || 2 === n[i].origin) {
                    for (l = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), p = 0; p < l.length; p++) {
                      n[i].fPath === l[p].src && (f = !1);
                    }

                    if (f) {
                      var c = w("link");
                      c.setAttribute("f-forigin", n[i].fOrigin), c.setAttribute("f-origin", n[i].origin), c.setAttribute("rel", "stylesheet"), c.setAttribute("href", n[i].fPath), e.appendChild(c);
                    }
                  }
                } else n[i].loaded = !0, o -= 1;

                n[i].helper = (s = e, a = n[i], r = void 0, (r = S("text")).style.fontSize = "100px", r.setAttribute("font-family", a.fFamily), r.setAttribute("font-style", a.fStyle), r.setAttribute("font-weight", a.fWeight), r.textContent = "1", a.fClass ? (r.style.fontFamily = "inherit", r.setAttribute("class", a.fClass)) : r.style.fontFamily = a.fFamily, s.appendChild(r), w("canvas").getContext("2d").font = a.fWeight + " " + a.fStyle + " 100px " + a.fFamily, r), n[i].cache = {}, this.fonts.push(n[i]);
              }

              0 === o ? this.isLoaded = !0 : setTimeout(this.checkLoadedFonts.bind(this), 100);
            } else this.isLoaded = !0;
          },
          getCharData: function getCharData(t, e, i) {
            for (var s = 0, a = this.chars.length; s < a;) {
              if (this.chars[s].ch === t && this.chars[s].style === e && this.chars[s].fFamily === i) return this.chars[s];
              s += 1;
            }

            return ("string" == typeof t && 13 !== t.charCodeAt(0) || !t) && console && console.warn && console.warn("Missing character from exported characters list: ", t, e, i), r;
          },
          getFontByName: function getFontByName(t) {
            for (var e = 0, i = this.fonts.length; e < i;) {
              if (this.fonts[e].fName === t) return this.fonts[e];
              e += 1;
            }

            return this.fonts[0];
          },
          measureText: function measureText(t, e, i) {
            var s = this.getFontByName(e),
                a = t.charCodeAt(0);

            if (!s.cache[a + 1]) {
              var r = s.helper;

              if (" " === t) {
                r.textContent = "|" + t + "|";
                var n = r.getComputedTextLength();
                r.textContent = "||";
                var h = r.getComputedTextLength();
                s.cache[a + 1] = (n - h) / 100;
              } else r.textContent = t, s.cache[a + 1] = r.getComputedTextLength() / 100;
            }

            return s.cache[a + 1] * i;
          },
          checkLoadedFonts: function checkLoadedFonts() {
            var t,
                e,
                i,
                s = this.fonts.length,
                a = s;

            for (t = 0; t < s; t += 1) {
              this.fonts[t].loaded ? a -= 1 : "n" === this.fonts[t].fOrigin || 0 === this.fonts[t].origin ? this.fonts[t].loaded = !0 : (e = this.fonts[t].monoCase.node, i = this.fonts[t].monoCase.w, e.offsetWidth !== i ? (a -= 1, this.fonts[t].loaded = !0) : (e = this.fonts[t].sansCase.node, i = this.fonts[t].sansCase.w, e.offsetWidth !== i && (a -= 1, this.fonts[t].loaded = !0)), this.fonts[t].loaded && (this.fonts[t].sansCase.parent.parentNode.removeChild(this.fonts[t].sansCase.parent), this.fonts[t].monoCase.parent.parentNode.removeChild(this.fonts[t].monoCase.parent)));
            }

            0 !== a && Date.now() - this.initTime < 5e3 ? setTimeout(this.checkLoadedFontsBinded, 20) : setTimeout(this.setIsLoadedBinded, 10);
          },
          setIsLoaded: function setIsLoaded() {
            this.isLoaded = !0;
          }
        }, e;
      }(),
          z = function () {
        var f = i,
            a = Math.abs;

        function d(t, e) {
          var i,
              s = this.offsetTime;
          "multidimensional" === this.propType && (i = j("float32", this.pv.length));

          for (var a, r, n, h, o, l, p, f, d = e.lastIndex, m = d, c = this.keyframes.length - 1, u = !0; u;) {
            if (a = this.keyframes[m], r = this.keyframes[m + 1], m === c - 1 && t >= r.t - s) {
              a.h && (a = r), d = 0;
              break;
            }

            if (r.t - s > t) {
              d = m;
              break;
            }

            m < c - 1 ? m += 1 : (d = 0, u = !1);
          }

          var g,
              v,
              y,
              b,
              _,
              k,
              A,
              M,
              C,
              P,
              x = r.t - s,
              S = a.t - s;

          if (a.to) {
            a.bezierData || (a.bezierData = dt.buildBezierData(a.s, r.s || a.e, a.to, a.ti));
            var w = a.bezierData;

            if (x <= t || t < S) {
              var E = x <= t ? w.points.length - 1 : 0;

              for (h = w.points[E].point.length, n = 0; n < h; n += 1) {
                i[n] = w.points[E].point[n];
              }
            } else {
              a.__fnct ? f = a.__fnct : (f = G.getBezierEasing(a.o.x, a.o.y, a.i.x, a.i.y, a.n).get, a.__fnct = f), o = f((t - S) / (x - S));
              var F,
                  D = w.segmentLength * o,
                  T = e.lastFrame < t && e._lastKeyframeIndex === m ? e._lastAddedLength : 0;

              for (p = e.lastFrame < t && e._lastKeyframeIndex === m ? e._lastPoint : 0, u = !0, l = w.points.length; u;) {
                if (T += w.points[p].partialLength, 0 === D || 0 === o || p === w.points.length - 1) {
                  for (h = w.points[p].point.length, n = 0; n < h; n += 1) {
                    i[n] = w.points[p].point[n];
                  }

                  break;
                }

                if (T <= D && D < T + w.points[p + 1].partialLength) {
                  for (F = (D - T) / w.points[p + 1].partialLength, h = w.points[p].point.length, n = 0; n < h; n += 1) {
                    i[n] = w.points[p].point[n] + (w.points[p + 1].point[n] - w.points[p].point[n]) * F;
                  }

                  break;
                }

                p < l - 1 ? p += 1 : u = !1;
              }

              e._lastPoint = p, e._lastAddedLength = T - w.points[p].partialLength, e._lastKeyframeIndex = m;
            }
          } else {
            var I, L, R, z, V;
            if (c = a.s.length, g = r.s || a.e, this.sh && 1 !== a.h) {
              if (x <= t) i[0] = g[0], i[1] = g[1], i[2] = g[2];else if (t <= S) i[0] = a.s[0], i[1] = a.s[1], i[2] = a.s[2];else {
                var N = B(a.s),
                    O = B(g);
                v = i, y = function (t, e, i) {
                  var s,
                      a,
                      r,
                      n,
                      h,
                      o = [],
                      l = t[0],
                      p = t[1],
                      f = t[2],
                      d = t[3],
                      m = e[0],
                      c = e[1],
                      u = e[2],
                      g = e[3];
                  (a = l * m + p * c + f * u + d * g) < 0 && (a = -a, m = -m, c = -c, u = -u, g = -g);
                  h = 1e-6 < 1 - a ? (s = Math.acos(a), r = Math.sin(s), n = Math.sin((1 - i) * s) / r, Math.sin(i * s) / r) : (n = 1 - i, i);
                  return o[0] = n * l + h * m, o[1] = n * p + h * c, o[2] = n * f + h * u, o[3] = n * d + h * g, o;
                }(N, O, (t - S) / (x - S)), b = y[0], _ = y[1], k = y[2], A = y[3], M = Math.atan2(2 * _ * A - 2 * b * k, 1 - 2 * _ * _ - 2 * k * k), C = Math.asin(2 * b * _ + 2 * k * A), P = Math.atan2(2 * b * A - 2 * _ * k, 1 - 2 * b * b - 2 * k * k), v[0] = M / q, v[1] = C / q, v[2] = P / q;
              }
            } else for (m = 0; m < c; m += 1) {
              1 !== a.h && (o = x <= t ? 1 : t < S ? 0 : (a.o.x.constructor === Array ? (a.__fnct || (a.__fnct = []), a.__fnct[m] ? f = a.__fnct[m] : (I = void 0 === a.o.x[m] ? a.o.x[0] : a.o.x[m], L = void 0 === a.o.y[m] ? a.o.y[0] : a.o.y[m], R = void 0 === a.i.x[m] ? a.i.x[0] : a.i.x[m], z = void 0 === a.i.y[m] ? a.i.y[0] : a.i.y[m], f = G.getBezierEasing(I, L, R, z).get, a.__fnct[m] = f)) : a.__fnct ? f = a.__fnct : (I = a.o.x, L = a.o.y, R = a.i.x, z = a.i.y, f = G.getBezierEasing(I, L, R, z).get, a.__fnct = f), f((t - S) / (x - S)))), g = r.s || a.e, V = 1 === a.h ? a.s[m] : a.s[m] + (g[m] - a.s[m]) * o, "multidimensional" === this.propType ? i[m] = V : i = V;
            }
          }

          return e.lastIndex = d, i;
        }

        function B(t) {
          var e = t[0] * q,
              i = t[1] * q,
              s = t[2] * q,
              a = Math.cos(e / 2),
              r = Math.cos(i / 2),
              n = Math.cos(s / 2),
              h = Math.sin(e / 2),
              o = Math.sin(i / 2),
              l = Math.sin(s / 2);
          return [h * o * n + a * r * l, h * r * n + a * o * l, a * o * n - h * r * l, a * r * n - h * o * l];
        }

        function m() {
          var t = this.comp.renderedFrame - this.offsetTime,
              e = this.keyframes[0].t - this.offsetTime,
              i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;

          if (!(t === this._caching.lastFrame || this._caching.lastFrame !== f && (this._caching.lastFrame >= i && i <= t || this._caching.lastFrame < e && t < e))) {
            this._caching.lastFrame >= t && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0);
            var s = this.interpolateValue(t, this._caching);
            this.pv = s;
          }

          return this._caching.lastFrame = t, this.pv;
        }

        function c(t) {
          var e;
          if ("unidimensional" === this.propType) e = t * this.mult, 1e-5 < a(this.v - e) && (this.v = e, this._mdf = !0);else for (var i = 0, s = this.v.length; i < s;) {
            e = t[i] * this.mult, 1e-5 < a(this.v[i] - e) && (this.v[i] = e, this._mdf = !0), i += 1;
          }
        }

        function u() {
          if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length) if (this.lock) this.setVValue(this.pv);else {
            this.lock = !0, this._mdf = this._isFirstFrame;
            var t,
                e = this.effectsSequence.length,
                i = this.kf ? this.pv : this.data.k;

            for (t = 0; t < e; t += 1) {
              i = this.effectsSequence[t](i);
            }

            this.setVValue(i), this._isFirstFrame = !1, this.lock = !1, this.frameId = this.elem.globalData.frameId;
          }
        }

        function g(t) {
          this.effectsSequence.push(t), this.container.addDynamicProperty(this);
        }

        function n(t, e, i, s) {
          this.propType = "unidimensional", this.mult = i || 1, this.data = e, this.v = i ? e.k * i : e.k, this.pv = e.k, this._mdf = !1, this.elem = t, this.container = s, this.comp = t.comp, this.k = !1, this.kf = !1, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = !0, this.getValue = u, this.setVValue = c, this.addEffect = g;
        }

        function h(t, e, i, s) {
          this.propType = "multidimensional", this.mult = i || 1, this.data = e, this._mdf = !1, this.elem = t, this.container = s, this.comp = t.comp, this.k = !1, this.kf = !1, this.frameId = -1;
          var a,
              r = e.k.length;
          this.v = j("float32", r), this.pv = j("float32", r);
          j("float32", r);

          for (this.vel = j("float32", r), a = 0; a < r; a += 1) {
            this.v[a] = e.k[a] * this.mult, this.pv[a] = e.k[a];
          }

          this._isFirstFrame = !0, this.effectsSequence = [], this.getValue = u, this.setVValue = c, this.addEffect = g;
        }

        function o(t, e, i, s) {
          this.propType = "unidimensional", this.keyframes = e.k, this.offsetTime = t.data.st, this.frameId = -1, this._caching = {
            lastFrame: f,
            lastIndex: 0,
            value: 0,
            _lastKeyframeIndex: -1
          }, this.k = !0, this.kf = !0, this.data = e, this.mult = i || 1, this.elem = t, this.container = s, this.comp = t.comp, this.v = f, this.pv = f, this._isFirstFrame = !0, this.getValue = u, this.setVValue = c, this.interpolateValue = d, this.effectsSequence = [m.bind(this)], this.addEffect = g;
        }

        function l(t, e, i, s) {
          this.propType = "multidimensional";
          var a,
              r,
              n,
              h,
              o,
              l = e.k.length;

          for (a = 0; a < l - 1; a += 1) {
            e.k[a].to && e.k[a].s && e.k[a + 1] && e.k[a + 1].s && (r = e.k[a].s, n = e.k[a + 1].s, h = e.k[a].to, o = e.k[a].ti, (2 === r.length && (r[0] !== n[0] || r[1] !== n[1]) && dt.pointOnLine2D(r[0], r[1], n[0], n[1], r[0] + h[0], r[1] + h[1]) && dt.pointOnLine2D(r[0], r[1], n[0], n[1], n[0] + o[0], n[1] + o[1]) || 3 === r.length && (r[0] !== n[0] || r[1] !== n[1] || r[2] !== n[2]) && dt.pointOnLine3D(r[0], r[1], r[2], n[0], n[1], n[2], r[0] + h[0], r[1] + h[1], r[2] + h[2]) && dt.pointOnLine3D(r[0], r[1], r[2], n[0], n[1], n[2], n[0] + o[0], n[1] + o[1], n[2] + o[2])) && (e.k[a].to = null, e.k[a].ti = null), r[0] === n[0] && r[1] === n[1] && 0 === h[0] && 0 === h[1] && 0 === o[0] && 0 === o[1] && (2 === r.length || r[2] === n[2] && 0 === h[2] && 0 === o[2]) && (e.k[a].to = null, e.k[a].ti = null));
          }

          this.effectsSequence = [m.bind(this)], this.keyframes = e.k, this.offsetTime = t.data.st, this.k = !0, this.kf = !0, this._isFirstFrame = !0, this.mult = i || 1, this.elem = t, this.container = s, this.comp = t.comp, this.getValue = u, this.setVValue = c, this.interpolateValue = d, this.frameId = -1;
          var p = e.k[0].s.length;

          for (this.v = j("float32", p), this.pv = j("float32", p), a = 0; a < p; a += 1) {
            this.v[a] = f, this.pv[a] = f;
          }

          this._caching = {
            lastFrame: f,
            lastIndex: 0,
            value: j("float32", p)
          }, this.addEffect = g;
        }

        return {
          getProp: function getProp(t, e, i, s, a) {
            var r;
            if (e.k.length) {
              if ("number" == typeof e.k[0]) r = new h(t, e, s, a);else switch (i) {
                case 0:
                  r = new o(t, e, s, a);
                  break;

                case 1:
                  r = new l(t, e, s, a);
              }
            } else r = new n(t, e, s, a);
            return r.effectsSequence.length && a.addDynamicProperty(r), r;
          }
        };
      }(),
          V = function () {
        var n = [0, 0];

        function s(t, e, i) {
          if (this.elem = t, this.frameId = -1, this.propType = "transform", this.data = e, this.v = new I(), this.pre = new I(), this.appliedTransformations = 0, this.initDynamicPropertyContainer(i || t), e.p && e.p.s ? (this.px = z.getProp(t, e.p.x, 0, 0, this), this.py = z.getProp(t, e.p.y, 0, 0, this), e.p.z && (this.pz = z.getProp(t, e.p.z, 0, 0, this))) : this.p = z.getProp(t, e.p || {
            k: [0, 0, 0]
          }, 1, 0, this), e.rx) {
            if (this.rx = z.getProp(t, e.rx, 0, q, this), this.ry = z.getProp(t, e.ry, 0, q, this), this.rz = z.getProp(t, e.rz, 0, q, this), e.or.k[0].ti) {
              var s,
                  a = e.or.k.length;

              for (s = 0; s < a; s += 1) {
                e.or.k[s].to = e.or.k[s].ti = null;
              }
            }

            this.or = z.getProp(t, e.or, 1, q, this), this.or.sh = !0;
          } else this.r = z.getProp(t, e.r || {
            k: 0
          }, 0, q, this);

          e.sk && (this.sk = z.getProp(t, e.sk, 0, q, this), this.sa = z.getProp(t, e.sa, 0, q, this)), this.a = z.getProp(t, e.a || {
            k: [0, 0, 0]
          }, 1, 0, this), this.s = z.getProp(t, e.s || {
            k: [100, 100, 100]
          }, 1, .01, this), e.o ? this.o = z.getProp(t, e.o, 0, .01, t) : this.o = {
            _mdf: !1,
            v: 1
          }, this._isDirty = !0, this.dynamicProperties.length || this.getValue(!0);
        }

        return s.prototype = {
          applyToMatrix: function applyToMatrix(t) {
            var e = this._mdf;
            this.iterateDynamicProperties(), this._mdf = this._mdf || e, this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && t.skewFromAxis(-this.sk.v, this.sa.v), this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
          },
          getValue: function getValue(t) {
            if (this.elem.globalData.frameId !== this.frameId) {
              if (this._isDirty && (this.precalculateMatrix(), this._isDirty = !1), this.iterateDynamicProperties(), this._mdf || t) {
                if (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented) {
                  var e,
                      i,
                      s = this.elem.globalData.frameRate;
                  if (this.p && this.p.keyframes && this.p.getValueAtTime) i = this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (e = this.p.getValueAtTime((this.p.keyframes[0].t + .01) / s, 0), this.p.getValueAtTime(this.p.keyframes[0].t / s, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (e = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / s, 0), this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - .05) / s, 0)) : (e = this.p.pv, this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - .01) / s, this.p.offsetTime));else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                    e = [], i = [];
                    var a = this.px,
                        r = this.py;
                    a._caching.lastFrame + a.offsetTime <= a.keyframes[0].t ? (e[0] = a.getValueAtTime((a.keyframes[0].t + .01) / s, 0), e[1] = r.getValueAtTime((r.keyframes[0].t + .01) / s, 0), i[0] = a.getValueAtTime(a.keyframes[0].t / s, 0), i[1] = r.getValueAtTime(r.keyframes[0].t / s, 0)) : a._caching.lastFrame + a.offsetTime >= a.keyframes[a.keyframes.length - 1].t ? (e[0] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / s, 0), e[1] = r.getValueAtTime(r.keyframes[r.keyframes.length - 1].t / s, 0), i[0] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - .01) / s, 0), i[1] = r.getValueAtTime((r.keyframes[r.keyframes.length - 1].t - .01) / s, 0)) : (e = [a.pv, r.pv], i[0] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - .01) / s, a.offsetTime), i[1] = r.getValueAtTime((r._caching.lastFrame + r.offsetTime - .01) / s, r.offsetTime));
                  } else e = i = n;
                  this.v.rotate(-Math.atan2(e[1] - i[1], e[0] - i[0]));
                }

                this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
              }

              this.frameId = this.elem.globalData.frameId;
            }
          },
          precalculateMatrix: function precalculateMatrix() {
            if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations = 1, !this.s.effectsSequence.length)) {
              if (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.appliedTransformations = 2, this.sk) {
                if (this.sk.effectsSequence.length || this.sa.effectsSequence.length) return;
                this.pre.skewFromAxis(-this.sk.v, this.sa.v), this.appliedTransformations = 3;
              }

              if (this.r) {
                if (this.r.effectsSequence.length) return;
                this.pre.rotate(-this.r.v), this.appliedTransformations = 4;
              } else this.rz.effectsSequence.length || this.ry.effectsSequence.length || this.rx.effectsSequence.length || this.or.effectsSequence.length || (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.appliedTransformations = 4);
            }
          },
          autoOrient: function autoOrient() {}
        }, T([E], s), s.prototype.addDynamicProperty = function (t) {
          this._addDynamicProperty(t), this.elem.addDynamicProperty(t), this._isDirty = !0;
        }, s.prototype._addDynamicProperty = E.prototype.addDynamicProperty, {
          getTransformProperty: function getTransformProperty(t, e, i) {
            return new s(t, e, i);
          }
        };
      }();

      function N() {
        this.c = !1, this._length = 0, this._maxLength = 8, this.v = x(this._maxLength), this.o = x(this._maxLength), this.i = x(this._maxLength);
      }

      N.prototype.setPathData = function (t, e) {
        this.c = t, this.setLength(e);

        for (var i = 0; i < e;) {
          this.v[i] = At.newElement(), this.o[i] = At.newElement(), this.i[i] = At.newElement(), i += 1;
        }
      }, N.prototype.setLength = function (t) {
        for (; this._maxLength < t;) {
          this.doubleArrayLength();
        }

        this._length = t;
      }, N.prototype.doubleArrayLength = function () {
        this.v = this.v.concat(x(this._maxLength)), this.i = this.i.concat(x(this._maxLength)), this.o = this.o.concat(x(this._maxLength)), this._maxLength *= 2;
      }, N.prototype.setXYAt = function (t, e, i, s, a) {
        var r;

        switch (this._length = Math.max(this._length, s + 1), this._length >= this._maxLength && this.doubleArrayLength(), i) {
          case "v":
            r = this.v;
            break;

          case "i":
            r = this.i;
            break;

          case "o":
            r = this.o;
        }

        (!r[s] || r[s] && !a) && (r[s] = At.newElement()), r[s][0] = t, r[s][1] = e;
      }, N.prototype.setTripleAt = function (t, e, i, s, a, r, n, h) {
        this.setXYAt(t, e, "v", n, h), this.setXYAt(i, s, "o", n, h), this.setXYAt(a, r, "i", n, h);
      }, N.prototype.reverse = function () {
        var t = new N();
        t.setPathData(this.c, this._length);
        var e = this.v,
            i = this.o,
            s = this.i,
            a = 0;
        this.c && (t.setTripleAt(e[0][0], e[0][1], s[0][0], s[0][1], i[0][0], i[0][1], 0, !1), a = 1);
        var r,
            n = this._length - 1,
            h = this._length;

        for (r = a; r < h; r += 1) {
          t.setTripleAt(e[n][0], e[n][1], s[n][0], s[n][1], i[n][0], i[n][1], r, !1), n -= 1;
        }

        return t;
      };

      var O,
          B,
          W = function () {
        var a = -999999;

        function t(t, e, i) {
          var s,
              a,
              r,
              n,
              h,
              o,
              l,
              p,
              f,
              d = i.lastIndex,
              m = this.keyframes;
          if (t < m[0].t - this.offsetTime) s = m[0].s[0], r = !0, d = 0;else if (t >= m[m.length - 1].t - this.offsetTime) s = m[m.length - 1].s ? m[m.length - 1].s[0] : m[m.length - 2].e[0], r = !0;else {
            for (var c, u, g = d, v = m.length - 1, y = !0; y && (c = m[g], !((u = m[g + 1]).t - this.offsetTime > t));) {
              g < v - 1 ? g += 1 : y = !1;
            }

            if (d = g, !(r = 1 === c.h)) {
              if (t >= u.t - this.offsetTime) p = 1;else if (t < c.t - this.offsetTime) p = 0;else {
                var b;
                c.__fnct ? b = c.__fnct : (b = G.getBezierEasing(c.o.x, c.o.y, c.i.x, c.i.y).get, c.__fnct = b), p = b((t - (c.t - this.offsetTime)) / (u.t - this.offsetTime - (c.t - this.offsetTime)));
              }
              a = u.s ? u.s[0] : c.e[0];
            }

            s = c.s[0];
          }

          for (o = e._length, l = s.i[0].length, i.lastIndex = d, n = 0; n < o; n += 1) {
            for (h = 0; h < l; h += 1) {
              f = r ? s.i[n][h] : s.i[n][h] + (a.i[n][h] - s.i[n][h]) * p, e.i[n][h] = f, f = r ? s.o[n][h] : s.o[n][h] + (a.o[n][h] - s.o[n][h]) * p, e.o[n][h] = f, f = r ? s.v[n][h] : s.v[n][h] + (a.v[n][h] - s.v[n][h]) * p, e.v[n][h] = f;
            }
          }
        }

        function r() {
          this.paths = this.localShapeCollection;
        }

        function e(t) {
          (function (t, e) {
            if (t._length !== e._length || t.c !== e.c) return !1;
            var i,
                s = t._length;

            for (i = 0; i < s; i += 1) {
              if (t.v[i][0] !== e.v[i][0] || t.v[i][1] !== e.v[i][1] || t.o[i][0] !== e.o[i][0] || t.o[i][1] !== e.o[i][1] || t.i[i][0] !== e.i[i][0] || t.i[i][1] !== e.i[i][1]) return !1;
            }

            return !0;
          })(this.v, t) || (this.v = Mt.clone(t), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = !0, this.paths = this.localShapeCollection);
        }

        function i() {
          if (this.elem.globalData.frameId !== this.frameId) if (this.effectsSequence.length) {
            if (this.lock) this.setVValue(this.pv);else {
              this.lock = !0, this._mdf = !1;
              var t,
                  e = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k,
                  i = this.effectsSequence.length;

              for (t = 0; t < i; t += 1) {
                e = this.effectsSequence[t](e);
              }

              this.setVValue(e), this.lock = !1, this.frameId = this.elem.globalData.frameId;
            }
          } else this._mdf = !1;
        }

        function n(t, e, i) {
          this.propType = "shape", this.comp = t.comp, this.container = t, this.elem = t, this.data = e, this.k = !1, this.kf = !1, this._mdf = !1;
          var s = 3 === i ? e.pt.k : e.ks.k;
          this.v = Mt.clone(s), this.pv = Mt.clone(this.v), this.localShapeCollection = Ct.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = r, this.effectsSequence = [];
        }

        function s(t) {
          this.effectsSequence.push(t), this.container.addDynamicProperty(this);
        }

        function h(t, e, i) {
          this.propType = "shape", this.comp = t.comp, this.elem = t, this.container = t, this.offsetTime = t.data.st, this.keyframes = 3 === i ? e.pt.k : e.ks.k, this.k = !0, this.kf = !0;
          var s = this.keyframes[0].s[0].i.length;
          this.keyframes[0].s[0].i[0].length;
          this.v = Mt.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, s), this.pv = Mt.clone(this.v), this.localShapeCollection = Ct.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = a, this.reset = r, this._caching = {
            lastFrame: a,
            lastIndex: 0
          }, this.effectsSequence = [function () {
            var t = this.comp.renderedFrame - this.offsetTime,
                e = this.keyframes[0].t - this.offsetTime,
                i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
                s = this._caching.lastFrame;
            return s !== a && (s < e && t < e || i < s && i < t) || (this._caching.lastIndex = s < t ? this._caching.lastIndex : 0, this.interpolateShape(t, this.pv, this._caching)), this._caching.lastFrame = t, this.pv;
          }.bind(this)];
        }

        n.prototype.interpolateShape = t, n.prototype.getValue = i, n.prototype.setVValue = e, n.prototype.addEffect = s, h.prototype.getValue = i, h.prototype.interpolateShape = t, h.prototype.setVValue = e, h.prototype.addEffect = s;

        var o = function () {
          var n = y;

          function t(t, e) {
            this.v = Mt.newElement(), this.v.setPathData(!0, 4), this.localShapeCollection = Ct.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = e.d, this.elem = t, this.comp = t.comp, this.frameId = -1, this.initDynamicPropertyContainer(t), this.p = z.getProp(t, e.p, 1, 0, this), this.s = z.getProp(t, e.s, 1, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertEllToPath());
          }

          return t.prototype = {
            reset: r,
            getValue: function getValue() {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath());
            },
            convertEllToPath: function convertEllToPath() {
              var t = this.p.v[0],
                  e = this.p.v[1],
                  i = this.s.v[0] / 2,
                  s = this.s.v[1] / 2,
                  a = 3 !== this.d,
                  r = this.v;
              r.v[0][0] = t, r.v[0][1] = e - s, r.v[1][0] = a ? t + i : t - i, r.v[1][1] = e, r.v[2][0] = t, r.v[2][1] = e + s, r.v[3][0] = a ? t - i : t + i, r.v[3][1] = e, r.i[0][0] = a ? t - i * n : t + i * n, r.i[0][1] = e - s, r.i[1][0] = a ? t + i : t - i, r.i[1][1] = e - s * n, r.i[2][0] = a ? t + i * n : t - i * n, r.i[2][1] = e + s, r.i[3][0] = a ? t - i : t + i, r.i[3][1] = e + s * n, r.o[0][0] = a ? t + i * n : t - i * n, r.o[0][1] = e - s, r.o[1][0] = a ? t + i : t - i, r.o[1][1] = e + s * n, r.o[2][0] = a ? t - i * n : t + i * n, r.o[2][1] = e + s, r.o[3][0] = a ? t - i : t + i, r.o[3][1] = e - s * n;
            }
          }, T([E], t), t;
        }(),
            l = function () {
          function t(t, e) {
            this.v = Mt.newElement(), this.v.setPathData(!0, 0), this.elem = t, this.comp = t.comp, this.data = e, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), 1 === e.sy ? (this.ir = z.getProp(t, e.ir, 0, 0, this), this.is = z.getProp(t, e.is, 0, .01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = z.getProp(t, e.pt, 0, 0, this), this.p = z.getProp(t, e.p, 1, 0, this), this.r = z.getProp(t, e.r, 0, q, this), this.or = z.getProp(t, e.or, 0, 0, this), this.os = z.getProp(t, e.os, 0, .01, this), this.localShapeCollection = Ct.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertToPath());
          }

          return t.prototype = {
            reset: r,
            getValue: function getValue() {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath());
            },
            convertStarToPath: function convertStarToPath() {
              var t,
                  e,
                  i,
                  s,
                  a = 2 * Math.floor(this.pt.v),
                  r = 2 * Math.PI / a,
                  n = !0,
                  h = this.or.v,
                  o = this.ir.v,
                  l = this.os.v,
                  p = this.is.v,
                  f = 2 * Math.PI * h / (2 * a),
                  d = 2 * Math.PI * o / (2 * a),
                  m = -Math.PI / 2;
              m += this.r.v;
              var c = 3 === this.data.d ? -1 : 1;

              for (t = this.v._length = 0; t < a; t += 1) {
                i = n ? l : p, s = n ? f : d;
                var u = (e = n ? h : o) * Math.cos(m),
                    g = e * Math.sin(m),
                    v = 0 === u && 0 === g ? 0 : g / Math.sqrt(u * u + g * g),
                    y = 0 === u && 0 === g ? 0 : -u / Math.sqrt(u * u + g * g);
                u += +this.p.v[0], g += +this.p.v[1], this.v.setTripleAt(u, g, u - v * s * i * c, g - y * s * i * c, u + v * s * i * c, g + y * s * i * c, t, !0), n = !n, m += r * c;
              }
            },
            convertPolygonToPath: function convertPolygonToPath() {
              var t,
                  e = Math.floor(this.pt.v),
                  i = 2 * Math.PI / e,
                  s = this.or.v,
                  a = this.os.v,
                  r = 2 * Math.PI * s / (4 * e),
                  n = -Math.PI / 2,
                  h = 3 === this.data.d ? -1 : 1;

              for (n += this.r.v, t = this.v._length = 0; t < e; t += 1) {
                var o = s * Math.cos(n),
                    l = s * Math.sin(n),
                    p = 0 === o && 0 === l ? 0 : l / Math.sqrt(o * o + l * l),
                    f = 0 === o && 0 === l ? 0 : -o / Math.sqrt(o * o + l * l);
                o += +this.p.v[0], l += +this.p.v[1], this.v.setTripleAt(o, l, o - p * r * a * h, l - f * r * a * h, o + p * r * a * h, l + f * r * a * h, t, !0), n += i * h;
              }

              this.paths.length = 0, this.paths[0] = this.v;
            }
          }, T([E], t), t;
        }(),
            p = function () {
          function t(t, e) {
            this.v = Mt.newElement(), this.v.c = !0, this.localShapeCollection = Ct.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = t, this.comp = t.comp, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), this.p = z.getProp(t, e.p, 1, 0, this), this.s = z.getProp(t, e.s, 1, 0, this), this.r = z.getProp(t, e.r, 0, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertRectToPath());
          }

          return t.prototype = {
            convertRectToPath: function convertRectToPath() {
              var t = this.p.v[0],
                  e = this.p.v[1],
                  i = this.s.v[0] / 2,
                  s = this.s.v[1] / 2,
                  a = d(i, s, this.r.v),
                  r = a * (1 - y);
              this.v._length = 0, 2 === this.d || 1 === this.d ? (this.v.setTripleAt(t + i, e - s + a, t + i, e - s + a, t + i, e - s + r, 0, !0), this.v.setTripleAt(t + i, e + s - a, t + i, e + s - r, t + i, e + s - a, 1, !0), 0 !== a ? (this.v.setTripleAt(t + i - a, e + s, t + i - a, e + s, t + i - r, e + s, 2, !0), this.v.setTripleAt(t - i + a, e + s, t - i + r, e + s, t - i + a, e + s, 3, !0), this.v.setTripleAt(t - i, e + s - a, t - i, e + s - a, t - i, e + s - r, 4, !0), this.v.setTripleAt(t - i, e - s + a, t - i, e - s + r, t - i, e - s + a, 5, !0), this.v.setTripleAt(t - i + a, e - s, t - i + a, e - s, t - i + r, e - s, 6, !0), this.v.setTripleAt(t + i - a, e - s, t + i - r, e - s, t + i - a, e - s, 7, !0)) : (this.v.setTripleAt(t - i, e + s, t - i + r, e + s, t - i, e + s, 2), this.v.setTripleAt(t - i, e - s, t - i, e - s + r, t - i, e - s, 3))) : (this.v.setTripleAt(t + i, e - s + a, t + i, e - s + r, t + i, e - s + a, 0, !0), 0 !== a ? (this.v.setTripleAt(t + i - a, e - s, t + i - a, e - s, t + i - r, e - s, 1, !0), this.v.setTripleAt(t - i + a, e - s, t - i + r, e - s, t - i + a, e - s, 2, !0), this.v.setTripleAt(t - i, e - s + a, t - i, e - s + a, t - i, e - s + r, 3, !0), this.v.setTripleAt(t - i, e + s - a, t - i, e + s - r, t - i, e + s - a, 4, !0), this.v.setTripleAt(t - i + a, e + s, t - i + a, e + s, t - i + r, e + s, 5, !0), this.v.setTripleAt(t + i - a, e + s, t + i - r, e + s, t + i - a, e + s, 6, !0), this.v.setTripleAt(t + i, e + s - a, t + i, e + s - a, t + i, e + s - r, 7, !0)) : (this.v.setTripleAt(t - i, e - s, t - i + r, e - s, t - i, e - s, 1, !0), this.v.setTripleAt(t - i, e + s, t - i, e + s - r, t - i, e + s, 2, !0), this.v.setTripleAt(t + i, e + s, t + i - r, e + s, t + i, e + s, 3, !0)));
            },
            getValue: function getValue(t) {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath());
            },
            reset: r
          }, T([E], t), t;
        }();

        var f = {
          getShapeProp: function getShapeProp(t, e, i) {
            var s;
            return 3 === i || 4 === i ? s = (3 === i ? e.pt : e.ks).k.length ? new h(t, e, i) : new n(t, e, i) : 5 === i ? s = new p(t, e) : 6 === i ? s = new o(t, e) : 7 === i && (s = new l(t, e)), s.k && t.addDynamicProperty(s), s;
          },
          getConstructorFunction: function getConstructorFunction() {
            return n;
          },
          getKeyframedConstructorFunction: function getKeyframedConstructorFunction() {
            return h;
          }
        };
        return f;
      }(),
          X = (B = {}, (O = {}).registerModifier = function (t, e) {
        B[t] || (B[t] = e);
      }, O.getModifier = function (t, e, i) {
        return new B[t](e, i);
      }, O);

      function Y() {}

      function H() {}

      function K() {}

      function J() {}

      function U() {
        this._length = 0, this._maxLength = 4, this.shapes = x(this._maxLength);
      }

      function Z(t, e, i, s) {
        this.elem = t, this.frameId = -1, this.dataProps = x(e.length), this.renderer = i, this.k = !1, this.dashStr = "", this.dashArray = j("float32", e.length ? e.length - 1 : 0), this.dashoffset = j("float32", 1), this.initDynamicPropertyContainer(s);
        var a,
            r,
            n = e.length || 0;

        for (a = 0; a < n; a += 1) {
          r = z.getProp(t, e[a].v, 0, 0, this), this.k = r.k || this.k, this.dataProps[a] = {
            n: e[a].n,
            p: r
          };
        }

        this.k || this.getValue(!0), this._isAnimated = this.k;
      }

      function Q(t, e, i) {
        this.data = e, this.c = j("uint8c", 4 * e.p);
        var s = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
        this.o = j("float32", s), this._cmdf = !1, this._omdf = !1, this._collapsable = this.checkCollapsable(), this._hasOpacity = s, this.initDynamicPropertyContainer(i), this.prop = z.getProp(t, e.k, 1, null, this), this.k = this.prop.k, this.getValue(!0);
      }

      Y.prototype.initModifierProperties = function () {}, Y.prototype.addShapeToModifier = function () {}, Y.prototype.addShape = function (t) {
        if (!this.closed) {
          t.sh.container.addDynamicProperty(t.sh);
          var e = {
            shape: t.sh,
            data: t,
            localShapeCollection: Ct.newShapeCollection()
          };
          this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated();
        }
      }, Y.prototype.init = function (t, e) {
        this.shapes = [], this.elem = t, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e), this.frameId = i, this.closed = !1, this.k = !1, this.dynamicProperties.length ? this.k = !0 : this.getValue(!0);
      }, Y.prototype.processKeys = function () {
        this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties());
      }, T([E], Y), T([Y], H), H.prototype.initModifierProperties = function (t, e) {
        this.s = z.getProp(t, e.s, 0, .01, this), this.e = z.getProp(t, e.e, 0, .01, this), this.o = z.getProp(t, e.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = e.m, this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length;
      }, H.prototype.addShapeToModifier = function (t) {
        t.pathsData = [];
      }, H.prototype.calculateShapeEdges = function (t, e, i, s, a) {
        var r = [];
        e <= 1 ? r.push({
          s: t,
          e: e
        }) : 1 <= t ? r.push({
          s: t - 1,
          e: e - 1
        }) : (r.push({
          s: t,
          e: 1
        }), r.push({
          s: 0,
          e: e - 1
        }));
        var n,
            h,
            o = [],
            l = r.length;

        for (n = 0; n < l; n += 1) {
          var p, f;
          if ((h = r[n]).e * a < s || h.s * a > s + i) ;else p = h.s * a <= s ? 0 : (h.s * a - s) / i, f = h.e * a >= s + i ? 1 : (h.e * a - s) / i, o.push([p, f]);
        }

        return o.length || o.push([0, 0]), o;
      }, H.prototype.releasePathsData = function (t) {
        var e,
            i = t.length;

        for (e = 0; e < i; e += 1) {
          Pt.release(t[e]);
        }

        return t.length = 0, t;
      }, H.prototype.processShapes = function (t) {
        var e, i, s;

        if (this._mdf || t) {
          var a = this.o.v % 360 / 360;

          if (a < 0 && (a += 1), e = (1 < this.s.v ? 1 : this.s.v < 0 ? 0 : this.s.v) + a, (i = (1 < this.e.v ? 1 : this.e.v < 0 ? 0 : this.e.v) + a) < e) {
            var r = e;
            e = i, i = r;
          }

          e = 1e-4 * Math.round(1e4 * e), i = 1e-4 * Math.round(1e4 * i), this.sValue = e, this.eValue = i;
        } else e = this.sValue, i = this.eValue;

        var n,
            h,
            o,
            l,
            p,
            f,
            d = this.shapes.length,
            m = 0;
        if (i === e) for (n = 0; n < d; n += 1) {
          this.shapes[n].localShapeCollection.releaseShapes(), this.shapes[n].shape._mdf = !0, this.shapes[n].shape.paths = this.shapes[n].localShapeCollection;
        } else if (1 === i && 0 === e || 0 === i && 1 === e) {
          if (this._mdf) for (n = 0; n < d; n += 1) {
            this.shapes[n].pathsData.length = 0, this.shapes[n].shape._mdf = !0;
          }
        } else {
          var c,
              u,
              g = [];

          for (n = 0; n < d; n += 1) {
            if ((c = this.shapes[n]).shape._mdf || this._mdf || t || 2 === this.m) {
              if (o = (s = c.shape.paths)._length, f = 0, !c.shape._mdf && c.pathsData.length) f = c.totalShapeLength;else {
                for (l = this.releasePathsData(c.pathsData), h = 0; h < o; h += 1) {
                  p = dt.getSegmentsLength(s.shapes[h]), l.push(p), f += p.totalLength;
                }

                c.totalShapeLength = f, c.pathsData = l;
              }
              m += f, c.shape._mdf = !0;
            } else c.shape.paths = c.localShapeCollection;
          }

          var v,
              y = e,
              b = i,
              _ = 0;

          for (n = d - 1; 0 <= n; n -= 1) {
            if ((c = this.shapes[n]).shape._mdf) {
              for ((u = c.localShapeCollection).releaseShapes(), 2 === this.m && 1 < d ? (v = this.calculateShapeEdges(e, i, c.totalShapeLength, _, m), _ += c.totalShapeLength) : v = [[y, b]], o = v.length, h = 0; h < o; h += 1) {
                y = v[h][0], b = v[h][1], g.length = 0, b <= 1 ? g.push({
                  s: c.totalShapeLength * y,
                  e: c.totalShapeLength * b
                }) : 1 <= y ? g.push({
                  s: c.totalShapeLength * (y - 1),
                  e: c.totalShapeLength * (b - 1)
                }) : (g.push({
                  s: c.totalShapeLength * y,
                  e: c.totalShapeLength
                }), g.push({
                  s: 0,
                  e: c.totalShapeLength * (b - 1)
                }));
                var k = this.addShapes(c, g[0]);

                if (g[0].s !== g[0].e) {
                  if (1 < g.length) if (c.shape.paths.shapes[c.shape.paths._length - 1].c) {
                    var A = k.pop();
                    this.addPaths(k, u), k = this.addShapes(c, g[1], A);
                  } else this.addPaths(k, u), k = this.addShapes(c, g[1]);
                  this.addPaths(k, u);
                }
              }

              c.shape.paths = u;
            }
          }
        }
      }, H.prototype.addPaths = function (t, e) {
        var i,
            s = t.length;

        for (i = 0; i < s; i += 1) {
          e.addShape(t[i]);
        }
      }, H.prototype.addSegment = function (t, e, i, s, a, r, n) {
        a.setXYAt(e[0], e[1], "o", r), a.setXYAt(i[0], i[1], "i", r + 1), n && a.setXYAt(t[0], t[1], "v", r), a.setXYAt(s[0], s[1], "v", r + 1);
      }, H.prototype.addSegmentFromArray = function (t, e, i, s) {
        e.setXYAt(t[1], t[5], "o", i), e.setXYAt(t[2], t[6], "i", i + 1), s && e.setXYAt(t[0], t[4], "v", i), e.setXYAt(t[3], t[7], "v", i + 1);
      }, H.prototype.addShapes = function (t, e, i) {
        var s,
            a,
            r,
            n,
            h,
            o,
            l,
            p,
            f = t.pathsData,
            d = t.shape.paths.shapes,
            m = t.shape.paths._length,
            c = 0,
            u = [],
            g = !0;

        for (p = i ? (h = i._length, i._length) : (i = Mt.newElement(), h = 0), u.push(i), s = 0; s < m; s += 1) {
          for (o = f[s].lengths, i.c = d[s].c, r = d[s].c ? o.length : o.length + 1, a = 1; a < r; a += 1) {
            if (c + (n = o[a - 1]).addedLength < e.s) c += n.addedLength, i.c = !1;else {
              if (c > e.e) {
                i.c = !1;
                break;
              }

              e.s <= c && e.e >= c + n.addedLength ? (this.addSegment(d[s].v[a - 1], d[s].o[a - 1], d[s].i[a], d[s].v[a], i, h, g), g = !1) : (l = dt.getNewSegment(d[s].v[a - 1], d[s].v[a], d[s].o[a - 1], d[s].i[a], (e.s - c) / n.addedLength, (e.e - c) / n.addedLength, o[a - 1]), this.addSegmentFromArray(l, i, h, g), g = !1, i.c = !1), c += n.addedLength, h += 1;
            }
          }

          if (d[s].c && o.length) {
            if (n = o[a - 1], c <= e.e) {
              var v = o[a - 1].addedLength;
              e.s <= c && e.e >= c + v ? (this.addSegment(d[s].v[a - 1], d[s].o[a - 1], d[s].i[0], d[s].v[0], i, h, g), g = !1) : (l = dt.getNewSegment(d[s].v[a - 1], d[s].v[0], d[s].o[a - 1], d[s].i[0], (e.s - c) / v, (e.e - c) / v, o[a - 1]), this.addSegmentFromArray(l, i, h, g), g = !1, i.c = !1);
            } else i.c = !1;

            c += n.addedLength, h += 1;
          }

          if (i._length && (i.setXYAt(i.v[p][0], i.v[p][1], "i", p), i.setXYAt(i.v[i._length - 1][0], i.v[i._length - 1][1], "o", i._length - 1)), c > e.e) break;
          s < m - 1 && (i = Mt.newElement(), g = !0, u.push(i), h = 0);
        }

        return u;
      }, X.registerModifier("tm", H), T([Y], K), K.prototype.initModifierProperties = function (t, e) {
        this.getValue = this.processKeys, this.rd = z.getProp(t, e.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length;
      }, K.prototype.processPath = function (t, e) {
        var i = Mt.newElement();
        i.c = t.c;
        var s,
            a,
            r,
            n,
            h,
            o,
            l,
            p,
            f,
            d,
            m,
            c,
            u,
            g = t._length,
            v = 0;

        for (s = 0; s < g; s += 1) {
          a = t.v[s], n = t.o[s], r = t.i[s], a[0] === n[0] && a[1] === n[1] && a[0] === r[0] && a[1] === r[1] ? 0 !== s && s !== g - 1 || t.c ? (h = 0 === s ? t.v[g - 1] : t.v[s - 1], l = (o = Math.sqrt(Math.pow(a[0] - h[0], 2) + Math.pow(a[1] - h[1], 2))) ? Math.min(o / 2, e) / o : 0, p = c = a[0] + (h[0] - a[0]) * l, f = u = a[1] - (a[1] - h[1]) * l, d = p - (p - a[0]) * y, m = f - (f - a[1]) * y, i.setTripleAt(p, f, d, m, c, u, v), v += 1, h = s === g - 1 ? t.v[0] : t.v[s + 1], l = (o = Math.sqrt(Math.pow(a[0] - h[0], 2) + Math.pow(a[1] - h[1], 2))) ? Math.min(o / 2, e) / o : 0, p = d = a[0] + (h[0] - a[0]) * l, f = m = a[1] + (h[1] - a[1]) * l, c = p - (p - a[0]) * y, u = f - (f - a[1]) * y, i.setTripleAt(p, f, d, m, c, u, v)) : i.setTripleAt(a[0], a[1], n[0], n[1], r[0], r[1], v) : i.setTripleAt(t.v[s][0], t.v[s][1], t.o[s][0], t.o[s][1], t.i[s][0], t.i[s][1], v), v += 1;
        }

        return i;
      }, K.prototype.processShapes = function (t) {
        var e,
            i,
            s,
            a,
            r,
            n,
            h = this.shapes.length,
            o = this.rd.v;
        if (0 !== o) for (i = 0; i < h; i += 1) {
          if ((r = this.shapes[i]).shape.paths, n = r.localShapeCollection, r.shape._mdf || this._mdf || t) for (n.releaseShapes(), r.shape._mdf = !0, e = r.shape.paths.shapes, a = r.shape.paths._length, s = 0; s < a; s += 1) {
            n.addShape(this.processPath(e[s], o));
          }
          r.shape.paths = r.localShapeCollection;
        }
        this.dynamicProperties.length || (this._mdf = !1);
      }, X.registerModifier("rd", K), T([Y], J), J.prototype.initModifierProperties = function (t, e) {
        this.getValue = this.processKeys, this.c = z.getProp(t, e.c, 0, null, this), this.o = z.getProp(t, e.o, 0, null, this), this.tr = V.getTransformProperty(t, e.tr, this), this.so = z.getProp(t, e.tr.so, 0, .01, this), this.eo = z.getProp(t, e.tr.eo, 0, .01, this), this.data = e, this.dynamicProperties.length || this.getValue(!0), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new I(), this.rMatrix = new I(), this.sMatrix = new I(), this.tMatrix = new I(), this.matrix = new I();
      }, J.prototype.applyTransforms = function (t, e, i, s, a, r) {
        var n = r ? -1 : 1,
            h = s.s.v[0] + (1 - s.s.v[0]) * (1 - a),
            o = s.s.v[1] + (1 - s.s.v[1]) * (1 - a);
        t.translate(s.p.v[0] * n * a, s.p.v[1] * n * a, s.p.v[2]), e.translate(-s.a.v[0], -s.a.v[1], s.a.v[2]), e.rotate(-s.r.v * n * a), e.translate(s.a.v[0], s.a.v[1], s.a.v[2]), i.translate(-s.a.v[0], -s.a.v[1], s.a.v[2]), i.scale(r ? 1 / h : h, r ? 1 / o : o), i.translate(s.a.v[0], s.a.v[1], s.a.v[2]);
      }, J.prototype.init = function (t, e, i, s) {
        this.elem = t, this.arr = e, this.pos = i, this.elemsData = s, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e[i]);

        for (; 0 < i;) {
          i -= 1, this._elements.unshift(e[i]), 1;
        }

        this.dynamicProperties.length ? this.k = !0 : this.getValue(!0);
      }, J.prototype.resetElements = function (t) {
        var e,
            i = t.length;

        for (e = 0; e < i; e += 1) {
          t[e]._processed = !1, "gr" === t[e].ty && this.resetElements(t[e].it);
        }
      }, J.prototype.cloneElements = function (t) {
        t.length;
        var e = JSON.parse(JSON.stringify(t));
        return this.resetElements(e), e;
      }, J.prototype.changeGroupRender = function (t, e) {
        var i,
            s = t.length;

        for (i = 0; i < s; i += 1) {
          t[i]._render = e, "gr" === t[i].ty && this.changeGroupRender(t[i].it, e);
        }
      }, J.prototype.processShapes = function (t) {
        var e, i, s, a, r;

        if (this._mdf || t) {
          var n,
              h = Math.ceil(this.c.v);

          if (this._groups.length < h) {
            for (; this._groups.length < h;) {
              var o = {
                it: this.cloneElements(this._elements),
                ty: "gr"
              };
              o.it.push({
                a: {
                  a: 0,
                  ix: 1,
                  k: [0, 0]
                },
                nm: "Transform",
                o: {
                  a: 0,
                  ix: 7,
                  k: 100
                },
                p: {
                  a: 0,
                  ix: 2,
                  k: [0, 0]
                },
                r: {
                  a: 1,
                  ix: 6,
                  k: [{
                    s: 0,
                    e: 0,
                    t: 0
                  }, {
                    s: 0,
                    e: 0,
                    t: 1
                  }]
                },
                s: {
                  a: 0,
                  ix: 3,
                  k: [100, 100]
                },
                sa: {
                  a: 0,
                  ix: 5,
                  k: 0
                },
                sk: {
                  a: 0,
                  ix: 4,
                  k: 0
                },
                ty: "tr"
              }), this.arr.splice(0, 0, o), this._groups.splice(0, 0, o), this._currentCopies += 1;
            }

            this.elem.reloadShapes();
          }

          for (s = r = 0; s <= this._groups.length - 1; s += 1) {
            n = r < h, this._groups[s]._render = n, this.changeGroupRender(this._groups[s].it, n), r += 1;
          }

          this._currentCopies = h;
          var l = this.o.v,
              p = l % 1,
              f = 0 < l ? Math.floor(l) : Math.ceil(l),
              d = (this.tr.v.props, this.pMatrix.props),
              m = this.rMatrix.props,
              c = this.sMatrix.props;
          this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
          var u,
              g,
              v = 0;

          if (0 < l) {
            for (; v < f;) {
              this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), v += 1;
            }

            p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p, !1), v += p);
          } else if (l < 0) {
            for (; f < v;) {
              this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), v -= 1;
            }

            p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p, !0), v -= p);
          }

          for (s = 1 === this.data.m ? 0 : this._currentCopies - 1, a = 1 === this.data.m ? 1 : -1, r = this._currentCopies; r;) {
            if (g = (i = (e = this.elemsData[s].it)[e.length - 1].transform.mProps.v.props).length, e[e.length - 1].transform.mProps._mdf = !0, e[e.length - 1].transform.op._mdf = !0, e[e.length - 1].transform.op.v = this.so.v + (this.eo.v - this.so.v) * (s / (this._currentCopies - 1)), 0 !== v) {
              for ((0 !== s && 1 === a || s !== this._currentCopies - 1 && -1 === a) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), this.matrix.transform(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]), this.matrix.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), this.matrix.transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15]), u = 0; u < g; u += 1) {
                i[u] = this.matrix.props[u];
              }

              this.matrix.reset();
            } else for (this.matrix.reset(), u = 0; u < g; u += 1) {
              i[u] = this.matrix.props[u];
            }

            v += 1, r -= 1, s += a;
          }
        } else for (r = this._currentCopies, s = 0, a = 1; r;) {
          i = (e = this.elemsData[s].it)[e.length - 1].transform.mProps.v.props, e[e.length - 1].transform.mProps._mdf = !1, e[e.length - 1].transform.op._mdf = !1, r -= 1, s += a;
        }
      }, J.prototype.addShape = function () {}, X.registerModifier("rp", J), U.prototype.addShape = function (t) {
        this._length === this._maxLength && (this.shapes = this.shapes.concat(x(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = t, this._length += 1;
      }, U.prototype.releaseShapes = function () {
        var t;

        for (t = 0; t < this._length; t += 1) {
          Mt.release(this.shapes[t]);
        }

        this._length = 0;
      }, Z.prototype.getValue = function (t) {
        if ((this.elem.globalData.frameId !== this.frameId || t) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || t, this._mdf)) {
          var e = 0,
              i = this.dataProps.length;

          for ("svg" === this.renderer && (this.dashStr = ""), e = 0; e < i; e += 1) {
            "o" != this.dataProps[e].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v;
          }
        }
      }, T([E], Z), Q.prototype.comparePoints = function (t, e) {
        for (var i = 0, s = this.o.length / 2; i < s;) {
          if (.01 < Math.abs(t[4 * i] - t[4 * e + 2 * i])) return !1;
          i += 1;
        }

        return !0;
      }, Q.prototype.checkCollapsable = function () {
        if (this.o.length / 2 != this.c.length / 4) return !1;
        if (this.data.k.k[0].s) for (var t = 0, e = this.data.k.k.length; t < e;) {
          if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
          t += 1;
        } else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
        return !0;
      }, Q.prototype.getValue = function (t) {
        if (this.prop.getValue(), this._mdf = !1, this._cmdf = !1, this._omdf = !1, this.prop._mdf || t) {
          var e,
              i,
              s,
              a = 4 * this.data.p;

          for (e = 0; e < a; e += 1) {
            i = e % 4 == 0 ? 100 : 255, s = Math.round(this.prop.v[e] * i), this.c[e] !== s && (this.c[e] = s, this._cmdf = !t);
          }

          if (this.o.length) for (a = this.prop.v.length, e = 4 * this.data.p; e < a; e += 1) {
            i = e % 2 == 0 ? 100 : 1, s = e % 2 == 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e], this.o[e - 4 * this.data.p] !== s && (this.o[e - 4 * this.data.p] = s, this._omdf = !t);
          }
          this._mdf = !t;
        }
      }, T([E], Q);

      var $,
          tt,
          et = function et(t, e, i, s) {
        if (0 === e) return "";
        var a,
            r = t.o,
            n = t.i,
            h = t.v,
            o = " M" + s.applyToPointStringified(h[0][0], h[0][1]);

        for (a = 1; a < e; a += 1) {
          o += " C" + s.applyToPointStringified(r[a - 1][0], r[a - 1][1]) + " " + s.applyToPointStringified(n[a][0], n[a][1]) + " " + s.applyToPointStringified(h[a][0], h[a][1]);
        }

        return i && e && (o += " C" + s.applyToPointStringified(r[a - 1][0], r[a - 1][1]) + " " + s.applyToPointStringified(n[0][0], n[0][1]) + " " + s.applyToPointStringified(h[0][0], h[0][1]), o += "z"), o;
      },
          it = function () {
        var a = function () {
          var t = w("canvas");
          t.width = 1, t.height = 1;
          var e = t.getContext("2d");
          return e.fillStyle = "rgba(0,0,0,0)", e.fillRect(0, 0, 1, 1), t;
        }();

        function e() {
          this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null);
        }

        function r(t, e, i) {
          var s = "";
          if (t.e) s = t.p;else if (e) {
            var a = t.p;
            -1 !== a.indexOf("images/") && (a = a.split("/")[1]), s = e + a;
          } else s = i, s += t.u ? t.u : "", s += t.p;
          return s;
        }

        function t(t) {
          this._imageLoaded = e.bind(this), this.assetsPath = "", this.path = "", this.totalImages = 0, this.loadedAssets = 0, this.imagesLoadedCb = null, this.images = [];
        }

        return t.prototype = {
          loadAssets: function loadAssets(t, e) {
            this.imagesLoadedCb = e;
            var i,
                s = t.length;

            for (i = 0; i < s; i += 1) {
              t[i].layers || (this.totalImages += 1, this.images.push(this._createImageData(t[i])));
            }
          },
          setAssetsPath: function setAssetsPath(t) {
            this.assetsPath = t || "";
          },
          setPath: function setPath(t) {
            this.path = t || "";
          },
          loaded: function loaded() {
            return this.totalImages === this.loadedAssets;
          },
          destroy: function destroy() {
            this.imagesLoadedCb = null, this.images.length = 0;
          },
          getImage: function getImage(t) {
            for (var e = 0, i = this.images.length; e < i;) {
              if (this.images[e].assetData === t) return this.images[e].img;
              e += 1;
            }
          },
          createImgData: function createImgData(t) {
            var e = r(t, this.assetsPath, this.path),
                i = w("img");
            i.crossOrigin = "anonymous", i.addEventListener("load", this._imageLoaded, !1), i.addEventListener("error", function () {
              s.img = a, this._imageLoaded();
            }.bind(this), !1), i.src = e;
            var s = {
              img: i,
              assetData: t
            };
            return s;
          },
          createImageData: function createImageData(t) {
            var e = r(t, this.assetsPath, this.path),
                i = S("image");
            i.addEventListener("load", this._imageLoaded, !1), i.addEventListener("error", function () {
              s.img = a, this._imageLoaded();
            }.bind(this), !1), i.setAttributeNS("http://www.w3.org/1999/xlink", "href", e);
            var s = {
              img: i,
              assetData: t
            };
            return s;
          },
          imageLoaded: e,
          setCacheType: function setCacheType(t) {
            this._createImageData = "svg" === t ? this.createImageData.bind(this) : this.createImgData.bind(this);
          }
        }, t;
      }(),
          st = ($ = {
        maskType: !0
      }, (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && ($.maskType = !1), $),
          at = ((tt = {}).createFilter = function (t) {
        var e = S("filter");
        return e.setAttribute("id", t), e.setAttribute("filterUnits", "objectBoundingBox"), e.setAttribute("x", "0%"), e.setAttribute("y", "0%"), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), e;
      }, tt.createAlphaToLuminanceFilter = function () {
        var t = S("feColorMatrix");
        return t.setAttribute("type", "matrix"), t.setAttribute("color-interpolation-filters", "sRGB"), t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), t;
      }, tt),
          rt = function () {
        function r(t) {
          return t.response && "object" == _typeof(t.response) ? t.response : t.response && "string" == typeof t.response ? JSON.parse(t.response) : t.responseText ? JSON.parse(t.responseText) : void 0;
        }

        return {
          load: function load(t, e, i) {
            var s,
                a = new XMLHttpRequest();
            a.open("GET", t, !0);

            try {
              a.responseType = "json";
            } catch (t) {}

            a.send(), a.onreadystatechange = function () {
              if (4 == a.readyState) if (200 == a.status) s = r(a), e(s);else try {
                s = r(a), e(s);
              } catch (t) {
                i && i(t);
              }
            };
          }
        };
      }();

      function nt(t, e, i) {
        this._isFirstFrame = !0, this._hasMaskedPath = !1, this._frameId = -1, this._textData = t, this._renderType = e, this._elem = i, this._animatorsData = x(this._textData.a.length), this._pathData = {}, this._moreOptions = {
          alignment: {}
        }, this.renderedLetters = [], this.lettersChangedFlag = !1, this.initDynamicPropertyContainer(i);
      }

      function ht(t, e, i) {
        var s = {
          propType: !1
        },
            a = z.getProp,
            r = e.a;
        this.a = {
          r: r.r ? a(t, r.r, 0, q, i) : s,
          rx: r.rx ? a(t, r.rx, 0, q, i) : s,
          ry: r.ry ? a(t, r.ry, 0, q, i) : s,
          sk: r.sk ? a(t, r.sk, 0, q, i) : s,
          sa: r.sa ? a(t, r.sa, 0, q, i) : s,
          s: r.s ? a(t, r.s, 1, .01, i) : s,
          a: r.a ? a(t, r.a, 1, 0, i) : s,
          o: r.o ? a(t, r.o, 0, .01, i) : s,
          p: r.p ? a(t, r.p, 1, 0, i) : s,
          sw: r.sw ? a(t, r.sw, 0, 0, i) : s,
          sc: r.sc ? a(t, r.sc, 1, 0, i) : s,
          fc: r.fc ? a(t, r.fc, 1, 0, i) : s,
          fh: r.fh ? a(t, r.fh, 0, 0, i) : s,
          fs: r.fs ? a(t, r.fs, 0, .01, i) : s,
          fb: r.fb ? a(t, r.fb, 0, .01, i) : s,
          t: r.t ? a(t, r.t, 0, 0, i) : s
        }, this.s = bt.getTextSelectorProp(t, e.s, i), this.s.t = e.s.t;
      }

      function mt(t, e, i, s, a, r) {
        this.o = t, this.sw = e, this.sc = i, this.fc = s, this.m = a, this.p = r, this._mdf = {
          o: !0,
          sw: !!e,
          sc: !!i,
          fc: !!s,
          m: !0,
          p: !0
        };
      }

      function ot(t, e) {
        this._frameId = i, this.pv = "", this.v = "", this.kf = !1, this._isFirstFrame = !0, this._mdf = !1, this.data = e, this.elem = t, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = !1, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = {
          ascent: 0,
          boxWidth: this.defaultBoxWidth,
          f: "",
          fStyle: "",
          fWeight: "",
          fc: "",
          j: "",
          justifyOffset: "",
          l: [],
          lh: 0,
          lineWidths: [],
          ls: "",
          of: "",
          s: "",
          sc: "",
          sw: 0,
          t: 0,
          tr: 0,
          sz: 0,
          ps: null,
          fillColorAnim: !1,
          strokeColorAnim: !1,
          strokeWidthAnim: !1,
          yOffset: 0,
          finalSize: 0,
          finalText: [],
          finalLineHeight: 0,
          __complete: !1
        }, this.copyData(this.currentData, this.data.d.k[0].s), this.searchProperty() || this.completeTextData(this.currentData);
      }

      nt.prototype.searchProperties = function () {
        var t,
            e,
            i = this._textData.a.length,
            s = z.getProp;

        for (t = 0; t < i; t += 1) {
          e = this._textData.a[t], this._animatorsData[t] = new ht(this._elem, e, this);
        }

        this._textData.p && "m" in this._textData.p ? (this._pathData = {
          f: s(this._elem, this._textData.p.f, 0, 0, this),
          l: s(this._elem, this._textData.p.l, 0, 0, this),
          r: this._textData.p.r,
          m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
        }, this._hasMaskedPath = !0) : this._hasMaskedPath = !1, this._moreOptions.alignment = s(this._elem, this._textData.m.a, 1, 0, this);
      }, nt.prototype.getMeasures = function (t, e) {
        if (this.lettersChangedFlag = e, this._mdf || this._isFirstFrame || e || this._hasMaskedPath && this._pathData.m._mdf) {
          this._isFirstFrame = !1;

          var i,
              s,
              a,
              r,
              n,
              h,
              o,
              l,
              p,
              f,
              d,
              m,
              c,
              u,
              g,
              v,
              y,
              b,
              _,
              k = this._moreOptions.alignment.v,
              A = this._animatorsData,
              M = this._textData,
              C = this.mHelper,
              P = this._renderType,
              x = this.renderedLetters.length,
              S = (this.data, t.l);

          if (this._hasMaskedPath) {
            if (_ = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
              var w,
                  E = _.v;

              for (this._pathData.r && (E = E.reverse()), n = {
                tLength: 0,
                segments: []
              }, r = E._length - 1, a = v = 0; a < r; a += 1) {
                w = dt.buildBezierData(E.v[a], E.v[a + 1], [E.o[a][0] - E.v[a][0], E.o[a][1] - E.v[a][1]], [E.i[a + 1][0] - E.v[a + 1][0], E.i[a + 1][1] - E.v[a + 1][1]]), n.tLength += w.segmentLength, n.segments.push(w), v += w.segmentLength;
              }

              a = r, _.v.c && (w = dt.buildBezierData(E.v[a], E.v[0], [E.o[a][0] - E.v[a][0], E.o[a][1] - E.v[a][1]], [E.i[0][0] - E.v[0][0], E.i[0][1] - E.v[0][1]]), n.tLength += w.segmentLength, n.segments.push(w), v += w.segmentLength), this._pathData.pi = n;
            }

            if (n = this._pathData.pi, h = this._pathData.f.v, f = 1, p = !(l = d = 0), u = n.segments, h < 0 && _.v.c) for (n.tLength < Math.abs(h) && (h = -Math.abs(h) % n.tLength), f = (c = u[d = u.length - 1].points).length - 1; h < 0;) {
              h += c[f].partialLength, (f -= 1) < 0 && (f = (c = u[d -= 1].points).length - 1);
            }
            m = (c = u[d].points)[f - 1], g = (o = c[f]).partialLength;
          }

          r = S.length, s = i = 0;
          var F,
              D,
              T,
              I,
              L = 1.2 * t.finalSize * .714,
              R = !0;
          T = A.length;
          var z,
              V,
              N,
              O,
              B,
              q,
              j,
              G,
              W,
              X,
              Y,
              H,
              K,
              J = -1,
              U = h,
              Z = d,
              Q = f,
              $ = -1,
              tt = "",
              et = this.defaultPropsArray;

          if (2 === t.j || 1 === t.j) {
            var it = 0,
                st = 0,
                at = 2 === t.j ? -.5 : -1,
                rt = 0,
                nt = !0;

            for (a = 0; a < r; a += 1) {
              if (S[a].n) {
                for (it && (it += st); rt < a;) {
                  S[rt].animatorJustifyOffset = it, rt += 1;
                }

                nt = !(it = 0);
              } else {
                for (D = 0; D < T; D += 1) {
                  (F = A[D].a).t.propType && (nt && 2 === t.j && (st += F.t.v * at), (z = A[D].s.getMult(S[a].anIndexes[D], M.a[D].s.totalChars)).length ? it += F.t.v * z[0] * at : it += F.t.v * z * at);
                }

                nt = !1;
              }
            }

            for (it && (it += st); rt < a;) {
              S[rt].animatorJustifyOffset = it, rt += 1;
            }
          }

          for (a = 0; a < r; a += 1) {
            if (C.reset(), B = 1, S[a].n) i = 0, s += t.yOffset, s += R ? 1 : 0, h = U, R = !1, 0, this._hasMaskedPath && (f = Q, m = (c = u[d = Z].points)[f - 1], g = (o = c[f]).partialLength, l = 0), K = X = H = tt = "", et = this.defaultPropsArray;else {
              if (this._hasMaskedPath) {
                if ($ !== S[a].line) {
                  switch (t.j) {
                    case 1:
                      h += v - t.lineWidths[S[a].line];
                      break;

                    case 2:
                      h += (v - t.lineWidths[S[a].line]) / 2;
                  }

                  $ = S[a].line;
                }

                J !== S[a].ind && (S[J] && (h += S[J].extra), h += S[a].an / 2, J = S[a].ind), h += k[0] * S[a].an / 200;
                var ht = 0;

                for (D = 0; D < T; D += 1) {
                  (F = A[D].a).p.propType && ((z = A[D].s.getMult(S[a].anIndexes[D], M.a[D].s.totalChars)).length ? ht += F.p.v[0] * z[0] : ht += F.p.v[0] * z), F.a.propType && ((z = A[D].s.getMult(S[a].anIndexes[D], M.a[D].s.totalChars)).length ? ht += F.a.v[0] * z[0] : ht += F.a.v[0] * z);
                }

                for (p = !0; p;) {
                  h + ht <= l + g || !c ? (y = (h + ht - l) / o.partialLength, N = m.point[0] + (o.point[0] - m.point[0]) * y, O = m.point[1] + (o.point[1] - m.point[1]) * y, C.translate(-k[0] * S[a].an / 200, -k[1] * L / 100), p = !1) : c && (l += o.partialLength, (f += 1) >= c.length && (f = 0, c = u[d += 1] ? u[d].points : _.v.c ? u[d = f = 0].points : (l -= o.partialLength, null)), c && (m = o, g = (o = c[f]).partialLength));
                }

                V = S[a].an / 2 - S[a].add, C.translate(-V, 0, 0);
              } else V = S[a].an / 2 - S[a].add, C.translate(-V, 0, 0), C.translate(-k[0] * S[a].an / 200, -k[1] * L / 100, 0);

              for (S[a].l / 2, D = 0; D < T; D += 1) {
                (F = A[D].a).t.propType && (z = A[D].s.getMult(S[a].anIndexes[D], M.a[D].s.totalChars), 0 === i && 0 === t.j || (this._hasMaskedPath ? z.length ? h += F.t.v * z[0] : h += F.t.v * z : z.length ? i += F.t.v * z[0] : i += F.t.v * z));
              }

              for (S[a].l / 2, t.strokeWidthAnim && (j = t.sw || 0), t.strokeColorAnim && (q = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]), t.fillColorAnim && t.fc && (G = [t.fc[0], t.fc[1], t.fc[2]]), D = 0; D < T; D += 1) {
                (F = A[D].a).a.propType && ((z = A[D].s.getMult(S[a].anIndexes[D], M.a[D].s.totalChars)).length ? C.translate(-F.a.v[0] * z[0], -F.a.v[1] * z[1], F.a.v[2] * z[2]) : C.translate(-F.a.v[0] * z, -F.a.v[1] * z, F.a.v[2] * z));
              }

              for (D = 0; D < T; D += 1) {
                (F = A[D].a).s.propType && ((z = A[D].s.getMult(S[a].anIndexes[D], M.a[D].s.totalChars)).length ? C.scale(1 + (F.s.v[0] - 1) * z[0], 1 + (F.s.v[1] - 1) * z[1], 1) : C.scale(1 + (F.s.v[0] - 1) * z, 1 + (F.s.v[1] - 1) * z, 1));
              }

              for (D = 0; D < T; D += 1) {
                if (F = A[D].a, z = A[D].s.getMult(S[a].anIndexes[D], M.a[D].s.totalChars), F.sk.propType && (z.length ? C.skewFromAxis(-F.sk.v * z[0], F.sa.v * z[1]) : C.skewFromAxis(-F.sk.v * z, F.sa.v * z)), F.r.propType && (z.length ? C.rotateZ(-F.r.v * z[2]) : C.rotateZ(-F.r.v * z)), F.ry.propType && (z.length ? C.rotateY(F.ry.v * z[1]) : C.rotateY(F.ry.v * z)), F.rx.propType && (z.length ? C.rotateX(F.rx.v * z[0]) : C.rotateX(F.rx.v * z)), F.o.propType && (z.length ? B += (F.o.v * z[0] - B) * z[0] : B += (F.o.v * z - B) * z), t.strokeWidthAnim && F.sw.propType && (z.length ? j += F.sw.v * z[0] : j += F.sw.v * z), t.strokeColorAnim && F.sc.propType) for (W = 0; W < 3; W += 1) {
                  z.length ? q[W] = q[W] + (F.sc.v[W] - q[W]) * z[0] : q[W] = q[W] + (F.sc.v[W] - q[W]) * z;
                }

                if (t.fillColorAnim && t.fc) {
                  if (F.fc.propType) for (W = 0; W < 3; W += 1) {
                    z.length ? G[W] = G[W] + (F.fc.v[W] - G[W]) * z[0] : G[W] = G[W] + (F.fc.v[W] - G[W]) * z;
                  }
                  F.fh.propType && (G = z.length ? ft(G, F.fh.v * z[0]) : ft(G, F.fh.v * z)), F.fs.propType && (G = z.length ? lt(G, F.fs.v * z[0]) : lt(G, F.fs.v * z)), F.fb.propType && (G = z.length ? pt(G, F.fb.v * z[0]) : pt(G, F.fb.v * z));
                }
              }

              for (D = 0; D < T; D += 1) {
                (F = A[D].a).p.propType && (z = A[D].s.getMult(S[a].anIndexes[D], M.a[D].s.totalChars), this._hasMaskedPath ? z.length ? C.translate(0, F.p.v[1] * z[0], -F.p.v[2] * z[1]) : C.translate(0, F.p.v[1] * z, -F.p.v[2] * z) : z.length ? C.translate(F.p.v[0] * z[0], F.p.v[1] * z[1], -F.p.v[2] * z[2]) : C.translate(F.p.v[0] * z, F.p.v[1] * z, -F.p.v[2] * z));
              }

              if (t.strokeWidthAnim && (X = j < 0 ? 0 : j), t.strokeColorAnim && (Y = "rgb(" + Math.round(255 * q[0]) + "," + Math.round(255 * q[1]) + "," + Math.round(255 * q[2]) + ")"), t.fillColorAnim && t.fc && (H = "rgb(" + Math.round(255 * G[0]) + "," + Math.round(255 * G[1]) + "," + Math.round(255 * G[2]) + ")"), this._hasMaskedPath) {
                if (C.translate(0, -t.ls), C.translate(0, k[1] * L / 100 + s, 0), M.p.p) {
                  b = (o.point[1] - m.point[1]) / (o.point[0] - m.point[0]);
                  var ot = 180 * Math.atan(b) / Math.PI;
                  o.point[0] < m.point[0] && (ot += 180), C.rotate(-ot * Math.PI / 180);
                }

                C.translate(N, O, 0), h -= k[0] * S[a].an / 200, S[a + 1] && J !== S[a + 1].ind && (h += S[a].an / 2, h += t.tr / 1e3 * t.finalSize);
              } else {
                switch (C.translate(i, s, 0), t.ps && C.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
                  case 1:
                    C.translate(S[a].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[S[a].line]), 0, 0);
                    break;

                  case 2:
                    C.translate(S[a].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[S[a].line]) / 2, 0, 0);
                }

                C.translate(0, -t.ls), C.translate(V, 0, 0), C.translate(k[0] * S[a].an / 200, k[1] * L / 100, 0), i += S[a].l + t.tr / 1e3 * t.finalSize;
              }

              "html" === P ? tt = C.toCSS() : "svg" === P ? tt = C.to2dCSS() : et = [C.props[0], C.props[1], C.props[2], C.props[3], C.props[4], C.props[5], C.props[6], C.props[7], C.props[8], C.props[9], C.props[10], C.props[11], C.props[12], C.props[13], C.props[14], C.props[15]], K = B;
            }
            this.lettersChangedFlag = x <= a ? (I = new mt(K, X, Y, H, tt, et), this.renderedLetters.push(I), x += 1, !0) : (I = this.renderedLetters[a]).update(K, X, Y, H, tt, et) || this.lettersChangedFlag;
          }
        }
      }, nt.prototype.getValue = function () {
        this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties());
      }, nt.prototype.mHelper = new I(), nt.prototype.defaultPropsArray = [], T([E], nt), mt.prototype.update = function (t, e, i, s, a, r) {
        this._mdf.o = !1, this._mdf.sw = !1, this._mdf.sc = !1, this._mdf.fc = !1, this._mdf.m = !1;
        var n = this._mdf.p = !1;
        return this.o !== t && (this.o = t, n = this._mdf.o = !0), this.sw !== e && (this.sw = e, n = this._mdf.sw = !0), this.sc !== i && (this.sc = i, n = this._mdf.sc = !0), this.fc !== s && (this.fc = s, n = this._mdf.fc = !0), this.m !== a && (this.m = a, n = this._mdf.m = !0), !r.length || this.p[0] === r[0] && this.p[1] === r[1] && this.p[4] === r[4] && this.p[5] === r[5] && this.p[12] === r[12] && this.p[13] === r[13] || (this.p = r, n = this._mdf.p = !0), n;
      }, ot.prototype.defaultBoxWidth = [0, 0], ot.prototype.copyData = function (t, e) {
        for (var i in e) {
          e.hasOwnProperty(i) && (t[i] = e[i]);
        }

        return t;
      }, ot.prototype.setCurrentData = function (t) {
        t.__complete || this.completeTextData(t), this.currentData = t, this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth, this._mdf = !0;
      }, ot.prototype.searchProperty = function () {
        return this.searchKeyframes();
      }, ot.prototype.searchKeyframes = function () {
        return this.kf = 1 < this.data.d.k.length, this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf;
      }, ot.prototype.addEffect = function (t) {
        this.effectsSequence.push(t), this.elem.addDynamicProperty(this);
      }, ot.prototype.getValue = function (t) {
        if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length || t) {
          this.currentData.t = this.data.d.k[this.keysIndex].s.t;
          var e = this.currentData,
              i = this.keysIndex;
          if (this.lock) this.setCurrentData(this.currentData);else {
            this.lock = !0, this._mdf = !1;
            var s,
                a = this.effectsSequence.length,
                r = t || this.data.d.k[this.keysIndex].s;

            for (s = 0; s < a; s += 1) {
              r = i !== this.keysIndex ? this.effectsSequence[s](r, r.t) : this.effectsSequence[s](this.currentData, r.t);
            }

            e !== r && this.setCurrentData(r), this.pv = this.v = this.currentData, this.lock = !1, this.frameId = this.elem.globalData.frameId;
          }
        }
      }, ot.prototype.getKeyframeValue = function () {
        for (var t = this.data.d.k, e = this.elem.comp.renderedFrame, i = 0, s = t.length; i <= s - 1 && (t[i].s, !(i === s - 1 || t[i + 1].t > e));) {
          i += 1;
        }

        return this.keysIndex !== i && (this.keysIndex = i), this.data.d.k[this.keysIndex].s;
      }, ot.prototype.buildFinalText = function (t) {
        for (var e, i = R.getCombinedCharacterCodes(), s = [], a = 0, r = t.length; a < r;) {
          e = t.charCodeAt(a), -1 !== i.indexOf(e) ? s[s.length - 1] += t.charAt(a) : 55296 <= e && e <= 56319 && 56320 <= (e = t.charCodeAt(a + 1)) && e <= 57343 ? (s.push(t.substr(a, 2)), ++a) : s.push(t.charAt(a)), a += 1;
        }

        return s;
      }, ot.prototype.completeTextData = function (t) {
        t.__complete = !0;
        var e,
            i,
            s,
            a,
            r,
            n,
            h,
            o = this.elem.globalData.fontManager,
            l = this.data,
            p = [],
            f = 0,
            d = l.m.g,
            m = 0,
            c = 0,
            u = 0,
            g = [],
            v = 0,
            y = 0,
            b = o.getFontByName(t.f),
            _ = 0,
            k = b.fStyle ? b.fStyle.split(" ") : [],
            A = "normal",
            M = "normal";

        for (i = k.length, e = 0; e < i; e += 1) {
          switch (k[e].toLowerCase()) {
            case "italic":
              M = "italic";
              break;

            case "bold":
              A = "700";
              break;

            case "black":
              A = "900";
              break;

            case "medium":
              A = "500";
              break;

            case "regular":
            case "normal":
              A = "400";
              break;

            case "light":
            case "thin":
              A = "200";
          }
        }

        t.fWeight = b.fWeight || A, t.fStyle = M, t.finalSize = t.s, t.finalText = this.buildFinalText(t.t), i = t.finalText.length, t.finalLineHeight = t.lh;
        var C,
            P = t.tr / 1e3 * t.finalSize;
        if (t.sz) for (var x, S, w = !0, E = t.sz[0], F = t.sz[1]; w;) {
          v = x = 0, i = (S = this.buildFinalText(t.t)).length, P = t.tr / 1e3 * t.finalSize;
          var D = -1;

          for (e = 0; e < i; e += 1) {
            C = S[e].charCodeAt(0), s = !1, " " === S[e] ? D = e : 13 !== C && 3 !== C || (s = !(v = 0), x += t.finalLineHeight || 1.2 * t.finalSize), E < v + (_ = o.chars ? (h = o.getCharData(S[e], b.fStyle, b.fFamily), s ? 0 : h.w * t.finalSize / 100) : o.measureText(S[e], t.f, t.finalSize)) && " " !== S[e] ? (-1 === D ? i += 1 : e = D, x += t.finalLineHeight || 1.2 * t.finalSize, S.splice(e, D === e ? 1 : 0, "\r"), D = -1, v = 0) : (v += _, v += P);
          }

          x += b.ascent * t.finalSize / 100, this.canResize && t.finalSize > this.minimumFontSize && F < x ? (t.finalSize -= 1, t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = S, i = t.finalText.length, w = !1);
        }
        v = -P;
        var T,
            I = _ = 0;

        for (e = 0; e < i; e += 1) {
          if (s = !1, 13 === (C = (T = t.finalText[e]).charCodeAt(0)) || 3 === C ? (I = 0, g.push(v), y = y < v ? v : y, v = -2 * P, s = !(a = ""), u += 1) : a = T, _ = o.chars ? (h = o.getCharData(T, b.fStyle, o.getFontByName(t.f).fFamily), s ? 0 : h.w * t.finalSize / 100) : o.measureText(a, t.f, t.finalSize), " " === T ? I += _ + P : (v += _ + P + I, I = 0), p.push({
            l: _,
            an: _,
            add: m,
            n: s,
            anIndexes: [],
            val: a,
            line: u,
            animatorJustifyOffset: 0
          }), 2 == d) {
            if (m += _, "" === a || " " === a || e === i - 1) {
              for ("" !== a && " " !== a || (m -= _); c <= e;) {
                p[c].an = m, p[c].ind = f, p[c].extra = _, c += 1;
              }

              f += 1, m = 0;
            }
          } else if (3 == d) {
            if (m += _, "" === a || e === i - 1) {
              for ("" === a && (m -= _); c <= e;) {
                p[c].an = m, p[c].ind = f, p[c].extra = _, c += 1;
              }

              m = 0, f += 1;
            }
          } else p[f].ind = f, p[f].extra = 0, f += 1;
        }

        if (t.l = p, y = y < v ? v : y, g.push(v), t.sz) t.boxWidth = t.sz[0], t.justifyOffset = 0;else switch (t.boxWidth = y, t.j) {
          case 1:
            t.justifyOffset = -t.boxWidth;
            break;

          case 2:
            t.justifyOffset = -t.boxWidth / 2;
            break;

          default:
            t.justifyOffset = 0;
        }
        t.lineWidths = g;
        var L,
            R,
            z = l.a;
        n = z.length;
        var V,
            N,
            O = [];

        for (r = 0; r < n; r += 1) {
          for ((L = z[r]).a.sc && (t.strokeColorAnim = !0), L.a.sw && (t.strokeWidthAnim = !0), (L.a.fc || L.a.fh || L.a.fs || L.a.fb) && (t.fillColorAnim = !0), N = 0, V = L.s.b, e = 0; e < i; e += 1) {
            (R = p[e]).anIndexes[r] = N, (1 == V && "" !== R.val || 2 == V && "" !== R.val && " " !== R.val || 3 == V && (R.n || " " == R.val || e == i - 1) || 4 == V && (R.n || e == i - 1)) && (1 === L.s.rn && O.push(N), N += 1);
          }

          l.a[r].s.totalChars = N;
          var B,
              q = -1;
          if (1 === L.s.rn) for (e = 0; e < i; e += 1) {
            q != (R = p[e]).anIndexes[r] && (q = R.anIndexes[r], B = O.splice(Math.floor(Math.random() * O.length), 1)[0]), R.anIndexes[r] = B;
          }
        }

        t.yOffset = t.finalLineHeight || 1.2 * t.finalSize, t.ls = t.ls || 0, t.ascent = b.ascent * t.finalSize / 100;
      }, ot.prototype.updateDocumentData = function (t, e) {
        e = void 0 === e ? this.keysIndex : e;
        var i = this.copyData({}, this.data.d.k[e].s);
        i = this.copyData(i, t), this.data.d.k[e].s = i, this.recalculate(e), this.elem.addDynamicProperty(this);
      }, ot.prototype.recalculate = function (t) {
        var e = this.data.d.k[t].s;
        e.__complete = !1, this.keysIndex = 0, this._isFirstFrame = !0, this.getValue(e);
      }, ot.prototype.canResizeFont = function (t) {
        this.canResize = t, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
      }, ot.prototype.setMinimumFontSize = function (t) {
        this.minimumFontSize = Math.floor(t) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
      };

      var ct,
          ut,
          gt,
          vt,
          yt,
          bt = function () {
        var m = Math.max,
            c = Math.min,
            u = Math.floor;

        function s(t, e) {
          this._currentTextLength = -1, this.k = !1, this.data = e, this.elem = t, this.comp = t.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(t), this.s = z.getProp(t, e.s || {
            k: 0
          }, 0, 0, this), this.e = "e" in e ? z.getProp(t, e.e, 0, 0, this) : {
            v: 100
          }, this.o = z.getProp(t, e.o || {
            k: 0
          }, 0, 0, this), this.xe = z.getProp(t, e.xe || {
            k: 0
          }, 0, 0, this), this.ne = z.getProp(t, e.ne || {
            k: 0
          }, 0, 0, this), this.a = z.getProp(t, e.a, 0, .01, this), this.dynamicProperties.length || this.getValue();
        }

        return s.prototype = {
          getMult: function getMult(t) {
            this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
            var e = 0,
                i = 0,
                s = 1,
                a = 1;
            0 < this.ne.v ? e = this.ne.v / 100 : i = -this.ne.v / 100, 0 < this.xe.v ? s = 1 - this.xe.v / 100 : a = 1 + this.xe.v / 100;
            var r = G.getBezierEasing(e, i, s, a).get,
                n = 0,
                h = this.finalS,
                o = this.finalE,
                l = this.data.sh;
            if (2 === l) n = r(n = o === h ? o <= t ? 1 : 0 : m(0, c(.5 / (o - h) + (t - h) / (o - h), 1)));else if (3 === l) n = r(n = o === h ? o <= t ? 0 : 1 : 1 - m(0, c(.5 / (o - h) + (t - h) / (o - h), 1)));else if (4 === l) o === h ? n = 0 : (n = m(0, c(.5 / (o - h) + (t - h) / (o - h), 1))) < .5 ? n *= 2 : n = 1 - 2 * (n - .5), n = r(n);else if (5 === l) {
              if (o === h) n = 0;else {
                var p = o - h,
                    f = -p / 2 + (t = c(m(0, t + .5 - h), o - h)),
                    d = p / 2;
                n = Math.sqrt(1 - f * f / (d * d));
              }
              n = r(n);
            } else n = 6 === l ? r(n = o === h ? 0 : (t = c(m(0, t + .5 - h), o - h), (1 + Math.cos(Math.PI + 2 * Math.PI * t / (o - h))) / 2)) : (t >= u(h) && (n = m(0, c(t - h < 0 ? c(o, 1) - (h - t) : o - t, 1))), r(n));
            return n * this.a.v;
          },
          getValue: function getValue(t) {
            this.iterateDynamicProperties(), this._mdf = t || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, t && 2 === this.data.r && (this.e.v = this._currentTextLength);
            var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars,
                i = this.o.v / e,
                s = this.s.v / e + i,
                a = this.e.v / e + i;

            if (a < s) {
              var r = s;
              s = a, a = r;
            }

            this.finalS = s, this.finalE = a;
          }
        }, T([E], s), {
          getTextSelectorProp: function getTextSelectorProp(t, e, i) {
            return new s(t, e, i);
          }
        };
      }(),
          _t = function _t(t, e, i, s) {
        var a = 0,
            r = t,
            n = x(r);

        function h() {
          return a ? n[a -= 1] : e();
        }

        return {
          newElement: h,
          release: function release(t) {
            a === r && (n = kt["double"](n), r *= 2), i && i(t), n[a] = t, a += 1;
          }
        };
      },
          kt = {
        "double": function double(t) {
          return t.concat(x(t.length));
        }
      },
          At = _t(8, function () {
        return j("float32", 2);
      }),
          Mt = ((ct = _t(4, function () {
        return new N();
      }, function (t) {
        var e,
            i = t._length;

        for (e = 0; e < i; e += 1) {
          At.release(t.v[e]), At.release(t.i[e]), At.release(t.o[e]), t.v[e] = null, t.i[e] = null, t.o[e] = null;
        }

        t._length = 0, t.c = !1;
      })).clone = function (t) {
        var e,
            i = ct.newElement(),
            s = void 0 === t._length ? t.v.length : t._length;

        for (i.setLength(s), i.c = t.c, e = 0; e < s; e += 1) {
          i.setTripleAt(t.v[e][0], t.v[e][1], t.o[e][0], t.o[e][1], t.i[e][0], t.i[e][1], e);
        }

        return i;
      }, ct),
          Ct = (ut = {
        newShapeCollection: function newShapeCollection() {
          var t;
          t = gt ? yt[gt -= 1] : new U();
          return t;
        },
        release: function release(t) {
          var e,
              i = t._length;

          for (e = 0; e < i; e += 1) {
            Mt.release(t.shapes[e]);
          }

          t._length = 0, gt === vt && (yt = kt["double"](yt), vt *= 2);
          yt[gt] = t, gt += 1;
        }
      }, gt = 0, yt = x(vt = 4), ut),
          Pt = _t(8, function () {
        return {
          lengths: [],
          totalLength: 0
        };
      }, function (t) {
        var e,
            i = t.lengths.length;

        for (e = 0; e < i; e += 1) {
          xt.release(t.lengths[e]);
        }

        t.lengths.length = 0;
      }),
          xt = _t(8, function () {
        return {
          addedLength: 0,
          percents: j("float32", M),
          lengths: j("float32", M)
        };
      });

      function St() {}

      function wt(t, e) {
        this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.svgElement = S("svg");
        var i = "";

        if (e && e.title) {
          var s = S("title"),
              a = C();
          s.setAttribute("id", a), s.textContent = e.title, this.svgElement.appendChild(s), i += a;
        }

        if (e && e.description) {
          var r = S("desc"),
              n = C();
          r.setAttribute("id", n), r.textContent = e.description, this.svgElement.appendChild(r), i += " " + n;
        }

        i && this.svgElement.setAttribute("aria-labelledby", i);
        var h = S("defs");
        this.svgElement.appendChild(h);
        var o = S("g");
        this.svgElement.appendChild(o), this.layerElement = o, this.renderConfig = {
          preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
          imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
          progressiveLoad: e && e.progressiveLoad || !1,
          hideOnTransparent: !e || !1 !== e.hideOnTransparent,
          viewBoxOnly: e && e.viewBoxOnly || !1,
          viewBoxSize: e && e.viewBoxSize || !1,
          className: e && e.className || "",
          id: e && e.id || "",
          focusable: e && e.focusable,
          filterSize: {
            width: e && e.filterSize && e.filterSize.width || "100%",
            height: e && e.filterSize && e.filterSize.height || "100%",
            x: e && e.filterSize && e.filterSize.x || "0%",
            y: e && e.filterSize && e.filterSize.y || "0%"
          }
        }, this.globalData = {
          _mdf: !1,
          frameNum: -1,
          defs: h,
          renderConfig: this.renderConfig
        }, this.elements = [], this.pendingElements = [], this.destroyed = !1, this.rendererType = "svg";
      }

      function Et(t, e, i) {
        this.data = t, this.element = e, this.globalData = i, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
        var s,
            a = this.globalData.defs,
            r = this.masksProperties ? this.masksProperties.length : 0;
        this.viewData = x(r), this.solidPath = "";
        var n,
            h,
            o,
            l,
            p,
            f,
            d,
            m = this.masksProperties,
            c = 0,
            u = [],
            g = C(),
            v = "clipPath",
            y = "clip-path";

        for (s = 0; s < r; s++) {
          if (("a" !== m[s].mode && "n" !== m[s].mode || m[s].inv || 100 !== m[s].o.k || m[s].o.x) && (y = v = "mask"), "s" != m[s].mode && "i" != m[s].mode || 0 !== c ? l = null : ((l = S("rect")).setAttribute("fill", "#ffffff"), l.setAttribute("width", this.element.comp.data.w || 0), l.setAttribute("height", this.element.comp.data.h || 0), u.push(l)), n = S("path"), "n" != m[s].mode) {
            var b;

            if (c += 1, n.setAttribute("fill", "s" === m[s].mode ? "#000000" : "#ffffff"), n.setAttribute("clip-rule", "nonzero"), 0 !== m[s].x.k ? (y = v = "mask", d = z.getProp(this.element, m[s].x, 0, null, this.element), b = C(), (p = S("filter")).setAttribute("id", b), (f = S("feMorphology")).setAttribute("operator", "erode"), f.setAttribute("in", "SourceGraphic"), f.setAttribute("radius", "0"), p.appendChild(f), a.appendChild(p), n.setAttribute("stroke", "s" === m[s].mode ? "#000000" : "#ffffff")) : d = f = null, this.storedData[s] = {
              elem: n,
              x: d,
              expan: f,
              lastPath: "",
              lastOperator: "",
              filterId: b,
              lastRadius: 0
            }, "i" == m[s].mode) {
              o = u.length;

              var _ = S("g");

              for (h = 0; h < o; h += 1) {
                _.appendChild(u[h]);
              }

              var k = S("mask");
              k.setAttribute("mask-type", "alpha"), k.setAttribute("id", g + "_" + c), k.appendChild(n), a.appendChild(k), _.setAttribute("mask", "url(" + A + "#" + g + "_" + c + ")"), u.length = 0, u.push(_);
            } else u.push(n);

            m[s].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[s] = {
              elem: n,
              lastPath: "",
              op: z.getProp(this.element, m[s].o, 0, .01, this.element),
              prop: W.getShapeProp(this.element, m[s], 3),
              invRect: l
            }, this.viewData[s].prop.k || this.drawPath(m[s], this.viewData[s].prop.v, this.viewData[s]);
          } else this.viewData[s] = {
            op: z.getProp(this.element, m[s].o, 0, .01, this.element),
            prop: W.getShapeProp(this.element, m[s], 3),
            elem: n,
            lastPath: ""
          }, a.appendChild(n);
        }

        for (this.maskElement = S(v), r = u.length, s = 0; s < r; s += 1) {
          this.maskElement.appendChild(u[s]);
        }

        0 < c && (this.maskElement.setAttribute("id", g), this.element.maskedElement.setAttribute(y, "url(" + A + "#" + g + ")"), a.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this);
      }

      function Ft() {}

      function Dt() {}

      function Tt() {}

      function It() {}

      function Lt() {}

      function Rt(t, e) {
        this.elem = t, this.pos = e;
      }

      function zt(t, e) {
        this.data = t, this.type = t.ty, this.d = "", this.lvl = e, this._mdf = !1, this.closed = !0 === t.hd, this.pElem = S("path"), this.msElem = null;
      }

      function Vt(t, e, i) {
        this.caches = [], this.styles = [], this.transformers = t, this.lStr = "", this.sh = i, this.lvl = e, this._isAnimated = !!i.k;

        for (var s = 0, a = t.length; s < a;) {
          if (t[s].mProps.dynamicProperties.length) {
            this._isAnimated = !0;
            break;
          }

          s += 1;
        }
      }

      function Nt(t, e, i) {
        this.transform = {
          mProps: t,
          op: e,
          container: i
        }, this.elements = [], this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length;
      }

      function Ot(t, e, i) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = z.getProp(t, e.o, 0, .01, this), this.w = z.getProp(t, e.w, 0, null, this), this.d = new Z(t, e.d || {}, "svg", this), this.c = z.getProp(t, e.c, 1, 255, this), this.style = i, this._isAnimated = !!this._isAnimated;
      }

      function Bt(t, e, i) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = z.getProp(t, e.o, 0, .01, this), this.c = z.getProp(t, e.c, 1, 255, this), this.style = i;
      }

      function qt(t, e, i) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.initGradientData(t, e, i);
      }

      function jt(t, e, i) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.w = z.getProp(t, e.w, 0, null, this), this.d = new Z(t, e.d || {}, "svg", this), this.initGradientData(t, e, i), this._isAnimated = !!this._isAnimated;
      }

      function Gt() {
        this.it = [], this.prevViewData = [], this.gr = S("g");
      }

      St.prototype.checkLayers = function (t) {
        var e,
            i,
            s = this.layers.length;

        for (this.completeLayers = !0, e = s - 1; 0 <= e; e--) {
          this.elements[e] || (i = this.layers[e]).ip - i.st <= t - this.layers[e].st && i.op - i.st > t - this.layers[e].st && this.buildItem(e), this.completeLayers = !!this.elements[e] && this.completeLayers;
        }

        this.checkPendingElements();
      }, St.prototype.createItem = function (t) {
        switch (t.ty) {
          case 2:
            return this.createImage(t);

          case 0:
            return this.createComp(t);

          case 1:
            return this.createSolid(t);

          case 3:
            return this.createNull(t);

          case 4:
            return this.createShape(t);

          case 5:
            return this.createText(t);

          case 13:
            return this.createCamera(t);
        }

        return this.createNull(t);
      }, St.prototype.createCamera = function () {
        throw new Error("You're using a 3d camera. Try the html renderer.");
      }, St.prototype.buildAllItems = function () {
        var t,
            e = this.layers.length;

        for (t = 0; t < e; t += 1) {
          this.buildItem(t);
        }

        this.checkPendingElements();
      }, St.prototype.includeLayers = function (t) {
        this.completeLayers = !1;
        var e,
            i,
            s = t.length,
            a = this.layers.length;

        for (e = 0; e < s; e += 1) {
          for (i = 0; i < a;) {
            if (this.layers[i].id == t[e].id) {
              this.layers[i] = t[e];
              break;
            }

            i += 1;
          }
        }
      }, St.prototype.setProjectInterface = function (t) {
        this.globalData.projectInterface = t;
      }, St.prototype.initItems = function () {
        this.globalData.progressiveLoad || this.buildAllItems();
      }, St.prototype.buildElementParenting = function (t, e, i) {
        for (var s = this.elements, a = this.layers, r = 0, n = a.length; r < n;) {
          a[r].ind == e && (s[r] && !0 !== s[r] ? (i.push(s[r]), s[r].setAsParent(), void 0 !== a[r].parent ? this.buildElementParenting(t, a[r].parent, i) : t.setHierarchy(i)) : (this.buildItem(r), this.addPendingElement(t))), r += 1;
        }
      }, St.prototype.addPendingElement = function (t) {
        this.pendingElements.push(t);
      }, St.prototype.searchExtraCompositions = function (t) {
        var e,
            i = t.length;

        for (e = 0; e < i; e += 1) {
          if (t[e].xt) {
            var s = this.createComp(t[e]);
            s.initExpressions(), this.globalData.projectInterface.registerComposition(s);
          }
        }
      }, St.prototype.setupGlobalData = function (t, e) {
        this.globalData.fontManager = new R(), this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, e), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.imageLoader = this.animationItem.imagePreloader, this.globalData.frameId = 0, this.globalData.frameRate = t.fr, this.globalData.nm = t.nm, this.globalData.compSize = {
          w: t.w,
          h: t.h
        };
      }, T([St], wt), wt.prototype.createNull = function (t) {
        return new Yt(t, this.globalData, this);
      }, wt.prototype.createShape = function (t) {
        return new ee(t, this.globalData, this);
      }, wt.prototype.createText = function (t) {
        return new te(t, this.globalData, this);
      }, wt.prototype.createImage = function (t) {
        return new Zt(t, this.globalData, this);
      }, wt.prototype.createComp = function (t) {
        return new $t(t, this.globalData, this);
      }, wt.prototype.createSolid = function (t) {
        return new Qt(t, this.globalData, this);
      }, wt.prototype.configAnimation = function (t) {
        this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w), this.svgElement.setAttribute("height", t.h), this.svgElement.style.width = "100%", this.svgElement.style.height = "100%", this.svgElement.style.transform = "translate3d(0,0,0)"), this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.svgElement.setAttribute("id", this.renderConfig.id), void 0 !== this.renderConfig.focusable && this.svgElement.setAttribute("focusable", this.renderConfig.focusable), this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);
        var e = this.globalData.defs;
        this.setupGlobalData(t, e), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.data = t;
        var i = S("clipPath"),
            s = S("rect");
        s.setAttribute("width", t.w), s.setAttribute("height", t.h), s.setAttribute("x", 0), s.setAttribute("y", 0);
        var a = C();
        i.setAttribute("id", a), i.appendChild(s), this.layerElement.setAttribute("clip-path", "url(" + A + "#" + a + ")"), e.appendChild(i), this.layers = t.layers, this.elements = x(t.layers.length);
      }, wt.prototype.destroy = function () {
        this.animationItem.wrapper.innerHTML = "", this.layerElement = null, this.globalData.defs = null;
        var t,
            e = this.layers ? this.layers.length : 0;

        for (t = 0; t < e; t++) {
          this.elements[t] && this.elements[t].destroy();
        }

        this.elements.length = 0, this.destroyed = !0, this.animationItem = null;
      }, wt.prototype.updateContainerSize = function () {}, wt.prototype.buildItem = function (t) {
        var e = this.elements;

        if (!e[t] && 99 != this.layers[t].ty) {
          e[t] = !0;
          var i = this.createItem(this.layers[t]);
          e[t] = i, h && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(i), i.initExpressions()), this.appendElementInPos(i, t), this.layers[t].tt && (this.elements[t - 1] && !0 !== this.elements[t - 1] ? i.setMatte(e[t - 1].layerId) : (this.buildItem(t - 1), this.addPendingElement(i)));
        }
      }, wt.prototype.checkPendingElements = function () {
        for (; this.pendingElements.length;) {
          var t = this.pendingElements.pop();
          if (t.checkParenting(), t.data.tt) for (var e = 0, i = this.elements.length; e < i;) {
            if (this.elements[e] === t) {
              t.setMatte(this.elements[e - 1].layerId);
              break;
            }

            e += 1;
          }
        }
      }, wt.prototype.renderFrame = function (t) {
        if (this.renderedFrame !== t && !this.destroyed) {
          null === t ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t, this.globalData._mdf = !1;
          var e,
              i = this.layers.length;

          for (this.completeLayers || this.checkLayers(t), e = i - 1; 0 <= e; e--) {
            (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
          }

          if (this.globalData._mdf) for (e = 0; e < i; e += 1) {
            (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
          }
        }
      }, wt.prototype.appendElementInPos = function (t, e) {
        var i = t.getBaseElement();

        if (i) {
          for (var s, a = 0; a < e;) {
            this.elements[a] && !0 !== this.elements[a] && this.elements[a].getBaseElement() && (s = this.elements[a].getBaseElement()), a += 1;
          }

          s ? this.layerElement.insertBefore(i, s) : this.layerElement.appendChild(i);
        }
      }, wt.prototype.hide = function () {
        this.layerElement.style.display = "none";
      }, wt.prototype.show = function () {
        this.layerElement.style.display = "block";
      }, Et.prototype.getMaskProperty = function (t) {
        return this.viewData[t].prop;
      }, Et.prototype.renderFrame = function (t) {
        var e,
            i = this.element.finalTransform.mat,
            s = this.masksProperties.length;

        for (e = 0; e < s; e++) {
          if ((this.viewData[e].prop._mdf || t) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]), (this.viewData[e].op._mdf || t) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v), "n" !== this.masksProperties[e].mode && (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || t) && this.viewData[e].invRect.setAttribute("transform", i.getInverseMatrix().to2dCSS()), this.storedData[e].x && (this.storedData[e].x._mdf || t))) {
            var a = this.storedData[e].expan;
            this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode", this.storedData[e].elem.setAttribute("filter", "url(" + A + "#" + this.storedData[e].filterId + ")")), a.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate", this.storedData[e].elem.setAttribute("filter", null)), this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v));
          }
        }
      }, Et.prototype.getMaskelement = function () {
        return this.maskElement;
      }, Et.prototype.createLayerSolidPath = function () {
        var t = "M0,0 ";
        return t += " h" + this.globalData.compSize.w, t += " v" + this.globalData.compSize.h, t += " h-" + this.globalData.compSize.w, t += " v-" + this.globalData.compSize.h + " ";
      }, Et.prototype.drawPath = function (t, e, i) {
        var s,
            a,
            r = " M" + e.v[0][0] + "," + e.v[0][1];

        for (a = e._length, s = 1; s < a; s += 1) {
          r += " C" + e.o[s - 1][0] + "," + e.o[s - 1][1] + " " + e.i[s][0] + "," + e.i[s][1] + " " + e.v[s][0] + "," + e.v[s][1];
        }

        if (e.c && 1 < a && (r += " C" + e.o[s - 1][0] + "," + e.o[s - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]), i.lastPath !== r) {
          var n = "";
          i.elem && (e.c && (n = t.inv ? this.solidPath + r : r), i.elem.setAttribute("d", n)), i.lastPath = r;
        }
      }, Et.prototype.destroy = function () {
        this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null;
      }, Ft.prototype = {
        initHierarchy: function initHierarchy() {
          this.hierarchy = [], this._isParent = !1, this.checkParenting();
        },
        setHierarchy: function setHierarchy(t) {
          this.hierarchy = t;
        },
        setAsParent: function setAsParent() {
          this._isParent = !0;
        },
        checkParenting: function checkParenting() {
          void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, []);
        }
      }, Dt.prototype = {
        initFrame: function initFrame() {
          this._isFirstFrame = !1, this.dynamicProperties = [], this._mdf = !1;
        },
        prepareProperties: function prepareProperties(t, e) {
          var i,
              s = this.dynamicProperties.length;

          for (i = 0; i < s; i += 1) {
            (e || this._isParent && "transform" === this.dynamicProperties[i].propType) && (this.dynamicProperties[i].getValue(), this.dynamicProperties[i]._mdf && (this.globalData._mdf = !0, this._mdf = !0));
          }
        },
        addDynamicProperty: function addDynamicProperty(t) {
          -1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t);
        }
      }, Tt.prototype = {
        initTransform: function initTransform() {
          this.finalTransform = {
            mProp: this.data.ks ? V.getTransformProperty(this, this.data.ks, this) : {
              o: 0
            },
            _matMdf: !1,
            _opMdf: !1,
            mat: new I()
          }, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.data.ty;
        },
        renderTransform: function renderTransform() {
          if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
            var t,
                e = this.finalTransform.mat,
                i = 0,
                s = this.hierarchy.length;
            if (!this.finalTransform._matMdf) for (; i < s;) {
              if (this.hierarchy[i].finalTransform.mProp._mdf) {
                this.finalTransform._matMdf = !0;
                break;
              }

              i += 1;
            }
            if (this.finalTransform._matMdf) for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), i = 0; i < s; i += 1) {
              t = this.hierarchy[i].finalTransform.mProp.v.props, e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]);
            }
          }
        },
        globalToLocal: function globalToLocal(t) {
          var e = [];
          e.push(this.finalTransform);

          for (var i = !0, s = this.comp; i;) {
            s.finalTransform ? (s.data.hasMask && e.splice(0, 0, s.finalTransform), s = s.comp) : i = !1;
          }

          var a,
              r,
              n = e.length;

          for (a = 0; a < n; a += 1) {
            r = e[a].mat.applyToPointArray(0, 0, 0), t = [t[0] - r[0], t[1] - r[1], 0];
          }

          return t;
        },
        mHelper: new I()
      }, It.prototype = {
        initRenderable: function initRenderable() {
          this.isInRange = !1, this.hidden = !1, this.isTransparent = !1, this.renderableComponents = [];
        },
        addRenderableComponent: function addRenderableComponent(t) {
          -1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t);
        },
        removeRenderableComponent: function removeRenderableComponent(t) {
          -1 !== this.renderableComponents.indexOf(t) && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1);
        },
        prepareRenderableFrame: function prepareRenderableFrame(t) {
          this.checkLayerLimits(t);
        },
        checkTransparency: function checkTransparency() {
          this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0, this.hide()) : this.isTransparent && (this.isTransparent = !1, this.show());
        },
        checkLayerLimits: function checkLayerLimits(t) {
          this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? !0 !== this.isInRange && (this.globalData._mdf = !0, this._mdf = !0, this.isInRange = !0, this.show()) : !1 !== this.isInRange && (this.globalData._mdf = !0, this.isInRange = !1, this.hide());
        },
        renderRenderable: function renderRenderable() {
          var t,
              e = this.renderableComponents.length;

          for (t = 0; t < e; t += 1) {
            this.renderableComponents[t].renderFrame(this._isFirstFrame);
          }
        },
        sourceRectAtTime: function sourceRectAtTime() {
          return {
            top: 0,
            left: 0,
            width: 100,
            height: 100
          };
        },
        getLayerSize: function getLayerSize() {
          return 5 === this.data.ty ? {
            w: this.data.textData.width,
            h: this.data.textData.height
          } : {
            w: this.data.width,
            h: this.data.height
          };
        }
      }, T([It, function (t) {
        function e() {}

        return e.prototype = t, e;
      }({
        initElement: function initElement(t, e, i) {
          this.initFrame(), this.initBaseData(t, e, i), this.initTransform(t, e, i), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide();
        },
        hide: function hide() {
          this.hidden || this.isInRange && !this.isTransparent || ((this.baseElement || this.layerElement).style.display = "none", this.hidden = !0);
        },
        show: function show() {
          this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"), this.hidden = !1, this._isFirstFrame = !0);
        },
        renderFrame: function renderFrame() {
          this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1));
        },
        renderInnerContent: function renderInnerContent() {},
        prepareFrame: function prepareFrame(t) {
          this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.checkTransparency();
        },
        destroy: function destroy() {
          this.innerElem = null, this.destroyBaseElement();
        }
      })], Lt), zt.prototype.reset = function () {
        this.d = "", this._mdf = !1;
      }, Vt.prototype.setAsAnimated = function () {
        this._isAnimated = !0;
      }, T([E], Ot), T([E], Bt), qt.prototype.initGradientData = function (t, e, i) {
        this.o = z.getProp(t, e.o, 0, .01, this), this.s = z.getProp(t, e.s, 1, null, this), this.e = z.getProp(t, e.e, 1, null, this), this.h = z.getProp(t, e.h || {
          k: 0
        }, 0, .01, this), this.a = z.getProp(t, e.a || {
          k: 0
        }, 0, q, this), this.g = new Q(t, e.g, this), this.style = i, this.stops = [], this.setGradientData(i.pElem, e), this.setGradientOpacity(e, i), this._isAnimated = !!this._isAnimated;
      }, qt.prototype.setGradientData = function (t, e) {
        var i = C(),
            s = S(1 === e.t ? "linearGradient" : "radialGradient");
        s.setAttribute("id", i), s.setAttribute("spreadMethod", "pad"), s.setAttribute("gradientUnits", "userSpaceOnUse");
        var a,
            r,
            n,
            h = [];

        for (n = 4 * e.g.p, r = 0; r < n; r += 4) {
          a = S("stop"), s.appendChild(a), h.push(a);
        }

        t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(" + A + "#" + i + ")"), this.gf = s, this.cst = h;
      }, qt.prototype.setGradientOpacity = function (t, e) {
        if (this.g._hasOpacity && !this.g._collapsable) {
          var i,
              s,
              a,
              r = S("mask"),
              n = S("path");
          r.appendChild(n);
          var h = C(),
              o = C();
          r.setAttribute("id", o);
          var l = S(1 === t.t ? "linearGradient" : "radialGradient");
          l.setAttribute("id", h), l.setAttribute("spreadMethod", "pad"), l.setAttribute("gradientUnits", "userSpaceOnUse"), a = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
          var p = this.stops;

          for (s = 4 * t.g.p; s < a; s += 2) {
            (i = S("stop")).setAttribute("stop-color", "rgb(255,255,255)"), l.appendChild(i), p.push(i);
          }

          n.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(" + A + "#" + h + ")"), this.of = l, this.ms = r, this.ost = p, this.maskId = o, e.msElem = n;
        }
      }, T([E], qt), T([qt, E], jt);

      var Wt = function () {
        var g = new I(),
            v = new I();

        function e(t, e, i) {
          (i || e.transform.op._mdf) && e.transform.container.setAttribute("opacity", e.transform.op.v), (i || e.transform.mProps._mdf) && e.transform.container.setAttribute("transform", e.transform.mProps.v.to2dCSS());
        }

        function i(t, e, i) {
          var s,
              a,
              r,
              n,
              h,
              o,
              l,
              p,
              f,
              d,
              m,
              c = e.styles.length,
              u = e.lvl;

          for (o = 0; o < c; o += 1) {
            if (n = e.sh._mdf || i, e.styles[o].lvl < u) {
              for (p = v.reset(), d = u - e.styles[o].lvl, m = e.transformers.length - 1; !n && 0 < d;) {
                n = e.transformers[m].mProps._mdf || n, d--, m--;
              }

              if (n) for (d = u - e.styles[o].lvl, m = e.transformers.length - 1; 0 < d;) {
                f = e.transformers[m].mProps.v.props, p.transform(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9], f[10], f[11], f[12], f[13], f[14], f[15]), d--, m--;
              }
            } else p = g;

            if (a = (l = e.sh.paths)._length, n) {
              for (r = "", s = 0; s < a; s += 1) {
                (h = l.shapes[s]) && h._length && (r += et(h, h._length, h.c, p));
              }

              e.caches[o] = r;
            } else r = e.caches[o];

            e.styles[o].d += !0 === t.hd ? "" : r, e.styles[o]._mdf = n || e.styles[o]._mdf;
          }
        }

        function s(t, e, i) {
          var s = e.style;
          (e.c._mdf || i) && s.pElem.setAttribute("fill", "rgb(" + c(e.c.v[0]) + "," + c(e.c.v[1]) + "," + c(e.c.v[2]) + ")"), (e.o._mdf || i) && s.pElem.setAttribute("fill-opacity", e.o.v);
        }

        function a(t, e, i) {
          r(t, e, i), n(t, e, i);
        }

        function r(t, e, i) {
          var s,
              a,
              r,
              n,
              h,
              o = e.gf,
              l = e.g._hasOpacity,
              p = e.s.v,
              f = e.e.v;

          if (e.o._mdf || i) {
            var d = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
            e.style.pElem.setAttribute(d, e.o.v);
          }

          if (e.s._mdf || i) {
            var m = 1 === t.t ? "x1" : "cx",
                c = "x1" === m ? "y1" : "cy";
            o.setAttribute(m, p[0]), o.setAttribute(c, p[1]), l && !e.g._collapsable && (e.of.setAttribute(m, p[0]), e.of.setAttribute(c, p[1]));
          }

          if (e.g._cmdf || i) {
            s = e.cst;
            var u = e.g.c;

            for (r = s.length, a = 0; a < r; a += 1) {
              (n = s[a]).setAttribute("offset", u[4 * a] + "%"), n.setAttribute("stop-color", "rgb(" + u[4 * a + 1] + "," + u[4 * a + 2] + "," + u[4 * a + 3] + ")");
            }
          }

          if (l && (e.g._omdf || i)) {
            var g = e.g.o;

            for (r = (s = e.g._collapsable ? e.cst : e.ost).length, a = 0; a < r; a += 1) {
              n = s[a], e.g._collapsable || n.setAttribute("offset", g[2 * a] + "%"), n.setAttribute("stop-opacity", g[2 * a + 1]);
            }
          }

          if (1 === t.t) (e.e._mdf || i) && (o.setAttribute("x2", f[0]), o.setAttribute("y2", f[1]), l && !e.g._collapsable && (e.of.setAttribute("x2", f[0]), e.of.setAttribute("y2", f[1])));else if ((e.s._mdf || e.e._mdf || i) && (h = Math.sqrt(Math.pow(p[0] - f[0], 2) + Math.pow(p[1] - f[1], 2)), o.setAttribute("r", h), l && !e.g._collapsable && e.of.setAttribute("r", h)), e.e._mdf || e.h._mdf || e.a._mdf || i) {
            h || (h = Math.sqrt(Math.pow(p[0] - f[0], 2) + Math.pow(p[1] - f[1], 2)));

            var v = Math.atan2(f[1] - p[1], f[0] - p[0]),
                y = h * (1 <= e.h.v ? .99 : e.h.v <= -1 ? -.99 : e.h.v),
                b = Math.cos(v + e.a.v) * y + p[0],
                _ = Math.sin(v + e.a.v) * y + p[1];

            o.setAttribute("fx", b), o.setAttribute("fy", _), l && !e.g._collapsable && (e.of.setAttribute("fx", b), e.of.setAttribute("fy", _));
          }
        }

        function n(t, e, i) {
          var s = e.style,
              a = e.d;
          a && (a._mdf || i) && a.dashStr && (s.pElem.setAttribute("stroke-dasharray", a.dashStr), s.pElem.setAttribute("stroke-dashoffset", a.dashoffset[0])), e.c && (e.c._mdf || i) && s.pElem.setAttribute("stroke", "rgb(" + c(e.c.v[0]) + "," + c(e.c.v[1]) + "," + c(e.c.v[2]) + ")"), (e.o._mdf || i) && s.pElem.setAttribute("stroke-opacity", e.o.v), (e.w._mdf || i) && (s.pElem.setAttribute("stroke-width", e.w.v), s.msElem && s.msElem.setAttribute("stroke-width", e.w.v));
        }

        return {
          createRenderFunction: function createRenderFunction(t) {
            t.ty;

            switch (t.ty) {
              case "fl":
                return s;

              case "gf":
                return r;

              case "gs":
                return a;

              case "st":
                return n;

              case "sh":
              case "el":
              case "rc":
              case "sr":
                return i;

              case "tr":
                return e;
            }
          }
        };
      }();

      function Xt() {}

      function Yt(t, e, i) {
        this.initFrame(), this.initBaseData(t, e, i), this.initFrame(), this.initTransform(t, e, i), this.initHierarchy();
      }

      function Ht() {}

      function Kt() {}

      function Jt() {}

      function Ut() {}

      function Zt(t, e, i) {
        this.assetData = e.getAssetData(t.refId), this.initElement(t, e, i), this.sourceRect = {
          top: 0,
          left: 0,
          width: this.assetData.w,
          height: this.assetData.h
        };
      }

      function Qt(t, e, i) {
        this.initElement(t, e, i);
      }

      function $t(t, e, i) {
        this.layers = t.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? x(this.layers.length) : [], this.initElement(t, e, i), this.tm = t.tm ? z.getProp(this, t.tm, 0, e.frameRate, this) : {
          _placeholder: !0
        };
      }

      function te(t, e, i) {
        this.textSpans = [], this.renderType = "svg", this.initElement(t, e, i);
      }

      function ee(t, e, i) {
        this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(t, e, i), this.prevViewData = [];
      }

      function ie(t, e) {
        this.filterManager = e;
        var i = S("feColorMatrix");

        if (i.setAttribute("type", "matrix"), i.setAttribute("color-interpolation-filters", "linearRGB"), i.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), i.setAttribute("result", "f1"), t.appendChild(i), (i = S("feColorMatrix")).setAttribute("type", "matrix"), i.setAttribute("color-interpolation-filters", "sRGB"), i.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), i.setAttribute("result", "f2"), t.appendChild(i), this.matrixFilter = i, 100 !== e.effectElements[2].p.v || e.effectElements[2].p.k) {
          var s,
              a = S("feMerge");
          t.appendChild(a), (s = S("feMergeNode")).setAttribute("in", "SourceGraphic"), a.appendChild(s), (s = S("feMergeNode")).setAttribute("in", "f2"), a.appendChild(s);
        }
      }

      function se(t, e) {
        this.filterManager = e;
        var i = S("feColorMatrix");
        i.setAttribute("type", "matrix"), i.setAttribute("color-interpolation-filters", "sRGB"), i.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), t.appendChild(i), this.matrixFilter = i;
      }

      function ae(t, e) {
        t.setAttribute("x", "-100%"), t.setAttribute("y", "-100%"), t.setAttribute("width", "300%"), t.setAttribute("height", "300%"), this.filterManager = e;
        var i = S("feGaussianBlur");
        t.appendChild(i), this.feGaussianBlur = i;
      }

      function re(t, e) {
        this.initialized = !1, this.filterManager = e, this.elem = t, this.paths = [];
      }

      function ne(t, e) {
        this.filterManager = e;
        var i = S("feColorMatrix");
        i.setAttribute("type", "matrix"), i.setAttribute("color-interpolation-filters", "linearRGB"), i.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), i.setAttribute("result", "f1"), t.appendChild(i);
        var s = S("feComponentTransfer");
        s.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(s), this.matrixFilter = s;
        var a = S("feFuncR");
        a.setAttribute("type", "table"), s.appendChild(a), this.feFuncR = a;
        var r = S("feFuncG");
        r.setAttribute("type", "table"), s.appendChild(r), this.feFuncG = r;
        var n = S("feFuncB");
        n.setAttribute("type", "table"), s.appendChild(n), this.feFuncB = n;
      }

      function he(t, e) {
        this.filterManager = e;
        var i = this.filterManager.effectElements,
            s = S("feComponentTransfer");
        (i[10].p.k || 0 !== i[10].p.v || i[11].p.k || 1 !== i[11].p.v || i[12].p.k || 1 !== i[12].p.v || i[13].p.k || 0 !== i[13].p.v || i[14].p.k || 1 !== i[14].p.v) && (this.feFuncR = this.createFeFunc("feFuncR", s)), (i[17].p.k || 0 !== i[17].p.v || i[18].p.k || 1 !== i[18].p.v || i[19].p.k || 1 !== i[19].p.v || i[20].p.k || 0 !== i[20].p.v || i[21].p.k || 1 !== i[21].p.v) && (this.feFuncG = this.createFeFunc("feFuncG", s)), (i[24].p.k || 0 !== i[24].p.v || i[25].p.k || 1 !== i[25].p.v || i[26].p.k || 1 !== i[26].p.v || i[27].p.k || 0 !== i[27].p.v || i[28].p.k || 1 !== i[28].p.v) && (this.feFuncB = this.createFeFunc("feFuncB", s)), (i[31].p.k || 0 !== i[31].p.v || i[32].p.k || 1 !== i[32].p.v || i[33].p.k || 1 !== i[33].p.v || i[34].p.k || 0 !== i[34].p.v || i[35].p.k || 1 !== i[35].p.v) && (this.feFuncA = this.createFeFunc("feFuncA", s)), (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (s.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(s), s = S("feComponentTransfer")), (i[3].p.k || 0 !== i[3].p.v || i[4].p.k || 1 !== i[4].p.v || i[5].p.k || 1 !== i[5].p.v || i[6].p.k || 0 !== i[6].p.v || i[7].p.k || 1 !== i[7].p.v) && (s.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(s), this.feFuncRComposed = this.createFeFunc("feFuncR", s), this.feFuncGComposed = this.createFeFunc("feFuncG", s), this.feFuncBComposed = this.createFeFunc("feFuncB", s));
      }

      function oe(t, e) {
        var i = e.container.globalData.renderConfig.filterSize;
        t.setAttribute("x", i.x), t.setAttribute("y", i.y), t.setAttribute("width", i.width), t.setAttribute("height", i.height), this.filterManager = e;
        var s = S("feGaussianBlur");
        s.setAttribute("in", "SourceAlpha"), s.setAttribute("result", "drop_shadow_1"), s.setAttribute("stdDeviation", "0"), this.feGaussianBlur = s, t.appendChild(s);
        var a = S("feOffset");
        a.setAttribute("dx", "25"), a.setAttribute("dy", "0"), a.setAttribute("in", "drop_shadow_1"), a.setAttribute("result", "drop_shadow_2"), this.feOffset = a, t.appendChild(a);
        var r = S("feFlood");
        r.setAttribute("flood-color", "#00ff00"), r.setAttribute("flood-opacity", "1"), r.setAttribute("result", "drop_shadow_3"), this.feFlood = r, t.appendChild(r);
        var n = S("feComposite");
        n.setAttribute("in", "drop_shadow_3"), n.setAttribute("in2", "drop_shadow_2"), n.setAttribute("operator", "in"), n.setAttribute("result", "drop_shadow_4"), t.appendChild(n);
        var h,
            o = S("feMerge");
        t.appendChild(o), h = S("feMergeNode"), o.appendChild(h), (h = S("feMergeNode")).setAttribute("in", "SourceGraphic"), this.feMergeNode = h, this.feMerge = o, this.originalNodeAdded = !1, o.appendChild(h);
      }

      Xt.prototype = {
        checkMasks: function checkMasks() {
          if (!this.data.hasMask) return !1;

          for (var t = 0, e = this.data.masksProperties.length; t < e;) {
            if ("n" !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl) return !0;
            t += 1;
          }

          return !1;
        },
        initExpressions: function initExpressions() {
          this.layerInterface = LayerExpressionInterface(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
          var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
          this.layerInterface.registerEffectsInterface(t), 0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = TextExpressionInterface(this), this.layerInterface.text = this.layerInterface.textInterface);
        },
        setBlendMode: function setBlendMode() {
          var t = D(this.data.bm);
          (this.baseElement || this.layerElement).style["mix-blend-mode"] = t;
        },
        initBaseData: function initBaseData(t, e, i) {
          this.globalData = e, this.comp = i, this.data = t, this.layerId = C(), this.data.sr || (this.data.sr = 1), this.effectsManager = new ce(this.data, this, this.dynamicProperties);
        },
        getType: function getType() {
          return this.type;
        },
        sourceRectAtTime: function sourceRectAtTime() {}
      }, Yt.prototype.prepareFrame = function (t) {
        this.prepareProperties(t, !0);
      }, Yt.prototype.renderFrame = function () {}, Yt.prototype.getBaseElement = function () {
        return null;
      }, Yt.prototype.destroy = function () {}, Yt.prototype.sourceRectAtTime = function () {}, Yt.prototype.hide = function () {}, T([Xt, Tt, Ft, Dt], Yt), Ht.prototype = {
        initRendererElement: function initRendererElement() {
          this.layerElement = S("g");
        },
        createContainerElements: function createContainerElements() {
          this.matteElement = S("g"), this.transformedElement = this.layerElement, this.maskedElement = this.layerElement, this._sizeChanged = !1;
          var t,
              e,
              i,
              s = null;

          if (this.data.td) {
            if (3 == this.data.td || 1 == this.data.td) {
              var a = S("mask");
              a.setAttribute("id", this.layerId), a.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"), a.appendChild(this.layerElement), s = a, this.globalData.defs.appendChild(a), st.maskType || 1 != this.data.td || (a.setAttribute("mask-type", "luminance"), t = C(), e = at.createFilter(t), this.globalData.defs.appendChild(e), e.appendChild(at.createAlphaToLuminanceFilter()), (i = S("g")).appendChild(this.layerElement), s = i, a.appendChild(i), i.setAttribute("filter", "url(" + A + "#" + t + ")"));
            } else if (2 == this.data.td) {
              var r = S("mask");
              r.setAttribute("id", this.layerId), r.setAttribute("mask-type", "alpha");
              var n = S("g");
              r.appendChild(n), t = C(), e = at.createFilter(t);
              var h = S("feComponentTransfer");
              h.setAttribute("in", "SourceGraphic"), e.appendChild(h);
              var o = S("feFuncA");
              o.setAttribute("type", "table"), o.setAttribute("tableValues", "1.0 0.0"), h.appendChild(o), this.globalData.defs.appendChild(e);
              var l = S("rect");
              l.setAttribute("width", this.comp.data.w), l.setAttribute("height", this.comp.data.h), l.setAttribute("x", "0"), l.setAttribute("y", "0"), l.setAttribute("fill", "#ffffff"), l.setAttribute("opacity", "0"), n.setAttribute("filter", "url(" + A + "#" + t + ")"), n.appendChild(l), n.appendChild(this.layerElement), s = n, st.maskType || (r.setAttribute("mask-type", "luminance"), e.appendChild(at.createAlphaToLuminanceFilter()), i = S("g"), n.appendChild(l), i.appendChild(this.layerElement), s = i, n.appendChild(i)), this.globalData.defs.appendChild(r);
            }
          } else this.data.tt ? (this.matteElement.appendChild(this.layerElement), s = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;

          if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 === this.data.ty && !this.data.hd) {
            var p = S("clipPath"),
                f = S("path");
            f.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
            var d = C();

            if (p.setAttribute("id", d), p.appendChild(f), this.globalData.defs.appendChild(p), this.checkMasks()) {
              var m = S("g");
              m.setAttribute("clip-path", "url(" + A + "#" + d + ")"), m.appendChild(this.layerElement), this.transformedElement = m, s ? s.appendChild(this.transformedElement) : this.baseElement = this.transformedElement;
            } else this.layerElement.setAttribute("clip-path", "url(" + A + "#" + d + ")");
          }

          0 !== this.data.bm && this.setBlendMode();
        },
        renderElement: function renderElement() {
          this.finalTransform._matMdf && this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v);
        },
        destroyBaseElement: function destroyBaseElement() {
          this.layerElement = null, this.matteElement = null, this.maskManager.destroy();
        },
        getBaseElement: function getBaseElement() {
          return this.data.hd ? null : this.baseElement;
        },
        createRenderableComponents: function createRenderableComponents() {
          this.maskManager = new Et(this.data, this, this.globalData), this.renderableEffectsManager = new fe(this);
        },
        setMatte: function setMatte(t) {
          this.matteElement && this.matteElement.setAttribute("mask", "url(" + A + "#" + t + ")");
        }
      }, Kt.prototype = {
        addShapeToModifiers: function addShapeToModifiers(t) {
          var e,
              i = this.shapeModifiers.length;

          for (e = 0; e < i; e += 1) {
            this.shapeModifiers[e].addShape(t);
          }
        },
        isShapeInAnimatedModifiers: function isShapeInAnimatedModifiers(t) {
          for (var e = this.shapeModifiers.length; 0 < e;) {
            if (this.shapeModifiers[0].isAnimatedWithShape(t)) return !0;
          }

          return !1;
        },
        renderModifiers: function renderModifiers() {
          if (this.shapeModifiers.length) {
            var t,
                e = this.shapes.length;

            for (t = 0; t < e; t += 1) {
              this.shapes[t].sh.reset();
            }

            for (t = (e = this.shapeModifiers.length) - 1; 0 <= t; t -= 1) {
              this.shapeModifiers[t].processShapes(this._isFirstFrame);
            }
          }
        },
        lcEnum: {
          1: "butt",
          2: "round",
          3: "square"
        },
        ljEnum: {
          1: "miter",
          2: "round",
          3: "bevel"
        },
        searchProcessedElement: function searchProcessedElement(t) {
          for (var e = this.processedElements, i = 0, s = e.length; i < s;) {
            if (e[i].elem === t) return e[i].pos;
            i += 1;
          }

          return 0;
        },
        addProcessedElement: function addProcessedElement(t, e) {
          for (var i = this.processedElements, s = i.length; s;) {
            if (i[s -= 1].elem === t) return void (i[s].pos = e);
          }

          i.push(new Rt(t, e));
        },
        prepareFrame: function prepareFrame(t) {
          this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange);
        }
      }, Jt.prototype.initElement = function (t, e, i) {
        this.lettersChangedFlag = !0, this.initFrame(), this.initBaseData(t, e, i), this.textProperty = new ot(this, t.t, this.dynamicProperties), this.textAnimator = new nt(t.t, this.renderType, this), this.initTransform(t, e, i), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties);
      }, Jt.prototype.prepareFrame = function (t) {
        this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = !1, this.textProperty._mdf = !1);
      }, Jt.prototype.createPathShape = function (t, e) {
        var i,
            s,
            a = e.length,
            r = "";

        for (i = 0; i < a; i += 1) {
          s = e[i].ks.k, r += et(s, s.i.length, !0, t);
        }

        return r;
      }, Jt.prototype.updateDocumentData = function (t, e) {
        this.textProperty.updateDocumentData(t, e);
      }, Jt.prototype.canResizeFont = function (t) {
        this.textProperty.canResizeFont(t);
      }, Jt.prototype.setMinimumFontSize = function (t) {
        this.textProperty.setMinimumFontSize(t);
      }, Jt.prototype.applyTextPropertiesToMatrix = function (t, e, i, s, a) {
        switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j) {
          case 1:
            e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[i]), 0, 0);
            break;

          case 2:
            e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[i]) / 2, 0, 0);
        }

        e.translate(s, a, 0);
      }, Jt.prototype.buildColor = function (t) {
        return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")";
      }, Jt.prototype.emptyProp = new mt(), Jt.prototype.destroy = function () {}, T([Xt, Tt, Ft, Dt, Lt], Ut), Ut.prototype.initElement = function (t, e, i) {
        this.initFrame(), this.initBaseData(t, e, i), this.initTransform(t, e, i), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), !this.data.xt && e.progressiveLoad || this.buildAllItems(), this.hide();
      }, Ut.prototype.prepareFrame = function (t) {
        if (this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.isInRange || this.data.xt) {
          if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;else {
            var e = this.tm.v;
            e === this.data.op && (e = this.data.op - 1), this.renderedFrame = e;
          }
          var i,
              s = this.elements.length;

          for (this.completeLayers || this.checkLayers(this.renderedFrame), i = s - 1; 0 <= i; i -= 1) {
            (this.completeLayers || this.elements[i]) && (this.elements[i].prepareFrame(this.renderedFrame - this.layers[i].st), this.elements[i]._mdf && (this._mdf = !0));
          }
        }
      }, Ut.prototype.renderInnerContent = function () {
        var t,
            e = this.layers.length;

        for (t = 0; t < e; t += 1) {
          (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
        }
      }, Ut.prototype.setElements = function (t) {
        this.elements = t;
      }, Ut.prototype.getElements = function () {
        return this.elements;
      }, Ut.prototype.destroyElements = function () {
        var t,
            e = this.layers.length;

        for (t = 0; t < e; t += 1) {
          this.elements[t] && this.elements[t].destroy();
        }
      }, Ut.prototype.destroy = function () {
        this.destroyElements(), this.destroyBaseElement();
      }, T([Xt, Tt, Ht, Ft, Dt, Lt], Zt), Zt.prototype.createContent = function () {
        var t = this.globalData.getAssetsPath(this.assetData);
        this.innerElem = S("image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.innerElem);
      }, Zt.prototype.sourceRectAtTime = function () {
        return this.sourceRect;
      }, T([Zt], Qt), Qt.prototype.createContent = function () {
        var t = S("rect");
        t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t);
      }, T([wt, Ut, Ht], $t), T([Xt, Tt, Ht, Ft, Dt, Lt, Jt], te), te.prototype.createContent = function () {
        this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = S("text"));
      }, te.prototype.buildTextContents = function (t) {
        for (var e = 0, i = t.length, s = [], a = ""; e < i;) {
          t[e] === String.fromCharCode(13) || t[e] === String.fromCharCode(3) ? (s.push(a), a = "") : a += t[e], e += 1;
        }

        return s.push(a), s;
      }, te.prototype.buildNewText = function () {
        var t,
            e,
            i = this.textProperty.currentData;
        this.renderedLetters = x(i ? i.l.length : 0), i.fc ? this.layerElement.setAttribute("fill", this.buildColor(i.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"), i.sc && (this.layerElement.setAttribute("stroke", this.buildColor(i.sc)), this.layerElement.setAttribute("stroke-width", i.sw)), this.layerElement.setAttribute("font-size", i.finalSize);
        var s = this.globalData.fontManager.getFontByName(i.f);
        if (s.fClass) this.layerElement.setAttribute("class", s.fClass);else {
          this.layerElement.setAttribute("font-family", s.fFamily);
          var a = i.fWeight,
              r = i.fStyle;
          this.layerElement.setAttribute("font-style", r), this.layerElement.setAttribute("font-weight", a);
        }
        this.layerElement.setAttribute("aria-label", i.t);
        var n,
            h = i.l || [],
            o = !!this.globalData.fontManager.chars;
        e = h.length;
        var l,
            p = this.mHelper,
            f = "",
            d = this.data.singleShape,
            m = 0,
            c = 0,
            u = !0,
            g = i.tr / 1e3 * i.finalSize;

        if (!d || o || i.sz) {
          var v,
              y,
              b = this.textSpans.length;

          for (t = 0; t < e; t += 1) {
            o && d && 0 !== t || (n = t < b ? this.textSpans[t] : S(o ? "path" : "text"), b <= t && (n.setAttribute("stroke-linecap", "butt"), n.setAttribute("stroke-linejoin", "round"), n.setAttribute("stroke-miterlimit", "4"), this.textSpans[t] = n, this.layerElement.appendChild(n)), n.style.display = "inherit"), p.reset(), p.scale(i.finalSize / 100, i.finalSize / 100), d && (h[t].n && (m = -g, c += i.yOffset, c += u ? 1 : 0, u = !1), this.applyTextPropertiesToMatrix(i, p, h[t].line, m, c), m += h[t].l || 0, m += g), o ? (l = (v = (y = this.globalData.fontManager.getCharData(i.finalText[t], s.fStyle, this.globalData.fontManager.getFontByName(i.f).fFamily)) && y.data || {}).shapes ? v.shapes[0].it : [], d ? f += this.createPathShape(p, l) : n.setAttribute("d", this.createPathShape(p, l))) : (d && n.setAttribute("transform", "translate(" + p.props[12] + "," + p.props[13] + ")"), n.textContent = h[t].val, n.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"));
          }

          d && n && n.setAttribute("d", f);
        } else {
          var _ = this.textContainer,
              k = "start";

          switch (i.j) {
            case 1:
              k = "end";
              break;

            case 2:
              k = "middle";
          }

          _.setAttribute("text-anchor", k), _.setAttribute("letter-spacing", g);
          var A = this.buildTextContents(i.finalText);

          for (e = A.length, c = i.ps ? i.ps[1] + i.ascent : 0, t = 0; t < e; t += 1) {
            (n = this.textSpans[t] || S("tspan")).textContent = A[t], n.setAttribute("x", 0), n.setAttribute("y", c), n.style.display = "inherit", _.appendChild(n), this.textSpans[t] = n, c += i.finalLineHeight;
          }

          this.layerElement.appendChild(_);
        }

        for (; t < this.textSpans.length;) {
          this.textSpans[t].style.display = "none", t += 1;
        }

        this._sizeChanged = !0;
      }, te.prototype.sourceRectAtTime = function (t) {
        if (this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged) {
          this._sizeChanged = !1;
          var e = this.layerElement.getBBox();
          this.bbox = {
            top: e.y,
            left: e.x,
            width: e.width,
            height: e.height
          };
        }

        return this.bbox;
      }, te.prototype.renderInnerContent = function () {
        if (!this.data.singleShape && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
          var t, e;
          this._sizeChanged = !0;
          var i,
              s,
              a = this.textAnimator.renderedLetters,
              r = this.textProperty.currentData.l;

          for (e = r.length, t = 0; t < e; t += 1) {
            r[t].n || (i = a[t], s = this.textSpans[t], i._mdf.m && s.setAttribute("transform", i.m), i._mdf.o && s.setAttribute("opacity", i.o), i._mdf.sw && s.setAttribute("stroke-width", i.sw), i._mdf.sc && s.setAttribute("stroke", i.sc), i._mdf.fc && s.setAttribute("fill", i.fc));
          }
        }
      }, T([Xt, Tt, Ht, Kt, Ft, Dt, Lt], ee), ee.prototype.initSecondaryElement = function () {}, ee.prototype.identityMatrix = new I(), ee.prototype.buildExpressionInterface = function () {}, ee.prototype.createContent = function () {
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes();
      }, ee.prototype.filterUniqueShapes = function () {
        var t,
            e,
            i,
            s,
            a = this.shapes.length,
            r = this.stylesList.length,
            n = [],
            h = !1;

        for (i = 0; i < r; i += 1) {
          for (s = this.stylesList[i], h = !1, t = n.length = 0; t < a; t += 1) {
            -1 !== (e = this.shapes[t]).styles.indexOf(s) && (n.push(e), h = e._isAnimated || h);
          }

          1 < n.length && h && this.setShapesAsAnimated(n);
        }
      }, ee.prototype.setShapesAsAnimated = function (t) {
        var e,
            i = t.length;

        for (e = 0; e < i; e += 1) {
          t[e].setAsAnimated();
        }
      }, ee.prototype.createStyleElement = function (t, e) {
        var i,
            s = new zt(t, e),
            a = s.pElem;
        if ("st" === t.ty) i = new Ot(this, t, s);else if ("fl" === t.ty) i = new Bt(this, t, s);else if ("gf" === t.ty || "gs" === t.ty) {
          i = new ("gf" === t.ty ? qt : jt)(this, t, s), this.globalData.defs.appendChild(i.gf), i.maskId && (this.globalData.defs.appendChild(i.ms), this.globalData.defs.appendChild(i.of), a.setAttribute("mask", "url(" + A + "#" + i.maskId + ")"));
        }
        return "st" !== t.ty && "gs" !== t.ty || (a.setAttribute("stroke-linecap", this.lcEnum[t.lc] || "round"), a.setAttribute("stroke-linejoin", this.ljEnum[t.lj] || "round"), a.setAttribute("fill-opacity", "0"), 1 === t.lj && a.setAttribute("stroke-miterlimit", t.ml)), 2 === t.r && a.setAttribute("fill-rule", "evenodd"), t.ln && a.setAttribute("id", t.ln), t.cl && a.setAttribute("class", t.cl), t.bm && (a.style["mix-blend-mode"] = D(t.bm)), this.stylesList.push(s), this.addToAnimatedContents(t, i), i;
      }, ee.prototype.createGroupElement = function (t) {
        var e = new Gt();
        return t.ln && e.gr.setAttribute("id", t.ln), t.cl && e.gr.setAttribute("class", t.cl), t.bm && (e.gr.style["mix-blend-mode"] = D(t.bm)), e;
      }, ee.prototype.createTransformElement = function (t, e) {
        var i = V.getTransformProperty(this, t, this),
            s = new Nt(i, i.o, e);
        return this.addToAnimatedContents(t, s), s;
      }, ee.prototype.createShapeElement = function (t, e, i) {
        var s = 4;
        "rc" === t.ty ? s = 5 : "el" === t.ty ? s = 6 : "sr" === t.ty && (s = 7);
        var a = new Vt(e, i, W.getShapeProp(this, t, s, this));
        return this.shapes.push(a), this.addShapeToModifiers(a), this.addToAnimatedContents(t, a), a;
      }, ee.prototype.addToAnimatedContents = function (t, e) {
        for (var i = 0, s = this.animatedContents.length; i < s;) {
          if (this.animatedContents[i].element === e) return;
          i += 1;
        }

        this.animatedContents.push({
          fn: Wt.createRenderFunction(t),
          element: e,
          data: t
        });
      }, ee.prototype.setElementStyles = function (t) {
        var e,
            i = t.styles,
            s = this.stylesList.length;

        for (e = 0; e < s; e += 1) {
          this.stylesList[e].closed || i.push(this.stylesList[e]);
        }
      }, ee.prototype.reloadShapes = function () {
        this._isFirstFrame = !0;
        var t,
            e = this.itemsData.length;

        for (t = 0; t < e; t += 1) {
          this.prevViewData[t] = this.itemsData[t];
        }

        for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes(), e = this.dynamicProperties.length, t = 0; t < e; t += 1) {
          this.dynamicProperties[t].getValue();
        }

        this.renderModifiers();
      }, ee.prototype.searchShapes = function (t, e, i, s, a, r, n) {
        var h,
            o,
            l,
            p,
            f,
            d,
            m = [].concat(r),
            c = t.length - 1,
            u = [],
            g = [];

        for (h = c; 0 <= h; h -= 1) {
          if ((d = this.searchProcessedElement(t[h])) ? e[h] = i[d - 1] : t[h]._render = n, "fl" == t[h].ty || "st" == t[h].ty || "gf" == t[h].ty || "gs" == t[h].ty) d ? e[h].style.closed = !1 : e[h] = this.createStyleElement(t[h], a), t[h]._render && s.appendChild(e[h].style.pElem), u.push(e[h].style);else if ("gr" == t[h].ty) {
            if (d) for (l = e[h].it.length, o = 0; o < l; o += 1) {
              e[h].prevViewData[o] = e[h].it[o];
            } else e[h] = this.createGroupElement(t[h]);
            this.searchShapes(t[h].it, e[h].it, e[h].prevViewData, e[h].gr, a + 1, m, n), t[h]._render && s.appendChild(e[h].gr);
          } else "tr" == t[h].ty ? (d || (e[h] = this.createTransformElement(t[h], s)), p = e[h].transform, m.push(p)) : "sh" == t[h].ty || "rc" == t[h].ty || "el" == t[h].ty || "sr" == t[h].ty ? (d || (e[h] = this.createShapeElement(t[h], m, a)), this.setElementStyles(e[h])) : "tm" == t[h].ty || "rd" == t[h].ty || "ms" == t[h].ty ? (d ? (f = e[h]).closed = !1 : ((f = X.getModifier(t[h].ty)).init(this, t[h]), e[h] = f, this.shapeModifiers.push(f)), g.push(f)) : "rp" == t[h].ty && (d ? (f = e[h]).closed = !0 : (f = X.getModifier(t[h].ty), (e[h] = f).init(this, t, h, e), this.shapeModifiers.push(f), n = !1), g.push(f));
          this.addProcessedElement(t[h], h + 1);
        }

        for (c = u.length, h = 0; h < c; h += 1) {
          u[h].closed = !0;
        }

        for (c = g.length, h = 0; h < c; h += 1) {
          g[h].closed = !0;
        }
      }, ee.prototype.renderInnerContent = function () {
        this.renderModifiers();
        var t,
            e = this.stylesList.length;

        for (t = 0; t < e; t += 1) {
          this.stylesList[t].reset();
        }

        for (this.renderShape(), t = 0; t < e; t += 1) {
          (this.stylesList[t]._mdf || this._isFirstFrame) && (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d), this.stylesList[t].d = "M0 0" + this.stylesList[t].d), this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"));
        }
      }, ee.prototype.renderShape = function () {
        var t,
            e,
            i = this.animatedContents.length;

        for (t = 0; t < i; t += 1) {
          e = this.animatedContents[t], (this._isFirstFrame || e.element._isAnimated) && !0 !== e.data && e.fn(e.data, e.element, this._isFirstFrame);
        }
      }, ee.prototype.destroy = function () {
        this.destroyBaseElement(), this.shapesData = null, this.itemsData = null;
      }, ie.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[0].p.v,
              i = this.filterManager.effectElements[1].p.v,
              s = this.filterManager.effectElements[2].p.v / 100;
          this.matrixFilter.setAttribute("values", i[0] - e[0] + " 0 0 0 " + e[0] + " " + (i[1] - e[1]) + " 0 0 0 " + e[1] + " " + (i[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 " + s + " 0");
        }
      }, se.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[2].p.v,
              i = this.filterManager.effectElements[6].p.v;
          this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + i + " 0");
        }
      }, ae.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = .3 * this.filterManager.effectElements[0].p.v,
              i = this.filterManager.effectElements[1].p.v,
              s = 3 == i ? 0 : e,
              a = 2 == i ? 0 : e;
          this.feGaussianBlur.setAttribute("stdDeviation", s + " " + a);
          var r = 1 == this.filterManager.effectElements[2].p.v ? "wrap" : "duplicate";
          this.feGaussianBlur.setAttribute("edgeMode", r);
        }
      }, re.prototype.initialize = function () {
        var t,
            e,
            i,
            s,
            a = this.elem.layerElement.children || this.elem.layerElement.childNodes;

        for (1 === this.filterManager.effectElements[1].p.v ? (s = this.elem.maskManager.masksProperties.length, i = 0) : s = (i = this.filterManager.effectElements[0].p.v - 1) + 1, (e = S("g")).setAttribute("fill", "none"), e.setAttribute("stroke-linecap", "round"), e.setAttribute("stroke-dashoffset", 1); i < s; i += 1) {
          t = S("path"), e.appendChild(t), this.paths.push({
            p: t,
            m: i
          });
        }

        if (3 === this.filterManager.effectElements[10].p.v) {
          var r = S("mask"),
              n = C();
          r.setAttribute("id", n), r.setAttribute("mask-type", "alpha"), r.appendChild(e), this.elem.globalData.defs.appendChild(r);
          var h = S("g");

          for (h.setAttribute("mask", "url(" + A + "#" + n + ")"); a[0];) {
            h.appendChild(a[0]);
          }

          this.elem.layerElement.appendChild(h), this.masker = r, e.setAttribute("stroke", "#fff");
        } else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
          if (2 === this.filterManager.effectElements[10].p.v) for (a = this.elem.layerElement.children || this.elem.layerElement.childNodes; a.length;) {
            this.elem.layerElement.removeChild(a[0]);
          }
          this.elem.layerElement.appendChild(e), this.elem.layerElement.removeAttribute("mask"), e.setAttribute("stroke", "#fff");
        }

        this.initialized = !0, this.pathMasker = e;
      }, re.prototype.renderFrame = function (t) {
        this.initialized || this.initialize();
        var e,
            i,
            s,
            a = this.paths.length;

        for (e = 0; e < a; e += 1) {
          if (-1 !== this.paths[e].m && (i = this.elem.maskManager.viewData[this.paths[e].m], s = this.paths[e].p, (t || this.filterManager._mdf || i.prop._mdf) && s.setAttribute("d", i.lastPath), t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || i.prop._mdf)) {
            var r;

            if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
              var n = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                  h = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                  o = s.getTotalLength();
              r = "0 0 0 " + o * n + " ";
              var l,
                  p = o * (h - n),
                  f = 1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100,
                  d = Math.floor(p / f);

              for (l = 0; l < d; l += 1) {
                r += "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100 + " ";
              }

              r += "0 " + 10 * o + " 0 0";
            } else r = "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100;

            s.setAttribute("stroke-dasharray", r);
          }
        }

        if ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v), (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v), (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p._mdf)) {
          var m = this.filterManager.effectElements[3].p.v;
          this.pathMasker.setAttribute("stroke", "rgb(" + c(255 * m[0]) + "," + c(255 * m[1]) + "," + c(255 * m[2]) + ")");
        }
      }, ne.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[0].p.v,
              i = this.filterManager.effectElements[1].p.v,
              s = this.filterManager.effectElements[2].p.v,
              a = s[0] + " " + i[0] + " " + e[0],
              r = s[1] + " " + i[1] + " " + e[1],
              n = s[2] + " " + i[2] + " " + e[2];
          this.feFuncR.setAttribute("tableValues", a), this.feFuncG.setAttribute("tableValues", r), this.feFuncB.setAttribute("tableValues", n);
        }
      }, he.prototype.createFeFunc = function (t, e) {
        var i = S(t);
        return i.setAttribute("type", "table"), e.appendChild(i), i;
      }, he.prototype.getTableValue = function (t, e, i, s, a) {
        for (var r, n, h = 0, o = Math.min(t, e), l = Math.max(t, e), p = Array.call(null, {
          length: 256
        }), f = 0, d = a - s, m = e - t; h <= 256;) {
          n = (r = h / 256) <= o ? m < 0 ? a : s : l <= r ? m < 0 ? s : a : s + d * Math.pow((r - t) / m, 1 / i), p[f++] = n, h += 256 / 255;
        }

        return p.join(" ");
      }, he.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e,
              i = this.filterManager.effectElements;
          this.feFuncRComposed && (t || i[3].p._mdf || i[4].p._mdf || i[5].p._mdf || i[6].p._mdf || i[7].p._mdf) && (e = this.getTableValue(i[3].p.v, i[4].p.v, i[5].p.v, i[6].p.v, i[7].p.v), this.feFuncRComposed.setAttribute("tableValues", e), this.feFuncGComposed.setAttribute("tableValues", e), this.feFuncBComposed.setAttribute("tableValues", e)), this.feFuncR && (t || i[10].p._mdf || i[11].p._mdf || i[12].p._mdf || i[13].p._mdf || i[14].p._mdf) && (e = this.getTableValue(i[10].p.v, i[11].p.v, i[12].p.v, i[13].p.v, i[14].p.v), this.feFuncR.setAttribute("tableValues", e)), this.feFuncG && (t || i[17].p._mdf || i[18].p._mdf || i[19].p._mdf || i[20].p._mdf || i[21].p._mdf) && (e = this.getTableValue(i[17].p.v, i[18].p.v, i[19].p.v, i[20].p.v, i[21].p.v), this.feFuncG.setAttribute("tableValues", e)), this.feFuncB && (t || i[24].p._mdf || i[25].p._mdf || i[26].p._mdf || i[27].p._mdf || i[28].p._mdf) && (e = this.getTableValue(i[24].p.v, i[25].p.v, i[26].p.v, i[27].p.v, i[28].p.v), this.feFuncB.setAttribute("tableValues", e)), this.feFuncA && (t || i[31].p._mdf || i[32].p._mdf || i[33].p._mdf || i[34].p._mdf || i[35].p._mdf) && (e = this.getTableValue(i[31].p.v, i[32].p.v, i[33].p.v, i[34].p.v, i[35].p.v), this.feFuncA.setAttribute("tableValues", e));
        }
      }, oe.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          if ((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4), t || this.filterManager.effectElements[0].p._mdf) {
            var e = this.filterManager.effectElements[0].p.v;
            this.feFlood.setAttribute("flood-color", b(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])));
          }

          if ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255), t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
            var i = this.filterManager.effectElements[3].p.v,
                s = (this.filterManager.effectElements[2].p.v - 90) * q,
                a = i * Math.cos(s),
                r = i * Math.sin(s);
            this.feOffset.setAttribute("dx", a), this.feOffset.setAttribute("dy", r);
          }
        }
      };
      var le = [];

      function pe(t, e, i) {
        this.initialized = !1, this.filterManager = e, this.filterElem = t, (this.elem = i).matteElement = S("g"), i.matteElement.appendChild(i.layerElement), i.matteElement.appendChild(i.transformedElement), i.baseElement = i.matteElement;
      }

      function fe(t) {
        var e,
            i,
            s = t.data.ef ? t.data.ef.length : 0,
            a = C(),
            r = at.createFilter(a),
            n = 0;

        for (this.filters = [], e = 0; e < s; e += 1) {
          i = null, 20 === t.data.ef[e].ty ? (n += 1, i = new ie(r, t.effectsManager.effectElements[e])) : 21 === t.data.ef[e].ty ? (n += 1, i = new se(r, t.effectsManager.effectElements[e])) : 22 === t.data.ef[e].ty ? i = new re(t, t.effectsManager.effectElements[e]) : 23 === t.data.ef[e].ty ? (n += 1, i = new ne(r, t.effectsManager.effectElements[e])) : 24 === t.data.ef[e].ty ? (n += 1, i = new he(r, t.effectsManager.effectElements[e])) : 25 === t.data.ef[e].ty ? (n += 1, i = new oe(r, t.effectsManager.effectElements[e])) : 28 === t.data.ef[e].ty ? i = new pe(r, t.effectsManager.effectElements[e], t) : 29 === t.data.ef[e].ty && (n += 1, i = new ae(r, t.effectsManager.effectElements[e])), i && this.filters.push(i);
        }

        n && (t.globalData.defs.appendChild(r), t.layerElement.setAttribute("filter", "url(" + A + "#" + a + ")")), this.filters.length && t.addRenderableComponent(this);
      }

      pe.prototype.findSymbol = function (t) {
        for (var e = 0, i = le.length; e < i;) {
          if (le[e] === t) return le[e];
          e += 1;
        }

        return null;
      }, pe.prototype.replaceInParent = function (t, e) {
        var i = t.layerElement.parentNode;

        if (i) {
          for (var s, a = i.children, r = 0, n = a.length; r < n && a[r] !== t.layerElement;) {
            r += 1;
          }

          r <= n - 2 && (s = a[r + 1]);
          var h = S("use");
          h.setAttribute("href", "#" + e), s ? i.insertBefore(h, s) : i.appendChild(h);
        }
      }, pe.prototype.setElementAsMask = function (t, e) {
        if (!this.findSymbol(e)) {
          var i = C(),
              s = S("mask");
          s.setAttribute("id", e.layerId), s.setAttribute("mask-type", "alpha"), le.push(e);
          var a = t.globalData.defs;
          a.appendChild(s);
          var r = S("symbol");
          r.setAttribute("id", i), this.replaceInParent(e, i), r.appendChild(e.layerElement), a.appendChild(r);
          var n = S("use");
          n.setAttribute("href", "#" + i), s.appendChild(n), e.data.hd = !1, e.show();
        }

        t.setMatte(e.layerId);
      }, pe.prototype.initialize = function () {
        for (var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, i = 0, s = e.length; i < s;) {
          e[i] && e[i].data.ind === t && this.setElementAsMask(this.elem, e[i]), i += 1;
        }

        this.initialized = !0;
      }, pe.prototype.renderFrame = function () {
        this.initialized || this.initialize();
      }, fe.prototype.renderFrame = function (t) {
        var e,
            i = this.filters.length;

        for (e = 0; e < i; e += 1) {
          this.filters[e].renderFrame(t);
        }
      };

      var de = function () {
        var t = {},
            a = [],
            s = 0,
            r = 0,
            n = 0,
            h = !0,
            o = !1;

        function i(t) {
          for (var e = 0, i = t.target; e < r;) {
            a[e].animation === i && (a.splice(e, 1), e -= 1, r -= 1, i.isPaused || f()), e += 1;
          }
        }

        function l(t, e) {
          if (!t) return null;

          for (var i = 0; i < r;) {
            if (a[i].elem == t && null !== a[i].elem) return a[i].animation;
            i += 1;
          }

          var s = new me();
          return d(s, t), s.setData(t, e), s;
        }

        function p() {
          n += 1, c();
        }

        function f() {
          n -= 1;
        }

        function d(t, e) {
          t.addEventListener("destroy", i), t.addEventListener("_active", p), t.addEventListener("_idle", f), a.push({
            elem: e,
            animation: t
          }), r += 1;
        }

        function m(t) {
          var e,
              i = t - s;

          for (e = 0; e < r; e += 1) {
            a[e].animation.advanceTime(i);
          }

          s = t, n && !o ? window.requestAnimationFrame(m) : h = !0;
        }

        function e(t) {
          s = t, window.requestAnimationFrame(m);
        }

        function c() {
          !o && n && h && (window.requestAnimationFrame(e), h = !1);
        }

        return t.registerAnimation = l, t.loadAnimation = function (t) {
          var e = new me();
          return d(e, null), e.setParams(t), e;
        }, t.setSpeed = function (t, e) {
          var i;

          for (i = 0; i < r; i += 1) {
            a[i].animation.setSpeed(t, e);
          }
        }, t.setDirection = function (t, e) {
          var i;

          for (i = 0; i < r; i += 1) {
            a[i].animation.setDirection(t, e);
          }
        }, t.play = function (t) {
          var e;

          for (e = 0; e < r; e += 1) {
            a[e].animation.play(t);
          }
        }, t.pause = function (t) {
          var e;

          for (e = 0; e < r; e += 1) {
            a[e].animation.pause(t);
          }
        }, t.stop = function (t) {
          var e;

          for (e = 0; e < r; e += 1) {
            a[e].animation.stop(t);
          }
        }, t.togglePause = function (t) {
          var e;

          for (e = 0; e < r; e += 1) {
            a[e].animation.togglePause(t);
          }
        }, t.searchAnimations = function (t, e, i) {
          var s,
              a = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))),
              r = a.length;

          for (s = 0; s < r; s += 1) {
            i && a[s].setAttribute("data-bm-type", i), l(a[s], t);
          }

          if (e && 0 === r) {
            i || (i = "svg");
            var n = document.getElementsByTagName("body")[0];
            n.innerHTML = "";
            var h = w("div");
            h.style.width = "100%", h.style.height = "100%", h.setAttribute("data-bm-type", i), n.appendChild(h), l(h, t);
          }
        }, t.resize = function () {
          var t;

          for (t = 0; t < r; t += 1) {
            a[t].animation.resize();
          }
        }, t.goToAndStop = function (t, e, i) {
          var s;

          for (s = 0; s < r; s += 1) {
            a[s].animation.goToAndStop(t, e, i);
          }
        }, t.destroy = function (t) {
          var e;

          for (e = r - 1; 0 <= e; e -= 1) {
            a[e].animation.destroy(t);
          }
        }, t.freeze = function () {
          o = !0;
        }, t.unfreeze = function () {
          o = !1, c();
        }, t.getRegisteredAnimations = function () {
          var t,
              e = a.length,
              i = [];

          for (t = 0; t < e; t += 1) {
            i.push(a[t].animation);
          }

          return i;
        }, t;
      }(),
          me = function me() {
        this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.firstFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = C(), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.isSubframeEnabled = s, this.segments = [], this._idle = !0, this._completedLoop = !1, this.projectInterface = {}, this.imagePreloader = new it();
      };

      function ce() {}

      T([P], me), me.prototype.setParams = function (t) {
        t.context && (this.context = t.context), (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
        var e = t.animType ? t.animType : t.renderer ? t.renderer : "svg";

        switch (e) {
          case "canvas":
            this.renderer = new CanvasRenderer(this, t.rendererSettings);
            break;

          case "svg":
            this.renderer = new wt(this, t.rendererSettings);
            break;

          default:
            this.renderer = new HybridRenderer(this, t.rendererSettings);
        }

        this.imagePreloader.setCacheType(e), this.renderer.setProjectInterface(this.projectInterface), this.animType = e, "" === t.loop || null === t.loop || void 0 === t.loop || !0 === t.loop ? this.loop = !0 : !1 === t.loop ? this.loop = !1 : this.loop = parseInt(t.loop), this.autoplay = !("autoplay" in t) || t.autoplay, this.name = t.name ? t.name : "", this.autoloadSegments = !t.hasOwnProperty("autoloadSegments") || t.autoloadSegments, this.assetsPath = t.assetsPath, this.initialSegment = t.initialSegment, t.animationData ? this.configAnimation(t.animationData) : t.path && (-1 !== t.path.lastIndexOf("\\") ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1), this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), rt.load(t.path, this.configAnimation.bind(this), function () {
          this.trigger("data_failed");
        }.bind(this)));
      }, me.prototype.setData = function (t, e) {
        var i = {
          wrapper: t,
          animationData: e ? "object" == _typeof(e) ? e : JSON.parse(e) : null
        },
            s = t.attributes;
        i.path = s.getNamedItem("data-animation-path") ? s.getNamedItem("data-animation-path").value : s.getNamedItem("data-bm-path") ? s.getNamedItem("data-bm-path").value : s.getNamedItem("bm-path") ? s.getNamedItem("bm-path").value : "", i.animType = s.getNamedItem("data-anim-type") ? s.getNamedItem("data-anim-type").value : s.getNamedItem("data-bm-type") ? s.getNamedItem("data-bm-type").value : s.getNamedItem("bm-type") ? s.getNamedItem("bm-type").value : s.getNamedItem("data-bm-renderer") ? s.getNamedItem("data-bm-renderer").value : s.getNamedItem("bm-renderer") ? s.getNamedItem("bm-renderer").value : "canvas";
        var a = s.getNamedItem("data-anim-loop") ? s.getNamedItem("data-anim-loop").value : s.getNamedItem("data-bm-loop") ? s.getNamedItem("data-bm-loop").value : s.getNamedItem("bm-loop") ? s.getNamedItem("bm-loop").value : "";
        "" === a || (i.loop = "false" !== a && ("true" === a || parseInt(a)));
        var r = s.getNamedItem("data-anim-autoplay") ? s.getNamedItem("data-anim-autoplay").value : s.getNamedItem("data-bm-autoplay") ? s.getNamedItem("data-bm-autoplay").value : !s.getNamedItem("bm-autoplay") || s.getNamedItem("bm-autoplay").value;
        i.autoplay = "false" !== r, i.name = s.getNamedItem("data-name") ? s.getNamedItem("data-name").value : s.getNamedItem("data-bm-name") ? s.getNamedItem("data-bm-name").value : s.getNamedItem("bm-name") ? s.getNamedItem("bm-name").value : "", "false" === (s.getNamedItem("data-anim-prerender") ? s.getNamedItem("data-anim-prerender").value : s.getNamedItem("data-bm-prerender") ? s.getNamedItem("data-bm-prerender").value : s.getNamedItem("bm-prerender") ? s.getNamedItem("bm-prerender").value : "") && (i.prerender = !1), this.setParams(i);
      }, me.prototype.includeLayers = function (t) {
        t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip));
        var e,
            i,
            s = this.animationData.layers,
            a = s.length,
            r = t.layers,
            n = r.length;

        for (i = 0; i < n; i += 1) {
          for (e = 0; e < a;) {
            if (s[e].id == r[i].id) {
              s[e] = r[i];
              break;
            }

            e += 1;
          }
        }

        if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets) for (a = t.assets.length, e = 0; e < a; e += 1) {
          this.animationData.assets.push(t.assets[e]);
        }
        this.animationData.__complete = !1, L.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.includeLayers(t.layers), h && h.initExpressions(this), this.loadNextSegment();
      }, me.prototype.loadNextSegment = function () {
        var t = this.animationData.segments;
        if (!t || 0 === t.length || !this.autoloadSegments) return this.trigger("data_ready"), void (this.timeCompleted = this.totalFrames);
        var e = t.shift();
        this.timeCompleted = e.time * this.frameRate;
        var i = this.path + this.fileName + "_" + this.segmentPos + ".json";
        this.segmentPos += 1, rt.load(i, this.includeLayers.bind(this), function () {
          this.trigger("data_failed");
        }.bind(this));
      }, me.prototype.loadSegments = function () {
        this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment();
      }, me.prototype.imagesLoaded = function () {
        this.trigger("loaded_images"), this.checkLoaded();
      }, me.prototype.preloadImages = function () {
        this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this));
      }, me.prototype.configAnimation = function (t) {
        if (this.renderer) try {
          this.animationData = t, this.initialSegment ? (this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0]), this.firstFrame = Math.round(this.initialSegment[0])) : (this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.firstFrame = Math.round(this.animationData.ip)), this.renderer.configAnimation(t), t.assets || (t.assets = []), this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.frameMult = this.animationData.fr / 1e3, this.renderer.searchExtraCompositions(t.assets), this.trigger("config_ready"), this.preloadImages(), this.loadSegments(), this.updaFrameModifier(), this.waitForFontsLoaded();
        } catch (t) {
          this.triggerConfigError(t);
        }
      }, me.prototype.waitForFontsLoaded = function () {
        this.renderer && (this.renderer.globalData.fontManager.isLoaded ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20));
      }, me.prototype.checkLoaded = function () {
        this.isLoaded || !this.renderer.globalData.fontManager.isLoaded || !this.imagePreloader.loaded() && "canvas" === this.renderer.rendererType || (this.isLoaded = !0, L.completeData(this.animationData, this.renderer.globalData.fontManager), h && h.initExpressions(this), this.renderer.initItems(), setTimeout(function () {
          this.trigger("DOMLoaded");
        }.bind(this), 0), this.gotoFrame(), this.autoplay && this.play());
      }, me.prototype.resize = function () {
        this.renderer.updateContainerSize();
      }, me.prototype.setSubframe = function (t) {
        this.isSubframeEnabled = !!t;
      }, me.prototype.gotoFrame = function () {
        this.currentFrame = this.isSubframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame();
      }, me.prototype.renderFrame = function () {
        if (!1 !== this.isLoaded) try {
          this.renderer.renderFrame(this.currentFrame + this.firstFrame);
        } catch (t) {
          this.triggerRenderFrameError(t);
        }
      }, me.prototype.play = function (t) {
        t && this.name != t || !0 === this.isPaused && (this.isPaused = !1, this._idle && (this._idle = !1, this.trigger("_active")));
      }, me.prototype.pause = function (t) {
        t && this.name != t || !1 === this.isPaused && (this.isPaused = !0, this._idle = !0, this.trigger("_idle"));
      }, me.prototype.togglePause = function (t) {
        t && this.name != t || (!0 === this.isPaused ? this.play() : this.pause());
      }, me.prototype.stop = function (t) {
        t && this.name != t || (this.pause(), this.playCount = 0, this._completedLoop = !1, this.setCurrentRawFrameValue(0));
      }, me.prototype.goToAndStop = function (t, e, i) {
        i && this.name != i || (e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier), this.pause());
      }, me.prototype.goToAndPlay = function (t, e, i) {
        this.goToAndStop(t, e, i), this.play();
      }, me.prototype.advanceTime = function (t) {
        if (!0 !== this.isPaused && !1 !== this.isLoaded) {
          var e = this.currentRawFrame + t * this.frameModifier,
              i = !1;
          e >= this.totalFrames - 1 && 0 < this.frameModifier ? this.loop && this.playCount !== this.loop ? e >= this.totalFrames ? (this.playCount += 1, this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames), this._completedLoop = !0, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e) : this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || (i = !0, e = this.totalFrames - 1) : e < 0 ? this.checkSegments(e % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && !0 !== this.loop ? (i = !0, e = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0)) : this.setCurrentRawFrameValue(e), i && (this.setCurrentRawFrameValue(e), this.pause(), this.trigger("complete"));
        }
      }, me.prototype.adjustSegment = function (t, e) {
        this.playCount = 0, t[1] < t[0] ? (0 < this.frameModifier && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.timeCompleted = this.totalFrames = t[0] - t[1], this.firstFrame = t[1], this.setCurrentRawFrameValue(this.totalFrames - .001 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.timeCompleted = this.totalFrames = t[1] - t[0], this.firstFrame = t[0], this.setCurrentRawFrameValue(.001 + e)), this.trigger("segmentStart");
      }, me.prototype.setSegment = function (t, e) {
        var i = -1;
        this.isPaused && (this.currentRawFrame + this.firstFrame < t ? i = t : this.currentRawFrame + this.firstFrame > e && (i = e - t)), this.firstFrame = t, this.timeCompleted = this.totalFrames = e - t, -1 !== i && this.goToAndStop(i, !0);
      }, me.prototype.playSegments = function (t, e) {
        if (e && (this.segments.length = 0), "object" == _typeof(t[0])) {
          var i,
              s = t.length;

          for (i = 0; i < s; i += 1) {
            this.segments.push(t[i]);
          }
        } else this.segments.push(t);

        this.segments.length && e && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play();
      }, me.prototype.resetSegments = function (t) {
        this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0);
      }, me.prototype.checkSegments = function (t) {
        return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t), !0);
      }, me.prototype.destroy = function (t) {
        t && this.name != t || !this.renderer || (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null, this.renderer = null);
      }, me.prototype.setCurrentRawFrameValue = function (t) {
        this.currentRawFrame = t, this.gotoFrame();
      }, me.prototype.setSpeed = function (t) {
        this.playSpeed = t, this.updaFrameModifier();
      }, me.prototype.setDirection = function (t) {
        this.playDirection = t < 0 ? -1 : 1, this.updaFrameModifier();
      }, me.prototype.updaFrameModifier = function () {
        this.frameModifier = this.frameMult * this.playSpeed * this.playDirection;
      }, me.prototype.getPath = function () {
        return this.path;
      }, me.prototype.getAssetsPath = function (t) {
        var e = "";
        if (t.e) e = t.p;else if (this.assetsPath) {
          var i = t.p;
          -1 !== i.indexOf("images/") && (i = i.split("/")[1]), e = this.assetsPath + i;
        } else e = this.path, e += t.u ? t.u : "", e += t.p;
        return e;
      }, me.prototype.getAssetData = function (t) {
        for (var e = 0, i = this.assets.length; e < i;) {
          if (t == this.assets[e].id) return this.assets[e];
          e += 1;
        }
      }, me.prototype.hide = function () {
        this.renderer.hide();
      }, me.prototype.show = function () {
        this.renderer.show();
      }, me.prototype.getDuration = function (t) {
        return t ? this.totalFrames : this.totalFrames / this.frameRate;
      }, me.prototype.trigger = function (t) {
        if (this._cbs && this._cbs[t]) switch (t) {
          case "enterFrame":
            this.triggerEvent(t, new n(t, this.currentFrame, this.totalFrames, this.frameModifier));
            break;

          case "loopComplete":
            this.triggerEvent(t, new l(t, this.loop, this.playCount, this.frameMult));
            break;

          case "complete":
            this.triggerEvent(t, new o(t, this.frameMult));
            break;

          case "segmentStart":
            this.triggerEvent(t, new p(t, this.firstFrame, this.totalFrames));
            break;

          case "destroy":
            this.triggerEvent(t, new f(t, this));
            break;

          default:
            this.triggerEvent(t);
        }
        "enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new n(t, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new l(t, this.loop, this.playCount, this.frameMult)), "complete" === t && this.onComplete && this.onComplete.call(this, new o(t, this.frameMult)), "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new p(t, this.firstFrame, this.totalFrames)), "destroy" === t && this.onDestroy && this.onDestroy.call(this, new f(t, this));
      }, me.prototype.triggerRenderFrameError = function (t) {
        var e = new m(t, this.currentFrame);
        this.triggerEvent("error", e), this.onError && this.onError.call(this, e);
      };
      var lottie = {};

      me.prototype.triggerConfigError = function (t) {
        var e = new u(t, this.currentFrame);
        this.triggerEvent("error", e), this.onError && this.onError.call(this, e);
      };

      function ue() {
        !0 === ge ? de.searchAnimations(ve, ge, ye) : de.searchAnimations();
      }

      lottie.play = de.play, lottie.pause = de.pause, lottie.setLocationHref = function (t) {
        A = t;
      }, lottie.togglePause = de.togglePause, lottie.setSpeed = de.setSpeed, lottie.setDirection = de.setDirection, lottie.stop = de.stop, lottie.searchAnimations = ue, lottie.registerAnimation = de.registerAnimation, lottie.loadAnimation = function (t) {
        return !0 === ge && (t.animationData = JSON.parse(ve)), de.loadAnimation(t);
      }, lottie.setSubframeRendering = function (t) {
        s = t;
      }, lottie.resize = de.resize, lottie.goToAndStop = de.goToAndStop, lottie.destroy = de.destroy, lottie.setQuality = function (t) {
        if ("string" == typeof t) switch (t) {
          case "high":
            M = 200;
            break;

          case "medium":
            M = 50;
            break;

          case "low":
            M = 10;
        } else !isNaN(t) && 1 < t && (M = t);
        r(!(50 <= M));
      }, lottie.inBrowser = function () {
        return "undefined" != typeof navigator;
      }, lottie.installPlugin = function (t, e) {
        "expressions" === t && (h = e);
      }, lottie.freeze = de.freeze, lottie.unfreeze = de.unfreeze, lottie.getRegisteredAnimations = de.getRegisteredAnimations, lottie.__getFactory = function (t) {
        switch (t) {
          case "propertyFactory":
            return z;

          case "shapePropertyFactory":
            return W;

          case "matrix":
            return I;
        }
      }, lottie.version = "5.6.10";
      var ge = "__[STANDALONE]__",
          ve = "__[ANIMATIONDATA]__",
          ye = "";

      if (ge) {
        var be = document.getElementsByTagName("script"),
            _e = (be[be.length - 1] || {
          src: ""
        }).src.replace(/^[^\?]+\??/, "");

        ye = function (t) {
          for (var e = _e.split("&"), i = 0; i < e.length; i++) {
            var s = e[i].split("=");
            if (decodeURIComponent(s[0]) == t) return decodeURIComponent(s[1]);
          }
        }("renderer");
      }

      var ke = setInterval(function () {
        "complete" === document.readyState && (clearInterval(ke), ue());
      }, 100);
      return lottie;
    });
    var $nav = document.querySelector('.nav-logo');
    var navAnimation = lottie.loadAnimation({
      container: $nav,
      // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      speed: 2,
      path: path + '/data.json' // the path to the animation json
      //path: 'https://www.vanca.art/assets/js/data.json' // the path to the animation json

    });
    $nav.addEventListener('mouseenter', function () {
      navAnimation.setDirection(1);
      navAnimation.play();
    });
    $nav.addEventListener('mouseleave', function () {
      navAnimation.setDirection(-1);
      navAnimation.play();
    });
    this.reactId = Math.floor(Math.random() * 5 + 1);
  }

  _createClass(LottieAnimations, [{
    key: "react",
    value: function react(container) {
      var reactAnimation = lottie.loadAnimation({
        container: container,
        // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: "assets/js/".concat(this.reactId, ".json") // the path to the animation json

      });
      this.reactId + 1 == 6 ? this.reactId = 1 : this.reactId++;
      return reactAnimation;
    }
  }]);

  return LottieAnimations;
}();
"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Menu = /*#__PURE__*/function () {
  function Menu(container) {
    _classCallCheck(this, Menu);

    this.container = container;
    this.init();
  }

  _createClass(Menu, [{
    key: "init",
    value: function init() {
      this.circle = window.innerWidth >= 650 ? true : false;
      this.offset = this.circle ? 2 : 10;
      this.getSectors();
      this.linkboxes = Array.from(this.container.querySelectorAll('.link-box'));
      this.listen();
    }
  }, {
    key: "getSectors",
    value: function getSectors() {
      this.sectors = [];

      if (window.innerWidth >= 650) {
        for (var _i = 0, _Array$from = Array.from(this.container.querySelectorAll(".sektor")); _i < _Array$from.length; _i++) {
          var $sector = _Array$from[_i];
          var sector = {
            element: $sector,
            active: false,
            angle_o: 126,
            angle_c: 25,
            rotate: 0,
            color: '#567DF8',
            text: 'Work'
          };
          this.sectors.push(sector);
        }

        this.sectors[0].active = true;
        this.sectors[1].rotate = 128;
        this.sectors[1].color = '#E63E33';
        this.sectors[1].text = 'About';
        this.sectors[2].rotate = 155;
        this.sectors[2].color = '#FAC242';
        this.sectors[2].text = 'Contact';

        var _iterator = _createForOfIteratorHelper(this.sectors),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _sector = _step.value;
            _sector.sektor = new Sektor(_sector.element, _sector.active ? _sector.angle_o : _sector.angle_c, _sector.rotate, _sector.color, _sector.text);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        for (var _i2 = 0, _Array$from2 = Array.from(this.container.querySelectorAll(".sektor")); _i2 < _Array$from2.length; _i2++) {
          var _$sector = _Array$from2[_i2];
          var _sector2 = {
            element: _$sector,
            active: false,
            angle_o: 370,
            angle_c: 120,
            rotate: 0,
            color: '#567DF8',
            text: 'Work'
          };
          this.sectors.push(_sector2);
        }

        this.sectors[0].active = true;
        this.sectors[1].rotate = 380; //this.sectors[1].angle_o = 170

        this.sectors[1].color = '#E63E33';
        this.sectors[1].text = 'About';
        this.sectors[2].rotate = 510; //this.sectors[2].angle_o = 305

        this.sectors[2].color = '#FAC242';
        this.sectors[2].text = 'Contact';

        var _iterator2 = _createForOfIteratorHelper(this.sectors),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _sector3 = _step2.value;
            _sector3.sektor = new RecSektor(_sector3.element, _sector3.active ? _sector3.angle_o : _sector3.angle_c, _sector3.rotate, _sector3.color, _sector3.text);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  }, {
    key: "changeSector",
    value: function changeSector(SectorID) {
      var _this = this;

      var _loop = function _loop(i) {
        var linkbox = _this.linkboxes[i];

        if (i != SectorID) {
          _this.sectors[i].active = false;
          _this.sectors[i].rotate = i == 0 ? 0 : (_this.sectors[i - 1].active ? _this.sectors[i - 1].angle_o : _this.sectors[i - 1].angle_c) + _this.sectors[i - 1].rotate + _this.offset;

          _this.sectors[i].sektor.animateTo(_this.sectors[i].angle_c, _this.sectors[i].rotate);

          linkbox.style.display = "none";
          linkbox.classList.remove('active');
        } else {
          _this.sectors[i].active = true;
          _this.sectors[i].rotate = i == 0 ? 0 : _this.sectors[i - 1].angle_c + _this.sectors[i - 1].rotate + _this.offset;

          _this.sectors[i].sektor.animateTo(_this.sectors[i].angle_o, _this.sectors[i].rotate);

          linkbox.style.display = "block";
          window.setTimeout(function () {
            linkbox.classList.add('active');
          }, 5);
        }
      };

      for (var i = 0; i < this.sectors.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: "listen",
    value: function listen() {
      var _this2 = this;

      this.touchFunction = function (e) {
        var touch = e.changedTouches[0];

        if (touch.clientY <= _this2.sectors[1].sektor.sector.getBoundingClientRect().top) {
          if (!_this2.sectors[0].active) {
            e.preventDefault();

            _this2.changeSector(0);
          }
        } else if (touch.clientY >= _this2.sectors[1].sektor.sector.getBoundingClientRect().bottom) {
          if (!_this2.sectors[2].active) {
            e.preventDefault();

            _this2.changeSector(2);
          }
        } else {
          if (!_this2.sectors[1].active) e.preventDefault();
          {
            _this2.changeSector(1);
          }
        }
      };

      this.mouseFunction = function (e) {
        if (window.innerWidth < 650 || e.clientX > window.innerWidth / 2) {
          if (e.clientY <= _this2.sectors[1].sektor.sector.getBoundingClientRect().top) {
            if (!_this2.sectors[0].active) {
              _this2.changeSector(0);
            }
          } else if (e.clientY >= _this2.sectors[1].sektor.sector.getBoundingClientRect().bottom) {
            if (!_this2.sectors[2].active) {
              _this2.changeSector(2);
            }
          } else {
            if (!_this2.sectors[1].active) {
              _this2.changeSector(1);
            }
          }
        }
      };

      if (Modernizr.touchevents) {
        this.container.addEventListener('touchend', this.touchFunction);
      } else {
        this.container.addEventListener('mousemove', this.mouseFunction);
      }
    }
  }, {
    key: "adapt",
    value: function adapt(width) {
      if (this.circle && width < 650 || !this.circle && width >= 650) {
        var _iterator3 = _createForOfIteratorHelper(this.sectors),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var sector = _step3.value;
            sector.element.innerHTML = "";
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        this.linkboxes[0].style.display = "block";
        this.linkboxes[0].classList.add('active');
        this.linkboxes[1].style.display = "none";
        this.linkboxes[1].classList.remove('active');
        this.linkboxes[2].style.display = "none";
        this.linkboxes[2].classList.remove('active');
        this.container.removeEventListener('touchend', this.touchFunction);
        this.container.removeEventListener('mousemove', this.mouseFunction);
        this.init();
      }
    }
  }]);

  return Menu;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RecSektor = /*#__PURE__*/function () {
  function RecSektor(selector, angle, rotate, color, text) {
    _classCallCheck(this, RecSektor);

    this.element = selector;
    this.options = {
      size: window.innerWidth,
      stroke: 12,
      arc: true,
      angle: 180,
      sectorColor: color,
      circleColor: 'none',
      fillCircle: false,
      rotate: 0,
      text: text
    }; // Merge options with default ones

    this.options.angle = angle;
    this.options.rotate = rotate; // Reset stroke to 0 if drawing full sector

    this.options.stroke = this.options.arc ? this.options.stroke : 0; // Circle dimenstions

    this.options.center = this.options.size / 2;
    this.options.radius = this.options.stroke ? this.options.center - 50 - this.options.stroke / 2 : this.options.center - 50;
    var svg = "<svg style='width:".concat(this.options.size, "px; height:650px;' class='Sektor' xmlns=\"http://www.w3.org/2000/svg\" \n    xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox='0 0 ").concat(this.options.size, " 650'>\n      ").concat(this.getSector(), "\n    </svg>");
    this.element.innerHTML = svg;
    this.innerCircle = this.element.querySelector('.inner-circle');
    this.group = this.element.querySelector('.group');
    this.text = this.group.querySelector('.text');
    this.sector = this.group.querySelector('.Sektor-sector');
  }

  _createClass(RecSektor, [{
    key: "changeAngle",
    value: function changeAngle(angle, rotate) {
      this.options.angle = angle;
      this.options.rotate = rotate;
      this.sector.setAttribute('d', this.getSector(true));
      this.text.setAttribute('transform', "rotate(90 2,24) translate(".concat(rotate, ")"));
    }
  }, {
    key: "step",
    value: function step(ease) {
      var _this = this;

      if (Math.abs(this.options.endAngle - this.options.angle) <= 0.1 && Math.abs(this.options.endRotate - this.options.rotate) <= 0.1) {
        this.changeAngle(this.options.endAngle, this.options.endRotate);
      } else {
        //const angle = endAngle - (angleOffset * timeOffset / time);
        var angle = this.options.angle + (this.options.endAngle - this.options.angle) / ease;
        var rotate = this.options.rotate + (this.options.endRotate - this.options.rotate) / ease;
        this.changeAngle(angle, rotate);
        requestAnimationFrame(function () {
          return _this.step(ease);
        });
      }
    }
  }, {
    key: "animateTo",
    value: function animateTo(angle, rotate) {
      var _this2 = this;

      var ease = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
      this.options.endAngle = angle;
      this.options.endRotate = rotate;
      requestAnimationFrame(function () {
        return _this2.step(ease);
      });
    }
  }, {
    key: "getSector",
    value: function getSector() {
      var returnD = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var options = this.options; // Colors

      var sectorFill = options.arc ? 'none' : options.sectorColor;
      var sectorStroke = options.arc ? options.sectorColor : 'none';
      var d = "M16 ".concat(18 + options.rotate, " l 0 ").concat(options.angle);

      if (returnD) {
        return d;
      }

      return "\n    <g class='group'>\n    <path\n      class='Sektor-sector'\n      id='curve'\n      stroke-width='".concat(options.stroke, "px'\n      fill=").concat(sectorFill, "\n      stroke=").concat(sectorStroke, "\n      d='").concat(d, "' />\n    <style>\n    text { \n        font-size: 26px;\n        font-family: 'Okta', sans-serif;\n        font-weight: 700; \n        letter-spacing: 0px;\n    }\n    </style>\n    <text class='text' x='2' y='24' transform=\"rotate(90 2,24) translate(").concat(options.rotate, ")\">\n          ").concat(options.text, "\n    </text>\n    </g>");
    }
  }]);

  return RecSektor;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sektor = /*#__PURE__*/function () {
  function Sektor(selector, angle, rotate, color, text) {
    _classCallCheck(this, Sektor);

    this.element = selector;
    this.options = {
      size: 640,
      stroke: 12,
      arc: true,
      angle: 180,
      sectorColor: color,
      circleColor: 'none',
      fillCircle: false,
      rotate: 0,
      text: text
    }; // Merge options with default ones

    this.options.angle = angle;
    this.options.rotate = rotate; // Reset stroke to 0 if drawing full sector

    this.options.stroke = this.options.arc ? this.options.stroke : 0; // Circle dimenstions

    this.options.center = this.options.size / 2;
    this.options.radius = this.options.stroke ? this.options.center - 50 - this.options.stroke / 2 : this.options.center - 50;
    this.checkAngle();
    var svg = "<svg class='Sektor' xmlns=\"http://www.w3.org/2000/svg\" \n    xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox='0 0 ".concat(this.options.size, " ").concat(this.options.size, "'>\n      <circle class=\"inner-circle\" stroke-width=\"2\" fill=\"none\" stroke=").concat(this.options.angle > 110 ? this.options.sectorColor : 'none', " cx=\"320\" cy=\"320\" r=\"254\"></circle>\n\n      ").concat(this.getCircle(), "\n      ").concat(this.getSector(), "\n    </svg>");
    this.element.innerHTML = svg;
    this.innerCircle = this.element.querySelector('.inner-circle');
    this.group = this.element.querySelector('.group');
    this.sector = this.group.querySelector('.Sektor-sector');
  }

  _createClass(Sektor, [{
    key: "checkAngle",
    value: function checkAngle() {
      if (this.options.angle > 360) {
        this.options.angle = this.options.angle % 360;
      }
    }
  }, {
    key: "changeAngle",
    value: function changeAngle(angle, rotate) {
      this.options.angle = angle;
      this.options.rotate = rotate;
      this.checkAngle();
      this.sector.setAttribute('d', this.getSector(true));
      this.group.setAttribute('transform', "rotate(".concat(this.options.rotate, ",").concat(this.options.center, ",").concat(this.options.center, ")"));
    }
  }, {
    key: "step",
    value: function step(ease) {
      var _this = this;

      if (Math.abs(this.options.endAngle - this.options.angle) <= 0.1 && Math.abs(this.options.endRotate - this.options.rotate) <= 0.1) {
        this.changeAngle(this.options.endAngle, this.options.endRotate);
      } else {
        //const angle = endAngle - (angleOffset * timeOffset / time);
        var angle = this.options.angle + (this.options.endAngle - this.options.angle) / ease;
        var rotate = this.options.rotate + (this.options.endRotate - this.options.rotate) / ease;
        this.changeAngle(angle, rotate);
        requestAnimationFrame(function () {
          return _this.step(ease);
        });
      }
    }
  }, {
    key: "animateTo",
    value: function animateTo(angle, rotate) {
      var _this2 = this;

      var ease = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

      if (angle > 360) {
        angle = angle % 360;
      }

      this.options.endAngle = angle;
      this.options.endRotate = rotate;

      if (angle > this.options.angle) {
        this.innerCircle.setAttribute('stroke', this.options.sectorColor);
      } else {
        this.innerCircle.setAttribute('stroke', 'none');
      }
      /*const startTime = new Date().valueOf();
      const endTime = startTime + time;*/
      //const angleOffset = angle - this.options.angle;


      requestAnimationFrame(function () {
        return _this2.step(ease);
      });
    }
  }, {
    key: "getSector",
    value: function getSector() {
      var returnD = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var options = this.options; // Colors

      var sectorFill = options.arc ? 'none' : options.sectorColor;
      var sectorStroke = options.arc ? options.sectorColor : 'none'; // Arc angles

      var firstAngle = options.angle > 180 ? 90 : options.angle - 90;
      var secondAngle = -270 + options.angle - 180; // Arcs

      var firstArc = this.getArc(firstAngle, options);
      var secondArc = options.angle > 180 ? this.getArc(secondAngle, options) : ''; // start -> starting line
      // end -> will path be closed or not

      var end = '';
      var start = null;

      if (options.arc) {
        start = "M".concat(options.center, ",").concat(options.stroke / 2 + 50);
      } else {
        start = "M".concat(options.center, ",").concat(options.center, " L").concat(options.center, ",").concat(options.stroke / 2 + 50);
        end = 'z';
      }

      var d = "".concat(start, " ").concat(firstArc, " ").concat(secondArc, " ").concat(end);

      if (returnD) {
        return d;
      }

      return "\n    <g class='group' transform='rotate(".concat(options.rotate, ",").concat(options.center, ",").concat(options.center, ")'>\n    <path\n      class='Sektor-sector'\n      id='curve'\n      stroke-width='").concat(options.stroke, "'\n      fill=").concat(sectorFill, "\n      stroke=").concat(sectorStroke, "\n      d='").concat(d, "' />\n    <style>\n    text { \n        font-size: 26px;\n        font-family: 'Okta', sans-serif;\n        font-weight: 700; \n        letter-spacing: 0px;\n    }\n    </style>\n    <text dx=\"4\" dy=\"2\">\n        <textPath xlink:href=\"#curve\">\n            ").concat(options.text, "\n        </textPath>\n    </text>\n    </g>");
    }
  }, {
    key: "getCircle",
    value: function getCircle() {
      var options = this.options;
      var circleFill = options.fillCircle || !options.arc ? options.circleColor : 'none';
      return "<circle\n      class='Sektor-circle'\n      stroke-width='".concat(options.stroke, "'\n      fill=").concat(circleFill, "\n      stroke=").concat(options.circleColor, "\n      cx='").concat(options.center, "'\n      cy='").concat(options.center, "'\n      r='").concat(options.radius, "' />");
    }
  }, {
    key: "getArc",
    // Generates SVG arc string
    value: function getArc(angle) {
      var options = this.options;
      var x = options.center + options.radius * Math.cos(this.radians(angle));
      var y = options.center + options.radius * Math.sin(this.radians(angle));
      return "A".concat(options.radius, ",").concat(options.radius, " 1 0 1 ").concat(x, ",").concat(y);
    }
  }, {
    key: "radians",
    // Converts from degrees to radians.
    value: function radians(degrees) {
      return degrees / 180 * Math.PI;
    }
  }]);

  return Sektor;
}();
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! modernizr 3.6.0 (Custom Build) | MIT */
!function (e, n, t) {
  function o(e, n) {
    return _typeof(e) === n;
  }

  function s() {
    var e, n, t, s, a, i, r;

    for (var l in c) {
      if (c.hasOwnProperty(l)) {
        if (e = [], n = c[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) {
          e.push(n.options.aliases[t].toLowerCase());
        }

        for (s = o(n.fn, "function") ? n.fn() : n.fn, a = 0; a < e.length; a++) {
          i = e[a], r = i.split("."), 1 === r.length ? Modernizr[r[0]] = s : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = s), f.push((s ? "" : "no-") + r.join("-"));
        }
      }
    }
  }

  function a(e) {
    var n = u.className,
        t = Modernizr._config.classPrefix || "";

    if (p && (n = n.baseVal), Modernizr._config.enableJSClass) {
      var o = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
      n = n.replace(o, "$1" + t + "js$2");
    }

    Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), p ? u.className.baseVal = n : u.className = n);
  }

  function i() {
    return "function" != typeof n.createElement ? n.createElement(arguments[0]) : p ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments);
  }

  function r() {
    var e = n.body;
    return e || (e = i(p ? "svg" : "body"), e.fake = !0), e;
  }

  function l(e, t, o, s) {
    var a,
        l,
        f,
        c,
        d = "modernizr",
        p = i("div"),
        h = r();
    if (parseInt(o, 10)) for (; o--;) {
      f = i("div"), f.id = s ? s[o] : d + (o + 1), p.appendChild(f);
    }
    return a = i("style"), a.type = "text/css", a.id = "s" + d, (h.fake ? h : p).appendChild(a), h.appendChild(p), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(n.createTextNode(e)), p.id = d, h.fake && (h.style.background = "", h.style.overflow = "hidden", c = u.style.overflow, u.style.overflow = "hidden", u.appendChild(h)), l = t(p, e), h.fake ? (h.parentNode.removeChild(h), u.style.overflow = c, u.offsetHeight) : p.parentNode.removeChild(p), !!l;
  }

  var f = [],
      c = [],
      d = {
    _version: "3.6.0",
    _config: {
      classPrefix: "",
      enableClasses: !0,
      enableJSClass: !0,
      usePrefixes: !0
    },
    _q: [],
    on: function on(e, n) {
      var t = this;
      setTimeout(function () {
        n(t[e]);
      }, 0);
    },
    addTest: function addTest(e, n, t) {
      c.push({
        name: e,
        fn: n,
        options: t
      });
    },
    addAsyncTest: function addAsyncTest(e) {
      c.push({
        name: null,
        fn: e
      });
    }
  },
      Modernizr = function Modernizr() {};

  Modernizr.prototype = d, Modernizr = new Modernizr();
  var u = n.documentElement,
      p = "svg" === u.nodeName.toLowerCase(),
      h = d._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
  d._prefixes = h;
  var m = d.testStyles = l;
  Modernizr.addTest("touchevents", function () {
    var t;
    if ("ontouchstart" in e || e.DocumentTouch && n instanceof DocumentTouch) t = !0;else {
      var o = ["@media (", h.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
      m(o, function (e) {
        t = 9 === e.offsetTop;
      });
    }
    return t;
  }), s(), a(f), delete d.addTest, delete d.addAsyncTest;

  for (var v = 0; v < Modernizr._q.length; v++) {
    Modernizr._q[v]();
  }

  e.Modernizr = Modernizr;
}(window, document);
var windowSize = [window.innerWidth, window.innerHeight];
var fluidContainers = null;
var anims = new LottieAnimations(window.location.origin + '/assets/js');
var barbaInit = new BarbaInit();
window.addEventListener('resize', function () {
  windowSize[0] = window.innerWidth;
  windowSize[1] = window.innerHeight;

  if (barbaInit.fluidContainers) {
    barbaInit.fluidContainers.adapt();
  }

  if (barbaInit.menu) {
    barbaInit.menu.adapt(windowSize[0]);
  }
});
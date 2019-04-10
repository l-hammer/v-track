function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

/*
 * @Author: 宋慧武
 * @Date: 2019-04-08 11:13:34
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-08 11:50:22
 */

/**
 * @desc 判断给定变量是否为一个函数
 *
 * @param {*} v
 * @return {Boolean}
 */
var isFun = function isFun(v) {
  return typeof v === "function" || false;
};
/**
 * @desc 判断给定变量是否是未定义
 *
 * @param {*} v
 */

var isUndef = function isUndef(v) {
  return v === undefined || v === null;
};
/**
 * @desc 判断给定变量是否是定义
 *
 * @param {*} v
 */

var isDef = function isDef(v) {
  return v !== undefined && v !== null;
};
/**
 * @desc 判断当前环境是否为生产环境
 *
 * @param {*} v
 */

var isProd = process.env.NODE_ENV === "production";
/**
 * @desc 获取对象的键值
 *
 * @param {Object} value
 * @returns {Array} [keys, values]
 */

function zipArray(value) {
  return [Object.values(value), Object.keys(value)];
}
/**
 * @desc 防抖函数，至少间隔200毫秒执行一次
 *
 * @param {Function} fn callback
 * @param {Number} [ms=200] 默认200毫秒
 * @returns {Function}
 */

function debounce(fn) {
  var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  var timeoutId;
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      return fn.apply(_this, args);
    }, ms);
  };
}
/**
 * @desc 判断给定变量是否完全匹配目标数组
 *
 * @param {String[]} mdfs 目标数组
 * @param {String} vals
 * @returns {Boolean}
 */

function _exactMatch(mdfs, vals) {
  var keys = Object.keys(mdfs);
  return keys.length === vals.length && vals.every(function (v) {
    return keys.includes(v);
  });
}
/**
 * @desc 判断给定变量是否匹配目标数组的一部分
 *
 * @param {String[]} mdfs 目标字符串数组
 * @param {String} vals
 * @returns {Boolean}
 */

function _partialMatch(mdfs, vals) {
  var keys = Object.keys(mdfs);
  return vals.some(function (v) {
    return keys.includes(v);
  });
}
/**
 * @desc 判断两个节点是否为同一个vnode节点
 *
 * @param {VNode} a 虚拟节点
 * @param {VNode} b 虚拟节点
 */

function sameVnode(a, b) {
  return a.key === b.key && a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data);
}
/**
 * @desc 判断两个vnode节点是否全等
 *
 * @param {VNode} a 虚拟节点
 * @param {VNode} b 虚拟节点
 */

function exactlySameVnode(vnode, oldVnode) {
  if (!sameVnode(vnode, oldVnode)) return false;
  var oldCh = oldVnode.children;
  var ch = vnode.children; // vnode为非文本节点，且新旧节点的子节点都存在但不相同

  if (isUndef(vnode.text) && isDef(oldCh) && isDef(ch)) {
    if (oldCh.length !== ch.length) return false;

    for (var i = 0; i < ch.length; i++) {
      var c = ch[i];

      if (isDef(c) && isDef(oldCh[i])) {
        return exactlySameVnode(c, oldCh[i]);
      }
    }
  } // vnode为文本节点，新旧节点内容不相同
  else if (vnode.text !== oldVnode.text) return false;

  return true;
}

/*
 * @Author: 宋慧武
 * @Date: 2019-04-08 11:13:34
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-08 11:59:30
 */

/**
 * @desc 是否为元素几点
 *
 * @param {DOMElement} ele 一个 DOM 元素
 * @return {Boolean}
 */
var isElement = function isElement(ele) {
  return ele && ele.nodeType === 1;
};
/**
 * @desc 获取 DOM CSS 属性的值
 *
 * @param {DOMElement} ele A DOM 元素
 * @returns {String}
 */

function getStylePropValue(ele, prop) {
  return window.getComputedStyle(ele).getPropertyValue(prop);
}
/**
 * @desc 元素是否在可视区域可见
 *
 * @param {Object} rect 元素大小及相对可视区域的位置信息
 * @returns {Boolean} true => 可见 false => 不可见
 */

function isInViewport(rect, viewport) {
  if (!rect || rect.width <= 0 || rect.height <= 0) {
    return false;
  }

  return rect.bottom > 0 && rect.right > 0 && rect.top < viewport.height && rect.left < viewport.width;
}
/**
 * @desc 元素是否隐藏
 *
 * @param {DOMElement} ele A DOM 元素
 * @returns {Boolean} true => 未隐藏可见  false => 隐藏不可见
 */

function isVisible(ele) {
  if (ele === window.document) {
    return true;
  }

  if (!ele || !ele.parentNode) {
    return false;
  }

  var parent = ele.parentNode;
  var visibility = getStylePropValue(ele, "visibility");
  var display = getStylePropValue(ele, "display");

  if (visibility === "hidden" || display === "none") {
    return false;
  }

  return parent ? isVisible(parent) : true;
}

/**
 * @class
 * @name VisMonitor
 *
 * @deec 目标元素控制器
 */

var VisMonitor =
/*#__PURE__*/
function () {
  function VisMonitor(ele, ref) {
    _classCallCheck(this, VisMonitor);

    if (!isElement(ele)) {
      throw new Error("not an element node");
    }

    this.ele = ele;
    this.ref = ref;
    this.started = false;
    this.listeners = {};
    this.removeScrollLisener = null;
    this.init();
  }

  _createClass(VisMonitor, [{
    key: "init",
    value: function init() {
      var _this = this;

      if (!this.started) {
        this.removeScrollLisener = function (listener) {
          if (_this.ref) {
            return _this.ref.$on("scroll", listener);
          } else {
            window.addEventListener("scroll", listener, false);
            return function () {
              return window.removeEventListener("scroll", listener, false);
            };
          }
        }(debounce(this.visibilitychange.bind(this)));

        this.started = true;
      }
    }
    /**
     * 监听自定义事件
     */

  }, {
    key: "$on",
    value: function $on(evt, cbk) {
      var queue = this.listeners[evt] || (this.listeners[evt] = []);
      queue.push(cbk);
      return this;
    }
    /**
     * 移除监听自定义事件
     */

  }, {
    key: "$off",
    value: function $off(evt, cbk) {
      if (!cbk) return;
      var queue = this.listeners[evt];
      var v;
      var i = queue.length;

      while (i--) {
        v = queue[i];

        if (v === cbk || v.cbk === cbk) {
          queue.splice(i, 1);
          break;
        }
      }

      return this;
    }
    /**
     * 监听自定义事件，但只触发一次
     */

  }, {
    key: "$once",
    value: function $once(evt, cbk) {
      var _this2 = this;

      var on = function on() {
        _this2.$off(evt, on);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        cbk.apply(_this2, args);
      };

      on.cbk = cbk;
      this.$on(evt, on);
      return this;
    }
    /**
     * 触发当前实例的监听回调
     */

  }, {
    key: "$emit",
    value: function $emit(evt) {
      var _this3 = this;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var queue = this.listeners[evt] || [];
      queue.forEach(function (sub) {
        return sub.apply(_this3, args);
      });
      return this;
    }
    /**
     * 计算元素可见比例，如果比例为100%，则触发 fullyvisible 事件
     */

  }, {
    key: "visibilitychange",
    value: function visibilitychange() {
      var rect = this.ele.getBoundingClientRect();
      var view = {
        height: window.innerHeight,
        width: window.innerWidth
      };

      if (!isInViewport(rect, view) || !isVisible(this.ele)) {
        return 0;
      }

      var vh = 0;
      var vw = 0;
      var perc = 0;

      if (rect.top >= 0) {
        vh = Math.min(rect.height, view.height - rect.top);
      } else if (rect.bottom > 0) {
        vh = Math.min(view.height, rect.bottom);
      }

      if (rect.left >= 0) {
        vw = Math.min(rect.width, view.width - rect.left);
      } else if (rect.right > 0) {
        vw = Math.min(view.width, rect.right);
      }

      perc = vh * vw / (rect.height * rect.width);
      if (perc === 1) this.$emit("fullyvisible");
    }
    /**
     * 销毁当前实例的事件
     */

  }, {
    key: "destroy",
    value: function destroy() {
      isFun(this.removeScrollLisener) && this.removeScrollLisener();
    }
  }]);

  return VisMonitor;
}();

var MODIFIERS = ["async", "delay", "watch", "show", "once", "custom"]; // 修饰符

/*******************************************************************************
 * @description 监听数据发生改变时触发埋点，需处理两种情况：
 * ① 初始化时开始监听 v-track:xxxxx.watch="{ common_exp }"
 * ops.immediate 表示初始化时立即开始监听
 * ops.page === $route.name 避免多个页面同时监听同一个值(store中的common值)重复埋点的问题
 *
 * ② 点击事件之后开始监听 v-track:18016.click.async="{ refreshHotSpot, exposureId }"
 * el.contains(this.target) 避免多个“地方”同时监听同一个值出现多次上报的问题
 *******************************************************************************/

function _watcher(el, exp, cbk, ctt, mdf) {
  var _this = this;

  var ops = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  el.$unwatch = ctt.$watch(function () {
    return ctt[exp];
  }, function (nv, ov) {
    var $route = ctt.$route;

    if (!isProd && ops.immediate && !$route && !$route.name && mdf.watch) {
      throw new Error("$route 不存在");
    }

    nv !== ov && (ops.immediate && ops.name === $route.name || el.contains(_this.target)) && cbk();
    _this.target = null; // 释放当前操作的watcher
  });
}
/*************************************************************************
 * @description 自定义指令 v-track
 *
 * @param {*} el 指令所绑定的元素
 * @param {String} arg 埋点对应event ID
 * @param {Boolean} modifiers.click true: 事件行为埋点; false: 页面级埋点
 * @param {Boolean} modifiers.watch 异步埋点
 * @param {Boolean} modifiers.async 点击事件异步埋点
 * @param {Boolean} modifiers.delay 埋点是否延迟执行，默认先执行埋点再执行cbk
 *
 * @property {Function} tck 对应埋点方法
 *
 * @example v-track:18015
 * @example v-track:18015.watch
 * @example v-track:18015.watch.delay
 * @example v-track:18015.click
 * @example v-track:18015.click.async
 * @example v-track:18015.click.delay
 * @example v-track:18015.[自定义事件名].delay
 * @example v-track:18015.[自定义事件名].async
 *************************************************************************/


function bind(el, _ref, _ref2, _, __, events) {
  var _this2 = this;

  var value = _ref.value,
      id = _ref.arg,
      modifiers = _ref.modifiers,
      rawName = _ref.rawName;
  var context = _ref2.context,
      componentInstance = _ref2.componentInstance;
  if (!events[id]) throw new Error("埋点参数不存在哇");
  var queue = [];
  var tck = events[id].bind(null, context);

  var watcher = function watcher(exp, cbk, ops) {
    return _watcher.call(_this2, el, exp, cbk, context, modifiers, ops);
  };

  var exactMatch = function exactMatch() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _exactMatch.call(null, modifiers, args);
  };

  var partialMatch = function partialMatch() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _partialMatch.call(null, modifiers, args);
  };

  if (!Object.keys(modifiers).length) {
    events[id](context, value);
  } // 异步埋点
  else if (exactMatch("watch")) {
      var exp = Object.keys(value).shift();
      watcher(exp, tck, {
        name: context.$route.name,
        immediate: true
      });
    } // 指定延长时间埋点
    else if (exactMatch("delay")) {
        el.$timer && clearTimeout(el.$timer);
        el.$timer = setTimeout(function () {
          events[id](context);
        }, value);
      } else if (exactMatch("watch", "delay")) {
        var _exp = _toConsumableArray(Object.keys(value)).pop();

        tck = function tck() {
          el.$timer && clearTimeout(el.$timer);
          el.$timer = setTimeout(function () {
            var visible = isVisible(context.$el);
            visible && events[id](context);
          }, value.delay);
        };

        watcher(_exp, tck, {
          name: context.$route.name,
          immediate: true
        });
      } // 区域曝光埋点
      else if (partialMatch("show")) {
          var fn = function fn() {
            return events[id](context);
          };

          var once = partialMatch("once");
          var custom = partialMatch("custom");

          if (!el.$visMonitor) {
            var vm = new VisMonitor(el, custom && context.$refs[value.ref]);
            (once ? vm.$once : vm.$on).call(vm, "fullyvisible", fn);
            el.$visMonitor = vm;
          }
        } else if (!componentInstance && modifiers.click) {
          /**
           * @description DOM元素事件行为埋点(需区分是否带参数)
           * @var {Function} fn 获取第一个参数作为回调函数
           * @var {String} exp 获取最后一个参数并作为监听对象
           */
          switch (_typeof(value)) {
            case "object":
              {
                var _zipArray = zipArray(value),
                    _zipArray2 = _slicedToArray(_zipArray, 2),
                    args = _zipArray2[0],
                    keys = _zipArray2[1];

                var _fn = args.shift();

                var _exp2 = _toConsumableArray(keys).pop();

                var tck_args = keys.slice(1).reduce(function (state, k) {
                  return state[k] = value[k], state;
                }, {});

                if (!isProd && !isFun(_fn)) {
                  throw new Error("第一个参数应该为 Function~");
                }

                tck = events[id].bind(null, context, tck_args);
                queue = [tck, _fn.bind.apply(_fn, [null].concat(_toConsumableArray(args)))];
                modifiers.delay && queue.reverse();
                modifiers.async && watcher(_exp2, queue.shift());
                break;
              }

            case "function":
              queue = [tck, value];
              modifiers.delay && queue.reverse();
              break;
          }

          el.$listener = function (e) {
            _this2.target = e.target;
            queue.forEach(function (sub) {
              return sub(e);
            });
          };

          el.addEventListener("click", el.$listener);
        } else if (
        /**
         * @description 组件自定义事件行为埋点(需区分是否带参数)
         * @var {Function} fn 获取第一个参数作为回调函数
         * @var {String} exp 获取最后一个参数并作为监听对象
         */
        componentInstance && componentInstance.$el === el) {
          var eventName = Object.keys(modifiers).filter(function (key) {
            return !MODIFIERS.includes(key);
          }).pop();

          switch (_typeof(value)) {
            case "object":
              {
                var _zipArray3 = zipArray(value),
                    _zipArray4 = _slicedToArray(_zipArray3, 2),
                    _args = _zipArray4[0],
                    _keys = _zipArray4[1];

                var _fn2 = _args.shift();

                var _exp3 = _toConsumableArray(_keys).pop();

                if (!isProd && !isFun(_fn2)) {
                  throw new Error("第一个参数应该为 Function~");
                }

                if (el["$on_".concat(eventName)]) break;
                componentInstance.$on(eventName, function () {
                  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args[_key3] = arguments[_key3];
                  }

                  _this2.target = (args[0].e || args[0].event).target;
                  tck = events[id].bind(null, context, args[0]);
                  queue = [tck, _fn2.bind.apply(_fn2, [null].concat(args))];
                  modifiers.delay && queue.reverse();
                  modifiers.async && watcher(_exp3, queue.shift());
                  queue.forEach(function (sub) {
                    return sub();
                  });
                  el["$on_".concat(eventName)] = true; // 避免重复监听
                });
                break;
              }

            case "function":
              componentInstance.$on(eventName, function (data) {
                var args = Object.values(data);
                tck = events[id].bind(null, context, data);
                queue = [tck, value.bind.apply(value, [null].concat(_toConsumableArray(args)))];
                modifiers.delay && queue.reverse();
                queue.forEach(function (sub) {
                  return sub();
                });
              });
              break;
          }
        } else {
          if (!isProd) {
            throw new Error("".concat(rawName, "\u6307\u4EE4\u6682\u4E0D\u652F\u6301"));
          }
        }
}
/**
 * @description 由于 DOM 更新采用 diff 算法更新，如果新旧节点相同，则 el 会全等，导致 bind 绑定无法更
 * 新，出现事件绑定诡异的问题，但由于 DOM update 执行频率很高，会导致性能问题，所以这里加
 * 了一层exactlySameVnode过滤，即只有在新旧节点发生变化时才会重新绑定，否则相反
 *
 * @param {*} el 同bind
 * @param  {...any} args 同bind
 */

function updated(el) {
  if (!el.$listener) return;

  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  if (!exactlySameVnode(args[1], args[2])) {
    unbind.call(this, el);
    bind.call.apply(bind, [this, el].concat(args));
  }
}
function unbind(el) {
  el.$listener && el.removeEventListener("click", el.$listener);
  el.$timer && clearTimeout(el.$timer);
  el.$unwatch && el.$unwatch();
  el.$visMonitor && el.$visMonitor.destroy();
}

var VTrack =
/*#__PURE__*/
function () {
  function VTrack() {
    _classCallCheck(this, VTrack);

    this.installed = false;
    this.curPage = null; // 保存当前页name
  } // 保存当前点击的元素


  _createClass(VTrack, null, [{
    key: "install",
    // Vue.use 将执行此方法
    value: function install(Vue, _ref) {
      var _this = this;

      var trackEvents = _ref.trackEvents,
          trackAction = _ref.trackAction;
      var self = this;
      if (this.installed) return;
      this.installed = true; // 注册v-track全局指令

      Vue.directive("track", {
        bind: function bind$1() {
          var _hooks$bind;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return (_hooks$bind = bind).call.apply(_hooks$bind, [_this].concat(args, [trackEvents]));
        },
        componentUpdated: function componentUpdated() {
          var _hooks$updated;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return (_hooks$updated = updated).call.apply(_hooks$updated, [_this].concat(args, [trackEvents]));
        },
        unbind: function unbind$1() {
          var _hooks$unbind;

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return (_hooks$unbind = unbind).call.apply(_hooks$unbind, [_this].concat(args));
        }
      }); // 注册<track-view>全局组件

      Vue.component("TrackView", {
        render: function render(h) {
          return h("span", {
            style: "display: none"
          });
        }
      });
      Vue.mixin({
        data: function data() {
          return {
            enterTime: Date.now()
          };
        },
        // 统计UV、PV
        beforeRouteEnter: function beforeRouteEnter(to, from, next) {
          // 防止有些情况该守卫执行多次导致重复埋点的问题
          if (!from.matched.length || to.name === self.curPage) {
            next();
          } else {
            self.curPage = to.name;
            trackEvents.UVPV();
            next();
          }
        },
        // 页面停留时间
        beforeRouteLeave: function beforeRouteLeave(_, __, next) {
          var stt = "".concat((Date.now() - this.enterTime) / 1e3, "s");
          trackEvents.TONP({
            stt: stt
          });
          next();
        }
      }); // 挂载埋点公用方法，组件内通过this.$track调用（特殊情况下调用）

      Object.defineProperty(Vue.prototype, "$track", {
        get: function get() {
          return trackAction;
        }
      });
    }
  }]);

  return VTrack;
}();

_defineProperty(VTrack, "target", null);

export default VTrack;

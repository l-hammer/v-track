// 是否为一个 DOM 元素
const isElement = ele => ele && ele.nodeType === 1;
const isFun = v => typeof v === "function" || false;

/**
 * @desc 元素是否在可视区域可见
 *
 * @param {Object} rect 元素大小及相对可视区域的位置信息
 * @returns {Boolean} true => 可见 false => 不可见
 */
function isInViewport(rect, viewport) {
  if (!rect || (rect.width <= 0 || rect.height <= 0)) {
    return false;
  }
  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < viewport.height &&
    rect.left < viewport.width
  );
}

/**
 * @desc 获取 DOM CSS 属性的值
 *
 * @param {DOMElement} ele A DOM 元素
 * @returns {*}
 */
function getStylePropValue(ele, prop) {
  return window.getComputedStyle(ele).getPropertyValue(prop);
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

  const parent = ele.parentNode;
  const visibility = getStylePropValue(ele, "visibility");
  const display = getStylePropValue(ele, "display");

  if (visibility === "hidden" || display === "none") {
    return false;
  }
  return parent ? isVisible(parent) : true;
}

/**
 * @desc 防抖函数，至少间隔200毫秒执行一次
 *
 * @param {*} fn
 * @param {number} [ms=200]
 * @returns
 */
function debounce(fn, ms = 200) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

/**
 * @desc 获取目标元素可见区域百分比
 *
 * @param {DOMElement} ele A DOM 元素
 * @returns {Bumber} 0.8
 */
export default class VisMonitor {
  constructor(ele, ref) {
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

  init() {
    if (!this.started) {
      this.removeScrollLisener = (listener => {
        if (this.ref) {
          return this.ref.$on("scroll", listener);
        } else {
          window.addEventListener("scroll", listener, false);
          return () => window.removeEventListener("scroll", listener, false);
        }
      })(debounce(this.visibilitychange.bind(this)));
      this.started = true;
    }
  }

  /**
   * 监听自定义事件
   */
  $on(evt, cbk) {
    const queue = this.listeners[evt] || (this.listeners[evt] = []);

    queue.push(cbk);
    return this;
  }

  /**
   * 移除监听自定义事件
   */
  $off(evt, cbk) {
    if (!cbk) return;

    let queue = this.listeners[evt];
    let v;
    let i = queue.length;

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
  $once(evt, cbk) {
    const on = (...args) => {
      this.$off(evt, on);
      cbk.apply(this, args);
    };

    on.cbk = cbk;
    this.$on(evt, on);
    return this;
  }

  /**
   * 触发当前实例的监听回调
   */
  $emit(evt, ...args) {
    const queue = this.listeners[evt] || [];

    queue.forEach(sub => sub.apply(this, args));
    return this;
  }

  visibilitychange() {
    const rect = this.ele.getBoundingClientRect();
    const view = {
      height: window.innerHeight,
      width: window.innerWidth
    };

    if (!isInViewport(rect, view) || !isVisible(this.ele)) {
      return 0;
    }

    let vh = 0;
    let vw = 0;
    let perc = 0;

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
    perc = (vh * vw) / (rect.height * rect.width);
    if (perc === 1) this.$emit("fullyvisible");
  }

  destroy() {
    isFun(this.removeScrollLisener) && this.removeScrollLisener();
  }
}

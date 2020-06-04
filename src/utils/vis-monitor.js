/*
 * @Author: 宋慧武
 * @Date: 2019-04-08 11:13:34
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2020-06-04 20:15:46
 */
import { isElement, isVisible, isInViewport } from "./dom";
import { isFun, debounce } from "./helper";

/**
 * @class
 * @name VisMonitor
 *
 * @desc 目标元素控制器
 */
export default class VisMonitor {
  constructor(ele, ref, refwin = window) {
    if (!isElement(ele)) {
      throw new Error("not an element node");
    }
    this.ele = ele;
    this.ref = ref;
    this.refWin = refwin;
    this.started = false;
    this.prevPerc = null; // 保存前一次曝光百分比
    this.listeners = {};
    this.removeScrollLisener = null;
    this.init();
  }

  init() {
    if (!this.started) {
      const listener = debounce(this.visibilitychange.bind(this));

      listener();
      this.removeScrollLisener = (listener => {
        if (this.ref) {
          return this.ref.$on("scroll", listener);
        } else {
          this.refWin.addEventListener("scroll", listener, true);
          return () =>
            this.refWin.removeEventListener("scroll", listener, true);
        }
      })(listener);
      this.started = true;
    }
  }

  viewport() {
    const win = this.refWin;
    const rect = isElement(win) ? win.getBoundingClientRect() : win;

    return {
      top: isElement(win) ? rect.top : 0,
      right: rect.right || rect.innerWidth,
      bottom: rect.bottom || rect.innerHeight,
      left: rect.left || 0,
      height: win.innerHeight || win.offsetHeight,
      width: win.innerWidth || win.offsetWidth
    };
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

  /**
   * 计算元素可见比例，如果比例为100%，则触发 fullyvisible 事件
   */
  visibilitychange() {
    const rect = this.ele.getBoundingClientRect();
    const view = this.viewport();

    if (!isInViewport(rect, view) || !isVisible(this.ele)) {
      this.prevPerc = 0;
      return 0;
    }

    let vh = 0;
    let vw = 0;
    let perc = 0;

    if (rect.top >= view.top && rect.bottom > view.bottom) {
      vh = view.bottom - rect.top;
    } else if (rect.top < view.top && rect.bottom <= view.bottom) {
      vh = rect.bottom - view.top;
    } else {
      vh = rect.height;
    }

    if (rect.left >= view.left && rect.right > view.right) {
      vw = view.right - rect.left;
    } else if (rect.left < view.left && rect.right <= view.right) {
      vw = rect.right - view.left;
    } else {
      vw = rect.width;
    }

    perc = (vh * vw) / (rect.height * rect.width);

    if (this.prevPerc !== 1 && perc === 1) {
      this.$emit("fullyvisible");
      this.prevPerc = perc;
    }
  }

  /**
   * 销毁当前实例的事件
   */
  destroy() {
    isFun(this.removeScrollLisener) && this.removeScrollLisener();
  }
}

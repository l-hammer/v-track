/*
 * @Author: 宋慧武
 * @Date: 2019-03-06 17:49:29
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-13 22:54:49
 */
import {
  isProd,
  isFun,
  zipArray,
  exactlySameVnode,
  _exactMatch,
  _partialMatch
} from "../utils/helper";
import { isVisible } from "../utils/dom";
import VisMonitor from "../utils/vis-monitor";

const MODIFIERS = ["async", "delay", "watch", "show", "once", "custom"]; // 修饰符

/*******************************************************************************
 * @description 监听数据发生改变时触发埋点，需处理两种情况：
 * ① 初始化时开始监听 v-track:xxxxx.watch="{ common_exp }"
 * ops.immediate 表示初始化时立即开始监听
 * ops.page === $route.name 避免多个页面同时监听同一个值(store中的common值)重复埋点的问题
 *
 * ② 点击事件之后开始监听 v-track:18016.click.async="{ refreshHotSpot, exposureId }"
 * el.contains(this.target) 避免多个“地方”同时监听同一个值出现多次上报的问题
 *******************************************************************************/
function _watcher(el, exp, cbk, ctt, mdf, ops = {}) {
  el.$unwatch = ctt.$watch(
    () => ctt[exp],
    (nv, ov) => {
      const { $route } = ctt;

      if (!isProd && ops.immediate && !$route && !$route.name && mdf.watch) {
        throw new Error("$route 不存在");
      }
      nv !== ov &&
        ((ops.immediate && ops.name === $route.name) ||
          el.contains(this.target)) &&
        cbk();
      this.target = null; // 释放当前操作的watcher
    }
  );
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
export function bind(
  el,
  { value, arg: id, modifiers, rawName },
  { context, componentInstance },
  _,
  __,
  events
) {
  if (!events[id]) throw new Error("埋点参数不存在哇");

  let queue = [];
  let tck = events[id].bind(null, context);
  const watcher = (exp, cbk, ops) =>
    _watcher.call(this, el, exp, cbk, context, modifiers, ops);
  const exactMatch = (...args) => _exactMatch.call(null, modifiers, args);
  const partialMatch = (...args) => _partialMatch.call(null, modifiers, args);

  if (!Object.keys(modifiers).length) {
    events[id](context, value);
  }
  // 异步埋点
  else if (exactMatch("watch")) {
    const exp = Object.keys(value).shift();

    watcher(exp, tck, {
      name: context.$route.name,
      immediate: true
    });
  }
  // 指定延长时间埋点
  else if (exactMatch("delay")) {
    el.$timer && clearTimeout(el.$timer);
    el.$timer = setTimeout(() => {
      events[id](context);
    }, value);
  } else if (exactMatch("watch", "delay")) {
    const exp = [...Object.keys(value)].pop();

    tck = () => {
      el.$timer && clearTimeout(el.$timer);
      el.$timer = setTimeout(() => {
        const visible = isVisible(context.$el);

        visible && events[id](context);
      }, value.delay);
    };
    watcher(exp, tck, {
      name: context.$route.name,
      immediate: true
    });
  }
  // 区域曝光埋点
  else if (partialMatch("show")) {
    const fn = () => events[id](context);
    const once = partialMatch("once");
    const custom = partialMatch("custom");

    if (!el.$visMonitor) {
      const vm = new VisMonitor(el, custom && context.$refs[value.ref]);

      (once ? vm.$once : vm.$on).call(vm, "fullyvisible", fn);
      el.$visMonitor = vm;
    }
  } else if (!componentInstance && modifiers.click) {
    /**
     * @description DOM元素事件行为埋点(需区分是否带参数)
     * @var {Function} fn 获取第一个参数作为回调函数
     * @var {String} exp 获取最后一个参数并作为监听对象
     */
    switch (typeof value) {
      case "object": {
        const [args, keys] = zipArray(value);
        const fn = args.shift();
        const exp = [...keys].pop();
        const tck_args = keys
          .slice(1)
          .reduce((state, k) => ((state[k] = value[k]), state), {});

        if (!isProd && !isFun(fn)) {
          throw new Error("第一个参数应该为 Function~");
        }
        tck = events[id].bind(null, context, tck_args);
        queue = [tck, fn.bind(null, ...args)];
        modifiers.delay && queue.reverse();
        modifiers.async && watcher(exp, queue.shift());
        break;
      }
      case "function":
        queue = [tck, value];
        modifiers.delay && queue.reverse();
        break;
    }
    el.$listener = e => {
      this.target = e.target;
      queue.forEach(sub => sub(e));
    };
    el.addEventListener("click", el.$listener);
  } else if (
    /**
     * @description 组件自定义事件行为埋点(需区分是否带参数)
     * @var {Function} fn 获取第一个参数作为回调函数
     * @var {String} exp 获取最后一个参数并作为监听对象
     */
    componentInstance &&
    componentInstance.$el === el
  ) {
    const eventName = Object.keys(modifiers)
      .filter(key => !MODIFIERS.includes(key))
      .pop();

    switch (typeof value) {
      case "object": {
        const [args, keys] = zipArray(value);
        const fn = args.shift();
        const exp = [...keys].pop();

        if (!isProd && !isFun(fn)) {
          throw new Error("第一个参数应该为 Function~");
        }
        if (el[`$on_${eventName}`]) break;
        componentInstance.$on(eventName, (...args) => {
          this.target = el;
          tck = events[id].bind(null, context, args[0]);
          queue = [tck, fn.bind(null, ...args)];
          modifiers.delay && queue.reverse();
          modifiers.async && watcher(exp, queue.shift());
          queue.forEach(sub => sub());
          el[`$on_${eventName}`] = true; // 避免重复监听
        });
        break;
      }
      case "function":
        componentInstance.$on(eventName, data => {
          const args = Object.values(data || {});

          tck = events[id].bind(null, context, data);
          queue = [tck, value.bind(null, ...args)];
          modifiers.delay && queue.reverse();
          queue.forEach(sub => sub());
        });
        break;
    }
  } else {
    if (!isProd) {
      throw new Error(`${rawName}指令暂不支持`);
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
export function updated(el, ...args) {
  if (!el.$listener) return;
  if (!exactlySameVnode(args[1], args[2])) {
    unbind.call(this, el);
    bind.call(this, el, ...args);
  }
}

export function unbind(el) {
  el.$listener && el.removeEventListener("click", el.$listener);
  el.$timer && clearTimeout(el.$timer);
  el.$unwatch && el.$unwatch();
  el.$visMonitor && el.$visMonitor.destroy();
}

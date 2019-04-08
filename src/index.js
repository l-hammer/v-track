/*
 * @Author: 宋慧武
 * @Date: 2019-03-06 17:49:29
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-08 12:16:35
 */
import * as hooks from "./hooks";

export default class VTrack {
  constructor() {
    this.installed = false;
    this.curPage = null; // 保存当前页name
  }
  // 保存当前点击的元素
  static target = null;
  // Vue.use 将执行此方法
  static install(Vue, { trackEvents, trackAction }) {
    const self = this;

    if (this.installed) return;
    this.installed = true;

    // 注册v-track全局指令
    Vue.directive("track", {
      bind: (...args) => hooks.bind.call(this, ...args, trackEvents),
      componentUpdated: (...args) =>
        hooks.updated.call(this, ...args, trackEvents),
      unbind: (...args) => hooks.unbind.call(this, ...args)
    });

    // 注册<track-view>全局组件
    Vue.component("TrackView", {
      render: h =>
        h("span", {
          style: "display: none"
        })
    });

    Vue.mixin({
      data: () => ({
        enterTime: Date.now()
      }),
      // 统计UV、PV
      beforeRouteEnter(to, from, next) {
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
      beforeRouteLeave(_, __, next) {
        const stt = `${(Date.now() - this.enterTime) / 1e3}s`;

        trackEvents.TONP({ stt });
        next();
      }
    });

    // 挂载埋点公用方法，组件内通过this.$track调用（特殊情况下调用）
    Object.defineProperty(Vue.prototype, "$track", {
      get: () => trackAction
    });
  }
}

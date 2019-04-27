/*
 * @Author: 宋慧武
 * @Date: 2019-03-06 17:49:29
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-27 23:32:41
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
  static install(Vue, { trackEvents, trackEnable = {} }) {
    const self = this;
    trackEnable = {
      UVPV: false,
      TONP: false,
      ...trackEnable
    };
    const TRACK_TONP = et => {
      if (trackEnable.TONP) {
        trackEvents.TONP({
          et,
          dt: Date.now()
        });
      }
    };

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
        PAGE_ENTER_TIME: Date.now()
      }),
      created() {
        window.onbeforeunload = () => TRACK_TONP(this.PAGE_ENTER_TIME);
      },
      // 统计UV、PV
      beforeRouteEnter(to, _, next) {
        // 防止有些情况该守卫执行多次导致重复埋点的问题
        if (to.name === self.curPage) {
          next();
        } else {
          self.curPage = to.name;
          trackEnable.UVPV && trackEvents.UVPV();
          next();
        }
      },
      // 页面停留时间
      beforeRouteLeave(_, __, next) {
        TRACK_TONP(this.PAGE_ENTER_TIME);
        next();
      }
    });
  }
}

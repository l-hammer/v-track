/*
 * @Author: 宋慧武
 * @Date: 2019-04-14 17:10:31
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2020-06-05 20:42:48
 */
import trackAction from "./action";

export default {
  /**
   * @name UVPV 固定名称不支持修改
   * @desc UV、PV埋点
   * @param {Object} context 当前上下文
   */
  UVPV() {
    trackAction("1");
  },
  /**
   * @name TONP 固定名称不支持修改
   * @desc 页面停留时间埋点（Time on Page）
   * @param {Object} context 当前上下文
   * @param {Timestamp} et 进入页面时间
   * @param {Timestamp} dt 离开页面时间
   */
  TONP(_, { et, dt }) {
    trackAction("2", {
      stt: `${(dt - et) / 1e3}s`
    });
  },
  /**
   * @desc 测试埋点
   */
  18015({ $route: { name } }) {
    trackAction("18015", {
      source_page: name // 页面来源
    });
  },
  /**
   * @param {Object} context 当前上下文
   * @param {Object} item 事件参数
   * @param {Object} event 事件对象
   */
  18016(
    {
      $route: { name }
    },
    { id },
    { target }
  ) {
    trackAction("18016", {
      id,
      source_page: name,
      target
    });
  },
  18017({ index, $route: { name } }) {
    trackAction("18017", {
      source_page: name,
      index
    });
  },
  18018({ rest, $route: { name } }) {
    trackAction("18018", {
      source_page: name,
      rest
    });
  },
  18019(
    {
      $route: { name }
    },
    { id },
    { target }
  ) {
    trackAction("18019", {
      id,
      source_page: name,
      target
    });
  },
  18020({ activeName, $route: { name } }) {
    trackAction("18020", {
      source_page: name,
      active_name: activeName
    });
  },
  18021({ rest, $route: { name } }) {
    trackAction("18021", {
      source_page: name,
      rest
    });
  },
  18022({ $route: { name } }) {
    trackAction("18022", {
      source_page: name,
      description: "这是一个页面初始化埋点"
    });
  },
  18023({ $route: { name } }) {
    trackAction("18023", {
      source_page: name
    });
  },
  18025({ rest1, $route: { name } }) {
    trackAction("18025", {
      source_page: name,
      rest: rest1
    });
  },
  18026({ rest2, $route: { name } }) {
    trackAction("18026", {
      source_page: name,
      rest: rest2
    });
  },
  18027({ $route: { name } }) {
    trackAction("18027", {
      source_page: name,
      description: "我想被曝光无数次"
    });
  },
  18028({ $route: { name } }) {
    trackAction("18028", {
      source_page: name,
      description: "我只想被曝光一次"
    });
  },
  18029({ $route: { name } }) {
    trackAction("18029", {
      source_page: name,
      description: "我也想被曝光无数次"
    });
  },
  18030({ $route: { name } }) {
    trackAction("18030", {
      source_page: name,
      description: "我也想被曝光无数次"
    });
  }
};

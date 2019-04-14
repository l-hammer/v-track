/*
 * @Author: 宋慧武
 * @Date: 2019-04-14 17:10:31
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-15 01:33:00
 */
import trackAction from "./action";

export default {
  /**
   * @name UVPV 固定名称不支持修改
   * @desc UV、PV埋点
   */
  UVPV() {
    trackAction("1,3");
  },
  /**
   * @name TONP 固定名称不支持修改
   * @desc 页面停留时间埋点（Time on Page）
   * @param {String} stt 进入页面时长，单位为秒
   */
  TONP({ stt }) {
    trackAction("2", { stt });
  },
  /**
   * @desc 测试埋点
   * @param {*} { $route: { name } }
   * @param {*} { item: { id, level4Tag }, index }
   */
  18015({ $route: { name } }) {
    trackAction("18015", {
      source_page: name // 页面来源
    });
  },
  18016(
    {
      $route: { name }
    },
    {
      item: { id }
    },
    { target }
  ) {
    trackAction("18016", {
      id, // 知识ID
      source_page: name, // 页面来源
      target
    });
  },
  18017({ index, $route: { name } }) {
    trackAction("18017", {
      source_page: name, // 页面来源
      index
    });
  },
  18018({ rest, $route: { name } }) {
    trackAction("18018", {
      source_page: name, // 页面来源
      rest
    });
  }
};

/*
 * @Author: 宋慧武
 * @Date: 2019-04-14 17:10:31
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-17 22:26:42
 */
import trackAction from "./action";

export default {
  /**
   * @name UVPV 固定名称不支持修改
   * @desc UV、PV埋点
   */
  UVPV() {
    trackAction("1");
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
      id, // 知识ID
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
  }
};

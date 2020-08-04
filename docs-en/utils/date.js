/**
 * @author LHammer
 * @desc date parse or format date
 * @see https://github.com/l-hammer/YDTemplate/blob/master/src/utils/es6/date.js
 */
const twoDigits = /\d\d?/;
const fourDigits = /\d{4}/;
const token = /d{1,2}|M{1,2}|yy(?:yy)?|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
const masks = {
  default: "yyyy-MM-dd HH:mm:ss",
  date: "yyyy-MM-dd",
  datetime: "yyyy-MM-dd HH:mm:ss",
  time: "HH:mm:ss",
  year: "yyyy",
  enDate: "M/d/yy",
  cnDate: "yyyy 年 MM 月 dd 日"
};

const pad = (val, len) => {
  val = String(val);
  len = len || 2;
  while (val.length < len) {
    val = `0${val}`;
  }
  return val;
};

const formatFlags = {
  yyyy(dateObj) {
    return pad(dateObj.getFullYear(), 4);
  },
  yy(dateObj) {
    return String(dateObj.getFullYear()).substr(2);
  },
  M(dateObj) {
    return dateObj.getMonth() + 1;
  },
  MM(dateObj) {
    return pad(dateObj.getMonth() + 1);
  },
  d(dateObj) {
    return dateObj.getDate();
  },
  dd(dateObj) {
    return pad(dateObj.getDate());
  },
  h(dateObj) {
    return dateObj.getHours() % 12 || 12;
  },
  hh(dateObj) {
    return pad(dateObj.getHours() % 12 || 12);
  },
  H(dateObj) {
    return dateObj.getHours();
  },
  HH(dateObj) {
    return pad(dateObj.getHours());
  },
  m(dateObj) {
    return dateObj.getMinutes();
  },
  mm(dateObj) {
    return pad(dateObj.getMinutes());
  },
  s(dateObj) {
    return dateObj.getSeconds();
  },
  ss(dateObj) {
    return pad(dateObj.getSeconds());
  }
};

/**
 * Format a date
 * @method format
 * @param {Date|number} dateObj new Date(2018, 2, 9)
 * @param {String} mask Format of the date e.g. 'yyyy-MM-dd HH:mm:ss' or 'cnDate'
 */
export const format = (dateObj, mask) => {
  if (typeof dateObj === "number") {
    dateObj = new Date(dateObj);
  }

  if (
    Object.prototype.toString.call(dateObj) !== "[object Date]" ||
    isNaN(dateObj.getTime())
  ) {
    throw new Error("Invalid Date in date.format");
  }
  mask = masks[mask] || mask || masks.default;

  // return 不可省略
  mask = mask.replace(token, $0 => {
    return $0 in formatFlags
      ? formatFlags[$0](dateObj)
      : $0.slice(1, $0.length - 1);
  });

  return mask;
};

const parseFlags = {
  yyyy: [
    fourDigits,
    (d, v) => {
      d.year = v;
    }
  ],
  yy: [
    twoDigits,
    (d, v) => {
      const da = new Date();
      const cent = +`${da.getFullYear()}`.substr(0, 2);
      d.year = `${v > 68 ? cent - 1 : cent}${v}`;
    }
  ],
  M: [
    twoDigits,
    (d, v) => {
      d.month = v - 1;
    }
  ],
  d: [
    twoDigits,
    (d, v) => {
      d.day = v;
    }
  ],
  h: [
    twoDigits,
    (d, v) => {
      d.hour = v;
    }
  ],
  m: [
    twoDigits,
    (d, v) => {
      d.minute = v;
    }
  ],
  s: [
    twoDigits,
    (d, v) => {
      d.second = v;
    }
  ]
};
parseFlags.MM = parseFlags.M;
parseFlags.dd = parseFlags.d;
parseFlags.hh = parseFlags.h;
parseFlags.H = parseFlags.h;
parseFlags.HH = parseFlags.h;
parseFlags.mm = parseFlags.m;
parseFlags.ss = parseFlags.s;

/**
 * Format a date
 * @method parse
 * @param {String} dateStr Date String e.g. '2018-02-09 09:29:29' or '2018 年 02 月 09 日'
 * @param {String} mask Parse of the format date e.g. 'yyyy-MM-dd HH:mm:ss' or 'cnDate'
 * @param {Date}
 */
export const parse = (dateStr, mask) => {
  let isVaild = true;
  const dateInfo = {};
  const today = new Date();

  if (typeof dateStr !== "string") {
    throw new Error("Invalid format in fecha.parse");
  }

  mask = masks[mask] || mask || masks.default;
  /**
   * @function replace @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace;
   * @param {String} $0 匹配的子串
   */
  mask.replace(token, function($0) {
    if (parseFlags[$0]) {
      const flag = parseFlags[$0];
      /**
       * 搜索匹配到子串(e.g. yyyy)对应flag(fourDigits)的位置
       * @function search 未匹配到时返回-1，即按位取反为0时表示没有对应的flag
       */
      const index = dateStr.search(flag[0]);
      if (!~index) {
        isVaild = false;
      } else {
        /**
         * 为避免重复返回，将已经返回的值result从dateStr中删除
         */
        dateStr.replace(flag[0], function(result) {
          flag[1](dateInfo, result);
          dateStr = dateStr.substr(index + result.length);
          return result;
        });
      }
    }
    return parseFlags[$0] ? "" : $0.slice(1, $0.length - 1);
  });

  if (!isVaild) {
    return false;
  }

  const date = new Date(
    dateInfo.year || today.getFullYear(),
    dateInfo.month || 0,
    dateInfo.day || 1,
    dateInfo.hour || 0,
    dateInfo.minute || 0,
    dateInfo.second || 0
  );
  return date;
};

export default {
  format,
  parse
};

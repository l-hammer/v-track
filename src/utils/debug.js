/*
 * @Author: 宋慧武
 * @Date: 2019-04-14 15:55:15
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-17 12:28:30
 */
import { isProd, isFun } from "./helper";

export const checkFun = fn => {
  if (!isProd && !isFun(fn)) {
    throw new Error("第一个参数应该为 Function~");
  }
};

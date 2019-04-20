/*
 * @Author: 宋慧武
 * @Date: 2019-04-14 15:55:15
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-20 18:06:31
 */
import { isFun } from "./helper";

export const checkFun = fn => {
  if (!isFun(fn)) {
    throw new Error("The first parameter should be Function.");
  }
};

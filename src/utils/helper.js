/*
 * @Author: 宋慧武
 * @Date: 2019-04-08 11:13:34
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-08-05 15:31:00
 */

/**
 * @desc 判断给定变量是否为一个函数
 *
 * @param {*} v
 * @return {Boolean}
 */
export const isFun = v => typeof v === "function" || false;

/**
 * @desc 判断给定变量是否是未定义
 *
 * @param {*} v
 */
export const isUndef = v => v === undefined || v === null;

/**
 * @desc 判断给定变量是否是定义
 *
 * @param {*} v
 */
export const isDef = v => v !== undefined && v !== null;

/**
 * @desc 获取对象的键值
 *
 * @param {Object} value
 * @returns {Array} [keys, values]
 */
export function zipArray(value = {}) {
  return [Object.values(value), Object.keys(value)];
}

/**
 * @desc 防抖函数，至少间隔200毫秒执行一次
 *
 * @param {Function} fn callback
 * @param {Number} [ms=200] 默认200毫秒
 * @returns {Function}
 */
export function debounce(fn, ms = 200) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

/**
 * @desc 判断给定变量是否完全匹配目标数组
 *
 * @param {String[]} mdfs 目标数组
 * @param {String} vals
 * @returns {Boolean}
 */
export function _exactMatch(mdfs, vals) {
  const keys = Object.keys(mdfs);

  return keys.length === vals.length && vals.every(v => keys.includes(v));
}

/**
 * @desc 判断给定变量是否匹配目标数组的一部分
 *
 * @param {String[]} mdfs 目标字符串数组
 * @param {String} vals
 * @returns {Boolean}
 */
export function _partialMatch(mdfs, vals) {
  const keys = Object.keys(mdfs);

  return vals.some(v => keys.includes(v));
}

/**
 * @desc 判断两个节点是否为同一个vnode节点
 *
 * @param {VNode} a 虚拟节点
 * @param {VNode} b 虚拟节点
 */
export function sameVnode(a, b) {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    isDef(a.data) === isDef(b.data)
  );
}

/**
 * @desc 判断两个vnode节点是否全等
 *
 * @param {VNode} a 虚拟节点
 * @param {VNode} b 虚拟节点
 */
export function exactlySameVnode(vnode, oldVnode) {
  if (!sameVnode(vnode, oldVnode)) return false;

  const oldCh = oldVnode.children;
  const ch = vnode.children;

  // vnode为非文本节点，且新旧节点的子节点都存在但不相同
  if (isUndef(vnode.text) && isDef(oldCh) && isDef(ch)) {
    if (oldCh.length !== ch.length) return false;
    for (let i = 0; i < ch.length; i++) {
      const c = ch[i];

      if (isDef(c) && isDef(oldCh[i])) {
        return exactlySameVnode(c, oldCh[i]);
      }
    }
  }
  // vnode为文本节点，新旧节点内容不相同
  else if (vnode.text !== oldVnode.text) return false;
  return true;
}

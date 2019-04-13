/*
 * @Author: 宋慧武
 * @Date: 2019-04-13 14:11:11
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-13 15:05:55
 */
export const mockParentNode = el => {
  // mock dom parentNode
  Object.defineProperty(el, "parentNode", {
    get: () => document
  });
};

export const mockRect = el => {
  // https://github.com/jsdom/jsdom/issues/653
  el.getBoundingClientRect = () => ({
    width: 100,
    height: 100,
    top: 50,
    left: 50,
    right: 50,
    bottom: 50
  });
};

export const mockScrollTo = () => {
  // eslint-disable-next-line no-undef
  Element.prototype.scrollTo = jest
    .fn()
    .mockImplementation((x = 50, y = 50) => {
      const w = window;
      w.scrollX = x;
      w.scrollY = y;
      w.pageXOffset = x;
      w.pageYOffset = y;
    });
};

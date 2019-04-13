/*
 * @Author: 宋慧武
 * @Date: 2019-04-12 21:03:46
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-13 15:01:48
 */
import Vue from "vue";
import VTrack from "@/";
import { mount, createLocalVue } from "@vue/test-utils";
import { mockParentNode, mockRect } from "../helper";

const localVue = createLocalVue();
const mockTrackAction = jest.fn();
const trackEvents = {
  18015: mockTrackAction
};
const TrackShowOnce = Vue.extend({
  template: `
    <div v-track:18015.show.once />
  `
});

localVue.use(VTrack, {
  trackEvents
});

jest.useFakeTimers();

describe("TrackShowOnce", () => {
  it("确保DOM元素完全可见之后触发埋点，且只触发一次", () => {
    const wrapper = mount(TrackShowOnce, { localVue });
    const vm = wrapper.vm;
    const scrollEvent = new UIEvent("scroll", { detail: 0 });

    mockParentNode(vm.$el);
    mockRect(vm.$el);
    window.dispatchEvent(scrollEvent);
    jest.runAllTimers();
    expect(mockTrackAction).toBeCalledTimes(1);

    [1, 2, 3].forEach(() => {
      window.dispatchEvent(scrollEvent);
    });
    jest.runAllTimers();
    expect(mockTrackAction).toBeCalledTimes(1);

    [1, 2, 3].forEach(async () => {
      await setTimeout(() => {
        window.dispatchEvent(scrollEvent);
      }, 300);
    });
    jest.runAllTimers();
    expect(mockTrackAction).toBeCalledTimes(1);
  });
});

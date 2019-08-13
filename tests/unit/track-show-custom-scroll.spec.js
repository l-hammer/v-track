/*
 * @Author: 宋慧武
 * @Date: 2019-04-12 21:03:46
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-08-13 14:00:05
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
const Cmp = Vue.extend({
  template: `<div></div>`
});
const TrackShowCustomScroll = Vue.extend({
  template: `
    <span>
      <cmp ref="scroll" v-track:18015.show.custom="{ref: 'scroll'}" />
    </span>
  `,
  components: {
    cmp: Cmp
  }
});

localVue.use(VTrack, {
  trackEvents
});

jest.useFakeTimers();

describe("TrackShowCustomScroll", () => {
  it("确保组件完全可见之后触发埋点，且至少间隔200ms执行一下", () => {
    const wrapper = mount(TrackShowCustomScroll, { localVue });
    const vm = wrapper.find(Cmp).vm;

    mockParentNode(vm.$el);
    mockRect(vm.$el);
    vm.$emit("scroll");
    jest.runAllTimers();
    expect(mockTrackAction).toBeCalledTimes(1);

    // [1, 2, 3].forEach(() => {
    //   vm.$emit("scroll");
    // });
    // jest.runAllTimers();
    // expect(mockTrackAction).toBeCalledTimes(2);

    // [1, 2, 3].forEach(async () => {
    //   await setTimeout(() => {
    //     vm.$emit("scroll");
    //   }, 300);
    // });
    // jest.runAllTimers();
    // expect(mockTrackAction).toBeCalledTimes(5);
  });
});

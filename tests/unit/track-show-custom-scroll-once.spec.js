/*
 * @Author: 宋慧武
 * @Date: 2019-04-12 21:03:46
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-13 22:58:00
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
const CmpTrackShowCustomOnce = Vue.extend({
  template: `
    <span>
      <cmp ref="scroll" v-track:18015.show.custom.once="{ref: 'scroll'}" />
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

describe("CmpTrackShowCustomOnce", () => {
  it("确保组件完全可见之后触发埋点，且只触发一次", () => {
    const wrapper = mount(CmpTrackShowCustomOnce, { localVue });
    const vm = wrapper.find(Cmp).vm;

    mockParentNode(vm.$el);
    mockRect(vm.$el);
    vm.$emit("scroll");
    jest.runAllTimers();
    expect(mockTrackAction).toBeCalledTimes(1);

    [1, 2, 3].forEach(() => {
      vm.$emit("scroll");
    });
    jest.runAllTimers();
    expect(mockTrackAction).toBeCalledTimes(1);

    [1, 2, 3].forEach(async () => {
      await setTimeout(() => {
        vm.$emit("scroll");
      }, 300);
    });
    jest.runAllTimers();
    expect(mockTrackAction).toBeCalledTimes(1);
  });
});

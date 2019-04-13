/*
 * @Author: 宋慧武
 * @Date: 2019-04-09 18:23:04
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-13 21:56:46
 */
import Vue from "vue";
import VTrack from "@/";
import { mount, createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
const mockTrackAction = jest.fn();
const trackEvents = {
  18015: mockTrackAction
};
const TrackClickHasParam = Vue.extend({
  template: `
    <div v-track:18015.click="{ handleClick, item }"></div>
  `,
  data() {
    return {
      item: {
        id: 1
      },
      id: 0
    };
  },
  methods: {
    handleClick({ id }) {
      this.id = id;
    }
  }
});

localVue.use(VTrack, {
  trackEvents
});

describe("TrackClickHasParam", () => {
  it("确保事件传参正确，并且点击事件次数等于埋点上报次数", () => {
    const wrapper = mount(TrackClickHasParam, {
      localVue
    });
    const vm = wrapper.vm;

    expect(vm.id).toBe(0);
    wrapper.setData({ item: { id: 1 } });
    wrapper.trigger("click");
    expect(vm.id).toBe(1);
    wrapper.setData({ item: { id: 2 } });
    wrapper.trigger("click");
    expect(vm.id).toBe(2);
    expect(mockTrackAction).toBeCalledTimes(2);
  });
});

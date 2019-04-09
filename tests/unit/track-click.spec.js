/*
 * @Author: 宋慧武
 * @Date: 2019-04-09 14:54:33
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-09 18:24:43
 */
import Vue from "vue";
import VTrack from "@/";
import { mount, createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
const mockTrackAction = jest.fn();
const trackEvents = {
  18015: mockTrackAction
};
const TrackClick = Vue.extend({
  template: `
    <div v-track:18015.click="handleClick"></div>
  `,
  data() {
    return {
      count: 0
    };
  },
  methods: {
    handleClick() {
      this.count += 1;
    }
  }
});

localVue.use(VTrack, {
  trackEvents
});

describe("TrackClick", () => {
  it("确保click事件、埋点事件正常触发，且只触发一次", () => {
    const wrapper = mount(TrackClick, {
      localVue
    });

    expect(wrapper.vm.count).toBe(0);
    wrapper.trigger("click");
    expect(wrapper.vm.count).toBe(1);
    expect(mockTrackAction).toBeCalledTimes(1);
  });
});

/*
 * @Author: 宋慧武
 * @Date: 2019-04-13 21:03:55
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-13 22:17:26
 */
import Vue from "vue";
import VTrack from "@/";
import { mount, createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
const mockTrackAction = jest.fn();
const trackEvents = {
  18015: mockTrackAction
};
const Child = Vue.extend({
  template: `
    <div @click="$emit('click')" />
  `
});
const TrackCustomEvent = Vue.extend({
  template: `
    <child v-track:18015.click="handleClick" />
  `,
  components: {
    child: Child
  },
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

describe("TrackCustomEvent", () => {
  it("确保自定义事件、埋点事件正常触发，且只触发一次", () => {
    const wrapper = mount(TrackCustomEvent, {
      localVue
    });

    expect(wrapper.vm.count).toBe(0);
    wrapper.find(Child).trigger("click");
    expect(wrapper.vm.count).toBe(1);
    expect(mockTrackAction).toBeCalledTimes(1);
  });
});

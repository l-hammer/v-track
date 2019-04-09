/*
 * @Author: 宋慧武
 * @Date: 2019-04-09 19:08:17
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-09 21:40:16
 */
import Vue from "vue";
import VTrack from "@/";
import { mount, createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
const mockTrackAction = jest.fn();
const trackEvents = {
  18015: mockTrackAction
};
const TrackClickAsync = Vue.extend({
  template: `
    <div v-track:18015.click.async="{ fetchRest, rest }"></div>
  `,
  data() {
    return {
      rest: null
    };
  },
  methods: {
    async fetchRest() {
      const response = await Promise.resolve({ data: "success" });
      this.rest = response.data;
    }
  }
});

localVue.use(VTrack, {
  trackEvents
});

describe("TrackClickAsync", () => {
  it("确保异步事件返回成功之后再触发埋点", done => {
    const wrapper = mount(TrackClickAsync, {
      localVue
    });

    wrapper.trigger("click");
    expect(wrapper.vm.rest).toBeNull();
    expect(mockTrackAction).toBeCalledTimes(0);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.rest).toBe("success");
      expect(mockTrackAction).toBeCalledTimes(1);
      done();
    });
  });
});

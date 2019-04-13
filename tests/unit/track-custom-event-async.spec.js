/*
 * @Author: 宋慧武
 * @Date: 2019-04-13 22:00:04
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-13 22:54:09
 */
import Vue from "vue";
import VTrack from "@/";
import { mount, createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
const mockTrackAction = jest.fn(({ status }) => status);
const trackEvents = {
  18015: mockTrackAction
};
const Child = Vue.extend({
  template: `
    <div @click="$emit('search')" />
  `
});
const TrackCustomEventAsync = Vue.extend({
  template: `
    <child v-track:18015.search.async="{ fetchRest, rest }" />
  `,
  components: {
    child: Child
  },
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

describe("TrackCustomEventAsync", () => {
  it("确保异步的自定义事件返回成功之后再上报埋点", done => {
    const wrapper = mount(TrackCustomEventAsync, {
      localVue
    });
    const vm = wrapper.vm;

    wrapper.find(Child).trigger("click");
    expect(vm.rest).toBeNull();
    expect(mockTrackAction).toBeCalledTimes(0);
    vm.$nextTick(() => {
      expect(vm.rest).toBe("success");
      expect(mockTrackAction).toBeCalledTimes(1);
      done();
    });
  });
});

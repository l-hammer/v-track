/*
 * @Author: 宋慧武
 * @Date: 2019-04-10 21:28:53
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-10 23:18:37
 */
import Vue from "vue";
import VTrack from "@/";
import { mount, createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
const mockTrackAction = jest.fn();
const trackEvents = {
  18015: mockTrackAction
};
const TrackClickVIf = Vue.extend({
  template: `
    <track-view v-if="rest" v-track:18015 />
  `,
  data() {
    return {
      rest: null
    };
  },
  created() {
    this.fetchRest();
  },
  methods: {
    async fetchRest() {
      const response = await Promise.resolve({ data: true });
      this.rest = response.data;
    }
  }
});

localVue.use(VTrack, {
  trackEvents
});

describe("TrackClickVIf", () => {
  it("确保埋点在v-if条件为真之后再上报", done => {
    const wrapper = mount(TrackClickVIf, {
      localVue
    });

    expect(wrapper.vm.rest).toBeNull();
    expect(mockTrackAction).toBeCalledTimes(0);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.rest).toBeTruthy();
      expect(mockTrackAction).toBeCalledTimes(1);
      done();
    });
  });
});

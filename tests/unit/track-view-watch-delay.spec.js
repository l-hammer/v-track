/*
 * @Author: 宋慧武
 * @Date: 2019-04-10 22:56:35
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-10 23:09:38
 */
import Vue from "vue";
import VTrack from "@/";
import { mount, createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
const mockTrackAction = jest.fn();
const trackEvents = {
  18015: mockTrackAction
};
const $route = {
  name: "HOME",
  path: "/home"
};
const TrackViewWatchDelay = Vue.extend({
  template: `
    <track-view v-track:18015.watch.delay="{ delay: 1000, rest }" />
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
      const response = await Promise.resolve({ data: "success" });
      this.rest = response.data;
    }
  }
});

localVue.use(VTrack, {
  trackEvents
});

describe("TrackViewWatchDelay", () => {
  it("确保埋点在Promise then之后并且延迟1000ms之后上报", done => {
    const wrapper = mount(TrackViewWatchDelay, {
      localVue,
      mocks: {
        $route
      }
    });

    expect(wrapper.vm.rest).toBeNull();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.rest).toBe("success");
      expect(mockTrackAction).toBeCalledTimes(0);
      setTimeout(() => {
        expect(mockTrackAction).toBeCalledTimes(1);
      }, 1000);
      done();
    });
  });
});

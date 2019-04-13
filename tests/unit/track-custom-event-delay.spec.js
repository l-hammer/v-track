/*
 * @Author: 宋慧武
 * @Date: 2019-04-13 22:00:04
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-13 22:30:58
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
    <div @click="$emit('expand', { status })" />
  `,
  data() {
    return {
      status: true
    };
  }
});
const TrackCustomEventDelay = Vue.extend({
  template: `
    <child v-track:18015.expand.delay="handleExpand" />
  `,
  components: {
    child: Child
  },
  data() {
    return {
      status: false
    };
  },
  methods: {
    handleExpand({ status }) {
      this.status = status;
    }
  }
});

localVue.use(VTrack, {
  trackEvents
});

describe("TrackCustomEventDelay", () => {
  it("确保埋点在自定义事件之后上报", () => {
    const wrapper = mount(TrackCustomEventDelay, {
      localVue
    });

    wrapper.find(Child).trigger("click");
    expect(mockTrackAction).toBeTruthy();
    expect(mockTrackAction).toBeCalledTimes(1);
  });
});

/*
 * @Author: 宋慧武
 * @Date: 2019-04-09 21:41:47
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-09 21:59:12
 */
import Vue from "vue";
import VTrack from "@/";
import { mount, createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
const mockTrackAction = jest.fn(({ collaps }) => collaps);
const trackEvents = {
  18015: mockTrackAction
};
const TrackClick = Vue.extend({
  template: `
    <div v-track:18015.click.delay="{ handleClick, collaps }"></div>
  `,
  data() {
    return {
      collaps: false
    };
  },
  methods: {
    handleClick() {
      this.collaps = !this.collaps;
    }
  }
});

localVue.use(VTrack, {
  trackEvents
});

describe("TrackClick", () => {
  it("确保埋点在click事件之后执行", () => {
    const wrapper = mount(TrackClick, {
      localVue
    });

    wrapper.trigger("click");
    expect(mockTrackAction).toBeTruthy();
    expect(mockTrackAction).toBeCalledTimes(1);
  });
});

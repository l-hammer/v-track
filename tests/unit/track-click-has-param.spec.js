/*
 * @Author: 宋慧武
 * @Date: 2019-04-09 18:23:04
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-09 21:40:29
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
      id: 1
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
  it("确保传参正确，点击多次会上报多次埋点", () => {
    const wrapper = mount(TrackClickHasParam, {
      localVue
    });

    expect(wrapper.vm.id).toBe(1);
    wrapper.setData({ item: { id: 2 } });
    wrapper.trigger("click");
    expect(wrapper.vm.id).toBe(2);
    wrapper.setData({ item: { id: 3 } });
    wrapper.trigger("click");
    expect(wrapper.vm.id).toBe(3);
    expect(mockTrackAction).toBeCalledTimes(2);
  });
});

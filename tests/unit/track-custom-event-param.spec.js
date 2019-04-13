/*
 * @Author: 宋慧武
 * @Date: 2019-04-13 21:03:55
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-13 22:56:41
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
    <div @click="$emit('search', { item })" />
  `,
  data() {
    return {
      item: {
        id: 0
      }
    };
  }
});
const TrackCustomEventParam = Vue.extend({
  template: `
    <child v-track:18015.search="handleClick" />
  `,
  components: {
    child: Child
  },
  data() {
    return {
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

describe("TrackCustomEventParam", () => {
  it("确保自定义事件传参正确，并且点击事件次数等于埋点上报次数", () => {
    const wrapper = mount(TrackCustomEventParam, {
      localVue
    });
    const vm = wrapper.vm;
    const childWrapper = wrapper.find(Child);

    expect(vm.id).toBe(0);
    childWrapper.setData({ item: { id: 1 } });
    childWrapper.trigger("click");
    expect(vm.id).toBe(1);
    childWrapper.setData({ item: { id: 2 } });
    childWrapper.trigger("click");
    expect(vm.id).toBe(2);
    expect(mockTrackAction).toBeCalledTimes(2);
  });
});

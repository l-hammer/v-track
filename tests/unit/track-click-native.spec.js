/*
 * @Author: 宋慧武
 * @Date: 2019-05-28 17:46:45
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-05-28 18:37:50
 */
import Vue from "vue";
import VTrack from "@/";
import VueRouter from "vue-router";
import { mount, createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
const mockTrackAction = jest.fn();
const trackEvents = {
  18015: mockTrackAction
};
const Button = Vue.extend({
  template: `
    <div @click="$emit('click')" />
  `
});
const TrackClickNative = Vue.extend({
  template: `
    <Button v-track:18015.click.native="handleNativeEvent"></Button>
  `,
  components: {
    Button
  },
  data() {
    return {
      count: 0
    };
  },
  methods: {
    handleNativeEvent() {
      this.count += 1;
    }
  }
});
const RouterLinkTrackClickNative = Vue.extend({
  template: `
    <router-link to="home" v-track:18015.click.native="handleNativeEvent" />
  `,
  data() {
    return {
      count: 0
    };
  },
  methods: {
    handleNativeEvent() {
      this.count += 1;
    }
  }
});

localVue.use(VueRouter);
localVue.use(VTrack, {
  trackEvents
});

describe("TrackClickNative", () => {
  test("确保组件原生click事件、埋点事件正常触发，且埋点上报次数为1", () => {
    const wrapper = mount(TrackClickNative, {
      localVue
    });

    expect(wrapper.vm.count).toBe(0);
    wrapper.trigger("click");
    expect(wrapper.vm.count).toBe(1);
    expect(mockTrackAction).toBeCalledTimes(1);
  });

  test("确保组件原生click事件、埋点事件正常触发，且埋点上报次数为2", () => {
    const wrapper = mount(RouterLinkTrackClickNative, {
      localVue,
      stubs: ["router-link"]
    });

    expect(wrapper.vm.count).toBe(0);
    wrapper.trigger("click");
    expect(wrapper.vm.count).toBe(1);
    expect(mockTrackAction).toBeCalledTimes(2);
  });
});

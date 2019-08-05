/*
 * Created Date: 2019-08-05
 * Author: 宋慧武
 * ------
 * Last Modified: Monday 2019-08-05 17:01:32 pm
 * Modified By: the developer formerly known as 宋慧武 at <songhuiwu001@ke.com>
 * ------
 * HISTORY:
 * ------
 * Javascript will save your soul!
 */
import Vue from "vue";
import VTrack from "@/";
import { mount, createLocalVue } from "@vue/test-utils";
import { mockParentNode, mockRect } from "../helper";

const localVue = createLocalVue();
const mockTrackAction = jest.fn((_, id) => id);
const trackEvents = {
  18015: mockTrackAction
};
const TrackShow = Vue.extend({
  template: `
    <div v-track:18015.show="{ id }" />
  `,
  data() {
    return {
      id: "2019"
    };
  }
});

localVue.use(VTrack, {
  trackEvents
});

jest.useFakeTimers();

describe("TrackShow", () => {
  it("确保DOM元素完全可见之后触发埋点，且至少间隔200ms执行一下", () => {
    const wrapper = mount(TrackShow, { localVue });
    const vm = wrapper.vm;

    mockParentNode(vm.$el);
    mockRect(vm.$el);
    jest.runAllTimers();

    expect(mockTrackAction.mock.results[0].value).toBe("2019");
    expect(mockTrackAction).toBeCalledTimes(1);
  });
});

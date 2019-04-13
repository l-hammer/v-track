/*
 * @Author: 宋慧武
 * @Date: 2019-04-10 21:28:53
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2019-04-12 22:51:40
 */
import Vue from "vue";
import VTrack from "@/";
import { mount, createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
const mockTrackAction = jest.fn(() => true);
const trackEvents = {
  18015: mockTrackAction
};
const TrackView = Vue.extend({
  template: `
    <track-view v-track:18015 />
  `
});

localVue.use(VTrack, {
  trackEvents
});

describe("TrackView", () => {
  it("确保初始化埋点正常上报", () => {
    mount(TrackView, { localVue });
    expect(mockTrackAction).toBeTruthy();
    expect(mockTrackAction).toBeCalledTimes(1);
  });
});

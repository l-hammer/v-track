import Vue from "vue";
import VueRouter from "vue-router";
import {
  Alert,
  Card,
  Collapse,
  CollapseItem,
  Message,
  Notification
} from "element-ui";
import App from "./App.vue";
import Home from "./pages/home.vue";
import Started from "./pages/started.vue";
import CustomEvents from "./pages/custom-events.vue";
import TrackView from "./pages/track-view.vue";
import BlockShow from "./pages/block-show.vue";
import VueTrack from "../";
import trackEvents from "./tracks";

Vue.use(VueRouter);
Vue.use(Alert);
Vue.use(Card);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(VueTrack, {
  trackEvents,
  trackEnable: {
    UVPV: "routeUpdate",
    TONP: true
  }
});

Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "HOME",
      component: Home
    },
    {
      path: "/started",
      name: "STARTED",
      component: Started
    },
    {
      path: "/custom-events",
      name: "CUSTOM_EVENTS",
      component: CustomEvents
    },
    {
      path: "/track-view",
      name: "TRACK_VIEW",
      component: TrackView
    },
    {
      path: "/block-show",
      name: "BLOCK_SHOW",
      component: BlockShow
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});

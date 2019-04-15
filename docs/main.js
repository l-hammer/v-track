import Vue from "vue";
import VueRouter from "vue-router";
import { Alert, Message, Notification } from "element-ui";
import App from "./App.vue";
import VueTrack from "../";
import Home from "./pages/home.vue";
import Install from "./pages/install.vue";
import trackEvents, { trackAction } from "./tracks";

Vue.use(VueRouter);
Vue.use(Alert);
Vue.use(VueTrack, {
  trackEvents,
  trackAction,
  trackEnable: {
    UVPV: false,
    TONP: true
  }
});

Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;

const router = new VueRouter({
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/install", name: "install", component: Install },
    { path: "*", redirect: "/" }
  ]
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});

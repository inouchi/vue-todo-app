import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueI18n from "vue-i18n";
import "reflect-metadata";
import { createI18n } from "./messages/i18n";
import { setupVeeValidation } from "./validation/validation";

Vue.use(VueI18n);
Vue.config.productionTip = false;

const locale = window.navigator.language.split("-")[0];
const i18n = createI18n(locale);
setupVeeValidation(i18n);

new Vue({
  router,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");

import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import Buefy from 'buefy'
import VueResource from 'vue-resource'
import 'buefy/dist/buefy.css'
import { ValidationProvider } from 'vee-validate';
import * as VeeValidate from "vee-validate";
import { ValidationObserver } from "vee-validate";
import { extend } from "vee-validate";
import { required, numeric } from "vee-validate/dist/rules";
import moment from 'moment'
extend('numeric', {
  ...numeric,
  message: "Campo {_field_} deve ser númerico"
});
extend("required", {
  ...required,
  message: "Campo {_field_} obrigatório."
});



Vue.prototype.moment = moment
Vue.use(VeeValidate, { inject: false });
Vue.component('ValidationProvider', ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(VueResource)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

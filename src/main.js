import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import Buefy from 'buefy'
import VueResource from 'vue-resource'
import 'buefy/dist/buefy.css'
import { ValidationProvider } from 'vee-validate';
import * as VeeValidate from "vee-validate";
import { ValidationObserver } from "vee-validate";
import { extend } from "vee-validate";
import { required, numeric, max_value } from "vee-validate/dist/rules";
import './../node_modules/bulma-extensions/dist/css/bulma-extensions.min.css';
import moment from 'moment'
extend('numeric', {
  ...numeric,
  message: "Campo {_field_} deve ser númerico"
});
extend("required", {
  ...required,
  message: "Campo {_field_} obrigatório."
});
extend('max_value', {
  ...max_value,
  message: 'Campo {_field_} não pode ser superior a 100%'
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
  store: store,
}).$mount('#app')

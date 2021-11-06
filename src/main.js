import Vue from 'vue'
import App from './App.vue'
import { inspect } from "@xstate/inspect";
import VueCompositionAPI from '@vue/composition-api';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

inspect({
  iframe: false
});

Vue.config.productionTip = false

Vue.use(Buefy);
Vue.use(VueCompositionAPI);

new Vue({
  render: h => h(App),
}).$mount('#app')

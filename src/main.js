import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import Utils from './utils/setTime';
import UI from './utils/ui';
import request from './request';
import bottomBat from './component/bottom-bat.vue';
Vue.prototype.$Utils = Utils;
Vue.prototype.$UI = UI;
Vue.prototype.$request = request;
App.mpType = 'app'
Vue.component('bottom-bat',bottomBat)
const app = new Vue({
  ...App
})
app.$mount()

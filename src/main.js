/* eslint-disable no-unused-vars */

// ... your code here with unused vars...



import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import vuetify from './plugins/vuetify';
import AppSocket from './plugins/socket'
import filters from '@/filters'


Vue.config.productionTip = false
Vue.use(AppSocket, {connection: 'http://82.158.129.27:3001'})


filters()

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


/* eslint-enable no-unused-vars */
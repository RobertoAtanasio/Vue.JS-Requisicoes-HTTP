import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'

import './plugins/bootstrap-vue'
import './plugins/axios'        // registrar o plugin de conexão 

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App'
import router from './router'

import './../node_modules/bulma/css/bulma.css'
import './../node_modules/font-awesome/css/font-awesome.css'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})

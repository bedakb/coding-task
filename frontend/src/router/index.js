// Core
import Vue from 'vue'
import Router from 'vue-router'

// Views
import HomeView from '@/views/HomeView'
import CustomerView from '@/views/CustomerView'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView
        },
        {
            path: '/customer/:id?',
            name: 'Customer',
            component: CustomerView
        }
    ]
})
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Shop from '../views/Shop.vue'
import CustomOrder from '../views/CustomOrder.vue'
import Catering from '../views/Catering.vue'
import Account from '../views/Account.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/custom-order',
    name: 'CustomOrder',
    component: CustomOrder
  },
  {
    path: '/catering',
    name: 'Catering',
    component: Catering
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

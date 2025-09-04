import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Login from '../pages/login.vue'
import For from '../pages/forgot-password.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
   {
    path: '/',
    name: 'Forgot-Password',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

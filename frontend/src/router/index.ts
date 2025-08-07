import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Login from '../pages/login.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

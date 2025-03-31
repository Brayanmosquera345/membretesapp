import { createRouter, createWebHistory } from 'vue-router'

import HomeLayout from '@/layouts/HomeLayout.vue'
const routes = [
   {
    path:'/',
    name:'Home',
    component: HomeLayout,
    children:[
      {path:'/', name:'dashboard', component: ()=> import('@/views/HomeView.vue') },
    ]
   },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

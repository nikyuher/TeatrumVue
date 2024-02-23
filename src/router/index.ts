import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/estrenos',
      name: 'estrenos',
      component: () => import('../views/EstrenosView.vue')
    }
    ,
    {
      path: '/genero',
      name: 'genero',
      component: () => import('../views/GenerosView.vue')
    }
    ,
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/comprar',
      name: 'comprar',
      component: () => import('../views/ComprarView.vue')
    },
    {
      path: '/catalogo',
      name: 'catalogo',
      component: () => import('../views/CatalogoView.vue')
    }
  ]
})

export default router

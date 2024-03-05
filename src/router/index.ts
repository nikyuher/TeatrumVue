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
      path: '/genero/:genero',
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
      path: '/comprar/:idObra',
      name: 'comprar',
      component: () => import('../views/ComprarView.vue')
    },
    {
      path: '/catalogo',
      name: 'catalogo',
      component: () => import('../views/CatalogoView.vue')
    },
    {
      path: '/admin',
      name: 'cataadminlogo',
      component: () => import('../views/AdminView.vue')
    }
  ]
})

export default router

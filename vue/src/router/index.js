import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import NewProduct from '../views/NewProduct.vue'
import SuccessfulOrder from '../views/SuccessfulOrder.vue'
import AuthPage from '../views/AuthPage.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage
  },
  {
    path: '/NewProduct',
    name: 'NewProduct',
    component: NewProduct
  },
  {
    path: '/successfulOrder',
    name: 'successfulOrder',
    component: SuccessfulOrder
  },
  {
    path: '/auth/:type',
    name: 'auth',
    component: AuthPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

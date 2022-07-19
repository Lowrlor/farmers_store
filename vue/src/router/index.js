import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import NewProduct from '../views/NewProduct.vue'
import SuccessfulOrder from '../views/SuccessfulOrder.vue'

const routes = [
  {
    path: '/',
    name: 'list',
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

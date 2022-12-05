import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import NewProductPage from '../views/NewProductPage.vue'
import SuccessfulOrder from '../views/SuccessfulOrder.vue'
import AuthPage from '../views/AuthPage.vue'
import ProductUpdatePage from '../views/ProductUpdatePage.vue'
import OrdersPage from '../views/OrdersPage.vue'
import store from '../store/index.js'
const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage
  },
  {
    path: '/NewProduct',
    name: 'NewProduct',
    component: NewProductPage,
    beforeEnter: (to, from, next) => {
      adminverefi(next)
    }
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
  },
  {
    path: '/productupdate',
    name: 'productupdate',
    component: ProductUpdatePage,
    beforeEnter: (to, from, next) => {
      adminverefi(next)
    }
  },
  {
    path: '/orders/:type',
    name: 'AdminOrders',
    component: OrdersPage,
    beforeEnter: (to, from, next) => {
      adminverefi(next)
    }
  },
  {
    path: '/order/:userid',
    name: 'UserOrders',
    component: OrdersPage,
    beforeEnter: (to, from, next) => {
      authverefi(next)
    }
  }
]
function adminverefi (next) {
  const token = localStorage.getItem('token')
  if (token) {
    store.dispatch('user/loginByToken', token)
      .then((res) => {
        const userid = res.userId
        store.dispatch('user/adminverefi', { userid, token })
          .then((res) => {
            if (!res) {
              next('/')
            } else {
              next()
            }
          })
      })
  } else {
    next('/')
  }
}
function authverefi (next) {
  const token = localStorage.getItem('token')
  if (token) {
    store.dispatch('user/loginByToken', token)
    next()
  } else {
    next('/')
  }
}
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

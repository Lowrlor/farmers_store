import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import NewProductPage from '../views/NewProductPage.vue'
import SuccessfulOrder from '../views/SuccessfulOrder.vue'
import AuthPage from '../views/AuthPage.vue'
import ProductUpdatePage from '../views/ProductUpdatePage.vue'
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
    component: NewProductPage
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
      const token = localStorage.getItem('token')
      if (token) {
        store.dispatch('user/loginByToken', token)
          .then(() => {
            const userid = store.state.user.user.id
            console.log(store.state.user.user)
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

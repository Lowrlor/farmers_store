import { createStore } from 'vuex'
import productModule from './product.module.js'
import basketModule from './basket.module.js'
import userModule from './user.module.js'

const store = createStore({
  modules: {
    product: productModule,
    basket: basketModule,
    user: userModule
  }
})

export default store

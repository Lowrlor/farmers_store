import { createStore } from 'vuex'
import productModule from './product.module.js'
import basketModule from './basket.module.js'
import userModule from './user.module.js'
import orderModule from './order.module.js'

const store = createStore({
  modules: {
    product: productModule,
    basket: basketModule,
    user: userModule,
    order: orderModule
  }
})

export default store

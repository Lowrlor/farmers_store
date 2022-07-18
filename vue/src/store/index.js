import { createStore } from 'vuex'
import productModule from './product.module.js'
import basketModule from './basket.module.js'

const store = createStore({
  modules: {
    product: productModule,
    basket: basketModule
  }
})

export default store

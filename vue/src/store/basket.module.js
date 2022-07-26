import axios from 'axios'
export default {
  namespaced: true,
  state: {
    showingModal: false,
    basketList: [],
    total: Number
  },
  mutations: {
    ADDTOBASKETLIST (state, product) {
      let alreadyexist = false
      state.basketList.forEach((item, i) => {
        if (product.name === item.name) {
          state.basketList[i].cost += product.cost
          state.basketList[i].weight += product.weight
          alreadyexist = true
        }
      })
      if (!alreadyexist) {
        state.basketList.push(product)
      }
      state.total += product.cost
    },
    SETBASKETLIST (state, products) {
      products.forEach((item, i) => {
        state.basketList.push(item)
      })
    },
    REMOVEFROMBUSKET (state, payload) {
      state.basketList.splice(payload.index, 1)
      console.log(payload.productCost)
      state.total -= payload.productCost
    },
    REMOVEALLFROMBUSKET (state) {
      state.basketList.splice(0, state.basketList.length)
      state.total = 0
    },
    CREATEORDER (state) {
    }
  },
  actions: {
    addToBasketList ({ commit }, payload) {
      return axios.get('/getOne/' + payload.productId + '/' + payload.productCost + '/' + payload.productWeight)
        .then((res) => {
          commit('ADDTOBASKETLIST', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    setBasketList ({ commit }, products) {
      commit('SETBASKETLIST', products)
    },
    removeFromBasket ({ commit }, payment) {
      commit('REMOVEFROMBUSKET', payment)
    },
    removeAllFromBasket ({ commit }) {
      commit('REMOVEALLFROMBUSKET')
    },
    createOrder ({ commit }, basketList) {
      return axios.post('/stripePayment', { basketList })
        .then((res) => {
          commit('REMOVEALLFROMBUSKET')
          return res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

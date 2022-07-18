import axios from 'axios'
export default {
  namespaced: true,
  state: {
    basketList: [],
    total: Number
  },
  mutations: {
    ADDTOBASKETLIST (state, product) {
      state.basketList.push(product)
      state.basketList.forEach((item, i) => {
        for (let j = 0; j < state.basketList.length; j++) {
          if (item.name === state.basketList[j].name && i !== j) {
            console.log(product)
            state.basketList[i].cost += state.basketList[j].cost
            state.basketList[i].weight += state.basketList[j].weight
            state.basketList[i].weight.toFixed(2)
            state.basketList.splice(j, 1)
          }
        }
      })
    },
    SETBASKETLIST (state, products) {
      products.forEach((item, i) => {
        state.basketList.push(item)
      })
    },
    REMOVEFROMBUSKET (state, payload) {
      state.basketList.splice(payload.index, 1)
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
      return axios.post('/testCreate', { basketList })
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

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
      state.total = product.total
      state.basketList = product.list
    },
    SETBASKETLIST (state, list) {
      list.list.forEach((item, i) => {
        state.basketList.push(item)
      })
      state.total = list.total
    },
    REMOVEFROMBUSKET (state, payload) {
      state.basketList.splice(payload.index, 1)
      console.log(payload.productCost)
      state.total -= payload.productCost
    },
    REMOVEALLFROMBUSKET (state) {
      state.basketList.splice(0, state.basketList.length)
      state.total = 0
    }
  },
  actions: {
    addToBasketList ({ commit }, payload) {
      return axios.post('/basket/addProduct/' + payload.userId, { product: payload.product })
        .then((res) => {
          console.log(res)
          commit('ADDTOBASKETLIST', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getBasketList ({ commit }, userId) {
      return axios.get('/basket/get/' + userId)
        .then((res) => {
          commit('SETBASKETLIST', res.data)
        })
    },
    createBasketList ({ commit }, userId) {
      return axios.get('/basket/create/' + userId)
        .then((res) => {
          commit('SETBASKETLIST', res.data.list)
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeFromBasket ({ commit }, payment) {
      return axios.post('/basket/removeone/' + payment.userId + '/' + payment.index + '/' + payment.productCost, '')
        .then((res) => {
          commit('REMOVEFROMBUSKET', payment)
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeAllFromBasket ({ commit }, payment) {
      return axios.post('/basket/removeAll/' + payment.userId, '')
        .then((res) => {
          commit('REMOVEALLFROMBUSKET')
        })
        .catch(err => {
          console.log(err)
        })
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

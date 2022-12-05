import axios from 'axios'
export default {
  namespaced: true,
  state: {
    orderList: null
  },
  mutations: {
    SETPRODUCTLIST (state, orders) {
      state.orderList = orders
    },
    REMOVEONE (state, index) {
      state.orderList.splice(index, 1)
    },
    UPDATEONE (state, data) {
      state.orderList.splice(data.index, 1, data.data)
    }
  },
  actions: {
    create ({ commit }, data) {
      axios.post('/order/create', { basketList: data.basketList, date: data.date, phoneNumber: data.phoneNumber, userid: data.userid, total: data.total })
        .then((res) => {
          return res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getOrders ({ commit }, data) {
      axios.get('/order/get/' + data.type)
        .then((res) => {
          commit('SETPRODUCTLIST', res.data)
          return res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getById ({ commit }, userid) {
      axios.get('/order/getbyid/' + userid)
        .then((res) => {
          commit('SETPRODUCTLIST', res.data)
          return res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeOne ({ commit }, data) {
      axios.get('/order/removeOne/' + data._id)
        .then((res) => {
          commit('REMOVEONE', data.index)
          return res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateOne ({ commit }, data) {
      axios.post('/order/updateOne/' + data._id, data)
        .then((res) => {
          commit('UPDATEONE', { index: data.index, data: res.data })
          return res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

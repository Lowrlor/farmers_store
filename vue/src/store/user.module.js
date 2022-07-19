import axios from 'axios'
export default {
  namespaced: true,
  state: {
    user: undefined
  },
  mutations: {
    LOGIN (state, user) {
      state.user = user
    }
  },
  actions: {
    register ({ commit }, user) {
      return axios.post('/register', user)
        .then((res) => {
          commit('LOGIN', res.data.user)
          return true
        })
        .catch(err => {
          console.log(err)
        })
    },
    login ({ commit }, user) {
      return axios.post('/login', user)
        .then((res) => {
          commit('LOGIN', res.data.user)
          return true
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

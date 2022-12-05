import axios from 'axios'
export default {
  namespaced: true,
  state: {
    user: undefined
  },
  mutations: {
    SETUSER (state, user) {
      state.user = user
    },
    SETTOKEN (state, token) {
      state.user.token = token
    },
    LOGOUT (state) {
      state.user = undefined
    }
  },
  actions: {
    register ({ commit }, user) {
      return axios.post('/register', user)
        .then((res) => {
          return { secuses: true, userId: res.data.id }
        })
        .catch(err => {
          console.log(err)
        })
    },
    login ({ commit }, user) {
      user.email = user.email.trim()
      return axios.post('/login', user)
        .then((res) => {
          commit('SETUSER', res.data.user)
          return { secuses: true, userId: res.data.user.id }
        })
        .catch(err => {
          console.log(err)
        })
    },
    loginByToken ({ commit }, token) {
      return axios.post('/loginbytoken', '', { headers: { authorization: token } })
        .then((res) => {
          commit('SETUSER', res.data.user)
          return { secuses: true, userId: res.data.user.id }
        })
        .catch(err => {
          console.log(err)
        })
    },
    adminverefi ({ commit }, data) {
      return axios.post('/adminverefi', { userid: this.state.user.user.id }, { headers: { authorization: this.state.user.user.token } })
        .then((res) => {
          commit('SETTOKEN', res.data)
          return true
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout ({ commit }, user) {
      return axios.post('/logout', user)
        .then((res) => {
          commit('LOGOUT')
          return true
        })
    }
  }
}

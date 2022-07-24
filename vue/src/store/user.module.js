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
          return true
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
          return true
        })
        .catch(err => {
          console.log(err)
        })
    },
    loginByToken ({ commit }, token) {
      return axios.post('/loginbytoken', '', { headers: { authorization: token } })
        .then((res) => {
          commit('SETUSER', res.data.user)
          return true
        })
        .catch(err => {
          console.log(err)
        })
    },
    adminverefi ({ commit }, data) {
      console.log('here')
      return axios.post('/adminverefi', { userid: data.userid }, { headers: { authorization: data.token } })
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

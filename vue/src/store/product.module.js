import axios from 'axios'
export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    GETPRODUCTLIST (state, productlist) {
      state.list = productlist
    },
    ADDNEWPRODUCT (state, productlist) {
      state.list.push(productlist)
    },
    REMOVEPRODUCT (state, index) {
      state.list.splice(index, 1)
    },
    UPDATEPRODUCT (state, payload) {
      state.list.splice(payload.index, 1, payload.product)
    }
  },
  actions: {
    getProductList ({ commit }, productlist) {
      return axios.get('/getList')
        .then((res) => {
          commit('GETPRODUCTLIST', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addNewProduct ({ commit }, newProduct) {
      const formData = new FormData()
      formData.append('img', newProduct.img)
      formData.append('name', newProduct.name)
      formData.append('cost', newProduct.cost)
      formData.append('category', newProduct.category)
      return axios.post('/AddNewProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          console.log(res)
          commit('ADDNEWPRODUCT', res.data)
        })
        .catch(err => {
          console.log(Object.assign(err))
          return err
        })
    },
    removeProduct ({ commit }, payload) {
      return axios.post('/removeOne/' + payload._id)
        .then(() => {
          commit('REMOVEPRODUCT', payload.index)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateProduct ({ commit }, payload) {
      const formData = new FormData()
      if (payload.newImg) {
        formData.append('img', payload.newImg)
        console.log(payload.product.img)
      }
      formData.append('_id', payload.product._id)
      formData.append('name', payload.product.name)
      formData.append('cost', payload.product.cost)
      formData.append('category', payload.product.category)
      return axios.post('/updateOne', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          commit('UPDATEPRODUCT', { product: res.data, index: payload.index })
        })
        .catch(err => {
          console.log(Object.assign(err))
        })
    }
  }
}

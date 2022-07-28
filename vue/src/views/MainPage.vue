<template lang='pug'>
ProductList
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/ProductList.vue'

export default {
  name: 'ProductListView',
  components: {
    ProductList
  },
  data () {
    return {
    }
  },
  computed: {
    isAdmin () {
      if (this.$store.state.user.user) {
        if (this.$store.state.user.user.role < 1) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  beforeCreate () {
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.dispatch('user/loginByToken', token)
        .then((res) => {
          if (res.secuses) {
            this.getBasketList(res.userId)
            const token = this.$store.state.user.user.token
            localStorage.setItem('token', token)
          } else {
            localStorage.removeItem('token')
          }
        })
    }
  },
  methods: {
    getBasketList (userId) {
      this.$store.dispatch('basket/getBasketList', userId)
    }
  }
}
</script>

<style lang='sass'>
</style>

<template lang='pug'>
ProductList
p {{ user }}
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
    user () {
      return this.$store.state.user.user
    },
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
  methods: {
  },
  mounted () {
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.dispatch('user/loginByToken', token)
        .then(secuses => {
          if (secuses) {
            const token = this.$store.state.user.user.token
            localStorage.setItem('token', token)
          } else {
            localStorage.removeItem('token')
          }
        })
    }
  }
}
</script>

<style lang='sass'>
</style>

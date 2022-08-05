<template lang='pug'>
.top
  .top-left
    h1(@click='redirectTo("/")').pointCursor Farmers
  .top-right
    .admin-func
      p(v-if='isAdmin' @click='redirectTo("/NewProduct")').pointCursor NewProduct
    .cart
      BasketModal(:showingModal = 'showingModal' @modal-Controll='modalControll')
      p(v-if='isAuth' @click='modalControll(showingModal)').pointCursor Cart
    .auth-login-register(v-if='!isAuth')
      p(@click='redirectTo("/auth/register")').register.pointCursor register
      p(@click='redirectTo("/auth/login")').login.pointCursor login
    .auth-logout(v-if='isAuth')
      p(@click='logout(this.$store.state.user.user)').pointCursor logout
</template>

<script>
import BasketModal from '@/components/BasketModal.vue'

export default {
  name: 'PagesTop',
  components: {
    BasketModal
  },
  props: {
  },
  data () {
    return {
      showingModal: false
    }
  },
  computed: {
    isAuth () {
      if (this.$store.state.user.user) {
        return true
      } else {
        return false
      }
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
    modalControll (showingModal) {
      if (showingModal) {
        this.showingModal = false
        document.body.style.overflow = 'auto'
      } else {
        this.showingModal = true
        document.body.style.overflow = 'hidden'
      }
    },
    redirectTo (link) {
      this.$router.push(link)
    },
    logout (user) {
      this.$store.dispatch('user/logout', user)
        .then((res) => {
          if (res) {
            localStorage.removeItem('token')
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='sass'>
.top
  position: relative
  display: flex
  justify-content: space-between
  align-items: center
  box-shadow: 0 .5px
  padding-bottom: 2px
.top-right
  display: flex
.top-right > *
  margin: 5px
.auth-login-register
  display: flex
  .login, .register
    margin-left: 5px
.pointCursor
  cursor: pointer
</style>

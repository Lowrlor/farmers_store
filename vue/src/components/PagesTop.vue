<template lang='pug'>
.top
  .top-left
    h1(@click='redirectTo("/")').underline Farmers
  .top-right
    .admin-func(v-if='isAdmin')
      a(href='/NewProduct') Дабавити новий продукт
    .cart(v-if='isAuth')
      BasketModal(:showingModal = 'showingModal' @modal-Controll='modalControll')
      p(@click='modalControll(showingModal)').underline Корзина
    .order(v-if='isAuth')
      a(:href="/order/ + userid" v-if='!isAdmin').underline Замовлення
      a(href='/orders/all' v-if='isAdmin').underline Замовлення
    .auth
      .auth-register(v-if='!isAuth')
        a(href='/auth/register') Реєстрація
      .auth-login(v-if='!isAuth')
        a(href='/auth/login') Вхід
      .auth-logout(v-if='isAuth')
        p(@click='logout(this.$store.state.user.user)').underline Вийти
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
    userid () {
      if (this.$store.state.user.user.id) {
        return this.$store.state.user.user.id
      } else {
        return null
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
        .then(() => {
          this.$router.go('/')
        })
        .catch(err => {
          console.log(err)
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
  margin: 5px 5px 5px 10px
.auth
  display: flex
  .auth-login, .auth-register
    margin-left: 10px
.underline
  cursor: pointer
  &:hover
    text-decoration: underline
a
   text-decoration: none
   &:hover
     text-decoration: underline
</style>

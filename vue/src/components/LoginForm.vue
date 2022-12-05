<template lang='pug'>
.form-auth-login
  form(@submit.prevent='login(user)').form
    .text.m-b-3
      p Вхід
    .errors.m-b-1
      ul
        li(v-for='error in errors') {{ error }}
    .text-email
      p Email:
    .input-email.m-b-1
      input(for="email" type="email" required v-model="user.email" @blur="validateData").input-auth-style
    .text-password
      p Password:
    .input-password.m-b-2
      input(v-model='user.password' type='password' @blur="validateData").input-auth-style
    .submit-button
      button.button-auth-style Submit
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      errors: []
    }
  },
  methods: {
    login (user) {
      this.$store.dispatch('user/login', user)
        .then((res) => {
          if (res.secuses) {
            this.getBasketList(res.userId)
            const token = this.$store.state.user.user.token
            localStorage.setItem('token', token)
            this.$router.push('/')
          }
        })
    },
    getBasketList (userId) {
      this.$store.dispatch('basket/getBasketList', userId)
    },
    validateData () {
      // eslint-disable-next-line
      var emailError = 'Email is not correct'
      var passwordError = 'Minimal password length is 8 symbols'
      if (!this.user.email.includes('@') && !this.errors.includes(emailError) && this.user.email.length) {
        this.errors.push(emailError)
      }
      if (this.user.email.includes('@')) {
        const index = this.errors.indexOf(emailError)
        this.errors.splice(index, 1)
      }
      if (this.user.password && this.user.password.length < 8 && !this.errors.includes(passwordError)) {
        this.errors.push(passwordError)
      }
      if (this.user.password.length >= 8) {
        const index = this.errors.indexOf(passwordError)
        this.errors.splice(index, 1)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='sass'>
</style>

<template lang='pug'>
.form-auth-register
  form(@submit.prevent='register(user)').form
    .text.m-b-3
      p Реєстрація
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
  name: 'RegisterForm',
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
    register (user) {
      if (user.email && user.password) {
        this.$store.dispatch('user/register', user)
          .then(data => {
            if (data.secuses) {
              this.$store.dispatch('basket/createBasketList', data.userId)
              this.$router.push('/auth/login')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
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
.submit-button
  display: flex
  justify-content: center
.form-auth-register, .form-auth-login
  display: flex
.form
  margin-left: auto
  margin-right: auto
.text
  display: flex
  justify-content: center
  font-size: 30px
  font-weight: bold
.button-auth-style
  width: 200px
  height: 30px
  color: #fff
  background: #000
  border: none
  font-size: 16px
  cursor: pointer
  border-radius: 2px
.input-auth-style
  width: 300px
  height: 30px
  border: 0
  outline: none
  border-bottom: 1px solid
  font-size: 16px
  padding-left: 5px
</style>

<template lang='pug'>
.form-auth-login
  form(@submit.prevent='login(user)')
    .input-email
      input(v-model='user.email' placeholder='email')
    .input-password
      input(v-model='user.password' placeholder='password')
    .submit-button
      button Submit
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
      }
    }
  },
  methods: {
    login (user) {
      this.$store.dispatch('user/login', user)
        .then(secuses => {
          if (secuses) {
            this.$router.push('/')
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='sass'>
</style>

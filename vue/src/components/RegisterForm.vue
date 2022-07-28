<template lang='pug'>
.form-auth-register
  form(@submit.prevent='register(user)')
    .input-email
      input(v-model='user.email' placeholder='email')
    .input-password
      input(v-model='user.password' placeholder='password')
    .submit-button
      button Submit
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
      }
    }
  },
  methods: {
    register (user) {
      this.$store.dispatch('user/register', user)
        .then(data => {
          if (data.secuses) {
            this.$store.dispatch('basket/createBasketList', data.userId)
            this.$router.push('/')
          }
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
</style>

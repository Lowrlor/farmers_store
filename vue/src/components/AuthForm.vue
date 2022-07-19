<template lang='pug'>
.form-auth
  form(@submit.prevent='auth(user, type)')
    .input-email
      input(v-model='user.email' placeholder='email')
    .input-password
      input(v-model='user.password' placeholder='password')
    .submit-button
      button Submit
</template>

<script>
export default {
  name: 'AuthForm',
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
  computed: {
    type () {
      return this.$route.params.type
    }
  },
  mounted () {
    console.log(this.type)
  },
  methods: {
    auth (user, type) {
      console.log(user)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='sass'>
</style>

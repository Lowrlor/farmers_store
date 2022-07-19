<template lang='pug'>
.form-auth
  RegisterForm(v-if='type == "register"')
  LoginForm(v-if='type == "login"')
</template>

<script>
// @ is an alias to /src
import RegisterForm from '@/components/RegisterForm.vue'
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'AuthPage',
  components: {
    RegisterForm,
    LoginForm
  },
  computed: {
    type () {
      return this.$route.params.type
    }
  }
}
</script>

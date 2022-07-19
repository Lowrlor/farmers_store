<template lang='pug'>
.form-auth
  AuthForm
</template>

<script>
// @ is an alias to /src
import AuthForm from '@/components/AuthForm.vue'

export default {
  name: 'NewProductView',
  components: {
    AuthForm
  }
}
</script>

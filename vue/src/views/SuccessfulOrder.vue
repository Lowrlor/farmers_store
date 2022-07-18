<template lang='pug'>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'SuccessfulOrderView',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mount () {
    localStorage.setItem('list', JSON.stringify([]))
    this.$router.redirect('/')
  }
}
</script>

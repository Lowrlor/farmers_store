<template lang='pug'>
.top
  .top-left
    h1 Name
  .top-right
    a(href='/auth/register') register
    a(href='/auth/login') login
</template>

<script>
export default {
  name: 'PagesTop',
  components: {
  },
  props: {
  },
  data () {
    return {
    }
  },
  methods: {
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
</style>

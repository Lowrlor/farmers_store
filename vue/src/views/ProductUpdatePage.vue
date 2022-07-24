<template lang='pug'>
ProductList(:isUpdating='updating' v-if='isAdmin')
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/ProductList.vue'

export default {
  name: 'ProductListView',
  components: {
    ProductList
  },
  data () {
    return {
      showingModal: false,
      updating: true
    }
  },
  computed: {
    isAdmin () {
      console.log(this.$store.state.user)
      if (this.$store.state.user.user.role < 1) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang='sass'>
</style>

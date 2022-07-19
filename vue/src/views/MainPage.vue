<template lang='pug'>
MainPageTop
ProductList
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/ProductList.vue'
import MainPageTop from '@/components/MainPageTop.vue'

export default {
  name: 'ProductListView',
  components: {
    ProductList,
    MainPageTop
  },
  data () {
    return {
    }
  }
}
</script>

<style lang='sass'>
</style>

<template lang='pug'>
ProductList()
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
    }
  }
}
</script>

<style lang='sass'>
.button-addToBasket
  height: 25px
  width: 150px
  background: #b6c3ff
  border: thin
  border-radius: 5px
</style>

<template lang='pug'>
BasketModal(:showingModal = 'showingModal' @modal-Controll='modalControll')
p(@click='modalControll(showingModal)') Корзина
ProductList
p {{ user }}
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/ProductList.vue'
import BasketModal from '@/components/BasketModal.vue'

export default {
  name: 'ProductListView',
  components: {
    ProductList,
    BasketModal
  },
  data () {
    return {
      showingModal: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user.user
    }
  },
  methods: {
    modalControll (showingModal) {
      console.log(showingModal)
      if (showingModal) {
        this.showingModal = false
        document.body.style.overflow = 'auto'
        console.log(showingModal)
      } else {
        this.showingModal = true
        document.body.style.overflow = 'hidden'
      }
    }
  }
}
</script>

<style lang='sass'>
</style>

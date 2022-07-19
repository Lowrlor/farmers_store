<template lang='pug'>
.top
  h1 Name
  .top-left
    p(@click='openModal()') Корзина
    BasketModal(v-show='showModal' @close-modal='closeModal()')
</template>

<script>
import BasketModal from './BasketModal.vue'
export default {
  name: 'MainPageTop',
  components: {
    BasketModal
  },
  props: {
  },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    openModal () {
      this.showModal = true
      document.body.style.overflow = 'hidden'
    },
    closeModal () {
      this.showModal = false
      document.body.style.overflow = 'auto'
    }
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

<template lang='pug'>
.modal-overlay(@click="$emit('modalControll', showingModal)" v-if='showingModal')
  .modal(@click.stop)
    .modal-top
      .close(@click="closeModal")
        p Закрити
      .button-removeAll
        button(@click='removeAllFromBasket()') Видалити все
      .button-createOrder
        SubmitModal()
      .total
        p {{ basketTotal }}
    .text(v-if='basketTotal < 20')
      p Мінімальна сума замовлення 20 грн
    .products
      .row
        ul(v-for="productBasket, index in basketList" :key='productBasket._id').col.col-desktop-1-3.col-tablets-1-2.col-phone-1-1.m-b-2
          .productBasket
            img(v-bind:src="'http://localhost:2000/' + productBasket.img").img
            .product-name Назва: {{productBasket.name}}
            .product-cost Ціна: {{productBasket.cost }}
            .product-weight Вага: {{productBasket.weight }}
            button.button-remove(@click='removeFromBasket(index, productBasket.cost)') Видалити
</template>

<script>
import SubmitModal from './SubmitModal.vue'

export default {
  name: 'BasketModal',
  data () {
    return {
    }
  },
  emits: [
    'modalControll',
    'modal-Controll'
  ],
  components: {
    SubmitModal
  },
  computed: {
    basketTotal () {
      return this.$store.state.basket.total
    },
    basketList () {
      return this.$store.state.basket.basketList
    },
    userId () {
      return this.$store.state.user.user.id
    }
  },
  props: {
    showingModal: Boolean
  },
  methods: {
    closeModal () {
      this.$emit('modal-Controll', this.showingModal)
      document.body.style.overflow = 'auto'
    },
    removeFromBasket (index, productCost) {
      this.$store.dispatch('basket/removeFromBasket', { userId: this.userId, index, productCost })
    },
    removeAllFromBasket () {
      this.$store.dispatch('basket/removeAllFromBasket', { userId: this.userId })
    },
    createOrder (basketList) {
      this.$store.dispatch('order/create', basketList)
        .then((res) => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang='sass' scoped>

.modal-overlay
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  display: flex
  justify-content: center
  background-color: #000000da
  overflow-y: auto

.modal
  text-align: center
  background-color: white
  width: 85%
  margin-top: 90px
  border-radius: 20px
  position: absolute
  min-height: 25rem

.close
  cursor: pointer

</style>

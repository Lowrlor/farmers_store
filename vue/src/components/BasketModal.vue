<template lang='pug'>
.modal-overlay(@click="$emit('close-modal')")
  .modal(@click.stop)
    .wrapper
      .close(@click="$emit('close-modal')")
        p Close
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
          .button-removeAll
            button(@click='removeAllFromBasket()') Видалити все
          .button-createOrder
            button(@click='createOrder(basketList)') Оплатити
          .total
            p {{ basketTotal }}
</template>

<script>
import { loadStripe } from '@stripe/stripe-js'
export default {
  name: 'BasketModal',
  data () {
    return {
      basketList: this.$store.state.basket.basketList
    }
  },
  computed: {
    basketTotal () {
      return this.$store.state.basket.total
    }
  },
  props: {
  },
  methods: {
    removeFromBasket (index, productCost) {
      this.$store.dispatch('basket/removeFromBasket', { index, productCost })
        .then(() => {
          const array = JSON.parse(localStorage.getItem('list'))
          array.splice(index, 1)
          localStorage.setItem('list', JSON.stringify(array))
          let total = parseInt(localStorage.getItem('total'))
          total -= parseInt(productCost)
          localStorage.setItem('total', total)
        })
    },
    removeAllFromBasket () {
      this.$store.dispatch('basket/removeAllFromBasket')
        .then(() => {
          localStorage.setItem('list', JSON.stringify([]))
          localStorage.setItem('total', 0)
        })
    },
    async createOrder (basketList) {
      const stripeInit = loadStripe(process.env.VUE_APP_VITE_STRIPE_KEY)
      this.$store.dispatch('basket/createOrder', basketList)
        .then((res) => {
          console.log(res)
          stripeInit.then(stripe => {
            stripe.redirectToCheckout({
              sessionId: res.id
            })
              .catch(err => {
                console.log(err)
              })
          })
        })
    }
  },
  afterMount () {
    console.log('here')
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

.close
  cursor: pointer

</style>

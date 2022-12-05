<template lang='pug'>
ul(v-if='orderList && orderList.length' v-for="item, index in orderList").orderMenu.m-b-2
  p {{ index + 1 }}
  ul(v-for="product in item.productList")
    p {{ product.name }}
  p {{ item.phoneNumber }}
  p {{ item.date }}
  p {{ item.userid }}
  p {{ item.total }}
  p {{ item.status }}
  button() Remove
.text-empty(v-else)
  p У вас немає жодних замовлень
</template>

<script>
// @ is an alias to /src

export default {
  name: 'UserOrders',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    orderList () {
      return this.$store.state.order.orderList
    }
  },
  mounted () {
    this.$store.dispatch('order/getById', this.$route.params.userid)
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang='sass'>
.orderMenu
  border: 2px black solid
.text-empty
  display: flex
  justify-content: center
  font-size: 58px
  font-weight: lighter
  margin-top: 150px
</style>

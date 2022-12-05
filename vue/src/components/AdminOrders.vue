<template lang='pug'>
p order list
ul(v-for="item, index in orderList").orderMenu.m-b-2
  p {{ index + 1 }}
  ul(v-for="product in item.productList")
    p {{ product.name }}
  p {{ item.phoneNumber }}
  p {{ item.date }}
  p {{ item.userid }}
  p {{ item.total }}
  p {{ item.status }}
  button(@click='removeOne(item._id, index)') Видалити
  button(@click='updateOne(item._id, index, { status: "accepted "})') Прийняти
  button(@click='updateOne(item._id, index, { status: "rejected" })') Відхилити
  <router-view/>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'AdminOrders',
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
    this.$store.dispatch('order/getOrders', this.$route.params)
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    removeOne (_id, index) {
      this.$store.dispatch('order/removeOne', { _id, index })
        .catch(err => {
          console.log(err)
        })
    },
    updateOne (_id, index, data) {
      console.log(data)
      this.$store.dispatch('order/updateOne', { _id, index, data })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang='sass'>
.orderMenu
  border: 2px black solid
</style>

<template lang='pug'>
.links.m-b-2(v-if='this.$route.name === "AdminOrders"')
  a(href='all' @click='this.$router.push("all")').link--var Всі
  a(href='processing' @click='this.$router.push("processing")').link--var Опрацьовується
  a(href='accepted' @click='this.$router.push("accepted")').link--var Прийнято
  a(href='rejected' @click='this.$router.push("rejected")').link--var Відмовлено
AdminOrders(v-if='this.$route.name === "AdminOrders"')
UserOrders(v-if='this.$route.name === "UserOrders"')
</template>

<script>
// @ is an alias to /src
import AdminOrders from '@/components/AdminOrders.vue'
import UserOrders from '@/components/UserOrders.vue'

export default {
  name: 'OrdersView',
  components: {
    AdminOrders,
    UserOrders
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang='sass'>
.links
  text-align: center
.link--var
  margin-left: 10px
.orderMenu
  border: 2px black solid
</style>

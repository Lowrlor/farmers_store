<template lang='pug'>
.filterMenu.m-b-1
  ul(v-for="item in categoryArray").filterMenu--item.noselect
    label()
      input(type='checkbox' v-bind:value="item" @input='filter(item)')
      span {{ item }}
.products
  .row
    ul(v-for="product, index in productList" :key='product._id').col.col-desktop-1-4.col-tablets-1-3.col-phone-1-2.m-b-1
      .product().m-b-1
        template(v-if='!isEditing || editingIndex != index')
          img( :src="'http://localhost:2000/' + product.img").img
          .product-name Назва: {{ product.name }}
          .product-cost Ціна: {{ product.cost * product.weight / 1000 }}
          .input-product-weight
            p Грам: {{ product.weight }}
            input(type='number' v-model='product.weight' step='100' min='100')
          .button-addToBasket(v-if='product.weight > 300 && !isUpdating && isAuth')
            button(@click='addToBacketList(product, product.cost * product.weight / 1000, product.weight)').button-addToBasket Добавити в корзину
          .button-admin(v-if='isAdmin')
            .button-removeProduct
              button(@click='removeProduct(index, product._id, product.cost * product.weight / 1000)') Видалити
            .button-edit
              button(@click='isEditing = true, editingIndex = index') Редагувати
        template(v-else)
          .input-product-file
            input.product-name-input(type='file' @change='onFileChange')
          .input-product-name
            input(v-model='product.name')
          .input-product-cost
            input(v-model='product.cost')
          .input-product-category
            input(v-model='product.category')
          .button-save
            button(@click='isEditing=false, editingIndex=-1, updateProduct(product, newImg, index)') Зберегти
          .button-cancel
            button(@click='isEditing=false, editingIndex=-1') Відмінити
</template>

<script>
export default {
  name: 'ProductList',
  components: {
  },
  props: {
    isUpdating: Boolean
  },
  data () {
    return {
      isEditing: false,
      editingIndex: -1,
      newImg: undefined,
      categoryList: []
    }
  },
  computed: {
    isAdmin () {
      if (this.isAuth) {
        if (this.$store.state.user.user.role < 1) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    isAuth () {
      if (this.$store.state.user.user) {
        return true
      } else {
        return false
      }
    },
    categoryArray () {
      const list = this.$store.state.product.list
      const categoryArray = []
      list.forEach((item, i) => {
        if (!categoryArray.includes(item.category)) {
          categoryArray.push(item.category)
        }
      })
      return categoryArray
    },
    productList () {
      const list = this.$store.state.product.list
      var filteredList = []
      const categoryList = this.categoryList
      list.forEach((item, i) => {
        categoryList.forEach((category, k) => {
          if (item.category.includes(category)) {
            filteredList.push(list[i])
          }
        })
      })
      if (categoryList.length === 0) {
        filteredList = list
      }
      return filteredList
    }
  },
  mounted () {
    this.getProductList()
    console.log(this.isAdmin)
  },
  methods: {
    getProductList () {
      this.$store.dispatch('product/getProductList')
        .then(() => {
          // this.productList = this.$store.state.product.list
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToBacketList (product, productCost, productWeight) {
      product.cost = productCost
      product.weight = productWeight
      this.$store.dispatch('basket/addToBasketList', { userId: this.$store.state.user.user.id, product })
    },
    removeProduct (index, _id, productCost) {
      this.$store.dispatch('product/removeProduct', { index, _id })
        .then(() => {
          localStorage.setItem('list', JSON.stringify([]))
        })
    },
    updateProduct (product, newImg, index) {
      this.$store.dispatch('product/updateProduct', { product, newImg, index })
        .then(() => {
          this.newImg = undefined
          this.$router.go(0)
        })
    },
    onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.newImg = files[0]
    },
    filter (name) {
      if (this.categoryList.length > 0) {
        this.categoryList.forEach((item, i) => {
          if (item === name) {
            var index = this.categoryList.findIndex(element => element === name)
            this.categoryList.splice(index, 1)
            this.categoryList = this.categoryList.splice(index, 1)
          } else {
            this.categoryList.push(name)
          }
        })
      } else {
        this.categoryList.push(name)
      }
      console.log(this.categoryList)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='sass'>
.noselect
  -webkit-touch-callout: none
  -webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
.filterMenu
  display: flex
.filterMenu--item
  margin: 10px
.button-addToBasket
  height: 25px
  width: 150px
  background: #b6c3ff
  border: thin
  border-radius: 5px
</style>

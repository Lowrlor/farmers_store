<template lang='pug'>
.wrapper
  .top
    h1 Name
    .top-left
      p(@click='openModal()') Корзина
      BasketModal(v-show='showModal' @close-modal='closeModal()')
  .products()
    .row
      ul(v-for="product, index in productList" :key='product._id').col.col-desktop-1-4.col-tablets-1-3.col-phone-1-2.m-b-1
        .product
          template(v-if='!isEditing || editingIndex != index')
            img( :src="'http://localhost:2000/' + product.img").img
            .product-name Назва: {{ product.name }}
            .product-cost Ціна: {{ product.cost * product.weight / 1000 }}
            .input-product-weight
              p Грам: {{ product.weight }}
              input(type='number' v-model='product.weight' step='100' min='100')
            .button-addToBasket(v-if='product.weight > 300')
              button(@click='addToBacketList(product._id, product.cost * product.weight / 1000, product.weight)').button-addToBasket Добавити в корзину
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
import BasketModal from './BasketModal.vue'
export default {
  name: 'ProductList',
  components: {
    BasketModal
  },
  props: {
  },
  computed: {
  },
  data () {
    return {
      productList: [],
      showModal: false,
      isEditing: false,
      editingIndex: -1,
      newImg: undefined
    }
  },
  mounted () {
    this.getProductList()
    if (localStorage.getItem('list')) {
      if (JSON.parse(localStorage.getItem('list')).length <= 0) {
        localStorage.setItem('list', JSON.stringify([]))
      } else {
        this.setBacketList(JSON.parse(localStorage.getItem('list')))
      }
    } else {
      localStorage.setItem('list', JSON.stringify([]))
    }
    if (!localStorage.getItem('total')) {
      localStorage.setItem('total', 0)
    } else {
      this.$store.state.basket.total = parseInt(localStorage.getItem('total'))
    }
  },
  methods: {
    getProductList () {
      this.$store.dispatch('product/getProductList')
        .then(() => {
          this.productList = this.$store.state.product.list
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToBacketList (productId, productCost, productWeight) {
      this.$store.dispatch('basket/addToBasketList', { productId, productCost, productWeight })
        .then(() => {
          localStorage.setItem('list', JSON.stringify(this.$store.state.basket.basketList))
          localStorage.setItem('total', this.$store.state.basket.total)
        })
    },
    setBacketList (products) {
      this.$store.dispatch('basket/setBasketList', products)
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
$siteWidth: 1500
$gap: 30
$vstep: 15
$breakpoint-tablet: 768px

@for $i from 1 through 10
  .m-b-#{$i}
    margin-bottom: $i * $vstep / 16 * 1rem

@media (min-width: 640px) and (max-width: 768px)
  .col-phone-1-1
      max-width: 100 / 1 * 1%
  .col-phone-1-2
      max-width: 100 / 2 * 1%
@media (min-width: 768px)
  .col-tablets-1-2
    max-width: 100 / 2 * 1%
  .col-tablets-1-3
    max-width: 100 / 3 * 1%
@media (min-width: 1024px)
  .col-desktop-1-3
    max-width: 100 / 3 * 1%
  .col-desktop-1-4
    max-width: 100 / 4 * 1%

.wrapper
  max-width: $siteWidth / 16 * 1rem
  margin-left: auto
  margin-right: auto
  padding-left: $gap / 2 / 16 * 1rem
  padding-right: $gap / 2 / 16 * 1rem
  min-height: 25rem
.row
  display: flex
  flex-wrap: wrap
  margin-left: $gap / 2 / 16 * -1rem
  margin-right: $gap / 2 / 16 * -1rem
.col
  width: 100%
  padding-left: $gap / 2 / 16 * 1rem
  padding-right: $gap / 2 / 16 * 1rem
  min-height: 100%
a
  color: #42b983
.top
  position: relative
  display: flex
  justify-content: space-between
  align-items: center
.product
</style>

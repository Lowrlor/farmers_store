<template lang='pug'>
.form-addProduct
  form(@submit.prevent='addProduct(newProduct)')
    .input-img
      input(type='file' @change='onFileChange')
    .input-name
      input(v-model='newProduct.name' placeholder='name')
    .input-cost
      input(v-model='newProduct.cost' placeholder='cost')
    .input-category
      input(v-model='newProduct.category' placeholder='category')
    .input-submit
      input(type='submit')
</template>

<script>
export default {
  name: 'NewProduct',
  props: {
  },
  data () {
    return {
      newProduct: {
        img: '',
        name: '',
        cost: '',
        category: ''
      }
    }
  },
  methods: {
    addProduct (newProduct) {
      this.$store.dispatch('product/addNewProduct', newProduct)
        .then(err => {
          if (err) {
            return err
          } else {
            this.$router.push('/')
          }
        })
    },
    onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.newProduct.img = files[0]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='sass'>

</style>

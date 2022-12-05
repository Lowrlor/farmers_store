<template lang='pug'>
button(v-if='basketList.length > 0' @click="modalControll(showingSubmitModal)") Замовити
.modal-overlay(@click="modalControll(showingSubmitModal)" v-if='showingSubmitModal')
  .modal(@click.stop)
    .modal-top
      .close(@click="modalControll(showingSubmitModal)")
        p Закрити
      .error(v-if='incorrectdate')
        p Неправильна введено дані
      .date
        <flat-pickr v-model="date" placeholder='Виберіть дату' ></flat-pickr>
      .input-phoneNumber
        input(type='tel' v-model='phoneNumber' maxlength='13' minlength='4' @keydown='numberValidator' @keydown.delete='disabledelete')
      .button-submit
        button(@click='orderSubmit(phoneNumber, basketList, userid, total)') Підтвердити
</template>

<script>
export default {
  name: 'BasketModal',
  data () {
    return {
      date: null,
      showingSubmitModal: false,
      phoneNumber: '+380',
      incorrectdate: false,
      userid: this.$store.state.user.user.id
    }
  },
  computed: {
    total () {
      return this.$store.state.basket.total
    },
    basketList () {
      return this.$store.state.basket.basketList
    }
  },
  methods: {
    modalControll (showingSubmitModal) {
      if (showingSubmitModal) {
        this.showingSubmitModal = false
      } else {
        this.showingSubmitModal = true
      }
    },
    disabledelete (e) {
      if (this.phoneNumber.length < 5) {
        e.preventDefault()
      }
    },
    numberValidator (e) {
      const symbol = e.key
      if (e.key !== 'Backspace' && e.key !== '0') {
        if (!parseFloat(symbol)) {
          e.preventDefault()
        }
      }
    },
    orderSubmit (phoneNumber, basketList, userid, total) {
      const choosendate = new Date(this.date)
      const currentdate = new Date()
      console.log(userid)
      if (this.date && phoneNumber.length >= 13) {
        if (choosendate - currentdate > 0) {
          this.incorrectdate = false
          this.$store.dispatch('order/create', { basketList, phoneNumber, date: choosendate, userid, total })
        } else {
          this.incorrectdate = true
        }
      } else {
        this.incorrectdate = true
      }
    }
  }
}
</script>
<style src="vuelendar/scss/vuelendar.scss" lang="scss"></style>
<style lang='sass' scoped>

.modal-overlay
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  display: flex
  justify-content: center
  overflow-y: auto

.modal
  text-align: center
  background-color: #333
  width: 30%
  margin-top: 110px
  border-radius: 20px
  position: absolute
  min-height: 25rem

.close
  cursor: pointer

</style>

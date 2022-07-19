<template lang='pug'>
.wraper
  a(href='/NewProduct') NewProduct
  a(href='/') Main
  PagesTop
  <router-view/>
</template>

<script>
// @ is an alias to /src
import PagesTop from '@/components/PagesTop.vue'
export default {
  name: 'ProductListView',
  components: {
    PagesTop
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="sass">
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
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700;800&display=swap')
*
  margin: 0
  padding: 0
  box-sizing: border-box
  font-family: 'Open Sans', sans-serif
  font-family: 'Comfortaa', cursive
img
  height: 250 / 16 * 1rem
  width: 200 / 16 * 1rem
.wrapper
  max-width: $siteWidth / 16 * 1rem
  margin-left: auto
  margin-right: auto
  padding-left: $gap / 2 / 16 * 1rem
  padding-right: $gap / 2 / 16 * 1rem
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
</style>

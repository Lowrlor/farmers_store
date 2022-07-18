<template lang='pug'>
a(href='/NewProduct') NewProduct
a(href='/') Main
<router-view/>
</template>

<style lang="sass">
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
</style>

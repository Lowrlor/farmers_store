<template>
  <template>
      <li v-for="(lang, k) in langs" :key="k">
          <a role="button" v-on:click="$i18n.locale = k">asd</a>
      </li>
  </template>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'SmsPage',
  components: {
  }
}
</script>

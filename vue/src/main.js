import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueFlatPickr from 'vue-flatpickr-component'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.css'
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js'
const app = createApp(App)
flatpickr.localize(Ukrainian)
app.use(VueFlatPickr)
Axios.defaults.baseURL = 'http://localhost:2000/api'

// eslint-disable-next-line
const Promise = require('es6-promise').Promise

app.config.globalProperties.$axios = Axios

app.use(store).use(router).mount('#app')

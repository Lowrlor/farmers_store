import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'

const app = createApp(App)

Axios.defaults.baseURL = 'http://localhost:2000/api'

app.config.globalProperties.$axios = Axios

app.use(store).use(router).mount('#app')

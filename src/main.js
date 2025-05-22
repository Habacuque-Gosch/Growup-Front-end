import App from './App.vue'
import { createApp } from 'vue'
import router from './router/index'
import pinia from './store'


const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
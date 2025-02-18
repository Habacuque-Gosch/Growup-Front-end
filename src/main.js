import App from './App.vue'
import { createApp } from 'vue'
// import '../public/assets/css/styles.css'
import router from './router/index'
import store from './store'


const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
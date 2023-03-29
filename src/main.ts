import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
const app = createApp(App);
import Toast, { POSITION } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
app.use(Toast, {
    position: POSITION.TOP_RIGHT
})
app.use(router)
app.mount('#app')

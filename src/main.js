import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primevue/resources/primevue.min.css'; // Core CSS
import 'primevue/resources/themes/saga-blue/theme.css'; // Theme
import 'primeicons/primeicons.css'; // Icons


createApp(App).use(router).use(PrimeVue).mount('#app')

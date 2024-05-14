import { createApp } from 'vue';
import router from './router';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css';
import { createPinia } from 'pinia';
import App from './App.vue';

createApp(App)
  .use(router)
  .use(PrimeVue)
  .use(createPinia())
  .mount('#app');
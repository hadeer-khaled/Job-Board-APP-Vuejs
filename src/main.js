import { createApp } from 'vue';
import router from './router';
import PrimeVue from 'primevue/config';
import ToastPlugin from 'vue-toast-notification';
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import { createPinia } from 'pinia';
import App from './App.vue';

createApp(App)
  .use(router)
  .use(PrimeVue)
  .use(ToastPlugin)
  .use(createPinia())
  .mount('#app');
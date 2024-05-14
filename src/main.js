import { createApp } from 'vue';
import router from './router';
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';
import App from './App.vue';

import 'primevue/resources/primevue.min.css'; // Core CSS
import 'primevue/resources/themes/saga-blue/theme.css'; // Theme
import 'primeicons/primeicons.css'; // Icons
import 'primevue/resources/themes/aura-light-green/theme.css';

createApp(App)
  .use(router)
  .use(PrimeVue)
  .use(createPinia())
  .mount('#app');
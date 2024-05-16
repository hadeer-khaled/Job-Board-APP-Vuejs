import { createApp, watch } from 'vue'; 
import router from './router';
import PrimeVue from 'primevue/config';
import ToastPlugin from 'vue-toast-notification';
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import { useUserStore } from "./store/modules/UserPinia";
import ToastService from 'primevue/toastservice';
import 'primevue/resources/primevue.min.css'; // Core CSS
import 'primevue/resources/themes/saga-blue/theme.css'; // Theme
import 'primeicons/primeicons.css'; // Icons
import 'primevue/resources/themes/aura-light-green/theme.css';
import ConfirmationService from 'primevue/confirmationservice';

const app = createApp(App);

app.use(router)
  .use(PrimeVue)
  .use(ToastPlugin)
  .use(ConfirmationService)
  .use(createPinia())
  .mount('#app');

const userStore = useUserStore(); 

if(localStorage.getItem('token')){
  userStore.getUser();
}
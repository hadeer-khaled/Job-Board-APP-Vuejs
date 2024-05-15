import { createApp, watch } from 'vue'; 
import router from './router';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import { useUserStore } from "./store/modules/UserPinia";

const app = createApp(App);

app.use(router)
  .use(PrimeVue)
  .use(createPinia())
  .mount('#app');

const userStore = useUserStore(); 

if(localStorage.getItem('token')){
  userStore.getUser();
}
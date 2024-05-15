import { createMemoryHistory, createRouter } from 'vue-router';
import LandingPage from './pages/Landing page/LandingPage.vue';
import Post from './pages/Post/Post.vue';
import ApplyingForm from './pages/ApplyingForm/ApplyingForm.vue';
import Login from './pages/Login/Login.vue';
import Register from './pages/Register/Register.vue'; import EmployerPost from './pages/Post/EmployerPost.vue';
import Admin from './pages/Admin/Admin.vue';
const routes = [
  { path: '/', component: LandingPage },
  { path: '/posts/:id', component: Post },
  { path: '/application/:id', component: ApplyingForm },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/employer/posts/:id', component: EmployerPost },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
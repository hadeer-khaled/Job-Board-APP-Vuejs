import { createMemoryHistory, createRouter } from 'vue-router'

import LandingPage from './pages/Landing page/LandingPage.vue';
import Post from './pages/Post/Post.vue';
import ApplyingForm from './pages/ApplyingForm/ApplyingForm.vue';
import EmployerPost from './pages/Post/EmployerPost.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/posts/:id', component: Post },
  { path: '/application/:id' , component: ApplyingForm},
  { path: '/employer/posts/:id' , component: EmployerPost },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;
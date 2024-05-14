import { createMemoryHistory, createRouter } from 'vue-router'

import LandingPage from './pages/Landing page/LandingPage.vue';
import Post from './pages/Post/Post.vue';
import ApplyingForm from './pages/ApplyingForm/ApplyingForm.vue';
import CandidateProfile from './pages/CandidateProfile/CandidateProfile.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/posts/:id', component: Post },
  { path: '/application/:id' , component: ApplyingForm},
  { path: '/candidate/profile', component: CandidateProfile},
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;
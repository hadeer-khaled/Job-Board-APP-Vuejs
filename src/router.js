import { createMemoryHistory, createRouter } from 'vue-router'

import LandingPage from './pages/Landing page/LandingPage.vue';
import Post from './pages/Post/Post.vue';
import Profile from './pages/Employer/Profile.vue';
import AddPost from './pages/Employer/AddPost.vue';



const routes = [
  { path: '/', component: LandingPage },
  { path: '/posts/:id', component: Post },
  { path: '/employer/profile', component: Profile },
  { path: '/employer/add-post', component: AddPost },
  // {
  //   path: 'employer/posts/:id',
  //   name: 'EmployerPostDetails',
  //   component: PostDetails,
  //   props: true 
  // }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;
import { createMemoryHistory, createRouter } from 'vue-router'

import LandingPage from './pages/Landing page/LandingPage.vue';
import Post from './pages/Post/Post.vue';
import EmployerProfile from './pages/Employer/Profile.vue';

import AddPost from './pages/Employer/AddPost.vue';
import ApplyingForm from './pages/ApplyingForm/ApplyingForm.vue';
import JobApplications from './pages/Employer/JobApplications.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/posts/:id', component: Post },
  { path: '/employer/profile', component: EmployerProfile },
  { path: '/employer/add-post', component: AddPost },
  // {
  //   path: 'employer/posts/:id',
  //   name: 'EmployerPostDetails',
  //   component: PostDetails,
  //   props: true 
  // }
  { path: '/application/:id' , component: ApplyingForm},
  { path: '/job-applications/:jobId', component: JobApplications },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;
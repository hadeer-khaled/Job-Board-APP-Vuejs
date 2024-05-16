import { createMemoryHistory, createRouter } from 'vue-router';
import LandingPage from './pages/Landing page/LandingPage.vue';
import Post from './pages/Post/Post.vue';
import EmployerProfile from './pages/Employer/Profile.vue';

import AddPost from './pages/Employer/AddPost.vue';
import ApplyingForm from './pages/ApplyingForm/ApplyingForm.vue';
import JobApplications from './pages/Employer/JobApplications.vue';
import Login from './pages/Login/Login.vue';
import Register from './pages/Register/Register.vue';import EmployerPost from './pages/Post/EmployerPost.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/posts/:id', component: Post },
  { path: '/employer/profile', component: EmployerProfile },
  { path: '/employer/add-post', component: AddPost },
  { path: '/application/:id' , component: ApplyingForm},
  { path: '/job-applications/:jobId', component: JobApplications },
  { path: '/application/:id', component: ApplyingForm },
  { path: '/login', component: Login } ,
  { path: '/register', component: Register },
  { path: '/employer/posts/:id' , component: EmployerPost },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
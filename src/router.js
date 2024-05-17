import { createMemoryHistory, createRouter } from 'vue-router';
import LandingPage from './pages/Landing page/LandingPage.vue';
import Post from './pages/Post/Post.vue';
import EmployerProfile from './pages/Employer/Profile.vue';

import AddPost from './pages/Employer/AddPost.vue';
import ApplyingForm from './pages/ApplyingForm/ApplyingForm.vue';
import JobApplications from './pages/Employer/JobApplications.vue';
import Login from './pages/Login/Login.vue';
import Verify from './pages/Verify/Verify.vue';
import Reset from './pages/Reset/Reset.vue';
import Register from './pages/Register/Register.vue';
import EmployerPost from './pages/Post/EmployerPost.vue';
import CandidateProfile from './pages/CandidateProfile/CandidateProfile.vue';
import Navbar from './components/Navbar.vue';
import CandidateApplications from './pages/CandidateApplictions/CandidateApplications.vue';

import AdminPosts from './pages/Admin/AdminPosts.vue';
import AdminPost from './pages/Post/AdminPost.vue';
import DeletePost from './pages/Employer/DeletedPosts.vue';
import Candidates from './components/AdminComponents/Candidates.vue';
import Candidate from './pages/Admin/CandidatePage.vue';
import EditPost from './pages/Employer/EditPost.vue';


const routes = [
  { path: '/', component: LandingPage },
  { path: '/posts/:id', component: Post },
  { path: '/employer/profile', component: EmployerProfile },
  { path: '/employer/add-post', component: AddPost },
  {path:'/employer/edit-post/:id', component: EditPost},
  { path: '/employer/deleted-posts', component: DeletePost },
  { path: '/application/:id' , component: ApplyingForm},
  { path: '/job-applications/:jobId', component: JobApplications },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/verify', component: Verify},
  { path: '/Reset', component: Reset},
  { path: '/employer/posts/:id' , component: EmployerPost },
  // Candidates
  { path: '/candidate/profile', component: CandidateProfile },
  { path: '/candidate/applications', component: CandidateApplications },
  { path: '/admin/posts', component: AdminPosts },
  { path: '/admin/users', component: Candidates},
  { path: '/admin/post/:id', component: AdminPost },
  { path:'/admin/candidates/:id', component: Candidate},
  
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
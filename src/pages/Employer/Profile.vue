<script setup>
import Navbar from '../../components/Navbar.vue';
import axios from 'axios';
</script>

<template>
  <div>
    <Navbar />

    <h1>Profile</h1>

    <div v-if="employer">
      <p>ID: {{ employer.id }}</p>
      <p>Company Name: {{ employer.company_name }}</p>
      <p>Name: {{ employer.name }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>

    <div v-if="jobs">
      <div v-for="job in jobs" :key="job.id" class="border border-2 my-3" @click="goToPostDetails(job.id)"> 

        <p>ID: {{ job.id }}</p>
        <p>job_title: {{ job.job_title }}</p>
        <p>location: {{ job.location }}</p>
        <p>qualifications: {{ job.qualifications }}</p>
        <p>responsibilities: {{ job.responsibilities }}</p>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>

  </div>
  
</template>

<script>
export default {
    data:()=>({
   
        employer: null,
        jobs: null
    
    }),
    methods: {
      goToPostDetails(postId) {
        this.$router.push({ name: 'EmployerPostDetails', params: { id: postId } });
      }
    },
    component:{ Navbar },
    mounted() 
    {
        axios
        .get(`${import.meta.env.VITE_BASE_URL}/employers/1`)
        .then(res => {
            this.employer = res.data.data
            this.jobs = res.data.data.posts
            console.log("employer: ", res.data.data)            
            console.log("jobs: " , res.data.data.posts)
            })
        .catch(err => console.log(err));
    }
};
</script>

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
  </div>
</template>

<script>
export default {
    data:()=>({
   
        employer: null
    
    }),
    component:{ Navbar },
    mounted() 
    {
        axios
        .get(`${import.meta.env.VITE_BASE_URL}/employers/1`)
        .then(res => {
            this.employer = res.data.data
            console.log(res.data.data)})
        .catch(err => console.log(err));
    }
};
</script>

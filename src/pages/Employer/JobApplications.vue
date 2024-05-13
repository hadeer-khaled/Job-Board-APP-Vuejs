<script setup>
import Navbar from '../../components/Navbar.vue';
import axios from 'axios';
</script>

<template>
  <div>
    <Navbar />

    <h1>applications</h1>

    <div v-if="applications">
      <div v-for="app in applications" :key="app.id" class="border border-2 my-3"> 

        <p>email: {{ app.email }}</p>
        <p>phone: {{ app.phone }}</p>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>

  </div>
  
</template>

<script>

import InputText from 'primevue/inputtext';

export default {
    data:()=>({  
        applications:null 
    }),
    methods: {
    
    },
    component:{ Navbar,InputText },
    mounted() 
    {
        axios
        .get(`${import.meta.env.VITE_BASE_URL}/job-applications/7`)
        .then(res => {
            this.applications = res.data.applications.data
            console.log("applications: ", res.data.applications.data)            
            })
        .catch(err => console.log(err));
    }
};
</script>

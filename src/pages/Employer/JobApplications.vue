<template>
  <div>
    <Navbar />

    <h1>applications</h1>

    <div v-if="applications">
      <div v-for="app in applications" :key="app.id" class="border border-2 my-3"> 

        <p>ID: {{ app.id }}</p>
        <p>email: {{ app.email }}</p>
        <p>phone: {{ app.phone }}</p>
        <div>
          <Button>See Resume</Button>
          <Button @click="acceptApplication(app.id)">Accept</Button>
          <Button @click="rejectApplication(app.id)">Reject</Button>
        </div>
      </div>

    </div>
    <div v-else>
      <p>Loading...</p>
    </div>



  </div>
  
</template>

<script>
import axios from 'axios';
import Navbar from '../../components/Navbar.vue';
import Button from 'primevue/button';

export default {
    data:()=>({  
        applications:null 
    }),
    methods: {
      acceptApplication(appId) {
      axios.put(`${import.meta.env.VITE_BASE_URL}/application-approval/${appId}`, { status: 'accepted' })
        .then((response) => {
           console.log('Response:', response.data.message);
        })
        .catch(error => {
          console.error('Error rejecting application:', error.response.data.message);
        });
    },
      rejectApplication(appId) {
      axios.put(`${import.meta.env.VITE_BASE_URL}/application-approval/${appId}`, { status: 'rejected' })
        .then((response) => {
           console.log('Response:', response.data.message);
        })
        .catch(error => {
          console.error('Error rejecting application:', error.response.data.message);
        });
    },
    fetchApplications() {
      axios.get(`${import.meta.env.VITE_BASE_URL}/job-applications/7`)
        .then(response => {
          this.applications = response.data.applications.data;
          console.log("applications: ", response.data.applications.data);
        })
        .catch(error => {
          console.error('Error fetching applications:', error);
        });
    }
    },
    components:{ Navbar,Button },
   mounted() {
    this.fetchApplications();
  }
};
</script>

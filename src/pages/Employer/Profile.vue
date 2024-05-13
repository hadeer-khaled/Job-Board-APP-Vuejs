<template>
  <div>
    <Navbar />
  
    <div v-if="employer" class="container">
      <Card style="width: 25rem; overflow: hidden">
        <template #content>
          <div class="d-flex flex-column align-items-center justify-content-center "> 
            <Avatar image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeRfV9n69zxuV4DQX7sYF7ql8ajx47wLioPeP-m4qFbHLkD9UNwfQSneRtkQEDnx-QxFs&usqp=CAU" 
                    class="custom-avatar mb-3" shape="circle" />

            <!-- Employer Details Form -->
            <form @submit.prevent="saveChanges" v-if="employer">
              <!-- Company Name -->
              <InputGroup class="mb-2" >
                <InputGroupAddon>
                  <i class="pi pi-briefcase"></i>
                </InputGroupAddon>
                <InputText v-model="employer.company_name" />
              </InputGroup> 

              <!-- Employer Name -->
              <InputGroup class="mb-2">
                <InputGroupAddon>
                  <i class="pi pi-user"></i>
                </InputGroupAddon>
                <InputText v-model="employer.name" />
                <!-- Display Validation Message -->
              </InputGroup>  

              <!-- Email -->
              <InputGroup class="mb-2" >
                <InputGroupAddon>
                  <i class="pi pi-at"></i>
                </InputGroupAddon>
                <InputText v-model="employer.email" />
                <!-- Display Validation Message -->
              </InputGroup>  

              <!-- Save Changes Button -->
              <Button type="submit" label="Save Changes" />
            </form>
          </div>
        </template>
      </Card>
      <a href="https://res.cloudinary.com/deqwn8wr6/image/upload/v1715534582/esh9vhuferm5mmeawows.pdf" target="_blank" > Resume</a>
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

import Button from 'primevue/button';

import Card from 'primevue/card';
import Navbar from '../../components/Navbar.vue';
import axios from 'axios';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';






export default {
   components:{ Button, Navbar ,InputGroup,InputText ,InputGroupAddon,Card,Avatar},
      data:()=>({
      employer: {
      company_name: 'test',
      company_logo: 'test',
      name: '',
      username: '',
      email: ''
    },jobs: null}),


  methods: {   
    saveChanges() {
      console.log('Updated Employer:', this.employer);
        axios
        .put(`${import.meta.env.VITE_BASE_URL}/employers/1`, this.employer)
        .then(res => {
            var employerData = res.data.data
             console.log('Returned Updated Employer:', employerData);
          
            })
        .catch(err => console.log(err.response.data));
    }
    
    },
   
    mounted() 
    {
        axios
        .get(`${import.meta.env.VITE_BASE_URL}/employers/1`)
        .then(res => {
            var employerData = res.data.data
            this.employer.company_name =employerData.company_name
            this.employer.company_logo =employerData.company_logo
            this.employer.name =employerData.name 
            this.employer.username =employerData.username
            this.employer.email =employerData.email
            this.jobs = res.data.data.posts
            console.log("employer: ", this.employer)            
            console.log("jobs: " , res.data.data.posts)
            })
        .catch(err => console.log(err));
    }
};
</script>
<style lang="stylus" scoped>
.custom-avatar {
  width: 200px !important; 
  height: 200px !important; 
}
.p-invalid {
  border-color: #dc3545;
}
</style>
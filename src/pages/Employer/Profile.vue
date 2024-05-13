<template>
  <div>
    <Navbar />
    <div class="p-3 row">
      <div v-if="employer" class="col-3" >
        <Card>
          <template #content>
            <div class="d-flex flex-column align-items-center justify-content-center "> 
              <Avatar image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeRfV9n69zxuV4DQX7sYF7ql8ajx47wLioPeP-m4qFbHLkD9UNwfQSneRtkQEDnx-QxFs&usqp=CAU" 
                      class="custom-avatar mb-3" shape="circle" />
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

      <div id="jobs" class="col-8" >
          <div v-if="jobs" >
            <Card v-for="job in jobs" :key="job.id" class="mb-2">
                <template #title>{{ job.job_title }}</template>
                <template #content>
                  <!-- <p>ID: {{ job.id }}</p> -->
                  <p>job_title: {{ job.job_title }}</p>
                  <p>location: {{ job.location }}</p>
                  <p>qualifications: {{ job.qualifications }}</p>
                  <p>responsibilities: {{ job.responsibilities }}</p>
                </template>
            </Card> 
          </div>

          <div v-else>
            <p>Loading...</p>
          </div>

           <nav class="mx-5" aria-label="Page navigation example">
            <ul class="pagination">

            <!-- Prev -->
            <li :class="{ 'page-item': true, disabled: !prev }">
            <a class="page-link" @click="changePage(prev)" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
            </li>

            <!-- Pages -->
            <li v-for="link in paginationLinks" :key="link.label" :class="{ 'page-item': true, active: link.active }">
            <a v-if="!link.active" @click="changePage(link.url)" class="page-link">{{ link.label }}</a>
            <span class="page-link" v-else>{{ link.label }}</span>
            </li>

            <!-- Next -->
            <li :class="{ 'page-item': true, disabled: !next }">
            <a class="page-link" @click="changePage(next)" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
            </li>
             </ul>
           </nav>
       </div>

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
import Paginator from 'primevue/paginator';

var static_employer_id = 1;

export default {
   components:{ Button, Navbar ,InputGroup,InputText ,InputGroupAddon,Card,Avatar,Paginator},
      data:()=>({
      employer: {
      company_name: '',
      company_logo: '',
      name: '',
      username: '',
      email: '',
      paginationLinks: {},
      next: null,
      prev: null,
    }
    ,jobs: null}),


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
    },
    changePage(pageUrl) 
    {
        if(pageUrl)
        {
            this.fetchJobs(pageUrl);
        }
    },
    fetchJobs(pageUrl = null) {
        const url = pageUrl || `${import.meta.env.VITE_BASE_URL}/jobs/employer/${static_employer_id}`;
        axios
        .get(url)
        .then(res => {
            this.jobs = res.data.jobs.data
            this.paginationLinks = res.data.jobs.links;
            this.next = res.data.jobs.next_page_url;
            this.prev = res.data.jobs.prev_page_url;
            console.log("jobs: " , res.data.jobs.data)
            })
        .catch(err => console.log(err));
      }
    },
   
    mounted() 
    {
        axios
        .get(`${import.meta.env.VITE_BASE_URL}/employers/${static_employer_id}`)
        .then(res => {
            var employerData = res.data.data
            this.employer.company_name =employerData.company_name
            this.employer.company_logo =employerData.company_logo
            this.employer.name =employerData.name 
            this.employer.username =employerData.username
            this.employer.email =employerData.email
            console.log("employer: ", this.employer)            
            })
        .catch(err => console.log(err));

       this.fetchJobs();
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
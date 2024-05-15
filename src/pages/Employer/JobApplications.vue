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
          <Button>         
            <a style="color: white; text-decoration: none;" href="https://res.cloudinary.com/deqwn8wr6/image/upload/v1715534582/esh9vhuferm5mmeawows.pdf" target="_blank" > See Resume</a>
        </Button>
          <Button @click="acceptApplication(app.id)">Accept</Button>
          <Button @click="rejectApplication(app.id)">Reject</Button>
        </div>
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
    <div v-else>
      <p>Loading...</p>
    </div>



  </div>
  
</template>

<script>
import axios from 'axios';
import Navbar from '../../components/Navbar.vue';
import Button from 'primevue/button';
import Paginator from 'primevue/paginator';


export default {
    data:()=>({  
       static_job_id:null,
        applications:null,
        paginationLinks: {},
        next: null,
        prev: null,
      
    }),
    methods: {
   
      acceptApplication(appId)
       {axios.put(`${import.meta.env.VITE_BASE_URL}/application-approval/${appId}`, { status: 'accepted' })
        .then((response) => {
           console.log('Response:', response.data.message);
        })
        .catch(error => {
          console.error('Error rejecting application:', error.response.data.message);
        });},
      
      
      rejectApplication(appId) {
      axios.put(`${import.meta.env.VITE_BASE_URL}/application-approval/${appId}`, { status: 'rejected' })
        .then((response) => {
           console.log('Response:', response.data.message);
        })
        .catch(error => {
          console.error('Error rejecting application:', error.response.data.message);
        });
    },
    fetchApplications(pageUrl = null) {
      const url = pageUrl || `${import.meta.env.VITE_BASE_URL}/job-applications/${this.static_job_id}`
      axios.get(url)
        .then(response => {
          this.applications = response.data.applications.data;
          this.paginationLinks = response.data.applications.links;
          this.paginationLinks.pop(this.paginationLinks.length-1)
          this.paginationLinks.shift()
          this.next = response.data.applications.next_page_url;
          this.prev = response.data.applications.prev_page_url;
          console.log("applications: ", response.data.applications.data);
          console.log("totalApplications: ",this.totalApplications );
        })
        .catch(error => {
          console.error('Error fetching applications:', error);
        });
    },
     changePage(pageUrl) 
        {
            if(pageUrl)
            {
                this.fetchApplications(pageUrl);
            }
        },
    },
    components:{ Navbar,Button,Paginator },
   mounted() {
    this.static_job_id = this.$route.params.jobId
    this.fetchApplications();
  }
};
</script>

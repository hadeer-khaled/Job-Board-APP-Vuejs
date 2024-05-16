<template>
  <div class="wrapper">
    <Navbar />


    <div v-if="applications">
        <!-- <div v-for="app in applications" :key="app.id" class="border border-2 my-3"> 

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
        </div> -->
        <div v-if="applications.length !=0">
            <div class="card">
              <DataTable :value="applications" stripedRows tableStyle="min-width: 50rem">
                  <Column field="id" header="id"></Column>
                  <Column field="email" header="email"></Column>
                  <Column field="phone" header="phone"></Column>
                  <Column header="Status">
                      <template #body="slotProps">
                          <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data.status)" />
                      </template>
                  </Column>
                  <Column field="candidate.education" header="education"></Column>
                  <Column field="candidate.experience_level" header="experience_level"></Column>
                  <Column field="candidate.faculty" header="faculty"></Column>
                  <Column  header="github">
                    <template #body="slotProps">
                      <a :href="slotProps.data.candidate.github" target="_blank" rel="noopener">
                          <i class="pi pi-github" style="color: black ; font-size: 1.5rem" ></i>
                      </a>
                    </template>
                  </Column>
                  <Column  header="linkedin">
                    <template #body="slotProps">
                      <a :href="slotProps.data.candidate.linkedin" target="_blank" rel="noopener">
                          <i class="pi pi-linkedin"  style="font-size: 1.5rem"></i>
                      </a>
                    </template>
                  </Column>
                  <Column  header="resume">
                    <template #body="slotProps">
                      <a :href="slotProps.data.candidate.resume" target="_blank" rel="noopener">
                          <i class="pi pi-file-pdf"  style="color: #AD0B00 ; font-size: 1.5rem"></i>
                      </a>
                    </template>
                  </Column>
                  <Column header="Accept">
                      <template #body="slotProps">
                        <Button icon="pi pi-check" @click="acceptApplication(slotProps.data.id)" text rounded aria-label="Filter" />               
                      </template>
                  </Column>
                  <Column header="Reject">
                      <template #body="slotProps">
                        <Button icon="pi pi-times" @click="rejectApplication(slotProps.data.id)" severity="danger" text rounded aria-label="Cancel" />
                      </template>
                  </Column>
              </DataTable>  
            </div><!-- end card -->

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
            <Message severity="contrast">There no applications for this job.</Message>
        </div>
          

    
    </div> <!-- end if applications -->
    
    <div v-else>
      <DataTable :value="[1,2,3,4]">
          <Column field="id" header="id">
              <template #body>
                  <Skeleton></Skeleton>
              </template>
          </Column>
          <Column field="name" header="Name">
              <template #body>
                  <Skeleton></Skeleton>
              </template>
          </Column>
          <Column field="email" header="Email">
              <template #body>
                  <Skeleton></Skeleton>
              </template>
          </Column>
      </DataTable>
    </div>


    



  </div><!-- wrapper -->
</template>

<script>
import axiosInstance from '../../axios/index';
import Navbar from '../../components/Navbar.vue';
import Button from 'primevue/button';
import Paginator from 'primevue/paginator';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Skeleton from 'primevue/skeleton';
import Tag from 'primevue/tag';

import Message from 'primevue/message';


export default {
    data:()=>({  
       static_job_id:null,
        applications:null,
        paginationLinks: {},
        next: null,
        prev: null,   
    }),
    methods: {
    getSeverity(status) {
            switch (status) {
                case 'accecpted':
                    return 'success';

                case 'pending':
                    return 'warning';

                case 'rejected':
                    return 'danger';

                default:
                    return null;
            }
        },
      acceptApplication(appId)
       {console.log(appId)
        axiosInstance.put(`${import.meta.env.VITE_BASE_URL}/application-approval/${appId}`, { status: 'accepted' })
        .then((response) => {
           console.log('Response:', response.data.message);
        })
        .catch(error => {
          console.error('Error rejecting application:', error.response.data.message);
        });},
      
      
      rejectApplication(appId) {
      axiosInstance.put(`${import.meta.env.VITE_BASE_URL}/application-approval/${appId}`, { status: 'rejected' })
        .then((response) => {
           console.log('Response:', response.data.message);
        })
        .catch(error => {
          console.error('Error rejecting application:', error.response.data.message);
        });
    },
      fetchApplications(pageUrl = null) {
        const url = pageUrl || `${import.meta.env.VITE_BASE_URL}/job-applications/${this.static_job_id}`
        axiosInstance.get(url)
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
    components:{ Navbar,Button,Paginator,DataTable,Column , Tag, Skeleton, Message},
   mounted() {
    this.static_job_id = this.$route.params.jobId
    this.fetchApplications();
  }
};
</script>

<template>
  <div>
    <Navbar />
    <div class="p-3 row">
      <div v-if="employer" class="col-3" >

        <Card class="mb-2" >
          <template #content>
            <div class="d-flex flex-column align-items-center justify-content-center "> 
              <Avatar image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeRfV9n69zxuV4DQX7sYF7ql8ajx47wLioPeP-m4qFbHLkD9UNwfQSneRtkQEDnx-QxFs&usqp=CAU" 
                      class="custom-avatar mb-3" shape="circle" />
            
              <form @submit.prevent="saveChanges" v-if="employer" class="d-flex flex-column align-items-center justify-content-center ">
                <!-- Company Name -->
                <InputGroup class="mb-2" >
                  <InputGroupAddon>
                    <i class="pi pi-briefcase"></i>
                  </InputGroupAddon>
                  <InputText v-model="employer.company_name" />
                  <span v-if = "v$.employer.company_name.$error">
                    {{v$.employer.company_name.$errors[0].$message}}
                  </span>
                </InputGroup> 

                <!-- Employer Name -->
                <InputGroup class="mb-2">
                  <InputGroupAddon>
                    <i class="pi pi-user"></i>
                  </InputGroupAddon>
                  <InputText v-model="employer.name" />
                   <span v-if = "v$.employer.name.$error">
                    {{v$.employer.name.$errors[0].$message}}
                  </span>
                </InputGroup>  

                <!-- Email -->
                <InputGroup class="mb-2" >
                  <InputGroupAddon>
                    <i class="pi pi-at"></i>
                  </InputGroupAddon>
                  <InputText v-model="employer.email" />
                   <span v-if = "v$.employer.email.$error">
                    {{v$.employer.email.$errors[0].$message}}
                  </span>
                </InputGroup>  

                <!-- Save Changes Button -->
                <Button class="mt-3" type="submit" label="Save Changes" icon="pi pi-check" iconPos="right"  severity="success"   />

              </form>
            </div>

          </template>
        </Card>
               
        <Card>
          <template #content>
            <div class="d-flex align-items-center justify-content-around "> 
          
              <router-link :to="'/employer/add-post'">
                    <Button  label="Post New Job"  severity="info"/>
              </router-link>

              <router-link :to="'/employer/add-post'">
                    <Button label="Deleted Jobs"  severity="contrast" />
              </router-link>
            </div>

          </template>
        </Card>
<!-- 
        <div>
            <p class="mx-3 fw-bold my-3">City</p>
            <select class="form-select w-50 mx-3" name="city" @change="getJobs">
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
        </div> -->
      </div>

      <div v-else>
        <p>Loading...</p>
      </div>

      <div id="jobs" class="col-8" >
          <div v-if="jobs" > 
            <PostCard  v-for="job in jobs" :key="job.id" class="mb-2"
              :job_title="job.job_title"
              :location="job.location"
              :application_deadline="job.application_deadline"
              :created_at="job.created_at"
              :logo="employer.company_logo "
              :work_type="job.work_type"
              :start_salary="job.start_salary"
              :end_salary="job.end_salary"
              :post_id="job.id"
              :company="employer.company_name"
              :route="`/posts/${job.id}`"
              />
            
     
          </div>

          <div v-else>
            <p>Loading...</p>
          </div>
          <MyPaginator :paginationData="{ links: paginationLinks, next: next, prev: prev }" @page-change="handlePageChange" />
                 
       </div>

      </div>
  
  </div>
</template>


<script>
import Button from 'primevue/button';
import Card from 'primevue/card';
import Navbar from '../../components/Navbar.vue';
import MyPaginator from '../../components/MyPaginator.vue';
import PostCard from '../../components/PostComponents/PostCard.vue';
import axios from 'axios';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Paginator from 'primevue/paginator';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import { useVuelidate } from '@vuelidate/core'
import { required, email , minLength} from '@vuelidate/validators'

import Swal from 'sweetalert2'

var static_employer_id = 1;

export default {
   components:{ Button, Navbar ,InputGroup,InputText ,InputGroupAddon,Card,Avatar,Paginator , 
   TabView , TabPanel ,MyPaginator , PostCard},
      data:()=>(
        {
          v$:useVuelidate(),
          employer: {
              company_name: '',
              company_logo: '',
              name: '',
              username: '',
              email: '',
              user_id:''

          }, 
           paginationLinks: {},
              next: null,
              prev: null, 
          jobs: null
          }),

         validations(){
          return{
            employer: {
              company_name: {required},
              name:  {required , minLength:minLength(2)},
              username:  {required},
              email:  {required,email},
            }
          }
        },
      methods: {   
        saveChanges() {
          this.v$.$validate();
          if(!this.v$.$error){
            axios
            .put(`${import.meta.env.VITE_BASE_URL}/employers/${static_employer_id}`, this.employer)
            .then(res => {
                var employerData = res.data.data
                console.log('Returned Updated Employer:', employerData);
                Swal.fire({
                  icon: "success",
                  text: "Your data have been updated successfully!",
                  showConfirmButton: false,
                  timer: 1500
                });
                })
            .catch(err => console.log(err.response));

          }else{
              console.log("Validation Not Passed")
              console.log("v$" , this.v$)
          }
            
        },
        changePage(pageUrl) {
            if(pageUrl)
            {
                this.fetchJobs(pageUrl);
            }
        },
        handlePageChange(url) {
          console.log('Page changed to:', url);
          this.fetchJobs(url);
        },
        fetchJobs(pageUrl = null) {
            const url = pageUrl || `${import.meta.env.VITE_BASE_URL}/jobs/employer/${static_employer_id}`;
            axios
            .get(url)
            .then(res => {
                this.jobs = res.data.jobs.data
                console.log(" this.jobs " ,  this.jobs )
                this.paginationLinks = res.data.jobs.links;
                this.paginationLinks.pop(this.paginationLinks.length-1)
                this.paginationLinks.shift()
                this.next = res.data.jobs.next_page_url;
                this.prev = res.data.jobs.prev_page_url;
                console.log("jobs: " , res.data.jobs.data)
                })
            .catch(err => console.log(err));
          },

          fetchEmployerData(){
            axios
            .get(`${import.meta.env.VITE_BASE_URL}/employers/${static_employer_id}`)
            .then(res => {
                var employerData = res.data.data
                this.employer.company_name =employerData.company_name
                this.employer.company_logo =employerData.company_logo
                this.employer.name =employerData.name 
                this.employer.username =employerData.username
                this.employer.email =employerData.email
                this.employer.user_id=employerData.user_id
                console.log("employer: ", this.employer)            
                })
            .catch(err => console.log(err));
          },

          // getJobs(e){
      
          //   const status = e.target.value;
          //   const url = `${import.meta.env.VITE_BASE_URL}/jobs/employer/${static_employer_id}?status=${status}`;
      
          //   axios
          //   .get(url)
          //   .then(res => {
          //       this.jobs = res.data.jobs.data;
          //       this.paginationLinks = res.data.jobs.links;
          //       this.next = res.data.jobs.next_page_url+`?status=${status}`;
          //       this.prev = res.data.jobs.prev_page_url+`?status=${status}`;
          //       console.log("filtered: " , res.data.jobs.data)
          //       })
          //   .catch(err => console.log(err));
            
          // }


      },
      mounted() {
        this.fetchEmployerData();
        

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

button {
    border-radius: 50px !important ;
}
.p-card .p-card-body {
     padding: 0px !important; 
}
</style>
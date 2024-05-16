<template>
  <div class="wrapper">
    <Navbar />
    <div class="p-3 row">
      <div v-if="employer" class="col-3" >

        <Card class="mb-2" >
          <template #content>
            <div class="d-flex flex-column align-items-center justify-content-center "> 
              <div class="position-relative">
              <Avatar :image="company_logo" 
                      class="custom-avatar mb-3" shape="circle" />
                      <form @submit.prevent="updateImage" enctype="multipart/form-data" class="position-absolute" style="width:fit-content ; bottom: 25px; right: 0px;">
                       
                                <!-- <div>
                                 <FileUpload
                                    mode="basic"
                                    name="logo"
                                    :auto="true" 
                                    customUpload @uploader="customUploader"
                                    accept="image/*"
                                  >
                                  </FileUpload>
                                </div> -->

                                <FileUpload  name="logo"
                                :auto="true" 
                                customUpload  
                                @uploader="customUploader"
                                accept="image/*" :maxFileSize="1000000" 
                                :pt="{ content : 'my-content' , buttonbar: 'my-buttonbar' }"  >
                                      <template  #header="{ chooseCallback }" :pt="{  }">
                                              <Button @click="chooseCallback()" icon="pi pi-pencil" rounded severity="success" ></Button>
                                      </template>
                                  </FileUpload>

                        <!-- <input type="file" ref="file" @change="selectImage" /> -->
                        <!-- <i class="pi pi-pencil"></i> -->
                        <!-- <Button type="submit"  label="Update Image" icon="pi pi-check" iconPos="right"  severity="success"   /> -->

                    </form> 


              </div>
                         
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

              <router-link :to="'/employer/deleted-posts'">
                    <Button label="Deleted Jobs"  severity="contrast" />
              </router-link>
            </div>
            <div class="d-flex align-items-center justify-content-around mt-4">
                <div class="d-flex align-items-center">        
                    <p class="mx-1 fw-bold my-3">Job Status</p>
                    <select class="form-select w-50 mx-3" name="status" v-model="selectedJobStatus">
                      <option value="all">All</option>
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                </div>
                <div>
                    <Button @click="getJobs()"  label="Post New Job" severity="secondary">Filter</button>
                </div>
            </div> 
            
          </template>
        </Card>

      </div> <!-- end if employer -->

      <div v-else class="col-3">
          <Card class="mb-2" >
             <template #content>
                <Skeleton shape="circle" size="4rem" class="mr-2 mb-2"></Skeleton>
                <Skeleton height="1rem" class="mb-2" borderRadius="16px"></Skeleton>
                <Skeleton height="1rem" class="mb-2" borderRadius="16px"></Skeleton>
                <Skeleton height="1rem" class="mb-2" borderRadius="16px"></Skeleton>
             </template>
           </Card>
      </div> <!-- else employer -->

      <div id="jobs" class="col-8" >
          <div v-if="jobs" > 
              <div v-if="jobs.length !=0">
                <PostCard  v-for="job in jobs" :key="job.id" class="mb-2"
                  :job_title="job.job_title"
                  :location="job.location"
                  :application_deadline="job.application_deadline"
                  :created_at="job.created_at"
                  :logo="company_logo "
                  :work_type="job.work_type"
                  :start_salary="job.start_salary"
                  :end_salary="job.end_salary"
                  :post_id="job.id"
                  :company="employer.company_name"
                  :status="job.status"
                  :route="`/posts/${job.id}`
                  "/>
                <!-- <MyPaginator :paginationData="{ links: paginationLinks, next: next, prev: prev }" @page-change="handlePageChange" />  -->
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
                  <Message severity="contrast">You don't have any jobs for now.</Message>
              </div>
          </div><!-- if jobs -->

          <div v-else>
            <div class="card">
              <div class="border-round border-1 surface-border p-4 surface-card">
                  <div class="flex mb-3">
                      <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                      <div>
                          <Skeleton width="10rem" class="mb-2"></Skeleton>
                          <Skeleton width="5rem" class="mb-2"></Skeleton>
                          <Skeleton height=".5rem"></Skeleton>
                      </div>
                  </div>
                  <Skeleton width="100%" height="150px"></Skeleton>
                  <div class="flex justify-content-between mt-3">
                      <Skeleton width="4rem" height="2rem"></Skeleton>
                      <Skeleton width="4rem" height="2rem"></Skeleton>
                  </div>
              </div>

            </div>
          </div> <!-- else  jobs -->
                 
      </div> <!-- jobs -->

    </div> <!-- row -->
  
  </div> <!-- wrapper -->
</template>


<script>
import Button from 'primevue/button';
import Card from 'primevue/card';
import Navbar from '../../components/Navbar.vue';
import MyPaginator from '../../components/MyPaginator.vue';
import PostCard from '../../components/PostComponents/PostCard.vue';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import InputSwitch from 'primevue/inputswitch'
import Avatar from 'primevue/avatar';
import Message from 'primevue/message';
import Skeleton from 'primevue/skeleton';
import Paginator from 'primevue/paginator';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import axiosInstance from '../../axios/index';

import { useUserStore } from '../../store/modules/UserPinia';


import FileUpload from 'primevue/fileupload';

import { useVuelidate } from '@vuelidate/core'
import { required, email , minLength} from '@vuelidate/validators'

import Swal from 'sweetalert2'

var static_employer_id = 1;

export default {
   components:{ Button, Navbar ,InputGroup,InputText ,InputGroupAddon,Card,Avatar,Paginator , 
   TabView , TabPanel ,MyPaginator , PostCard,Message,Skeleton,FileUpload,InputSwitch},
      data:()=>(
        {
          v$:useVuelidate(),
          employer: {
              company_name: '',
              name: '',
              username: '',
              email: '',
              user_id:''
          },
          company_logo:"",
          file:"", 
          selectedJobStatus:"all",
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
        customUploader(event) {
          const file = event.files[0];
          console.log(file)
          const formData = new FormData()
          formData.append('logo', file)
          formData.append('_method', "put")
          axiosInstance
            .post(`${import.meta.env.VITE_BASE_URL}/employers/${static_employer_id}`, formData)
            .then(res => {
                console.log('res', res);
                this.fetchEmployerData();
                Swal.fire({
                  icon: "success",
                  text: "Your Image have been updated successfully!",
                  showConfirmButton: false,
                  timer: 1500
                });
                })
            .catch(err => console.log(err.response));
        },
        
        // selectImage(){
        //   const selectedFile = this.$refs.file.files[0];
        //   this.file = selectedFile;
        //   console.log("selectedFile",selectedFile)
        // }, 

        // updateImage(){
        //   const formData = new FormData()
        //   formData.append('logo', this.file)
        //   formData.append('_method', "put")
        //   axiosInstance
        //     .post(`${import.meta.env.VITE_BASE_URL}/employers/${static_employer_id}`, formData)
        //     .then(res => {
        //         console.log('res', res);
        //         Swal.fire({
        //           icon: "success",
        //           text: "Your Image have been updated successfully!",
        //           showConfirmButton: false,
        //           timer: 1500
        //         });
        //         })
        //     .catch(err => console.log(err.response));
        
        // },
        saveChanges() {
          this.v$.$validate();
          if(!this.v$.$error){
            axiosInstance
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
                // this.fetchJobs(pageUrl);
                this.getJobs(pageUrl);
            }
        },
        handlePageChange(url) {
          console.log('Page changed to:', url);
          // this.fetchJobs(url);
          // this.getJobs(url);
        },
        // fetchJobs(pageUrl = null) {
        //     const url = pageUrl || `${import.meta.env.VITE_BASE_URL}/jobs/employer/${static_employer_id}`;
        //     axiosInstance
        //     .get(url)
        //     .then(res => {
        //         this.jobs = res.data.jobs.data
        //         console.log(" this.jobs " ,  this.jobs )
        //         this.paginationLinks = res.data.jobs.links;
        //         this.paginationLinks.pop(this.paginationLinks.length-1)
        //         this.paginationLinks.shift()
        //         this.next = res.data.jobs.next_page_url;
        //         this.prev = res.data.jobs.prev_page_url;
        //         console.log("jobs: " , res.data.jobs.data)
        //         })
        //     .catch(err => console.log(err));
        //   },

        fetchEmployerData(){
            axiosInstance
            .get(`${import.meta.env.VITE_BASE_URL}/employers/${static_employer_id}`)
            .then(res => {
                var employerData = res.data.data
                this.employer.company_name =employerData.company_name
                this.company_logo =employerData.company_logo
                this.employer.name =employerData.name 
                this.employer.username =employerData.username
                this.employer.email =employerData.email
                this.employer.user_id=employerData.user_id
                console.log("employer: ", this.employer)            
                })
            .catch(err => console.log(err));
          },

        getJobs(pageUrl = null){
          console.log(pageUrl)
           const queryParams = {};
           queryParams.status = this.selectedJobStatus;
           console.log(queryParams)
           const url = pageUrl || `${import.meta.env.VITE_BASE_URL}/jobs/employer/${static_employer_id}`;
            console.log(url)
            axiosInstance
            .get(url ,  {params: queryParams})
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
            
          }


      },
      mounted() {
        this.fetchEmployerData();
        this.getJobs()

        // this.fetchJobs();
      }
};

</script>
<style  scoped>

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

::v-deep  .my-buttonbar{  
      width: fit-content;
      padding: 0px !important;
      border: 0px;
      background-color: transparent;
}
::v-deep  .my-content{  
     display: none;
}

</style>
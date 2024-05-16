<template>

<div class="p-3 row">
    
<div id="posts" class="col-2" ></div>
<div id="posts" class="col-8" >
          <div v-if="posts" > 
              <div v-if="posts.length !=0">
                <template  v-for="job in posts" :key="job.id">
                    <PostCard   class="mb-2"
                  :job_title="job.job_title"
                  :location="job.location"
                  :application_deadline="job.application_deadline"
                  :created_at="job.created_at"
                  :logo="company_logo "
                  :work_type="job.work_type"
                  :start_salary="job.start_salary"
                  :end_salary="job.end_salary"
                  :post_id="job.id"
                  :company="company_name"
                  :route="`/posts/${job.id}`
                  ">
                  <template v-slot:Restore>
                    <Button label="Restore" severity="success" raised  @click="restorePost(job.id)"/>
                  </template>
                  </PostCard>
                </template>
    
                <MyPaginator :paginationData="{ links: paginationLinks, next: next, prev: prev }" @page-change="handlePageChange" /> 
              </div>
              <div v-else>
                  <Message severity="contrast">You don't have any posts for now.</Message>
              </div>
          </div><!-- if posts -->

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
          </div> <!-- else  posts -->
                 
      </div> 
      </div>
</template>

<script>
import axios from 'axios';
import PostCard from '../../components/PostComponents/PostCard.vue';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import {useToast } from "primevue/usetoast";
const toast = useToast();   

export default {
    
    data() {
        return {
            posts: [],
            page: 1,
            perPage: 10
        }    
    },

    components: { PostCard,
    Button,
    Toast
     },
    mounted() {

        this.getDeletedPosts();

    }

    ,methods: {
        getDeletedPosts(){
            axios
        .get(`${import.meta.env.VITE_BASE_URL}/posts/deleted`, {
                params: { perPage: this.perPage, page: this.page }
            })
        .then(res => {
            this.posts = res.data.data;
            console.log("deleted posts: " , this.posts)
        })
        .catch(err => console.log(err));
        },

        restorePost(id){
            axios
        .put(`${import.meta.env.VITE_BASE_URL}/posts/restore/${id}`)
        .then(res => {
            const message = res.data.message
            toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
            this.getDeletedPosts();
        })
        .catch(err => console.log(err));
        }


    },




}
</script>
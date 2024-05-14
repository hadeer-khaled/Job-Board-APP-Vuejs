
<script setup>
import PostHeader from '../../components/PostComponents/PostHeader.vue';
import PostDescription from '../../components/PostComponents/PostDescription.vue';
import Navbar from '../../components/Navbar.vue';
import EmployerPost from '../../pages/Post/EmployerPost.vue';
import axios from 'axios';
</script>

<template>

    <div>

    <Navbar/>
    <div class="container p-5">

    <PostHeader 
    :job_title="data.job_title"
    :location="data.location"
    :company="company"
    :application_deadline="data.application_deadline"
    :created_at="data.created_at"
    :start_salary="data.start_salary"
    :end_salary="data.end_salary"
    :post_id="data.id"
    :work_type="data.work_type"
    :skills="data.skills"
    >
    

    <template v-if="false" v-slot:apply> 
        <RouterLink :class="{disabled:passedDeadline}" class="text-decoration-none btn btn-primary" :to="`/application/${data.post_id}`">Apply</RouterLink>
    </template>

    <template v-slot:seeApplications> 
       <router-link :to="'/job-applications/' + data.id">
                    <Button label="View Job Applications" />
        </router-link>
    </template>
    
    </PostHeader>

    <PostDescription 
    title="Job Description"
    :content="data.description"/>

    <PostDescription
    title="Responibilities"
    :content="data.responsibilities"/>

    <PostDescription
    title="Qualifications"
    :content="data.qualifications"/>


    </div>

    </div>
</template>

<script>
import Button from 'primevue/button';

export default {
   components:{Button},
   data(){
        return {
        data: [],
        company: ''    
    }
        },
    mounted() {
        axios
        .get(`http://localhost:8000/api/posts/${this.$route.params.id}`)
        .then(response => { 
            this.data = response.data.data;
            this.company = response.data.data.employer.company_name;
        })
        .catch(err => console.log(err));
    },
    methods(){
        passedDeadline()
        {
            if(this.data.created_at)
            {
                const currentDate = new Date()
                const date = new Date(this.data.created_at)
                console.log(currentDate > date)
                return currentDate > date ;
            }
        }
    }
    }

</script>
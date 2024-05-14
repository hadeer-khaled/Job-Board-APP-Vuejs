
<script setup>
import PostHeader from '../../components/PostComponents/PostHeader.vue';
import PostDescription from '../../components/PostComponents/PostDescription.vue';
import Navbar from '../../components/Navbar.vue';
import EmployerPost from '../../pages/Post/EmployerPost.vue';
import axios from 'axios';
</script>

<template>

    <div class="container">
    <Navbar/>
    
    <RouterLink :to="`/employer/posts/${$route.params.id}`">Employer</RouterLink>

    <PostHeader 
    :job_title="data.job_title"
    :location="data.location"
    :application_deadline="data.application_deadline"
    :created_at="data.created_at"
    :start_salary="data.start_salary"
    :end_salary="data.end_salary"
    :post_id="data.id"
    :work_type="data.work_type"
    :skills="data.skills"
    />

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

</template>

<script>

export default {
    data(){
        return {
        data: []     
    }
        },
    mounted() {
        axios
        .get(`http://localhost:8000/api/posts/${this.$route.params.id}`)
        .then(response => { 
            this.data = response.data.data;
        })
        .catch(err => console.log(err));
    }
    }

</script>
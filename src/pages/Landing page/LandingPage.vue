<script setup>
import Navbar from '../../components/Navbar.vue';
import PostCard from '../../components/PostComponents/PostCard.vue';
import axios from 'axios';
</script>

<template>
    <div>
    <!-- Navbar -->
    <Navbar />

    
    <!-- Title -->
    <h1>
    Jobs    
    </h1>

    <div class="row">
    <div class="col-3">
        
    </div>

    <div class="col-9">
        
    <div v-for="post in posts" :key="post.id" class="border border-2 my-3 mx-5">
    
    <PostCard 
    :job_title="post.job_title"
    :location="post.location"
    :application_deadline="post.application_deadline"
    :created_at="post.created_at"
    :work_type="post.work_type"
    :start_salary="post.start_salary"
    :end_salary="post.end_salary"
    :post_id="post.id"
    :company="post.employer.company_name"
    />

    </div>
    </div>

    </div>

    </div>
</template>

<script>
export default {
    data() {
    return {
        posts: null 
    }
    },
    mounted() 
    {
        axios
        .get(`${import.meta.env.VITE_BASE_URL}/home/posts`)
        .then(res => this.posts = res.data.data)
        .catch(err => console.log(err));
    }
};
</script>

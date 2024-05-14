<script setup>
import { RouterLink } from 'vue-router';
import Navbar from '../../components/Navbar.vue';
import PostCard from '../../components/PostComponents/PostCard.vue';
import axios from 'axios';
</script>

<template>
    <div>
    <!-- Navbar -->
    <Navbar />

    

    <div class="row">
    
    <div class="col-3 text-center ">
    
    <!-- Title -->
    <h3 class="m-auto">
    Filters   
    </h3>

    <!-- Work Place -->
    <p class="fw-bold my-3">Work Place</p>
    <div class="px-5">

    <div class="form-check-reverse mx-5">
        <input class="form-check-input" name="g1" type="checkbox" value="remote" v-model="work_type" />
        <label class="form-check-label" for="flexCheckDefault">Remote</label>
    </div>

    <div class="form-check-reverse mx-5">
        <input class="form-check-input" name="g1" type="checkbox" value="on-site" v-model="work_type"/>
        <label class="form-check-label" for="flexCheckDefault">On-site</label>
    </div>    

    <div class="form-check-reverse mx-5">
        <input class="form-check-input" name="g1" type="checkbox" value="hybrid" v-model="work_type"/>
        <label class="form-check-label" for="flexCheckDefault">Hybrid</label>
    </div>
    </div>
    <!-- City -->
    
    <p class="fw-bold my-3">City</p>
    
    <!-- Salary -->

    <p class="fw-bold my-3">Salary</p>

    <input type="text" class="form-control m-auto w-50" placeholder="salary" name="salary" v-model="salary"/>

    <button class="btn btn-primary my-5" @click="applyFilters">Filter</button>
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
export default {
    data() {
    return {
        posts: [],
        full_res: null,
        paginationLinks: {},
        next: null,
        prev: null,
        work_type: [],
        salary:'',
    };
    },
    mounted() 
    {
        if(this.work_type.length === 0 && !this.salary)
        {
            this.fetchPosts();
        }
        else
        {
            this.applyFilters();
        }

    },
    methods: {
        fetchPosts(pageUrl = null)
        {
            const url = pageUrl || `${import.meta.env.VITE_BASE_URL}/home/posts`
            axios
            .get(url)
            .then(res => {
                this.posts = res.data.data;
                this.paginationLinks = res.data.links;
                this.next = res.data.next_page_url;
                this.prev = res.data.prev_page_url;
                this.full_res = res.data;
            })
            .catch(err => console.log(err));
        },
        changePage(pageUrl) 
        {
            if(pageUrl)
            {
                this.fetchPosts(pageUrl);
            }
        },
        applyFilters()
        {
            const queryParams = {};
            
            if (this.work_type && this.work_type.length > 0) {
                queryParams.work_type = this.work_type.join(',');
            }
            
            if (this.salary !== '') {
                queryParams.salary = this.salary;
            }
            
            console.log(queryParams);
            
            let url = import.meta.env.VITE_BASE_URL;

            axios
            .get(url+'/posts' , {params: queryParams})
            .then((res) => {
                this.posts = res.data.data;
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
};
</script>

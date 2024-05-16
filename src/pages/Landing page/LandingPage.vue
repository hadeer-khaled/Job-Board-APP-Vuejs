<script setup>
import axios from 'axios';

import AutoComplete from 'primevue/autocomplete';

import { RouterLink } from 'vue-router';
import Navbar from '../../components/Navbar.vue';
import PostCard from '../../components/PostComponents/PostCard.vue';
import Button from 'primevue/button';

</script>

<template>
    <div>
    <!-- Navbar -->
    <Navbar />


        
            <div class="w-25 m-auto d-flex align-baseline my-2">
                <AutoComplete v-model="searchTitle" :suggestions="suggestions" @complete="search"></AutoComplete>
                <button class="btn btn-outline-primary  mx-3 my-2 my-sm-0 " type="submit" @click="getSearchPosts">Search</button>
            </div>
     

    <div class="row">
    
    <div class="col-3 px-5 d-none d-lg-block ">
    
    <div class="bg-white mt-3  border border-2 py-3">
    <!-- Title -->
    <h5 class="mx-3 fw-bold">Filters</h5>

    <!-- Work Place -->
    <p class="mx-3 fw-bold my-3">Work Place</p>
    <div class="px-5 py-2">

    <div class="form-check-reverse mx-5">
        <input class="form-check-input" name="g1" type="checkbox" value="remote" v-model="work_type" />
        <label class="form-check-label" for="flexCheckDefault">Remote</label>
    </div>

    <div class="form-check-reverse mx-5">
        <input class="form-check-input" name="g1" type="checkbox" value="on-site" v-model="work_type"/>
        <label class="form-check-label" for="flexCheckDefault">On-Site</label>
    </div>    

    <div class="form-check-reverse mx-5">
        <input class="form-check-input" name="g1" type="checkbox" value="hybrid" v-model="work_type"/>
        <label class="form-check-label" for="flexCheckDefault">Hybrid</label>
    </div>

    </div>
    <!-- City -->
    <div>
    <p class="mx-3 fw-bold my-3">City</p>
    <select class="form-control w-50 mx-3" v-model="searchLocation" name="city">
    <option v-for="location in locations" :value="location" :key="index">{{ location }}</option>
    </select>
    </div>
    <!-- Salary -->

    <p class="mx-3 fw-bold my-3">Salary</p>

    <input type="number" class="form-control mx-3 w-50" placeholder="salary" name="salary" v-model="salary"/>

    <div class="d-flex align-baseline justify-content-around">
        <button class="btn btn-primary my-5" @click="applyFilters">Filter</button>
        <button class="btn btn-danger my-5 mx-3 " @click="resetPosts()">Reset</button>
    </div>

    </div>
    </div>

    <div class="col-9 position-relative">
        <!-- <div class=" position-absolute top-0 end-0" > -->
        <router-link :to="'/employer/add-post'">
            <button class="btn btn-primary position-absolute  mx-5" style="
                right: 10px !important;
                top: -30px !important;
            ">Add New Job</button>
        </router-link>
    
        <!-- </div> -->
        
      <button type="button" class="btn btn-light border border-black d-lg-none mx-5" data-bs-toggle="modal" data-bs-target="#sidebarModal">
            Filters
        </button>

        <!-- Modal -->
        <div class="modal fade" id="sidebarModal" tabindex="-1" aria-labelledby="sidebarModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="sidebarModalLabel">Filters</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Sidebar content here -->
                        <div class="bg-white mt-3 border border-2 py-3">
                            <!-- Work Place -->
                            <p class="mx-3 fw-bold my-3">Work Place</p>
                            <div class="px-5 py-2">
                                <div class="form-check-reverse mx-5">
                                    <input class="form-check-input" name="g1" type="checkbox" value="remote" v-model="work_type" />
                                    <label class="form-check-label" for="flexCheckDefault">Remote</label>
                                </div>
                                <div class="form-check-reverse mx-5">
                                    <input class="form-check-input" name="g1" type="checkbox" value="on-site" v-model="work_type"/>
                                    <label class="form-check-label" for="flexCheckDefault">On-Site</label>
                                </div>
                                <div class="form-check-reverse mx-5">
                                    <input class="form-check-input" name="g1" type="checkbox" value="hybrid" v-model="work_type"/>
                                    <label class="form-check-label" for="flexCheckDefault">Hybrid</label>
                                </div>
                            </div>
                            <!-- City -->
                            <div>
                                <p class="mx-3 fw-bold my-3">City</p>
                                <select class="form-control w-50 mx-3" v-model="searchLocation" name="city">
                                    <option v-for="(location, index) in locations" :value="location" :key="index">{{ location }}</option>
                                </select>
                            </div>
                            <!-- Salary -->
                            <p class="mx-3 fw-bold my-3">Salary</p>
                            <input type="number" class="form-control mx-3 w-50" placeholder="salary" name="salary" v-model="salary"/>
                            <div class="d-flex align-baseline justify-content-around">
                                <button class="btn btn-primary my-5" @click="applyFilters">Filter</button>
                                <button class="btn btn-danger my-5 mx-3" @click="resetPosts">Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    <div v-for="post in posts" :key="post.id" class="border border-2 my-3 mx-5">
    
    <PostCard 
    :job_title="post.job_title"
    :location="post.location"
    :application_deadline="post.application_deadline"
    :created_at="post.created_at"
    :logo="post.employer.logo"
    :work_type="post.work_type"
    :start_salary="post.start_salary"
    :end_salary="post.end_salary"
    :post_id="post.id"
    :company="post.employer.company_name"
    :route="`/posts/${post.id}`"
    />
    
    </div>
    
        <nav v-if="posts" class="mx-5" aria-label="Page navigation example">
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
                <span aria-hidden="true">&raquo; </span>
            </a>
            </li>
        </ul>
        </nav>
    </div>

    </div>

    </div>
</template>

<style>
post:first-child {
    margin-top: 0px o !important ;
}
</style>


<script>
import { ref } from 'vue';
import router from '../../router'; 
const filteredTitles = ref([]);


export default {
    data() {
    return {
        posts: [],
        full_res: null,
        paginationLinks: [],
        next: null,
        prev: null,
        work_type: [],
        salary: null,
        titles:[],
        searchTitle:'',
        locations:[],
        searchLocation:'',
        tob_title:'',
        suggestions:[],
    };
    },
    mounted() 
    { 
        const { verify } = this.$route.query;
        const params = new URLSearchParams(window.location.search);
        const verifyParam = params.get("verify");
        const token= params.get("token");
        const user= params.get("user");
        if(verifyParam){
            router.push('/verify')
        }
        if(token){
           router.push('/reset')
        }
        if(this.work_type.length === 0 && !this.salary)
        {
            this.fetchPosts();
        }
        else
        {
            this.applyFilters();
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/home/posts/locations`)
        .then((res)=> {
            this.titles = res.data.titles;
            this.locations = res.data.locations;
        })
        

    },
    methods: {
        fetchPosts(pageUrl = null)
        {
const queryParams = {};
            
            if (this.salary && this.salary <= 0)
            {
                let instance = this.$toast.open({
                    message:"Cannot search with zero or negative",
                    position:'bottom-right',
                    type:'error',
                    duration:3000
                });
                return
            }

            if (this.work_type && this.work_type.length > 0) {
                queryParams.work_type = this.work_type.join(',');
            }
            
            if (this.salary !== '') {
                queryParams.salary = this.salary;
            }

            if (this.searchTitle) {
                queryParams.job_title = this.searchTitle;
            }
            
            if (this.searchLocation) {
                queryParams.location = this.searchLocation;
                console.log(this.searchLocation);
            }

            const url = pageUrl || `${import.meta.env.VITE_BASE_URL}/home/posts`
            axios
            .get(url , {params: queryParams})
            .then(res => {
                this.posts = res.data.data;
                this.paginationLinks = res.data.links;
                this.paginationLinks.pop(this.paginationLinks.length-1)
                this.paginationLinks.shift()
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
            
            if (this.salary && this.salary <= 0)
            {
                let instance = this.$toast.open({
                    message:"Cannot search with zero or negative",
                    position:'bottom-right',
                    type:'error',
                    duration:3000
                });
                return
            }

            if (this.work_type && this.work_type.length > 0) {
                queryParams.work_type = this.work_type.join(',');
            }
            
            if (this.salary !== '') {
                queryParams.salary = this.salary;
            }

            if (this.searchTitle) {
                queryParams.job_title = this.searchTitle;
            }
            
            if (this.searchLocation) {
                queryParams.location = this.searchLocation;
                console.log(this.searchLocation);
            }
            
            let url = import.meta.env.VITE_BASE_URL;

            axios
            .get(url+'/home/posts' , {params: queryParams})
            .then((res) => {
                this.posts = res.data.data;
            })
            .catch(err => {
                console.log(err);
            })
        },
        search(event) {
        const query = event.query.toLowerCase();
            this.suggestions = this.titles.filter((title) =>
                title.toLowerCase().startsWith(query)
            );
        },
        getSearchPosts() {
            this.applyFilters();
        },
        resetPosts() {
            
            this.searchTitle = ''
            this.work_type = []
            this.salary = ''
            this.searchLocation = ''

            const url = `${import.meta.env.VITE_BASE_URL}/home/posts`
            axios
            .get(url)
            .then(res => {
                this.posts = res.data.data;
                this.paginationLinks = res.data.links;
                this.paginationLinks.pop(this.paginationLinks.length-1)
                this.paginationLinks.shift()
                this.next = res.data.next_page_url;
                this.prev = res.data.prev_page_url;
                this.full_res = res.data;
            })
            .catch(err => console.log(err));
        }
    }
};


</script>

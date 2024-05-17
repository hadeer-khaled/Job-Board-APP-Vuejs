<script setup>
import PostHeader from '../../components/PostComponents/PostHeader.vue';
import PostDescription from '../../components/PostComponents/PostDescription.vue';
import Navbar from '../../components/Navbar.vue';

import Button from 'primevue/button';
import axiosInstance from '../../axios';
</script>

<template>
    <div>
        <Navbar />
        <div class="container p-5">
            <PostHeader :job_title="post.job_title" :location="post.location" :company="company"
                :application_deadline="post.application_deadline" :created_at="post.created_at"
                :start_salary="post.start_salary" :end_salary="post.end_salary" :post_id="post.id"
                :work_type="post.work_type" :skills="post.skills">
                <template v-slot:Admin>
                    <template v-if="post.status == 'pending'">
                        <Button 
                            label="Accept" 
                            icon="pi pi-check" 
                            class="p-button-success p-mr-2" 
                            rounded 
                            @click="changeStatus('approved')" />
                        <Button 
                            label="Reject" 
                            icon="pi pi-times" 
                            class="p-button-danger" 
                            rounded 
                            @click="changeStatus('rejected')" />
                    </template>
                </template>
            </PostHeader>

            <PostDescription title="Job Description" :content="post.description" />
            <PostDescription title="Responsibilities" :content="post.responsibilities" />
            <PostDescription title="Qualifications" :content="post.qualifications" />
        </div>
    </div>
</template>

<script>
export default {
    components: {
        Button
    },
    data() {
        return {
            post: {},
            company: ''
        }
    },
    mounted() {
        axiosInstance
            .get(`${import.meta.env.VITE_BASE_URL}/posts/${this.$route.params.id}`)
            .then(response => {
                this.post = response.data.data;
                this.company = response.data.data.employer.company_name;
            })
            .catch(err => console.log(err));
    },
    methods: {
        changeStatus(status) {
            axiosInstance.put(`${import.meta.env.VITE_BASE_URL}/admin/approve/${this.$route.params.id}`, { status })
                .then((res) => {
                    console.log(res);
                    this.$router.push('admin/posts');
                })
                .catch(err => console.log(err));
        }
    }
}
</script>

<style scoped>
.p-mr-2 {
    margin-right: 0.5rem;
}
</style>

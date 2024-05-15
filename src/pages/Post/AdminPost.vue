<script setup>
import PostHeader from '../../components/PostComponents/PostHeader.vue';
import PostDescription from '../../components/PostComponents/PostDescription.vue';
import Navbar from '../../components/Navbar.vue';
import axios from 'axios';
import Button from 'primevue/button';
</script>
<template>

    <div>

        <Navbar />
        <div class="container p-5">

            <PostHeader :job_title="post.job_title" :location="post.location" :company="company"
                :application_deadline="post.application_deadline" :created_at="post.created_at"
                :start_salary="post.start_salary" :end_salary="post.end_salary" :post_id="post.id"
                :work_type="post.work_type" :skills="post.skills">
                <template v-slot:Admin v-if="post.status == 'pending'">
                    <Button label="Accept" severity="success" value="approved" rounded
                        @click="changeStatus('approved')"></Button>
                    <Button label="Reject" severity="danger" rounded value="rejected"
                        @click="changeStatus('rejected')"></Button>
                </template>
            </PostHeader>

            <PostDescription title="Job Description" :content="post.description" />

            <PostDescription title="Responibilities" :content="post.responsibilities" />

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
            post: [],
            company: ''
        }
    },
    mounted() {
        axios
            .get(`http://localhost:8000/api/posts/${this.$route.params.id}`)
            .then(response => {
                this.post = response.data.data;
                this.company = response.data.data.employer.company_name;
            })
            .catch(err => console.log(err));
    },
    methods: {
        changeStatus(e) {
            axios.put(`http://localhost:8000/api/admin/approve/${this.$route.params.id}`, { status: e })
                .then((res) => {
                    console.log(res);
                    this.$router.push('/admin');
                })
                .catch(err => console.log(err));
        }
    }
}

</script>
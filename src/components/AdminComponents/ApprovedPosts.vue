<template>
    <div>
        <Table :jobs="jobs" :perPage="perPage" :first="first" :total="total" :columns="columns" @page="onPage" uri="post">
        </Table>

    </div>
</template>

<script>

import Table from './Table.vue';
import axiosInstance from '../../axios';

export default {
    components: {
        Table
    },
    data() {
        return {
            jobs: [],
            perPage: 5,
            first: 0,
            total: 0,
            page: 0,
            columns: [
                { field: 'job_title', header: 'Title', width: '25%' },
                { field: 'location', header: 'Location', width: '25%' },
                { field: 'application_deadline', header: 'Deadline', width: '25%' },
                { field: 'created_at', header: 'Posted', width: '25%' },
                { field: 'work_type', header: 'Work Type', width: '25%' },
                { field: 'company_name', header: 'Company', width: '25%' },
                { field: 'applications_count', header: 'Applications', width: '25%' }



            ]
        };
    },
    methods: {
        getApprovedPosts() {
            axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/admin/approvedjobs`, {
                params: { perPage: this.perPage, page: this.page }
            })
                .then(res => {
                    this.jobs = res.data.data;
                    this.total = res.data.meta.total;
                    console.log(res.meta);
                })
                .catch(err => console.log(err))
        },
        onPage(event) {
            this.first = event.first;
            this.perPage = event.rows;
            this.page = event.page + 1;

            this.getApprovedPosts();
        },

    },
    mounted() {
        this.getApprovedPosts();
    }
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>

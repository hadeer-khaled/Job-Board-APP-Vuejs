<template>
    <div>
        <Table :jobs="jobs" :perPage="perPage" :first="first" :total="total" :columns="columns" @page="onPage">
        </Table>

    </div>
</template>

<script>
import axios from 'axios';
import Table from './Table.vue';

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
                { field: 'company_name', header: 'Company', width: '25%' }


            ]
        };
    },
    methods: {
        rejectedJobs() {
            axios.get(`${import.meta.env.VITE_BASE_URL}/admin/rejectedjobs`, {
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

            this.rejectedJobs();
        },

    },
    mounted() {
        this.rejectedJobs();
    }
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>

<template>
    <div>
        <Table :jobs="candidates" :perPage="perPage" :first="first" :total="total" :columns="columns" @page="onPage" :uri="uri">
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
            candidates: [],
            perPage: 5,
            first: 0,
            total: 0,
            page: 1,
            uri: 'candidates',
            columns: [
                { field: 'user.name', header: 'Name', width: '25%' },
                { field: 'education', header: ' Education', width: '25%' },
                { field: 'faculty', header: 'Faculty', width: '25%' },
                { field: 'experience_level', header: 'Experience level', width: '25%' },
                { field: 'applications_count', header: 'Number of Applications', width: '25%' },


            ]
        };
    },
    methods: {
        getCndidates() {
            axios.get(`${import.meta.env.VITE_BASE_URL}/admin/candidates`, {
                params: { perPage: this.perPage, page: this.page }
            })
                .then(res => {
                    this.candidates = res.data.candidates.data;
                    this.total = res.data.candidates.total;

                })
                .catch(err => console.log(err))
        },
        onPage(event) {
            this.first = event.first;
            this.perPage = event.rows;
            this.page = event.page + 1;

            this.getCndidates();
        },

    },
    mounted() {
        this.getCndidates();
    }
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>

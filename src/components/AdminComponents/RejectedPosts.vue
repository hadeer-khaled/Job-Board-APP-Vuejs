<template>
    <div class="rejected-jobs">
      <h2>Rejected Jobs</h2>
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
          { field: 'company_name', header: 'Company', width: '25%' }
        ]
      };
    },
    methods: {
      rejectedJobs() {
        axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/admin/rejectedjobs`, {
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
  .rejected-jobs {
    padding: 20px;
  }
  
  h2 {
    margin-top: 0;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th {
    background-color: #f0f0f0;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  </style>
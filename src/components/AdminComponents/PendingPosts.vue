<template>
    <div class="pending-posts">
      <h2>Pending Posts</h2>
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
        page: 1,
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
      getPendingJobs() {
        axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/admin/pendingjobs`, {
          params: { perPage: this.perPage, page: this.page }
        })
         .then(res => {
            this.jobs = res.data.data;
            this.total = res.data.meta.total;
          })
         .catch(err => console.log(err))
      },
      onPage(event) {
        this.first = event.first;
        this.perPage = event.rows;
        this.page = event.page + 1;
        this.getPendingJobs();
      },
      onPageChange(event) {
        this.page = event.page + 1;
        this.getPendingJobs();
      }
    },
    mounted() {
      this.getPendingJobs();
    }
  }
  </script>
  
  <style scoped>
  .pending-posts {
    padding: 20px;
  }
  
  h2 {
    margin-top: 0;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  
  th {
    background-color: #f0f0f0;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  </style>
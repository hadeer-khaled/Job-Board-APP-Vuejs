<template>
    <div class="card">
      <DataTable :value="jobs">
        <Column v-for="(column, index) in columns" :key="index" :field="column.field" :header="column.header" :style="{ 'width': column.width }">
          <template #body="rowData">
            <!-- Display different content based on the field -->
            <span v-if="column.field === 'created_at'">{{ formatDate(rowData.data[column.field]) }}</span>
            <span v-else>{{ rowData.data[column.field] }}</span>
          </template>
        </Column>
        <Column :exportable="false" field="customButton" header="Actions">
          <template #body="rowData">
            <RouterLink class="text-decoration-none btn btn-primary" :to="`/admin/${uri}/${rowData.data.id}`">
              View Details
            </RouterLink>
          </template>
        </Column>
      </DataTable>
      <Paginator :rows="perPage" :rowsPerPageOptions="rowsPerPageOptions" :template="paginatorTemplate"
                 :totalRecords="total" :currentPageReportTemplate="currentPageReportTemplate" :first="first"
                 @page="onPage" @onPageChange="onPageChange">
      </Paginator>
    </div>
  </template>
  
  <script>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Button from 'primevue/button';
  import Paginator from 'primevue/paginator';
  
  export default {
    props: {
      jobs: {
        type: Array,
        required: true
      },
      perPage: {
        type: Number,
        required: true
      },
      first: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      },
      columns: {
        type: Array,
        required: true
      },
      uri: {
        type: String,
        required: true
      }
    },
    components: {
      DataTable,
      Column,
      Button,
      Paginator
    },
    computed: {
      rowsPerPageOptions() {
        return [1, 2, 5, 10];
      },
      currentPageReportTemplate() {
        const first = this.first + 1;
        const last = Math.min(this.first + this.perPage, this.total);
        return `${first} - ${last} of ${this.total}`;
      },
      paginatorTemplate() {
        return 'RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink';
      }
    },
    methods: {
      onPage(event) {
        this.$emit('page', event);
      },
      onPageChange(event) {
        this.$emit('onChange', event);
      },
      viewApplications(job) {
        // Emit an event to parent component to handle viewing applications
        this.$emit('viewApplications', job);
      },
      formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  
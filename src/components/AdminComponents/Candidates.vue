<template>
  <div>
    <Navbar />
    <div class="admin-page">
      <div class="card">
        <DataTable :value="candidates" :loading="loading">
          <Column v-for="(column, index) in columns" :key="index" :field="column.field" :header="column.header" :style="{ 'width': column.width }">
            <template v-slot:body="slotProps">
              <span>{{ getColumnValue(slotProps.data, column.field) }}</span>
              <template v-if="column.field === 'user.name'">
                <Button icon="pi pi-eye" class="p-button-rounded p-button-text" @click="viewApplications($event, slotProps.data)"></Button>
              </template>
            </template>
          </Column>
          <Column :exportable="false" field="customButton" header="Actions">
            <template #body="slotProps">
              <RouterLink class="text-decoration-none btn btn-primary" :to="`/admin/${uri}/${slotProps.data.id}`">
                View Details
              </RouterLink>
            </template>
          </Column>
        </DataTable>
        <Paginator v-if="total > perPage" :rows="perPage" :rowsPerPageOptions="rowsPerPageOptions" :template="paginatorTemplate" :totalRecords="total" :currentPageReportTemplate="currentPageReportTemplate" :first="first" @page="onPage" @onPageChange="onPageChange">
        </Paginator>
        <OverlayPanel ref="overlayPanel" :dismissable="true">
          <h3>Applications</h3>
          <DataTable :value="selectedUserApplications" responsiveLayout="scroll">
            <Column field="post.job_title" header="Post ID"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="phone" header="Phone"></Column>
            <Column field="status" header="Status"></Column>
            <Column field="created_at" header="Applied Date">
              <template #body="slotProps">
                <span>{{ formatCreatedAt(applicationDate) }}</span>
              </template>
            </Column>
          </DataTable>
        </OverlayPanel>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Navbar from '../Navbar.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Paginator from 'primevue/paginator';
import OverlayPanel from 'primevue/overlaypanel';
import axiosInstance from '../../axios';

export default {
  components: {
    Navbar,
    DataTable,
    Column,
    Button,
    Paginator,
    OverlayPanel
  },
  data() {
    return {
      candidates: [],
      loading: false,
      perPage: 5,
      first: 0,
      total: 0,
      page: 1,
      uri: 'candidates',
      columns: [
        { field: 'user.name', header: 'Name', width: '20%' },
        { field: 'education', header: 'Education', width: '20%' },
        { field: 'faculty', header: 'Faculty', width: '20%' },
        { field: 'experience_level', header: 'Experience Level', width: '20%' },
        { field: 'applications_count', header: 'Number of Applications', width: '20%' }
      ],
      selectedUserApplications: [],
      applicationDate: null // Initialize applicationDate
    };
  },
  computed: {
    rowsPerPageOptions() {
      return [5, 10, 20];
    },
    currentPageReportTemplate() {
      const first = this.first + 1;
      const last = this.first + this.perPage;
      return `${first} - ${last} of ${this.total}`;
    },
    paginatorTemplate() {
      return 'RowsPerPageDropdown FirstPageLink PrevPageLink  PageLinks NextPageLink LastPageLink';
    }
  },
  methods: {
    getColumnValue(data, field) {
      const keys = field.split('.');
      let value = data;
      keys.forEach(key => {
        value = value ? value[key] : null;
      });
      return value;
    },
    getCndidates() {
      this.loading = true;
      axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/admin/candidates`, {
        params: { perPage: this.perPage, page: this.page }
      })
        .then(res => {
          this.candidates = res.data.candidates.data;
          this.total = res.data.candidates.total;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    onPage(event) {
      this.first = event.first;
      this.perPage = event.rows;
      this.page = event.page + 1;
      this.getCndidates();
    },
    viewApplications(event, candidate) {
      this.selectedUserApplications = candidate.applications;
      this.applicationDate = new Date(candidate.created_at); // Set applicationDate to candidate's created_at

      this.$refs.overlayPanel.toggle(event);
    },
    formatCreatedAt(created_at) {
      if (!created_at) return '';
      const date = new Date(created_at);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
  },
  mounted() {
    this.getCndidates();
  }
};
</script>

<style scoped>
.admin-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.card {
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>

<template>
    <div class="card">
        <DataTable :value="jobs">
            <template #paginatorstart>
                <Button type="button" icon="pi pi-refresh" text></Button>
            </template>
            <template #paginatorend>
                <Button type="button" icon="pi pi-download" text></Button>
            </template>
            <Column v-for="(column, index) in columns" :key="index" :field="column.field" :header="column.header"
                :style="{ 'width': column.width }">
                <!-- Check if it's the "Details" button column -->
                <template v-if="column.field === 'details'">
                    <Button @click="viewDetails(rowData)">
                        View Details
                    </Button>
                </template>
                <!-- Custom button column -->
                <template v-else-if="column.field === 'customButton'">
                    <Button @click="customButtonClick(rowData)">
                        Custom Action
                    </Button>
                </template>
                <!-- Default column rendering -->
                <template v-else>
                    {{ rowData[column.field] }}
                </template>
            </Column>
        </DataTable>
        <Paginator :rows="perPage" :rowsPerPageOptions="rowsPerPageOptions" :template="paginatorTemplate"
            :totalRecords="total" :currentPageReportTemplate="currentPageReportTemplate" :first="first" @page="onPage"
            @onPageChange="onPageChange">
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
            const last = this.first + this.perPage;
            return `${first} - ${last} of ${this.total}`;
        },
        paginatorTemplate() {
            return 'RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport  PageLinks NextPageLink LastPageLink';
        }
    },
    methods: {
        onPage(event) {
            this.$emit('page', event);
        },
        onPageChange(event) {
            this.$emit('onChange', event);
        },
        viewDetails(job) {
            console.log(job);
        },
        customButtonClick(rowData) {
            console.log('Custom button clicked for row:', rowData);
            // You can emit an event here if needed
        }
    }
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>

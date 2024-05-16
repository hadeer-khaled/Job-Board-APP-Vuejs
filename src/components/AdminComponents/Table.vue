<template>
    <div class="card">
        <DataTable :value="jobs">
            <Column v-for="(column, index) in columns" :key="index" :field="column.field" :header="column.header"
                :style="{ 'width': column.width }">

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
            const router = useRouter();
            router.push({ name: 'post-details', params: { id: job.id } });
        }
    }
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>

<template>
    <Navbar/>
    <div class="p-m-3">
        <Card>
            <template #title>
                <h2>{{ candidate.name }}</h2>
            </template>
            <template #content>
                <Panel header="Candidate Information" class="p-mb-3">
                    <div class="p-grid p-formgrid p-fluid">
                        <div class="p-field p-col-12 p-md-6">
                            <label for="name">Name</label>
                            <InputText id="name" v-model="candidate.name" disabled />
                        </div>
                        <div class="p-field p-col-12 p-md-6">
                            <label for="email">Email</label>
                            <InputText id="email" v-model="candidate.email" disabled />
                        </div>
                        <div class="p-field p-col-12 p-md-6">
                            <label for="education">Education</label>
                            <InputText id="education" v-model="candidate.education" disabled />
                        </div>
                        <div class="p-field p-col-12 p-md-6">
                            <label for="faculty">Faculty</label>
                            <InputText id="faculty" v-model="candidate.faculty" disabled />
                        </div>
                        <div class="p-field p-col-12 p-md-6">
                            <label for="experience_level">Experience Level</label>
                            <InputText id="experience_level" v-model="candidate.experience_level" disabled />
                        </div>
                        <div class="p-field p-col-12 p-md-6">
                            <label for="linkedin">LinkedIn</label>
                            <InputText id="linkedin" v-model="candidate.linkedin" disabled />
                        </div>
                        <div class="p-field p-col-12 p-md-6">
                            <label for="github">GitHub</label>
                            <InputText id="github" v-model="candidate.github" disabled />
                        </div>
                    </div>
                </Panel>
            </template>
        </Card>
    </div>
</template>

<script>
import axiosInstance from '../../axios';
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Navbar from '../../components/Navbar.vue';

export default {
    name: 'CandidateDetail',
    components: {
        Card,
        Panel,
        DataTable,
        Column,
        InputText,
        Navbar
    },
    data() {
        return {
            candidate: {
                name: '',
                email: '',
                education: '',
                faculty: '',
                experience_level: '',
                linkedin: '',
                github: '',
            }
        };
    },
    methods: {
        fetchCandidate(id) {
            axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/candidates/${id}`).then(
                response => {
                    this.candidate = response.data.data; // Ensure you access response.data.data
                }
            ).catch(error => {
                console.error(error);
            });
        },
    },
    mounted() {
        this.fetchCandidate(this.$route.params.id);
    }
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>

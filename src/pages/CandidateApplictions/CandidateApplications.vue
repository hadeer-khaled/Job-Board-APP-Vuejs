<script setup>
    
</script>
<template>
    <div style="display: contents">
        <Navbar/>
        <div class="container w-75 mx-auto mt-3">
            <div v-if="applications.length === 0" class="mt-3 text-center">
                <h3 style="color: rgba(0, 0, 0, 0.5);">No applications found.</h3>
            </div>
            <div v-for="application in applications" class="mt-3">
                <ApplicationCard :application="application" :applicationsStore="applicationsStore"/>
            </div>
        </div>
    </div>
</template>

<script>
    import ApplicationCard from '../../components/CandidateComponents/ApplicationCard.vue';
    import Navbar from '../../components/Navbar.vue';
    import { useApplicationsStore } from '../../store/modules/ApplicationsPinia';
    
    export default {
        props: ['user', 'userStore'],
        components: {
            ApplicationCard,
            Navbar,
        },
        setup() {
            const applicationsStore = useApplicationsStore();

            return { applicationsStore };
        },
        data() {
            return {
                applications : []
            }
        },
        beforeMount() {
            this.fetchApplications();
        },
        methods: {
            async fetchApplications() {
                await this.applicationsStore.fetchCandidateApplications();
                this.applications = this.applicationsStore.applications;
            },
            updateApplications() {
                this.applications = this.applicationsStore.applications;
            }
        },
        
    }
        

</script>
<script setup>
    import ApplicationCard from '../../components/CandidateComponents/ApplicationCard.vue';
    import axios from 'axios';
    import Navbar from '../../components/Navbar.vue';
</script>
<template>
    <Navbar/>
    <div class="container w-75 mx-auto mt-3">
        <div v-for="application in applications">
            <ApplicationCard :application="application"/>
        </div>
    </div>

</template>

<script>
    const url = import.meta.env.VITE_BASE_URL;
    export default {
        props: ['user', 'userStore'],
        data() {
            return {
                applications : []
            }
        },
        beforeMount() {
            this.fetchApplications();
        },
        methods: {
            fetchApplications() {
                const token = localStorage.getItem('token');
                axios.get(url + '/candidates/applications', {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(res => this.applications = res.data.data)
            }
        },
        
    }
        

</script>
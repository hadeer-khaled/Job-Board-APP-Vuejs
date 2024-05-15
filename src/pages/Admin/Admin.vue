<template>
    <div class="card">
        <TabView>
            <TabPanel header="Pending Posts">
                <p class="m-0">

                    <pendingPosts></pendingPosts>
                </p>
            </TabPanel>
            <TabPanel header="Rejected Posts">
                <p class="m-0">
                    <rejectedJobs></rejectedJobs>
                </p>
            </TabPanel>
            <TabPanel header="Approved Posts">
                <p class="m-0">
                    <ApprovedPosts></ApprovedPosts>
                </p>
            </TabPanel>
        </TabView>
    </div>
</template>
<script>

import pendingPosts from '../../components/AdminComponents/PendingPosts.vue';
import rejectedJobs from '../../components/AdminComponents/RejectedPosts.vue';
import ApprovedPosts from '../../components/AdminComponents/ApprovedPosts.vue';

import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

export default {

    components: {
        pendingPosts,
        rejectedJobs,
        ApprovedPosts,
        TabView,
        TabPanel
    },

}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>

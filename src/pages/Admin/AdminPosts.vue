<template>
<Navbar />
    <div class="admin-page">
      
      <div class="card">
        <TabView>
          <TabPanel header="Pending Posts">
            <pendingPosts />
          </TabPanel>
          <TabPanel header="Rejected Posts">
            <rejectedJobs />
          </TabPanel>
          <TabPanel header="Approved Posts">
            <ApprovedPosts />
          </TabPanel>
        </TabView>
      </div>
    </div>
  </template>
  
  <script>
  import pendingPosts from '../../components/AdminComponents/PendingPosts.vue';
  import rejectedJobs from '../../components/AdminComponents/RejectedPosts.vue';
  import ApprovedPosts from '../../components/AdminComponents/ApprovedPosts.vue';
  import TabView from 'primevue/tabview';
  import TabPanel from 'primevue/tabpanel';
  import Navbar from '../../components/Navbar.vue';
  
  export default {
    components: {
      pendingPosts,
      rejectedJobs,
      ApprovedPosts,
      TabView,
      TabPanel,
      Navbar
    }
  }
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
  
  .tabview {
    margin-top: 20px;
  }
  
  .tabpanel {
    padding: 20px;
  }
  </style>
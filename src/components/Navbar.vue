<template>

<div class="mt-3 border-bottom pb-2 mb-3">
<nav class="d-flex justify-content-between ">
    
    <div class="mx-3 d-flex justify-content-between ">
        <div>
            <img  src="https://static.vecteezy.com/system/resources/previews/008/688/110/non_2x/job-search-logo-free-vector.jpg" class="mx-3 border rounded-circle" style="width:50px"/>
        </div>
    <RouterLink to="/" class="text-decoration-none mx-3 my-auto fw-bold ">Home</RouterLink>

        <!-- Admin -->
        <div v-if="role === 'admin'" class="d-flex align-items-center justify-content-around">
            <RouterLink class="mx-3 text-decoration-none fw-bold ">Posts</RouterLink>
            <RouterLink class="mx-3 text-decoration-none fw-bold ">Users</RouterLink>
        </div>
        
        <!-- Candidate -->
        <div v-if="role === 'candidate'" class="d-flex align-items-center justify-content-around">
            <RouterLink to="/candidate/profile" class="mx-3 text-decoration-none fw-bold ">Profile</RouterLink>
            <RouterLink to="/candidate/applications" class="mx-3 text-decoration-none fw-bold ">My Applications</RouterLink>
        </div>

        <!-- Employer -->
        <div v-if="role === 'employer'" class="d-flex align-items-center justify-content-around">
            <RouterLink to="/employer/profile" class="mx-3 text-decoration-none fw-bold ">Profile</RouterLink>
        </div>
        
        <div>

        </div>
    </div>


    <div v-if="!loggedUser">
        <div class="d-flex">

                    <span style="height:40px;width:1px;background-color:#D9DDE4;margin-right:16px"></span>
                    <a class="btn btn-primary mx-3" @click="$router.push('/login')">Login</a>
                    <a class="btn btn-light border-2 border-black ss mx-3 "
                        @click="$router.push('/register')">Register</a>
                </div>
            </div>

    <div v-if="loggedUser">
        <div class="d-flex align-items-center  justify-content-center ">
        <p class="mx-3 my-auto fw-bold r">{{ userStore.user.username }}</p>
        <img v-if="!userStore.user.image" style="width: 50px;" src="https://res.cloudinary.com/deqwn8wr6/image/upload/v1715943104/WhatsApp_Image_2024-05-16_at_11.38.12_PM_ozc0dw.jpg" alt="user img">

        <div class="navbar-user-image d-flex align-items-center justify-content-center">
            <img v-if="userStore.user.image" class="user-img" :src="userStore.user.image" alt="User Image">
        </div>
        <button class="mx-3 border border-0 " @click="logout">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
            <path d="M10 17v-3H5v-4h5V7l5 5-5 5zm7-14H7c-1.1 0-2 .9-2 2v3h2V5h10v14H7v-3H5v3c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
          </svg>
        </button>
        </div>
    </div>

</nav>
    </div>
</template>

<style scoped>
.navbar-user-image {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-right: 15px; /* Adjust this according to your navbar design */
}

.user-img {
  width: 50px; /* Adjust size as needed */
  height: 50px; /* Ensure it maintains a square aspect ratio */
  border-radius: 50%;
  border: 2px solid #ffffff; /* Add a white border */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
  object-fit: cover; /* Ensure the image covers the area without distortion */
}
</style>


<script>
import { useUserStore } from "../store/modules/UserPinia";
import { ref, onMounted, watch } from 'vue';

export default {
  setup() {
    const loggedUser = ref(false);
    const role = ref('');
    const userStore = useUserStore();

    const updateRoleAndLoggedUser = () => {
      role.value = userStore.user?.role || '';
      loggedUser.value = !!role.value;
    };

    onMounted(() => {
      updateRoleAndLoggedUser();
    });

    watch(() => userStore.user, () => {
      updateRoleAndLoggedUser();
    });

    const logout = () => {
      userStore.logout();
      userStore.resetUser(); 
      loggedUser.value = false;
      role.value = '';

      // Redirect to home or login page
      this.$router.push('/login');
    };

    return {
      loggedUser,
      role,
      userStore,
      logout,
    };
  }
};
</script>
<template>

<div class="mt-3 border-bottom pb-2 mb-3">
<nav class="d-flex justify-content-between ">
    
    <div class="mx-3 d-flex justify-content-between ">
        <div>
            <img  src="/logo.jpg" class="mx-3 border rounded-circle" style="width:50px"/>
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
            <a class="btn btn-light border-2 border-black ss mx-3 " @click="$router.push('/register')">Register</a>
        </div>
    </div>

    <div v-if="loggedUser">
        <div class="d-flex align-items-center  justify-content-center ">
        <p class="mx-3 my-auto">User Name</p>
        <img v-if="!image" style="width: 50px;" src="/default_user1.png" alt="user img">
        <img v-if="image" style="width: 50px;" :src="image" alt="user img">
        </div>
    </div>

</nav>
    </div>
</template>

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

    return {
      loggedUser,
      role,
    };
  },
};
</script>
<template>
  <div>
    <Navbar/>
    <section class="vh-100 login-section d-flex justify-content-center align-items-center">
      <div class="card text-black login-card shadow">
        <div class="card-body p-md-5">
          <h2 class="text-center mb-4">Login</h2>
          <form @submit.prevent="submitForm" novalidate="true">
            <div class="form-group mb-4">
              <label for="userEmail" class="form-label">Email</label>
              <input type="email" class="form-control" name="userEmail" id="userEmail" v-model="userEmail">
              <p v-if="errors.includes('Email required.')" class="text-danger">Email is required.</p>
            </div>
            <div class="form-group mb-4">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" name="password" id="password" v-model="password">
              <p v-if="errors.includes('Password required.')" class="text-danger">Password is required.</p>
            </div>
            <button type="submit" class="btn btn-primary btn-lg w-100">Login</button>
          </form>
          <p class="text-center mt-3">Don't have an account? <router-link to="/register">Register</router-link></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from "../../store/modules/UserPinia";
import Navbar from '../../components/Navbar.vue';
import router from '../../router'; 

export default {
  components: {
    Navbar
  },
  setup() {
    const userStore = useUserStore();
    const userEmail = ref('');
    const password = ref('');
    const errors = ref([]);

    const submitForm = async () => {
      errors.value = [];

      if (!userEmail.value) {
        errors.value.push("Email required.");
      } else if (!validEmail(userEmail.value)) {
        errors.value.push('Valid email required.');
      }

      if (!password.value) {
        errors.value.push("Password required.");
      }

    /////////////////// If there is no error validation /////////////////////////
      if (errors.value.length === 0) {
        try {
            const response = await userStore.login({ 
              email: userEmail.value,
              password: password.value
            });

            console.log('User form user store :', userStore.user ); // Console the user stroed in store 

            /////// Route the suitable page for each user depending the user role 
            ////----> Remember change to the suitable routes please 😜
            if(userStore.user.role==='admin')   router.push('/');
            else if(userStore.user .role==='candidate')  router.push('/');
            else if(userStore.user.role==='employer')   router.push('/');

        } catch (error) {
          console.error('Login failed:', error);
        }
      }
    };

   const validEmail = (email) => {
      var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return re.test(String(email).toLowerCase());
    };

    return {
      userStore,
      submitForm,
      validEmail,
      userEmail,
      password,
      errors // Return errors from setup
    };
  },
};
</script>

<style scoped>
.login-section {
  background-color: #eee;
}

.login-card {
  border-radius: 25px;
  width: 600px; 
}

@media (max-width: 576px) {
  .login-card {
    width: 90%;
    margin: 2px auto 0; 
  }
}
</style>

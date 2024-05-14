<template>
  <div>
    <Navbar/>
    <section class="vh-100 login-section d-flex justify-content-center align-items-center">
      <div class="card text-black login-card shadow">
        <div class="card-body p-md-5">
          <h2 class="text-center mb-4">Login</h2>
          <form @submit.prevent="submitForm" novalidate="true">
            <div class="form-group mb-4" :class="{ 'has-error': errors.includes('Email required.') || errors.includes('Valid email required.') }">
              <label for="userEmail" class="form-label">Email</label>
              <input type="email" class="form-control" name="userEmail" id="userEmail" v-model="userEmail">
              <p v-if="errors.includes('Email required.') || errors.includes('Valid email required.')" class="text-danger">{{ errors[0] }}</p>
            </div>
            <div class="form-group mb-4" :class="{ 'has-error': errors.includes('Password required.') }">
              <label for="password" class="form-label">Password</label>
              <div class="input-group">
                <input type="password" class="form-control" name="password" id="password5" v-model="password">
                <button class="btn btn-outline-secondary" type="button" @click="togglePasswordVisibility">
                  <FontAwesomeIcon :icon="passwordFieldIcon"/>
                </button>
              </div>
              <p v-if="errors.includes('Password required.')" class="text-danger">{{ errors[1] }}</p>
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
import { ref, computed } from 'vue';
import { useUserStore } from "../../store/modules/UserPinia";
import Navbar from '../../components/Navbar.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import router from '../../router'; 

library.add(faEye, faEyeSlash);

export default {
  components: {
    Navbar,
    FontAwesomeIcon
  },
  setup() {
    const userStore = useUserStore();
    const userEmail = ref('');
    const password = ref('');
    const errors = ref([]);

    const passwordFieldType = ref('password');
    const passwordFieldIcon = computed(() => {
      return passwordFieldType.value === 'password' ? 'fa-eye-slash' : 'fa-eye';
    });

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

      if (errors.value.length === 0) {
        try {
            const response = await userStore.login({ 
              email: userEmail.value,
              password: password.value
            });

            if(userStore.user.role==='admin')   router.push('/');
            else if(userStore.user.role==='candidate')  router.push('/');
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

    const togglePasswordVisibility = () => {
        const passwordInput = document.getElementById('password5');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordFieldIcon.value = 'fa-eye';
        } else {
            passwordInput.type = 'password';
            passwordFieldIcon.value = 'fa-eye-slash';
        }
    };

    return {
      userStore,
      submitForm,
      validEmail,
      userEmail,
      password,
      errors,
      passwordFieldIcon,
      togglePasswordVisibility
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

.has-error .form-control {
  border-color: red;
}

.input-group-append {
  cursor: pointer;
}
</style>

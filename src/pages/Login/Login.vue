<template>
  <div>
    <Navbar/>
    <section class="vh-100 login-section d-flex justify-content-center align-items-center">
      <div class="card text-black login-card shadow">
        <div class="card-body p-md-5">
          <div class="text-center mb-4">
            <img src="../../assets/hyper.svg" alt="Toggle password visibility"/>
          </div>
          <h2 class="text-center mb-4">Welcome</h2> 
          <form @submit.prevent="submitForm" novalidate="true">
            <div class="form-group mb-4">
              <label for="userEmail" class="form-label">Email</label>
              <input type="email" class="form-control" name="userEmail" id="userEmail" v-model="userEmail" :placeholder="errorMessages.userEmail || 'Enter your email'" required :class="{ 'is-invalid': errorMessages.userEmail }">
              <small v-if="errorMessages.userEmailRe" class="text-danger">{{ errorMessages.userEmailRe }}</small>
            </div>
            <div class="form-group mb-4">
              <label for="password" class="form-label">Password</label>
              <div class="input-group">
                <input type="password" class="form-control" name="password" id="password5" v-model="password" :placeholder="errorMessages.password || 'Enter your password'" required :class="{ 'is-invalid': errorMessages.password }">
                <button class="btn btn-outline-secondary" type="button" @click="togglePasswordVisibility">
                  <FontAwesomeIcon :icon="passwordFieldIcon"/>
                </button>
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-lg w-100">Login</button>
            <small v-if="errorMessages.general" class="text-danger d-block mt-3 text-center">{{ errorMessages.general }}</small>
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
    const errorMessages = ref({});

    const passwordFieldType = ref('password');
    const passwordFieldIcon = ref('fa-eye-slash');

    const submitForm = async () => {
      errorMessages.value = {};

      if (!userEmail.value) {
        errorMessages.value.userEmail = "Email required.";
      } else if (!validEmail(userEmail.value)) {
        errorMessages.value.userEmailRe = "Invalid email";
      }

      if (!password.value) {
        errorMessages.value.password = "Password required.";
      }

      if (Object.keys(errorMessages.value).length === 0) {
        try {
          await userStore.login({ 
            email: userEmail.value,
            password: password.value
          });

          if (userStore.user.role === 'admin') router.push('/');
          else if (userStore.user.role === 'candidate') router.push('/');
          else if (userStore.user.role === 'employer') router.push('/');
        } catch (error) {
          if (error.response && error.response.status === 401) {
            errorMessages.value.general = 'Unauthorized: Incorrect email or password.';
          } else {
            console.error('Login failed:', error);
            errorMessages.value.general = 'An error occurred during login. Please try again.';
          }
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
      errorMessages,
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

.is-invalid {
  border-color: red;
}

.text-danger {
  color: red;
}

</style>

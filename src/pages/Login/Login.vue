<template>
  <div>
    <Navbar/>
    <section class="vh-100 login-section d-flex justify-content-center align-items-center">
      <div class="card text-black login-card shadow">
        <div class="card-body p-md-5">
          <div class="text-center mb-4">
            <img src="https://res.cloudinary.com/deqwn8wr6/image/upload/v1715732920/hyper_kmlahl.svg" alt="Toggle password visibility"/>
          </div>
          <h2 class="text-center mb-4">Welcome</h2> 
          <div>
              <p class="text-center mt-3" style="color: #616161">
                Don't have an account? 
                <router-link to="/register" style="text-decoration: none;">Create today!</router-link>
              </p>
          </div>
          <form @submit.prevent="submitForm" novalidate="true">
            <div class="form-group mb-4">
              <label for="userEmail" class="form-label">Email</label>
              <input type="email" class="form-control" name="userEmail" id="userEmail" v-model="userEmail" :placeholder="errorMessages.userEmail || 'Enter your email'" required :class="{ 'is-invalid': errorMessages.userEmail }">
              <small v-if="errorMessages.userEmailRe" class="text-danger">{{ errorMessages.userEmailRe }}</small>
              <small v-if="errorMessage.userEmail" class="text-danger">{{ errorMessage.userEmail }}</small>
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
          <div class="d-flex justify-content-end mt-3">
          <button class="btn btn-outline-secondary" type="button" @click="resetPassword"> Forget password? </button>
        </div>
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
import axiosInstance from '../../axios/index';

library.add(faEye, faEyeSlash);

export default {
  components: {
    Navbar,
    FontAwesomeIcon
  },
   data() {
    return {
      verify: null, 
      errorMessage:{}
    }
  },
  mounted() {
    const { verify } = this.$route.query;
    const params = new URLSearchParams(window.location.search);
    const verifyParam = params.get("verify");
    if (verifyParam) {
      this.verify = true;
    }
  }
,
 methods: {
    async resetPassword() {
   
        try {
          await axiosInstance.post('http://127.0.0.1:8000/api/forgot-password', {
            email: userEmail.value
          });
          alert('Password reset link sent successfully.');
        } catch (error) {
          alert('Failed to send password reset link. please write your email');
        }
     
    },

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

           try {
             const response =await axiosInstance.post('/email/verified', {
             timestamp: new Date(), 
             email: userEmail.value,
           })

            const params = new URLSearchParams(window.location.search);
            const verifyParam = params.get("verify");
            if (verifyParam) {
                const path = window.location.pathname;
                window.history.replaceState({}, document.title, path);
            }
            router.push('/');
           } catch (error) {
             console.log("error",error);
           }
          
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
.d-flex {
  display: flex;
}

.justify-content-end {
  justify-content: flex-end;
}
</style>

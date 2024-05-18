<template>
  <div>
    <Navbar />
    <div class="container reset-password-container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow-sm">
            <div class="card-header text-center">Reset Password</div>
            <div class="card-body">
              <form @submit.prevent="resetPassword">
                <div class="mb-3">
                  <label for="password" class="form-label">New Password</label>
                  <input 
                    v-model="password" 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    :placeholder="errorMessages.password || 'Enter your new password'" 
                    :class="{ 'is-invalid': errorMessages.password }"
                  >
                  <div v-if="errorMessages.password" class="invalid-feedback">
                    {{ errorMessages.password }}
                  </div>
                </div>
                <div class="mb-3">
                  <label for="confirm-password" class="form-label">Confirm Password</label>
                  <input 
                    v-model="confirmPassword" 
                    type="password" 
                    class="form-control" 
                    id="confirm-password" 
                    :placeholder="errorMessages.confirmPassword || 'Confirm your password'" 
                    :class="{ 'is-invalid': errorMessages.confirmPassword }"
                  >
                  <div v-if="errorMessages.confirmPassword" class="invalid-feedback">
                    {{ errorMessages.confirmPassword }}
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-primary w-50 mx-auto">Reset Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
import axiosInstance from '../../axios';
import router from '../../router';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      token: '',
      errorMessages: {}
    };
  },
  created() {
    const params = new URLSearchParams(window.location.search);
    this.token = params.get("token");
    this.email = params.get("user");
  },
  methods: {
    validatePassword(password) {
      return password.length >= 8;
    },
    async resetPassword() {
      this.errorMessages = {};

      if (!this.password) {
        this.errorMessages.password = 'Password required.';
      } else if (!this.validatePassword(this.password)) {
        this.errorMessages.password = 'Password must contain at least eight characters.';
      }

      if (!this.confirmPassword) {
        this.errorMessages.confirmPassword = 'Confirm password required.';
      } else if (this.password !== this.confirmPassword) {
        this.errorMessages.confirmPassword = 'Passwords do not match.';
      }

      if (Object.keys(this.errorMessages).length === 0) {
        try {
          await axiosInstance.post('/reset-password', {
            token: this.token,
            email: this.email,
            password: this.password,
            password_confirmation: this.confirmPassword
          });
          const path = window.location.pathname;
          window.history.replaceState({}, document.title, path);
          router.push('/login');
        } catch (error) {
          console.error('Password reset failed:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
.reset-password-container {
  margin-top: 80px;
}

.card {
  border-radius: 10px;
}

.card-header {
  font-size: 1.5rem;
  font-weight: bold;
}

.form-label {
  font-weight: 500;
}

.is-invalid {
  border-color: red;
}

.invalid-feedback {
  color: red;
}
</style>

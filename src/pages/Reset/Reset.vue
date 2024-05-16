<template>
  <div>
    <Navbar/>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">Reset Password</div>

            <div class="card-body">
              <form @submit.prevent="resetPassword">
                <div class="mb-3">
                  <label for="password" class="form-label">New Password</label>
                  <input v-model="password" type="password" class="form-control" id="password" required>
                </div>
                <div class="mb-3">
                  <label for="confirm-password" class="form-label">Confirm Password</label>
                  <input v-model="confirmPassword" type="password" class="form-control" id="confirm-password" required>
                </div>
                <button type="submit" class="btn btn-primary">Reset Password</button>
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
      token: ''
    };
  },
  created() {
    const params = new URLSearchParams(window.location.search);
    this.token = params.get("token");
    this.email = params.get("user");
  },
  methods: {
    async resetPassword() {
      try {
        const response = await axiosInstance.post('http://127.0.0.1:8000/api/reset-password', {
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
};
</script>

<style>

</style>

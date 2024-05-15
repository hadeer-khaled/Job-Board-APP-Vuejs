<template>
  <div>
    <Navbar/>
    <div class="verify-container">
        <h1>Email Verification</h1>
        <p>Please click the button below to verify your email.</p>
        <button @click="verifyEmail" class="verify-button">Verify Email</button>
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
  methods: {
    verifyEmail() {
     router.push('/login?verify=true')
    }
  }
}
</script>

<style>
.verify-container {
  text-align: center;
  margin-top: 50px;
}

.verify-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.verify-button:hover {
  background-color: #0056b3;
}
</style>

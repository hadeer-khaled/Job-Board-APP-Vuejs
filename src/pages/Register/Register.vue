
<script setup>
import axios from 'axios';
import Navbar from '../../components/Navbar.vue';
import { required, email } from '@vuelidate/validators'
</script>
<template>
  <div>
    <Navbar/>
    <p>ssss</p>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  data() {
    return {
      userEmail: '',
      password: '',
      errors: []
    };
  },
  methods: {
   submitForm() {
  this.errors = [];

  if (!this.userEmail) {
    this.errors.push("Email required.");
  } else if (!this.validEmail(this.userEmail)) {
    this.errors.push('Valid email required.');
  }

  if (!this.password) {
    this.errors.push("Password required.");
  }

  console.log("Errors:", this.errors); // Add this line for debugging

  if (this.errors.length === 0) {
    // Form submission logic goes here
    console.log("Form submitted successfully");
  }
},
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
};
</script>



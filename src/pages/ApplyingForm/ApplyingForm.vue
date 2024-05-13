<script setup>
import axios from 'axios';

import Navbar from '../../components/Navbar.vue';
// import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
</script>

<template>
  <div>
  <Navbar/>
  <div class="container w-50 my-auto m-auto">
    <h3 class="mx-4">Job Application</h3>
    <form @submit.prevent="submitForm" class="d-flex flex-column align-items-baseline justify-content-between p-4">

      <!-- email -->
      <div class="form-group my-3">
        <label for="userEmail">Email</label>
        <input type="userEmail" class="form-control" name="userEmail" id="userEmail" v-model="userEmail">
        <!-- <span v-if="!v$.userEmail.email">Incorrect email format.</span> -->
      </div>

      <!-- phone_number -->
      <div class="form-group my-3">
        <label for="phone">Phone Number</label>
        <input type="tel" class="form-control" name="phone" id="phone" v-model="phone">
      </div>

      <!-- CV -->
      <div class="form-group my-3">
        <label for="cv">Upload CV</label>
        <input type="file" class="form-control" id="cv" @change="handleFileUpload" required>
      </div>

      <button type="submit" class="btn btn-primary m-auto my-2">Submit</button>
    </form>

  </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      userEmail: '',
      phone: '',
      cvFile: null,
    };
  },
  computed: {
    phoneIsValid()
    {
      return /^01[0125][0-9]{8}$/.test(this.phone);
    },
    phoneErrorMessage() {
      return this.phoneIsValid ? null : 'Please enter a 10-digit phone number.';
    },
  },
  methods: {
    handleFileUpload(event) {
      this.cvFile = event.target.files[0];
    },
    submitForm() {
        const formData = new FormData();
        formData.append('email', this.userEmail);
        formData.append('phone', this.phone);
        formData.append('cv', this.cvFile.name);
        
        console.log(formData.get('email'));
        console.log(formData.get('phone'));
        console.log(formData.get('cv'));

        // axios
        // .post('/api/application', formData)
        // .then((response) => {
        // })
        // .catch((error) => {
        //   console.error(error);
        // });
    }
  },
  validations:
  {
      userEmail: {email},
      cvFile: {required}
  }
};
</script>
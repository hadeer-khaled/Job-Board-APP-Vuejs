<script setup>
import axios from 'axios';

import Navbar from '../../components/Navbar.vue';
import { required, email } from '@vuelidate/validators'
</script>

<template>
  <div>
  <Navbar/>
  <div class="container w-50 m-auto">
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
        <input type="file" class="form-control" id="cv" @change="handleFileUpload">
      </div>

      <button type="submit" class="btn btn-primary m-auto my-2">Submit</button>
    </form>

  </div>

  </div>
</template>

<script>
import axiosInstance from '../../axios';
export default {
  data() {
    return {
      userEmail: '',
      phone: '',
      cvFile: null,
      err: null,
    };
  },
  computed: {
    phoneIsValid()
    {
      return /^01[0125][0-9]{8}$/.test(this.phone);
    },
    phoneErrorMessage() {
      return this.phoneIsValid ? null : 'Please enter a 11-digit phone number.';
    },
    emailIsValid()
    {
      return this.userEmail.split('@').lengths === 2;
    }
  },
  methods: {
    handleFileUpload(event) {
      this.cvFile = event.target.files[0];

      if(/\.pdf$/i.test(this.cvFile.name))
      {
        this.err = false;
      }
      else
      {
        this.err = true;
      }
    },
    submitForm() {

        if (!this.cvFile && (!this.userEmail || !this.phone))
        {
          this.$toast.open({
            message: "You should provide both email and phone number or resume only",
            type: 'error',
            duration: 3000,
          })
          return 
        }

        if (this.err)
        {
          this.$toast.open({
            message: "Wrong file format",
            type: 'error',
            duration: 3000,
          })
          return          
        }

        if (this.emailIsValid)
        {
            this.$toast.open({
            message: "Wrong Email",
            type: 'error',
            duration: 3000,
          })
          return          
        }

        if (!this.phoneIsValid)
        {
            this.$toast.open({
            message: "Wrong phone number",
            type: 'error',
            duration: 3000,
          })
          return          
        }

        const formData = new FormData();

        if(this.userEmail && this.phone)
        {
          formData.append('email', this.userEmail);
          formData.append('phone', this.phone);
        }

        if(this.cvFile)
        {
          formData.append('resume', this.cvFile);
        }

        formData.append('post_id', this.$route.params.id);

        axiosInstance
        .post(`${import.meta.env.VITE_BASE_URL}/applications`, formData)
        .then((response) => {
          this.$toast.open({
            message: "Appliced Successfully",
            type: 'success',
            duration: 3000
          })
        })
        .catch((error) => {
          if (error.response.data.error === 'duplicate')
          {
            this.$toast.open({
              message: 'You hava already applied for this job !',
              type: 'error',
              duration: 3000
            })
          }
        });
    },
    phoneIsValid()
    {
      return /^01[0125][0-9]{8}$/.test(this.phone);
    },
    phoneErrorMessage() {
      return this.phoneIsValid ? null : 'Please enter a 10-digit phone number.';
    },
    emailIsValid()
    {
      return this.userEmail.split('@') === 2;
    }
  },
};
</script>
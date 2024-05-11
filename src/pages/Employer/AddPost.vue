<script setup>
import Navbar from '../../components/Navbar.vue';
import axios from 'axios';
</script>

<template>
  <div>
    <h2>Add Job Post</h2>
    <form @submit.prevent="submitJobPost" novalidate>
      <div>
        <label for="jobTitle">Job Title:</label>
        <input type="text" id="jobTitle" v-model="jobTitle" required maxlength="50">
        <!-- Add maxlength="50" to limit input length -->
      </div>
      <div>
        <label for="skills">Skills:</label>
        <input type="text" id="skills" v-model="skills" required>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="description" rows="4" required minlength="50"></textarea>
        <!-- Add minlength="50" to enforce minimum character requirement -->
      </div>
      <div>
        <label for="responsibilities">Responsibilities:</label>
        <textarea id="responsibilities" v-model="responsibilities" rows="4" required minlength="50"></textarea>
      </div>
      <div>
        <label for="qualifications">Qualifications:</label>
        <textarea id="qualifications" v-model="qualifications" rows="4" required minlength="50"></textarea>
      </div>
      <div>
        <label for="startSalary">Start Salary:</label>
        <input type="number" id="startSalary" v-model="startSalary">
      </div>
      <div>
        <label for="endSalary">End Salary:</label>
        <input type="number" id="endSalary" v-model="endSalary">
      </div>
      <div>
        <label for="location">Location:</label>
        <input type="text" id="location" v-model="location" required>
      </div>
      <div>
        <label for="workType">Work Type:</label>
        <select id="workType" v-model="workType" required>
          <option value="remote">Remote</option>
          <option value="on-site">On-Site</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>
      <div>
        <label for="applicationDeadline">Application Deadline:</label>
        <input type="date" id="applicationDeadline" v-model="applicationDeadline" required>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      jobTitle: '',
      skills: '',
      description: '',
      responsibilities: '',
      qualifications: '',
      startSalary: null,
      endSalary: null,
      location: '',
      workType: '',
      applicationDeadline: '',
      skills:"1,2,3"
    };
  },
  component:{ Navbar },
  methods: {
    submitJobPost() {
      const postData = {
        job_title: this.jobTitle,
        skills: this.skills,
        description: this.description,
        responsibilities: this.responsibilities,
        qualifications: this.qualifications,
        start_salary: this.startSalary,
        end_salary: this.endSalary,
        location: this.location,
        work_type: this.workType,
        application_deadline: this.applicationDeadline,
      };
        console.log("postData",postData)
      axios.post('http://127.0.0.1:8000/api/posts/', postData)
        .then(response => {
          console.log('Job post added successfully:', response.data);
        })
        .catch(error => {
          console.error('Error adding job post:', error.response.data);
        });
    }
  }
};
</script>

<style scoped>
/* Add any necessary CSS styles */
</style>

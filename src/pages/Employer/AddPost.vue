
<template>
  <div>
    <Navbar />

    <div class="p-mt-4 p-mb-6 p-grid p-dir-col p-align-center">
      <h2>Add Job Post</h2>
      <div class="container form-div">
      <form @submit.prevent="submitJobPost" novalidate class="p-fluid">

        <!-- Job Title -->
        <div class="p-field">
          <label for="jobTitle">Job Title:</label>
          <InputText id="jobTitle" v-model="jobTitle" required maxlength="50" />
          <InlineMessage v-if="v$.jobTitle.$error" severity="error">{{ v$.jobTitle.$errors[0].$message }}</InlineMessage>
        </div>

        <!-- Description -->
        <div class="p-field">
          <label for="description">Description:</label>
          <Textarea id="description" v-model="description" rows="4" required minlength="50" />
          <InlineMessage v-if="v$.description.$error" severity="error">{{ v$.description.$errors[0].$message }}</InlineMessage>
        </div>

        <!-- Responsibilities -->
        <div class="p-field">
          <label for="responsibilities">Responsibilities:</label>
          <Textarea id="responsibilities" v-model="responsibilities" rows="4" required minlength="50" />
          <InlineMessage v-if="v$.responsibilities.$error" severity="error">{{ v$.responsibilities.$errors[0].$message }}</InlineMessage>
        </div>

        <!-- Qualifications -->
        <div class="p-field">
          <label for="qualifications">Qualifications:</label>
          <Textarea id="qualifications" v-model="qualifications" rows="4" required minlength="50" />
          <InlineMessage v-if="v$.qualifications.$error" severity="error">{{ v$.qualifications.$errors[0].$message }}</InlineMessage>
        </div>

        <!-- Start Salary -->
        <div class="p-field">
          <label for="startSalary">Start Salary:</label>
          <InputNumber id="startSalary" v-model="startSalary" :min="0" />
        </div>

        <!-- End Salary -->
        <div class="p-field">
          <label for="endSalary">End Salary:</label>
          <InputNumber id="endSalary" v-model="endSalary" :min="0" />
        </div>

        <!-- Location -->
        <div class="p-field">
          <label for="location">Location:</label>
          <InputText id="location" v-model="location" required />
          <InlineMessage v-if="v$.location.$error" severity="error">{{ v$.location.$errors[0].$message }}</InlineMessage>
        </div>

        <!-- Work Type -->
        <div class="p-field">
          <label for="workType">Work Type:</label>
          <Dropdown id="workType" v-model="workType" required placeholder="Work Type">
            <option value="remote">Remote</option>
            <option value="on-site">On-Site</option>
            <option value="hybrid">Hybrid</option>
          </Dropdown>
        </div>

        <!-- Application Deadline -->
        <div class="p-field">
          <label for="applicationDeadline">Application Deadline:</label>
          <Calendar id="applicationDeadline" v-model="applicationDeadline" required />
          <InlineMessage v-if="v$.applicationDeadline.$error" severity="error">Application deadline must be in the future</InlineMessage>
        </div>

        <!-- Skills -->
        <div class="p-field">
          <label for="skills">Skills:</label>
          <AutoComplete v-model="autocompleteValue" multiple :suggestions="skillSuggestions" @complete="searchSkills" />
          <InlineMessage v-if="v$.selectedSkills.$error" severity="error">{{ v$.selectedSkills.$errors[0].$message }}</InlineMessage>
        </div>

        <Button type="submit" label="Submit" class="p-mt-3" />

      </form>
      </div>
    </div>

  </div>
</template>
<script>
import axios from 'axios';
import Navbar from '../../components/Navbar.vue';

import InlineMessage from 'primevue/inlinemessage';
import AutoComplete from 'primevue/autocomplete';

import { useVuelidate } from '@vuelidate/core'
import { required , minLength} from '@vuelidate/validators'
import Swal from 'sweetalert2'

import Card from 'primevue/card';


import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';



export default {
    components: {
    Navbar,
    InlineMessage,
    AutoComplete,
    InputText,
    Textarea,
    InputNumber,
    Dropdown,
    Calendar,
    Button,
    Card
  },

  data() {
    return {

      v$:useVuelidate(),
      dateFieldTouched: false,
      jobTitle: '',
      description: '',
      responsibilities: '',
      qualifications: '',
      startSalary: null,
      endSalary: null,
      location: '',
      workType: '',
      applicationDeadline: '',
      allSkills: [],
      selectedSkills: [],
      autocompleteValue:'',
      skillSuggestions:[],
    };
  },
   validations(){
      return{
      jobTitle:  {required},
      description:  {required, minLength:minLength(50)},
      responsibilities:  {required, minLength:minLength(50)},
      qualifications:  {required, minLength:minLength(50)},
      location:  {required},
      applicationDeadline: {
      isValidDate(value) {
          if (value === "") {
            return true;
          }
          const selectedDate = new Date(value);
          const currentDate = new Date();
          return selectedDate >= currentDate;
        }
      },
      selectedSkills:  {required},
      }
  },
  created() {
    this.fetchSkills();
  },
  
  methods: {
      fetchSkills() {
      axios.get(`${import.meta.env.VITE_BASE_URL}/skills`)
        .then(response => {
          this.allSkills = response.data.data;
          console.log('Skills fetched successfully:', this.allSkills);
        })
        .catch(error => {
          console.error('Error fetching skills:', error);
        });
    },
    searchSkills (event) {
      const query = event.query.toLowerCase();
      const filteredSkills = this.allSkills.filter(skill => skill.skill.toLowerCase().includes(query));
      this.skillSuggestions = filteredSkills.map(skill => skill.skill);


    },
    prepareSelectedSkills() {
      this.selectedSkills = [];
      Array.from(this.autocompleteValue).forEach(skill => {
      let matchedSkill = this.allSkills.find(item => item.skill === skill);
      if (matchedSkill) {
        this.selectedSkills.push(matchedSkill.id);
      }
      });
    },
    submitJobPost() {
      this.prepareSelectedSkills();

      const postData = {
        job_title: this.jobTitle,
        skills: Array.from(this.selectedSkills),
        description: this.description,
        responsibilities: this.responsibilities,
        qualifications: this.qualifications,
        start_salary: this.startSalary,
        end_salary: this.endSalary,
        location: this.location,
        work_type: this.workType,
        application_deadline: this.applicationDeadline,
      };
      this.v$.$validate();
      if(!this.v$.$error){
      axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, postData)
        .then(response => {
          console.log('Job post added successfully:', response.data);
          Swal.fire({
                  icon: "success",
                  text: "Your Job have been received successfully!",
                  showConfirmButton: false,
                  timer: 1500
          });
          this.$router.push('/employer/profile');
        })
        .catch(error => {
          console.error('Error adding job post:', error.response.data);
        });
       }else{
         console.log("this.v$.$error",this.v$.$errors)
       }
    }
  },
    computed: {}

};

</script>

<style scoped>
/* Add any necessary CSS styles */
</style>

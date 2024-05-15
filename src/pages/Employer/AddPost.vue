

<template>
<div>

  <Navbar/>
    <div>
      <h2>Add Job Post</h2>
      <form @submit.prevent="submitJobPost" novalidate>
        <!-- job title -->
        <div>
          <label for="jobTitle">Job Title:</label>
          <input type="text" id="jobTitle" v-model="jobTitle" required maxlength="50">
          <InlineMessage v-if="v$.jobTitle.$error">
            {{ v$.jobTitle.$errors[0].$message }}
          </InlineMessage>
        </div>
        
        <!-- Description -->
        <div>
          <label for="description">Description:</label>
          <textarea id="description" v-model="description" rows="4" required minlength="50"></textarea>
          <InlineMessage v-if = "v$.description.$error">
              {{v$.description.$errors[0].$message}}
          </InlineMessage>
        </div>

        <!-- Responsibilities -->
        <div>
          <label for="responsibilities">Responsibilities:</label>
          <textarea id="responsibilities" v-model="responsibilities" rows="4" required minlength="50"></textarea>
          <InlineMessage v-if = "v$.responsibilities.$error">
              {{v$.responsibilities.$errors[0].$message}}
          </InlineMessage>
        </div>

        <div>
          <label for="qualifications">Qualifications:</label>
          <textarea id="qualifications" v-model="qualifications" rows="4" required minlength="50"></textarea>
          <InlineMessage v-if = "v$.qualifications.$error">
              {{v$.qualifications.$errors[0].$message}}
          </InlineMessage>
        </div>

        <!-- Start Salary: -->
        <div>
          <label for="startSalary">Start Salary:</label>
          <input type="number" id="startSalary" v-model="startSalary" min="0">
        </div>

        <!-- End Salary: -->
        <div>
          <label for="endSalary">End Salary:</label>
          <input type="number" id="endSalary" v-model="endSalary" min="0">     
          
        </div>

        <!-- Location -->
        <div>
          <label for="location">Location:</label>
          <input type="text" id="location" v-model="location" required>
          <InlineMessage v-if = "v$.location.$error">
              {{v$.location.$errors[0].$message}}
          </InlineMessage>
        </div>

        <!-- Work Type -->
        <div>
          <label for="workType">Work Type:</label>
          <select id="workType" v-model="workType" required>
            <option disabled selected value="">Work Type</option>
            <option value="remote">Remote</option>
            <option value="on-site">On-Site</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <!-- Application Deadline -->
        <div>
          <label for="applicationDeadline">Application Deadline:</label>
          <input type="date" id="applicationDeadline" v-model="applicationDeadline">

          <InlineMessage v-if=" v$.applicationDeadline.$error">
            Application deadline must be in the future
          </InlineMessage>
        </div>

        <label for="skills">Skills:</label>
            <AutoComplete v-model="autocompleteValue" multiple  :suggestions="skillSuggestions" @complete="searchSkills" />
            <InlineMessage v-if = "v$.selectedSkills.$error">
                {{v$.selectedSkills.$errors[0].$message}}
            </InlineMessage>

      
        

        <button type="submit">Submit</button>
      </form>
    </div>

  
</div>
</template>

<script>
import axios from 'axios';
import Navbar from '../../components/Navbar.vue';

import InlineMessage from 'primevue/inlinemessage';
import AutoComplete from 'primevue/autocomplete';

import { useVuelidate } from '@vuelidate/core'
import { required, alphaNum , minLength} from '@vuelidate/validators'
import Swal from 'sweetalert2'

export default {
  components:{ Navbar , InlineMessage , AutoComplete},

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

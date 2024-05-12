

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
        <select id="skills" @change="handleSelectionChange" required>
          <option v-for="skill in allSkills" :key="skill.id" :value="skill.id">{{ skill.skill }}</option>
        </select>
      </div>
      <div>
        <label>Selected Skills:</label>
        <div>
          <!-- <div v-for="skillId in selectedSkills" :key="skillId">{{ getSkillNameById(skillId) }}</div>selectedSkillNames -->
          <div>{{selectedSkillNames }}</div>

        </div>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="description" rows="4" required minlength="50"></textarea>
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
import Navbar from '../../components/Navbar.vue';
import axios from 'axios';

export default {
  data() {
    return {
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
      selectedSkillNames: [],
    };
  },
  components:{ Navbar },
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
     getSkillNameById(skillId) {
      const skill = this.allSkills.find(skill => skill.id == skillId);
      console.log(typeof skillId)
      return skill ? skill.skill : '';
    },
    handleSelectionChange(event) {
      this.selectedSkills.push(event.target.value);
    },
    submitJobPost() {
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
        console.log("postData",postData)
      axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, postData)
        .then(response => {
          console.log('Job post added successfully:', response.data);
        })
        .catch(error => {
          console.error('Error adding job post:', error.response.data);
        });

    }
  },
    computed: {
    selectedSkillNames() {
      return this.selectedSkills.map(skillId => {
              console.log(skillId)

        return this.getSkillNameById(skillId)});

    }
  }

};

</script>

<style scoped>
/* Add any necessary CSS styles */
</style>

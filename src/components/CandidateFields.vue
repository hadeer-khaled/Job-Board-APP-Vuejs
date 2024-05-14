<template>
  <div>
    <div class="form-group mb-4">
      <label for="education" class="form-label">Education</label>
      <input type="text" class="form-control" id="education" :value="education" @input="$emit('update:education', $event.target.value)" required>

    </div>
    <div class="form-group mb-4">
      <label for="faculty" class="form-label">Faculty</label>
      <input type="text" class="form-control" id="faculty" :value="faculty" @input="$emit('update:faculty', $event.target.value)" required>
    </div>
    <div class="form-group mb-4">
      <label for="city" class="form-label">City</label>
      <input type="text" class="form-control" id="city" :value="city" @input="$emit('update:city', $event.target.value)">
      
    </div>
    <div class="form-group mb-4">
      <label for="experienceLevel" class="form-label">Experience Level</label>
      <input type="text" class="form-control" id="experienceLevel" :value="experienceLevel" @input="$emit('update:experienceLevel', $event.target.value)">

    </div>
    <div class="form-group mb-4">
      <label for="linkedin" class="form-label">LinkedIn</label>
      <input type="text" class="form-control" id="linkedin" :value="linkedin" @input="$emit('update:linkedin', $event.target.value)">
  
    </div>
    <div class="form-group mb-4">
      <label for="github" class="form-label">GitHub</label>
      <input type="text" class="form-control" id="github" :value="github" @input="$emit('update:github', $event.target.value)">

    </div>
    <div class="form-group mb-4">
      <label for="resume" class="form-label">Resume</label>
      <input type="file" class="form-control" id="resume" @change="onResumeChange">
   
    </div>
  </div>
</template>

<script>
export default {
  props: {
    education: String,
    faculty: String,
    city: String,
    experienceLevel: String,
    linkedin: String,
    github: String,
  },
  methods: {
    onResumeChange(event) {
      this.$emit('resumeChange', event.target.files[0]);
    }
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1.5rem;
}
</style>

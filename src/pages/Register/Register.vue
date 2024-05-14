<template>
  <div>
    <Navbar/>
    <section class="vh-100 register-section d-flex justify-content-center align-items-center">
      <div class="card text-black register-card shadow">
        <div class="card-body p-md-5">
          <h2 class="text-center mb-4">Register</h2>
          <form @submit.prevent="submitForm" novalidate="true">
            <!-- Step Navigation -->
            <div v-if="role === 'candidate'" class="mb-4">
              <ul class="nav nav-pills">
                <li class="nav-item" v-for="(step, index) in steps" :key="index">
                  <a :class="['nav-link', { active: currentStep === index }]" href="#" @click.prevent="currentStep = index">{{ step }}</a>
                </li>
              </ul>
            </div>

            <!-- Common Fields -->
            <div v-if="currentStep === 0">
              <div class="form-group mb-4">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="name" required>
              </div>
              <div class="form-group mb-4">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
              </div>
              <div class="form-group mb-4">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
              </div>
              <div class="form-group mb-4">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <div class="form-group mb-4">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required>
              </div>
              <div class="form-group mb-4">
                <label for="image" class="form-label">Image</label>
                <input type="file" class="form-control" id="image" @change="onImageChange">
              </div>
              <div class="form-group mb-4">
                <label for="role" class="form-label">Role</label>
                <select class="form-control" id="role" v-model="role" required>
                  <option value="" disabled>Select your role</option>
                  <option value="candidate">Candidate</option>
                  <option value="employer">Employer</option>
                </select>
              </div>
            </div>

            <!-- Role Specific Fields -->
            <component :is="roleComponent" v-bind="roleProps" v-if="currentStep === 1"></component>

            <!-- Display errors -->
            <div v-if="errors.length">
              <ul>
                <li v-for="(error, index) in errors" :key="index" class="text-danger">{{ error }}</li>
              </ul>
            </div>

            <!-- Navigation Buttons -->
            <div v-if="role === 'candidate'">
                <button type="button" class="btn btn-secondary" @click="prevStep" v-if="currentStep > 0">Previous</button>
                <button type="submit" class="btn btn-primary">Register</button>
            </div>

            <div v-if="role === 'employer'">
                <EmployerFields v-bind="roleProps"/>
            </div>

            <button type="submit" class="btn btn-primary w-100" v-if="role !== 'candidate'">Register</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useUserStore } from "../../store/modules/UserPinia";
import Navbar from '../../components/Navbar.vue';
import CandidateFields from '../../components/CandidateFields.vue';
import EmployerFields from '../../components/EmployerFields.vue';
import router from '../../router';

export default {
  components: {
    Navbar,
    CandidateFields,
    EmployerFields
  },
  setup() {
    const userStore = useUserStore();
    const name = ref('');
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const image = ref(null);
    const role = ref('');
    const resume = ref(null);
    const education = ref('');
    const faculty = ref('');
    const city = ref('');
    const experienceLevel = ref('');
    const linkedin = ref('');
    const github = ref('');
    const companyName = ref('');
    const logo = ref(null);
    const errors = ref([]);
    const currentStep = ref(0);

    const steps = ['General Info', 'Additional Info'];

    const onImageChange = (event) => {
      image.value = event.target.files[0];
    };

    const onResumeChange = (file) => {
      resume.value = file;
    };

    const onLogoChange = (file) => {
      logo.value = file;
    };

    const roleComponent = computed(() => {
      return role.value === 'candidate' ? CandidateFields : role.value === 'employer' ? EmployerFields : null;
    });

    const roleProps = computed(() => {
      return role.value === 'candidate' ? {
        education: education.value,
        faculty: faculty.value,
        city: city.value,
        experienceLevel: experienceLevel.value,
        linkedin: linkedin.value,
        github: github.value,
        resumeChange: onResumeChange,
        errors: {
          education: errors.value.find(err => err.includes('education')),
          faculty: errors.value.find(err => err.includes('faculty')),
          resume: errors.value.find(err => err.includes('resume'))
        }
      } : role.value === 'employer' ? {
        companyName: companyName.value,
        logoChange: onLogoChange
      } : {};
    });

    const nextStep = () => {
      if (currentStep.value < steps.length - 1) {
        currentStep.value++;
      }
    };

    const prevStep = () => {
      if (currentStep.value > 0) {
        currentStep.value--;
      }
    };

    const submitForm = async () => {
      errors.value = [];

      if (!name.value) {
        errors.value.push("Name required.");
      }
      if (!username.value) {
        errors.value.push("Username required.");
      }
      if (!email.value) {
        errors.value.push("Email required.");
      } else if (!validEmail(email.value)) {
        errors.value.push('Valid email required.');
      }
      if (!password.value) {  errors.value.push("Password required.");
      }
      if (!confirmPassword.value) {
        errors.value.push("Password confirmation required.");
      } else if (password.value !== confirmPassword.value) {
        errors.value.push("Passwords do not match.");
      }
      if (!role.value) {
        errors.value.push("Role required.");
      }

      if (role.value === 'candidate') {
        if (!education.value) {
          errors.value.push("Education required.");
        }
        if (!faculty.value) {
          errors.value.push("Faculty required.");
        }
        if (!resume.value) {
          errors.value.push("Resume required.");
        }
      }

      if (errors.value.length === 0) {
        try {
          const formData = new FormData();
          formData.append('name', name.value);
          formData.append('username', username.value);
          formData.append('email', email.value);
          formData.append('password', password.value);
          formData.append('role', role.value);
          if (image.value) formData.append('image', image.value);

          if (role.value === 'candidate') {
            formData.append('education', education.value);
            formData.append('faculty', faculty.value);
            formData.append('city', city.value);
            formData.append('experienceLevel', experienceLevel.value);
            if (linkedin.value) formData.append('linkedin', linkedin.value);
            if (github.value) formData.append('github', github.value);
            if (resume.value) formData.append('resume', resume.value);
            await userStore.candidateRegister(formData);
          } else if (role.value === 'employer') {
            formData.append('companyName', companyName.value);
            if (logo.value) formData.append('logo', logo.value);
            await userStore.empRegister(formData);
          }
          router.push('/');
        } catch (error) {
          console.error('Registration failed:', error);
        }
      }
    };

    const validEmail = (email) => {
      var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return re.test(String(email).toLowerCase());
    };

    return {
      name,
      username,
      email,
      password,
      confirmPassword,
      image,
      role,
      resume,
      education,
      faculty,
      city,
      experienceLevel,
      linkedin,
      github,
      companyName,
      logo,
      errors,
      currentStep,
      steps,
      roleComponent,
      roleProps,
      onImageChange,
      onResumeChange,
      onLogoChange,
      nextStep,
      prevStep,
      submitForm
    };
  }
};
</script>

<style scoped>
.register-section {
  background-color: #eee;
}

.register-card {
  border-radius: 25px;
  width: 800px;
}

@media (max-width: 576px) {
  .register-card {
    width: 90%;
    margin: 2px auto 0;
  }
}
</style>

<template>
  <div>
    <Navbar/>
    <section class="vh-100 register-section d-flex justify-content-center align-items-center">
      <div class="card text-black register-card shadow">
        <div class="card-body p-md-5">
          <h2 class="text-center mb-4">Register</h2>
          <form @submit.prevent="submitForm" novalidate="true">
            <div v-if="role === 'candidate'" class="mb-4">
              <ul class="nav nav-pills">
                <li class="nav-item" v-for="(step, index) in steps" :key="index">
                  <a :class="['nav-link ', { active: currentStep === index }]" href="#" @click.prevent="currentStep = index">{{ step }}</a>
                </li>
              </ul>
            </div>
            <div v-if="currentStep === 0">
              <div class="form-group mb-4">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="name" :placeholder="errorMessages.name || 'Enter your name'" required :class="{ 'is-invalid': errorMessages.name }">
              </div>
              <div class="form-group mb-4">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" :placeholder="errorMessages.username || 'Enter your username'" required :class="{ 'is-invalid': errorMessages.username }">
              </div>
              <div class="form-group mb-4">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" :placeholder="errorMessages.emailRe || 'Enter your email'" required :class="{ 'is-invalid': errorMessages.emailRe }">
                <small v-if="errorMessages.role" class="text-danger">{{ errorMessages.email }}</small>
              </div>
              <div class="form-group mb-4">
                <label for="password" class="form-label">Password</label>
                <div class="input-group">
                  <input type="password" class="form-control" id="password" v-model="password" :placeholder="errorMessages.password || 'Enter your password'" required :class="{ 'is-invalid': errorMessages.password }">
                  <button class="btn btn-outline-secondary" type="button" @click="togglePasswordVisibility">
                    <FontAwesomeIcon :icon="passwordFieldIcon"/>
                  </button>
                </div>
              </div>
              <div class="form-group mb-4">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <div class="input-group">
                  <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" :placeholder="errorMessages.confirmPasswordRe || 'Confirm your password'" required :class="{ 'is-invalid': errorMessages.confirmPasswordRe }">
                  <button class="btn btn-outline-secondary" type="button" @click="toggleConfirmPasswordVisibility">
                    <FontAwesomeIcon :icon="confirmPasswordFieldIcon"/>
                  </button>
                </div>
                <small v-if="errorMessages.role" class="text-danger">{{ errorMessages.confirmPassword }}</small>
              </div>
              <div class="form-group mb-4">
                <label for="image" class="form-label">Image</label>
                <input type="file" class="form-control" id="image" @change="onImageChange">
              </div>
              <div class="form-group mb-4">
                <label for="role" class="form-label">Role</label>
                <select class="form-control" id="role" v-model="role" required :class="{ 'is-invalid': errorMessages.role }">
                  <option value="" disabled>Select your role</option>
                  <option value="candidate">Candidate</option>
                  <option value="employer">Employer</option>
                </select>
                <small v-if="errorMessages.role" class="text-danger">{{ errorMessages.role }}</small>
              </div>
            </div>

            <div v-if="currentStep === 1">
              <CandidateFields
                :education="education"
                :faculty="faculty"
                :city="city"
                :experienceLevel="experienceLevel"
                :linkedin="linkedin"
                :github="github"
                @update:education="education = $event"
                @update:faculty="faculty = $event"
                @update:city="city = $event"
                @update:experienceLevel="experienceLevel = $event"
                @update:linkedin="linkedin = $event"
                @update:github="github = $event"
                @update:resume="handleResumeChange"
              />
            </div>

            <div v-if="role === 'candidate'">
              <button type="button" class="btn btn-secondary mr-2" @click="prevStep" v-if="currentStep > 0">Previous</button>
              <button type="submit" class="btn btn-primary ml-4">Register</button>
            </div>

            <div v-if="role === 'employer'">
             <EmployerFields
                :companyName="companyName"
                :logo="logo"
                @update:companyName="companyName = $event"
                @update:logo="onLogoChange"
                />
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
import { useUserStore } from '../../store/modules/UserPinia'
import Navbar from '../../components/Navbar.vue';
import CandidateFields from '../../components/CandidateFields.vue';
import EmployerFields from '../../components/EmployerFields.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from '../../router'; 
export default {
  name: 'Register',
  components: {
    Navbar,
    CandidateFields,
    EmployerFields,
    FontAwesomeIcon
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
    const education = ref('');
    const faculty = ref('');
    const city = ref('');
    const experienceLevel = ref('');
    const linkedin = ref('');
    const github = ref('');
    const resume = ref(null);
    const logo = ref(null);
    const company_name=ref('');
    const currentStep = ref(0);
    const errorMessages = ref({});
    const passwordFieldIcon = ref(['fas', 'eye']);
    const confirmPasswordFieldIcon = ref(['fas', 'eye']);
    const steps = ref(['Step 1', 'Step 2']);
    const errors= [];
    const errorMessage= [];

    const roleProps = computed(() => {
      return role.value === 'candidate' ? {
        education: education.value,
        faculty: faculty.value,
        city: city.value,
        experienceLevel: experienceLevel.value,
        linkedin: linkedin.value,
        github: github.value,
        'onUpdate:education': (value) => education.value = value,
        'onUpdate:faculty': (value) => faculty.value = value,
        'onUpdate:city': (value) => city.value = value,
        'onUpdate:experienceLevel': (value) => experienceLevel.value = value,
        'onUpdate:linkedin': (value) => linkedin.value = value,
        'onUpdate:github': (value) => github.value = value,
        'onUpdate:resume': handleResumeChange,
        
      } : role.value === 'employer' ? {
        company_name: companyName.value,
        'update:companyName': (value) => companyName.value = value,
        'update:logo':handleLogoChange
      } : {};
    });

    const handleResumeChange = (file) => {
      resume.value = file;
    };
    const handleLogoChange = (file) => {
      logo.value = file;
    };
    const validateFields = () => {
      if (!name.value) {
        errorMessages.value.name = "Name required.";
      }
      if (!username.value) {
        errorMessages.value.username = "Username required.";
      }
      if (!email.value) {
        errorMessages.value.emailRe = "Email required.";
      } else if (!validEmail(email.value)) {
        errorMessages.value.email = "Invalid email.";
      }
      if (!password.value) {
        errorMessages.value.password = "Password required.";
      }
      if (!confirmPassword.value) {
        errorMessages.value.confirmPasswordRe = "Password confirmation required.";
      } else if (password.value !== confirmPassword.value) {
        errorMessages.value.confirmPassword = "Passwords do not match.";
      }
      if (!role.value) {
        errorMessages.value.role = "Role required.";
      }
     };
    const togglePasswordVisibility = () => {
      const passwordField = document.getElementById('password');
      if (passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordFieldIcon.value = ['fas', 'eye-slash'];
      } else {
        passwordField.type = 'password';
        passwordFieldIcon.value = ['fas', 'eye'];
      }
    };

    const toggleConfirmPasswordVisibility = () => {
      const confirmPasswordField = document.getElementById('confirmPassword');
      if (confirmPasswordField.type === 'password') {
        confirmPasswordField.type = 'text';
        confirmPasswordFieldIcon.value = ['fas', 'eye-slash'];
      } else {
        confirmPasswordField.type = 'password';
        confirmPasswordFieldIcon.value = ['fas', 'eye'];
      }
    };

    const onImageChange = (event) => {
      image.value = event.target.files[0];
    };

    const submitForm = async () => {
    errors.value = [];
    errorMessages.value = {};

    validateFields();

    if (Object.keys(errorMessages.value).length === 0) {
        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('username', username.value);
        formData.append('email', email.value);
        formData.append('password', password.value);
        formData.append('confirmPassword', confirmPassword.value);
        formData.append('role', role.value);
        if (image.value) formData.append('image', image.value);
        if (role.value === 'candidate') {
            formData.append('education', education.value);
            formData.append('faculty', faculty.value);
            formData.append('city', city.value);
            formData.append('experienceLevel', experienceLevel.value);
            formData.append('linkedin', linkedin.value);
            formData.append('github', github.value);
            if (resume.value) formData.append('resume', resume.value);
            await userStore.candidateRegister(formData);
        }else if (role.value === 'employer') {
            formData.append('companyName', companyName.value);
            if (logo.value) formData.append('logo', logo.value);
            await userStore.empRegister(formData);
        }
    }
     
     
    };
    const validEmail = (email) => {
      var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return re.test(String(email).toLowerCase());
    };
    const prevStep = () => {
      if (currentStep.value > 0) currentStep.value -= 1;
    };

    return {
      name,
      username,
      email,
      password,
      confirmPassword,
      image,
      role,
      education,
      faculty,
      city,
      experienceLevel,
      linkedin,
      github,
      resume,
      currentStep,
      errorMessages,
      passwordFieldIcon,
      confirmPasswordFieldIcon,
      steps,
      roleProps,
      handleResumeChange,
      togglePasswordVisibility,
      toggleConfirmPasswordVisibility,
      submitForm,
      prevStep,
      onImageChange
    };
  }
};
</script>

<style scoped>
.register-section {
  background-color: #f8f9fa;
}
.register-card {
  width: 100%;
  max-width: 800px;
}
</style>
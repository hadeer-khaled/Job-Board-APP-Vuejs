<template>
  <div>
    <Navbar/>
    <section class="vh-100 register-section d-flex justify-content-center align-items-center">
      <div class="carousel-section">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" @mouseover="handleMouseOver">
          <div class="carousel-indicators">
            <button v-for="(image, index) in carouselImages" type="button" :data-bs-target="'#carouselExampleIndicators'" :data-bs-slide-to="index" :class="{ active: index === activeImageIndex }" :key="index" aria-label="Slide {{ index + 1 }}"></button>
          </div>
          <div class="carousel-inner">
            <div v-for="(image, index) in carouselImages" :class="['carousel-item', { active: index === activeImageIndex }]" :key="index">
              <img :src="image.src" class="d-block w-100" :alt="'Image ' + (index + 1)">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" @click="prevImage">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next" @click="nextImage">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="card text-black register-card shadow d-flex flex-row">

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
                 <p v-if="errorMessages.usernameFromServer" class="text-danger">{{ errorMessages.usernameFromServer}}</p>
              </div>
              <div class="form-group mb-4">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" :placeholder="errorMessages.emailRe || 'Enter your email'" required :class="{ 'is-invalid': errorMessages.emailRe }">
                <small v-if="errorMessages.role" class="text-danger">{{ errorMessages.email }}</small>
                <small v-if="errorMessages.emailFromServer" class="text-danger">{{ errorMessages.emailFromServer}}</small>
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
               <small v-if="errorMessages.role" class="text-danger">{{ errorMessages.passwordStrong }}</small>
              <div class="form-group mb-4">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <div class="input-group">
                  <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" :placeholder="errorMessages.confirmPasswordRe || 'Confirm your password'" required :class="{ 'is-invalid': errorMessages.confirmPasswordRe }">
                  <button class="btn btn-outline-secondary" type="button" @click="toggleConfirmPasswordVisibility">
                    <FontAwesomeIcon :icon="confirmPasswordFieldIcon"/>
                  </button>
                </div>
                <small v-if="errorMessages.confirmPassword" class="text-danger">{{ errorMessages.confirmPassword }}</small>
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
                @update:logo="logo = $event"
              />
            </div>
             
             <button type="submit" class="btn btn-primary w-100" v-if="role !== 'candidate'">Register</button>
             <p v-if="errorMessages.errorFromServer" class="text-danger">{{ errorMessages.errorFromServer}}</p>
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
   data(){
     return {
      carouselImages: [
        { src: 'https://res.cloudinary.com/deqwn8wr6/image/upload/v1715739563/live-collaboration_wlfyki.svg', description: 'First Image Description' },
        { src: 'https://res.cloudinary.com/deqwn8wr6/image/upload/v1715739562/subscribe_gejtmt.svg', description: 'Second Image Description' },
        { src: 'https://res.cloudinary.com/deqwn8wr6/image/upload/v1715739562/security_yu7oyj.svg', description: 'Third Image Description' }
      ],
      activeImageIndex: 0,
      cursorStyles: ['default', 'pointer', 'text', 'wait'],
  }},
  mounted() {
   this.handleMouseOver();
    setInterval(this.nextImage, 5000); 
  },
 
  methods: {
     handleMouseOver() {
      document.body.style.cursor = this.cursorStyles[this.activeImageIndex % this.cursorStyles.length];
    },
    nextImage() {
      this.activeImageIndex = (this.activeImageIndex + 1) % this.carouselImages.length;
      this.handleMouseOver();
    },
    prevImage() {
      this.activeImageIndex = (this.activeImageIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
      this.handleMouseOver();
    }
  
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
    const companyName = ref('');
    const logo = ref(null);
    const currentStep = ref(0);
    const errorMessages = ref({});
    const passwordFieldIcon = ref(['fas', 'eye']);
    const confirmPasswordFieldIcon = ref(['fas', 'eye']);
    const steps = ref(['Data', 'Additional Info']);
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
        companyName: companyName.value,
        'update:companyName': (value) => companyName.value = value,
        'update:logo': (value) => logo.value = value,
         logo: logo.value 
      } : {};
    });

     const handleResumeChange = (file) => {
       resume.value = file;
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
      }else if (!validatePassword(password.value) ){
        errorMessages.value.passwordStrong = "Must contain least eight characters, at least one number, lowercase, uppercase letter, and one special character.";
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
            formData.append('experience_level', experienceLevel.value);
            formData.append('linkedin', linkedin.value);
            formData.append('github', github.value);
            if (resume.value) formData.append('resume', resume.value);
            console.log(experienceLevel.value);
          try{
            await userStore.candidateRegister(formData);
            errorMessages.value.created="Candidte created Succefully!";
            router.push('/login');
          }catch(error){
          if (error.response.data.exception=="Illuminate\\Database\\UniqueConstraintViolationException" ) {
                   errorMessages.value.usernameFromServer="username already exist";
            }
            if (error.response && error.response.data.errors) {
            const serverErrors = error.response.data.errors;
             Object.keys(serverErrors).forEach(key => {
              errorMessages.value[`${key}FromServer`] = serverErrors[key][0];
            });
          }
          }
        }else if (role.value === 'employer') {
          formData.append('company_name', companyName.value);
          if (logo.value) formData.append('logo', logo.value);
          try{
              await userStore.empRegister(formData);
              errorMessages.value.created=" created Succefully!";
              router.push('/login');
          }catch(error){
            if (error.response.data.exception=="Illuminate\\Database\\UniqueConstraintViolationException" ) {
                   errorMessages.value.usernameFromServer="username already exist";
            }
            if (error.response && error.response.data.errors) {
            const serverErrors = error.response.data.errors;
             Object.keys(serverErrors).forEach(key => {
              errorMessages.value[`${key}FromServer`] = serverErrors[key][0];
            });
          }
          }
        }
    }
     
    };

    const validatePassword = (password) => {
      const re = /^(?=.*[A-Z])(?=.*[a-z])((?=.*\d)|(?=.*\W+)).{8,}$/;
      return re.test(password);
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
      companyName,
      logo,
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
  max-width: 700px;
}
.register-section {
  background-color: #eee;
}

.register-card {
  border-radius: 25px;
  display: flex;
  flex-direction: row;
}

.carousel-section {
  width: 22%;
}

.card-body {
  width: 60%;
}

@media (max-width: 576px) {
  .register-card {
    flex-direction: column;
  }

  .carousel-section,
  .card-body {
    width: 50%;
  }
}

.is-invalid {
  border-color: red;
}

.text-danger {
  color: red;
}

</style>
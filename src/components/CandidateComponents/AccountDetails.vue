<template>
    <div class="card mb-4">
        <div class="card-header">Account Details</div>
        <div class="card-body">
            <form @submit.prevent="submit">
                <div class="mb-3">
                    <label class="small mb-1" for="inputFirstName">Name</label>
                    <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your name" v-model="name">
                    <small class="text-danger" v-if="v.name.$error">{{ v.name.$errors[0].$message }}</small>
                </div>

                <!-- Form Group (username)-->
                <div class="mb-3">
                    <label class="small mb-1" for="inputUsername">Username (how your name will appear to other users on the site)</label>
                    <input class="form-control" id="inputUsername" type="text" placeholder="Enter your username" v-model="username">
                    <small class="text-danger" v-if="v.username.$error">{{ v.username.$errors[0].$message }}</small>
                </div>
                
                <div class="mb-3">
                    <label class="small mb-1" for="inputEmailAddress">Email address</label>
                    <input class="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" v-model="email">
                    <small class="text-danger" v-if="v.email.$error">{{ v.email.$errors[0].$message }}</small>
                </div>
                <!-- Form Row        -->
                <div class="row gx-3 mb-3">
                    <!-- Form Group (faculty name)-->
                    <div class="col-md-6">
                        <label class="small mb-1" for="inputFacName">Faculty name</label>
                        <input class="form-control" id="inputFacName" type="text" placeholder="Enter your faculty name" v-model="faculty">
                    </div>
                    <!-- Form Group (education)-->
                    <div class="col-md-6">
                        <label class="small mb-1" for="inputEducation">Education</label>
                        <input class="form-control" id="inputEducation" type="text" placeholder="Enter your Education" v-model="education">
                    </div>
                </div>
                <!-- Form Group (city)-->
                <div class="mb-3">
                    <label class="small mb-1" for="inputCity">City</label>
                    <input class="form-control" id="inputCity" type="text" placeholder="Enter your city" v-model="city">
                </div>
                <!-- Form Group (email address)-->
                <div class="mb-3">
                    <label class="small mb-1" for="inputResume">Resume</label>
                    <input class="form-control" id="inputResume" type="file">
                    <button class="btn btn-primary" @click="previewResume(resume)">Preview</button>
                </div>
                <!-- Save changes button-->
                <button class="btn btn-primary" type="button" @click="submit">Save changes</button>
            </form>
        </div>
    </div>
    
</template>

<script>
    import useVuelidate from '@vuelidate/core'; 
    import { email, minLength, required } from '@vuelidate/validators';
    import axiosInstance from '../../axios';
    export default {
        props: ['user', 'userStore'],
        setup() {
            return {
                v : useVuelidate()
            }
        },
        data() {
            return {
                name : this.user.name,
                email : this.user.email,
                city : this.user.city,
                faculty : this.user.faculty,
                education : this.user.education,
                username : this.user.username,
                resume : this.user.resume,
            }
        },
        validations() {
            return {
                name : { required },
                email : { required, email },
                username : { required },
            }
        },
        validationConfig: {
            $autoDirty: true,
            $lazy: true,
        },
        methods: {
            async submit(event) {
                console.log(this.v.$errors);
                const result = await this.v.$validate();

                if (!result) {
                    console.log("ERROR");
                    return;
                }
                else {
                    const data = {
                        name: this.name,
                        email: this.email,
                        city: this.city,
                        faculty: this.faculty,
                        education: this.education,
                        username: this.username,
                    };
                    const url = import.meta.env.VITE_BASE_URL;
                    axiosInstance
                    .patch(url+'/candidates/'+this.user.id, data)
                    .then((res) => {                        
                        this.userStore.user = res.data.data;
                    })
                    .catch(err => console.log(err))
                }
            },
            previewResume(url) {
                window.open(url, '_blank').focus();
            }
        }
    }
</script>
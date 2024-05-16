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

                <div class="mb-3">
                    <label class="small mb-1" for="inputPassword">Password</label>
                    <input class="form-control" id="inputPassword" type="password" placeholder="Enter your password" v-model="password">
                    <small class="text-danger" v-if="v.password.$error">{{ v.password.$errors[0].$message }}</small>
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
                    <input class="form-control" id="inputResume" type="file" @change="fileChange">
                    <button class="btn btn-primary" @click="previewResume(resume)">Preview</button>
                </div>
                <!-- Save changes button-->
                <div class="mb-3">
                    <label class="small mb-1" for="inputSkills">Skills</label><br/>
                    <AutoComplete v-model="selectedSkill" forceSelection :suggestions="filteredSkills" @complete="search" />
                    <button type="button" class="btn btn-primary" @click="addSkill">Add</button>
                </div>

                <div class="mb-3">
                    <div class="d-flex flex-wrap">
                        <span v-for="(skill, index) in skills" :key="index" 
                            class="my-1 px-3 py-2 rounded position-relative" 
                            :style="{ backgroundColor: 'rgba(116, 184, 210, 0.48)' }"
                            :class="{ 'mx-2': index !== 0, 'me-2': index === 0 }">
                            {{ skill.skill }}
                            <button @click="removeSkill(skill)" type="button" class="btn-close position-absolute top-0 end-0" aria-label="Close" style="font-size: x-small;"></button>
                        </span>
                    </div>
                </div>

                <button class="btn btn-primary" type="button" @click="submit">Save changes</button>
            </form>
        </div>
    </div>
    
</template>

<script>
    import useVuelidate from '@vuelidate/core'; 
    import { email, minLength, required } from '@vuelidate/validators';
    import axiosInstance from '../../axios';
    import AutoComplete from 'primevue/autocomplete';
    export default {
        props: ['user', 'userStore'],
        components: {
            AutoComplete,
        },
        setup() {
            return {
                v : useVuelidate()
            }
        },
        data() {
            return {
                name : this.user.name,
                email : this.user.email,
                password : null,
                city : this.user.city,
                faculty : this.user.faculty,
                education : this.user.education,
                username : this.user.username,
                resume : this.user.resume,
                skills : this.user.skills || [],
                allSkills: null,
                filteredSkills: null,
                selectedSkill: '',
                uploadedResume : null,
            }
        },
        beforeMount() {
            this.fetchSkills();
        },
        validations() {
            return {
                name : { required },
                email : { required, email },
                username : { required },
                password : { minLength: minLength(8) },
            }
        },
        validationConfig: {
            $autoDirty: true,
            $lazy: true,
        },
        methods: {
            fetchSkills() {
                axiosInstance.get('/skills')
                .then((res) => {
                    this.allSkills = res.data.data;
                })
                .catch(err => console.log(err));
            },
            async submit(event) {
                const result = await this.v.$validate();
                if (!result) {
                    console.log("ERROR");
                    return;
                }
                else {
                    const formData = new FormData();
                    const data = {
                        _method: 'put',
                        name: this.name,
                        email: this.email,
                        city: this.city,
                        faculty: this.faculty,
                        education: this.education,
                        username: this.username,
                        skills: JSON.stringify(this.skills),
                    };
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            formData.append(key, data[key]);
                        }
                    }
                    if (this.uploadedResume) {
                        formData.append('resume', this.uploadedResume);
                    }
                    if (this.password) {
                        formData.append('password', this.password);
                    }
                    axiosInstance
                    .post('/candidates/'+this.user.id, formData)
                    .then((res) => {
                        console.log("Updated candidate", res.data.data);                        
                        this.userStore.user = res.data.data;
                    })
                    .catch(err => console.log(err))
                }
            },
            previewResume(url) {
                window.open(url, '_blank').focus();
            },
            fileChange(e) {
                const file = e.target.files[0];  
                this.uploadedResume = file;
            },
            search(event) {
                setTimeout(() => {
                    if (!event.query.trim().length) {
                        this.filteredSkills = this.allSkills.map((skill) => {
                            return skill.skill;
                        });
                        
                    } else {
                        const mappedSkills = this.allSkills.map((skill) => {
                            return skill.skill;
                        });
                        this.filteredSkills = mappedSkills.filter((skill) => {
                            return skill.toLowerCase().startsWith(event.query.toLowerCase());
                        });
                    }
                }, 250);
            },
            addSkill() {
                this.selectedSkill = this.allSkills.find((skill) => this.selectedSkill == skill.skill);
                this.skills.push(this.selectedSkill);
                this.selectedSkill = '';
            },
            removeSkill(rmSkill) {
                this.skills = this.skills.filter((skill) => {
                    return skill !== rmSkill;
                })
            }
            
        }
    }
</script>
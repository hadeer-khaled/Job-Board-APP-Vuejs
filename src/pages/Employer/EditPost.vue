<template>
    <div>
        <Navbar />

        <div class="p-mt-4 p-mb-6 p-grid p-dir-col p-align-center">
            <div class="container form-div">
                <Card>
                    <template #title>Edit Job</template>
                    <template #content>
                        <form @submit.prevent="submitJobPost" novalidate class="p-fluid">
                            <div class="d-flex justify-content-center">
                                <!-- Job Title -->
                                <div class="p-field  w-50">
                                    <label for="jobTitle">Job Title:</label>
                                    <InputText id="jobTitle" v-model="jobTitle" required maxlength="50" />
                                    <InlineMessage v-if="v$.jobTitle.$error" severity="error">{{ v$.jobTitle.$errors[0].$message }}</InlineMessage>
                                </div>

                                <!-- Work Type -->
                                <div class="p-field w-50">
                                    <label for="workType">Work Type:</label>
                                    <Dropdown v-model="workType" :options="workTypeOptions" optionLabel="name" placeholder="Work Type" checkmark :highlightOnSelect="false" class="w-full md:w-14rem" />
                                    <InlineMessage v-if="v$.workType.$error" severity="error">{{ v$.workType.$errors[0].$message }}</InlineMessage>
                                </div>
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

                            <!--  Salaries -->
                            <div class="d-flex justify-content-center">
                                <!-- Start Salary -->
                                <div class="p-field w-50">
                                    <label for="startSalary">Start Salary:</label>
                                    <InputNumber id="startSalary" v-model="startSalary" :min="0" />
                                </div>

                                <!-- End Salary -->
                                <div class="p-field w-50">
                                    <label for="endSalary">End Salary:</label>
                                    <InputNumber id="endSalary" v-model="endSalary" :min="0" />
                                </div>
                            </div>

                            <!-- Location -->
                            <div class="p-field">
                                <label for="location">Location:</label>
                                <InputText id="location" v-model="location" required />
                                <InlineMessage v-if="v$.location.$error" severity="error">{{ v$.location.$errors[0].$message }}</InlineMessage>
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

                            <Button class="mt-3" type="submit" label="Submit" icon="pi pi-check" iconPos="right" severity="success" />
                        </form>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
import axiosInstance from '../../axios/index';
import { useUserStore } from '../../store/modules/UserPinia';
import Navbar from '../../components/Navbar.vue';
import InlineMessage from 'primevue/inlinemessage';
import AutoComplete from 'primevue/autocomplete';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
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
            v$: useVuelidate(),
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
            autocompleteValue: '',
            skillSuggestions: [],
            workTypeOptions: [
                { name: 'Remote', code: 'remote' },
                { name: 'On-Site', code: 'on-site' },
                { name: 'Hybrid', code: 'hybrid' }
            ]
        };
    },

    validations() {
        return {
            jobTitle: { required },
            workType: { required },
            description: { required, minLength: minLength(50) },
            responsibilities: { required, minLength: minLength(50) },
            qualifications: { required, minLength: minLength(50) },
            location: { required },
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
            selectedSkills: { required },
        }
    },

    created() {
        this.fetchSkills();
        this.fetchJobPost();
    },

    methods: {
        fetchSkills() {
            axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/skills`)
                .then(response => {
                    this.allSkills = response.data.data;
                    console.log('Skills fetched successfully:', this.allSkills);
                })
                .catch(error => {
                    console.error('Error fetching skills:', error);
                });
        },

        searchSkills(event) {
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

        fetchJobPost() {
            const postId = this.$route.params.id;
            axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`)
                .then(response => {
                    const post = response.data.data;
                    this.jobTitle = post.job_title;
                    this.description = post.description;
                    this.responsibilities = post.responsibilities;
                    this.qualifications = post.qualifications;
                    this.startSalary = post.start_salary;
                    this.endSalary = post.end_salary;
                    this.location = post.location;
                    this.workType = this.workTypeOptions.find(option => option.code === post.work_type);
                    this.applicationDeadline = new Date(post.application_deadline);
                    this.autocompleteValue = post.skills.map(skill => skill.skill);
                })
                .catch(error => {
                    console.error('Error fetching job post:', error);
                });
        },

        submitJobPost() {
            this.prepareSelectedSkills();
            const postId = this.$route.params.id;
            const postData = {
                job_title: this.jobTitle,
                skills: Array.from(this.selectedSkills),
                description: this.description,
                responsibilities: this.responsibilities,
                qualifications: this.qualifications,
                start_salary: this.startSalary,
                end_salary: this.endSalary,
                location: this.location,
                work_type: this.workType.code,
                application_deadline: this.applicationDeadline.toISOString().split('T')[0],
            };

            this.v$.$validate();
            if (!this.v$.$error) {
                axiosInstance.put(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`, postData)
                    .then(response => {
                        console.log('Job post updated successfully:', response.data);
                        Swal.fire({
                            icon: "success",
                            text: "Your Job has been updated successfully!",
                            showConfirmButton: false,
                            timer: 2000
                        });
                        this.$router.push('/employer/profile');
                    })
                    .catch(error => {
                        console.error('Error updating job post:', error.response.data);
                    });
            } else {
                console.log("Validation errors:", this.v$.$errors);
                console.log("postData", postData);
            }
        }
    }
};
</script>

<style scoped>
/* Add any necessary CSS styles */
</style>

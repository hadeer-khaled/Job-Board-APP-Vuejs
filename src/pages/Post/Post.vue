<script setup>
import PostHeader from '../../components/PostComponents/PostHeader.vue';
import PostDescription from '../../components/PostComponents/PostDescription.vue';
import Navbar from '../../components/Navbar.vue';
import EmployerPost from '../../pages/Post/EmployerPost.vue';
import axios from 'axios';

import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useRouter } from 'vue-router';

const $toast = useToast();
const confirm = useConfirm();
const router = useRouter();

const deletePost = (id) => {
    console.log(id);
    axios
        .delete(`${import.meta.env.VITE_BASE_URL}/posts/${id}`)
        .then(res => {
            const message = res.data.message;
            $toast.success(message);
            router.push('/employer/profile');
        })
        .catch(err => console.log(err));
};

const requireConfirmation = (event, id) => {
    confirm.require({
        target: event.currentTarget,
        group: 'headless',
        message: 'Are you sure you want to delete this post?',
        icon: 'pi pi-info-circle',
        accept: () => {
            deletePost(id);
        },
        reject: () => {
            $toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};
</script>

<template>
    <div>
        <Navbar />
        <div class="container p-5">
            <PostHeader 
                :job_title="data.job_title"
                :location="data.location"
                :company="company"
                :application_deadline="data.application_deadline"
                :created_at="data.created_at"
                :start_salary="data.start_salary"
                :end_salary="data.end_salary"
                :post_id="data.id"
                :work_type="data.work_type"
                :skills="data.skills"
            >
                <p>aaaaa{{ data }}</p>
                <template v-slot:apply> 
                    <RouterLink v-if="!application_deadline  || passedDeadline" class="text-decoration-none btn btn-primary" :to="`/application/${data.id}`">Apply</RouterLink>
                </template>
                <template v-slot:seeApplications> 
                    <router-link :to="'/job-applications/' + data.id" v-show="role === 'employer' && data.employer_id ==loggedEmployerId">
                        <button class="btn btn-primary me-2">View Job Applications</button>
                    </router-link> 
                    <class class="d-flex justify-content-start align-items-center mt-3">
                    <button  v-show="role === 'employer' && data.employer_id ==loggedEmployerId" label=""   class="btn btn-danger me-2 btn-sm"  raised @click="requireConfirmation($event, data.id)"
                     >
                        <i class="pi pi-trash"></i>
                    </button>
                    <router-link :to="'/employer/edit-post/' + data.id" v-show="role === 'employer' && data.employer_id ==loggedEmployerId">
                        <button class="btn btn-primary me-2 btn-sm">
                            <i class="pi pi-pencil"></i> 
                        </button>
                    </router-link> 
                    </class>

                </template>
            </PostHeader>
            <PostDescription title="Job Description" :content="data.description"/>
            <PostDescription title="Responibilities" :content="data.responsibilities"/>
            <PostDescription title="Qualifications" :content="data.qualifications"/>
        </div>
  
    </div>
      
         <ConfirmPopup group="headless">
            <template #container="{ message, acceptCallback, rejectCallback }">
                <div class="border-round p-3">
                    <span>{{ message.message }}</span>
                    <div class="flex align-items-center gap-2 mt-3">
                        <Button label="Yes" @click="acceptCallback" size="small"></Button>
                        <Button label="No" outlined @click="rejectCallback" severity="secondary" size="small" text></Button>
                    </div>
                    </div>
            </template>
        </ConfirmPopup>
</template>

<script>
import Button from 'primevue/button';
import { useUserStore } from '../../store/modules/UserPinia';
import ConfirmPopup from 'primevue/confirmpopup';

export default {
    components: {
        Button,
        ConfirmPopup
    },
    data() {
        return {
            data: [],
            company: '',
            role: useUserStore().user ? useUserStore().user.role : 'user',
            loggedEmployerId: useUserStore().user ? useUserStore().user.id : 0,
        };
    },
    mounted() {
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/posts/${this.$route.params.id}`)
            .then(response => {
                this.data = response.data.data;
                this.company = response.data.data.employer.company_name;
            })
            .catch(err => console.log(err));
    },
    methods: {
        passedDeadline() {
            if (this.data.created_at) {
                const currentDate = new Date();
                const date = new Date(this.data.created_at);
                console.log('11111111111', currentDate > date);
                return currentDate > date;
            }
        }
    }
};
</script>

<style scoped>
.custom-delete-button {
    background-color: #d9534f;
    border-color: #d43f3a;
    color: white;
}

.custom-edit-button {
    display: flex;
    align-items: center;
}

.custom-edit-button i {
    margin-right: 5px;
}
</style>

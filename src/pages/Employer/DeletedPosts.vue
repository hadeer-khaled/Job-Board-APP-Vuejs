<template>
    <Navbar />
    <div class="p-3 row">
        <div id="posts" class="col-2"></div>
        <div id="posts" class="col-8">
            <div v-if="posts">
                <div v-if="posts.length != 0">
                    <template v-for="job in posts" :key="job.id">
                        <PostCard class="mb-2"
                            :job_title="job.job_title"
                            :location="job.location"
                            :application_deadline="job.application_deadline"
                            :created_at="job.created_at"
                            :logo="company_logo"
                            :work_type="job.work_type"
                            :start_salary="job.start_salary"
                            :end_salary="job.end_salary"
                            :post_id="job.id"
                            :company="company_name"
                            :route="`/posts/${job.id}`">
                            <template v-slot:Restore>
                                <Button label="Restore" severity="success" raised @click="restorePost(job.id)" />
                                <Button label="Delete" severity="danger" raised @click="requireConfirmation($event, job.id)" />
                            </template>
                        </PostCard>
                    </template>
                </div>
                <div v-else>
                    <Message severity="contrast">You don't have any posts for now.</Message>
                </div>
            </div><!-- if posts -->
            <div v-else>
                <div class="card">
                    <div class="border-round border-1 surface-border p-4 surface-card">
                        <div class="flex mb-3">
                            <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                            <div>
                                <Skeleton width="10rem" class="mb-2"></Skeleton>
                                <Skeleton width="5rem" class="mb-2"></Skeleton>
                                <Skeleton height=".5rem"></Skeleton>
                            </div>
                        </div>
                        <Skeleton width="100%" height="150px"></Skeleton>
                        <div class="flex justify-content-between mt-3">
                            <Skeleton width="4rem" height="2rem"></Skeleton>
                            <Skeleton width="4rem" height="2rem"></Skeleton>
                        </div>
                    </div>
                </div>
            </div> <!-- else posts -->
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

<script setup>
import { ref, onMounted } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import axiosInstance from '../../axios/index';
import { useUserStore } from "../../store/modules/UserPinia";
import PostCard from '../../components/PostComponents/PostCard.vue';
import Button from 'primevue/button';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Navbar from '../../components/Navbar.vue';
import ConfirmPopup from 'primevue/confirmpopup';

const confirm = useConfirm();
const $toast = useToast();
const posts = ref([]);
const page = ref(1);
const perPage = ref(10);

const getDeletedPosts = () => {
  const employer_id = useUserStore().user.id;
  axiosInstance
    .get(`${import.meta.env.VITE_BASE_URL}/posts/deleted`, {
      params: { perPage: perPage.value, page: page.value, employer_id: employer_id }
    })
    .then(res => {
      posts.value = res.data.data;
      console.log("deleted posts: ", posts.value);
    })
    .catch(err => console.log(err));
};

const deletePost = (id) => {
  axiosInstance
    .delete(`${import.meta.env.VITE_BASE_URL}/posts/force-delete/${id}`)
    .then(res => {
      const message = res.data.message;
      $toast.success(message);
      getDeletedPosts(); // Refresh the data after deletion
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

const restorePost = (id) => {
  axiosInstance
    .put(`${import.meta.env.VITE_BASE_URL}/posts/restore/${id}`)
    .then(res => {
      const message = res.data.message;
      $toast.success(message);
      getDeletedPosts(); // Refresh the data after restoring
    })
    .catch(err => console.log(err));
};

onMounted(() => {
  getDeletedPosts();
});
</script>

<script>
export default {
  components: {
    PostCard,
    Button,
    ConfirmPopup,
    Navbar
  }
};
</script>

<style scoped>
/* Add any necessary CSS styles */
</style>

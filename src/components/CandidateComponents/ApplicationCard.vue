<template>
    <div class="bg-white position-relative p-4 w-50 border border-2">
        <div>
            <span class="bg-info" style="position:absolute; top:0; left:0;">{{ status }}</span>
        </div>
        <h4>{{ post.job_title }}</h4>
        <h5>{{ post.location }}</h5>
        <p>{{ post.description }}</p>
        <button type="button" class="btn btn-danger" @click="cancelApplication">Cancel</button>
    </div>
</template>

<script>
    import axios from 'axios';
    const url = import.meta.env.VITE_BASE_URL;
    export default {
        props: ['application'],
        data() {
            return {
                id: this.application.id,
                post: this.application.post,
                resume: this.application.resume,
                email: this.application.email,
                phone: this.application.phone,
                status: this.application.status,
                application_date: this.application.application_date,
            }
        },
        methods: {
            cancelApplication() {
                axios.delete(url+'/applications', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                    data: {
                        app_id: this.id
                    }
                })
                .then(res => console.log(res))
                .catch(err => console.log(err));
            }
        }
    }

</script>
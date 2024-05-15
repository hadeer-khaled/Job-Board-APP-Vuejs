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
    export default {
        props: ['application', 'applicationsStore'],
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
        watch: {
            application: function(newValue, oldValue) {
                this.id = newValue.id;
                this.post = newValue.post;
                this.resume = newValue.resume;
                this.email = newValue.email;
                this.phone = newValue.phone;
                this.status = newValue.status;
                this.application_date = newValue.application_date;
            }
        },
        methods: {
            async cancelApplication() {
                const res = await this.applicationsStore.removeApplication(this.id);
                this.$parent.updateApplications();
            }
        }
    }

</script>
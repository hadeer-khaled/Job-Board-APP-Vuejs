<template>
    <div class="card border border-2 shadow">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="badge" :class="badgeClass">{{ status }}</span>
                <button type="button" class="btn-close" aria-label="Close" @click="cancelApplication"></button>
            </div>
            <h4 class="card-title">{{ post.job_title }}</h4>
            <h5 class="card-subtitle mb-3">{{ post.location }}</h5>
            <p class="card-text">{{ post.description }}</p>
            <div class="row">
                <div class="col">
                    <p><strong>Start Salary:</strong> {{ post.start_salary }}</p>
                </div>
                <div class="col">
                    <p><strong>End Salary:</strong> {{ post.end_salary }}</p>
                </div>
            </div>
            <p><strong>Location:</strong> {{ post.location }}</p>
        </div>
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
        computed: {
            badgeClass() {
                if (this.status === 'pending') {
                    return 'bg-info';
                } else if (this.status === 'accepted') {
                    return 'bg-success';
                } else if (this.status === 'rejected') {
                    return 'bg-danger';
                }
            }
        },
        methods: {
            async cancelApplication() {
                const res = await this.applicationsStore.removeApplication(this.id);
                if (res) {
                    this.$toast.open({
                        message:"Removed Application successfully",
                        position:'bottom-right',
                        type:'success',
                        duration:3000
                    });
                    this.$parent.updateApplications();
                }
                else {
                    this.$toast.open({
                        message:"Couldn't remove application",
                        position:'bottom-right',
                        type:'error',
                        duration:3000
                    });
                }
            }
        }
    }

</script>
<template>
    <div class="card mb-4 mb-xl-0">
        <div class="card-header">Profile Picture</div>
        <div class="card-body text-center">
            <!-- Profile picture image-->
            <img class="img-account-profile rounded-circle mb-2" :src="image" alt="">
            <!-- Profile picture help block-->
            <div class="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
            <!-- Profile picture upload button-->
            <!-- <button class="btn btn-primary" type="button">Upload new image</button> -->
            <input type="file" @change="previewFiles">
        </div>
    </div>

</template>

<script>
    import FileUpload from 'primevue/fileupload';
    export default {
        props: ['user', 'userStore'],
        components: {
            'FileUpload' : FileUpload,
        },
        data() {
            return {
                image : this.user.image,
            }
        },
        methods: {
            previewFiles(event) {
                console.log(event.target.files);
                this.image = event.target.files[0].name;
            }
        }

    }
</script>


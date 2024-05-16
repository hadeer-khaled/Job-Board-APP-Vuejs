<template>
<div class="card mb-4 mb-xl-0 profile-card">
    <div class="card-header text-center">Profile Picture</div>
    <div class="card-body text-center">
        <!-- Profile picture image-->
        <img class="img-account-profile rounded-circle mb-3 profile-img" :src="image" alt="Profile Picture">
        <!-- Profile picture help block-->
        <div class="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
        <!-- Profile picture upload button-->
        <div>
            <input type="file" ref="fileInput" style="display: none" @change="uploadImage">
            <button class="btn btn-primary" type="button" @click="toggleImageInput">Upload new image</button>
        </div>
    </div>
</div>

</template>

<style scoped>
.profile-card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.profile-card .card-header {
    background-color: #f8f9fa;
    font-weight: bold;
    font-size: 1.2rem;
}

.profile-img {
    width: 150px; /* Adjust size as needed */
    height: 150px; /* Ensure it maintains a square aspect ratio */
    border-radius: 50%;
    border: 4px solid #ffffff; /* Add a white border */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
    object-fit: cover; /* Ensure the image covers the area without distortion */
}

.profile-card .card-body {
    padding: 2rem; /* Add padding for better spacing */
}

.profile-card .btn {
    background-color: #007bff; /* Primary color */
    border: none; /* Remove border */
    padding: 0.5rem 1.5rem; /* Adjust padding for better button size */
    font-size: 1rem; /* Increase font size */
    border-radius: 25px; /* Rounded button */
    transition: background-color 0.3s; /* Smooth transition */
}

.profile-card .btn:hover {
    background-color: #0056b3; /* Darker shade on hover */
}

</style>

<script>
    import FileUpload from 'primevue/fileupload';
import axiosInstance from '../../axios';
    export default {
        props: ['user', 'userStore'],
        components: {
            'FileUpload' : FileUpload,
        },
        data() {
            return {
                id : this.user.id,
                image : this.user.image,
                isFileInputVisible : false,
            }
        },
        methods: {
            onUpload() {
                console.log("WE HERE");
                console.log(this.event);
            },
            previewFiles(event) {
                console.log(event.target.files);
                this.image = event.target.files[0].name;
            },
            toggleImageInput() {
                this.isFileInputVisible = !this.isFileInputVisible;
                if (this.isFileInputVisible) {
                    this.$refs.fileInput.click();
                }
            },
            uploadImage(event) {
                if (event.target.files.length === 0) {
                    return; 
                }
                const file = event.target.files[0];
                const formData = new FormData();
                formData.append('_method', 'put');
                formData.append('image', file);
                axiosInstance.post('/candidates/' + this.id, formData)
                .then((res) => {
                    this.image = URL.createObjectURL(file);
                    this.userStore.user = res.data.data;
                })
                .catch((err) => {
                    console.log(err)
                });
            }
        }

    }
</script>


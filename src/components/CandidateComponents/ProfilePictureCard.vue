<template>
    <div class="card mb-4 mb-xl-0">
        <div class="card-header">Profile Picture</div>
        <div class="card-body text-center">
            <!-- Profile picture image-->
            <img class="img-account-profile rounded-circle mb-2" :src="image" alt="">
            <!-- Profile picture help block-->
            <div class="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
            <!-- Profile picture upload button-->
            <div>
                <input type="file" ref="fileInput" style="display: none" @change="uploadImage">
                <button class="btn btn-primary" type="button" @click="toggleImageInput">Upload new image</button>
            </div>
            <!-- <input type="file" @change="previewFiles"> -->
        </div>
    </div>

</template>

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

<style scoped>
    body{
        margin-top:20px;
        color:#69707a;
    }
    .img-account-profile {
        height: 10rem;
    }
    .rounded-circle {
        border-radius: 50% !important;
    }
    .card {
        box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);
    }
    .card .card-header {
        font-weight: 500;
    }
    .card-header:first-child {
        border-radius: 0.35rem 0.35rem 0 0;
    }
    .card-header {
        padding: 1rem 1.35rem;
        margin-bottom: 0;
        background-color: rgba(33, 40, 50, 0.03);
        border-bottom: 1px solid rgba(33, 40, 50, 0.125);
    }
    .form-control, .dataTable-input {
        display: block;
        width: 100%;
        padding: 0.875rem 1.125rem;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1;
        color: #69707a;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #c5ccd6;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 0.35rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    .nav-borders .nav-link.active {
        color: #0061f2;
        border-bottom-color: #0061f2;
    }
    .nav-borders .nav-link {
        color: #69707a;
        border-bottom-width: 0.125rem;
        border-bottom-style: solid;
        border-bottom-color: transparent;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 0;
        padding-right: 0;
        margin-left: 1rem;
        margin-right: 1rem;
    }
</style>
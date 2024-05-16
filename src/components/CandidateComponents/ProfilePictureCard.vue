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


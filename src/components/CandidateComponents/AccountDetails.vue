<template>
    <div class="card mb-4">
        <div class="card-header">Account Details</div>
        <div class="card-body">
            <form>
                <div class="mb-3">
                    <label class="small mb-1" for="inputFirstName">Name</label>
                    <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your name" v-model="name" @blur="v.name.$touch">
                    <div v-if="v.name.$error">Name field has an error.</div>
                </div>

                <!-- Form Group (username)-->
                <div class="mb-3">
                    <label class="small mb-1" for="inputUsername">Username (how your name will appear to other users on the site)</label>
                    <input class="form-control" id="inputUsername" type="text" placeholder="Enter your username" v-model="user.username">
                </div>
                
                <div class="mb-3">
                    <label class="small mb-1" for="inputEmailAddress">Email address</label>
                    <input class="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" v-model="user.email">
                </div>
                <!-- Form Row        -->
                <div class="row gx-3 mb-3">
                    <!-- Form Group (faculty name)-->
                    <div class="col-md-6">
                        <label class="small mb-1" for="inputFacName">Faculty name</label>
                        <input class="form-control" id="inputFacName" type="text" placeholder="Enter your faculty name" v-model="user.faculty">
                    </div>
                    <!-- Form Group (education)-->
                    <div class="col-md-6">
                        <label class="small mb-1" for="inputEducation">Education</label>
                        <input class="form-control" id="inputEducation" type="text" placeholder="Enter your Education" v-model="user.education">
                    </div>
                </div>
                <!-- Form Group (city)-->
                <div class="mb-3">
                    <label class="small mb-1" for="inputCity">City</label>
                    <input class="form-control" id="inputCity" type="text" placeholder="Enter your city" v-model="user.city">
                </div>
                <!-- Form Group (email address)-->
                
                <!-- Save changes button-->
                <button class="btn btn-primary" type="button" @click="submit(v)">Save changes</button>
            </form>
        </div>
    </div>
</template>

<script>
    import useVuelidate from '@vuelidate/core'; 
    import { minLength, required } from '@vuelidate/validators';
    export default {
        props: ['user'],
        setup() {
            return {
                v : useVuelidate()
            }
        },
        data() {
            return {
                name : this.user.name,
                email : this.user.email,
                city : this.user.city,
                faculty : this.user.faculty,
                education : this.user.education,
                username : this.user.username,
            }
        },
        validations() {
            return {
                name : { required, minLength: minLength(10) },
                email : { required },
                username : { required },
            }
        },
        methods: {
            async submit(v) {
                console.log(v);
                console.log("name:" + JSON.stringify(v.name));
                console.log("name errors:" + JSON.stringify(v.name.$errors));
                const result = await v.$validate();

                if (!result) {
                    console.log("ERROR");
                    return;
                }
                else {
                    console.log("CORRECT")
                }
            }
        }
    }
</script>
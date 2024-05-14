<template>
    <div class="card mb-4">
        <div class="card-header">Account Details</div>
        <div class="card-body">
            <form>
                <!-- Form Group (username)-->
                <div class="mb-3">
                    <label class="small mb-1" for="inputUsername">Username (how your name will appear to other users on the site)</label>
                    <input class="form-control" id="inputUsername" type="text" placeholder="Enter your username" :value="this.user.username">
                </div>

                <div class="mb-3">
                    <label class="small mb-1" for="inputFirstName">Name</label>
                    <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your name" :value="this.user.name">
                </div>
                <!-- Form Row        -->
                <div class="row gx-3 mb-3">
                    <!-- Form Group (organization name)-->
                    <div class="col-md-6">
                        <label class="small mb-1" for="inputOrgName">Organization name</label>
                        <input class="form-control" id="inputOrgName" type="text" placeholder="Enter your organization name" value="Start Bootstrap">
                    </div>
                    <!-- Form Group (location)-->
                    <div class="col-md-6">
                        <label class="small mb-1" for="inputLocation">Location</label>
                        <input class="form-control" id="inputLocation" type="text" placeholder="Enter your location" value="San Francisco, CA">
                    </div>
                </div>

                <div class="mb-3">
                    <label class="small mb-1" for="inputCity">City</label>
                    <input class="form-control" id="inputCity" type="text" placeholder="Enter your city" :value="this.user.city">
                </div>
                <!-- Form Group (email address)-->
                <div class="mb-3">
                    <label class="small mb-1" for="inputEmailAddress">Email address</label>
                    <input class="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" :value="this.user.email">
                </div>
                <!-- Form Row-->
                <div class="row gx-3 mb-3">
                    <!-- Form Group (phone number)-->
                    <div class="col-md-6">
                        <label class="small mb-1" for="inputPhone">Phone number</label>
                        <input class="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value="555-123-4567">
                    </div>
                    <!-- Form Group (birthday)-->
                    <div class="col-md-6">
                        <label class="small mb-1" for="inputBirthday">Birthday</label>
                        <input class="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value="06/10/1988">
                    </div>
                </div>
                <!-- Save changes button-->
                <button class="btn btn-primary" type="button">Save changes</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['user'],

    }
</script>
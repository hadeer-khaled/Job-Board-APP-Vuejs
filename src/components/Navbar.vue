<template>

<div class="mt-3 border-bottom pb-2 mb-3">
<nav class="d-flex justify-content-between ">
    
    <div class="mx-3 d-flex justify-content-between ">
        <div>
            <img  src="/logo.jpg" class="mx-3 border rounded-circle" style="width:50px"/>
        </div>
    <RouterLink to="/" class="text-decoration-none mx-3 my-auto fw-bold ">Home</RouterLink>
    </div>
    <div>
        <div class="d-flex">

            <span style="height:40px;width:1px;background-color:#D9DDE4;margin-right:16px"></span>
            <a class="btn btn-primary mx-3" @click="$router.push('/candidate/applications')">Applications</a>
            <a class="btn btn-primary mx-3" @click="$router.push('/candidate/profile')">Profile</a>
            <a class="btn btn-primary mx-3" @click="$router.push('/login')">Login</a>
            <a class="btn btn-light border-2 border-black ss mx-3 " @click="$router.push('/register')">Register</a>
        </div>
    </div>

</nav>
    </div>
</template>
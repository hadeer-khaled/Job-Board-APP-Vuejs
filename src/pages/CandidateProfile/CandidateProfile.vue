<script setup>
    import Navbar from '../../components/Navbar.vue';
    import axios from 'axios';
    import { useUserStore } from '../../store/modules/UserPinia';
    const userStore = useUserStore();
    console.log(userStore.user);
</script>
<template>
    <Navbar/>
    <div v-if="user">
        {{ user }}
    </div>


</template>


<script>
    import Navbar from '../../components/Navbar.vue';
    import axios from 'axios';
    import { useUserStore } from '../../store/modules/UserPinia';
    import { computed } from 'vue';
    export default {
        data() {
            return {
                user : null,
            }
        },
        methods() {
            

        }
    }
</script>
<template>
   <div class="position-realtive container p-5 border border-2 w-75 m-0 bg-white">
      <div class="position-relative">
         <div>
            <!-- Logo -->
            <img v-if="logo" style="position:absolute;top:0px;right:0px;width:150px" :src="logo"
               alt="Jobs and Careers at Etisalat Egypt Egypt" class="css-17095x3">
            <img v-if="!logo" style="position:absolute;top:0px;right:0px;width:150px" src="/default.jpg" alt="Logo"
               class="css-17095x3">
         </div>
         <div class="">

            <!-- Job Title -->
            <h4 class="css-o171kl">{{ job_title }}</h4>

         <div class="">
            <p class="fw-bold">{{ company }}, <span class="text-decoration-none fw-light">{{ location }}</span></p> 
            <!-- created_at -->
            <div class="text-success">{{ formattedDate }}</div>
         </div>
      </div>
      <div class="">
         <!-- work_type -->
         <div class="m-0 my-2 ">
            <span class="text-capitalize text-black  fw-bolder btn btn-sm bg-light px-2 border border-black rounded-3  disabled">{{ work_type }}</span>
         </div>
         <!-- salary_range -->
         <div v-if="start_salary && end_salary"><p class="fw-bold">salary range: <span> {{ start_salary }} - {{ end_salary }} EGP</span></p> 
         <!-- deadline -->
         <div v-if="application_deadline">
            <p class="position-absolute bottom-0 end-0 text-danger fw-bold" :hidden="passedDeadline"> <span class="fw-bolder text-black-50" >Deadline:</span> {{ formattedDeadline }}</p>
            <p v-if="passedDeadline" class="position-absolute bottom-0 end-0 text-danger fw-bold">Closed</p>
         </div>

               <!-- skills -->
               <div v-if="!(skills == 0)" class="border border-3 rounded-4 w-50 p-3 mb-3">
                  <h4>Skills Needed</h4>
                  <div v-for="skill in skills" :key="skill.index" class="d-inline-block ">
                     <p
                        class="text-capitalize text-black  fw-bolder btn btn-sm bg-light px-2 border border-black rounded-3 mx-2  disabled">
                        {{ skill.skill }}
                     </p>
                  </div>
               </div>


            </div>
            <slot v-if="!passedDeadline && userStore.user && userStore.user.role==='candidate' " name="apply"></slot>
         <slot name="seeApplications"></slot>
            <slot name="Admin"></slot>

         </div>
      </div>
   </div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns';
import { ref, watch } from 'vue';
import { useUserStore } from '../../store/modules/UserPinia';
import Button from 'primevue/button';

export default {
   setup() {
   },
   components:{Button},
   props: {
      job_title: String,
      company: String,
      location: String,
      application_deadline: String,
      created_at: String,
      start_salary: Number,
      end_salary: Number,
      post_id: Number,
      work_type: String,
      skills: Array
   },
   data() {
      return {
         human_created_at: '',
         human_deadline: '',
         userStore: useUserStore()
      }

   },
   computed: {
      formattedDate() {
         if (this.$props.created_at) {
            const create_date = new Date(this.$props.created_at)
            const create_duration = new Date(create_date);
            const res = formatDistanceToNow(create_duration);
            return res
         }
      },
      formattedDeadline() {
         if (this.$props.application_deadline) {
            const date = new Date(this.$props.application_deadline)
            return date.toDateString('dddd MMMM D Y');
         }
      },
      passedDeadline() {
         if (this.$props.application_deadline) {
            const currentDate = new Date()
            const date = new Date(this.$props.application_deadline)
            console.log(1111,currentDate > date)
            return currentDate > date ;
         }
      }
   },
};
</script>
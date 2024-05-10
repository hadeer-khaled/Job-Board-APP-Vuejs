
<template>
    <div class="position-realtive container p-5">
        <div class="position-relative">
            <div>
            <!-- Logo -->
            <a href="#" target="_blank" rel="noreferrer"><img style="position:absolute;top:0px;right:0px;width:150px" src="https://images.wuzzuf-data.net/files/company_logo/Etisalat-Misr-Egypt-4219-1656427377.png" alt="Jobs and Careers at Etisalat Egypt Egypt" class="css-17095x3"></a>
            </div>
      <div class="">

         <!-- Job Title -->
         <h4 class="">
            <RouterLink :to="`/posts/${post_id}`">{{ job_title }}</RouterLink>
         </h4>

         <div class="">
            <!-- company_name -->
            <p class="css-17s97q8">{{ company }}</p> 
            <!-- Location -->
            <span class="css-5wys0k">{{ location }}</span>
            <!-- created_at -->
            <div class="">{{ created_at }}</div>
         </div>
      </div>
      <div class="">
         <!-- work_type -->
         <div class=""><p class="" href="/a/Full-Time-Jobs-in-Egypt"><span class="text-capitalize">{{ work_type }}</span></p></div>
         <!-- salary_range -->
         <div><p class="" href="/a/Entry-Level-Jobs-in-Egypt">salary range <span> {{ start_salary }} - {{ end_salary }} EGP</span></p> 
         <!-- deadline -->
         <div><p class="position-absolute bottom-0 end-0 text-danger " >{{ application_deadline }}</p></div>

         </div>
      </div>
   </div>
</div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  props: {
    job_title: String,
    location: String,
    application_deadline: String,
    created_at: Date,
    start_salary: Number,
    end_salary: Number,
    post_id: Number,
    work_type: String,
    company:String
  },
};
</script>
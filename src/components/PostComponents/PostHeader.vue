<template>
      <div class="position-realtive container p-5">
      <div class="position-relative">
            <div>
               <!-- Logo -->
            <a href="#" target="_blank" rel="noreferrer"><img style="position:absolute;top:0px;right:0px;width:150px" src="https://images.wuzzuf-data.net/files/company_logo/Etisalat-Misr-Egypt-4219-1656427377.png" alt="Jobs and Careers at Etisalat Egypt Egypt" class="css-17095x3"></a>
            </div>
      <div class="">

         <!-- Job Title -->
         <h4 class="css-o171kl">{{ job_title }}</h4>

         <div class="">
            <!-- company_name -->
            <p class="css-17s97q8">Etisalat Egypt </p> 
            <!-- Location -->
            <span class="css-5wys0k">{{ location }}</span>
            <!-- created_at -->
            <div class="">{{ created_at }}</div>
         </div>
      </div>
      <div class="">
         <!-- work_type -->
         <div><p><span class="text-capitalize">{{ work_type }}</span></p></div>
         <!-- salary_range -->
         <div><p>salary range <span> {{ start_salary }} - {{ end_salary }} EGP</span></p> 
         <!-- deadline -->
         <div><p class="position-absolute bottom-0 end-0 text-danger btn-danger" >Dead Line : {{ application_deadline }}</p></div>

         <!-- skills -->
         <h4>Skills Needed</h4>
         <div v-for="skill in skills" :key="skill.index" class="d-inline-block ">
            <p class="mx-2 bg-info-subtle ">
            {{ skill.skill }}
            </p>
         </div>

         
         </div>
         <RouterLink class="text-decoration-none btn btn-primary" :to="`/application/${post_id}`">Apply</RouterLink>
      </div>
   </div>
</div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns';
import { ref, watch } from 'vue';

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
      skills: Array
   },
   data(){
      return {
         human_created_at:'',
         human_deadline:''
      }

   },
   computed: {
      formattedDeadline()
      {
         if(this.$props.created_at)
         {
            const currentDate = new Date();
            const deadline = new Date(this.$props.created_at)
            console.log(deadline);
            const deadlineDate = new Date(deadline -  currentDate);
            console.log(deadlineDate);
            const res = formatDistanceToNow(deadlineDate); 
            return res
         }

      }
   }
};
</script>
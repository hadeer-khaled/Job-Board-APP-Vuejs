
<template>
    <div class="position-realtive container px-5 py-4 bg-white post">
        <div class="position-relative">
            <div>
            <!-- Logo -->
            <!-- <img v-if="logo" style="position:absolute;top:0px;right:0px;width:100px" :src="logo" alt="Logo" class="border rounded-circle"> -->
               <Avatar :image="logo" style="position:absolute;top:0px;right:0px;width:100px"
                      class="custom-avatar mb-3" shape="circle" />
            <img v-if="!logo" style="position:absolute;top:0px;right:0px;width:100px" src="/default.jpg" alt="Logo" class="">
               <Avatar v-if="!logo" image="/default.jpg" style="position:absolute;top:0px;right:0px;width:100px"
                      class="custom-avatar mb-3" shape="circle" />
            </div>
      <div class="">

         <!-- Job Title -->
         <h4 class="">
            <RouterLink :to="route" class="text-decoration-none text-primary ">{{ job_title }}</RouterLink>
            <Tag v-show="role === 'employer'" :value="status" :severity="getSeverity(status)" class="mx-2" />
            
         </h4>

         <div class="">
            <!-- company_name & location -->
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
         </div>
      </div>
   </div>
   <slot name="Restore"></slot>
</div>


</template>


<script>
import { RouterLink } from 'vue-router';
import { formatDistanceToNow } from 'date-fns';
import Avatar from 'primevue/avatar';
import Tag from 'primevue/tag';



export default {
   props: {
      job_title: String,
      location: String,
      application_deadline: String,
      created_at: String,
      start_salary: Number,
      end_salary: Number,
      post_id: Number,
      work_type: String,
      company: String,
      logo: String,
      route: String,
      status: String,
      role: String,
   },
   components:{Avatar,Tag},
   methods: {
      getSeverity(status) {
            switch (status) {
                case 'accecpted':
                    return 'success';

                case 'pending':
                    return 'secondary';

                case 'rejected':
                    return 'danger';

                default:
                    return null;
            }
        },
   },
   computed: {
      formattedDate()
      {
         if(this.$props.created_at)
         {
            const create_date = new Date(this.$props.created_at)
            const create_duration = new Date(create_date);
            const res = formatDistanceToNow(create_duration); 
            return res
         }
      },
      formattedDeadline()
      {
         if(this.$props.application_deadline)
         {
            const date = new Date(this.$props.application_deadline)
            return date.toDateString('dddd MMMM D Y');
         }
      },
      passedDeadline()
      {
         if(this.$props.application_deadline)
         {
            const currentDate = new Date()
            const date = new Date(this.$props.application_deadline)
            console.log(currentDate > date)
            return currentDate > date ;
         }
      }
   }
};
</script>

<style  scoped>
.custom-avatar {
  width: 100px !important; 
  height: 100px !important; 
}

</style>
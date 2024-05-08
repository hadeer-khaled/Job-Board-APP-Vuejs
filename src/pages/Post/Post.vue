
<script setup>
import PostHeader from '../../components/PostComponents/PostHeader.vue';
import PostDescription from '../../components/PostComponents/PostDescription.vue';
</script>

<template>

    <div>

    <h1>asfa</h1>

    <PostHeader/>
    <PostDescription :description="data.description"/>
    </div>


</template>

<script>

export default {
    data(){
        return {
        "data": {
        "id": 1,
        "company_logo": null,
        "company_name": "vodafone Egypt",
        "job_title": "Front-end Developer",
        "description": "we need \r\nto \r\nand\r\nand\r\n",
        "responsibilities": "can do \r\n1\r\n2\r\n3\r\n4\r\n",
        "qualifications": "has\r\n1\r\n2\r\n3\r\n4",
        "start_salary": 15000,
        "end_salary": 17000,
        "location": "Cairo",
        "work_type": "remote",
        "application_deadline": "2024-05-15",
        "status": "approved",
        "skills": [
            "Programming",
            "Problem Solving",
            "Data Analysis",
            "Statistics"
        ]
    }
        }
    }
}
</script>
<script setup>
import Navbar from '../../components/Navbar.vue';
import PostCard from '../../components/PostComponents/PostCard.vue';
</script>

<template>
    <div>
    <!-- Navbar -->
    <Navbar />

    
    <!-- Title -->
    <h1>
    Jobs    
    </h1>

    <div class="row">
    <div class="col-3">
        
    </div>

    <div class="col-9">
        
    <div v-for="post in posts" :key="post.id" class="border border-2 my-3 mx-5">
    
    <PostCard 
    :job_title="post.job_title"
    :location="post.location"
    :application_deadline="post.application_deadline"
    :created_at="post.created_at"
    :work_type="post.work_type"
    :start_salary="post.start_salary"
    :end_salary="post.end_salary"
    :post_id="post.id"
    />

    </div>
    </div>

    </div>

    </div>
</template>

<script>
export default {
    data() {
    return {
      posts: 
      [
    {
        "id": 1,
        "employer_id": 1,
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
        "created_at": null,
        "updated_at": null,
        "skills": [
            {
                "id": 1,
                "skill": "Programming",
                "created_at": null,
                "updated_at": null,
                "pivot": {
                    "post_id": 1,
                    "skill_id": 1
                }
            },
            {
                "id": 2,
                "skill": "Problem Solving",
                "created_at": null,
                "updated_at": null,
                "pivot": {
                    "post_id": 1,
                    "skill_id": 2
                }
            },
            {
                "id": 3,
                "skill": "Data Analysis",
                "created_at": null,
                "updated_at": null,
                "pivot": {
                    "post_id": 1,
                    "skill_id": 3
                }
            },
            {
                "id": 4,
                "skill": "Statistics",
                "created_at": null,
                "updated_at": null,
                "pivot": {
                    "post_id": 1,
                    "skill_id": 4
                }
            }
        ]
    },
    {
        "id": 2,
        "employer_id": 1,
        "job_title": "Software Developer",
        "description": "Join our team as a software developer.",
        "responsibilities": "Develop software applications according to specifications.",
        "qualifications": "Bachelors degree in Computer Science or related field.",
        "start_salary": 50000,
        "end_salary": 80000,
        "location": "New York",
        "work_type": "hybrid",
        "application_deadline": "2024-06-30",
        "status": "approved",
        "created_at": null,
        "updated_at": null,
        "skills": [
            {
                "id": 1,
                "skill": "Programming",
                "created_at": null,
                "updated_at": null,
                "pivot": {
                    "post_id": 2,
                    "skill_id": 1
                }
            },
            {
                "id": 2,
                "skill": "Problem Solving",
                "created_at": null,
                "updated_at": null,
                "pivot": {
                    "post_id": 2,
                    "skill_id": 2
                }
            },
            {
                "id": 3,
                "skill": "Data Analysis",
                "created_at": null,
                "updated_at": null,
                "pivot": {
                    "post_id": 2,
                    "skill_id": 3
                }
            },
            {
                "id": 4,
                "skill": "Statistics",
                "created_at": null,
                "updated_at": null,
                "pivot": {
                    "post_id": 2,
                    "skill_id": 4
                }
            }
        ]
    },
    {
        "id": 3,
        "employer_id": 1,
        "job_title": "Marketing Manager",
        "description": "Exciting opportunity for a Marketing Manager!",
        "responsibilities": "Create marketing campaigns and strategies.",
        "qualifications": "Bachelors degree in Marketing or related field.",
        "start_salary": 60000,
        "end_salary": 90000,
        "location": "Los Angeles",
        "work_type": "hybrid",
        "application_deadline": "2024-07-15",
        "status": "pending",
        "created_at": null,
        "updated_at": null,
        "skills": []
    },
    {
        "id": 4,
        "employer_id": 1,
        "job_title": "Sales Representative",
        "description": "Looking for dynamic individuals to join our sales team.",
        "responsibilities": "Generate leads and close sales deals.",
        "qualifications": "High school diploma required, Bachelos degree preferred.",
        "start_salary": 40000,
        "end_salary": 70000,
        "location": "Chicago",
        "work_type": "remote",
        "application_deadline": "2024-07-10",
        "status": "approved",
        "created_at": null,
        "updated_at": null,
        "skills": []
    },
    {
        "id": 5,
        "employer_id": 2,
        "job_title": "Graphic Designer",
        "description": "We are seeking a creative Graphic Designer to join our team.",
        "responsibilities": "Design graphics for various projects.",
        "qualifications": "Bachelors degree in Graphic Design or related field.",
        "start_salary": 45000,
        "end_salary": 75000,
        "location": "San Francisco",
        "work_type": "hybrid",
        "application_deadline": "2024-07-20",
        "status": "pending",
        "created_at": null,
        "updated_at": null,
        "skills": []
    },
    {
        "id": 6,
        "employer_id": 2,
        "job_title": "Customer Support Specialist",
        "description": "Join our team as a Customer Support Specialist!",
        "responsibilities": "Provide assistance to customers via phone and email.",
        "qualifications": "High school diploma required.",
        "start_salary": 35000,
        "end_salary": 60000,
        "location": "Seattle",
        "work_type": "hybrid",
        "application_deadline": "2024-07-25",
        "status": "pending",
        "created_at": null,
        "updated_at": null,
        "skills": []
    },
    {
        "id": 7,
        "employer_id": 2,
        "job_title": "Data Analyst",
        "description": "Exciting opportunity for a Data Analyst to work with cutting-edge technologies.",
        "responsibilities": "Analyze data to provide insights and recommendations.",
        "qualifications": "Bachelors degree in Statistics, Mathematics, or related field.",
        "start_salary": 55000,
        "end_salary": 85000,
        "location": "Boston",
        "work_type": "hybrid",
        "application_deadline": "2024-07-30",
        "status": "approved",
        "created_at": null,
        "updated_at": null,
        "skills": []
    }
],
    };
  },
};
</script>

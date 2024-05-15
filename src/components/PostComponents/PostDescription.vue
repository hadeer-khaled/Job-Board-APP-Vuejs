<template>

    <div class="w-75">
        <h1 class="my-5">{{ title }}</h1>
    <div class="border border-2 my-5 p-5 bg-white">
    <p v-html="formattedMessage"></p>
    </div>
    </div>

</template>

<script>
export default {
    props:{
        title:String,
        content:String
    },
    computed: {
    formattedMessage() {
        if(!this.content)
        {
            return "Not assigned" ;
        } 

        return this.content.replace(/\r\n/g, '<br>');
    },
},
}
</script>
<template>
    <div class="p-5">
        <h1>{{ title }}</h1>
    <p v-html="formattedMessage"></p>
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

        console.log(this.content);
        return this.content.replace(/\r\n/g, '<br>');
    },
},
}
</script>
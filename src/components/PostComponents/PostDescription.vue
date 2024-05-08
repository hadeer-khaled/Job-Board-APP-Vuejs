<template>
    
    <h1 v-html="formattedMessage"></h1>

</template>

<script>
export default {
    props:{
        description:String
    },
    computed: {
    formattedMessage() {
        return this.description.replace(/\r\n/g, '<br>');
    },
},
}
</script>
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import LandingPage from './pages/Landing page/LandingPage.vue'
import Post from './pages/Post/Post.vue'
</script>

<template>
  <div>
  <main>
    <RouterView />
  </main>
  </div>
</template>

<style>
  body {
    background-color: #f5f6f7;
    font-family: Open Sans,sans-serif;
}

</style>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import LandingPage from './pages/Landing page/LandingPage.vue'
import Post from './pages/Post/Post.vue'
</script>

<template>
  <!-- <div>
  <LandingPage /> -->
  <!-- <Post/> -->
  <!-- </div> -->
  <div>
    
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/posts/1">Go to Posts</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
  </div>

</template>

<style scoped>
</style>

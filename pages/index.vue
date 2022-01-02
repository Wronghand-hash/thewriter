<template>
  <div class="h-screen mainContainer">
    <TheNavbar />
    <div class="w-full h-full cardContainer ">
      <BlogPost />
      <BlogPost />
      <BlogPost />
    </div>
  </div>
</template>

<script>
import BlogPost from '../components/BlogPost.vue'
import TheNavbar from '../layout/TheNavbar.vue'

export default {
  components: { TheNavbar, BlogPost },
}
</script>

<style scoped>
.mainContainer{
  background-color: #001524;
}

.cardContainer{
  background-color: #2EC4B6;
}
</style>

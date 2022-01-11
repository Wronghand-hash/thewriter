<template>
  <div class="h-screen mainContainer">
    <TheNavbar />
    <div class="w-full h-full cardContainer">
      <div class="flex justify-center w-full h-4/6">
        <div class="grid grid-cols-2 justify-between w-full h-full items-center">
          <BlogPost class=" " v-for="post in Posts" :key="post.id" :post="post" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from '../components/BlogPost.vue'
import TheNavbar from '../layout/TheNavbar.vue'

export default {
  components: { TheNavbar, BlogPost },
  data() {
    return {
      Posts: [],
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    async getPosts() {
      try {
        const { data, error } = await this.$supabase.from('Posts').select()
        if (error) throw error
        if (data) {
          this.Posts = data
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.mainContainer {
  background-color: #001524;
}

.cardContainer {
  background-color: #2ec4b6;
}
</style>

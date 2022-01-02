<template>
  <div class="w-screen h-full overflow-hidden">
    <TheNavbar class="shadow-2xl" />
    <div class="">
      <Profile />
      <UserPosts />
    </div>
  </div>
</template>

<script>
import TheNavbar from '../layout/TheNavbar.vue'
import Profile from '../components/profile.vue'
import UserPosts from '../components/userPosts.vue'
export default {
  components: {
    UserPosts,
    TheNavbar,
    Profile,
  },
}
</script>

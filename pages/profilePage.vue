<template>
  <div class="w-screen h-screen overflow-hidden">
    <TheNavbar />
    <div>
      <Profile />
    </div>
  </div>
</template>

<script>
import TheNavbar from '../layout/TheNavbar.vue'
import Profile from '../components/profile.vue'
export default {
  components: {
    TheNavbar,
    Profile,
  },
}
</script>

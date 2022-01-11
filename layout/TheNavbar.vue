<template>
  <nav class="TheNavbar fixed w-full z-10">
    <div class="flex flex-row justify-start p-4 mx-2 text-black">
      <div class="w-full grid grid-rows-1 grid-cols-2">
        <div class="w-1/3">
          <svg
            class="cursor-pointer block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <div class="flex flex-row justify-around text-black font-bold">
          <NuxtLink class="mx-1" to="/loginPage">Login</NuxtLink>
          <NuxtLink class="mx-1" to="/createpost">Create</NuxtLink>
          <NuxtLink class="mx-1" to="/">Home</NuxtLink>
          <NuxtLink  class="mx-1" to="/profilePage">profile</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
}
</script>

<style scoped>
.TheNavbar {
  background-color: #eb941d;
}
</style>

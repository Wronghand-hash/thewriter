<template>
  <div class="">
    <div class="bg-Sky-500 w-full h-full">
      <div class="flex justify-center items-center">
        <form class="" @submit.prevent="recoverPassword">
          <div class="flex flex-col">
            <div>
              <input
                v-model="email"
                class="inputField p-2"
                type="email"
                placeholder="Your email"
              />
            </div>
            <div class="flex justify-center p-2">
              <input
                type="submit"
                class="bg-blueGray-300 px-4 py-2 rounded"
                :value="loading ? 'Loading' : 'Recover your Password'"
                :disabled="loading"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      loading: false,
    }
  },
  methods: {
    async recoverPassword() {
      // login user through supabase magiclink and requests an open session for password recovery via passwordReset component
      try {
        this.loading = true
        const {  error } =
          await this.$supabase.auth.api.resetPasswordForEmail(this.email , {
              redirectTo: 'http://localhost:3000/loginPage'
          })
          
        if (error) throw error
        alert('check your inbox for recovery link')
      } catch (error) {
        alert(error.error_description || error.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

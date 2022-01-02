<template>
  <div class="bg-Lime-500">
    <div class="flex justify-center items-center flex-col align-center content-center">
      <form class="" @submit.prevent="handleLogin">
        <div class="flex flex-col">
          <div>
            <input
              v-model="emailLogin"
              class="inputField p-2"
              type="email"
              placeholder="Your email"
            />
          </div>
          <div>
            <input
              v-model="passwordLogin"
              class="inputField p-2"
              type="password"
              placeholder="enter strong password ..."
            />
          </div>
          <div class="flex justify-center p-2">
            <input
              type="submit"
              class="bg-blueGray-400 rounded px-4 py-2"
              :value="loadingLogin ? 'Loading' : 'Login'"
              :disabled="loadingLogin"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailLogin: '',
      passwordLogin: '',
      loadingLogin: false,
    }
  },

  methods: {
    async handleLogin() {
      try {
        this.loading = true
        const { error } = await this.$supabase.auth.signIn({
          email: this.emailLogin,
          password: this.passwordLogin,
        })
        if (error) throw error
        alert('you are logged in')
      } catch (error) {
        alert(error.error_description || error.message)
      } finally {
        this.loadingLogin = false
        this.emailLogin = ''
        this.passwordLogin = ''
      }
    },
  },
}
</script>

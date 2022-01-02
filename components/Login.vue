<template>
  <div class="p-5">
    <div class="mainContainer w-full h-full rounded-2xl">
      <div class="w-full h-full flex justify-center flex-row items-center">
        <form
          class="w-full h-full flex flex-col justify-center items-center"
          @submit.prevent="handleLogin"
        >
          <div class="w-2/3">
            <input
              v-model="emailLogin"
              class="inputField w-full px-5 py-8 rounded-t-2xl"
              type="email"
              placeholder="Your email"
            />
          </div>
          <div class="w-2/3">
            <input
              v-model="passwordLogin"
              class="inputField w-full px-5 py-8 rounded-b-2xl"
              type="password"
              placeholder="enter strong password ..."
            />
          </div>
          <div class="flex justify-center p-2">
            <input
              type="submit"
              class="actionButton px-4 py-2 rounded"
              :value="loadingLogin ? 'Loading' : 'login'"
              :disabled="loadingLogin"
            />
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
      emailLogin: '',
      passwordLogin: '',
      loadingLogin: false,
    }
  },

  methods: {
    async handleLogin() {
      try {
        this.loadingLogin = true
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

<style scoped>
.actionButton{
  background-color: #2EC4B6;
}

.mainContainer{
}
</style>

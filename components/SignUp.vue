<template>
  <div class="p-5">
    <div class="mainContainer w-full h-full rounded-2xl">
      <div class="w-full h-full flex justify-center flex-row items-center">
        <form
          class="w-full h-full flex flex-col justify-center items-center"
          @submit.prevent="handleSignin"
        >
          <div class="w-full">
            <input
              v-model="emailSignUp"
              class="inputField w-full px-5 py-8 rounded-t-2xl"
              type="email"
              placeholder="Your email"
            />
          </div>
          <div class="w-full">
            <input
              v-model="passwordSignUp"
              class="inputField w-full px-5 py-8 rounded-b-2xl"
              type="password"
              placeholder="enter strong password ..."
            />
          </div>
          <div class="flex justify-center p-2">
            <input
              type="submit"
              class="actionButton font-bold px-4 py-2 rounded"
              :value="loadingSignUp ? 'Loading' : 'signUp'"
              :disabled="loadingSignUp"
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
      emailSignUp: '',
      passwordSignUp: '',
      website: '',
      username: '',
      loadingSignUp: false,
    }
  },

  computed: {
    user() {
      return this.$store.state.user
    },
  },

  methods: {
    async handleSignin() {
      try {
        this.loadingSignUp = true
        const { error } = await this.$supabase.auth.signUp(
          {
            email: this.emailSignUp,
            password: this.passwordSignUp,
          },
          {
            data: {
              username: this.username,
              website: this.website,
            },
          }
        )
        if (error) throw error
        alert('Check your inbox for conformtion')
      } catch (error) {
        alert(error.error_description || error.message)
      } finally {
        this.loadingSignUp = false
        this.emailSignUp = ''
        this.passwordSignUp = ''
      }
    },
  },
}
</script>

<style scoped>
.actionButton{
  background-color: #2EC4B6;
}
</style>
<template>
  <div>
    <div class="bg-green-500 w-full h-full">
      <div class="flex justify-center items-center">
        <form class="" @submit.prevent="handleSignin">
          <div class="flex flex-col">
            <div>
              <input
                v-model="emailSignUp"
                class="inputField p-2"
                type="email"
                placeholder="Your email"
              />
            </div>
            <div>
              <input
                v-model="passwordSignUp"
                class="inputField p-2"
                type="password"
                placeholder="enter strong password ..."
              />
            </div>
            <div class="flex justify-center p-2">
              <input
                type="submit"
                class="bg-blueGray-300 px-4 py-2 rounded"
                :value="loadingSignUp ? 'Loading' : 'signUp'"
                :disabled="loadingSignUp"
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

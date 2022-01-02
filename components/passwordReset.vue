<template>
  <div class="">
    <div class="bg-Indigo-500 w-full h-full">
      <div class="flex justify-center items-center">
        <form class="" @submit.prevent="passwordReset">
          <div class="flex flex-col">
            <div>
              <input
                v-model="password"
                class="inputField p-2"
                type="password"
                placeholder="new password"
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
  props: {
    session: String,
  },
  data() {
    return {
      loading: false,
      password: '',
    }
  },

  methods: {
    async passwordReset() {
      try {
        this.loading = true
        const { error } = await this.$supabase.auth.api.updateUser(
          this.session.access_token,
          { password: this.password }
        )

        if (error) throw error
        alert('your password has been updated')
      } catch (error) {
        alert(error.error_description || error.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

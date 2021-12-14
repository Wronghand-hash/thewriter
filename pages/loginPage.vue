<template>
  <form class="row flex flex-center" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Supabase + Vue 3</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <div>
        <input
          class="inputField"
          type="email"
          placeholder="Your email"
          v-model="email"
        />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>

<script>

export default {
  data(){
    return{
      email : '', 
      loading: false
    }
  },

  methods:{
    async handleLogin(){
       try {
        this.loading = true
        const { error } = await this.$supabase.auth.signIn({ email: this.email })
        if (error) throw error
        alert("Check your email for the login link!")
      } catch (error) {
        alert(error.error_description || error.message)
      } finally {
        this.loading = false
      }
    }
  }

   
}

</script>
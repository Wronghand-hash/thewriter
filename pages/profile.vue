<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      {{ user}}
    </div>
    <div>
      <label for="username">Name</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" type="website" v-model="website" />
    </div>

    <div>
      <input
        type="submit"
        class="button block primary"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button class="button block" @click="signOut" :disabled="loading">
        Sign Out
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      username: '',
      website: '',
      avatar_url: '',
    }
  },

  created() {
    this.getProfile()
    console.log(this.user);
  },

  methods: {
    async getProfile() {
      try {
        this.loading = true
        this.$store.dispatch('setUser', this.$supabase.auth.user())

        const { data, error, status } = await this.$supabase
          .from('profiles')
          .select(`username, website, avatar_url`)
          .eq('id', this.$store.state.user.id)
          .single()

        if (error && status !== 406) throw error

        if (data) {
          this.username = data.username
          this.website = data.website
          this.avatar_url = data.avatar_url
        }
      } catch (error) {
        alert(error.message)
      } finally {
        this.loading = false
      }
    },
    computed: {
      user() {
        return this.$supabase.auth.user()
      },
    },

    async updateProfile() {
      try {
        this.loading = true
        this.$store.state.user = this.$supabase.auth.user()

        const updates = {
          id: this.$store.state.user.id,
          username: this.username,
          website: this.website,
          avatar_url: this.avatar_url,
          updated_at: new Date(),
        }

        const { error } = await this.$supabase
          .from('profiles')
          .upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
          })

        if (error) throw error
      } catch (error) {
        alert(error.message)
      } finally {
        this.loading = false
      }
    },
    async signOut() {
      try {
        this.loading = true
        const { error } = await this.$supabase.auth.signOut()
        if (error) throw error
      } catch (error) {
        alert(error.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

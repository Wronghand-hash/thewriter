<template>
  <div class="shitDiv">
    <div class="w-10/12 h-auto grid grid-rows-4 grid-cols-1 place-items-center">
      <div class="imgContainer ">
        <img
          class="w-40 h-40 border-4 rounded-full shadow-2xl"
          :src="imgUrl"
          alt=""
        />
        <AvatarFile class="" :path="avatar_url" @upload="updateProfile" />
      </div>

      <div class="emailBox ">
        <label class="self-center font-bold p-4" for="email">Email</label>
        <input v-if="user" v-model="user.email" type="email" disabled />
      </div>

      <div class="displayName ">
        <label class="font-bold p-4" for="username">Name</label>
        <input
          id="username"
          v-model="username"
          class="p-4 rounded"
          type="text"
        />
      </div>

      <div class="websiteBox ">
        <label class="p-4 font-bold" for="website">Website</label>
        <input
          id="website"
          v-model="website"
          class="p-4 rounded"
          type="website"
        />
      </div>
    </div>

    <div>
      <button @click.prevent="updateProfile">update</button>
    </div>
  </div>
</template>

<script>
import AvatarFile from '../pages/AvatarFile.vue'

export default {
  components: {
    AvatarFile,
  },
  data() {
    return {
      loading: false,
      username: '',
      website: '',
      avatar_url: '',
      email: '',
      imgUrl: '',
    }
  },

  computed: {
    user() {
      return this.$store.state.user
    },
  },

  watch: {
    imgUrl() {
      this.downloadImage()
    },
  },
  created() {
    this.getProfile()
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
          console.log(data)
          this.username = data.username
          this.website = data.website
          this.avatar_url = data.avatar_url
        }
      } catch (error) {
        alert(error.message)
      } finally {
        this.downloadImage()
        this.loading = false
      }
    },

    async downloadImage() {
      try {
        const { data, error } = await this.$supabase.storage
          .from('avatars')
          .download(this.avatar_url)
        if (error) throw error
        this.imgUrl = URL.createObjectURL(data)
      } catch (error) {
        console.error('Error downloading image: ', error.message)
      }
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

<style scoped>
.shitDiv {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

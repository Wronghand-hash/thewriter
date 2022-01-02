<template>
  <div class="mainContainer w-full h-full">
    <div class=" w-screen h-full">
      <div class="w-screen">
        <img class="max-h-2/3" :src="imgUrl" alt="" />
        <div class="transform -translate-y-12 flex flex-row justify-center">
          <div class="profilePic w-28 h-28 bg-gray-200 rounded-full"></div>
        </div>
      </div>
      <div class="w-screen p-2 flex justify-center">
        <div v-show="user" class="w-1/2 flex flex-col justify-center items-center">
          <UploadAvatar :path="avatar_url" />
          <button
            class="updateButton text-white rounded-3xl font-bold w-32 h-12 shadow-xl p-3 m-2"
            @click="updateProfile"
          >
            Update
          </button>
            <button
            class="updateButton text-white rounded-3xl font-bold w-32 h-12 shadow-xl p-3 m-2"
            @click="signOut"
          >
            Sign Out
          </button>
        </div>
      </div>
      <div
        class="w-full flex flex-col justify-start items-center trasform translate-y-8"
      >
        <input
          v-model="username"
          class="userInputs m-1 p-3 border-2 rounded-2xl bg-darkPurple text-black"
          type="text"
          placeholder="Username"
        />
        <input
          v-if="user"
          v-model="user.email"
          class="userInputs m-1 p-3 border-2 rounded-2xl bg-darkPurple text-black"
          type="email"
          placeholder="Email"
        />
        <input
          v-model="website"
          class="userInputs m-1 p-3 border-2 rounded-2xl bg-darkPurple text-black"
          type="text"
          placeholder="Website"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UploadAvatar from '../components/UploadAvatar.vue'

export default {
  components: {
    UploadAvatar,
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

  mounted() {
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
.mainContainer {
  background: #001524;
  width: 100%;
}

.updateButton {
  background-color: #2EC4B6;
  color: #000000;
}

.userInputs {
  background-color: #dae8ec;
  border: solid #2EC4B6 2px;
}

.profilePic {
  border: solid #2EC4B6 2px;
}
</style>

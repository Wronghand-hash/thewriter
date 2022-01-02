<template>
  <div class="mainDiv w-screen h-screen overflow-hidden">
    <div class="w-full">
      <TheNavbar />
    </div>
    <div class="flex w-full h-full justify-center items-center">
      <div
        class="flex flex-col w-9/12 h-4/6 bg-gray-200 justify-items-center shadow-2xl rounded-2xl"
      >
        <div class="flex items-center justify-center w-full h-24">
          <button
            class="px-5 font-bold py-3 bg-Amber-500 rounded shadow-2xl m-1"
            @click="toggleComp('Login')"
          >
            Login
          </button>
          <button
            class="px-5 font-bold m-1 py-3 bg-Amber-500 rounded shadow-2xl"
            @click="toggleComp('SignUp')"
          >
            SignUp
          </button>
        </div>
        <div class="w-full h-full">
          <component :is="comp" v-bind="currentProps" class="w-full h-full" />
          <div>
            <button
              class="px-3 font-bold py-3 bg-Amber-500 rounded shadow-2xl m-1"
              @click="toggleComp('RequestPasswordReset')"
            >
              recover password
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavbar from '../layout/TheNavbar.vue'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import RequestPasswordReset from '../components/RequestPasswordReset.vue'
import passwordReset from '../components/passwordReset.vue'

export default {
  components: {
    Login,
    TheNavbar,
    SignUp,
    passwordReset,
    RequestPasswordReset,
  },
  data() {
    return {
      comp: 'signUp',
      token: '',
    }
  },

  computed: {
    currentProps() {
      return { session: this.token }
    },
    user() {
      return this.$store.state.user
    },
  },

  mounted() {
    this.$supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        this.comp = 'passwordReset'
        this.token = session
      }
    })
  },

  methods: {
    toggleComp(selected) {
      this.comp = selected
    },
  },
}
</script>

<style scoped>
.mainDiv {
  background-color: #001524;
}
</style>

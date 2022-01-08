<template>
  <main>
    <div id="editor">
      <h1 class="text-3xl font-semibold tracking-wide mt-6">Create new post</h1>
      <input
        v-model="title"
        name="title"
        placeholder="Title"
        class="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      />
      <quill-editor
        ref="textEditor"
        v-model="editorContent"
        :options="editorOption"
      >
      </quill-editor>
      <button
        type="button"
        class="mb-4 w-full bg-blue-500 text-white font-semibold px-8 py-4"
        @click="newPost"
      >
        Create Post
      </button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      editorContent: '',
      editorOption: {
        placeholder: 'What’s on your mind?',
        theme: 'snow',
        modules: {
          markdownShortcuts: {},

          toolbar: [
            [{ size: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'super' }, { script: 'sub' }],
            [{ header: '1' }, { header: '2' }, 'blockquote', 'code-block'],
            [
              { list: 'ordered' },
              { list: 'bullet' },
              { indent: '-1' },
              { indent: '+1' },
            ],
            [{ direction: 'rtl' }, { align: [] }],
            ['link', 'image', 'video', 'formula'],
            ['clean'],
          ],
        },
      },
    }
  },

  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    async newPost() {
      try {
        this.$store.dispatch('setUser', this.$supabase.auth.user())
        const { error } = await this.$supabase.from('Posts').insert([
          {
            Title: this.title,
            body: this.editorContent,
            user_id: this.user.id,
            user_email: this.user.email,
          }
        ])
        if (error) throw error
        alert('added to database')
      } catch (error) {
        console.log(error.message)
      }
    },
    // async createPost() {
    //   const { title, content } = this.post
    //   if (!title || !content) return
    //   const user = this.$supabase.auth.user()
    //   const { data } = await this.$supabase
    //     .from('posts')
    //     .insert([{ title, content, user_id: user.id, user_email: user.email }])
    //     .single()
    //   this.$router.push(`/posts/${data.id}`)
    // },
  },
}
</script>

<style scoped>
@import 'simplemde/dist/simplemde.min.css';
</style>

<template>
  <div class="uploadButton rounded-3xl shadow-xl w-32 h-12 p-3 text-center">
    <label class="font-bold w-32 h-12 cursor-pointer" for="single">
      {{ uploading ? 'Uploading ...' : 'Upload' }}
    </label>
    <input
      id="single"
      style="visibility: hidden"
      type="file"
      accept="image/*"
      :disabled="uploading"
      @change="uploadAvatar"
    />
  </div>
</template>

<script>
export default {
  props: {
    path: String,
  },
  emits: ['upload', 'update:path'],
  data() {
    return {
      pathData: this.path,
      size: '10em',
      uploading: false,
      src: '',
      files: null,
      avatarPath: '',
    }
  },

  mounted() {
    console.log(this.pathData)
  },

  methods: {
    // async downloadImage() {
    //   try {
    //     const { data, error } = await this.$supabase.storage
    //       .from('avatars')
    //       .download(this.pathData)
    //     if (error) throw error
    //     this.src = URL.createObjectURL(data)
    //     console.log(this.path)
    //     console.log(this.src)
    //   } catch (error) {
    //     console.error('Error downloading image: ', error.message)
    //   }
    // },

    async uploadAvatar(evt) {
      this.files = evt.target.files[0]
      try {
        this.uploading = true
        if (!this.files || this.files.length === 0) {
          throw new Error('You must select an image to upload.')
        }
        console.log(this.files)
        const file = this.files
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`
        this.avatarPath = filePath

        const { error: uploadError } = await this.$supabase.storage
          .from('avatars')
          .upload(filePath, file)

        if (uploadError) throw uploadError
        this.$emit('update:path', filePath)
        this.$emit('upload')
      } catch (error) {
        alert(error.message)
      } finally {
        this.uploading = false
      }
      const update = {
        avatar_url: this.avatarPath,
      }
      const { error: updateError } = await this.$supabase
        .from('profiles')
        .update(update)
        .eq('id', this.$store.state.user.id)

      if (updateError) throw updateError
    },
  },
}
</script>

<style scoped>
.uploadButton {
  background-color: #2EC4B6;
  color: #000000;
}
</style>

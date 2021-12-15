<template>
  <div class="m-5 cursor-pointer">
    <div class=" shadow-xl text-white bg-Rose-500 p-3 rounded-3xl ">
      <label class="font-bold cursor-pointer button primary block" for="single">
        {{ uploading ? 'Uploading ...' : 'Upload' }}
      </label>
      <input
        style="visibility: hidden; position: absolute"
        type="file"
        id="single"
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploading"
      />
    </div>
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

<template>
  <div>
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="avatar image"
      :style="{ height: size, width: size }"
    />
    <div
      v-else
      class="avatar no-image"
      :style="{ height: size, width: size }"
    />

    <div :style="{ width: size }">
      <label class="button primary block" for="single">
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

  data() {
    return {
      pathData: this.path,
      size: '10em',
      uploading: false,
      src: '',
      files: null,
    }
  },

mounted(){
  this.downloadImage()
  console.log(this.pathData);
},

  methods: {
    async downloadImage() {
      try {
        const { data, error } = await this.$supabase.storage
          .from('avatars')
          .download(this.pathData)
        if (error) throw error
        this.src = URL.createObjectURL(data)
        console.log(this.pathData)
        console.log(this.src)
      } catch (error) {
        console.error('Error downloading image: ', error.message)
      }
    },

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

        const { error: uploadError } = await this.$supabase.storage
          .from('avatars')
          .upload(filePath, file)

        if (uploadError) throw uploadError
      } catch (error) {
        alert(error.message)
      } finally {
        this.uploading = false
      }
    },
  },
}
</script>

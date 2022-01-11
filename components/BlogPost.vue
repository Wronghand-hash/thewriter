<template>
  <div class="cardBody w-96 h-44 my-2 flex justify-center items-center">
    <div class="bg-blueGray-500 clippathDiv w-full h-full">
      <h2 class="text-white">{{ post.Title }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props:['post']
}
</script>

<style scoped>
.clippathDiv{
  clip-path: polygon(0 0, 100% 0%, 100% 41%, 0 71%);
}

.cardBody {
  background-color: #001524;
}
</style>

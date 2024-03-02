<script setup>
defineProps(['title'])
</script>

<template>
  <div class="small-cover">
    <div class="small-cover__img">
      <img src="../assets/images/background.jpg" alt="Cover background" />
    </div>
    <div class="small-cover__title">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.small-cover {
  position: relative;
  height: 290px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  &__img {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: -1;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &__title {
    h1 {
      font-family: 'Penumbra', sans-serif;
      font-size: 64px;
    }
  }
}
</style>
<script setup>
import { RouterLink } from 'vue-router';

defineProps(['img', 'title', 'link'])
</script>

<template>
  <RouterLink :to="link ? link : '#'" class="button">
    <img class="button__icon" v-if="img" :src="img" alt="Button icon" />
    <span class="button__title">{{ title }}</span>
  </RouterLink>
</template>

<style lang="scss" scoped>
.button {
  background-color: #850606;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 10px 30px;
  border-radius: 6px;
  transition-duration: 0.4s;

  &:hover {
    background-color: #490303;
  }

  &__icon {
    max-width: 20px;
    max-height: 20px;
  }

  &__title {
    color: white;
    font-size: 14px;
    text-transform: uppercase;
  }
}
</style>
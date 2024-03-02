<script setup>
import ItemCard from '../components/ItemCard.vue'

defineProps(['data', 'title'])
</script>

<template>
<div class="latest-items" v-if="data">
  <div class="latest-items__title">
    <h3>{{ title }}</h3>
    <span>See more</span>
  </div>
  <div class="latest-items__list">
    <ItemCard v-for="item in data.slice(0, 4)" :data="item"></ItemCard>
  </div>
</div>
</template>

<style lang="scss" scoped>
.latest-items {
  margin-left: calc(4.347vw * 2);
  width: calc(4.347vw * 19);
  margin-top: 94px;

  &__title {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 84px;

    h3 {
      font-size: 24px;
      font-family: 'Penumbra', sans-serif;
    }
  }

  &__list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
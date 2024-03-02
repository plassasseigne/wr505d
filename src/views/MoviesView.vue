<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios'
import SmallCover from '../components/SmallCover.vue'
import ItemCard from '../components/ItemCard.vue'

const dataMovies = ref('')

onMounted(async() => {
  getMovies()
})

const getMovies = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/movies')

    dataMovies.value = response.data
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <SmallCover :title="'Movies'"></SmallCover>
  <div v-if="dataMovies" class="items-list">
    <ItemCard v-for="item in dataMovies['hydra:member']" :data="item"></ItemCard>
  </div>
</template>

<style lang="scss" scoped>
.items-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: calc(4.347vw * 2);
  width: calc(4.347vw * 19);
  margin-top: 64px;
  margin-bottom: 30px;
}
</style>
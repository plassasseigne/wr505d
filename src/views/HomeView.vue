<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Cover from '../components/Cover.vue'
import LatestItems from '../components/LatestItems.vue'

const dataMovies = ref('')
const dataActors = ref('')
const dataCategories = ref('')

onMounted(async() => {
  getMovies()
  getActors()
  getCategories()
})

const getMovies = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/movies')

    dataMovies.value = response.data
  } catch (error) {
    console.log(error)
  }
}

const getActors = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/actors')

    dataActors.value = response.data
  } catch (error) {
    console.log(error)
  }
}

const getCategories = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/categories')

    dataCategories.value = response.data
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <Cover></Cover>
  <LatestItems v-if="dataMovies" :data="dataMovies['hydra:member']" :title="'The latest releases'"></LatestItems>
  <LatestItems v-if="dataActors" :data="dataActors['hydra:member']" :title="'The latest actors'"></LatestItems>
  <LatestItems v-if="dataCategories" :data="dataCategories['hydra:member']" :title="'The trending categories'"></LatestItems>
</template>

<style lang="scss">

</style>
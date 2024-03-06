<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import MainCover from '../components/MainCover.vue'
import LatestItems from '../components/LatestItems.vue'

const dataMovies = ref('')
const dataActors = ref('')
const dataCategories = ref('')
const token = localStorage.getItem('token')

onMounted(async() => {
  getMovies()
  getActors()
  getCategories()
})

const getMovies = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/movies', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    dataMovies.value = response.data
  } catch (error) {
    console.log(error)
  }
}

const getActors = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/actors', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    dataActors.value = response.data
  } catch (error) {
    console.log(error)
  }
}

const getCategories = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/categories', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    dataCategories.value = response.data
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <MainCover></MainCover>
  <LatestItems v-if="dataMovies" :data="dataMovies['hydra:member']" :title="'The latest releases'" :route="'movies'"></LatestItems>
  <LatestItems v-if="dataActors" :data="dataActors['hydra:member']" :title="'The latest actors'" :route="'actors'"></LatestItems>
  <LatestItems v-if="dataCategories" :data="dataCategories['hydra:member']" :title="'The trending categories'" :route="'categories'"></LatestItems>
</template>

<style lang="scss">

</style>
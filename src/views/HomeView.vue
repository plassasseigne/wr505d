<script setup>
import { onMounted, ref } from 'vue'
import router from "@/router";
import axios from 'axios'
import MainCover from '../components/MainCover.vue'
import LatestItems from '../components/LatestItems.vue'

const dataMovies = ref('')
const dataActors = ref('')
const dataCategories = ref('')
const token = localStorage.getItem('token')
const API_URL = import.meta.env.VITE_API_URL

onMounted(async() => {
  getMovies()
  getActors()
  getCategories()
})

const getMovies = async () => {
  try {
    const response = await axios.get(API_URL + '/api/movies', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    dataMovies.value = response.data
  } catch (error) {
    if (error.response.data.code === 401) {
      return router.push('/login')
    } else {
      console.log(error)
    }
  }
}

const getActors = async () => {
  try {
    const response = await axios.get(API_URL + '/api/actors', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    dataActors.value = response.data
  } catch (error) {
    if (error.response.data.code === 401) {
      return router.push('/login')
    } else {
      console.log(error)
    }
  }
}

const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + '/api/categories', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    dataCategories.value = response.data
  } catch (error) {
    if (error.response.data.code === 401) {
      return router.push('/login')
    } else {
      console.log(error)
    }
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
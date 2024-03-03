<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios'
import SmallCover from '../components/SmallCover.vue'
import ItemCard from '../components/ItemCard.vue'

const dataMovies = ref('')
const nextPage = ref('')
const prevPage = ref('')

onMounted(async() => {
  getMovies()
})

const getMovies = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/movies')

    dataMovies.value = response.data
    nextPage.value = response.data['hydra:view']['hydra:next']

    if (response.data['hydra:view']['hydra:previous']) {
      prevPage.value = response.data['hydra:view']['hydra:previous']
    }

    document.querySelector('.prev-arrow').classList.add('disable')
  } catch (error) {
    console.log(error)
  }
}

const onNextPage = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000' + nextPage.value)

    dataMovies.value = response.data
    prevPage.value = response.data['hydra:view']['hydra:previous']

    if (response.data['hydra:view']['hydra:next']) {
      nextPage.value = response.data['hydra:view']['hydra:next']
    } else {
      document.querySelector('.next-arrow').classList.add('disable')
    }

    window.scrollTo(0, 0)
    document.querySelector('.prev-arrow').classList.remove('disable')
  } catch (error) {
    console.log(error)
  }
}

const onPrevPage = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000' + prevPage.value)

    dataMovies.value = response.data
    nextPage.value = response.data['hydra:view']['hydra:next']

    if (response.data['hydra:view']['hydra:previous']) {
      prevPage.value = response.data['hydra:view']['hydra:previous']
    } else {
      document.querySelector('.prev-arrow').classList.add('disable')
    }

    window.scrollTo(0, 0)
    document.querySelector('.next-arrow').classList.remove('disable')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <SmallCover :title="'Movies'"></SmallCover>
  <div v-if="dataMovies" class="archive">
    <div class="items-list">
      <ItemCard v-for="item in dataMovies['hydra:member']" :data="item"></ItemCard>
    </div>
    <div class="pagination">
      <div @click="onPrevPage" class="prev-arrow">
        <img src="../assets/images/pagination_arrow.svg" />
      </div>
      <div @click="onNextPage" class="next-arrow">
        <img src="../assets/images/pagination_arrow.svg" />
      </div>
    </div>
  </div>

  <div v-else class="loader">
    <p>Loading, please wait...</p>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  width: 100vw;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-family: 'Penumbra', sans-serif;
    font-size: 32px;
  }
}

.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 50px;
  
  .prev-arrow,
  .next-arrow {
    width: 50px;
    height: 50px;
    background-color: #850606;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .prev-arrow {
    img {
      transform: rotate(180deg);
    }
  }

  .disable {
    background-color: #490303;
    pointer-events: none;
  }
}

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
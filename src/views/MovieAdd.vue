<script setup>
import { onMounted, ref } from 'vue'
import router from "@/router";
import axios from 'axios'

const dataCategories = ref('')
const dataActors = ref('')
const token = localStorage.getItem('token')

const movieTitle = ref('')
const movieDescription = ref('')
const movieReleaseDate = ref('')
const movieDuration = ref(0)
const movieCategory = ref('')
const movieBoxOffice = ref(0)
const movieMetascore = ref(0)
const movieActors = ref([])

onMounted(async() => {
  getCategories()
  getActors()
})

const getCategories = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/categories?pagination=false', {
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

const getActors = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/actors?pagination=false', {
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

const createMovie = async () => {
  const data = {
    "title": `${movieTitle.value}`,
    "description": `${movieDescription.value}`,
    "duration": movieDuration.value,
    "category": '/api/categories/' + movieCategory.value,
    "metascore": movieMetascore.value,
    "releaseDate": `${movieReleaseDate.value}`,
    "boxOffice": `${movieBoxOffice.value}`,
    "actor" : movieActors.value.map((actor) => `/api/actors/${actor}`)
  }

  try {
    const request = await axios.post('http://127.0.0.1:8000/api/movies', data, {
      headers: {
        'Content-Type': 'application/ld+json; charset=utf-8',
        'Authorization': 'Bearer ' + token
      }
    })

    router.push('/movies')
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
  <section class="movie-add">
    <div class="movie-add__wrapper">
      <div class="movie-add__form-part">
        <h1 class="movie-add__title">Add a new movie</h1>
        <form @submit.prevent="createMovie" class="form">
          <div class="form-row">
            <div class="form-element">
              <label for="movie-title">Title *</label>
              <input placeholder="Lorem Ipsum" type="text" id="movie-title" v-model="movieTitle" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-element">
              <label for="movie-description">Description *</label>
              <textarea placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit..." id="movie-description" v-model="movieDescription" required></textarea>
            </div>
          </div>
          <div class="form-row">
            <div class="form-element">
              <label for="movie-duration">Duration * (in min)</label>
              <input placeholder="160" type="number" id="movie-duration" v-model="movieDuration" required />
            </div>
            <div class="form-element">
              <label for="movie-metascore">Metascore *</label>
              <input placeholder="76" type="number" id="movie-metascore" v-model="movieMetascore" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-element">
              <label for="movie-releasedate">Release date *</label>
              <input type="date" id="movie-releasedate" v-model="movieReleaseDate" required />
            </div>
            <div class="form-element">
              <label for="movie-boxoffice">Boxoffice *</label>
              <input placeholder="206 980 245" type="number" id="movie-boxoffice" v-model="movieBoxOffice" required />
            </div>
          </div>
          <div v-if="dataCategories" class="form-row">
            <div class="form-element">
              <label for="movie-category">Category *</label>
              <select name="movie-category" id="movie-category" v-model="movieCategory" required>
                <option v-for="category in dataCategories['hydra:member']" :key="category.id" :value="category.id">{{ category.name }}</option>
              </select>
            </div>
          </div>
          <div v-if="dataActors" class="form-row">
            <div class="form-element">
              <label for="movie-actors">Actors</label>
              <select name="movie-actors" id="movie-actors" v-model="movieActors" multiple required>
                <option v-for="actor in dataActors['hydra:member']" :key="actor.id" :value="actor.id">{{ actor.first_name + ' ' + actor.last_name }}</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <input type="submit" value="Create">
          </div>
        </form>
      </div>
      <div class="movie-add__poster-part">
        <div class="movie-add__poster-part__bg">
          <img src="../assets/images/background.jpg" alt="Dark forest" />
        </div>
        <div class="movie-add__poster-part__content">
          <div class="movie-add__poster-part__poster">
            <img src="../assets/images/movie_poster.jpg" alt="Movie poster" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.movie-add {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
  margin-top: 50px;
  margin-bottom: 50px;

  @media (min-width: 1024px) {
    height: 100vh;
    margin: 0;
  }

  &__wrapper {
    width: calc(4.347vw * 19);
    background-color: #850606;
    display: flex;
    overflow: hidden;
    border-radius: 30px;
    flex-direction: column;

    @media (min-width: 1024px) {
      flex-direction: row;
    }
  }

  &__form-part {
    width: calc(4.347vw * 19);
    padding: 50px calc(4.347vw * 2);
    position: relative;

    @media (min-width: 1024px) {
      width: calc(4.347vw * 11);
      padding: 100px calc(4.347vw * 2);
    }
  }

  &__poster-part {
    width: calc(4.347vw * 19);
    padding: 50px calc(4.347vw * 2);
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 1024px) {
      width: calc(4.347vw * 8);
    }

    &__bg {
      position: absolute;
    }

    &__poster {
      position: relative;

      img {
        width: calc(4.347vw * 8);
        height: 245px;
        object-fit: cover;

        @media (min-width: 1024px) {
          width: calc(4.347vw * 4);
          height: 345px;
        }
      }
    }
  }

  &__title {
    margin-bottom: 45px;
    font-size: 36px;
    font-family: 'Penumbra', sans-serif;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 23px;
  }

  .form-row {
    display: flex;
    gap: 4.347vw;
    justify-content: center;
  }

  input[type=submit] {
    background-color: #490303;
    color: white;
    text-transform: uppercase;
    padding: 10px 30px;
    border: none;
    border-radius: 6px;
    margin-top: 10px;
  }

  .form-element {
    width: 100%;
    display: flex;
    flex-direction: column;

    input,
    textarea {
      width: 100%;
      background: none;
      border: none;
      color: white;
      border-bottom: solid 1px white;
      padding-bottom: 10px;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #9C9C9C;
      }
    }

    input[type=date]:invalid {
      color: #9C9C9C;
    }

    label {
      margin-bottom: 10px;
      font-size: 16px;
      font-family: 'Penumbra', sans-serif;
    }
  }
}
</style>
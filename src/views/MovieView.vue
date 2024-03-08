<script setup>
import { useRoute, RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import router from "@/router";
import axios from 'axios'
import Button from '../components/Button.vue'

const id = useRoute().params.id

const data = ref('')
const token = localStorage.getItem('token')

onMounted(async() => {
  getMovie()
})

const getMovie = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/movies/' + id, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    data.value = response.data
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
  <main v-if="data" class="item-single">
    <section class="movie-cover">
      <div class="movie-cover__bg">
        <img src="../assets/images/cover_background.jpg" alt="Movie poster" />
        <div class="dark-filter"></div>
      </div>
      <div class="movie-cover__wrapper">
        <div class="movie-cover__poster">
          <img src="../assets/images/movie_poster.jpg" :alt="' poster'" />
          <div class="movie-cover__poster-notes">
            <img class="skull" src="../assets/images/skull.svg" alt="Skull note" />
            <img class="skull" src="../assets/images/skull.svg" alt="Skull note" />
            <img class="skull" src="../assets/images/skull.svg" alt="Skull note" />
            <img class="skull" src="../assets/images/skull.svg" alt="Skull note" />
            <img class="skull" src="../assets/images/skull.svg" alt="Skull note" />
          </div>
        </div>
        <div class="movie-cover__content">
          <h1 class="movie-cover__content-title">{{ data.title }}</h1>
          <div class="movie-cover__content-infos">
            <div class="score">
              <img src="../assets/images/red_skull.svg" alt="Red skull note" />
              <span>{{ data.metascore }} %</span>
            </div>
            <div class="duration">
              <span>{{ data.duration }} min</span>
            </div>
            <div class="release">
              <span>{{ data.release_date.substring(0, 4) }}</span>
            </div>
            <div class="age">
              <span>13+</span>
            </div>
          </div>
          <span class="movie-cover__content-category">{{ data.category.name }}</span>
          <Button img="/src/assets/images/play.svg" title="Play"></Button>
        </div>
      </div>
    </section>
    <section class="movie-infos">
      <div class="movie-infos__container">
        <div class="movie-infos__details">
          <h2 class="movie-infos__title">Details</h2>
          <div class="movie-infos__detail">
            <span class="label">Director</span>
            <span class="content">John Doe</span>
          </div>
          <hr>
          <div class="movie-infos__detail">
            <span class="label">Boxoffice</span>
            <span class="content">{{ data.box_office }} $</span>
          </div>
          <hr>
          <div class="movie-infos__detail">
            <span class="label">Release date</span>
            <span class="content">{{ data.release_date.substring(0, 10) }}</span>
          </div>
          <hr>
        </div>
        <div class="movie-infos__storyline">
          <h2 class="movie-infos__title">Storyline</h2>
          <p>{{ data.description }}</p>
        </div>
        <div class="movie-infos__cast">
          <h2 class="movie-infos__title">Cast</h2>
          <div class="movie-infos__actors-list">
            <RouterLink :to="'/actor/' + actor.id" v-for="actor in data.actor" class="movie-infos__actor">
              <img src="../assets/images/actor_poster.jpeg" :alt="actor.last_name + ' poster'" />
              <span class="name">{{ actor.first_name + ' ' + actor.last_name }}</span>
            </RouterLink>
          </div>
        </div>
        <div class="movie-infos__trailer">
          <h2 class="movie-infos__title">Trailer</h2>
          <div class="trailer">
            <img src="../assets/images/movie_trailer.jpg" :alt="data.title + ' trailer'" />
            <div class="trailer-play">
              <img src="../assets/images/play.svg" alt="Play icon">
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <main v-else class="loader">
    
  </main>
</template>

<style lang="scss" scoped>
.movie-infos {
  padding-top: 80px;
  padding-bottom: 80px;
  padding-left: 4.347vw;
  width: calc(4.347vw * 21);

  @media (min-width: 1024px) {
    padding-left: calc(4.347vw * 2);
    width: calc(4.347vw * 19);
  }

  &__container {
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: (calc(4.347vw * 7) calc(4.347vw * 13));
      column-gap: 4.347vw;
      row-gap: 75px;
    }

    @media (min-width: 1024px) {
      grid-template-columns: (calc(4.347vw * 7) calc(4.347vw * 11));
      column-gap: 4.347vw;
    }
  }

  &__title {
    font-family: 'Penumbra', sans-serif;
    font-size: 24px;
    margin-bottom: 34px;
  }

  &__detail {
    display: flex;
    justify-content: space-between;

    .label {
      font-size: 12px;
      text-transform: uppercase;
      color: #9C9C9C;
    }

    .content {
      font-size: 12px;
      text-transform: uppercase;
    }
  }

  &__storyline {
    p {
      color: #9C9C9C;
      font-size: 16px;
    }
  }

  &__actors-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
  }

  &__actor {
    &:hover {
      .name { color: #9C9C9C;}
    }
    
    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 100%;
      margin-right: 15px;
    }

    .name {
      font-family: 'Nunito SemiBold', sans-serif;
      text-transform: uppercase;
      color: white;
      transition-duration: 0.3s;
    }
  }

  &__trailer {
    .trailer {
      position: relative;
      width: calc(4.347vw * 21);

      @media (min-width: 768px) {
        width: calc(4.347vw * 13);
      }

      @media (min-width: 1024px) {
        width: calc(4.347vw * 11);
      }

      img {
        width: 100%;
        height: 398px;
        object-fit: cover;
      }

      .trailer-play {
        background-color: #99000081;
        position: absolute;
        width: 78px;
        height: 78px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        cursor: pointer;
        transition-duration: 0.3s;

        &:hover {
          background-color: #990100;
        }

        img {
          margin-left: 8px;
          width: 26px;
          height: 26px;
        }
      }
    }
  }
}

.movie-cover {
  position: relative;
  width: 100vw;
  height: 100vh;

  &__bg {
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;

    .dark-filter {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.25);
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__wrapper {
    height: 100vh;
    position: relative;
    margin-left: calc(4.347vw * 1);
    width: calc(4.347vw * 19);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4.347vw;

    @media (min-width: 768px) {
      margin-left: calc(4.347vw * 2);
      width: calc(4.347vw * 17);
      flex-direction: row;
      justify-content: left;
      align-items: center;
    }
  }

  &__poster {
    img {
      width: calc(4.347vw * 6);
      height: 165px;
      object-fit: cover;

      @media (min-width: 768px) {
        height: 279px;
      }

      @media (min-width: 1024px) {
        width: calc(4.347vw * 3);
      }
    }

    &-notes {
      width: calc(4.347vw * 6);
      display: flex;
      justify-content: space-between;
      margin-top: 24px;

      @media (min-width: 768px) {
        width: 100%;
      }

      .skull {
        width: 20px;
        height: 20px;

        @media (min-width: 768px) {
          width: 25px;
          height: 25px;
        }
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &-title {
      font-size: 54px;
      font-family: 'Penumbra', sans-serif;

      @media (min-width: 768px) {
        font-size: 64px;
      }

      @media (min-width: 1024px) {
        font-size: 84px;
      }
    }

    &-infos {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 12px;

      .score {
        display: flex;
        align-items: center;
        gap: 12px;

        span {
          font-family: 'Penumbra', sans-serif;
          font-size: 18px;
        }

        img {
          width: 20px;
          height: 20px;
        }
      }

      .duration,
      .release {
        font-family: 'Nunito Light', sans-serif;
        font-size: 14px;
        text-transform: uppercase;
      }

      .age {
        font-size: 14px;
        padding: 2px 4px;
        border-radius: 5px;
        background-color: #990100;
      }
    }

    &-category {
      font-size: 14px;
      font-family: 'Nunito Light', sans-serif;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
  }
}
</style>
<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import router from "@/router";
import axios from 'axios'
import ItemCard from '../components/ItemCard.vue'

const id = useRoute().params.id

const data = ref('')
const token = localStorage.getItem('token')

onMounted(async() => {
  getActor()
})

const getActor = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/actors/' + id, {
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
  <main v-if="data">
    <section class="actor-cover">
      <div class="actor-cover__bg">
        <img src="../assets/images/actor_background.jpeg" alt="Actor background" />
      </div>
      <div class="actor-cover__content">
        <div class="actor-cover__name">
          <h1>{{ data.first_name + ' ' + data.last_name }}</h1>
        </div>
        <div class="actor-cover__infos">
          <div class="actor-cover__info">
            <span class="number">{{ data.movies.length }}</span>
            <span class="label">Movies</span>
          </div>
          <div class="actor-cover__info">
            <span class="number">{{ 2023 - data.date_birth.substring(0, 4) - 18 }}</span>
            <span class="label">Years of career</span>
          </div>
          <div class="actor-cover__info">
            <span class="number">{{ 2023 - data.date_birth.substring(0, 4) }}</span>
            <span class="label">Years old</span>
          </div>
        </div>
      </div>
      <div class="actor-cover__poster">
        <img src="../assets/images/actor_poster.jpeg" alt="Actor poster" />
      </div>
    </section>
    <section class="actor-infos">
      <div class="actor-infos__content">
        <div class="actor-infos__details">
          <h2 class="actor-infos__title">Details</h2>
          <div class="actor-infos__detail">
            <span class="label">Date of birth</span>
            <span class="content">{{ data.date_birth.substring(0, 10) }}</span>
          </div>
          <hr>
          <div class="actor-infos__detail">
            <span class="label">Nationality</span>
            <span class="content">{{ data.nationality.name }}</span>
          </div>
          <hr>
        </div>
        <div class="actor-infos__biography">
          <h2 class="actor-infos__title">Biography</h2>
          <p>{{ data.biography }}</p>
        </div>
      </div>
      <div class="actor-infos__filmography">
        <h2 class="actor-infos__title">Filmography</h2>
        <div class="actor-infos__movies-list">
          <ItemCard v-for="movie in data.movies" :data="movie"></ItemCard>
        </div>
      </div>
    </section>
  </main>
  <main v-else class="loader">
    
  </main>
</template>

<style lang="scss" scoped>
.actor-infos {
  padding-top: 80px;
  padding-bottom: 80px;
  padding-left: 4.347vw;
  width: calc(4.347vw * 21);

  @media (min-width: 1024px) {
    padding-left: calc(4.347vw * 2);
    width: calc(4.347vw * 19);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 4.347vw;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  &__title {
    font-family: 'Penumbra', sans-serif;
    font-size: 24px;
    margin-bottom: 34px;
  }

  &__details {
    width: calc(4.347vw * 21);

    @media (min-width: 1024px) {
      width: calc(4.347vw * 7);
    }
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
  
  &__biography {
    width: calc(4.347vw * 21);

    @media (min-width: 1024px) {
      width: calc(4.347vw * 11);
    }

    p {
      color: #9C9C9C;
      font-size: 16px;
    }
  }

  &__filmography {
    margin-top: 75px;
    width: calc(4.347vw * 19);
  }

  &__movies-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}

.actor-cover {
  position: relative;
  width: 100vw;
  height: 100vh;

  &__bg {
    width: 100%;
    height: 80%;
    position: absolute;
    z-index: -1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    padding-left: 4.347vw;
    width: 100%;
    height: 80%;
    display: flex;
    align-items: left;
    justify-content: center;
    gap: 4.347vw;
    flex-direction: column;

    @media (min-width: 1024px) {
      padding-left: calc(4.347vw * 2);
      align-items: center;
      justify-content: left;
      flex-direction: row;
    }
  }

  &__name {
    width: calc(4.347vw * 6);

    h1 {
      font-size: 42px;
      font-family: 'Penumbra', sans-serif;
      
      @media (min-width: 1024px) {
        font-size: 64px;
      }
    }
  }

  &__infos {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__info {
    display: flex;
    align-items: center;
    gap: 18px;

    .number {
      line-height: normal;
      font-size: 42px;
      font-family: 'Penumbra', sans-serif;
    }

    @media (min-width: 1024px) {
      font-size: 92px;
    }

    .label {
      font-size: 18px;
      font-family: 'Penumbra', sans-serif;

      @media (min-width: 1024px) {
        font-size: 24px;
      }
    }
  }

  &__poster {
    position: absolute;
    margin-left: calc(4.347vw * 15);
    bottom: 0;

    img {
      width: calc(4.347vw * 7);
      height: 275px;
      object-fit: cover;

      @media (min-width: 1024px) {
        width: calc(4.347vw * 6);
        height: 537px;
      }
    }
  }
}
</style>
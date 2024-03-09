<script setup>
import { RouterLink } from 'vue-router';

defineProps(['data'])
</script>

<template>
  <RouterLink v-if="data['@type'] === 'Movie'" :to="{name: 'movie-single', params: {id: data.id}}" class="item-card">
    <div class="item-card__img">
      <img src="../assets/images/movie_poster.jpg" :alt="data.title + ' poster'" />
    </div>
    <div class="item-card__content">
      <h4 class="title">{{ data.title }}</h4>
      <div class="item-card__content-informations">
        <span>{{ data.duration }} min</span>
        |
        <span>{{ data.category.name }}</span>
      </div>
    </div>
  </RouterLink>

  <RouterLink v-if="data['@type'] === 'Actor'" :to="{name: 'actor-single', params: {id: data.id}}" class="item-card">
    <div class="item-card__img">
      <img src="../assets/images/actor_poster.jpeg" :alt="data.last_name + ' picture'" />
    </div>
    <div class="item-card__content">
      <h4 class="title">{{ data.first_name + ' ' + data.last_name }} </h4>
      <div class="item-card__content-informations">
        <span>{{ data.nationality.name }}</span>
      </div>
    </div>
  </RouterLink>

  <RouterLink to="#" v-if="data['@type'] === 'Category'" class="item-card__category">
    <div class="item-card__category__img">
      <img src="../assets/images/category_poster.jpg" :alt="data.name + ' picture'" />
    </div>
    <div class="item-card__category__content">
      <p>{{ data.name }}</p>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.item-card {
  width: calc(4.347vw * 8);
  margin-bottom: 35px;

  @media (min-width: 1024px) {
    width: calc(4.347vw * 4);
  }

  &:hover {
    .item-card__img {
      img {
        transform: scale(1.075);
      }
    }
  }

  &__category {
    width: calc(4.347vw * 9);
    margin-bottom: 60px;
    position: relative;

    &:hover {
      .item-card__category__img {
        img {
          transform: scale(1.025);
        }
      }
    }

    &__img {
      overflow: hidden;

      img {
        width: calc(4.347vw * 9);
        height: 296px;
        object-fit: cover;
        transition: 0.6s ease;
      }
    }

    &__content {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;

      p {
        color: white;
        font-size: 30px;
        font-family: 'Penumbra', sans-serif;
        text-align: center;
      }
    }
  }

  &__img {
    overflow: hidden;

    img {
      width: calc(4.347vw * 8);
      height: 245px;
      object-fit: cover;
      transition: 0.6s ease;

      @media (min-width: 1024px) {
        width: calc(4.347vw * 4);
        height: 345px;
      }
    }
  }

  &__content {
    .title {
      color: white;
      font-family: 'Penumbra', sans-serif;
      font-size: 16px;
      margin-top: 32px;
      margin-bottom: 16px;
    }

    &-informations {
      color: #9C9C9C;
      text-transform: uppercase;
      font-size: 14px;
      font-family: 'Nunito SemiBold', sans-serif;
      display: flex;
      flex-direction: row;
      gap: 15px;
    }
  }
}
</style>

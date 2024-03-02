<script setup>
defineProps(['data'])
</script>

<template>
  <div v-if="data['@type'] === 'Movie'" class="item-card">
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
  </div>

  <div v-if="data['@type'] === 'Actor'" class="item-card">
    <div class="item-card__img">
      <img src="../assets/images/actor_poster.jpeg" :alt="data.last_name + ' picture'" />
    </div>
    <div class="item-card__content">
      <h4 class="title">{{ data.first_name + ' ' + data.last_name }} </h4>
      <div class="item-card__content-informations">
        <span>{{ data.nationality.name }}</span>
      </div>
    </div>
  </div>

  <div v-if="data['@type'] === 'Category'" class="item-card__category">
    <div class="item-card__category__img">
      <img src="../assets/images/category_poster.jpg" :alt="data.name + ' picture'" />
    </div>
    <div class="item-card__category__content">
      <p>{{ data.name }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-card {
  width: calc(4.347vw * 4);

  &__category {
    width: calc(4.347vw * 9);
    margin-bottom: 60px;
    position: relative;

    &__img {
      img {
        width: calc(4.347vw * 9);
        height: 296px;
        object-fit: cover;
      }
    }

    &__content {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;

      p {
        font-size: 30px;
        font-family: 'Penumbra', sans-serif;
        text-align: center;
      }
    }
  }

  &__img {
    img {
      width: calc(4.347vw * 4);
      height: 345px;
      object-fit: cover;
    }
  }

  &__content {
    .title {
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

<script>

</script>

<template>
  <section class="main-cover">
    <div class="main-cover__bg">
      <img src="../assets/images/cover_background.jpg" alt="Movie poster" />
      <div class="dark-filter"></div>
    </div>
    <div class="main-cover__content">
      <h2>Lorem Ipsum</h2>
      <div class="main-cover__infos">
        <div class="score">
          <span>9.4</span>
        </div>
        <div class="duration">
          <span>1H54</span>
        </div>
        <div class="release">
          <span>2019</span>
        </div>
        <div class="age">
          <span>13+</span>
        </div>
      </div>
      <span class="category">Category</span>
      <p class="synopsis">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices tortor vel porttitor ornare. Integer quis felis neque. Nulla eleifend in dui in fringilla...</p>
    </div>
    <div class="main-cover__next">
      <div class="main-cover__next-text">
        <span class="next">Next</span>
        <p class="title">Lorem Ipsum</p>
      </div>
      <div class="main-cover__next-img">
        <img src="../assets/images/cover_next.jpg" alt="Next movie poster">
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.main-cover {
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
    }
  }

  &__content {
    height: 100vh;
    position: relative;
    display: flex;
    margin-left: 4.347vw;
    width: calc(4.347vw * 21);
    flex-direction: column;
    justify-content: center;
    color: white;
    z-index: 2;

    @media (min-width: 768px) {
      width: calc(4.347vw * 12);
    }

    @media (min-width: 1024px) {
      margin-left: calc(4.347vw * 2);
      width: calc(4.347vw * 6);
    }

    h2 {
      font-family: 'Penumbra', sans-serif;
      font-size: 36px;
      margin-bottom: 23px;
    }
  }

  &__infos {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 12px;

    .score {
      font-family: 'Penumbra', sans-serif;
      font-size: 18px;
    }
    
    .duration,
    .release {
      font-family: 'Nunito Light', sans-serif;
      font-size: 14px;
    }

    .age {
      font-size: 14px;
      padding: 2px 4px;
      border-radius: 5px;
      background-color: #990100;
    }
  }

  .category {
    font-size: 14px;
    font-family: 'Nunito Light', sans-serif;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .synopsis {
    font-size: 14px;
  }

  &__next {
    position: absolute;
    right: calc(4.347vw * 2);
    bottom: 40px;
    display: flex;
    align-items: center;
    gap: 40px;
    z-index: 2;

    &-img {
      img {
        width: 200px;

        @media (min-width: 1024px) {
          width: 365px;
          right: 4.347vw;
        }
      }
    }

    &-text {
      text-align: right;
      color: white;
      
      .next {
        font-size: 12px;
        text-transform: uppercase;
      }

      .title {
        font-family: 'Penumbra', sans-serif;
        font-size: 16px;
      }
    }
  }
}
</style>

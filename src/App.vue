<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="menu">
      <div class="menu__container">
        <div class="menu__home">
          <RouterLink to="/">
            <img src="./assets/images/logo_white.svg" alt="Scaryview logo" />
          </RouterLink>
        </div>
        <div class="menu__content">
          <div class="menu__links">
            <RouterLink to="#">Movies</RouterLink>
            <RouterLink to="#">Actors</RouterLink>
            <RouterLink to="#">Categories</RouterLink>
          </div>
          <div class="menu__buttons">
            <RouterLink to="#">
              <div class="btn">
                <span>Account</span>
              </div>
            </RouterLink>
            <RouterLink to="#">
              <div class="btn">
                <span>Logout</span>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />

  <footer class="footer">
    <div class="footer__container">
      <div class="footer__content">
        <div class="footer__logo">
          <img src="./assets/images/logo_white.svg" alt="Scaryview logo" />
        </div>
        <div class="footer__links">
          <RouterLink to="#">Movies</RouterLink>
          <RouterLink to="#">Actors</RouterLink>
          <RouterLink to="#">Categories</RouterLink>
          <RouterLink to="#">Account</RouterLink>
        </div>
        <div class="footer__subscribe">
          <div class="title">
            <p>Subscribe now</p>
          </div>
          <input placeholder="Your e-mail">
        </div>
      </div>
      <div class="footer__copyrights">

      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  background-color: #0E0909;

  &__container {
    padding: 85px calc(4.347vw * 2);
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    img {
      width: 238px;
    }
  }

  &__links {
    display: flex;
    gap: 70px;

    a {
      color: #9C9C9C;
      text-transform: uppercase;
      font-family: 'Nunito SemiBold', sans-serif;
      font-size: 14px;
    }
  }
}

.menu {
  background-color: #1A0404;
  position: absolute;
  z-index: 99;
  width: 100%;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 60px;
  }

  &__home {
    img {
      width: 185px;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 50px;
  }

  &__links {
    display: flex;
    gap: 50px;

    a {
      color: white;
      font-family: 'Nunito SemiBold', sans-serif;
      text-transform: uppercase;
      font-size: 14px;
    }
  }
}


</style>
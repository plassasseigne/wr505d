<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="menu">
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
    </nav>
  </header>

  <RouterView />
</template>

<style lang="scss">
.menu {
  background-color: #1A0404;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 60px;

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
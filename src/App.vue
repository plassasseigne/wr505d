<script setup>
import { RouterLink, RouterView } from 'vue-router'
import router from "@/router"
import Button from './components/Button.vue'

if (!localStorage.getItem('token')) {
  router.push({ name: 'login' })
}

const logout = () => {
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token')
    router.push({ name: 'login' })
  }
}
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
            <RouterLink to="/movies">Movies</RouterLink>
            <RouterLink to="/actors">Actors</RouterLink>
            <RouterLink to="/categories">Categories</RouterLink>
          </div>
          <div class="menu__buttons">
            <Button title="Account" link="/account"></Button>
            <Button @click="logout" title="Logout"></Button>
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
          <RouterLink to="/movies">Movies</RouterLink>
          <RouterLink to="/actors">Actors</RouterLink>
          <RouterLink to="/categories">Categories</RouterLink>
          <RouterLink to="/account">Account</RouterLink>
        </div>
        <div class="footer__subscribe">
          <div class="title">
            <p>Subscribe now</p>
          </div>
          <input type="email" placeholder="Your e-mail">
        </div>
      </div>
      <div class="footer__copyrights">
        <p>Copyright @ Scaryview All rights reserved</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  background-color: #0E0909;

  &__container {
    padding: 85px calc(4.347vw * 2);
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 50px;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 1024px) {
      flex-direction: row;
      gap: 0;
    }
  }

  &__logo {
    img {
      width: 238px;
    }
  }

  &__links {
    display: flex;
    gap: 70px;
    flex-wrap: wrap;
    justify-content: center;

    @media (min-width: 1024px) {
      flex-wrap: nowrap;
    }

    a {
      color: #9C9C9C;
      text-transform: uppercase;
      font-family: 'Nunito SemiBold', sans-serif;
      font-size: 14px;
    }
  }

  &__subscribe {
    .title {
      margin-bottom: 10px;
      font-size: 16px;
      font-family: 'Penumbra', sans-serif;
    }

    input { 
      width: 100%;
      background: none;
      border: none;
      color: white;
      border-bottom: solid 1px #850606;
      padding-bottom: 10px;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #9C9C9C;
      }
    }
  }

  &__copyrights {
    display: flex;
    justify-content: center;

    p {
      color: #9C9C9C;
    }
  }
}

.menu {
  background-color: #1A0404;
  position: block;
  width: 100%;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 60px;
    flex-direction: column;

    @media (min-width: 1024px) {
      flex-direction: row;
    }
  }

  &__home {
    margin-bottom: 20px;

    @media (min-width: 1024px) {
      margin-bottom: 0;
    }

    img {
      width: 185px;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 30px;

    @media (min-width: 1024px) {
      flex-direction: row;
      gap: 50px;
    }
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

  &__buttons {
    display: flex;
    gap: 30px;
  }
}


</style>
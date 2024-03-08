<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios'

const dataUser = ref('')

const token = localStorage.getItem('token')

onMounted(async() => {
  getUser()
})

const getUser = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/me', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    dataUser.value = response.data
  } catch (error) {
    console.log(error)
  }
}

const editUser = async () => {
  const data = {
    "email": `${dataUser.value.email}`,
    "username": `${dataUser.value.username}`
  }

  try {
    const request = await axios.patch('http://127.0.0.1:8000/api/me/update', data, {
      headers: {
        'Content-Type': 'application/merge-patch+json',
        'Authorization': 'Bearer ' + token
      }
    })

    getUser()
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <section class="account">
    <div class="account__wrapper">
      <div class="account__form-part">
        <h1 class="account__title">My account</h1>
        <form @submit.prevent="editUser" class="form">
          <div class="form-row">
            <div class="form-element">
              <label for="user-username">Username</label>
              <input type="text" id="user-username" v-model="dataUser.username">
            </div>
          </div>
          <div class="form-row">
            <div class="form-element">
              <label for="user-email">Email</label>
              <input type="email" id="user-email" v-model="dataUser.email">
            </div>
          </div>
          <div class="form-row">
            <input type="submit" value="Save">
          </div>
        </form>
      </div>
      <div class="account__picture-part">
        <div class="account__picture-part__bg">
          <img src="../assets/images/background.jpg" alt="Dark forest" />
        </div>
        <div class="account__picture-part__content">
          <div class="account__picture-part__picture">
            <img src="../assets/images/actor_poster.jpeg" alt="Profile picture" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.account {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(80vh + 80px);
  padding-top: 80px;

  &__wrapper {
    width: calc(4.347vw * 19);
    background-color: #850606;
    display: flex;
    overflow: hidden;
    border-radius: 30px;
  }

  &__form-part {
    width: calc(4.347vw * 11);
    padding: 100px calc(4.347vw * 2);
    position: relative;
  }

  &__picture-part {
    width: calc(4.347vw * 8);
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &__bg {
      position: absolute;
    }

    &__picture {
      position: relative;

      img {
        width: calc(4.347vw * 4);
        height: 350px;
        object-fit: cover;
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
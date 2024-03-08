<script setup>
import { ref } from 'vue';
import router from "@/router";
import axios from 'axios'

const data = ref('')
let email = ref('')
let password = ref('')

const login = async () => {
  const data = {
    "username": `${email.value}`,
    "password": `${password.value}`, 
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login_check', data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    data.value = response.data
    localStorage.setItem('token', data.value.token)
    router.push('/')
  } catch (error) {
   console.log(error) 
  }
}

</script>

<template>
  <section class="login">
    <div class="login__wrapper">
      <div class="login__title">Login</div>
      <form @submit.prevent="login" class="form">
        <div class="form-row">
          <label for="email">Email</label>
          <input placeholder="john.doe@mail.com" type="email" id="email" v-model="email" required>
        </div>
        <div class="form-row">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div class="form-row">
          <div class="submit-button">
            <input type="submit" value="Submit">
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.login {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &__wrapper {
    background-color: #850606;
    display: flex;
    overflow: hidden;
    border-radius: 15px;
    width: calc(4.347vw * 7);
    padding: 50px 4.347vw;
    flex-direction: column;
    align-items: center;
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
    flex-direction: column;
  }

  label {
      margin-bottom: 10px;
      font-size: 16px;
      font-family: 'Penumbra', sans-serif;
    }

  input {
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

  input[type=submit] {
    background-color: #490303;
    color: white;
    text-transform: uppercase;
    padding: 10px 30px;
    border: none;
    border-radius: 6px;
    margin-top: 10px;
  }
}
</style>
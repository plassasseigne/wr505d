<script setup>
import { onMounted, ref } from 'vue'
import router from "@/router";
import axios from 'axios'

const dataNationalities = ref('')
const token = localStorage.getItem('token')

const actorFirstName = ref('')
const actorLastName = ref('')
const actorNationality = ref('')
const actorBirthday = ref('')
const actorBiography = ref('')

onMounted(async() => {
  getNationalities()
})

const getNationalities = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/nationalities?pagination=false', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    dataNationalities.value = response.data
  } catch (error) {
    if (error.response.data.code === 401) {
      return router.push('/login')
    } else {
      console.log(error)
    }
  }
}

const createActor = async () => {
  const data = {
    "firstName": `${actorFirstName.value}`,
    "lastName": `${actorLastName.value}`,
    "nationality": '/api/nationalities/' + actorNationality.value,
    "dateBirth": `${actorBirthday.value}`,
    "biography": `${actorBiography.value}`
  }

  try {
    const request = await axios.post('http://127.0.0.1:8000/api/actors', data, {
      headers: {
        'Content-Type': 'application/ld+json; charset=utf-8',
        'Authorization': 'Bearer ' + token
      }
    })

    console.log(request)
    location.href = '/actors'
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
  <section class="actor-add">
    <div class="actor-add__wrapper">
      <div class="actor-add__form-part">
        <h1 class="actor-add__title">Add a new actor</h1>
        <form @submit.prevent="createActor" class="form">
          <div class="form-row">
            <div class="form-element">
              <label for="actor-firstname">First name *</label>
              <input placeholder="John" type="text" id="actor-firstname" v-model="actorFirstName" required>
            </div>
            <div class="form-element">
              <label for="actor-lastname">Last name *</label>
              <input placeholder="Doe" type="text" id="actor-lastname" v-model="actorLastName" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-element">
              <label for="actor-biography">Biography *</label>
              <textarea placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit..." id="actor-biography" v-model="actorBiography" required></textarea>
            </div>
          </div>
          <div class="form-row">
            <div class="form-element">
              <label for="actor-birthday">Birthday *</label>
              <input type="date" id="actor-birthday" v-model="actorBirthday" required />
            </div>
          </div>
          <div v-if="dataNationalities" class="form-row">
            <div class="form-element">
              <label for="actor-nationality">Nationality *</label>
              <select name="actor-nationality" id="actor-nationality" v-model="actorNationality" required>
                <option v-for="nationality in dataNationalities['hydra:member']" :key="nationality.id" :value="nationality.id">{{ nationality.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <input type="submit" value="Create">
          </div>
        </form>
      </div>
      <div class="actor-add__poster-part">
        <div class="actor-add__poster-part__bg">
          <img src="../assets/images/background.jpg" alt="Dark forest" />
        </div>
        <div class="actor-add__poster-part__content">
          <div class="actor-add__poster-part__poster">
            <img src="../assets/images/actor_poster.jpeg" alt="Actor poster" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.actor-add {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(120vh + 80px);
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

  &__poster-part {
    width: calc(4.347vw * 8);
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &__bg {
      position: absolute;
    }

    &__poster {
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
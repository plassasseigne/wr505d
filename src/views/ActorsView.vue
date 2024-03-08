<script setup>
import { onMounted, ref } from 'vue';
import router from "@/router";
import axios from 'axios'
import SmallCover from '../components/SmallCover.vue'
import ItemCard from '../components/ItemCard.vue'

const dataActors = ref('')
const dataNationalities = ref('')
const nextPage = ref('')
const prevPage = ref('')
const token = localStorage.getItem('token')

const editActorData = ref('')
const editActorFirstName = ref('')
const editActorLastName = ref('')
const editActorNationality = ref('')
const editActorBirthday = ref('')
const editActorBiography = ref('')

const deleteActorData = ref('')
const deleteActorFirstName = ref('')
const deleteActorLastName = ref('')

let search = ref('')
let allActors = ref('')

onMounted(async() => {
  getActors()
  getNationalities()
})

// Get items

const getActors = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/actors', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    dataActors.value = response.data
    allActors.value = response.data
    nextPage.value = response.data['hydra:view']['hydra:next']

    if (response.data['hydra:view']['hydra:previous']) {
      prevPage.value = response.data['hydra:view']['hydra:previous']
    }

  } catch (error) {
    if (error.response.data.code === 401) {
      return router.push('/login')
    } else {
      console.log(error)
    }
  }
}

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

// Pagination

const onNextPage = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000' + nextPage.value, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    dataActors.value = response.data
    prevPage.value = response.data['hydra:view']['hydra:previous']

    if (response.data['hydra:view']['hydra:next']) {
      nextPage.value = response.data['hydra:view']['hydra:next']
    } else {
      document.querySelector('.next-arrow').classList.add('disable')
    }

    window.scrollTo(0, 0)
    document.querySelector('.prev-arrow').classList.remove('disable')
  } catch (error) {
    if (error.response.data.code === 401) {
      return router.push('/login')
    } else {
      console.log(error)
    }
  }
}

const onPrevPage = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000' + prevPage.value, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    dataActors.value = response.data
    nextPage.value = response.data['hydra:view']['hydra:next']

    if (response.data['hydra:view']['hydra:previous']) {
      prevPage.value = response.data['hydra:view']['hydra:previous']
    } else {
      document.querySelector('.prev-arrow').classList.add('disable')
    }

    window.scrollTo(0, 0)
    document.querySelector('.next-arrow').classList.remove('disable')
  } catch (error) {
    if (error.response.data.code === 401) {
      return router.push('/login')
    } else {
      console.log(error)
    }
  }
}

// Search

const searchFilter = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/actors?last_name=' + search.value, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    dataActors.value = response.data
  } catch (error) {
    if (error.response.data.code === 401) {
      return router.push('/login')
    } else {
      console.log(error)
    }
  }
}

// Edit actor

const displayEditor = async (id) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/actors/' + id, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    editActorData.value = response.data
    editActorFirstName.value = editActorData.value.first_name
    editActorLastName.value = editActorData.value.last_name
    editActorNationality.value = editActorData.value.nationality
    editActorBirthday.value = editActorData.value.date_birth.split('T')[0]
    editActorBiography.value = editActorData.value.biography

    document.querySelector('.items-edit').style.transform = 'translateX(0)'
    document.querySelector('.items-edit').style.width = 'calc(4.347vw * 11)'
    document.querySelector('.items-list').style.width = 'calc(4.347vw * 9)'
  } catch (error) {
    if (error.response.data.code === 401) {
      return router.push('/login')
    } else {
      console.log(error)
    }
  }
}

const hideEditor = () => {
  document.querySelector('.items-edit').style.transform = 'translateX(60vw)'
  document.querySelector('.items-edit').style.width = '4.347vw'
  document.querySelector('.items-list').style.width = 'calc(4.347vw * 19)'
}

const editActor = async () => {
  const data = {
    "nationality": '/api/nationalities/' + editActorNationality.value.id,
    "biography": `${editActorBiography.value}`,
    "firstName": `${editActorFirstName.value}`,
    "lastName": `${editActorLastName.value}`,
    "dateBirth": `${editActorBirthday.value}`
  }

  try {
    const request = await axios.patch('http://127.0.0.1:8000/api/actors/' + editActorData.value.id, data, {
      headers: {
        'Content-Type': 'application/merge-patch+json',
        'Authorization': 'Bearer ' + token
      }
    })

    getActors()
    hideEditor()
  } catch (error) {
    if (error.response.data.code === 401) {
      return router.push('/login')
    } else {
      console.log(error)
    }
  }
}

// Delete movie

const displayDelete = async (item) => {
  deleteActorData.value = item.id
  deleteActorFirstName.value = item.first_name
  deleteActorLastName.value = item.last_name

  document.querySelector('.items-delete').style.display = 'block'
}

const hideDelete = async () => {
  deleteActorData.value = ''
  deleteActorFirstName.value = ''
  deleteActorLastName.value = ''

  document.querySelector('.items-delete').style.display = 'none'
}

const deleteActor = async () => {
  try {
    const request = await axios.delete('http://127.0.0.1:8000/api/actors/' + deleteActorData.value, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    getActors()
    hideDelete()
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
  <SmallCover :title="'Actors'"></SmallCover>

  <div class="admin-bar">
    <div class="admin-bar__search">
      <input type="text" v-model.trim="search" placeholder="Search an actor last name..." @input="searchFilter">
    </div>
    <div class="admin-bar__add">
      <RouterLink class="button" to="/actor/add">
        <img src="../assets/images/add.svg" alt="Add logo" />
        <span>New actor</span>
      </RouterLink>
    </div>
  </div>

  <div v-if="dataActors" class="archive">
    <div class="archive__content">

      <div class="items-delete">
        <div class="items-delete__wrapper">
          <div class="items-delete__content">
            <h3 class="items-delete__title">Warning !</h3>
            <p>You are about to delete the actor <b>{{ deleteActorFirstName && deleteActorLastName ? deleteActorFirstName + ' ' + deleteActorLastName  : '' }}</b>, this action is irreversible. Please confirm.</p>
            <div class="items-delete__buttons">
              <a @click="deleteActor()" class="button">
                <span class="button__title">Confirm</span>
              </a>
              <a @click="hideDelete()" class="button">
                <span class="button__title">Cancel</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="items-list">
        <div v-for="item in dataActors['hydra:member']" :key="item.id" class="items-list__item">
          <div class="items-list__manage">
            <a @click="displayEditor(item.id)" class="items-list__action">
              <img src="../assets/images/edit.svg" />
            </a>
            <a @click="displayDelete(item)" class="items-list__action">
              <img src="../assets/images/delete.svg" />
            </a>
          </div>
          <ItemCard :data="item"></ItemCard>
        </div>
      </div>

      <div class="items-edit">
        <div class="items-edit__wrapper">
          <a @click="hideEditor" class="items-edit__close">
            <img src="../assets/images/close.svg" alt="Close icon" />
          </a>
          <div class="items-edit__title">Edit actor</div>
          <form @submit.prevent="editActor" class="form">
            <div class="form-row">
              <div class="form-element">
                <label for="actor-firstname">First name *</label>
                <input placeholder="John" type="text" id="actor-firstname" v-model="editActorFirstName" required>
              </div>
              <div class="form-element">
                <label for="actor-lastname">Last name *</label>
                <input placeholder="Doe" type="text" id="actor-lastname" v-model="editActorLastName" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-element">
                <label for="actor-biography">Biography *</label>
                <textarea placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit..." id="actor-biography" v-model="editActorBiography" required></textarea>
              </div>
            </div>
            <div class="form-row">
              <div class="form-element">
                <label for="actor-birthday">Birthday *</label>
                <input type="date" id="actor-birthday" v-model="editActorBirthday" required />
              </div>
            </div>
            <div v-if="dataNationalities" class="form-row">
              <div class="form-element">
                <label for="actor-nationality">Nationality *</label>
                <select name="actor-nationality" id="actor-nationality" v-model="editActorNationality.id" required>
                  <option v-for="nationality in dataNationalities['hydra:member']" :selected="nationality.name === editActorNationality.name" :key="nationality.id" :value="nationality.id">{{ nationality.name }}</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <input type="submit" value="Edit">
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="pagination">
      <div @click="onPrevPage" class="prev-arrow disable">
        <img src="../assets/images/pagination_arrow.svg" />
      </div>
      <div @click="onNextPage" class="next-arrow">
        <img src="../assets/images/pagination_arrow.svg" />
      </div>
    </div>
  </div>

  <div v-else class="loader">
    <p>Loading, please wait...</p>
  </div>
</template>

<style lang="scss" scoped>
.archive {
  &__content {
    display: flex;
    width: calc(4.347vw * 24);
  }
}

.items-delete {
  position: fixed;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: rgba(0, 0, 0, 0.25);
  display: none;

  &__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__content {
    background-color: #850606;
    padding: 50px 4.347vw;
    border-radius: 30px;

    p {
      margin-bottom: 32px;
    }
  }

  &__title {
    font-size: 36px;
    text-align: center;
    font-family: 'Penumbra', sans-serif;
    margin-bottom: 32px;
  }

  &__buttons {
    display: flex;
    justify-content: center;
    gap: 30px;

    .button {
      background-color: #490303;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 10px 30px;
      border-radius: 6px;
      transition-duration: 0.4s;
      cursor: pointer;

      &__title {
        color: white;
        font-size: 14px;
        text-transform: uppercase;
      }
    }
  }
}

.items-edit {
  transform: translateX(60vw);
  transition-duration: 0.4s;
  width: 4.347vw;
  margin-left: 4.347vw;
  margin-top: 64px;
  position: relative;

  &__wrapper {
    background-color: #850606;
    padding: 60px 4.347vw;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 30px 0 0 30px;
  }

  &__close {
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
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

.items-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: calc(4.347vw * 2);
  width: calc(4.347vw * 19);
  margin-top: 64px;
  margin-bottom: 30px;
  transition-duration: 0.4s;

  &__item {
    margin-bottom: 35px;
    position: relative;
  }

  &__manage {
    position: absolute;
    z-index: 2;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 10px;
  }

  &__action {
    background-color: #850606;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    transition-duration: 0.4s;
    cursor: pointer;

    &:hover {
      background-color: #490303;
    }
  }
}

.admin-bar {
  margin-left: calc(4.347vw * 2);
  width: calc(4.347vw * 19);
  display: flex;
  justify-content: space-between;
  align-items: self-end;
  margin-top: 32px;

  &__search {
    input {
      width: calc(4.347vw * 5);
      border: none;
      background: none;
      border-bottom: solid 1px #850606;
      padding-bottom: 15px;
      color: white;

      &:focus {
        outline: none;
      }
    }
  }

  &__add {
    .button {
      background-color: #850606;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      padding: 10px 35px;
      border-radius: 6px;
      transition-duration: 0.4s;

      &:hover {
        background-color: #490303;
      }

      span {
        color: white;
        font-size: 14px;
        text-transform: uppercase;
      }
    }
  }
}

.loader {
  width: 100vw;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-family: 'Penumbra', sans-serif;
    font-size: 32px;
  }
}

.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 50px;
  
  .prev-arrow,
  .next-arrow {
    width: 50px;
    height: 50px;
    background-color: #850606;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .prev-arrow {
    img {
      transform: rotate(180deg);
    }
  }

  .disable {
    background-color: #490303;
    pointer-events: none;
  }
}
</style>
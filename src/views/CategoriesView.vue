<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios'
import SmallCover from '../components/SmallCover.vue'
import ItemCard from '../components/ItemCard.vue'

const dataCategories = ref('')
const nextPage = ref('')
const prevPage = ref('')
const token = localStorage.getItem('token')

const editCategoryData = ref('')
const editCategoryName = ref('')

const deleteCategoryData = ref('')
const deleteCategoryName = ref('')

let search = ref('')
let allCategories = ref('')

onMounted(async() => {
  getCategories()
})

// Get items

const getCategories = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/categories', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    dataCategories.value = response.data
    allCategories.value = response.data
    nextPage.value = response.data['hydra:view']['hydra:next']

    if (response.data['hydra:view']['hydra:previous']) {
      prevPage.value = response.data['hydra:view']['hydra:previous']
    }

  } catch (error) {
    console.log(error)
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

    dataCategories.value = response.data
    prevPage.value = response.data['hydra:view']['hydra:previous']

    if (response.data['hydra:view']['hydra:next']) {
      nextPage.value = response.data['hydra:view']['hydra:next']
    } else {
      document.querySelector('.next-arrow').classList.add('disable')
    }

    window.scrollTo(0, 0)
    document.querySelector('.prev-arrow').classList.remove('disable')
  } catch (error) {
    console.log(error)
  }
}

const onPrevPage = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000' + prevPage.value, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    dataCategories.value = response.data
    nextPage.value = response.data['hydra:view']['hydra:next']

    if (response.data['hydra:view']['hydra:previous']) {
      prevPage.value = response.data['hydra:view']['hydra:previous']
    } else {
      document.querySelector('.prev-arrow').classList.add('disable')
    }

    window.scrollTo(0, 0)
    document.querySelector('.next-arrow').classList.remove('disable')
  } catch (error) {
    console.log(error)
  }
}

// Search

const searchFilter = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/categories?name=' + search.value, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    dataCategories.value = response.data
  } catch (error) {
    console.log(error)
  }
}

// Edit category

const displayEditor = async (id) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/categories/' + id, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    editCategoryData.value = response.data
    editCategoryName.value = editCategoryData.value.name

    document.querySelector('.items-edit').style.transform = 'translateX(0)'
    document.querySelector('.items-edit').style.width = 'calc(4.347vw * 11)'
    document.querySelector('.items-list').style.width = 'calc(4.347vw * 9)'
  } catch (error) {
    console.log(error)
  }
}

const hideEditor = () => {
  document.querySelector('.items-edit').style.transform = 'translateX(60vw)'
  document.querySelector('.items-edit').style.width = '4.347vw'
  document.querySelector('.items-list').style.width = 'calc(4.347vw * 19)'
}

const editCategory = async () => {
  const data = {
    "name": `${editCategoryName.value}`
  }

  try {
    const request = await axios.patch('http://127.0.0.1:8000/api/categories/' + editCategoryData.value.id, data, {
      headers: {
        'Content-Type': 'application/merge-patch+json',
        'Authorization': 'Bearer ' + token
      }
    })

    getCategories()
    hideEditor()
  } catch (error) {
    console.log(error)
  }
}

// Delete category

const displayDelete = async (item) => {
  deleteCategoryData.value = item.id
  deleteCategoryName.value = item.name

  document.querySelector('.items-delete').style.display = 'block'
}

const hideDelete = async () => {
  deleteCategoryData.value = ''
  deleteCategoryName.value = ''

  document.querySelector('.items-delete').style.display = 'none'
}

const deleteCategory = async () => {
  try {
    const request = await axios.delete('http://127.0.0.1:8000/api/categories/' + deleteCategoryData.value, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    getCategories()
    hideDelete()
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <SmallCover :title="'Categories'"></SmallCover>

  <div class="admin-bar">
    <div class="admin-bar__search">
      <input type="text" v-model.trim="search" placeholder="Search a category name..." @input="searchFilter">
    </div>
    <div class="admin-bar__add">
      <RouterLink class="button" to="/category/add">
        <img src="../assets/images/add.svg" alt="Add logo" />
        <span>New category</span>
      </RouterLink>
    </div>
  </div>

  <div v-if="dataCategories" class="archive">
    <div class="archive__content">

      <div class="items-delete">
        <div class="items-delete__wrapper">
          <div class="items-delete__content">
            <h3 class="items-delete__title">Warning !</h3>
            <p>You are about to delete the category <b>{{ deleteCategoryName }}</b>, this action is irreversible. Please confirm.</p>
            <div class="items-delete__buttons">
              <a @click="deleteCategory()" class="button">
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
        <div v-for="item in dataCategories['hydra:member']" :key="item.id" class="items-list__item">
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
          <div class="items-edit__title">Edit category</div>
          <form @submit.prevent="editCategory" class="form">
            <div class="form-row">
              <div class="form-element">
                <label for="category-title">Name *</label>
                <input placeholder="Lorem Ipsum" type="text" id="category-title" v-model="editCategoryName" required>
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
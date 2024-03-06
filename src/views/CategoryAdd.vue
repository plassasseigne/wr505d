<script setup>
import { ref } from 'vue'
import axios from 'axios'

const token = localStorage.getItem('token')

const categoryName = ref('')

const createCategory = async () => {
  const data = {
    "name": `${categoryName.value}`
  }

  try {
    const request = await axios.post('http://127.0.0.1:8000/api/categories', data, {
      headers: {
        'Content-Type': 'application/ld+json; charset=utf-8',
        'Authorization': 'Bearer ' + token
      }
    })

    location.href = '/categories'
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <section class="category-add">
    <div class="category-add__wrapper">
      <div class="category-add__form-part">
        <h1 class="category-add__title">Add a new category</h1>
        <form @submit.prevent="createCategory" class="form">
          <div class="form-row">
            <div class="form-element">
              <label for="category-title">Name *</label>
              <input placeholder="Lorem Ipsum" type="text" id="category-title" v-model="categoryName" required>
            </div>
          </div>
          <div class="form-row">
            <input type="submit" value="Create">
          </div>
        </form>
      </div>
      <div class="category-add__poster-part">
        <div class="category-add__poster-part__bg">
          <img src="../assets/images/background.jpg" alt="Dark forest" />
        </div>
        <div class="category-add__poster-part__content">
          <div class="category-add__poster-part__poster">
            <img src="../assets/images/category_poster.jpg" alt="Category poster" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.category-add {
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
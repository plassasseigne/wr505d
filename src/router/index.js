import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AccountView from '../views/AccountView.vue'

import MoviesView from '../views/MoviesView.vue'
import ActorsView from '../views/ActorsView.vue'
import CategoriesView from '../views/CategoriesView.vue'

import MovieView from '../views/MovieView.vue'
import ActorView from '../views/ActorView.vue'

import MovieAdd from '../views/MovieAdd.vue'
import ActorAdd from '../views/ActorAdd.vue'
import CategoryAdd from '../views/CategoryAdd.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
    },
    // Item archive
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView
    },
    {
      path: '/actors',
      name: 'actors',
      component: ActorsView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView
    },
    // Item informations
    {
      path: '/movie/:id',
      name: 'movie-single',
      component: MovieView
    },
    {
      path: '/actor/:id',
      name: 'actor-single',
      component: ActorView
    },
    // Item creation
    {
      path: '/movie/add',
      name: 'movie-add',
      component: MovieAdd
    },
    {
      path: '/actor/add',
      name: 'actor-add',
      component: ActorAdd
    },
    {
      path: '/category/add',
      name: 'category-add',
      component: CategoryAdd
    },
  ]
})

export default router

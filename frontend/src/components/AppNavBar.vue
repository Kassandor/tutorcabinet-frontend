<script setup>
import {ref} from 'vue'

const appTitle = ref('Кабинет репетитора')
const sidebar = ref(false)
const menuItems = [
  {title: 'Home', path: '/', icon: 'mdi-home-account'},
  {title: 'Sign In', path: '/signin', icon: 'mdi-login'}
]
</script>

<template>
  <v-navigation-drawer v-model="sidebar" app temporary>
    <v-list>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.path"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app>
    <v-app-bar-nav-icon class="d-sm-none" @click="sidebar = !sidebar"/>

    <v-toolbar-title>
      <router-link to="/" style="text-decoration: none; color: inherit;">
        {{ appTitle }}
      </router-link>
    </v-toolbar-title>

    <v-spacer/>

    <div class="d-none d-sm-flex">
      <v-btn
        v-for="item in menuItems"
        :key="item.title"
        :to="item.path"
        variant="text"
      >
        <v-icon start>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>

    </div>
  </v-app-bar>

</template>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
      <h3>ToDo App</h3>
    </v-app-bar>

    <v-main class="main">
      <router-view />
    </v-main>

    <v-footer dark padless>
      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>ToDo App</strong>
        <v-btn
          fab
          small
          text
          class="mx-2"
          target="_blank"
          href="https://github.com/inouchi/todo-app"
        >
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </v-card-text>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {}
</script>

<style scoped>
.main {
  background-color: #f9f9f9;
}
</style>

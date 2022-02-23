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

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon>mdi-translate</v-icon>
            <v-icon small>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group
            v-model="selectedLanguage"
            mandatory
            color="primary"
            @change="changeLanguage()"
          >
            <v-list-item
              v-for="item in LANGUAGE_ITEMS"
              :key="item.value"
              :value="item.value"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
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

export const LanguageType = {
  JA: "ja",
  EN: "en",
} as const;

@Component({})
export default class App extends Vue {
  LANGUAGE_ITEMS = [
    {
      text: "日本語",
      value: LanguageType.JA,
    },
    {
      text: "English",
      value: LanguageType.EN,
    },
  ] as const;

  selectedLanguage = this.$i18n.locale;

  changeLanguage(): void {
    this.$i18n.locale = this.selectedLanguage;
  }
}
</script>

<style scoped>
.main {
  background-color: #f9f9f9;
}
</style>

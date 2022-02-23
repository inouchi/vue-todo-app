<template>
  <v-container>
    <validation-observer ref="observer">
      <v-card>
        <v-card-text>
          <validation-provider
            v-slot="{ errors }"
            name="Title"
            rules="required"
          >
            <v-text-field
              v-model="todo.title"
              :label="$t('messages.title')"
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>
          <v-textarea
            v-model="todo.detail"
            :label="$t('messages.detail')"
          ></v-textarea>
          <v-row>
            <v-col>
              <v-menu
                v-model="showDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="todo.date"
                    :label="$t('messages.date')"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                    clearable
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="todo.date"
                  @input="showDatePicker = false"
                  :day-format="(date) => new Date(date).getDate()"
                  :locale="getLocale()"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-menu
                ref="timePicker"
                v-model="showTimePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
                persistent
                :return-value.sync="todo.time"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="todo.time"
                    prepend-icon="mdi-clock-outline"
                    :label="$t('messages.time')"
                    readonly
                    v-on="on"
                    clearable
                  >
                  </v-text-field>
                </template>
                <v-time-picker
                  v-if="showTimePicker"
                  v-model="todo.time"
                  format="24hr"
                  @click:minute="$refs.timePicker.save(todo.time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="error"
            fab
            small
            class="ma-2"
            style="text-transform: none"
            elevation="0"
            @click="toHome()"
          >
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            color="success"
            fab
            small
            class="ma-2"
            style="text-transform: none"
            elevation="0"
            @click="clickRegisterButton()"
          >
            <v-icon>mdi-square-edit-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </validation-observer>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Todo, TodoStatus } from "@/models/Todo";
import { Store } from "@/store/Store";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { LanguageType } from "@/App.vue";

@Component({ components: { ValidationProvider, ValidationObserver } })
export default class RegisterTodo extends Vue {
  todo!: Todo;
  showDatePicker = false;
  showTimePicker = false;

  created(): void {
    if (this.$route.path === "/edit") {
      this.todo = Store.loadTodo();
      Store.deleteTodo();
    } else {
      const id = this.getUniqueID();
      this.todo = new Todo(id, "", "", "", "", TodoStatus.WORK);
    }
  }

  @Watch("$i18n.locale")
  onI18nLocale(): void {
    type ValidationObserverRef = InstanceType<typeof ValidationObserver>;
    const observer = this.$refs.observer as ValidationObserverRef;
    observer.reset();
  }

  getUniqueID(): string {
    return new Date().getTime().toString();
  }

  getLocale(): string {
    return this.$i18n.locale === LanguageType.JA ? "jp-ja" : "en-US";
  }

  async clickRegisterButton(): Promise<void> {
    const observer = this.$refs.observer as InstanceType<
      typeof ValidationObserver
    >;
    if (await observer.validate()) {
      Store.saveTodo(this.todo);
      this.toHome();
    }
  }

  toHome(): void {
    this.$router.push("/");
  }
}
</script>

<style scoped></style>

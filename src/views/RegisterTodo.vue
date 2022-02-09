<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-text-field v-model="todo.title" label="Title"></v-text-field>
        <v-textarea v-model="todo.detail" label="Detail"></v-textarea>
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
                  label="Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                >
                  <template v-slot:append-outer>
                    <v-btn x-small fab text @click="clearDate()"
                      ><v-icon>mdi-close</v-icon></v-btn
                    >
                  </template></v-text-field
                >
              </template>
              <v-date-picker
                v-model="todo.date"
                @input="showDatePicker = false"
                :day-format="(date) => new Date(date).getDate()"
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
                  label="Time"
                  readonly
                  v-on="on"
                >
                  <template v-slot:append-outer>
                    <v-btn x-small fab text @click="clearTime()"
                      ><v-icon>mdi-close</v-icon></v-btn
                    >
                  </template>
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
          @click="addTodo()"
        >
          <v-icon>mdi-square-edit-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Todo, TodoStatus } from "@/models/Todo";
import { Store } from "@/store/Store";

@Component({})
export default class RegisterTodo extends Vue {
  todo!: Todo;
  showDatePicker = false;
  showTimePicker = false;

  created() {
    if (this.$route.path === "/edit") {
      this.todo = Store.loadTodo();
      Store.deleteTodo();
    } else {
      const id = this.getUniqueID();
      this.todo = new Todo(id, "", "", "", "", TodoStatus.WORK);
    }
  }

  getUniqueID() {
    return new Date().getTime().toString();
  }

  addTodo() {
    Store.saveTodo(this.todo);
    this.toHome();
  }

  toHome() {
    this.$router.push("/");
  }

  clearDate() {
    this.todo.clearDate();
    this.$forceUpdate();
  }

  clearTime() {
    this.todo.clearTime();
    this.$forceUpdate();
  }
}
</script>

<style scoped></style>

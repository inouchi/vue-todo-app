<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="getItems(searchOption)"
        :search="search"
      >
        <template v-slot:item.status="{ item }">
          <v-chip
            dark
            :color="getStatusColor(item.status)"
            @click="emitChangeStatus(item)"
          >
            {{ getStatus(item) }}
          </v-chip>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            color="success"
            small
            fab
            text
            elevation="0"
            style="text-transform: none"
            @click="emitEeditTodo(item)"
            ><v-icon>mdi-square-edit-outline</v-icon></v-btn
          >
          <v-btn
            color="error"
            small
            fab
            text
            elevation="0"
            style="text-transform: none"
            @click="emitDeleteTodo(item)"
            ><v-icon>mdi-trash-can-outline</v-icon></v-btn
          >
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Todo, TodoStatus } from "@/models/Todo";
import { RadioValue } from "@/views/Home.vue";

@Component({})
export default class value extends Vue {
  @Prop({ type: Array, required: true })
  todoList!: Todo[];

  @Prop({ type: Number, required: true })
  searchOption!: RadioValue;

  search = "";

  readonly headers = [
    { text: "Title", value: "title", class: "blue lighten-4", width: "20%" },
    {
      text: "Detail",
      value: "detail",
      class: "blue lighten-4",
      width: "40%",
    },
    { text: "Date", value: "date", class: "blue lighten-4", width: "10%" },
    { text: "Time", value: "time", class: "blue lighten-4", width: "10%" },
    {
      text: "Status",
      value: "status",
      class: "blue lighten-4",
      width: "10%",
    },
    {
      text: "",
      value: "action",
      class: "blue lighten-4",
      sortable: false,
      width: "10%",
    },
  ];

  getItems(searchOption: RadioValue) {
    let items: Todo[] = [];
    switch (searchOption) {
      case RadioValue.All:
        items = this.todoList;
        break;
      case RadioValue.Work:
        items = this.todoList.filter((v) => v.status === TodoStatus.WORK);
        break;
      case RadioValue.Completed:
        items = this.todoList.filter((v) => v.status === TodoStatus.COMPLETED);
        break;
    }
    return items;
  }

  getStatus(item: Todo) {
    return item.status === TodoStatus.COMPLETED ? "completed" : "work";
  }

  getStatusColor(status: TodoStatus) {
    return status === TodoStatus.COMPLETED ? "success" : "error";
  }

  emitChangeStatus(item: Todo) {
    this.$emit("change-status", item);
  }

  emitEeditTodo(item: Todo) {
    this.$emit("edit-todo", item);
  }

  emitDeleteTodo(item: Todo) {
    this.$emit("delete-todo", item);
  }
}
</script>

<style scoped></style>

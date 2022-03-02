<template>
  <v-container>
    <confirmation-dialog
      :showDialog="showAllDeleteConfirmationDialog"
      :title="$t('dialogs.titles.delete').toString()"
      :message="$t('dialogs.messages.delete').toString()"
      @click-agree="
        showAllDeleteConfirmationDialog = false;
        deleteTodoList();
      "
      @click-disagree="showAllDeleteConfirmationDialog = false"
    ></confirmation-dialog>

    <v-row>
      <v-radio-group
        v-model="selectedRadioButton"
        row
        class="ml-8"
        @change="changeRadioButton()"
      >
        <v-radio
          v-for="item in radioItems"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></v-radio>
      </v-radio-group>

      <v-spacer></v-spacer>

      <div class="right mr-4">
        <v-col>
          <v-btn
            color="success"
            class="ml-12 mr-4 mb-2"
            elevation="0"
            style="text-transform: none"
            @click="toRegister()"
          >
            <v-icon>mdi-pencil-plus-outline</v-icon>
            <span class="ml-2">{{ $t("buttons.add_todo") }}</span>
          </v-btn>

          <v-btn
            color="error"
            class="mb-2"
            elevation="0"
            style="text-transform: none"
            @click="showAllDeleteConfirmationDialog = true"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
            <span class="ml-2">{{ $t("buttons.all_delete") }}</span>
          </v-btn>
        </v-col>
      </div>
    </v-row>

    <v-divider></v-divider>

    <todo-list
      :todoList="todoList"
      :searchOption="selectedRadioButton"
      @change-status="changeStatus($event)"
      @edit-todo="editTodo($event)"
      @delete-todo="deleteTodo($event)"
    ></todo-list>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import TodoList from "@/components/TodoList.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import { Todo, TodoStatus } from "@/models/Todo";
import { Store } from "@/store/Store";

export type RadioType = "All" | "Work" | "Completed";

export enum RadioValue {
  All,
  Work,
  Completed,
}

@Component({ components: { TodoList, ConfirmationDialog } })
export default class Home extends Vue {
  todoList!: Todo[];
  selectedRadioButton!: RadioValue;
  radioItems: { label: string; value: RadioValue }[] = [];
  showAllDeleteConfirmationDialog = false;

  created(): void {
    this.todoList = Store.loadTodoList();
    const tmp = Store.loadTodo();
    if (tmp.id.length) {
      this.deleteTodo(tmp);
      this.addTodo(tmp);
      Store.deleteTodo();
    }
    this.setupRadioItems();
    this.selectedRadioButton = RadioValue.All;
  }

  @Watch("$i18n.locale")
  onI18nLocale(): void {
    this.setupRadioItems();
  }

  setupRadioItems(): void {
    this.radioItems = [
      {
        label: this.$t("statuses.all").toString(),
        value: RadioValue.All,
      },
      {
        label: this.$t("statuses.work").toString(),
        value: RadioValue.Work,
      },
      {
        label: this.$t("statuses.completed").toString(),
        value: RadioValue.Completed,
      },
    ];
  }

  addTodo(item: Todo): void {
    this.todoList.unshift(item);
    Store.saveTodoList(this.todoList);
  }

  changeStatus(item: Todo): void {
    item.status =
      item.status === TodoStatus.COMPLETED
        ? TodoStatus.WORK
        : TodoStatus.COMPLETED;
    Store.saveTodoList(this.todoList);
  }

  deleteTodo(item: Todo): void {
    this.todoList = this.todoList.filter((v) => v.id !== item.id);
    Store.saveTodoList(this.todoList);
    this.$forceUpdate();
  }

  deleteTodoList(): void {
    this.todoList = [];
    Store.saveTodoList(this.todoList);
    this.$forceUpdate();
  }

  changeRadioButton(): void {
    this.$forceUpdate();
  }

  editTodo(item: Todo): void {
    Store.saveTodo(item);
    this.$router.push("/edit");
  }

  toRegister(): void {
    this.$router.push("/register");
  }
}
</script>
.right { text-align: right }
<style scoped></style>

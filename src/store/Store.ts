import { Todo, TodoStatus } from "@/models/Todo";
import { plainToInstance } from "class-transformer";

export class Store {
  static readonly __TODO_STORE_ID__ = "__todo_store_id__";
  static readonly __TODO_LIST_STORE_ID__ = "__todo_list_store_id__";

  static saveTodo(item: Todo): void {
    localStorage.setItem(this.__TODO_STORE_ID__, JSON.stringify(item));
  }

  static saveTodoList(item: Todo[]): void {
    localStorage.setItem(this.__TODO_LIST_STORE_ID__, JSON.stringify(item));
  }

  static loadTodo(): Todo {
    let plain = {};
    try {
      plain = JSON.parse(localStorage.getItem(this.__TODO_STORE_ID__) ?? "");
    } catch (e) {
      console.error(e);
    }
    if (Object.keys(plain).length) {
      return plainToInstance(Todo, plain as Todo);
    } else {
      return new Todo("", "", "", "", "", TodoStatus.WORK);
    }
  }

  static loadTodoList(): Todo[] {
    let plain = {};
    try {
      plain = JSON.parse(
        localStorage.getItem(this.__TODO_LIST_STORE_ID__) ?? ""
      );
    } catch (e) {
      console.error(e);
    }

    if (Object.keys(plain).length) {
      return plainToInstance(Todo, plain as Todo[]);
    } else {
      return [];
    }
  }

  static deleteTodo(): void {
    localStorage.removeItem(this.__TODO_STORE_ID__);
  }
}

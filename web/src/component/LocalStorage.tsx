import { Todo } from "../d";

export const saveTodoList = (pageNum: number, todoList: Todo[]) => {
  let key = "todo" + pageNum.toString();
  localStorage.setItem(key, JSON.stringify(todoList));
}

export function loadTodoList(pageNum: number): Todo[] {
  let key = "todo" + pageNum.toString();
  return JSON.parse(localStorage.getItem(key) || "[]");
}
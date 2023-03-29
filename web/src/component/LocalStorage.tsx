import { Todo } from "../d";

export function SaveTodoList(pageNum: number, todoList: Todo[]) {
  let key = "todo" + pageNum.toString();
  localStorage.setItem(key, JSON.stringify(todoList));
}

export function LoadTodoList(pageNum: number): Todo[] {
  let key = "todo" + pageNum.toString();
  console.log(key);
  console.log(localStorage.getItem(key));
  return JSON.parse(localStorage.getItem(key) || "[]");
}

export function SaveGoal(pageNum: number, goal: string) {
  let key = "goal" + pageNum.toString();
  localStorage.setItem(key, goal);
}

export function LoadGoal(pageNum: number): string {
  let key = "goal" + pageNum.toString();
  console.log(`$key - ${localStorage.getItem(key)}`);
  return localStorage.getItem(key) || "목표가 없습니다.";
}

type TodoList = 
  [{
    date: string,
    done: boolean,
    strikes: number
  }];
export const saveTodoList = (pageNum: number, todoList: TodoList) => {
  let key = "todo" + pageNum.toString();
  localStorage.setItem(key, JSON.stringify(todoList));
}

export function loadTodoList(pageNum: number): TodoList {
  let key = "todo" + pageNum.toString();
  return JSON.parse(localStorage.getItem(key) || "[]");
}
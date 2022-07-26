import { Todo } from "../d";

type Props = {
  startDate: string
}

function stringToDate(startDate: string){
  let year = parseInt(startDate.substring(0, 4));
  let month = parseInt(startDate.substring(4, 6)) - 1;
  let day = parseInt(startDate.substring(6, 8));
  return new Date(year, month, day);
}

export const GetInitialTodo = ({startDate}: Props) => {
  const startDay = stringToDate(startDate);
  const today = new Date();
  let todoList: Todo[] = [];
  for(let day=startDay; day<=today; day.setDate(day.getDate() + 1)){
    let todo: Todo = {
      date: day.toISOString().substring(0, 10),
      done: false,
      strikes: 0
    }
    todoList.push(todo);
  }
  return todoList;
}
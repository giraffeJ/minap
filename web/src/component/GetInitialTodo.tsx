import { Todo } from "../d";
import { DateToString, InputStringToDate } from "./Util";

type Props = {
  startDate: string
}


export const GetInitialTodo = ({startDate}: Props) => {
  const startDay = InputStringToDate(startDate);
  const today = new Date();
  let todoList: Todo[] = [];
  for(let day=startDay; day<=today; day.setDate(day.getDate() + 1)){
    let todo: Todo = {
      date: DateToString(day),
      done: false,
      strikes: 0
    }
    todoList.push(todo);
  }
  return todoList;
}
import { Todo } from "../d";

type Props = {
  todoList: Todo[]
}
export const TodoList = ({todoList: todoList}: Props) => {
  console.log(todoList);
  const list = todoList.map(({date, done, strikes}) => 
    <ul className="listul">
      <li className="listDate">{date}</li>
      <li className="listDone">{done}</li>
      <li className="listStrikes">{strikes}</li>
      <button className="listDoneButton"></button>
    </ul>
  );

  return (
    <div className="TodoList">
      {list}
    </div>
  )
}
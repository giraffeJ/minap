type TodoList = 
  [{
    date: string,
    done: boolean,
    strikes: number
  }];

type Props = {
  todoList: TodoList
}
export const TodoList = ({todoList: todoList}: Props) => {
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
import { useState } from "react";
import { Todo } from "../d";
import "./TodoList.css";

type Props = {
  todoList: Todo[];
  setTodoList: Function;
};

function CalcStrikes(todoList: Todo[]) {
  if (todoList[todoList.length - 1].done)
    todoList[todoList.length - 1].strikes = 1;
  else todoList[todoList.length - 1].strikes = 0;
  for (let i = todoList.length - 2; i >= 0; i--) {
    if (todoList[i].done) {
      todoList[i].strikes = todoList[i + 1].strikes + 1;
    } else {
      todoList[i].strikes = 0;
    }
  }
  return todoList;
}

export const TodoList = ({
  todoList: todoList,
  setTodoList: setTodoList,
}: Props) => {
  const [buttonClickAudio] = useState(new Audio("/click.mp3"));
  const playSound = () => {
    buttonClickAudio.currentTime = 0;
    buttonClickAudio.play();
  };
  const UpdateTodoList = (
    date: string,
    todoList: Todo[],
    setTodoList: Function
  ) => {
    playSound();
    window.navigator.vibrate(200);
    let foundIndex = todoList.findIndex((x) => x.date == date);
    let tmpTodo = [...todoList];
    tmpTodo[foundIndex].done = !tmpTodo[foundIndex].done;
    tmpTodo = CalcStrikes(tmpTodo);
    setTodoList(tmpTodo);
  };
  return (
    <div className="TodoList">
      {todoList.map(({ date, done, strikes }) => (
        <button
          className={done ? "checked" : "unchecked"}
          onClick={() => UpdateTodoList(date, todoList, setTodoList)}
        >
          <span className="listDate">{date}</span>
          <span className="listStrikes">{strikes}일 연속 성공!</span>
        </button>
      ))}
    </div>
  );
};

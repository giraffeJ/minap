import { useState } from "react";
import { Todo } from "../d";
import "./TodoList.css";

type Props = {
  todoList: Todo[]
  setTodoList: Function
}

function CalcStrikes(todoList: Todo[]){
  if(todoList[0].done) todoList[0].strikes=1;
  for(let i=1; i<todoList.length; i++){
    if(todoList[i].done){
      todoList[i].strikes = todoList[i-1].strikes + 1;
    }
    else{
      todoList[i].strikes = 0;
    }
  }
  return todoList;
}

function UpdateTodoList(date: string, todoList: Todo[], setTodoList: Function){
  let foundIndex = todoList.findIndex(x => x.date==date);
  let tmpTodo = [... todoList];
  tmpTodo[foundIndex].done = !tmpTodo[foundIndex].done;
  tmpTodo = CalcStrikes(tmpTodo);
  setTodoList(tmpTodo);
}

export const TodoList = ({todoList: todoList, setTodoList: setTodoList}: Props) => {
  console.log("TodoList Component");
  console.log(todoList);
  return (
    <div className="TodoList">
      {
      todoList.map(({date, done, strikes}) => 
        <button className={done ? "checked" : "unchecked"} onClick={() => UpdateTodoList(date, todoList, setTodoList)}>
          <span className="listDate">{date}</span>
          <span className="listStrikes">{strikes}일 연속 성공!</span>
        </button>
      )}
    </div>
  )
}
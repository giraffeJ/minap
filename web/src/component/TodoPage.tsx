import { useEffect, useState } from 'react';
import { Todo } from '../d';
import { LoadTodoList, SaveTodoList, LoadGoal, SaveGoal } from './LocalStorage';
import { RestartModal } from './RestartModal';
import { TodoList } from './TodoList';
import './TodoPage.css';
import { DateToString, StringToDate } from './Util';

type Props = {
  pageNum: number;
}

function CalcRate(todoList: Todo[]){
  let cnt = 0;
  for(let i=0; i<todoList.length; i++){
    if(todoList[i].done){
      cnt++;
    }
  }
  let rate = (Math.round(cnt / todoList.length * 1000) / 10).toString();
  return rate + "%(" + cnt + "/" + todoList.length + ")";
}

function AddNewTodo(todoList: Todo[], setTodoList: Function){
  let tmpTodo: Todo[] = [... todoList];
  let day: Date = StringToDate(tmpTodo[tmpTodo.length-1].date);
  day.setDate(day.getDate() + 1);
  for(day; day<=new Date(); day.setDate(day.getDate() + 1)){
    let todo: Todo = {
      date: DateToString(day),
      done: false,
      strikes: 0
    }
    tmpTodo.push(todo);
  }
  setTodoList(tmpTodo);
}

export const TodoPage = ({pageNum}: Props) => {
  const [todoList, setTodoList] = useState(LoadTodoList(pageNum));
  const [goal, setGoal] = useState("목표가 없습니다.");
  const [restartModalVisibility, setRestartModalVisibility] = useState(0);
  const [rate, setRate] = useState(CalcRate(todoList));
  useEffect(() => {
    SaveGoal(pageNum, goal);
  }, [goal]);
  useEffect(() => {
    SaveTodoList(pageNum, todoList);
    setRate(CalcRate(todoList));
  }, [todoList]);
  useEffect(() => {
    setTodoList(LoadTodoList(pageNum));
    if(todoList.length > 0 && todoList[todoList.length-1].date != DateToString(new Date())){
      AddNewTodo(todoList, setTodoList);
    }
    setGoal(LoadGoal(pageNum));
  }, [pageNum]);
  return (
    <div className="TodoPage">
      <div className="TitleBox">
        <div className="Goal">
          <div className="TitleText"><p>목표</p></div>
          <div className="TitleValue"><p>{goal}</p></div>
        </div>
        <div className="Rate">
          <div className="TitleText"><p>달성도</p></div>
          <div className="TitleValue"><p>{rate}</p></div>
        </div>
        <div className="ButtonArea">
          <button className="RestartButton" onClick={() => setRestartModalVisibility(1)}>초기화</button>
        </div>
      </div>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      {restartModalVisibility==1 && <RestartModal setGoal={setGoal} 
                                                  setTodoList={setTodoList} 
                                                  setVisible={setRestartModalVisibility} />}
    </div>
  )
}
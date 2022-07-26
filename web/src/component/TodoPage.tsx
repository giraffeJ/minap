import { useEffect, useState } from 'react';
import { Todo } from '../d';
import { loadTodoList, saveTodoList } from './LocalStorage';
import { RestartModal } from './RestartModal';
import { TodoList } from './TodoList';
import './TodoPage.css';

type Props = {
  pageNum: number;
}

function CalcRate(todoList: Todo[]){
  return "0% (0/0)";
}

export const TodoPage = ({pageNum}: Props) => {
  const [todoList, setTodoList] = useState(loadTodoList(pageNum));
  const [goal, setGoal] = useState("목표가 없습니다.");
  const [restartModalVisibility, setRestartModalVisibility] = useState(0);
  var rate = "30% (120/360)";
  useEffect(() => {
    saveTodoList(pageNum, todoList);
    rate = CalcRate(todoList);
  }, [todoList]);
  useEffect(() => {
    setTodoList(loadTodoList(pageNum));
  }, [pageNum]);
  var startDate = new Date(2022, 7, 3);
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
      <TodoList todoList={todoList} />
      {restartModalVisibility==1 && <RestartModal setGoal={setGoal} 
                                                  setTodoList={setTodoList} 
                                                  setVisible={setRestartModalVisibility} />}
    </div>
  )
}
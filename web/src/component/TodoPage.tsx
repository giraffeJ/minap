import { CSSProperties, useEffect, useState } from "react";
import { Todo } from "../d";
import { LoadTodoList, SaveTodoList, LoadGoal, SaveGoal } from "./LocalStorage";
import { RestartModal } from "./RestartModal";
import { TodoList } from "./TodoList";
import "./TodoPage.css";
import { DateToString, StringToDate } from "./Util";

type Props = {
  pageNum: number;
};

function CalcRate(todoList: Todo[]) {
  let cnt = 0;
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].done) {
      cnt++;
    }
  }
  let rate = (Math.round((cnt / todoList.length) * 1000) / 10).toString();
  return rate + "%(" + cnt + "/" + todoList.length + ")";
}

function AddNewTodo(todoList: Todo[], setTodoList: Function) {
  let tmpTodo: Todo[] = [...todoList];
  let day: Date = StringToDate(tmpTodo[0].date);
  day.setDate(day.getDate() + 1);
  for (day; day <= new Date(); day.setDate(day.getDate() + 1)) {
    let todo: Todo = {
      date: DateToString(day),
      done: false,
      strikes: 0,
    };
    tmpTodo.unshift(todo);
  }
  return tmpTodo;
}

export const TodoPage = ({ pageNum }: Props) => {
  console.log("TodoPage" + pageNum);
  const [visibility, setVisibility] =
    useState<DocumentVisibilityState>("hidden");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [goal, setGoal] = useState("목표가 없습니다.");
  const [restartModalVisibility, setRestartModalVisibility] = useState(0);
  const [rate, setRate] = useState(CalcRate(todoList));
  useEffect(() => {
    console.log("GoalEffect");
    SaveGoal(pageNum, goal);
  }, [goal]);
  useEffect(() => {
    console.log("todoListEffect");
    SaveTodoList(pageNum, todoList);
    setRate(CalcRate(todoList));
  }, [todoList]);
  useEffect(() => {
    console.log("pageNumEffect");
    let todo = LoadTodoList(pageNum);
    if (
      todo.length > 0 &&
      todo[todo.length - 1].date != DateToString(new Date())
    ) {
      todo = AddNewTodo(todo, setTodoList);
    }
    if (pageNum > 0) setVisibility("visible");
    else setVisibility("hidden");
    setTodoList(todo);
    setGoal(LoadGoal(pageNum));
  }, [pageNum]);
  return (
    <div className="TodoPage" style={{ visibility: `${visibility}` }}>
      <div className="TitleBox">
        <div className="Goal">
          <div className="TitleText">
            `<p>목표</p>
          </div>
          <div className="TitleValue">
            <p>{goal}</p>
          </div>
        </div>
        <div className="Rate">
          <div className="TitleText">
            <p>달성도</p>
          </div>
          <div className="TitleValue">
            <p>{rate}</p>
          </div>
        </div>
        <div className="ButtonArea">
          <button
            className="RestartButton"
            onClick={() => setRestartModalVisibility(1)}
          >
            초기화
          </button>
        </div>
      </div>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      {restartModalVisibility == 1 && (
        <RestartModal
          setGoal={setGoal}
          setTodoList={setTodoList}
          setVisible={setRestartModalVisibility}
        />
      )}
    </div>
  );
};

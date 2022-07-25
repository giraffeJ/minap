import { GetInitialTodo } from './GetInitialTodo';
import './RestartModal.css';

type Props = {
  setGoal: Function,
  setTodoList: Function,
  setVisible: Function
}

async function Restart (setGoal: Function, goal: string, setTodoList: Function, startDate: string, setVisible: Function){
  setGoal(goal);
  setTodoList(GetInitialTodo({startDate}))
}

export const RestartModal = ({setGoal, setTodoList, setVisible}: Props) => {
  let goal: string = "";
  let startDate: string = "";
  return(
    <div className="RestartModalBackground">
      <div className="RestartModal">
        <p className="ModalText">목표</p>
        <input className="SetGoal" placeholder="물 1L 마시기" value={goal}></input>
        <p className="ModalText">시작 날짜</p>
        <input className="StartDate" placeholder="ex)20220701" value={startDate}></input>
        <button className="RestartOk" onClick={() => Restart(setGoal, goal, setTodoList, startDate, setVisible)}>시작</button>
        <button className="RestartCancel" onClick={() => setVisible(0)}>취소</button>
      </div>
    </div>
  );
}
import { Alert } from "@mui/material";
import { useState } from "react";
import { GetInitialTodo } from "./GetInitialTodo";
import "./RestartModal.css";

type Props = {
  setGoal: Function;
  setTodoList: Function;
  setVisible: Function;
};

function checkValidDate(date: string) {
  const validDateForm = /^[0-9]{8}$/;
  return validDateForm.test(date);
}

export const RestartModal = ({ setGoal, setTodoList, setVisible }: Props) => {
  const [goalInput, setGoalInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [alertGoal, setAlertGoal] = useState(false);
  const [alertDate, setAlertDate] = useState(false);
  const Restart = () => {
    if (!checkValidDate(startDate)) {
      setAlertDate(true);
      return;
    }
    if (goalInput == "") {
      setAlertGoal(true);
      return;
    }
    setGoal(goalInput);
    setTodoList(GetInitialTodo({ startDate }));
    setVisible(0);
  };
  return (
    <div className="RestartModalBackground">
      <div className="RestartModal">
        <p className="ModalText">목표</p>
        <input
          className="SetGoal"
          placeholder="물 1L 마시기"
          onChange={(event) => setGoalInput(event.target.value)}
        />
        <p className="ModalText">시작 날짜</p>
        <input
          className="StartDate"
          placeholder="ex)20220701"
          onChange={(event) => setStartDate(event.target.value)}
        />
        <button className="RestartOk" onClick={() => Restart()}>
          시작
        </button>
        <button className="RestartCancel" onClick={() => setVisible(0)}>
          취소
        </button>
      </div>
      {alertGoal && <Alert severity="error">목표를 입력해주세요</Alert>}
      {alertDate && (
        <Alert severity="error">
          날짜 입력 형식이 잘못되었습니다. ex.20210301
        </Alert>
      )}
    </div>
  );
};

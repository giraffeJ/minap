import { CSSProperties, useEffect, useRef, useState } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  function handleScroll() {
    if (!scrollRef.current || !thumbRef.current) return;
    const scrollY = scrollRef.current.scrollTop;
    const maxScroll =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    const maxThumbPosition =
      scrollRef.current.clientHeight - thumbRef.current.clientHeight;
    const thumbY = (scrollY * maxThumbPosition) / maxScroll;

    if (thumbRef.current) {
      thumbRef.current.style.transform = `translateY(${thumbY}px)`;
    }
  }

  useEffect(() => {
    const scrollable: any = scrollRef.current;
    scrollable.addEventListener("scroll", handleScroll);

    return () => {
      scrollable.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollbarStyle: React.CSSProperties = {
    position: "absolute",
    top: "15vh",
    right: 0,
    height: "79vh",
    width: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const thumbStyle: React.CSSProperties = {
    backgroundColor: "gray",
    borderRadius: "8px",
    height: "50px",
    width: "100%",
    transform: `translateY(${scrollPosition}px)`,
  };

  const thumbRef = useRef<HTMLDivElement>(null);

  function handleThumbMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    if (!scrollRef.current || !thumbRef.current) return;

    const scrollable: any = scrollRef.current;
    const initialMouseY = e.clientY;
    const initialThumbY = parseFloat(
      thumbRef.current.style.transform.slice(11)
    );

    function handleMouseMove(e: MouseEvent) {
      const { top: contentTop } = scrollable.getBoundingClientRect();
      if (thumbRef.current) {
        const deltaY = e.clientY - initialMouseY;
        const y = initialThumbY + deltaY;
        const maxThumbPosition =
          scrollable.clientHeight - thumbRef.current.clientHeight;

        // Thumb의 위치를 scrollable 요소의 범위 내에서만 유지합니다.
        const clampedY = Math.min(Math.max(y, 0), maxThumbPosition);
        const scrollY =
          (clampedY * (scrollable.scrollHeight - scrollable.clientHeight)) /
          (scrollable.clientHeight - thumbRef.current.clientHeight);

        thumbRef.current.style.transform = `translateY(${clampedY}px)`;
        scrollable.scrollTop = scrollY;
      }
    }

    function handleMouseUp() {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }
  function handleScrollbarClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!scrollRef.current || !thumbRef.current) return;
    const scrollable: any = scrollRef.current;
    const { top: contentTop } = scrollRef.current.getBoundingClientRect();
    const y = e.clientY - contentTop - thumbRef.current.clientHeight / 2;
    const maxThumbPosition =
      scrollRef.current.clientHeight - thumbRef.current.clientHeight;

    // Thumb의 위치를 scrollable 요소의 범위 내에서만 유지합니다.
    const clampedY = Math.min(Math.max(y, 0), maxThumbPosition);

    const scrollY =
      (clampedY * (scrollable.scrollHeight - scrollable.clientHeight)) /
      (scrollable.clientHeight - thumbRef.current.clientHeight);

    thumbRef.current.style.transform = `translateY(${clampedY}px)`;
    scrollable.scrollTop = scrollY;
  }

  const [buttonClickAudio] = useState(new Audio("/click.mp3"));
  const playSound = () => {
    buttonClickAudio.currentTime = 0;
    buttonClickAudio.play();
  };

  const vibrate = () => {
    if ((window as any).messageHandler) {
      (window as any).messageHandler.postMessage("vibrate");
    } else {
      // messageHandler가 정의되지 않은 경우, 예를 들어 navigator.vibrate를 사용해 볼 수 있습니다.
      navigator.vibrate(200);
    }
  };

  const UpdateTodoList = (
    date: string,
    todoList: Todo[],
    setTodoList: Function
  ) => {
    playSound();
    vibrate();
    let foundIndex = todoList.findIndex((x) => x.date == date);
    let tmpTodo = [...todoList];
    tmpTodo[foundIndex].done = !tmpTodo[foundIndex].done;
    tmpTodo = CalcStrikes(tmpTodo);
    setTodoList(tmpTodo);
  };
  return (
    <div ref={scrollRef} className="TodoList">
      {todoList.map(({ date, done, strikes }) => (
        <button
          className={done ? "checked" : "unchecked"}
          onClick={() => UpdateTodoList(date, todoList, setTodoList)}
        >
          <span className="listDate">{date}</span>
          <span className="listStrikes">{strikes}일 연속 성공!</span>
        </button>
      ))}
      <div style={scrollbarStyle} onClick={handleScrollbarClick}>
        <div
          ref={thumbRef}
          style={thumbStyle}
          onMouseDown={handleThumbMouseDown}
        />
      </div>
    </div>
  );
};

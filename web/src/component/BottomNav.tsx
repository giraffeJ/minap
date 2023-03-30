import "./BottomNav.css";

type Props = {
  pageNum: number;
  setPageNum: Function;
};

export const BottomNav = ({ pageNum, setPageNum }: Props) => {
  return (
    <div className="BottomNav">
      <button
        className={pageNum == 1 ? "NavButton-on" : "NavButton"}
        onClick={() => setPageNum(1)}
      >
        <img className="NavButtonImg" src="img/diary.png" />
      </button>
      <button
        className={pageNum == 2 ? "NavButton-on" : "NavButton"}
        onClick={() => setPageNum(2)}
      >
        <img className="NavButtonImg" src="img/water.png" />
      </button>
      <button
        className={pageNum == 0 ? "NavButton-on" : "NavButton"}
        onClick={() => setPageNum(0)}
      >
        <img className="NavButtonImg" src="img/home.png" />
      </button>
      <button
        className={pageNum == 3 ? "NavButton-on" : "NavButton"}
        onClick={() => setPageNum(3)}
      >
        <img className="NavButtonImg" src="img/dog.png" />
      </button>
      <button
        className={pageNum == 4 ? "NavButton-on" : "NavButton"}
        onClick={() => setPageNum(4)}
      >
        <img className="NavButtonImg" src="img/sun.png" />
      </button>
    </div>
  );
};

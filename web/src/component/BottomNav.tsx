import './BottomNav.css';

type Props = {
  setPageNum: Function
}

export const BottomNav = ({setPageNum}: Props) => {
  return (
    <div className="BottomNav">
      <button className="NavButton" onClick={() => setPageNum(1)}>
        <img className="NavButtonImg" src="img/diary.png" />
      </button>
      <button className="NavButton" onClick={() => setPageNum(2)}>
        <img className="NavButtonImg" src="img/water.png" />
      </button>
      <button className="NavButton" onClick={() => setPageNum(0)}>
        <img className="NavButtonImg" src="img/home.png" />
      </button>
      <button className="NavButton" onClick={() => setPageNum(3)}>
        <img className="NavButtonImg" src="img/dog.png" />
      </button>
      <button className="NavButton" onClick={() => setPageNum(4)}>
        <img className="NavButtonImg" src="img/sun.png" />
      </button>
    </div>
  );
}
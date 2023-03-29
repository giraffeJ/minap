import { CSSProperties } from "react";
import "./Home.css";

interface Props {
  visible: Boolean;
}

export const Home = ({ visible }: Props) => {
  var DDay = Math.floor(
    (new Date().getTime() - new Date(2012, 12, 14).getTime()) / 86400000
  );
  var style: CSSProperties = {
    visibility: visible ? "visible" : "hidden",
  };
  return (
    <div className="Home" style={style}>
      <div className="DDay">
        <img className="DDayImg" src="img/heart.png" />
        <p className="DDayText">{DDay}</p>
        <img className="DDayImg" src="img/heart.png" />
      </div>
      <img className="Background" src="img/Home.jpg" />
    </div>
  );
};

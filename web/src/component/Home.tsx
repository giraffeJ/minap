import "./Home.css"

export const Home = () => {
  var DDay = Math.floor((new Date().getTime() - new Date(2012, 12, 14).getTime()) / 86400000);
  return (
    <div className="Home">
      <div className="DDay">
        <img className="DDayImg" src="img/heart.png" />
        <p className="DDayText">{DDay}</p>
        <img className="DDayImg" src="img/heart.png" />
      </div>
      <img className="Background" src="img/Home.jpg" />
    </div>
  );
}
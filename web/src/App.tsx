import React from 'react';
import logo from './logo.svg';
import './App.css';



function App() {
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
      <img className="Background" src="img/Home.jpg" />
      <div className="TopBar">
        <h1 className="Title">Minap</h1>
        <img className="AddButton" src="img/AddButton.png" />
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import { Home } from "./component/Home";
import { BottomNav } from "./component/BottomNav";
import { TopBar } from "./component/TopBar";
import { TodoPage } from "./component/TodoPage";

function App() {
  const [pageNum, setPageNum] = useState(0);
  return (
    <div className="App">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      ></meta>
      <TopBar />
      <Home visible={pageNum == 0} />
      <TodoPage pageNum={pageNum} />
      <BottomNav pageNum={pageNum} setPageNum={setPageNum} />
    </div>
  );
}

export default App;

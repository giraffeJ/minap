import { useState } from 'react';
import './App.css';
import { Home } from './component/Home';
import { BottomNav } from './component/BottomNav';
import { TopBar } from './component/TopBar';
import { TodoPage } from './component/TodoPage';



function App() {
  const [pageNum, setPageNum] = useState(0);
  var x = "<Home/>"
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
      <TopBar />
      {pageNum==0 && <Home />}
      {pageNum>0 && <TodoPage pageNum={pageNum} />}
      <BottomNav setPageNum={setPageNum}/>
    </div>
  );
}

export default App;

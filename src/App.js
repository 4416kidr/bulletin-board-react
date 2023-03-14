import logo from './logo.svg';
import './App.css';
import { First } from './mine/First';
import { ThreadList } from './mine/ThreadList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        掲示板
      </header>
      <div>
        <p id="thread-list-title">スレッド一覧</p>
        <ThreadList />
      </div>
    </div>
  );
}

export default App;

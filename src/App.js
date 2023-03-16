import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation} from 'react-router-dom';
import { ThreadList } from './mine/ThreadList';
import { ThreadNew } from './mine/ThreadNew';
import { ThreadContent } from './mine/ThreadContent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        掲示板
      </header>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/thread/new' element={<ThreadNewPage />}/>
          <Route path='/thread/:thread_id' element={<ThreadIdPage />}/>
          <Route path='/*' element={<NotFound />}/>
        </Routes>
      </Router>
    </div>
  );
}

function Home() {
  return (
    <div className='home'>
      {/* <h2>Home</h2> */}
      <div>
        <p id="thread-list-title">スレッド一覧</p>
        <ThreadList />
      </div>
      <p><Link to='/thread/new'>Link to ThreadNew</Link></p>
    </div>
  );
}
function ThreadNewPage() {
  return (
    <div>
      <ThreadNew />
      <p><Link to='/'>Link to Home</Link></p>
    </div>
  );
}
function ThreadIdPage() {
  const params = useParams();
  const {state} = useLocation();
  return (
    <div>
      <ThreadContent thread_id={params.thread_id} title={state.title} />
    </div>
  )
}
function NotFound() {
  return <h2>Not Found</h2>
}

export default App;

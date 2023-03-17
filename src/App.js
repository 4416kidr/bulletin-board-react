import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation} from 'react-router-dom';
import { ThreadList } from './mine/ThreadList';
import { ThreadNew } from './mine/ThreadNew';
import { ThreadContent } from './mine/ThreadContent';
import { ThreadContentNew } from './mine/ThreadContentNew';

const thread_new = '/thread/new'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        掲示板
      </header>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path={thread_new} element={<ThreadNewPage />}/>
          <Route path='/thread/:thread_id' element={<ThreadIdPage />}/>
          <Route path='/thread/:thread_id/new' element={<ThreadIdNewPage />} />
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
      <p><Link to={thread_new}>Link to ThreadNew</Link></p>
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
  return (
    <div>
      <ThreadContent thread_id={params.thread_id} />
    </div>
  )
}
function ThreadIdNewPage() {
  const params = useParams();
  return (
    <div>
      <ThreadContentNew thread_id={params.thread_id} />
      <Link to={`/thread/${params.thread_id}`}>スレッド内容一覧に戻る</Link>
    </div>
  )
}
function NotFound() {
  return <h2>Not Found</h2>
}

export default App;

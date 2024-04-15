import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LogInPage from './pages/LogInPage.jsx';
import HomePage from './pages/HomePage.jsx';
import SessionPage from './pages/SessionPage.jsx';
import CurrentSessionPage from './pages/CurrentSessionPage.jsx';



function App() {
    return ( 
      <Router >
        <div className='App' style={{color: '#F6F6F6', height: '100%',  width: '100%', overflowY: 'auto'}}>
          <div className='content'>
            <Routes>
              <Route path="/" element={<LogInPage />}></Route>
              <Route path="/home"element={<HomePage />}></Route>
              <Route path="/session" element ={<SessionPage />}></Route>
              <Route path="/current_session" element={<CurrentSessionPage />}></Route>
              <Route path="/idk"></Route>
              <Route path= "/about"></Route>
              <Route path= "/analytics" ></Route>
            </Routes>
            </div>
          </div>
      </Router>

           );
}

export default App;
